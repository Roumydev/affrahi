"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Lang = "en" | "ar";

export const translations = {
  en: {
    nav: {
      home: "Home",
      browseHalls: "Browse Halls",
      about: "About",
      contact: "Contact",
      login: "Login",
      getStarted: "Get Started",
      lang: "العربية",
    },
    hero: {
      badge: "Algeria's Premier Venue Platform",
      title1: "Celebrate Life's Most",
      title2: "Precious Moments",
      desc: "Discover and book Algeria's finest luxury event halls for weddings, celebrations, and unforgettable occasions.",
      exploreHalls: "Explore Halls",
      listVenue: "List Your Venue",
    },
    featured: {
      badge: "Top Picks",
      title: "Featured Luxury Venues",
      noVenues: "No venues available yet.",
      guests: "guests",
      perEvent: "per event",
      viewDetails: "View Details",
      seeAll: "See All Venues →",
    },
    howItWorks: {
      badge: "Simple Process",
      title: "How It Works",
      steps: [
        {
          title: "Browse & Discover",
          desc: "Explore our curated collection of luxury event halls across Algeria",
        },
        {
          title: "Compare & Select",
          desc: "Review details, pricing, availability and guest capacity",
        },
        {
          title: "Book & Celebrate",
          desc: "Secure your venue and celebrate your most special day",
        },
      ],
    },
    whyChoose: {
      badge: "Why Afrahi",
      title: "Why Choose Afrahi",
      features: [
        {
          title: "Curated Selection",
          desc: "Handpicked luxury venues that meet our highest standards for elegance and service",
        },
        {
          title: "Instant Booking",
          desc: "Book your perfect venue instantly with our streamlined reservation system",
        },
        {
          title: "Transparent Pricing",
          desc: "Clear, upfront pricing with no hidden fees or surprises",
        },
        {
          title: "Expert Support",
          desc: "Dedicated support to help you plan the perfect celebration",
        },
      ],
    },
    stats: {
      luxuryVenues: "Luxury Venues",
      happyClients: "Happy Clients",
      eventsHosted: "Events Hosted",
      citiesCovered: "Cities Covered",
    },
    testimonials: {
      badge: "Testimonials",
      title: "What Our Clients Say",
      reviews: [
        {
          name: "Amina Benali",
          role: "Bride",
          init: "A",
          quote:
            "Afrahi made our wedding day perfect! The booking process was seamless and the venue exceeded our expectations.",
        },
        {
          name: "Sofiane Toumi",
          role: "Corporate Event Manager",
          init: "S",
          quote:
            "Professional service and stunning venues. Our annual gala was a huge success thanks to Afrahi.",
        },
        {
          name: "Malika Cherif",
          role: "Event Planner",
          init: "M",
          quote:
            "The platform is intuitive and the venues are top-notch. Highly recommend for any special occasion!",
        },
      ],
    },
    readyToBook: {
      badge: "Get Started Today",
      title: "Ready to Book Your Dream Venue?",
      desc: "Join thousands of satisfied clients who trusted us with their most special moments",
      exploreHalls: "Explore Halls",
      createAccount: "Create Account",
    },
    footer: {
      desc: "Luxury event hall booking platform for weddings, celebrations and unforgettable moments in Algeria.",
      quickLinks: "Quick Links",
      contact: "Contact",
      rights: "© 2026 Afrahi. All rights reserved.",
      links: [
        { label: "Home", href: "/" },
        { label: "Browse Halls", href: "/browse-halls" },
        { label: "About", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Login", href: "/login" },
      ],
    },
    about: {
      hero: {
        badge: "Our Story",
        title: "About Afrahi",
        desc: "Your trusted partner for luxury event hall bookings in Algeria",
      },
      story: {
        badge: "Who We Are",
        title: "Our Story",
        p1: "Afrahi was founded with a simple mission: to make finding and booking the perfect luxury event hall effortless.",
        p2: "We understand that your special moments deserve exceptional venues, and we're here to connect you with Algeria's finest event spaces.",
      },
      mission: {
        title: "Our Mission",
        text: "To simplify the event planning process by providing a curated selection of premium venues, transparent information, and seamless booking experiences for every celebration.",
      },
      vision: {
        title: "Our Vision",
        text: "To become Algeria's leading platform for event venue discovery, setting the standard for luxury, reliability, and innovation in the event industry.",
      },
      values: {
        badge: "What We Stand For",
        title: "Our Values",
        subtitle: "The principles that guide everything we do",
        items: [
          {
            title: "Excellence",
            desc: "We maintain the highest standards in every venue we feature",
          },
          {
            title: "Trust",
            desc: "Transparent pricing and honest service you can rely on",
          },
          {
            title: "Innovation",
            desc: "Continuously improving our platform for better user experience",
          },
        ],
      },
      stats: {
        happyClients: "Happy Clients",
        eventsHosted: "Events Hosted",
        yearsExperience: "Years Experience",
        partnerVenues: "Partner Venues",
      },
      cta: {
        title: "Ready to find your perfect venue?",
        desc: "Join thousands of happy clients who found their dream event space with Afrahi.",
        getStarted: "Get Started",
        contactUs: "Contact Us",
      },
    },
    contact: {
      hero: {
        badge: "We're Here For You",
        title: "Get in Touch",
        desc: "Have questions about a venue or need help planning your event? Our team is here to assist you every step of the way.",
      },
      form: {
        badge: "Contact Us",
        title: "Send Us a Message",
        desc: "Fill out the form below and our team will get back to you within 24 hours.",
        firstName: "First Name",
        firstNamePh: "Enter your first name",
        lastName: "Last Name",
        lastNamePh: "Enter your last name",
        email: "Email Address",
        emailPh: "youremail@example.com",
        phone: "Phone Number",
        phonePh: "+213 --- --- ---",
        message: "Your Message",
        messagePh: "How can we help you?",
        send: "Send Message",
      },
      info: {
        phone: "Phone",
        email: "Email",
        office: "Office",
        workingHours: "Working Hours",
        officeAddress1: "123 Didouche Mourad Street",
        officeAddress2: "Algiers 16000, Algeria",
        hours1: "Sunday–Thursday: 9AM–6PM",
        hours2: "Saturday: 10AM–4PM",
      },
      faq: {
        badge: "Help Center",
        title: "Frequently Asked Questions",
        desc: "Before reaching out, you might find answers to common questions in our FAQ section.",
        viewFaqs: "View FAQs",
      },
      urgent: {
        badge: "Urgent Support",
        title: "Need Immediate Assistance?",
        desc: "For urgent inquiries or immediate support, please call us directly. Our team is ready to assist you with any questions about bookings, venues, or event planning.",
        callNow: "Call Now",
        emailUs: "Email Us",
      },
    },
    browse: {
      badge: "Discover Venues",
      title: "Browse Halls",
      desc: "Algeria's finest luxury event venues, curated for you",
      searchPh: "Search by name or location...",
      maxPricePh: "Max price (DA)",
      minGuestsPh: "Min guests",
      loading: "Loading venues...",
      noVenues: "No venues found",
      venuesFound: (n: number) => `${n} venue${n !== 1 ? "s" : ""} found`,
      perEvent: "per event",
      viewDetails: "View Details",
    },
  },

  ar: {
    nav: {
      home: "الرئيسية",
      browseHalls: "استعراض القاعات",
      about: "من نحن",
      contact: "تواصل معنا",
      login: "تسجيل الدخول",
      getStarted: "ابدأ الآن",
      lang: "English",
    },
    hero: {
      badge: "المنصة الأولى للقاعات في الجزائر",
      title1: "احتفل بأجمل",
      title2: "لحظات حياتك",
      desc: "اكتشف واحجز أفضل قاعات الأفراح الفاخرة في الجزائر للأعراس والاحتفالات والمناسبات التي لا تُنسى.",
      exploreHalls: "استعرض القاعات",
      listVenue: "أضف قاعتك",
    },
    featured: {
      badge: "أفضل الخيارات",
      title: "القاعات الفاخرة المميزة",
      noVenues: "لا توجد قاعات متاحة بعد.",
      guests: "ضيف",
      perEvent: "لكل حفل",
      viewDetails: "عرض التفاصيل",
      seeAll: "← عرض جميع القاعات",
    },
    howItWorks: {
      badge: "خطوات بسيطة",
      title: "كيف يعمل؟",
      steps: [
        {
          title: "تصفح واكتشف",
          desc: "استعرض مجموعتنا المنتقاة من قاعات الأفراح الفاخرة عبر الجزائر",
        },
        {
          title: "قارن واختر",
          desc: "راجع التفاصيل والأسعار والتوافر وسعة الضيوف",
        },
        { title: "احجز واحتفل", desc: "أمّن قاعتك واحتفل بأجمل أيامك" },
      ],
    },
    whyChoose: {
      badge: "لماذا أفراحي",
      title: "لماذا تختار أفراحي",
      features: [
        {
          title: "اختيار مميز",
          desc: "قاعات فاخرة منتقاة بعناية تلبي أعلى معايير الأناقة والخدمة",
        },
        {
          title: "حجز فوري",
          desc: "احجز قاعتك المثالية فورًا بنظام حجز سلس ومبسط",
        },
        {
          title: "أسعار شفافة",
          desc: "أسعار واضحة ومسبقة بدون رسوم خفية أو مفاجآت",
        },
        {
          title: "دعم متخصص",
          desc: "فريق متخصص لمساعدتك في التخطيط لحفلك المثالي",
        },
      ],
    },
    stats: {
      luxuryVenues: "قاعة فاخرة",
      happyClients: "عميل سعيد",
      eventsHosted: "حفل أقيم",
      citiesCovered: "مدينة مشمولة",
    },
    testimonials: {
      badge: "آراء العملاء",
      title: "ماذا يقول عملاؤنا",
      reviews: [
        {
          name: "أمينة بن علي",
          role: "عروس",
          init: "أ",
          quote:
            "أفراحي جعلت يوم زفافنا مثاليًا! كانت عملية الحجز سلسة والقاعة فاقت توقعاتنا.",
        },
        {
          name: "سفيان تومي",
          role: "مدير فعاليات شركات",
          init: "س",
          quote:
            "خدمة احترافية وقاعات رائعة. كان حفلنا السنوي ناجحًا جدًا بفضل أفراحي.",
        },
        {
          name: "مليكة شريف",
          role: "منظمة فعاليات",
          init: "م",
          quote:
            "المنصة سهلة الاستخدام والقاعات من أعلى مستوى. أنصح بها لكل مناسبة خاصة!",
        },
      ],
    },
    readyToBook: {
      badge: "ابدأ اليوم",
      title: "مستعد لحجز قاعة أحلامك؟",
      desc: "انضم إلى آلاف العملاء السعداء الذين وثقوا بنا في أجمل لحظاتهم",
      exploreHalls: "استعرض القاعات",
      createAccount: "إنشاء حساب",
    },
    footer: {
      desc: "منصة حجز قاعات الأفراح الفاخرة للأعراس والاحتفالات واللحظات التي لا تُنسى في الجزائر.",
      quickLinks: "روابط سريعة",
      contact: "تواصل معنا",
      rights: "© 2026 أفراحي. جميع الحقوق محفوظة.",
      links: [
        { label: "الرئيسية", href: "/" },
        { label: "استعراض القاعات", href: "/browse-halls" },
        { label: "من نحن", href: "/about" },
        { label: "تواصل معنا", href: "/contact" },
        { label: "تسجيل الدخول", href: "/login" },
      ],
    },
    about: {
      hero: {
        badge: "قصتنا",
        title: "عن أفراحي",
        desc: "شريكك الموثوق لحجز قاعات الأفراح الفاخرة في الجزائر",
      },
      story: {
        badge: "من نحن",
        title: "قصتنا",
        p1: "تأسست أفراحي بمهمة بسيطة: جعل البحث عن قاعة الأفراح المثالية وحجزها أمرًا سهلًا.",
        p2: "نحن نفهم أن لحظاتك الخاصة تستحق أماكن استثنائية، ونحن هنا لنربطك بأفضل قاعات الأفراح في الجزائر.",
      },
      mission: {
        title: "مهمتنا",
        text: "تبسيط عملية التخطيط للفعاليات من خلال توفير تشكيلة منتقاة من أفضل القاعات، ومعلومات شفافة، وتجارب حجز سلسة لكل احتفال.",
      },
      vision: {
        title: "رؤيتنا",
        text: "أن نصبح المنصة الرائدة في الجزائر لاكتشاف قاعات الفعاليات، ونضع معيار الفخامة والموثوقية والابتكار في قطاع الفعاليات.",
      },
      values: {
        badge: "ما نؤمن به",
        title: "قيمنا",
        subtitle: "المبادئ التي تقود كل ما نقوم به",
        items: [
          {
            title: "التميز",
            desc: "نحافظ على أعلى المعايير في كل قاعة نعرضها",
          },
          {
            title: "الثقة",
            desc: "أسعار شفافة وخدمة صادقة يمكنك الاعتماد عليها",
          },
          {
            title: "الابتكار",
            desc: "نطور منصتنا باستمرار لتحسين تجربة المستخدم",
          },
        ],
      },
      stats: {
        happyClients: "عميل سعيد",
        eventsHosted: "حفل أقيم",
        yearsExperience: "سنة خبرة",
        partnerVenues: "قاعة شريكة",
      },
      cta: {
        title: "مستعد للعثور على قاعتك المثالية؟",
        desc: "انضم إلى آلاف العملاء السعداء الذين وجدوا قاعة أحلامهم مع أفراحي.",
        getStarted: "ابدأ الآن",
        contactUs: "تواصل معنا",
      },
    },
    contact: {
      hero: {
        badge: "نحن هنا من أجلك",
        title: "تواصل معنا",
        desc: "هل لديك أسئلة حول قاعة أو تحتاج مساعدة في التخطيط لحفلك؟ فريقنا هنا لمساعدتك في كل خطوة.",
      },
      form: {
        badge: "راسلنا",
        title: "أرسل لنا رسالة",
        desc: "أكمل النموذج أدناه وسيتواصل معك فريقنا خلال 24 ساعة.",
        firstName: "الاسم الأول",
        firstNamePh: "أدخل اسمك الأول",
        lastName: "اللقب",
        lastNamePh: "أدخل لقبك",
        email: "البريد الإلكتروني",
        emailPh: "بريدك@مثال.com",
        phone: "رقم الهاتف",
        phonePh: "+213 --- --- ---",
        message: "رسالتك",
        messagePh: "كيف يمكننا مساعدتك؟",
        send: "إرسال الرسالة",
      },
      info: {
        phone: "الهاتف",
        email: "البريد الإلكتروني",
        office: "المكتب",
        workingHours: "ساعات العمل",
        officeAddress1: "123 شارع ديدوش مراد",
        officeAddress2: "الجزائر العاصمة 16000، الجزائر",
        hours1: "الأحد–الخميس: 9ص–6م",
        hours2: "السبت: 10ص–4م",
      },
      faq: {
        badge: "مركز المساعدة",
        title: "الأسئلة الشائعة",
        desc: "قبل التواصل، قد تجد إجابات لأسئلة شائعة في قسم الأسئلة الشائعة لدينا.",
        viewFaqs: "عرض الأسئلة الشائعة",
      },
      urgent: {
        badge: "دعم عاجل",
        title: "تحتاج مساعدة فورية؟",
        desc: "للاستفسارات العاجلة أو الدعم الفوري، يرجى الاتصال بنا مباشرة. فريقنا جاهز لمساعدتك في أي أسئلة تتعلق بالحجوزات أو القاعات أو التخطيط للفعاليات.",
        callNow: "اتصل الآن",
        emailUs: "راسلنا",
      },
    },
    browse: {
      badge: "اكتشف القاعات",
      title: "استعرض القاعات",
      desc: "أفضل قاعات الأفراح الفاخرة في الجزائر، منتقاة خصيصًا لك",
      searchPh: "ابحث بالاسم أو الموقع...",
      maxPricePh: "الحد الأقصى للسعر (دج)",
      minGuestsPh: "الحد الأدنى للضيوف",
      loading: "جاري تحميل القاعات...",
      noVenues: "لا توجد قاعات",
      venuesFound: (n: number) => `${n} قاعة وجدت`,
      perEvent: "لكل حفل",
      viewDetails: "عرض التفاصيل",
    },
  },
};

interface LangContextType {
  lang: Lang;
  t: typeof translations.en;
  toggleLang: () => void;
  isRTL: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: translations.en,
  toggleLang: () => {},
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved === "en" || saved === "ar") setLang(saved);
  }, []);

  const toggleLang = () => {
    const next: Lang = lang === "en" ? "ar" : "en";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const isRTL = lang === "ar";
  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, t, toggleLang, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} lang={lang}>
        {children}
      </div>
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
