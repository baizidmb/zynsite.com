/**
 * ZynSite Main Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // Render components
  renderPricingPackages();
  renderFaqSection();
  initCalculator();
  initPortfolio();
  initNavbarScroll();
  initMobileStickyCta();
  initStatsObserver();
  initCleanUrlNavigation();
  initGlowCardObserver();

  // Close modals on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      if (typeof closeOrderModal === "function") closeOrderModal();
      if (typeof closeDemoModal === "function") closeDemoModal();
      if (typeof closeProjectModal === "function") closeProjectModal();
    }
  });
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

// Clean URL Navigation with smooth scrolling and fixed navbar offset
function initCleanUrlNavigation() {
  const sectionRoutes = ["services", "f-commerce", "portfolio", "calculator", "pricing", "faq", "service-corporate", "service-personal", "service-ecommerce", "service-optimization"];

  const scrollToSection = (routeId, smooth = true) => {
    if (!routeId) {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
      return;
    }
    const target = document.getElementById(routeId);
    if (target) {
      const navHeight = 85;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top: Math.max(0, targetPos), behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  document.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href) return;

    // Check if link points to /section or #section or /
    const cleanRoute = href.replace(/^(\/|#)+/, '');
    if (sectionRoutes.includes(cleanRoute) || href === '/' || href === '#') {
      anchor.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();

        if (cleanRoute && sectionRoutes.includes(cleanRoute)) {
          scrollToSection(cleanRoute, true);
          try {
            history.pushState(null, '', `#${cleanRoute}`);
          } catch (err) {}
        } else {
          scrollToSection('', true);
          try {
            history.pushState(null, '', window.location.pathname);
          } catch (err) {}
        }
      });
    }
  });

  // Handle direct navigation to /pricing or #pricing on initial load
  const initialHash = window.location.hash.replace(/^#+/, '');
  const initialPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const initialRoute = sectionRoutes.includes(initialHash) ? initialHash : (sectionRoutes.includes(initialPath) ? initialPath : null);

  if (initialRoute) {
    setTimeout(() => {
      scrollToSection(initialRoute, true);
    }, 300);
  }

  // Handle browser Back/Forward navigation without page reload or 404
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace(/^#+/, '');
    if (hash && sectionRoutes.includes(hash)) {
      scrollToSection(hash, true);
    } else if (!hash) {
      scrollToSection('', true);
    }
  });
}

// Sticky Navbar Effect
function initNavbarScroll() {
  const navbar = document.getElementById("main-navbar");
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("shadow-md", "bg-white/95");
      navbar.classList.remove("shadow-xs", "bg-white/92");
    } else {
      navbar.classList.remove("shadow-md", "bg-white/95");
      navbar.classList.add("shadow-xs", "bg-white/92");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// Mobile Sticky Bottom Conversion Bar (fades in after 400px scroll)
function initMobileStickyCta() {
  const stickyCta = document.getElementById("mobile-sticky-cta");
  if (!stickyCta) return;

  const handleScroll = () => {
    // Only active on mobile viewports (< 768px)
    if (window.innerWidth >= 768) {
      stickyCta.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
      stickyCta.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
      return;
    }

    if (window.scrollY > 400) {
      stickyCta.classList.remove("translate-y-full", "opacity-0", "pointer-events-none");
      stickyCta.classList.add("translate-y-0", "opacity-100", "pointer-events-auto");
    } else {
      stickyCta.classList.add("translate-y-full", "opacity-0", "pointer-events-none");
      stickyCta.classList.remove("translate-y-0", "opacity-100", "pointer-events-auto");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll, { passive: true });
  handleScroll();
}

// Mobile Menu Drawer
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu-drawer");
  const toggleBtn = document.getElementById("mobile-menu-toggle-btn");
  if (!menu) return;
  menu.classList.toggle("hidden");
  const isOpen = !menu.classList.contains("hidden");
  if (toggleBtn) {
    toggleBtn.classList.toggle("menu-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

// Aesthetic Slow-Running Golden Snake Border Beam & Scroll Observer (Optimized, Zero-Lag)
function initGlowCardObserver() {
  const cardSelector = ".glass-card, .price-card, .pricing-package-card, .stat-card, .golden-card-glow, #calculator .rounded-3xl, #portfolio-grid > div";

  // 1. Unconditional Monotonic Master Clock: Drives --snake-angle synchronously across all cards & buttons
  // Sets --snake-angle on :root (~0.02ms per frame, 0 layout reflows) ensuring 100% reliable continuous motion
  // across every browser engine without depending on custom property @keyframes repaint behavior.
  if (!window._snakeClockRunning) {
    window._snakeClockRunning = true;
    const SNAKE_PERIOD_MS = 3000; // Fluid, lively tempo (3.0s per loop)
    let lastAngle = -1;
    const stepSnakeGlide = (now) => {
      const angle = Math.floor(((now / SNAKE_PERIOD_MS) * 360) % 360);
      if (angle !== lastAngle) {
        lastAngle = angle;
        document.documentElement.style.setProperty("--snake-angle", `${angle}deg`);
      }
      requestAnimationFrame(stepSnakeGlide);
    };
    requestAnimationFrame(stepSnakeGlide);
  }

  // 2. High-Performance IntersectionObserver (Zero Reflows, Zero CPU on scroll)
  if ("IntersectionObserver" in window) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-in-display");
        } else {
          entry.target.classList.remove("card-in-display");
        }
      });
    }, {
      rootMargin: "80px 0px 80px 0px",
      threshold: 0.05
    });

    const observeAll = () => {
      document.querySelectorAll(cardSelector).forEach(el => cardObserver.observe(el));
    };

    window.reobserveGlowCards = observeAll;

    observeAll();
    setTimeout(observeAll, 300);
    setTimeout(observeAll, 1000);
  } else {
    // Graceful fallback for legacy browsers
    const forceShow = () => document.querySelectorAll(cardSelector).forEach(el => el.classList.add("card-in-display"));
    window.reobserveGlowCards = forceShow;
    forceShow();
  }
}

// Render Pricing Packages
function renderPricingPackages() {
  const container = document.getElementById("pricing-cards-container");
  if (!container) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';
  const packages = typeof getActivePricingPackages === 'function' ? getActivePricingPackages() : PRICING_PACKAGES;
  const guaranteeText = isEn 
    ? "50% deposit to start • Remaining 50% only when 100% satisfied"
    : "৫০% অ্যাডভান্সে শুরু • বাকি কাজ সন্তোষজনক হলে";

  container.innerHTML = packages.map(pkg => `
    <div id="pricing-card-${pkg.id}" class="pricing-package-card relative glass-card glass-card-hover rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 border-[#C8AA76]/25 bg-white/75 hover:border-[#C8AA76]/50 shadow-sm">
      <div>
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-bold text-[#14120D]">${pkg.name}</h3>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30 text-[#14120D]">
            ${pkg.deliveryDays}
          </span>
        </div>
        <p class="text-[#14120D]/70 text-sm mt-2 leading-relaxed min-h-[40px]">
          ${pkg.tagline}
        </p>

        <!-- Price display -->
        <div class="mt-6 flex items-baseline gap-2">
          <span class="text-4xl font-extrabold text-[#14120D] font-en">${window.zynI18n ? window.zynI18n.formatPrice(pkg.price) : `৳${formatPriceBn(pkg.price)}`}</span>
        </div>
        <div class="text-xs text-[#14120D]/60 mt-2 flex items-center gap-1.5">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          <span>${guaranteeText}</span>
        </div>

        <div class="w-full h-px bg-[#C8AA76]/20 my-6"></div>

        <!-- Features list -->
        <ul class="space-y-3.5">
          ${pkg.features.map(f => `
            <li class="flex items-start gap-3 text-sm ${f.included ? 'text-[#14120D]' : 'text-slate-400'}">
              <div class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                f.included ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-400'
              }">
                <i data-lucide="${f.included ? 'check' : 'x'}" class="w-3 h-3"></i>
              </div>
              <span class="leading-snug">${f.text}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="mt-8 pt-4">
        <button 
          onclick="openOrderModal('${pkg.id}')"
          class="w-full py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] shadow-lg shadow-[#D4AF37]/25 glow-btn cursor-pointer"
        >
          <span>${pkg.ctaText}</span>
          <i data-lucide="arrow-right" class="w-4 h-4 text-[#14120D]"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Render FAQ Accordion
function renderFaqSection() {
  const container = document.getElementById("faq-accordion-container");
  if (!container) return;

  container.innerHTML = FAQ_ITEMS.map((item, idx) => `
    <div class="glass-card rounded-2xl border border-[#C8AA76]/25 bg-white/75 overflow-hidden transition-all duration-200">
      <button 
        onclick="toggleFaq(${idx})"
        class="w-full p-6 text-left flex items-center justify-between gap-4 group focus:outline-none"
      >
        <span class="font-bold text-[#14120D] text-base md:text-lg group-hover:text-[#997530] transition-colors">
          ${item.q}
        </span>
        <div id="faq-icon-${idx}" class="w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#C8AA76]/30 flex items-center justify-center text-[#14120D]/70 group-hover:text-[#14120D] shrink-0 transition-transform duration-200">
          <i data-lucide="plus" class="w-4 h-4"></i>
        </div>
      </button>
      <div id="faq-content-${idx}" class="hidden px-6 pb-6 text-[#14120D]/80 text-sm md:text-base leading-relaxed border-t border-[#C8AA76]/20 pt-4">
        ${item.a}
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }
}

function toggleFaq(index) {
  const content = document.getElementById(`faq-content-${index}`);
  const iconContainer = document.getElementById(`faq-icon-${index}`);
  if (!content) return;

  const isHidden = content.classList.contains("hidden");
  
  // Close all others
  FAQ_ITEMS.forEach((_, i) => {
    const c = document.getElementById(`faq-content-${i}`);
    const ic = document.getElementById(`faq-icon-${i}`);
    if (c) c.classList.add("hidden");
    if (ic) {
      ic.innerHTML = '<i data-lucide="plus" class="w-4 h-4"></i>';
      ic.classList.remove("rotate-45");
    }
  });

  if (isHidden) {
    content.classList.remove("hidden");
    if (iconContainer) {
      iconContainer.innerHTML = '<i data-lucide="minus" class="w-4 h-4"></i>';
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}

// Animate numbers when scrolled into view
function initStatsObserver() {
  const statsElements = document.querySelectorAll(".counter-stat");
  if (!statsElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        
        // Reset to 0 ONLY at the exact moment the animation triggers in viewport
        const isBn = (window.zynI18n && window.zynI18n.getLanguage() === 'bn');
        const zeroChar = isBn ? "০" : "0";
        el.textContent = `${prefix}${zeroChar}${suffix}`;

        animateValue(el, 0, target, 1500, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statsElements.forEach(el => observer.observe(el));
}

function animateValue(obj, start, end, duration, prefix, suffix) {
  let startTimestamp = null;
  const isDecimal = String(end).includes('.');
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const rawVal = isDecimal 
      ? (progress * (end - start) + start).toFixed(1)
      : Math.floor(progress * (end - start) + start);
    const formatted = window.zynI18n ? window.zynI18n.formatNumber(rawVal) : rawVal;
    obj.textContent = `${prefix}${formatted}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      const finalRaw = isDecimal ? Number(end).toFixed(1) : end;
      const finalFormatted = window.zynI18n ? window.zynI18n.formatNumber(finalRaw) : finalRaw;
      obj.textContent = `${prefix}${finalFormatted}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

// "Which Package is Right for You?" Guided Selector
function highlightPackage(pkgId, btnEl) {
  // Update button active state
  document.querySelectorAll('.guided-pill').forEach(btn => {
    btn.classList.remove('bg-gradient-to-r', 'from-[#F9EED4]', 'via-[#E8CD8C]', 'to-[#D4AF37]', 'text-[#14120D]', 'border-[#C8AA76]', 'shadow-lg', 'shadow-[#D4AF37]/25');
    btn.classList.add('bg-[#FAF9F5]', 'text-[#14120D]/70', 'border-[#C8AA76]/30');
  });
  if (btnEl) {
    btnEl.classList.remove('bg-[#FAF9F5]', 'text-[#14120D]/70', 'border-[#C8AA76]/30');
    btnEl.classList.add('bg-gradient-to-r', 'from-[#F9EED4]', 'via-[#E8CD8C]', 'to-[#D4AF37]', 'text-[#14120D]', 'border-[#C8AA76]', 'shadow-lg', 'shadow-[#D4AF37]/25');
  }

  // Highlight matching card
  const cards = document.querySelectorAll('.pricing-package-card');
  cards.forEach(c => {
    c.classList.remove('ring-4', 'ring-[#D4AF37]', 'scale-[1.03]', 'shadow-2xl');
  });

  const targetCard = document.getElementById(`pricing-card-${pkgId}`);
  if (targetCard) {
    targetCard.classList.add('ring-4', 'ring-[#D4AF37]', 'scale-[1.03]', 'shadow-2xl');
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
window.highlightPackage = highlightPackage;

// ================= PUBLIC ORDER TRACKER =================
let currentTrackedOrder = null;

function openOrderTrackerModal() {
  const modal = document.getElementById("order-tracker-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  if (window.lucide) lucide.createIcons();
}

function closeOrderTrackerModal() {
  const modal = document.getElementById("order-tracker-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

async function handleTrackOrderSubmit(e) {
  if (e) e.preventDefault();
  const orderId = document.getElementById("track-order-id")?.value.trim();
  const phone = document.getElementById("track-client-phone")?.value.trim();
  const errorEl = document.getElementById("tracker-error-msg");
  const resultBox = document.getElementById("tracker-result-box");
  const submitBtn = document.getElementById("tracker-submit-btn");

  if (errorEl) errorEl.classList.add("hidden");
  if (resultBox) resultBox.classList.add("hidden");

  if (!orderId || !phone) {
    if (errorEl) {
      errorEl.textContent = "অনুগ্রহ করে অর্ডার আইডি এবং আপনার ফোন নম্বর প্রদান করুন।";
      errorEl.classList.remove("hidden");
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>যাচাই করা হচ্ছে...</span>`;
  }

  let result = null;
  if (window.zynBackend?.trackOrder) {
    result = await window.zynBackend.trackOrder(orderId, phone);
  } else {
    result = { success: false, message: "ট্র্যাকার সার্ভিস লোড হচ্ছে, কিছুক্ষণ পর চেষ্টা করুন।" };
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i data-lucide="search" class="w-4 h-4"></i><span>অর্ডারের অগ্রগতি দেখুন</span>`;
    if (window.lucide) lucide.createIcons();
  }

  if (!result || !result.success || !result.order) {
    if (errorEl) {
      const isEn = window.zynI18n?.currentLang === 'en';
      errorEl.textContent = result?.message || (isEn ? "No matching order found. Please verify your Order ID and phone number." : "প্রদত্ত তথ্যের সাথে কোনো অর্ডার মিলেনি। সঠিক অর্ডার আইডি ও মোবাইল নম্বর দিন।");
      errorEl.classList.remove("hidden");
    }
    return;
  }

  const order = result.order;
  currentTrackedOrder = order;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const idEl = document.getElementById("trk-order-id");
  const nameEl = document.getElementById("trk-client-name");
  const pkgEl = document.getElementById("trk-package-name");
  const priceEl = document.getElementById("trk-price");

  if (idEl) idEl.textContent = `#${(order.order_id || '').replace(/^#/, '')}`;
  if (nameEl) nameEl.textContent = `${order.client_name || ''} (${order.business_name || ''})`;
  if (pkgEl) pkgEl.textContent = order.package_name || (isEn ? 'Website Package' : 'ওয়েবসাইট প্যাকেজ');
  if (priceEl) priceEl.textContent = window.zynI18n ? window.zynI18n.formatPrice(order.price) : `৳${formatPriceBn(order.price || 0)}`;

  const waBtn = document.getElementById("trk-whatsapp-btn");
  if (waBtn) {
    const waText = encodeURIComponent(isEn 
      ? `Hello ZynSite, I am following up on the status of my order #${order.order_id}.`
      : `হ্যালো ZynSite, আমি আমার অর্ডার #${order.order_id} সম্পর্কে জানতে চাচ্ছি।`
    );
    waBtn.href = `https://wa.me/40774119870?text=${waText}`;
  }

  updateTrackerStepper(order.status || 'pending');

  if (resultBox) resultBox.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function updateTrackerStepper(status) {
  const stepperContainer = document.getElementById("tracker-stepper");
  if (!stepperContainer) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const stages_bn = [
    { key: "pending", title: "১. অর্ডার গৃহীত হয়েছে", desc: "১৫ মিনিটের মধ্যে ফ্রি কল ব্যাক ও স্ট্র্যাটেজি আলোচনা।" },
    { key: "contacted", title: "২. কনসালটেশন ও রিকোয়ারমেন্ট চূড়ান্ত", desc: "কাজের পরিধি ও ডেমো লেআউট চূড়ান্ত করা হয়েছে।" },
    { key: "in_progress", title: "৩. ডেভেলপমেন্ট ও টেস্টিং চলছে", desc: "কোডিং, পিক্সেল CAPI ও কুরিয়ার ইন্টিগ্রেশন চলমান (৪৮-৭২ ঘণ্টা ডেলিভারি মোড)।" },
    { key: "completed", title: "৪. প্রজেক্ট ডেলিভার্ড ও লাইভ!", desc: "ওয়েবসাইট আপনার ডোমেইনে সফলভাবে লাইভ এবং হ্যান্ডওভার সম্পন্ন।" }
  ];

  const stages_en = [
    { key: "pending", title: "1. Order Received", desc: "Kickoff review & strategy consultation call within 15 minutes." },
    { key: "contacted", title: "2. Scope & Design Finalized", desc: "Technical specifications, prototype & milestones approved." },
    { key: "in_progress", title: "3. Full-Stack Development", desc: "Core coding, tracking CAPI & courier APIs active (48–72h delivery mode)." },
    { key: "completed", title: "4. Delivered & Live!", desc: "Website deployed to your domain, tested, and handed over." }
  ];

  const stages = isEn ? stages_en : stages_bn;
  const statusOrder = ["pending", "contacted", "in_progress", "completed"];
  let currentIndex = statusOrder.indexOf(status);
  if (currentIndex === -1) currentIndex = 0;

  stepperContainer.innerHTML = stages.map((st, idx) => {
    const isDone = idx < currentIndex || (status === 'completed' && idx <= currentIndex);
    const isCurrent = idx === currentIndex && status !== 'completed';

    let circleClass = "bg-[#FAF9F5] text-slate-400 border-[#C8AA76]/30";
    let iconName = "clock";
    let badgeText = isEn ? "Pending" : "অপেক্ষমান";
    let badgeClass = "bg-[#FAF9F5] text-[#14120D]/60 border border-[#C8AA76]/20";

    if (isDone) {
      circleClass = "bg-emerald-50 text-emerald-700 border-emerald-300";
      iconName = "check";
      badgeText = isEn ? "Completed" : "সম্পন্ন";
      badgeClass = "bg-emerald-50 text-emerald-700 border border-emerald-300";
    } else if (isCurrent) {
      circleClass = "bg-[#E8CD8C]/20 text-[#997530] border-[#C8AA76] ring-2 ring-[#C8AA76]/30 animate-pulse";
      iconName = "loader-2";
      badgeText = isEn ? "Active" : "চলমান";
      badgeClass = "bg-[#E8CD8C]/20 text-[#997530] font-bold border border-[#C8AA76]/40";
    }

    return `
      <div class="p-3.5 rounded-2xl bg-[#FAF9F5] border ${isCurrent ? 'border-[#C8AA76] bg-[#E8CD8C]/10' : 'border-[#C8AA76]/20'} flex items-start gap-3.5 transition-all">
        <div class="w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${circleClass}">
          <i data-lucide="${iconName}" class="w-4 h-4 ${isCurrent ? 'animate-spin' : ''}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h5 class="text-sm font-bold ${isDone || isCurrent ? 'text-[#14120D]' : 'text-slate-400'}">${st.title}</h5>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeClass}">${badgeText}</span>
          </div>
          <p class="text-xs text-[#14120D]/70 mt-1 leading-relaxed">${st.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

function downloadTrackedOrderInvoice() {
  if (currentTrackedOrder && window.zynBackend?.generatePrintableInvoice) {
    window.zynBackend.generatePrintableInvoice(currentTrackedOrder);
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeOrderTrackerModal();
  }
});

// Window global exposures
window.renderPricingPackages = renderPricingPackages;
window.renderFaqSection = renderFaqSection;
window.toggleFaq = toggleFaq;
window.highlightPackage = highlightPackage;
window.openOrderTrackerModal = openOrderTrackerModal;
window.closeOrderTrackerModal = closeOrderTrackerModal;
window.handleTrackOrderSubmit = handleTrackOrderSubmit;
window.downloadTrackedOrderInvoice = downloadTrackedOrderInvoice;
window.toggleMobileMenu = toggleMobileMenu;
window.initGlowCardObserver = initGlowCardObserver;
