import { createFileRoute } from '@tanstack/react-router'
import useSWRImmutable from 'swr/immutable'
import { http } from '@/lib/http.ts'
import { MarkdownViewer } from '@/components/markdown-viewer.tsx'

export const Route = createFileRoute('/books/$id')({
  component: Page,
})

function Page() {
  const { id } = Route.useParams()
  const { data } = useSWRImmutable(`/books/${id}`, async (path) => {
    return http
      .get<Book>(path)
      .then(res => res.data.data)
  })

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold">
            {data?.title}
          </h1>
        </div>
      </div>
      <div className="mt-2 flex items-start">
        <div>
          <img src={data?.cover} alt={`${data?.title}封面`} width={200} height={200} className="size-[200px]" />
        </div>
        <div className="ml-2 flex-1">
          <p className="text-sm text-gray-500">
            作者：
            {data?.author}
          </p>
          <p className="text-sm text-gray-500">
            出版社：
            {data?.publisher}
          </p>
          <p className="text-sm text-gray-500">
            出版年份：
            {data?.year}
          </p>
          <p className="text-sm text-gray-500">
            总册数：
            {data?.quantity}
          </p>
          <p className="text-sm text-gray-500">
            剩余册数：
          </p>
          <p className="text-sm text-gray-500">
            ISBN：
            {data?.isbn}
          </p>
        </div>
      </div>

      <div className="mt-2">
        <MarkdownViewer data={data?.description} />
      </div>
    </>
  )
}
