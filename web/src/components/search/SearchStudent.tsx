import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Input } from '@/components/ui/input.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  year: z.number().optional(),
})

interface SearchStudentProps {
  defaultValues: z.infer<typeof formSchema>
  onChange?: (value: Record<string, any>) => void
}

export const SearchStudent: React.FC<SearchStudentProps> = ({ defaultValues, onChange }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues])

  const nav = useNavigate()

  function onSubmit(values: z.infer<typeof formSchema>) {
    const search = {
      title: values.title,
      author: values.author,
      publisher: values.publisher,
      year: values.year,
    }
    onChange?.(search)
    void nav({ to: `/books`, search })
  }

  return (
    <div className="flex flex-col space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex max-sm:flex-col max-sm:space-y-4 flex-col sm:space-x-0 space-y-4')}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="书名" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="作者" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="出版社" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input type="number" placeholder="出版年份" {...field} onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">搜索</Button>
        </form>
      </Form>
    </div>
  )
}
