"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Square, Car, Calendar, Home, TrendingUp, Shield, Zap, Compass, Star, Building, MapPin, Clock } from "lucide-react"
import type { Property } from "@/lib/types"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailInfoProps {
  property: Property
  dictionary: Dictionary
}

export function PropertyDetailInfo({ property, dictionary }: PropertyDetailInfoProps) {
  const propertyDetails = [
    { icon: Bed, label: dictionary.properties.bedrooms, value: property.bedrooms, color: "text-blue-600 bg-blue-100" },
    { icon: Bath, label: dictionary.properties.bathrooms, value: property.bathrooms, color: "text-emerald-600 bg-emerald-100" },
    { icon: Square, label: dictionary.properties.sqft, value: `${property.sqft} m²`, color: "text-purple-600 bg-purple-100" },
    { icon: Car, label: "Parking Spaces", value: 2, color: "text-amber-600 bg-amber-100" },
    { icon: Calendar, label: "Year Built", value: 2019, color: "text-indigo-600 bg-indigo-100" },
    { icon: Home, label: "Property Type", value: property.type, color: "text-rose-600 bg-rose-100" },
  ]

  // Vietnamese market specific details
  const vietnameseDetails = [
    {
      icon: Building,
      label: "Legal Status",
      value: "Red Book",
      color: "text-emerald-600"
    },
    { icon: Compass, label: "Direction", value: "Đông Nam", color: "text-blue-600" },
    {
      icon: Star,
      label: "Feng Shui",
      value: "Favorable",
      color: "text-amber-600"
    },
  ]

  const highlights = [
    {
      icon: TrendingUp,
      title: "Investment Potential",
      description: "Khu vực tăng trưởng cao với mức tăng giá 12% hàng năm",
      color: "text-emerald-600 bg-emerald-100"
    },
    {
      icon: Shield,
      title: "Move-in Ready",
      description: "Vừa được cải tạo với nội thất hiện đại",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description: "Bao gồm pin mặt trời và tính năng nhà thông minh",
      color: "text-amber-600 bg-amber-100"
    },
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price * 25000) // Convert USD to VND approximation
  }

  const formatPricePerSqm = (price: number, sqft: number) => {
    const priceVND = price * 25000
    const pricePerSqm = priceVND / sqft
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(pricePerSqm)
  }

  return (
    <div className="space-y-4">
      {/* Property Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <CardTitle className="text-lg font-semibold">
              Property Overview
            </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Property Details Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {propertyDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-lg p-3 border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                  whileHover={{ y: -1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 ${detail.color} rounded-lg group-hover:scale-110 transition-transform`}>
                      <detail.icon className="h-3 w-3" />
                    </div>
                    <div className="text-xs text-gray-600 font-medium">{detail.label}</div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{detail.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Vietnamese Market Specific Info */}
            <div className="glass rounded-lg p-4 border border-red-200/50 bg-red-50/50">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-4 w-4 text-red-600" />
                <h4 className="text-sm font-semibold text-red-800">Thông Tin Thị Trường Việt Nam</h4>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {vietnameseDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 glass rounded-lg border border-white/20">
                    <div className="p-1 bg-white rounded-lg">
                      <detail.icon className={`h-3 w-3 ${detail.color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 font-medium">{detail.label}</div>
                      <div className="text-xs font-semibold text-gray-900">{detail.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Price Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="glass rounded-lg p-3 border border-emerald-200/50 bg-emerald-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="text-xs text-gray-600 font-medium">Giá Bán</div>
                </div>
                <div className="text-lg font-bold text-emerald-600">{formatPrice(property.price)}</div>
              </div>
              <div className="glass rounded-lg p-3 border border-blue-200/50 bg-blue-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="text-xs text-gray-600 font-medium">
                    Price per m²
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {formatPricePerSqm(property.price, property.sqft)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Property Description */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">
                {dictionary.propertyDetail?.aboutProperty || "About This Property"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-gray-700 leading-relaxed">{property.description}</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Bất động sản tuyệt đẹp này mang đến sự kết hợp hoàn hảo giữa sự sang trọng hiện đại và cuộc sống thoải
              mái. Tọa lạc tại một trong những khu phố được ưa chuộng nhất của thành phố, nó có các hoàn thiện cao cấp,
              phòng rộng rãi và thiết kế mở hoàn hảo cho cả giải trí và sinh hoạt hàng ngày.
            </p>
            
            {/* Key Features */}
            <div className="glass rounded-lg p-3 border border-white/20 bg-gray-50/50">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-500" />
                <h4 className="text-sm font-semibold text-gray-900">Key Features</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Renovated Kitchen</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Hardwood Floors</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Energy Efficient</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                  <span>Modern Bathrooms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Property Highlights */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">
                {dictionary.propertyDetail?.highlights || "Property Highlights"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="glass rounded-lg p-3 border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 ${highlight.color} rounded-lg group-hover:scale-110 transition-transform`}>
                      <highlight.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">{highlight.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Property History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="glass border border-white/20 shadow-elevation-2">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <CardTitle className="text-lg font-semibold">
                {dictionary.propertyDetail?.history || "Property History"}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center glass rounded-lg p-3 border border-white/20">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {dictionary.propertyDetail?.listed || "Listed for Sale"}
                  </div>
                  <div className="text-xs text-gray-600">Current status</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-emerald-600">{formatPrice(property.price)}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Clock className="h-3 w-3" />
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center glass rounded-lg p-3 border border-white/20">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Last Sold</div>
                  <div className="text-xs text-gray-600">Previous transaction</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-600">
                    {formatPrice(property.price * 0.85)}
                  </div>
                  <div className="text-xs text-gray-600">2021</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
