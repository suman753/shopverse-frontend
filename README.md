#ShopVerse – E-Commerce Frontend App
##1.Project Overview

ShopVerse is a responsive e-commerce frontend application built using React and Vite. It allows users to browse products, view details, and interact with a modern UI powered by API data. This project demonstrates core frontend development skills such as component-based architecture, routing, and state management.

##2.Tech Stack
-React.js (v18)
-Vite
-Tailwind CSS
-React Router (v6)
-Axios
-Fake Store API

##3.Setup Instructions
1. Clone the repository

 git clone https://github.com/suman753/shopverse-frontend.git

 cd shopverse-frontend

2. Install dependencies

 npm install

3. Run development server

 npm run dev

4. Build for production

 npm run build

##4. Features Implemented

###5.1 Authentication

-Login page with username + password form (any credentials accepted)
-Password visibility toggle (eye icon)
-localStorage persistence — session survives page refresh
-ProtectedRoute guard — unauthenticated users are redirected to /login
-Already-logged-in users on /login are auto-redirected to /

###5.2 Product Listing (Home Page)

-Fetches all products + categories in parallel on mount via Promise.all
-Search bar with 300ms debounce (custom useDebounce hook) — searches title + description
-Category filter — horizontal pill buttons to filter by category
-Pagination — 8 products per page, resets to page 1 on filter change
-Memoized filtering via useMemo for performant re-renders
-Skeleton loading state — shimmer placeholders for cards + filter pills
-Error state with a retry button
-Empty state with a "Clear Filters" action

###5.3 Product Details

-Fetches single product by URL param (/product/:id)
-Displays image, category badge, title, star rating, price, and full description
-"Add to Cart" button with feedback animation (1.5s)
-Conditional "View Cart" link if item is already in cart
-Skeleton & error states

###5.4 Shopping Cart

-Full cart item listing with product image, title, category, unit price
-Quantity controls (+ / −) — decrementing below 1 removes the item
-Per-item subtotal calculation
-Remove button (trash icon) per item
-Clear Cart button to empty everything
-Order Summary section with subtotal, free shipping, and total
-Empty cart state with link back to products
-localStorage persistence — cart data survives refresh

###5.5 Navigation & Layout

-Sticky Navbar with glassmorphism (backdrop-blur-lg)
-Cart icon with live badge count (caps at 99+)
-User avatar (first letter) + username display + logout button
-Responsive hamburger menu on mobile with slide-down animation

###5.6 UX Polish

-Toast notifications on cart actions (add, increase, remove, clear)
-Custom animations: fade-in, slide-up, slide-down, toast-in/out, shimmer
-Custom color palette: primary (indigo) + surface (slate) scales
-Inter font via Google Fonts
-Responsive grid: 1 → 2 → 3 → 4 columns across breakpoints

##5. Key Decisions & Assumptions
 
###Decisions 

-Decision	Rationale

Client-side filtering instead of per-request API filtering	FakeStore API returns ~20 products total — fetching all once and filtering with useMemo is simpler and faster than multiple network round-trips
Context API over Redux/Zustand	Only two global concerns (auth + cart); Context + useCallback keeps it lightweight without adding a state library dependency
localStorage for persistence	Both auth and cart survive page refresh without a backend session store; simple and sufficient for a demo/portfolio app
Axios over native fetch	Provides automatic JSON parsing, a centralized baseURL, configurable timeout (10s), and cleaner error handling
Debounced search (300ms)	Prevents filtering on every keystroke, improving perceived performance, especially on slower devices
Tailwind CSS with custom design tokens	Utility-first for speed, but extended with a curated primary / surface palette and custom animations for a branded, non-generic look
ProtectedRoute as a wrapper component	Keeps auth gating declarative and co-located with the route definitions in App.jsx, rather than scattered across pages
Toast system embedded in CartContext	Cart actions are the only toast trigger; co-locating avoids a separate global toast provider
 
###Assumptions 

-Assumption	Impact 

No real authentication — any username/password is accepted	This is a frontend demo; the FakeStore API auth endpoint is not used. A real app would validate credentials server-side
No payment / checkout flow	"Proceed to Checkout" is a placeholder button; no Stripe/payment integration
Static product data — no admin CRUD	The app is read-only against FakeStore; no product creation/editing
Single-currency (USD)	formatPrice uses Intl.NumberFormat('en-US', { currency: 'USD' }); no multi-currency support
No user-specific carts	Cart is tied to the browser (localStorage), not to a user account. Logging in as a different username still sees the same cart
FakeStore API availability	The app depends on https://fakestoreapi.com being online; a 10s timeout + error/retry UI handles downtime gracefully.

