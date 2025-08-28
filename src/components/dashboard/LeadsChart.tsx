import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Website', value: 45, color: 'bg-primary' },
  { name: 'WhatsApp', value: 32, color: 'bg-accent' },
  { name: 'Portal', value: 28, color: 'bg-warning' },
  { name: 'Referral', value: 15, color: 'bg-success' },
  { name: 'Manual', value: 8, color: 'bg-destructive' },
];

export function LeadsChart() {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="data-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Leads by Source</h3>
        <p className="text-sm text-muted-foreground">Lead acquisition channels this month</p>
      </div>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-4">
            <div className="w-20 text-sm font-medium">{item.name}</div>
            <div className="flex-1 relative h-8 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
            </div>
            <div className="w-12 text-sm font-semibold text-right">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4 text-success" />
        <span>+12% increase from last month</span>
      </div>
    </div>
  );
}