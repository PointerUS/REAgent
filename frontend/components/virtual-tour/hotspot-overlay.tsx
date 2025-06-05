"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Info, X } from "lucide-react"
import type { Hotspot } from "@/lib/types"

interface HotspotOverlayProps {
  hotspots: Hotspot[]
  onHotspotClick: (hotspot: Hotspot) => void
  selectedHotspot?: Hotspot | null
  onCloseHotspot: () => void
}

export function HotspotOverlay({ hotspots, onHotspotClick, selectedHotspot, onCloseHotspot }: HotspotOverlayProps) {
  const getHotspotIcon = (type: string) => {
    switch (type) {
      case "navigation":
        return <ArrowRight className="h-4 w-4" />
      case "info":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getHotspotColor = (type: string) => {
    switch (type) {
      case "navigation":
        return "bg-green-500 hover:bg-green-600"
      case "info":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <>
      {/* Hotspot Buttons */}
      {hotspots.map((hotspot) => (
        <motion.div
          key={hotspot.id}
          className="absolute"
          style={{
            left: `${50 + hotspot.position.x * 20}%`,
            top: `${50 - hotspot.position.y * 20}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <Button
              onClick={() => onHotspotClick(hotspot)}
              className={`w-12 h-12 rounded-full ${getHotspotColor(hotspot.type)} text-white shadow-lg`}
              size="icon"
            >
              {getHotspotIcon(hotspot.type)}
            </Button>
          </motion.div>
        </motion.div>
      ))}

      {/* Hotspot Info Modal */}
      <AnimatePresence>
        {selectedHotspot && selectedHotspot.type === "info" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={onCloseHotspot}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="max-w-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold">{selectedHotspot.title}</h3>
                    <Button onClick={onCloseHotspot} variant="ghost" size="icon" className="h-6 w-6">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {selectedHotspot.description && <p className="text-gray-600 mb-4">{selectedHotspot.description}</p>}
                  {selectedHotspot.mediaUrl && (
                    <img
                      src={selectedHotspot.mediaUrl || "/placeholder.svg"}
                      alt={selectedHotspot.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
