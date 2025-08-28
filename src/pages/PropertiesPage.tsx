import { useState } from 'react';
import { Grid, Map, Filter, Eye, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockProperties } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function PropertiesPage() {
  const [viewType, setViewType] = useState<'grid' | 'map'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredProperties = mockProperties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, propertyTitle: string) => {
    toast({
      title: "Property Action",
      description: `${action} for ${propertyTitle} (mock)`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Properties</h1>
          <p className="text-muted-foreground mt-1">Manage your property listings</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          + Add Property
        </Button>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Search properties..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant={viewType === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('grid')}
            className="gap-2"
          >
            <Grid className="w-4 h-4" />
            Grid
          </Button>
          <Button 
            variant={viewType === 'map' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('map')}
            className="gap-2"
          >
            <Map className="w-4 h-4" />
            Map
          </Button>
        </div>
      </div>

      {/* Properties Content */}
      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="data-card group cursor-pointer">
              {/* Property Image */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-primary-foreground">
                    {property.type}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                    onClick={() => handleAction('Saved', property.title)}
                  >
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="p-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                    onClick={() => handleAction('Shared', property.title)}
                  >
                    <Share2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-2xl font-bold">${(property.price / 1000).toFixed(0)}K</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{property.bed} bed</span>
                  <span>{property.bath} bath</span>
                  <span>{property.areaSqft.toLocaleString()} sqft</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {property.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{property.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div>
                    <p className="text-sm font-medium">Owner: {property.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{property.ownerPhone}</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="gap-2"
                    onClick={() => handleAction('View Details', property.title)}
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="data-card h-[600px]">
          {/* Mock Map View */}
          <div className="h-full bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(52,92,255,0.2),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(32,201,151,0.2),transparent_40%),radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.2),transparent_40%)]" />
            
            {/* Mock Property Pins */}
            {filteredProperties.map((property, index) => (
              <div 
                key={property.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${30 + (index * 15)}%`,
                  top: `${40 + (index % 2 * 20)}%`
                }}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
                    ${(property.price / 1000).toFixed(0)}K
                  </div>
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground p-2 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border shadow-lg z-10">
                    <p className="font-medium">{property.title}</p>
                    <p className="text-muted-foreground">{property.location}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center">
              <Map className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl font-semibold text-muted-foreground">Interactive Map View</p>
              <p className="text-muted-foreground">Properties shown with location pins</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}