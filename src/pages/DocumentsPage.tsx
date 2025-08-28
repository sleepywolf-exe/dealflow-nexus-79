import { useState } from 'react';
import { FileText, Download, Share2, Edit, Trash2, Eye, Plus, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { mockLeads, mockProperties, mockClients } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Mock document templates
  const documentTemplates = [
    {
      id: '1',
      name: 'Offer Letter',
      description: 'Standard property offer letter template',
      category: 'Purchase',
      lastModified: new Date('2024-01-15'),
      usageCount: 45,
    },
    {
      id: '2',
      name: 'Sale Agreement',
      description: 'Comprehensive property sale agreement',
      category: 'Purchase',
      lastModified: new Date('2024-01-10'),
      usageCount: 32,
    },
    {
      id: '3',
      name: 'Lease Agreement',
      description: 'Rental property lease agreement',
      category: 'Rental',
      lastModified: new Date('2024-01-08'),
      usageCount: 28,
    },
    {
      id: '4',
      name: 'Property Disclosure',
      description: 'Property condition and disclosure form',
      category: 'Legal',
      lastModified: new Date('2024-01-05'),
      usageCount: 15,
    },
    {
      id: '5',
      name: 'Commission Agreement',
      description: 'Agent commission agreement template',
      category: 'Commission',
      lastModified: new Date('2024-01-03'),
      usageCount: 12,
    },
  ];

  // Mock generated documents
  const generatedDocuments = [
    {
      id: '1',
      name: 'Sale Agreement - Alex Johnson',
      template: 'Sale Agreement',
      client: 'Alex Johnson',
      property: 'Modern Downtown Apartment',
      status: 'signed',
      createdAt: new Date('2024-01-18'),
      signedAt: new Date('2024-01-20'),
    },
    {
      id: '2',
      name: 'Offer Letter - Maria Rodriguez',
      template: 'Offer Letter',
      client: 'Maria Rodriguez',
      property: 'Luxury Villa with Garden',
      status: 'pending',
      createdAt: new Date('2024-01-16'),
    },
    {
      id: '3',
      name: 'Lease Agreement - David Kim',
      template: 'Lease Agreement',
      client: 'David Kim',
      property: 'Waterfront Penthouse',
      status: 'draft',
      createdAt: new Date('2024-01-14'),
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'signed': return CheckCircle;
      case 'pending': return Clock;
      case 'draft': return FileText;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'draft': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleGenerateDocument = () => {
    toast({
      title: "Document Generated",
      description: "Agreement preview has been generated successfully",
    });
  };

  const handleSendForESign = () => {
    toast({
      title: "E-sign Request Sent",
      description: "Document sent for electronic signature (mock)",
    });
  };

  const handleDocumentAction = (action: string, document: string) => {
    toast({
      title: "Document Action",
      description: `${action} for ${document} (mock)`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Document Management</h1>
          <p className="text-muted-foreground mt-1">Manage templates, generate agreements, and track signatures</p>
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Document Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Template Name</Label>
                  <Input placeholder="Enter template name" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="rental">Rental</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Create Template</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Generate Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Agreement</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTemplates.map(template => (
                        <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Property</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProperties.map(property => (
                        <SelectItem key={property.id} value={property.id}>{property.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleGenerateDocument} className="flex-1">
                    Generate Preview
                  </Button>
                  <Button onClick={handleSendForESign} variant="outline" className="flex-1">
                    Send for E-sign
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Document Templates</TabsTrigger>
          <TabsTrigger value="generated">Generated Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          {/* Search */}
          <Input 
            placeholder="Search templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documentTemplates.map((template) => (
              <Card key={template.id} className="data-card hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Used {template.usageCount} times</span>
                    <span>Modified {template.lastModified.toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleDocumentAction('Preview', template.name)}>
                      <Eye className="w-3 h-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => handleDocumentAction('Edit', template.name)}>
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="ghost" className="p-2">
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handleGenerateDocument}>
                  <FileText className="w-8 h-8" />
                  <span>Generate Agreement</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={handleSendForESign}>
                  <Share2 className="w-8 h-8" />
                  <span>Send for E-sign</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2" onClick={() => handleDocumentAction('Bulk Export', 'All Templates')}>
                  <Download className="w-8 h-8" />
                  <span>Bulk Export</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generated" className="space-y-4">
          <div className="data-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedDocuments.map((doc) => {
                  const StatusIcon = getStatusIcon(doc.status);
                  
                  return (
                    <TableRow key={doc.id} className="hover:bg-muted/20">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.signedAt && `Signed ${doc.signedAt.toLocaleDateString()}`}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{doc.template}</Badge>
                      </TableCell>
                      <TableCell>{doc.client}</TableCell>
                      <TableCell className="max-w-xs">
                        <span className="line-clamp-1">{doc.property}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded flex items-center justify-center ${getStatusColor(doc.status)}`}>
                            <StatusIcon className="w-4 h-4" />
                          </div>
                          <span className="capitalize">{doc.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>{doc.createdAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button size="sm" variant="ghost" className="p-2" onClick={() => handleDocumentAction('View', doc.name)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2" onClick={() => handleDocumentAction('Download', doc.name)}>
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="p-2" onClick={() => handleDocumentAction('Share', doc.name)}>
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}