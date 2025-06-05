"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Share2,
  Heart,
  Maximize2,
  Grid3X3,
  Play,
  Pause,
  Camera,
  MapPin,
  Bed,
  Bath,
  Square,
  Info,
} from "lucide-react"
import { VirtualTourViewer } from "@/components/virtual-tour/virtual-tour-viewer"
import { useRouter } from "next/navigation"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyViewDetailsProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyViewDetails({ property, dictionary }: PropertyViewDetailsProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [showGrid, setShowGrid] = useState(false)
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  // Slideshow functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSlideshow && property.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
      }, 3000)
    }
    return () => clearInterval(interval)
  }, [isSlideshow, property.images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          router.back()
          break
        case "ArrowLeft":
          prevImage()
          break
        case "ArrowRight":
          nextImage()
          break
        case " ":
          e.preventDefault()
          setIsSlideshow(!isSlideshow)
          break
        case "g":
          setShowGrid(!showGrid)
          break
        case "i":
          setShowInfo(!showInfo)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isSlideshow, showGrid, showInfo, router])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    resetImageTransform()
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    resetImageTransform()
  }

  const resetImageTransform = () => {
    setZoom(1)
    setRotation(0)
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 3))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.5, 0.5))
  const handleRotate = () => setRotation((prev) => prev + 90)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </Button>
            <div className="text-white">
              <h1 className="text-lg font-semibold">{property.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                {property.location}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Image Counter */}
            <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {property.images.length}
            </div>

            {/* Control Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className={`text-white hover:bg-white/20 ${showGrid ? "bg-white/20" : ""}`}
            >
              <Grid3X3 className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSlideshow(!isSlideshow)}
              className={`text-white hover:bg-white/20 ${isSlideshow ? "bg-white/20" : ""}`}
            >
              {isSlideshow ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className={`text-white hover:bg-white/20 ${showInfo ? "bg-white/20" : ""}`}
            >
              <Info className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={`text-white hover:bg-white/20 ${isLiked ? "text-red-400" : ""}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            </Button>

            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Share2 className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        {/* Grid View */}
        <AnimatePresence>
          {showGrid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 z-20 p-8 overflow-y-auto"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                {property.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? "border-blue-400" : "border-transparent"
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index)
                      setShowGrid(false)
                      resetImageTransform()
                    }}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
                      {index + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Image Display */}
        <div className="relative h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-full max-h-full"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="lg"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/30"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 bg-black/30"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}
        </div>

        {/* Property Info Sidebar */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="absolute top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-lg border-l border-white/20 p-6 overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Price */}
                <div>
                  <div className="text-3xl font-bold text-blue-400">{formatPrice(property.price)}</div>
                  <Badge className="mt-2 bg-green-600">For Sale</Badge>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Bed className="h-5 w-5 text-white mx-auto mb-1" />
                    <div className="text-white font-semibold">{property.bedrooms}</div>
                    <div className="text-xs text-gray-300">Bedrooms</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Bath className="h-5 w-5 text-white mx-auto mb-1" />
                    <div className="text-white font-semibold">{property.bathrooms}</div>
                    <div className="text-xs text-gray-300">Bathrooms</div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <Square className="h-5 w-5 text-white mx-auto mb-1" />
                    <div className="text-white font-semibold">{property.sqft}</div>
                    <div className="text-xs text-gray-300">Sq Ft</div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-white font-semibold mb-2">Description</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{property.description}</p>
                </div>

                {/* Virtual Tour */}
                {property.virtualTour && (
                  <Button onClick={() => setShowVirtualTour(true)} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Virtual Tour
                  </Button>
                )}

                {/* Contact Actions */}
                <div className="space-y-3">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Contact Agent</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Schedule Viewing
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            className="text-white hover:bg-white/20"
          >
            <ZoomOut className="h-5 w-5" />
          </Button>

          <div className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">{Math.round(zoom * 100)}%</div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            className="text-white hover:bg-white/20"
          >
            <ZoomIn className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="sm" onClick={handleRotate} className="text-white hover:bg-white/20">
            <RotateCw className="h-5 w-5" />
          </Button>

          {property.virtualTour && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVirtualTour(true)}
              className="text-white hover:bg-white/20"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="text-center mt-2">
          <div className="text-xs text-gray-400">
            Press <kbd className="bg-white/20 px-1 rounded">ESC</kbd> to close •
            <kbd className="bg-white/20 px-1 rounded mx-1">←→</kbd> navigate •
            <kbd className="bg-white/20 px-1 rounded mx-1">Space</kbd> slideshow •
            <kbd className="bg-white/20 px-1 rounded mx-1">G</kbd> grid •
            <kbd className="bg-white/20 px-1 rounded mx-1">I</kbd> info
          </div>
        </div>
      </motion.div>

      {/* Image Thumbnails */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto bg-black/50 backdrop-blur-sm rounded-lg p-2"
      >
        {property.images.slice(0, 8).map((image, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              setCurrentImageIndex(index)
              resetImageTransform()
            }}
            className={`relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
              index === currentImageIndex ? "border-blue-400" : "border-white/30"
            }`}
          >
            <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
          </motion.button>
        ))}
        {property.images.length > 8 && (
          <div className="w-12 h-12 bg-black/50 rounded-md flex items-center justify-center text-white text-xs">
            +{property.images.length - 8}
          </div>
        )}
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
    </div>
  )
}
