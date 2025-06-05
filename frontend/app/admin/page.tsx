import { getDictionary } from "@/lib/dictionaries"

export default async function AdminPage({
  params,
}: {
  params: Promise<{ lang?: "en" | "vi" }>
}) {
  const { lang = "en" } = await params
  const dictionary = await getDictionary(lang)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{dictionary.admin.title}</h1>
          <p className="text-lg text-gray-600">{dictionary.admin.subtitle}</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{dictionary.admin.systemInfo.title}</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">{dictionary.admin.systemInfo.environment}:</span>
              <span className="font-medium">{process.env.NODE_ENV}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{dictionary.admin.systemInfo.features}:</span>
              <div className="text-right">
                <div className="text-sm text-green-600">✓ {dictionary.admin.systemInfo.virtualTours}</div>
                <div className="text-sm text-green-600">✓ {dictionary.admin.systemInfo.multilingualSupport}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{dictionary.admin.quickActions.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔄</div>
                  <div className="font-medium">{dictionary.admin.quickActions.restartServices}</div>
                </div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="font-medium">{dictionary.admin.quickActions.viewAnalytics}</div>
                </div>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-medium">{dictionary.admin.quickActions.settings}</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
