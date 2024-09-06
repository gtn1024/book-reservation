import { UserRound } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import useSWRImmutable from 'swr/immutable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { http } from '@/lib/http.ts'

export function HomeNewBooksComponent() {
  const { data } = useSWRImmutable('/newBooks', async (path) => {
    const res = await http.get<Book[]>(path)
    return res.data.data
  })
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex h-6">
              <div className="mr-4 flex items-center">
                <UserRound className="mr-2 inline size-4" />
                最新书籍
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-inside list-decimal columns-2">
            {data?.map(book => (
              <li key={book.id}>
                <Link to="/books/$id" params={{ id: book.id }} className="text-link">
                  {book.title}
                </Link>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </>
  )
}
