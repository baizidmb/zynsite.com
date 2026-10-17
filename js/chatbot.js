/**
 * ZynBot - Bilingual AI Sales & Support Assistant for ZynSite (zynsite.com)
 * Handles automated intent matching (BN, EN, Banglish), lead capture,
 * WhatsApp dynamic handoff, and quick-reply chips.
 */

(function () {
  'use strict';

  class ZynBotController {
    constructor() {
      this.isOpen = false;
      this.isTyping = false;
      this.messages = [];
      this.tooltipTimer = null;
      this.whatsappNumber = "40774119870";
    }

    init() {
      this.cacheDOMElements();
      this.bindEvents();
      this.renderQuickChips();
      this.loadSession();
    }

    cacheDOMElements() {
      this.widget = document.getElementById('zynbot-widget');
      this.windowEl = document.getElementById('zynbot-window');
      this.tooltipEl = document.getElementById('zynbot-tooltip');
      this.feedEl = document.getElementById('zynbot-feed');
      this.chipsEl = document.getElementById('zynbot-chips');
      this.inputEl = document.getElementById('zynbot-input');
      this.iconBot = document.getElementById('zynbot-icon-bot');
      this.iconClose = document.getElementById('zynbot-icon-close');
    }

    bindEvents() {
      // Escape key to close window
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggle(false);
        }
      });
    }

    scheduleTooltip() {
      // Disabled - user requested modern icon only, no floating text tooltip
    }

    dismissTooltip() {
      if (this.tooltipEl) {
        this.tooltipEl.classList.add('hidden');
      }
    }

    toggle(forceState) {
      this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;

      if (this.isOpen) {
        this.dismissTooltip();
        if (this.windowEl) {
          this.windowEl.classList.remove('hidden');
          this.windowEl.classList.add('flex');
        }
        if (this.iconBot) this.iconBot.classList.add('hidden');
        if (this.iconClose) this.iconClose.classList.remove('hidden');

        // Render initial welcome if empty
        if (this.messages.length === 0) {
          this.appendWelcomeMessage();
        }

        setTimeout(() => {
          if (this.inputEl) this.inputEl.focus();
          this.scrollToBottom();
        }, 100);
      } else {
        if (this.windowEl) {
          this.windowEl.classList.add('hidden');
          this.windowEl.classList.remove('flex');
        }
        if (this.iconBot) this.iconBot.classList.remove('hidden');
        if (this.iconClose) this.iconClose.classList.add('hidden');
      }
    }

    resetChat() {
      this.messages = [];
      try {
        sessionStorage.removeItem('zyn_bot_history');
      } catch (e) {}
      if (this.feedEl) this.feedEl.innerHTML = '';
      this.appendWelcomeMessage();
    }

    appendWelcomeMessage() {
      const welcomeText = window.zynI18n ? window.zynI18n.t('bot_welcome_msg') : '';
      this.addMessage('bot', welcomeText, false);
    }

    saveSession() {
      try {
        sessionStorage.setItem('zyn_bot_history', JSON.stringify(this.messages.slice(-20)));
      } catch (e) {}
    }

    loadSession() {
      try {
        const saved = sessionStorage.getItem('zyn_bot_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.messages = parsed;
            this.messages.forEach(msg => this.renderMessageDOM(msg));
            return;
          }
        }
      } catch (e) {}
    }

    addMessage(sender, text, persist = true) {
      const msg = { sender, text, timestamp: Date.now() };
      this.messages.push(msg);
      this.renderMessageDOM(msg);
      if (persist) this.saveSession();
      this.scrollToBottom();
    }

    renderMessageDOM(msg) {
      if (!this.feedEl) return;
      const isUser = msg.sender === 'user';
      const msgRow = document.createElement('div');
      msgRow.className = `flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`;

      if (isUser) {
        msgRow.innerHTML = `
          <div class="max-w-[85%] bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] text-[#14120D] font-medium rounded-2xl rounded-br-xs px-3.5 py-2.5 shadow-md shadow-[#D4AF37]/20 border border-[#C8AA76]/30 leading-relaxed break-words">
            ${this.escapeHTML(msg.text)}
          </div>
        `;
      } else {
        msgRow.innerHTML = `
          <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] flex items-center justify-center text-[#14120D] shrink-0 shadow-xs mb-1 border border-[#C8AA76]/30">
            <i data-lucide="bot" class="w-3.5 h-3.5 text-[#14120D]"></i>
          </div>
          <div class="max-w-[88%] bg-white/95 border border-[#C8AA76]/30 text-[#14120D] rounded-2xl rounded-bl-xs px-3.5 py-2.5 shadow-md leading-relaxed space-y-2 break-words">
            ${msg.text}
          </div>
        `;
      }

      this.feedEl.appendChild(msgRow);
      if (window.lucide) lucide.createIcons({ root: msgRow });
    }

    showTypingIndicator() {
      if (this.isTyping || !this.feedEl) return;
      this.isTyping = true;
      const typingEl = document.createElement('div');
      typingEl.id = 'zynbot-typing-indicator';
      typingEl.className = 'flex items-center gap-2 justify-start animate-fade-in';
      typingEl.innerHTML = `
        <div class="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] flex items-center justify-center text-[#14120D] shrink-0 mb-1 border border-[#C8AA76]/30">
          <i data-lucide="bot" class="w-3.5 h-3.5 text-[#14120D]"></i>
        </div>
        <div class="py-2.5 px-3.5 bg-white/95 border border-[#C8AA76]/30 rounded-2xl rounded-bl-xs flex items-center gap-1.5 shadow-md">
          <span class="zynbot-typing-dot"></span>
          <span class="zynbot-typing-dot"></span>
          <span class="zynbot-typing-dot"></span>
        </div>
      `;
      this.feedEl.appendChild(typingEl);
      if (window.lucide) lucide.createIcons({ root: typingEl });
      this.scrollToBottom();
    }

    hideTypingIndicator() {
      this.isTyping = false;
      const typingEl = document.getElementById('zynbot-typing-indicator');
      if (typingEl) typingEl.remove();
    }

    scrollToBottom() {
      if (this.feedEl) {
        this.feedEl.scrollTop = this.feedEl.scrollHeight;
      }
    }

    escapeHTML(str) {
      if (!str) return '';
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    renderQuickChips() {
      if (!this.chipsEl) return;
      const t = (k) => (window.zynI18n ? window.zynI18n.t(k) : k);

      const chips = [
        { key: 'bot_chip_pricing' },
        { key: 'bot_chip_demo' },
        { key: 'bot_chip_funnel' },
        { key: 'bot_chip_fraud' },
        { key: 'bot_chip_terms' },
        { key: 'bot_chip_brief' },
        { key: 'bot_chip_whatsapp' }
      ];

      this.chipsEl.innerHTML = chips.map(chip => `
        <button 
          type="button" 
          onclick="window.zynBotChipTrigger('${chip.key}')" 
          class="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF9F5] hover:bg-[#E8CD8C]/20 text-[#14120D] border border-[#C8AA76]/30 hover:border-[#C8AA76] transition-all cursor-pointer select-none active:scale-95"
        >
          ${t(chip.key)}
        </button>
      `).join('');
    }

    getQuickActionButtonsHTML(isEn) {
      const waMsg = isEn 
        ? encodeURIComponent("Hello ZynSite, I want to discuss building a high-converting website.")
        : encodeURIComponent("হ্যালো ZynSite, আমি একটি আধুনিক ওয়েবসাইট প্রজেক্ট নিয়ে কথা বলতে চাই।");
      
      if (isEn) {
        return `
          <div class="mt-3 pt-2.5 border-t border-[#C8AA76]/20 flex flex-wrap items-center gap-1.5">
            <button type="button" onclick="window.zynBotScrollTo('#pricing')" class="px-2.5 py-1 bg-[#FAF9F5] hover:bg-white text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-xs">
              💰 Pricing & Plans
            </button>
            <button type="button" onclick="window.openAuraLuxeDemo()" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] text-[#14120D] border border-[#C8AA76]/40 rounded-lg text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs glow-btn">
              ✨ Live Demo (Aura Luxe)
            </button>
            <a href="https://wa.me/${this.whatsappNumber}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1 cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>WhatsApp</span>
            </a>
          </div>
        `;
      } else {
        return `
          <div class="mt-3 pt-2.5 border-t border-[#C8AA76]/20 flex flex-wrap items-center gap-1.5">
            <button type="button" onclick="window.zynBotScrollTo('#pricing')" class="px-2.5 py-1 bg-[#FAF9F5] hover:bg-white text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer shadow-xs">
              💰 প্যাকেজ ও দাম
            </button>
            <button type="button" onclick="window.openAuraLuxeDemo()" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] text-[#14120D] border border-[#C8AA76]/40 rounded-lg text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-xs glow-btn">
              ✨ লাইভ ডেমো (Aura Luxe)
            </button>
            <a href="https://wa.me/${this.whatsappNumber}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all hover:scale-105 flex items-center gap-1 cursor-pointer">
              <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
              <span>হোয়াটসঅ্যাপ</span>
            </a>
          </div>
        `;
      }
    }

    handleChipClick(topic) {
      const lang = window.zynI18n ? window.zynI18n.currentLang : 'bn';
      let promptText = '';
      if (topic === 'pricing') {
        promptText = lang === 'en' ? 'What are your website packages and pricing?' : 'ওয়েবসাইটের প্যাকেজ ও দাম কত?';
      } else if (topic === 'funnel') {
        promptText = lang === 'en' ? 'What is the 1-Click COD Landing Page?' : '১-ক্লিক ক্যাশ-অন-ডেলিভারি ল্যান্ডিং পেজ কী?';
      } else if (topic === 'fraud') {
        promptText = lang === 'en' ? 'How does ZynSite prevent fake orders & courier fraud?' : 'ফেইক অর্ডার ও কুরিয়ার রিটার্ন কীভাবে থামাবে?';
      } else if (topic === 'terms') {
        promptText = lang === 'en' ? 'What are the payment terms and delivery timeline?' : 'পেমেন্ট নিয়ম ও ডেলিভারি সময় কত দিন?';
      } else if (topic === 'brief') {
        promptText = lang === 'en' ? 'I want to submit a custom website project brief' : 'আমি একটি কাস্টম ওয়েবসাইট প্রজেক্ট শুরু করতে চাই';
      }

      this.processUserMessage(promptText);
    }

    handleWhatsAppDirect() {
      const lang = window.zynI18n ? window.zynI18n.currentLang : 'bn';
      const text = lang === 'en' 
        ? 'Hello ZynSite, I am interested in building a high-converting website and want to discuss details.'
        : 'হ্যালো ZynSite, আমি ওয়েবসাইট বানাতে আগ্রহী এবং সরাসরি বিস্তারিত জানতে চাই।';
      window.open(`https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    }

    handleSubmit(e) {
      if (e) e.preventDefault();
      if (!this.inputEl) return;
      const text = this.inputEl.value.trim();
      if (!text) return;
      this.inputEl.value = '';
      this.processUserMessage(text);
    }

    processUserMessage(text) {
      this.addMessage('user', text);
      this.showTypingIndicator();

      setTimeout(() => {
        this.hideTypingIndicator();
        const responseHTML = this.matchIntent(text);
        this.addMessage('bot', responseHTML);
        this.renderQuickChips(); // Retain dynamic quick-reply state at bottom of window
      }, 500);
    }

    matchIntent(query) {
      const q = query.toLowerCase().trim();
      const lang = window.zynI18n ? window.zynI18n.currentLang : 'bn';
      const isEn = lang === 'en';

      // Small-Talk A: Bot Name & Identity ("তোমার নাম কি", "whats your name", "who are you", "কে তুমি", "tumi ke")
      if (/(what('?s| is) (your|ur) name|who (are|r) you|who (are|r) u|your name|ur name|who made (you|u)|bot name|identity|তোমার নাম (কি|কী)|(কে তুমি|তুমি কে|আপনি কে)|আপনার নাম (কি|কী)|বট(ের| এর)? নাম (কি|কী)|নাম (কি|কী)|tumi ke|apni ke|tomar na?m ki|apnar na?m ki|na?m ki)/i.test(q)) {
        const text = isEn
          ? "I'm ZynBot! 🤖 ZynSite's official AI assistant here to help you with web design, pricing, 1-click funnels, and automation questions."
          : "আমার নাম ZynBot! 🤖 আমি ZynSite-এর অফিশিয়াল এআই অ্যাসিস্ট্যান্ট। ওয়েবসাইট ডিজাইন, প্রাইসিং বা অটোমেশন নিয়ে যেকোনো প্রশ্ন আমাকে করতে পারেন।";
        return `<div><p class="text-[#14120D] leading-relaxed font-medium">${text}</p>${this.getQuickActionButtonsHTML(isEn)}</div>`;
      }

      // Small-Talk B: Compliments & General AI Questions ("good bot", "awesome", "thank you", "ধন্যবাদ", "বাহ")
      if (/(good bot|awesome|great job|thank you|thank u|thanks|thx|cool bot|amazing|well done|helpful|love you|best bot|good job|ধন্যবাদ|অনেক ধন্যবাদ|থ্যাংক|থ্যাঙ্কস|বাহ|দারুণ|দারুন|অনেক সুন্দর|অসাধারণ|সাবাশ|dhonnobad|onek dhonnobad|osadharon|shabash)/i.test(q)
          || (/(nice|cool|love|super|বাহ|bah)\b/i.test(q) && !/(pricing|package|cost|funnel|order|delivery|speed)/i.test(q))) {
        const text = isEn
          ? "Thank you so much! 😊 I'm always here to help you transform your business into an automated sales machine. What else would you like to know?"
          : "অনেক ধন্যবাদ! 😊 আপনার ব্যবসাকে ২৪/৭ সেলস মেশিনে রূপান্তর করতে আমি সব সময় প্রস্তুত। আর কোনো তথ্য কি জানতে চান?";
        return `<div><p class="text-[#14120D] leading-relaxed font-medium">${text}</p>${this.getQuickActionButtonsHTML(isEn)}</div>`;
      }

      // Small-Talk C: Greetings & "How are you?" ("কেমন আছো", "kemon acho", "hello", "hi", "assalamu alaikum", "سلام", "hey")
      if (/(^(hi|hello|hey|hiya|hola|howdy|salam|assalam|assalamu|heya|halo)\b)|(how (are|r) (you|u)|how do you do|how are things|assalamu alaikum|alaikum|কেমন আছো|কেমন আছেন|ভালো আছো|ভালো আছেন|সালাম|আসসালামু আলাইকুম|আসসালামু|হ্যালো|হাই|হে|হেয়|kemon acho|kemon achen|kemon asen|valo acho|valo achen|bhalo acho|bhalo achen|valocen)/i.test(q)) {
        if (!/(price|pricing|cost|package|dam|daam|khoroch|প্যাকেজ|দাম|খরচ|fake|fraud|otp|১-ক্লিক|funnel|courier|order|banate|কুরিয়ার|স্টেডফাস্ট|পাঠাও)/i.test(q)) {
          const text = isEn
            ? "Hello! 😊 I'm doing great, thank you. How can I help you build a high-converting website or landing page for your business today?"
            : "ওয়ালাইকুম আসসালাম! 😊 আমি আলহামদুলিল্লাহ ভালো আছি। বলুন, আপনার ফেসবুক পেজ বা ব্যবসার জন্য কীভাবে একটি আধুনিক ওয়েবসাইট তৈরি করে দিতে পারি?";
          return `<div><p class="text-[#14120D] leading-relaxed font-medium">${text}</p>${this.getQuickActionButtonsHTML(isEn)}</div>`;
        }
      }

      // 1. Fake Order / Fraud Shield / OTP (Prioritized over generic 'order')
      if (/(fake|fraud|shield|otp|return|fraudulent|ফেইক|ভুয়া|রিটার্ন|প্রতারক|ধাপ্পা|কুরিয়ার হিস্ট্রি|লস|loss)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">🛡️ Automated Fake Order & Fraud Shield:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                Uncollected parcel delivery fees are the #1 profit killer for online stores. ZynSite prevents this with:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>Courier History Verification:</b> Analyzes the customer's real parcel success rate across Steadfast/Pathao before accepting.</li>
                <li><b>Smart SMS OTP:</b> Automatically triggers instant OTP verification for flagged or high-risk numbers.</li>
                <li><b>80% Reduction in Returns:</b> Saves thousands in uncollected shipping penalties.</li>
              </ul>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">🛡️ ফেইক অর্ডার ও কুরিয়ার রিটার্ন ফ্রড শিল্ড:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                পার্সেল রিটার্নের ডেলিভারি চার্জ অনলাইন ব্যবসার মার্জিন নষ্ট করে দেয়। ZynSite-এ রয়েছে ইনবিল্ট প্রটেকশন:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>কুরিয়ার হিস্ট্রি চেক:</b> কাস্টমার ইতিপূর্বে কতটি পার্সেল রিসিভ বা রিটার্ন করেছে তা ফর্মেই যাচাই হয়।</li>
                <li><b>অটো এসএমএস ওটিপি (OTP):</b> সন্দেহজনক কাস্টমারদের ক্ষেত্রে ইনস্ট্যান্ট ওটিপি দিয়ে আসল ক্রেতা নিশ্চিত করা হয়।</li>
                <li><b>৮০% পর্যন্ত রিটার্ন কমে:</b> আপনার ডেলিভারি চার্জের শত শত টাকা লস হওয়া বাঁচে।</li>
              </ul>
            </div>
          `;
        }
      }

      // 2. Payment Terms & Delivery Timeline (Prioritized over generic 'delivery')
      if (/(payment|advance|timeline|somoy|koto din|koto shomoy|how long|সময়|পেমেন্ট|অগ্রিম|কত দিন|কত সময়|শর্ত|terms|rules|condition|kobe)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">⏱️ Payment Terms & Delivery Timeline:</p>
              <ul class="text-xs text-[#14120D]/80 space-y-1.5 mb-2">
                <li>⚡ <b>Fast Delivery:</b> Your site goes live within <b>48 to 72 hours</b>.</li>
                <li>🤝 <b>Fair Milestone:</b> 50% advance to start work, 50% only after full inspection & approval.</li>
                <li>🛡️ <b>100% Transparency:</b> Zero hidden costs. 1st year .com domain and cloud hosting included.</li>
              </ul>
              <div class="mt-2">
                <button type="button" onclick="window.zynBotChipTrigger('bot_chip_brief')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">Submit Project Brief</button>
              </div>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">⏱️ পেমেন্ট নিয়ম ও ডেলিভারি সময়সীমা:</p>
              <ul class="text-xs text-[#14120D]/80 space-y-1.5 mb-2">
                <li>⚡ <b>ডেলিভারি স্পিড:</b> মাত্র <b>৪৮ থেকে ৭২ ঘণ্টার মধ্যে</b> সাইট সম্পূর্ণ রেডি ও লাইভ করা হয়।</li>
                <li>🤝 <b>মাইলস্টোন পেমেন্ট:</b> কাজ শুরুর সময় ৫০% অ্যাডভান্স, এবং সাইট সম্পূর্ণ দেখে সন্তুষ্ট হওয়ার পর বাকি ৫০%।</li>
                <li>🛡️ <b>১০০% স্বচ্ছতা:</b> কোনো লুকানো চার্জ নেই। ১ম বছর .com ডোমেইন ও ক্লাউড হোস্টিং সম্পূর্ণ ফ্রি।</li>
              </ul>
              <div class="mt-2">
                <button type="button" onclick="window.zynBotChipTrigger('bot_chip_brief')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">প্রজেক্ট ব্রিফ দিন</button>
              </div>
            </div>
          `;
        }
      }

      // 3. 1-Click Funnel & Speed / LCP
      if (/(1-click|one-click|click funnel|speed|fast|loading|lcp|স্পিড|ফানেল|১-ক্লিক|এক ক্লিক|লোড|রকেট|slow|druto)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">🚀 1-Click Funnel & Speed Advantage:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                Traditional e-commerce loses up to 72% of buyers during cart and registration friction. ZynSite's 1-Click Cash-on-Delivery Funnels eliminate this:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>Single High-Speed Form:</b> Name, Phone & Address completed in seconds.</li>
                <li><b>Sub-1.2s Load Speed:</b> Google PageSpeed score of 95+ reduces bounce rates.</li>
                <li><b>3X Higher Conversion:</b> Tested and proven to multiply Bangladesh F-Commerce sales.</li>
              </ul>
              <div class="mt-2.5">
                <button type="button" onclick="window.zynBotScrollTo('#portfolio')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">View Live Demos</button>
              </div>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">🚀 ১-ক্লিক ফানেল ও রকেট স্পিড কেন দরকার?</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                সাধারণ ই-কমার্স সাইটে কার্ট অ্যাড ও জটিল রেজিস্ট্রেশনের কারণে ৭২% কাস্টমার অর্ডার না করে চলে যায়। ZynSite-এর ১-ক্লিক ফানেলে:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>১-ক্লিক ডিরেক্ট চেকআউট:</b> নাম, ফোন ও ঠিকানা লিখে নিমিষেই ক্যাশ-অন-ডেলিভারি অর্ডার।</li>
                <li><b>১.২ সেকেন্ডের কম লোডিং স্পিড:</b> গুগল পেজস্পিড স্কোর ৯৫+, ফলে ড্রপ-অফ হয় না বললেই চলে।</li>
                <li><b>গড়ে ৩ গুণ বেশি সেলস:</b> বাংলাদেশী ফেসবুক কমার্সে প্রমাণিত সেলস মাল্টিপ্লায়ার।</li>
              </ul>
              <div class="mt-2.5">
                <button type="button" onclick="window.zynBotScrollTo('#portfolio')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">লাইভ ডেমো দেখুন</button>
              </div>
            </div>
          `;
        }
      }

      // 4. Meta Pixel & Server-Side CAPI
      if (/(pixel|capi|tracking|conversion api|meta|facebook|পিক্সেল|ক্যাপি|ট্র্যাকিং|ডাটা লস|ads|বিজ্ঞাপন)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📊 Meta Pixel & Server-Side CAPI Tracking:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                iOS 14+ privacy and ad blockers cause 30–40% loss of tracking data on ordinary websites, hurting ad optimization and ROAS.
              </p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                ZynSite configures direct <b>Server-to-Server Conversion API (CAPI)</b> with event deduplication. You get 100% accurate tracking and high Event Match Quality (EMQ 8.5+), significantly lowering cost-per-purchase on Meta Ads!
              </p>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📊 মেটা পিক্সেল ও সার্ভার-সাইড CAPI ট্র্যাকিং:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                iOS 14+ আপডেট এবং ব্রাউজার অ্যাড ব্লকারের কারণে সাধারণ ব্রাউজার পিক্সেল ৩০-৪০% সেলস ট্র্যাক করতে ব্যর্থ হয়।
              </p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                ZynSite-এ আমরা সরাসরি সার্ভার-টু-সার্ভার <b>Meta Conversion API (CAPI)</b> সেটআপ করি, যার ফলে ১০০% নির্ভুল ডেটা এবং হাই ইভেন্ট ম্যাচ কোয়ালিটি (EMQ 8.5+) পাওয়া যায়—ফলে ফেসবুক বিজ্ঞাপনের খরচ কার্যকরভাবে কমে আসে!
              </p>
            </div>
          `;
        }
      }

      // 5. Courier Automation (Steadfast / Pathao)
      if (/(courier|steadfast|pathao|redx|কুরিয়ার|স্টেডফাস্ট|পাঠাও|অটোমেশন)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📦 1-Click Courier API Automation:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                No more manual copying and pasting of addresses into courier dashboards! ZynSite features:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>Direct Steadfast & Pathao Integration:</b> Book parcels in 1 click directly from your admin panel.</li>
                <li><b>Automatic Consignment & Tracking:</b> Instant tracking IDs dispatched to both seller and customer.</li>
                <li><b>Instant Shipping Labels:</b> Print receipts and packaging invoices in bulk.</li>
              </ul>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📦 ১-ক্লিক কুরিয়ার এপিআই অটোমেশন:</p>
              <p class="text-xs text-[#14120D]/80 leading-relaxed mb-2">
                কুরিয়ার পোর্টালে গিয়ে বারবার ম্যানুয়ালি কাস্টমারের নাম-ঠিকানা টাইপ করার দিন শেষ! ZynSite-এ রয়েছে:
              </p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 list-disc list-inside">
                <li><b>স্টেডফাস্ট ও পাঠাও সরাসরি সংযোগ:</b> অ্যাডমিন ড্যাশবোর্ড থেকে ১ ক্লিকেই কুরিয়ারে পার্সেল বুকিং।</li>
                <li><b>অটোমেটিক কনসাইনমেন্ট আইডি:</b> সাথে সাথে ট্র্যাকিং নম্বর জেনারেট হয়ে যায়।</li>
                <li><b>১-ক্লিক চালান প্রিন্ট:</b> প্যাকেজিং লেবেল এবং ইনভয়েস এক ক্লিকেই প্রিন্ট করার সুবিধা।</li>
              </ul>
            </div>
          `;
        }
      }

      // 6. Pricing & Cost intent
      if (/(price|pricing|cost|package|dam|daam|khoroch|প্যাকেজ|দাম|খরচ|রেট|বাজেট|basic|standard|premium|starter|taka|bdt|dolar|dollar)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">💰 Transparent Pricing & Packages:</p>
              <div class="space-y-1.5 text-xs text-[#14120D]/80">
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">1. F-Commerce Starter:</span> <b>$49 / ৳3,990</b><br>
                  • 1-Click COD checkout, Meta CAPI & Courier sync.
                </div>
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">2. Business Growth:</span> <b>$89 / ৳7,990</b><br>
                  • Multi-product store, SEO architecture & speed boost.
                </div>
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">3. Custom Enterprise:</span> <b>$149 / ৳14,990</b><br>
                  • Headless custom web app, priority SLA & tailored ERP.
                </div>
              </div>
              <p class="text-[11px] text-emerald-700 mt-2 font-medium">✨ Includes 1-Year Free .com Domain & Cloud SSD Hosting!</p>
              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <button type="button" onclick="window.zynBotScrollTo('#pricing')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">View All Plans</button>
                <button type="button" onclick="window.zynBotScrollTo('#calculator')" class="px-2.5 py-1 bg-[#FAF9F5] hover:bg-white text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-medium transition-all cursor-pointer">Custom Calculator</button>
              </div>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">💰 আমাদের ৩টি মূল প্যাকেজ ও সার্ভিস রেট:</p>
              <div class="space-y-1.5 text-xs text-[#14120D]/80">
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">১. F-Commerce Starter:</span> <b>৳৩,৯৯০</b><br>
                  • ১-ক্লিক ক্যাশ-অন-ডেলিভারি ল্যান্ডিং পেজ, মেটা পিক্সেল ও কুরিয়ার ইন্টিগ্রেশন।
                </div>
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">২. Business Growth:</span> <b>৳৭,৯৯০</b><br>
                  • ফুল মাল্টি-প্রোডাক্ট ক্যাটালগ, এসইও ফ্রেন্ডলি ও আল্ট্রা-ফাস্ট চেকআউট।
                </div>
                <div class="p-2 rounded-lg bg-[#FAF9F5] border border-[#C8AA76]/30">
                  <span class="text-[#997530] font-bold">৩. Custom Enterprise:</span> <b>৳১৪,৯৯০</b><br>
                  • সম্পূর্ণ কাস্টম আর্কিটেকচার, হেভিলি ট্রাফিক স্কেলিং ও ডেডিকেটেড সাপোর্ট।
                </div>
              </div>
              <p class="text-[11px] text-emerald-700 mt-2 font-medium">✨ ১ম বছর .com ডোমেইন এবং হাই-স্পিড ক্লাউড হোস্টিং সম্পূর্ণ ফ্রি!</p>
              <div class="mt-2.5 flex flex-wrap gap-1.5">
                <button type="button" onclick="window.zynBotScrollTo('#pricing')" class="px-2.5 py-1 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-semibold glow-btn transition-all cursor-pointer">প্যাকেজসমূহ দেখুন</button>
                <button type="button" onclick="window.zynBotScrollTo('#calculator')" class="px-2.5 py-1 bg-[#FAF9F5] hover:bg-white text-[#14120D] border border-[#C8AA76]/30 rounded-lg text-xs font-medium transition-all cursor-pointer">প্রাইস ক্যালকুলেটর</button>
              </div>
            </div>
          `;
        }
      }

      // 7. Brief / Order / Hire / Build website
      if (/(brief|order|hire|booking|buy|start|build|banate|banabo|create|dorkar|লাগবে|অর্ডার|বুকিং|কিনতে চাই|বানাতে চাই|প্রজেক্ট শুরু|কাস্টম প্রজেক্ট)/i.test(q)) {
        return this.generateBriefFormHTML(isEn);
      }

      // 8. Contact & Location
      if (/(location|address|office|phone|number|contact|thikana|jogajog|ঠিকানা|অফিস|ফোন|যোগাযোগ|নাম্বার|support)/i.test(q)) {
        if (isEn) {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📍 Contact & Official Support:</p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 mb-2.5">
                <li>• <b>WhatsApp / Hotline:</b> <a href="https://wa.me/40774119870" target="_blank" class="text-emerald-700 font-semibold underline">+40 774 119 870</a> (10:00 AM – 12:00 AM BST)</li>
                <li>• <b>Email:</b> support@zynsite.com</li>
                <li>• <b>HQ:</b> Dhaka, Bangladesh (Global Cloud Delivery)</li>
              </ul>
              <a href="https://wa.me/40774119870?text=${encodeURIComponent('Hello ZynSite, I want to discuss a new website project.')}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          `;
        } else {
          return `
            <div>
              <p class="font-semibold text-[#14120D] mb-1.5">📍 যোগাযোগ ও অফিসিয়াল সাপোর্ট:</p>
              <ul class="text-xs text-[#14120D]/80 space-y-1 mb-2.5">
                <li>• <b>হোয়াটসঅ্যাপ / হটলাইন:</b> <a href="https://wa.me/40774119870" target="_blank" class="text-emerald-700 font-semibold underline">+40 774 119 870</a> (সকাল ১০টা – রাত ১২টা)</li>
                <li>• <b>ইমেইল:</b> support@zynsite.com</li>
                <li>• <b>ঠিকানা:</b> ঢাকা, বাংলাদেশ (গ্লোবাল ক্লাউড সার্ভিস)</li>
              </ul>
              <a href="https://wa.me/40774119870?text=${encodeURIComponent('হ্যালো ZynSite, আমি একটি ওয়েবসাইট প্রজেক্ট নিয়ে কথা বলতে চাই।')}" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-emerald-600/30 transition-all">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>হোয়াটসঅ্যাপে চ্যাট করুন</span>
              </a>
            </div>
          `;
        }
      }

      // Fallback Handler (When bot doesn't understand a completely random question)
      const fallbackText = isEn
        ? "I didn't quite catch that! 😅 Would you like to know about our packages, 1-click landing pages, or chat directly with our expert team on WhatsApp?"
        : "বিষয়টি আমি ঠিক বুঝতে পারিনি! 😅 আপনি কি আমাদের প্যাকেজ, ১-ক্লিক ল্যান্ডিং পেজ, নাকি সরাসরি হোয়াটসঅ্যাপে সাপোর্টের বিষয়ে জানতে চান?";

      return `<div><p class="text-[#14120D] leading-relaxed font-medium mb-2">${fallbackText}</p>${this.getQuickActionButtonsHTML(isEn)}</div>`;
    }

    generateBriefFormHTML(isEn) {
      if (isEn) {
        return `
          <div class="p-3 bg-[#FAF9F5] border border-[#C8AA76]/30 rounded-xl space-y-2.5">
            <p class="font-bold text-[#14120D] text-xs flex items-center gap-1.5 text-[#997530]">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>Quick Project Brief Form</span>
            </p>
            <div class="space-y-2">
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">Business Name:</label>
                <input type="text" id="zynbot-brief-biz" placeholder="e.g. Trendy BD" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] placeholder-slate-400 outline-none focus:border-[#C8AA76]" />
              </div>
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">Website Type:</label>
                <select id="zynbot-brief-type" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] outline-none focus:border-[#C8AA76]">
                  <option value="F-Commerce Landing Page (1-Click COD)">F-Commerce Landing Page (1-Click COD)</option>
                  <option value="Full E-Commerce Store">Full E-Commerce Store</option>
                  <option value="Lead Gen / Corporate Website">Lead Gen / Corporate Website</option>
                  <option value="Custom Web App">Custom Web App</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">Phone / WhatsApp Number:</label>
                <input type="tel" id="zynbot-brief-phone" placeholder="+880 17xxxxxxxx" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] placeholder-slate-400 outline-none focus:border-[#C8AA76]" />
              </div>
              <button type="button" onclick="window.submitZynBotBrief()" class="w-full py-2 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] rounded-lg text-xs font-bold border border-[#C8AA76]/40 glow-btn flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <i data-lucide="send" class="w-3.5 h-3.5 text-[#14120D]"></i>
                <span>Submit to WhatsApp</span>
              </button>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="p-3 bg-[#FAF9F5] border border-[#C8AA76]/30 rounded-xl space-y-2.5">
            <p class="font-bold text-[#14120D] text-xs flex items-center gap-1.5 text-[#997530]">
              <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
              <span>দ্রুত প্রজেক্ট ব্রিফ ফর্ম</span>
            </p>
            <div class="space-y-2">
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">ব্যবসার নাম:</label>
                <input type="text" id="zynbot-brief-biz" placeholder="যেমন: ফ্যাশন জোন বিডি" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] placeholder-slate-400 outline-none focus:border-[#C8AA76]" />
              </div>
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">ওয়েবসাইটের ধরন:</label>
                <select id="zynbot-brief-type" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] outline-none focus:border-[#C8AA76]">
                  <option value="F-Commerce ল্যান্ডিং পেজ (১-ক্লিক COD)">F-Commerce ল্যান্ডিং পেজ (১-ক্লিক COD)</option>
                  <option value="ফুল ই-কমার্স ওয়েবসাইট">ফুল ই-কমার্স ওয়েবসাইট</option>
                  <option value="লিড জেনারেশন / সার্ভিস সাইট">লিড জেনারেশন / সার্ভিস সাইট</option>
                  <option value="কাস্টম ওয়েব অ্যাপ">কাস্টম ওয়েব অ্যাপ</option>
                </select>
              </div>
              <div>
                <label class="block text-[11px] text-[#14120D]/80 font-medium mb-1">ফোন / হোয়াটসঅ্যাপ নম্বর:</label>
                <input type="tel" id="zynbot-brief-phone" placeholder="০১৭xxxxxxxx" class="w-full bg-white border border-[#C8AA76]/30 rounded-lg px-2.5 py-1.5 text-xs text-[#14120D] placeholder-slate-400 outline-none focus:border-[#C8AA76]" />
              </div>
              <button type="button" onclick="window.submitZynBotBrief()" class="w-full py-2 bg-gradient-to-r from-[#F9EED4] via-[#E8CD8C] to-[#D4AF37] hover:from-[#FFF5DE] hover:to-[#DFC17B] text-[#14120D] rounded-lg text-xs font-bold border border-[#C8AA76]/40 glow-btn flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                <i data-lucide="send" class="w-3.5 h-3.5 text-[#14120D]"></i>
                <span>হোয়াটসঅ্যাপে পাঠান</span>
              </button>
            </div>
          </div>
        `;
      }
    }

    submitBrief() {
      const bizInput = document.getElementById('zynbot-brief-biz');
      const typeSelect = document.getElementById('zynbot-brief-type');
      const phoneInput = document.getElementById('zynbot-brief-phone');

      const biz = bizInput ? bizInput.value.trim() : '';
      const type = typeSelect ? typeSelect.value : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      const lang = window.zynI18n ? window.zynI18n.currentLang : 'bn';
      const isEn = lang === 'en';

      let msgText = '';
      if (isEn) {
        msgText = `Hello ZynSite! I want to start a project.\n\n` +
          `🏢 Business: ${biz || 'Not specified'}\n` +
          `🌐 Website Type: ${type}\n` +
          `📞 Phone/WhatsApp: ${phone || 'Not specified'}\n\n` +
          `Please provide a quotation and delivery plan.`;
      } else {
        msgText = `হ্যালো ZynSite! আমি একটি ওয়েবসাইট প্রজেক্ট শুরু করতে চাই।\n\n` +
          `🏢 ব্যবসার নাম: ${biz || 'উল্লেখ করা হয়নি'}\n` +
          `🌐 ওয়েবসাইটের ধরন: ${type}\n` +
          `📞 ফোন/হোয়াটসঅ্যাপ: ${phone || 'উল্লেখ করা হয়নি'}\n\n` +
          `দয়া করে বিস্তারিত প্যাকেজ ও ডেলিভারি প্ল্যান জানান।`;
      }

      const waUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(msgText)}`;
      window.open(waUrl, '_blank');

      const successNotice = isEn
        ? '✅ Project brief opened on WhatsApp! Our lead developer will assist you immediately.'
        : '✅ আপনার প্রজেক্টের ব্রিফ হোয়াটসঅ্যাপে ওপেন হয়েছে! আমাদের টিম শীঘ্রই রিপ্লাই দেবে।';
      this.addMessage('bot', successNotice);
    }

    onLanguageChange(lang) {
      this.renderQuickChips();
      if (this.messages.length === 1 && this.messages[0].sender === 'bot') {
        // Only welcome message was sent, update it cleanly
        this.messages = [];
        if (this.feedEl) this.feedEl.innerHTML = '';
        this.appendWelcomeMessage();
      }
    }
  }

  // Create singleton instance
  const botInstance = new ZynBotController();

  // Expose global bridge functions
  window.zynBotInstance = botInstance;
  window.toggleZynBot = (state) => botInstance.toggle(state);
  window.closeZynBotTooltip = () => botInstance.dismissTooltip();
  window.resetZynBotChat = () => botInstance.resetChat();
  window.handleZynBotSubmit = (e) => botInstance.handleSubmit(e);
  window.submitZynBotBrief = () => botInstance.submitBrief();
  window.zynBotChipTrigger = (chipKey) => {
    const topicMap = {
      bot_chip_pricing: 'pricing',
      bot_chip_demo: 'demo',
      bot_chip_funnel: 'funnel',
      bot_chip_fraud: 'fraud',
      bot_chip_terms: 'terms',
      bot_chip_brief: 'brief'
    };
    if (chipKey === 'bot_chip_whatsapp') {
      botInstance.handleWhatsAppDirect();
    } else if (chipKey === 'bot_chip_demo') {
      window.openAuraLuxeDemo();
    } else if (topicMap[chipKey]) {
      botInstance.handleChipClick(topicMap[chipKey]);
    }
  };
  window.openAuraLuxeDemo = () => {
    botInstance.toggle(false);
    if (typeof window.openProjectModal === 'function') {
      window.openProjectModal('aura-luxe');
    } else {
      const target = document.querySelector('#portfolio');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  window.zynBotScrollTo = (selector) => {
    botInstance.toggle(false);
    const target = document.querySelector(selector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  window.updateZynBotLanguage = (lang) => {
    botInstance.onLanguageChange(lang);
  };

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => botInstance.init());
  } else {
    botInstance.init();
  }
})();
