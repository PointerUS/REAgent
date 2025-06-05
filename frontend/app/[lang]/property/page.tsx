import { getDictionary } from "@/lib/dictionaries"
import { Navigation } from "@/components/layout/navigation"
import { properties } from "@/lib/data"

export default async function PropertyListingPage({
  params,
}: {
  params: Promise<{ lang: "en" | "vi" }>
}) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-blue-50/80 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <Navigation dictionary={dictionary} locale={lang} />
      
      <div className="pt-20 pb-12 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Modern Header Section */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-4">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
              Property Listings
            </div>
            
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3 tracking-tight">
              {dictionary.properties?.title || "Properties"}
            </h1>
            
            <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
            
            <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {dictionary.properties?.subtitle || "Find your dream property from our extensive listings"}
            </p>

            {/* Property Stats */}
            <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>{properties.length} Properties</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>All Locations</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
            </div>
          </div>

          {/* Property filters and grid components are imported client-side */}
          <PropertyListingClient properties={properties} dictionary={dictionary} />
        </div>
      </div>
    </main>
  )
}

// Import client components separately
import { PropertyListingClient } from "@/components/property/property-listing-client" 