"use client"

import { useEffect, useState, useRef } from "react"
import { useReducedMotion } from "@/lib/animation"

interface UseScrollAnimationProps {
  threshold?: number
  once?: boolean
}

export function useScrollAnimation({ threshold = 0.1, once = true }: UseScrollAnimationProps = {}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, once, prefersReducedMotion])

  return { ref, isVisible }
}
