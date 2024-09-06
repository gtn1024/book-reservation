import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { BookEditForm, type BookEditFormSchema } from '@/components/manage/BookEditForm.tsx'
import { http } from '@/lib/http.ts'

export const Route = createFileRoute('/manage/books/$id')({
  component: Page,
})

function Page() {
  const { id } = Route.useParams()
  const [data, setData] = useState<Book | null>(null)
  useEffect(() => {
    http.get<Book>(`/books/${id}`)
      .then(res => res.data.data)
      .then(d => setData(d || null))
  }, [])

  const nav = useNavigate()
  function onSubmit(v: BookEditFormSchema) {
    http.put(`/books/${id}`, v)
      .then(() => {
        toast('修改')
        void nav({ to: '/manage/books' })
      })
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-2xl font-bold">
            修改书籍
          </h2>
        </div>
      </div>

      <BookEditForm
        submitTitle="修改"
        onSubmit={onSubmit}
        defaultValues={{
          title: data?.title || '',
          isbn: data?.isbn || '',
          author: data?.author || '',
          publisher: data?.publisher || '',
          year: data?.year || new Date().getFullYear(),
          quantity: data?.quantity || 1,
          description: data?.description || '',
          cover: data?.cover || '',
        }}
      />
    </>
  )
}
