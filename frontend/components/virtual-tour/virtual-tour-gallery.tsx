"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Play, VolumeX, Volume2, Maximize, Clock, Eye, Sparkles } from "lucide-react"
import { VirtualTourViewer } from "./virtual-tour-viewer"
import { properties } from "@/lib/data"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeIn, staggerContainer } from "@/lib/animation"

interface VirtualTourGalleryProps {
  dictionary: Dictionary
}

export function VirtualTourGallery({ dictionary }: VirtualTourGalleryProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [selectedProperty, setSelectedProperty] = useState<(typeof properties)[0] | null>(null)
  const [hoveredProperty, setHoveredProperty] = useState<string | null>(null)

  const propertiesWithTours = properties.filter((p) => p.virtualTour)

  if (propertiesWithTours.length === 0) return null

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/80 relative overflow-hidden">
        {/* Modern Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
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
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="h-3 w-3 mr-1" />
              Virtual Experience
            </motion.div>
            
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8 }}
            >
              {dictionary.virtualTour.gallery.title}
            </motion.h2>
            
            <motion.div
              initial={{ width: 0 }}
              animate={isVisible ? { width: "60px" } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-4"
            />
            
            <motion.p
              className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {dictionary.virtualTour.gallery.subtitle}
            </motion.p>

            {/* Tour Stats */}
            <motion.div 
              className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-600"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-1">
                <Camera className="h-3 w-3 text-emerald-500" />
                <span>{propertiesWithTours.length} Virtual Tours</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3 text-teal-500" />
                <span>360° Experience</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Interactive</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {propertiesWithTours.map((property, index) => (
              <motion.div 
                key={property.id} 
                variants={fadeIn} 
                custom={index}
                onHoverStart={() => setHoveredProperty(property.id)}
                onHoverEnd={() => setHoveredProperty(null)}
                className="group"
              >
                <Card className="overflow-hidden glass border border-white/20 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 h-full">
                  {/* Image Container */}
                  <div className="relative h-40 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="h-full w-full"
                    >
                      <img
                        src={property.images[0] || "/placeholder.svg"}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </motion.div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Virtual Tour Badge */}
                    <div className="absolute top-2 left-2 glass-intense rounded-lg px-2 py-1 border border-white/20">
                      <div className="flex items-center gap-1">
                        <Camera className="h-3 w-3 text-emerald-400" />
                        <span className="text-white text-xs font-medium">360° Tour</span>
                      </div>
                    </div>

                    {/* Room Count */}
                    <div className="absolute top-2 right-2 glass-intense rounded-lg px-2 py-1 border border-white/20">
                      <span className="text-white text-xs">
                        {property.virtualTour?.scenes.length} Rooms
                      </span>
                    </div>

                    {/* Play Button Overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProperty === property.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={() => setSelectedProperty(property)}
                          className="glass-intense hover:bg-white/20 text-white border border-white/20 h-12 w-12 rounded-full p-0"
                        >
                          <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
                        </Button>
                      </motion.div>
                    </motion.div>

                    {/* Interactive Features */}
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <div className="glass-intense rounded-lg p-1 border border-white/20">
                        <Volume2 className="h-3 w-3 text-white" />
                      </div>
                      <div className="glass-intense rounded-lg p-1 border border-white/20">
                        <Maximize className="h-3 w-3 text-white" />
                      </div>
                    </div>

                    {/* Price Badge */}
                    <motion.div
                      className="absolute bottom-2 right-2 glass-intense rounded-lg px-2 py-1 border border-white/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-white text-sm font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                        }).format(property.price)}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-4 bg-white/50 backdrop-blur-sm">
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">{property.location}</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>5-10 min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        <span>HD Quality</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => setSelectedProperty(property)}
                        className="w-full h-8 text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg"
                      >
                        <Play className="h-3 w-3 mr-1" fill="currentColor" />
                        Start Virtual Tour
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Modern CTA Section */}
          <motion.div
            variants={fadeIn}
            custom={propertiesWithTours.length}
            className="text-center mt-12"
          >
            <div className="glass rounded-xl p-6 border border-white/20 max-w-md mx-auto">
              <div className="mb-4">
                <Camera className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Experience More</h3>
                <p className="text-xs text-gray-600">
                  Explore properties from the comfort of your home with our immersive 360° virtual tours
                </p>
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  className="text-xs px-4 py-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                >
                  View All Virtual Tours
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Virtual Tour Modal */}
      {selectedProperty?.virtualTour && (
        <VirtualTourViewer
          virtualTour={selectedProperty.virtualTour}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          propertyTitle={selectedProperty.title}
        />
      )}
    </>
  )
}
