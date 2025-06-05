import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { ComparisonProvider } from "@/contexts/comparison-context"
import { ComparisonBar } from "@/components/comparison/comparison-bar"
import { ChatbotPopup } from "@/components/chatbot/chatbot-popup"
import { getDictionary } from "@/lib/dictionaries"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ReviewNhaThat - Property Review Platform",
  description: "Discover and review premium properties in the best locations across Vietnam and globally",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: "en" | "vi" }>
}) {
  // Await params for Next.js compatibility
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  
  return (
    <html lang={lang}>
      <body className={inter.className}>
        <ErrorBoundary>
          <ComparisonProvider>
            {children}
            <ComparisonBar />
            <ChatbotPopup dictionary={dictionary} locale={lang} />
          </ComparisonProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
