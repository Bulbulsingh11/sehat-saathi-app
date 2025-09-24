import React, { useState } from 'react';
import TriageResult from './components/TriageResult';
import QueueDisplay from './components/QueueDisplay';
import { classifyPatient, addToQueue, logoutASHA } from './utils/aiTriageAlgorithm'; // Updated import
import SymptomInput from './components/SymptomInput';
import { SYMPTOMS_DATABASE } from './data/symptomsDatabase';

// Language Data - COMPLETE TRANSLATION
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
    reportsSubtitle: 'Generate reports',
    queueManagement: 'Queue Management',
    // Health Checkup Form
    patientInformation: 'Patient Information',
    patientName: 'Patient Name',
    age: 'Age',
    selectGender: 'Select Gender',
    male: 'Male',
    female: 'Female',
    nextSymptoms: 'Next: Select Symptoms',
    selectSymptoms: 'Select Symptoms',
    previous: 'Previous',
    nextVitals: 'Next: Record Vitals',
    recordVitals: 'Record Vitals',
    temperature: 'Temperature (°F)',
    bloodPressure: 'Blood Pressure (120/80)',
    heartRate: 'Heart Rate',
    oxygenSaturation: 'Oxygen Saturation (%)',
    completeCheckup: 'Complete Checkup'
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
    reportsSubtitle: 'रिपोर्ट जनरेट करें',
    queueManagement: 'कतार प्रबंधन',
    // Health Checkup Form
    patientInformation: 'रोगी की जानकारी',
    patientName: 'रोगी का नाम',
    age: 'उम्र',
    selectGender: 'लिंग चुनें',
    male: 'पुरुष',
    female: 'महिला',
    nextSymptoms: 'अगला: लक्षण चुनें',
    selectSymptoms: 'लक्षण चुनें',
    previous: 'पिछला',
    nextVitals: 'अगला: जीवन संकेत दर्ज करें',
    recordVitals: 'जीवन संकेत दर्ज करें',
    temperature: 'तापमान (°F)',
    bloodPressure: 'रक्तचाप (120/80)',
    heartRate: 'हृदय गति',
    oxygenSaturation: 'ऑक्सीजन संतृप्ति (%)',
    completeCheckup: 'जांच पूरी करें'
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
    reportsSubtitle: 'ਰਿਪੋਰਟਾਂ ਤਿਆਰ ਕਰੋ',
    queueManagement: 'ਕਤਾਰ ਪ੍ਰਬੰਧਨ',
    // Health Checkup Form - PUNJABI TRANSLATIONS
    patientInformation: 'ਮਰੀਜ਼ ਦੀ ਜਾਣਕਾਰੀ',
    patientName: 'ਮਰੀਜ਼ ਦਾ ਨਾਮ',
    age: 'ਉਮਰ',
    selectGender: 'ਲਿੰਗ ਚੁਣੋ',
    male: 'ਪੁਰਸ਼',
    female: 'ਔਰਤ',
    nextSymptoms: 'ਅਗਲਾ: ਲੱਛਣ ਚੁਣੋ',
    selectSymptoms: 'ਲੱਛਣ ਚੁਣੋ',
    previous: 'ਪਿਛਲਾ',
    nextVitals: 'ਅਗਲਾ: ਵਾਇਟਲ ਰਿਕਾਰਡ ਕਰੋ',
    recordVitals: 'ਵਾਇਟਲ ਰਿਕਾਰਡ ਕਰੋ',
    temperature: 'ਤਾਪਮਾਨ (°F)',
    bloodPressure: 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ (120/80)',
    heartRate: 'ਦਿਲ ਦੀ ਗਤੀ',
    oxygenSaturation: 'ਆਕਸੀਜਨ ਸੰਤ੃ਪਤੀ (%)',
    completeCheckup: 'ਜਾਂਚ ਮੁਕੰਮਲ ਕਰੋ'
  }
};

// Back Button Component
const BackButton = ({ onBack, lang }) => {
  const t = languages[lang] || languages.en;
  return (
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
      ← {t.back}
    </button>
  );
};

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
      <BackButton onBack={onBack} lang={lang} />
      
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

