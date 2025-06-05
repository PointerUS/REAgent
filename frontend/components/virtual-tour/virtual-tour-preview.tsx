"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Play, Eye, ArrowRight } from "lucide-react"
import { VirtualTourViewer } from "./virtual-tour-viewer"
import { properties } from "@/lib/data"
import type { Dictionary } from "@/lib/dictionaries"

interface VirtualTourPreviewProps {
  dictionary: Dictionary
}

export function VirtualTourPreview({ dictionary }: VirtualTourPreviewProps) {
  const [showTour, setShowTour] = useState(false)

  // Get the first property with a virtual tour
  const featuredProperty = properties.find((p) => p.virtualTour && p.featured)

  if (!featuredProperty?.virtualTour) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-16"
      >
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  className="flex items-center justify-center lg:justify-start gap-3 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Camera className="h-6 w-6 text-white" />
                  </motion.div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 text-sm font-medium">
                    {dictionary.virtualTour.preview.features.title}
                  </span>
                </motion.div>

                <motion.h3
                  className="text-2xl lg:text-3xl font-bold text-white mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2 }}
                >
                  {dictionary.virtualTour.preview.title}
                </motion.h3>

                <motion.p
                  className="text-white/90 text-lg mb-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4 }}
                >
                  {dictionary.virtualTour.preview.subtitle}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => setShowTour(true)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      size="lg"
                    >
                      <Play className="h-5 w-5 mr-2" />
                      {dictionary.virtualTour.preview.tryDemo}
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
                      size="lg"
                    >
                      <Eye className="h-5 w-5 mr-2" />
                      {dictionary.virtualTour.preview.viewAllTours}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Preview Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.8, duration: 0.8 }}
              >
                <div className="relative w-80 h-48 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://picsum.photos/400/240?random=40"
                    alt="Virtual Tour Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.button
                      onClick={() => setShowTour(true)}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Play className="h-8 w-8 text-white ml-1" />
                    </motion.button>
                  </motion.div>

                  {/* 360° Badge */}
                  <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Camera className="h-3 w-3" />
                    360°
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Demo Virtual Tour */}
      <VirtualTourViewer
        virtualTour={featuredProperty.virtualTour}
        isOpen={showTour}
        onClose={() => setShowTour(false)}
        propertyTitle={`${featuredProperty.title} - ${dictionary.virtualTour.preview.tryDemo}`}
      />
    </>
  )
}
