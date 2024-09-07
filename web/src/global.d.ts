interface Pagination {
  current: number
  pageSize: number
  total: number
  pages: number
}

type UserRole = 'USER' | 'ADMIN'

interface CurrentUser {
  id: string
  username: string
  userRole: UserRole
}

interface Book {
  id: string
  isbn: string
  title: string
  author: string
  publisher: string
  year: number
  quantity: number
  description: string
  cover?: string
  createdAt: string
}

interface Reservation {
  id: string
  book: Book
  user: CurrentUser
  startDate: string
  endDate: string
}
