import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateListingDescription(
  propertyType: string,
  bedrooms: number,
  bathrooms: number,
  sqft: number,
  location: string,
  features: string[]
): string {
  const featureText = features.length > 0 
    ? ` featuring ${features.slice(0, -1).join(', ')}${features.length > 1 ? ' and ' : ''}${features.slice(-1)}`
    : ''
  
  const descriptions = [
    `Welcome to this stunning ${bedrooms}-bedroom, ${bathrooms}-bathroom ${propertyType.toLowerCase()} in the heart of ${location}. Spanning ${sqft.toLocaleString()} square feet${featureText}, this property offers the perfect blend of comfort and style.`,
    
    `Discover exceptional living in this beautiful ${bedrooms}-bedroom ${propertyType.toLowerCase()} located in desirable ${location}. With ${bathrooms} bathrooms and ${sqft.toLocaleString()} sq ft of thoughtfully designed space${featureText}, this home is ready to impress.`,
    
    `Step into luxury with this magnificent ${bedrooms}-bedroom, ${bathrooms}-bathroom ${propertyType.toLowerCase()} in ${location}. Boasting ${sqft.toLocaleString()} square feet of living space${featureText}, this property represents the finest in Canadian real estate.`,
  ]
  
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}
