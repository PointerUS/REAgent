export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  type: "apartment" | "house" | "condo" | "villa" | "townhouse" | "land" | "commercial" | "office"
  images: string[]
  featured: boolean
  virtualTour?: VirtualTour
  // Vietnamese market specific fields
  pricePerSqm?: number
  direction?: "east" | "west" | "south" | "north" | "southeast" | "southwest" | "northeast" | "northwest"
  floor?: number
  totalFloors?: number
  balcony?: boolean
  parking?: number
  furnished?: "fully" | "partial" | "unfurnished"
  yearBuilt?: number
  developer?: string
  handoverDate?: string
  legalStatus?: "red_book" | "pink_book" | "sales_contract" | "pending"
  ownership?: "permanent" | "50_years" | "leasehold"
  mortgageSupport?: boolean
  installmentSupport?: boolean
  // Cultural features
  fengShui?: {
    direction: "excellent" | "good" | "average" | "poor"
    floorNumber: "very_lucky" | "lucky" | "neutral" | "unlucky"
    apartmentNumber: "very_lucky" | "lucky" | "neutral" | "unlucky"
  }
  // Investment data
  investment?: {
    currentValue: number
    projectedValue: number
    appreciationRate: number
    rentalYield: number
    paybackPeriod: number
    roi: number
  }
  // Location features
  nearbyAmenities?: {
    schools: Array<{ name: string; type: string; distance: number }>
    hospitals: Array<{ name: string; type: string; distance: number }>
    shopping: Array<{ name: string; type: string; distance: number }>
    transportation: Array<{ name: string; type: string; distance: number }>
  }
  status?: "ready" | "construction" | "planning" | "handover"
}

export interface VirtualTour {
  id: string
  scenes: VirtualTourScene[]
  initialScene: string
}

export interface VirtualTourScene {
  id: string
  name: string
  image360: string
  hotspots: Hotspot[]
  description?: string
}

export interface Hotspot {
  id: string
  type: "navigation" | "info" | "media"
  position: { x: number; y: number; z: number }
  targetScene?: string
  title: string
  description?: string
  icon?: string
  mediaUrl?: string
}

export interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export interface SearchFilters {
  priceMin?: number
  priceMax?: number
  propertyType?: string
  bedrooms?: number
  bathrooms?: number
  location?: string
  areaMin?: number
  areaMax?: number
  direction?: string
  floor?: number
  status?: string
  balcony?: boolean
  parking?: number
  furnished?: string
  hasVirtualTour?: boolean
  yearBuilt?: number
  developer?: string
  ownership?: string
  mortgageSupport?: boolean
  installmentSupport?: boolean
}

export interface InvestmentCalculation {
  purchasePrice: number
  downPayment: number
  loanAmount: number
  monthlyPayment: number
  totalInterest: number
  monthlyRent: number
  annualRent: number
  rentalYield: number
  appreciationValue: number
  totalReturn: number
  roi: number
  paybackPeriod: number
}

export interface VietnameseMarketData {
  marketTrends: {
    averageAppreciation: number
    hotDistricts: string[]
    emergingAreas: string[]
    priceRanges: {
      [key: string]: { min: number; max: number }
    }
  }
  culturalPreferences: {
    favoriteDirections: string[]
    luckyNumbers: number[]
    unluckyNumbers: number[]
    preferredFloors: number[]
  }
  investmentInsights: {
    bestROIAreas: string[]
    highGrowthProjects: string[]
    rentalHotspots: string[]
  }
}
