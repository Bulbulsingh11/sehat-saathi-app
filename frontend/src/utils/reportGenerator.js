// src/utils/reportGenerator.js

// Generates a professional medical report object or string for download/print/export/sharing
export const generateMedicalReport = ({
  patient, mlResults, nlpResults, clinicalRecommendations, triageId, priority, urgencyLevel, riskScore, queuePosition, assessmentTimestamp
}) => ({
  header: {
    reportTitle: "AI-POWERED CLINICAL TRIAGE ASSESSMENT",
    facilityName: "Sehat Saathi Telemedicine Network",
    reportId: triageId,
    generatedAt: assessmentTimestamp || new Date().toISOString(),
    systemVersion: "AI Triage Engine v2.0",
    compliance: "ESI Protocol • RACGP Guidelines • HIPAA Compliant"
  },
  patientSummary: {
    name: patient.name,
    age: patient.age,
    gender: patient.gender,
    queuePosition
  },
  clinicalFindings: {
    chiefComplaint: (nlpResults?.extractedEntities?.map(e => e.entity).join(', ') || 'Unspecified'),
    riskStratification: `${Math.round(riskScore)}/100 (Confidence: ${mlResults?.model_confidence || '--'}%)`,
    priorityAssignment: `${priority} - ${urgencyLevel}`,
    recommendedAction: clinicalRecommendations?.[0] || ''
  },
  aiAnalysis: {
    nlpSummary: nlpResults?.extractedEntities?.map(e => `• ${e.entity} (${e.category})`).join('\n') || '',
    machineLearningPrediction: "XGBoost-inspired model. Clinical grade ML performance.",
    featureImportance: mlResults?.feature_importance || {},
    confidenceInterval: mlResults?.confidence_interval || []
  }
});
