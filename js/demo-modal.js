/**
 * Book a Demo / Strategy Call System for ZynSite
 * Handles slot picking, platform selection, and calendar confirmation
 * Multi-Language support (Bengali & English)
 */

let activeDemoBooking = {
  date: "Today",
  time: "07:00 PM",
  channel: "Google Meet",
  name: "",
  phone: "",
  business: "",
  topic: "",
  bookingId: ""
};

function openDemoModal() {
  const modal = document.getElementById("demo-modal");
  if (!modal) return;

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  // Reset steps
  document.getElementById("demo-step-form").classList.remove("hidden");
  document.getElementById("demo-step-success").classList.add("hidden");

  // Default active selections
  selectDemoDate("today");
  selectDemoTime("07:00 PM");
  selectDemoChannel("Google Meet");
  refreshBookedSlotsForDate();

  modal.style.display = "";
  modal.classList.remove("hidden");
  modal.scrollTop = 0;
  document.body.style.overflow = "hidden";
  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeDemoModal() {
  const modal = document.getElementById("demo-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    try {
      localStorage.setItem("zynsite_demo_dismissed", "true");
    } catch (e) {}
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeDemoModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("demo-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeDemoModal();
      }
    });
  }
});

async function refreshBookedSlotsForDate() {
  const selectedDate = activeDemoBooking.date;
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  let allDemos = [];
  if (window.zynBackend) {
    try {
      allDemos = await window.zynBackend.getDemoBookings();
    } catch (e) {
      allDemos = window.zynBackend.getLocalDemos();
    }
  } else {
    try {
      allDemos = JSON.parse(localStorage.getItem("zynsite_demos") || "[]");
    } catch (e) {}
  }

  const bookedTimes = new Set();
  allDemos.forEach(d => {
    if (d.status !== "cancelled" && d.meeting_date === selectedDate && d.meeting_time) {
      bookedTimes.add(d.meeting_time.trim().toLowerCase());
    }
  });

  const buttons = document.querySelectorAll(".demo-time-btn");
  let firstAvailable = null;
  buttons.forEach(btn => {
    const timeVal = (btn.dataset.time || "").trim();
    if (!btn.dataset.origHtml) {
      btn.dataset.origHtml = btn.innerHTML;
    }
    const isBooked = bookedTimes.has(timeVal.toLowerCase());
    if (isBooked) {
      btn.disabled = true;
      btn.classList.add("opacity-40", "cursor-not-allowed", "border-rose-900/40");
      btn.classList.remove("hover:border-slate-700", "cursor-pointer");
      const bookedLabel = isEn ? "(Booked)" : "(বুকড)";
      btn.innerHTML = `<span class="line-through">${timeVal}</span> <span class="text-[10px] text-rose-400 block font-semibold">${bookedLabel}</span>`;
    } else {
      btn.disabled = false;
      btn.classList.remove("opacity-40", "cursor-not-allowed", "border-rose-900/40");
      btn.classList.add("cursor-pointer");
      btn.innerHTML = btn.dataset.origHtml;
      if (!firstAvailable) firstAvailable = timeVal;
    }
  });

  if (bookedTimes.has((activeDemoBooking.time || "").trim().toLowerCase()) && firstAvailable) {
    selectDemoTime(firstAvailable);
  }
}

function selectDemoDate(type) {
  const buttons = document.querySelectorAll(".demo-date-btn");
  buttons.forEach(btn => {
    btn.classList.remove("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm", "border-blue-500", "bg-blue-500/20", "text-blue-400");
    btn.classList.add("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70");
  });

  const activeBtn = document.getElementById(`demo-date-${type}`);
  if (activeBtn) {
    activeBtn.classList.remove("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70", "border-slate-800", "bg-slate-900/60", "text-slate-300");
    activeBtn.classList.add("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm");
    const isEn = window.zynI18n?.currentLang === 'en';
    const dateMap = {
      today: isEn ? "Today (Urgent Slot)" : "আজকে (জরুরি স্লট)",
      tomorrow: isEn ? "Tomorrow" : "আগামীকাল",
      after: isEn ? "Day After Tomorrow" : "পরশু দিন"
    };
    activeDemoBooking.date = dateMap[type] || activeBtn.dataset.value || type;
  }

  refreshBookedSlotsForDate();
}

