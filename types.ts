
export type AgentType = 'FRONT_DESK' | 'LEGAL' | 'PROCESS' | 'DOCUMENT' | 'ADVISORY' | 'MARKET';

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
  isError?: boolean;
  isLoading?: boolean;
  attachments?: Attachment[];
  verifiedBy?: string; 
  agentType?: AgentType; 
  feedback?: 'up' | 'down'; 
}

export interface Attachment {
  type: 'form' | 'link';
  title: string;
  url: string;
  description?: string;
}

export interface GovForm {
  id: string;
  title: string;
  ministry: string;
  description: string;
  category: string;
  downloadUrl: string;
}

export interface Procedure {
  id: string;
  title: string;
  description: string;
  steps: string[];
  requirements: string[];
  estimatedDuration: string;
  relatedMinistry: string;
  source?: string;
}

export interface Law {
  id: string;
  title: string;
  category: 'Federal' | 'State';
  content: string;
  tags: string[];
  source?: string;
}

export type District = 'Akure' | 'Ondo Town' | 'Owo' | 'Ilaje' | 'General';

export interface VerificationRequest {
  id: string;
  type: 'Land' | 'Business' | 'Certificate' | 'Heritage' | 'Maritime' | 'Other';
  citizenId: string;
  details: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  receivedAt: string;
  lga: string;
  district: District;
  ministry: string;
}

export interface MinistryInfo {
    full_name: string;
    address: string;
    responsibilities: string[];
}

export interface Appointment {
  id: string;
  citizenName: string;
  ministry: string;
  reason: string;
  date: string;
  status: 'Scheduled' | 'Completed';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  ondoId: string;
  lga: string;
  languagePreference: 'English' | 'Yoruba' | 'Ijaw';
  whatsappLinked: boolean;
}

export interface LockerDocument {
  id: string;
  title: string;
  type: 'Certificate' | 'Land Title' | 'Tax' | 'License';
  issueDate: string;
  status: 'Verified' | 'Pending' | 'Expired';
  issuingAuthority: string;
  downloadUrl: string;
}

export interface MarketPrice {
  item: string;
  price: string;
  location: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface Payment {
    id: string;
    service: string;
    amount: string;
    status: 'Paid' | 'Pending';
    date: string;
}

export interface Report {
    id: string;
    issue: string;
    location: string;
    status: 'Open' | 'Resolved';
    date: string;
}

export enum AppView {
  CHAT = 'CHAT',
  FORMS = 'FORMS',
  DASHBOARD = 'DASHBOARD',
  DIRECTORY = 'DIRECTORY',
  LOCKER = 'LOCKER',
  PROFILE = 'PROFILE',
  PAYMENTS = 'PAYMENTS',
  MAPS = 'MAPS',
  HEALTH = 'HEALTH',
  COMPLAINTS = 'COMPLAINTS',
  ABOUT = 'ABOUT'
}
