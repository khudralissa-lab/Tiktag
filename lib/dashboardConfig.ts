import {
  Home, User, Link2, LayoutGrid, QrCode, Wifi,
  BarChart2, Palette, Settings, Building2, Users,
  CreditCard, Shield, ShieldCheck, Cpu, Globe,
  Calendar, Tag, Mic, Star, Activity, Utensils,
  MessageSquare, Zap, UserCheck, Eye, MousePointer,
  type LucideIcon,
} from "lucide-react";

export type UserType = "personal" | "creator" | "business" | "restaurant" | "events" | "enterprise";

// ─── Nav types ───────────────────────────────────────────────────────────────

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
  soon?: boolean;
  matches?: string[];
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

// ─── Nav configs per role ────────────────────────────────────────────────────

const personalNav: NavGroup[] = [
  {
    label: "Identity",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
      {
        href: "/dashboard/profile",
        label: "Profile Builder",
        icon: User,
        matches: ["/dashboard/profile", "/dashboard/contact", "/dashboard/company", "/dashboard/social"],
      },
      { href: "/dashboard/links", label: "Links", icon: Link2 },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Products", icon: Wifi },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Themes", icon: Palette }],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

const creatorNav: NavGroup[] = [
  {
    label: "Identity",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
      {
        href: "/dashboard/profile",
        label: "Profile Builder",
        icon: User,
        matches: ["/dashboard/profile", "/dashboard/contact", "/dashboard/social"],
      },
      { href: "/dashboard/media", label: "Portfolio", icon: LayoutGrid },
      { href: "/dashboard/links", label: "Links", icon: Link2 },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Products", icon: Wifi },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Themes", icon: Palette }],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

const businessNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
    ],
  },
  {
    label: "Company",
    items: [
      { href: "/dashboard/company", label: "Company Profile", icon: Building2 },
      { href: "/dashboard/teams", label: "Teams", icon: Users },
      { href: "/dashboard/employee-cards", label: "Employee Cards", icon: CreditCard },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "NFC Products", icon: Wifi },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Themes", icon: Palette }],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

const restaurantNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/dashboard/menu", label: "Menu", icon: Utensils },
      { href: "/dashboard/reviews", label: "Reviews", icon: Star },
      { href: "/dashboard/orders", label: "WhatsApp Orders", icon: MessageSquare },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
      { href: "/dashboard/nfc", label: "Table NFC", icon: Wifi },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Appearance",
    items: [{ href: "/dashboard/theme", label: "Themes", icon: Palette }],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

const eventsNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
    ],
  },
  {
    label: "Event",
    items: [
      { href: "/dashboard/event", label: "Event Page", icon: Calendar },
      { href: "/dashboard/badges", label: "Smart Badges", icon: Tag },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/dashboard/speakers", label: "Speakers", icon: Mic },
      { href: "/dashboard/attendees", label: "Attendees", icon: Users },
      { href: "/dashboard/sponsors", label: "Sponsors", icon: Star },
    ],
  },
  {
    label: "Hardware",
    items: [
      { href: "/dashboard/qr", label: "QR Studio", icon: QrCode },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/networking", label: "Networking Analytics", icon: Activity },
    ],
  },
  {
    label: "Account",
    items: [{ href: "/dashboard/settings", label: "Settings", icon: Settings }],
  },
];

