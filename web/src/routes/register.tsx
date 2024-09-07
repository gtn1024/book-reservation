import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

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
import { http } from '@/lib/http.ts'

export const Route = createFileRoute('/register')({
  component: RegisterPage,
})

const registerFormSchema = z.object({
  username: z.string(),
  password: z.string(),
  password2: z.string(),
})

function RegisterForm({ redirect }: { redirect?: string }) {
  const auth = useAuth()
  const nav = useNavigate()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  })

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (values.password !== values.password2) {
      return form.setError('password2', { message: '两次密码不一致' })
    }

    http.post('/auth/register', {
      username: values.username,
      password: values.password,
    }).then(() => {
      auth.login({ password: values.password, type: 'USERNAME', username: values.username })
        .then(() => {
          if (redirect) {
            return nav({ to: redirect })
          }
          return nav({ to: '/' })
        })
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

          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  确认密码
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

function RegisterPage() {
  useEffect(() => {
    setHeaderTitle('注册')
  }, [])
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>注册</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <RegisterForm />
          </div>
          <div className="mt-2 flex items-center justify-center">
            <Link to="/login" className="text-link">
              登录
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
