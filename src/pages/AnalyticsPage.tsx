import { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Target, MapPin, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockLeads, mockDeals, mockProperties, mockUsers, mockMetrics } from '@/lib/mock-data';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30days');
  
  // Mock analytics data
  const kpiMetrics = [
    {
      title: 'Total Revenue',
      value: '$8.7M',
      change: '+15.2%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'Total revenue this month',
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      change: '+3.1%',
      changeType: 'positive' as const,
      icon: Target,
      description: 'Lead to client conversion',
    },
    {
      title: 'Active Deals',
      value: '47',
      change: '+8',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'Deals in pipeline',
    },
    {
      title: 'Avg Deal Size',
      value: '$1.8M',
      change: '-5.2%',
      changeType: 'negative' as const,
      icon: BarChart3,
      description: 'Average deal value',
    },
  ];

  // Agent performance data
  const agentPerformance = [
    {
      id: '2',
      name: 'Sarah Wilson',
      role: 'Senior Agent',
      dealsCompleted: 12,
      revenue: 2100000,
      conversionRate: 28,
      clientSatisfaction: 4.8,
      target: 2000000,
    },
    {
      id: '3',
      name: 'Mike Chen',
      role: 'Agent',
      dealsCompleted: 8,
      revenue: 1400000,
      conversionRate: 22,
      clientSatisfaction: 4.6,
      target: 1500000,
    },
  ];

  // Location performance data
  const locationMetrics = [
    {
      location: 'Downtown',
      properties: 15,
      avgPrice: 950000,
      dealsCompleted: 8,
      trend: '+12%',
      trendType: 'positive' as const,
    },
    {
      location: 'Uptown',
      properties: 12,
      avgPrice: 1750000,
      dealsCompleted: 5,
      trend: '+8%',
      trendType: 'positive' as const,
    },
    {
      location: 'Waterfront',
      properties: 8,
      avgPrice: 2800000,
      dealsCompleted: 3,
      trend: '-2%',
      trendType: 'negative' as const,
    },
    {
      location: 'Midtown',
      properties: 20,
      avgPrice: 1200000,
      dealsCompleted: 12,
      trend: '+15%',
      trendType: 'positive' as const,
    },
  ];

  // Sales funnel data
  const salesFunnel = [
    { stage: 'Leads Generated', count: 150, percentage: 100 },
    { stage: 'Qualified Leads', count: 85, percentage: 57 },
    { stage: 'Property Visits', count: 45, percentage: 30 },
    { stage: 'Offers Made', count: 28, percentage: 19 },
    { stage: 'Deals Closed', count: 12, percentage: 8 },
  ];

  const getChangeColor = (type: 'positive' | 'negative') => {
    return type === 'positive' ? 'text-success' : 'text-destructive';
  };

  const getTrendColor = (type: 'positive' | 'negative') => {
    return type === 'positive' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Performance insights and business intelligence</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index} className="metric-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">{metric.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{metric.value}</p>
                    <div className={`flex items-center gap-1 mt-2 text-sm ${getChangeColor(metric.changeType)}`}>
                      <TrendingUp className={`w-3 h-3 ${metric.changeType === 'negative' ? 'rotate-180' : ''}`} />
                      <span className="font-medium">{metric.change}</span>
                      <span className="text-muted-foreground">vs last period</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Funnel */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle>Sales Funnel Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {salesFunnel.map((stage, index) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{stage.count}</span>
                    <Badge variant="secondary">{stage.percentage}%</Badge>
                  </div>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-muted/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-primary" />
                <span className="font-medium">Overall Conversion Rate: 8%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                12 deals closed from 150 initial leads
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card className="data-card">
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {agentPerformance.map((agent) => {
              const targetProgress = (agent.revenue / agent.target) * 100;
              
              return (
                <div key={agent.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{agent.name}</h4>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                    <Badge className={targetProgress >= 100 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>
                      {targetProgress.toFixed(0)}% of target
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Revenue Target</span>
                      <span className="font-medium">
                        ${(agent.revenue / 1000000).toFixed(1)}M / ${(agent.target / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <Progress value={targetProgress} className="h-2" />
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-primary">{agent.dealsCompleted}</p>
                        <p className="text-xs text-muted-foreground">Deals</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-accent">{agent.conversionRate}%</p>
                        <p className="text-xs text-muted-foreground">Conversion</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-warning">{agent.clientSatisfaction}</p>
                        <p className="text-xs text-muted-foreground">Rating</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Location Performance Heatmap */}
      <Card className="data-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Location Performance Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {locationMetrics.map((location) => (
              <div key={location.location} className="p-4 bg-gradient-to-br from-muted/20 to-muted/10 rounded-lg border">
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold">{location.location}</h4>
                  <div className={`flex items-center gap-1 text-sm ${getTrendColor(location.trendType)}`}>
                    <TrendingUp className={`w-3 h-3 ${location.trendType === 'negative' ? 'rotate-180' : ''}`} />
                    <span className="font-medium">{location.trend}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Properties</span>
                    <span className="font-medium">{location.properties}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avg Price</span>
                    <span className="font-medium">${(location.avgPrice / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deals Closed</span>
                    <span className="font-bold text-primary">{location.dealsCompleted}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000"
                      style={{ width: `${(location.dealsCompleted / 15) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="data-card">
          <CardHeader>
            <CardTitle className="text-lg">Lead Sources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { source: 'Website', count: 45, percentage: 35 },
              { source: 'WhatsApp', count: 32, percentage: 25 },
              { source: 'Referrals', count: 28, percentage: 22 },
              { source: 'Portals', count: 23, percentage: 18 },
            ].map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <span className="text-sm font-medium">{source.source}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{source.count}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="data-card">
          <CardHeader>
            <CardTitle className="text-lg">Property Types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { type: 'Apartment', count: 25, value: 23750000 },
              { type: 'Villa', count: 15, value: 26250000 },
              { type: 'Penthouse', count: 8, value: 22400000 },
              { type: 'Commercial', count: 5, value: 8750000 },
            ].map((property) => (
              <div key={property.type} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{property.type}</p>
                  <p className="text-xs text-muted-foreground">{property.count} properties</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">
                    ${(property.value / 1000000).toFixed(1)}M
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="data-card">
          <CardHeader>
            <CardTitle className="text-lg">Monthly Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold gradient-text">73%</p>
              <p className="text-sm text-muted-foreground">Overall Progress</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Revenue Target</span>
                  <span>$7.3M / $10M</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Deals Target</span>
                  <span>18 / 25</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Leads Target</span>
                  <span>128 / 150</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}