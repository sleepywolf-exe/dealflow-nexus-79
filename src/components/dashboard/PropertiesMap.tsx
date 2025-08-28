import { MapPin, TrendingUp } from 'lucide-react';
import { mockProperties } from '@/lib/mock-data';

export function PropertiesMap() {
  const locationStats = [
    { location: 'Downtown', count: 8, avgPrice: 950000, trend: 'up' },
    { location: 'Uptown', count: 5, avgPrice: 1750000, trend: 'up' },
    { location: 'Waterfront', count: 3, avgPrice: 2800000, trend: 'down' },
    { location: 'Midtown', count: 12, avgPrice: 1200000, trend: 'up' },
  ];

  return (
    <div className="data-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Property Heatmap</h3>
        <p className="text-sm text-muted-foreground">Properties by location and pricing trends</p>
      </div>
      
      {/* Mock Map Visualization */}
      <div className="relative bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(52,92,255,0.3),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(32,201,151,0.3),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(245,158,11,0.3),transparent_50%)]" />
        
        {/* Map Pins */}
        {locationStats.map((stat, index) => (
          <div 
            key={stat.location}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{
              left: `${25 + (index * 20)}%`,
              top: `${30 + (index % 2 * 40)}%`
            }}
          >
            <div className="relative">
              <MapPin className="w-6 h-6 text-primary drop-shadow-lg animate-bounce" />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border shadow-lg">
                {stat.location}: {stat.count} properties
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Location Stats */}
      <div className="space-y-3">
        {locationStats.map((stat) => (
          <div key={stat.location} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary" />
              <div>
                <p className="font-medium">{stat.location}</p>
                <p className="text-sm text-muted-foreground">{stat.count} properties</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-medium">${(stat.avgPrice / 1000).toFixed(0)}K avg</p>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-success' : 'text-destructive'
              }`}>
                <TrendingUp className={`w-3 h-3 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span className="text-xs">{stat.trend === 'up' ? '+5%' : '-2%'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}