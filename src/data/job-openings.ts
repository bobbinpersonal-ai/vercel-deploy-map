import { BadgeCheck, BriefcaseBusiness, ClipboardList, HardHat, Handshake, Megaphone, Wrench, type LucideIcon } from "lucide-react";

export type JobOpening = {
  slug: string;
  title: string;
  group: "Field team" | "Project operations" | "Growth & partnerships";
  employment: "Hourly" | "Salaried";
  pay: string;
  payNote: string;
  summary: string;
  outcomes: string[];
  qualifications: string[];
  icon: LucideIcon;
};

export const JOB_OPENINGS: JobOpening[] = [
  {
    slug: "field-technicians",
    title: "Residential Field Technician",
    group: "Field team",
    employment: "Hourly",
    pay: "$22–$28 / hour",
    payNote: "Pay depends on experience, trade skill, and market; final rate is confirmed in the written offer.",
    summary: "Join the growing LoveMeAfter field team supporting residential improvement projects from preparation through clean closeout.",
    outcomes: ["Prepare and protect homes and work areas", "Support inspections, materials, punch lists, and quality documentation", "Communicate site conditions early and work safely alongside experienced trade leads", "Build skills toward a lead-technician or trade-specialist path"],
    qualifications: ["Reliable transportation and punctuality", "Hands-on home improvement or construction experience is helpful", "Careful with customer property, jobsite safety, and cleanup", "Able to take direction, document work, and communicate clearly"],
    icon: HardHat,
  },
  {
    slug: "installers",
    title: "Residential Installation Specialist",
    group: "Field team",
    employment: "Hourly",
    pay: "$22–$28 / hour",
    payNote: "Pay depends on trade, experience, market, and applicable credentials; final rate is confirmed in the written offer.",
    summary: "Bring trade skill to an expanding company field team focused on durable installs, careful home protection, and workmanship the homeowner can see.",
    outcomes: ["Perform or assist with residential installation work within your training and qualifications", "Keep the home protected, clean, and safe throughout the job", "Follow the approved written scope and installation instructions", "Document completed details and help resolve punch-list items"],
    qualifications: ["Relevant residential trade experience or a strong willingness to learn", "Meet the licensing, registration, or supervision requirements for work performed in the local market", "Safe work habits and dependable attendance", "Respectful communication with homeowners and teammates"],
    icon: Wrench,
  },
  {
    slug: "project-managers",
    title: "Residential Project Manager",
    group: "Project operations",
    employment: "Salaried",
    pay: "$80,000 / year",
    payNote: "Target annual base salary; final offer depends on experience, role scope, and work location. Any incentive plan is documented separately.",
    summary: "Own the project thread so homeowners, field teammates, and qualified trade specialists know what is happening next—and who is accountable for it.",
    outcomes: ["Build and maintain realistic schedules, project budgets, and milestone plans", "Coordinate homeowner communication, material availability, permit steps, and field capacity", "Verify that scopes, changes, and approvals are documented before work proceeds", "Lead quality checks, closeout, warranty handoff, and lessons learned"],
    qualifications: ["Residential construction or home-improvement project coordination experience", "Strong organization, judgment, customer communication, and documentation", "Comfort with schedules, budgets, change orders, and field problem-solving", "Valid driver’s license and ability to visit active projects as required"],
    icon: ClipboardList,
  },
  {
    slug: "permit-manager",
    title: "Permitting & Compliance Manager",
    group: "Project operations",
    employment: "Salaried",
    pay: "$70,000 / year",
    payNote: "Target annual base salary; final offer depends on relevant permitting experience and work location.",
    summary: "Make jurisdiction-specific requirements easier for the team and homeowner to navigate, from early research to final inspection records.",
    outcomes: ["Research permit and inspection requirements by project and jurisdiction", "Prepare complete applications and coordinate submissions with the responsible license holder where required", "Track approvals, inspections, corrections, and closeout documents", "Maintain a practical compliance library and flag schedule or scope risks early"],
    qualifications: ["Permit coordination, construction administration, or municipal-plan-review experience", "Careful handling of deadlines, forms, project records, and customer data", "Able to interpret local requirements and escalate technical questions appropriately", "Clear communication across operations, field teams, and authorities"],
    icon: BadgeCheck,
  },
  {
    slug: "billing-specialist",
    title: "Project Billing Specialist",
    group: "Project operations",
    employment: "Salaried",
    pay: "$75,000 / year",
    payNote: "Target annual base salary; final offer depends on accounting experience, market, and role scope.",
    summary: "Keep project billing accurate, understandable, and aligned with the approved scope and payment milestones.",
    outcomes: ["Prepare customer invoices and verify supporting scope and completion documents", "Track receivables, payment milestones, credits, and approved change orders", "Coordinate with project managers to reconcile discrepancies before customer follow-up", "Maintain organized records and contribute to monthly close and reporting"],
    qualifications: ["Billing, accounts receivable, bookkeeping, or construction-administration experience", "Strong spreadsheet and record-keeping skills", "Professional, accurate customer communication", "Discretion with financial and personal information"],
    icon: BriefcaseBusiness,
  },
  {
    slug: "marketing-manager",
    title: "Marketing & Social Media Manager",
    group: "Growth & partnerships",
    employment: "Salaried",
    pay: "$90,000 / year",
    payNote: "Target annual base salary; final offer depends on demonstrated campaign results, portfolio, and work location.",
    summary: "Turn real expertise and real project work into useful homeowner education, a recognizable local voice, and measurable demand.",
    outcomes: ["Plan channel strategy, editorial calendar, short-form video, and homeowner education", "Create campaigns grounded in real scopes, properly approved project imagery, and accurate claims", "Manage publishing, community response, reputation workflows, and campaign reporting", "Partner with field and operations teams to capture approved stories without disrupting work"],
    qualifications: ["Demonstrated social media, content, or performance-marketing experience", "Strong writing, short-form video direction, and visual judgment", "Comfort with analytics, experimentation, and lead attribution", "Good instincts for permissions, privacy, disclosures, and claim substantiation"],
    icon: Megaphone,
  },
  {
    slug: "partnership-manager",
    title: "B2B Partnership Manager",
    group: "Growth & partnerships",
    employment: "Salaried",
    pay: "$80,000 / year",
    payNote: "Target annual base salary; final offer depends on business-development experience, portfolio, and work location.",
    summary: "Build durable, transparent relationships with businesses and organizations that want a responsive home-improvement resource for their customers.",
    outcomes: ["Develop a qualified portfolio across property, real estate, and community channels", "Design compliant referral workflows with written terms and clear customer choice", "Coordinate partner onboarding, response standards, attribution, and relationship reviews", "Report on partner-sourced opportunities and completed customer outcomes"],
    qualifications: ["B2B partnerships, account management, or consultative business-development experience", "Trusted communication and strong follow-up habits", "Sound judgment around referral disclosures and industry-specific restrictions", "Comfort with pipeline tracking, written agreements, and measurable goals"],
    icon: Handshake,
  },
];
