// src/utils/triageAlgorithm.js

const EMERGENCY_SYMPTOMS = [
  'सांस लेने में कठिनाई',
  'breathing problem',
  'छाती में दर्द',
  'chest pain',
  'severe bleeding',
  'unconscious',
  'ਸਾਹ ਲੈਣ ਵਿੱਚ ਦਿੱਕਤ',
  'ਛਾਤੀ ਵਿੱਚ ਦਰਦ'
];

const HIGH_RISK_SYMPTOMS = [
  'बुखार',
  'fever',
  'high fever',
  'persistent cough',
  'severe headache',
  'vomiting',
  'ਬੁਖਾਰ',
  'ਖੰਘ',
  'ਸਿਰ ਦਰਦ'
];

const VITAL_THRESHOLDS = {
  temperature: { emergency: 103, urgent: 100.4 },
  heartRate: { emergency: 120, urgent: 100 },
  bloodPressure: {
    systolic: { emergency: 180, urgent: 140 },
    diastolic: { emergency: 110, urgent: 90 }
  }
};

const classifyPatient = (patientData) => {
  const { patient, symptoms, vitals } = patientData;
  
  let riskScore = 0;
  let riskFactors = [];
  let recommendations = [];
  let estimatedWaitTime = '';
  let priority = 'GREEN';

  // Check emergency symptoms
  const hasEmergencySymptom = symptoms.some(symptom => 
    EMERGENCY_SYMPTOMS.some(emergency => 
      symptom.toLowerCase().includes(emergency.toLowerCase())
    )
  );

  if (hasEmergencySymptom) {
    riskScore += 50;
    riskFactors.push('🚨 Emergency symptoms detected');
  }

  // Check high risk symptoms  
  const highRiskCount = symptoms.filter(symptom => 
    HIGH_RISK_SYMPTOMS.some(risk => 
      symptom.toLowerCase().includes(risk.toLowerCase())
    )
  ).length;

  riskScore += highRiskCount * 10;
  if (highRiskCount > 0) {
    riskFactors.push(`⚠️ ${highRiskCount} high-risk symptoms`);
  }

  // Analyze vitals
  if (vitals.temperature) {
    const temp = parseFloat(vitals.temperature);
    if (temp >= VITAL_THRESHOLDS.temperature.emergency) {
      riskScore += 30;
      riskFactors.push('🌡️ Critical fever');
    } else if (temp >= VITAL_THRESHOLDS.temperature.urgent) {
      riskScore += 15;
      riskFactors.push('🌡️ High fever');
    }
  }

  if (vitals.heartRate) {
    const hr = parseInt(vitals.heartRate);
    if (hr >= VITAL_THRESHOLDS.heartRate.emergency) {
      riskScore += 25;
      riskFactors.push('💓 Critical heart rate');
    } else if (hr >= VITAL_THRESHOLDS.heartRate.urgent) {
      riskScore += 10;
      riskFactors.push('💓 Elevated heart rate');
    }
  }

  if (vitals.bloodPressure) {
    const bp = vitals.bloodPressure.split('/');
    if (bp.length === 2) {
      const systolic = parseInt(bp[0]);
      const diastolic = parseInt(bp[1]);
      
      if (systolic >= VITAL_THRESHOLDS.bloodPressure.systolic.emergency || 
          diastolic >= VITAL_THRESHOLDS.bloodPressure.diastolic.emergency) {
        riskScore += 30;
        riskFactors.push('🩸 Critical blood pressure');
      } else if (systolic >= VITAL_THRESHOLDS.bloodPressure.systolic.urgent || 
                 diastolic >= VITAL_THRESHOLDS.bloodPressure.diastolic.urgent) {
        riskScore += 15;
        riskFactors.push('🩸 High blood pressure');
      }
    }
  }

  // Age-based risk
  if (patient.age) {
    const age = parseInt(patient.age);
    if (age > 65) {
      riskScore += 10;
      riskFactors.push('👴 Senior citizen (high risk)');
    } else if (age < 5) {
      riskScore += 15;
      riskFactors.push('👶 Pediatric patient (high risk)');
    }
  }

  // Final classification
  const existingQueue = JSON.parse(localStorage.getItem('triageQueue') || '[]');

  if (riskScore >= 40) {
    priority = 'RED';
    estimatedWaitTime = 'Immediate';
    recommendations = [
      '🚨 Emergency: Immediate medical attention required',
      '📞 Call ambulance if not at hospital',
      '💊 Prepare for immediate intervention',
      '👨‍⚕️ Doctor consultation required NOW'
    ];
  } else if (riskScore >= 20) {
    priority = 'YELLOW';
    estimatedWaitTime = '30-60 minutes';
    recommendations = [
      '⚠️ Urgent: Medical attention needed soon',
      '🏥 Visit nearby healthcare facility',
      '💊 Monitor symptoms closely',
      '👨‍⚕️ Doctor consultation recommended'
    ];
  } else {
    priority = 'GREEN';
    estimatedWaitTime = '2-4 hours';
    recommendations = [
      '✅ Routine: Standard medical care',
      '🏥 Schedule appointment with healthcare provider',
      '💊 Basic first aid may be sufficient',
      '👨‍⚕️ Non-urgent consultation'
    ];
  }

  // Calculate queue position
  const redCount = existingQueue.filter(p => p.priority === 'RED').length;
  const yellowCount = existingQueue.filter(p => p.priority === 'YELLOW').length;
  
  let queuePosition;
  if (priority === 'RED') {
    queuePosition = redCount + 1;
  } else if (priority === 'YELLOW') {
    queuePosition = redCount + yellowCount + 1;
  } else {
    queuePosition = existingQueue.length + 1;
  }

  return {
    patient,
    priority,
    riskScore,
    riskFactors,
    recommendations,
    estimatedWaitTime,
    queuePosition,
    symptoms,
    vitals,
    timestamp: new Date().toISOString(),
    triageId: `TRI-${Date.now()}`
  };
};

const addToQueue = (triageResult) => {
  const existingQueue = JSON.parse(localStorage.getItem('triageQueue') || '[]');
  existingQueue.push(triageResult);
  
  existingQueue.sort((a, b) => {
    const priorityOrder = { 'RED': 0, 'YELLOW': 1, 'GREEN': 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
  
  existingQueue.forEach((patient, index) => {
    patient.queuePosition = index + 1;
  });
  
  localStorage.setItem('triageQueue', JSON.stringify(existingQueue));
  return existingQueue;
};

const getQueue = () => {
  return JSON.parse(localStorage.getItem('triageQueue') || '[]');
};

const removeFromQueue = (triageId) => {
  const queue = JSON.parse(localStorage.getItem('triageQueue') || '[]');
  const updatedQueue = queue.filter(patient => patient.triageId !== triageId);
  
  updatedQueue.forEach((patient, index) => {
    patient.queuePosition = index + 1;
  });
  
  localStorage.setItem('triageQueue', JSON.stringify(updatedQueue));
  return updatedQueue;
};

const clearQueue = () => {
  localStorage.removeItem('triageQueue');
  return [];
};

// Export at the end
export { classifyPatient, addToQueue, getQueue, removeFromQueue, clearQueue };
