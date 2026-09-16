import { PRICING_GUIDE_DATA } from '../data/freelanceData.js';

export function getPricingEstimate(categoryId, serviceId, experienceLevel = 'intermediate') {
  const category = PRICING_GUIDE_DATA[categoryId] || PRICING_GUIDE_DATA.web_dev;
  const service = category.services.find(s => s.id === serviceId) || category.services[0];

  const levelKey = experienceLevel.toLowerCase();
  const validLevel = ['beginner', 'intermediate', 'expert'].includes(levelKey) ? levelKey : 'intermediate';

  const rateInfo = service.rates[validLevel] || service.rates.intermediate;

  return {
    categoryName: category.name,
    serviceName: service.name,
    description: service.description,
    typicalDelivery: service.typicalDelivery,
    experienceLevel: validLevel,
    hourlyRange: rateInfo.hourly,
    fixedRange: rateInfo.fixed,
    expertAdvice: rateInfo.note,
    guidelineDisclaimer: "Please note: These price ranges represent current market benchmark averages for independent global contractors. Actual rates can vary based on geographic market, project urgency, technical complexity, client budget, and specialized domain expertise. Use these numbers as a pricing reference and negotiation baseline, not a rigid constraint."
  };
}

export function getAllCategoriesAndServices() {
  return Object.entries(PRICING_GUIDE_DATA).map(([catId, cat]) => ({
    id: catId,
    name: cat.name,
    services: cat.services.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      typicalDelivery: s.typicalDelivery
    }))
  }));
}
