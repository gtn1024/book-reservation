import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import type { BookEditFormSchema } from '@/components/manage/BookEditForm.tsx'
import { BookEditForm } from '@/components/manage/BookEditForm.tsx'
import { http } from '@/lib/http.ts'

export const Route = createFileRoute('/manage/books/create')({
  component: ManageBookCreatePage,
})

function ManageBookCreatePage() {
  const nav = useNavigate()
  function onSubmit(v: BookEditFormSchema) {
    http.post('/books', v)
      .then(() => {
        toast('创建成功')
        void nav({ to: '/manage/books' })
      })
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-2xl font-bold">
            创建竞赛
          </h2>
        </div>
      </div>

      <BookEditForm
        submitTitle="创建"
        onSubmit={onSubmit}
        defaultValues={{
          title: '',
          isbn: '',
          author: '',
          publisher: '',
          year: new Date().getFullYear(),
          quantity: 1,
          description: '',
          cover: '',
        }}
      />
    </>
  )
}
