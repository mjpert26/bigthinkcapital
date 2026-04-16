# Big Think Capital — Blog Landing Page + Admin CMS

A modern, fully responsive blog-style landing page for Big Think Capital with an integrated admin content management system.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **localStorage** for data persistence (no external database required)

## Features

### Public-Facing Site
- Premium fintech-style hero section with trust indicators
- Full SEO blog article with inline CTAs and callout boxes
- Stats / social proof section
- Testimonials
- Lead capture form
- Blog listing with category filtering
- Individual blog post pages
- Responsive design (mobile-first)
- Smooth animations and transitions

### Admin CMS (`/admin`)
- Secure login screen
- Dashboard with post stats
- Full post management: create, edit, delete
- Draft / Published status toggle
- Rich fields: title, slug, meta, featured image, excerpt, author, date, category, tags, body
- Search and filter posts
- Clean, modern dark-themed admin UI

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Admin Access

Navigate to `/admin` and use these demo credentials:

- **Email:** admin@bigthinkcapital.com
- **Password:** admin123

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage / Landing page
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Global styles + Tailwind
│   ├── blog/
│   │   ├── page.tsx          # Blog listing
│   │   └── [slug]/page.tsx   # Blog post detail
│   └── admin/
│       ├── layout.tsx        # Admin layout with sidebar
│       ├── page.tsx          # Admin dashboard
│       ├── login/page.tsx    # Admin login
│       └── posts/
│           ├── page.tsx      # Posts list
│           ├── new/page.tsx  # Create new post
│           └── [id]/page.tsx # Edit post
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ArticleContent.tsx
│   ├── StatsSection.tsx
│   ├── Testimonials.tsx
│   ├── LeadForm.tsx
│   ├── BlogCards.tsx
│   ├── FinalCTA.tsx
│   ├── Footer.tsx
│   └── PostEditor.tsx
└── lib/
    ├── posts.ts             # Post types + sample data
    ├── PostsContext.tsx      # Post state management
    └── AuthContext.tsx       # Auth state management
```

## Data Persistence

Posts are stored in `localStorage` under the key `btc_blog_posts`. Sample data is auto-seeded on first load. All CRUD operations persist immediately.

To reset to sample data, clear localStorage:
```js
localStorage.removeItem('btc_blog_posts');
```

## Deployment

Build for production:

```bash
npm run build
npm start
```

Deploy to Vercel, Netlify, or any platform that supports Next.js.

## Design Details

- **Typography:** Instrument Serif (display) + DM Sans (body) + JetBrains Mono (code)
- **Color System:** Custom brand blue palette with semantic CSS variables
- **Animations:** Subtle fade-in, slide-up effects with staggered delays
- **Dark Admin Theme:** Slate-925 base with glass-style cards
- **Mobile:** Fully responsive with hamburger nav and optimized touch targets

## License

Proprietary — Big Think Capital
