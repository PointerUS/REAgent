"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SearchFilters } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn } from "@/lib/animation"
import { getSafeProperty } from "@/lib/utils"
import { DollarSign, MapPin, Bed, Home, RotateCcw } from "lucide-react"

interface PropertyFiltersProps {
  dictionary: Dictionary
  onFilterChange: (filters: SearchFilters) => void
}

export function PropertyFilters({ dictionary, onFilterChange }: PropertyFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({})

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFilterChange({})
  }

  // Safe property access with fallbacks
  const priceRange = getSafeProperty(dictionary, ['filters', 'priceRange'], 'Price Range')
  const propertyType = getSafeProperty(dictionary, ['filters', 'propertyType'], 'Property Type')
  const bedrooms = getSafeProperty(dictionary, ['filters', 'bedrooms'], 'Bedrooms')
  const location = getSafeProperty(dictionary, ['filters', 'location'], 'Location')
  const clear = getSafeProperty(dictionary, ['filters', 'clear'], 'Clear All')

  const placeholders = {
    minPrice: getSafeProperty(dictionary, ['filters', 'placeholders', 'minPrice'], 'Min'),
    maxPrice: getSafeProperty(dictionary, ['filters', 'placeholders', 'maxPrice'], 'Max'),
    anyType: getSafeProperty(dictionary, ['filters', 'placeholders', 'anyType'], 'Any Type'),
    anyBedrooms: getSafeProperty(dictionary, ['filters', 'placeholders', 'anyBedrooms'], 'Any'),
    enterLocation: getSafeProperty(dictionary, ['filters', 'placeholders', 'enterLocation'], 'City, area...'),
  }

  const types = {
    apartment: getSafeProperty(dictionary, ['filters', 'types', 'apartment'], 'Apartment'),
    house: getSafeProperty(dictionary, ['filters', 'types', 'house'], 'House'),
    condo: getSafeProperty(dictionary, ['filters', 'types', 'condo'], 'Condo'),
    villa: getSafeProperty(dictionary, ['filters', 'types', 'villa'], 'Villa'),
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined && value !== '')

  return (
    <motion.div
      variants={fadeIn}
      className="glass rounded-xl p-4 border border-white/20 shadow-elevation-2"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Price Range */}
        <motion.div 
          whileHover={{ y: -1 }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
            <DollarSign className="h-3 w-3" />
            {priceRange}
          </label>
          <div className="flex gap-1">
            <Input
              type="number"
              placeholder={placeholders.minPrice}
              value={filters.priceMin || ""}
              onChange={(e) => handleFilterChange("priceMin", Number(e.target.value) || undefined)}
              className="h-8 text-xs border border-white/30 bg-white/70 focus:bg-white focus:border-blue-400 rounded-lg"
            />
            <Input
              type="number"
              placeholder={placeholders.maxPrice}
              value={filters.priceMax || ""}
              onChange={(e) => handleFilterChange("priceMax", Number(e.target.value) || undefined)}
              className="h-8 text-xs border border-white/30 bg-white/70 focus:bg-white focus:border-blue-400 rounded-lg"
            />
          </div>
        </motion.div>

        {/* Property Type */}
        <motion.div 
          whileHover={{ y: -1 }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
            <Home className="h-3 w-3" />
            {propertyType}
          </label>
          <Select onValueChange={(value) => handleFilterChange("propertyType", value)}>
            <SelectTrigger className="h-8 text-xs border border-white/30 bg-white/70 focus:bg-white focus:border-blue-400 rounded-lg">
              <SelectValue placeholder={placeholders.anyType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment" className="text-xs">{types.apartment}</SelectItem>
              <SelectItem value="house" className="text-xs">{types.house}</SelectItem>
              <SelectItem value="condo" className="text-xs">{types.condo}</SelectItem>
              <SelectItem value="villa" className="text-xs">{types.villa}</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Bedrooms */}
        <motion.div 
          whileHover={{ y: -1 }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
            <Bed className="h-3 w-3" />
            {bedrooms}
          </label>
          <Select onValueChange={(value) => handleFilterChange("bedrooms", Number(value))}>
            <SelectTrigger className="h-8 text-xs border border-white/30 bg-white/70 focus:bg-white focus:border-blue-400 rounded-lg">
              <SelectValue placeholder={placeholders.anyBedrooms} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1" className="text-xs">1+</SelectItem>
              <SelectItem value="2" className="text-xs">2+</SelectItem>
              <SelectItem value="3" className="text-xs">3+</SelectItem>
              <SelectItem value="4" className="text-xs">4+</SelectItem>
              <SelectItem value="5" className="text-xs">5+</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Location */}
        <motion.div 
          whileHover={{ y: -1 }} 
          transition={{ type: "spring", stiffness: 300 }}
          className="space-y-2"
        >
          <label className="flex items-center gap-1 text-xs font-medium text-gray-700">
            <MapPin className="h-3 w-3" />
            {location}
          </label>
          <Input
            placeholder={placeholders.enterLocation}
            value={filters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value || undefined)}
            className="h-8 text-xs border border-white/30 bg-white/70 focus:bg-white focus:border-blue-400 rounded-lg"
          />
        </motion.div>

        {/* Clear Filters */}
        <div className="flex items-end">
          <motion.div 
            className="w-full" 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className={`w-full h-8 text-xs transition-all duration-300 ${
                hasActiveFilters 
                  ? 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300' 
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'
              }`}
              disabled={!hasActiveFilters}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              {clear}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 pt-3 border-t border-white/20"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-600">Active filters:</span>
            {filters.priceMin && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                Min: ${filters.priceMin.toLocaleString()}
              </span>
            )}
            {filters.priceMax && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                Max: ${filters.priceMax.toLocaleString()}
              </span>
            )}
            {filters.propertyType && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                {types[filters.propertyType as keyof typeof types]}
              </span>
            )}
            {filters.bedrooms && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                {filters.bedrooms}+ beds
              </span>
            )}
            {filters.location && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs">
                {filters.location}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
