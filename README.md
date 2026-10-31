# MAISON ÉLAN — Digital Flagship

A responsive, editorial luxury-fashion storefront built with React, JavaScript, Vite, Tailwind CSS, React Router and Lucide React. This is a **frontend portfolio demonstration**: authentication is mocked, cart/wishlist preferences persist in browser local storage, and checkout creates a mock order only. No real payment is collected or order placed.

## Requirements

- Node.js 20.19+ (recommended for current Vite)
- npm 10+

## Run locally

```bash
cp .env.example .env
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production bundle is written to `dist/`. Deploy that directory to any static host that supports SPA rewrites (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, or your own Nginx server). Configure the host to serve `index.html` for client-side routes.

## Experience map

- `/` — editorial homepage
- `/women`, `/men`, `/new-arrivals`, `/seasonal` — curated collection listings with category filter and sorting
- `/collections`, `/collections/:slug` — collection stories
- `/product/:slug` — image gallery, variants, size guide, wishlist, bag
- `/search?q=...` — catalogue search
- `/wishlist`, `/bag`, `/checkout`, `/confirmation` — shopping journey
- `/account`, `/orders` — mock client account and order history state
- `/lookbook` — shoppable lookbook
- `/journal`, `/journal/:id` — editorial journal and article pages
- `/maison`, `/craftsmanship`, `/contact`, `/delivery-returns`, `/privacy` — brand and service information

## Persistence and demo boundaries

The cart, wishlist, recently viewed identifiers, gift-wrap preference and mock customer session are stored in `localStorage` under `me-*` keys. The checkout deliberately does not collect payment information. The login form is mock authentication and should not be represented as production-secure authentication. Product images currently reference Unsplash image URLs; replace them with licensed brand-owned campaign/product assets before a commercial launch.

## Backend adapter architecture

UI components consume the stable adapter exported from `src/services/store.js`. Proposed domain-specific REST modules are also separated under `src/services/` (`auth`, `products`, `collections`, `catalogue` for categories/variants/inventory, `shopping` for wishlist/cart, `customers`, `orders` and `checkout`). `VITE_USE_MOCK_API=true` selects the local mock adapter. Set it to `false` to select the initial REST adapter. `VITE_API_BASE_URL` is the base URL and every request sends `X-Store-Id: maison-elan` (configurable with `VITE_STORE_ID`). The real adapter is a contract placeholder: the endpoint paths below are **proposed contracts for the backend team to agree**, not claims that endpoints already exist.

See [`docs/API-CONTRACTS.md`](docs/API-CONTRACTS.md) for proposed Spring Boot contracts, payloads, tenancy, errors and integration notes.

## Reuse as a multi-client storefront

Brand-specific content, store identity, currency and locale live in `src/config/brand.js`; design tokens are centralized in `src/styles.css` and `tailwind.config.js`; catalogue seed content is in `src/data/products.js`. For another merchant, create a brand config and theme token set, supply that merchant's catalogue/media, and implement a matching adapter without coupling the visual components to a backend. Keep store scoping server-enforced: never trust a client-supplied store ID as the sole authorization boundary.

## Independent storefront deployment

Deploy this project as its own static site and connect it to the company's shared Spring Boot API using environment variables. Give each brand its own domain/subdomain (for example `maison-elan.example` or `maison.yourcompany.example`), configure DNS and HTTPS, set SPA fallback rewrites, and configure the API's CORS allowlist for that exact origin. Add a link from the development company's main website to the storefront domain; it can open in the same tab or a new tab. For production, add real authentication, server-side inventory/price validation, payment-provider hosted checkout, order persistence, privacy/consent controls, monitoring and legal policy review before accepting customer data or transactions.
