import "server-only"

const dictionaries = {
  en: () => import("@/dictionaries/en").then((module) => module.default),
  vi: () => import("@/dictionaries/vi").then((module) => module.default),
}

export const getDictionary = async (locale: "en" | "vi") => {
  try {
    // Validate locale and provide fallback for invalid values
    if (!locale || (locale !== "en" && locale !== "vi")) {
      console.warn(`Invalid locale provided: ${locale}, falling back to English`)
      return await dictionaries.en()
    }
    
    const dictionary = dictionaries[locale]
    if (!dictionary) {
      console.warn(`Dictionary not found for locale: ${locale}, falling back to English`)
      return await dictionaries.en()
    }
    
    return await dictionary()
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error)
    // Fallback to English if the requested locale fails
    return await dictionaries.en()
  }
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
