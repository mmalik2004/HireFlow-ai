# HireFlow AI 🚀

An AI-powered recruitment platform that helps companies hire 5x faster.


---

## 🌐 Live Demo
https://hireflow-demo.netlify.app
---

## 🔐 Test Credentials

### Super Admin (Full Access)
- **Email:** admin@hireflow.ai
- **Password:** hireflow2026

### Member (View Only)
- **Email:** member@hireflow.ai
- **Password:** hireflow2026

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Supabase | Database + Authentication |
| Groq API (Llama 3.3 70B) | AI Chatbot |
| Netlify | Deployment |

### Why this stack?
- **React + Vite** — Fast development experience, hot module replacement, and optimized production builds. Vite is significantly faster than Create React App.
- **Tailwind CSS** — Utility-first CSS framework that allows rapid UI development without writing custom CSS files. Makes responsive design easy.
- **Supabase** — Open source Firebase alternative with a generous free tier. Provides PostgreSQL database, built-in authentication, and real-time capabilities with no server setup required.
- **Groq API** — The fastest free AI API available. Uses Llama 3.3 70B model with generous free tier limits and no billing required. Perfect for powering the product chatbot.
- **Netlify** — Free hosting with automatic deployments from GitHub. Supports environment variables and redirect rules out of the box.

---

## ✨ Features

### Public Landing Page
- Hero section with live candidate pipeline preview
- 6 feature highlights with animations
- How it works — 4 step process
- Pricing tiers (Starter $79/mo, Growth $199/mo)
- Customer testimonials
- Demo request form with full validation
- AI chatbot powered by Groq (Llama 3.3 70B)

### AI Chatbot
- Answers questions about HireFlow AI features and pricing
- Stays on topic — politely redirects unrelated questions
- Saves all conversations to Supabase database
- Powered by Groq free tier — no billing required

### Admin Portal
- Secure login with email and password via Supabase Auth
- Two user roles: Super Admin and Member
- Protected routes — unauthorized users redirected to login
- Role-based access control throughout

### Lead Management Dashboard
- View all form submissions in a sortable table
- AI score for each candidate (60-100%)
- Visual pipeline bar showing candidate distribution
- Search candidates by name, email, or company
- Filter by status
- Click any candidate to view full details
- Super Admin can update candidate status
- Full status workflow: New → Screening → Interview → Offer Sent → Hired / Rejected

### Chat Logs
- View all chatbot conversations from the landing page
- Expandable conversation threads
- Timestamps for each message
- Linked to leads where possible

### Team Management (Super Admin only)
- Add team members with email and role
- Remove team members
- Assign Super Admin or Member role

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js v22+
- npm

### Setup Steps

**1. Clone the repository:**
```bash
git clone https://github.com/mmalik2004/hireflow-ai.git
cd hireflow-ai
```

**2. Install dependencies:**
```bash
npm install
```

**3. Create `.env` file in root folder:**
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**4. Run development server:**
```bash
npm run dev
```

**5. Open browser:**
```
http://localhost:5173
```

---

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_SUPABASE_URL | Your Supabase project URL | https://abcdefgh.supabase.co |
| VITE_SUPABASE_ANON_KEY | Your Supabase anon public key | eyJhbGciOiJIUzI1NiJ9... |
| VITE_GROQ_API_KEY | Your Groq API key (free at console.groq.com) | gsk_xxxxxxxxxxxx |

### How to get these keys:
- **Supabase** — Sign up free at supabase.com → Create project → Settings → API
- **Groq** — Sign up free at console.groq.com → API Keys → Create API Key

---

## 🗄 Database Schema

### leads table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| full_name | text | Candidate full name |
| email | text | Work email address |
| company | text | Company name |
| phone | text | Phone number |
| company_size | text | 1-10 / 11-50 / 51-200 / 200+ |
| message | text | Hiring needs description |
| status | text | Current pipeline status |
| ai_score | integer | AI match score 0-100 |
| submitted_at | timestamp | Form submission time |

### chat_logs table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| visitor_id | text | Unique visitor identifier |
| messages | jsonb | Array of chat messages |
| started_at | timestamp | Session start time |

### users table
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Auth user ID |
| email | text | User email address |
| role | text | superadmin or member |



## 🔧 What I Would Improve With More Time

1. **Real AI resume parsing** — Upload actual PDF resumes and parse with AI to auto-fill candidate details
2. **Email notifications** — Send automated emails when lead status changes using Resend or SendGrid
3. **Analytics charts** — Visual graphs showing hiring trends, conversion rates, and time-to-hire metrics
4. **Mobile app** — React Native version for on-the-go hiring management
5. **Calendar integration** — Sync interview schedules with Google Calendar automatically

---

## Built By

Built with ❤️ by **Mehak** 
