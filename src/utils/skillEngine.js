import { FREELANCE_CATEGORIES } from '../data/freelanceData.js';

export function analyzeSkills({ skills = [], experienceLevel = 'Intermediate', categoryId = 'web_dev' }) {
  const category = FREELANCE_CATEGORIES.find(c => c.id === categoryId) || FREELANCE_CATEGORIES[0];
  const normalizedUserSkills = skills.map(s => s.trim().toLowerCase()).filter(Boolean);

  // Experience level base multiplier
  let expBase = 50;
  if (experienceLevel === 'Beginner') expBase = 45;
  if (experienceLevel === 'Intermediate') expBase = 65;
  if (experienceLevel === 'Senior' || experienceLevel === 'Expert') expBase = 80;

  // Skill match bonus
  const matchedCategorySkills = category.skills.filter(catSkill =>
    normalizedUserSkills.includes(catSkill.toLowerCase())
  );

  const matchedHotSkills = category.hotSkills.filter(hot =>
    normalizedUserSkills.includes(hot.toLowerCase())
  );

  let skillBonus = matchedCategorySkills.length * 4;
  let hotBonus = matchedHotSkills.length * 5;
  let totalBonus = skillBonus + hotBonus;

  // Cap score reasonably
  let readinessScore = Math.min(98, Math.max(30, Math.round(expBase + (totalBonus * 0.45))));

  // Breakdown strong skills
  const strongSkills = skills.filter(s => {
    const isCategorySkill = category.skills.some(cs => cs.toLowerCase() === s.toLowerCase());
    const isHot = category.hotSkills.some(hs => hs.toLowerCase() === s.toLowerCase());
    return isCategorySkill || isHot;
  });

  // If user entered skills that weren't in category hot list, include up to 5 user skills as strong
  const displayStrongSkills = strongSkills.length > 0 ? strongSkills : skills.slice(0, 5);

  // Recommended services from category
  const recommendedServices = category.recommendedServices.map(service => {
    // Check if user has related skills
    const isRelevant = normalizedUserSkills.some(userSkill =>
      service.name.toLowerCase().includes(userSkill) ||
      service.deliverable.toLowerCase().includes(userSkill)
    );
    return {
      ...service,
      relevanceScore: isRelevant ? 95 : 85
    };
  });

  // Suitable job categories
  const suitableCategories = [
    {
      title: category.name,
      description: category.description,
      matchRate: '95% Primary Fit',
      niches: getCategoryNiches(categoryId)
    },
    {
      title: 'Consulting & Technical Advisory',
      description: `Guiding clients on ${category.name.toLowerCase()} decisions, tech stack audits, and MVP roadmaps.`,
      matchRate: experienceLevel === 'Beginner' ? '65% Developing Fit' : '88% High Value',
      niches: ['Architecture Planning', 'Code / Design Audits', 'Vendor Feasibility']
    },
    {
      title: 'Micro-Gig & Speed Turnaround Services',
      description: 'Rapid 24-48 hour fixes, landing page tuning, and emergency debugging.',
      matchRate: '90% High Volume',
      niches: ['Bug Squashing', 'Performance Speedups', 'Responsive Tweaks']
    }
  ];

  // Skills to improve
  const skillsToImprove = category.skillsToImprove.map(item => {
    const alreadyHas = normalizedUserSkills.includes(item.skill.toLowerCase());
    return {
      ...item,
      status: alreadyHas ? 'Reinforce & Show in Portfolio' : 'High ROI to Learn Next'
    };
  });

  // Portfolio ideas
  const portfolioIdeas = category.portfolioIdeas;

  return {
    category: category.name,
    experienceLevel,
    readinessScore,
    readinessRating: getReadinessLabel(readinessScore),
    strongSkills: displayStrongSkills,
    skillsToImprove,
    recommendedServices,
    suitableCategories,
    portfolioIdeas,
    hotSkillsInDemand: category.hotSkills,
    summary: `Based on your ${experienceLevel.toLowerCase()} profile in ${category.name}, you have a strong foundational readiness score of ${readinessScore}%. Emphasizing high-demand tools and packaging concrete business outcomes will help you attract quality clients.`
  };
}

function getReadinessLabel(score) {
  if (score >= 85) return { label: 'High Market Readiness', color: 'emerald', message: 'You have high-value in-demand skills and can command premium rates.' };
  if (score >= 70) return { label: 'Solid Core Competence', color: 'indigo', message: 'Ready to land steady mid-market client contracts with good portfolio proof.' };
  if (score >= 50) return { label: 'Emerging Freelancer', color: 'amber', message: 'Capable of delivering entry to mid-range projects; build 1-2 focused case studies.' };
  return { label: 'Foundational Phase', color: 'rose', message: 'Focus on mastering 2-3 core tools and publishing a complete portfolio project.' };
}

function getCategoryNiches(catId) {
  switch (catId) {
    case 'web_dev':
      return ['SaaS Startups', 'DTC E-commerce', 'Agency Subcontracting', 'Local Business Sites'];
    case 'mobile_dev':
      return ['Fitness & Lifestyle Startups', 'Fintech MVPs', 'B2B Field Apps', 'Shopify Companion Apps'];
    case 'ui_ux':
      return ['B2B Web Apps', 'Mobile Onboarding Flow', 'Design Systems for Dev Teams', 'Design Sprints'];
    case 'content_copy':
      return ['SaaS Onboarding Emails', 'High-Ticket VSL & Landing Pages', 'B2B Case Studies', 'SEO Silos'];
    case 'ai_data':
      return ['Lead Scraping Pipelines', 'Automated CRM Integrations', 'AI Chatbot Assistants', 'KPI Dashboards'];
    case 'marketing_seo':
      return ['Technical SEO Migrations', 'Local High-Ticket Lead Gen', 'Google Ads Scaling', 'E-commerce GA4 Setup'];
    default:
      return ['Specialized Projects', 'Agency White-Label', 'Ongoing Retainers'];
  }
}
