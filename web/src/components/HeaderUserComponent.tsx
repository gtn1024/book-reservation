import { Link } from '@tanstack/react-router'
import React from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import { useAuth } from '@/auth.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button.tsx'

export function HeaderUserComponent() {
  const auth = useAuth()
  if (!auth.isAuthenticated) {
    return (
      <div>
        <Button asChild>
          <Link to="/login">
            登录
          </Link>
        </Button>
      </div>
    )
  }

  function logout() {
    void auth.logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <User className="mr-2 size-4" />
          <span>{auth.user?.username}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link to="/me">
            <User className="mr-2 size-4" />
            <span>用户中心</span>
          </Link>
        </DropdownMenuItem>
        {auth.user?.userRole === 'ADMIN' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/manage/">
                <Settings className="mr-2 size-4" />
                <span>控制面板</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 size-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
