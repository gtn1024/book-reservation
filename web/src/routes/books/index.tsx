import { Link, createFileRoute, useSearch } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { z } from 'zod'
import React, { useEffect, useMemo, useState } from 'react'
import useSWRImmutable from 'swr/immutable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { cn } from '@/lib/utils.ts'
import { SearchStudent } from '@/components/search/SearchStudent.tsx'
import { http } from '@/lib/http.ts'
import { buildQueryParam } from '@/lib/router-utils.ts'
import { AutoPagination } from '@/components/auto-pagination.tsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const bookIndexSearchSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  year: z.number().optional(),
  current: z.number().optional(),
  pageSize: z.number().optional(),
})

type BookIndexSearch = z.infer<typeof bookIndexSearchSchema>

export const Route = createFileRoute('/books/')({
  component: Index,
  validateSearch: bookIndexSearchSchema,
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function Index() {
  const { title, author, publisher, year, current, pageSize } = useSearch({ from: '/books/' })

  const [params, setParams] = useState<BookIndexSearch>({
    title,
    author,
    publisher,
    year,
    current,
    pageSize,
  })

  useEffect(() => {
    setParams({ title, author, publisher, year, current, pageSize })
  }, [title, author, publisher, year, current, pageSize])

  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    pageSize: 20,
    pages: 0,
    total: 0,
  })

  const { data } = useSWRImmutable(`/books?${buildQueryParam(params)}`, async (path) => {
    const res = await http.get<unknown[]>(path)
      .then(res => res.data)
    setPagination(res.pagination!)
    return res
  })
  const books = useMemo(() => data?.data, [data])

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex h-6">
              <div className="mr-4 flex items-center">
                <Search className="mr-2 inline size-4" />
                搜索
              </div>
            </div>
            <div className={cn('hidden items-center sm:flex')}>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchStudent
            defaultValues={{
              title: undefined,
              author: undefined,
              publisher: undefined,
              year: undefined,
            }}
          />
        </CardContent>
      </Card>

      <DataTable books={books} pagination={pagination} />

      <AutoPagination
        currentPage={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={page => navToPage(page)}
        onPrevClick={() => {
          if (pagination.current > 1) {
            navToPage(pagination.current - 1)
          }
        }}
        onNextClick={() => {
          if (pagination.current < pagination.pages) {
            navToPage(pagination.current + 1)
          }
        }}
      />
    </>
  )
}
