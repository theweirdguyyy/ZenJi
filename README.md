# ZENJI — NEO KAGE STREETWEAR

> **Anime-inspired cyberpunk luxury streetwear e-commerce platform built with Next.js 16, React 19, Zustand, and TypeScript.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0.3-brown?style=for-the-badge)](https://github.com/pmndrs/zustand)

---

## ✦ Overview

**ZENJI NEO KAGE** is a cutting-edge, high-fashion streetwear web application. The design language fuses Tokyo underground techwear with anime cyberpunk aesthetics—featuring deep void-black surfaces, razor-sharp typography, crimson accents, glassmorphic HUD elements, and fluid micro-animations.

The project is built as a production-grade e-commerce experience featuring a catalog, lookbook, interactive product pages, a global cart drawer & dedicated cart page with size switching, dynamic multi-step checkout with real-time shipping calculation, and instant downloadable/printable receipts.

---

## ⚡ Core Features

### 1. Storefront & Catalog
- **Home Page**: Cyberpunk hero banner, collection showcase, featured drops ticker, anime lore narrative, and 3-column responsive footer.
- **Shop & Collections**: Filter by category (Hoodies, T-Shirts, Accessories), sorting by price/newest, and responsive product grids.
- **Product Details (`/product/[id]`)**: High-resolution gallery with Cloudinary assets, interactive size/color picker, stock status indicator, and dynamic add-to-cart.
- **Editorial Lookbook (`/lookbook`)**: Interactive editorial gallery showcasing apparel styling, lore, and seasonal drops.
- **Story & Support (`/story`, `/support`)**: Brand narrative, customer care center, returns policy, and comprehensive FAQ accordion.

### 2. Cart Management (`Zustand 5`)
- **Slide-out Cart Drawer**: Quick slide-out drawer accessible from any page with live quantity adjustments and item removal.
- **Dedicated Cart Page (`/cart`)**:
  - Full-screen responsive layout: desktop data grid and mobile-first card view.
  - **Editable Product Sizes**: Inline size dropdown directly in the cart allowing customers to switch sizes without returning to the product page.
  - **Free Shipping Bar**: Interactive threshold indicator calculating remaining amount needed for free global delivery ($150 goal).

### 3. Multi-Step Checkout Flow (`/checkout`)
- **Centered Responsive Layout**: Optimized for desktop (2-column layout with sticky order summary) and centered card view on tablet/mobile screens (`max-width: 600px; margin: 0 auto;`).
- **Mobile Collapsible Order Summary**: Expandable accordion at the top of mobile checkout to review items and total anytime.
- **Step 1: Contact & Delivery**:
  - Comprehensive dropdown covering **40+ countries** (`data/countries-and-states.ts`).
  - **Dynamic State/Province Dropdown**: Selecting a country dynamically populates that country's exact states/provinces (US states, Canadian provinces, Japanese prefectures, etc.).
  - **Strict Form Validation**: All required fields must be filled before proceeding to the next step, highlighting incomplete fields with crimson borders, contextual labels, and an alert banner.
- **Step 2: Dynamic Shipping Calculation**:
  - **Standard Shipping**: $9.99 (or **FREE** for orders $\ge \$150$).
  - **Express Shipping**: $19.99 (2–3 business days).
  - **Overnight Shipping**: $39.99 (Next business day).
  - Real-time recalculation updates subtotal, shipping fee, total amount, and action button labels instantly.
- **Step 3: Payment & Security**:
  - Credit card formatting with real-time validation (Card Number, Name, MM/YY Expiry, CVC).
  - 256-bit encrypted checkout badge and security guarantees.
- **Order Confirmation & Receipt**:
  - Branded order confirmation view with unique `#ZNJ-XXXXXX` order ID and breakdown.
  - **Downloadable Receipt (.txt)**: Generates an official ASCII formatted text receipt with customer details and itemized pricing.
  - **Printable Receipt**: `@media print` optimized styling that strips headers, footers, and buttons to generate a clean invoice.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **State Management** | [Zustand 5](https://github.com/pmndrs/zustand) (with `persist` middleware) |
| **Styling** | Vanilla CSS Modules (`*.module.css`) & Global Design Tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Validation** | [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/) |

---

## 📂 Project Structure

```text
g:/AntiGravity/KuiJi/
├── app/
│   ├── layout.tsx              # Root HTML layout, font configurations, CartDrawer mounting
│   ├── page.tsx                # Home page with hero, drops, feature bar, collections
│   ├── globals.css             # Global CSS variables, fonts, reset, reset styles
│   ├── cart/                   # Dedicated Cart page & Cart.module.css
│   ├── checkout/               # Multi-step checkout, validation, receipt download & styles
│   ├── shop/                   # All products catalog with filtering & sorting
│   ├── product/[id]/           # Dynamic product detail page
│   ├── collection/             # Specific collection landing pages
│   ├── lookbook/               # Seasonal visual lookbook
│   ├── story/                  # Brand lore & story
│   └── support/                # Customer service & FAQ
├── components/
│   ├── layout/                 # Navbar, Footer (3-column responsive), CartDrawer, AnnounceBar
│   ├── home/                   # HeroSection, FeaturedDrops, FeatureBar, AnimeStory
│   ├── product/                # ProductCard, ProductGallery, SizeGuide, ColorPicker
│   ├── collection/             # CollectionFilters, CollectionGrid
│   ├── lookbook/               # LookbookViewer, LookbookCarousel
│   └── common/                 # Buttons, Badges, Modals, Breadcrumbs
├── data/
│   ├── products.ts             # Product inventory data (images, prices, sizes, stock)
│   ├── collections.ts          # Collection definitions (Cyber, Ronin, Shadow, Drop 07)
│   ├── countries-and-states.ts # 40+ countries and dynamic state/province mapping
│   ├── lookbook.ts             # Editorial photography & lookbook items
│   └── reviews.ts              # Customer verified reviews
├── store/
│   └── cart-store.ts           # Zustand store (items, size update, quantity, subtotal)
├── public/                     # Static assets, logos, favicons
├── next.config.ts              # Next.js configuration (Cloudinary image domains)
├── tsconfig.json               # TypeScript compiler config
└── package.json                # Dependencies and project scripts
```

---

## 🚀 Getting Started & How to Run

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: `v18.17.0` or higher (Node 20+ recommended)
- **npm** (comes with Node.js), **yarn**, or **pnpm**

Check your versions:
```bash
node -v
npm -v
```

---

### 2. Installation
1. Clone or navigate to the project directory:
   ```bash
   cd /KuiJi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

### 3. Development Server
To launch the local development server with Turbopack:

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000
```

The application will hot-reload automatically as you make changes.

---

### 4. Production Build
To create an optimized production build and test it locally:

1. **Build the bundle**:
   ```bash
   npm run build
   ```
2. **Start the production server**:
   ```bash
   npm run start
   ```

---

### 5. Linting
To check code quality and lint rules with ESLint:

```bash
npm run lint
```

---

## 🎨 Design System & Color Palette

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `--color-void` | `#000000` | Background canvas, darkest depth |
| `--color-smoke` | `#0D0D0D` / `#141414` | Card backgrounds, elevated surfaces |
| `--color-crimson`| `#E3261A` | Accent brand color, CTA buttons, active state |
| `--color-white` | `#FFFFFF` | Primary headers and high-contrast text |
| `--color-gray` | `rgba(255,255,255,0.6)`| Subtitles, body labels, secondary information |

---

## 📄 License & Credits

- **Brand**: SoEb's ZENJI NEO KAGE © 2026. All rights reserved.
- **Built for**: Advanced anime-inspired cyberpunk luxury streetwear.
