// src/components/TriageResult.jsx
import React from 'react';

const TriageResult = ({ triageData, onBack, onAddToQueue }) => {
  const {
    patient,
    priority,
    priorityColor,
    riskScore,
    riskFactors,
    recommendations,
    estimatedWaitTime,
    queuePosition,
    triageId
  } = triageData;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Back Button */}
      <button onClick={onBack} style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '25px',
        cursor: 'pointer'
      }}>
        ← Back to Dashboard
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px' }}>
        {/* Priority Header */}
        <div style={{
          background: priorityColor,
          padding: '30px',
          borderRadius: '20px 20px 0 0',
          textAlign: 'center',
          color: 'white'
        }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '36px' }}>
            🏥 Triage Result
          </h1>
          <div style={{ fontSize: '48px', margin: '10px 0' }}>
            {priority === 'RED' ? '🚨' : priority === 'YELLOW' ? '⚠️' : '✅'}
          </div>
          <h2 style={{ margin: '10px 0', fontSize: '32px' }}>
            PRIORITY: {priority}
          </h2>
          <p style={{ margin: '0', fontSize: '18px', opacity: 0.9 }}>
            Triage ID: {triageId}
          </p>
        </div>

        {/* Patient Info */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>👤 Patient Information</h3>
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

        {/* Risk Assessment */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>📊 Risk Assessment</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <strong>Risk Score:</strong><br />
              <span style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: priorityColor 
              }}>
                {riskScore}/100
              </span>
            </div>
            <div>
              <strong>Queue Position:</strong><br />
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>
                #{queuePosition}
              </span>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <strong>Estimated Wait Time:</strong><br />
            <span style={{ fontSize: '20px', color: priorityColor }}>
              {estimatedWaitTime}
            </span>
          </div>
        </div>

        {/* Risk Factors */}
        {riskFactors.length > 0 && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderBottom: '1px solid #ecf0f1'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>⚠️ Risk Factors Detected</h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {riskFactors.map((factor, index) => (
                <li key={index} style={{ 
                  marginBottom: '10px', 
                  fontSize: '16px',
                  color: '#e74c3c' 
                }}>
                  {factor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderBottom: '1px solid #ecf0f1'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>💡 Recommendations</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {recommendations.map((rec, index) => (
              <li key={index} style={{ 
                marginBottom: '10px', 
                fontSize: '16px',
                color: '#2c3e50' 
              }}>
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '0 0 20px 20px',
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
              background: priorityColor,
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
TRIAGE REPORT
=============
Patient: ${patient.name}
Priority: ${priority}
Risk Score: ${riskScore}
Queue Position: #${queuePosition}
Wait Time: ${estimatedWaitTime}

Risk Factors:
${riskFactors.map(f => `• ${f}`).join('\n')}

Recommendations:
${recommendations.map(r => `• ${r}`).join('\n')}
              `;
              navigator.clipboard.writeText(printData);
              alert('Triage report copied to clipboard!');
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
            📋 Copy Report
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
