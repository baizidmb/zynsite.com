/**
 * Direct Order System for ZynSite
 * Handles quick multi-step order flow, calculation, and WhatsApp dispatch
 * Fully localized for Bengali and English with Multi-Currency support
 */

let activeOrderData = {
  packageId: "pkg-f-commerce",
  packageName: "এফ-কমার্স সুপার সেলার ল্যান্ডিং পেজ",
  price: 3990,
  currency: "৳",
  addons: [],
  name: "",
  phone: "",
  businessName: "",
  pageLink: "",
  notes: "",
  orderId: ""
};

function toBanglaDigits(num) {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, d => bnDigits[Number(d)]);
}

function formatPriceBn(price) {
  const formatted = Number(price || 0).toLocaleString('en-US');
  return toBanglaDigits(formatted);
}

function formatOrderPrice(price) {
  if (window.zynI18n) return window.zynI18n.formatPrice(price);
  return `৳${formatPriceBn(price)}`;
}

const typeToPackageMap = {
  "f-commerce": "pkg-f-commerce",
  "corporate": "pkg-business-pro",
  "personal": "pkg-personal-brand",
  "ecommerce": "pkg-full-ecommerce"
};

const featureLabelMap = {
  bn: {
    domain_hosting: "১ বছরের .com ডোমেইন ও এসএসডি হোস্টিং",
    meta_pixel: "মেটা পিক্সেল ও কনভার্শন এপিআই (CAPI)",
    courier_api: "কুরিয়ার এপিআই ইন্টিগ্রেশন (Steadfast/Pathao)",
    payment_gateway: "অনলাইন পেমেন্ট গেটওয়ে (SSLCommerz/bKash API)",
    speed_booster: "Google PageSpeed ৯০+ স্পিড অপ্টিমাইজেশন",
    fake_order_filter: "ফেইক অর্ডার প্রিভেনশন ও ওটিপি ভেরিফিকেশন",
    seo_setup: "গুগল সার্চ কনসোল ও অন-পেজ টেকনিক্যাল এসইও",
    express_delivery: "জরুরি এক্সপ্রেস ডেলিভারি (২৪-৪৮ ঘণ্টা)"
  },
  en: {
    domain_hosting: "1 Year .com Domain & SSD Cloud Hosting",
    meta_pixel: "Meta Pixel & Conversions API (CAPI)",
    courier_api: "Automated Shipping & Courier API Integration",
    payment_gateway: "Online Payment Gateway (Stripe/PayPal/Cards)",
    speed_booster: "Google PageSpeed 90+ Speed Optimization",
    fake_order_filter: "Fraud Order Filter & OTP Verification",
    seo_setup: "Search Console & On-Page Technical SEO",
    express_delivery: "Rush Express Delivery (24–48h Turnaround)"
  }
};

function openOrderModal(packageId = "pkg-f-commerce", allowProductSelect = false) {
  const modal = document.getElementById("order-modal");
  if (!modal) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const packages = typeof getActivePricingPackages === 'function' ? getActivePricingPackages() : PRICING_PACKAGES;
  const pkg = packages.find(p => p.id === packageId) || packages[0];

  activeOrderData.packageId = pkg.id;
  activeOrderData.packageName = pkg.name;
  activeOrderData.price = pkg.price;
  activeOrderData.currency = pkg.currency || (lang === 'en' ? '$' : '৳');
  activeOrderData.advance_amount = Math.round(pkg.price * 0.5);
  activeOrderData.due_amount = pkg.price - activeOrderData.advance_amount;

  // Reset steps
  document.getElementById("order-step-form").classList.remove("hidden");
  document.getElementById("order-step-success").classList.add("hidden");

  // Pre-select package radio behind the scenes
  const radios = document.getElementsByName("order-package-select");
  radios.forEach(r => {
    r.checked = (r.value === pkg.id);
  });

  // When ordering from default order cards: hide the 4-product radio selector so customer cannot choose other products
  const selectorContainer = document.getElementById("order-package-selector-container");
  const badgeContainer = document.getElementById("order-selected-package-badge");

  if (allowProductSelect) {
    if (selectorContainer) {
      selectorContainer.classList.remove("hidden");
      selectorContainer.style.display = "block";
    }
    if (badgeContainer) {
      badgeContainer.classList.add("hidden");
      badgeContainer.style.display = "none";
    }
  } else {
    if (selectorContainer) {
      selectorContainer.classList.add("hidden");
      selectorContainer.style.display = "none";
    }
    if (badgeContainer) {
      badgeContainer.classList.remove("hidden");
      badgeContainer.style.display = "flex";
      const badgeName = document.getElementById("order-badge-pkg-name");
      const badgePrice = document.getElementById("order-badge-pkg-price");
      if (badgeName) badgeName.textContent = pkg.name;
      if (badgePrice) badgePrice.textContent = formatOrderPrice(pkg.price);
    }
  }

  const notesField = document.getElementById("order-notes");
  if (notesField && notesField.dataset.custom !== "true") {
    notesField.value = "";
  }

  updateOrderModalSummary();
  modal.style.display = "";
  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";
  if (window.lucide) {
    lucide.createIcons();
  }
}

