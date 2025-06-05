"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle } from "lucide-react"

interface FormField {
  name: string
  type?: "text" | "email" | "tel" | "textarea"
  placeholder: string
  required?: boolean
  rows?: number
}

interface AnimatedFormProps {
  title: string
  subtitle: string
  fields: FormField[]
  submitText: string
  sendingText: string
  successTitle: string
  successMessage: string
  formData: Record<string, string>
  isSubmitting: boolean
  isSubmitted: boolean
  error?: string | null
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onSubmit: (e: React.FormEvent) => void
}

export function AnimatedForm({
  title,
  subtitle,
  fields,
  submitText,
  sendingText,
  successTitle,
  successMessage,
  formData,
  isSubmitting,
  isSubmitted,
  error,
  onChange,
  onSubmit,
}: AnimatedFormProps) {
  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.name,
      placeholder: field.placeholder,
      value: formData[field.name] || "",
      onChange,
      required: field.required,
      className: field.type === "textarea" 
        ? "border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300 resize-none"
        : "h-12 border-2 border-gray-200 focus:border-blue-500 rounded-xl transition-all duration-300",
    }

    if (field.type === "textarea") {
      return (
        <Textarea
          {...commonProps}
          rows={field.rows || 5}
        />
      )
    }

    return (
      <Input
        {...commonProps}
        type={field.type || "text"}
      />
    )
  }

  return (
    <Card className="shadow-2xl border-0 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-blue-100">{subtitle}</p>
      </div>
      <CardContent className="p-8">
        {!isSubmitted ? (
          <form onSubmit={onSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}
            
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {renderField(field)}
              </motion.div>
            ))}

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                {isSubmitting ? sendingText : submitText}
              </Button>
            </motion.div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{successTitle}</h3>
            <p className="text-gray-600">{successMessage}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
} 