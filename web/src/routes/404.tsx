import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import NotFound from '@/assets/PageNotFound.svg'

export const Route = createFileRoute('/404')({
  component: notFound,
})

export function notFound() {
  return (
    <div className="my-8 flex flex-col items-center justify-center space-y-4">
      <img src={NotFound} alt="Page Not Found" className="max-w-sm" />
      <h1 className="text-3xl font-bold">Page Not Found</h1>
    </div>
  )
}