// ASHA Login Screen - Updated with Real Authentication
const ASHALogin = ({ onLogin, onBack, lang }) => {
  const [credentials, setCredentials] = useState({ ashaId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const t = languages[lang] || languages.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { authenticateASHA } = await import('./data/authorizedASHA');
      const result = authenticateASHA(credentials.ashaId, credentials.password);
      
      if (result.success) {
        onLogin(result.user);
      } else {
        setError(result.message);
        const attempts = localStorage.getItem('loginAttempts') || 0;
        const newAttempts = parseInt(attempts) + 1;
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        if (newAttempts >= 3) {
          setError('Too many failed attempts. Please contact your supervisor at: +91-9876543200');
        }
      }
    } catch (err) {
      setError('System error. Please try again.');
    }
    
    setLoading(false);
  };

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
      <BackButton onBack={onBack} lang={lang} />
      
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
            🔐 {t.ashaLogin}
          </h2>
          <p style={{ color: '#7f8c8d', fontSize: '16px', margin: '0 0 10px 0' }}>
            {t.communityHealth}
          </p>
          <p style={{ color: '#e74c3c', fontSize: '14px', margin: 0 }}>
            ⚠️ Official ASHA Workers Only
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#e74c3c',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #fcc',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#2c3e50', fontWeight: '600' }}>
              {t.ashaId} *
            </label>
            <input
              type="text"
              placeholder="PB001, PB002, DEMO01..."
              value={credentials.ashaId}
              onChange={(e) => setCredentials({ ...credentials, ashaId: e.target.value.toUpperCase() })}
              style={{
                width: '100%',
                padding: '15px',
                border: error ? '2px solid #e74c3c' : '2px solid #ecf0f1',
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
              {t.password} *
            </label>
            <input
              type="password"
              placeholder={t.enterPassword}
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{
                width: '100%',
                padding: '15px',
                border: error ? '2px solid #e74c3c' : '2px solid #ecf0f1',
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
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? '#95a5a6' : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease'
            }}
            onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0px)')}
          >
            {loading ? '🔄 Verifying...' : `🔐 ${t.loginButton}`}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setShowHelp(!showHelp)}
            style={{
              background: 'none',
              border: 'none',
              color: '#3498db',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Need Help? View Demo Credentials
          </button>
        </div>

        {showHelp && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#f8f9fa',
            borderRadius: '10px',
            fontSize: '14px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Demo Credentials:</h4>
            <div style={{ fontFamily: 'monospace' }}>
              <strong>ID:</strong> DEMO01 <strong>Pass:</strong> demo123<br/>
              <strong>ID:</strong> TEST01 <strong>Pass:</strong> test123<br/>
              <strong>ID:</strong> PB001 <strong>Pass:</strong> Amritsar@2024
            </div>
            <p style={{ margin: '10px 0 0 0', color: '#7f8c8d' }}>
              For official access, contact your supervisor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Health Checkup Screen with Professional Symptom Input
const HealthCheckup = ({ onBack, onSubmit, lang }) => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: ''
  });
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [vitals, setVitals] = useState({
    temperature: '',
    bloodPressure: '',
    heartRate: '',
    oxygenSaturation: ''
  });

  const t = languages[lang] || languages.en;

  // Handle symptom selection
  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(symptom)) {
        return prev.filter(s => s !== symptom);
      } else {
        return [...prev, symptom];
      }
    });
  };

  const handleSubmit = () => {
    const checkupData = {
      patient: patientInfo,
      symptoms: selectedSymptoms,
      vitals: vitals
    };
    onSubmit(checkupData);
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
        ← {t.back}
      </button>

      <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '60px' }}>
        {/* Step 1: Patient Information */}
        {step === 1 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#0056b3', fontSize: '28px' }}>
              👤 {t.patientInformation}
            </h2>
            
            <input
              type="text"
              placeholder={t.patientName}
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
              placeholder={t.age}
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
              <option value="">{t.selectGender}</option>
              <option value="male">{t.male}</option>
              <option value="female">{t.female}</option>
            </select>

            <button 
              onClick={() => setStep(2)} 
              disabled={!patientInfo.name || !patientInfo.age || !patientInfo.gender}
              style={{
                width: '100%',
                padding: '15px',
                background: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                cursor: 'pointer',
                opacity: (!patientInfo.name || !patientInfo.age || !patientInfo.gender) ? 0.5 : 1
              }}
            >
              {t.nextSymptoms} →
            </button>
          </div>
        )}

        {/* Step 2: Professional Symptom Selection */}
        {step === 2 && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '30px 40px 20px', borderBottom: '2px solid #f8f9fa' }}>
              <h2 style={{ textAlign: 'center', margin: '0', color: '#0056b3', fontSize: '28px' }}>
                🩺 {t.selectSymptoms}
              </h2>
            </div>

            {/* Professional Symptom Input Component */}
            <SymptomInput 
              onSymptomSelect={handleSymptomSelect}
              selectedSymptoms={selectedSymptoms}
              lang={lang}
            />

            <div style={{ padding: '20px 40px 40px', display: 'flex', gap: '15px' }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1,
                padding: '15px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                ← {t.previous}
              </button>
              <button 
                onClick={() => setStep(3)} 
                disabled={selectedSymptoms.length === 0}
                style={{
                  flex: 2,
                  padding: '15px',
                  background: selectedSymptoms.length === 0 ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: selectedSymptoms.length === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                {t.nextVitals} →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Vital Signs */}
        {step === 3 && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#0056b3', fontSize: '28px' }}>
              📊 {t.recordVitals}
            </h2>
            
            <div style={{ display: 'grid', gap: '15px', marginBottom: '25px' }}>
              <input
                type="number"
                step="0.1"
                placeholder={t.temperature}
                value={vitals.temperature}
                onChange={(e) => setVitals({...vitals, temperature: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />

              <input
                type="text"
                placeholder={t.bloodPressure}
                value={vitals.bloodPressure}
                onChange={(e) => setVitals({...vitals, bloodPressure: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />

              <input
                type="number"
                placeholder={t.heartRate}
                value={vitals.heartRate}
                onChange={(e) => setVitals({...vitals, heartRate: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />

              <input
                type="number"
                min="0"
                max="100"
                placeholder={t.oxygenSaturation}
                value={vitals.oxygenSaturation}
                onChange={(e) => setVitals({...vitals, oxygenSaturation: e.target.value})}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '10px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setStep(2)} style={{
                flex: 1,
                padding: '15px',
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                ← {t.previous}
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
                {t.completeCheckup} ✓
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
          { icon: '📊', title: t.queueManagement, subtitle: 'View patient queue', onClick: () => setCurrentScreen('queue') },
          { icon: '📋', title: t.patientRecords, subtitle: t.recordsSubtitle, onClick: () => alert(`${t.patientRecords} - Coming Soon!`) },
          { icon: '🏥', title: t.doctorConnect, subtitle: t.connectSubtitle, onClick: () => alert(`${t.doctorConnect} - Coming Soon!`) },
          { icon: '💊', title: t.medicineTracker, subtitle: t.trackerSubtitle, onClick: () => alert(`${t.medicineTracker} - Coming Soon!`) }
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

  // Health Checkup Screen with Professional Symptom Input
  if (currentScreen === 'healthCheckup') {
    return (
      <HealthCheckup 
        onBack={() => setCurrentScreen('dashboard')}
        onSubmit={(data) => {
          console.log('Checkup data:', data); // Debug log
          const triageResult = classifyPatient(data);
          console.log('Triage result:', triageResult); // Debug log
          setPatientData(triageResult);
          setCurrentScreen('triageResult');
        }}
        lang={language}
      />
    );
  }

  // Triage Result Screen
  if (currentScreen === 'triageResult') {
    return (
      <TriageResult 
        triageData={patientData}
        onBack={() => setCurrentScreen('dashboard')}
        onAddToQueue={(data) => {
          addToQueue(data);
          setCurrentScreen('dashboard');
        }}
        lang={language}
      />
    );
  }

  // Queue Display Screen
  if (currentScreen === 'queue') {
    return (
      <QueueDisplay 
        onBack={() => setCurrentScreen('dashboard')}
        lang={language}
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
