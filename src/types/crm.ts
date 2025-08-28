export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Website' | 'WhatsApp' | 'Portal' | 'Referral' | 'Manual';
  type: 'Buyer' | 'Seller' | 'Tenant' | 'Landlord';
  tags: string[];
  score: number;
  status: 'New' | 'Qualified' | 'Visit Scheduled' | 'Negotiation' | 'Closed' | 'Lost';
  budgetMin: number;
  budgetMax: number;
  locations: string[];
  assignedTo: string;
  lastContactedAt: Date;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Commercial';
  location: string;
  price: number;
  areaSqft: number;
  bed: number;
  bath: number;
  amenities: string[];
  lat: number;
  lng: number;
  ownerName: string;
  ownerPhone: string;
  images: string[];
  createdAt: Date;
  description: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferences: {
    propertyType: string[];
    locations: string[];
    budgetRange: [number, number];
    amenities: string[];
  };
  savedPropertyIds: string[];
  loyaltyPoints: number;
  createdAt: Date;
}

export interface Deal {
  id: string;
  leadId: string;
  propertyId: string;
  stage: 'Inquiry' | 'Qualified' | 'Visit' | 'Negotiation' | 'Legal' | 'Closed';
  value: number;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueAt: Date;
  relatedType: 'Lead' | 'Deal' | 'Property';
  relatedId: string;
  assigneeId: string;
  status: 'Open' | 'Done';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Agent' | 'Owner';
  email: string;
  avatar?: string;
}

export interface DashboardMetrics {
  newLeads: number;
  dealsInNegotiation: number;
  closedDealsThisMonth: number;
  totalRevenue: number;
  conversionRate: number;
  averageDealValue: number;
}