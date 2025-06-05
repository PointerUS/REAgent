"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { Logo } from "../common/logo"

interface NavigationProps {
  dictionary: Dictionary
  locale: "en" | "vi"
}

// Country flags as React components
const USFlag = () => (
  <svg className="w-4 h-3 rounded-sm" viewBox="0 0 16 12">
    <defs>
      <pattern id="stars" x="0" y="0" width="0.2" height="0.2" patternUnits="objectBoundingBox">
        <rect width="0.2" height="0.2" fill="#002868"/>
        <polygon points="0.1,0.05 0.12,0.12 0.08,0.12" fill="white"/>
      </pattern>
    </defs>
    <rect width="16" height="12" fill="#BF0A30"/>
    <rect width="16" height="1" y="1" fill="white"/>
    <rect width="16" height="1" y="3" fill="white"/>
    <rect width="16" height="1" y="5" fill="white"/>
    <rect width="16" height="1" y="7" fill="white"/>
    <rect width="16" height="1" y="9" fill="white"/>
    <rect width="16" height="1" y="11" fill="white"/>
    <rect width="6.4" height="6" fill="#002868"/>
  </svg>
)

const VNFlag = () => (
  <svg className="w-4 h-3 rounded-sm" viewBox="0 0 16 12">
    <rect width="16" height="12" fill="#DA020E"/>
    <polygon points="8,2 8.8,4.8 11.6,4.8 9.4,6.4 10.2,9.2 8,7.6 5.8,9.2 6.6,6.4 4.4,4.8 7.2,4.8" fill="#FFFF00"/>
  </svg>
)

export function Navigation({ dictionary, locale }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const switchLanguage = (newLocale: "en" | "vi") => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    window.location.href = newPath
    setIsLangDropdownOpen(false)
  }

  const navItems = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/property`, label: dictionary.nav.properties },
    { href: `/${locale}#about`, label: dictionary.nav.about },
    { href: `/${locale}#contact`, label: dictionary.nav.contact },
  ]

  const languages = [
    { code: "en", name: "English", flag: <USFlag /> },
    { code: "vi", name: "Tiếng Việt", flag: <VNFlag /> },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-gradient-to-r from-indigo-600/95 via-purple-600/95 to-blue-600/95 backdrop-blur-md shadow-elevation-3 border-b border-white/20" 
          : "bg-gradient-to-r from-indigo-600/80 via-purple-600/80 to-blue-600/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Logo isScrolled={scrolled} size="sm" locale={locale} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="px-3 py-2 text-xs font-medium transition-all duration-300 rounded-lg text-white/90 hover:text-white hover:bg-white/15"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.label}
                </motion.div>
              </Link>
            ))}
            
            {/* Language Dropdown */}
            <motion.div 
              className="relative"
              ref={dropdownRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              <motion.button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg transition-all duration-300 text-white/90 hover:text-white hover:bg-white/15 glass"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentLanguage?.flag}
                <span className="font-medium">{currentLanguage?.code.toUpperCase()}</span>
                <motion.div
                  animate={{ rotate: isLangDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-3 w-3 opacity-70" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-elevation-3 overflow-hidden"
                  >
                    {languages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code as "en" | "vi")}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-xs transition-all duration-200 hover:bg-indigo-50 ${
                          lang.code === locale ? "bg-indigo-100 text-indigo-800 font-semibold" : "text-gray-700 hover:text-indigo-700"
                        }`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 2 }}
                      >
                        {lang.flag}
                        <span className="font-medium">{lang.name}</span>
                        {lang.code === locale && (
                          <motion.div 
                            className="ml-auto w-2 h-2 bg-indigo-500 rounded-full"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (navItems.length + 1) * 0.1 }}
            >
              <Button
                size="sm"
                className="text-xs px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white glass backdrop-blur-md transition-all duration-300 border border-white/20 shadow-elevation-1"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
                className="p-2 text-white hover:bg-white/15"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="glass rounded-xl mx-4 my-3 p-4 space-y-1 border border-white/20 shadow-elevation-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-xs font-medium text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-all duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile Language Selection */}
                <motion.div
                  className="pt-3 border-t border-white/20 space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 + 0.2 }}
                >
                  <div className="text-xs text-white/70 font-medium mb-2">Language</div>
                  {languages.map((lang, index) => (
                    <motion.button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code as "en" | "vi")
                        setIsOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                        lang.code === locale 
                          ? "bg-white/20 text-white border border-white/30" 
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {lang.flag}
                      <span className="font-medium">{lang.name}</span>
                      {lang.code === locale && (
                        <div className="ml-auto w-2 h-2 bg-indigo-300 rounded-full" />
                      )}
                    </motion.button>
                  ))}
                  
                  <Button
                    size="sm"
                    className="w-full text-xs px-4 py-2 mt-3 bg-white/20 hover:bg-white/30 text-white border border-white/20"
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
