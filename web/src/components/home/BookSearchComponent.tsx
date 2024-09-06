import { Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { SearchStudent } from '@/components/search/SearchStudent.tsx'
import { cn } from '@/lib/utils.ts'

export function BookSearchComponent() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div className="flex h-6">
              <div className="mr-4 flex items-center">
                <Search className="mr-2 inline size-4" />
                搜索
              </div>
            </div>
            <div className={cn('hidden items-center sm:flex')}>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SearchStudent defaultValues={{}} />
        </CardContent>
      </Card>
    </>
  )
}
