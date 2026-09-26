# savorbysteph

Digital menu and ordering site for Savorbysteph, homemade Nigerian food in Charlotte, NC.
Next.js 15, Tailwind CSS 4, Three.js (React Three Fiber), Motion. Deployed on Netlify.

## Develop

```bash
npm install
npm run dev
```

## Before launch

- `src/config/site.ts`: real phone/WhatsApp number, email, hours, pickup area, delivery towns.
- `src/data/menu.ts`: confirm dishes, sizes and prices.
- `public/images/dishes/`: replace the placeholder Wikimedia photos with your own 800x800 images
  (same file names), then trim `src/data/credits.ts`.
- `src/app/about/page.tsx`: Steph's own story.
- Netlify: set `NEXT_PUBLIC_SITE_URL` to the live domain (used for canonical URLs, sitemap and schema).

## How ordering works

Customers build an order in the cart, choose delivery or pickup, and the site opens WhatsApp
(or SMS) with the full order pre-filled. There is no payment or backend to run.
