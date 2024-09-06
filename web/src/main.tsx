import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { AuthProvider, useAuth } from './auth'
import { notFound } from '@/routes/404.tsx'

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
  defaultNotFoundComponent: notFound,
})

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

declare module '@tanstack/react-router' {
  interface Register {
    // eslint-disable-next-line ts/ban-ts-comment
    // @ts-expect-error
    router: typeof router
  }
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  )
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
