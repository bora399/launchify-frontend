# Launchify — Frontend Client (Next.js)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Firebase Auth](https://img.shields.io/badge/Firebase_Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![Deployment](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

The client application for **Launchify**, an AI-powered SaaS platform that enables founders and developers to spin up high-converting landing pages, iterate on copy with a live AI assistant, and collect bot-protected waitlists in seconds.

🔗 **Live Application:** [launchify-frontend-theta.vercel.app](https://launchify-frontend-theta.vercel.app)  
🔗 **Backend Repository (.NET Core):** [github.com/bora399/launchify-backend](https://github.com/bora399/launchify-backend)

---

## ✨ Core Features & Technical Highlights

### 1. Real-Time AI Generation with SignalR Streaming
* Connects to the .NET backend's `GenerationHub` via WebSockets (`@microsoft/signalr`) to stream live, step-by-step server telemetry while the AI structures the landing page architecture.

### 2. Multi-Theme Dynamic Rendering Engine (`/[slug]`)
* Dynamically renders user-generated pages across **4 distinct design systems**:
  * **Aurora:** Dark-mode SaaS aesthetic with mesh gradients, glassmorphism, and live cluster metric mockups.
  * **Brutal:** Neo-brutalist layout featuring high-contrast borders, marquee tickers, and comparison matrices.
  * **Corporate:** Clean B2B slate layout with SLA badges, enterprise KPI cards, and trust indicators.
  * **Minimal:** Editorial serif typography focused on whitespace and manifesto-style storytelling.

### 3. Live In-Dashboard AI Assistant (`EditModal`)
* Allows users to modify generated pages on the fly or invoke the **AI Content Assistant** to rewrite copy into specific tones (*Punchy Startup*, *B2B Corporate*, *Minimalist*) or suggest a full template/color redesign without leaving the dashboard.

### 4. Stale-While-Revalidate (SWR) Dashboard Hydration
* Eliminates perceived loading spinners on repeat visits by hydrating project lists, credit balances, and lead counts from local storage in **0ms**, while executing parallel background revalidation (`Promise.all`) against the .NET API.

### 5. Zero-Dependency 1:1 HTML Export (`exportHtml.ts`)
* Compiles any generated project and its active theme configuration into a self-contained, single-file `.html` bundle that matches the live React component 1:1 and can be hosted anywhere without external build steps.

### 6. Conversion Analytics & Lead Management
* **Traffic Visualization:** Interactive area charts powered by `Recharts` displaying visit distribution and real-time conversion rates (`Total Leads / Total Visits %`).
* **Spam-Protected Waitlist Forms:** Integrated client-side honeypot inputs and `409 Conflict` duplicate handling across all templates.
* **Data Portability:** One-click **CSV Export** for collected emails and instant QR code generation for mobile testing.

---

## 📂 Project Structure

```text
├── app/
│   ├── [slug]/            # Dynamic public landing page router
│   ├── components/
│   │   ├── templates/     # Aurora, Brutal, Corporate, and Minimal React templates
│   │   ├── EditModal.tsx  # Live editor & AI tone transformation assistant
│   │   └── ShareModal.tsx # QR Code & quick link sharing modal
│   ├── create/            # AI prompt wizard & SignalR live terminal view
│   ├── dashboard/         # SWR-hydrated analytics, lead table & project management
│   ├── login/             # Firebase Auth (Google OAuth & Magic Link)
│   └── utils/
│       └── exportHtml.ts  # 1:1 standalone HTML compiler
```

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone [https://github.com/bora399/launchify-frontend.git](https://github.com/bora399/launchify-frontend.git)
cd launchify-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Run the development server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.
