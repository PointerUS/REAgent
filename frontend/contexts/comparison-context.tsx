"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { Property } from "@/lib/types"

interface ComparisonContextType {
  comparedProperties: Property[]
  addToComparison: (property: Property) => void
  removeFromComparison: (propertyId: string) => void
  clearComparison: () => void
  isInComparison: (propertyId: string) => boolean
  canAddMore: boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

const MAX_COMPARISON_ITEMS = 4

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [comparedProperties, setComparedProperties] = useState<Property[]>([])

  const addToComparison = useCallback((property: Property) => {
    setComparedProperties((prev) => {
      if (prev.length >= MAX_COMPARISON_ITEMS) return prev
      if (prev.some((p) => p.id === property.id)) return prev
      return [...prev, property]
    })
  }, [])

  const removeFromComparison = useCallback((propertyId: string) => {
    setComparedProperties((prev) => prev.filter((p) => p.id !== propertyId))
  }, [])

  const clearComparison = useCallback(() => {
    setComparedProperties([])
  }, [])

  const isInComparison = useCallback(
    (propertyId: string) => {
      return comparedProperties.some((p) => p.id === propertyId)
    },
    [comparedProperties],
  )

  const canAddMore = comparedProperties.length < MAX_COMPARISON_ITEMS

  return (
    <ComparisonContext.Provider
      value={{
        comparedProperties,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
        canAddMore,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