const enterpriseNav: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Overview", icon: Home, exact: true },
    ],
  },
  {
    label: "Organization",
    items: [
      { href: "/dashboard/organization", label: "Organization", icon: Building2 },
      { href: "/dashboard/users", label: "Users", icon: UserCheck },
      { href: "/dashboard/access", label: "Access", icon: ShieldCheck },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { href: "/dashboard/devices", label: "Devices", icon: Cpu },
      { href: "/dashboard/integrations", label: "Integrations", icon: Zap },
    ],
  },
  {
    label: "Security",
    items: [
      { href: "/dashboard/security", label: "Security", icon: Shield },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

export const navByRole: Record<UserType, NavGroup[]> = {
  personal:   personalNav,
  creator:    creatorNav,
  business:   businessNav,
  restaurant: restaurantNav,
  events:     eventsNav,
  enterprise: enterpriseNav,
};

// ─── Overview stat configs per role ─────────────────────────────────────────

export type StatDataKey = "views" | "clicks" | "qr" | "saves" | "nfc";

export type StatConfig = {
  label: string;
  icon: LucideIcon;
  color: string;
  dataKey: StatDataKey;
};

export const statsByRole: Record<UserType, StatConfig[]> = {
  personal: [
    { label: "Profile Views",  icon: Eye,          color: "#8b5cf6", dataKey: "views"  },
    { label: "NFC Taps",       icon: Wifi,         color: "#22d3ee", dataKey: "nfc"    },
    { label: "QR Scans",       icon: QrCode,       color: "#60a5fa", dataKey: "qr"     },
    { label: "Link Clicks",    icon: MousePointer, color: "#4ade80", dataKey: "clicks" },
  ],
  creator: [
    { label: "Profile Views",    icon: Eye,          color: "#8b5cf6", dataKey: "views"  },
    { label: "Portfolio Clicks", icon: LayoutGrid,   color: "#a78bfa", dataKey: "clicks" },
    { label: "QR Scans",         icon: QrCode,       color: "#60a5fa", dataKey: "qr"     },
    { label: "NFC Taps",         icon: Wifi,         color: "#22d3ee", dataKey: "nfc"    },
  ],
  business: [
    { label: "Profile Views",  icon: Eye,      color: "#8b5cf6", dataKey: "views"  },
    { label: "Lead Captures",  icon: UserCheck, color: "#4ade80", dataKey: "saves"  },
    { label: "QR Scans",       icon: QrCode,   color: "#60a5fa", dataKey: "qr"     },
    { label: "Card Taps",      icon: Wifi,     color: "#22d3ee", dataKey: "nfc"    },
  ],
  restaurant: [
    { label: "Menu Views",       icon: Utensils,      color: "#f97316", dataKey: "views"  },
    { label: "Table Scans",      icon: QrCode,        color: "#60a5fa", dataKey: "qr"     },
    { label: "WhatsApp Taps",    icon: MessageSquare, color: "#4ade80", dataKey: "clicks" },
    { label: "Card Taps",        icon: Wifi,          color: "#22d3ee", dataKey: "nfc"    },
  ],
  events: [
    { label: "Badge Scans",          icon: Tag,          color: "#f59e0b", dataKey: "nfc"    },
    { label: "Profile Connections",  icon: Users,        color: "#8b5cf6", dataKey: "saves"  },
    { label: "QR Codes",             icon: QrCode,       color: "#60a5fa", dataKey: "qr"     },
    { label: "Link Taps",            icon: MousePointer, color: "#4ade80", dataKey: "clicks" },
  ],
  enterprise: [
    { label: "Active Views",   icon: Eye,      color: "#8b5cf6", dataKey: "views"  },
    { label: "Device Taps",   icon: Cpu,      color: "#22d3ee", dataKey: "nfc"    },
    { label: "QR Access",     icon: QrCode,   color: "#60a5fa", dataKey: "qr"     },
    { label: "Link Events",   icon: Activity, color: "#4ade80", dataKey: "clicks" },
  ],
};

// ─── Quick actions per role ──────────────────────────────────────────────────

export type QuickActionConfig = {
  href: string;
  icon: LucideIcon;
  label: string;
  desc: string;
  color: string;
};

export const quickActionsByRole: Record<UserType, QuickActionConfig[]> = {
  personal: [
    { href: "/dashboard/profile",   icon: User,      label: "Profile Builder", desc: "Name, bio, photos",    color: "#8b5cf6" },
    { href: "/dashboard/links",     icon: Link2,     label: "Manage Links",    desc: "Add or reorder links", color: "#4ade80" },
    { href: "/dashboard/qr",        icon: QrCode,    label: "QR Studio",       desc: "Design & export QR",   color: "#60a5fa" },
    { href: "/dashboard/nfc",       icon: Wifi,      label: "NFC Products",    desc: "Setup your NFC card",  color: "#22d3ee" },
    { href: "/dashboard/theme",     icon: Palette,   label: "Themes",          desc: "Style your profile",   color: "#f59e0b" },
    { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics",       desc: "Views & engagement",   color: "#f472b6" },
  ],
  creator: [
    { href: "/dashboard/profile",   icon: User,      label: "Profile",         desc: "Name, bio, photos",    color: "#8b5cf6" },
    { href: "/dashboard/media",     icon: LayoutGrid, label: "Portfolio",      desc: "Showcase your work",   color: "#a78bfa" },
    { href: "/dashboard/links",     icon: Link2,     label: "Links",           desc: "Add or reorder links", color: "#4ade80" },
    { href: "/dashboard/qr",        icon: QrCode,    label: "QR Studio",       desc: "Design & export QR",   color: "#60a5fa" },
    { href: "/dashboard/analytics", icon: BarChart2, label: "Analytics",       desc: "Views & engagement",   color: "#f472b6" },
    { href: "/dashboard/theme",     icon: Palette,   label: "Themes",          desc: "Style your profile",   color: "#f59e0b" },
  ],
  business: [
    { href: "/dashboard/company",        icon: Building2, label: "Company Profile",  desc: "Brand & details",     color: "#60a5fa" },
    { href: "/dashboard/teams",          icon: Users,     label: "Teams",            desc: "Manage members",      color: "#8b5cf6" },
    { href: "/dashboard/employee-cards", icon: CreditCard, label: "Employee Cards", desc: "Configure NFC cards", color: "#22d3ee" },
    { href: "/dashboard/qr",             icon: QrCode,    label: "QR Studio",       desc: "Design & export QR",  color: "#60a5fa" },
    { href: "/dashboard/analytics",      icon: BarChart2, label: "Analytics",       desc: "Views & engagement",  color: "#f472b6" },
    { href: "/dashboard/billing",        icon: CreditCard, label: "Billing",        desc: "Plans & invoices",    color: "#f59e0b" },
  ],
  restaurant: [
    { href: "/dashboard/menu",     icon: Utensils,      label: "Menu",            desc: "Digital menu setup",   color: "#f97316" },
    { href: "/dashboard/reviews",  icon: Star,          label: "Reviews",         desc: "Manage reviews",       color: "#f59e0b" },
    { href: "/dashboard/orders",   icon: MessageSquare, label: "Orders",          desc: "WhatsApp orders",      color: "#4ade80" },
    { href: "/dashboard/qr",       icon: QrCode,        label: "QR Studio",       desc: "Design & export QR",   color: "#60a5fa" },
    { href: "/dashboard/nfc",      icon: Wifi,          label: "Table NFC",       desc: "Setup table tags",     color: "#22d3ee" },
    { href: "/dashboard/analytics", icon: BarChart2,    label: "Analytics",       desc: "Views & taps",         color: "#f472b6" },
  ],
  events: [
    { href: "/dashboard/event",      icon: Calendar,  label: "Event Page",     desc: "Setup your event",      color: "#8b5cf6" },
    { href: "/dashboard/badges",     icon: Tag,       label: "Smart Badges",   desc: "NFC attendee badges",   color: "#f59e0b" },
    { href: "/dashboard/attendees",  icon: Users,     label: "Attendees",      desc: "Manage registrations",  color: "#60a5fa" },
    { href: "/dashboard/speakers",   icon: Mic,       label: "Speakers",       desc: "Speaker profiles",      color: "#a78bfa" },
    { href: "/dashboard/qr",         icon: QrCode,    label: "QR Studio",      desc: "Design & export QR",    color: "#22d3ee" },
    { href: "/dashboard/networking", icon: Activity,  label: "Networking",     desc: "Connection analytics",  color: "#f472b6" },
  ],
  enterprise: [
    { href: "/dashboard/organization", icon: Building2,  label: "Organization",  desc: "Structure & hierarchy", color: "#60a5fa" },
    { href: "/dashboard/users",        icon: UserCheck,  label: "Users",         desc: "Manage all members",    color: "#8b5cf6" },
    { href: "/dashboard/access",       icon: ShieldCheck, label: "Access",       desc: "Roles & permissions",   color: "#22d3ee" },
    { href: "/dashboard/devices",      icon: Cpu,        label: "Devices",       desc: "NFC device fleet",      color: "#a78bfa" },
    { href: "/dashboard/security",     icon: Shield,     label: "Security",      desc: "Audit & compliance",    color: "#f59e0b" },
    { href: "/dashboard/integrations", icon: Zap,        label: "Integrations",  desc: "Connect your stack",    color: "#4ade80" },
  ],
};

// ─── Route metadata for placeholder pages ───────────────────────────────────

export type RouteMeta = {
  title: string;
  description: string;
  icon: LucideIcon;
  role?: UserType;
};

export const routeMetaBySlug: Record<string, RouteMeta> = {
  "teams":          { title: "Teams",           description: "Manage your team members and assign NFC cards to each employee.",        icon: Users,       role: "business"    },
  "employee-cards": { title: "Employee Cards",  description: "Configure and activate NFC business cards for your entire team.",        icon: CreditCard,  role: "business"    },
  "billing":        { title: "Billing",         description: "Manage your subscription, invoices, and payment methods.",               icon: CreditCard                       },
  "menu":           { title: "Menu",            description: "Build your digital menu and link it to table NFC tags.",                icon: Utensils,    role: "restaurant"  },
  "reviews":        { title: "Reviews",         description: "Collect and showcase customer reviews via your NFC table tags.",        icon: Star,        role: "restaurant"  },
  "orders":         { title: "WhatsApp Orders", description: "Accept orders and reservations directly through WhatsApp.",             icon: MessageSquare, role: "restaurant" },
  "event":          { title: "Event Page",      description: "Create a smart event landing page with schedule, speakers, and QR.",   icon: Calendar,    role: "events"      },
  "badges":         { title: "Smart Badges",    description: "Generate NFC-enabled attendee badges that share profiles on tap.",      icon: Tag,         role: "events"      },
  "speakers":       { title: "Speakers",        description: "Create digital profiles for each speaker with bio and session info.",   icon: Mic,         role: "events"      },
  "attendees":      { title: "Attendees",       description: "View registrations, check-ins, and networking connections.",            icon: Users,       role: "events"      },
  "sponsors":       { title: "Sponsors",        description: "Showcase sponsors and track engagement via QR and NFC.",               icon: Star,        role: "events"      },
  "networking":     { title: "Networking Analytics", description: "Analyze attendee connections, badge scans, and engagement data.", icon: Activity,    role: "events"      },
  "organization":   { title: "Organization",    description: "Define your org structure, departments, and reporting hierarchy.",      icon: Building2,   role: "enterprise"  },
  "users":          { title: "Users",           description: "Manage all members, roles, and their digital identity cards.",         icon: UserCheck,   role: "enterprise"  },
  "access":         { title: "Access Control",  description: "Define role-based access rules across the platform.",                  icon: ShieldCheck, role: "enterprise"  },
  "devices":        { title: "Devices",         description: "Monitor and manage all NFC devices in your organization.",             icon: Cpu,         role: "enterprise"  },
  "integrations":   { title: "Integrations",    description: "Connect your CRM, HRIS, SSO, and third-party tools.",                 icon: Zap,         role: "enterprise"  },
  "security":       { title: "Security",        description: "Audit logs, compliance controls, and data security settings.",         icon: Shield,      role: "enterprise"  },
};

// ─── Experience option display config ───────────────────────────────────────

export type ExperienceOption = {
  type: UserType;
  label: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  glow: string;
};

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { type: "personal",   label: "Personal",   desc: "Your personal digital identity",     icon: User,      color: "#8b5cf6", glow: "rgba(139,92,246,0.15)"  },
  { type: "creator",    label: "Creator",    desc: "Artists, influencers & freelancers", icon: LayoutGrid, color: "#f59e0b", glow: "rgba(245,158,11,0.14)"  },
  { type: "business",   label: "Business",   desc: "Corporate identity & team cards",    icon: Building2, color: "#60a5fa", glow: "rgba(96,165,250,0.14)"  },
  { type: "restaurant", label: "Restaurant", desc: "Menus, reviews & table NFC",         icon: Utensils,  color: "#f97316", glow: "rgba(249,115,22,0.14)"  },
  { type: "events",     label: "Events",     desc: "Conferences, meetups & networking",  icon: Calendar,  color: "#22d3ee", glow: "rgba(34,211,238,0.14)"  },
  { type: "enterprise", label: "Enterprise", desc: "Organizations, security & scale",    icon: Globe,     color: "#4ade80", glow: "rgba(74,222,128,0.12)"  },
];

// ─── String-based config (spec reference) ───────────────────────────────────

export const dashboardConfigByRole: Record<UserType, string[]> = {
  personal:   ["Overview", "Profile Builder", "Links", "QR Studio", "NFC Products", "Analytics", "Themes", "Settings"],
  creator:    ["Overview", "Profile Builder", "Portfolio", "Links", "QR Studio", "NFC Products", "Analytics", "Themes", "Settings"],
  business:   ["Overview", "Company Profile", "Teams", "Employee Cards", "QR Studio", "NFC Products", "Analytics", "Themes", "Billing", "Settings"],
  restaurant: ["Overview", "Menu", "Reviews", "WhatsApp Orders", "QR Studio", "Table NFC", "Analytics", "Themes", "Settings"],
  events:     ["Overview", "Event Page", "Smart Badges", "Speakers", "Attendees", "Sponsors", "QR Studio", "Networking Analytics", "Settings"],
  enterprise: ["Overview", "Organization", "Users", "Access", "Devices", "Integrations", "Security", "Analytics", "Billing", "Settings"],
};
