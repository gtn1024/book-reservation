import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import React, { useEffect } from 'react'
import { Input } from '@/components/ui/input.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Button } from '@/components/ui/button.tsx'
import { cn } from '@/lib/utils'
import { MarkdownEditor } from '@/components/markdown-editor.tsx'

const bookEditFormSchema = z.object({
  title: z.string(),
  isbn: z.string(),
  author: z.string(),
  publisher: z.string(),
  year: z.number(),
  quantity: z.number(),
  description: z.string(),
  cover: z.string(),
})

export type BookEditFormSchema = z.infer<typeof bookEditFormSchema>

interface BookEditFormProps {
  defaultValues: BookEditFormSchema
  onSubmit: (value: BookEditFormSchema) => void
  submitTitle: string
}

export const BookEditForm: React.FC<BookEditFormProps> = ({ defaultValues, onSubmit, submitTitle }) => {
  const form = useForm<z.infer<typeof bookEditFormSchema>>({
    resolver: zodResolver(bookEditFormSchema),
    defaultValues,
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues])

  return (
    <div className="flex flex-col space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn('flex flex-col space-y-4')}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>书名</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>作者</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>出版社</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>出版年份</FormLabel>
                <FormControl>
                  <Input {...field} type="number" onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>总册数</FormLabel>
                <FormControl>
                  <Input {...field} type="number" onChange={event => field.onChange(+event.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>描述</FormLabel>
                <FormControl>
                  <MarkdownEditor onChange={field.onChange} data={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>封面</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{submitTitle}</Button>
        </form>
      </Form>
    </div>
  )
}
