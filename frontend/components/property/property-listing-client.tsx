"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { fadeIn, containerVariants } from "@/lib/animation"
import { PropertyCard } from "@/components/property/property-card"
import { AdvancedSearch } from "@/components/property/advanced-search"
import { PropertySort } from "@/components/property/property-sort"
import { PropertyPagination } from "@/components/property/property-pagination"
import type { Property, SearchFilters } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyListingClientProps {
  properties: Property[]
  dictionary: Dictionary
}

export function PropertyListingClient({ properties, dictionary }: PropertyListingClientProps) {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [displayedProperties, setDisplayedProperties] = useState(properties)
  const [paginatedProperties, setPaginatedProperties] = useState(properties)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(9)

  const handleFilterChange = (filters: SearchFilters) => {
    let results = [...properties]

    // Price filter
    if (filters.priceMin) {
      results = results.filter((property) => property.price >= (filters.priceMin || 0))
    }
    if (filters.priceMax) {
      results = results.filter((property) => property.price <= (filters.priceMax || Infinity))
    }

    // Property type filter
    if (filters.propertyType) {
      results = results.filter((property) => property.type === filters.propertyType)
    }

    // Bedrooms filter
    if (filters.bedrooms) {
      results = results.filter((property) => property.bedrooms >= (filters.bedrooms || 0))
    }

    // Bathrooms filter
    if (filters.bathrooms) {
      results = results.filter((property) => property.bathrooms >= (filters.bathrooms || 0))
    }

    // Location filter
    if (filters.location) {
      results = results.filter((property) =>
        property.location.toLowerCase().includes(filters.location?.toLowerCase() || "")
      )
    }

    // Area filter
    if (filters.areaMin) {
      results = results.filter((property) => property.sqft >= (filters.areaMin || 0))
    }
    if (filters.areaMax) {
      results = results.filter((property) => property.sqft <= (filters.areaMax || Infinity))
    }

    // Feature filters
    if (filters.balcony) {
      results = results.filter((property) => property.balcony === true)
    }
    if (filters.parking) {
      results = results.filter((property) => (property.parking || 0) >= filters.parking!)
    }
    if (filters.furnished) {
      results = results.filter((property) => property.furnished === filters.furnished)
    }
    if (filters.hasVirtualTour) {
      results = results.filter((property) => property.virtualTour !== undefined)
    }

    setFilteredProperties(results)
    setDisplayedProperties(results)
    updatePaginatedResults(results, 1, pageSize)
  }

  const handleSort = (sortedProperties: Property[]) => {
    setDisplayedProperties(sortedProperties)
    updatePaginatedResults(sortedProperties, currentPage, pageSize)
  }

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
    updatePaginatedResults(displayedProperties, page, size)
  }

  const updatePaginatedResults = (properties: Property[], page: number, size: number) => {
    const startIndex = (page - 1) * size
    const endIndex = Math.min(startIndex + size, properties.length)
    setPaginatedProperties(properties.slice(startIndex, endIndex))
  }

  return (
    <>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <AdvancedSearch dictionary={dictionary} onSearch={handleFilterChange} />
      </motion.div>
      
      {filteredProperties.length > 0 && (
        <PropertySort 
          dictionary={dictionary} 
          onSort={handleSort} 
          properties={filteredProperties} 
        />
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {paginatedProperties.length > 0 ? (
          paginatedProperties.map((property, index) => (
            <PropertyCard key={property.id} property={property} dictionary={dictionary} index={index} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium text-gray-900">
              {dictionary.properties?.noResults || "No properties match your search criteria."}
            </h3>
            <p className="mt-2 text-gray-600">
              {dictionary.properties?.tryDifferentFilters || "Please try different filters or clear your search."}
            </p>
          </div>
        )}
      </motion.div>

      {filteredProperties.length > 0 && (
        <PropertyPagination
          dictionary={dictionary}
          totalItems={filteredProperties.length}
          onPageChange={handlePageChange}
        />
      )}
    </>
  )
} 