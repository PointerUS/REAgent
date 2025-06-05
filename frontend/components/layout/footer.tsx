"use client"

import { motion } from "framer-motion"
import { fadeIn } from "@/lib/animation"
import Link from "next/link"
import { useParams } from "next/navigation"
import type { Dictionary } from "@/lib/dictionaries"
import { Logo } from "../common/logo"
import { ArrowRight, Send, Heart } from "lucide-react"

interface FooterProps {
  dictionary: Dictionary
}

export function Footer({ dictionary }: FooterProps) {
  const params = useParams()
  const locale = (params?.lang as string) || "en"

  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white py-12 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Logo size="sm" locale={locale} />
            <p className="text-gray-400 mb-4 text-xs mt-3 leading-relaxed max-w-xs">
              Premium property reviews across Vietnam and globally. Trusted by thousands.
            </p>
            <div className="flex space-x-3">
              {[
                { 
                  icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
                  label: "Facebook",
                  color: "hover:text-blue-400"
                },
                { 
                  icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
                  label: "Twitter",
                  color: "hover:text-sky-400"
                },
                { 
                  icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M2 2h20v20H2z",
                  label: "Instagram",
                  color: "hover:text-pink-400"
                }
              ].map((social, index) => (
                <motion.a 
                  key={social.label}
                  href="#" 
                  aria-label={social.label}
                  className={`text-gray-400 ${social.color} transition-all duration-300 interactive-scale`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={social.icon}></path>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: `/${locale}`, label: dictionary.nav?.home || "Home" },
                { href: `/${locale}/property`, label: dictionary.nav?.properties || "Properties" },
                { href: `/${locale}/about`, label: dictionary.nav?.about || "About Us" },
                { href: `/${locale}/contact`, label: dictionary.nav?.contact || "Contact" }
              ].map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-all duration-300 text-xs group flex items-center"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-3 text-white">Contact</h3>
            <ul className="space-y-2">
              {[
                { 
                  icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
                  text: dictionary.contact?.info?.address || "Hanoi, Vietnam"
                },
                { 
                  icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
                  text: dictionary.contact?.info?.phone || "+84 123 456 7890"
                },
                { 
                  icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
                  text: dictionary.contact?.info?.email || "info@reviewnhathat.com"
                }
              ].map((contact, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center text-gray-400 text-xs group cursor-pointer"
                  whileHover={{ x: 2 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <svg
                    className="w-3 h-3 mr-2 group-hover:text-blue-400 transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={contact.icon}></path>
                  </svg>
                  <span className="group-hover:text-white transition-colors duration-300">{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter - Modern Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold mb-3 text-white">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-xs leading-relaxed">Get the latest property insights</p>
            <div className="glass rounded-lg p-3 border border-white/10">
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                />
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium flex items-center justify-center gap-1 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  Subscribe
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>© 2025 ReviewNhaThat</span>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="h-3 w-3 text-red-500" fill="currentColor" />
            </motion.div>
            <span>by ReviewNhaThat Team</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
} 