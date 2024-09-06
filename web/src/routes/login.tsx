import { createFileRoute, useNavigate } from '@tanstack/react-router'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { cn, setHeaderTitle } from '@/lib/utils.ts'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx'
import { useAuth } from '@/auth.tsx'

const loginPageSearchSchema = z.object({
  redirect: z.string().optional(),
})

type LoginPageSearch = z.infer<typeof loginPageSearchSchema>

export const Route = createFileRoute('/login')({
  component: LoginPage,
  validateSearch: loginPageSearchSchema,
})

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

function LoginForm({ redirect }: { redirect?: string }) {
  const auth = useAuth()
  const nav = useNavigate()
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  })

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    auth.login({ password: values.password, type: 'USERNAME', username: values.username })
      .then(() => {
        if (redirect) {
          return nav({ to: redirect })
        }
        return nav({ to: '/' })
      })
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex flex-col space-y-4')}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  用户名
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  密码
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">提交</Button>
        </form>
      </Form>
    </>
  )
}

function LoginPage() {
  useEffect(() => {
    setHeaderTitle('登录')
  }, [])
  const { redirect } = Route.useSearch()
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>登录</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <LoginForm redirect={redirect} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
