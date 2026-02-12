import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Lead, ListingDescription } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Plus,
  Building,
  Phone,
  Mail
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '(416) 555-0123',
    status: 'qualified',
    source: 'Website',
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-02-11T14:30:00Z',
    userId: 'user1',
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@email.com',
    status: 'new',
    source: 'Referral',
    createdAt: '2024-02-12T09:15:00Z',
    updatedAt: '2024-02-12T09:15:00Z',
    userId: 'user1',
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.w@email.com',
    phone: '(647) 555-0456',
    status: 'proposal',
    source: 'Zillow',
    createdAt: '2024-02-08T16:45:00Z',
    updatedAt: '2024-02-11T11:20:00Z',
    userId: 'user1',
  },
]

const mockListings: ListingDescription[] = [
  {
    id: '1',
    propertyType: 'Single Family Home',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2850,
    location: 'North York, Toronto',
    features: ['Hardwood Floors', 'Updated Kitchen', 'Finished Basement'],
    description: 'Welcome to this stunning 4-bedroom, 3-bathroom single family home...',
    createdAt: '2024-02-11T14:30:00Z',
    userId: 'user1',
  },
]

export function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    totalListings: 0,
  })

  useEffect(() => {
    // Calculate stats from mock data
    setStats({
      totalLeads: mockLeads.length,
      newLeads: mockLeads.filter(l => l.status === 'new').length,
      qualifiedLeads: mockLeads.filter(l => l.status === 'qualified').length,
      totalListings: mockListings.length,
    })
  }, [])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'bg-blue-100 text-blue-700 border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      qualified: 'bg-purple-100 text-purple-700 border-purple-200',
      proposal: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      negotiation: 'bg-orange-100 text-orange-700 border-orange-200',
      closed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      lost: 'bg-red-100 text-red-700 border-red-200',
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-gray-500 mt-1">
            Here's what's happening with your real estate business
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/leads">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </Link>
          <Link to="/listing-generator">
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.newLeads}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Qualified</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.qualifiedLeads}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">AI Listings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalListings}</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Your latest prospective clients</CardDescription>
            </div>
            <Link to="/leads">
              <Button variant="ghost" size="sm">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeads.slice(0, 3).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary font-medium">
                        {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {lead.email && <Mail className="w-3 h-3" />}
                        {lead.phone && <Phone className="w-3 h-3" />}
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusBadge(lead.status)}>
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle>Recent Listings</CardTitle>
              <CardDescription>AI-generated descriptions</CardDescription>
            </div>
            <Link to="/listing-generator">
              <Button variant="ghost" size="sm">
                Create new
                <Plus className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {mockListings.length > 0 ? (
              <div className="space-y-4">
                {mockListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {listing.bedrooms} bed, {listing.bathrooms} bath {listing.propertyType}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{listing.location}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {listing.description}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 text-amber-600" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {listing.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {listing.features.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{listing.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No listings generated yet</p>
                <Link to="/listing-generator">
                  <Button variant="link" className="mt-2">
                    Create your first listing
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
