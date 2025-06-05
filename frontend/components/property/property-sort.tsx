"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn } from "@/lib/animation"

type SortOption = {
  id: string
  label: string
  sortFn: (a: Property, b: Property) => number
}

interface PropertySortProps {
  dictionary: Dictionary
  onSort: (sortedProperties: Property[]) => void
  properties: Property[]
}

export function PropertySort({ dictionary, onSort, properties }: PropertySortProps) {
  const [sortOption, setSortOption] = useState<string>("default")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const sortOptions: Record<string, SortOption> = {
    default: {
      id: "default",
      label: dictionary.sort?.default || "Default",
      sortFn: (a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1),
    },
    price: {
      id: "price",
      label: dictionary.sort?.price || "Price",
      sortFn: (a, b) => a.price - b.price,
    },
    newest: {
      id: "newest",
      label: dictionary.sort?.newest || "Newest",
      sortFn: (a, b) => {
        // In a real app, this would use creation date
        // Here we'll use the ID as a proxy for simplicity
        return parseInt(a.id) - parseInt(b.id)
      },
    },
    bedrooms: {
      id: "bedrooms",
      label: dictionary.sort?.bedrooms || "Bedrooms",
      sortFn: (a, b) => a.bedrooms - b.bedrooms,
    },
    sqft: {
      id: "sqft",
      label: dictionary.sort?.area || "Area",
      sortFn: (a, b) => a.sqft - b.sqft,
    },
  }

  const handleSortChange = (value: string) => {
    setSortOption(value)
    applySort(value, sortDirection)
  }

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc"
    setSortDirection(newDirection)
    applySort(sortOption, newDirection)
  }

  const applySort = (option: string, direction: "asc" | "desc") => {
    if (!sortOptions[option]) return

    const sorted = [...properties].sort(sortOptions[option].sortFn)
    
    if (direction === "desc") {
      sorted.reverse()
    }
    
    onSort(sorted)
  }

  return (
    <motion.div
      variants={fadeIn}
      className="flex items-center justify-between mb-6 bg-white p-3 rounded-lg shadow-sm"
    >
      <div className="text-sm text-gray-500">
        {dictionary.sort?.showing || "Showing"} {properties.length} {dictionary.sort?.results || "results"}
      </div>
      
      <div className="flex items-center gap-2">
        <Select value={sortOption} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={dictionary.sort?.sortBy || "Sort by"} />
          </SelectTrigger>
          <SelectContent>
            {Object.values(sortOptions).map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button variant="outline" size="icon" onClick={toggleSortDirection}>
          {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
        </Button>
      </div>
    </motion.div>
  )
} 