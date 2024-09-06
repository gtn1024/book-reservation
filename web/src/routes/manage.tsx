import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { ManageMenu } from '@/components/ManageMenu.tsx'
import type { AuthContext } from '@/auth.tsx'
import { clearToken, getToken } from '@/lib/token.ts'
import { http } from '@/lib/http.ts'
import { setHeaderTitle } from '@/lib/utils.ts'

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
export const Route = createFileRoute('/manage')({
  component: () => {
    useEffect(() => {
      setHeaderTitle('管理面板')
    }, [])

    return (
      <div className="flex items-start">
        <main className="mx-2 flex-1">
          <Outlet />
        </main>
        <div className="mx-2 w-1/3 max-w-[300px]">
          <ManageMenu />
        </div>
      </div>
    )
  },
  beforeLoad: async ({ context, location }) => {
    if (((context as any).auth as AuthContext).isAuthenticated) {
      if (((context as any).auth as AuthContext).user?.userRole === 'ADMIN') {
        return true
      }
      toast.error('您没有权限访问此页面')
      return redirect({ to: '/' })
    }
    if (getToken()) {
      const user = await http.get<CurrentUser>('/auth/current')
        .then(r => r.data.data!)
        .then((user) => {
          ((context as any).auth as AuthContext).setUser(user)
          return user
        })
        .catch(() => {
          clearToken()
          throw redirect({ to: '/login', search: { redirect: location.pathname } })
        })
      if (user.userRole === 'ADMIN') {
        return true
      }
      toast.error('您没有权限访问此页面')
      return redirect({ to: '/' })
    }
    throw redirect({ to: '/login', search: { redirect: location.pathname } })
  },
})
