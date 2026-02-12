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
  Mail,
  Target,
  Zap
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

// Mock data
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

const stats = [
  { label: 'Total Leads', value: '24', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { label: 'Active Deals', value: '8', change: '+3', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  { label: 'AI Listings', value: '12', change: '+5', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
  { label: 'Conversion Rate', value: '68%', change: '+8%', icon: Target, color: 'from-orange-500 to-red-500' },
]

export function DashboardPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      new: 'status-new',
      contacted: 'status-contacted',
      qualified: 'status-qualified',
      proposal: 'status-proposal',
      negotiation: 'status-negotiation',
      closed: 'status-closed',
    }
    return styles[status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div>
          <h1 className="text-4xl font-bold">
            Welcome back,{' '}
            <span className="gradient-text">{user?.firstName}</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Here's what's happening with your real estate business today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link to="/leads">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:border-white/20">
              <Plus className="w-4 h-4 mr-2" />
              Add Lead
            </Button>
          </Link>
          <Link to="/listing-generator">
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white glow">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Listing
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label}
            className={`glass border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] group cursor-pointer ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  <p className="text-sm text-emerald-400 mt-1">{stat.change} this week</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card className={`glass border-white/10 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Recent Leads
              </CardTitle>
              <CardDescription className="text-gray-400">Your latest prospective clients</CardDescription>
            </div>
            <Link to="/leads">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                View all
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLeads.slice(0, 3).map((lead, index) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
                      <span className="text-indigo-400 font-bold">
                        {lead.firstName.charAt(0)}{lead.lastName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        {lead.email && (
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusBadge(lead.status)} border`}>
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card className={`glass border-white/10 transition-all duration-700 delay-600 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI Listings
              </CardTitle>
              <CardDescription className="text-gray-400">Generated property descriptions</CardDescription>
            </div>
            <Link to="/listing-generator">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {mockListings.length > 0 ? (
              <div className="space-y-3">
                {mockListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-white group-hover:text-purple-300 transition-colors">
                          {listing.bedrooms} bed, {listing.bathrooms} bath {listing.propertyType}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <Building className="w-3 h-3" />
                          {listing.location}
                        </p>
                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                          {listing.description}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/20 shrink-0">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {listing.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-white/5 text-gray-300 border-white/10 text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {listing.features.length > 2 && (
                        <Badge variant="secondary" className="bg-white/5 text-gray-300 border-white/10 text-xs">
                          +{listing.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Sparkles className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                <p className="text-lg font-medium text-gray-400">No listings yet</p>
                <p className="text-sm mt-1">Generate your first AI listing</p>
                <Link to="/listing-generator">
                  <Button className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Listing
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className={`glass border-white/10 transition-all duration-700 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Ready to close more deals?</h3>
              <p className="text-gray-400 text-sm mt-1">Use AI to generate compelling listings and manage your leads efficiently.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/leads">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:border-white/20">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Leads
                </Button>
              </Link>
              <Link to="/listing-generator">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white glow">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Listing Generator
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
