"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Home, ArrowLeft, ArrowRight } from "lucide-react"
import { PanoramaViewer } from "./panorama-viewer"
import { HotspotOverlay } from "./hotspot-overlay"
import type { VirtualTour, Hotspot } from "@/lib/types"

interface VirtualTourViewerProps {
  virtualTour: VirtualTour
  isOpen: boolean
  onClose: () => void
  propertyTitle: string
}

export function VirtualTourViewer({ virtualTour, isOpen, onClose, propertyTitle }: VirtualTourViewerProps) {
  const [currentSceneId, setCurrentSceneId] = useState(virtualTour.initialScene)
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null)
  const [isSceneLoading, setIsSceneLoading] = useState(false)

  const currentScene = virtualTour.scenes.find((scene) => scene.id === currentSceneId)
  const currentSceneIndex = virtualTour.scenes.findIndex((scene) => scene.id === currentSceneId)

  const handleHotspotClick = useCallback((hotspot: Hotspot) => {
    if (hotspot.type === "navigation" && hotspot.targetScene) {
      setIsSceneLoading(true)
      setCurrentSceneId(hotspot.targetScene)
      setSelectedHotspot(null)
    } else if (hotspot.type === "info") {
      setSelectedHotspot(hotspot)
    }
  }, [])

  const handleSceneLoad = useCallback(() => {
    setIsSceneLoading(false)
  }, [])

  const goToNextScene = () => {
    const nextIndex = (currentSceneIndex + 1) % virtualTour.scenes.length
    setCurrentSceneId(virtualTour.scenes[nextIndex].id)
  }

  const goToPreviousScene = () => {
    const prevIndex = currentSceneIndex === 0 ? virtualTour.scenes.length - 1 : currentSceneIndex - 1
    setCurrentSceneId(virtualTour.scenes[prevIndex].id)
  }

  const resetToInitialScene = () => {
    setCurrentSceneId(virtualTour.initialScene)
  }

  if (!isOpen || !currentScene) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent p-4"
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold">{propertyTitle}</h2>
              <p className="text-sm opacity-75">{currentScene.name}</p>
            </div>
            <Button onClick={onClose} variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <X className="h-6 w-6" />
            </Button>
          </div>
        </motion.div>

        {/* Scene Description */}
        {currentScene.description && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="absolute top-20 left-4 z-10"
          >
            <Card className="bg-black/50 border-white/20">
              <CardContent className="p-3">
                <p className="text-white text-sm">{currentScene.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Navigation Controls */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="flex items-center gap-2 bg-black/50 rounded-full p-2">
            <Button
              onClick={goToPreviousScene}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={resetToInitialScene}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <Home className="h-4 w-4" />
            </Button>

            <Button
              onClick={goToNextScene}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Scene Navigation Menu */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-20 right-4 z-10"
        >
          <Card className="bg-black/50 border-white/20">
            <CardContent className="p-3">
              <h3 className="text-white text-sm font-medium mb-2">Rooms</h3>
              <div className="space-y-1">
                {virtualTour.scenes.map((scene) => (
                  <Button
                    key={scene.id}
                    onClick={() => setCurrentSceneId(scene.id)}
                    variant={scene.id === currentSceneId ? "secondary" : "ghost"}
                    size="sm"
                    className={`w-full justify-start text-xs ${
                      scene.id === currentSceneId ? "" : "text-white hover:bg-white/20"
                    }`}
                  >
                    {scene.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isSceneLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 flex items-center justify-center z-20"
            >
              <div className="text-center text-white">
                <motion.div
                  className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <p>Loading Scene...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 360° Viewer */}
        <div className="relative flex-1">
          <PanoramaViewer scene={currentScene} onHotspotClick={handleHotspotClick} onSceneLoad={handleSceneLoad} />

          {/* Hotspot Overlay */}
          <HotspotOverlay
            hotspots={currentScene.hotspots}
            onHotspotClick={handleHotspotClick}
            selectedHotspot={selectedHotspot}
            onCloseHotspot={() => setSelectedHotspot(null)}
          />
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-20 left-4 z-10"
        >
          <Card className="bg-black/50 border-white/20">
            <CardContent className="p-3">
              <p className="text-white text-xs opacity-75">
                Drag to look around • Click hotspots to navigate • Use controls to switch rooms
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
