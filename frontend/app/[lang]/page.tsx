import { getDictionary } from "@/lib/dictionaries"
import { Navigation } from "@/components/layout/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PropertiesSection } from "@/components/sections/properties-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { VirtualTourGallery } from "@/components/virtual-tour/virtual-tour-gallery"
import { getSafeProperty } from "@/lib/utils"
import { Footer } from "@/components/layout/footer"

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "vi" }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen relative">
      {/* Seamless Global Background Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Primary gradient foundation - New sophisticated color scheme */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-25 to-blue-50"></div>
        
        {/* Animated mesh overlay */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 via-transparent to-indigo-100/30 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(99,102,241,0.15)_0%,transparent_25%),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.15)_0%,transparent_25%)]"></div>
        </div>
        
        {/* Floating geometric shapes with new colors */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-indigo-300/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-200/20 to-purple-300/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-blue-300/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/5 w-28 h-28 bg-gradient-to-br from-violet-200/15 to-indigo-200/15 rounded-full blur-xl animate-float" style={{ animationDelay: '6s' }}></div>
        
        {/* Subtle grid pattern with new color */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        
        {/* Organic flowing lines with new gradient colors */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z" fill="url(#seamlessGradient1)" />
          <path d="M0,700 Q250,600 500,700 T1000,700 L1000,1000 L0,1000 Z" fill="url(#seamlessGradient2)" />
          <defs>
            <linearGradient id="seamlessGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
            </linearGradient>
            <linearGradient id="seamlessGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10">
        <Navigation dictionary={dictionary} locale={lang} />
        <HeroSection dictionary={dictionary} />
        <FeaturesSection dictionary={dictionary} />
        <PropertiesSection dictionary={dictionary} />
        <VirtualTourGallery dictionary={dictionary} />
        <AboutSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
        <Footer dictionary={dictionary} />
      </div>
    </main>
  )
}