window.openOrderModalWithCustom = function(customEst) {
  const modal = document.getElementById("order-modal");
  if (!modal) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';
  const targetPkgId = typeToPackageMap[customEst.typeId] || "pkg-f-commerce";
  const packages = typeof getActivePricingPackages === 'function' ? getActivePricingPackages() : PRICING_PACKAGES;
  const pkg = packages.find(p => p.id === targetPkgId);

  const fallbackPrice = isEn ? 39 : 3990;
  const customName = isEn 
    ? (pkg ? `${pkg.name} (Custom Configured)` : `Custom Project (${customEst.type || 'Custom Website'})`)
    : (pkg ? `${pkg.name} (ক্যালকুলেটর কাস্টমাইজড)` : `কাস্টম প্রজেক্ট (${customEst.type || 'কাস্টম ওয়েবসাইট'})`);

  activeOrderData.packageId = targetPkgId;
  activeOrderData.packageName = customName;
  activeOrderData.price = customEst.totalCost || (pkg ? pkg.price : fallbackPrice);
  activeOrderData.currency = customEst.currency || (isEn ? '$' : '৳');
  activeOrderData.advance_amount = Math.round(activeOrderData.price * 0.5);
  activeOrderData.due_amount = activeOrderData.price - activeOrderData.advance_amount;

  document.getElementById("order-step-form").classList.remove("hidden");
  document.getElementById("order-step-success").classList.add("hidden");

  // Pre-select matching package radio
  const radios = document.getElementsByName("order-package-select");
  radios.forEach(r => {
    r.checked = (r.value === targetPkgId);
  });

  // Hide package selector options and show custom estimate badge
  const selectorContainer = document.getElementById("order-package-selector-container");
  const badgeContainer = document.getElementById("order-selected-package-badge");
  if (selectorContainer) {
    selectorContainer.classList.add("hidden");
    selectorContainer.style.display = "none";
  }
  if (badgeContainer) {
    badgeContainer.classList.remove("hidden");
    badgeContainer.style.display = "flex";
    const badgeName = document.getElementById("order-badge-pkg-name");
    const badgePrice = document.getElementById("order-badge-pkg-price");
    if (badgeName) badgeName.textContent = activeOrderData.packageName;
    if (badgePrice) badgePrice.textContent = formatOrderPrice(activeOrderData.price);
  }

  const featDict = featureLabelMap[lang] || featureLabelMap.bn;
  const featuresStr = (customEst.features || []).map(fId => featDict[fId] || fId).join(', ');
  const notesField = document.getElementById("order-notes");
  if (notesField) {
    if (isEn) {
      notesField.value = `Calculator Configuration: ${customEst.type || ''} • ${customEst.pages || ''} | Selected Features: ${featuresStr}`;
    } else {
      notesField.value = `ক্যালকুলেটর কনফিগারেশন: ${customEst.type || ''} • ${customEst.pages || ''} | নির্বাচিত ফিচার: ${featuresStr}`;
    }
    notesField.dataset.custom = "true";
  }

  updateOrderModalSummary();
  modal.style.display = "";
  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";
  if (window.lucide) {
    lucide.createIcons();
  }
};

function closeOrderModal() {
  const modal = document.getElementById("order-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeOrderModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("order-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeOrderModal();
      }
    });
  }
});

function handlePackageChange(selectElement) {
  const packages = typeof getActivePricingPackages === 'function' ? getActivePricingPackages() : PRICING_PACKAGES;
  const pkg = packages.find(p => p.id === selectElement.value);
  if (pkg) {
    activeOrderData.packageId = pkg.id;
    activeOrderData.packageName = pkg.name;
    activeOrderData.price = pkg.price;
    activeOrderData.currency = pkg.currency || '$';
  }
  updateOrderModalSummary();
}

