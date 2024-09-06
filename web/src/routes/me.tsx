import { createFileRoute, redirect } from '@tanstack/react-router'
import { useToggle } from 'usehooks-ts'
import { useEffect, useState } from 'react'
import type { AuthContext } from '@/auth.tsx'
import { clearToken, getToken } from '@/lib/token.ts'
import { http } from '@/lib/http.ts'

export const Route = createFileRoute('/me')({
  component: Me,
  beforeLoad: async ({ context, location }) => {
    if (((context as any).auth as AuthContext).isAuthenticated) {
      return true
    }
    if (getToken()) {
      await http.get<CurrentUser>('/auth/current')
        .then(r => r.data.data!)
        .then((user) => {
          ((context as any).auth as AuthContext).setUser(user)
          return user
        })
        .catch(() => {
          clearToken()
          throw redirect({ to: '/login', search: { redirect: location.pathname } })
        })
      return true
    }
    throw redirect({ to: '/login', search: { redirect: location.pathname } })
  },
})

function Me() {
  const [value, toggle, setValue] = useToggle()
  const [got, setGot] = useState(false)

  const [card, setCard] = useState<string | null>(null)
  useEffect(() => {
    http.get<string>('/users/myCard')
      .then(r => r.data.data)
      .then((c) => {
        if (c) {
          setGot(true)
        }
        setCard(c || null)
      })
  }, [])

  function getCard() {
    http.get<string>('/users/getCard')
      .then((r) => {
        setGot(true)
        setCard(r.data.data || null)
      })
  }

  return (
    <>
      <div className="flex h-[60vh] w-full items-center justify-center">
        <div
          className="flex h-[350px] w-[600px] max-w-full items-center justify-center"
          style={{
            backgroundImage: 'url(/card.png)',
            backgroundSize: 'cover',
          }}
        >
          <div className="h-[48px] w-[400px] max-w-[80%] rounded-2xl bg-gray-100 opacity-50">
            {!got && (
              <div className="flex h-full items-center justify-center">
                <button type="button" onClick={getCard} className="text-2xl font-bold text-blue-600">
                  点击领取
                </button>
              </div>
            )}
            { got && (
              <div className="flex h-full items-center justify-center" onClick={toggle}>
                <div className="text-2xl font-bold text-black text-primary-foreground">
                  { value ? card : '*************' }
                </div>
              </div>
            ) }
          </div>
        </div>
      </div>
    </>
  )
}
