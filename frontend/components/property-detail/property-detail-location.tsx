"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  MapPin,
  School,
  ShoppingBag,
  Utensils,
  Hospital,
  Trees,
  Building2,
  Coffee,
} from "lucide-react"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailLocationProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailLocation({ property, dictionary }: PropertyDetailLocationProps) {
  const vietnameseNearbyPlaces = [
    { icon: School, name: "Trường Tiểu Học Nguyễn Du", distance: "300m", rating: 4.8, type: "education" },
    { icon: School, name: "Trường THPT Lê Quý Đôn", distance: "800m", rating: 4.6, type: "education" },
    { icon: ShoppingBag, name: "Chợ Bến Thành", distance: "1.2km", rating: 4.5, type: "shopping" },
    { icon: Utensils, name: "Khu Phố Ẩm Thực Nguyễn Thiệp", distance: "500m", rating: 4.7, type: "food" },
    { icon: Hospital, name: "Bệnh Viện Chợ Rẫy", distance: "2.1km", rating: 4.4, type: "healthcare" },
    { icon: Trees, name: "Công Viên Tao Đàn", distance: "700m", rating: 4.9, type: "recreation" },
    { icon: Building2, name: "Chùa Ngọc Hoàng", distance: "1.5km", rating: 4.8, type: "cultural" },
    { icon: Coffee, name: "Phố Cà Phê Nguyễn Huệ", distance: "600m", rating: 4.6, type: "lifestyle" },
  ]

  const getTypeColor = (type: string) => {
    const colors = {
      education: "bg-blue-50 text-blue-700",
      shopping: "bg-purple-50 text-purple-700",
      food: "bg-orange-50 text-orange-700",
      healthcare: "bg-red-50 text-red-700",
      recreation: "bg-green-50 text-green-700",
      cultural: "bg-yellow-50 text-yellow-700",
      lifestyle: "bg-pink-50 text-pink-700",
    }
    return colors[type as keyof typeof colors] || "bg-gray-50 text-gray-700"
  }

  return (
    <div className="space-y-4">
      {/* Nearby Places - Vietnamese Context */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">Nearby Places</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {vietnameseNearbyPlaces.map((place, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between glass rounded-lg p-3 border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 text-white rounded-lg group-hover:scale-110 transition-transform">
                      <place.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{place.name}</h3>
                      <p className="text-xs text-gray-600">{place.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(place.type)}`}>
                      {place.type === "education"
                        ? "Giáo dục"
                        : place.type === "shopping"
                          ? "Mua sắm"
                          : place.type === "food"
                            ? "Ẩm thực"
                            : place.type === "healthcare"
                              ? "Y tế"
                              : place.type === "recreation"
                                ? "Giải trí"
                                : place.type === "cultural"
                                  ? "Văn hóa"
                                  : "Tiện ích"}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="text-yellow-500 text-sm">★</div>
                      <span className="text-xs font-semibold text-gray-900">{place.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Map Placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">Map View</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48 glass rounded-lg flex items-center justify-center border border-white/20">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-1">Bản đồ tương tác sẽ được hiển thị ở đây</p>
                <p className="text-xs text-gray-400">Hiển thị vị trí bất động sản và các tiện ích lân cận</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