function selectDemoTime(timeStr) {
  const buttons = document.querySelectorAll(".demo-time-btn");
  buttons.forEach(btn => {
    btn.classList.remove("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm", "border-blue-500", "bg-blue-500/20", "text-blue-400");
    btn.classList.add("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70");
  });

  const activeBtn = document.querySelector(`.demo-time-btn[data-time="${timeStr}"]`);
  if (activeBtn) {
    activeBtn.classList.remove("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70", "border-slate-800", "bg-slate-900/60", "text-slate-300");
    activeBtn.classList.add("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm");
    activeDemoBooking.time = timeStr;
  }
}

function selectDemoChannel(channelName) {
  const buttons = document.querySelectorAll(".demo-channel-btn");
  buttons.forEach(btn => {
    btn.classList.remove("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm", "border-indigo-500", "bg-indigo-500/20", "text-white");
    btn.classList.add("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70");
  });

  const activeBtn = document.querySelector(`.demo-channel-btn[data-channel="${channelName}"]`);
  if (activeBtn) {
    activeBtn.classList.remove("border-[#C8AA76]/30", "bg-[#FAF9F5]", "text-[#14120D]/70", "border-slate-800", "bg-slate-900/60", "text-slate-300");
    activeBtn.classList.add("border-[#C8AA76]", "bg-[#E8CD8C]/30", "text-[#14120D]", "font-bold", "shadow-sm");
    activeDemoBooking.channel = channelName;
  }
}

function isValidPhoneNumber(phone) {
  const p = String(phone || "").trim().replace(/[\s-]/g, "");
  const bdRegex = /^(?:\+?8801|01)[3-9]\d{8}$/;
  const intlRegex = /^\+?[1-9]\d{7,15}$/;
  return bdRegex.test(p) || intlRegex.test(p);
}

function submitDemoBooking(e) {
  if (e) e.preventDefault();

  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  // 1. Honeypot check
  const hp = document.getElementById("demo-hp-field")?.value;
  if (hp) {
    closeDemoModal();
    return;
  }

  // 2. Cooldown check (60s)
  const COOLDOWN_MS = 60000;
  const lastTime = Number(localStorage.getItem("zynsite_last_demo_time") || 0);
  if (Date.now() - lastTime < COOLDOWN_MS) {
    const waitSec = Math.ceil((COOLDOWN_MS - (Date.now() - lastTime)) / 1000);
    const alertMsg = isEn 
      ? `Please wait! You recently requested a consultation. Try again in ${waitSec} seconds.`
      : `দয়া করে অপেক্ষা করুন! আপনি কিছুক্ষণ আগেই একটি রিকোয়েস্ট পাঠিয়েছেন। ${waitSec} সেকেন্ড পর আবার চেষ্টা করুন।`;
    alert(alertMsg);
    return;
  }

  const name = document.getElementById("demo-client-name")?.value.trim();
  const phone = document.getElementById("demo-client-phone")?.value.trim();
  const business = document.getElementById("demo-business-name")?.value.trim() || (isEn ? "General Project Inquiry" : "সাধারণ আলোচনা");
  const topic = document.getElementById("demo-topic-select")?.value || (isEn ? "Website & Landing Page Strategy" : "ওয়েবসাইট ও ল্যান্ডিং পেজ ডেমো");

  if (!name || !phone) {
    alert(isEn 
      ? "Please enter your name and phone/WhatsApp number."
      : "অনুগ্রহ করে আপনার নাম এবং মোবাইল নম্বর প্রদান করুন।"
    );
    return;
  }

  // 3. Strict Phone validation
  if (!isValidPhoneNumber(phone)) {
    alert(isEn
      ? "Please enter a valid phone number (e.g. +1 234 567 8900 or 01XXXXXXXXX)."
      : "সঠিক মোবাইল নম্বর প্রদান করুন (যেমন: 01XXXXXXXXX বা +1 234 567 8900)।"
    );
    const pInput = document.getElementById("demo-client-phone");
    if (pInput) {
      pInput.focus();
      pInput.classList.add("border-rose-500");
    }
    return;
  }

  localStorage.setItem("zynsite_last_demo_time", String(Date.now()));

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const bookingId = `DEMO-${randomNum}`;

  activeDemoBooking.name = name;
  activeDemoBooking.phone = phone;
  activeDemoBooking.business = business;
  activeDemoBooking.topic = topic;
  activeDemoBooking.bookingId = bookingId;
  activeDemoBooking.createdAt = new Date().toISOString();
  activeDemoBooking.status = "pending";

  // Save to Backend (Supabase + LocalStorage)
  if (window.zynBackend) {
    window.zynBackend.saveDemoBooking(activeDemoBooking).catch(err => console.error("Backend save error:", err));
  } else {
    try {
      const existingDemos = JSON.parse(localStorage.getItem("zynsite_demos") || "[]");
      existingDemos.unshift(activeDemoBooking);
      localStorage.setItem("zynsite_demos", JSON.stringify(existingDemos));
    } catch (err) {
      console.error("Local storage error:", err);
    }
  }

  // Confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
  }

  // Display Success View
  document.getElementById("demo-step-form").classList.add("hidden");
  document.getElementById("demo-step-success").classList.remove("hidden");

  document.getElementById("demo-success-id").textContent = bookingId;
  document.getElementById("demo-success-date-time").textContent = `${activeDemoBooking.date} • ${activeDemoBooking.time}`;
  document.getElementById("demo-success-channel").textContent = activeDemoBooking.channel;
}

