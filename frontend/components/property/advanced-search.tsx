"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronDown, ChevronUp, Filter, Search } from "lucide-react"
import type { SearchFilters } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn } from "@/lib/animation"

interface AdvancedSearchProps {
  dictionary: Dictionary
  onSearch: (filters: SearchFilters) => void
}

export function AdvancedSearch({ dictionary, onSearch }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000])
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 5000])

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = () => {
    onSearch({
      ...filters,
      priceMin: priceRange[0] > 0 ? priceRange[0] : undefined,
      priceMax: priceRange[1] < 5000000 ? priceRange[1] : undefined,
      areaMin: areaRange[0] > 0 ? areaRange[0] : undefined,
      areaMax: areaRange[1] < 5000 ? areaRange[1] : undefined,
    })
  }

  const clearFilters = () => {
    setFilters({})
    setPriceRange([0, 5000000])
    setAreaRange([0, 5000])
    onSearch({})
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      variants={fadeIn}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
    >
      {/* Basic Search */}
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder={dictionary.filters?.placeholders?.enterLocation || "Enter location, property name, or ID"}
              value={filters.location || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} className="flex-1 md:flex-none">
              <Search className="h-4 w-4 mr-2" />
              {dictionary.filters?.apply || "Search"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-none"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Search */}
      {isExpanded && (
        <div className="p-4 bg-gray-50">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.priceRange || "Price Range"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2">
                  <Slider
                    value={[priceRange[0], priceRange[1]]}
                    min={0}
                    max={5000000}
                    step={50000}
                    onValueChange={(value) => setPriceRange([value[0], value[1]])}
                    className="mb-6"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>{dictionary.filters?.placeholders?.minPrice || "Min Price"}</Label>
                      <div className="text-lg font-medium">{formatPrice(priceRange[0])}</div>
                    </div>
                    <div className="text-center text-gray-400">—</div>
                    <div className="text-right">
                      <Label>{dictionary.filters?.placeholders?.maxPrice || "Max Price"}</Label>
                      <div className="text-lg font-medium">{formatPrice(priceRange[1])}</div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="property-type">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.propertyType || "Property Type"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {["apartment", "house", "condo", "villa", "townhouse", "land", "commercial", "office"].map((type) => (
                    <Button
                      key={type}
                      variant={filters.propertyType === type ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => handleFilterChange("propertyType", filters.propertyType === type ? undefined : type)}
                    >
                      {dictionary.filters?.types?.[type as keyof typeof dictionary.filters.types] || type}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bedrooms">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.bedrooms || "Bedrooms"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, "6+"].map((num) => (
                    <Button
                      key={num}
                      variant={filters.bedrooms === (num === "6+" ? 6 : Number(num)) ? "default" : "outline"}
                      onClick={() =>
                        handleFilterChange(
                          "bedrooms",
                          filters.bedrooms === (num === "6+" ? 6 : Number(num))
                            ? undefined
                            : num === "6+"
                            ? 6
                            : Number(num)
                        )
                      }
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bathrooms">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.bathrooms || "Bathrooms"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2 flex flex-wrap gap-2">
                  {[1, 2, 3, 4, "5+"].map((num) => (
                    <Button
                      key={num}
                      variant={filters.bathrooms === (num === "5+" ? 5 : Number(num)) ? "default" : "outline"}
                      onClick={() =>
                        handleFilterChange(
                          "bathrooms",
                          filters.bathrooms === (num === "5+" ? 5 : Number(num))
                            ? undefined
                            : num === "5+"
                            ? 5
                            : Number(num)
                        )
                      }
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="area">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.area || "Area (sq ft)"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2">
                  <Slider
                    value={[areaRange[0], areaRange[1]]}
                    min={0}
                    max={5000}
                    step={100}
                    onValueChange={(value) => setAreaRange([value[0], value[1]])}
                    className="mb-6"
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <Label>{dictionary.filters?.placeholders?.minArea || "Min Area"}</Label>
                      <div className="text-lg font-medium">
                        {areaRange[0]} {dictionary.properties?.sqft || "sq ft"}
                      </div>
                    </div>
                    <div className="text-center text-gray-400">—</div>
                    <div className="text-right">
                      <Label>{dictionary.filters?.placeholders?.maxArea || "Max Area"}</Label>
                      <div className="text-lg font-medium">
                        {areaRange[1]} {dictionary.properties?.sqft || "sq ft"}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="features">
              <AccordionTrigger className="text-lg font-medium">
                {dictionary.filters?.features || "Features"}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pb-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="balcony"
                      checked={!!filters.balcony}
                      onCheckedChange={(checked) => handleFilterChange("balcony", checked)}
                    />
                    <Label htmlFor="balcony">{dictionary.filters?.features_balcony || "Balcony"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="parking"
                      checked={!!filters.parking}
                      onCheckedChange={(checked) => handleFilterChange("parking", checked ? 1 : undefined)}
                    />
                    <Label htmlFor="parking">{dictionary.filters?.features_parking || "Parking"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="furnished"
                      checked={!!filters.furnished}
                      onCheckedChange={(checked) =>
                        handleFilterChange("furnished", checked ? "fully" : undefined)
                      }
                    />
                    <Label htmlFor="furnished">{dictionary.filters?.features_furnished || "Furnished"}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="virtualTour"
                      checked={!!filters.hasVirtualTour}
                      onCheckedChange={(checked) => handleFilterChange("hasVirtualTour", checked)}
                    />
                    <Label htmlFor="virtualTour">{dictionary.filters?.features_virtualTour || "Virtual Tour"}</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" onClick={clearFilters}>
              {dictionary.filters?.clear || "Clear All"}
            </Button>
            <Button onClick={handleSearch}>
              {dictionary.filters?.apply || "Apply Filters"}
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
} 