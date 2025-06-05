"use client"

import React from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface LogoProps {
  isScrolled?: boolean
  size?: "sm" | "md" | "lg"
  locale?: string
}

export function Logo({ isScrolled = false, size = "md", locale = "en" }: LogoProps) {
  // Determine text size based on the size prop
  const textSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl"
  }
  
  const iconSizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-7 h-7"
  }

  return (
    <Link href={`/${locale}`} className="flex items-center gap-1.5">
      <motion.div 
        className={`${isScrolled ? "text-blue-600" : "text-white"} flex items-center`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 36 36"
          className={iconSizeClasses[size]}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 3L33 12V30H24V22H12V30H3V12L18 3Z"
            fill="currentColor"
            className="opacity-90"
          />
          <path
            d="M18 8L28 14V25H21V17H15V25H8V14L18 8Z"
            fill={isScrolled ? "white" : "#3B82F6"}
            className={isScrolled ? "opacity-95" : "opacity-90"}
          />
          <circle 
            cx="22" 
            cy="14" 
            r="3" 
            fill={isScrolled ? "#3B82F6" : "white"} 
            className="animate-pulse" 
            style={{animationDuration: "3s"}}
          />
        </svg>
        <span className={`font-bold ${textSizeClasses[size]} ml-1.5 tracking-tight`}>
          <span>Review</span>
          <span className="text-blue-500">Nha</span>
          <span>That</span>
        </span>
      </motion.div>
    </Link>
  )
} 