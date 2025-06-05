import { getDictionary } from "@/lib/dictionaries"
import { Navigation } from "@/components/layout/navigation"
import { PropertyViewDetails } from "@/components/property-view/property-view-details"
import { getPropertyById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function PropertyViewDetailsPage({
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
    <main className="min-h-screen bg-black">
      <Navigation dictionary={dictionary} locale={lang} />
      <PropertyViewDetails property={property} dictionary={dictionary} />
    </main>
  )
}
