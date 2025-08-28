import { useState } from 'react';
import { Phone, Mail, MessageSquare, Calendar, Filter, Search, Plus, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

export default function CommunicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { toast } = useToast();

  // Mock communication data
  const communications = [
    {
      id: '1',
      type: 'call',
      direction: 'outgoing',
      contact: 'Alex Johnson',
      contactType: 'Lead',
      agent: 'Sarah Wilson',
      duration: '5:30',
      status: 'completed',
      notes: 'Discussed financing options and scheduled property viewing',
      timestamp: new Date('2024-01-20T14:30:00'),
      tags: ['Hot Lead', 'Financing'],
    },
    {
      id: '2',
      type: 'email',
      direction: 'outgoing',
      contact: 'Maria Rodriguez',
      contactType: 'Client',
      agent: 'Mike Chen',
      subject: 'Property Brochure - Luxury Villa',
      status: 'sent',
      notes: 'Sent detailed brochure with pricing and amenities',
      timestamp: new Date('2024-01-20T10:15:00'),
      tags: ['Follow-up', 'Brochure'],
    },
    {
      id: '3',
      type: 'whatsapp',
      direction: 'incoming',
      contact: 'David Kim',
      contactType: 'Lead',
      agent: 'Sarah Wilson',
      status: 'read',
      notes: 'Client inquired about waterfront properties availability',
      timestamp: new Date('2024-01-19T16:45:00'),
      tags: ['Inquiry', 'Waterfront'],
    },
    {
      id: '4',
      type: 'call',
      direction: 'incoming',
      contact: 'Jennifer Taylor',
      contactType: 'Client',
      agent: 'Mike Chen',
      duration: '12:45',
      status: 'completed',
      notes: 'Property negotiation - agreed on final terms',
      timestamp: new Date('2024-01-19T11:20:00'),
      tags: ['Negotiation', 'Closing'],
    },
    {
      id: '5',
      type: 'email',
      direction: 'outgoing',
      contact: 'Robert Brown',
      contactType: 'Owner',
      agent: 'Sarah Wilson',
      subject: 'Monthly Property Report',
      status: 'delivered',
      notes: 'Sent monthly performance report and rental income',
      timestamp: new Date('2024-01-18T09:00:00'),
      tags: ['Report', 'Owner'],
    },
  ];

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.agent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || comm.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'whatsapp': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'text-success bg-success/10';
      case 'email': return 'text-primary bg-primary/10';
      case 'whatsapp': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusBadge = (type: string, status: string) => {
    if (type === 'call') {
      return status === 'completed' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive';
    }
    if (type === 'email') {
      switch (status) {
        case 'sent': return 'bg-primary/10 text-primary';
        case 'delivered': return 'bg-success/10 text-success';
        case 'read': return 'bg-accent/10 text-accent';
        default: return 'bg-muted/10 text-muted-foreground';
      }
    }
    return 'bg-muted/10 text-muted-foreground';
  };

  const handleQuickAction = (action: string, contact: string) => {
    toast({
      title: "Communication Action",
      description: `${action} initiated with ${contact} (mock)`,
    });
  };

  const getTodaysCommunications = () => {
    const today = new Date().toDateString();
    return communications.filter(comm => comm.timestamp.toDateString() === today);
  };

  const getCommunicationStats = () => {
    const total = communications.length;
    const calls = communications.filter(c => c.type === 'call').length;
    const emails = communications.filter(c => c.type === 'email').length;
    const whatsapp = communications.filter(c => c.type === 'whatsapp').length;
    
    return { total, calls, emails, whatsapp };
  };

  const stats = getCommunicationStats();

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Communications Hub</h1>
          <p className="text-muted-foreground mt-1">Unified communication log and quick actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleQuickAction('Call', 'New Contact')}>
            <Phone className="w-4 h-4 mr-2" />
            Make Call
          </Button>
          <Button variant="outline" onClick={() => handleQuickAction('Email', 'New Contact')}>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => handleQuickAction('WhatsApp', 'New Contact')}>
            <MessageSquare className="w-4 h-4 mr-2" />
            WhatsApp
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Communications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.calls}</p>
                <p className="text-sm text-muted-foreground">Calls</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.emails}</p>
                <p className="text-sm text-muted-foreground">Emails</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.whatsapp}</p>
                <p className="text-sm text-muted-foreground">WhatsApp</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search communications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Communications</SelectItem>
            <SelectItem value="call">Calls</SelectItem>
            <SelectItem value="email">Emails</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Communications Table */}
      <div className="data-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCommunications.map((comm) => {
              const TypeIcon = getTypeIcon(comm.type);
              
              return (
                <TableRow key={comm.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(comm.type)}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium capitalize">{comm.type}</p>
                        <p className="text-xs text-muted-foreground">{comm.direction}</p>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {comm.contact.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{comm.contact}</p>
                        <Badge variant="outline" className="text-xs">{comm.contactType}</Badge>
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <span className="text-sm">{comm.agent}</span>
                  </TableCell>
                  
                  <TableCell>
                    <div className="max-w-xs">
                      {comm.subject && (
                        <p className="font-medium text-sm line-clamp-1">{comm.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">{comm.notes}</p>
                      {comm.duration && (
                        <p className="text-xs text-muted-foreground mt-1">Duration: {comm.duration}</p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1">
                        {comm.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`status-badge ${getStatusBadge(comm.type, comm.status)}`}>
                      {comm.status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">
                      <p>{comm.timestamp.toLocaleDateString()}</p>
                      <p className="text-muted-foreground">{comm.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="ghost" className="p-2 h-8 w-8" onClick={() => handleQuickAction('Call', comm.contact)}>
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2 h-8 w-8" onClick={() => handleQuickAction('Email', comm.contact)}>
                        <Mail className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="p-2 h-8 w-8" onClick={() => handleQuickAction('WhatsApp', comm.contact)}>
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}