import { useState } from "react"

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export interface UseContactFormOptions {
  onSuccess?: () => void
  resetAfterSuccess?: boolean
  resetDelay?: number
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const { onSuccess, resetAfterSuccess = true, resetDelay = 3000 } = options
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (error) setError(null)
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitted(false)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", formData)

      setIsSubmitted(true)
      onSuccess?.()

      if (resetAfterSuccess) {
        setTimeout(() => {
          resetForm()
        }, resetDelay)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to submit form")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    isSubmitting,
    isSubmitted,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  }
} 