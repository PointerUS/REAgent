"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Bed, Bath, Square, Eye, Camera, Heart, Share2, Star, MapPin } from "lucide-react"
import { VirtualTourViewer } from "../virtual-tour/virtual-tour-viewer"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn } from "@/lib/animation"
import { ComparisonButton } from "../comparison/comparison-button"
import Link from "next/link"
import { useParams } from "next/navigation"

interface PropertyCardProps {
  property: Property
  dictionary: Dictionary
  index?: number
}

export function PropertyCard({ property, dictionary, index = 0 }: PropertyCardProps) {
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const params = useParams()
  const locale = (params?.lang as string) || "en"

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.description,
        url: `${window.location.origin}/${locale}/property/${property.id}`,
      })
    }
  }

  return (
    <>
      <motion.div
        variants={fadeIn}
        custom={index}
        whileHover={{ y: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group h-full"
      >
        <Card className="overflow-hidden h-full glass border border-white/20 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-40 overflow-hidden">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.4 }} 
              className="h-full w-full"
            >
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Row Badges */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
              {property.featured && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="glass-intense rounded-lg px-2 py-1 border border-white/20"
                >
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400" fill="currentColor" />
                    <span className="text-white text-xs font-medium">Featured</span>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-1">
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  className="glass-intense rounded-lg p-1.5 border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart 
                    className={`h-3 w-3 transition-colors ${
                      isLiked ? 'text-red-500 fill-current' : 'text-white'
                    }`} 
                  />
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="glass-intense rounded-lg p-1.5 border border-white/20 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 className="h-3 w-3 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Virtual Tour Badge */}
            {property.virtualTour && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-2 right-2"
              >
                <Button
                  onClick={() => setShowVirtualTour(true)}
                  size="sm"
                  className="glass-intense hover:bg-white/20 text-white border border-white/20 h-6 px-2 text-xs"
                >
                  <Camera className="h-3 w-3 mr-1" />
                  360°
                </Button>
              </motion.div>
            )}

            {/* Price Badge */}
            <motion.div
              className="absolute bottom-2 left-2 glass-intense rounded-lg px-2 py-1 border border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white text-sm font-semibold">
                {formatPrice(property.price)}
              </span>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-4 bg-white/50 backdrop-blur-sm">
            {/* Title & Location */}
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="h-3 w-3" />
                <span className="line-clamp-1">{property.location}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
              {property.description}
            </p>

            {/* Property Features */}
            <div className="flex items-center justify-between mb-3 text-xs text-gray-600">
              <motion.div 
                className="flex items-center gap-1" 
                whileHover={{ color: "#3b82f6", scale: 1.05 }}
              >
                <Bed className="h-3 w-3" />
                <span>{property.bedrooms}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1" 
                whileHover={{ color: "#3b82f6", scale: 1.05 }}
              >
                <Bath className="h-3 w-3" />
                <span>{property.bathrooms}</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-1" 
                whileHover={{ color: "#3b82f6", scale: 1.05 }}
              >
                <Square className="h-3 w-3" />
                <span>{property.sqft}</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.div 
                className="flex-1" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Link href={`/${locale}/property/${property.id}`} className="w-full">
                  <Button className="w-full h-8 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ComparisonButton property={property} showText={false} />
              </motion.div>

              {property.virtualTour && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => setShowVirtualTour(true)}
                    variant="outline"
                    className="h-8 px-2 bg-emerald-50/50 border-emerald-200 text-emerald-700 hover:bg-emerald-100/50 rounded-lg"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          {/* Hover Effect Border */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
          />
        </Card>
      </motion.div>

      {/* Virtual Tour Modal */}
      {property.virtualTour && (
        <VirtualTourViewer
          virtualTour={property.virtualTour}
          isOpen={showVirtualTour}
          onClose={() => setShowVirtualTour(false)}
          propertyTitle={property.title}
        />
      )}
    </>
  )
}
