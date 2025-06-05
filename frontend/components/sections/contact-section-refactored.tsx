"use client"

import type React from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { useContactForm } from "@/hooks/use-contact-form"
import { fadeIn, staggerContainer } from "@/lib/animation"
import { AnimatedForm } from "@/components/ui/animated-form"
import { ContactInfoCard } from "@/components/ui/contact-info-card"
import { CONTACT_FORM_FIELDS, CONTACT_INFO_ITEMS } from "@/lib/constants"
import { getSafeProperty } from "@/lib/utils"

interface ContactSectionProps {
  dictionary: Dictionary
}

const CONTACT_ICONS = {
  address: MapPin,
  phone: Phone,
  email: Mail,
  hours: Clock,
} as const

export function ContactSectionRefactored({ dictionary }: ContactSectionProps) {
  const { ref, isVisible } = useScrollAnimation()
  const contactForm = useContactForm()

  // Safely access form properties with fallbacks
  const formTitle = getSafeProperty(dictionary, ['contact', 'form', 'title'], 'Contact Form')
  const formSubtitle = getSafeProperty(dictionary, ['contact', 'form', 'subtitle'], 'Get in touch with us')
  const submitText = getSafeProperty(dictionary, ['contact', 'form', 'submit'], 'Send Message')
  const sendingText = getSafeProperty(dictionary, ['contact', 'form', 'sending'], 'Sending...')
  const successTitle = getSafeProperty(dictionary, ['contact', 'form', 'success', 'title'], 'Message Sent!')
  const successMessage = getSafeProperty(dictionary, ['contact', 'form', 'success', 'message'], 'Thank you for contacting us.')

  const formFields = CONTACT_FORM_FIELDS.map(field => ({
    ...field,
    placeholder: getSafeProperty(dictionary, ['contact', 'form', field.name], field.name),
  }))

  // Safely create contact items with fallbacks
  const contactItems = CONTACT_INFO_ITEMS.map((item, index) => ({
    icon: CONTACT_ICONS[item.type],
    title: getSafeProperty(dictionary, ['contact', 'cards', item.type], item.type.charAt(0).toUpperCase() + item.type.slice(1)),
    content: getSafeProperty(dictionary, ['contact', 'info', item.type], `Contact information for ${item.type}`),
    color: item.color,
    bgColor: item.bgColor,
  }))

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <motion.div
        ref={ref as any}
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Header Section */}
        <HeaderSection dictionary={dictionary} isVisible={isVisible} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div variants={fadeIn} custom={1}>
            <AnimatedForm
              title={formTitle}
              subtitle={formSubtitle}
              fields={formFields}
              submitText={submitText}
              sendingText={sendingText}
              successTitle={successTitle}
              successMessage={successMessage}
              formData={contactForm.formData as unknown as Record<string, string>}
              isSubmitting={contactForm.isSubmitting}
              isSubmitted={contactForm.isSubmitted}
              error={contactForm.error}
              onChange={contactForm.handleChange}
              onSubmit={contactForm.handleSubmit}
            />
          </motion.div>

          {/* Contact Information */}
          <ContactInfoSection 
            contactItems={contactItems}
            dictionary={dictionary}
            isVisible={isVisible}
          />
        </div>
      </motion.div>
    </section>
  )
}

// Separate header component for better organization
function HeaderSection({ dictionary, isVisible }: { dictionary: Dictionary; isVisible: boolean }) {
  const title = getSafeProperty(dictionary, ['contact', 'title'], 'Contact Us')
  const subtitle = getSafeProperty(dictionary, ['contact', 'subtitle'], 'Get in touch with us')

  return (
    <motion.div variants={fadeIn} className="text-center mb-16">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        animate={isVisible ? { width: "100px" } : { width: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"
      />
      <motion.p
        className="text-xl text-gray-600 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  )
}

// Separate contact info section component
function ContactInfoSection({ 
  contactItems, 
  dictionary, 
  isVisible 
}: { 
  contactItems: any[];
  dictionary: Dictionary;
  isVisible: boolean;
}) {
  return (
    <motion.div className="space-y-8">
      {/* Contact Items */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="space-y-6"
      >
        {contactItems.map((item, index) => (
          <ContactInfoCard
            key={index}
            icon={item.icon}
            title={item.title}
            content={item.content}
            gradient={item.color}
            bgColor={item.bgColor}
            index={index}
          />
        ))}
      </motion.div>

      {/* Map Section */}
      <MapSection dictionary={dictionary} />
    </motion.div>
  )
}

// Separate map component
function MapSection({ dictionary }: { dictionary: Dictionary }) {
  const officeTitle = getSafeProperty(dictionary, ['contact', 'info', 'office', 'title'], 'Our Office')
  const officeSubtitle = getSafeProperty(dictionary, ['contact', 'info', 'office', 'subtitle'], 'Visit us for a consultation')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="relative h-64 rounded-2xl overflow-hidden shadow-2xl"
    >
      <img
        src="https://picsum.photos/600/300?random=50"
        alt="Office Location"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h4 className="font-bold text-lg mb-1">{officeTitle}</h4>
        <p className="text-sm opacity-90">{officeSubtitle}</p>
      </div>
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg" />
      </motion.div>
    </motion.div>
  )
} 