export const FREELANCE_CATEGORIES = [
  {
    id: 'web_dev',
    name: 'Web & Full-Stack Development',
    icon: 'Code2',
    description: 'Frontend, backend, fullstack apps, websites, and APIs',
    skills: [
      'React', 'JavaScript', 'Node.js', 'TypeScript', 'Next.js', 'HTML/CSS',
      'Tailwind CSS', 'Vue.js', 'Python', 'PHP', 'WordPress', 'GraphQL',
      'REST APIs', 'PostgreSQL', 'MongoDB', 'Shopify', 'Webflow'
    ],
    hotSkills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    recommendedServices: [
      { name: 'Custom Full-Stack Web Application', demand: 'High', avgRate: '$45 - $95/hr', deliverable: 'End-to-end web app with auth, database, and responsive UI' },
      { name: 'Modern Landing Page & Conversion Optimization', demand: 'Very High', avgRate: '$35 - $75/hr', deliverable: 'Fast-loading, high-converting marketing website' },
      { name: 'API Integration & Backend Microservices', demand: 'High', avgRate: '$50 - $110/hr', deliverable: 'Secure API connects, payment gateways, and data sync' },
      { name: 'WordPress / Webflow Development & Migration', demand: 'Medium', avgRate: '$30 - $65/hr', deliverable: 'CMS setups, custom themes, and content velocity' }
    ],
    skillsToImprove: [
      { skill: 'TypeScript', reason: 'Increases client trust and hourly rate by 20-35% on enterprise gigs.' },
      { skill: 'Automated Testing (Jest / Playwright)', reason: 'Differentiates you from junior coders who break client staging environments.' },
      { skill: 'Cloud Deployment (Vercel, AWS, Docker)', reason: 'Clients want full deployment solutions, not just local code.' },
      { skill: 'Web Performance & Core Web Vitals', reason: 'High-ticket e-commerce clients pay premium for fast load times.' }
    ],
    portfolioIdeas: [
      {
        title: 'SaaS Analytics Dashboard',
        summary: 'A sleek, real-time analytics dashboard with interactive charts, filtering, and mock API data.',
        deliverables: ['Responsive Dashboard UI', 'Custom Data Visualizations', 'Dark/Light Theme Toggle', 'Role-based Demo Auth'],
        targetClients: 'B2B SaaS Founders, Startup Product Managers',
        impactMetric: 'Demonstrates clean state management and data presentation skills.'
      },
      {
        title: 'High-Converting E-commerce Storefront',
        summary: 'A lightning-fast e-commerce shopping experience with cart, checkout flow, search filters, and mobile optimization.',
        deliverables: ['Product Catalog & Filtering', 'Persistent Cart State', 'Stripe Mock Checkout', 'Lighthouse 95+ Performance'],
        targetClients: 'Direct-to-Consumer Brands, Shopify merchants upgrading to headless',
        impactMetric: 'Directly proves ability to drive revenue and conversions for clients.'
      },
      {
        title: 'Client Portal & Project Tracker',
        summary: 'A dedicated dashboard for agency clients to track milestones, invoices, and file assets.',
        deliverables: ['Status Kanban Board', 'Deliverable Review System', 'Activity Feed'],
        targetClients: 'Marketing Agencies, Design Studios, Consultancies',
        impactMetric: 'Positions you as a partner who understands business workflows.'
      }
    ]
  },
  {
    id: 'mobile_dev',
    name: 'Mobile App Development',
    icon: 'Smartphone',
    description: 'iOS, Android, React Native, and Flutter cross-platform apps',
    skills: [
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'iOS Development',
      'Android Studio', 'Firebase', 'Mobile UI/UX', 'App Store Deployment',
      'Push Notifications', 'Offline Storage', 'In-App Purchases'
    ],
    hotSkills: ['React Native', 'Flutter', 'Firebase', 'App Store Deployment'],
    recommendedServices: [
      { name: 'Cross-Platform MVP App Development', demand: 'Very High', avgRate: '$50 - $105/hr', deliverable: 'Single codebase app for both iOS and Android stores' },
      { name: 'Native iOS / Android Feature Extension', demand: 'High', avgRate: '$60 - $120/hr', deliverable: 'Adding cameras, push alerts, or Bluetooth integrations' },
      { name: 'App Performance & Bug Fixing', demand: 'Medium', avgRate: '$45 - $85/hr', deliverable: 'Memory leak fixes, crash reduction, and UI smoothness' }
    ],
    skillsToImprove: [
      { skill: 'App Store Guidelines & Fast-Track Review', reason: 'Clients dread rejection; guiding them through approval is a premium skill.' },
      { skill: 'Offline-First Architecture', reason: 'Crucial for real-world mobile apps with unreliable network conditions.' },
      { skill: 'Native Bridge Module Development', reason: 'Allows integrating proprietary native SDKs when cross-platform wrappers fail.' }
    ],
    portfolioIdeas: [
      {
        title: 'Habit & Fitness Tracker App',
        summary: 'A polished cross-platform mobile app with streak counters, push reminders, and progress graphs.',
        deliverables: ['Smooth Gestural Navigation', 'Local Storage Persistence', 'Haptic Feedback', 'Interactive Charts'],
        targetClients: 'Health & Wellness startups, Digital coaches',
        impactMetric: 'Demonstrates micro-interactions and mobile usability mastery.'
      },
      {
        title: 'On-Demand Service Booking App',
        summary: 'Two-sided app prototype for booking local services with maps, scheduling, and order receipt.',
        deliverables: ['Map Location Selector', 'Slot Booking Matrix', 'Push Notification Simulation'],
        targetClients: 'Gig-economy founders, Local service companies',
        impactMetric: 'Shows ability to handle complex transactional user journeys.'
      }
    ]
  },
  {
    id: 'ui_ux',
    name: 'UI/UX & Product Design',
    icon: 'Palette',
    description: 'Design systems, wireframes, user research, and mobile/web prototypes',
    skills: [
      'Figma', 'UI Design', 'UX Research', 'Wireframing', 'Prototyping',
      'Design Systems', 'User Testing', 'Responsive Design', 'Design-to-Code',
      'Interaction Design', 'Information Architecture'
    ],
    hotSkills: ['Figma', 'Design Systems', 'Interactive Prototyping', 'SaaS UX'],
    recommendedServices: [
      { name: 'End-to-End SaaS Product Design (Figma)', demand: 'Very High', avgRate: '$45 - $90/hr', deliverable: 'Complete interactive clickable mockup and production design tokens' },
      { name: 'UX Audit & Conversion Redesign', demand: 'High', avgRate: '$50 - $95/hr', deliverable: 'Audit report uncovering friction points and high-converting redesigns' },
      { name: 'Comprehensive Design System Creation', demand: 'High', avgRate: '$55 - $110/hr', deliverable: 'Reusable components, typography scale, variants, and developer handoff' }
    ],
    skillsToImprove: [
      { skill: 'Component Auto-Layout & Tokens in Figma', reason: 'Developers love working with clean files; repeat agency referrals skyrocket.' },
      { skill: 'Basic HTML/CSS Understanding', reason: 'Helps design technically feasible interfaces without frustrating engineering teams.' },
      { skill: 'User Journey Funnel Analytics', reason: 'Backing your design choices with business ROI wins higher-budget clients.' }
    ],
    portfolioIdeas: [
      {
        title: 'B2B FinTech App UX Overhaul',
        summary: 'A case study breaking down user confusion in a payment reconciliation tool into a 3-step streamlined flow.',
        deliverables: ['Problem Identification', 'Interactive Prototype', 'Design System Components', 'Usability Test Findings'],
        targetClients: 'FinTech, PropTech, and Banking technology firms',
        impactMetric: 'Shows how UX directly cuts customer support ticket volume.'
      },
      {
        title: 'Modern Mobile Health Clinic Experience',
        summary: 'Telehealth patient mobile app focused on elderly accessibility, appointment bookings, and prescription refills.',
        deliverables: ['Accessible High-Contrast UI', 'Voice Interaction Notes', 'Figma Auto-Layout File'],
        targetClients: 'Healthcare providers and health-tech startups',
        impactMetric: 'Exhibits WCAG accessibility and empathy-driven design.'
      }
    ]
  },
  {
    id: 'content_copy',
    name: 'Content & Copywriting',
    icon: 'PenTool',
    description: 'Landing page copy, email sequences, SEO articles, and brand messaging',
    skills: [
      'Copywriting', 'SEO Writing', 'Email Marketing', 'Content Strategy',
      'Landing Page Copy', 'Ghostwriting', 'Blog Writing', 'Brand Voice',
      'Storytelling', 'Sales Funnels', 'Technical Writing'
    ],
    hotSkills: ['Landing Page Copy', 'Email Sequences', 'SEO Optimization', 'B2B Thought Leadership'],
    recommendedServices: [
      { name: 'High-Converting Sales Landing Page Copy', demand: 'Very High', avgRate: '$40 - $80/hr', deliverable: 'Value proposition, objection-handling copy, and CTA hierarchy' },
      { name: 'Lifecycle & Welcome Email Automations', demand: 'High', avgRate: '$45 - $85/hr', deliverable: '5-7 email drip campaign designed to convert trial users to paid' },
      { name: 'Authority SEO Pillar Articles & Case Studies', demand: 'Medium', avgRate: '$35 - $70/hr', deliverable: 'Deep-dive 2,000+ word guides that capture search traffic' }
    ],
    skillsToImprove: [
      { skill: 'Conversion Rate Optimization (CRO) Principles', reason: 'Clients hire copywriters to increase sales, not just write pretty words.' },
      { skill: 'Customer Voice Interviewing', reason: 'Stealing exact customer phrases creates unignorable sales copy.' },
      { skill: 'Email Deliverability & ESP Knowledge (Klaviyo/ConvertKit)', reason: 'Offers end-to-end implementation for clients who hate tech setups.' }
    ],
    portfolioIdeas: [
      {
        title: 'SaaS Free-to-Paid Onboarding Drip Sequence',
        summary: 'Complete 6-email sequence for a productivity SaaS that nudges users from free trial to enterprise subscription.',
        deliverables: ['Subject Line A/B Test Options', 'Behavioral Trigger Matrix', 'Copy Breakdown Annotated with Psychology'],
        targetClients: 'Software Founders, Growth Marketers',
        impactMetric: 'Demonstrates proven conversion psychology and customer onboarding empathy.'
      },
      {
        title: 'E-commerce Brand Story & Product Page Redesign',
        summary: 'Rewrote generic product bullet points into an emotional lifestyle narrative that doubled add-to-cart rates.',
        deliverables: ['Before & After Copy Comparison', 'Hero Value Proposition', 'Objection Buster FAQ'],
        targetClients: 'Shopify Store Owners, Luxury Consumer Brands',
        impactMetric: 'Clear visual before/after proof of copy impact on buyer desire.'
      }
    ]
  },
  {
    id: 'ai_data',
    name: 'AI, Automation & Data',
    icon: 'Cpu',
    description: 'AI integrations, workflow automation, data scraping, and analytics',
    skills: [
      'Python', 'OpenAI/Gemini APIs', 'Zapier / Make.com', 'Data Scraping',
      'Pandas', 'SQL', 'Prompt Engineering', 'LangChain', 'Workflow Automation',
      'Power BI', 'Google Looker Studio'
    ],
    hotSkills: ['Make.com / Zapier Automation', 'Prompt Engineering', 'AI API Integration', 'Python Scraping'],
    recommendedServices: [
      { name: 'Custom No-Code / Low-Code AI Automations', demand: 'Very High', avgRate: '$50 - $110/hr', deliverable: 'Connecting CRM, Email, and AI to automate lead qualification' },
      { name: 'Data Extraction & Lead List Scraping Pipeline', demand: 'High', avgRate: '$40 - $80/hr', deliverable: 'Custom Python scraper delivering clean, verified CSV leads' },
      { name: 'Executive KPI Dashboard & Business Intelligence', demand: 'Medium', avgRate: '$45 - $90/hr', deliverable: 'Unified Looker/Power BI dashboard combining Stripe and marketing metrics' }
    ],
    skillsToImprove: [
      { skill: 'Error Handling & Webhook Monitoring', reason: 'Clients need automations that never fail silently or double-charge leads.' },
      { skill: 'Data Privacy & GDPR Compliance', reason: 'High-paying corporate clients require strict data handling safeguards.' },
      { skill: 'API Rate Limiting & Cost Management', reason: 'Saves clients hundreds of dollars in unnecessary token and platform costs.' }
    ],
    portfolioIdeas: [
      {
        title: 'Automated Inbound Lead Enricher & AI Qualifier',
        summary: 'A Make/Zapier workflow that pulls inbound form submissions, enriches them with LinkedIn data, scores fit using AI, and routes to Slack.',
        deliverables: ['Workflow Architecture Diagram', 'Field Mapping Schema', 'Failover Notification Alert Logic'],
        targetClients: 'B2B Sales Teams, Real Estate Agencies, Recruiters',
        impactMetric: 'Saves the client 15+ manual research hours every single week.'
      }
    ]
  },
  {
    id: 'marketing_seo',
    name: 'Digital Marketing & SEO',
    icon: 'TrendingUp',
    description: 'Google Ads, Meta Ads, Technical SEO, Social Media, and Growth',
    skills: [
      'SEO', 'Google Ads', 'Meta Ads', 'Google Analytics 4', 'Content Marketing',
      'Social Media Marketing', 'Conversion Optimization', 'Keyword Research',
      'Email Funnels', 'Technical SEO Audit'
    ],
    hotSkills: ['Technical SEO', 'Google Analytics 4', 'Meta Ads Scaler', 'Local SEO'],
    recommendedServices: [
      { name: 'Comprehensive Technical SEO & Competitor Audit', demand: 'High', avgRate: '$40 - $85/hr', deliverable: 'Actionable 25-page audit fixing crawl bugs, speed, and content gaps' },
      { name: 'High-ROI Paid Ad Campaign Setup & Management', demand: 'Very High', avgRate: '$45 - $95/hr', deliverable: 'Targeting research, ad creatives, pixel tracking, and A/B split testing' },
      { name: 'Local Business Google Map Pack Optimization', demand: 'High', avgRate: '$35 - $75/hr', deliverable: 'Citation building, review generation system, and local page SEO' }
    ],
    skillsToImprove: [
      { skill: 'GA4 Custom Event & Conversion Tracking', reason: 'Most business owners are completely blind without verified conversion tags.' },
      { skill: 'Landing Page Message Match Testing', reason: 'Ensures paid ad traffic converts instead of bouncing immediately.' },
      { skill: 'Transparent Weekly ROI Reporting', reason: 'Clients retain marketers who clearly communicate dollars spent vs dollars earned.' }
    ],
    portfolioIdeas: [
      {
        title: 'Local Clinic Organic Traffic 3x Case Study',
        summary: 'Step-by-step breakdown of how fixing schema markup and optimizing local landing pages tripled high-ticket bookings.',
        deliverables: ['Before/After Search Console Graphs', 'Keyword Gap Analysis Matrix', 'Crawl Error Elimination Log'],
        targetClients: 'Dental clinics, law firms, local multi-location contractors',
        impactMetric: 'Shows tangible pipeline generation rather than vanity impressions.'
      }
    ]
  }
];

