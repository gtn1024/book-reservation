import { createFileRoute } from '@tanstack/react-router'
import useSWRImmutable from 'swr/immutable'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { toast } from 'sonner'
import { http } from '@/lib/http.ts'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form.tsx'
import { cn } from '@/lib/utils.ts'
import { Input } from '@/components/ui/input.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Calendar } from '@/components/ui/calendar.tsx'

const formSchema = z.object({
  bookId: z.string(),
  cardNumber: z.string(),
  date_range: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export const Route = createFileRoute('/books/$id/reserve')({
  component: ReserveBooks,
})

function ReserveBooks() {
  const { id } = Route.useParams()

  const { data } = useSWRImmutable(`/books/${id}`, async (path) => {
    const res = await http.get<Book>(path)
    return res.data.data
  })

  const { data: availableCount } = useSWRImmutable(`/books/${id}/availableCount`, async (path) => {
    return http
      .get<number>(path)
      .then(res => res.data.data)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: id,
      cardNumber: '',
      date_range: {
        from: new Date(),
        to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = {
      bookId: values.bookId,
      cardNumber: values.cardNumber,
      startDate: format(values.date_range.from, 'yyyy-MM-dd'),
      endDate: format(values.date_range.to, 'yyyy-MM-dd'),
    }

    http.post(`/reservations/reserve`, params)
      .then(() => {
        toast.success('预约成功')
      })
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <h1 className="text-2xl font-bold">
            {data?.title}
          </h1>
        </div>
      </div>

      <div className="mt-2 flex">
        <div>
          <img src={data?.cover} alt={`${data?.title}封面`} width={200} height={200} className="size-[200px]" />
        </div>
        <div className="ml-2 flex flex-1 flex-col justify-between">
          <div>
            <p className="text-sm text-gray-500">
              作者：
              {data?.author}
            </p>
            <p className="text-sm text-gray-500">
              出版社：
              {data?.publisher}
            </p>
            <p className="text-sm text-gray-500">
              出版年份：
              {data?.year}
            </p>
            <p className="text-sm text-gray-500">
              总册数：
              {data?.quantity}
            </p>
            <p className="text-sm text-gray-500">
              剩余册数：
              {availableCount}
            </p>
            <p className="text-sm text-gray-500">
              ISBN：
              {data?.isbn}
            </p>
          </div>
        </div>
      </div>

      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('flex max-sm:flex-col max-sm:space-y-4 flex-col sm:space-x-0 space-y-4')}
          >
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="借书证号" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date_range"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value.from && 'text-muted-foreground',
                        )}
                      >
                        <CalendarIcon className="mr-2 size-4" />
                        {field.value.from
                          ? (
                              field.value.to
                                ? (
                                  <>
                                    {format(field.value.from, 'yyyy-MM-dd')}
                                    {' '}
                                    -
                                    {' '}
                                    {format(field.value.to, 'yyyy-MM-dd')}
                                  </>
                                  )
                                : (
                                    format(field.value.from, 'yyyy-MM-dd')
                                  )
                            )
                          : (
                            <span>日期区间</span>
                            )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from || new Date()}
                        selected={{
                          from: field.value.from || new Date(),
                          to: field.value.to || new Date(),
                        }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                        disabled={date => date < new Date(Date.now() - 86400000)}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Button type="submit">预约</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
