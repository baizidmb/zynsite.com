/**
 * Portfolio Showcase & Interactive Device Preview
 * Fully localized for Bengali and English
 */

let currentPortfolioCategory = "all";
let currentPreviewDevice = "desktop";
let activeSelectedProject = null;

function initPortfolio() {
  renderPortfolioGrid();
}

function filterPortfolio(category) {
  currentPortfolioCategory = category;

  // Update tabs
  const tabs = document.querySelectorAll(".portfolio-tab-btn");
  tabs.forEach(tab => {
    if (tab.dataset.cat === category) {
      tab.classList.remove("text-slate-700", "border-[#C8AA76]/25", "bg-white/60");
      tab.classList.add("text-[#14120D]", "border-[#B38F48]", "bg-[#FAF6EE]", "shadow-xs");
    } else {
      tab.classList.remove("text-[#14120D]", "border-[#B38F48]", "bg-[#FAF6EE]", "shadow-xs");
      tab.classList.add("text-slate-700", "border-[#C8AA76]/25", "bg-white/60");
    }
  });

  renderPortfolioGrid();
}

function renderPortfolioGrid() {
  const container = document.getElementById("portfolio-grid");
  if (!container) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  const projects = typeof getActivePortfolio === 'function' ? getActivePortfolio() : PORTFOLIO_PROJECTS;
  const filtered = currentPortfolioCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === currentPortfolioCategory);

  container.innerHTML = filtered.map(item => `
    <div class="glass-card glass-card-hover rounded-2xl overflow-hidden group flex flex-col justify-between border border-[#C8AA76]/30">
      <!-- Thumbnail & Badge -->
      <div class="relative overflow-hidden aspect-[16/10] bg-[#F5F2EB]">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
        <div class="absolute top-3 left-3">
          <span class="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
            ${item.badge}
          </span>
        </div>
        <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
          <span class="flex items-center gap-1 font-semibold text-white drop-shadow-sm">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-300"></i> ${item.stats.loadSpeed} ${isEn ? 'load' : 'লোড'}
          </span>
          <span class="flex items-center gap-1 font-semibold text-emerald-300 drop-shadow-sm">
            <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> ${item.stats.salesGrowth}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span class="text-xs font-semibold uppercase tracking-wider text-[#B38F48] font-en">
            ${getCategoryName(item.category)}
          </span>
          <h3 class="text-xl font-bold text-[#14120D] mt-1 group-hover:text-[#B38F48] transition-colors">
            ${item.title}
          </h3>
          <p class="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
            ${item.tagline}
          </p>

          <!-- Feature tags -->
          <div class="flex flex-wrap gap-1.5 mt-4">
            ${item.features.slice(0, 3).map(f => `
              <span class="text-[11px] px-2.5 py-0.5 rounded-md bg-white/80 text-slate-700 border border-[#C8AA76]/30">
                ${f}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-6 mt-4 border-t border-[#C8AA76]/25 flex items-center justify-between gap-3">
          <button 
            onclick="openProjectModal('${item.id}')"
            class="text-xs font-bold text-[#14120D] hover:text-[#B38F48] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>${isEn ? 'Case Study & Preview' : 'কেস স্টাডি ও প্রিভিউ'}</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-[#B38F48]"></i>
          </button>
          
          <button 
            onclick="openOrderWithTemplate('${item.title}', '${item.category}')"
            class="text-xs px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF4DC] hover:to-[#E8CD8C] text-[#14120D] border border-white/70 shadow-sm transition-all font-bold cursor-pointer glow-btn"
          >
            ${isEn ? 'I Want Similar Site' : 'এমন সাইট চাই'}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    lucide.createIcons();
  }

  if (typeof window.reobserveGlowCards === 'function') {
    window.reobserveGlowCards();
  }
}

function getCategoryName(cat) {
  const isEn = window.zynI18n?.currentLang === 'en';
  if (isEn) {
    switch (cat) {
      case 'f-commerce': return 'Landing Page Funnel';
      case 'corporate': return 'Corporate Business Portal';
      case 'personal': return 'Personal Brand & Executive';
      case 'ecommerce': return 'E-Commerce Storefront';
      default: return 'Custom Website';
    }
  }

  switch (cat) {
    case 'f-commerce': return 'এফ-কমার্স ল্যান্ডিং পেজ';
    case 'corporate': return 'কর্পোরেট ওয়েবসাইট';
    case 'personal': return 'পার্সোনাল পোর্টফোলিও';
    case 'ecommerce': return 'ই-কমার্স স্টোর';
    default: return 'ওয়েবসাইট';
  }
}