function updateOrderModalSummary() {
  const nameEl = document.getElementById("modal-summary-pkg-name");
  const priceEl = document.getElementById("modal-summary-price");
  const advEl = document.getElementById("modal-summary-advance");

  if (nameEl) nameEl.textContent = activeOrderData.packageName;
  if (priceEl) priceEl.textContent = formatOrderPrice(activeOrderData.price);
  if (advEl) {
    const adv = Math.round(activeOrderData.price * 0.5);
    advEl.textContent = formatOrderPrice(adv);
  }

  const badgeName = document.getElementById("order-badge-pkg-name");
  const badgePrice = document.getElementById("order-badge-pkg-price");
  if (badgeName) badgeName.textContent = activeOrderData.packageName;
  if (badgePrice) badgePrice.textContent = formatOrderPrice(activeOrderData.price);
}

function isValidPhoneNumber(phone) {
  const p = String(phone || "").trim().replace(/[\s-]/g, "");
  const bdRegex = /^(?:\+?8801|01)[3-9]\d{8}$/;
  const intlRegex = /^\+?[1-9]\d{7,15}$/;
  return bdRegex.test(p) || intlRegex.test(p);
}

function submitOrder(e) {
  if (e) e.preventDefault();

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  // 1. Honeypot check (anti-bot shield)
  const hp = document.getElementById("order-hp-field")?.value;
  if (hp) {
    closeOrderModal();
    return;
  }

  // 2. Submission rate cooldown check (60 seconds)
  const COOLDOWN_MS = 60000;
  const lastTime = Number(localStorage.getItem("zynsite_last_order_time") || 0);
  if (Date.now() - lastTime < COOLDOWN_MS) {
    const waitSec = Math.ceil((COOLDOWN_MS - (Date.now() - lastTime)) / 1000);
    const alertMsg = isEn 
      ? `Please wait! You recently submitted a request. Please try again in ${waitSec} seconds.`
      : `দয়া করে অপেক্ষা করুন! আপনি কিছুক্ষণ আগেই একটি রিকোয়েস্ট পাঠিয়েছেন। ${waitSec} সেকেন্ড পর আবার চেষ্টা করুন।`;
    alert(alertMsg);
    return;
  }

  const name = document.getElementById("order-client-name")?.value.trim();
  const phone = document.getElementById("order-client-phone")?.value.trim();
  const business = document.getElementById("order-business-name")?.value.trim();
  const link = document.getElementById("order-page-link")?.value.trim() || (isEn ? "Not provided" : "দেওয়া হয়নি");
  const notes = document.getElementById("order-notes")?.value.trim() || (isEn ? "No special notes" : "কোন বিশেষ নোট নেই");

  if (!name || !phone || !business) {
    alert(isEn 
      ? "Please enter your full name, phone/WhatsApp number, and business name."
      : "অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং ব্যবসার নাম লিখুন।"
    );
    return;
  }

  // 3. Strict Phone Number Validation
  if (!isValidPhoneNumber(phone)) {
    alert(isEn
      ? "Please enter a valid phone number (e.g. +1 234 567 8900 or 01XXXXXXXXX)."
      : "সঠিক মোবাইল নম্বর প্রদান করুন (যেমন: 01XXXXXXXXX বা +1 234 567 8900)।"
    );
    const phoneInput = document.getElementById("order-client-phone");
    if (phoneInput) {
      phoneInput.focus();
      phoneInput.classList.add("border-rose-500");
    }
    return;
  }

  // Set cooldown timestamp
  localStorage.setItem("zynsite_last_order_time", String(Date.now()));

  // Generate unique Order ID
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const orderId = `ZS-${new Date().getFullYear()}-${randomNum}`;

  activeOrderData.name = name;
  activeOrderData.phone = phone;
  activeOrderData.businessName = business;
  activeOrderData.pageLink = link;
  activeOrderData.notes = notes;
  activeOrderData.orderId = orderId;
  activeOrderData.createdAt = new Date().toISOString();
  activeOrderData.status = "pending";

  // Map to backend snake_case properties so invoice, Supabase, and localStorage are completely synchronized
  activeOrderData.order_id = orderId;
  activeOrderData.client_name = name;
  activeOrderData.client_phone = phone;
  activeOrderData.business_name = business;
  activeOrderData.page_link = link;
  activeOrderData.package_id = activeOrderData.packageId || "pkg-f-commerce";
  activeOrderData.package_name = activeOrderData.packageName || (isEn ? "High-Converting Sales Funnel" : "এফ-কমার্স ল্যান্ডিং পেজ");
  activeOrderData.price = Number(activeOrderData.price) || (isEn ? 39 : 3990);
  activeOrderData.currency = activeOrderData.currency || (isEn ? '$' : '৳');
  activeOrderData.advance_amount = Math.round(activeOrderData.price * 0.5);
  activeOrderData.due_amount = activeOrderData.price - activeOrderData.advance_amount;
  activeOrderData.created_at = activeOrderData.createdAt;

  // Save to Backend (Supabase + LocalStorage)
  if (window.zynBackend) {
    window.zynBackend.saveOrder(activeOrderData).catch(err => console.error("Backend save error:", err));
  } else {
    try {
      const existingOrders = JSON.parse(localStorage.getItem("zynsite_orders") || "[]");
      existingOrders.unshift(activeOrderData);
      localStorage.setItem("zynsite_orders", JSON.stringify(existingOrders));
    } catch (err) {
      console.error("Local storage error:", err);
    }
  }

  // Confetti celebration
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Display Success View
  document.getElementById("order-step-form").classList.add("hidden");
  document.getElementById("order-step-success").classList.remove("hidden");

  document.getElementById("success-order-id").textContent = orderId;
  document.getElementById("success-client-name").textContent = name;
  document.getElementById("success-pkg-name").textContent = activeOrderData.packageName;
  document.getElementById("success-total-price").textContent = formatOrderPrice(activeOrderData.price);
}

