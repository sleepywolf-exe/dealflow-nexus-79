import { useState } from 'react';
import { Phone, Mail, MessageSquare, Calendar, Eye, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { mockLeads, mockUsers } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const filteredLeads = mockLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'New': 'status-new',
      'Qualified': 'status-qualified',
      'Visit Scheduled': 'status-new',
      'Negotiation': 'status-negotiation',
      'Closed': 'status-closed',
      'Lost': 'status-lost',
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-new';
  };

  const handleQuickAction = (action: string, leadName: string) => {
    toast({
      title: "Quick Action",
      description: `${action} initiated for ${leadName} (mock)`,
    });
  };

  const getAgentName = (agentId: string) => {
    const agent = mockUsers.find(user => user.id === agentId);
    return agent ? agent.name : 'Unknown';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Leads Management</h1>
          <p className="text-muted-foreground mt-1">Track and nurture your sales leads</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          + Add Lead
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search leads..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Export</Button>
      </div>

      {/* Leads Table */}
      <div className="data-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Budget Range</TableHead>
              <TableHead>Quick Actions</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="hover:bg-muted/20">
                <TableCell>
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <div className="flex gap-1 mt-1">
                      {lead.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm">{lead.email}</p>
                    <p className="text-sm text-muted-foreground">{lead.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{lead.source}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{lead.type}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{lead.score}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`status-badge ${getStatusBadge(lead.status)}`}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{getAgentName(lead.assignedTo)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    ${(lead.budgetMin / 1000).toFixed(0)}K - ${(lead.budgetMax / 1000).toFixed(0)}K
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="action-button p-2 h-8 w-8"
                      onClick={() => handleQuickAction('Call', lead.name)}
                    >
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="action-button p-2 h-8 w-8"
                      onClick={() => handleQuickAction('WhatsApp', lead.name)}
                    >
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="action-button p-2 h-8 w-8"
                      onClick={() => handleQuickAction('Email', lead.name)}
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="action-button p-2 h-8 w-8"
                      onClick={() => handleQuickAction('Schedule Visit', lead.name)}
                    >
                      <Calendar className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-2 h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Lead</DropdownMenuItem>
                      <DropdownMenuItem>Convert to Client</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Lead
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}