function renderLiveStorefrontUI() {
  const isEn = window.zynI18n?.currentLang === 'en';
  return `
    <div class="w-full h-full bg-slate-950 flex flex-col overflow-y-auto text-left selection:bg-amber-500/30 selection:text-amber-200">
      <!-- Flash Sale Notification Bar -->
      <div class="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-600 py-1.5 px-3 text-center text-[11px] font-bold text-white tracking-wide shrink-0">
        <span>${isEn ? '🔥 Flash Sale - 40% OFF | Free Express Delivery Ends in 2 Hours!' : '🔥 ফ্ল্যাশ সেল - ৪০% ছাড় | ফ্রি ক্যাশ-অন-ডেলিভারি অফার আর মাত্র ২ ঘণ্টা!'}</span>
      </div>

      <!-- Store Navbar -->
      <div class="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs shadow-md">
            <i data-lucide="sparkles" class="w-4 h-4 text-slate-950"></i>
          </div>
          <div>
            <span class="text-sm font-black text-white font-en tracking-wider">${isEn ? 'Aura Luxe & Co.' : 'অরা লাক্স (Aura Luxe)'}</span>
            <span class="block text-[9px] text-amber-400 font-semibold tracking-widest uppercase font-en">${isEn ? 'Paris • Dubai • Dhaka' : 'লাক্সারি পারফিউমারি'}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-medium">
            <i data-lucide="shield-check" class="w-3 h-3"></i>
            <span>${isEn ? '100% Authentic' : '১০০% অরিজিনাল'}</span>
          </span>
          <div class="relative p-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs">
            <i data-lucide="shopping-bag" class="w-4 h-4 text-amber-400"></i>
            <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center font-en">1</span>
          </div>
        </div>
      </div>

      <!-- Store Main Body -->
      <div class="p-4 sm:p-6 flex-1 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          
          <!-- Product Showcase Card -->
          <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 relative overflow-hidden group">
            <div class="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950 flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80" alt="Aura Royal Oud & Saffron Elixir" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-2 left-2 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow font-en">
                ★ BEST SELLER
              </div>
              <div class="absolute top-2 right-2 bg-rose-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow animate-pulse font-en">
                -40% OFF
              </div>
            </div>

            <div class="mt-3 space-y-2">
              <div class="flex items-center gap-1 text-amber-400 text-xs">
                <div class="flex">★★★★★</div>
                <span class="text-slate-400 text-[11px] font-medium font-en">4.9 (428 ${isEn ? 'Reviews' : 'রিভিউ'})</span>
              </div>

              <h4 class="text-base font-black text-white font-en">${isEn ? 'Aura Royal Oud & Saffron Elixir (100ml)' : 'অরা রয়্যাল উদ অ্যান্ড স্যাফরন এলিক্সির (১০০ মিলি)'}</h4>
              
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-black text-amber-400 font-en">${isEn ? '$29' : '৳১,৪৫০'}</span>
                <span class="text-xs text-slate-500 line-through font-en">${isEn ? '$48' : '৳২,৪০০'}</span>
                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-en">${isEn ? 'Save 40%' : '৪০% ছাড়'}</span>
              </div>

              <p class="text-xs text-slate-400 leading-relaxed">
                ${isEn ? 'Handcrafted luxury fragrance with rich Agarwood, saffron, ambergris, and French damask rose. Lasts 18+ hours.' : 'আগর কাঠ, জাফরান, অ্যাম্বারগ্রিস ও দামাস্ক গোলাপের রাজকীয় মিশ্রণে তৈরি। পোশাক ও ত্বকে ১৮ ঘণ্টারও বেশি সময় স্থায়ী সুবাস।'}
              </p>

              <div class="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div class="flex items-center gap-1.5">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>
                  <span>${isEn ? 'Long Lasting (18h+)' : '১৮+ ঘণ্টা লং-লাস্টিং'}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i data-lucide="truck" class="w-3.5 h-3.5 text-blue-400 shrink-0"></i>
                  <span>${isEn ? 'Cash on Delivery' : 'ক্যাশ অন ডেলিভারি'}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i data-lucide="repeat" class="w-3.5 h-3.5 text-amber-400 shrink-0"></i>
                  <span>${isEn ? '3-Day Easy Return' : '৩ দিনের ইজি রিটার্ন'}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <i data-lucide="flame" class="w-3.5 h-3.5 text-rose-400 shrink-0"></i>
                  <span class="text-rose-400 font-medium">${isEn ? 'Only 7 Left' : 'স্টক মাত্র ৭টি বাকি'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 1-Click COD Checkout Form / Confirmation Toast -->
          <div id="live-store-checkout-box" class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 relative">
            <div id="live-store-form-state">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h5 class="text-sm font-black text-white flex items-center gap-1.5">
                    <i data-lucide="zap" class="w-4 h-4 text-amber-400 fill-amber-400"></i>
                    <span>${isEn ? '1-Click Fast COD Checkout' : '১-ক্লিক ক্যাশ অন ডেলিভারি চেকআউট'}</span>
                  </h5>
                  <p class="text-[11px] text-slate-400 mt-0.5">${isEn ? 'No advance required • Pay when parcel arrives' : 'কোনো অগ্রিম পেমেন্ট নেই • পণ্য হাতে পেয়ে টাকা দিন'}</p>
                </div>
                <span class="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-en">${isEn ? 'Instant Dispatch' : 'দ্রুত ডেলিভারি'}</span>
              </div>

              <form onsubmit="handleLivePreviewSubmit(event)" class="mt-4 space-y-3">
                <div>
                  <label class="block text-[11px] font-semibold text-slate-300 mb-1">${isEn ? 'Your Full Name:' : 'আপনার সম্পূর্ণ নাম:'}</label>
                  <input type="text" id="demo-buyer-name" required placeholder="${isEn ? 'e.g. Tanvir Hassan' : 'যেমন: মোঃ তানভীর হাসান'}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" value="${isEn ? 'Tanvir Hassan' : 'মোঃ তানভীর হাসান'}" />
                </div>

                <div>
                  <label class="block text-[11px] font-semibold text-slate-300 mb-1">${isEn ? 'Mobile Number:' : 'মোবাইল নম্বর:'}</label>
                  <input type="tel" id="demo-buyer-phone" required placeholder="${isEn ? '017XXXXXXXX' : '০১XXXXXXXXX'}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-en" value="01712345678" />
                </div>

                <div>
                  <label class="block text-[11px] font-semibold text-slate-300 mb-1">${isEn ? 'Delivery Address:' : 'সম্পূর্ণ ডেলিভারি ঠিকানা:'}</label>
                  <input type="text" id="demo-buyer-address" required placeholder="${isEn ? 'House, Road, Area, City' : 'বাসা নং, রোড, থানা ও জেলা'}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500" value="${isEn ? 'House 14, Road 5, Uttara, Dhaka' : 'বাড়ি ১৪, রোড ৫, সেক্টর ৩, উত্তরা, ঢাকা'}" />
                </div>

                <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-[11px]">
                  <div class="flex items-center justify-between text-slate-400">
                    <span>${isEn ? 'Subtotal' : 'সাবটোটাল'}:</span>
                    <span class="font-en text-slate-200 font-medium">${isEn ? '$29' : '৳১,৪৫০'}</span>
                  </div>
                  <div class="flex items-center justify-between text-slate-400">
                    <span>${isEn ? 'Delivery Fee' : 'ডেলিভারি চার্জ'}:</span>
                    <span class="text-emerald-400 font-semibold font-en">${isEn ? 'FREE ($0)' : 'ফ্রি (৳০)'}</span>
                  </div>
                  <div class="pt-1.5 border-t border-slate-800 flex items-center justify-between font-bold text-white">
                    <span>${isEn ? 'Total Payable Amount' : 'মোট প্রদেয় বিল'}:</span>
                    <span class="font-en text-amber-400 text-sm">${isEn ? '$29' : '৳১,৪৫০'}</span>
                  </div>
                </div>

                <button type="submit" class="w-full py-3 rounded-xl font-black text-xs bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all cursor-pointer">
                  <i data-lucide="check-circle" class="w-4 h-4"></i>
                  <span>${isEn ? 'Confirm Order Now (Cash on Delivery)' : 'অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)'}</span>
                </button>
              </form>
            </div>

            <!-- Success Toast / Confirmation View -->
            <div id="live-store-success-state" class="hidden text-center py-6 px-2 space-y-3">
              <div class="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                <i data-lucide="check-check" class="w-6 h-6"></i>
              </div>
              <div>
                <h5 class="text-base font-black text-white">${isEn ? '🎉 Order Placed Successfully!' : '🎉 অভিনন্দন! অর্ডার কনফার্ম হয়েছে!'}</h5>
                <p class="text-xs text-emerald-400 font-bold font-en mt-1">${isEn ? 'Order Tracking ID: #ALX-9821' : 'অর্ডার ট্র্যাকিং আইডি: #ALX-9821'}</p>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                ${isEn ? 'Thank you! Your cash-on-delivery order has been received. Our delivery representative will contact you shortly.' : 'ধন্যবাদ! আপনার ক্যাশ-অন-ডেলিভারি অর্ডারটি গ্রহণ করা হয়েছে। দ্রুত পার্সেল ডেলিভারির জন্য আমাদের প্রতিনিধি কল করবেন।'}
              </p>
              <div class="pt-2">
                <button type="button" onclick="resetLivePreviewStore()" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
                  ${isEn ? 'Test Another Order' : 'আরেকটি টেস্ট অর্ডার দিন'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

function handleLivePreviewSubmit(e) {
  if (e) e.preventDefault();
  const formState = document.getElementById("live-store-form-state");
  const successState = document.getElementById("live-store-success-state");
  if (formState && successState) {
    formState.classList.add("hidden");
    successState.classList.remove("hidden");
    if (typeof confetti === 'function') {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
    if (window.lucide) lucide.createIcons();
  }
}

function resetLivePreviewStore() {
  const formState = document.getElementById("live-store-form-state");
  const successState = document.getElementById("live-store-success-state");
  if (formState && successState) {
    successState.classList.add("hidden");
    formState.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }
}

function openProjectModal(projectId) {
  const projects = typeof getActivePortfolio === 'function' ? getActivePortfolio() : PORTFOLIO_PROJECTS;
  const project = projects.find(p => p.id === projectId) || projects[0];
  if (!project) return;

  activeSelectedProject = project;
  const modal = document.getElementById("project-modal");
  if (!modal) return;

  document.getElementById("modal-project-title").textContent = project.title;
  document.getElementById("modal-project-tagline").textContent = project.tagline;
  document.getElementById("modal-project-badge").textContent = project.badge;
  document.getElementById("modal-project-category").textContent = getCategoryName(project.category);
  document.getElementById("modal-project-client").textContent = project.clientInfo;
  document.getElementById("modal-project-quote").textContent = project.quote;
  document.getElementById("modal-project-speed").textContent = project.stats.loadSpeed;
  document.getElementById("modal-project-sales").textContent = project.stats.salesGrowth;
  document.getElementById("modal-project-cvr").textContent = project.stats.conversionRate;

  // Features list
  const featContainer = document.getElementById("modal-project-features");
  if (featContainer) {
    featContainer.innerHTML = project.features.map(f => `
      <li class="flex items-center gap-2 text-sm text-slate-300">
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400 shrink-0"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // Interactive Live Storefront or Mockup Image
  const frame = document.getElementById("preview-frame-wrapper");
  if (frame) {
    if (project.id === "aura-luxe" || !project.fullMockup) {
      frame.innerHTML = renderLiveStorefrontUI();
    } else {
      frame.innerHTML = `
        <img 
          id="modal-project-img" 
          src="${project.fullMockup || project.image}" 
          alt="${project.title}" 
          class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
        />
      `;
    }
  }

  // Reset device frame view to desktop
  setPreviewDevice("desktop");

  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";

  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeProjectModal() {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeProjectModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("project-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }
});

function setPreviewDevice(deviceType) {
  currentPreviewDevice = deviceType;
  const frame = document.getElementById("preview-frame-wrapper");
  const buttons = document.querySelectorAll(".device-toggle-btn");

  buttons.forEach(btn => {
    if (btn.dataset.device === deviceType) {
      btn.classList.remove("text-slate-400", "bg-transparent");
      btn.classList.add("text-blue-400", "bg-slate-800");
    } else {
      btn.classList.add("text-slate-400", "bg-transparent");
      btn.classList.remove("text-blue-400", "bg-slate-800");
    }
  });

  if (frame) {
    frame.className = "transition-all duration-400 mx-auto overflow-hidden relative shadow-2xl ";
    if (deviceType === "desktop") {
      frame.classList.add("device-frame-desktop");
    } else if (deviceType === "tablet") {
      frame.classList.add("device-frame-tablet");
    } else if (deviceType === "mobile") {
      frame.classList.add("device-frame-mobile");
    }
  }
}

function openOrderWithTemplate(projectTitle, category) {
  let pkgId = "pkg-f-commerce";
  if (category === "corporate") pkgId = "pkg-business-pro";
  if (category === "personal") pkgId = "pkg-personal-brand";
  if (category === "ecommerce") pkgId = "pkg-full-ecommerce";

  closeProjectModal();
  openOrderModal(pkgId);

  const isEn = window.zynI18n?.currentLang === 'en';
  const notesField = document.getElementById("order-notes");
  if (notesField) {
    notesField.value = isEn 
      ? `Portfolio Reference: Interested in a modern design and feature set similar to ${projectTitle}.`
      : `পোর্টফোলিও রেফারেন্স: ${projectTitle} এর মতো একই রকম আধুনিক স্টাইল ও ফিচার প্রয়োজন।`;
  }
}

// Window global exposures
window.initPortfolio = initPortfolio;
window.filterPortfolio = filterPortfolio;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.setPreviewDevice = setPreviewDevice;
window.openOrderWithTemplate = openOrderWithTemplate;
window.renderLiveStorefrontUI = renderLiveStorefrontUI;
window.handleLivePreviewSubmit = handleLivePreviewSubmit;
window.resetLivePreviewStore = resetLivePreviewStore;
