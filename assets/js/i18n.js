/**
 * Health Shark - Internationalization (i18n) Engine
 * Supports seamless bilingual switching between English (EN) and Bengali (BN).
 * Automatically updates text, HTML, placeholders, attributes, and persists selection.
 */

const TRANSLATIONS = {
  en: {
    // Top Bar
    topbar: {
      free_badge: "Free Delivery",
      free_delivery: "Orders within Dhaka (Free delivery in Mirpur area)",
      always_open: "24/7 Always Open"
    },
    // Navigation
    nav: {
      home: "Home",
      menu: "Food Menu",
      about: "About Us",
      contact: "Contact & Location",
      order_whatsapp: "Order on WhatsApp",
      admin: "Admin Dashboard",
      search_placeholder: "Search momos, samosa, biriani, brownies, noodles...",
      lang_label: "Language"
    },
    // Hero Section
    hero: {
      tag_fresh: "Fresh",
      tag_nutritious: "Nutritious",
      tag_homemade: "Homemade",
      title_line1: "Healthy Food",
      title_line2: "for a Better You",
      description: "At Health Shark, we serve secure, safe and balanced food to help you build immunity and live a healthier life. Handcrafted by dedicated nutritionists with pure ingredients.",
      explore_menu: "Explore Our Menu",
      instant_whatsapp: "Instant WhatsApp Order",
      badge_fresh_title: "100% Fresh",
      badge_fresh_sub: "Pure Ingredients",
      badge_preservatives_title: "No Preservatives",
      badge_preservatives_sub: "Zero Artificial Flavor",
      badge_balanced_title: "Balanced Meals",
      badge_balanced_sub: "Nutritionist Designed",
      overlay_note1: "Good Food",
      overlay_note2: "Good Mood! 🌿",
      founder_title: "Founded by Nutritionist",
      founder_sub: "Immunity-first delicious food"
    },
    // Popular Categories Section
    cat: {
      tag: "Explore By Category",
      heading: "Our Popular Categories",
      subtitle: "From fresh snacks to hearty meals — we have something nutritious for everyone.",
      swipe_hint: "Swipe sideways to explore all categories",
      cat_snacks_sub: "Spring rolls, Samosa, Momos & Meatbox",
      cat_burgers_sub: "Mini burgers, Fried chicken & Club sandwiches",
      cat_noodles_sub: "Egg noodles, Ramen bowl & Pasta meatbox",
      cat_meals_sub: "Chicken Biriani, Beef Khichuri & Duck Meat",
      cat_desserts_sub: "Fudgy Brownies, Kunafa, Pudding & Firni",
      cat_ingredients_sub: "Date powder (Khejur gura) & Fresh spice pastes"
    },
    // Best Seller Items Carousel
    bestseller: {
      badge: "Top Rated & Loved",
      heading: "Best Seller Items",
      subtitle: "Customer favorites made fresh daily with 100% natural ingredients and balanced nutrition.",
      view_all: "View All Menu",
      swipe_hint: "Swipe horizontally to browse items"
    },
    // Feature Banner (Health is Wealth)
    promo: {
      tag: "Health Shark Promise",
      heading: "Health is Wealth",
      description: "Choose nutritious food today for a stronger tomorrow. Fresh, homemade, balanced, and full of natural goodness prepared with love.",
      btn: "View Full Menu"
    },
    // Popular Items Carousel
    popular: {
      badge: "Trending Nutrition",
      heading: "Popular Items",
      subtitle: "Nutritionist-formulated savory dishes, healthy treats and wholesome comforting meals.",
      view_all: "View All Menu",
      swipe_hint: "Swipe horizontally to browse items"
    },
    // Trust Badges
    trust: {
      delivery_title: "Dhaka Delivery",
      delivery_sub: "Free delivery in Mirpur area",
      service_title: "24/7 Service",
      service_sub: "We are always open to take orders",
      secure_title: "Secure & Safe Food",
      secure_sub: "Prepared with certified hygiene & care"
    },
    // Card Common Actions
    card: {
      order_now: "Order Now",
      view_details: "View Details",
      price_label: "Price",
      reviews_count: "reviews",
      top_rated: "Top Rated"
    },
    // Units
    units: {
      pc: "pc",
      kg: "kg",
      "500g": "500g",
      "250g": "250g",
      plate: "plate",
      box: "box",
      pack: "pack",
      pot: "pot / jar",
      cup: "cup"
    },
    // Menu Page
    menu: {
      hero_tag: "Wholesome & Pure",
      hero_title: "Nutritious & Delicious Food Menu",
      hero_sub: "Order fresh meals made by nutritionists with zero preservatives. Click 'Order Now' to send instant WhatsApp message!",
      tab_all: "All Items",
      search_placeholder: "Search momos, samosa, biriani, noodles...",
      category_label: "Category",
      sort_label: "Sort By",
      sort_featured: "Featured & Popular",
      sort_price_low: "Price: Low to High",
      sort_price_high: "Price: High to Low",
      sort_rating: "Highest Rated",
      showing: "Showing",
      dishes: "dishes",
      no_items: "No dishes found in this category. Try another filter!"
    },
    // Product Details Page
    details: {
      breadcrumb_home: "Home",
      breadcrumb_menu: "Food Menu",
      reviews_label: "customer reviews",
      qty_label: "Select Quantity",
      total_price: "Total Price",
      order_whatsapp: "Order on WhatsApp",
      fast_delivery_title: "Fast Delivery in Dhaka:",
      fast_delivery_desc: "Free delivery across all areas of Mirpur!",
      features_title: "Key Nutrition & Quality Highlights",
      recommendations_heading: "You May Also Like",
      recommendations_sub: "Handpicked nutritious selections you will enjoy."
    },
    // About Page
    about: {
      hero_tag: "Our Mission & Story",
      hero_title: "Healthy Food for a Better You",
      hero_sub: "Discover the story and passion behind Health Shark — where every recipe is guided by medical nutrition and pure love for wholesome food.",
      vision_tag: "Nutritionist Vision",
      vision_title: "A Message from Farzana Wahab",
      vision_quote: "\"To build immunity people need the right food in right amount. As a nutritionist I believe to serve people the secure and safe foods with the most dedicated team.\"",
      mission_title: "Our Mission",
      mission_desc: "To empower every family in Dhaka with access to unadulterated, nutrient-dense meals and specialty natural ingredients that boost immunity without sacrificing taste.",
      values_tag: "What We Stand For",
      values_title: "Our Core Nutrition Values",
      val1_title: "100% Fresh & Safe",
      val1_desc: "Daily procurement of fresh poultry, farm vegetables and premium pantry staples.",
      val2_title: "Immunity Focused",
      val2_desc: "Low oil, zero trans fat, zero artificial preservatives, and no harmful food chemicals.",
      val3_title: "Care & Hygiene",
      val3_desc: "Prepared in spotless hygienic cloud kitchens with certified food safety standards.",
      val4_title: "Accessible & Warm",
      val4_desc: "Affordable healthy meal plans with free door-to-door delivery in Mirpur area."
    },
    // Contact Page
    contact: {
      hero_tag: "Get In Touch",
      hero_title: "We Are Always Here to Help",
      hero_sub: "Questions about custom diet meal plans, catering or party orders? Reach out via WhatsApp or visit us in Mirpur.",
      card_address_title: "Our Location",
      card_address_desc: "House-14, Road-22, Block C, Dhaka, Bangladesh, 1216",
      card_phone_title: "Phone & WhatsApp",
      card_hours_title: "Operating Hours",
      card_hours_desc: "Always open (24/7 Service)",
      form_title: "Send Us a Message",
      form_name: "Your Full Name *",
      form_phone: "Phone Number *",
      form_msg: "Your Message or Order Inquiry *",
      form_submit: "Send WhatsApp Inquiry",
      map_title: "Serving Mirpur & All Over Dhaka",
      map_desc: "Kitchen located at Block C, Mirpur, Dhaka-1216. Free delivery across Mirpur and standard delivery across Dhaka."
    },
    // Footer
    footer: {
      motto: "Health is wealth",
      quote: "\"To build immunity people need the right food in right amount. As a nutritionist I believe to serve people the secure and safe foods with the most dedicated team.\"",
      contact_title: "Contact Details",
      address: "House-14, Road-22, Block C, Dhaka, Bangladesh, 1216",
      hours: "Operating Hours: Always open (24/7 Service)",
      follow_title: "Follow Us",
      follow_sub: "Stay connected with our community for recipes and menu updates!",
      followers: "6.3K+ Followers",
      admin_link: "Admin Management Portal",
      rights_reserved: "All rights reserved.",
      dev_credit: "Design & Developed by",
      tagline: "Healthy Food • Happy Life"
    },
    // Admin Portal
    admin: {
      portal: "Admin Portal",
      sign_in: "Admin Sign In",
      sign_in_sub: "Sign in to manage dishes, categories and prices",
      view_store: "View Public Store",
      email: "Email Address",
      password: "Password",
      btn_login: "Sign In to Dashboard"
    },
    // 404 Page
    notfound: {
      title: "Page Not Found",
      desc: "The healthy treat or page you are looking for doesn't exist or has moved.",
      back_home: "Back to Home",
      view_menu: "View Menu"
    }
  },

  bn: {
    // Top Bar
    topbar: {
      free_badge: "ফ্রি ডেলিভারি",
      free_delivery: "ঢাকা সিটিতে ডেলিভারি (মিরপুর এলাকায় সম্পূর্ণ ফ্রি ডেলিভারি)",
      always_open: "২৪/৭ সার্বক্ষণিক সেবা"
    },
    // Navigation
    nav: {
      home: "হোম",
      menu: "ফুড মেনু",
      about: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ ও ঠিকানা",
      order_whatsapp: "হোয়াটসঅ্যাপে অর্ডার",
      admin: "অ্যাডমিন প্যানেল",
      search_placeholder: "মোমো, সমুচা, বিরিয়ানি, ব্রাউনিজ, নুডুলস খুঁজুন...",
      lang_label: "ভাষা"
    },
    // Hero Section
    hero: {
      tag_fresh: "তাজা",
      tag_nutritious: "পুষ্টিকর",
      tag_homemade: "ঘরোয়া",
      title_line1: "স্বাস্থ্যকর খাবার",
      title_line2: "আপনার সুস্থ জীবনের জন্য",
      description: "হেলথ শার্ক-এ আমরা রোগ প্রতিরোধ ক্ষমতা বাড়াতে ও সুস্থ জীবনের নিশ্চয়তায় নিরাপদ ও সুষম খাবার পরিবেশন করি। নিবেদিতপ্রাণ নিউট্রিশনিস্টদের তত্ত্বাবধানে ১০০% খাঁটি উপাদান দিয়ে তৈরি।",
      explore_menu: "আমাদের মেনু দেখুন",
      instant_whatsapp: "হোয়াটসঅ্যাপে অর্ডার করুন",
      badge_fresh_title: "১০০% খাঁটি ও তাজা",
      badge_fresh_sub: "প্রাকৃতিক উপাদান",
      badge_preservatives_title: "সংরক্ষণকারী মুক্ত",
      badge_preservatives_sub: "কোনো কৃত্রিম ফ্লেভার নেই",
      badge_balanced_title: "সুষম খাবার",
      badge_balanced_sub: "নিউট্রিশনিস্ট ডিজাইনকৃত",
      overlay_note1: "ভালো খাবার",
      overlay_note2: "সুন্দর মন! 🌿",
      founder_title: "পুষ্টিবিদ কর্তৃক প্রতিষ্ঠিত",
      founder_sub: "রোগ প্রতিরোধে সুস্বাদু খাবার"
    },
    // Popular Categories Section
    cat: {
      tag: "ক্যাটাগরি অনুযায়ী দেখুন",
      heading: "আমাদের জনপ্রিয় ক্যাটাগরি",
      subtitle: "তাজা নাস্তা থেকে সুস্বাদু ভারী খাবার — সবার জন্যই রয়েছে পুষ্টিকর আয়োজন।",
      swipe_hint: "সব ক্যাটাগরি দেখতে ডানে-বামে সোয়াইপ করুন",
      cat_snacks_sub: "স্প্রিং রোল, সমুচা, মোমো ও মিটবক্স",
      cat_burgers_sub: "মিনি বার্গার, ফ্রাইড চিকেন ও ক্লাব স্যান্ডউইচ",
      cat_noodles_sub: "এগ নুডুলস, রামেন বোল ও পাস্তা মিটবক্স",
      cat_meals_sub: "চিকেন বিরিয়ানি, বিফ খিচুড়ি ও হাঁসের মাংস",
      cat_desserts_sub: "ফাডজি ব্রাউনিজ, কুনাফা, পুডিং ও ফিরনি",
      cat_ingredients_sub: "খেজুর গুড়া ও তাজা মসলা পেস্ট"
    },
    // Best Seller Items Carousel
    bestseller: {
      badge: "সেরা রেটিং ও প্রিয় খাবার",
      heading: "আমাদের সেরা বিক্রিত খাবারসমূহ",
      subtitle: "১০০% প্রাকৃতিক উপাদান ও সঠিক পুষ্টিমানের সমন্বয়ে প্রতিদিন তাজা প্রস্তুতকৃত জনপ্রিয় খাবার।",
      view_all: "সব মেনু দেখুন",
      swipe_hint: "সব খাবার দেখতে পাশাপাশি সোয়াইপ করুন"
    },
    // Feature Banner (Health is Wealth)
    promo: {
      tag: "হেলথ শার্ক অঙ্গীকার",
      heading: "স্বাস্থ্যই সকল সুখের মূল",
      description: "আজই স্বাস্থ্যকর খাবার বেছে নিন সুন্দর আগামীর জন্য। শতভাগ খাঁটি ও ঘরোয়া ভালোবাসায় তৈরি পুষ্টিকর খাবার।",
      btn: "সম্পূর্ণ মেনু দেখুন"
    },
    // Popular Items Carousel
    popular: {
      badge: "জনপ্রিয় পুষ্টিকর খাবার",
      heading: "সবচেয়ে জনপ্রিয় খাবার",
      subtitle: "নিউট্রিশনিস্ট-প্রণীত সুস্বাদু ডিশ, স্বাস্থ্যকর মিষ্টান্ন ও পুষ্টিকর খাবার।",
      view_all: "সব মেনু দেখুন",
      swipe_hint: "সব খাবার দেখতে পাশাপাশি সোয়াইপ করুন"
    },
    // Trust Badges
    trust: {
      delivery_title: "ঢাকা ডেলিভারি",
      delivery_sub: "মিরপুর এলাকায় সম্পূর্ণ ফ্রি ডেলিভারি",
      service_title: "২৪/৭ সার্বক্ষণিক সার্ভিস",
      service_sub: "আমরা সর্বদা অর্ডার নিতে প্রস্তুত",
      secure_title: "নিরাপদ ও স্বাস্থ্যকর খাবার",
      secure_sub: "সর্বোচ্চ স্বাস্থ্যবিধি মেনে পরম যত্নে প্রস্তুত"
    },
    // Card Common Actions
    card: {
      order_now: "অর্ডার করুন",
      view_details: "বিস্তারিত দেখুন",
      price_label: "মূল্য",
      reviews_count: "রিভিউ",
      top_rated: "টপ রেটেড"
    },
    // Units in Bengali
    units: {
      pc: "পিস",
      kg: "কেজি",
      "500g": "৫০০ গ্রাম",
      "250g": "২৫০ গ্রাম",
      plate: "প্লেট",
      box: "বক্স",
      pack: "প্যাকেট",
      pot: "পট / জার",
      cup: "কাপ"
    },
    // Menu Page
    menu: {
      hero_tag: "খাঁটি ও স্বাস্থ্যসম্মত",
      hero_title: "পুষ্টিকর ও সুস্বাদু খাবার মেনু",
      hero_sub: "কোনো ক্ষতিকর প্রিজারভেটিভ ছাড়া নিউট্রিশনিস্টের তৈরি খাবার। সরাসরি হোয়াটসঅ্যাপে পাঠাতে 'অর্ডার করুন' বাটনে ক্লিক করুন!",
      tab_all: "সকল খাবার",
      search_placeholder: "মোমো, সমুচা, বিরিয়ানি, নুডুলস খুঁজুন...",
      category_label: "ক্যাটাগরি",
      sort_label: "বাছাই করুন",
      sort_featured: "জনপ্রিয় ও রেটিং অনুযায়ী",
      sort_price_low: "দাম: কম থেকে বেশি",
      sort_price_high: "দাম: বেশি থেকে কম",
      sort_rating: "সর্বোচ্চ রেটিং",
      showing: "মোট প্রদর্শিত",
      dishes: "টি খাবার",
      no_items: "এই ক্যাটাগরিতে কোনো খাবার পাওয়া যায়নি। অন্য ক্যাটাগরি বেছে নিন!"
    },
    // Product Details Page
    details: {
      breadcrumb_home: "হোম",
      breadcrumb_menu: "ফুড মেনু",
      reviews_label: "টি গ্রাহক রিভিউ",
      qty_label: "পরিমাণ নির্বাচন করুন",
      total_price: "সর্বমোট মূল্য",
      order_whatsapp: "হোয়াটসঅ্যাপে অর্ডার করুন",
      fast_delivery_title: "ঢাকায় দ্রুত ডেলিভারি:",
      fast_delivery_desc: "মিরপুর এলাকায় সম্পূর্ণ ফ্রি ডেলিভারি!",
      features_title: "পুষ্টিমান ও বিশেষ বৈশিষ্ট্যসমূহ",
      recommendations_heading: "আপনার আরও পছন্দ হতে পারে",
      recommendations_sub: "পুষ্টিকর ও সুস্বাদু খাবারের বিশেষ সমাহার।"
    },
    // About Page
    about: {
      hero_tag: "আমাদের লক্ষ্য ও গল্প",
      hero_title: "আপনার সুস্থ জীবনের জন্য স্বাস্থ্যকর খাবার",
      hero_sub: "হেলথ শার্ক-এর পেছনের অনুপ্রেরণা ও গল্প — যেখানে প্রতিটি খাবার মেডিকেল নিউট্রিশন ও খাঁটি ভালোবাসায় প্রস্তুত হয়।",
      vision_tag: "পুষ্টিবিদের দর্শন",
      vision_title: "ফারজানা ওহাব-এর পক্ষ থেকে বার্তা",
      vision_quote: "\"রোগ প্রতিরোধ ক্ষমতা বাড়াতে সঠিক পরিমাণে সঠিক খাবার প্রয়োজন। একজন পুষ্টিবিদ হিসেবে নিবেদিত দলের সাথে মানুষের কাছে নিরাপদ ও পুষ্টিকর খাবার পৌঁছে দেওয়াই আমার লক্ষ্য।\"",
      mission_title: "আমাদের মূল লক্ষ্য",
      mission_desc: "ঢাকার প্রতিটি পরিবারকে খাঁটি, পুষ্টিসমৃদ্ধ ও রোগ প্রতিরোধকারী খাবারের সুবিধা দেওয়া, যাতে স্বাদের সাথে কোনো আপস করতে না হয়।",
      values_tag: "আমাদের অঙ্গীকার",
      values_title: "আমাদের মূল পুষ্টিমান ও মূল্যবোধ",
      val1_title: "১০০% তাজা ও নিরাপদ",
      val1_desc: "প্রতিদিন সংগৃহীত ফ্রেশ পোল্ট্রি, টাটকা শাকসবজি ও প্রিমিয়াম প্রাকৃতিক উপাদান।",
      val2_title: "রোগ প্রতিরোধে সহায়ক",
      val2_desc: "কম তেল, শূন্য ক্ষতিকর চর্বি, কৃত্রিম প্রিজারভেটিভ ও ক্ষতিকারক রঙ মুক্ত।",
      val3_title: "সর্বোচ্চ স্বাস্থ্যবিধি ও যত্ন",
      val3_desc: "সার্টিফাইড ফুড সেফটি মান বজায় রেখে পরম যত্নে ঘরোয়া পরিবেশে তৈরি।",
      val4_title: "সাশ্রয়ী ও আন্তরিক",
      val4_desc: "সুলভ মূল্যে সুষম খাবার প্যাকেজ এবং মিরপুর এলাকায় সম্পূর্ণ ফ্রি হোম ডেলিভারি।"
    },
    // Contact Page
    contact: {
      hero_tag: "যোগাযোগ করুন",
      hero_title: "আমরা আপনার সেবায় সর্বদা প্রস্তুত",
      hero_sub: "ডায়েট মিল প্ল্যান, ক্যাটারিং বা কোনো জিজ্ঞাসা আছে? সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন অথবা মিরপুরে আমাদের কিচেনে ভিজিট করুন।",
      card_address_title: "আমাদের কিচেন ঠিকানা",
      card_address_desc: "বাড়ি-১৪, রোড-২২, ব্লক সি, ঢাকা, বাংলাদেশ, ১২১৬",
      card_phone_title: "ফোন ও হোয়াটসঅ্যাপ",
      card_hours_title: "কাজের সময়",
      card_hours_desc: "সর্বদা উন্মুক্ত (২৪/৭ সার্ভিস)",
      form_title: "আমাদের সরাসরি বার্তা পাঠান",
      form_name: "আপনার নাম *",
      form_phone: "ফোন নম্বর *",
      form_msg: "আপনার বার্তা বা খাবারের অর্ডার *",
      form_submit: "হোয়াটসঅ্যাপে পাঠান",
      map_title: "মিরপুর ও সমগ্র ঢাকায় সরবরাহ",
      map_desc: "কিচেন অবস্থান: ব্লক সি, মিরপুর, ঢাকা-১২১৬। মিরপুরে ফ্রি ডেলিভারি এবং ঢাকার সর্বত্র দ্রুততম সরবরাহ।"
    },
    // Footer
    footer: {
      motto: "স্বাস্থ্যই সম্পদ",
      quote: "\"রোগ প্রতিরোধ ক্ষমতা বাড়াতে সঠিক পরিমাণে সঠিক খাবার প্রয়োজন। একজন পুষ্টিবিদ হিসেবে নিবেদিত দলের সাথে মানুষের কাছে নিরাপদ ও পুষ্টিকর খাবার পৌঁছে দেওয়াই আমার লক্ষ্য।\"",
      contact_title: "যোগাযোগের ঠিকানা",
      address: "বাড়ি-১৪, রোড-২২, ব্লক সি, ঢাকা, বাংলাদেশ, ১২১৬",
      hours: "কাজের সময়: সর্বদা উন্মুক্ত (২৪/৭ সার্ভিস)",
      follow_title: "আমাদের সোশ্যাল মিডিয়া",
      follow_sub: "স্বাস্থ্যকর রেসিপি ও নতুন মেনু আপডেটের জন্য আমাদের সাথে থাকুন!",
      followers: "৬.৩K+ অনুসারী",
      admin_link: "অ্যাডমিন পোর্টাল",
      rights_reserved: "সর্বস্বত্ব সংরক্ষিত।",
      dev_credit: "ডিজাইন ও ডেভেলপমেন্টে:",
      tagline: "স্বাস্থ্যকর খাবার • সুন্দর জীবন"
    },
    // Admin Portal
    admin: {
      portal: "অ্যাডমিন পোর্টাল",
      sign_in: "অ্যাডমিন সাইন ইন",
      sign_in_sub: "খাবার, ক্যাটাগরি ও দাম পরিচালনার জন্য সাইন ইন করুন",
      view_store: "পাবলিক স্টোর দেখুন",
      email: "ইমেইল এড্রেস",
      password: "পাসওয়ার্ড",
      btn_login: "ড্যাশবোর্ডে প্রবেশ করুন"
    },
    // 404 Page
    notfound: {
      title: "পেজটি খুঁজে পাওয়া যায়নি",
      desc: "আপনি যে পেজ বা খাবারটি খুঁজছেন তা বিদ্যমান নেই অথবা সরানো হয়েছে।",
      back_home: "হোমে ফিরে যান",
      view_menu: "মেনু দেখুন"
    }
  }
};

