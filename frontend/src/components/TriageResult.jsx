// src/components/TriageResult.jsx
import React from 'react';

const TriageResult = ({ triageData, onBack, onAddToQueue }) => {
  const {
    patient,
    priority,
    urgencyLevel,
    riskScore,
    confidence,
    clinicalRecommendations,
    estimatedWaitTime,
    queuePosition,
    triageId,
    medicalReport,
    nlpAnalysis,
    mlAnalysis,
    auditTrail
  } = triageData;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ebfaff 0%, #cce4ff 100%)',
      padding: '20px',
      fontFamily: 'Arial, Helvetica, sans-serif'
    }}>
      {/* Back Button */}
      <button onClick={onBack} style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(0,86,179,0.18)',
        color: '#0056b3',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '25px',
        fontWeight: 600,
        cursor: 'pointer'
      }}>
        ← Back to Dashboard
      </button>

      <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '60px' }}>
        {/* Report Header */}
        <div style={{
          background: '#0056b3',
          padding: '32px',
          borderRadius: '20px 20px 0 0',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 12px 0', fontSize: '36px', letterSpacing: '1px' }}>
            🏥 Medical Triage Report
          </h1>
          <h2 style={{ fontSize: '30px' }}>
            {medicalReport.header.reportTitle}
          </h2>
          <div style={{ fontSize: '16px', opacity: 0.85 }}>
            {medicalReport.header.facilityName} &nbsp;|&nbsp;
            Version: {medicalReport.header.systemVersion}
          </div>
          <div style={{ fontSize: '18px', marginTop: '10px', color: '#ffd700' }}>
            PRIORITY: {priority} &mdash; <span style={{ fontWeight: 700 }}>{urgencyLevel}</span>
            &nbsp;
          </div>
          <div style={{ fontSize: '18px', marginTop: '4px' }}>
            Triage ID: {triageId} &nbsp;|&nbsp; Generated: {new Date(medicalReport.header.generatedAt).toLocaleString()}
          </div>
          <div style={{ fontSize: '15px', marginTop: '5px', opacity: 0.8 }}>
            {medicalReport.header.compliance}
          </div>
        </div>

        {/* Patient Information */}
        <div style={{
          background: '#fff',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#205080', marginBottom: '15px' }}>👤 Patient Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <strong>Name:</strong><br />
              {patient.name}
            </div>
            <div>
              <strong>Age:</strong><br />
              {patient.age} years
            </div>
            <div>
              <strong>Gender:</strong><br />
              {patient.gender}
            </div>
          </div>
        </div>

        {/* Clinical & AI Findings */}
        <div style={{
          background: '#fff',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#205080', marginBottom: '15px' }}>🩺 Clinical Assessment & AI Analysis</h3>
          <div style={{ marginBottom: '8px' }}>
            <strong>Chief Complaint:</strong> {medicalReport.clinicalFindings.chiefComplaint}
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Priority Assignment:</strong> <span style={{ fontWeight: 700 }}>{medicalReport.clinicalFindings.priorityAssignment}</span>
          </div>
          <div>
            <strong>Risk Stratification:</strong> <span style={{ color: '#e74c3c', fontWeight: 700 }}>
              {medicalReport.clinicalFindings.riskStratification}
            </span>
          </div>
        </div>

        {/* Advanced Risk Assessment */}
        <div style={{
          background: '#fff',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#205080', marginBottom: '15px' }}>📊 Advanced Risk Assessment & Queue</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div>
              <strong>AI Risk Score:</strong><br />
              <span style={{
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#0056b3'
              }}>
                {riskScore}/100
              </span>
              <br />
              <span style={{ fontSize: '15px', color: '#188818', fontWeight: 600 }}>
                Confidence: {confidence}%
              </span>
            </div>
            <div>
              <strong>Queue Position:</strong><br />
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
                #{queuePosition}
              </span>
            </div>
            <div>
              <strong>Estimated Wait Time:</strong><br />
              <span style={{ fontSize: '20px', color: '#e67e22' }}>
                {estimatedWaitTime}
              </span>
            </div>
          </div>
        </div>

        {/* NLP & ML Model Analysis */}
        <div style={{
          background: '#f5f8fa',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#205080', marginBottom: '15px' }}>🤖 AI/NLP Analysis</h3>
          <strong>Natural Language Processing:</strong>
          <ul style={{ margin: '8px 0 16px 26px', padding: 0 }}>
            <li>Symptoms processed: <b>{medicalReport.aiAnalysis.naturalLanguageProcessing}</b></li>
            <li>Confidence: {nlpAnalysis ? (nlpAnalysis.severity_confidence * 100).toFixed(1) : 'N/A'}%</li>
          </ul>
          <strong>Machine Learning Model:</strong>
          <ul style={{ margin: '8px 0 0 26px', padding: 0 }}>
            <li>{medicalReport.aiAnalysis.machineLearningPrediction}</li>
            <li>Feature Importance: <span style={{ fontSize: '15px', fontWeight: 400 }}>{JSON.stringify(mlAnalysis ? mlAnalysis.feature_importance : {})}</span></li>
            <li>Confidence Interval: <span style={{ color: '#5b7bca' }}>{medicalReport.aiAnalysis.confidenceInterval ? medicalReport.aiAnalysis.confidenceInterval.join(' - ') : 'N/A'}</span></li>
          </ul>
        </div>

        {/* Clinical Recommendations */}
        <div style={{
          background: '#fff',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#205080', marginBottom: '15px' }}>💊 Clinical Recommendations</h3>
          <ul style={{ margin: 0, paddingLeft: '26px' }}>
            {clinicalRecommendations.map((rec, index) => (
              <li key={index} style={{
                marginBottom: '10px',
                fontSize: '16px',
                color: '#188818'
              }}>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Compliance & Audit Trail */}
        <div style={{
          background: '#e9ecef',
          padding: '18px',
          borderRadius: '0 0 20px 20px',
          color: '#496490',
          marginBottom: '15px'
        }}>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <b>Assessed By:</b> {auditTrail.assessedBy}
            </div>
            <div>
              <b>Standards:</b> {auditTrail.medicalStandards}
            </div>
            <div>
              <b>Report Confidence:</b> {auditTrail.confidenceMetrics ? auditTrail.confidenceMetrics.join(' - ') : 'N/A'}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          background: '#fff',
          padding: '30px',
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              onAddToQueue(triageData);
              alert(`Patient added to ${priority} priority queue!`);
            }}
            style={{
              flex: 1,
              padding: '15px',
              background: '#0056b3',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Add to {priority} Queue
          </button>

          <button
            onClick={() => {
              const printData = `
AI TRIAGE REPORT
----------------
Patient: ${patient.name}, Age: ${patient.age}, Gender: ${patient.gender}
Priority: ${priority} (${urgencyLevel}), Score: ${riskScore}/100
Confidence: ${confidence}%
Queue #: ${queuePosition}, Wait: ${estimatedWaitTime}

Chief Complaint: ${medicalReport.clinicalFindings.chiefComplaint}

Risk Factors: ${medicalReport.clinicalFindings.riskStratification}
Clinical Recommendations: 
${clinicalRecommendations.map(r => `• ${r}`).join('\n')}
NLP Analysis: ${medicalReport.aiAnalysis.naturalLanguageProcessing}
ML Prediction: ${medicalReport.aiAnalysis.machineLearningPrediction}
-------------------------------------
Assessed by: ${auditTrail.assessedBy} | Standards: ${auditTrail.medicalStandards}
Confidence: ${auditTrail.confidenceMetrics ? auditTrail.confidenceMetrics.join(' - ') : 'N/A'}
              `;
              navigator.clipboard.writeText(printData);
              alert('Professional medical report copied to clipboard!');
            }}
            style={{
              flex: 1,
              padding: '15px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            📋 Copy Professional Report
          </button>

          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '15px',
              background: '#95a5a6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🏠 Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriageResult;
