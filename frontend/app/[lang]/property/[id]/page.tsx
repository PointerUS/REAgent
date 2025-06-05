import { getDictionary } from "@/lib/dictionaries"
import { Navigation } from "@/components/layout/navigation"
import { PropertyDetailHero } from "@/components/property-detail/property-detail-hero"
import { PropertyDetailInfo } from "@/components/property-detail/property-detail-info"
import { PropertyDetailFeatures } from "@/components/property-detail/property-detail-features"
import { PropertyDetailLocation } from "@/components/property-detail/property-detail-location"
import { PropertyDetailAgent } from "@/components/property-detail/property-detail-agent"
import { PropertyDetailMortgage } from "@/components/property-detail/property-detail-mortgage"
import { PropertyDetailSimilar } from "@/components/property-detail/property-detail-similar"
import { PropertyDetailContact } from "@/components/property-detail/property-detail-contact"
import { getPropertyById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ lang: "en" | "vi"; id: string }>
}) {
  const { lang, id } = await params
  const dictionary = await getDictionary(lang)
  const property = getPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50/80 via-white to-blue-50/80 relative overflow-hidden">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <Navigation dictionary={dictionary} locale={lang} />

      <div className="pt-16 relative">
        <PropertyDetailHero property={property} dictionary={dictionary} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Modern Header with Property Quick Info */}
          <div className="glass rounded-xl p-4 mb-6 border border-white/20 shadow-elevation-2">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{property.bedrooms} beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} baths</span>
                  <span>•</span>
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xl lg:text-2xl font-bold text-emerald-600">
                    ${property.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-600">
                    ${Math.round(property.price / property.sqft)}/sqft
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="glass hover:shadow-elevation-1 text-xs px-3 py-2 rounded-lg border border-white/20 transition-all duration-300">
                    Save
                  </button>
                  <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs px-4 py-2 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300">
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <PropertyDetailInfo property={property} dictionary={dictionary} />
              <PropertyDetailFeatures property={property} dictionary={dictionary} />
              <PropertyDetailLocation property={property} dictionary={dictionary} />
            </div>

            {/* Compact Sidebar */}
            <div className="space-y-4">
              <PropertyDetailAgent dictionary={dictionary} />
              <PropertyDetailMortgage property={property} dictionary={dictionary} />
              <PropertyDetailContact property={property} dictionary={dictionary} />
            </div>
          </div>

          {/* Similar Properties */}
          <div className="mt-12">
            <PropertyDetailSimilar property={property} dictionary={dictionary} />
          </div>
        </div>
      </div>
    </main>
  )
}
