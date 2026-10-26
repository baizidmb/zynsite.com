// api/notify.js - Vercel Serverless Function
// Secure Server-Side Notification Handler for ZynSite
// ZERO secrets are exposed to client-side JavaScript or visitors.

module.exports = async function handler(req, res) {
  // CORS setup for modern fetch clients
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { type, data, waLink } = body;

    if (!data) {
      return res.status(400).json({ error: 'Missing notification payload data' });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Helper to sanitize HTML for Telegram HTML parse_mode
    const escapeHtml = str => String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    let tgResult = { status: 'skipped', reason: 'Environment variables TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not configured on server' };

    if (token && chatId) {
      const isOrder = type === 'order';
      const typeTitle = isOrder
        ? '🛍️ নতুন ওয়েবসাইট অর্ডার এসেছে!'
        : '📅 নতুন লাইভ ডেমো ও কনসালটেশন বুকিং!';

      const nowStr = new Date().toLocaleString('bn-BD', {
        timeZone: 'Asia/Dhaka',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const priceText = data.price ? `৳${Number(data.price).toLocaleString('en-US')}` : 'কাস্টম বাজেট';
      const advanceText = data.advance_amount ? `৳${Number(data.advance_amount).toLocaleString('en-US')}` : '';
      const dueText = data.due_amount ? `৳${Number(data.due_amount).toLocaleString('en-US')}` : '';

      const lines = isOrder ? [
        `⚡️ <b>${typeTitle} — ZynSite.com</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🆔 <b>অর্ডার আইডি:</b> <code>#${escapeHtml(data.order_id || 'N/A')}</code>`,
        `👤 <b>গ্রাহকের নাম:</b> ${escapeHtml(data.client_name || 'N/A')}`,
        `📱 <b>মোবাইল / WA:</b> <code>${escapeHtml(data.client_phone || 'N/A')}</code>`,
        `🏢 <b>ব্যবসার নাম:</b> ${escapeHtml(data.business_name || 'দেওয়া হয়নি')}`,
        `🔗 <b>পেজ / লিঙ্ক:</b> ${data.page_link ? escapeHtml(data.page_link) : 'দেওয়া হয়নি'}`,
        `📦 <b>প্যাকেজ:</b> ${escapeHtml(data.package_name || 'N/A')}`,
        `💰 <b>মূল্য:</b> <b>${priceText}</b>${advanceText ? ` (অগ্রিম: ${advanceText} | বকেয়া: ${dueText})` : ''}`,
        `📝 <b>নোট:</b> ${escapeHtml(data.notes || 'কোনো নোট নেই')}`,
        `⏰ <b>সময়:</b> ${nowStr}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        waLink ? `👉 <a href="${waLink}">গ্রাহকের সাথে WhatsApp-এ চ্যাট করুন</a>` : '',
        `🌐 <a href="https://zynsite.com/admin.html">ZynSite অ্যাডমিন প্যানেল দেখুন</a>`
      ].filter(Boolean) : [
        `⚡️ <b>${typeTitle} — ZynSite.com</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `🆔 <b>বুকিং আইডি:</b> <code>#${escapeHtml(data.booking_id || 'N/A')}</code>`,
        `👤 <b>গ্রাহকের নাম:</b> ${escapeHtml(data.client_name || 'N/A')}`,
        `📱 <b>মোবাইল / WA:</b> <code>${escapeHtml(data.client_phone || 'N/A')}</code>`,
        `🏢 <b>ব্যবসার নাম:</b> ${escapeHtml(data.business_name || 'দেওয়া হয়নি')}`,
        `🎯 <b>আলোচনার বিষয়:</b> ${escapeHtml(data.topic || 'N/A')}`,
        `📅 <b>মিটিং সময়:</b> ${escapeHtml(data.meeting_date || '')} (${escapeHtml(data.meeting_time || '')})`,
        `📡 <b>মাধ্যম:</b> ${escapeHtml(data.channel || 'Google Meet')}`,
        `📝 <b>নোট:</b> ${escapeHtml(data.notes || 'কোনো নোট নেই')}`,
        `⏰ <b>সময়:</b> ${nowStr}`,
        `━━━━━━━━━━━━━━━━━━━━`,
        waLink ? `👉 <a href="${waLink}">গ্রাহকের সাথে WhatsApp-এ চ্যাট করুন</a>` : '',
        `🌐 <a href="https://zynsite.com/admin.html">ZynSite অ্যাডমিন প্যানেল দেখুন</a>`
      ].filter(Boolean);

      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: lines.join('\n'),
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        });
        const tgData = await tgRes.json().catch(() => ({}));
        tgResult = { status: tgRes.ok ? 'sent' : 'failed', response: tgData };
      } catch (err) {
        tgResult = { status: 'error', error: err.message };
      }
    }

    return res.status(200).json({
      success: true,
      telegram: tgResult
    });
  } catch (error) {
    console.error('Notification dispatch server error:', error);
    return res.status(500).json({ error: error.message });
  }
};
