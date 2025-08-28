import { useState } from 'react';
import { User, Heart, MessageSquare, Phone, Mail, Star, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { mockClients, mockProperties } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState(mockClients[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSavedProperties = (clientId: string) => {
    const client = mockClients.find(c => c.id === clientId);
    if (!client) return [];
    
    return mockProperties.filter(property => 
      client.savedPropertyIds.includes(property.id)
    );
  };

  const handleAction = (action: string, clientName: string) => {
    toast({
      title: "Client Action",
      description: `${action} for ${clientName} (mock)`,
    });
  };

  const communicationHistory = [
    { id: '1', type: 'call', message: 'Discussed budget requirements', date: '2024-01-20', agent: 'Sarah Wilson' },
    { id: '2', type: 'email', message: 'Sent property recommendations', date: '2024-01-18', agent: 'Mike Chen' },
    { id: '3', type: 'whatsapp', message: 'Scheduled property viewing', date: '2024-01-15', agent: 'Sarah Wilson' },
    { id: '4', type: 'call', message: 'Follow-up on property interest', date: '2024-01-12', agent: 'Sarah Wilson' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Client Management</h1>
          <p className="text-muted-foreground mt-1">Manage client relationships and preferences</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          + Add Client
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1 space-y-4">
          <Input 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="data-card max-h-[700px] overflow-y-auto">
            <div className="space-y-2">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-muted/20 ${
                    selectedClient?.id === client.id ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{client.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{client.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Star className="w-3 h-3 text-warning" />
                        <span className="text-xs text-muted-foreground">{client.loyaltyPoints} points</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Client Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedClient && (
            <div className="data-card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary/20 text-primary text-lg">
                      {selectedClient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedClient.name}</h2>
                    <p className="text-muted-foreground">{selectedClient.email}</p>
                    <p className="text-muted-foreground">{selectedClient.phone}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-success/10 text-success">Active Client</Badge>
                      <Badge variant="outline">{selectedClient.loyaltyPoints} Points</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleAction('Call', selectedClient.name)}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('Email', selectedClient.name)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleAction('WhatsApp', selectedClient.name)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="properties">Saved Properties</TabsTrigger>
                  <TabsTrigger value="communications">Communications</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Saved Properties</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-primary">
                          {selectedClient.savedPropertyIds.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Loyalty Points</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-accent">
                          {selectedClient.loyaltyPoints}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Member Since</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-muted-foreground">
                          {selectedClient.createdAt.getFullYear()}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="preferences" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Property Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.preferences.propertyType.map(type => (
                          <Badge key={type} variant="secondary">{type}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Preferred Locations</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.preferences.locations.map(location => (
                          <Badge key={location} variant="secondary">{location}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Budget Range</h4>
                      <p className="text-lg font-semibold text-primary">
                        ${(selectedClient.preferences.budgetRange[0] / 1000).toFixed(0)}K - ${(selectedClient.preferences.budgetRange[1] / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Preferred Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedClient.preferences.amenities.map(amenity => (
                          <Badge key={amenity} variant="outline">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="properties" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {getSavedProperties(selectedClient.id).map(property => (
                      <Card key={property.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                                <Heart className="w-6 h-6 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-semibold">{property.title}</h4>
                                <p className="text-sm text-muted-foreground">{property.location}</p>
                                <p className="text-lg font-bold text-primary">${(property.price / 1000).toFixed(0)}K</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="communications" className="space-y-4">
                  <div className="space-y-3">
                    {communicationHistory.map(comm => (
                      <Card key={comm.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              comm.type === 'call' ? 'bg-success/10 text-success' :
                              comm.type === 'email' ? 'bg-primary/10 text-primary' :
                              'bg-accent/10 text-accent'
                            }`}>
                              {comm.type === 'call' ? <Phone className="w-4 h-4" /> :
                               comm.type === 'email' ? <Mail className="w-4 h-4" /> :
                               <MessageSquare className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{comm.message}</p>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <span>{comm.agent}</span>
                                <span>•</span>
                                <span>{comm.date}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}