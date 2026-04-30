export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  displayName: string;
  title: string;
  bio: string;
  photoURL: string;
  accentColor: string;
  phone: string;
  whatsapp: string;
  links: CustomLink[];
  socials: Social[];
  plan: "free" | "pro";
  createdAt: number;
}

export interface CustomLink {
  id: string;
  label: string;
  url: string;
  type: "url" | "call" | "whatsapp" | "email";
  icon?: string;
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
