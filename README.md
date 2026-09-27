# LuxeTide  
A luxury cruise & travel booking platform built with Next.js, Supabase, and Tailwind CSS.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation️ & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project 
LuxeTide is a full-stack luxury cruise booking and management platform. It serves two main audiences:

1. **Customers** — browse a curated fleet of luxury ships (M.V. The Wave 2, M.V. The Wave, The River Cruise), view suites, check availability, and book voyages across the Bay of Bengal (e.g., Sundarbans).
2. **Admin/Staff** — manage bookings, schedules, suite pricing, suite availability, ship content, promotions, and user roles via a protected dashboard.

The project solves the problem of providing a seamless, premium online booking experience for high-end maritime travel, backed by a relational database (Supabase/PostgreSQL) and role-based access control.

---

## Project Overview  
LuxeTide is a **Next.js 16** (App Router) application written in **TypeScript**, styled with **Tailwind CSS v4**, and powered by **Supabase** (PostgreSQL + Auth). The UI uses `motion/react` for scroll-driven animations, giving it an editorial, high-end feel.

**Key metrics & stats:**

- **3 ships** in the fleet (with plans for more)
- **1 destination** currently featured (The Sundarbans)
- **Multiple suite categories** per ship (Infinity Royal Suite, Panorama Deluxe, etc.)
- **Admin roles:** `admin`, `staff`, `customer`
- **Booking statuses:** `pending`, `confirmed`, `completed`, `cancelled`
- **Payment statuses:** `unpaid`, `paid`, `partial`, `refunded`

The database schema includes tables for `admin_users`, `bookings`, `schedules`, `suite_availability`, and `suite_pricing`, all mapped to TypeScript interfaces via custom mappers.

---

## Key Features  
- **Fleet Showcase** — Beautifully animated ship landing pages with hero videos, suite galleries, and detailed deck plans.  
- **Suite Booking Flow** — Customers can select a ship/suite, pick an available date range, specify rooms/guests, and submit a booking.  
- **Availability Management** — Staff can create, edit, and delete suite availability windows (start/end dates).  
- **Dynamic Pricing** — Suite prices can be configured per night, with optional B2B/B2C dual pricing for specific ships.  
- **Admin Dashboard** — Full CRUD for bookings, schedules, suites, ships, and users. Includes search, filtering, sorting, and modal-based editing.  
- **Authentication** — Supabase Auth with email/password, email confirmation, and password reset. Server actions handle login/signup/reset.  
- **Role-Based Access** — Admin layout checks `isStaffOrAdmin` and redirects unauthorized users.  
- **API Layer** — Route handlers (`app/api/`) expose REST endpoints for bookings, schedules, suites, suite-availability, suite-pricing, and admin users, all protected by an admin-context middleware.  
- **Static & Dynamic Rendering** — Ship detail pages use `generateStaticParams` and `generateMetadata` for SEO.  
- **Premium UI Components** — Custom `PremiumUI` button/input/select components, plus `ScrollReveal`, `ShipMediaCarousel`, and `ShipSuiteGrid`.

---

## Tech Stack  
**Frontend:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · `motion/react` · `lucide-react` · `class-variance-authority` · `clsx` · `tailwind-merge` · `tw-animate-css`  
**Backend / Data:** Supabase (PostgreSQL, Auth, RLS) · `@supabase/supabase-js` · `@supabase/ssr` · Server Actions · Route Handlers  
**Tools:** Git · VS Code · ESLint · PostCSS · TypeScript

---

## Dependencies  
List required dependencies or major libraries:

```json
{
  "dependencies": {
    "@base-ui/react": "^1.4.1",
    "@fontsource-variable/geist": "^5.2.8",
    "@supabase/ssr": "^0.5.0",
    "@supabase/supabase-js": "^2.49.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dotenv": "^17.2.3",
    "lucide-react": "^0.546.0",
    "motion": "^12.38.0",
    "next": "16.2.5",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "shadcn": "^4.7.0",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^9",
    "eslint-config-next": "16.2.5",
    "postcss": "^8",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone https://github.com/AsifFoisal/LuxeTide
cd LuxeTide
npm install
```

2. Set up environment variables by creating a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

> These values are read by `src/lib/supabase/env.ts`.

3. Set up the database — run the SQL schema and seed files in your Supabase project:

