"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn } from "@/lib/animation"

interface PropertyPaginationProps {
  dictionary: Dictionary
  totalItems: number
  onPageChange: (page: number, pageSize: number) => void
}

export function PropertyPagination({ dictionary, totalItems, onPageChange }: PropertyPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)
  const [totalPages, setTotalPages] = useState(1)
  
  // Calculate total pages whenever total items or page size changes
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(totalItems / pageSize)))
    // Reset to page 1 if current page is now out of bounds
    if (currentPage > Math.ceil(totalItems / pageSize)) {
      setCurrentPage(1)
    }
  }, [totalItems, pageSize, currentPage])
  
  // Handle page change
  const handlePageChange = (page: number) => {
    const validPage = Math.min(Math.max(1, page), totalPages)
    setCurrentPage(validPage)
    onPageChange(validPage, pageSize)
  }
  
  // Handle page size change
  const handlePageSizeChange = (size: string) => {
    const newSize = parseInt(size)
    setPageSize(newSize)
    setCurrentPage(1)
    onPageChange(1, newSize)
  }
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if at the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4)
      }
      
      // Adjust if at the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3)
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push(-1) // -1 represents ellipsis
      }
      
      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push(-2) // -2 represents ellipsis
      }
      
      // Always show last page
      pages.push(totalPages)
    }
    
    return pages
  }
  
  return (
    <motion.div
      variants={fadeIn}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
    >
      <div className="flex items-center text-sm text-gray-500">
        {dictionary.pagination?.showing || "Showing"} {Math.min((currentPage - 1) * pageSize + 1, totalItems)}-
        {Math.min(currentPage * pageSize, totalItems)} {dictionary.pagination?.of || "of"} {totalItems}{" "}
        {dictionary.pagination?.properties || "properties"}
      </div>
      
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center mr-4">
          <span className="text-sm text-gray-500 mr-2">{dictionary.pagination?.itemsPerPage || "Items per page"}:</span>
          <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-[70px]">
              <SelectValue placeholder={pageSize.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-1">
            {getPageNumbers().map((page, index) => (
              page < 0 ? (
                <div key={`ellipsis-${index}`} className="px-2">...</div>
              ) : (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[36px]"
                >
                  {page}
                </Button>
              )
            ))}
          </div>
          
          <div className="sm:hidden flex items-center">
            <span className="px-2 text-sm">
              {currentPage} / {totalPages}
            </span>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 