export const PRICING_GUIDE_DATA = {
  web_dev: {
    name: 'Web & Full-Stack Development',
    services: [
      {
        id: 'landing_page',
        name: 'High-Converting Landing Page',
        description: 'Single-page responsive marketing or product landing page with contact form, animations, and SEO setup.',
        typicalDelivery: '3 - 7 days',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$350 - $750', note: 'Template customizations and clean responsive layouts.' },
          intermediate: { hourly: '$45 - $70', fixed: '$800 - $1,800', note: 'Custom coded with Tailwind/React or Webflow, optimized speed and subtle motion.' },
          expert: { hourly: '$75 - $130+', fixed: '$2,000 - $4,500+', note: 'Conversion-rate optimized, custom 3D/canvas micro-interactions, CRM hooks.' }
        }
      },
      {
        id: 'full_stack_mvp',
        name: 'Custom Web App / MVP (SaaS)',
        description: 'Full-stack application with user authentication, database, payment integration (Stripe), and admin portal.',
        typicalDelivery: '3 - 6 weeks',
        rates: {
          beginner: { hourly: '$30 - $45', fixed: '$1,200 - $2,500', note: 'Basic CRUD app with pre-built boilerplate and Firebase.' },
          intermediate: { hourly: '$50 - $85', fixed: '$3,000 - $7,500', note: 'Custom Next.js/React architecture, robust backend APIs, role permissions.' },
          expert: { hourly: '$90 - $150+', fixed: '$8,000 - $20,000+', note: 'Scalable cloud infrastructure, automated testing, production security hardening.' }
        }
      },
      {
        id: 'api_integration',
        name: 'Third-Party API & Payment Gateway Integration',
        description: 'Connecting external APIs, webhooks, payment processors, CRMs, or analytics pipelines.',
        typicalDelivery: '2 - 5 days',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$250 - $600', note: 'Standard webhook receivers and basic API calls.' },
          intermediate: { hourly: '$45 - $75', fixed: '$700 - $1,500', note: 'Two-way sync, error recovery, token rotation, rate limit handling.' },
          expert: { hourly: '$80 - $140+', fixed: '$1,800 - $4,000+', note: 'Mission-critical payment flows, PCI compliance advice, high-throughput queues.' }
        }
      },
      {
        id: 'ecommerce_store',
        name: 'Custom E-commerce Store (Shopify / Headless)',
        description: 'Store setup, product variants, inventory sync, checkout optimization, and shipping rules.',
        typicalDelivery: '1 - 3 weeks',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$500 - $1,200', note: 'Shopify theme configuration, basic apps setup.' },
          intermediate: { hourly: '$45 - $75', fixed: '$1,500 - $4,000', note: 'Custom Liquid code, custom bundle builders, upsell funnels.' },
          expert: { hourly: '$80 - $135+', fixed: '$4,500 - $12,000+', note: 'Headless Next.js storefront, high-volume speed tuning, custom checkout apps.' }
        }
      }
    ]
  },
  mobile_dev: {
    name: 'Mobile App Development',
    services: [
      {
        id: 'cross_platform_mvp',
        name: 'React Native / Flutter MVP App',
        description: 'Cross-platform mobile app deployed to both Apple App Store and Google Play Store.',
        typicalDelivery: '4 - 8 weeks',
        rates: {
          beginner: { hourly: '$30 - $50', fixed: '$1,800 - $3,500', note: 'Basic screens, Firebase auth and simple database.' },
          intermediate: { hourly: '$55 - $90', fixed: '$4,000 - $9,500', note: 'Polished navigation, offline caching, push notifications, store submission.' },
          expert: { hourly: '$95 - $160+', fixed: '$10,000 - $25,000+', note: 'Complex backend sync, native camera/sensor bridges, custom performance tuning.' }
        }
      },
      {
        id: 'app_maintenance',
        name: 'Mobile App Bug Fixing & Store Upgrade',
        description: 'Resolving crashes, updating target SDK versions for Google/Apple compliance, fixing UI bugs.',
        typicalDelivery: '3 - 7 days',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$300 - $700', note: 'Straightforward UI fixes and library updates.' },
          intermediate: { hourly: '$45 - $80', fixed: '$800 - $1,800', note: 'Crashlytics debugging, API response handling, deprecated component overhaul.' },
          expert: { hourly: '$85 - $140+', fixed: '$2,000 - $4,500+', note: 'Deep memory profiling, native code troubleshooting, rejected app compliance rescue.' }
        }
      }
    ]
  },
  ui_ux: {
    name: 'UI/UX & Product Design',
    services: [
      {
        id: 'figma_prototype',
        name: 'Clickable Figma Prototype (Web or Mobile)',
        description: 'High-fidelity interactive prototype ready for user testing and developer handoff.',
        typicalDelivery: '1 - 2 weeks',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$400 - $900', note: 'Standard wireframes and clean static mockups.' },
          intermediate: { hourly: '$45 - $75', fixed: '$1,000 - $2,500', note: 'Component variants, auto-layout, interactive states, responsive views.' },
          expert: { hourly: '$80 - $140+', fixed: '$3,000 - $7,000+', note: 'Complex micro-interactions, complete user research validation, engineering design tokens.' }
        }
      },
      {
        id: 'design_system',
        name: 'Scalable UI Design System',
        description: 'Complete library of typography, colors, button states, inputs, modals, and iconography guidelines.',
        typicalDelivery: '2 - 4 weeks',
        rates: {
          beginner: { hourly: '$30 - $45', fixed: '$600 - $1,400', note: 'Basic color palette and UI element library.' },
          intermediate: { hourly: '$50 - $80', fixed: '$1,800 - $4,000', note: 'Comprehensive multi-state Figma component library with auto-layout.' },
          expert: { hourly: '$85 - $150+', fixed: '$4,500 - $10,000+', note: 'Enterprise tokenized design system aligned with React/Tailwind component code.' }
        }
      }
    ]
  },
  content_copy: {
    name: 'Content & Copywriting',
    services: [
      {
        id: 'sales_landing_copy',
        name: 'High-Converting Sales Landing Page Copy',
        description: 'Value proposition, pain-point hooks, product benefit breakdowns, social proof framing, and CTAs.',
        typicalDelivery: '3 - 7 days',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$250 - $550', note: 'Clean product description and headline drafting.' },
          intermediate: { hourly: '$45 - $75', fixed: '$650 - $1,500', note: 'Voice-of-customer research, objection-busting copy, structured wireframe layout.' },
          expert: { hourly: '$80 - $150+', fixed: '$1,800 - $4,500+', note: 'Deep conversion psychology, customer interview synthesis, multi-variant testing options.' }
        }
      },
      {
        id: 'email_sequence',
        name: 'Welcome & Nurture Email Sequence (5-7 Emails)',
        description: 'Automated email onboarding drip designed to build relationship and convert leads into paying customers.',
        typicalDelivery: '4 - 10 days',
        rates: {
          beginner: { hourly: '$25 - $35', fixed: '$200 - $450', note: 'Basic friendly email sequence with template subject lines.' },
          intermediate: { hourly: '$40 - $70', fixed: '$550 - $1,200', note: 'Compelling storytelling, behavioral triggers, high-open subject lines.' },
          expert: { hourly: '$75 - $130+', fixed: '$1,500 - $3,500+', note: 'Segmented lifecycle automation, sales psychology, ESP setup integration.' }
        }
      }
    ]
  },
  ai_data: {
    name: 'AI, Automation & Data',
    services: [
      {
        id: 'zapier_automation',
        name: 'Zapier / Make.com Business Workflow Automation',
        description: 'Connect disparate apps to eliminate manual data entry, lead management, and invoicing chores.',
        typicalDelivery: '2 - 5 days',
        rates: {
          beginner: { hourly: '$30 - $45', fixed: '$250 - $600', note: 'Simple multi-step trigger and action scenarios.' },
          intermediate: { hourly: '$50 - $80', fixed: '$750 - $1,800', note: 'Custom webhook routing, error handling, Airtable integration, data formatting.' },
          expert: { hourly: '$85 - $150+', fixed: '$2,000 - $5,000+', note: 'Complex fault-tolerant enterprise pipelines with fallback alerts and API scripts.' }
        }
      }
    ]
  },
  marketing_seo: {
    name: 'Digital Marketing & SEO',
    services: [
      {
        id: 'seo_audit',
        name: 'Technical SEO & Keyword Strategy Audit',
        description: 'Comprehensive crawl audit, keyword gap analysis, site speed diagnosis, and actionable fix roadmap.',
        typicalDelivery: '5 - 10 days',
        rates: {
          beginner: { hourly: '$25 - $40', fixed: '$300 - $600', note: 'Automated tool report cleanup with basic recommendations.' },
          intermediate: { hourly: '$45 - $75', fixed: '$750 - $1,600', note: 'Manual technical audit, internal linking strategy, keyword intent matrix.' },
          expert: { hourly: '$80 - $140+', fixed: '$1,800 - $4,000+', note: 'Deep crawl budget optimization, JavaScript SEO, migration rescue, competitive blueprint.' }
        }
      }
    ]
  }
};