function sendDemoViaWhatsApp() {
  const d = activeDemoBooking || {};
  const lang = window.zynI18n?.currentLang || 'bn';
  const isEn = lang === 'en';

  let msg = '';
  if (isEn) {
    msg = `🗓️ *Free Live Strategy Session Booking*
─────────────────────
🆔 *Booking ID:* ${d.bookingId || 'DEMO-0000'}
👤 *Name:* ${d.name || 'Client'}
📞 *Phone:* ${d.phone || 'N/A'}
🏬 *Business:* ${d.business || 'N/A'}
📅 *Date:* ${d.date || 'Today'}
⏰ *Time:* ${d.time || '07:00 PM'}
💻 *Platform:* ${d.channel || 'Google Meet'}
🎯 *Topic:* ${d.topic || 'Website Demo'}
─────────────────────
Hello ZynSite! I just scheduled a free strategy session to inspect a live demo and discuss the best development package for my business. Please confirm the meeting link.`;
  } else {
    msg = `🗓️ *ফ্রি ডেমো ও স্ট্র্যাটেজি সেশন বুকিং*
─────────────────────
🆔 *বুকিং আইডি:* ${d.bookingId || 'DEMO-0000'}
👤 *নাম:* ${d.name || 'গ্রাহক'}
📞 *মোবাইল:* ${d.phone || 'N/A'}
🏬 *ব্যবসা / উদ্যোগ:* ${d.business || 'N/A'}
📅 *তারিখ:* ${d.date || 'আজকে'}
⏰ *সময়:* ${d.time || 'সন্ধ্যা ০৭:০০ PM'}
💻 *মিটিং মাধ্যম:* ${d.channel || 'Google Meet'}
🎯 *আলোচনার বিষয়:* ${d.topic || 'ওয়েবসাইট ডেমো'}
─────────────────────
হ্যালো ZynSite! আমি আমার প্রজেক্টের লাইভ ডেমো দেখতে এবং সেরা প্যাকেজটি সিলেক্ট করতে এই মিটিংটি শিডিউল করেছি। অনুগ্রহ করে লিংকটি কনফার্ম করুন।`;
  }

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/40774119870?text=${encoded}`, '_blank');
}
