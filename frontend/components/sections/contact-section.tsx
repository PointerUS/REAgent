"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Sparkles } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { fadeIn, staggerContainer } from "@/lib/animation"

interface ContactSectionProps {
  dictionary: Dictionary
}

export function ContactSection({ dictionary }: ContactSectionProps) {
  const { ref, isVisible } = useScrollAnimation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form submitted:", formData)

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 5000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
  
  const title = getSafeProperty(dictionary, ['contact', 'title'], 'Contact Us')
  const subtitle = getSafeProperty(dictionary, ['contact', 'subtitle'], 'Get in touch with our real estate experts')
  
  const form = {
    title: getSafeProperty(dictionary, ['contact', 'form', 'title'], 'Send us a Message'),
    subtitle: getSafeProperty(dictionary, ['contact', 'form', 'subtitle'], "We'll get back to you within 24 hours"),
    name: getSafeProperty(dictionary, ['contact', 'form', 'name'], 'Full Name'),
    email: getSafeProperty(dictionary, ['contact', 'form', 'email'], 'Email Address'),
    phone: getSafeProperty(dictionary, ['contact', 'form', 'phone'], 'Phone Number'),
    message: getSafeProperty(dictionary, ['contact', 'form', 'message'], 'Message'),
    submit: getSafeProperty(dictionary, ['contact', 'form', 'submit'], 'Send Message'),
    sending: getSafeProperty(dictionary, ['contact', 'form', 'sending'], 'Sending...'),
    success: {
      title: getSafeProperty(dictionary, ['contact', 'form', 'success', 'title'], 'Message Sent!'),
      message: getSafeProperty(dictionary, ['contact', 'form', 'success', 'message'], 'Thank you for contacting us.'),
    },
  }

  const info = {
    address: getSafeProperty(dictionary, ['contact', 'info', 'address'], '123 Real Estate Ave'),
    phone: getSafeProperty(dictionary, ['contact', 'info', 'phone'], '+1 (555) 123-4567'),
    email: getSafeProperty(dictionary, ['contact', 'info', 'email'], 'info@realestate.com'),
    hours: getSafeProperty(dictionary, ['contact', 'info', 'hours'], 'Mon-Fri: 9AM-6PM'),
    office: {
      title: getSafeProperty(dictionary, ['contact', 'info', 'office', 'title'], 'Our Office'),
      subtitle: getSafeProperty(dictionary, ['contact', 'info', 'office', 'subtitle'], 'Visit us for a consultation'),
    },
  }

  const cards = {
    address: getSafeProperty(dictionary, ['contact', 'cards', 'address'], 'Address'),
    phone: getSafeProperty(dictionary, ['contact', 'cards', 'phone'], 'Phone'),
    email: getSafeProperty(dictionary, ['contact', 'cards', 'email'], 'Email'),
    hours: getSafeProperty(dictionary, ['contact', 'cards', 'hours'], 'Hours'),
  }

  const contactItems = [
    {
      icon: MapPin,
      title: cards.address,
      content: info.address,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-50/80",
    },
    {
      icon: Phone,
      title: cards.phone,
      content: info.phone,
      color: "from-purple-500 to-blue-600",
      bgColor: "bg-purple-50/80",
    },
    {
      icon: Mail,
      title: cards.email,
      content: info.email,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50/80",
    },
    {
      icon: Clock,
      title: cards.hours,
      content: info.hours,
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-50/80",
    },
  ]

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/80 relative overflow-hidden"
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        ref={ref as any}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Modern Header */}
        <motion.div variants={fadeIn} className="text-center mb-12">
          <motion.div
            className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <MessageSquare className="h-3 w-3 mr-1" />
            Get In Touch
          </motion.div>
          <motion.h2
            className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            {title}
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
            {subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Modern Contact Form */}
          <motion.div variants={fadeIn} custom={1}>
            <div className="glass rounded-xl border border-white/20 shadow-elevation-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600/90 to-indigo-600/90 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-white/80" />
                  <h3 className="text-sm font-semibold text-white">{form.title}</h3>
                </div>
                <p className="text-blue-100 text-xs">{form.subtitle}</p>
              </div>
              <div className="p-6 bg-white/50 backdrop-blur-sm">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Input
                          name="name"
                          placeholder={form.name}
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 text-sm border-2 border-indigo-200 bg-white focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all duration-300 placeholder:text-gray-400 hover:border-indigo-300"
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ y: -1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Input
                          name="phone"
                          type="tel"
                          placeholder={form.phone}
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-12 text-sm border-2 border-indigo-200 bg-white focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all duration-300 placeholder:text-gray-400 hover:border-indigo-300"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Input
                        name="email"
                        type="email"
                        placeholder={form.email}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 text-sm border-2 border-indigo-200 bg-white focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all duration-300 placeholder:text-gray-400 hover:border-indigo-300"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Textarea
                        name="message"
                        placeholder={form.message}
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="text-sm border-2 border-indigo-200 bg-white focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl transition-all duration-300 resize-none placeholder:text-gray-400 hover:border-indigo-300"
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xs font-medium rounded-lg shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="mr-2 h-3 w-3 border border-white border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="h-3 w-3 mr-2" />
                        )}
                        {isSubmitting ? form.sending : form.submit}
                      </Button>
                    </motion.div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </motion.div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">{form.success.title}</h3>
                    <p className="text-xs text-gray-600">{form.success.message}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Modern Contact Information */}
          <motion.div className="space-y-4">
            {/* Contact Items - Compact Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  custom={index}
                  whileHover={{ y: -2, scale: 1.02 }}
                  className={`${item.bgColor} p-4 rounded-xl shadow-soft hover:shadow-elevation-2 transition-all duration-300 border border-white/60 backdrop-blur-sm`}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className={`flex items-center justify-center w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg shadow-soft`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="h-4 w-4 text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 mb-1 text-xs">{item.title}</h3>
                      <p className="text-gray-700 text-xs leading-relaxed truncate">{item.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Modern Map Placeholder */}
            <motion.div
              variants={fadeIn}
              custom={contactItems.length}
              className="relative h-48 rounded-xl overflow-hidden shadow-elevation-2 mt-6"
            >
              <img
                src="https://picsum.photos/600/300?random=50"
                alt="Office Location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Glass Info Card */}
              <div className="absolute bottom-3 left-3 right-3 glass rounded-lg p-3 border border-white/20">
                <h4 className="font-medium text-white text-xs mb-1">{info.office.title}</h4>
                <p className="text-white/80 text-xs">{info.office.subtitle}</p>
              </div>

              {/* Animated Location Pin */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Quick Response Indicator */}
            <motion.div
              variants={fadeIn}
              custom={contactItems.length + 1}
              className="glass rounded-lg p-4 border border-white/20 mt-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">Quick Response Team</p>
                  <p className="text-xs text-gray-600">Average response time: 2 hours</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
