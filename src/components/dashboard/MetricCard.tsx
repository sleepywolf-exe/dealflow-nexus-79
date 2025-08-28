import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  trend?: number[];
}

export function MetricCard({ title, value, change, icon: Icon, trend }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          
          {change && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              change.type === 'increase' ? 'text-success' : 'text-destructive'
            }`}>
              <span className={`inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-l-transparent border-r-transparent ${
                change.type === 'increase' ? 'border-b-[6px] border-b-success' : 'border-t-[6px] border-t-destructive'
              }`}></span>
              <span className="font-medium">
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          
          {trend && (
            <div className="flex items-end gap-1 h-8">
              {trend.map((height, index) => (
                <div
                  key={index}
                  className="w-1.5 bg-primary/30 rounded-sm"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}