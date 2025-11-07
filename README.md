# NewsByte - Article Sharing Platform

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/fc40c79a-91e7-47dc-9142-f662116bc22b" />

## About The Project

NewsByte started as a simple news portal and has evolved into a sophisticated **Medium-inspired interactive article sharing platform**. We empower writers and readers by providing intuitive publishing tools and community engagement features.

### Project Goals & Objectives

-  **Provide a clean and distraction-free writing experience for authors**
-  **Allow readers to easily discover high-quality content across categories**
-  **Build a community-driven ecosystem where writers can grow their audience**
-  **Support SEO-optimized articles for better online visibility**
-  **Deliver modern UI & UX optimized for both desktop and mobile users**
-  **Implement an article review & approval system for content moderation**

## Project Structure

### newsbyte/
```
├── 📂 app/ # Next.js App Router
│ ├── (auth)/ # Authentication route groups
│ ├── (dashboard)/ # Dashboard route groups
│ ├── api/ # API routes
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
├── 📂 components/ # Reusable React components
│ ├── ui/ # shadcn/ui components
├── 📂 contexts/ # React Context providers
├── 📂 hooks/ # Custom React hooks
├── 📂 lib/ # Utility libraries
│ ├── utils.ts # Helper functions
│ └── supabase.ts # Supabase client configuration
├── 📂 services/ # business logic layer
├── 📂 schemas/ # Zod validation schemas
├── 📂 styles/ # Additional styles
├── 📂 types/ # TypeScript type definitions
├── 📂 utils/ # Utility functions
├── 📂 constants/ # Application constants
├── 📂 providers/ # React providers
├── 📂 public/ # Static assets (images, icons)
├── 📂 middleware.ts # Next.js middleware
├── 🔑 .env.local # Environment variables
├── 📄 package.json # Dependencies and scripts
└── ⚡ next.config.ts # Next.js configuration
```


## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js** (App Router) | React framework with latest features |
| **TypeScript** | Type safety and better developer experience |
| **Tailwind CSS** | Utility-first CSS framework |
| **shadcn/ui** | Reusable component library |
| **React Hook Form** | Form state management |
| **Zod** | Schema validation |
| **Context API** | Global state management |

### Backend & Services
| Service | Function |
|---------|----------|
| **Supabase** | Backend-as-a-Service platform |
| **PostgreSQL** | Primary database |
| **Supabase Auth** | Authentication service |
| **Supabase Storage** | File storage |
