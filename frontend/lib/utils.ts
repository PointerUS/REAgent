import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Safely access nested object properties with fallback values
 * Prevents runtime errors when accessing undefined properties in dictionaries
 * 
 * @param obj - The object to access properties from
 * @param path - Array of property keys to traverse
 * @param fallback - Fallback value to return if property doesn't exist
 * @returns The value at the specified path or the fallback value
 * 
 * @example
 * const title = getSafeProperty(dictionary, ['hero', 'title'], 'Default Title')
 * const nested = getSafeProperty(data, ['user', 'profile', 'name'], 'Unknown')
 */
export function getSafeProperty<T>(obj: any, path: string[], fallback: T): T {
  let current = obj
  for (const key of path) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key]
    } else {
      return fallback
    }
  }
  return current ?? fallback
}