export const SAMPLE_SAVED_PROJECTS = [
  {
    id: 'proj_1',
    title: 'SaaS Analytics Dashboard & Client Portal',
    category: 'Web Development',
    status: 'In Progress',
    techStack: ['React', 'Tailwind CSS', 'Recharts', 'Node.js'],
    targetClient: 'B2B Founders & Startup CTOs',
    problem: 'Clients struggle to visualize subscription retention metrics and churn indicators clearly.',
    solution: 'Designed an interactive analytics portal with customizable metrics, date range filtering, and CSV export.',
    deliverables: 'Interactive demo, reusable component library, responsive layouts.',
    estimatedValue: '$3,500 - $6,000'
  },
  {
    id: 'proj_2',
    title: 'E-commerce Checkout Optimization Redesign',
    category: 'UI/UX & Web',
    status: 'Idea',
    techStack: ['Figma', 'Next.js', 'Stripe'],
    targetClient: 'Shopify Store Owners ($50k-$500k ARR)',
    problem: '68% cart abandonment rate due to cluttered mobile checkout forms.',
    solution: 'Single-step accordion checkout with instant validation and Apple Pay / Google Pay priority.',
    deliverables: 'Figma case study, before/after metric report, working React prototype.',
    estimatedValue: '$2,200 - $4,000'
  }
];

