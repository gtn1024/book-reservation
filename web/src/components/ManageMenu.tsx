import type { FileRoutesByPath } from '@tanstack/react-router'
import { Link, useLocation } from '@tanstack/react-router'

const menuItems: Array<{ name: string, link: keyof FileRoutesByPath }> = [
  { name: '书籍管理', link: '/manage/books/' },
]

export function ManageMenu() {
  const location = useLocation()
  const removeTrailingSlash = (path: string) => path.replace(/\/$/, '')
  return (
    <>
      <div className="border">
        <div className="p-2">
          {menuItems.map(item => (
            <Link
              key={item.link}
              to={item.link}
              className={`block rounded-lg p-2 ${removeTrailingSlash(location.pathname) === removeTrailingSlash(item.link) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
