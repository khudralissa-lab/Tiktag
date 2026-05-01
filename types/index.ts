export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  // Personal
  displayName: string;
  title: string;
  bio: string;
  photoURL: string;
  coverPhotoUrl?: string;
  location?: string;
  // Contact
  phone: string;
  whatsapp: string;
  website?: string;
  // Company
  companyName?: string;
  companyLogoUrl?: string;
  companyWebsite?: string;
  // Social
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  xTwitter?: string;
  // Legacy socials array (kept for backward compat)
  socials?: Social[];
  // Links
  links: CustomLink[];
  // Appearance
  accentColor: string;
  theme?: string;
  // Meta
  plan: "free" | "pro";
  nfcStatus?: "not_ordered" | "ordered" | "activated";
  createdAt: number;
  updatedAt?: number;
}

export interface CustomLink {
  id: string;
  label: string;
  url: string;
  type: "url" | "call" | "whatsapp" | "email";
  icon?: string;
  enabled?: boolean;
  order?: number;
}

export interface Social {
  id: string;
  platform: string;
  url: string;
}

export interface AnalyticsEvent {
  type: "view" | "click";
  target: string;
  source: "qr" | "nfc" | "direct";
  timestamp: number;
  userAgent?: string;
}

export interface DashboardStats {
  totalViews: number;
  totalClicks: number;
  qrViews: number;
  nfcViews: number;
  directViews: number;
  viewsByDay: { date: string; views: number }[];
  clicksByButton: { name: string; clicks: number }[];
}
