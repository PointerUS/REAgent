"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"

interface ConnectionStatusProps {
  dictionary: Dictionary
  locale: "en" | "vi"
}

export function ConnectionStatus({ dictionary, locale }: ConnectionStatusProps) {
  const [chainlitStatus, setChainlitStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const checkConnection = async () => {
    try {
      const chainlitServer = process.env.NEXT_PUBLIC_CHAINLIT_SERVER

      if (!chainlitServer) {
        setChainlitStatus("disconnected")
        return
      }

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch(`${chainlitServer}/health`, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      setChainlitStatus(response.ok ? "connected" : "disconnected")
    } catch (error) {
      setChainlitStatus("disconnected")
    } finally {
      setLastChecked(new Date())
    }
  }

  useEffect(() => {
    checkConnection()

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000)

    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = () => {
    switch (chainlitStatus) {
      case "connected":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          message: dictionary.connectionStatus.aiOnline,
          description: dictionary.connectionStatus.enhancedFeatures,
        }
      case "disconnected":
        return {
          icon: XCircle,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          message: dictionary.connectionStatus.fallbackMode,
          description: dictionary.connectionStatus.basicFeatures,
        }
      default:
        return {
          icon: AlertCircle,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          message: dictionary.connectionStatus.checkingConnection,
          description: dictionary.connectionStatus.pleaseWait,
        }
    }
  }

  const config = getStatusConfig()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 z-40"
      >
        <motion.div
          className={`${config.bgColor} ${config.borderColor} border rounded-lg p-3 shadow-lg backdrop-blur-sm`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={chainlitStatus === "checking" ? { rotate: 360 } : {}}
              transition={{ duration: 1, repeat: chainlitStatus === "checking" ? Number.POSITIVE_INFINITY : 0 }}
            >
              <config.icon className={`h-5 w-5 ${config.color}`} />
            </motion.div>
            <div>
              <p className={`text-sm font-medium ${config.color}`}>{config.message}</p>
              <p className="text-xs text-gray-500">{config.description}</p>
            </div>
          </div>

          {lastChecked && (
            <p className="text-xs text-gray-400 mt-1">
              {dictionary.connectionStatus.lastChecked}: {lastChecked.toLocaleTimeString()}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
