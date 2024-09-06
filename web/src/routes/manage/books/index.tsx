import { Link, createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { buildQueryParam } from '@/lib/router-utils.ts'
import { http } from '@/lib/http.ts'
import { AutoPagination } from '@/components/auto-pagination.tsx'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/manage/books/')({
  component: ManageBookListPage,
})

interface DataTableProps {
  books?: Book[]
  pagination: Pagination
}

const DataTable: React.FC<DataTableProps> = ({ books, pagination }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-2 border">#</TableHead>
          <TableHead className="border">书籍名称</TableHead>
          <TableHead className="border">ISBN</TableHead>
          <TableHead className="border">作者</TableHead>
          <TableHead className="border">出版社</TableHead>
          <TableHead className="border">出版年份</TableHead>
          <TableHead className="border">总册数</TableHead>
          <TableHead className="border">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map((book, index) => (
          <TableRow key={book.id}>
            <TableCell
              className="max-w-2 border"
            >
              {(pagination.current - 1) * pagination.pageSize + index + 1}
            </TableCell>
            <TableCell className="border text-left">
              <Link
                to="/books/$id"
                params={{ id: book.id.toString() }}
                className="text-link"
              >
                {book.title}
              </Link>
            </TableCell>
            <TableCell className="border">{book.isbn}</TableCell>
            <TableCell className="border">{book.author}</TableCell>
            <TableCell className="border">{book.publisher}</TableCell>
            <TableCell className="border">{book.year}</TableCell>
            <TableCell className="border">{book.quantity}</TableCell>
            <TableCell className="border">
              <div className="space-x-2">
                <Link
                  to="/manage/books/$id"
                  params={{ id: book.id.toString() }}
                  className="text-link"
                >
                  编辑
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function ManageBookListPage() {
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 20,
    pages: 0,
    total: 0,
  })
  const params = useMemo(() => {
    return {
      current: pagination.current,
      pageSize: pagination.pageSize,
    }
  }, [pagination])
  const { data, mutate } = useSWRImmutable(`/books?${buildQueryParam(params)}`, async (path) => {
    const res = await http.get<Book[]>(path)
      .then(res => res.data)
    setPagination(res.pagination!)
    return res
  })

  useEffect(() => {
    void mutate()
  }, [])

  useEffect(() => {
    if (data) {
      setPagination(data.pagination!)
    }
  }, [data])

  const books = useMemo(() => {
    return data?.data
  }, [data])

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <h2 className="flex-1 text-2xl font-bold">
            书籍管理
          </h2>
          <div className="flex items-center">
            <Button asChild>
              <Link to="/manage/books/create">
                创建
              </Link>
            </Button>
          </div>
        </div>

        <DataTable pagination={pagination} books={books} />

        <AutoPagination
          currentPage={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onPageChange={page => setPagination(prev => ({ ...prev, current: page }))}
          onPrevClick={() => {
            if (pagination.current > 1) {
              setPagination(prev => ({ ...prev, current: prev.current - 1 }))
            }
          }}
          onNextClick={() => {
            if (pagination.current < pagination.pages) {
              setPagination(prev => ({ ...prev, current: prev.current + 1 }))
            }
          }}
        />
      </div>
    </>
  )
}
