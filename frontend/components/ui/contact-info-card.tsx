"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ContactInfoCardProps {
  icon: LucideIcon
  title: string
  content: string
  gradient: string
  bgColor: string
  index?: number
}

export function ContactInfoCard({
  icon: Icon,
  title,
  content,
  gradient,
  bgColor,
  index = 0,
}: ContactInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 10, scale: 1.02 }}
      className={`${bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          className={`flex items-center justify-center w-14 h-14 bg-gradient-to-r ${gradient} rounded-xl shadow-lg`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-7 w-7 text-white" />
        </motion.div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
          <p className="text-gray-700 leading-relaxed">{content}</p>
        </div>
      </div>
    </motion.div>
  )
} 