export const SAMPLE_RECENT_PROPOSALS = [
  {
    id: 'prop_1',
    jobTitle: 'Need Senior React Developer for Fintech Dashboard Redesign',
    clientName: 'Fintech Startup',
    tone: 'Consultative',
    rateEstimate: '$65/hr',
    createdAt: '2 days ago',
    excerpt: 'Hi there! I noticed your current dashboard handles high-frequency data updates. Having built similar financial analytics interfaces in React...'
  },
  {
    id: 'prop_2',
    jobTitle: 'Landing Page Developer with Fast Turnaround (Tailwind + Next.js)',
    clientName: 'SaaS Product Studio',
    tone: 'Direct & Fast',
    rateEstimate: '$1,200 Fixed',
    createdAt: '4 days ago',
    excerpt: 'Hi! I can turn around your 3-section landing page in 48 hours with a verified 95+ Google Lighthouse score...'
  }
];

export const PROFILE_POWER_KEYWORDS = [
  'Conversion Rate Optimization', 'Responsive Web Design', 'Full-Stack Architecture',
  'RESTful APIs', 'Next.js Performance', 'Figma Design Systems', 'Scalable Solutions',
  'Clean Code', 'TypeScript Safety', 'Mobile-First', 'Client ROI', 'Agile Delivery',
  'Automated Testing', 'Stripe Integration', 'SEO Best Practices'
];

export const DEFAULT_USER_PROFILE = {
  name: 'Alex Rivera',
  title: 'Full-Stack React & Node.js Developer',
  hourlyRate: 55,
  currency: 'USD',
  experienceLevel: 'Intermediate',
  category: 'web_dev',
  bio: "Hi! I am a full-stack developer with 3+ years of experience building responsive websites with React, JavaScript, Node.js and Tailwind CSS. I write clean code and deliver projects on time. Looking forward to working with you on your next web application!",
  skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'HTML/CSS', 'REST APIs', 'Next.js'],
  primaryPlatform: 'Upwork',
  readyScore: 78
};
