"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Heart, Share2, Camera, Maximize2, MapPin, Eye, Video, Star } from "lucide-react"
import { VirtualTourViewer } from "@/components/virtual-tour/virtual-tour-viewer"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailHeroProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailHero({ property, dictionary }: PropertyDetailHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullscreen, setShowFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <div className="relative h-[60vh] lg:h-[65vh] bg-black overflow-hidden">
        {/* Main Image Carousel */}
        <div className="relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 glass-intense hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 border border-white/20 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 glass-intense hover:bg-white/20 text-white p-2 rounded-full transition-all duration-300 border border-white/20 z-10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </>
          )}

          {/* Modern Image Counter */}
          <div className="absolute bottom-3 left-3 glass-intense text-white px-2 py-1 rounded-lg text-xs border border-white/20">
            {currentImageIndex + 1} / {property.images.length}
          </div>

          {/* Compact Action Buttons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-lg transition-all duration-300 border border-white/20 ${
                isLiked ? "bg-red-500/90 text-white" : "glass-intense text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 glass-intense hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFullscreen(true)}
              className="p-2 glass-intense hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
            >
              <Maximize2 className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Compact Virtual Tour Button */}
          {property.virtualTour && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-3 right-3"
            >
              <Button
                onClick={() => setShowVirtualTour(true)}
                className="glass-intense hover:bg-white/20 text-white border border-white/20 h-8 text-xs px-3"
              >
                <Camera className="h-3 w-3 mr-1" />
                360° Tour
              </Button>
            </motion.div>
          )}

          {/* Modern Property Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="glass-intense text-white border border-white/20 text-xs px-2 py-1">
              For Sale
            </Badge>
          </div>

          {/* Additional Feature Badges */}
          <div className="absolute top-12 left-3 flex flex-col gap-1">
            {property.virtualTour && (
              <div className="glass-intense rounded-lg px-2 py-1 border border-white/20">
                <div className="flex items-center gap-1">
                  <Video className="h-3 w-3 text-emerald-400" />
                  <span className="text-white text-xs">Virtual Tour</span>
                </div>
              </div>
            )}
            <div className="glass-intense rounded-lg px-2 py-1 border border-white/20">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400" />
                <span className="text-white text-xs">Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Property Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="glass rounded-xl p-4 lg:p-6 border border-white/20"
            >
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div className="text-white">
                  <h1 className="text-xl lg:text-2xl font-semibold mb-2 tracking-tight">{property.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm lg:text-sm">{property.location}</span>
                  </div>
                  
                  {/* Compact Property Stats */}
                  <div className="flex items-center gap-4 text-xs lg:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{property.bedrooms}</span>
                      <span className="text-white/80">beds</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{property.bathrooms}</span>
                      <span className="text-white/80">baths</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{property.sqft}</span>
                      <span className="text-white/80">sqft</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-400 mb-1">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-xs text-white/80">
                    ${Math.round(property.price / property.sqft)}/sqft
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Compact Image Thumbnails */}
        <div className="absolute bottom-20 lg:bottom-24 left-4 lg:left-6 flex gap-1 max-w-xs overflow-x-auto">
          {property.images.slice(0, 5).map((image, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                index === currentImageIndex ? "border-emerald-400 shadow-lg" : "border-white/30"
              }`}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </motion.button>
          ))}
          {property.images.length > 5 && (
            <div className="w-12 h-12 lg:w-14 lg:h-14 glass-intense rounded-lg flex items-center justify-center text-white text-xs border border-white/20">
              +{property.images.length - 5}
            </div>
          )}
        </div>

        {/* View Counter */}
        <div className="absolute bottom-20 lg:bottom-24 right-4 lg:right-6 glass-intense rounded-lg px-2 py-1 border border-white/20">
          <div className="flex items-center gap-1 text-white text-xs">
            <Eye className="h-3 w-3" />
            <span>1.2k views</span>
          </div>
        </div>
      </div>

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
