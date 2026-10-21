/**
 * ZynSite Backend & Supabase Client Manager
 * Handles real-time order tracking, demo bookings, local caching, and Supabase integration
 */

/**
 * Global XSS Prevention Helper
 * Escapes &, <, >, ", and '
 */
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHTML = escapeHTML;

const BACKEND_CONFIG = {
  // Live Supabase Project Credentials
  DEFAULT_SUPABASE_URL: "https://rqvcmskzkbzjqzkblhrt.supabase.co",
  DEFAULT_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdmNtc2t6a2J6anF6a2JsaHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxMDI4MTIsImV4cCI6MjEwNzY3ODgxMn0.DS_PEJ_eLd1160g9RClshWPjWxWz7sLm6CTbQLIk81E",
  STORAGE_KEY_URL: "zynsite_supabase_url",
  STORAGE_KEY_KEY: "zynsite_supabase_anon_key",
  STORAGE_ORDERS: "zynsite_orders",
  STORAGE_DEMOS: "zynsite_demos"
};

class BackendService {
  constructor() {
    this.supabase = null;
    this.isConfigured = false;
    this.initClient();
  }

  getCredentials() {
    const url = localStorage.getItem(BACKEND_CONFIG.STORAGE_KEY_URL) || BACKEND_CONFIG.DEFAULT_SUPABASE_URL;
    const key = localStorage.getItem(BACKEND_CONFIG.STORAGE_KEY_KEY) || BACKEND_CONFIG.DEFAULT_SUPABASE_ANON_KEY;
    return { url, key };
  }

  saveCredentials(url, key) {
    if (url && key) {
      localStorage.setItem(BACKEND_CONFIG.STORAGE_KEY_URL, url.trim());
      localStorage.setItem(BACKEND_CONFIG.STORAGE_KEY_KEY, key.trim());
      this.initClient();
      return true;
    }
    return false;
  }

  clearCredentials() {
    localStorage.removeItem(BACKEND_CONFIG.STORAGE_KEY_URL);
    localStorage.removeItem(BACKEND_CONFIG.STORAGE_KEY_KEY);
    this.supabase = null;
    this.isConfigured = false;
  }

  initClient() {
    const { url, key } = this.getCredentials();
    if (url && key && url.startsWith("http") && !url.includes("your-project") && window.supabase) {
      try {
        this.supabase = window.supabase.createClient(url, key);
        this.isConfigured = true;
      } catch (err) {
        console.warn("Failed to initialize Supabase client:", err);
        this.supabase = null;
        this.isConfigured = false;
      }
    } else {
      this.supabase = null;
      this.isConfigured = false;
    }
  }

