"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Users, Home, ArrowRight, Play, Sparkles } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { fadeIn, staggerContainer } from "@/lib/animation"
import Image from "next/image"

interface HeroSectionProps {
  dictionary: Dictionary
}

// Safe property accessor with fallback
function getSafeProperty<T>(obj: any, path: string[], fallback: T): T {
  let current = obj
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return fallback
    }
  }
  return current ?? fallback
}

export function HeroSection({ dictionary }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  // Safe access to dictionary properties with fallbacks
  const title = getSafeProperty(dictionary, ['hero', 'title'], 'Find Your Perfect Properties')
  const subtitle = getSafeProperty(dictionary, ['hero', 'subtitle'], 'Discover and review premium properties in the best locations')
  const searchPlaceholder = getSafeProperty(dictionary, ['hero', 'searchPlaceholder'], 'Search properties...')
  const searchButton = getSafeProperty(dictionary, ['hero', 'searchButton'], 'Search')

  const stats = [
    { 
      icon: Home, 
      value: "500+", 
      label: getSafeProperty(dictionary, ['hero', 'stats', 'propertiesSold'], 'Listed')
    },
    { 
      icon: Users, 
      value: "1000+", 
      label: getSafeProperty(dictionary, ['hero', 'stats', 'happyClients'], 'Reviews')
    },
    { 
      icon: Star, 
      value: "4.9", 
      label: getSafeProperty(dictionary, ['hero', 'stats', 'averageRating'], 'Rating')
    },
  ]

  return (
    <section className="relative min-h-[90vh] pt-20 pb-16 overflow-hidden">
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 backdrop-blur-[2px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 flex flex-col lg:flex-row items-center">
        {/* Left Content */}
        <motion.div 
          variants={staggerContainer} 
          initial="hidden" 
          animate="visible" 
          className="flex-1 max-w-lg text-center lg:text-left mb-12 lg:mb-0"
        >
          <motion.div variants={fadeIn} custom={0}>
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Sparkles className="h-5 w-5 text-emerald-600 mr-3" />
              <span className="text-emerald-700 text-sm font-semibold tracking-wide uppercase bg-emerald-50/80 px-3 py-1 rounded-full">Premium Properties</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-800 via-emerald-700 to-teal-700 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
          </motion.div>
          
          <motion.div variants={fadeIn} custom={1}>
            <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
              {subtitle}
            </p>
          </motion.div>

          {/* Enhanced Search Form */}
          <motion.form 
            variants={fadeIn} 
            custom={2} 
            onSubmit={handleSearch}
            className="relative max-w-md mx-auto lg:mx-0 mb-8"
          >
            <div className="glass rounded-2xl p-2 shadow-elevation-3 border border-white/30">
              <div className="flex items-center">
                <Input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-slate-700 placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 pl-4 text-sm"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-4 py-2 shadow-elevation-2"
                >
                  <Search className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div variants={fadeIn} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl group px-6 py-3 shadow-elevation-2"
            >
              <span>Browse Properties</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="text-slate-700 hover:bg-emerald-50 border-emerald-200 rounded-2xl px-6 py-3 bg-white/80"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Virtual Tour
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={fadeIn}
            custom={4}
            className="flex justify-center lg:justify-start"
          >
            <div className="glass rounded-2xl shadow-elevation-2 p-4 flex gap-6 bg-white/80 backdrop-blur-md border border-white/40 max-w-md">
              {stats.map((stat, index) => (
                <div key={index} className="text-center px-3 border-r last:border-r-0 border-emerald-200">
                  <stat.icon className="h-4 w-4 mx-auto mb-2 text-emerald-600" />
                  <div className="text-slate-800 text-lg font-bold">{stat.value}</div>
                  <div className="text-slate-500 text-xs font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - Property Showcase */}
        <motion.div 
          variants={fadeIn}
          initial="hidden" 
          animate="visible"
          custom={1}
          className="flex-1 relative max-w-lg"
        >
          <div className="relative w-full h-96">
            {/* Main large property image - positioned center-left */}
            <motion.div
              whileHover={{ y: -8, scale: 1.03, rotate: -1 }}
              className="absolute top-0 left-0 w-64 h-48 rounded-2xl overflow-hidden shadow-elevation-4 transform -rotate-3 bg-white/95 backdrop-blur-sm border border-white/40 z-30"
            >
              <div className="w-full h-full relative">
                <img 
                  src="/images/property_2.png" 
                  alt="Modern Villa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 glass rounded-xl px-3 py-2 border border-white/30">
                  <span className="text-slate-700 text-sm font-semibold">$1.8M</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="glass rounded-lg px-2 py-1 border border-white/30">
                    <span className="text-slate-700 text-xs font-medium">Modern Villa</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Secondary image - positioned top-right */}
            <motion.div
              whileHover={{ y: -5, scale: 1.05, rotate: 1 }}
              className="absolute top-8 right-0 w-48 h-32 rounded-2xl overflow-hidden shadow-elevation-3 transform rotate-2 bg-white/90 backdrop-blur-sm border border-white/30 z-20"
            >
              <div className="w-full h-full relative">
                <img 
                  src="/images/property_1.png" 
                  alt="Luxury Penthouse"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 glass rounded-lg px-2 py-1 border border-white/30">
                  <span className="text-slate-700 text-xs font-semibold">$2.5M</span>
                </div>
              </div>
            </motion.div>

            {/* Third image - positioned bottom-right */}
            <motion.div
              whileHover={{ y: -5, scale: 1.04, rotate: -2 }}
              className="absolute bottom-8 right-8 w-44 h-28 rounded-2xl overflow-hidden shadow-elevation-3 transform rotate-1 bg-white/85 backdrop-blur-sm border border-white/30 z-10"
            >
              <div className="w-full h-full relative">
                <img 
                  src="/images/property_3.png" 
                  alt="Downtown Apartment"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 glass rounded-lg px-2 py-1 border border-white/30">
                  <span className="text-slate-700 text-xs font-semibold">$3.2M</span>
                </div>
              </div>
            </motion.div>

            {/* Small accent image - positioned bottom-left */}
            <motion.div
              whileHover={{ y: -3, scale: 1.1 }}
              className="absolute bottom-0 left-20 w-20 h-20 rounded-xl overflow-hidden shadow-elevation-2 transform -rotate-12 bg-white/80 backdrop-blur-sm border border-white/40 z-40"
            >
              <div className="w-full h-full relative">
                <img 
                  src="/images/property_1.png" 
                  alt="Property Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating elements for visual interest */}
            <motion.div 
              className="absolute top-4 left-48 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60"
              animate={{ 
                y: [-2, 2, -2],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-20 left-4 w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-50"
              animate={{ 
                y: [2, -2, 2],
                x: [-1, 1, -1],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Seamless section divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-12 fill-white/60">
          <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  )
}
