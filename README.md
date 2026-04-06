<div align="center">
</div>

# Chicago Elite Painting & Trim

This Vite + React site deploys to Vercel with serverless `api/` routes for contact handling and the portfolio photo system.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 utilities in `src/index.css`
- Vercel serverless functions in `api/`
- Resend for contact email
- Vercel Blob for persistent portfolio image storage
- Lightweight single-admin cookie auth for portfolio uploads

## Environment variables

Add these in local `.env.local` and in the Vercel project settings:

```bash
RESEND_API_KEY=re_123
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_123
PORTFOLIO_ADMIN_EMAIL=owner@example.com
PORTFOLIO_ADMIN_PASSWORD=replace-with-a-strong-password
PORTFOLIO_ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

Notes:

- `BLOB_READ_WRITE_TOKEN` comes from your Vercel Blob store.
- `PORTFOLIO_ADMIN_SESSION_SECRET` should be a long random value.
- The portfolio login is intentionally simple: one email/password pair stored only in server-side env vars.

## Run locally

1. Install dependencies:
   `npm install`
2. Start the frontend only:
   `npm run dev`
3. For the full site with `/api/contact`, `/api/photos`, and admin login/upload flows:
   `vercel dev`

`npm run dev` is fine for layout work. Use `vercel dev` for the portfolio/admin flow because the upload, auth, and photo APIs all run from Vercel functions.

## Deploy on Vercel

1. Import the repo into Vercel.
2. Create or connect a Vercel Blob store and copy its `BLOB_READ_WRITE_TOKEN`.
3. Set all environment variables in Project Settings.
4. Deploy.

`/photos` is a client-side Vite route, so `vercel.json` rewrites that path to `index.html` for direct loads.

## Portfolio photo system

- Public visitors browse the portfolio at `/photos`.
- Images are stored in Vercel Blob under `portfolio/images/`.
- Captions are stored as small JSON sidecars under `portfolio/meta/`.
- Admin auth uses a signed HttpOnly cookie set by `/api/admin/login`.
- The footer contains the only login entry point.
- Upload and management controls render only on `/photos` when the admin session is active.

## Existing form behavior

- Quote form submissions and contact form submissions both post to `/api/contact`.
- Footer newsletter signup also posts to `/api/contact`.
- Emails are sent to `marting2046@gmail.com`.
- The sender can reply directly to the customer because the API route sets `replyTo` to the submitted email address.
