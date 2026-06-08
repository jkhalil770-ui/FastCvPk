export type Language = 'en' | 'ur';

export interface TranslationDict {
  [key: string]: {
    en: string;
    ur: string;
  };
}

export const translations: TranslationDict = {
  // Navigation & General
  brandName: { en: "FastCV PK", ur: "فاسٹ سی وی پی کے" },
  tagline: { en: "Pakistan's #1 Free CV & Biodata Maker", ur: "پاکستان کا نمبر 1 مفت سی وی اور بائیو ڈیٹا میکر" },
  home: { en: "Home", ur: "ہوم" },
  templates: { en: "Templates", ur: "ٹیمپلیٹس" },
  blog: { en: "Blog", ur: "بلاگ" },
  dashboard: { en: "Dashboard", ur: "ڈیش بورڈ" },
  admin: { en: "Admin", ur: "ایڈمن" },
  login: { en: "Login / Sign Up", ur: "لاگ ان / سائن اپ" },
  logout: { en: "Logout", ur: "لاگ آؤٹ" },
  freeBadge: { en: "100% Free", ur: "100٪ مفت" },
  watermarkBadge: { en: "Free with Watermark", ur: "واٹر مارک کے ساتھ مفت" },
  premiumBadge: { en: "Premium", ur: "پریمیم" },
  createCVBtn: { en: "Create CV — Free", ur: "سی وی بنائیں — مفت" },
  viewTemplatesBtn: { en: "View Templates", ur: "ٹیمپلیٹس دیکھیں" },
  backToHome: { en: "Back to Home", ur: "ہوم پر واپس جائیں" },

  // Hero Section
  heroTitle: { 
    en: "Create Your Professional CV Free", 
    ur: "اپنا سی وی مفت بنائیں" 
  },
  heroSubtitle: { 
    en: "Pakistan's #1 Free CV & Biodata Maker. AI-powered, ATS friendly, and instantly downloadable in PDF format.", 
    ur: "پاکستان کا نمبر 1 مفت سی وی اور بائیو ڈیٹا میکر۔ آرٹیفیشل انٹیلیجنس کے ساتھ سیکنڈوں میں بہترین پی ڈی ایف ڈاؤن لوڈ کریں۔" 
  },
  heroCTA1: { en: "Create CV — Free", ur: "سی وی بناؤ — مفت" },
  heroCTA2: { en: "View Templates", ur: "ٹیمپلیٹس دیکھو" },
  
  // Stats
  statCvsCreated: { en: "10,000+ CVs Created", ur: "10,000+ سی وی بن چکے ہیں" },
  statCvTypes: { en: "4 Dedicated CV Types", ur: "4 مختلف سی وی کی اقسام" },
  statFreePercent: { en: "100% Free Templates", ur: "100٪ مفت ٹیمپلیٹس" },
  statTrustedBy: { en: "Trusted by Pakistanis", ur: "پاکستانیوں کا بھروسہ" },

  // CV Selection Cards
  selectCvTitle: { en: "Choose Your CV Type", ur: "سی وی کی قسم منتخب کریں" },
  selectCvSub: { en: "Select a professional format tailored for your career goal", ur: "اپنے کیریئر کے مقصد کے مطابق فارمیٹ کا انتخاب کریں" },
  atsCvName: { en: "ATS Friendly CV", ur: "اے ٹی ایس فرینڈلی سی وی" },
  atsCvTag: { en: "Job Applications", ur: "جاب ایپلی کیشنز" },
  atsCvDesc: { en: "Perfect for corporate, international, and government job applications.", ur: "کارپوریٹ، انٹرنیشنل اور سرکاری نوکریوں کے لیے موزوں۔" },
  
  atsClassicCvName: { en: "ATS Classic CV", ur: "اے ٹی ایس کلاسک سی وی" },
  atsClassicCvTag: { en: "Amazon / Google Standard", ur: "ایمیزون / گوگل معیار" },
  atsClassicCvDesc: { en: "Minimalist single-column Times New Roman format tailored for big-tech and global ATS scanners.", ur: "سنگل کالم کلاسک فارمیٹ، جو ایمیزون اور گوگل جیسی بڑی کمپنیوں کی نوکریوں کے لیے اے ٹی ایس اسکینر کے عین مطابق ہے۔" },
  
  biodataName: { en: "Simple Biodata", ur: "سادہ بائیو ڈیٹا" },
  biodataTag: { en: "General Use", ur: "عام استعمال / رشتہ" },
  biodataDesc: { en: "Professional Urdu Nastaliq biodata for general use and matrimonial purposes.", ur: "عام استعمال اور رشتے کے لیے خوبصورت اردو نستعلیق بائیو ڈیٹا۔" },
  
  studentCvName: { en: "Student CV", ur: "اسٹوڈنٹ سی وی" },
  studentCvTag: { en: "Fresh Graduates", ur: "فریش گریجویٹس" },
  studentCvDesc: { en: "Tailored for matric, intermediate, and university students seeking internships or first jobs.", ur: "میٹرک، انٹر اور یونیورسٹی طلباء کی انٹرنشپ اور پہلی نوکری کے لیے۔" },
  
  freelancerCvName: { en: "Freelancer CV", ur: "فریلانسر سی وی" },
  freelancerCvTag: { en: "Online Work", ur: "آن لائن کام" },
  freelancerCvDesc: { en: "Optimized for Fiverr, Upwork, LinkedIn, and remote global clients.", ur: "فائیور، اپ ورک، اور ریموٹ کام کے لیے موزوں۔" },
  freelancerDesc: { en: "Optimized for Fiverr, Upwork, LinkedIn, and remote global clients.", ur: "فائیور، اپ ورک، اور ریموٹ کام کے لیے موزوں۔" },
  
  globalProName: { en: "Global Pro CV", ur: "گلوبل پرو سی وی" },
  globalProTag: { en: "International / Remote", ur: "انٹرنیشنل / ریموٹ کام" },
  globalProDesc: { en: "Optimized for foreign companies, remote work, and LinkedIn profiles.", ur: "غیر ملکی کمپنیوں، ریموٹ کام، اور لنکڈ ان پروفائلز کے لیے موزوں۔" },

  useThisTemplate: { en: "Use This Template", ur: "اس ٹیمپلیٹ سے سی وی بنائیں" },

  // How It Works
  howItWorksTitle: { en: "How It Works", ur: "سی وی بنانے کا طریقہ" },
  step1Title: { en: "1. Fill Your Details", ur: "1. تفصیلات درج کریں" },
  step1Desc: { en: "Enter your experience, education, and skills in our simple form.", ur: "ہمارے آسان فارم میں اپنا تجربہ، تعلیم اور مہارتیں لکھیں۔" },
  step2Title: { en: "2. Let AI Polish It", ur: "2. اے آئی سی وی سجائے گا" },
  step2Desc: { en: "Our Gemini AI expands responsibilities with strong action verbs.", ur: "ہمارا اے آئی آپ کی سی وی کو خودکار طریقے سے مزید پیشہ ورانہ بنائے گا۔" },
  step3Title: { en: "3. Download High-Res PDF", ur: "3. پی ڈی ایف ڈاؤن لوڈ کریں" },
  step3Desc: { en: "Export your CV in print-ready A4 format in 300 DPI instantly.", ur: "پرنٹ کے لیے تیار ہائی کوالٹی پی ڈی ایف ایک کلک میں حاصل کریں۔" },

  // Watermark details
  watermarkSectionTitle: { en: "Simple aur Transparent", ur: "سادہ اور شفاف" },
  watermarkSectionSub: { en: "Student aur Biodata CV bilkul free — koi watermark nahi. ATS aur Freelancer CV free mein watermark ke saath. Watermark hatane ke liye sirf Rs. 199.", ur: "اسٹوڈنٹ اور بائیو ڈیٹا سی وی بالکل مفت — کوئی واٹر مارک نہیں۔ اے ٹی ایس اور فری لانسر سی وی فری میں واٹر مارک کے ساتھ۔ واٹر مارک ہٹانے کے لیے صرف 199 روپے" },
  watermarkTypeA: { en: "Matrimonial & Student Formats: 100% Free forever with no catch and no watermark.", ur: "بائیو ڈیٹا اور اسٹوڈنٹ فارمیٹ: بغیر کسی واٹر مارک کے ہمیشہ کے لیے 100٪ مفت۔" },
  watermarkTypeB: { en: "ATS & Freelancer Formats: Export free with a small, subtle watermark at the bottom, or remove it for only Rs. 199.", ur: "اے ٹی ایس اور فریلانسر: نیچے ایک چھوٹے واٹر مارک کے ساتھ مفت ڈاؤن لوڈ کریں، یا صرف 199 روپے میں واٹر مارک ہٹائیں।" },
  watermarkCTA: { en: "Remove Watermark — Rs. 199", ur: "واٹر مارک ہٹائیں — صرف 199 روپے" },

  // FAQ
  faqTitle: { en: "Frequently Asked Questions", ur: "اکثر پوچھے گئے سوالات" },
  q1: { en: "Is FastCV PK completely free?", ur: "کیا فاسٹ سی وی پی کے بالکل مفت ہے؟" },
  a1: { en: "Yes! Simple Biodata and Student CV templates are 100% free with no watermarks. ATS and Freelancer CVs are also free, but contain a tiny watermark at the bottom which you can remove for Rs. 199.", ur: "جی ہاں! بائیو ڈیٹا اور اسٹوڈنٹ سی وی بالکل مفت ہیں اور کوئی واٹر مارک نہیں ہوتا۔ اے ٹی ایس اور فری لانسر سی وی بھی مفت ہیں لیکن ان کے نیچے چھوٹا واٹر مارک ہوتا ہے جسے آپ 199 روپے میں ہٹا سکتے ہیں۔" },
  q2: { en: "What is a watermark and where is it located?", ur: "واٹر مارک کیا ہے اور یہ کہاں ہوتا ہے؟" },
  a2: { en: "A watermark is a subtle, light gray text at the bottom center of the page saying: 'Created free at FastCV.PK'. It is very small and doesn't interfere with your CV content.", ur: "واٹر مارک صفحہ کے نیچے ایک ہلکا سرمئی متن ہوتا ہے جس پر لکھا ہوتا ہے: 'Created free at FastCV.PK'۔ یہ بہت چھوٹا ہے اور آپ کی سی وی کی تفصیلات کو متاثر نہیں کرتا۔" },
  q3: { en: "What is an ATS friendly CV?", ur: "اے ٹی ایس (ATS) فرینڈلی سی وی کیا ہوتی ہے؟" },
  a3: { en: "ATS (Applicant Tracking System) is software used by large corporate employers in Pakistan and abroad to scan CVs. An ATS friendly CV uses single-column text layouts, standard fonts, and keywords so that scanners can parse it correctly. Urdu text is not read by ATS, so our ATS builder is English only.", ur: "اے ٹی ایس ایک سافٹ ویئر ہے جو بڑی کمپنیاں سی وی اسکین کرنے کے لیے استعمال کرتی ہیں۔ ایک اے ٹی ایس فرینڈلی سی وی سنگل کالم، معیاری فونٹس اور جاب کی ورڈز کا استعمال کرتی ہے۔ اے ٹی ایس اردو نہیں پڑھ سکتا، اس لیے ہماری اے ٹی ایس سی وی صرف انگریزی میں ہوتی ہے۔" },
  q4: { en: "What is the difference between a CV and a Biodata?", ur: "سی وی اور بائیو ڈیٹا میں کیا فرق ہے؟" },
  a4: { en: "A CV (Curriculum Vitae) focuses on professional career, skills, and work accomplishments. A Biodata is a personal profile common in Pakistan for marriages (Rishta) or local general jobs, highlighting father's name, religion, date of birth, and CNIC details.", ur: "سی وی آپ کے کیریئر اور پیشہ ورانہ مہارتوں پر مرکوز ہوتی ہے۔ بائیو ڈیٹا ایک ذاتی خاکہ ہوتا ہے جو عام طور پر پاکستان میں رشتے یا عام لوکل ملازمتوں کے لیے استعمال ہوتا ہے جس میں والد کا نام، مذہب، تاریخ پیدائش اور شناختی کارڈ کی تفصیلات شامل ہوتی ہیں۔" },
  q5: { en: "How can I download the PDF?", ur: "میں پی ڈی ایف کیسے ڈاؤن لوڈ کر سکتا ہوں؟" },
  a5: { en: "Once you fill the details and generate your CV via Gemini AI, click on the 'Download PDF' button. It will instantly render and download a high-definition, print-ready A4 PDF directly on your device.", ur: "جب آپ اپنی تفصیلات بھر لیں اور اے آئی کے ذریعے سی وی تیار کر لیں تو 'ڈاؤن لوڈ پی ڈی ایف' پر کلک کریں۔ یہ فوری طور پر آپ کے فون یا کمپیوٹر پر ہائی کوالٹی پرنٹ اے 4 پی ڈی ایف ڈاؤن لوڈ کر دے گا۔" },

  // Builder General
  personalInfo: { en: "Personal Info", ur: "ذاتی معلومات" },
  experienceEducation: { en: "Experience & Education", ur: "تجربہ اور تعلیم" },
  skillsDetails: { en: "Skills & Additional Details", ur: "مہارتیں اور دیگر معلومات" },
  previewDownload: { en: "Preview & Download", ur: "پیش نظارہ اور ڈاؤن لوڈ" },
  nextStep: { en: "Next Step", ur: "اگلا مرحلہ" },
  prevStep: { en: "Previous Step", ur: "پچھلا مرحلہ" },
  generateAICV: { en: "Generate with AI ✨", ur: "اے آئی سے سی وی بنائیں ✨" },
  aiGenerating: { en: "AI is crafting your professional CV...", ur: "اے آئی آپ کی شاندار سی وی تیار کر رہا ہے..." },
  livePreview: { en: "Live Preview", ur: "لائیو پری ویو" },
  switchTabForm: { en: "Edit Form", ur: "فارم ایڈٹ کریں" },
  switchTabPreview: { en: "Live Preview", ur: "لائیو پری ویو" },
  regenerateSection: { en: "Regenerate ✨", ur: "دوبارہ بنائیں ✨" },

  // Form Fields
  fullName: { en: "Full Name", ur: "نام" },
  fatherName: { en: "Father's Name", ur: "والد کا نام" },
  dob: { en: "Date of Birth", ur: "تاریخ پیدائش" },
  cnic: { en: "CNIC Number", ur: "شناختی کارڈ نمبر" },
  religion: { en: "Religion", ur: "مذہب" },
  city: { en: "City, Pakistan", ur: "شہر" },
  address: { en: "Full Address", ur: "مکمل پتہ" },
  phone: { en: "Phone Number", ur: "فون نمبر" },
  email: { en: "Email Address", ur: "ای میل" },
  profTitle: { en: "Professional Title (e.g., Software Engineer)", ur: "پیشہ ورانہ عنوان" },
  targetCompanyLabel: { en: "Target Company (e.g. Amazon, Google - optional)", ur: "ٹارگٹ کمپنی (جیسے ایمیزون، گوگل - اختیاری)" },
  targetCompanyPlaceholder: { en: "e.g. Amazon, Google, Systems Ltd", ur: "جیسے Amazon, Google, Systems Ltd" },
  linkedin: { en: "LinkedIn URL (optional)", ur: "لنکڈ ان یو آر ایل" },
  portfolio: { en: "Portfolio/Website URL (optional)", ur: "پورٹ فولیو / ویب سائٹ" },
  github: { en: "GitHub URL (optional)", ur: "گٹ ہب یو آر ایل" },
  schoolName: { en: "Institution Name", ur: "ادارے کا نام" },
  classProgram: { en: "Current Program/Class (e.g., BS Computer Science)", ur: "موجودہ کلاس / ڈگری" },
  cvLanguage: { en: "CV Language Selection", ur: "سی وی کی زبان منتخب کریں" },

  // Form step 2 fields
  workExpTitle: { en: "Work Experience", ur: "کام کا تجربہ" },
  company: { en: "Company Name", ur: "کمپنی کا نام" },
  jobTitle: { en: "Job Title", ur: "عہدہ" },
  fromDate: { en: "From Date", ur: "شروع کرنے کی تاریخ" },
  toDate: { en: "To Date", ur: "ختم کرنے کی تاریخ" },
  currentlyWorking: { en: "Currently Working Here", ur: "موجودہ ملازم ہوں" },
  responsibilities: { en: "Key Responsibilities / Achievements (Type keywords, AI will expand)", ur: "اہم ذمہ داریاں (صرف چند الفاظ لکھیں، اے آئی تفصیلاً خود لکھ دے گا)" },
  addJob: { en: "+ Add Another Job", ur: "+ نوکری شامل کریں" },
  
  educationTitle: { en: "Education", ur: "تعلیم" },
  degreeName: { en: "Degree / Certificate (e.g., Matric, FSc, BS)", ur: "ڈگری / سرٹیفکیٹ" },
  year: { en: "Passing Year", ur: "پاس کرنے کا سال" },
  grade: { en: "Grade / Percentage / CGPA", ur: "گریڈ / فیصد / سی جی پی اے" },
  addEducation: { en: "+ Add Another Education", ur: "+ تعلیم شامل کریں" },

  matric: { en: "Matric Board, Year & Marks", ur: "میٹرک: بورڈ، سال اور نمبر" },
  inter: { en: "Intermediate Board, Year & Marks", ur: "انٹر: بورڈ، سال اور نمبر" },
  graduation: { en: "Graduation University, Year & CGPA", ur: "گریجویشن: یونیورسٹی، سال اور سی جی پی اے" },
  masters: { en: "Masters (if any)", ur: "ماسٹرز (اگر کوئی ہو)" },
  
  internships: { en: "Internships & Intern Roles", ur: "انٹرنشپ کی تفصیلات" },
  projects: { en: "Academic / Professional Projects", ur: "اکیڈمک یا پروفیشنل پروجیکٹس" },
  projectName: { en: "Project Name", ur: "پروجیکٹ کا نام" },
  projDesc: { en: "Project Description & Results Achieved", ur: "پروجیکٹ کی تفصیل اور حاصل کردہ نتائج" },
  projUrl: { en: "Project Live/GitHub URL", ur: "پروجیکٹ کا لنک" },

  // Form step 3 fields
  skillsTitle: { en: "Skills Selection", ur: "مہارتوں کا انتخاب" },
  techSkills: { en: "Technical Skills (Comma separated, e.g. React, Excel)", ur: "ٹیکنیکل مہارتیں (کومہ کے ساتھ الگ کریں)" },
  softSkills: { en: "Soft Skills (Comma separated, e.g. Leadership, Urdu)", ur: "سافٹ مہارتیں (جیسے لیڈرشپ، بات چیت)" },
  languages: { en: "Languages Known (Comma separated, e.g. Urdu, English)", ur: "زبانیں جو آپ جانتے ہیں" },
  certifications: { en: "Certifications & Online Courses", ur: "سرٹیفکیٹ اور کورسز" },
  courseName: { en: "Course/Cert Name", ur: "کورس کا نام" },
  platform: { en: "Platform / Academy (e.g. Coursera)", ur: "ادارہ / پلیٹ فارم" },

  studentExtra: { en: "Extracurricular Activities & Achievements", ur: "اضافی سرگرمیاں اور کامیابیاں" },
  biodataExtra: { en: "Skill & Matrimonial References (2 References)", ur: "مہارتیں اور حوالہ جات (دو افراد کے نام اور نمبر)" },
  refName: { en: "Reference Name", ur: "حوالہ دینے والے کا نام" },
  refRelation: { en: "Relation / Title", ur: "رشتہ / تعلق" },
  refPhone: { en: "Contact Phone Number", ur: "فون نمبر" },

  // Download Page
  downloadReady: { en: "Your CV is Ready for Download!", ur: "آپ کی سی وی ڈاؤن لوڈ کے لیے تیار ہے!" },
  downloadFreePDF: { en: "Download Free PDF", ur: "مفت پی ڈی ایف ڈاؤن لوڈ کریں" },
  downloadFreeWithWatermark: { en: "Download Free PDF (with watermark)", ur: "مفت پی ڈی ایف ڈاؤن لوڈ کریں (واٹر مارک کے ساتھ)" },
  removeWatermarkPrem: { en: "Remove Watermark — Rs. 199", ur: "واٹر مارک ہٹائیں — صرف 199 روپے" },
  paymentTitle: { en: "Unlock Clean Premium CV", ur: "پریمیم سی وی کو انلاک کریں" },
  shareTitle: { en: "Liked FastCV PK? Share with friends!", ur: "فاسٹ سی وی پسند آئی؟ دوستوں کے ساتھ شیئر کریں!" },
  shareWhatsApp: { en: "Share on WhatsApp", ur: "واٹس ایپ شیئر" },
  shareFacebook: { en: "Share on Facebook", ur: "فیس بک شیئر" },
  copyLink: { en: "Copy CV Link", ur: "لنک کاپی کریں" },
  createAnother: { en: "Create Another CV", ur: "ایک اور سی وی بنائیں" },
  savePrompt: { en: "Want to save this CV online to edit later? Create a free account!", ur: "کیا آپ اس سی وی کو محفوظ کرنا چاہتے ہیں؟ ابھی اکاؤنٹ بنائیں!" },

  // Payment Modal
  payStep1: { en: "Step 1: Send Rs. 199 via NayaPay", ur: "مرحلہ 1: نیا پے کے ذریعے 199 روپے بھیجیں" },
  payNumberLabel: { en: "NayaPay Number:", ur: "نیا پے نمبر:" },
  payAmountLabel: { en: "Amount:", ur: "رقم:" },
  copyNumberBtn: { en: "Copy Number", ur: "نمبر کاپی کریں" },
  payStep2: { en: "Step 2: Confirm Transaction", ur: "مرحلہ 2: ٹرانزیکشن کی تصدیق کریں" },
  paySenderName: { en: "Your Name (on Account)", ur: "آپ کا نام (اکاؤنٹ کے مطابق)" },
  payTxnId: { en: "NayaPay Transaction ID (ID Number)", ur: "نیا پے ٹرانزیکشن آئی ڈی (رقم کی رسید)" },
  payEmailHelp: { en: "Your clean PDF without watermark will be emailed to you within 24 hours.", ur: "بغیر واٹر مارک کے صاف پی ڈی ایف 24 گھنٹے کے اندر آپ کو ای میل کر دی جائے گی۔" },
  submitBtn: { en: "Submit Payment Proof", ur: "ادائیگی کا ثبوت جمع کروائیں" },
  paySuccessTitle: { en: "Payment Verification Submitted!", ur: "ادائیگی کی تصدیق جمع ہو گئی!" },
  paySuccessDesc: { en: "Thank you! Our team is reviewing your transaction ID. Your watermark-free CV will be sent to your email within 24 hours.", ur: "شکریہ! ہماری ٹیم آپ کی ٹرانزیکشن کی جانچ کر رہی ہے۔ 24 گھنٹے کے اندر آپ کی ای میل پر صاف سی وی بھیج دی جائے گی۔" },
  whatsappSupport: { en: "WhatsApp Support Chat", ur: "واٹس ایپ سپورٹ چیٹ" },

  // Dashboard & Auth
  totalCvs: { en: "Total CVs Created", ur: "کل تیار کردہ سی وی" },
  totalDownloads: { en: "Total Downloads", ur: "کل ڈاؤن لوڈز" },
  dashboardEmpty: { en: "You haven't created any CVs yet.", ur: "آپ نے ابھی تک کوئی سی وی نہیں بنائی۔" },
  firstCvBtn: { en: "Create Your First CV", ur: "اپنی پہلی سی وی بنائیں" },
  editBtn: { en: "Edit", ur: "ایڈٹ کریں" },
  deleteBtn: { en: "Delete", ur: "حذف کریں" },
  shareBtn: { en: "Share", ur: "شیئر کریں" },

  // Admin Portal
  pendingPayments: { en: "Pending Payments Verification Queue", ur: "زیر التواء ادائیگیوں کی جانچ کا کیو" },
  approvedPayments: { en: "Approved Payments History", ur: "منظور شدہ ادائیگیوں کی ہسٹری" },
  adminStats: { en: "Admin Platform Performance Stats", ur: "ایڈمن کارکردگی کے اعداد و شمار" },
  approveAction: { en: "Approve Payment", ur: "تصدیق کریں" },
  rejectAction: { en: "Reject Payment", ur: "مسترد کریں" }
};

/**
 * Gets translation string safely based on current language choice.
 * Falls back to English if key is missing or undefined.
 */
export function getTranslation(key: string, lang: Language): string {
  const node = translations[key];
  if (!node) {
    console.warn(`Translation key not found: "${key}"`);
    return key;
  }
  return node[lang] || node['en'];
}

/**
 * Retrieves the persisted language from LocalStorage, falling back to 'en'.
 */
export function getPersistedLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('fastcvpk_lang');
  return (saved === 'en' || saved === 'ur') ? saved : 'en';
}

/**
 * Saves language choice to LocalStorage.
 */
export function setPersistedLanguage(lang: Language): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('fastcvpk_lang', lang);
  }
}
