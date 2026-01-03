// script.js - improved, safe money math (paisa integer), localization and persistence

// Use paisa internally (1 INR = 100 paisa)
const STORAGE_KEY = 'gullak_savings_paisa';
const LANG_KEY = 'gullak_lang';

// Load saved money (paisa) or start at 0
let savingsPaisa = parseInt(localStorage.getItem(STORAGE_KEY), 10);
if (Number.isNaN(savingsPaisa)) savingsPaisa = 0;

// current language persisted
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

// Small helper: format paisa to INR string
function formatMoney(paisa) {
    const rupees = paisa / 100;
    // Use en-IN formatting to get group separators like 1,23,456.00
    return rupees.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
}

// Complete language strings (editable)
const langData = {
    'en': {
        title: 'GULLAK',
        tagline: 'Your Smart Digital Savings',
        label: 'Total Amount Saved',
        btn: 'Invest ₹10 Now',
        trust: '🛡️ 100% Secure & SEBI Verified',
        tip: '"A penny saved is a penny earned." Start small, stay consistent.',
        success: 'You invested ₹10. Keep going — small steps matter!',
        toast: '₹10 added to your Gullak'
    },
    'hi': {
        title: 'गुल्लक',
        tagline: 'आपकी स्मार्ट डिजिटल बचत',
        label: 'कुल जमा राशि',
        btn: 'अभी ₹10 निवेश करें',
        trust: '🛡️ 100% सुरक्षित और SEBI सत्यापित',
        tip: '\"थोड़ी बचत, बड़ा फ़ायदा\" — छोटे कदम बड़ा अंतर बनाते हैं।',
        success: 'आपने ₹10 निवेश किए। बढ़िया — छोटे कदम मायने रखते हैं!',
        toast: '₹10 आपके गुल्लक में जोड़े गए'
    },
    'mr': {
        title: 'गुल्लक',
        tagline: 'तुमची स्मार्ट डिजिटल बचत',
        label: 'एकूण जमा रक्कम',
        btn: 'आत्ता ₹10 गुंतवा',
        trust: '🛡️ 100% सुरक्षित व SEBI प्रमाणित',
        tip: '"थोडी बचत, मोठा फायदा" — छोटे पाऊल मोठा फरक करतात.',
        success: 'तुम्ही ₹10 गुंतवले. छान — छोटे पाऊल महत्त्वाचे!',
        toast: '₹10 तुमच्या गुल्लकात जमा झाले'
    }
};

// DOM helpers
const balanceEl = () => document.getElementById('balance');
const titleEl = () => document.getElementById('title');
const taglineEl = () => document.getElementById('tagline');
const labelEl = () => document.getElementById('label');
const btnEl = () => document.getElementById('main-btn');
const trustEl = () => document.getElementById('trust');
const tipEl = () => document.getElementById('tip');
const toastEl = () => document.getElementById('toast');

function render() {
    // Display formatted balance
    balanceEl().innerText = formatMoney(savingsPaisa);

    // Update language UI
    const d = langData[currentLang] || langData['en'];
    titleEl().innerText = d.title;
    taglineEl().innerText = d.tagline;
    labelEl().innerText = d.label;
    btnEl().innerText = d.btn;
    trustEl().innerText = d.trust;
    tipEl().innerText = d.tip;

    // Update active button styling
    document.querySelectorAll('.lang-nav button').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    const activeBtn = document.getElementById(`${currentLang}-btn`);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
    }
}

// Change language and persist
function changeLanguage(lang) {
    if (!langData[lang]) return;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    render();
}

// Small non-blocking toast
function showToast(text, duration = 1800) {
    const t = toastEl();
    if (!t) return;
    t.innerText = text;
    t.style.display = 'block';
    t.style.opacity = '1';
    clearTimeout(t._hideTimer);
    t._hideTimer = setTimeout(() => {
        t.style.transition = 'opacity 250ms';
        t.style.opacity = '0';
        setTimeout(() => t.style.display = 'none', 250);
    }, duration);
}

// Invest / add ₹10
function invest() {
    // Add ₹10 (1000 paisa)
    const addPaisa = 1000;
    savingsPaisa += addPaisa;
    // Save safely as integer
    localStorage.setItem(STORAGE_KEY, String(savingsPaisa));

    // Visual feedback
    const bal = balanceEl();
    bal.style.color = "#fbc02d";
    setTimeout(() => { bal.style.color = ""; }, 350);

    // Show toast with localized message
    const msg = (langData[currentLang] && langData[currentLang].toast) || langData.en.toast;
    showToast(msg);

    // For accessibility, also make success available via alert for screenreaders if needed
    // (Optional) Use live region or ARIA. We already update aria-live balance.
}

// Initialize
(function init() {
    // Ensure language buttons exist before rendering
    document.addEventListener('DOMContentLoaded', () => {
        render();
        // If user loaded old script with numeric-only balance, migrate
        // (in case previous key used 'gullak_savings' with rupee string)
        const legacy = localStorage.getItem('gullak_savings');
        if (legacy && !localStorage.getItem(STORAGE_KEY)) {
            // Try parse a number from legacy
            const parsed = parseFloat(String(legacy).replace(/[^\d.]/g, ''));
            if (!Number.isNaN(parsed)) {
                const p = Math.round(parsed * 100);
                localStorage.setItem(STORAGE_KEY, String(p));
                savingsPaisa = p;
                // remove legacy
                localStorage.removeItem('gullak_savings');
            }
        }
        render();
    });
})();
