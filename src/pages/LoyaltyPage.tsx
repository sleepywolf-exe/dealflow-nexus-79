import { useState } from 'react';
import { Star, Gift, Users, Plus, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockClients } from '@/lib/mock-data';
import { useToast } from '@/hooks/use-toast';

export default function LoyaltyPage() {
  const { toast } = useToast();

  const handleAddPoints = (clientName: string) => {
    toast({
      title: "Points Added",
      description: `50 referral points added to ${clientName} (mock)`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Loyalty Program</h1>
          <p className="text-muted-foreground mt-1">Manage client referrals and reward points</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,450</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </CardContent></Card>
      </div>

      <Card className="data-card">
        <CardHeader>
          <CardTitle>Client Loyalty Points</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Points Balance</TableHead>
                <TableHead>Referrals Made</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>{client.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{client.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-primary/10 text-primary">{client.loyaltyPoints} points</Badge>
                  </TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleAddPoints(client.name)}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Points
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}