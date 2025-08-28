import { useState } from 'react';
import { User, Building2, DollarSign, Phone, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockDeals, mockLeads, mockProperties, mockUsers } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

const stages = [
  { id: 'Inquiry', name: 'Inquiry', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'Qualified', name: 'Qualified', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
  { id: 'Visit', name: 'Visit Scheduled', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { id: 'Negotiation', name: 'Negotiation', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' },
  { id: 'Legal', name: 'Legal Review', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
  { id: 'Closed', name: 'Closed Won', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' },
];

export default function PipelinePage() {
  const [deals, setDeals] = useState(mockDeals);
  const { toast } = useToast();

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newDeals = Array.from(deals);
    const dealIndex = newDeals.findIndex(deal => deal.id === result.draggableId);
    
    if (dealIndex !== -1) {
      newDeals[dealIndex] = {
        ...newDeals[dealIndex],
        stage: result.destination.droppableId as any,
        updatedAt: new Date(),
      };
      setDeals(newDeals);
      
      toast({
        title: "Deal Updated",
        description: `Deal moved to ${result.destination.droppableId} stage`,
      });
    }
  };

  const getDealsByStage = (stageId: string) => {
    return deals.filter(deal => deal.stage === stageId);
  };

  const getLeadName = (leadId: string) => {
    const lead = mockLeads.find(l => l.id === leadId);
    return lead ? lead.name : 'Unknown Lead';
  };

  const getPropertyTitle = (propertyId: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    return property ? property.title : 'Unknown Property';
  };

  const getAgentName = (agentId: string) => {
    const agent = mockUsers.find(u => u.id === agentId);
    return agent ? agent.name : 'Unknown Agent';
  };

  // Mock implementation without react-beautiful-dnd for now
  const SimplePipeline = () => (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Sales Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track deals through your sales process</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          + Add Deal
        </Button>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stages.map((stage) => {
          const stageDeals = getDealsByStage(stage.id);
          const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
          
          return (
            <div key={stage.id} className="data-card min-h-[500px]">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`status-badge ${stage.color}`}>
                    {stage.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{stageDeals.length}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  ${(stageValue / 1000).toFixed(0)}K total
                </p>
              </div>

              <div className="space-y-3">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium line-clamp-1">
                        {getLeadName(deal.leadId)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {getPropertyTitle(deal.propertyId)}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary">
                          ${(deal.value / 1000).toFixed(0)}K
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{getAgentName(deal.agentId)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                          <Mail className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1 h-6 w-6">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Updated {deal.updatedAt.toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full h-12 border-dashed border-2 border-muted-foreground/20 hover:border-primary/50 text-muted-foreground hover:text-primary"
                >
                  + Add Deal
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{deals.length}</p>
              <p className="text-sm text-muted-foreground">Total Deals</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">${(deals.reduce((sum, deal) => sum + deal.value, 0) / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-muted-foreground">Pipeline Value</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                ${(deals.reduce((sum, deal) => sum + deal.value, 0) / deals.length / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-muted-foreground">Avg Deal Size</p>
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">24%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <SimplePipeline />;
}