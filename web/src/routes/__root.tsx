import { Outlet, createRootRoute } from '@tanstack/react-router'
import React, { Suspense } from 'react'
import { Toaster } from '@/components/ui/sonner.tsx'
import { Header } from '@/components/Header.tsx'
import { Footer } from '@/components/Footer.tsx'

// eslint-disable-next-line node/prefer-global/process
const TanStackRouterDevtools = process.env.NODE_ENV === 'production'
  ? () => null
  : React.lazy(() =>
    import('@tanstack/router-devtools').then(res => ({
      default: res.TanStackRouterDevtools,
    })),
  )

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen">
        <Header />

        <div className="mx-auto max-w-[1200px] space-y-4 p-2">
          <Outlet />
        </div>

        <Footer />
      </div>
      <Toaster />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
})
