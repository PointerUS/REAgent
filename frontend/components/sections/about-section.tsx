"use client"

import { motion } from "framer-motion"
import { CheckCircle, Users, Award, TrendingUp, MapPin, Star, Shield, Clock, Heart, Building } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { slideInLeft, slideInRight } from "@/lib/animation"

interface AboutSectionProps {
  dictionary: Dictionary
}

export function AboutSection({ dictionary }: AboutSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const achievements = [
    { icon: Users, value: "15+", label: dictionary.about.achievements.yearsExperience, color: "text-blue-600 bg-blue-100" },
    { icon: Award, value: "500+", label: dictionary.about.achievements.propertiesSold, color: "text-emerald-600 bg-emerald-100" },
    { icon: TrendingUp, value: "98%", label: dictionary.about.achievements.clientSatisfaction, color: "text-amber-600 bg-amber-100" },
  ]

  const highlights = [
    { text: dictionary.about.highlights.licensed, icon: Shield },
    { text: dictionary.about.highlights.multilingual, icon: Users },
    { text: dictionary.about.highlights.virtualTour, icon: Building },
    { text: dictionary.about.highlights.support247, icon: Clock },
    { text: dictionary.about.highlights.marketAnalysis, icon: TrendingUp },
    { text: dictionary.about.highlights.personalizedService, icon: Heart },
  ]

  const stats = [
    { value: "2M+", label: "Property Views", icon: Building },
    { value: "50+", label: "Properties Listed", icon: MapPin },
    { value: "4.9★", label: "Client Rating", icon: Star },
  ]

  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 relative overflow-hidden"
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div ref={ref as any} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div initial="hidden" animate={isVisible ? "visible" : "hidden"} variants={slideInLeft}>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6 }}
              >
                <Building className="h-3 w-3 mr-1" />
                About Our Company
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight">
                {dictionary.about.title}
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                animate={isVisible ? { width: "60px" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"
              />
            </motion.div>

            <motion.p
              className="text-sm text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              {dictionary.about.description}
            </motion.p>

            {/* Compact Stats Grid */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-lg p-3 border border-white/20 text-center group hover:shadow-elevation-2 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2 group-hover:bg-blue-200 transition-colors">
                    <stat.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Achievements Grid - Compact */}
            <motion.div
              className="grid grid-cols-3 gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="glass rounded-lg p-3 text-center border border-white/20 group hover:shadow-elevation-2 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 ${achievement.color} rounded-lg mx-auto mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <achievement.icon className="h-4 w-4" />
                  </motion.div>
                  <motion.h3
                    className="text-lg font-bold text-gray-900 mb-1"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {achievement.value}
                  </motion.h3>
                  <p className="text-xs text-gray-600 leading-tight">{achievement.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Highlights - Compact Grid */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 1.2 }}
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-3">{dictionary.about.highlights.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded-lg glass border border-white/20 group hover:shadow-elevation-1 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                      <highlight.icon className="h-3 w-3 text-emerald-600" />
                    </div>
                    <span className="text-xs text-gray-700 font-medium">{highlight.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Modern Values Section */}
            <motion.div
              className="mt-8 glass rounded-xl p-4 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.5 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <h4 className="text-sm font-semibold text-gray-900">Our Values</h4>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                {dictionary.about.values}
              </p>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={slideInRight}
          >
            {/* Main Image Container */}
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-elevation-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-80 lg:h-96">
                <img
                  src="https://picsum.photos/600/500?random=2"
                  alt="Real Estate Team"
                  className="w-full h-full object-cover"
                />
                
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Glass Info Card */}
                <motion.div
                  className="absolute bottom-4 left-4 right-4 glass-intense rounded-lg p-4 border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1.6 }}
                >
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Expert Team</h4>
                      <p className="text-xs opacity-90">Professional Real Estate Agents</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">15+</div>
                      <div className="text-xs opacity-90">Years</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              className="absolute -top-4 -left-4 glass rounded-lg p-3 border border-white/20 shadow-elevation-2"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={isVisible ? { opacity: 1, scale: 1, rotate: -5 } : { opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ delay: 1.8 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-900">Licensed & Insured</span>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 glass rounded-lg p-3 border border-white/20 shadow-elevation-2"
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={isVisible ? { opacity: 1, scale: 1, rotate: 5 } : { opacity: 0, scale: 0.8, rotate: 10 }}
              transition={{ delay: 2 }}
              whileHover={{ rotate: 0, scale: 1.05 }}
            >
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span className="text-sm font-bold">4.9</span>
                </div>
                <p className="text-xs text-gray-600">Client Rating</p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="absolute top-4 right-4 space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 1.4 }}
            >
              <div className="glass-intense rounded-lg p-2 border border-white/20">
                <Award className="h-4 w-4 text-amber-400" />
              </div>
              <div className="glass-intense rounded-lg p-2 border border-white/20">
                <Shield className="h-4 w-4 text-blue-400" />
              </div>
            </motion.div>

            {/* Background Decoration */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-100/30 to-indigo-100/30 rounded-xl -z-10 blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ delay: 1.2 }}
            />
          </motion.div>
        </div>

        {/* Modern CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 2.2 }}
        >
          <div className="glass rounded-xl p-6 border border-white/20 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-xl font-bold text-gray-900">Ready to Start?</div>
                <div className="text-xs text-gray-600">Let's find your dream property</div>
              </div>
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-elevation-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us Today
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
