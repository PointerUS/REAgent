"use client"
import { Button } from "@/components/ui/button"
import { Plus, Check, X } from "lucide-react"
import { useComparison } from "@/contexts/comparison-context"
import type { Property } from "@/lib/types"
import { motion } from "framer-motion"

interface ComparisonButtonProps {
  property: Property
  size?: "sm" | "md" | "lg"
  variant?: "default" | "outline" | "ghost"
  showText?: boolean
  className?: string
}

export function ComparisonButton({
  property,
  size = "md",
  variant = "outline",
  showText = true,
  className = "",
}: ComparisonButtonProps) {
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison()

  const isAdded = isInComparison(property.id)
  const canAdd = canAddMore || isAdded

  const handleClick = () => {
    if (isAdded) {
      removeFromComparison(property.id)
    } else if (canAdd) {
      addToComparison(property)
    }
  }

  const getButtonContent = () => {
    if (isAdded) {
      return (
        <>
          <Check className="w-4 h-4" />
          {showText && <span>Added</span>}
        </>
      )
    } else if (!canAdd) {
      return (
        <>
          <X className="w-4 h-4" />
          {showText && <span>Max Reached</span>}
        </>
      )
    } else {
      return (
        <>
          <Plus className="w-4 h-4" />
          {showText && <span>Compare</span>}
        </>
      )
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={handleClick}
        size={size}
        variant={isAdded ? "default" : variant}
        disabled={!canAdd && !isAdded}
        className={`gap-2 ${className}`}
      >
        {getButtonContent()}
      </Button>
    </motion.div>
  )
}
