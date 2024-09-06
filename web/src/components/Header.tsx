import React from 'react'
import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu.tsx'
import { HeaderUserComponent } from '@/components/HeaderUserComponent.tsx'

const menuItems = [
  {
    title: '首页',
    to: '/',
  },
  {
    title: '图书',
    to: '/books',
  },
]

function Menu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-4 text-sm lg:gap-6">
        {menuItems.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NavigationMenuItem key={index}>
            <NavigationMenuLink className="text-foreground/60 transition-colors hover:text-foreground/80" asChild>
              <Link to={item.to}>
                {item.title}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const Header: React.FC = () => {
  return (
    <div className="border-b-solid flex h-[64px] items-center justify-between border-b border-b-gray-200 bg-primary-foreground px-4">
      <div className="flex">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src="/logo.svg" alt="Vite Logo" className="h-6" />
          <span className="hidden font-bold sm:inline-block">图书预约系统</span>
        </Link>
        <Menu />
      </div>

      <div>
        <HeaderUserComponent />
      </div>
    </div>
  )
}
