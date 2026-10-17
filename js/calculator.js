/**
 * Interactive Website Price & Feature Estimator
 * Allows client to configure their desired site dynamically with multi-language & multi-currency support
 */

const CALCULATOR_CONFIG_DATA = {
  bn: {
    currencySymbol: "৳",
    daySuffix: "দিন",
    includedText: "অন্তর্ভুক্ত",
    types: [
      { id: "f-commerce", name: "F-Commerce ল্যান্ডিং পেজ", basePrice: 3990, baseDays: 2, icon: "shopping-bag" },
      { id: "corporate", name: "বিজনেস / কর্পোরেট সাইট", basePrice: 7990, baseDays: 5, icon: "building-2" },
      { id: "personal", name: "ব্যক্তিগত পোর্টফোলিও", basePrice: 4990, baseDays: 3, icon: "user-check" },
      { id: "ecommerce", name: "মাল্টি-প্রোডাক্ট ই-কমার্স", basePrice: 14990, baseDays: 8, icon: "store" }
    ],
    pages: [
      { count: 1, label: "১টি হাই-কনভার্টিং পেজ (ল্যান্ডিং পেজ)", extraPrice: 0, extraDays: 0 },
      { count: 5, label: "৩ থেকে ৫টি পেজ (স্ট্যান্ডার্ড সাইট)", extraPrice: 2000, extraDays: 2 },
      { count: 10, label: "৬ থেকে ১০টি পেজ (পূর্ণাঙ্গ সাইট)", extraPrice: 4500, extraDays: 4 },
      { count: 20, label: "১০+ পেজ (কাস্টম মেগা পোর্টাল)", extraPrice: 8500, extraDays: 7 }
    ],
    features: [
      { id: "domain_hosting", label: "১ বছরের .com ডোমেইন ও এসএসডি হোস্টিং", price: 1500, days: 0, defaultChecked: true },
      { 
        id: "meta_pixel", 
        label: "ফেসবুক মেটা পিক্সেল ও কনভার্শন এপিআই (CAPI)", 
        price: 800, 
        days: 0, 
        defaultChecked: true,
        tooltip: "ফেসবুক বিজ্ঞাপনের খরচ কমায় এবং সঠিক ক্রেতাদের কাছে বিজ্ঞাপন পৌঁছাতে সাহায্য করে।"
      },
      { 
        id: "courier_api", 
        label: "কুরিয়ার এপিআই ইন্টিগ্রেশন (Steadfast/Pathao)", 
        price: 1000, 
        days: 1, 
        defaultChecked: true,
        tooltip: "১ ক্লিকে পার্সেল বুকিং এবং কাস্টমারের পূর্ববর্তী ডেলিভারি রেকর্ড যাচাই করে ফেইক অর্ডার রোধ করে।"
      },
      { id: "payment_gateway", label: "অনলাইন পেমেন্ট গেটওয়ে (SSLCommerz/bKash API)", price: 2000, days: 1, defaultChecked: false },
      { 
        id: "speed_booster", 
        label: "Google PageSpeed ৯০+ আল্ট্রা স্পিড অপ্টিমাইজেশন", 
        price: 800, 
        days: 0, 
        defaultChecked: true,
        tooltip: "১ সেকেন্ডে সাইট লোড হয়, ফলে কাস্টমার বিরক্ত হয়ে পেজ ছেড়ে যায় না।"
      },
      { 
        id: "fake_order_filter", 
        label: "ফেইক অর্ডার প্রিভেনশন ও ফোন ওটিপি ভেরিফিকেশন", 
        price: 1200, 
        days: 1, 
        defaultChecked: false,
        tooltip: "ভুয়া মোবাইল নম্বর দিয়ে ফেইক ক্যাশ-অন-ডেলিভারি (COD) অর্ডার সম্পূর্ণ বন্ধ করে।"
      },
      { id: "seo_setup", label: "গুগল সার্চ কনসোল ও অন-পেজ টেকনিক্যাল এসইও", price: 900, days: 0, defaultChecked: true },
      { id: "express_delivery", label: "জরুরি এক্সপ্রেস ডেলিভারি (২৪-৪৮ ঘণ্টার মধ্যে সম্পন্ন)", price: 1500, days: -1, defaultChecked: false }
    ]
  },
  en: {
    currencySymbol: "$",
    daySuffix: "Days",
    includedText: "Included",
    types: [
      { id: "f-commerce", name: "High-Converting Landing Page", basePrice: 39, baseDays: 2, icon: "shopping-bag" },
      { id: "corporate", name: "Corporate / Business Website", basePrice: 79, baseDays: 5, icon: "building-2" },
      { id: "personal", name: "Personal Brand & Portfolio", basePrice: 49, baseDays: 3, icon: "user-check" },
      { id: "ecommerce", name: "Multi-Product E-Commerce", basePrice: 149, baseDays: 8, icon: "store" }
    ],
    pages: [
      { count: 1, label: "1 High-Converting Page (Landing Page)", extraPrice: 0, extraDays: 0 },
      { count: 5, label: "3 to 5 Pages (Standard Site)", extraPrice: 20, extraDays: 2 },
      { count: 10, label: "6 to 10 Pages (Full Website)", extraPrice: 45, extraDays: 4 },
      { count: 20, label: "10+ Pages (Custom Mega Portal)", extraPrice: 85, extraDays: 7 }
    ],
    features: [
      { id: "domain_hosting", label: "1 Year .com Domain & SSD Cloud Hosting", price: 15, days: 0, defaultChecked: true },
      { 
        id: "meta_pixel", 
        label: "Meta Pixel & Conversions API (CAPI)", 
        price: 10, 
        days: 0, 
        defaultChecked: true,
        tooltip: "Bypasses iOS 14+ ad blockers with server-side event tracking, boosting ad ROAS."
      },
      { 
        id: "courier_api", 
        label: "Automated Shipping & Courier API Integration", 
        price: 10, 
        days: 1, 
        defaultChecked: true,
        tooltip: "Enables instant one-click parcel dispatch and automated tracking number generation."
      },
      { id: "payment_gateway", label: "Online Payment Gateway (Stripe/PayPal/Cards)", price: 20, days: 1, defaultChecked: false },
      { 
        id: "speed_booster", 
        label: "Google PageSpeed 90+ Speed Optimization", 
        price: 10, 
        days: 0, 
        defaultChecked: true,
        tooltip: "Guarantees sub-second mobile load speeds so visitors never bounce."
      },
      { 
        id: "fake_order_filter", 
        label: "Fraud Order Filter & OTP Phone Verification", 
        price: 12, 
        days: 1, 
        defaultChecked: false,
        tooltip: "Blocks fake phone numbers and bogus Cash-on-Delivery submissions."
      },
      { id: "seo_setup", label: "Search Console & On-Page Technical SEO", price: 10, days: 0, defaultChecked: true },
      { id: "express_delivery", label: "Rush Express Delivery (24–48h Turnaround)", price: 15, days: -1, defaultChecked: false }
    ]
  }
};

