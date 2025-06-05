// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2,
} as const

export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 0.2,
  MEDIUM: 0.5,
  LONG: 0.8,
} as const

// Form constants
export const FORM_RESET_DELAY = 3000
export const FORM_SUBMISSION_DELAY = 2000

// Scroll constants
export const SCROLL_TOLERANCE = 10
export const SCROLL_THRESHOLD = 20

// Contact form fields configuration
export const CONTACT_FORM_FIELDS = [
  {
    name: "name",
    type: "text" as const,
    required: true,
  },
  {
    name: "email",
    type: "email" as const,
    required: true,
  },
  {
    name: "phone",
    type: "tel" as const,
    required: false,
  },
  {
    name: "message",
    type: "textarea" as const,
    required: true,
    rows: 5,
  },
]

// Contact info configuration
export const CONTACT_INFO_ITEMS = [
  {
    type: "address",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    type: "phone",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
  },
  {
    type: "email",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    type: "hours",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
  },
] as const

// API endpoints
export const API_ENDPOINTS = {
  CONTACT: "/api/contact",
  PROPERTIES: "/api/properties",
} as const

// Responsive breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const

// Component sizes
export const COMPONENT_SIZES = {
  ICON_SIZES: {
    SMALL: 16,
    MEDIUM: 20,
    LARGE: 24,
    EXTRA_LARGE: 28,
  },
} as const 