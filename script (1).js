// Load saved money from browser memory or start at 0
let savings = parseFloat(localStorage.getItem('gullak_savings')) || 0;
let currentLang = 'en';

// Update the display immediately when app opens
document.getElementById('balance').innerText = savings;

const langData = {
    'en': { title: 'GULLAK', tagline: 'Your Smart Digital Savings', label: 'Total Amount Saved', btn: 'Invest ₹10 Now', trust: '🛡️ 100% Secure & SEBI Verified', tip: '"A penny saved is a penny earned."', success: 'Success! ₹10 added to your vault.' },
    'hi': { title: 'गुल्लक', tagline: 'आपकी स्मार्ट डिजिटल बचत', label: 'कुल जमा राशि', btn: 'अभी ₹10 निवेश करें', trust: '🛡️ 100% सुरक्षित और SEBI प्रमाणित', tip: '"बूंद-बूंद से सागर भरता है।"', success: 'सफल! ₹10 जमा कर दिए गए।' },
    'mr': { title: 'गुल्लक', tagline: 'तुमची स्मार्ट डिजिटल बचत', label: 'एकूण जमा रक्कम', btn: 'आत्ता ₹10 गुंतवा', trust: '🛡️ 100% सुरक्षित आणि SEBI प्रमाणित', tip: '"थेंबे थेंबे तळे साचे।"', success: 'यशस्वी! ₹10 जमा झाले.' }
};

function changeLanguage(lang) {
    currentLang = lang;
    
    // Update text
    document.getElementById('title').innerText = langData[lang].title;
    document.getElementById('tagline').innerText = langData[lang].tagline;
    document.getElementById('label').innerText = langData[lang].label;
    document.getElementById('main-btn').innerText = langData[lang].btn;
    document.getElementById('trust').innerText = langData[lang].trust;
    document.getElementById('tip').innerText = langData[lang].tip;

    // Update active button styling
    document.querySelectorAll('.lang-nav button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${lang}-btn`).classList.add('active');
}

function invest() {
    savings += 10;
    
    // Update display
    document.getElementById('balance').innerText = savings;
    
    // Save to browser memory
    localStorage.setItem('gullak_savings', savings);
    
    // Animation effect
    const balEl = document.getElementById('balance');
    balEl.style.color = "#fbc02d";
    setTimeout(() => { balEl.style.color = "#2e7d32"; }, 300);

    // Alert
    alert(langData[currentLang].success);
}