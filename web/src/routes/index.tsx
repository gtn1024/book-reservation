import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { BookSearchComponent } from '@/components/home/BookSearchComponent.tsx'
import { setHeaderTitle } from '@/lib/utils.ts'
import { HomeNewBooksComponent } from '@/components/home/HomeNewBooksComponent.tsx'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  useEffect(() => {
    setHeaderTitle('')
  }, [])

  return (
    <>
      <BookSearchComponent />

      <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <div className="w-full space-y-4">
          <HomeNewBooksComponent />
        </div>
        <div className="w-full space-y-4 sm:max-w-[360px]">
        </div>
      </div>
    </>
  )
}
