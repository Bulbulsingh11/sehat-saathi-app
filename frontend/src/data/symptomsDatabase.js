// src/data/symptomsDatabase.js
// Comprehensive Medical Symptoms Database - Multi-language Support

export const SYMPTOMS_DATABASE = {
  // Respiratory System
  respiratory: {
    en: [
      'Breathing difficulty', 'Shortness of breath', 'Wheezing', 'Persistent cough', 
      'Dry cough', 'Cough with blood', 'Chest tightness', 'Rapid breathing',
      'Shallow breathing', 'Noisy breathing', 'Unable to catch breath'
    ],
    hi: [
      'सांस लेने में कठिनाई', 'सांस फूलना', 'सांस में आवाज', 'लगातार खांसी',
      'सूखी खांसी', 'खांसी में खून', 'छाती में जकड़न', 'तेज सांस',
      'उथली सांस', 'सांस में शोर', 'सांस न आना'
    ],
    pa: [
      'ਸਾਹ ਲੈਣ ਵਿੱਚ ਦਿੱਕਤ', 'ਸਾਹ ਫੁੱਲਣਾ', 'ਸਾਹ ਵਿੱਚ ਆਵਾਜ਼', 'ਲਗਾਤਾਰ ਖੰਘ',
      'ਸੁੱਕੀ ਖੰਘ', 'ਖੰਘ ਵਿੱਚ ਖੂਨ', 'ਛਾਤੀ ਵਿੱਚ ਜਕੜਨ', 'ਤੇਜ਼ ਸਾਹ',
      'ਉਥਲੀ ਸਾਹ', 'ਸਾਹ ਵਿੱਚ ਸ਼ੋਰ', 'ਸਾਹ ਨਾ ਆਉਣਾ'
    ]
  },

  // Cardiovascular System
  cardiovascular: {
    en: [
      'Chest pain', 'Heart palpitations', 'Irregular heartbeat', 'Rapid heartbeat',
      'Slow heartbeat', 'Chest pressure', 'Left arm pain', 'Jaw pain',
      'Neck pain radiating', 'Dizziness with chest pain', 'Fainting spells'
    ],
    hi: [
      'छाती में दर्द', 'दिल की धड़कन तेज', 'अनियमित धड़कन', 'तीव्र हृदयगति',
      'धीमी धड़कन', 'छाती में दबाव', 'बाएं हाथ में दर्द', 'जबड़े में दर्द',
      'गर्दन में दर्द', 'छाती दर्द के साथ चक्कर', 'बेहोशी के दौरे'
    ],
    pa: [
      'ਛਾਤੀ ਵਿੱਚ ਦਰਦ', 'ਦਿਲ ਦੀ ਧੜਕਣ ਤੇਜ਼', 'ਅਨਿਯਮਿਤ ਧੜਕਣ', 'ਤੀਬਰ ਹਿਰਦੇ ਦੀ ਗਤੀ',
      'ਧੀਮੀ ਧੜਕਣ', 'ਛਾਤੀ ਵਿੱਚ ਦਬਾਅ', 'ਖੱਬੇ ਹੱਥ ਵਿੱਚ ਦਰਦ', 'ਜਬਾੜੇ ਵਿੱਚ ਦਰਦ',
      'ਗਰਦਨ ਵਿੱਚ ਦਰਦ', 'ਛਾਤੀ ਦਰਦ ਨਾਲ ਚੱਕਰ', 'ਬੇਹੋਸ਼ੀ ਦੇ ਦੌਰੇ'
    ]
  },

  // Neurological System
  neurological: {
    en: [
      'Severe headache', 'Migraine', 'Dizziness', 'Vertigo', 'Confusion',
      'Memory loss', 'Speech difficulty', 'Vision problems', 'Hearing loss',
      'Numbness in limbs', 'Tingling sensation', 'Weakness in arms/legs',
      'Loss of balance', 'Seizures', 'Fainting'
    ],
    hi: [
      'तीव्र सिरदर्द', 'माइग्रेन', 'चक्कर आना', 'भ्रम की स्थिति', 'याददाश्त की समस्या',
      'बोलने में कठिनाई', 'दृष्टि संबंधी समस्या', 'सुनने में कमी', 'अंगों में सुन्नता',
      'झुनझुनी का एहसास', 'हाथ-पैर में कमजोरी', 'संतुलन की हानि', 'दौरे पड़ना', 'बेहोशी'
    ],
    pa: [
      'ਤੀਬਰ ਸਿਰ ਦਰਦ', 'ਮਾਈਗਰੇਨ', 'ਚੱਕਰ ਆਉਣਾ', 'ਭਰਮ ਦੀ ਸਥਿਤੀ', 'ਯਾਦਦਾਸ਼ਤ ਦੀ ਸਮੱਸਿਆ',
      'ਬੋਲਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ', 'ਨਜ਼ਰ ਸੰਬੰਧੀ ਸਮੱਸਿਆ', 'ਸੁਣਨ ਵਿੱਚ ਕਮੀ', 'ਅੰਗਾਂ ਵਿੱਚ ਸੁੰਨਤਾ',
      'ਝਨਝਨਾਹਟ ਦਾ ਅਹਿਸਾਸ', 'ਹੱਥ-ਪੈਰ ਵਿੱਚ ਕਮਜ਼ੋਰੀ', 'ਸੰਤੁਲਨ ਦੀ ਹਾਨੀ', 'ਦੌਰੇ ਪੈਣਾ', 'ਬੇਹੋਸ਼ੀ'
    ]
  },

  // Gastrointestinal System
  gastrointestinal: {
    en: [
      'Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Abdominal pain',
      'Stomach cramps', 'Bloating', 'Gas formation', 'Loss of appetite',
      'Blood in stool', 'Black stool', 'Heartburn', 'Acid reflux', 'Indigestion'
    ],
    hi: [
      'जी मिचलाना', 'उल्टी', 'दस्त', 'कब्ज', 'पेट में दर्द',
      'पेट में मरोड़', 'पेट फूलना', 'गैस बनना', 'भूख न लगना',
      'मल में खून', 'काला मल', 'सीने में जलन', 'एसिडिटी', 'अपच'
    ],
    pa: [
      'ਜੀ ਮਿਚਲਾਉਣਾ', 'ਉਲਟੀ', 'ਦਸਤ', 'ਕਬਜ਼', 'ਪੇਟ ਵਿੱਚ ਦਰਦ',
      'ਪੇਟ ਵਿੱਚ ਮਰੋੜ', 'ਪੇਟ ਫੁੱਲਣਾ', 'ਗੈਸ ਬਣਨਾ', 'ਭੁੱਖ ਨਾ ਲੱਗਣਾ',
      'ਮਲ ਵਿੱਚ ਖੂਨ', 'ਕਾਲਾ ਮਲ', 'ਸੀਨੇ ਵਿੱਚ ਜਲਨ', 'ਐਸਿਡਿਟੀ', 'ਅਪਚ'
    ]
  },

  // General/Constitutional
  general: {
    en: [
      'Fever', 'High fever', 'Chills', 'Night sweats', 'Fatigue', 'Weakness',
      'Weight loss', 'Weight gain', 'Loss of appetite', 'Excessive thirst',
      'Frequent urination', 'Difficulty sleeping', 'Excessive sweating'
    ],
    hi: [
      'बुखार', 'तेज बुखार', 'कपकपी', 'रात को पसीना', 'थकान', 'कमजोरी',
      'वजन घटना', 'वजन बढ़ना', 'भूख न लगना', 'अधिक प्यास',
      'बार-बार पेशाब', 'नींद न आना', 'अधिक पसीना'
    ],
    pa: [
      'ਬੁਖਾਰ', 'ਤੇਜ਼ ਬੁਖਾਰ', 'ਕਪਕਪੀ', 'ਰਾਤ ਨੂੰ ਪਸੀਨਾ', 'ਥਕਾਨ', 'ਕਮਜ਼ੋਰੀ',
      'ਭਾਰ ਘਟਣਾ', 'ਭਾਰ ਵਧਣਾ', 'ਭੁੱਖ ਨਾ ਲੱਗਣਾ', 'ਵਧੇਰੇ ਪਿਆਸ',
      'ਵਾਰ-ਵਾਰ ਪਿਸ਼ਾਬ', 'ਨੀਂਦ ਨਾ ਆਉਣਾ', 'ਵਧੇਰੇ ਪਸੀਨਾ'
    ]
  }
};

// Quick symptom suggestions for common conditions
export const QUICK_CONDITIONS = {
  en: [
    'Cold/Flu symptoms', 'Stomach upset', 'Headache/Migraine', 'Allergic reaction',
    'Skin rash', 'Joint pain', 'Back pain', 'Eye irritation'
  ],
  hi: [
    'सर्दी/फ्लू के लक्षण', 'पेट खराब', 'सिरदर्द/माइग्रेन', 'एलर्जी की प्रतिक्रिया',
    'त्वचा पर दाने', 'जोड़ों का दर्द', 'कमर दर्द', 'आंखों में जलन'
  ],
  pa: [
    'ਠੰਡ/ਫਲੂ ਦੇ ਲੱਛਣ', 'ਪੇਟ ਖਰਾਬ', 'ਸਿਰ ਦਰਦ/ਮਾਈਗਰੇਨ', 'ਐਲਰਜੀ ਦੀ ਪ੍ਰਤੀਕਿਰਿਆ',
    'ਚਮੜੀ ਤੇ ਦਾਣੇ', 'ਜੋੜਾਂ ਦਾ ਦਰਦ', 'ਕਮਰ ਦਰਦ', 'ਅੱਖਾਂ ਵਿੱਚ ਜਲਨ'
  ]
};
