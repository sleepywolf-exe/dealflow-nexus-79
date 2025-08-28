import { useState } from 'react';
import { CreditCard, DollarSign, Receipt, Send, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
import { mockClients, mockDeals, mockLeads, mockProperties } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function PaymentsPage() {
  const [amount, setAmount] = useState('');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDeal, setSelectedDeal] = useState('');
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  // Mock payment data
  const payments = [
    {
      id: '1',
      client: 'Alex Johnson',
      deal: 'Downtown Apartment Purchase',
      amount: 50000,
      type: 'Token Payment',
      status: 'completed',
      method: 'Bank Transfer',
      createdAt: new Date('2024-01-18'),
      paidAt: new Date('2024-01-18'),
      reference: 'PAY-2024-001',
    },
    {
      id: '2',
      client: 'Maria Rodriguez',
      deal: 'Villa Purchase',
      amount: 100000,
      type: 'Down Payment',
      status: 'pending',
      method: 'Credit Card',
      createdAt: new Date('2024-01-16'),
      reference: 'PAY-2024-002',
    },
    {
      id: '3',
      client: 'David Kim',
      deal: 'Penthouse Purchase',
      amount: 150000,
      type: 'Token Payment',
      status: 'failed',
      method: 'Bank Transfer',
      createdAt: new Date('2024-01-14'),
      reference: 'PAY-2024-003',
    },
  ];

  const handleSendPaymentLink = () => {
    if (!selectedClient || !amount) {
      toast({
        title: "Missing Information",
        description: "Please select a client and enter an amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Payment Link Sent",
      description: `Payment link for $${Number(amount).toLocaleString()} sent to client (mock)`,
    });

    // Reset form
    setAmount('');
    setSelectedClient('');
    setSelectedDeal('');
    setDescription('');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return AlertCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPaymentStats = () => {
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const completedPayments = payments.filter(p => p.status === 'completed');
    const pendingPayments = payments.filter(p => p.status === 'pending');
    const completedAmount = completedPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const pendingAmount = pendingPayments.reduce((sum, payment) => sum + payment.amount, 0);

    return {
      totalAmount,
      completedAmount,
      pendingAmount,
      totalCount: payments.length,
      completedCount: completedPayments.length,
      pendingCount: pendingPayments.length,
    };
  };

  const stats = getPaymentStats();

  const handlePaymentAction = (action: string, payment: any) => {
    toast({
      title: "Payment Action",
      description: `${action} for ${payment.reference} (mock)`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Payment Management</h1>
          <p className="text-muted-foreground mt-1">Collect token payments and manage transactions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(stats.totalAmount / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Total Payments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(stats.completedAmount / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Completed ({stats.completedCount})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">${(stats.pendingAmount / 1000).toFixed(0)}K</p>
                <p className="text-sm text-muted-foreground">Pending ({stats.pendingCount})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalCount}</p>
                <p className="text-sm text-muted-foreground">Total Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Form */}
        <div className="lg:col-span-1">
          <Card className="data-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Collect Token Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="client">Client</Label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
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
                <Label htmlFor="deal">Related Deal (Optional)</Label>
                <Select value={selectedDeal} onValueChange={setSelectedDeal}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deal" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockDeals.map(deal => {
                      const lead = mockLeads.find(l => l.id === deal.leadId);
                      const property = mockProperties.find(p => p.id === deal.propertyId);
                      return (
                        <SelectItem key={deal.id} value={deal.id}>
                          {lead?.name} - {property?.title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Token payment for property purchase"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <CreditCard className="w-6 h-6" />
                    <span className="text-xs">Credit Card</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Receipt className="w-6 h-6" />
                    <span className="text-xs">Bank Transfer</span>
                  </Button>
                </div>
              </div>

              <Button onClick={handleSendPaymentLink} className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Payment Link
              </Button>

              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Payment link will be sent to the client's registered email address. 
                  They can complete the payment securely through our payment gateway.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <div className="lg:col-span-2">
          <Card className="data-card">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Deal</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => {
                    const StatusIcon = getStatusIcon(payment.status);
                    
                    return (
                      <TableRow key={payment.id} className="hover:bg-muted/20">
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                              <Receipt className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{payment.reference}</p>
                              <p className="text-xs text-muted-foreground">{payment.method}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{payment.client}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm line-clamp-1">{payment.deal}</p>
                            <Badge variant="outline" className="text-xs">{payment.type}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-bold text-primary">
                            ${payment.amount.toLocaleString()}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded flex items-center justify-center ${getStatusColor(payment.status)}`}>
                              <StatusIcon className="w-4 h-4" />
                            </div>
                            <span className="capitalize text-sm">{payment.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{payment.createdAt.toLocaleDateString()}</p>
                            {payment.paidAt && (
                              <p className="text-xs text-muted-foreground">
                                Paid: {payment.paidAt.toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="p-2"
                              onClick={() => handlePaymentAction('View Receipt', payment)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            {payment.status === 'pending' && (
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="p-2"
                                onClick={() => handlePaymentAction('Resend Link', payment)}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}