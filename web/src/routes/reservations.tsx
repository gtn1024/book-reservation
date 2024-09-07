import { Link, createFileRoute } from '@tanstack/react-router'
import useSWRImmutable from 'swr/immutable'
import React, { useMemo, useState } from 'react'
import { format } from 'date-fns'
import { http } from '@/lib/http.ts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { AutoPagination } from '@/components/auto-pagination.tsx'

export const Route = createFileRoute('/reservations')({
  component: Index,
})

interface DataTableProps {
  reservations?: Reservation[]
  pagination: Pagination
}

const DataTable: React.FC<DataTableProps> = ({ reservations, pagination }) => {
  function getReservationStatus(reservation: Reservation) {
    if (new Date() < new Date(reservation.startDate)) {
      return '未开始'
    }
    if (new Date() > new Date(reservation.endDate)) {
      return '已归还'
    }
    return '借阅中'
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-2 border">#</TableHead>
          <TableHead className="border">书籍名称</TableHead>
          <TableHead className="border">借阅时间</TableHead>
          <TableHead className="border">起始日期</TableHead>
          <TableHead className="border">归还日期</TableHead>
          <TableHead className="border">当前状态</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations?.map((reservation, index) => (
          <TableRow key={reservation.id}>
            <TableCell
              className="max-w-2 border"
            >
              {(pagination.current - 1) * pagination.pageSize + index + 1}
            </TableCell>
            <TableCell className="border text-left">
              <Link
                to="/books/$id"
                params={{ id: reservation.book.id.toString() }}
                className="text-link"
              >
                {reservation.book.title}
              </Link>
            </TableCell>
            <TableCell className="border">{format(reservation.createdAt, 'yyyy-MM-dd HH:mm:ss')}</TableCell>
            <TableCell className="border">{reservation.startDate}</TableCell>
            <TableCell className="border">{reservation.endDate}</TableCell>
            <TableCell className="border">{getReservationStatus(reservation)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Index() {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 20,
    pages: 0,
    total: 0,
  })

  const { data } = useSWRImmutable('/reservations', async (path) => {
    return http.get<Reservation[]>(path)
      .then(r => r.data)
  })
  const reservations = useMemo(() => data?.data, [data])

  return (
    <>
      <h1 className="text-2xl font-bold">借阅记录</h1>

      <DataTable reservations={reservations} pagination={pagination} />

      <AutoPagination
        currentPage={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={page => setPagination({ ...pagination, current: page })}
        onPrevClick={() => {
          if (pagination.current > 1) {
            setPagination({ ...pagination, current: pagination.current - 1 })
          }
        }}
        onNextClick={() => {
          if (pagination.current < pagination.pages) {
            setPagination({ ...pagination, current: pagination.current + 1 })
          }
        }}
      />
    </>
  )
}
