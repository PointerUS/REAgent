"use client"

import { Component, type ReactNode } from "react"
import type { Dictionary } from "@/lib/dictionaries"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  dictionary?: Dictionary
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {this.props.dictionary?.errors.somethingWrong || "Something went wrong"}
              </h2>
              <p className="text-gray-600 mb-4">
                {this.props.dictionary?.errors.refreshPage || "Please refresh the page to try again."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {this.props.dictionary?.errors.refreshButton || "Refresh Page"}
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