function getActiveCalcConfig() {
  const lang = window.zynI18n?.currentLang || 'bn';
  return CALCULATOR_CONFIG_DATA[lang] || CALCULATOR_CONFIG_DATA.bn;
}

const CALCULATOR_CONFIG = new Proxy({}, {
  get(target, prop) {
    const active = getActiveCalcConfig();
    return active[prop];
  }
});

function toBanglaDigits(num) {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, d => bnDigits[Number(d)]);
}

function formatPriceBn(price) {
  const formatted = Number(price || 0).toLocaleString('en-US');
  return toBanglaDigits(formatted);
}

function formatCalcPrice(price) {
  const lang = window.zynI18n?.currentLang || 'bn';
  if (lang === 'en') {
    return `$${Number(price || 0).toLocaleString('en-US')}`;
  }
  return `৳${formatPriceBn(price)}`;
}

let currentCalcState = {
  selectedType: "f-commerce",
  selectedPages: 1,
  selectedFeatures: ["domain_hosting", "meta_pixel", "courier_api", "speed_booster", "seo_setup"]
};

function initCalculator() {
  const calcContainer = document.getElementById("price-calculator-container");
  if (!calcContainer) return;

  renderCalculatorUI();
  updateCalculatorResult();
}

function renderCalculatorUI() {
  const cfg = getActiveCalcConfig();
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const typeContainer = document.getElementById("calc-types");
  const pagesContainer = document.getElementById("calc-pages");
  const featuresContainer = document.getElementById("calc-features");

  if (typeContainer) {
    typeContainer.innerHTML = cfg.types.map(t => `
      <div 
        onclick="setCalcType('${t.id}')"
        class="cursor-pointer p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
          currentCalcState.selectedType === t.id 
            ? 'border-[#C8AA76] bg-[#E8CD8C]/20 shadow-md' 
            : 'border-[#C8AA76]/25 bg-white/70 hover:border-[#C8AA76]/50 hover:bg-white'
        }"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30 text-[#997530] flex items-center justify-center">
            <i data-lucide="${t.icon}" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="font-bold text-[#14120D] text-base">${t.name}</h4>
            <span class="text-xs text-[#14120D]/60 font-en">${isEn ? `From ${formatCalcPrice(t.basePrice)}` : `শুরু মাত্র ${formatCalcPrice(t.basePrice)}`}</span>
          </div>
        </div>
        <div class="w-5 h-5 rounded-full border flex items-center justify-center ${
          currentCalcState.selectedType === t.id ? 'border-[#C8AA76] bg-[#D4AF37]' : 'border-[#C8AA76]/40'
        }">
          ${currentCalcState.selectedType === t.id ? '<div class="w-2 h-2 rounded-full bg-white"></div>' : ''}
        </div>
      </div>
    `).join('');
  }

  if (pagesContainer) {
    pagesContainer.innerHTML = cfg.pages.map(p => `
      <div 
        onclick="setCalcPages(${p.count})"
        role="radio"
        aria-checked="${currentCalcState.selectedPages === p.count}"
        tabindex="0"
        onkeydown="if(event.key === ' ' || event.key === 'Enter') { event.preventDefault(); setCalcPages(${p.count}); }"
        class="cursor-pointer flex items-center justify-between p-3.5 rounded-xl border transition-all select-none ${
          currentCalcState.selectedPages === p.count
            ? 'border-[#C8AA76] bg-[#E8CD8C]/20'
            : 'border-[#C8AA76]/25 bg-white/70 hover:border-[#C8AA76]/50'
        }"
      >
        <div class="flex items-center gap-3">
          <input type="radio" name="calc-page-radio" ${currentCalcState.selectedPages === p.count ? 'checked' : ''} tabindex="-1" class="accent-[#D4AF37] pointer-events-none" readonly>
          <span class="text-sm font-medium text-[#14120D]">${p.label}</span>
        </div>
        <span class="text-xs font-semibold font-en ${p.extraPrice > 0 ? 'text-[#997530]' : 'text-emerald-700'}">
          ${p.extraPrice > 0 ? `+${formatCalcPrice(p.extraPrice)}` : cfg.includedText}
        </span>
      </div>
    `).join('');
  }

  if (featuresContainer) {
    featuresContainer.innerHTML = cfg.features.map(f => {
      const isChecked = currentCalcState.selectedFeatures.includes(f.id);
      const tooltipHtml = f.tooltip ? `
        <span class="relative group/tip inline-flex items-center ml-1.5 cursor-help" onclick="event.stopPropagation()">
          <span class="w-4 h-4 rounded-full bg-[#FAF9F5] border border-[#C8AA76]/30 text-[#14120D]/70 group-hover/tip:text-[#997530] group-hover/tip:border-[#C8AA76] text-[11px] font-bold inline-flex items-center justify-center transition-colors">?</span>
          <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2.5 rounded-xl bg-white border border-[#C8AA76]/30 text-xs text-[#14120D] font-normal leading-relaxed shadow-xl opacity-0 group-hover/tip:opacity-100 group-focus-within/tip:opacity-100 transition-opacity z-50 text-left">
            ${f.tooltip}
          </span>
        </span>
      ` : '';

      return `
        <div 
          onclick="toggleCalcFeature('${f.id}')"
          role="checkbox"
          aria-checked="${isChecked}"
          tabindex="0"
          onkeydown="if(event.key === ' ' || event.key === 'Enter') { event.preventDefault(); toggleCalcFeature('${f.id}'); }"
          class="cursor-pointer flex items-start gap-3 p-3.5 rounded-xl border transition-all select-none ${
            isChecked 
              ? 'border-[#C8AA76] bg-[#E8CD8C]/15' 
              : 'border-[#C8AA76]/25 bg-white/60 hover:border-[#C8AA76]/40'
          }"
        >
          <input 
            type="checkbox" 
            ${isChecked ? 'checked' : ''} 
            tabindex="-1"
            class="mt-1 rounded border-[#C8AA76]/40 text-[#D4AF37] accent-[#D4AF37] pointer-events-none"
            readonly
          >
          <div class="flex-1 flex items-center justify-between">
            <span class="text-sm text-[#14120D] font-medium inline-flex items-center">
              <span>${f.label}</span>
              ${tooltipHtml}
            </span>
            <span class="text-xs font-semibold text-[#14120D]/60 ml-2 whitespace-nowrap font-en">+${formatCalcPrice(f.price)}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

function setCalcType(typeId) {
  currentCalcState.selectedType = typeId;
  renderCalculatorUI();
  updateCalculatorResult();
}

function setCalcPages(pageCount) {
  currentCalcState.selectedPages = pageCount;
  renderCalculatorUI();
  updateCalculatorResult();
}

function toggleCalcFeature(featureId) {
  const index = currentCalcState.selectedFeatures.indexOf(featureId);
  if (index > -1) {
    currentCalcState.selectedFeatures.splice(index, 1);
  } else {
    currentCalcState.selectedFeatures.push(featureId);
  }
  renderCalculatorUI();
  updateCalculatorResult();
}

function updateCalculatorResult() {
  const cfg = getActiveCalcConfig();
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const typeObj = cfg.types.find(t => t.id === currentCalcState.selectedType);
  const pageObj = cfg.pages.find(p => p.count === currentCalcState.selectedPages);

  const defaultBasePrice = isEn ? 39 : 3990;
  let totalCost = (typeObj ? typeObj.basePrice : defaultBasePrice) + (pageObj ? pageObj.extraPrice : 0);
  let totalDays = (typeObj ? typeObj.baseDays : 2) + (pageObj ? pageObj.extraDays : 0);

  currentCalcState.selectedFeatures.forEach(featId => {
    const fObj = cfg.features.find(f => f.id === featId);
    if (fObj) {
      totalCost += fObj.price;
      totalDays += fObj.days;
    }
  });

  if (totalDays < 2) totalDays = 2;

  // Update DOM elements
  const priceDisplay = document.getElementById("calc-total-price");
  const daysDisplay = document.getElementById("calc-total-days");
  const summaryDisplay = document.getElementById("calc-selected-summary");

  if (priceDisplay) {
    priceDisplay.textContent = formatCalcPrice(totalCost);
  }
  if (daysDisplay) {
    daysDisplay.textContent = isEn ? `${totalDays} Days` : `${toBanglaDigits(totalDays)} দিন`;
  }
  if (summaryDisplay) {
    const featNames = currentCalcState.selectedFeatures.map(fId => {
      const f = cfg.features.find(item => item.id === fId);
      return f ? f.label.split(' (')[0] : '';
    }).filter(Boolean);

    if (isEn) {
      summaryDisplay.textContent = `${typeObj?.name} • ${pageObj?.label.split(' (')[0]} • ${featNames.length} Special Features`;
    } else {
      summaryDisplay.textContent = `${typeObj?.name} • ${pageObj?.label.split(' (')[0]} • ${toBanglaDigits(featNames.length)}টি স্পেশাল ফিচার`;
    }
  }

  // Save for modal use
  window.lastCalculatedEstimate = {
    type: typeObj?.name,
    typeId: currentCalcState.selectedType,
    pages: pageObj?.label,
    features: currentCalcState.selectedFeatures,
    totalCost: totalCost,
    totalDays: totalDays,
    currency: cfg.currencySymbol
  };

  // Dynamically update WhatsApp CTA button href
  const waBtn = document.getElementById("calc-whatsapp-btn");
  if (waBtn) {
    waBtn.href = getCalculatorWhatsAppUrl();
  }
}

function orderFromCalculator() {
  if (window.openOrderModalWithCustom) {
    window.openOrderModalWithCustom(window.lastCalculatedEstimate);
  }
}

function getCalculatorWhatsAppUrl() {
  const cfg = getActiveCalcConfig();
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const est = window.lastCalculatedEstimate || {};
  const typeName = est.type || (isEn ? 'Custom Website' : 'কাস্টম ওয়েবসাইট');
  const pages = est.pages || (isEn ? '1 Page' : '১টি পেজ');
  const features = (est.features || []).map(fId => {
    const f = cfg.features.find(item => item.id === fId);
    return f ? `• ${f.label}` : '';
  }).filter(Boolean);

  const featureList = features.length > 0 
    ? features.join('\n')
    : (isEn ? '• Standard core package features' : '• প্যাকেজের মূল স্ট্যান্ডার্ড ফিচারসমূহ');

  const cost = formatCalcPrice(est.totalCost || (isEn ? 39 : 3990));
  const days = isEn ? `${est.totalDays || 3} Days` : `${toBanglaDigits(est.totalDays || 3)} দিন`;

  let message = '';
  if (isEn) {
    message = `Hello ZynSite! I generated this custom estimate from your website calculator:

📌 Package / Site Type: ${typeName}
📄 Page Scope: ${pages}
⏱️ Estimated Delivery: ${days}
💰 Total Estimated Budget: ${cost}

🛠️ Selected Add-on Features:
${featureList}

I would like to discuss and kick off this project with your team. Could you share the next steps?`;
  } else {
    message = `হ্যালো ZynSite! আমি প্রাইস ক্যালকুলেটর থেকে এই কনফিগারেশনে কোটেশন নির্বাচন করেছি:

📌 প্যাকেজ / সাইটের ধরন: ${typeName}
📄 পেজ সংখ্যা: ${pages}
⏱️ আনুমানিক সময়সীমা: ${days}
💰 মোট আনুমানিক বাজেট: ${cost}

🛠️ নির্বাচিত অ্যাড-অন ও ফিচারসমূহ:
${featureList}

আমি এই প্রজেক্টটি শুরু করতে চাই। পরবর্তী করণীয় কী জানাবেন?`;
  }

  return `https://wa.me/40774119870?text=${encodeURIComponent(message)}`;
}

function sendQuotationToWhatsApp(e) {
  if (e && typeof e.preventDefault === 'function') {
    e.preventDefault();
  }
  const url = getCalculatorWhatsAppUrl();
  window.open(url, '_blank');
}

// Window global exposures
window.initCalculator = initCalculator;
window.orderFromCalculator = orderFromCalculator;
window.sendQuotationToWhatsApp = sendQuotationToWhatsApp;
window.getCalculatorWhatsAppUrl = getCalculatorWhatsAppUrl;
window.setCalcType = setCalcType;
window.setCalcPages = setCalcPages;
window.toggleCalcFeature = toggleCalcFeature;
window.CALCULATOR_CONFIG = CALCULATOR_CONFIG;
window.getActiveCalcConfig = getActiveCalcConfig;
