import { Clock, Phone, Mail, Calendar, User, Building2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const recentActivities = [
  {
    id: '1',
    type: 'call',
    title: 'Called Alex Johnson',
    description: 'Discussed financing options for Downtown Apartment',
    user: 'Sarah Wilson',
    time: '2 hours ago',
    icon: Phone,
    iconColor: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: '2',
    type: 'email',
    title: 'Sent property brochure to Maria Rodriguez',
    description: 'Luxury Villa with Garden - Uptown location',
    user: 'Mike Chen',
    time: '4 hours ago',
    icon: Mail,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: '3',
    type: 'meeting',
    title: 'Property viewing scheduled',
    description: 'David Kim - Waterfront Penthouse viewing tomorrow at 2 PM',
    user: 'Sarah Wilson',
    time: '6 hours ago',
    icon: Calendar,
    iconColor: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    id: '4',
    type: 'lead',
    title: 'New lead assigned',
    description: 'Jennifer Taylor looking for Downtown apartment',
    user: 'System',
    time: '8 hours ago',
    icon: User,
    iconColor: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    id: '5',
    type: 'property',
    title: 'Property price updated',
    description: 'Modern Downtown Apartment reduced by $50K',
    user: 'Mike Chen',
    time: '1 day ago',
    icon: Building2,
    iconColor: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

export function RecentActivity() {
  return (
    <div className="data-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest updates across your CRM</p>
        </div>
        <Badge variant="outline" className="text-xs">
          Live
        </Badge>
      </div>
      
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-colors">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${activity.bgColor}`}>
              <activity.icon className={`w-5 h-5 ${activity.iconColor}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span className="whitespace-nowrap">{activity.time}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-5 h-5">
                  <AvatarFallback className="text-[10px] bg-muted">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{activity.user}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  );
}