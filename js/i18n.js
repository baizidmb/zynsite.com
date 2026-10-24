/**
 * ZynSite Internationalization (i18n) Engine
 * Multi-Language (Bengali <-> English) & Multi-Currency (BDT <-> USD)
 * Automatic Bangladeshi IP & Geolocation Detection with LocalStorage Override
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    bn: {
      // Document
      page_title: "ZynSite | আপনার ফেসবুক ব্যবসাকে রূপান্তর করুন ২৪/৭ স্বয়ংক্রিয় সেলস মেশিনে",
      meta_description: "১-ক্লিক ক্যাশ-অন-ডেলিভারি ল্যান্ডিং পেজ, মেটা CAPI ট্র্যাকিং এবং Steadfast/Pathao অটোমেশন। ফ্রি .com ডোমেইন ও হোস্টিং সহ ৪৮-৭২ ঘণ্টায় ডেলিভারি!",

      // Top Bar
      top_announcement_left: "১০০% স্যাটিসফ্যাকশন ও ফ্রি সাপোর্ট গ্যারান্টি",
      top_announcement_center: "আজই ওয়েবসাইট বুকিংয়ে পাচ্ছেন ১ বছরের জন্য ফ্রি .com ডোমেইন ও সুপার-ফাস্ট হোস্টিং!",
      top_support_hours: "সরাসরি হোয়াটসঅ্যাপ সাপোর্ট (সকাল ১০টা - রাত ১২টা)",
      top_fb_title: "অফিসিয়াল ফেসবুক পেজ",
      top_email_title: "সাপোর্ট ইমেইল",

      // Navbar
      nav_brand_sub: "zynsite.com",
      nav_services: "সেবাসমূহ",
      nav_fcommerce: "এফ-কমার্স ল্যান্ডিং পেজ",
      nav_portfolio: "পোর্টফোলিও ও ডেমো",
      nav_calculator: "প্রাইস ক্যালকুলেটর",
      nav_pricing: "প্যাকেজসমূহ",
      nav_faq: "সাধারণ জিজ্ঞাসা",
      nav_track_order: "অর্ডার ট্র্যাক করুন",
      nav_demo: "ফ্রি ডেমো বুক করুন",
      nav_order: "সরাসরি অর্ডার",
      nav_popular_badge: "হট",

      // Hero
      hero_badge: "কাজ পছন্দ না হলে ১০০% মানি-ব্যাক গ্যারান্টি • ৪৮-৭২ ঘণ্টায় ফাস্ট ডেলিভারি",
      hero_title_1: "আপনার ফেসবুক বা ব্যবসাকে রূপান্তর করুন",
      hero_title_gradient: "২৪/৭ স্বয়ংক্রিয় সেলস মেশিনে",
      hero_title_2: "",
      hero_desc: "স্লো ওয়েবসাইট আর ইনবক্সে কাস্টমার হারানোর দিন শেষ। আমরা তৈরি করি এমন আধুনিক ওয়েবসাইট ও ১-ক্লিক ল্যান্ডিং পেজ যা বিজ্ঞাপনের খরচ কমায় এবং বিক্রি বাড়ায় ৩ গুণ পর্যন্ত।",
      hero_cta_order: "আজই ওয়েবসাইট অর্ডার করুন",
      hero_cta_calc: "ফ্রি ডেমো ও কনসালটেশন",
      hero_cta_whatsapp: "হোয়াটসঅ্যাপে চ্যাট করুন (১-ক্লিকে মেসেজ)",
      hero_cta_portfolio: "লাইভ ডেমো ও পোর্টফোলিও দেখুন",
      hero_cta_facebook: "অফিসিয়াল ফেসবুক পেজ",
      hero_fb_btn: "অফিসিয়াল ফেসবুক পেজ",
      hero_wa_btn: "হোয়াটসঅ্যাপ চ্যাট",
      hero_mail_btn: "সাপোর্ট ইমেইল",
      social_connect_title: "সরাসরি যোগাযোগ ও সাপোর্ট:",
      social_fb_title: "ফেসবুক পেজ (fb.com/zynsite)",
      social_wa_title: "হোয়াটসঅ্যাপ (+40 774 119 870)",
      social_mail_title: "ইমেইল (contact@zynsite.com)",
      social_phone_title: "সরাসরি কল (+40 774 119 870)",
      floating_fb_title: "অফিসিয়াল ফেসবুক পেজ (fb.com/zynsite)",
      floating_fb_label: "ফেসবুক পেজ",
      hero_support_hours_bd: "সরাসরি হোয়াটসঅ্যাপ সাপোর্ট (বাংলাদেশ সময় সকাল ১০টা - রাত ১২টা)",
      hero_whatsapp_text: "হ্যালো ZynSite, আমি ওয়েবসাইট বানাতে চাই। বিস্তারিত জানতে চাচ্ছি।",
      hero_trust_no_hidden: "কোনো হিডেন চার্জ নেই",
      global_agency_badge: "রোমানিয়া (EU) ও বাংলাদেশ থেকে পরিচালিত গ্লোবাল ওয়েব এজেন্সি",

      hero_prop_speed_title: "১.২ সেকেন্ড স্পিড",
      hero_prop_speed_desc: "Google PageSpeed ৯০+ লোডিং স্কোর",
      hero_prop_delivery_title: "৪৮-৭২ ঘণ্টায় ডেলিভারি",
      hero_prop_delivery_desc: "দ্রুততম সময়ে সম্পূর্ণ রেডি ওয়েবসাইট",
      hero_prop_guarantee_title: "৫০% অ্যাডভান্স গ্যারান্টি",
      hero_prop_guarantee_desc: "বাকি ৫০% কাজ বুঝে পাওয়ার পর",
      hero_prop_domain_title: "ফ্রি ডোমেইন ও হোস্টিং",
      hero_prop_domain_desc: "১ বছরের টপ-লেভেল ক্লাউড এসএসডি",

      // Native Hero Mockup
      hero_mockup_badge: "🔥 বেস্ট সেলার ফানেল",
      hero_mockup_title: "মর্ডান ফ্যাশন ও ড্রপশিপিং স্টোর",
      hero_mockup_subtitle: "১-ক্লিক ক্যাশ অন ডেলিভারি চেকআউট • মেটা CAPI ট্র্যাকিং সক্রিয়",
      hero_mockup_stat_sales_val: "৳১,২৪,৮০০+",
      hero_mockup_stat_sales_lbl: "গত ৭ দিনে অটো অর্ডার",
      hero_mockup_stat_roas_val: "৪.৮X",
      hero_mockup_stat_roas_lbl: "অ্যাডস কনভার্শন ROAS",
      hero_mockup_live_preview_btn: "লাইভ প্রিভিউ দেখুন",
      hero_mockup_pixel_title: "মেটা পিক্সেল ও CAPI অ্যাক্টিভ",
      hero_mockup_pixel_sub: "ROAS: 4.8X বৃদ্ধি",
      hero_mockup_courier_title: "Steadfast / Pathao API",
      hero_mockup_courier_sub: "অটো পার্সেল এন্ট্রি রেডি",
      mockup_store_name: "রয়েল প্রিমিয়াম শপ (Live COD Funnel)",
      mockup_live_status: "● লাইভ সেলস সক্রিয়",
      mockup_orders_count: "২৮ টি",
      mockup_conversion_rate: "৮.৪%",
      mockup_form_title: "অর্ডার কনফার্ম করুন (১-ক্লিক ক্যাশ-অন-ডেলিভারি)",
      mockup_form_zero_advance: "কোনো অগ্রিম পেমেন্ট নেই",
      mockup_field_name: "আপনার নাম",
      mockup_field_name_val: "তানভীর আহমেদ",
      mockup_field_phone: "মোবাইল নম্বর",
      mockup_field_phone_val: "01712-345678",
      mockup_field_address: "সম্পূর্ণ ঠিকানা",
      mockup_field_address_val: "হাউজ #১২, রোড #০৪, উত্তরা, ঢাকা",
      mockup_shipping_dhaka: "ঢাকার ভেতরে (৳৭০)",
      mockup_shipping_outside: "ঢাকার বাইরে (৳১৩০)",
      mockup_order_btn: "অর্ডার কনফার্ম করুন • ৳১,৪৫০ (ক্যাশ অন ডেলিভারি)",
      mockup_live_feed_title: "লাইভ কুরিয়ার ও পিক্সেল স্ট্রিম",
      mockup_feed_courier: "Steadfast API: পার্সেল #SF-9102 স্বয়ংক্রিয় বুকড",
      mockup_feed_capi: "Meta CAPI: Purchase Event Fired (ROAS 4.8X)",
      mockup_feed_fraud: "Fraud Guard: কুরিয়ার রিটার্ন রেট ০% • ভেরিফাইড",

      // Stats
      stat_projects_val: "১৫০+",
      stat_projects_lbl: "সফল প্রজেক্ট ডেলিভারি",
      stat_speed_val: "৩X",
      stat_speed_lbl: "গড় বিক্রয় ও কনভার্শন বৃদ্ধি",
      stat_rating_val: "৯৯%",
      stat_rating_lbl: "ক্লায়েন্ট সন্তুষ্টি রেটিং",
      stat_delivery_val: "<১.৫s",
      stat_delivery_lbl: "রকেট পেজ লোডিং স্পিড",

      // Solutions
      services_badge: "আমাদের সেবাসমূহ",
      services_title: "আপনার ব্যবসার প্রয়োজন অনুযায়ী আধুনিক ওয়েব সলিউশন",
      services_subtitle: "প্রতিটি ওয়েবসাইট তৈরি করা হয় কনভার্শন রেট বাড়ানো এবং সেলস বহুগুণ বৃদ্ধি করার লক্ষ্য নিয়ে।",
      services_view_details_btn: "বিস্তারিত দেখুন ও অর্ডার করুন",

      // F-Commerce
      fcommerce_badge: "🔥 এফ-কমার্স সুপার ফানেল",
      fcommerce_title: "ফেসবুক ইনবক্সে অর্ডার নেওয়া বন্ধ করুন, ১-ক্লিক ল্যান্ডিং পেজে সেলস বাড়ান ৩ গুণ!",
      fcommerce_subtitle: "ইনবক্সে দাম জানতে চাওয়া কাস্টমারদের রিপ্লাই দিতে দিতে দেরি হয়ে যায়? তৈরি করুন আল্ট্রা-ফাস্ট ল্যান্ডিং পেজ যেখানে কাস্টমার নিজেই অর্ডার প্লেস করবে।",
      fcommerce_problem_title: "❌ পুরনো পদ্ধতির সমস্যা (ইনবক্স / মেসেঞ্জার):",
      fcommerce_problem_desc: "অর্ডার কনফার্মেশনের আগেই কাস্টমার হারিয়ে যায়, ফেক অর্ডারের ছড়াছড়ি এবং কুরিয়ারে ম্যানুয়াল এন্ট্রিতে সময় নষ্ট।",
      fcommerce_problem_item_1: "কাস্টমার মেসেজ দিয়ে দাম জানার পর অফলাইন হয়ে যায় (৭০% ড্রপ-অফ)",
      fcommerce_problem_item_2: "ভুয়া ফোন নম্বর ও ফেইক ক্যাশ-অন-ডেলিভারি অর্ডারে কুরিয়ার চার্জ লস",
      fcommerce_problem_item_3: "ফেসবুক বিজ্ঞাপনে পিক্সেল CAPI না থাকায় অ্যাড কস্ট অনেক বেশি কাটে",
      fcommerce_problem_item_4: "রাতে ঘুমানোর সময়ে কাস্টমার এসে মেসেজ দিয়ে ফিরে যায়",

      fcommerce_solution_title: "✅ ZynSite স্মার্ট ল্যান্ডিং পেজের সমাধান:",
      fcommerce_solution_desc: "১ ক্লিকে ক্যাশ অন ডেলিভারি ফর্ম, সরাসরি কুরিয়ার এপিআই বুকিং এবং ২৪ ঘণ্টা স্বয়ংক্রিয় সেলস মেশিন।",
      fcommerce_solution_item_1: "মাত্র ১ ক্লিকে ক্যাশ অন ডেলিভারি (COD) চেকআউট ফর্ম",
      fcommerce_solution_item_2: "Steadfast / Pathao কুরিয়ারে সরাসরি ১-ক্লিক পার্সেল বুকিং",
      fcommerce_solution_item_3: "মেটা পিক্সেল ও কনভার্শন এপিআই (CAPI) ট্র্যাকিংয়ে বিজ্ঞাপনের ROAS দ্বিগুণ",
      fcommerce_solution_item_4: "২৪/৭ স্বয়ংক্রিয় সেলস ইঞ্জিন—আপনি ঘুমালেও ওয়েবসাইটে সেলস হতে থাকবে",

      fcommerce_feat_1_title: "১-ক্লিক ক্যাশ অন ডেলিভারি ফর্ম",
      fcommerce_feat_1_desc: "কোনো জটিল অ্যাকাউন্ট খোলা ছাড়াই কাস্টমার নাম, ফোন ও ঠিকানা লিখে ৫ সেকেন্ডে অর্ডার প্লেস করতে পারবে।",
      fcommerce_feat_2_title: "মেটা পিক্সেল ও কনভার্শন এপিআই (CAPI)",
      fcommerce_feat_2_desc: "iOS 14+ ট্র্যাকিং ব্লকার বাইপাস করে মেটা সার্ভার ট্র্যাকিং। প্রতিটি পারচেজ ইভেন্ট নিখুঁত রেকর্ড করে বিজ্ঞাপনের খরচ কমায়।",
      fcommerce_feat_3_title: "কুরিয়ার এপিআই অটোমেশন (Steadfast/Pathao)",
      fcommerce_feat_3_desc: "অর্ডার আসার সাথে সাথে এক ক্লিকে কুরিয়ার ড্যাশবোর্ডে পার্সেল বুকিং। কাস্টমারের পূর্ববর্তী ডেলিভারি হিস্ট্রি চেক করা যায়।",
      fcommerce_feat_4_title: "ফেইক অর্ডার রোধ ও ওটিপি ভেরিফিকেশন",
      fcommerce_feat_4_desc: "ভুয়া নম্বর দিয়ে রিটার্ন পার্সেল এড়াতে মোবাইল ওটিপি বা অগ্রিম ডেলিভারি চার্জ নেওয়ার বিকাশ গেটওয়ে।",
      fcommerce_feat_5_title: "১.২ সেকেন্ড আল্ট্রা-ফাস্ট লোডিং",
      fcommerce_feat_5_desc: "মোবাইলে পেজ খুলতে দেরি হলে কাস্টমার ব্যাক করে। আমাদের সাইট লোড হয় চোখের পলকে—Google PageSpeed স্কোর ৯০+ নিশ্চিত।",
      fcommerce_feat_6_title: "ফ্রি .com ডোমেইন ও ক্লাউড হোস্টিং",
      fcommerce_feat_6_desc: "১ বছরের ফ্রি টপ-লেভেল ডোমেইন ও সুপারফাস্ট NVMe SSD ক্লাউড হোস্টিং প্যাকেজের সাথেই সম্পূর্ণ ফ্রি দেওয়া হয়।",

      fcommerce_cta_title: "আপনার ফেসবুক ব্যবসার সেলস বাড়াতে প্রস্তুত?",
      fcommerce_cta_desc: "মাত্র ৪৮ ঘণ্টার মধ্যে পান আপনার ব্র্যান্ডেড ল্যান্ডিং পেজ। ৫০% অ্যাডভান্সে শুরু, বাকি ৫০% কাজ সন্তোষজনক হলে পরিশোধযোগ্য।",
      fcommerce_cta_btn: "এখনই ল্যান্ডিং পেজের অর্ডার দিন",

      // Tech Stack
      tech_badge: "উন্নত প্রযুক্তি ও অবকাঠামো",
      tech_title: "কেন আমাদের ওয়েবসাইটগুলো সবার চেয়ে আলাদা ও আল্ট্রা-ফাস্ট?",
      tech_subtitle: "আমরা শুধু ওয়েবসাইট তৈরি করি না, আপনার ব্যবসার জন্য একটি নির্ভরযোগ্য ও স্কেলেবল ডিজিটাল অ্যাসেট তৈরি করি।",
      tech_item_1_title: "ক্লাউড সিকিউর এসএসএল ও ফায়ারওয়াল",
      tech_item_1_desc: "ডিডস (DDoS) প্রটেকশন ও লেটেস্ট এসএসএল এনক্রিপশন যুক্ত, ফলে আপনার ও ক্লায়েন্টের তথ্য ১০০% নিরাপদ।",
      tech_item_2_title: "গুগল এসইও ফ্রেন্ডলি আর্কিটেকচার",
      tech_item_2_desc: "ক্লিন কোড ও স্কিমা মার্কআপের মাধ্যমে তৈরি, যাতে গুগল সার্চে আপনার সাইট খুব দ্রুত শীর্ষ ফলাফলে স্থান পায়।",
      tech_item_3_title: "১০০% রেসপন্সিভ ও মোবাইল-ফার্স্ট ইউআই",
      tech_item_3_desc: "বাংলাদেশি কাস্টমারদের ৯২% মোবাইল ব্যবহারকারী। আমাদের প্রতিটি লেআউট মোবাইল ডিভাইসের জন্য নিখুঁতভাবে অপ্টিমাইজড।",
      tech_item_4_title: "কোনো মাসিক বা বাৎসরিক হিডেন চার্জ নেই",
      tech_item_4_desc: "সম্পূর্ণ স্বচ্ছ বিলিং। ১ বছরের ডোমেইন ও হোস্টিং ফ্রি, পরবর্তী বছর শুধুমাত্র রিনিউয়াল ফি প্রযোজ্য।",
      tech_item_5_title: "সহজ বাংলা ড্যাশবোর্ড ও ভিডিও টিউটোরিয়াল",
      tech_item_5_desc: "টেকনিক্যাল কোনো জ্ঞান ছাড়াই আপনি প্রোডাক্ট আপলোড ও অর্ডার দেখতে পারবেন। সাথে থাকবে বিস্তারিত বাংলা ভিডিও গাইড।",
      tech_item_6_title: "২৪/৭ ইমার্জেন্সি সাপোর্ট ও ওয়ারেন্টি",
      tech_item_6_desc: "ডেলিভারির পরেও কোনো সমস্যা হলে আমাদের ডেডিকেটেড টিম সার্বক্ষণিক হোয়াটসঅ্যাপ ও ফোন কলে সহযোগিতা করবে।",

      // Portfolio
      portfolio_badge: "বাস্তব কাজের প্রমাণ",
      portfolio_title: "আমাদের সাম্প্রতিক সফল প্রজেক্ট ও ক্লায়েন্টদের ফলাফল",
      portfolio_subtitle: "দেখুন কিভাবে আমাদের তৈরি ল্যান্ডিং পেজ ও ওয়েবসাইট বাংলাদেশি উদ্যোক্তাদের সেলস কয়েকগুণ বাড়িয়ে দিয়েছে।",
      portfolio_tab_all: "সকল প্রজেক্ট",
      portfolio_tab_fcommerce: "এফ-কমার্স ল্যান্ডিং পেজ",
      portfolio_tab_corporate: "কর্পোরেট ওয়েবসাইট",
      portfolio_tab_personal: "পার্সোনাল ব্র্যান্ড",
      portfolio_tab_ecommerce: "ই-কমার্স শপ",
      portfolio_view_live_btn: "লাইভ ওয়েবসাইট প্রিভিউ",
      portfolio_case_study_btn: "কেস স্টাডি দেখুন",

      // Calculator
      calc_badge: "স্বচ্ছ প্রাইস ক্যালকুলেটর",
      calc_title: "কাস্টম প্রাইস ও ডেলিভারি সময় ক্যালকুলেটর",
      calc_subtitle: "আপনার ওয়েবসাইটের ধরন ও প্রয়োজনীয় ফিচারগুলো নির্বাচন করুন—মুহূর্তেই জেনে নিন মোট খরচ ও আনুমানিক ডেলিভারি সময়।",
      calc_step_1_title: "১. আপনার সাইটের ধরন নির্বাচন করুন:",
      calc_step_2_title: "২. পেজ সংখ্যা নির্ধারণ করুন:",
      calc_step_3_title: "৩. প্রয়োজনীয় স্পেশাল ফিচার ও অ্যাড-অন সিলেক্ট করুন:",
      calc_total_label: "আনুমানিক প্রজেক্ট বাজেট:",
      calc_time_label: "আনুমানিক ডেলিভারি সময়:",
      calc_guarantee_text: "🛡️ ৫০% অগ্রিম পরিশোধে বুকিং • বাকি ৫০% কাজ সন্তোষজনক হলে পরিশোধযোগ্য",
      calc_order_btn: "এই কনফিগারেশনে সরাসরি অর্ডার করুন",
      calc_whatsapp_btn: "হোয়াটসঅ্যাপে এই কোটেশন পাঠান",

      // Pricing
      pricing_badge: "সাশ্রয়ী প্যাকেজসমূহ",
      pricing_title: "স্বচ্ছ ও নির্দিষ্ট প্রাইসিং—কোনো হিডেন ফি নেই",
      pricing_subtitle: "আপনার বাজেট ও ব্যবসার লক্ষ্যের সাথে মিলে এমন প্যাকেজ বেছে নিন। প্রতিটি প্যাকেজে ডোমেইন ও হোস্টিং অন্তর্ভুক্ত।",
      pricing_selector_label: "কোন প্যাকেজটি আপনার জন্য সঠিক?",
      pricing_pill_fcommerce: "এফ-কমার্স ও ল্যান্ডিং পেজ",
      pricing_pill_corporate: "কর্পোরেট ও কোম্পানি",
      pricing_pill_personal: "ব্যক্তিগত ব্র্যান্ড ও ডাক্তার",
      pricing_pill_ecommerce: "মেগা ই-কমার্স শপ",
      pricing_sla_advance: "৫০% অ্যাডভান্সে শুরু • বাকি কাজ সন্তোষজনক হলে",
      pricing_order_btn: "এই প্যাকেজে অর্ডার করুন",

      pricing_guarantee_1_title: "১০০% নিরাপদ ও ঝুঁকিমুক্ত অর্ডার",
      pricing_guarantee_1_desc: "কাজ শুরুর আগে মাত্র ৫০% অ্যাডভান্স দিতে হবে। লাইভ সাইট বুঝে নিয়ে ১০০% সন্তুষ্ট হলে বাকি ৫০% পরিশোধযোগ্য।",
      pricing_guarantee_2_title: "সম্পূর্ণ ওয়েবসাইট আপনার মালিকানায়",
      pricing_guarantee_2_desc: "ডোমেইন, ক্লাউড হোস্টিং, সোর্স কোড ও ফুল অ্যাডমিন অ্যাক্সেস আপনার নিজের ইমেইলে হস্তান্তর করা হবে।",
      pricing_guarantee_3_title: "ফ্রি মেইনটেন্যান্স ও টেকনিক্যাল ওয়ারেন্টি",
      pricing_guarantee_3_desc: "ডেলিভারির পর সাইট ডাউন হওয়া বা কারিগরি জটিলতায় আমাদের টিম ফ্রিতে সমাধান করবে।",

      pricing_compare_title: "প্যাকেজগুলোর তুলনামূলক বিশ্লেষণ",
      pricing_compare_subtitle: "এক নজরে দেখে নিন কোন প্যাকেজে কি কি সুবিধা অন্তর্ভুক্ত রয়েছে।",

      // Testimonials
      testimonials_badge: "ক্লায়েন্টদের অভিজ্ঞতা",
      testimonials_title: "যাদের সাথে আমরা কাজ করেছি তাদের মতামত",
      testimonials_subtitle: "আমাদের ক্লায়েন্টদের সফলতাই আমাদের সেরা স্বীকৃতি ও কাজের প্রেরণা।",

      // FAQ
      faq_badge: "সচরাচর জিজ্ঞাসা",
      faq_title: "সাধারণ প্রশ্নোত্তর",
      faq_subtitle: "আপনার মনের যেকোনো প্রশ্নের দ্রুত ও স্পষ্ট সমাধান পেতে নিচের উত্তরগুলো পড়ুন।",
      faq_contact_title: "আপনার অন্য কোনো প্রশ্ন আছে কি?",
      faq_contact_desc: "আমাদের অভিজ্ঞ কনসালট্যান্টদের সাথে সরাসরি হোয়াটসঅ্যাপে কথা বলে আপনার সব দ্বিধা দূর করুন।",
      faq_contact_btn: "সরাসরি হোয়াটসঅ্যাপে কথা বলুন",

      // Modals - Order Modal
      modal_order_title: "সরাসরি ওয়েবসাইট অর্ডার করুন",
      modal_order_subtitle: "তথ্যগুলো পূরণ করুন। আমাদের টিম ১৫ মিনিটের মধ্যে আপনাকে কল করে রিকোয়ারমেন্ট নিশ্চিত করবে।",
      modal_order_badge_title: "নির্বাচিত প্যাকেজ:",
      modal_order_name_label: "আপনার পুরো নাম *",
      modal_order_name_placeholder: "যেমন: মোঃ আব্দুল্লাহ আল মামুন",
      modal_order_phone_label: "মোবাইল / হোয়াটসঅ্যাপ নম্বর *",
      modal_order_phone_placeholder: "যেমন: 017XXXXXXXX",
      modal_order_business_label: "ব্যবসা বা ব্র্যান্ডের নাম *",
      modal_order_business_placeholder: "যেমন: ফ্যাশন বিডি / রয়্যাল গ্যাজেটস",
      modal_order_link_label: "ফেসবুক পেজ বা বর্তমান ওয়েবসাইটের লিংক (যদি থাকে)",
      modal_order_link_placeholder: "facebook.com/yourpage",
      modal_order_notes_label: "আপনার স্পেশাল কোনো রিকোয়ারমেন্ট বা চাহিদা",
      modal_order_notes_placeholder: "কোনো বিশেষ ফিচার, কালার থিম বা রেফারেন্স ওয়েবসাইটের লিংক লিখতে পারেন...",
      modal_order_sla_title: "🛡️ ক্লায়েন্ট ট্রাস্ট: জিরো-রিস্ক ৩-ধাপের পেমেন্ট গ্যারান্টি (SLA)",
      modal_order_sla_step1: "<b>ধাপ ১:</b> কোনো অগ্রিম ছাড়া অর্ডার সাবমিট করুন ও ১৫ মিনিটের মধ্যে ফ্রি স্ট্র্যাটেজি কনসালটেশন নিন।",
      modal_order_sla_step2: "<b>ধাপ ২:</b> কাজের পরিধি ও লেআউট ডেমো বুঝে পেয়ে অফিসিয়াল ইনভয়েস সহ ৫০% অ্যাডভান্স পরিশোধ করুন।",
      modal_order_sla_step3: "<b>ধাপ ৩:</b> লাইভ সাইট সন্তোষজনকভাবে বুঝে পাওয়ার পর অবশিষ্ট ৫০% পরিশোধযোগ্য।",
      modal_order_submit_btn: "অর্ডার নিশ্চিত করুন (বিনা অগ্রিমে)",
      modal_order_submit_sub: "🔒 তথ্য ১০০% নিরাপদ ও এনক্রিপ্টেড • কোনো আগাম হিডেন চার্জ নেই",

      modal_success_title: "অর্ডার সফলভাবে গৃহীত হয়েছে!",
      modal_success_desc: "ধন্যবাদ! আপনার অর্ডারটি সিস্টেমে যুক্ত হয়েছে। আগামী ১৫ মিনিটের মধ্যে আমাদের প্রজেক্ট ম্যানেজার আপনার নম্বরে যোগাযোগ করবেন।",
      modal_success_order_id_lbl: "অর্ডার ট্র্যাকিং আইডি:",
      modal_success_client_lbl: "গ্রাহকের নাম:",
      modal_success_pkg_lbl: "নির্বাচিত প্যাকেজ:",
      modal_success_total_lbl: "মোট প্রজেক্ট বাজেট:",
      modal_success_invoice_btn: "অফিসিয়াল ইনভয়েস ডাউনলোড করুন (PDF)",
      modal_success_whatsapp_btn: "হোয়াটসঅ্যাপে অর্ডার ডিটেইলস পাঠান",
      modal_success_close_btn: "উইন্ডো বন্ধ করুন",

      // Modals - Demo Modal
      modal_demo_title: "১৫ মিনিটের ফ্রি লাইভ ডেমো মিটিং শিডিউল",
      modal_demo_subtitle: "আপনার স্ক্রিন শেয়ারে লাইভ ওয়েবসাইট ও অ্যাডমিন ড্যাশবোর্ড দেখুন এবং সরাসরি প্রশ্ন করুন।",
      modal_demo_name_label: "আপনার নাম *",
      modal_demo_name_placeholder: "আপনার পূর্ণ নাম লিখুন",
      modal_demo_phone_label: "হোয়াটসঅ্যাপ নম্বর *",
      modal_demo_phone_placeholder: "01XXXXXXXXX",
      modal_demo_channel_label: "মিটিংয়ের মাধ্যম *",
      modal_demo_channel_whatsapp: "হোয়াটসঅ্যাপ ভিডিও কল",
      modal_demo_channel_meet: "গুগল মিট (Google Meet)",
      modal_demo_channel_phone: "সাধারণ ফোন কল",
      modal_demo_date_label: "পছন্দের তারিখ *",
      modal_demo_time_label: "পছন্দের সময় *",
      modal_demo_topic_label: "আলোচনার বিষয় / ব্যবসার ধরন",
      modal_demo_topic_placeholder: "যেমন: এফ-কমার্স ল্যান্ডিং পেজ ও কুরিয়ার সেটআপ দেখতে চাই",
      modal_demo_submit_btn: "ডেমো স্লট নিশ্চিত করুন",
      modal_demo_success_title: "ডেমো মিটিং স্লট বুকিং সফল হয়েছে!",
      modal_demo_success_desc: "আপনার মিটিং শিডিউল কনফার্ম করা হয়েছে। নির্ধারিত সময়ে আমাদের সিনিয়র কনসালট্যান্ট আপনাকে কল করবেন।",

      // Modals - Order Tracker
      modal_tracker_title: "পাবলিক লাইভ অর্ডার ট্র্যাকার",
      modal_tracker_subtitle: "আপনার অর্ডার আইডি এবং নিবন্ধিত ফোন নম্বর দিয়ে রিয়েল-টাইম প্রজেক্ট অগ্রগতি দেখুন।",
      modal_tracker_id_label: "অর্ডার আইডি *",
      modal_tracker_id_placeholder: "যেমন: #ZS-2026-XXXX",
      modal_tracker_phone_label: "নিবন্ধিত মোবাইল নম্বর *",
      modal_tracker_phone_placeholder: "যেমন: 017XXXXXXXX",
      modal_tracker_submit_btn: "অর্ডারের অগ্রগতি দেখুন",
      modal_tracker_invoice_btn: "অফিসিয়াল ইনভয়েস ডাউনলোড করুন (PDF)",
      modal_tracker_whatsapp_btn: "সরাসরি হোয়াটসঅ্যাপে কথা বলুন",

      // Services Pricing & Actions
      service_starts_from: "শুরু মাত্র",
      service_order_btn: "অর্ডার করুন",
      service_consult_btn: "পরামর্শ নিন",
      service_price_fcommerce: "৳৩,৯৯০",
      service_price_corporate: "৳৭,৯৯০",
      service_price_personal: "৳৪,৯৯০",
      service_price_ecommerce: "৳১৪,৯৯০",
      service_price_optimization: "৳২,৯৯০",
      service_price_custom: "আলোচনা সাপেক্ষে",

      // Comparison Section
      compare_badge: "বাস্তব পার্থক্য দেখুন",
      compare_title: "সাধারণ ওয়েবসাইট বনাম <span class=\"font-en text-gradient-primary\">ZynSite</span> সেলস ইঞ্জিন",
      compare_subtitle: "কেন অনেক টাকা খরচ করে ওয়েবসাইট বানিয়েও বিক্রি বাড়ে না? কারণ সাধারণ ওয়েবসাইট ও হাই-কনভার্টিং সেলস ফানেল এক জিনিস নয়!",
      compare_bad_title: "সাধারণ ধীরগতির ওয়েবসাইট",
      compare_bad_1: "<b>স্লো লোডিং স্পিড (৫-১০ সেকেন্ড):</b> কাস্টমার পেজ লোড হওয়ার আগেই বিরক্ত হয়ে ফেসবুক ফিডে ফিরে যায়।",
      compare_bad_2: "<b>জটিল ও লম্বা চেকআউট:</b> অ্যাকাউন্ট খোলা, পাসওয়ার্ড তৈরি আর কার্ড ডিটেইলসের চক্করে ৮০% কাস্টমার অর্ডার ফেলে দেয়।",
      compare_bad_3: "<b>পিক্সেল ও ট্র্যাকিং দুর্বলতা:</b> ফেসবুক কনভার্শন এপিআই না থাকায় বিজ্ঞাপনের ডেটা নষ্ট হয় এবং প্রতি অর্ডারে অ্যাড কস্ট বেড়ে যায়।",
      compare_bad_4: "<b>ফেইক অর্ডারের ভোগান্তি:</b> ভুয়া ফোন নম্বর ও ঠিকানা দিয়ে কাস্টমার অর্ডার করে ডেলিভারি রিটার্ন চার্জের ক্ষতি করায়।",
      compare_bad_5: "<b>মোবাইলে ভাঙাচোরা লেআউট:</b> ৯৫% বাংলাদেশি কাস্টমার মোবাইলে অর্ডার করে, অথচ মোবাইল ভিউ অগোছালো থাকে।",
      compare_bad_result: "ফলাফল: বিজ্ঞাপনের টাকা অপচয় এবং অতিরিক্ত ড্রপ-অফ রেট",
      compare_good_badge: "সেরা পছন্দ (Recommended)",
      compare_good_title: "<span class=\"font-en\">ZynSite</span> হাই-কনভার্টিং সাইট",
      compare_good_1: "<b>রকেট গতি (&lt;১.৫ সেকেন্ড):</b> পলকের মধ্যে সাইট ওপেন হয়, ফলে ভিজিটর ড্রপ-অফ শূন্যের কোঠায় নেমে আসে।",
      compare_good_2: "<b>১-ক্লিক ক্যাশ-অন-ডেলিভারি (COD):</b> শুধু নাম, ঠিকানা ও ফোন নম্বর দিয়েই অর্ডার কনফার্ম — সর্বোচ্চ কনভার্শন রেট!",
      compare_good_3: "<b>মেটা পিক্সেল ও CAPI ইন্টিগ্রেশন:</b> ফেসবুকের এআই আলগোরিথামে সঠিক ক্রেতাকে টার্গেট করে অ্যাড কস্ট ৩০-৫০% কমিয়ে আনে।",
      compare_good_4: "<b>ওটিপি ও কুরিয়ার অটোমেশন:</b> অটোমেটেড OTP ভেরিফিকেশন, IP ব্লকিং ও কুরিয়ার ফ্রড চেকার (Courier Fraud Checker) থাকায় ফেইক অর্ডার শতভাগ প্রতিরোধ হয়।",
      compare_good_5: "<b>মোবাইল-ফার্স্ট প্রিমিয়াম ডিজাইন:</b> বড় ফন্ট, থাম্ব-ফ্রেন্ডলি বাটন এবং চোখে পড়ার মতো অফার টাইমার ব্যানার।",
      compare_good_result: "ফলাফল: ৩ গুণ বেশি সেলস ও নিশ্চিত মুনাফা বৃদ্ধি",
      compare_order_btn: "অর্ডার করুন →",

      // F-Commerce Case Card & Pills
      fcommerce_price_btn: "মাত্র ৳৩,৯৯০ তে ল্যান্ডিং পেজ নিন",
      fcommerce_demo_btn: "লাইভ ডেমো দেখুন",
      fcommerce_case_label: "লাইভ ক্লায়েন্ট কেস হিস্টোরি",
      fcommerce_case_growth: "৩২০% সেলস বৃদ্ধি",
      fcommerce_case_before_lbl: "ল্যান্ডিং পেজ নেওয়ার পূর্বে:",
      fcommerce_case_before_orders: "দৈনিক ৮-১০টি অর্ডার (মেসেঞ্জারে)",
      fcommerce_case_before_return: "রিটার্ন রেট: ১৮%",
      fcommerce_case_after_lbl: "ল্যান্ডিং পেজ নেওয়ার পর:",
      fcommerce_case_after_orders: "দৈনিক ৮৫+ অর্ডার (অটোমেটিক)",
      fcommerce_case_after_return: "রিটার্ন রেট: মাত্র ৩%",
      fcommerce_case_quote: "“ZynSite ভাইয়েরা মাত্র ৪৮ ঘণ্টায় যে ল্যান্ডিং পেজ বানিয়ে দিয়েছেন, তাতে আমার ক্যাম্পেইনের রেজাল্ট দ্বিগুণ হয়ে গেছে। কুরিয়ারে আর ম্যানুয়ালি এন্ট্রি দিতে হয় না!”",
      fcommerce_case_client: "মোঃ তানভীর আহমেদ",
      fcommerce_case_role: "উদ্যোক্তা, ঢাকা",
      fcommerce_case_action: "এই ডিজাইনে আমার ল্যান্ডিং পেজ চাই",

      // Process 4 Steps
      process_badge: "সহজ ও নির্বিঘ্ন প্রসেস",
      process_title: "কীভাবে আমরা কাজ করি: মাত্র ৪টি সহজ ধাপ",
      process_subtitle: "অর্ডার প্লেস করা থেকে শুরু করে লাইভ ওয়েবসাইট চালু হওয়া পর্যন্ত পুরো প্রক্রিয়াটি অত্যন্ত স্বচ্ছ।",
      process_step_1_title: "রিকোয়ারমেন্ট আলোচনা",
      process_step_1_desc: "আপনার প্রোডাক্ট, টার্গেট অডিয়েন্স এবং কাঙ্ক্ষিত লক্ষ্য জেনে নিয়ে নিখুঁত স্ট্র্যাটেজি তৈরি করি।",
      process_step_2_title: "ডিজাইন ড্রাফট ও ডেমো",
      process_step_2_desc: "আমরা আধুনিক ও আকর্ষণীয় প্রাথমিক লেআউট তৈরি করে আপনাকে দেখাই এবং আপনার ফিডব্যাক নিয়ে ফাইনাল করি।",
      process_step_3_title: "পিক্সেল ও কুরিয়ার সিঙ্ক",
      process_step_3_desc: "১-ক্লিক অর্ডার ফর্ম, মেটা পিক্সেল CAPI, বিকাশ গেটওয়ে এবং কুরিয়ার এপিআই সরাসরি ইন্টিগ্রেট করি।",
      process_step_4_title: "লাইভ টেস্ট ও ডেলিভারি",
      process_step_4_desc: "আপনার নিজের ডোমেইনে সাইট লাইভ করে সব অ্যাক্সেস বুঝিয়ে দিই এবং সাথে দিয়ে দিই বাংলা ভিডিও টিউটোরিয়াল।",

      // CTA Banner
      cta_banner_title: "আপনার ব্যবসাকে পরবর্তী লেভেলে নিয়ে যেতে প্রস্তুত?",
      cta_banner_desc: "প্রতিটি দিন দেরি মানেই কাস্টমার হারানো। আজই আপনার ওয়েবসাইট তৈরি শুরু করুন এবং স্বয়ংক্রিয়ভাবে বিক্রি বাড়ান।",
      cta_banner_order_btn: "এখনই ওয়েবসাইট অর্ডার করুন",
      cta_banner_demo_btn: "ফ্রি ডেমো সেশন বুক করুন",
      cta_banner_whatsapp_text: "যেকোনো তথ্যের জন্য সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন:",
      cta_banner_support_badge: "সরাসরি হোয়াটসঅ্যাপ সাপোর্ট (সকাল ১০টা - রাত ১২টা)",

      // Footer
      footer_desc: "আমরা বাংলাদেশি ব্যবসা ও ফেসবুক উদ্যোক্তাদের জন্য বিশ্বমানের, আল্ট্রা-ফাস্ট ও হাই-কনভার্টিং ওয়েবসাইট এবং ল্যান্ডিং পেজ তৈরি করি যা সেলস বাড়ায় এবং ব্র্যান্ড ভ্যালু প্রতিষ্ঠা করে।",
      footer_desc_short: "হাই-কনভার্টিং ওয়েবসাইট ও ১-ক্লিক সেলস ফানেল",
      footer_services_title: "সেবাসমূহ",
      footer_tools_title: "টুলস ও সাপোর্ট",
      footer_contact_title: "যোগাযোগ",
      footer_support_hours_badge: "সাপোর্ট: সকাল ১০টা - রাত ১২টা",
      footer_location: "গ্লোবাল অপারেশনস • ইউরোপ (EU) ও ঢাকা ডিজিটাল হাব",
      footer_copyright: "© 2026 ZynSite. সর্বস্বত্ব সংরক্ষিত।",
      footer_payment_partners: "পেমেন্ট পার্টনার: বিকাশ • নগদ • ব্যাংক ট্রান্সফার • রকেট",
      footer_sla_notice: "🛡️ সকল প্রজেক্ট ১০০% সন্তুষ্টির গ্যারান্টি ও অফিসিয়াল SLA এগ্রিমেন্ট দ্বারা সুরক্ষিত।",

      // Pricing Transparency & Mobile Sticky CTA
      pricing_transparency_guarantee: "💡 ১০০% স্বচ্ছতা গ্যারান্টি: আমাদের কোনো লুকানো চার্জ নেই এবং ১ম বছর ডোমেইন-হোস্টিং সম্পূর্ণ ফ্রি। ২য় বছর থেকে শুধুমাত্র নামমাত্র রেগুলার রিনিউয়াল ফি প্রযোজ্য হবে এবং ফুল কন্ট্রোল প্যানেল আপনার নামেই থাকবে।",
      sticky_support_online: "সাপোর্ট অনলাইন আছে",
      sticky_avg_reply: "গড় রিপ্লাই ১ মিনিটে",
      sticky_whatsapp_cta: "হোয়াটসঅ্যাপে চ্যাট করুন",

      // Device Switchers & Preview Storefront
      service_opt_badge: "অপ্টিমাইজেশন",
      nav_tracker: "অর্ডার ট্র্যাক",
      nav_book_demo: "ফ্রি ডেমো বুকিং",
      device_desktop: "ডেস্কটপ",
      device_tablet: "ট্যাবলেট",
      device_mobile: "মোবাইল",
      store_flash_sale_bar: "🔥 ফ্ল্যাশ সেল - ৪০% ছাড় | ফ্রি ক্যাশ-অন-ডেলিভারি অফার আর মাত্র ২ ঘণ্টা!",
      store_brand_name: "অরা লাক্স (Aura Luxe)",
      store_brand_sub: "লাক্সারি পারফিউমারি",
      store_badge_authentic: "১০০% অরিজিনাল",
      store_review_count: "4.9 (428 রিভিউ)",
      store_product_title: "অরা রয়্যাল উদ অ্যান্ড স্যাফরন এলিক্সির (১০০ মিলি)",
      store_product_price: "৳১,৪৫০",
      store_product_old_price: "৳২,৪০০",
      store_save_tag: "৪০% ছাড়",
      store_product_desc: "আগর কাঠ, জাফরান, অ্যাম্বারগ্রিস ও দামাস্ক গোলাপের রাজকীয় মিশ্রণে তৈরি। পোশাক ও ত্বকে ১৮ ঘণ্টারও বেশি সময় স্থায়ী সুবাস।",
      store_feat_1: "১৮+ ঘণ্টা লং-লাস্টিং",
      store_feat_2: "ক্যাশ অন ডেলিভারি",
      store_feat_3: "৩ দিনের ইজি রিটার্ন",
      store_feat_4: "স্টক মাত্র ৭টি বাকি",
      store_form_title: "১-ক্লিক ক্যাশ অন ডেলিভারি চেকআউট",
      store_form_subtitle: "কোনো অগ্রিম পেমেন্ট নেই • পণ্য হাতে পেয়ে টাকা দিন",
      store_badge_dispatch: "দ্রুত ডেলিভারি",
      store_name_label: "আপনার সম্পূর্ণ নাম:",
      store_name_placeholder: "যেমন: মোঃ তানভীর হাসান",
      store_phone_label: "মোবাইল নম্বর:",
      store_phone_placeholder: "০১XXXXXXXXX",
      store_addr_label: "সম্পূর্ণ ডেলিভারি ঠিকানা:",
      store_addr_placeholder: "বাসা নং, রোড, থানা ও জেলা",
      store_subtotal_label: "সাবটোটাল:",
      store_delivery_label: "ডেলিভারি চার্জ:",
      store_delivery_val: "ফ্রি (৳০)",
      store_total_label: "মোট প্রদেয় বিল:",
      store_confirm_btn: "অর্ডার কনফার্ম করুন (ক্যাশ অন ডেলিভারি)",
      store_success_title: "🎉 অভিনন্দন! অর্ডার কনফার্ম হয়েছে!",
      store_success_tracking: "অর্ডার ট্র্যাকিং আইডি: #ALX-9821",
      store_success_desc: "ধন্যবাদ! আপনার ক্যাশ-অন-ডেলিভারি অর্ডারটি গ্রহণ করা হয়েছে। দ্রুত পার্সেল ডেলিভারির জন্য আমাদের প্রতিনিধি কল করবেন।",
      store_test_again_btn: "আরেকটি টেস্ট অর্ডার দিন",
      modal_sales_growth: "সেলস বৃদ্ধি",
      modal_conversion_rate: "কনভার্শন রেট",
      modal_load_speed: "লোডিং গতি",
      modal_tech_features: "প্রজেক্টে ব্যবহৃত প্রযুক্তি ও ফিচার:",
      modal_close_btn: "বন্ধ করুন",
      modal_order_design_btn: "এই ডিজাইনে সাইট চাই",

      // Hero Trust & Mockup Extras
      hero_trust_advance: "৫০% শুরুতে • বাকি কাজ দেখে",
      hero_trust_ownership: "ফুল ডোমেইন-হোস্টিং মালিকানা আপনার",
      hero_trust_support: "ডেডিকেটেড টেকনিক্যাল সাপোর্ট",
      hero_trust_payment: "পেমেন্ট পার্টনার: বিকাশ • নগদ • ব্যাংক ট্রান্সফার",
      hero_mockup_auto_orders: "অটোমেটেড অর্ডার",
      hero_mockup_cvr: "কনভার্শন রেট",
      hero_mockup_dest: "গন্তব্য: উত্তরা, ঢাকা • ডেলিভারি টাইপ: COD",
      hero_mockup_verified_note: "কাস্টমার নম্বর সক্রিয় ও পূর্ববর্তী ডেলিভারি ৯৮%",
      hero_mockup_lcp_label: "LCP স্পিড লোড টাইম:",

      // Solutions Services Cards
      service_card_fcommerce_badge: "সেলস ফানেল",
      service_card_fcommerce_title: "F-Commerce ল্যান্ডিং পেজ",
      service_card_fcommerce_desc: "ফেসবুক ও ইনস্টাগ্রাম শপ ওনারদের জন্য ১-ক্লিক ক্যাশ অন ডেলিভারি, ফেসবুক CAPI ও কুরিয়ার কানেক্টেড ফানেল।",
      service_card_fcommerce_f1: "১-ক্লিক ক্যাশ অন ডেলিভারি ফর্ম",
      service_card_fcommerce_f2: "ফেসবুক মেটা পিক্সেল ও CAPI",
      service_card_fcommerce_f3: "কুরিয়ার এপিআই কানেকশন",
      service_card_fcommerce_f4: "গুগল পেজস্পিড ৯০+ গ্যারান্টি",

      service_card_corporate_badge: "কোম্পানি ব্র্যান্ডিং",
      service_card_corporate_title: "কর্পোরেট ও বিজনেস সাইট",
      service_card_corporate_desc: "প্রতিষ্ঠানের আন্তর্জাতিক মানসম্পন্ন উপস্থিতি, প্রফেশনাল বিজনেস ইমেইল এবং দেশি-বিদেশি লিড জেনারেশন পোর্টাল।",
      service_card_corporate_f1: "৫-১৫ পেজের মার্জিত লেআউট",
      service_card_corporate_f2: "সার্ভিস ও প্রজেক্ট ক্যাটালগ",
      service_card_corporate_f3: "গুগল সার্চ এসইও অপ্টিমাইজেশন",
      service_card_corporate_f4: "বিজনেস ইমেইল ও সিকিউর সার্ভার",

      service_card_personal_badge: "পার্সোনাল ব্র্যান্ড",
      service_card_personal_title: "ব্যক্তিগত পোর্টফোলিও সাইট",
      service_card_personal_desc: "ডাক্তার, কনসালট্যান্ট, ট্রেইনার ও ফ্রিল্যান্সারদের নিজস্ব পরিচিতি, সিভি ডাউনলোড ও অ্যাপয়েন্টমেন্ট শিডিউলিং।",
      service_card_personal_f1: "বায়ো ও প্রজেক্ট শোকেস",
      service_card_personal_f2: "১-ক্লিক সিভি/প্রোফাইল ডাউনলোড",
      service_card_personal_f3: "মিটিং ও সিরিয়াল বুকিং সিস্টেম",
      service_card_personal_f4: "সোশ্যাল মিডিয়া ও রিভিউ সিঙ্ক",

      service_card_ecommerce_badge: "ফুল রিটেল স্টোর",
      service_card_ecommerce_title: "মাল্টি-প্রোডাক্ট ই-কমার্স",
      service_card_ecommerce_desc: "হাজারো প্রোডাক্ট, ইনভেন্টরি, কার্ট, কুপন ডিসকাউন্ট, অটোমেটেড পেমেন্ট ও ইনভয়েস সহ ফুল অনলাইন মেগা শপ।",
      service_card_ecommerce_f1: "আনলিমিটেড প্রোডাক্ট ও ভ্যারিয়েশন",
      service_card_ecommerce_f2: "SSLCommerz/bKash পেমেন্ট",
      service_card_ecommerce_f3: "কাস্টমার অ্যাকাউন্ট ও ট্র্যাকিং",
      service_card_ecommerce_f4: "অটোমেটিক ইনভয়েস প্রিন্টিং",

      service_card_speed_badge: "স্পিড বুস্টার",
      service_card_speed_title: "স্পিড ও এসইও অপ্টিমাইজেশন",
      service_card_speed_desc: "পুরনো ও স্লো ওয়েবসাইটকে রূপান্তর করুন মাত্র ১.৫ সেকেন্ডের রকেট গতিতে। ড্রপ-অফ রেট কমিয়ে সেলস বাড়ান।",
      service_card_speed_f1: "গুগল পেজস্পিড ৯০+ গ্যারান্টি",
      service_card_speed_f2: "ইমেজ কম্প্রেশন ও কোড ক্লিন",
      service_card_speed_f3: "ফেসবুক পিক্সেল ও GA4 ফিক্স",
      service_card_speed_f4: "সাইবার সিকিউরিটি ফায়ারওয়াল",

      service_card_custom_badge: "কাস্টম প্রজেক্ট",
      service_card_custom_title: "কাস্টম ওয়েব সফটওয়্যার",
      service_card_custom_desc: "হোটেল ও রেস্তোরাঁ কিউআর মেনু, ইনভয়েসিং, রিয়েল এস্টেট প্রপার্টি লিস্টিং বা বিশেষ ব্যবসায়িক অটোমেশন প্ল্যাটফর্ম।",
      service_card_custom_f1: "আপনার চাহিদা অনুযায়ী কাস্টম কোডিং",
      service_card_custom_f2: "ড্যাশবোর্ড ও রোল-বেসড ইউজার এক্সেস",
      service_card_custom_f3: "থার্ড পার্টি এপিআই ইন্টিগ্রেশন",
      service_card_custom_f4: "লাইফটাইম ডাটাবেজ ব্যাকআপ",

      fcommerce_case_title: "ফেসবুক উদ্যোক্তাদের জন্য বিশেষ তৈরি ল্যান্ডিং পেজ",
      fcommerce_case_desc_top: "মেসেঞ্জারে কাস্টমারকে \"দাম কত?\", \"ডেলিভারি চার্জ কত?\" উত্তর দিতে দিতে ক্লান্ত? আর কাস্টমারও দেরি দেখে অন্য পেজ থেকে কিনে নিচ্ছে?",
      fcommerce_case_desc_bot: "আমাদের ১-পেজ ফাস্ট ল্যান্ডিং পেজ আপনার পুরো সেলস প্রক্রিয়াকে করবে অটোমেটিক!",
      fcommerce_case_brand_name: "অরা লাক্স (Aura Luxe & Co.)",

      // Calculator Sidebar Extras
      calc_summary_title: "তাৎক্ষণিক কোটেশন সামারি",
      calc_summary_badge: "স্বচ্ছ প্রাইসিং",
      calc_timeline_lbl: "সময়সীমা:",
      calc_advance_badge: "৫০% অ্যাডভান্স",
      calc_config_lbl: "কনফিগারেশন:",
      calc_benefit_1: "১ বছরের ফ্রি ডোমেইন ও ক্লাউড হোস্টিং",
      calc_benefit_2: "সম্পূর্ণ সোর্স কোড ও সি-প্যানেল অ্যাক্সেস",
      calc_benefit_3: "টেকনিক্যাল সাপোর্ট গ্যারান্টি (সকাল ১০টা - রাত ১২টা)",

      // 3-Step Guarantee & Custom Request
      guarantee_badge: "১০০% নিরাপদ ও ঝুঁকিমুক্ত অর্ডার গ্যারান্টি",
      guarantee_sub: "আপনার টাকা ও সময়ের শতভাগ সুরক্ষা নিশ্চিত করতে আমাদের ৩-ধাপের স্বচ্ছ পলিসি",
      guarantee_step_1_num: "ধাপ ০১",
      guarantee_step_1_title: "অর্ডার সাবমিশন ও কল",
      guarantee_step_1_desc: "সহজেই অর্ডার সাবমিট করুন এবং ১৫ মিনিটের মধ্যে কনফার্মেশন ও স্ট্র্যাটেজি কল পান।",
      guarantee_step_2_num: "ধাপ ০২",
      guarantee_step_2_title: "অফিসিয়াল ইনভয়েস ও ৫০% অ্যাডভান্স",
      guarantee_step_2_desc: "কাজের পরিধি বুঝে পেয়ে অফিসিয়াল রিসিটসহ ৫০% অ্যাডভান্স পরিশোধ করে কাজ শুরু।",
      guarantee_step_3_num: "ধাপ ০৩",
      guarantee_step_3_title: "লাইভ ডেলিভারি",
      guarantee_step_3_desc: "৪৮-৭২ ঘণ্টায় ওয়েবসাইট বুঝে নিয়ে সন্তুষ্ট হলে বাকি ৫০% পরিশোধ করুন।",
      custom_req_title: "আপনার কি বিশেষ কোনো কাস্টম রিকোয়ারমেন্ট আছে?",
      custom_req_desc: "আমাদের সিনিয়র কনসালট্যান্টের সাথে ফ্রি ভিডিও কলে বা সরাসরি ফোনে কথা বলে কাস্টম কোটেশন বুঝে নিন।",
      custom_req_btn: "ফ্রি স্ট্র্যাটেজি সেশন বুক করুন",

      // Process Numbers
      process_step_num_1: "০১",
      process_step_num_2: "০২",
      process_step_num_3: "০৩",
      process_step_num_4: "০৪",

      // Testimonials
      testimonial_1_quote: "“আগে দিনে ৫০ জন ইনবক্সে আসত, কিন্তু অর্ডার দিত ৫ জন। ZynSite-এর ১-পেজ ল্যান্ডিং পেজ নেওয়ার পর এখন অ্যাড থেকে সরাসরি ৮০% কাস্টমার ক্যাশ অন ডেলিভারিতে অর্ডার কনফার্ম করে নিচ্ছে!”",
      testimonial_1_avatar: "রা",
      testimonial_1_name: "রাশেদুল হাসান",
      testimonial_1_role: "ফাউন্ডার, ক্লথিং জোন (ঢাকা)",
      testimonial_2_quote: "“আমাদের আইটি সার্ভিসের জন্য একটি কর্পোরেট সাইটের প্রয়োজন ছিল। মাত্র ৫ দিনের মধ্যে চমৎকার আধুনিক ডিজাইন উপহার দিয়েছেন। বিদেশি ক্লায়েন্টদের কাছে আমাদের গ্রহণযোগ্যতা অনেক বেড়েছে।”",
      testimonial_2_avatar: "সা",
      testimonial_2_name: "সাদিয়া রহমান",
      testimonial_2_role: "ম্যানেজিং ডিরেক্টর, টেকভিশন বিডি",
      testimonial_3_quote: "“আমার গ্যাজেট বিজনেসে আগে রিটার্ন রেট ছিল ১৫% এর উপর। এদের তৈরি সিস্টেমে ওটিপি ভেরিফিকেশন ও কুরিয়ার ট্র্যাকিং থাকায় রিটার্ন রেট এখন মাত্র ২%! প্রতি মাসে হাজার হাজার টাকা বেঁচে যাচ্ছে।”",
      testimonial_3_avatar: "না",
      testimonial_3_name: "নাজমুল হোসেন",
      testimonial_3_role: "ওনার, গ্যাজেট এক্সপ্রেস (চট্টগ্রাম)",

      // Order Modal Options & Steps
      modal_order_select_pkg_lbl: "প্যাকেজ নির্বাচন করুন:",
      modal_order_pkg_opt_fcommerce: "এফ-কমার্স সুপার সেলার (৳৩,৯৯০)",
      modal_order_pkg_opt_corporate: "কর্পোরেট বিজনেস প্রো (৳৭,৯৯০)",
      modal_order_pkg_opt_personal: "পার্সোনাল ব্র্যান্ড মাস্টার (৳৪,৯৯০)",
      modal_order_pkg_opt_ecommerce: "মেগা ই-কমার্স এম্পায়ার (৳১৪,৯৯০)",
      modal_order_summary_advance_lbl: "প্রারম্ভিক অ্যাডভান্স (৫০%):",
      modal_order_step_1_lbl: "ধাপ ১: কনফার্মেশন",
      modal_order_step_2_lbl: "ধাপ ২: ইনভয়েস ও ৫০% অ্যাডভান্স",
      modal_order_step_3_lbl: "ধাপ ৩: লাইভ ডেলিভারি",
      modal_order_success_delivery_lbl: "প্রজেক্ট ডেলিভারি:",
      modal_order_success_delivery_val: "৪৮-৭২ ঘণ্টার মধ্যে",

      // Demo Modal Slots & Topics
      demo_btn_today: "আজকে (জরুরি)",
      demo_btn_today_val: "আজকে (জরুরি স্লট)",
      demo_btn_tomorrow: "আগামীকাল",
      demo_btn_after: "পরশু দিন",
      demo_topic_opt_1: "এফ-কমার্স ল্যান্ডিং পেজ দিয়ে সেলস বাড়ানো",
      demo_topic_opt_2: "কর্পোরেট ওয়েবসাইটের ডেমো ও প্রজেক্ট প্ল্যান",
      demo_topic_opt_3: "ব্যক্তিগত ব্র্যান্ডিং ও পোর্টফোলিও",
      demo_topic_opt_4: "ই-কমার্স শপ ও পেমেন্ট গেটওয়ে ইন্টিগ্রেশন",
      demo_topic_opt_5: "পুরনো ওয়েবসাইটের স্পিড বাড়ানো",
      demo_success_code_lbl: "ডেমো ট্র্যাকিং কোড:",
      demo_success_time_lbl: "নির্ধারিত সময়:",
      demo_success_channel_lbl: "মিটিং মাধ্যম:",
      demo_success_wa_btn: "হোয়াটসঅ্যাপে মিটিং লিংক ও কনফার্মেশন নিন",
      demo_success_close_btn: "উইন্ডো বন্ধ করুন",

      // Tracker Modal
      tracker_milestone_title: "প্রজেক্ট লাইভ অগ্রগতি (৪টি পর্যায়):",

      // Generic Controls
      modal_close_window: "উইন্ডো বন্ধ করুন",
      modal_close_title: "উইন্ডো বন্ধ করুন (Esc)",

      // Added Final Localization Keys
      og_image_alt: "ZynSite - হাই-কনভার্টিং ওয়েবসাইট ও সেলস ফানেল সলিউশন",
      calc_step_1_num: "১",
      calc_step_2_num: "২",
      calc_step_3_num: "৩",
      calc_default_price: "৳৩,৯৯০",
      calc_default_days: "২ দিন",
      calc_default_summary: "F-Commerce ল্যান্ডিং পেজ • ১টি পেজ • ৪টি স্পেশাল ফিচার",
      footer_admin_link: "অ্যাডমিন",
      order_advance_fcommerce: "৳১,৯৯৫",
      demo_default_time: "আজকে • ০৭:০০ PM",
      trk_default_price: "৳০",
      modal_project_sales_val: "+৩২০%",
      modal_project_cvr_val: "৮.৪%",
      modal_project_speed_val: "১.১ সেকেন্ড",

      // ZynBot AI Chatbot
      bot_tooltip_text: "হাই! ওয়েবসাইটের খরচ বা ডেমো জানতে চান?",
      bot_tooltip_sub: "তাৎক্ষণিক উত্তর পেতে ক্লিক করুন",
      bot_header_title: "ZynSite এআই অ্যাসিস্ট্যান্ট",
      bot_header_badge: "AI 2.0",
      bot_header_status: "তাৎক্ষণিক উত্তর • ২৪/৭ অটোমেটেড",
      bot_whatsapp_btn: "হোয়াটসঅ্যাপে সরাসরি কথা বলুন",
      bot_reset_btn: "কথোপকথন রিসেট করুন",
      bot_close_btn: "চ্যাট বন্ধ করুন",
      bot_input_placeholder: "আপনার প্রশ্ন লিখুন (যেমন: দাম কত, সময় লাগবে কত?)...",
      bot_send_btn: "পাঠান",
      bot_disclaimer: "⚡ রিয়েল-টাইম এআই সাপোর্ট • অফিসিয়াল হোয়াটসঅ্যাপ: +40 774 119 870",
      bot_chip_pricing: "💰 প্যাকেজ ও দাম কত?",
      bot_chip_demo: "✨ লাইভ ডেমো (Aura Luxe)",
      bot_chip_funnel: "⚡ ১-ক্লিক ল্যান্ডিং পেজ কী?",
      bot_chip_fraud: "🛡️ ফেইক অর্ডার কীভাবে থামাবে?",
      bot_chip_terms: "📝 পেমেন্ট ও ডেলিভারি নিয়ম",
      bot_chip_whatsapp: "💬 সরাসরি হোয়াটসঅ্যাপে কথা বলুন",
      bot_chip_brief: "📋 কাস্টম প্রজেক্ট ব্রিফ দিন",
      bot_welcome_msg: "আসসালামু আলাইকুম! 👋 আমি <b>ZynBot</b>, ZynSite-এর ইন্টেলিজেন্ট সেলস অ্যাসিস্ট্যান্ট।<br><br>আপনার বিজনেস গ্রোথ ও ওয়েবসাইট সম্পর্কে যেকোনো প্রশ্ন আমাকে জিজ্ঞেস করতে পারেন (যেমন: <b>প্যাকেজ ও খরচ</b>, <b>১-ক্লিক ফানেল</b>, <b>ফেইক অর্ডার রোধ</b> অথবা <b>ডেলিভারি টাইম</b>)।<br><br>নিচের বাটনগুলো ক্লিক করেও দ্রুত জেনে নিতে পারেন:",
      bot_typing: "ZynBot টাইপ করছে...",
      bot_form_biz_name: "আপনার ব্যবসার নাম:",
      bot_form_biz_name_ph: "যেমন: StyleZone BD",
      bot_form_website_type: "ওয়েবসাইটের ধরন:",
      bot_form_opt_fcommerce: "F-Commerce ল্যান্ডিং পেজ (১-ক্লিক COD)",
      bot_form_opt_ecommerce: "ফুল ই-কমার্স ওয়েবসাইট",
      bot_form_opt_lead: "লিড জেনারেশন / সার্ভিস সাইট",
      bot_form_opt_custom: "কাস্টম ড্যাশবোর্ড / অন্যান্য",
      bot_form_phone: "ফোন / হোয়াটসঅ্যাপ নম্বর:",
      bot_form_phone_ph: "০১৭xxxxxxxx",
      bot_form_submit_btn: "💬 হোয়াটসঅ্যাপে প্রজেক্ট শুরু করুন",
      bot_view_pricing_btn: "প্যাকেজসমূহ দেখুন",
      bot_open_calc_btn: "ক্যালকুলেটর খুলুন",
      bot_view_portfolio_btn: "পোর্টফোলিও ডেমো দেখুন",
      bot_brief_success: "✅ আপনার তথ্য তৈরি হয়েছে! হোয়াটসঅ্যাপ চ্যাট ওপেন হচ্ছে..."
    },

    en: {
      // Document
      page_title: "ZynSite | High-Converting Websites, Landing Pages & E-Commerce",
      meta_description: "We build ultra-fast, high-converting websites and landing pages engineered to multiply sales, capture high-ticket leads, and scale your brand globally.",

      // Top Bar
      top_announcement_left: "100% Satisfaction & Dedicated Support Guarantee",
      top_announcement_center: "Book your website today & get a <b>Free .com Domain & Super-Fast Cloud SSD Hosting for 1 Year!</b>",
      top_support_hours: "Instant WhatsApp Support (10:00 AM – 12:00 AM BST)",
      top_fb_title: "Official Facebook Page",
      top_email_title: "Support Email",

      // Navbar
      nav_brand_sub: "zynsite.com",
      nav_services: "Services",
      nav_fcommerce: "F-Commerce Landing",
      nav_portfolio: "Portfolio & Demos",
      nav_calculator: "Price Calculator",
      nav_pricing: "Packages",
      nav_faq: "FAQ",
      nav_track_order: "Track Order",
      nav_demo: "Book Free Demo",
      nav_order: "Order Now",
      nav_popular_badge: "HOT",

      // Hero
      hero_badge: "100% Money-Back Guarantee if Not Satisfied • Rapid 48-72h Delivery",
      hero_title_1: "Transform Your Business Into A",
      hero_title_gradient: "24/7 Automated Sales Engine",
      hero_title_2: "",
      hero_desc: "End sluggish load times and abandoned checkouts forever. We build ultra-fast, high-converting websites and 1-click landing pages that slash ad costs and multiply sales up to 3X.",
      hero_cta_order: "Order Your Website Today",
      hero_cta_calc: "Free Demo & Consultation",
      hero_cta_whatsapp: "Chat on WhatsApp (1-Click Message)",
      hero_cta_portfolio: "View Live Demos & Portfolio",
      hero_cta_facebook: "Official Facebook Page",
      hero_fb_btn: "Official Facebook Page",
      hero_wa_btn: "WhatsApp Chat",
      hero_mail_btn: "Support Email",
      social_connect_title: "Direct Connect & Support:",
      social_fb_title: "Facebook Page (fb.com/zynsite)",
      social_wa_title: "WhatsApp (+40 774 119 870)",
      social_mail_title: "Email (contact@zynsite.com)",
      social_phone_title: "Phone Call (+40 774 119 870)",
      floating_fb_title: "Official Facebook Page (fb.com/zynsite)",
      floating_fb_label: "Facebook Page",
      hero_support_hours_bd: "Direct WhatsApp Support (10 AM - 12 AM BST)",
      hero_whatsapp_text: "Hello ZynSite, I want to build a high-converting website for my business.",
      hero_trust_no_hidden: "No Hidden Charges",
      global_agency_badge: "Global Web Agency operated from Romania (EU) & Bangladesh",

      hero_prop_speed_title: "1.2s Blazing Speed",
      hero_prop_speed_desc: "Google PageSpeed 90+ Core Web Vitals",
      hero_prop_delivery_title: "48–72h Delivery",
      hero_prop_delivery_desc: "Fast-track turnaround without cutting corners",
      hero_prop_guarantee_title: "50/50 SLA Guarantee",
      hero_prop_guarantee_desc: "50% upfront, remaining 50% only when satisfied",
      hero_prop_domain_title: "Free Domain & Hosting",
      hero_prop_domain_desc: "1 year premium cloud SSD hosting included",

      // Native Hero Mockup
      hero_mockup_badge: "🔥 Best-Seller Funnel",
      hero_mockup_title: "Modern Fashion & Direct-to-Consumer Store",
      hero_mockup_subtitle: "1-Click Checkout • Meta Conversions API (CAPI) Active",
      hero_mockup_stat_sales_val: "$12,480+",
      hero_mockup_stat_sales_lbl: "Automated Orders (Last 7 Days)",
      hero_mockup_stat_roas_val: "4.8X",
      hero_mockup_stat_roas_lbl: "Targeted Ad Campaign ROAS",
      hero_mockup_live_preview_btn: "View Live Preview",
      hero_mockup_pixel_title: "Meta Pixel & CAPI Active",
      hero_mockup_pixel_sub: "ROAS: 4.8X Increase",
      hero_mockup_courier_title: "Steadfast / Pathao API",
      hero_mockup_courier_sub: "Auto Parcel Dispatch Ready",
      mockup_store_name: "Royal Premium Store (Live COD Funnel)",
      mockup_live_status: "● Live Sales Active",
      mockup_orders_count: "28 Orders",
      mockup_conversion_rate: "8.4%",
      mockup_form_title: "Confirm Your Order (1-Click Cash on Delivery)",
      mockup_form_zero_advance: "Zero Upfront Payment",
      mockup_field_name: "Your Full Name",
      mockup_field_name_val: "Tanvir Ahmed",
      mockup_field_phone: "Mobile Number",
      mockup_field_phone_val: "+880 1712-345678",
      mockup_field_address: "Full Delivery Address",
      mockup_field_address_val: "House #12, Road #04, Uttara, Dhaka",
      mockup_shipping_dhaka: "Inside Dhaka ($1)",
      mockup_shipping_outside: "Outside Dhaka ($2)",
      mockup_order_btn: "Confirm Order • $29 (Cash on Delivery)",
      mockup_live_feed_title: "Live Courier & Pixel Stream",
      mockup_feed_courier: "Steadfast API: Parcel #SF-9102 Auto Booked",
      mockup_feed_capi: "Meta CAPI: Purchase Event Fired (ROAS 4.8X)",
      mockup_feed_fraud: "Fraud Guard: Courier Return Rate 0% • Verified",

      // Stats
      stat_projects_val: "150+",
      stat_projects_lbl: "Successful Projects Delivered",
      stat_speed_val: "3X",
      stat_speed_lbl: "Avg. Sales & Conversion Growth",
      stat_rating_val: "99%",
      stat_rating_lbl: "Client Satisfaction Rate",
      stat_delivery_val: "<1.5s",
      stat_delivery_lbl: "Rocket Page Loading Speed",

      // Solutions
      services_badge: "Our Solutions",
      services_title: "Engineered For Conversions, Built For Unstoppable Scale",
      services_subtitle: "Every website we architect is laser-focused on turning cold visitors into high-value paying customers.",
      services_view_details_btn: "Explore & Order Package",

      // F-Commerce
      fcommerce_badge: "🔥 High-Converting Sales Funnel",
      fcommerce_title: "Stop Losing Orders in Direct Messages. Triple Your Sales with a 1-Click Landing Page!",
      fcommerce_subtitle: "Tired of wasting hours answering DMs only for buyers to vanish? Deploy an ultra-fast sales funnel where customers buy directly in seconds.",
      fcommerce_problem_title: "❌ The Costly Problem With Old-Fashioned DM Selling:",
      fcommerce_problem_desc: "Customers drop off before confirming, fake orders drive up delivery returns, and manual spreadsheets eat your valuable time.",
      fcommerce_problem_item_1: "Visitors ask for the price and disappear immediately (70%+ drop-off rate)",
      fcommerce_problem_item_2: "Bogus phone numbers & fake Cash-on-Delivery orders cause expensive return fees",
      fcommerce_problem_item_3: "Without Meta Pixel CAPI, your ad budget bleeds with terrible ROAS",
      fcommerce_problem_item_4: "Shoppers who arrive while you sleep bounce to competitors who offer instant checkout",

      fcommerce_solution_title: "✅ The ZynSite High-Converting Solution:",
      fcommerce_solution_desc: "Frictionless 1-click checkout, automated courier dispatch, and a 24/7 revenue-generating machine.",
      fcommerce_solution_item_1: "Frictionless 1-Click Cash on Delivery (COD) & Online Checkout",
      fcommerce_solution_item_2: "Automated Courier & Shipping API Integration for Instant Parcel Creation",
      fcommerce_solution_item_3: "Server-Side Meta Pixel & Conversions API (CAPI) for 2X–3X Higher ROAS",
      fcommerce_solution_item_4: "Always-On 24/7 Automated Sales Engine That Closes Customers While You Sleep",

      fcommerce_feat_1_title: "Frictionless 1-Click Checkout",
      fcommerce_feat_1_desc: "No forced accounts or tedious forms. Customers enter their name, phone, and address to place an order in under 5 seconds.",
      fcommerce_feat_2_title: "Meta Pixel & Conversions API (CAPI)",
      fcommerce_feat_2_desc: "Bypasses iOS 14+ ad blockers with direct server-side event tracking. Captures 100% of purchase data to slash ad spend.",
      fcommerce_feat_3_title: "Automated Shipping & Courier API",
      fcommerce_feat_3_desc: "Orders instantly sync with your courier dashboard with zero manual copy-pasting. Verifies customer delivery history in real-time.",
      fcommerce_feat_4_title: "Fraud Order Prevention & Verification",
      fcommerce_feat_4_desc: "Eliminates bogus orders using phone verification and advance shipping charge options.",
      fcommerce_feat_5_title: "1.2-Second Blazing Speed",
      fcommerce_feat_5_desc: "Every second of delay costs 20% in lost conversions. We deliver guaranteed 90+ Google PageSpeed performance.",
      fcommerce_feat_6_title: "Free .com Domain & SSD Cloud Hosting",
      fcommerce_feat_6_desc: "Includes 1 full year of top-level domain registration and enterprise NVMe SSD cloud hosting completely free.",

      fcommerce_cta_title: "Ready to Scale Your Online Revenue?",
      fcommerce_cta_desc: "Launch your custom branded landing page in as fast as 48 hours. 50% deposit to start, remaining 50% only after 100% satisfaction.",
      fcommerce_cta_btn: "Order Your Landing Page Now",

      // Tech Stack
      tech_badge: "Engineering & Architecture",
      tech_title: "Why ZynSite Websites Outperform Traditional Agencies",
      tech_subtitle: "We don't just write code — we architect scalable digital assets built to endure, rank, and dominate your niche.",
      tech_item_1_title: "Enterprise SSL & Threat Firewall",
      tech_item_1_desc: "Built-in DDoS protection and modern SSL encryption keep your business and customer data bulletproof.",
      tech_item_2_title: "Search-Engine-First Semantic Architecture",
      tech_item_2_desc: "Valid Schema.org structured data and clean markup ensure your site climbs to Google's top rankings rapidly.",
      tech_item_3_title: "Mobile-First Adaptive Design",
      tech_item_3_desc: "Over 85% of traffic is mobile. Every button, hero, and modal is hand-tuned for tactile thumb-friendly navigation.",
      tech_item_4_title: "Zero Hidden Fees or Surprise Subscriptions",
      tech_item_4_desc: "100% transparent pricing. 1 year of domain and hosting included free, with standard renewal rates thereafter.",
      tech_item_5_title: "Intuitive Admin Panel & Video Walkthrough",
      tech_item_5_desc: "Manage products, check order pipelines, and download invoices effortlessly without any technical background.",
      tech_item_6_title: "Dedicated Warranty & Fast-Track Support",
      tech_item_6_desc: "Continuous post-launch peace of mind with our dedicated team available via WhatsApp and priority ticketing.",

      // Portfolio
      portfolio_badge: "Proven Track Record",
      portfolio_title: "Recent Client Showcases & Proven Case Studies",
      portfolio_subtitle: "Explore how our custom web architectures have helped real businesses achieve record-breaking growth.",
      portfolio_tab_all: "All Showcases",
      portfolio_tab_fcommerce: "Landing Pages",
      portfolio_tab_corporate: "Corporate Portals",
      portfolio_tab_personal: "Personal Brands",
      portfolio_tab_ecommerce: "E-Commerce",
      portfolio_view_live_btn: "Preview Live Site",
      portfolio_case_study_btn: "View Case Study",

      // Calculator
      calc_badge: "Transparent Cost Estimator",
      calc_title: "Interactive Website Price & Timeline Estimator",
      calc_subtitle: "Configure your site type, scope, and specialized features to generate an instant, itemized estimate in real time.",
      calc_step_1_title: "1. Select Your Website Solution:",
      calc_step_2_title: "2. Choose Your Page Architecture:",
      calc_step_3_title: "3. Add Specialized Features & Add-ons:",
      calc_total_label: "Estimated Project Budget:",
      calc_time_label: "Estimated Delivery Timeline:",
      calc_guarantee_text: "🛡️ Zero-Risk: 50% Deposit to Start • Remaining 50% Due Upon Satisfactory Delivery",
      calc_order_btn: "Order With This Exact Configuration",
      calc_whatsapp_btn: "Send This Quotation to WhatsApp",

      // Pricing
      pricing_badge: "Transparent Tiers",
      pricing_title: "Clear, Fixed-Price Packages With Zero Hidden Fees",
      pricing_subtitle: "Choose the package tailored to your exact business objectives. Every tier includes free domain, hosting, and SLA guarantee.",
      pricing_selector_label: "Which Solution Best Fits Your Business?",
      pricing_pill_fcommerce: "Landing Pages & Dropship",
      pricing_pill_corporate: "Corporate & Enterprise",
      pricing_pill_personal: "Personal Brand & Experts",
      pricing_pill_ecommerce: "Full E-Commerce Empire",
      pricing_sla_advance: "50% deposit to start • Remaining 50% only when 100% satisfied",
      pricing_order_btn: "Order This Package",

      pricing_guarantee_1_title: "Zero-Risk 50/50 Milestone Guarantee",
      pricing_guarantee_1_desc: "Pay only 50% upfront to initiate development. You inspect the live demo and pay the remaining 50% only when thrilled.",
      pricing_guarantee_2_title: "100% Complete Client Ownership",
      pricing_guarantee_2_desc: "Domain, cloud server, source code, and full admin credentials are transferred exclusively to your name.",
      pricing_guarantee_3_title: "Free Technical Warranty & Maintenance",
      pricing_guarantee_3_desc: "Full coverage post-launch. If anything ever breaks or requires technical adjustments, our team resolves it free.",

      pricing_compare_title: "Detailed Feature Comparison Matrix",
      pricing_compare_subtitle: "Compare side-by-side capabilities across all ZynSite development packages.",

      // Testimonials
      testimonials_badge: "Client Testimonials",
      testimonials_title: "What Our Partners Say About Working With Us",
      testimonials_subtitle: "Real results from entrepreneurs, executives, and business owners who scaled with ZynSite.",

      // FAQ
      faq_badge: "Got Questions?",
      faq_title: "Frequently Asked Questions",
      faq_subtitle: "Clear, direct answers regarding our workflow, guarantees, deliverables, and technology.",
      faq_contact_title: "Have a Custom Request or Unique Project?",
      faq_contact_desc: "Connect directly with our Principal Architects on WhatsApp for immediate strategic guidance.",
      faq_contact_btn: "Chat Directly on WhatsApp",

      // Modals - Order Modal
      modal_order_title: "Direct Project Order",
      modal_order_subtitle: "Complete the details below. Our Lead Developer will reach out within 15 minutes to confirm requirements.",
      modal_order_badge_title: "Selected Package:",
      modal_order_name_label: "Your Full Name *",
      modal_order_name_placeholder: "e.g., Alexander Wright",
      modal_order_phone_label: "Phone / WhatsApp Number *",
      modal_order_phone_placeholder: "e.g., +1 234 567 8900",
      modal_order_business_label: "Business or Company Name *",
      modal_order_business_placeholder: "e.g., Apex Global Trading Ltd",
      modal_order_link_label: "Current Website or Social Media Page (Optional)",
      modal_order_link_placeholder: "https://facebook.com/yourbrand or yoursite.com",
      modal_order_notes_label: "Project Notes, Requirements or Reference Sites",
      modal_order_notes_placeholder: "Tell us about your target audience, color preferences, or specific features you need...",
      modal_order_sla_title: "🛡️ Client Trust: Zero-Risk 3-Step Payment Guarantee (SLA)",
      modal_order_sla_step1: "<b>Step 1:</b> Submit your request with zero upfront cost & receive a free 15-minute kickoff strategy call.",
      modal_order_sla_step2: "<b>Step 2:</b> Review and approve the detailed scope and mockup before paying a 50% deposit backed by an official invoice.",
      modal_order_sla_step3: "<b>Step 3:</b> Settle the remaining 50% balance only after your website is live and performing to 100% satisfaction.",
      modal_order_submit_btn: "Confirm Order (Zero Upfront Risk)",
      modal_order_submit_sub: "🔒 100% Encrypted & Confidential • No Hidden Fees",

      modal_success_title: "Order Received Successfully!",
      modal_success_desc: "Thank you! Your project request has been queued in our production pipeline. A Project Manager will reach out within 15 minutes.",
      modal_success_order_id_lbl: "Order Tracking ID:",
      modal_success_client_lbl: "Client Name:",
      modal_success_pkg_lbl: "Selected Package:",
      modal_success_total_lbl: "Total Project Budget:",
      modal_success_invoice_btn: "Download Official Invoice (PDF)",
      modal_success_whatsapp_btn: "Send Order Details to WhatsApp",
      modal_success_close_btn: "Close Window",

      // Modals - Demo Modal
      modal_demo_title: "Schedule a Free 15-Minute Live Strategy Call",
      modal_demo_subtitle: "Watch a live screen-share walkthrough of our high-converting funnels and ask questions in real time.",
      modal_demo_name_label: "Full Name *",
      modal_demo_name_placeholder: "Your Name",
      modal_demo_phone_label: "WhatsApp / Phone Number *",
      modal_demo_phone_placeholder: "+1 234 567 8900",
      modal_demo_channel_label: "Preferred Meeting Channel *",
      modal_demo_channel_whatsapp: "WhatsApp Video Call",
      modal_demo_channel_meet: "Google Meet",
      modal_demo_channel_phone: "Direct Phone Call",
      modal_demo_date_label: "Preferred Date *",
      modal_demo_time_label: "Preferred Time *",
      modal_demo_topic_label: "Discussion Topic / Project Scope",
      modal_demo_topic_placeholder: "e.g., E-commerce funnel architecture and shipping automation",
      modal_demo_submit_btn: "Confirm Strategy Consultation",
      modal_demo_success_title: "Demo Call Scheduled!",
      modal_demo_success_desc: "Your consultation session has been reserved. A Senior Consultant will connect with you at the scheduled time.",

      // Modals - Order Tracker
      modal_tracker_title: "Public Live Order Tracker",
      modal_tracker_subtitle: "Enter your Order ID and registered phone number to track real-time project milestones.",
      modal_tracker_id_label: "Order ID *",
      modal_tracker_id_placeholder: "e.g., #ZS-2026-XXXX",
      modal_tracker_phone_label: "Registered Phone Number *",
      modal_tracker_phone_placeholder: "e.g., +1 234 567 8900",
      modal_tracker_submit_btn: "Track Project Progress",
      modal_tracker_invoice_btn: "Download Official Invoice (PDF)",
      modal_tracker_whatsapp_btn: "Chat Directly on WhatsApp",

      // Services Pricing & Actions
      service_starts_from: "Starting at",
      service_order_btn: "Order Package",
      service_consult_btn: "Free Consultation",
      service_price_fcommerce: "$39",
      service_price_corporate: "$79",
      service_price_personal: "$49",
      service_price_ecommerce: "$149",
      service_price_optimization: "$29",
      service_price_custom: "Custom Quote",

      // Comparison Section
      compare_badge: "Direct Comparison",
      compare_title: "Traditional Amateur Websites vs <span class=\"font-en text-gradient-primary\">ZynSite</span> Sales Engine",
      compare_subtitle: "Why do most business websites fail to convert visitors? Because a static brochure is fundamentally different from an automated sales funnel!",
      compare_bad_title: "Sluggish Generic Website",
      compare_bad_1: "<b>Slow 5-10s Loading:</b> Cold traffic bounces in frustration before your products or value proposition even appear.",
      compare_bad_2: "<b>Tedious Complex Checkout:</b> Mandatory account creation and multi-step forms trigger 80%+ drop-off rates.",
      compare_bad_3: "<b>Broken Tracking & Attribution:</b> Without server-side Meta CAPI, your ad data is lost to iOS blocks and ad spend bleeds.",
      compare_bad_4: "<b>Fake Order Vulnerability:</b> Bogus phone numbers and spam checkout entries inflict costly courier return charges.",
      compare_bad_5: "<b>Clunky Mobile UX:</b> Over 85% of traffic is mobile, yet disorganized mobile layouts alienate high-intent buyers.",
      compare_bad_result: "Outcome: Wasted ad spend and sky-high visitor abandonment",
      compare_good_badge: "Recommended Choice",
      compare_good_title: "<span class=\"font-en\">ZynSite</span> Conversion Engine",
      compare_good_1: "<b>1.2s Blazing Speed:</b> Instant page loading keeps visitors glued to your offer and eliminates bounce rates.",
      compare_good_2: "<b>1-Click Frictionless Checkout:</b> Customers enter name, phone, and address to confirm purchases in under 5 seconds.",
      compare_good_3: "<b>Meta CAPI Server Tracking:</b> Direct server integration cuts acquisition costs by 30-50% and supercharges AI ad delivery.",
      compare_good_4: "<b>Automated Anti-Fraud & Courier Sync:</b> Automated OTP verification, IP blocking, and Courier Fraud Checker to completely eliminate fake orders.",
      compare_good_5: "<b>Thumb-Friendly Mobile UX:</b> High-contrast CTA buttons, fluid scroll triggers, and mobile-optimized conversion hierarchy.",
      compare_good_result: "Outcome: 3X Higher Conversions and Maximum Return on Ad Spend",
      compare_order_btn: "Order Now →",

      // F-Commerce Case Card & Pills
      fcommerce_price_btn: "Launch Landing Page at Only $39",
      fcommerce_demo_btn: "View Live Demo",
      fcommerce_case_label: "Live Client Growth Showcase",
      fcommerce_case_growth: "+320% Revenue Surge",
      fcommerce_case_before_lbl: "Before ZynSite Funnel:",
      fcommerce_case_before_orders: "8-10 Orders/day (Manual DMs)",
      fcommerce_case_before_return: "Return Rate: 18%",
      fcommerce_case_after_lbl: "After ZynSite Funnel:",
      fcommerce_case_after_orders: "85+ Orders/day (Automated)",
      fcommerce_case_after_return: "Return Rate: Only 3%",
      fcommerce_case_quote: "“The custom landing page built by ZynSite in just 48 hours completely doubled our campaign ROAS. Zero manual order entry and seamless checkout!”",
      fcommerce_case_client: "Tanvir Ahmed",
      fcommerce_case_role: "Direct-to-Consumer Founder",
      fcommerce_case_action: "Build My Site Like This",

      // Process 4 Steps
      process_badge: "Seamless Workflow",
      process_title: "How We Deliver: 4 Simple Steps",
      process_subtitle: "From initial kickoff to live launch, our process is fast, transparent, and frictionless.",
      process_step_1_title: "Strategic Discovery",
      process_step_1_desc: "We analyze your offer, audience, and goals to build the highest-converting strategy for your market.",
      process_step_2_title: "Prototype & Live Demo",
      process_step_2_desc: "We build a fully responsive, modern layout draft and refine every element based on your direct feedback.",
      process_step_3_title: "Tracking & API Integration",
      process_step_3_desc: "We wire up 1-click checkout, server-side Meta Pixel CAPI, payment gateways, and automated shipping APIs.",
      process_step_4_title: "Launch & Delivery",
      process_step_4_desc: "We deploy to your custom domain, hand over 100% of credentials, and provide a comprehensive video walkthrough.",

      // CTA Banner
      cta_banner_title: "Ready to Accelerate Your Online Revenue?",
      cta_banner_desc: "Every day without a high-converting website is revenue left on the table. Launch your site today and automate your sales pipeline.",
      cta_banner_order_btn: "Start Your Project Now",
      cta_banner_demo_btn: "Book a Free Strategy Demo",
      cta_banner_whatsapp_text: "Questions? Chat directly with our engineering team on WhatsApp:",
      cta_banner_support_badge: "Instant WhatsApp Support (10:00 AM – 12:00 AM UTC+6)",

      // Footer
      footer_desc: "We build world-class, ultra-fast, high-converting websites and landing pages engineered to accelerate sales, capture leads, and establish authority for modern businesses.",
      footer_desc_short: "High-Converting Websites & 1-Click Sales Funnels",
      footer_services_title: "Services",
      footer_tools_title: "Tools & Support",
      footer_contact_title: "Contact",
      footer_support_hours_badge: "Support: 10:00 AM – 12:00 AM UTC+6",
      footer_location: "Global Operations • Bucharest (EU) & Dhaka Digital Hub",
      footer_copyright: "© 2026 ZynSite. All rights reserved.",
      footer_payment_partners: "Payment Methods: Visa • MasterCard • Bank Transfer • bKash",
      footer_sla_notice: "🛡️ All client projects backed by our 100% Satisfaction Guarantee and official SLA agreement.",

      // Pricing Transparency & Mobile Sticky CTA
      pricing_transparency_guarantee: "💡 100% Transparency Guarantee: No hidden fees ever. 1st year domain & cloud hosting are 100% free. From Year 2 onward, only regular nominal renewal fees apply, and the full control panel remains registered under your name.",
      sticky_support_online: "Support is Online",
      sticky_avg_reply: "Avg. reply in 1 min",
      sticky_whatsapp_cta: "Chat on WhatsApp",

      // Device Switchers & Preview Storefront
      service_opt_badge: "Optimization",
      nav_tracker: "Track Order",
      nav_book_demo: "Book Free Demo",
      device_desktop: "Desktop",
      device_tablet: "Tablet",
      device_mobile: "Mobile",
      store_flash_sale_bar: "🔥 Flash Sale - 40% OFF | Free Cash-on-Delivery Offer Ends in 2 Hours!",
      store_brand_name: "Aura Luxe & Co.",
      store_brand_sub: "Luxury Haute Parfumerie",
      store_badge_authentic: "100% Authentic",
      store_review_count: "4.9 (428 Reviews)",
      store_product_title: "Royal Oud & Saffron Elixir Extrait de Parfum (100ml)",
      store_product_price: "$29",
      store_product_old_price: "$49",
      store_save_tag: "40% OFF",
      store_product_desc: "Crafted with aged Cambodian agarwood, Persian saffron, royal ambergris, and Damask rose. 18+ hours long-lasting projection on skin and fabric.",
      store_feat_1: "18+ Hours Long Lasting",
      store_feat_2: "Cash on Delivery Available",
      store_feat_3: "3-Day Easy Return Policy",
      store_feat_4: "Only 7 Items Left in Stock",
      store_form_title: "1-Click Cash on Delivery Checkout",
      store_form_subtitle: "Zero Advance Required • Pay When You Receive Your Order",
      store_badge_dispatch: "Priority Dispatch",
      store_name_label: "Your Full Name:",
      store_name_placeholder: "e.g., Alexander Wright",
      store_phone_label: "Phone / Mobile Number:",
      store_phone_placeholder: "e.g., +1 234 567 8900",
      store_addr_label: "Full Delivery Address:",
      store_addr_placeholder: "Street Address, City, State & Zip Code",
      store_subtotal_label: "Subtotal:",
      store_delivery_label: "Shipping Charge:",
      store_delivery_val: "Free ($0)",
      store_total_label: "Total Payable:",
      store_confirm_btn: "Confirm Order (Cash on Delivery)",
      store_success_title: "🎉 Congratulations! Order Confirmed!",
      store_success_tracking: "Order Tracking ID: #ALX-9821",
      store_success_desc: "Thank you! Your Cash-on-Delivery order has been received. Our fulfillment team will contact you shortly before priority dispatch.",
      store_test_again_btn: "Place Another Test Order",
      modal_sales_growth: "Sales Growth",
      modal_conversion_rate: "Conversion Rate",
      modal_load_speed: "Loading Speed",
      modal_tech_features: "Technologies & Specialized Features Built-in:",
      modal_close_btn: "Close",
      modal_order_design_btn: "Build My Site Like This",

      // Hero Trust & Mockup Extras
      hero_trust_advance: "50% Upfront • Balance Upon Approval",
      hero_trust_ownership: "100% Domain & Hosting Ownership Yours",
      hero_trust_support: "Dedicated Priority Technical Support",
      hero_trust_payment: "Payment Methods: Visa • MasterCard • Wire • bKash",
      hero_mockup_auto_orders: "Automated Orders",
      hero_mockup_cvr: "Conversion Rate",
      hero_mockup_dest: "Destination: Global Hub • Type: 1-Click COD",
      hero_mockup_verified_note: "Customer active • Delivery success rate 98%",
      hero_mockup_lcp_label: "Core Web Vitals LCP:",

      // Solutions Services Cards
      service_card_fcommerce_badge: "Sales Funnel",
      service_card_fcommerce_title: "F-Commerce Landing Page",
      service_card_fcommerce_desc: "Engineered for social media brands: 1-click Cash on Delivery, Meta CAPI tracking & direct courier automation.",
      service_card_fcommerce_f1: "1-Click Cash on Delivery Checkout",
      service_card_fcommerce_f2: "Meta Pixel & Conversions API (CAPI)",
      service_card_fcommerce_f3: "Automated Shipping & Courier API",
      service_card_fcommerce_f4: "Google PageSpeed 90+ Score",

      service_card_corporate_badge: "Enterprise Branding",
      service_card_corporate_title: "Corporate Business Website",
      service_card_corporate_desc: "Establish high-trust global credibility with sleek multi-page corporate portals and custom inquiry funnels.",
      service_card_corporate_f1: "5 to 15 Elegant Responsive Pages",
      service_card_corporate_f2: "Service & Case Study Catalog",
      service_card_corporate_f3: "Semantic SEO & Google Ranking",
      service_card_corporate_f4: "Official Domain Email & SSL",

      service_card_personal_badge: "Personal Brand",
      service_card_personal_title: "Executive Portfolio & Profile",
      service_card_personal_desc: "Command higher rates with an executive portfolio featuring 1-click CV downloads and booking calendars.",
      service_card_personal_f1: "Executive Bio & Project Showcase",
      service_card_personal_f2: "1-Click Resume/CV Download",
      service_card_personal_f3: "Consultation & Booking Calendar",
      service_card_personal_f4: "Social Channels & Reviews Sync",

      service_card_ecommerce_badge: "Digital Retail Store",
      service_card_ecommerce_title: "Multi-Product E-Commerce",
      service_card_ecommerce_desc: "Scale to thousands of SKUs with automated card/mobile payments, inventory sync, coupons, and PDF invoicing.",
      service_card_ecommerce_f1: "Unlimited Products & Variations",
      service_card_ecommerce_f2: "Credit Card & Mobile Payments",
      service_card_ecommerce_f3: "Customer Portal & Order History",
      service_card_ecommerce_f4: "Automated Invoices & PDF Export",

      service_card_speed_badge: "Speed Booster",
      service_card_speed_title: "Speed & Core Web Vitals Overhaul",
      service_card_speed_desc: "Transform slow, sluggish pages into instant 1.2-second rockets. Eliminate bounce rates and boost sales.",
      service_card_speed_f1: "Google PageSpeed 90+ Score",
      service_card_speed_f2: "Asset Compression & Clean Code",
      service_card_speed_f3: "Pixel CAPI & Analytics 4 Audit",
      service_card_speed_f4: "WAF & Security Hardening",

      service_card_custom_badge: "Custom Engineering",
      service_card_custom_title: "Custom Web Applications",
      service_card_custom_desc: "Bespoke SaaS, QR menus, property portals, multi-vendor marketplaces, and customized digital workflows.",
      service_card_custom_f1: "Bespoke Architecture to Spec",
      service_card_custom_f2: "Role-Based Multi-User Access",
      service_card_custom_f3: "Third-Party API Integrations",
      service_card_custom_f4: "Automated Cloud DB Backups",

      fcommerce_case_title: "Engineered Exclusively for Modern E-Commerce Founders",
      fcommerce_case_desc_top: "Tired of answering hundreds of repetitive DMs only for customers to disappear to faster competitors?",
      fcommerce_case_desc_bot: "Our high-converting 1-page funnels automate your entire checkout and fulfillment pipeline!",
      fcommerce_case_brand_name: "Aura Luxe & Co.",

      // Calculator Sidebar Extras
      calc_summary_title: "Instant Quotation Summary",
      calc_summary_badge: "Fixed Pricing",
      calc_timeline_lbl: "Timeline:",
      calc_advance_badge: "50% Milestone",
      calc_config_lbl: "Configuration:",
      calc_benefit_1: "1 Year Free Domain & Cloud Hosting",
      calc_benefit_2: "Full Source Code & cPanel Ownership",
      calc_benefit_3: "Direct Technical Support Guarantee",

      // 3-Step Guarantee & Custom Request
      guarantee_badge: "100% Risk-Free Milestone Guarantee",
      guarantee_sub: "Our transparent 3-step SLA guarantees 100% protection of your capital and project timeline.",
      guarantee_step_1_num: "Step 01",
      guarantee_step_1_title: "Kickoff Call & Scope Alignment",
      guarantee_step_1_desc: "Submit your inquiry with zero upfront payment and receive a strategic kickoff call within 15 minutes.",
      guarantee_step_2_num: "Step 02",
      guarantee_step_2_title: "Official Invoice & 50% Deposit",
      guarantee_step_2_desc: "Approve the scope and wire a 50% deposit backed by a legally binding SLA and invoice.",
      guarantee_step_3_num: "Step 03",
      guarantee_step_3_title: "Live Launch & Handover",
      guarantee_step_3_desc: "Review your live website in 48-72h and pay the remaining 50% only when thrilled.",
      custom_req_title: "Have a Bespoke Requirement or Unique Workflow?",
      custom_req_desc: "Schedule a complimentary discovery call with our Senior Solutions Architect for a custom quote.",
      custom_req_btn: "Book Strategy Session",

      // Process Numbers
      process_step_num_1: "01",
      process_step_num_2: "02",
      process_step_num_3: "03",
      process_step_num_4: "04",

      // Testimonials
      testimonial_1_quote: "“We used to get 50 inquiries in our inbox daily with barely 5 closed orders. After launching ZynSite's 1-page checkout funnel, over 80% of our ad traffic converts directly on autopilot!”",
      testimonial_1_avatar: "RH",
      testimonial_1_name: "Rashedul Hasan",
      testimonial_1_role: "Founder, Clothing Zone",
      testimonial_2_quote: "“We required an international-standard corporate portal for our technology agency. ZynSite delivered in just 5 days with an elegant aesthetic that instantly won over foreign partners.”",
      testimonial_2_avatar: "SR",
      testimonial_2_name: "Sadia Rahman",
      testimonial_2_role: "Managing Director, TechVision Global",
      testimonial_3_quote: "“Return rates were destroying our margins at over 15%. ZynSite's automated SMS OTP verification and courier sync brought our returns down to 2%, saving us thousands monthly!”",
      testimonial_3_avatar: "NH",
      testimonial_3_name: "Nazmul Hossain",
      testimonial_3_role: "Owner, Gadget Express",

      // Order Modal Options & Steps
      modal_order_select_pkg_lbl: "Select Package:",
      modal_order_pkg_opt_fcommerce: "Sales Funnel ($39)",
      modal_order_pkg_opt_corporate: "Corporate Business Pro ($79)",
      modal_order_pkg_opt_personal: "Personal Brand Master ($49)",
      modal_order_pkg_opt_ecommerce: "Mega E-Commerce Empire ($149)",
      modal_order_summary_advance_lbl: "Upfront Deposit (50%):",
      modal_order_step_1_lbl: "Step 1: Confirmation",
      modal_order_step_2_lbl: "Step 2: Invoice & 50% Deposit",
      modal_order_step_3_lbl: "Step 3: Live Delivery",
      modal_order_success_delivery_lbl: "Project Turnaround:",
      modal_order_success_delivery_val: "Within 48–72 Hours",

      // Demo Modal Slots & Topics
      demo_btn_today: "Today (Urgent)",
      demo_btn_today_val: "Today (Urgent Slot)",
      demo_btn_tomorrow: "Tomorrow",
      demo_btn_after: "Day After Tomorrow",
      demo_topic_opt_1: "Triple Sales with 1-Click Funnel",
      demo_topic_opt_2: "Corporate Website & Scope Architecture",
      demo_topic_opt_3: "Personal Branding & Executive Portfolio",
      demo_topic_opt_4: "E-Commerce Store & Payment Automation",
      demo_topic_opt_5: "Core Web Vitals & Speed Optimization",
      demo_success_code_lbl: "Demo Tracking Code:",
      demo_success_time_lbl: "Scheduled Slot:",
      demo_success_channel_lbl: "Meeting Channel:",
      demo_success_wa_btn: "Get Meeting Link via WhatsApp",
      demo_success_close_btn: "Close Window",

      // Tracker Modal
      tracker_milestone_title: "Live Project Milestones (4 Phases):",

      // Generic Controls
      modal_close_window: "Close Window",
      modal_close_title: "Close Window (Esc)",

      // Added Final Localization Keys
      og_image_alt: "ZynSite - High-Converting Websites & Sales Funnel Solutions",
      calc_step_1_num: "1",
      calc_step_2_num: "2",
      calc_step_3_num: "3",
      calc_default_price: "$39",
      calc_default_days: "2 Days",
      calc_default_summary: "High-Converting Landing Page • 1 Page • 4 Special Features",
      footer_admin_link: "Admin",
      order_advance_fcommerce: "$19.50",
      demo_default_time: "Today • 07:00 PM",
      trk_default_price: "$0",
      modal_project_sales_val: "+320%",
      modal_project_cvr_val: "8.4%",
      modal_project_speed_val: "1.1s",

      // ZynBot AI Chatbot
      bot_tooltip_text: "Hi! Want to check website pricing or live demos?",
      bot_tooltip_sub: "Click for instant AI reply",
      bot_header_title: "ZynSite AI Assistant",
      bot_header_badge: "AI 2.0",
      bot_header_status: "Replies instantly • 24/7 Automated",
      bot_whatsapp_btn: "Chat Directly on WhatsApp",
      bot_reset_btn: "Reset Conversation",
      bot_close_btn: "Close Chat",
      bot_input_placeholder: "Type your question (e.g., pricing, delivery time)...",
      bot_send_btn: "Send",
      bot_disclaimer: "⚡ Real-time AI Support • Official WhatsApp: +40 774 119 870",
      bot_chip_pricing: "💰 Pricing & Packages",
      bot_chip_demo: "✨ Live Demo (Aura Luxe)",
      bot_chip_funnel: "⚡ What is 1-Click Funnel?",
      bot_chip_fraud: "🛡️ How to Stop Fake Orders?",
      bot_chip_terms: "📝 Payment & Delivery Terms",
      bot_chip_whatsapp: "💬 Chat on WhatsApp",
      bot_chip_brief: "📋 Submit Project Brief",
      bot_welcome_msg: "Hello there! 👋 I am <b>ZynBot</b>, ZynSite's intelligent sales assistant.<br><br>Ask me anything about scaling your business and website (e.g., <b>Pricing & Plans</b>, <b>1-Click COD Funnels</b>, <b>Fake Order Prevention</b>, or <b>Delivery Timeline</b>).<br><br>Or choose a quick topic below:",
      bot_typing: "ZynBot is typing...",
      bot_form_biz_name: "Your Business Name:",
      bot_form_biz_name_ph: "e.g., StyleZone BD",
      bot_form_website_type: "Website Type:",
      bot_form_opt_fcommerce: "F-Commerce Landing Page (1-Click COD)",
      bot_form_opt_ecommerce: "Full E-Commerce Store",
      bot_form_opt_lead: "Lead Gen / Corporate Website",
      bot_form_opt_custom: "Custom Web App / Other",
      bot_form_phone: "Phone / WhatsApp Number:",
      bot_form_phone_ph: "+880 17xxxxxxxx",
      bot_form_submit_btn: "💬 Start Project on WhatsApp",
      bot_view_pricing_btn: "View Pricing Plans",
      bot_open_calc_btn: "Open Price Calculator",
      bot_view_portfolio_btn: "View Live Demos",
      bot_brief_success: "✅ Your project brief is ready! Opening WhatsApp chat..."
    }
  };

  class I18nManager {
    constructor() {
      this.currentLang = this.detectInitialLanguage();
      this.currencySymbol = this.currentLang === 'en' ? '$' : '৳';
      this.translations = TRANSLATIONS;
    }

    detectInitialLanguage() {
      const saved = localStorage.getItem('zyn_lang');
      if (saved === 'bn' || saved === 'en') {
        return saved;
      }

      // Fast synchronous heuristic: check timezone and browser languages
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const navLangs = navigator.languages || [navigator.language || ''];
        if (tz === 'Asia/Dhaka' || tz.includes('Dhaka') || navLangs.some(l => l && l.toLowerCase().startsWith('bn'))) {
          return 'bn';
        }
      } catch (e) {}

      // Default for rest of the world
      return 'en';
    }

    init() {
      this.applyLanguageToDOM(this.currentLang);
      this.checkGeoIP();
    }

    checkGeoIP() {
      // If user already explicitly picked a language, do not override
      if (localStorage.getItem('zyn_lang')) return;

      // Fast async IP lookup for country code
      const fetchWithTimeout = (url, timeoutMs = 2500) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);
        return fetch(url, { signal: controller.signal })
          .then(res => {
            clearTimeout(timeout);
            return res.ok ? res.json() : Promise.reject();
          })
          .catch(err => {
            clearTimeout(timeout);
            throw err;
          });
      };

      fetchWithTimeout('https://api.country.is/')
        .then(data => {
          const country = (data?.country || '').toUpperCase();
          const targetLang = country === 'BD' ? 'bn' : 'en';
          if (targetLang !== this.currentLang) {
            this.setLanguage(targetLang, false);
          }
        })
        .catch(() => {
          fetchWithTimeout('https://ipapi.co/json/')
            .then(data => {
              const country = (data?.country_code || '').toUpperCase();
              const targetLang = country === 'BD' ? 'bn' : 'en';
              if (targetLang !== this.currentLang) {
                this.setLanguage(targetLang, false);
              }
            })
            .catch(() => {});
        });
    }

    t(key) {
      const dict = this.translations[this.currentLang] || this.translations.en;
      return dict[key] || this.translations.en[key] || key;
    }

    setLanguage(lang, persist = true) {
      if (lang !== 'bn' && lang !== 'en') return;
      this.currentLang = lang;
      this.currencySymbol = lang === 'en' ? '$' : '৳';

      if (persist) {
        localStorage.setItem('zyn_lang', lang);
      }

      this.applyLanguageToDOM(lang);
    }

    applyLanguageToDOM(lang) {
      const isEn = lang === 'en';
      document.documentElement.lang = lang;

      if (document.body) {
        document.body.classList.toggle('lang-en', isEn);
        document.body.classList.toggle('lang-bn', !isEn);
      }

      // 1. Update Title and Meta
      document.title = this.t('page_title');
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', this.t('meta_description'));
      }
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', this.t('page_title'));
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', this.t('meta_description'));
      const ogAlt = document.querySelector('meta[property="og:image:alt"]');
      if (ogAlt) ogAlt.setAttribute('content', this.t('og_image_alt'));
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', this.t('page_title'));
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute('content', this.t('meta_description'));

      // 2. Update all data-i18n elements
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = this.t(key);
        if (val) {
          el.innerHTML = val;
        }
      });

      // 3. Update all data-i18n-placeholder elements
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const val = this.t(key);
        if (val) {
          el.setAttribute('placeholder', val);
        }
      });

      // 4. Update all data-i18n-title elements
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const val = this.t(key);
        if (val) {
          el.setAttribute('title', val);
        }
      });

      // 5. Update Language Switcher Pills UI
      this.updateSwitcherUI(lang);

      // 6. Re-render dynamic components
      if (typeof window.renderPricingPackages === 'function') {
        window.renderPricingPackages();
      }
      if (typeof window.renderFaqSection === 'function') {
        window.renderFaqSection();
      }
      if (typeof window.initCalculator === 'function') {
        window.initCalculator();
      }
      if (typeof window.initPortfolio === 'function') {
        window.initPortfolio();
      }
      if (typeof window.updateZynBotLanguage === 'function') {
        window.updateZynBotLanguage(lang);
      }

      // 7. Refresh Lucide Icons
      if (window.lucide) {
        lucide.createIcons();
      }
    }

    updateSwitcherUI(lang) {
      document.querySelectorAll('.lang-switcher-pill').forEach(pill => {
        const bnBtn = pill.querySelector('.lang-btn-bn');
        const enBtn = pill.querySelector('.lang-btn-en');
        if (!bnBtn || !enBtn) return;

        // Strict Label Rule: Display ONLY EN and BN without flags or long text
        bnBtn.textContent = 'BN';
        enBtn.textContent = 'EN';

        const activeClass = 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 font-bold';
        const inactiveClass = 'text-slate-400 hover:text-white font-medium';

        if (lang === 'bn') {
          bnBtn.className = `lang-btn-bn px-2.5 py-1 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer text-xs font-en uppercase tracking-wider ${activeClass}`;
          enBtn.className = `lang-btn-en px-2.5 py-1 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer text-xs font-en uppercase tracking-wider ${inactiveClass}`;
        } else {
          enBtn.className = `lang-btn-en px-2.5 py-1 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer text-xs font-en uppercase tracking-wider ${activeClass}`;
          bnBtn.className = `lang-btn-bn px-2.5 py-1 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer text-xs font-en uppercase tracking-wider ${inactiveClass}`;
        }
      });
    }

    formatPrice(amount) {
      const num = Number(amount || 0);
      if (this.currentLang === 'en') {
        return `$${num.toLocaleString('en-US')}`;
      }
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      const formatted = num.toLocaleString('en-US');
      const bnStr = String(formatted).replace(/\d/g, d => bnDigits[Number(d)]);
      return `৳${bnStr}`;
    }

    formatNumber(num) {
      if (this.currentLang === 'en') {
        return Number(num || 0).toLocaleString('en-US');
      }
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(num).replace(/\d/g, d => bnDigits[Number(d)]);
    }
  }

  window.zynI18n = new I18nManager();

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.zynI18n.init());
  } else {
    window.zynI18n.init();
  }
})();
