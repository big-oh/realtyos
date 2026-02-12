export interface Lead {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed' | 'lost'
  source: string
  notes?: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatarUrl?: string
  brokerage?: string
  licenseNumber?: string
  phone?: string
  createdAt: string
}

export interface ListingDescription {
  id: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  sqft: number
  location: string
  features: string[]
  description: string
  createdAt: string
  userId: string
}

export type LeadStatus = Lead['status']

export const LEAD_STATUS_COLORS: Record<LeadStatus, { bg: string; text: string; border: string }> = {
  new: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  contacted: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  qualified: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  proposal: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  negotiation: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  closed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  lost: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New Lead',
  contacted: 'Contacted',
  qualified: 'Qualified',
  proposal: 'Proposal Sent',
  negotiation: 'In Negotiation',
  closed: 'Closed Won',
  lost: 'Closed Lost',
}

export const PROPERTY_TYPES = [
  'Single Family Home',
  'Condo/Apartment',
  'Townhouse',
  'Duplex',
  'Triplex',
  'Multi-Family',
  'Commercial',
  'Vacant Land',
]

export const COMMON_FEATURES = [
  'Hardwood Floors',
  'Stainless Steel Appliances',
  'Granite Countertops',
  'Walk-in Closet',
  'Fireplace',
  'Finished Basement',
  'Central Air Conditioning',
  'Heated Garage',
  'Swimming Pool',
  'Deck/Patio',
  'Smart Home Features',
  'Energy Efficient',
  'Updated Kitchen',
  'Ensuite Bathroom',
  'Home Office',
]
