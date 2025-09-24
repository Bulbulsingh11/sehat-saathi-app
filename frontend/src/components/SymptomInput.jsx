// src/components/SymptomInput.jsx
import React, { useState, useEffect } from 'react';
import { SYMPTOMS_DATABASE, QUICK_CONDITIONS } from '../data/symptomsDatabase';

const SymptomInput = ({ onSymptomSelect, selectedSymptoms, lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [customSymptom, setCustomSymptom] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const translations = {
    en: {
      title: 'Select Your Symptoms',
      subtitle: 'Choose all symptoms you are experiencing',
      searchPlaceholder: 'Search symptoms or describe how you feel...',
      quickConditions: 'Common Conditions',
      categories: 'Symptom Categories',
      addCustom: 'Add Custom Symptom',
      customPlaceholder: 'Describe your symptom...',
      addSymptom: 'Add Symptom',
      selectedSymptoms: 'Selected Symptoms',
      removeSymptom: 'Remove',
      noSymptoms: 'No symptoms selected yet'
    },
    hi: {
      title: 'अपने लक्षण चुनें',
      subtitle: 'सभी लक्षण चुनें जो आप महसूस कर रहे हैं',
      searchPlaceholder: 'लक्षण खोजें या बताएं कि आप कैसा महसूस कर रहे हैं...',
      quickConditions: 'सामान्य स्थितियां',
      categories: 'लक्षण श्रेणियां',
      addCustom: 'कस्टम लक्षण जोड़ें',
      customPlaceholder: 'अपना लक्षण बताएं...',
      addSymptom: 'लक्षण जोड़ें',
      selectedSymptoms: 'चुने गए लक्षण',
      removeSymptom: 'हटाएं',
      noSymptoms: 'अभी तक कोई लक्षण नहीं चुना गया'
    },
    pa: {
      title: 'ਆਪਣੇ ਲੱਛਣ ਚੁਣੋ',
      subtitle: 'ਸਾਰੇ ਲੱਛਣ ਚੁਣੋ ਜੋ ਤੁਸੀਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ',
      searchPlaceholder: 'ਲੱਛਣ ਖੋਜੋ ਜਾਂ ਦੱਸੋ ਕਿ ਤੁਸੀਂ ਕਿਵੇਂ ਮਹਿਸੂਸ ਕਰ ਰਹੇ ਹੋ...',
      quickConditions: 'ਆਮ ਸਥਿਤੀਆਂ',
      categories: 'ਲੱਛਣ ਸ਼੍ਰੇਣੀਆਂ',
      addCustom: 'ਕਸਟਮ ਲੱਛਣ ਜੋੜੋ',
      customPlaceholder: 'ਆਪਣਾ ਲੱਛਣ ਦੱਸੋ...',
      addSymptom: 'ਲੱਛਣ ਜੋੜੋ',
      selectedSymptoms: 'ਚੁਣੇ ਗਏ ਲੱਛਣ',
      removeSymptom: 'ਹਟਾਓ',
      noSymptoms: 'ਅਜੇ ਤੱਕ ਕੋਈ ਲੱਛਣ ਨਹੀਂ ਚੁਣਿਆ'
    }
  };

  const t = translations[lang] || translations.en;

  // Category icons and names
  const categories = {
    all: { icon: '🔍', name: { en: 'All Symptoms', hi: 'सभी लक्षण', pa: 'ਸਾਰੇ ਲੱਛਣ' } },
    respiratory: { icon: '🫁', name: { en: 'Breathing', hi: 'सांस', pa: 'ਸਾਹ' } },
    cardiovascular: { icon: '❤️', name: { en: 'Heart', hi: 'दिल', pa: 'ਦਿਲ' } },
    neurological: { icon: '🧠', name: { en: 'Brain/Nerves', hi: 'मस्तिष्क/नसें', pa: 'ਦਿਮਾਗ/ਨਸਾਂ' } },
    gastrointestinal: { icon: '🍽️', name: { en: 'Digestion', hi: 'पाचन', pa: 'ਪਾਚਨ' } },
    general: { icon: '🌡️', name: { en: 'General', hi: 'सामान्य', pa: 'ਆਮ' } }
  };

  // Get filtered symptoms based on search and category
  const getFilteredSymptoms = () => {
    let allSymptoms = [];
    
    if (selectedCategory === 'all') {
      Object.keys(SYMPTOMS_DATABASE).forEach(category => {
        SYMPTOMS_DATABASE[category][lang]?.forEach(symptom => {
          allSymptoms.push({ symptom, category });
        });
      });
    } else {
      SYMPTOMS_DATABASE[selectedCategory][lang]?.forEach(symptom => {
        allSymptoms.push({ symptom, category: selectedCategory });
      });
    }

    if (searchTerm) {
      allSymptoms = allSymptoms.filter(item =>
        item.symptom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return allSymptoms;
  };

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      onSymptomSelect(customSymptom.trim());
      setCustomSymptom('');
    }
  };

  return (
    <div style={{
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '20px',
      margin: '20px 0',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h3 style={{ color: '#0056b3', fontSize: '24px', marginBottom: '8px' }}>
          🩺 {t.title}
        </h3>
        <p style={{ color: '#666', fontSize: '16px', margin: '0' }}>
          {t.subtitle}
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={t.searchPlaceholder}
          style={{
            width: '100%',
            padding: '15px 20px',
            border: '2px solid #e9ecef',
            borderRadius: '15px',
            fontSize: '16px',
            background: 'white',
            boxSizing: 'border-box'
          }}
        />
        🔍
      </div>

      {/* Quick Conditions */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ color: '#495057', fontSize: '18px', marginBottom: '12px' }}>
          ⚡ {t.quickConditions}
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {QUICK_CONDITIONS[lang]?.map((condition, index) => (
            <button
              key={index}
              onClick={() => onSymptomSelect(condition)}
              disabled={selectedSymptoms.includes(condition)}
              style={{
                padding: '12px 16px',
                background: selectedSymptoms.includes(condition) ? '#28a745' : 'white',
                color: selectedSymptoms.includes(condition) ? 'white' : '#495057',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {selectedSymptoms.includes(condition) ? '✓ ' : ''}{condition}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ color: '#495057', fontSize: '18px', marginBottom: '12px' }}>
          📂 {t.categories}
        </h4>
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '15px'
        }}>
          {Object.keys(categories).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                padding: '8px 16px',
                background: selectedCategory === category ? '#0056b3' : 'white',
                color: selectedCategory === category ? 'white' : '#495057',
                border: '2px solid #e9ecef',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {categories[category].icon} {categories[category].name[lang]}
            </button>
          ))}
        </div>

        {/* Symptoms Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          padding: '10px',
          background: 'white',
          borderRadius: '12px'
        }}>
          {getFilteredSymptoms().map((item, index) => (
            <button
              key={index}
              onClick={() => onSymptomSelect(item.symptom)}
              disabled={selectedSymptoms.includes(item.symptom)}
              style={{
                padding: '10px 12px',
                background: selectedSymptoms.includes(item.symptom) ? '#28a745' : '#f8f9fa',
                color: selectedSymptoms.includes(item.symptom) ? 'white' : '#495057',
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '14px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {selectedSymptoms.includes(item.symptom) ? '✓ ' : ''}{item.symptom}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Symptom Input */}
      <div style={{ marginBottom: '25px' }}>
        <h4 style={{ color: '#495057', fontSize: '18px', marginBottom: '12px' }}>
          ➕ {t.addCustom}
        </h4>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={customSymptom}
            onChange={(e) => setCustomSymptom(e.target.value)}
            placeholder={t.customPlaceholder}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e9ecef',
              borderRadius: '10px',
              fontSize: '16px'
            }}
            onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
          />
          <button
            onClick={addCustomSymptom}
            disabled={!customSymptom.trim()}
            style={{
              padding: '12px 20px',
              background: '#0056b3',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {t.addSymptom}
          </button>
        </div>
      </div>

      {/* Selected Symptoms Display */}
      <div style={{ marginTop: '25px' }}>
        <h4 style={{ color: '#495057', fontSize: '18px', marginBottom: '12px' }}>
          ✅ {t.selectedSymptoms} ({selectedSymptoms.length})
        </h4>
        {selectedSymptoms.length === 0 ? (
          <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
            {t.noSymptoms}
          </p>
        ) : (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {selectedSymptoms.map((symptom, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 12px',
                  background: '#28a745',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {symptom}
                <button
                  onClick={() => onSymptomSelect(symptom)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomInput;
