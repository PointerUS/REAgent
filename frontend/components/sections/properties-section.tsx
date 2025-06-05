"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PropertyCard } from "../property/property-card"
import { PropertyFilters } from "../property/property-filters"
import { properties } from "@/lib/data"
import type { Property, SearchFilters } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeIn, staggerContainer } from "@/lib/animation"
import { Home, Star, TrendingUp, Grid3X3, Filter } from "lucide-react"

interface PropertiesSectionProps {
  dictionary: Dictionary
}

export function PropertiesSection({ dictionary }: PropertiesSectionProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties.filter((p) => p.featured))
  const [showAll, setShowAll] = useState(false)
  const [filtersExpanded, setFiltersExpanded] = useState(false)

  const handleFilterChange = (filters: SearchFilters) => {
    let filtered = showAll ? properties : properties.filter((p) => p.featured)

    if (filters.priceMin) {
      filtered = filtered.filter((p) => p.price >= filters.priceMin!)
    }
    if (filters.priceMax) {
      filtered = filtered.filter((p) => p.price <= filters.priceMax!)
    }
    if (filters.propertyType) {
      filtered = filtered.filter((p) => p.type === filters.propertyType)
    }
    if (filters.bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.bedrooms!)
    }
    if (filters.location) {
      filtered = filtered.filter((p) => p.location.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    setFilteredProperties(filtered)
  }

  const handleShowAll = () => {
    setShowAll(true)
    setFilteredProperties(properties)
  }

  const featuredCount = properties.filter(p => p.featured).length
  const totalCount = properties.length

  return (
    <section id="properties" className="py-16 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/80 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        ref={ref as any}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Modern Header */}
        <motion.div variants={fadeIn} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <Home className="h-3 w-3 mr-1" />
            {showAll ? 'All Properties' : 'Featured Properties'}
          </motion.div>
          
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {dictionary.properties.title}
          </motion.h2>
          
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "60px" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4"
          />

          {/* Property Stats */}
          <motion.div 
            className="flex items-center justify-center gap-6 text-xs text-gray-600"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-amber-500" fill="currentColor" />
              <span>{featuredCount} Featured</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>{totalCount} Total</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Updated Daily</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Modern Filter Toggle & Filters */}
        <motion.div variants={fadeIn} custom={1} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => setFiltersExpanded(!filtersExpanded)}
                className="flex items-center gap-2 glass rounded-lg px-4 py-2 border border-white/20 text-xs font-medium hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="h-3 w-3" />
                {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
              </motion.button>
              
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Grid3X3 className="h-3 w-3" />
                <span>{filteredProperties.length} Properties</span>
              </div>
            </div>

            {/* Quick View Toggle */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setShowAll(false)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                  !showAll ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Featured
              </motion.button>
              <motion.button
                onClick={handleShowAll}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                  showAll ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All
              </motion.button>
            </div>
          </div>

          {/* Collapsible Filters */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: filtersExpanded ? "auto" : 0, 
              opacity: filtersExpanded ? 1 : 0 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <PropertyFilters dictionary={dictionary} onFilterChange={handleFilterChange} />
          </motion.div>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        >
          {filteredProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} dictionary={dictionary} index={index} />
          ))}
        </motion.div>

        {/* No Results State */}
        {filteredProperties.length === 0 && (
          <motion.div
            variants={fadeIn}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-xs text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
            <Button 
              onClick={() => handleFilterChange({})} 
              variant="outline" 
              className="text-xs px-4 py-2"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Modern Load More Section */}
        {!showAll && filteredProperties.length > 0 && (
          <motion.div 
            variants={fadeIn} 
            custom={filteredProperties.length + 1} 
            className="text-center"
          >
            <div className="glass rounded-xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-2">
                  Showing {filteredProperties.length} of {totalCount} properties
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <motion.div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(filteredProperties.length / totalCount) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  onClick={handleShowAll} 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs px-6 py-2 rounded-lg"
                >
                  <span className="mr-2">{dictionary.properties.viewAll}</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    →
                  </motion.span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