  /**
   * Save a new customer order
   */
  async saveOrder(orderData) {
    const price = Number(orderData.price) || 3990;
    const advance = Number(orderData.advance_amount || orderData.advanceAmount) || Math.round(price * 0.5);
    const due = price - advance;

    const orderRecord = {
      order_id: orderData.order_id || orderData.orderId || `ZS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      client_name: orderData.client_name || orderData.name || "",
      client_phone: orderData.client_phone || orderData.phone || "",
      business_name: orderData.business_name || orderData.businessName || "",
      page_link: orderData.page_link || orderData.pageLink || "",
      package_id: orderData.package_id || orderData.packageId || "pkg-f-commerce",
      package_name: orderData.package_name || orderData.packageName || "এফ-কমার্স ল্যান্ডিং পেজ",
      price: price,
      advance_amount: advance,
      due_amount: due,
      notes: orderData.notes || "",
      status: orderData.status || "pending",
      created_at: orderData.created_at || orderData.createdAt || new Date().toISOString()
    };

    // Synchronize full record back to input object
    Object.assign(orderData, orderRecord);

    // Trigger instant webhook / notification
    this.triggerLeadWebhook("order", orderRecord);

    // 1. Always save to LocalStorage backup first
    try {
      const localOrders = this.getLocalOrders();
      const existingIdx = localOrders.findIndex(o => o.order_id === orderRecord.order_id);
      if (existingIdx >= 0) {
        localOrders[existingIdx] = orderRecord;
      } else {
        localOrders.unshift(orderRecord);
      }
      localStorage.setItem(BACKEND_CONFIG.STORAGE_ORDERS, JSON.stringify(localOrders));
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // 2. If Supabase is connected, insert into Supabase
    if (this.isConfigured && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("orders")
          .upsert([orderRecord], { onConflict: "order_id" })
          .select();

        if (error) {
          console.error("Supabase order insert error:", error);
          return { success: true, mode: "local_fallback", data: orderRecord, error };
        }
        return { success: true, mode: "supabase", data: data ? data[0] : orderRecord };
      } catch (err) {
        console.error("Supabase order save error:", err);
        return { success: true, mode: "local_fallback", data: orderRecord };
      }
    }

    return { success: true, mode: "local", data: orderRecord };
  }

  /**
   * Save a new demo booking
   */
  async saveDemoBooking(demoData) {
    const demoRecord = {
      booking_id: demoData.bookingId || `DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      client_name: demoData.name || "",
      client_phone: demoData.phone || "",
      business_name: demoData.business || "",
      topic: demoData.topic || "ওয়েবসাইট ও ল্যান্ডিং পেজ ডেমো",
      meeting_date: demoData.date || "আজকে (জরুরি)",
      meeting_time: demoData.time || "07:00 PM",
      channel: demoData.channel || "Google Meet",
      status: demoData.status || "pending",
      notes: demoData.notes || "",
      created_at: demoData.createdAt || new Date().toISOString()
    };

    // Trigger instant webhook / notification
    this.triggerLeadWebhook("demo", demoRecord);

    // 1. Always save to LocalStorage backup
    try {
      const localDemos = this.getLocalDemos();
      const existingIdx = localDemos.findIndex(d => d.booking_id === demoRecord.booking_id);
      if (existingIdx >= 0) {
        localDemos[existingIdx] = demoRecord;
      } else {
        localDemos.unshift(demoRecord);
      }
      localStorage.setItem(BACKEND_CONFIG.STORAGE_DEMOS, JSON.stringify(localDemos));
    } catch (e) {
      console.error("Local storage error:", e);
    }

    // 2. If Supabase is connected, insert into Supabase
    if (this.isConfigured && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("demo_bookings")
          .upsert([demoRecord], { onConflict: "booking_id" })
          .select();

        if (error) {
          console.error("Supabase demo insert error:", error);
          return { success: true, mode: "local_fallback", data: demoRecord, error };
        }
        return { success: true, mode: "supabase", data: data ? data[0] : demoRecord };
      } catch (err) {
        console.error("Supabase demo save error:", err);
        return { success: true, mode: "local_fallback", data: demoRecord };
      }
    }

