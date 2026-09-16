import { PROFILE_POWER_KEYWORDS } from '../data/freelanceData.js';

export function analyzeAndImproveProfile({
  name = 'Alex',
  title = '',
  bio = '',
  skills = [],
  hourlyRate = 50,
  currency = 'USD',
  experienceLevel = 'Intermediate'
}) {
  const cleanTitle = (title || '').trim();
  const cleanBio = (bio || '').trim();
  const bioLower = cleanBio.toLowerCase();
  const titleLower = cleanTitle.toLowerCase();

  // Metrics evaluation
  const issues = [];
  const suggestions = [];
  let score = 50;

  // 1. Title analysis
  if (!cleanTitle) {
    issues.push('Title is missing. A strong title is your most critical search anchor.');
    score -= 15;
  } else if (cleanTitle.length < 15) {
    issues.push('Title is too short or generic. Specify your exact specialty and primary tech stack.');
    score -= 8;
  } else if (cleanTitle.includes('|') || cleanTitle.includes('-') || cleanTitle.includes('&')) {
    score += 10;
  } else {
    score += 5;
  }

  // 2. Length check
  const wordCount = cleanBio.split(/\s+/).filter(Boolean).length;
  if (wordCount < 30) {
    issues.push('Overview is too brief. Clients looking to spend $1k+ need to see depth and methodology.');
    score -= 15;
  } else if (wordCount > 40) {
    score += 10;
  }

  // 3. Client-centric check ("you / your" vs "i / me / my")
  const youCount = (bioLower.match(/\b(you|your|yours|clients|business|team)\b/g) || []).length;
  const iCount = (bioLower.match(/\b(i|me|my|myself)\b/g) || []).length;

  if (youCount <= 2 && iCount >= 4) {
    suggestions.push({
      area: 'Client-First Framing',
      advice: 'Your bio is focused on "what I do" rather than "what business problem I solve for YOU". Shift the perspective toward the client\'s ROI and peace of mind.',
      impact: 'High'
    });
    score -= 8;
  } else {
    score += 8;
  }

  // 4. Call To Action check
  const hasCta = /call|chat|message|reach out|contact|discuss|connect|book|schedule/i.test(cleanBio);
  if (!hasCta) {
    suggestions.push({
      area: 'Missing Call-To-Action (CTA)',
      advice: 'End your profile with a low-friction invitation to chat or ask a question. Never leave the client guessing what to do next.',
      impact: 'High'
    });
    score -= 10;
  } else {
    score += 8;
  }

  // 5. Proof / numbers check
  const hasNumbers = /\b(\d+\+?%?|\$\d+|years?|clients?|projects?)\b/i.test(cleanBio);
  if (!hasNumbers) {
    suggestions.push({
      area: 'Social Proof & Metrics',
      advice: 'Add specific metrics: number of successful projects, years building, speed improvements, or revenue helped generated.',
      impact: 'Medium'
    });
    score -= 6;
  } else {
    score += 6;
  }

  // 6. Keywords
  const matchedKeywords = PROFILE_POWER_KEYWORDS.filter(kw =>
    bioLower.includes(kw.toLowerCase()) || titleLower.includes(kw.toLowerCase())
  );

  const missingKeywords = PROFILE_POWER_KEYWORDS.filter(kw =>
    !bioLower.includes(kw.toLowerCase()) && !titleLower.includes(kw.toLowerCase())
  ).slice(0, 6);

  if (matchedKeywords.length >= 3) {
    score += 10;
  } else {
    suggestions.push({
      area: 'Search Algorithm Optimization',
      advice: `Include high-intent search keywords like ${missingKeywords.slice(0, 3).join(', ')} so search algorithms surface your profile to top clients.`,
      impact: 'Medium'
    });
  }

  // Normalize final score
  const finalScore = Math.min(96, Math.max(35, Math.round(score)));

  // Generate Improved Title
  const primarySkill = skills[0] || 'Full-Stack';
  const secondarySkill = skills[1] || 'Web Development';
  const improvedTitle = cleanTitle 
    ? (cleanTitle.includes('|') ? cleanTitle : `${cleanTitle} | High-Performance & Scalable Solutions`)
    : `${primarySkill} & ${secondarySkill} Specialist | Clean Code & Fast Delivery`;

  // Generate Improved Bio
  const improvedBio = generateOptimizedBio({
    name,
    title: improvedTitle,
    skills,
    hourlyRate,
    experienceLevel,
    originalBio: cleanBio
  });

  return {
    score: finalScore,
    grade: getScoreGrade(finalScore),
    wordCount,
    issues,
    suggestions,
    usefulKeywords: missingKeywords,
    matchedKeywords,
    improvedTitle,
    improvedBio
  };
}

function getScoreGrade(score) {
  if (score >= 85) return { label: 'Top 5% Profile', color: 'emerald', text: 'Optimized for high-paying enterprise contracts.' };
  if (score >= 70) return { label: 'Competitive Profile', color: 'indigo', text: 'Good foundation with slight room for conversion polish.' };
  if (score >= 55) return { label: 'Average Profile', color: 'amber', text: 'Loses high-value leads to competitors with clearer value props.' };
  return { label: 'Needs Immediate Attention', color: 'rose', text: 'Too generic; clients skim past without inquiring.' };
}

function generateOptimizedBio({ name, title, skills, hourlyRate, experienceLevel, originalBio }) {
  const skillList = skills.length > 0 ? skills.slice(0, 5).join(' • ') : 'React • Node.js • Responsive UI • API Integration';
  
  return `Are you looking for a reliable ${title || 'Specialist'} who delivers clean, maintainable code on schedule—without requiring constant micromanagement?

Here is what I bring to your team:
• Rapid, dependable execution backed by strong engineering best practices.
• Deep expertise in ${skillList}.
• A business-first mindset: I don't just write code; I ensure your app is fast, accessible, and converts visitors into loyal users.
• Transparent, async-friendly communication with clear milestone progress updates.

How we can work together:
1. Discovery & Architecture: We clarify your core requirements and define realistic milestones.
2. Sprints & Feedback: You receive interactive preview links at each stage so there are never surprises.
3. Launch & Ongoing Support: Thorough QA, clean documentation handoff, and post-launch peace of mind.

Ready to bring your project to life or upgrade an existing system?
👉 Send me a message here with a brief summary of what you're building, and I'll respond within a few hours with initial thoughts and next steps.`;
}
