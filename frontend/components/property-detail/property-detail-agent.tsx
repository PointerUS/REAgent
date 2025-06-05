"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle, Star, Award, Calendar, Users } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"

interface PropertyDetailAgentProps {
  dictionary: Dictionary
}

export function PropertyDetailAgent({ dictionary }: PropertyDetailAgentProps) {
  const agent = {
    name: "Nguyễn Thị Hương",
    title: "Chuyên Viên Bất Động Sản Cao Cấp",
    company: "Công Ty Bất Động Sản Premium",
    phone: "+84 (28) 123-4567",
    email: "huong.nguyen@premium-properties.vn",
    rating: 4.9,
    reviews: 127,
    yearsExperience: 8,
    propertiesSold: 245,
    image: "https://picsum.photos/150/150?random=agent",
    specialties: ["Căn Hộ Cao Cấp", "Biệt Thự", "Đầu Tư BĐS"],
    languages: ["Tiếng Việt", "English", "中文"],
  }

  const achievements = [
    { icon: Award, label: dictionary.agent?.topAgent || "Đại Lý Hàng Đầu 2024" },
    { icon: Star, label: dictionary.agent?.fiveStarReviews || "Đánh Giá 5 Sao" },
    { icon: Users, label: dictionary.agent?.clientSatisfaction || "Hài Lòng Khách Hàng" },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="text-xl">{dictionary.agent?.yourAgent || "Đại Lý Của Bạn"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Agent Profile */}
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src={agent.image || "/placeholder.svg"}
                alt={agent.name}
                fill
                className="object-cover rounded-full"
              />
              <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h3 className="font-bold text-lg">{agent.name}</h3>
            <p className="text-sm text-gray-600">{agent.title}</p>
            <p className="text-sm text-blue-600">{agent.company}</p>
          </div>

          {/* Rating */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(agent.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 font-semibold">{agent.rating}</span>
            </div>
            <p className="text-sm text-gray-600">{agent.reviews} đánh giá</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-bold text-lg text-blue-600">{agent.yearsExperience}</div>
              <div className="text-xs text-gray-600">{dictionary.agent?.yearsExperience || "Năm Kinh Nghiệm"}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-bold text-lg text-green-600">{agent.propertiesSold}</div>
              <div className="text-xs text-gray-600">{dictionary.agent?.propertiesSold || "BĐS Đã Bán"}</div>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Chuyên Môn</h4>
            <div className="flex flex-wrap gap-2">
              {agent.specialties.map((specialty, index) => (
                <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Ngôn Ngữ</h4>
            <div className="flex flex-wrap gap-2">
              {agent.languages.map((language, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-2"
              >
                <achievement.icon className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{achievement.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Contact Buttons */}
          <div className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              {dictionary.contact?.form?.callNow || "Gọi Ngay"}
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Gửi Email
            </Button>
            <Button variant="outline" className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Bắt Đầu Chat
            </Button>
          </div>

          {/* Schedule Viewing */}
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="font-semibold text-green-800">
                {dictionary.agent?.scheduleViewing || "Đặt Lịch Xem Nhà"}
              </span>
            </div>
            <p className="text-sm text-green-700 mb-3">
              {dictionary.agent?.available || "Có sẵn hôm nay và ngày mai để xem nhà"}
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              {dictionary.agent?.bookAppointment || "Đặt Lịch Hẹn"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
