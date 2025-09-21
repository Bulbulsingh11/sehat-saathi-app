import React, { useState } from 'react';

// Language Data
const languages = {
  en: {
    appName: 'Sehat Saathi',
    subtitle: 'Rural Telemedicine Platform',
    selectLanguage: 'Select Language',
    portal: 'Healthcare Portal',
    selectRole: 'Select your role to continue',
    ashaWorker: 'ASHA Worker',
    communityHealth: 'Community Health Worker',
    doctor: 'Doctor',
    medicalPro: 'Medical Professional',
    patient: 'Patient',
    healthSeeker: 'Healthcare Seeker',
    pharmacy: 'Pharmacy',
    medicineProvider: 'Medicine Provider',
    ashaLogin: 'ASHA Login',
    ashaPortal: 'ASHA Portal',
    ashaId: 'ASHA ID',
    password: 'Password',
    enterAshaId: 'Enter your ASHA ID',
    enterPassword: 'Enter password',
    loginButton: 'Login to Portal',
    welcome: 'Welcome',
    logout: 'Logout',
    back: 'Back',
    patientReg: 'Patient Registration',
    regSubtitle: 'Register new patients',
    healthCheckup: 'Health Checkup',
    checkupSubtitle: 'Record symptoms and vitals',
    patientRecords: 'Patient Records',
    recordsSubtitle: 'View patient history',
    doctorConnect: 'Doctor Connect',
    connectSubtitle: 'Video call with doctors',
    medicineTracker: 'Medicine Tracker',
    trackerSubtitle: 'Track prescriptions',
    healthReports: 'Health Reports',
    reportsSubtitle: 'Generate reports'
  },
  hi: {
    appName: 'सेहत साथी',
    subtitle: 'ग्रामीण टेलीमेडिसिन प्लेटफॉर्म',
    selectLanguage: 'भाषा चुनें',
    portal: 'स्वास्थ्य पोर्टल',
    selectRole: 'जारी रखने के लिए अपनी भूमिका चुनें',
    ashaWorker: 'आशा कार्यकर्ता',
    communityHealth: 'सामुदायिक स्वास्थ्य कार्यकर्ता',
    doctor: 'डॉक्टर',
    medicalPro: 'चिकित्सा पेशेवर',
    patient: 'रोगी',
    healthSeeker: 'स्वास्थ्य सेवा चाहने वाला',
    pharmacy: 'फार्मेसी',
    medicineProvider: 'दवा प्रदाता',
    ashaLogin: 'आशा लॉगिन',
    ashaPortal: 'आशा पोर्टल',
    ashaId: 'आशा आईडी',
    password: 'पासवर्ड',
    enterAshaId: 'अपना आशा आईडी दर्ज करें',
    enterPassword: 'पासवर्ड दर्ज करें',
    loginButton: 'पोर्टल में लॉगिन करें',
    welcome: 'स्वागत है',
    logout: 'लॉगआउट',
    back: 'वापस',
    patientReg: 'रोगी पंजीकरण',
    regSubtitle: 'नए रोगियों को पंजीकृत करें',
    healthCheckup: 'स्वास्थ्य जांच',
    checkupSubtitle: 'लक्षण और जानकारी रिकॉर्ड करें',
    patientRecords: 'रोगी रिकॉर्ड',
    recordsSubtitle: 'रोगी इतिहास देखें',
    doctorConnect: 'डॉक्टर कनेक्ट',
    connectSubtitle: 'डॉक्टरों के साथ वीडियो कॉल',
    medicineTracker: 'दवा ट्रैकर',
    trackerSubtitle: 'नुस्खे ट्रैक करें',
    healthReports: 'स्वास्थ्य रिपोर्ट',
    reportsSubtitle: 'रिपोर्ट जनरेट करें'
  },
  pa: {
    appName: 'ਸੇਹਤ ਸਾਥੀ',
    subtitle: 'ਪਿੰਡੀ ਟੈਲੀਮੈਡਿਸਿਨ ਪਲੈਟਫਾਰਮ',
    selectLanguage: 'ਭਾਸ਼ਾ ਚੁਣੋ',
    portal: 'ਸਿਹਤ ਪੋਰਟਲ',
    selectRole: 'ਜਾਰੀ ਰੱਖਣ ਲਈ ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ',
    ashaWorker: 'ਆਸ਼ਾ ਵਰਕਰ',
    communityHealth: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ ਵਰਕਰ',
    doctor: 'ਡਾਕਟਰ',
    medicalPro: 'ਮੈਡੀਕਲ ਪ੍ਰੋਫੈਸ਼ਨਲ',
    patient: 'ਮਰੀਜ਼',
    healthSeeker: 'ਸਿਹਤ ਸੇਵਾ ਚਾਹੁੰਦਾ',
    pharmacy: 'ਫਾਰਮੇਸੀ',
    medicineProvider: 'ਦਵਾਈ ਪ੍ਰਦਾਤਾ',
    ashaLogin: 'ਆਸ਼ਾ ਲਾਗਇਨ',
    ashaPortal: 'ਆਸ਼ਾ ਪੋਰਟਲ',
    ashaId: 'ਆਸ਼ਾ ਆਈਡੀ',
    password: 'ਪਾਸਵਰਡ',
    enterAshaId: 'ਆਪਣੀ ਆਸ਼ਾ ਆਈਡੀ ਦਾਖਲ ਕਰੋ',
    enterPassword: 'ਪਾਸਵਰਡ ਦਾਖਲ ਕਰੋ',
    loginButton: 'ਪੋਰਟਲ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
    welcome: 'ਸੁਆਗਤ ਹੈ',
    logout: 'ਲਾਗਆਉਟ',
    back: 'ਵਾਪਸ',
    patientReg: 'ਮਰੀਜ਼ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    regSubtitle: 'ਨਵੇਂ ਮਰੀਜ਼ਾਂ ਨੂੰ ਰਜਿਸਟਰ ਕਰੋ',
    healthCheckup: 'ਸਿਹਤ ਜਾਂਚ',
    checkupSubtitle: 'ਲੱਛਣ ਅਤੇ ਵੇਰਵੇ ਰਿਕਾਰਡ ਕਰੋ',
    patientRecords: 'ਮਰੀਜ਼ ਰਿਕਾਰਡ',
    recordsSubtitle: 'ਮਰੀਜ਼ ਇਤਿਹਾਸ ਦੇਖੋ',
    doctorConnect: 'ਡਾਕਟਰ ਕਨੈਕਟ',
    connectSubtitle: 'ਡਾਕਟਰਾਂ ਨਾਲ ਵੀਡੀਓ ਕਾਲ',
    medicineTracker: 'ਦਵਾਈ ਟ੍ਰੈਕਰ',
    trackerSubtitle: 'ਨੁਸਖੇ ਟ੍ਰੈਕ ਕਰੋ',
    healthReports: 'ਸਿਹਤ ਰਿਪੋਰਟਾਂ',
    reportsSubtitle: 'ਰਿਪੋਰਟਾਂ ਤਿਆਰ ਕਰੋ'
  }
};

