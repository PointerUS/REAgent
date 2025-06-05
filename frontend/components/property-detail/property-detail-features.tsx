"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Wifi,
  Car,
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Zap,
  Snowflake,
  Flame,
  Camera,
  Lock,
  Utensils,
} from "lucide-react"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailFeaturesProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailFeatures({ property, dictionary }: PropertyDetailFeaturesProps) {
  const interiorFeatures = [
    {
      icon: Zap,
      name: "Smart Home System",
      description: "Hệ thống chiếu sáng và điều khiển khí hậu tự động",
    },
    {
      icon: Utensils,
      name: "Gourmet Kitchen",
      description: "Thiết bị cao cấp và mặt bàn đá granite",
    },
    {
      icon: Flame,
      name: "Fireplace",
      description: "Lò sưởi gas trong phòng khách",
    },
    {
      icon: Snowflake,
      name: "Central Air",
      description: "Hệ thống HVAC hai vùng",
    },
    {
      icon: Wifi,
      name: "High-Speed Internet",
      description: "Sẵn sàng cáp quang",
    },
    {
      icon: Lock,
      name: "Security System",
      description: "Giám sát 24/7 bao gồm",
    },
  ]

  const exteriorFeatures = [
    {
      icon: Car,
      name: "2-Car Garage",
      description: "Gắn liền với không gian lưu trữ",
    },
    {
      icon: Trees,
      name: "Landscaped Yard",
      description: "Cảnh quan chuyên nghiệp với tưới tiêu",
    },
    {
      icon: Waves,
      name: "Swimming Pool",
      description: "Hồ bơi có sưởi với spa",
    },
    {
      icon: Shield,
      name: "Gated Community",
      description: "An ninh và lễ tân 24/7",
    },
    {
      icon: Dumbbell,
      name: "Fitness Center",
      description: "Phòng gym cộng đồng và studio yoga",
    },
    {
      icon: Camera,
      name: "Security Cameras",
      description: "Hệ thống giám sát chu vi",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Interior Features */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">
                Interior Features
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {interiorFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-lg p-3 border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{feature.name}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exterior Features */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">
                Exterior Features
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exteriorFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-lg p-3 border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                      <feature.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{feature.name}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
