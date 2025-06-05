"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useComparison } from "@/contexts/comparison-context"
import { X, MapPin, Bed, Bath, Square, Car, Eye, Star } from "lucide-react"
import Image from "next/image"
import type { Property } from "@/lib/types"

interface ComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  properties: Property[]
}

export function ComparisonModal({ isOpen, onClose, properties }: ComparisonModalProps) {
  const { removeFromComparison } = useComparison()

  if (properties.length === 0) return null

  const comparisonRows = [
    {
      label: "Price",
      key: "price",
      render: (property: Property) => (
        <span className="text-lg font-bold text-blue-600">${property.price.toLocaleString()}</span>
      ),
    },
    {
      label: "Price per Sq Ft",
      key: "pricePerSqFt",
      render: (property: Property) => (
        <span className="text-gray-600">${Math.round(property.price / property.sqft)}/sq ft</span>
      ),
    },
    {
      label: "Bedrooms",
      key: "bedrooms",
      render: (property: Property) => (
        <div className="flex items-center gap-1">
          <Bed className="w-4 h-4 text-gray-500" />
          <span>{property.bedrooms}</span>
        </div>
      ),
    },
    {
      label: "Bathrooms",
      key: "bathrooms",
      render: (property: Property) => (
        <div className="flex items-center gap-1">
          <Bath className="w-4 h-4 text-gray-500" />
          <span>{property.bathrooms}</span>
        </div>
      ),
    },
    {
      label: "Square Feet",
      key: "sqft",
      render: (property: Property) => (
        <div className="flex items-center gap-1">
          <Square className="w-4 h-4 text-gray-500" />
          <span>{property.sqft.toLocaleString()}</span>
        </div>
      ),
    },
    {
      label: "Parking",
      key: "parking",
      render: (property: Property) => (
        <div className="flex items-center gap-1">
          <Car className="w-4 h-4 text-gray-500" />
          <span>{property.parking || "N/A"}</span>
        </div>
      ),
    },
    {
      label: "Property Type",
      key: "type",
      render: (property: Property) => <Badge variant="outline">{property.type}</Badge>,
    },
    {
      label: "Location",
      key: "location",
      render: (property: Property) => (
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm">{property.location}</span>
        </div>
      ),
    },
    {
      label: "Features",
      key: "features",
      render: (property: Property) => (
        <div className="flex gap-2">
          {property.virtualTour && (
            <Badge variant="secondary" className="text-xs">
              <Eye className="w-3 h-3 mr-1" />
              Virtual Tour
            </Badge>
          )}
          {property.featured && (
            <Badge variant="secondary" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
      ),
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Property Comparison ({properties.length} properties)</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 border-b font-medium w-48">Property Details</th>
                {properties.map((property) => (
                  <th key={property.id} className="p-4 border-b min-w-64">
                    <div className="space-y-3">
                      {/* Property Image */}
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => removeFromComparison(property.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Property Title */}
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">{property.title}</h3>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.key} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-700">{row.label}</td>
                  {properties.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      {row.render(property)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600">Compare up to 4 properties to make the best decision</p>
          <Button onClick={onClose}>Close Comparison</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
