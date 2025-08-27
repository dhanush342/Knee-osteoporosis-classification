import { AssessmentData } from './AssessmentForm';

export interface RiskResult {
  riskScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  riskFactors: string[];
  protectiveFactors: string[];
  recommendations: {
    nutrition: string[];
    exercise: string[];
    medical: string[];
    lifestyle: string[];
  };
}

export function calculateOsteoporosisRisk(data: AssessmentData): RiskResult {
  let riskScore = 0;
  const riskFactors: string[] = [];
  const protectiveFactors: string[] = [];

  // Age factor (major risk factor)
  if (data.age >= 65) {
    riskScore += 25;
    riskFactors.push('Age 65 or older');
  } else if (data.age >= 50) {
    riskScore += 15;
    riskFactors.push('Age 50 or older');
  } else if (data.age < 30) {
    protectiveFactors.push('Young age');
  }

  // Gender factor
  if (data.gender === 'female') {
    riskScore += 10;
    riskFactors.push('Female gender');
  }

  // BMI calculation and factor
  if (data.height && data.weight) {
    const bmi = data.weight / ((data.height / 100) ** 2);
    if (bmi < 18.5) {
      riskScore += 15;
      riskFactors.push('Low body weight (BMI < 18.5)');
    } else if (bmi >= 25) {
      protectiveFactors.push('Healthy body weight');
    }
  }

  // Family history
  if (data.familyHistoryOsteoporosis) {
    riskScore += 15;
    riskFactors.push('Family history of osteoporosis');
  }
  if (data.familyHistoryFractures) {
    riskScore += 10;
    riskFactors.push('Family history of fractures');
  }

  // Previous fractures
  if (data.previousFractures) {
    riskScore += 20;
    riskFactors.push('Previous fractures');
  }

  // Menopause status
  if (data.gender === 'female') {
    if (data.menopauseStatus === 'earlymenopause') {
      riskScore += 20;
      riskFactors.push('Early menopause');
    } else if (data.menopauseStatus === 'postmenopausal') {
      riskScore += 10;
      riskFactors.push('Post-menopausal');
    }
  }

  // Chronic diseases
  if (data.chronicDiseases?.includes('Rheumatoid arthritis')) {
    riskScore += 15;
    riskFactors.push('Rheumatoid arthritis');
  }
  if (data.chronicDiseases?.includes('Thyroid disorders')) {
    riskScore += 10;
    riskFactors.push('Thyroid disorders');
  }
  if (data.chronicDiseases?.includes('Kidney disease')) {
    riskScore += 12;
    riskFactors.push('Kidney disease');
  }
  if (data.chronicDiseases?.includes('Gastrointestinal disorders')) {
    riskScore += 10;
    riskFactors.push('Gastrointestinal disorders');
  }

  // Medications
  if (data.medications?.includes('Corticosteroids')) {
    riskScore += 20;
    riskFactors.push('Long-term corticosteroid use');
  }
  if (data.medications?.includes('Proton pump inhibitors')) {
    riskScore += 8;
    riskFactors.push('Proton pump inhibitor use');
  }
  if (data.medications?.includes('Anti-seizure medications')) {
    riskScore += 10;
    riskFactors.push('Anti-seizure medication use');
  }

  // Lifestyle factors
  if (data.smokingStatus === 'current') {
    riskScore += 15;
    riskFactors.push('Current smoking');
  } else if (data.smokingStatus === 'former') {
    riskScore += 5;
    riskFactors.push('Former smoking');
  } else {
    protectiveFactors.push('Non-smoker');
  }

  if (data.alcoholConsumption === 'heavy') {
    riskScore += 12;
    riskFactors.push('Heavy alcohol consumption');
  } else if (data.alcoholConsumption === 'moderate') {
    riskScore += 5;
    riskFactors.push('Moderate alcohol consumption');
  }

  // Physical activity
  if (data.physicalActivity === 'sedentary') {
    riskScore += 15;
    riskFactors.push('Sedentary lifestyle');
  } else if (data.physicalActivity === 'light') {
    riskScore += 8;
    riskFactors.push('Low physical activity');
  } else if (data.physicalActivity === 'active') {
    protectiveFactors.push('Regular physical activity');
  }

  // Nutrition factors
  if (data.calciumIntake === 'low') {
    riskScore += 12;
    riskFactors.push('Low calcium intake');
  } else if (data.calciumIntake === 'adequate' || data.calciumIntake === 'high') {
    protectiveFactors.push('Adequate calcium intake');
  }

  if (data.vitaminDIntake === 'low') {
    riskScore += 10;
    riskFactors.push('Low vitamin D levels');
  } else if (data.vitaminDIntake === 'adequate' || data.vitaminDIntake === 'high') {
    protectiveFactors.push('Adequate vitamin D levels');
  }

  if (data.proteinIntake === 'low') {
    riskScore += 8;
    riskFactors.push('Low protein intake');
  } else if (data.proteinIntake === 'adequate' || data.proteinIntake === 'high') {
    protectiveFactors.push('Adequate protein intake');
  }

  // Determine risk level
  let riskLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  if (riskScore <= 25) {
    riskLevel = 'Low';
  } else if (riskScore <= 50) {
    riskLevel = 'Moderate';
  } else if (riskScore <= 75) {
    riskLevel = 'High';
  } else {
    riskLevel = 'Very High';
  }

  // Generate recommendations
  const recommendations = generateRecommendations(data, riskLevel);

  return {
    riskScore: Math.min(riskScore, 100),
    riskLevel,
    riskFactors,
    protectiveFactors,
    recommendations
  };
}

