// src/components/QueueDisplay.jsx
import React, { useState, useEffect } from 'react';

const QueueDisplay = ({ onBack, lang }) => {
  const [queue, setQueue] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  // Language translations
  const translations = {
    en: {
      title: 'Patient Queue',
      all: 'All Patients',
      emergency: 'Emergency',
      urgent: 'Urgent', 
      routine: 'Routine',
      queueStats: 'Queue Statistics',
      totalPatients: 'Total Patients',
      avgWaitTime: 'Average Wait Time',
      name: 'Name',
      priority: 'Priority',
      waitTime: 'Wait Time',
      riskScore: 'Risk Score',
      symptoms: 'Symptoms',
      back: 'Back to Dashboard',
      refreshQueue: 'Refresh Queue',
      clearQueue: 'Clear Queue',
      lastUpdated: 'Last Updated'
    },
    hi: {
      title: 'मरीज़ कतार',
      all: 'सभी मरीज़',
      emergency: 'आपातकाल',
      urgent: 'तत्काल',
      routine: 'नियमित',
      queueStats: 'कतार आंकड़े',
      totalPatients: 'कुल मरीज़',
      avgWaitTime: 'औसत प्रतीक्षा समय',
      name: 'नाम',
      priority: 'प्राथमिकता',
      waitTime: 'प्रतीक्षा समय',
      riskScore: 'जोखिम स्कोर',
      symptoms: 'लक्षण',
      back: 'डैशबोर्ड पर वापस',
      refreshQueue: 'कतार रीफ्रेश करें',
      clearQueue: 'कतार साफ़ करें',
      lastUpdated: 'अंतिम अपडेट'
    },
    pa: {
      title: 'ਮਰੀਜ਼ ਕਤਾਰ',
      all: 'ਸਾਰੇ ਮਰੀਜ਼',
      emergency: 'ਐਮਰਜੈਂਸੀ',
      urgent: 'ਤੁਰੰਤ',
      routine: 'ਰੁਟੀਨ',
      queueStats: 'ਕਤਾਰ ਅੰਕੜੇ',
      totalPatients: 'ਕੁੱਲ ਮਰੀਜ਼',
      avgWaitTime: 'ਔਸਤ ਉਡੀਕ ਸਮਾਂ',
      name: 'ਨਾਮ',
      priority: 'ਤਰਜੀਹ',
      waitTime: 'ਉਡੀਕ ਸਮਾਂ',
      riskScore: 'ਜੋਖਮ ਸਕੋਰ',
      symptoms: 'ਲੱਛਣ',
      back: 'ਡੈਸ਼ਬੋਰਡ ਵਾਪਸ',
      refreshQueue: 'ਕਤਾਰ ਰਿਫ੍ਰੈਸ਼ ਕਰੋ',
      clearQueue: 'ਕਤਾਰ ਸਾਫ਼ ਕਰੋ',
      lastUpdated: 'ਆਖਰੀ ਅਪਡੇਟ'
    }
  };

  const t = translations[lang] || translations.en;

  // Load queue from localStorage on component mount
  useEffect(() => {
    const savedQueue = localStorage.getItem('triageQueue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }
    
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Filter queue by priority
  const filteredQueue = selectedPriority === 'ALL' 
    ? queue 
    : queue.filter(patient => patient.priority === selectedPriority);

  // Calculate queue statistics
  const queueStats = {
    total: queue.length,
    red: queue.filter(p => p.priority === 'RED').length,
    yellow: queue.filter(p => p.priority === 'YELLOW').length,
    green: queue.filter(p => p.priority === 'GREEN').length,
    avgWaitTime: queue.length > 0 
      ? Math.round(queue.reduce((sum, p) => sum + parseInt(p.queuePosition), 0) / queue.length * 15)
      : 0
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'RED': return '#e74c3c';
      case 'YELLOW': return '#f39c12';
      case 'GREEN': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  // Calculate wait time since triage
  const getWaitTime = (timestamp) => {
    const triageTime = new Date(timestamp);
    const diffMinutes = Math.floor((currentTime - triageTime) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} min`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return `${hours}h ${minutes}m`;
    }
  };

  // Refresh queue
  const refreshQueue = () => {
    const savedQueue = localStorage.getItem('triageQueue');
    if (savedQueue) {
      setQueue(JSON.parse(savedQueue));
    }
  };

  // Clear queue
  const clearQueue = () => {
    if (window.confirm('Are you sure you want to clear the entire queue?')) {
      setQueue([]);
      localStorage.removeItem('triageQueue');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <button onClick={onBack} style={{
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          ← {t.back}
        </button>

        <h1 style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: '700',
          margin: 0,
          textAlign: 'center',
          flex: 1
        }}>
          🏥 {t.title}
        </h1>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={refreshQueue} style={{
            background: '#3498db',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '15px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            🔄 {t.refreshQueue}
          </button>
          
          <button onClick={clearQueue} style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '15px',
            cursor: 'pointer',
            fontWeight: '600'
          }}>
            🗑️ {t.clearQueue}
          </button>
        </div>
      </div>

      {/* Queue Statistics */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '20px',
        marginBottom: '25px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px', fontSize: '24px' }}>
          📊 {t.queueStats}
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>
              {queueStats.total}
            </div>
            <div style={{ color: '#7f8c8d', marginTop: '5px' }}>
              {t.totalPatients}
            </div>
          </div>
          
          <div style={{
            background: '#fee',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e74c3c' }}>
              {queueStats.red}
            </div>
            <div style={{ color: '#e74c3c', marginTop: '5px', fontWeight: '600' }}>
              🚨 {t.emergency}
            </div>
          </div>
          
          <div style={{
            background: '#fef9e7',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f39c12' }}>
              {queueStats.yellow}
            </div>
            <div style={{ color: '#f39c12', marginTop: '5px', fontWeight: '600' }}>
              ⚠️ {t.urgent}
            </div>
          </div>
          
          <div style={{
            background: '#eef',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#27ae60' }}>
              {queueStats.green}
            </div>
            <div style={{ color: '#27ae60', marginTop: '5px', fontWeight: '600' }}>
              ✅ {t.routine}
            </div>
          </div>
          
          <div style={{
            background: '#f0f0f0',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#3498db' }}>
              {queueStats.avgWaitTime}m
            </div>
            <div style={{ color: '#3498db', marginTop: '5px', fontWeight: '600' }}>
              ⏱️ {t.avgWaitTime}
            </div>
          </div>
        </div>
      </div>

      {/* Priority Filter */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '20px',
        marginBottom: '25px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {['ALL', 'RED', 'YELLOW', 'GREEN'].map(priority => (
            <button
              key={priority}
              onClick={() => setSelectedPriority(priority)}
              style={{
                padding: '12px 24px',
                background: selectedPriority === priority 
                  ? (priority === 'ALL' ? '#3498db' : getPriorityColor(priority))
                  : '#ecf0f1',
                color: selectedPriority === priority ? 'white' : '#2c3e50',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            >
              {priority === 'ALL' ? t.all : 
               priority === 'RED' ? `🚨 ${t.emergency}` :
               priority === 'YELLOW' ? `⚠️ ${t.urgent}` :
               `✅ ${t.routine}`}
            </button>
          ))}
        </div>
      </div>

      {/* Queue List */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
      }}>
        {filteredQueue.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            color: '#7f8c8d'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏥</div>
            <h3>No patients in queue</h3>
            <p>Patients will appear here after triage assessment</p>
          </div>
        ) : (
          <div>
            {/* Table Header */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
              gap: '20px',
              fontWeight: '600',
              color: '#2c3e50',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <div>{t.name}</div>
              <div>{t.priority}</div>
              <div>{t.riskScore}</div>
              <div>{t.waitTime}</div>
              <div>{t.symptoms}</div>
            </div>
            
            {/* Patient Rows */}
            {filteredQueue.map((patient, index) => (
              <div
                key={patient.triageId}
                style={{
                  padding: '20px',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 2fr',
                  gap: '20px',
                  borderBottom: index < filteredQueue.length - 1 ? '1px solid #ecf0f1' : 'none',
                  borderLeft: `5px solid ${getPriorityColor(patient.priority)}`,
                  background: index % 2 === 0 ? '#fafafa' : 'white'
                }}
              >
                {/* Patient Name & Info */}
                <div>
                  <div style={{ fontWeight: '600', color: '#2c3e50', marginBottom: '5px' }}>
                    {patient.patient.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>
                    {patient.patient.age} years, {patient.patient.gender}
                  </div>
                  <div style={{ fontSize: '12px', color: '#95a5a6', marginTop: '3px' }}>
                    ID: {patient.triageId}
                  </div>
                </div>
                
                {/* Priority */}
                <div>
                  <span style={{
                    background: getPriorityColor(patient.priority),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {patient.priority}
                  </span>
                  <div style={{ fontSize: '12px', color: '#7f8c8d', marginTop: '5px' }}>
                    #{patient.queuePosition}
                  </div>
                </div>
                
                {/* Risk Score */}
                <div>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: getPriorityColor(patient.priority)
                  }}>
                    {patient.riskScore}
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    /100
                  </div>
                </div>
                
                {/* Wait Time */}
                <div>
                  <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                    {getWaitTime(patient.timestamp)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    {patient.estimatedWaitTime}
                  </div>
                </div>
                
                {/* Symptoms */}
                <div>
                  <div style={{ fontSize: '14px', color: '#2c3e50' }}>
                    {patient.symptoms.slice(0, 2).map(symptom => symptom.split('/')[0].trim()).join(', ')}
                    {patient.symptoms.length > 2 && ` +${patient.symptoms.length - 2} more`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        marginTop: '20px',
        fontSize: '14px'
      }}>
        {t.lastUpdated}: {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default QueueDisplay;