// Back Button Component
const BackButton = ({ onBack }) => (
  <button
    onClick={onBack}
    style={{
      position: 'absolute',
      top: '30px',
      left: '30px',
      background: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: '2px solid rgba(255,255,255,0.3)',
      borderRadius: '50px',
      padding: '12px 20px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.target.style.background = 'rgba(255,255,255,0.3)';
      e.target.style.transform = 'translateX(-5px)';
    }}
    onMouseOut={(e) => {
      e.target.style.background = 'rgba(255,255,255,0.2)';
      e.target.style.transform = 'translateX(0px)';
    }}
  >
    ← Back
  </button>
);

// Language Screen Component
const LanguageScreen = ({ onSelectLanguage }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  }}>
    <div style={{
      background: 'white',
      padding: '60px 50px',
      borderRadius: '25px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
      textAlign: 'center',
      maxWidth: '500px',
      width: '100%'
    }}>
      <h1 style={{ fontSize: '48px', margin: '0 0 10px 0', color: '#2c3e50' }}>🏥</h1>
      <h2 style={{ color: '#2c3e50', margin: '0 0 15px 0', fontSize: '32px', fontWeight: '700' }}>
        Sehat Saathi
      </h2>
      <p style={{ color: '#7f8c8d', margin: '0 0 40px 0', fontSize: '18px' }}>
        Select Language / भाषा चुनें / ਭਾਸ਼ਾ ਚੁਣੋ
      </p>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {[
          { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
          { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
          { code: 'en', name: 'English', flag: '🇬🇧' }
        ].map(lang => (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            style={{
              padding: '20px',
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '20px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0px)'}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// Role Selection Screen
const RoleScreen = ({ onSelectRole, onBack, lang }) => {
  const t = languages[lang] || languages.en;
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      position: 'relative'
    }}>
      <BackButton onBack={onBack} />
      
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '700', margin: '0 0 15px 0' }}>
          {t.portal}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', margin: '0 0 50px 0' }}>
          {t.selectRole}
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {[
          { icon: '👩‍⚕️', title: t.ashaWorker, subtitle: t.communityHealth, role: 'asha' },
          { icon: '👨‍⚕️', title: t.doctor, subtitle: t.medicalPro, role: 'doctor' },
          { icon: '👤', title: t.patient, subtitle: t.healthSeeker, role: 'patient' },
          { icon: '💊', title: t.pharmacy, subtitle: t.medicineProvider, role: 'pharmacy' }
        ].map(item => (
          <div
            key={item.role}
            onClick={() => onSelectRole(item.role)}
            style={{
              background: 'white',
              padding: '40px 30px',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>{item.icon}</div>
            <h3 style={{ color: '#2c3e50', fontSize: '24px', fontWeight: '700', margin: '0 0 10px 0' }}>
              {item.title}
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '16px', margin: 0 }}>
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ASHA Login Screen
const ASHALogin = ({ onLogin, onBack, lang }) => {
  const [credentials, setCredentials] = useState({ ashaId: '', password: '' });
  const t = languages[lang] || languages.en;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      position: 'relative'
    }}>
      <BackButton onBack={onBack} />
      
      <div style={{
        background: 'white',
        padding: '50px 40px',
        borderRadius: '25px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '32px', fontWeight: '700', margin: '0 0 10px 0' }}>
            👩‍⚕️ {t.ashaLogin}
          </h2>
          <p style={{ color: '#7f8c8d', fontSize: '16px', margin: 0 }}>
            {t.communityHealth}
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (credentials.ashaId && credentials.password) {
            onLogin({ name: `ASHA ${credentials.ashaId}`, role: 'asha' });
          }
        }}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '600' }}>
              {t.ashaId}
            </label>
            <input
              type="text"
              placeholder={t.enterAshaId}
              value={credentials.ashaId}
              onChange={(e) => setCredentials({ ...credentials, ashaId: e.target.value })}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '12px',
                fontSize: '16px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '600' }}>
              {t.password}
            </label>
            <input
              type="password"
              placeholder={t.enterPassword}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{
                width: '100%',
                padding: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '12px',
                fontSize: '16px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0px)'}
          >
            {t.loginButton}
          </button>
        </form>
      </div>
    </div>
  );
};

// Health Checkup Screen
const HealthCheckup = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [symptoms, setSymptoms] = useState([]);
  const [vitals, setVitals] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: ''
  });

  const symptomsList = [
    'बुखार / Fever',
    'खांसी / Cough', 
    'सांस लेने में कठिनाई / Breathing Problem',
    'छाती में दर्द / Chest Pain',
    'सिरदर्द / Headache',
    'जी मिचलाना / Nausea'
  ];

  const handleSubmit = () => {
    onSubmit({ patient: patientInfo, symptoms, vitals });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
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
        ← Back
      </button>

      <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '60px' }}>
        {step === 1 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>👤 Patient Information</h2>
            
            <input
              type="text"
              placeholder="Patient Name / मरीज का नाम"
              value={patientInfo.name}
              onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="number"
              placeholder="Age / उम्र"
              value={patientInfo.age}
              onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />

            <select
              value={patientInfo.gender}
              onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '25px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Gender / लिंग चुनें</option>
              <option value="male">Male / पुरुष</option>
              <option value="female">Female / महिला</option>
            </select>

            <button onClick={() => setStep(2)} style={{
              width: '100%',
              padding: '15px',
              background: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              Next: Select Symptoms →
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>🩺 Select Symptoms</h2>
            
            <div style={{ marginBottom: '30px' }}>
              {symptomsList.map((symptom, index) => (
                <label key={index} style={{
                  display: 'block',
                  padding: '15px',
                  marginBottom: '10px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={symptoms.includes(symptom)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSymptoms([...symptoms, symptom]);
                      } else {
                        setSymptoms(symptoms.filter(s => s !== symptom));
                      }
                    }}
                    style={{ marginRight: '10px' }}
                  />
                  {symptom}
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1,
                padding: '15px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                ← Previous
              </button>
              <button onClick={() => setStep(3)} style={{
                flex: 2,
                padding: '15px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                Next: Record Vitals →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>📊 Record Vitals</h2>
            
            <input
              type="number"
              placeholder="Temperature (°F) / तापमान"
              value={vitals.temperature}
              onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="text"
              placeholder="Blood Pressure / रक्तचाप (120/80)"
              value={vitals.bloodPressure}
              onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '15px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="number"
              placeholder="Heart Rate / हृदय गति"
              value={vitals.heartRate}
              onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
              style={{
                width: '100%',
                padding: '15px',
                marginBottom: '25px',
                border: '2px solid #ecf0f1',
                borderRadius: '10px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(2)} style={{
                flex: 1,
                padding: '15px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer'
              }}>
                ← Previous
              </button>
              <button onClick={handleSubmit} style={{
                flex: 2,
                padding: '15px',
                background: '#27ae60',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Complete Checkup ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ASHA Dashboard
const ASHADashboard = ({ user, onLogout, lang, setCurrentScreen }) => {
  const t = languages[lang] || languages.en;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        background: 'white',
        padding: '25px 30px',
        borderRadius: '20px',
        marginBottom: '30px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ color: '#2c3e50', fontSize: '32px', fontWeight: '700', margin: 0 }}>
          👩‍⚕️ {t.ashaPortal}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ color: '#2c3e50', fontWeight: '600' }}>
            {t.welcome}, {user?.name}
          </span>
          <button
            onClick={onLogout}
            style={{
              padding: '12px 24px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            {t.logout}
          </button>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { icon: '👤', title: t.patientReg, subtitle: t.regSubtitle, onClick: () => alert(`${t.patientReg} - Coming Soon!`) },
          { icon: '🩺', title: t.healthCheckup, subtitle: t.checkupSubtitle, onClick: () => setCurrentScreen('healthCheckup') },
          { icon: '📋', title: t.patientRecords, subtitle: t.recordsSubtitle, onClick: () => alert(`${t.patientRecords} - Coming Soon!`) },
          { icon: '🏥', title: t.doctorConnect, subtitle: t.connectSubtitle, onClick: () => alert(`${t.doctorConnect} - Coming Soon!`) },
          { icon: '💊', title: t.medicineTracker, subtitle: t.trackerSubtitle, onClick: () => alert(`${t.medicineTracker} - Coming Soon!`) },
          { icon: '📊', title: t.healthReports, subtitle: t.reportsSubtitle, onClick: () => alert(`${t.healthReports} - Coming Soon!`) }
        ].map((card, index) => (
          <div
            key={index}
            onClick={card.onClick}
            style={{
              background: 'white',
              padding: '35px 30px',
              borderRadius: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>{card.icon}</div>
            <h3 style={{ color: '#2c3e50', fontSize: '22px', fontWeight: '700', margin: '15px 0 10px 0' }}>
              {card.title}
            </h3>
            <p style={{ color: '#7f8c8d', fontSize: '16px', margin: 0 }}>
              {card.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [language, setLanguage] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [patientData, setPatientData] = useState(null);

  // Language Selection
  if (!language) {
    return <LanguageScreen onSelectLanguage={setLanguage} />;
  }

  // Role Selection
  if (!role) {
    return <RoleScreen 
      onSelectRole={(selectedRole) => {
        setRole(selectedRole);
        if (selectedRole !== 'asha') {
          alert(`${selectedRole} portal coming soon!`);
          setRole(null);
        }
      }}
      onBack={() => setLanguage(null)}
      lang={language}
    />;
  }

  // ASHA Login
  if (role === 'asha' && !user) {
    return <ASHALogin 
      onLogin={setUser} 
      onBack={() => setRole(null)}
      lang={language}
    />;
  }

  // Health Checkup Screen
  if (currentScreen === 'healthCheckup') {
    return (
      <HealthCheckup 
        onBack={() => setCurrentScreen('dashboard')}
        onSubmit={(data) => {
          console.log('Health Checkup Data:', data);
          setPatientData(data);
          alert('Health checkup completed successfully!');
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  // ASHA Dashboard
  if (user && role === 'asha') {
    return <ASHADashboard 
      user={user} 
      onLogout={() => {
        setUser(null);
        setRole(null);
        setLanguage(null);
        setCurrentScreen('dashboard');
      }}
      setCurrentScreen={setCurrentScreen}
      lang={language}
    />;
  }

  return <div>Loading...</div>;
}

export default App;