function generateRecommendations(
  data: AssessmentData, 
  riskLevel: string
): RiskResult['recommendations'] {
  const recommendations = {
    nutrition: [] as string[],
    exercise: [] as string[],
    medical: [] as string[],
    lifestyle: [] as string[]
  };

  // Nutrition recommendations
  if (data.calciumIntake === 'low' || data.calciumIntake === 'moderate') {
    recommendations.nutrition.push('Increase calcium intake to 1000-1200mg daily through dairy, leafy greens, or supplements');
  }
  
  if (data.vitaminDIntake === 'low' || data.vitaminDIntake === 'moderate') {
    recommendations.nutrition.push('Ensure adequate vitamin D (800-1000 IU daily) through sunlight, fortified foods, or supplements');
  }
  
  if (data.proteinIntake === 'low') {
    recommendations.nutrition.push('Increase protein intake to 1.0-1.2g per kg body weight daily');
  }
  
  recommendations.nutrition.push('Follow a balanced diet rich in fruits, vegetables, and whole grains');
  recommendations.nutrition.push('Limit caffeine and excessive salt intake');

  // Exercise recommendations
  if (data.physicalActivity === 'sedentary' || data.physicalActivity === 'light') {
    recommendations.exercise.push('Start with 30 minutes of weight-bearing exercise 3-4 times per week');
  }
  
  recommendations.exercise.push('Include resistance training 2-3 times per week');
  recommendations.exercise.push('Practice balance exercises to prevent falls');
  recommendations.exercise.push('Consider walking, dancing, or stair climbing as weight-bearing activities');
  
  if (riskLevel === 'High' || riskLevel === 'Very High') {
    recommendations.exercise.push('Consult a physical therapist for personalized exercise program');
  }

  // Medical recommendations
  if (riskLevel === 'Moderate' || riskLevel === 'High' || riskLevel === 'Very High') {
    recommendations.medical.push('Schedule a bone density scan (DEXA) with your healthcare provider');
  }
  
  if (riskLevel === 'High' || riskLevel === 'Very High') {
    recommendations.medical.push('Discuss medication options with your doctor');
    recommendations.medical.push('Consider referral to an endocrinologist or rheumatologist');
  }
  
  recommendations.medical.push('Have regular check-ups to monitor bone health');
  recommendations.medical.push('Discuss your fracture risk and prevention strategies');

  // Lifestyle recommendations
  if (data.smokingStatus === 'current') {
    recommendations.lifestyle.push('Quit smoking - consider smoking cessation programs');
  }
  
  if (data.alcoholConsumption === 'heavy' || data.alcoholConsumption === 'moderate') {
    recommendations.lifestyle.push('Limit alcohol consumption to no more than 2 drinks per day');
  }
  
  recommendations.lifestyle.push('Ensure adequate sleep (7-9 hours per night)');
  recommendations.lifestyle.push('Practice stress management techniques');
  recommendations.lifestyle.push('Make your home safer to prevent falls (remove rugs, improve lighting)');

  return recommendations;
}