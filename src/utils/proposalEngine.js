export function generateProposal({
  jobTitle,
  jobDescription,
  freelancerName = 'Freelance Professional',
  freelancerSkills = [],
  tone = 'Consultative',
  clientName = '',
  estimatedTimeline = '',
  estimatedRate = ''
}) {
  const cleanTitle = (jobTitle || '').trim();
  const cleanDesc = (jobDescription || '').trim();
  const greetingName = clientName ? clientName.trim() : 'there';

  // Detect key focus terms from job title and description
  const lowerText = `${cleanTitle} ${cleanDesc}`.toLowerCase();
  
  // Extract likely technical focus or domain
  const detectedFocus = extractKeyFocus(lowerText);
  const relevantSkills = freelancerSkills.length > 0 
    ? freelancerSkills.slice(0, 4).join(', ') 
    : 'modern best practices, clean architecture, and responsive design';

  // Tone variations
  let hook = '';
  let solutionSteps = [];
  let closingPlea = '';
  let whyMe = '';

  if (tone === 'Direct & Fast') {
    hook = `Hi ${greetingName},\n\nI read your requirements for "${cleanTitle}". You need someone who can jump in immediately, deliver clean and reliable work without endless back-and-forth, and respect your timeline. I have direct experience handling ${detectedFocus.term} and can start right away.`;
    
    solutionSteps = [
      `1. Immediate Kickoff: Review all existing assets, clarify edge cases, and lock in milestones within 24 hours.`,
      `2. Rapid Execution: Build and test using ${relevantSkills}, providing you with staging preview links to test progress.`,
      `3. Polish & Handover: Rigorous QA across devices, comprehensive documentation, and a clean handoff so your team can maintain it easily.`
    ];

    whyMe = `I focus on speed, transparent daily communication, and zero bloat. No hand-waving or unnecessary meetings—just high-velocity, production-ready deliverables.`;

    closingPlea = `If you have 5 minutes today, let's connect on chat to confirm your preferred turnaround date so I can reserve time on my schedule.`;

  } else if (tone === 'Value & ROI') {
    hook = `Hi ${greetingName},\n\nYour post for "${cleanTitle}" caught my attention because the real objective here isn't just checking off a task list—it's creating an outcome that drives tangible results and positive user experience for your business.`;

    solutionSteps = [
      `Phase 1 — Discovery & Impact Alignment: Pinpoint the exact user bottleneck and prioritize high-leverage deliverables.`,
      `Phase 2 — High-Performance Implementation: Implement using ${relevantSkills}, keeping conversion rate, speed, and maintainability front and center.`,
      `Phase 3 — Verification & Metric Tracking: Validate performance before launch to ensure the project delivers measurable value from day one.`
    ];

    whyMe = `Clients partner with me not just for execution, but for business judgment. I think like a stakeholder, ensuring every dollar invested in this project delivers a solid return.`;

    closingPlea = `Would you be open to a quick chat where I can share 2 specific suggestions to maximize the ROI on this project?`;

  } else if (tone === 'Friendly & Collaborative') {
    hook = `Hi ${greetingName}!\n\nI'd love to help you bring "${cleanTitle}" across the finish line. Projects like this are right in my wheelhouse, and I really enjoy collaborating closely with clients who care about quality and user experience.`;

    solutionSteps = [
      `Step 1: A brief alignment chat or async message exchange to make sure we're 100% aligned on vision.`,
      `Step 2: Iterative building with regular progress snapshots using ${relevantSkills}. You'll never have to wonder what status we're in.`,
      `Step 3: Final walkthrough, minor revisions, and a smooth rollout with ongoing support if needed.`
    ];

    whyMe = `My past clients highlight my responsiveness, clear async communication, and friendly attitude. I treat your project with the same care and dedication as if it were my own.`;

    closingPlea = `I'd love to learn more about your vision! When would be a convenient time for a quick chat?`;

  } else {
    // Consultative & Strategic (Default)
    hook = `Hi ${greetingName},\n\nI came across your posting for "${cleanTitle}" and took the time to carefully review the problem you're solving. ${detectedFocus.insight}`;

    solutionSteps = [
      `1. Architecture & Alignment: Review current scope, identify potential bottlenecks early, and establish clear deliverables.`,
      `2. Robust Execution: Build out the core functionality leveraging ${relevantSkills}, adhering strictly to industry standards.`,
      `3. Quality Assurance & Launch: End-to-end testing, responsive verification, and a frictionless deployment.`
    ];

    whyMe = `With a track record of delivering high-quality freelance solutions, my approach is proactive: you won't need to micromanage me. I provide clear status updates and flag potential challenges before they become delays.`;

    closingPlea = `I'd be glad to share a couple of relevant project examples and discuss the best roadmap for your budget. Are you available for a quick message exchange or call this week?`;
  }

  // Optional rate/timeline blocks
  let logisticsBlock = '';
  if (estimatedTimeline || estimatedRate) {
    logisticsBlock = `\n\nEstimated Logistics:\n` +
      (estimatedTimeline ? `• Timeline: ${estimatedTimeline}\n` : '') +
      (estimatedRate ? `• Pricing / Structure: ${estimatedRate}\n` : '');
  }

  const fullProposal = `${hook}

Here is how I would approach this project:
${solutionSteps.join('\n')}
${logisticsBlock}
Why work with me:
${whyMe}

${closingPlea}

Best regards,
${freelancerName}`;

  return {
    proposalText: fullProposal,
    tone,
    detectedFocus: detectedFocus.term,
    wordCount: fullProposal.split(/\s+/).filter(Boolean).length,
    estimatedReadTime: '45 seconds'
  };
}

function extractKeyFocus(text) {
  if (text.includes('react') || text.includes('next') || text.includes('frontend')) {
    return {
      term: 'modern React & frontend development',
      insight: 'A common pitfall with frontend projects is unoptimized rendering and brittle state management—both of which I proactively design against.'
    };
  }
  if (text.includes('landing') || text.includes('conversion') || text.includes('lead')) {
    return {
      term: 'high-converting landing pages',
      insight: 'First impressions matter immensely: every second of delay in load time or friction in the layout directly hurts your conversion rate.'
    };
  }
  if (text.includes('design') || text.includes('figma') || text.includes('ui') || text.includes('ux')) {
    return {
      term: 'intuitive UI/UX and design systems',
      insight: 'Great design goes far beyond aesthetics—it is about reducing user cognitive load and making workflows effortless.'
    };
  }
  if (text.includes('api') || text.includes('backend') || text.includes('node') || text.includes('database')) {
    return {
      term: 'scalable backend architectures and API integrations',
      insight: 'Reliability and clean error-handling are critical here so your system remains stable as traffic grows.'
    };
  }
  if (text.includes('mobile') || text.includes('app') || text.includes('ios') || text.includes('android')) {
    return {
      term: 'mobile user experiences and responsive design',
      insight: 'Ensuring seamless performance across diverse device viewports and network conditions is top priority.'
    };
  }
  return {
    term: 'custom technical execution and problem solving',
    insight: 'Getting this done right the first time will save you significant debugging time and rework down the line.'
  };
}
