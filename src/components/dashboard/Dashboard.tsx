import { Users, TrendingUp, DollarSign, Target, Calendar, MapPin } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { LeadsChart } from './LeadsChart';
import { PropertiesMap } from './PropertiesMap';
import { RecentActivity } from './RecentActivity';
import { mockMetrics } from '@/lib/mock-data';

export default function Dashboard() {
  const metrics = [
    {
      title: 'New Leads',
      value: mockMetrics.newLeads,
      change: { value: 12, type: 'increase' as const },
      icon: Users,
      trend: [40, 55, 35, 70, 45, 60, 80, 55, 65, 75, 85, 70],
    },
    {
      title: 'Deals in Negotiation',
      value: mockMetrics.dealsInNegotiation,
      change: { value: 8, type: 'increase' as const },
      icon: TrendingUp,
      trend: [30, 45, 55, 40, 65, 50, 70, 60, 45, 55, 65, 80],
    },
    {
      title: 'Total Revenue',
      value: `$${(mockMetrics.totalRevenue / 1000000).toFixed(1)}M`,
      change: { value: 15, type: 'increase' as const },
      icon: DollarSign,
      trend: [50, 60, 45, 70, 55, 65, 75, 85, 70, 80, 90, 85],
    },
    {
      title: 'Conversion Rate',
      value: `${mockMetrics.conversionRate}%`,
      change: { value: 3, type: 'increase' as const },
      icon: Target,
      trend: [60, 50, 65, 55, 70, 60, 65, 75, 80, 70, 75, 85],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Sarah! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            trend={metric.trend}
          />
        ))}
      </div>

      {/* Charts and Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadsChart />
        <PropertiesMap />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}