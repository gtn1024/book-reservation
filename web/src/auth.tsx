import * as React from 'react'

import { useMemo } from 'react'
import { clearToken, getToken, setToken } from '@/lib/token.ts'
import { http } from '@/lib/http.ts'

interface LoginParams {
  type: 'USERNAME'
  username: string
  password: string
}

export interface AuthContext {
  isAuthenticated: boolean
  login: (params: LoginParams) => Promise<void>
  logout: () => Promise<void>
  current: () => Promise<void>
  user: CurrentUser | null
  setUser: (user: CurrentUser) => void
}

// eslint-disable-next-line ts/no-redeclare
const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<CurrentUser | null>(null)
  const isAuthenticated = useMemo(() => !!user, [user])

  const logout = React.useCallback(async () => {
    clearToken()
    setUser(null)
  }, [])

  const login = React.useCallback(async (params: LoginParams) => {
    const { token, user } = await http.post<{
      token: string
      user: CurrentUser
    }>('/auth/login', params)
      .then(r => r.data.data!)

    setToken(token, 'FOREVER')

    setUser(user)
  }, [])

  const current = React.useCallback(async () => {
    if (!user?.id && getToken()) {
      const u = await http.get<CurrentUser>('/auth/current')
        .then(r => r.data.data!)
      setUser(u)
    }
  }, [])

  React.useEffect(() => {
    if (getToken() && !user?.id) {
      http.get<CurrentUser>('/auth/current')
        .then(r => r.data.data!)
        .then((user) => {
          setUser(user)
        })
    }
  }, [])

  return (
    // eslint-disable-next-line react/no-unstable-context-value
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, current, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