    return { success: true, mode: "local", data: demoRecord };
  }

  /**
   * Get all orders (from Supabase if configured, merged with local storage)
   */
  async getOrders() {
    if (this.isConfigured && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          // Merge local cache
          localStorage.setItem(BACKEND_CONFIG.STORAGE_ORDERS, JSON.stringify(data));
          return data;
        }
        console.warn("Could not fetch orders from Supabase, using local cache:", error);
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local cache:", err);
      }
    }
    return this.getLocalOrders();
  }

  /**
   * Get all demo bookings
   */
  async getDemoBookings() {
    if (this.isConfigured && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("demo_bookings")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          localStorage.setItem(BACKEND_CONFIG.STORAGE_DEMOS, JSON.stringify(data));
          return data;
        }
        console.warn("Could not fetch demos from Supabase, using local cache:", error);
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to local cache:", err);
      }
    }
    return this.getLocalDemos();
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId, newStatus) {
    // 1. Update local storage
    const orders = this.getLocalOrders();
    const order = orders.find(o => o.order_id === orderId);
    if (order) {
      order.status = newStatus;
      localStorage.setItem(BACKEND_CONFIG.STORAGE_ORDERS, JSON.stringify(orders));
    }

    // 2. Update Supabase
    if (this.isConfigured && this.supabase) {
      try {
        await this.supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("order_id", orderId);
      } catch (err) {
        console.error("Failed to update status on Supabase:", err);
      }
    }
    return true;
  }

  /**
   * Update demo booking status
   */
  async updateDemoStatus(bookingId, newStatus) {
    // 1. Update local storage
    const demos = this.getLocalDemos();
    const demo = demos.find(d => d.booking_id === bookingId);
    if (demo) {
      demo.status = newStatus;
      localStorage.setItem(BACKEND_CONFIG.STORAGE_DEMOS, JSON.stringify(demos));
    }

    // 2. Update Supabase
    if (this.isConfigured && this.supabase) {
      try {
        await this.supabase
          .from("demo_bookings")
          .update({ status: newStatus })
          .eq("booking_id", bookingId);
      } catch (err) {
        console.error("Failed to update demo status on Supabase:", err);
      }
    }
    return true;
  }

  /**
   * Delete an order
   */
  async deleteOrder(orderId) {
    const orders = this.getLocalOrders().filter(o => o.order_id !== orderId);
    localStorage.setItem(BACKEND_CONFIG.STORAGE_ORDERS, JSON.stringify(orders));

    if (this.isConfigured && this.supabase) {
      try {
        await this.supabase.from("orders").delete().eq("order_id", orderId);
      } catch (err) {
        console.error("Failed to delete order from Supabase:", err);
      }
    }
    return true;
  }

  /**
   * Delete a demo booking
   */
  async deleteDemoBooking(bookingId) {
    const demos = this.getLocalDemos().filter(d => d.booking_id !== bookingId);
    localStorage.setItem(BACKEND_CONFIG.STORAGE_DEMOS, JSON.stringify(demos));

    if (this.isConfigured && this.supabase) {
      try {
        await this.supabase.from("demo_bookings").delete().eq("booking_id", bookingId);
      } catch (err) {
        console.error("Failed to delete demo from Supabase:", err);
      }
    }
    return true;
  }

  /**
   * Test Supabase connection
   */
  async testConnection(url, key) {
    if (!window.supabase) return { ok: false, message: "Supabase JS library not loaded" };
    try {
      const client = window.supabase.createClient(url.trim(), key.trim());
      // Test querying orders
      const { data, error } = await client.from("orders").select("count", { count: "exact", head: true });
      if (error) {
        return { ok: false, message: error.message || "Connection error" };
      }
      return { ok: true, message: "Connected successfully to Supabase!" };
    } catch (e) {
      return { ok: false, message: e.message || "Connection failed" };
    }
  }

  getLocalOrders() {
    try {
      const raw = localStorage.getItem(BACKEND_CONFIG.STORAGE_ORDERS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  getLocalDemos() {
    try {
      const raw = localStorage.getItem(BACKEND_CONFIG.STORAGE_DEMOS);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  /**
   * Track an order by Order ID and Phone Number
   * Matches both order_id and the last 8 digits of client_phone
   */
  async trackOrder(orderId, phone) {
    const rawId = String(orderId || "").trim();
    const cleanId = rawId.replace(/^#/, "").toUpperCase();
    const rawDigits = String(phone || "").replace(/\D/g, "");
    const phoneTail = rawDigits.length >= 8 ? rawDigits.slice(-8) : rawDigits;

    if (!cleanId || !phoneTail) {
      return { success: false, message: "অনুগ্রহ করে অর্ডার আইডি এবং সঠিক ফোন নম্বর প্রদান করুন।" };
    }

    let matchedOrder = null;

    // 1. Check Supabase if configured
    if (this.isConfigured && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from("orders")
          .select("*")
          .or(`order_id.eq.${cleanId},order_id.eq.#${cleanId}`);

        if (!error && Array.isArray(data) && data.length > 0) {
          matchedOrder = data.find(o => {
            const p = String(o.client_phone || "").replace(/\D/g, "");
            return p.endsWith(phoneTail);
          });
        }
      } catch (err) {
        console.warn("Supabase trackOrder error:", err);
      }
    }

    // 2. Fallback to LocalStorage
    if (!matchedOrder) {
      const localOrders = this.getLocalOrders();
      matchedOrder = localOrders.find(o => {
        const oId = String(o.order_id || "").replace(/^#/, "").toUpperCase();
        const p = String(o.client_phone || "").replace(/\D/g, "");
        return (oId === cleanId) && p.endsWith(phoneTail);
      });
    }

    if (matchedOrder) {
      return { success: true, order: matchedOrder };
    }

    return {
      success: false,
      message: "প্রদত্ত তথ্য অনুযায়ী কোনো অর্ডার পাওয়া যায়নি। অনুগ্রহ করে আপনার অর্ডার আইডি ও নিবন্ধিত ফোন নম্বর সঠিকভাবে লিখুন।"
    };
  }

  /**
   * Instant Webhook / Notification Dispatcher
   * Supports custom Webhook URL, Telegram bot, and fires window event
   */
  async triggerLeadWebhook(type, data) {
    try {
      // 1. Dispatch custom event for in-page listeners
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("zynsite:new_lead", {
          detail: { type, data }
        }));
      }

      // 2. Format WhatsApp direct contact link for admin
      const cleanPhone = String(data.client_phone || "").replace(/\D/g, "");
      const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('হ্যালো ' + (data.client_name || 'গ্রাহক') + ', ZynSite থেকে আপনার ' + (type === 'order' ? 'অর্ডার (' + (data.order_id || '') + ')' : 'ডেমো বুকিং (' + (data.booking_id || '') + ')') + ' সম্পর্কে যোগাযোগ করছি।')}`;

      const payload = {
        source: "ZynSite.com",
        type: type,
        timestamp: new Date().toISOString(),
        id: data.order_id || data.booking_id,
        client_name: data.client_name,
        client_phone: data.client_phone,
        business_name: data.business_name,
        service_or_topic: data.package_name || data.topic,
        budget: data.price || 0,
        notes: data.notes || "",
        status: data.status || "pending",
        admin_whatsapp_link: waLink
      };

      // 3. Webhook URL (from localStorage if configured)
      const webhookUrl = localStorage.getItem("zynsite_lead_webhook_url") || "";
      if (webhookUrl && webhookUrl.startsWith("http")) {
        // Non-blocking fire & forget
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          mode: "cors"
        }).catch(err => console.warn("Webhook dispatch error:", err));
      }
    } catch (e) {
      console.warn("triggerLeadWebhook exception:", e);
    }
  }

  /**
   * Printable Official ZynSite Invoice / SLA Receipt
   */
  generatePrintableInvoice(order) {
    if (!order) return;
    const isEn = window.zynI18n?.currentLang === 'en' || order.currency === '$';

    const orderId = escapeHTML(order.order_id || order.orderId || 'ZS-2026-0000');
    const clientName = escapeHTML(order.client_name || order.name || order.customer_name || (isEn ? 'Valued Client' : 'সম্মানিত গ্রাহক'));
    const clientPhone = escapeHTML(order.client_phone || order.phone || order.customer_phone || 'N/A');
    const businessName = escapeHTML(order.business_name || order.businessName || (isEn ? 'Business Owner' : 'স্বত্বাধিকারী'));
    const packageName = escapeHTML(order.package_name || order.packageName || (isEn ? 'High-Converting Website Package' : 'ওয়েবসাইট ডেভেলপমেন্ট প্যাকেজ'));
    const price = Number(order.price) || (isEn ? 39 : 3990);
    const advance = Number(order.advance_amount || order.advanceAmount || order.advance) || Math.round(price * 0.5);
    const due = Number(order.due_amount || order.dueAmount || order.due) || (price - advance);
    const rawDate = (order.created_at || order.createdAt) ? new Date(order.created_at || order.createdAt) : new Date();
    const formattedDateEn = rawDate.toISOString().split('T')[0];
    const formattedDate = rawDate.toLocaleDateString(isEn ? 'en-US' : 'bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });

    const toBanglaDigits = (num) => {
      if (num === null || num === undefined) return '';
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).replace(/\d/g, d => bnDigits[Number(d)]);
    };
    const formatPriceDisplay = (p) => {
      if (isEn) {
        return `$${Number(p || 0).toLocaleString('en-US')}`;
      }
      const formatted = Number(p || 0).toLocaleString('en-US');
      return `৳${toBanglaDigits(formatted)}`;
    };

    const invoiceHtml = `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'bn'}">
<head>
  <meta charset="UTF-8">
  <title>Invoice - ${orderId} - ZynSite</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ${isEn ? "'Plus Jakarta Sans', sans-serif" : "'Hind Siliguri', 'Plus Jakarta Sans', sans-serif"};
      background: #f8fafc;
      color: #0f172a;
      line-height: 1.5;
      padding: 30px;
    }
    .invoice-card {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #C8AA76;
      padding-bottom: 24px;
      margin-bottom: 24px;
    }
    .brand-title {
      font-family: 'Cormorant Garamond', 'Plus Jakarta Sans', serif;
      font-size: 32px;
      font-weight: 700;
      color: #0f172a;
      letter-spacing: 0.15em;
    }
    .brand-title span { color: #C8AA76; font-weight: 300; }
    .brand-sub {
      font-size: 13px;
      color: #64748b;
      margin-top: 4px;
    }
    .invoice-badge {
      text-align: right;
    }
    .badge-pill {
      display: inline-block;
      background: #eff6ff;
      color: #1d4ed8;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      font-size: 14px;
      padding: 6px 14px;
      border-radius: 9999px;
      border: 1px solid #bfdbfe;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
      padding: 20px;
      background: #f1f5f9;
      border-radius: 12px;
    }
    .meta-label {
      font-size: 11px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .meta-value {
      font-size: 15px;
      font-weight: 600;
      color: #0f172a;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 12px 16px;
      font-size: 13px;
      font-weight: 600;
    }
    th.text-right { text-align: right; }
    td {
      padding: 14px 16px;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }
    td.text-right { text-align: right; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; }
    .breakdown-row {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
      font-size: 14px;
    }
    .breakdown-label {
      width: 220px;
      text-align: right;
      color: #64748b;
      font-weight: 500;
    }
    .breakdown-val {
      width: 130px;
      text-align: right;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      color: #0f172a;
    }
    .breakdown-total {
      font-size: 18px;
      color: #1d4ed8;
      border-top: 2px solid #cbd5e1;
      padding-top: 8px;
      margin-top: 8px;
    }
    .guarantee-box {
      background: #f0fdf4;
      border: 1px solid #86efac;
      border-radius: 12px;
      padding: 16px;
      margin: 24px 0;
    }
    .guarantee-title {
      font-size: 13px;
      font-weight: 700;
      color: #166534;
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .guarantee-desc {
      font-size: 12px;
      color: #15803d;
      line-height: 1.6;
    }
    .footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .print-btn-bar {
      margin-bottom: 20px;
      text-align: center;
    }
    .print-btn {
      background: #2563eb;
      color: white;
      border: none;
      padding: 10px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .invoice-card { border: none; box-shadow: none; padding: 0; }
      .print-btn-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-btn-bar">
    <button class="print-btn" onclick="window.print()">${isEn ? '🖨️ Print Invoice / Save as PDF' : '🖨️ ইনভয়েস প্রিন্ট / PDF সংরক্ষণ করুন'}</button>
  </div>
  <div class="invoice-card">
    <div class="header">
      <div style="display: flex; align-items: flex-start; gap: 16px;">
        <div style="width: 52px; height: 52px; border-radius: 12px; background: #FFFFFF; border: 1px solid #C8AA76; display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0; box-shadow: 0 4px 12px rgba(200,170,118,0.2);">
          <img style="width: 100%; height: 100%; object-fit: contain;" src="${window.location.origin}/assets/zynsite-icon.png" onerror="this.src='assets/zynsite-icon.png'" alt="ZynSite Logo">
        </div>
        <div>
          <h1 class="brand-title" style="margin: 0; line-height: 1.1; font-weight: 800; letter-spacing: 0.05em;">ZYNSITE<span style="color: #C8AA76; font-size: 16px; margin-left: 4px;">.COM</span></h1>
          <p class="brand-sub" style="margin-top: 4px; font-weight: 500;">High-End Web Development · Automated Sales Funnels</p>
          <p class="brand-sub">${isEn ? 'Website' : 'ওয়েবসাইট'}: <b>https://zynsite.com</b> • ${isEn ? 'Hotline' : 'হটলাইন'}: <b>+40 774 119 870</b></p>
        </div>
      </div>
      <div class="invoice-badge">
        <div class="badge-pill">${isEn ? `Order #${orderId}` : `অর্ডার #${orderId}`}</div>
        <div style="font-size:12px; color:#64748b; margin-top:6px;">${isEn ? 'Date' : 'তারিখ'}: ${formattedDateEn} (${formattedDate})</div>
      </div>
    </div>

    <div class="meta-grid">
      <div>
        <div class="meta-label">${isEn ? 'Billing Recipient / Client:' : 'বিলিং প্রাপক / গ্রাহক:'}</div>
        <div class="meta-value">${clientName}</div>
        <div style="font-size:13px; color:#475569; margin-top:2px;">${isEn ? 'Business' : 'প্রতিষ্ঠান'}: <b>${businessName}</b></div>
        <div style="font-size:13px; color:#475569;">${isEn ? 'Mobile / WhatsApp' : 'মোবাইল'}: ${clientPhone}</div>
      </div>
      <div>
        <div class="meta-label">${isEn ? 'Service Provider:' : 'সার্ভিস প্রোভাইডার:'}</div>
        <div class="meta-value">ZynSite</div>
        <div style="font-size:13px; color:#475569; margin-top:2px;">${isEn ? 'Email' : 'ইমেইল'}: support.zynsite@gmail.com</div>
        <div style="font-size:13px; color:#475569;">${isEn ? 'Delivery Window: 48–72 Hours' : 'ডেলিভারি উইন্ডো: ৪৮-৭২ ঘণ্টা'}</div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>${isEn ? 'Item & Service Description' : 'আইটেম ও সেবার বিবরণ'}</th>
          <th style="width:140px; text-align:center;">${isEn ? 'Delivery Mode' : 'ডেলিভারি মোড'}</th>
          <th class="text-right" style="width:150px;">${isEn ? 'Amount (USD)' : 'মূল্য (BDT)'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <strong>${packageName}</strong>
            <div style="font-size:12px; color:#64748b; margin-top:4px;">
              ${isEn 
                ? 'Full responsive architecture, Meta Pixel CAPI, courier/shipping API, domain & cloud SSD hosting setup included.'
                : 'পূর্ণাঙ্গ রেসপন্সিভ ডিজাইন, মেটা পিক্সেল CAPI, কুরিয়ার ইন্টিগ্রেশন, ডোমেইন ও ক্লাউড হোস্টিং সেটআপ অন্তর্ভুক্ত।'}
            </div>
          </td>
          <td style="text-align:center; font-size:13px; color:#1e293b;">${isEn ? '48–72 Hours' : '৪৮-৭২ ঘণ্টা'}</td>
          <td class="text-right">${formatPriceDisplay(price)}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-left:auto; width:fit-content; margin-bottom:20px;">
      <div class="breakdown-row">
        <div class="breakdown-label">${isEn ? 'Total Project Budget:' : 'মোট প্রজেক্ট বাজেট:'}</div>
        <div class="breakdown-val">${formatPriceDisplay(price)}</div>
      </div>
      <div class="breakdown-row" style="color:#16a34a;">
        <div class="breakdown-label" style="color:#16a34a; font-weight:600;">${isEn ? '50% Upfront Deposit (Booking):' : '৫০% অগ্রিম পেমেন্ট (বুকিং):'}</div>
        <div class="breakdown-val" style="color:#16a34a;">${formatPriceDisplay(advance)}</div>
      </div>
      <div class="breakdown-row breakdown-total">
        <div class="breakdown-label" style="color:#1d4ed8; font-weight:700;">${isEn ? 'Balance Due on Delivery (50%):' : 'ডেলিভারির পর অবশিষ্ট (৫০%):'}</div>
        <div class="breakdown-val" style="color:#1d4ed8;">${formatPriceDisplay(due)}</div>
      </div>
    </div>

    <div class="guarantee-box">
      <div class="guarantee-title">
        <span>🛡️</span> ${isEn ? '100% Risk-Free Service Level Agreement (SLA)' : '১০০% নিরাপদ ও ঝুঁকিমুক্ত অর্ডার গ্যারান্টি (SLA)'}
      </div>
      <div class="guarantee-desc">
        ${isEn ? `
          • <b>Step 1:</b> Order submitted & complimentary 15-minute strategy consultation call.<br>
          • <b>Step 2:</b> Scope of work & design mockup approved, 50% deposit paid with official receipt.<br>
          • <b>Step 3:</b> Final 50% balance payable only after live deployment and 100% satisfactory inspection.
        ` : `
          • <b>ধাপ ১:</b> অর্ডার সাবমিট ও ১৫ মিনিটে ফ্রি স্ট্র্যাটেজি কনসালটেশন।<br>
          • <b>ধাপ ২:</b> কাজের পরিধি ও লেআউট ডেমো বুঝে পেয়ে অফিসিয়াল ইনভয়েস সহ ৫০% অ্যাডভান্স পরিশোধ।<br>
          • <b>ধাপ ৩:</b> লাইভ সাইট সন্তোষজনকভাবে বুঝে পাওয়ার পর অবশিষ্ট ৫০% পরিশোধযোগ্য।
        `}
      </div>
    </div>

    <div class="footer">
      <div>
        <b>ZynSite</b> • ${isEn ? 'Helpdesk' : 'হেল্পডেস্ক'}: support.zynsite@gmail.com
      </div>
      <div>
        ${isEn ? 'Verification Link' : 'যাচাইকরণ লিংক'}: <a href="https://zynsite.com" style="color:#2563eb; text-decoration:none;">https://zynsite.com</a>
      </div>
    </div>
  </div>
</body>
</html>`;

    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(invoiceHtml);
      printWin.document.close();
      setTimeout(() => {
        try {
          printWin.focus();
        } catch (e) {}
      }, 300);
    } else {
      const iframe = document.createElement('iframe');
      iframe.style.position = 'fixed';
      iframe.style.right = '0';
      iframe.style.bottom = '0';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      document.body.appendChild(iframe);
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(invoiceHtml);
      iframe.contentWindow.document.close();
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(() => document.body.removeChild(iframe), 2000);
      }, 500);
    }
  }
}

// Global Singleton Instance
window.zynBackend = new BackendService();
