"use client"

import { Shield, Home, Clock, Award, Users, Headphones } from "lucide-react"
import { motion } from "framer-motion"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeIn, staggerContainer } from "@/lib/animation"

interface FeaturesSectionProps {
  dictionary: Dictionary
}

export function FeaturesSection({ dictionary }: FeaturesSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const features = [
    {
      icon: Shield,
      title: dictionary.features.expert.title,
      description: dictionary.features.expert.description,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50/50",
    },
    {
      icon: Home,
      title: dictionary.features.premium.title,
      description: dictionary.features.premium.description,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50/50",
    },
    {
      icon: Clock,
      title: dictionary.features.support.title,
      description: dictionary.features.support.description,
      color: "from-violet-500 to-violet-600",
      bgColor: "bg-violet-50/50",
    },
    {
      icon: Award,
      title: dictionary.features.awardWinning.title,
      description: dictionary.features.awardWinning.description,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50/50",
    },
    {
      icon: Users,
      title: dictionary.features.expertTeam.title,
      description: dictionary.features.expertTeam.description,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50/50",
    },
    {
      icon: Headphones,
      title: dictionary.features.personalizedService.title,
      description: dictionary.features.personalizedService.description,
      color: "from-rose-500 to-rose-600",
      bgColor: "bg-rose-50/50",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/80 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]"></div>
      </div>

      <motion.div
        ref={ref as any}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.div variants={fadeIn} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            ✨ Why Choose Us
          </motion.div>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {dictionary.features.title}
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: "60px" } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4"
          />
          <motion.p
            className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {dictionary.features.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              custom={index}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group h-full"
            >
              <div
                className={`${feature.bgColor} p-6 rounded-xl shadow-soft hover:shadow-elevation-2 transition-all duration-500 border border-white/60 h-full relative overflow-hidden backdrop-blur-sm`}
              >
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 shadow-soft relative z-10`}
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <feature.icon className="h-5 w-5 text-white" />
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Accent */}
                <motion.div 
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modern CTA Section */}
        <motion.div 
          variants={fadeIn} 
          custom={features.length} 
          className="text-center mt-12"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium text-sm shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 group">
              <span className="mr-2">{dictionary.features.learnMore}</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              >
                →
              </motion.span>
            </button>
          </motion.div>
          
          {/* Trust Indicators */}
          <motion.div 
            className="flex items-center justify-center gap-6 mt-8 text-xs text-gray-500"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Trusted by 10,000+ clients</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>5-star rating</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>24/7 support</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
