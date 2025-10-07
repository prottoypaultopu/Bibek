// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('primary-menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('nav__open');
  });
}

// Active link highlight
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav__link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link =>
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + id)
      );
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// ===== EMAILJS INTEGRATION =====
// Instructions:
// 1. Sign up at https://www.emailjs.com/
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template
// 4. Replace the values below with your actual IDs

const EMAILJS_CONFIG = {
  serviceID: 'service_nuyvv1s',      // e.g., 'service_abc123'
  templateID: 'template_1h93lcp',    // e.g., 'template_xyz789'
  publicKey: 'yJsmHsAxGXBt04WXi'       // e.g., 'abcdef123456'
};

// Load EmailJS SDK
(function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
  script.onload = function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  };
  document.head.appendChild(script);
})();

// Contact Form Handler
function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector(".submit-btn");
  const originalText = btn.textContent;

  // Disable button and show loading state
  btn.disabled = true;
  btn.textContent = "Sending...";
  btn.style.opacity = "0.6";

  // Get form data
  const templateParams = {
    from_name: form.name.value,
    from_email: form.email.value,
    subject: form.subject.value,
    message: form.message.value,
    to_email: 'prottoypaul77@gmail.com' // Replace with your email
  };

  // Send email using EmailJS
  emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      
      // Success feedback
      btn.textContent = "✓ Message Sent!";
      btn.style.background = "#10b981";
      btn.style.opacity = "1";
      
      // Reset form
      form.reset();
      
      // Show success message
      showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    })
    .catch(function(error) {
      console.error('FAILED...', error);
      
      // Error feedback
      btn.textContent = "✗ Failed to Send";
      btn.style.background = "#ef4444";
      btn.style.opacity = "1";
      
      // Show error message
      showNotification('Failed to send message. Please try again or contact us directly.', 'error');
      
      // Reset button after 3 seconds
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
        btn.style.opacity = "1";
      }, 3000);
    });
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }
`;
document.head.appendChild(style);

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

// Scroll animations
const observeElements = document.querySelectorAll('.goal-card, .event-card, .meeting-item, .contact-card, .contact-form-container');
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      scrollObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

observeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  scrollObserver.observe(el);
});

// ===== Simple i18n (English + Bangla) =====
(function(){
  const dict = {
    en: {
      "site.title":"VIVEK",
      "skip":"Skip to content",
      "nav.home":"Home","nav.about":"About","nav.meetings":"Meetings","nav.events":"Events",
      "nav.scholarship":"Scholarship","nav.gallery":"Gallery","nav.contact":"Contact",
      "hero.title":"VIVEK",
      "hero.subtitle":"Vivekananda Vedanta Centre \n Born to be good, to do good.",
      "about.heading":"About Us",
      "about.lead":"Vivekananda Vedanta Centre is dedicated to spiritual growth, meaningful relationships, and compassionate service.",
      "about.worship.title":"Worship Together",
      "about.worship.body":"Experience uplifting worship services that inspire and strengthen your faith. Our community gathers to celebrate, pray, and grow closer to God and one another.",
      "about.fellowship.title":"Fellowship & Growth",
      "about.fellowship.body":"Build lasting relationships through small groups, Vivekananda Study, and community events. We believe in walking together on our spiritual journey.",
      "about.service.title":"Serve with Love",
      "about.service.body":"Make a difference in our community through outreach programs, volunteer opportunities, and acts of compassion that reflect God's love.",
      "meetings.heading":"Our Meetings",
      "label.time":"Time:",
      "meetings.sun.title":"Next Meeting-Sunday",
      "meetings.sun.time":"10:00 AM-11:00 AM",
      "meetings.sun.body":"Join us for our main worship service with inspiring messages, uplifting music, and fellowship.",
      "meetings.wed.title":"Wednesday Vivekananda Study",
      "meetings.wed.time":"7:00 PM - 8:30 PM",
      "meetings.wed.body":"Dive deeper into God's Word with our midweek Bible study. All ages welcome.",
      "meetings.fri.title":"Friday Youth Group",
      "meetings.fri.time":"6:00 PM - 8:00 PM",
      "meetings.fri.body":"A dynamic gathering for young people to connect, grow in faith, and have fun together.",
      "meetings.sat.title":"Saturday Prayer Meeting",
      "meetings.sat.time":"8:00 AM - 9:00 AM",
      "meetings.sat.body":"Start your weekend with focused prayer and intercession for our community and world.",
      "events.heading":"Upcoming Events",
      "events.1.date":"October 15, 2025","events.1.title":"Community Outreach Day",
      "events.1.body":"Join us for a day of serving our community through food distribution, neighborhood cleanup, and visiting local care facilities.",
      "events.2.date":"October 25, 2025","events.2.title":"Fall Harvest Festival",
      "events.2.body":"Celebrate the season with games, food, music, and fellowship. A family-friendly event for all ages!",
      "events.3.date":"November 8, 2025","events.3.title":"Leadership Conference",
      "events.3.body":"A special gathering for ministry leaders and volunteers to be equipped, encouraged, and empowered.",
      "events.4.date":"November 22, 2025","events.4.title":"Thanksgiving Service",
      "events.4.body":"Come together as a community to give thanks and celebrate God's blessings in our lives.",
      "events.5.date":"December 10, 2025","events.5.title":"Christmas Musical",
      "events.5.body":"Experience the joy of the season through music, drama, and the timeless story of Christ's birth.",
      "events.6.date":"December 24, 2025","events.6.title":"Christmas Eve Service",
      "events.6.body":"Join us for a special candlelight service celebrating the birth of our Savior.",
      "scholarship.heading":"Scholarship Program",
      "scholarship.subhead":"Empowering Future Leaders",
      "scholarship.p1":"Our scholarship program supports promising students in our community who demonstrate academic excellence, leadership potential, and a commitment to service.",
      "scholarship.amount.label":"Award Amount:",
      "scholarship.amount.value":"Up to $5,000 per academic year",
      "scholarship.elig.label":"Eligibility:",
      "scholarship.elig.value":"High school seniors and current college students who are active members of our faith community and maintain a minimum 3.0 GPA.",
      "scholarship.deadline.label":"Application Deadline:",
      "scholarship.deadline.value":"March 31, 2026",
      "scholarship.apply":"Apply Now",
      "scholarship.alert":"Application portal opening soon! Check back in January 2026.",
      "gallery.heading":"Gallery",
      "gallery.items.1":"Sunday Service","gallery.items.2":"Youth Group","gallery.items.3":"Community Outreach","gallery.items.4":"Bible Study",
      "gallery.items.5":"Worship Team","gallery.items.6":"Children's Ministry","gallery.items.7":"Prayer Meeting","gallery.items.8":"Fellowship Dinner",
      "gallery.note":"Photo gallery coming soon. Check back for images from our events and services.",
      "contact.heading":"Contact Us",
      "contact.name":"Name","contact.email":"Email","contact.subject":"Subject","contact.message":"Message",
      "contact.name_ph":"Your full name","contact.email_ph":"your.email@example.com","contact.subject_ph":"How can we help you?","contact.message_ph":"Tell us more...",
      "contact.send":"Send Message",
      "contact.visit.title":"Visit Us","contact.visit.addr":"Ramakrishna Mission /n Dhaka,Bangladesh",
      "contact.call.title":"Call Us","contact.call.num":"xxxxxxxxxxxx",
      "contact.email.title":"Email Us","contact.email.addr":"xxxxxxxxxxxxxxx",
      "contact.hours.title":"Office Hours","contact.hours.value":"Monday - Friday\n9:00 AM - 5:00 PM",
      "footer.brand":"Faith Community Center","footer.tag":"Growing together in faith and love",
      "footer.quick":"Quick Links","footer.getinvolved":"Get Involved","footer.connect":"Connect",
      "footer.copyright.name":"Vivek","footer.copyright":"All rights reserved.","footer.built":"Built with love and faith."
    },
    bn: {
      "site.title":"বিবেক",
      "skip":"মূল কন্টেন্টে যান",
      "nav.home":"হোম","nav.about":"আমাদের সম্পর্কে","nav.meetings":"সভা","nav.events":"ইভেন্ট","nav.scholarship":"স্কলারশিপ","nav.gallery":"গ্যালারি","nav.contact":"যোগাযোগ",
      "hero.title":"বিবেক",
      "hero.subtitle":"বিবেকানন্দ বেদান্ত কেন্দ্র,\n ভালো থাকার জন্য, ভালো করার জন্য জন্ম।",
      "about.heading":"আমাদের সম্পর্কে",
      "about.lead":"বিবেক আধ্যাত্মিক বিকাশ, অর্থবহ সম্পর্ক এবং সহমমির্তার সঙ্গে সমাজের সেবা দেওয়ার জন্য অঙ্গীকারবদ্ধ।",
      "about.worship.title":"একসাথে উপাসনা",
      "about.worship.body":"উদ্দীপনাময় উপাসনা আপনার বিশ্বাসকে দৃঢ় করবে। আমরা একসাথে উদযাপন করি, প্রার্থনা করি এবং ঈশ্বর ও একে অপরের কাছাকাছি হই।",
      "about.fellowship.title":"সখ্যতা ও বিকাশ",
      "about.fellowship.body":"ছোট ছোট গ্রুপ,বিবেকানন্দ স্টাডি ও সম্প্রীতির মাধ্যমে দীর্ঘস্থায়ী সম্পর্ক গড়ে তুলুন।",
      "about.service.title":"ভালবাসায় সেবা",
      "about.service.body":"স্বেচ্ছাসেবা ও সহমমির্তার কাজের মাধ্যমে আমাদের কমিউনিটিতে পরিবর্তন আনুন।",
      "meetings.heading":"আমাদের সভা",
      "label.time":"সময়:",
      "meetings.sun.title":"রবিবারের উপাসনা",
      "meetings.sun.time":"১০:০০ পূর্বাহ্ণ - ১২:০০ অপরাহ্ণ",
      "meetings.sun.body":"প্রেরণাদায়ক বার্তা, সঙ্গীত ও মিলনমেলায় ভরা প্রধান উপাসনায় যোগ দিন।",
      "meetings.wed.title":"বুধবার বাইবেল স্টাডি",
      "meetings.wed.time":"৭:০০ অপরাহ্ণ - ৮:৩০ অপরাহ্ণ",
      "meetings.wed.body":"ঈশ্বরের বাক্য গভীরভাবে জানতে সাপ্তাহিক স্টাডিতে অংশ নিন। সব বয়সের জন্য উন্মুক্ত।",
      "meetings.fri.title":"শুক্রবার যুবসমাজ",
      "meetings.fri.time":"৬:০০ অপরাহ্ণ - ৮:০০ অপরাহ্ণ",
      "meetings.fri.body":"যুবকদের জন্য আড্ডা, বিশ্বাসে বৃদ্ধি ও আনন্দের একটি প্রাণবন্ত সমাবেশ।",
      "meetings.sat.title":"শনিবার প্রার্থনা সভা",
      "meetings.sat.time":"৮:০০ পূর্বাহ্ণ - ৯:০০ পূর্বাহ্ণ",
      "meetings.sat.body":"সপ্তাহান্ত শুরু করুন মনোযোগী প্রার্থনার মাধ্যমে।",
      "events.heading":"আসন্ন ইভেন্ট",
      "events.1.date":"১৫ অক্টোবর, ২০২৫","events.1.title":"কমিউনিটি আউটরিচ ডে",
      "events.1.body":"খাদ্য বিতরণ, এলাকা পরিষ্কার ও কেয়ার সেন্টার ভিজিটের মাধ্যমে সেবার দিনে যোগ দিন।",
      "events.2.date":"২৫ অক্টোবর, ২০২৫","events.2.title":"হার্ভেস্ট ফেস্টিভ্যাল",
      "events.2.body":"গেমস, খাবার, সঙ্গীত ও মিলনমেলায় মৌসুম উদযাপন করুন। পরিবার-বান্ধব অনুষ্ঠান!",
      "events.3.date":"৮ নভেম্বর, ২০২৫","events.3.title":"লিডারশিপ কনফারেন্স",
      "events.3.body":"নেতা ও স্বেচ্ছাসেবকদের জন্য উৎসাহ ও সক্ষমতায় ভরপুর বিশেষ সমাবেশ।",
      "events.4.date":"২২ নভেম্বর, ২০২৫","events.4.title":"ধন্যবাদ জ্ঞাপন সেবা",
      "events.4.body":"ঈশ্বরের আশীর্বাদের জন্য একসঙ্গে কৃতজ্ঞতা প্রকাশ করি।",
      "events.5.date":"১০ ডিসেম্বর, ২০২৫","events.5.title":"ক্রিসমাস মিউজিক্যাল",
      "events.5.body":"সঙ্গীত ও নাটকের মাধ্যমে ঋতু আনন্দ উপভোগ করুন।",
      "events.6.date":"২৪ ডিসেম্বর, ২০২৫","events.6.title":"ক্রিসমাস ইভ সার্ভিস",
      "events.6.body":"উদ্ধারকর্তার জন্ম উদযাপনে বিশেষ মোমবাতি প্রজ্বলন অনুষ্ঠান।",
      "scholarship.heading":"স্কলারশিপ প্রোগ্রাম",
      "scholarship.subhead":"ভবিষ্যৎ নেতাদের ক্ষমতায়ন",
      "scholarship.p1":"আমাদের স্কলারশিপ কমিউনিটির মেধাবী শিক্ষার্থীদের সহায়তা করে যারা পড়াশোনায় সাফল্য, নেতৃত্বের সম্ভাবনা ও সেবার মনোভাব দেখায়।",
      "scholarship.amount.label":"পুরস্কারের পরিমাণ:",
      "scholarship.amount.value":"প্রতি academic বর্ষে সর্বোচ্চ $৫,০০০",
      "scholarship.elig.label":"যোগ্যতা:",
      "scholarship.elig.value":"আমাদের কমিউনিটির সক্রিয় সদস্য এমন উচ্চ-মাধ্যমিক ও কলেজ শিক্ষার্থীরা যাদের GPA ন্যূনতম ৩.০।",
      "scholarship.deadline.label":"আবেদনের শেষ তারিখ:",
      "scholarship.deadline.value":"৩১ মার্চ, ২০২৬",
      "scholarship.apply":"এখনই আবেদন করুন",
      "scholarship.alert":"আবেদন পোর্টাল শীঘ্রই খোলা হবে! ২০২৬ জানুয়ারিতে দেখে নিন।",
      "gallery.heading":"গ্যালারি",
      "gallery.items.1":"রবিবারের সেবা","gallery.items.2":"যুবসমাজ","gallery.items.3":"কমিউনিটি আউটরিচ","gallery.items.4":"বাইবেল স্টাডি",
      "gallery.items.5":"উপাসনা দল","gallery.items.6":"শিশু মন্ত্রণালয়","gallery.items.7":"প্রার্থনা সভা","gallery.items.8":"ফেলোশিপ ডিনার",
      "gallery.note":"ফটো গ্যালারি শীঘ্রই আসছে। ইভেন্টের ছবি দেখতে আবার দেখুন।",
      "contact.heading":"যোগাযোগ করুন",
      "contact.name":"নাম","contact.email":"ইমেইল","contact.subject":"বিষয়","contact.message":"বার্তা",
      "contact.name_ph":"আপনার পূর্ণ নাম","contact.email_ph":"your.email@example.com","contact.subject_ph":"আমরা কীভাবে সাহায্য করতে পারি?","contact.message_ph":"আরো জানান...",
      "contact.send":"বার্তা পাঠান",
      "contact.visit.title":"আমাদের ঠিকানা","contact.visit.addr":"রামকৃষ্ণ মিশন, ঢাকা বাংলাদেশ ",
      "contact.call.title":"ফোন","contact.call.num":"১১১১১১১১১১১",
      "contact.email.title":"ইমেইল","contact.email.addr":"১১১১১১১১১১১১১",
      "contact.hours.title":"অফিস সময়","contact.hours.value":"সোমবার - শুক্রবার\nসকাল ৯টা - বিকাল ৫টা",
      "footer.brand":"বিবেকানন্দ বেদান্ত কেন্দ্র","footer.tag":"বিশ্বাস ও ভালবাসায় একসাথে বেড়ে উঠি",
      "footer.quick":"দ্রুত লিংক","footer.getinvolved":"যুক্ত হোন","footer.connect":"কানেক্ট",
      "footer.copyright.name":"বিবেক","footer.copyright":"সমস্ত অধিকার সংরক্ষিত।","footer.built":"ভালবাসা ও বিশ্বাসে নির্মিত।"
    }
  };

  function applyI18n(lang){
    const t = (key)=> (dict[lang] && dict[lang][key]) || key;
    document.querySelectorAll("[data-i18n]").forEach(el=>{
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if(val){
        if(el.tagName === "INPUT" || el.tagName === "TEXTAREA"){
          el.value = el.value;
        }
        el.innerHTML = val.replace(/\n/g,'<br>');
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>{
      const key = el.getAttribute("data-i18n-placeholder");
      const val = t(key);
      if(val) el.setAttribute("placeholder", val);
    });
    document.documentElement.setAttribute("lang", lang === "bn" ? "bn" : "en");
    document.documentElement.setAttribute("data-lang", lang);
    localStorage.setItem("lang", lang);
  }

  function setupSwitcher(){
    const sel = document.getElementById("lang");
    if(!sel) return;
    const saved = localStorage.getItem("lang") || "en";
    sel.value = saved;
    applyI18n(saved);
    sel.addEventListener("change", ()=> applyI18n(sel.value));
  }

  window.__i18n = {t:(k)=>{
    const lang = localStorage.getItem("lang") || "en";
    return (dict[lang] && dict[lang][k]) || k;
  }};

  document.addEventListener("DOMContentLoaded", setupSwitcher);

})();
