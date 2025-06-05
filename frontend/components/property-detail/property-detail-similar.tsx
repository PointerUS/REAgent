"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyCard } from "@/components/property/property-card"
import { properties } from "@/lib/data"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailSimilarProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailSimilar({ property, dictionary }: PropertyDetailSimilarProps) {
  // Filter similar properties based on type, price range, and location
  const similarProperties = properties
    .filter((p) => p.id !== property.id)
    .filter((p) => {
      const priceRange = property.price * 0.3 // 30% price range
      return (
        p.type === property.type ||
        (p.price >= property.price - priceRange && p.price <= property.price + priceRange) ||
        p.location === property.location
      )
    })
    .slice(0, 3)

  if (similarProperties.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Similar Properties</CardTitle>
          <p className="text-gray-600">Other properties you might be interested in</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((similarProperty, index) => (
              <motion.div
                key={similarProperty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <PropertyCard property={similarProperty} dictionary={dictionary} index={index} />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