```sql
-- supabase/schema.sql
-- supabase/seed.sql (if present)
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

5. Build for production (optional):

```bash
npm run build
npm start
```

---

## Folder Structure

```plaintext
travel/
│
├── app/                         # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx               # Root layout (metadata, fonts, Layout wrapper)
│   ├── page.tsx                 # Home page (hero, suites showcase)
│   ├── about/                   # About page
│   ├── admin/                   # Admin dashboard (protected)
│   │   ├── layout.tsx           # Admin auth check
│   │   ├── page.tsx             # Admin overview
│   │   ├── bookings/            # Booking management
│   │   ├── pricing/             # Suite pricing management
│   │   ├── schedules/           # Suite availability management
│   │   ├── ships/               # Ship content editor
│   │   └── suites/              # Suite catalog management
│   ├── api/                     # REST API routes
│   │   ├── admin-users/
│   │   ├── bookings/
│   │   ├── schedules/
│   │   ├── suite-availability/
│   │   ├── suite-pricing/
│   │   └── suites/
│   ├── auth/                    # Authentication pages & server actions
│   │   ├── actions.ts           # login, signup, resetPassword
│   │   ├── login/page.tsx
│   │   ├── reset/page.tsx
│   │   └── signup/page.tsx
│   ├── booking/page.tsx         # Customer booking form
│   ├── cabins/page.tsx
│   ├── contact/page.tsx
│   ├── destinations/page.tsx
│   ├── dining/page.tsx
│   ├── fleet/page.tsx
│   ├── gallery/page.tsx
│   ├── layouts/page.tsx
│   ├── packages/page.tsx
│   ├── policy/page.tsx
│   ├── services/page.tsx
│   └── ships/
│       ├── page.tsx             # Fleet listing
│       └── [id]/                # Dynamic ship detail pages
│           ├── page.tsx
│           ├── food/
│           └── suites/
│
├── src/
│   ├── constants.ts             # Ships, destinations, packages data
│   ├── ship-details.ts          # Ship content seeds (tagline, about, suites, videos)
│   ├── ship-types.ts            # TypeScript types for ships/suites
│   ├── types.ts                 # Core domain types (Booking, Schedule, etc.)
│   ├── components/              # Reusable UI components
│   │   ├── AvailableSchedules.tsx
│   │   ├── CabinsContent.tsx
│   │   ├── Footer.tsx
│   │   ├── InfinityRoyalSuiteSection.tsx
│   │   ├── Layout.tsx
│   │   ├── MVWave2Layout.tsx
│   │   ├── MVWaveLayout.tsx
│   │   ├── Navbar.tsx
│   │   ├── PanoramaDeluxeSuiteSection.tsx
│   │   ├── PanoramaKingSuiteSection.tsx
│   │   ├── PanoramaTripleSuiteSection.tsx
│   │   ├── PremiumUI.tsx        # Premium button/input/select
│   │   ├── ScrollReveal.tsx
│   │   ├── ShipBookingDialog.tsx
│   │   ├── ShipDetailsView.tsx
│   │   ├── ShipExperiencePage.tsx
│   │   ├── ShipMediaCarousel.tsx
│   │   ├── ShipSuiteGrid.tsx
│   │   ├── SiteLoading.tsx
│   │   ├── SuitePackageInfoSection.tsx
│   │   ├── VipPanoramaTripleSuiteSection.tsx
│   │   └── ui/                  # shadcn-style UI primitives
│   └── lib/                     # Utilities & API clients
│       ├── api-client.ts        # Generic fetch wrapper
│       ├── bookings.ts          # Booking CRUD client
│       ├── schedules.ts         # Schedule CRUD client
│       ├── ship-assets.ts       # Asset path helpers
│       ├── suite-availability.ts
│       ├── suite-catalog.ts     # Suite catalog helpers
│       ├── suite-pricing-server.ts
│       ├── suite-pricing.ts
│       ├── utils.ts
│       ├── db/mappers.ts        # DB ↔ TS mappers
│       └── supabase/            # Supabase client instances
│           ├── server.ts        # Server-side client (cookies)
│           ├── browser.ts       # Browser-side client
│           ├── admin.ts         # Admin-context client (service role)
│           └── env.ts           # Env validation
│
├── supabase/                    # Database schema & seed
│   ├── schema.sql
│   └── seed.sql
│
├── public/                      # Static assets
│   └── ship-assets/             # Ship images & videos
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── tailwind.config.js
├── eslint.config.mjs
└── README.md
```

---

## Contributions
This is a solo-built project designed, developed, and maintained by G.M Asif Foisal.

| Name            | Role                | Contributions                            |  
|-----------------|---------------------|------------------------------------------|  
| G.M Asif Foisal | Full Stack Developer | End-to-end architecture, frontend, backend, database design, deployment |  

---

## How to Contribute

  - Fork the Project
  - Create a branch (`git checkout -b feature/AmazingFeature`)
  - Commit changes (`git commit -m 'Add some AmazingFeature'`)
  - Push the branch (`git push origin feature/AmazingFeature`)
  - Open a Pull Request

---


## Contact

**Live URL:** [LuxeTide Live Site](https://luxetide.vercel.app/)  
**Email:** [asiffoisalaisc@email.com](mailto:asiffoisalaisc@email.com)  
**Portfolio:** [GitHub Profile](https://github.com/AsifFoisal)
