# FastCV PK — Pakistan's #1 Free CV & Biodata Maker

FastCV PK is a complete, production-ready, full-stack web application designed specifically for the Pakistani recruitment and personal matrimonial markets. It offers professional English CV generation and elegant Urdu Nastaliq Biodata formatting powered by Google Gemini AI, featuring conditional watermarking, secure Firestore databases, and automatic manual payment confirmations via Resend SMTP triggers.

**Live Production Link:** [fastcvpk.online](https://fastcvpk.online)

---

## 🚀 Key Features

1. **Dual Language Toggle System**: Dynamic client toggling fixed in the top right supporting English LTR (`Inter` font) and Urdu Nastaliq RTL (`Noto Nastaliq Urdu` font).
2. **Dynamic Template Formats**:
   - **Type A (100% Free - No Watermark)**: Matrimonial Simple Biodata & basic Student CV.
   - **Type B (Free with Subtle Watermark / Rs. 199 Premium)**: Corporate ATS Friendly CV & remote Freelancer layouts.
3. **Gemini 2.0 Flash AI Integration**: Server-side proxies to rewrite resume objective sheets and automatically expand job experience list bullets with active professional HR verbs.
4. **Manual NayaPay Integration**: Integrated manual payment confirmation modal capturing transaction references.
5. **Admin Transaction Portal**: Aggregated statistics view and pending transaction table where administrators verify transaction proofs. Upon clicking Approve, the system renders a watermark-free PDF in a hidden DOM element, converts it to base64, and updates the Firestore `hasWatermark` state, immediately emailing it to the user via Resend.
6. **High-Definition client-side PDF Generator**: Captured via jsPDF and html2canvas mapping standard A4 guidelines at 300 DPI high-definition scale, supporting right-aligned Nastaliq rendering.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth (Google single sign-on & Email credentials)
- **AI**: Google Gemini 2.0 Flash API (via `@google/generative-ai`)
- **PDF Compiler**: jsPDF + html2canvas
- **Email Dispatcher**: Resend.com SDK
- **Typography**: Inter (EN) & Noto Nastaliq Urdu (UR)

---

## 📂 Project Structure

```text
/app
  /api
    /approve-payment/route.ts
    /generate-cv/route.ts
    /save-cv/route.ts
    /send-cv-email/route.ts
    /submit-payment/route.ts
  /admin/page.tsx
  /blog/page.tsx
  /blog/[slug]/page.tsx
  /create/page.tsx
  /create/[type]/page.tsx
  /dashboard/page.tsx
  /download/[id]/page.tsx
  /templates/page.tsx
  /globals.css
  /layout.tsx
  /page.tsx
  /error.tsx
  /not-found.tsx
/components
  /cv-forms
    /ATSForm.tsx
    /BiodataForm.tsx
    /FreelancerForm.tsx
    /StudentForm.tsx
  /cv-templates
    /ATSTemplate.tsx
    /BiodataTemplate.tsx
    /FreelancerTemplate.tsx
    /StudentTemplate.tsx
  /layout
    /Footer.tsx
    /LanguageToggle.tsx
    /Navbar.tsx
  /ui
    /Badge.tsx
    /Button.tsx
    /Card.tsx
    /Input.tsx
    /Modal.tsx
    /Skeleton.tsx
    /Toast.tsx
/lib
  /blog-data.ts
  /email.ts
  /firebase.ts
  /gemini.ts
  /LanguageContext.tsx
  /pdf-generator.ts
  /translations.ts
/public
  /robots.txt
```

---

## ⚙️ Local Installation & Setup

### 1. Clone the project
Initialize a git repository in your workspace folder and commit files.

### 2. Install dependencies
Execute the standard package installation command:
```bash
npm install
```

### 3. Setup environment variables
Create a `.env.local` file in the root directory and append your private keys:
```env
# Firebase Configurations
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=fastcvpk-xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=fastcvpk-xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=fastcvpk-xxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

# AI & API Integrations
GEMINI_API_KEY=your_gemini_2_0_flash_api_key_here
RESEND_API_KEY=your_resend_api_key_here

# Business & Payment Logic
ADMIN_EMAIL=fastcvpk.online@gmail.com
NEXT_PUBLIC_NAYAPAY_NUMBER=0312-3456789
```

### 4. Database Setup (Firebase Firestore Rules)
Ensure your Firestore collection policies permit reads/writes or utilize the following rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cvs/{cvId} {
      allow read, write: if true;
    }
    match /payments/{paymentId} {
      allow read, write: if true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Launch local server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser.

---

## 📦 Production Deployment (Vercel)

This application is ready for zero-configuration deployments on **Vercel**:
1. Connect your GitHub repository to Vercel.
2. In the deployment dashboard, expand the **Environment Variables** panel.
3. Import all variables declared inside `.env.local`.
4. Click **Deploy**. Vercel will automatically build, bundle, and serve your app-router routes and API proxies globally.