class HealthSharkI18n {
  constructor() {
    this.currentLang = localStorage.getItem("hs_lang") || "en";
    this.init();
  }

  // Get current language code
  getLang() {
    return this.currentLang;
  }

  // Set new language
  setLanguage(lang) {
    if (lang !== "en" && lang !== "bn") lang = "en";
    this.currentLang = lang;
    localStorage.setItem("hs_lang", lang);
    document.documentElement.lang = lang;
    this.applyTranslations();
    this.updateSwitcherButtons();

    // Notify all dynamic modules (carousels, search, menu grid)
    window.dispatchEvent(
      new CustomEvent("hs-language-changed", { detail: { lang } })
    );
  }

  // Translate key with dot-notation
  t(key, fallback = "") {
    if (!key) return "";
    const keys = key.split(".");
    let val = TRANSLATIONS[this.currentLang];
    for (const k of keys) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        // Fallback to English
        let fbVal = TRANSLATIONS["en"];
        for (const fk of keys) {
          if (fbVal && fbVal[fk] !== undefined) {
            fbVal = fbVal[fk];
          } else {
            return fallback || key;
          }
        }
        return fbVal;
      }
    }
    return val;
  }

  // Translate unit name
  tUnit(unitKey) {
    const cleanKey = String(unitKey || "pc").toLowerCase();
    const trans = this.t(`units.${cleanKey}`);
    return trans !== `units.${cleanKey}` ? trans : unitKey;
  }

  // Translate number into Bengali numerals if language is BN
  formatNumber(num) {
    if (this.currentLang !== "bn") return num;
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return String(num).replace(/[0-9]/g, (w) => bnDigits[+w]);
  }

  // Apply translations to all DOM elements with data-i18n attributes
  applyTranslations() {
    // 1. Text content
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    });

    // 2. HTML content
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.innerHTML = translation;
      }
    });

    // 3. Placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.setAttribute("placeholder", translation);
      }
    });

    // 4. Tooltip / Titles
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const translation = this.t(key);
      if (translation && translation !== key) {
        el.setAttribute("title", translation);
      }
    });
  }

  // Update switcher visual state
  updateSwitcherButtons() {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const btnLang = btn.getAttribute("data-lang");
      if (btnLang === this.currentLang) {
        btn.className =
          "lang-btn px-2.5 py-1 rounded-full text-xs font-bold transition-all bg-brand-700 text-white shadow-sm cursor-default";
      } else {
        btn.className =
          "lang-btn px-2.5 py-1 rounded-full text-xs font-bold transition-all text-gray-600 hover:text-brand-900 cursor-pointer";
      }
    });
  }

  init() {
    document.documentElement.lang = this.currentLang;
    this.updateSwitcherButtons();
    this.applyTranslations();

    // Event delegation for language switcher buttons
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".lang-btn");
      if (btn) {
        const lang = btn.getAttribute("data-lang");
        if (lang && lang !== this.currentLang) {
          this.setLanguage(lang);
        }
      }
    });
  }
}

// Global instance
window.hsI18n = new HealthSharkI18n();
window.hsT = (key, fallback) => window.hsI18n.t(key, fallback);