function downloadActiveOrderInvoice() {
  if (window.zynBackend?.generatePrintableInvoice) {
    // Ensure all invoice fields are synced
    activeOrderData.order_id = activeOrderData.order_id || activeOrderData.orderId;
    activeOrderData.client_name = activeOrderData.client_name || activeOrderData.name;
    activeOrderData.client_phone = activeOrderData.client_phone || activeOrderData.phone;
    activeOrderData.business_name = activeOrderData.business_name || activeOrderData.businessName;
    activeOrderData.package_name = activeOrderData.package_name || activeOrderData.packageName;
    activeOrderData.price = Number(activeOrderData.price) || 3990;
    activeOrderData.currency = activeOrderData.currency || (window.zynI18n?.currencySymbol || '৳');
    activeOrderData.advance_amount = Number(activeOrderData.advance_amount) || Math.round(activeOrderData.price * 0.5);
    activeOrderData.due_amount = Number(activeOrderData.due_amount) || (activeOrderData.price - activeOrderData.advance_amount);
    activeOrderData.created_at = activeOrderData.created_at || activeOrderData.createdAt || new Date().toISOString();

    window.zynBackend.generatePrintableInvoice(activeOrderData);
  }
}

function sendOrderViaWhatsApp() {
  const ord = activeOrderData || {};
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const orderId = ord.orderId || 'ZS-2026-0000';
  const clientName = ord.name || (isEn ? 'Valued Client' : 'সম্মানিত গ্রাহক');
  const business = ord.businessName || (isEn ? 'Business Owner' : 'স্বত্বাধিকারী');
  const pkg = ord.packageName || (isEn ? 'Website Package' : 'ওয়েবসাইট প্যাকেজ');
  const price = formatOrderPrice(ord.price || (isEn ? 39 : 3990));
  const adv = formatOrderPrice(Math.round((ord.price || (isEn ? 39 : 3990)) * 0.5));

  let msg = '';
  if (isEn) {
    msg = `Hello ZynSite! I just submitted a new website project order:
• Order ID: ${orderId}
• Client Name: ${clientName}
• Business Name: ${business}
• Package: ${pkg}
• Total Budget: ${price} (50% Deposit: ${adv})

Please confirm receipt and let me know the kickoff process.`;
  } else {
    msg = `হ্যালো ZynSite! আমি ওয়েবসাইটে একটি নতুন অর্ডার সাবমিট করেছি:
• অর্ডার আইডি: ${orderId}
• গ্রাহকের নাম: ${clientName}
• প্রতিষ্ঠান / ব্যবসা: ${business}
• প্যাকেজ: ${pkg}
• মোট বাজেট: ${price} (৫০% অগ্রিম: ${adv})

অনুগ্রহ করে অর্ডারটি দ্রুত প্রসেস করুন।`;
  }

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/40774119870?text=${encoded}`, '_blank');
}
