import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { PROPERTY_TYPES, COMMON_FEATURES } from '@/types'
import { generateListingDescription } from '@/lib/utils'
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Check, 
  Home, 
  Bed, 
  Bath, 
  Maximize,
  MapPin,
  History,
  Wand2
} from 'lucide-react'

interface GeneratedListing {
  id: string
  propertyType: string
  bedrooms: number
  bathrooms: number
  sqft: number
  location: string
  features: string[]
  description: string
  createdAt: string
}

export function ListingGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generatedListing, setGeneratedListing] = useState<GeneratedListing | null>(null)
  const [history, setHistory] = useState<GeneratedListing[]>([])
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    propertyType: '',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    location: '',
    selectedFeatures: [] as string[],
    customFeatures: '',
  })

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(feature)
        ? prev.selectedFeatures.filter(f => f !== feature)
        : [...prev.selectedFeatures, feature]
    }))
  }

  const handleGenerate = async () => {
    if (!formData.propertyType || !formData.location) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please select a property type and enter a location.',
      })
      return
    }

    setIsGenerating(true)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const allFeatures = [...formData.selectedFeatures]
    if (formData.customFeatures.trim()) {
      allFeatures.push(...formData.customFeatures.split(',').map(f => f.trim()).filter(Boolean))
    }

    const description = generateListingDescription(
      formData.propertyType,
      formData.bedrooms,
      formData.bathrooms,
      formData.sqft,
      formData.location,
      allFeatures
    )

    const newListing: GeneratedListing = {
      id: Date.now().toString(),
      propertyType: formData.propertyType,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      sqft: formData.sqft,
      location: formData.location,
      features: allFeatures,
      description,
      createdAt: new Date().toISOString(),
    }

    setGeneratedListing(newListing)
    setHistory(prev => [newListing, ...prev])
    setIsGenerating(false)

    toast({
      title: 'Listing generated!',
      description: 'Your AI-powered listing description is ready.',
    })
  }

  const handleCopy = () => {
    if (!generatedListing) return
    navigator.clipboard.writeText(generatedListing.description)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: 'Copied!',
      description: 'Listing description copied to clipboard.',
    })
  }

  const handleRegenerate = () => {
    handleGenerate()
  }

  const loadFromHistory = (listing: GeneratedListing) => {
    setGeneratedListing(listing)
    setFormData({
      propertyType: listing.propertyType,
      bedrooms: listing.bedrooms,
      bathrooms: listing.bathrooms,
      sqft: listing.sqft,
      location: listing.location,
      selectedFeatures: listing.features,
      customFeatures: '',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Listing Generator</h1>
        <p className="text-gray-500 mt-1">
          Generate compelling property descriptions in seconds
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Property Details
            </CardTitle>
            <CardDescription>
              Enter the property information to generate a description
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Property Type */}
            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., North York, Toronto"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms" className="flex items-center gap-2">
                  <Bed className="w-4 h-4" />
                  Bedrooms
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min={0}
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms" className="flex items-center gap-2">
                  <Bath className="w-4 h-4" />
                  Bathrooms
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min={0}
                  step={0.5}
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>

            {/* Square Footage */}
            <div className="space-y-2">
              <Label htmlFor="sqft" className="flex items-center gap-2">
                <Maximize className="w-4 h-4" />
                Square Footage
              </Label>
              <Input
                id="sqft"
                type="number"
                min={0}
                value={formData.sqft}
                onChange={(e) => setFormData({ ...formData, sqft: parseInt(e.target.value) || 0 })}
              />
            </div>

            {/* Features */}
            <div className="space-y-3">
              <Label>Key Features</Label>
              <div className="flex flex-wrap gap-2">
                {COMMON_FEATURES.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => handleFeatureToggle(feature)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      formData.selectedFeatures.includes(feature)
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Features */}
            <div className="space-y-2">
              <Label htmlFor="customFeatures">Additional Features (comma-separated)</Label>
              <Textarea
                id="customFeatures"
                placeholder="e.g., Wine cellar, Home theater, Solar panels"
                value={formData.customFeatures}
                onChange={(e) => setFormData({ ...formData, customFeatures: e.target.value })}
                rows={2}
              />
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full h-12 text-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Description
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output */}
        <div className="space-y-6">
          <Tabs defaultValue="preview" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preview">
                <Sparkles className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="history">
                <History className="w-4 h-4 mr-2" />
                History ({history.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-accent" />
                    Generated Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedListing ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                          {generatedListing.description}
                        </p>
                      </div>
                      
                      {/* Property Summary */}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-blue-50">
                          <Bed className="w-3 h-3 mr-1" />
                          {generatedListing.bedrooms} bed
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          <Bath className="w-3 h-3 mr-1" />
                          {generatedListing.bathrooms} bath
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          <Maximize className="w-3 h-3 mr-1" />
                          {generatedListing.sqft.toLocaleString()} sqft
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          <MapPin className="w-3 h-3 mr-1" />
                          {generatedListing.location}
                        </Badge>
                      </div>

                      {/* Selected Features */}
                      {generatedListing.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {generatedListing.features.map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          variant="outline"
                          onClick={handleCopy}
                          className="flex-1"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleRegenerate}
                          disabled={isGenerating}
                          className="flex-1"
                        >
                          <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-500">No description yet</p>
                      <p className="text-sm mt-1">Fill in the property details and click generate</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Generations</CardTitle>
                  <CardDescription>Your previously generated listings</CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No history yet</p>
                      <p className="text-sm">Generated listings will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((listing) => (
                        <div
                          key={listing.id}
                          onClick={() => loadFromHistory(listing)}
                          className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:shadow-md cursor-pointer transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {listing.bedrooms} bed, {listing.bathrooms} bath {listing.propertyType}
                              </p>
                              <p className="text-sm text-gray-500">{listing.location}</p>
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                {listing.description}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(listing.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {listing.features.slice(0, 3).map((feature, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {listing.features.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{listing.features.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Tips Card */}
          <Card className="bg-gradient-to-br from-primary-50 to-blue-50 border-primary-100">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Be specific with location names for better context
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Select key features that make the property stand out
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Use custom features for unique selling points
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  Regenerate for different variations of the description
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
