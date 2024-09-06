import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/manage/')({
  component: () => <div>Hello /manage/!</div>,
})
