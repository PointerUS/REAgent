"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/contexts/comparison-context"
import { ComparisonModal } from "./comparison-modal"
import { X, ChevronUp, ChevronDown, Scale, Trash2 } from "lucide-react"
import Image from "next/image"

export function ComparisonBar() {
  const { comparedProperties, removeFromComparison, clearComparison } = useComparison()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showModal, setShowModal] = useState(false)

  if (comparedProperties.length === 0) return null

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40"
      >
        {/* Collapsed View */}
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-blue-600" />
            <span className="font-medium">{comparedProperties.length} Properties Selected</span>
            <Badge variant="secondary">Max 4</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)} className="gap-1">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              {isExpanded ? "Collapse" : "Expand"}
            </Button>

            <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
              <Scale className="w-4 h-4" />
              Compare Now
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearComparison}
              className="gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Expanded View */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t bg-gray-50 px-4 py-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {comparedProperties.map((property) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white rounded-lg p-3 shadow-sm border relative group"
                  >
                    <button
                      onClick={() => removeFromComparison(property.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="flex gap-3">
                      <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{property.title}</h4>
                        <p className="text-blue-600 font-semibold text-sm">${property.price.toLocaleString()}</p>
                        <p className="text-gray-500 text-xs">
                          {property.bedrooms} bed • {property.bathrooms} bath
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ComparisonModal isOpen={showModal} onClose={() => setShowModal(false)} properties={comparedProperties} />
    </>
  )
}
