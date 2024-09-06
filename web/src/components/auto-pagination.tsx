import React, { useMemo } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx'

interface AutoPaginationProps {
  currentPage: number
  pageSize: number
  total: number
  onPageChange: (page: number) => void
  onPrevClick?: () => void
  onNextClick?: () => void
}

export function AutoPagination({ currentPage, pageSize, total, onPageChange, onPrevClick, onNextClick }: AutoPaginationProps) {
  const totalPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize])

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={onPrevClick} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="cursor-pointer" isActive={currentPage === 1} onClick={() => onPageChange(1)}>1</PaginationLink>
        </PaginationItem>
        {currentPage > 4 && <PaginationEllipsis />}
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage - 2)}>{currentPage - 2}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage - 1)}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage > 1 && currentPage < totalPage && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" isActive onClick={() => onPageChange(currentPage)}>{currentPage}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPage - 1 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage + 1)}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPage - 2 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" onClick={() => onPageChange(currentPage + 2)}>{currentPage + 2}</PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPage - 3 && <PaginationEllipsis />}
        {totalPage > 1 && (
          <PaginationItem>
            <PaginationLink className="cursor-pointer" isActive={currentPage === totalPage} onClick={() => onPageChange(totalPage)}>{totalPage}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={onNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
