<div align="center">
</div>

# Chicago Elite Painting & Trim

This Vite + React site deploys to Vercel with serverless `api/` routes for contact handling and the portfolio photo system.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 utilities in `src/index.css`
- Vercel serverless functions in `api/`
- Resend for contact email
- Brevo for website email list signup
- Vercel Blob for persistent portfolio image storage
- Lightweight single-admin cookie auth for portfolio uploads

## Environment variables

Add these in local `.env.local` and in the Vercel project settings:

```bash
RESEND_API_KEY=re_123
BREVO_API_KEY=xkeysib-your-brevo-api-key
BREVO_EMAIL_LIST_ID=123
EMAIL_SIGNUP_FROM_NAME="Marom Painting"
EMAIL_SIGNUP_ADMIN_NOTIFY_EMAIL=
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_123
PORTFOLIO_ADMIN_EMAIL=owner@example.com
PORTFOLIO_ADMIN_PASSWORD=replace-with-a-strong-password
PORTFOLIO_ADMIN_SESSION_SECRET=replace-with-a-long-random-secret
```

Notes:

- `BREVO_API_KEY` and `BREVO_EMAIL_LIST_ID` are required for `/api/email-signup`. Missing Brevo config returns a real signup error instead of a fake success.
- `EMAIL_SIGNUP_FROM_NAME` and `EMAIL_SIGNUP_ADMIN_NOTIFY_EMAIL` are reserved for future admin notification/campaign workflows. The site does not send campaign emails yet.
- `BLOB_READ_WRITE_TOKEN` comes from your Vercel Blob store.
- `PORTFOLIO_ADMIN_SESSION_SECRET` should be a long random value.
- The portfolio login is intentionally simple: one email/password pair stored only in server-side env vars.

## Run locally

1. Install dependencies:
   `npm install`
2. Start the frontend only:
   `npm run dev`
3. For the full site with `/api/contact`, `/api/email-signup`, `/api/photos`, and admin login/upload flows:
   `vercel dev`

`npm run dev` is fine for layout work. Use `vercel dev` for email signup, portfolio/admin flows, and any route backed by Vercel functions.

## Deploy on Vercel

1. Import the repo into Vercel.
2. Create or connect a Vercel Blob store and copy its `BLOB_READ_WRITE_TOKEN`.
3. Set all environment variables in Project Settings.
4. Deploy.

`/photos`, `/services/*`, `/areas/*`, and `/blog/*` are client-side Vite routes, so `vercel.json` rewrites those paths to `index.html` for direct loads.

## Public SEO routes

The site includes data-driven public SEO pages for Marom Painting:

- `/services`
- `/services/interior-painting`
- `/services/exterior-painting`
- `/services/trim-work`
- `/services/cabinet-painting`
- `/services/touch-ups`
- `/areas`
- `/areas/chicago-painting`
- `/areas/oak-park-painting`
- `/areas/berwyn-painting`
- `/areas/cicero-painting`
- `/areas/evanston-painting`
- `/areas/skokie-painting`
- `/areas/north-shore-painting`
- `/blog`
- `/blog/top-5-ways-to-refresh-your-kitchen`
- `/blog/how-to-choose-interior-paint-colors`
- `/blog/when-should-you-repaint-trim`

Content lives in `src/data/services.ts`, `src/data/areas.ts`, and `src/data/blog.ts`. The page components render those records from `src/pages/` and update document title, meta description, and canonical URL on navigation.

## Brevo email signup

The email signup CTAs post to `/api/email-signup`, which creates or updates a Brevo contact and adds the contact to `BREVO_EMAIL_LIST_ID`. The API route stores signup context as contact attributes when Brevo allows them:

- `FIRSTNAME`
- `SOURCE_PATH`
- `SOURCE_TITLE`
- `SIGNUP_SOURCE=website`
- `OPTED_IN=true`

Setup:

1. In Brevo, create a contact list for website signups, such as `Marom Painting Website Leads`.
2. Copy the numeric list ID from the Brevo list page or Contacts API.
3. Create an API key in Brevo under SMTP & API settings.
4. Add `BREVO_API_KEY` and `BREVO_EMAIL_LIST_ID` to `.env.local` and to the Vercel project environment variables.
5. Restart `vercel dev` after changing local environment variables.

Local test:

```bash
curl -i -X POST http://localhost:3000/api/email-signup \
  -H 'Content-Type: application/json' \
  --data '{"email":"you@example.com","firstName":"Test","sourcePath":"/blog","sourceTitle":"Painting Tips"}'
```

After a successful signup, verify the contact in Brevo by searching the email address, checking that it belongs to the configured list, and reviewing the source/opt-in attributes.

Campaign sending is intentionally not implemented yet. Before sending marketing campaigns, configure Brevo unsubscribe handling, sender identity, and the required physical mailing address/footer in the provider.

## Portfolio photo system

- Public visitors browse the portfolio at `/photos`.
- Images are stored in Vercel Blob under `portfolio/images/`.
- Captions are stored as small JSON sidecars under `portfolio/meta/`.
- Admin auth uses a signed HttpOnly cookie set by `/api/admin/login`.
- The footer contains the only login entry point.
- Upload and management controls render only on `/photos` when the admin session is active.

## Existing form behavior

- Quote form submissions and contact form submissions both post to `/api/contact`.
- Email list signup CTAs post to `/api/email-signup` and save contacts in Brevo.
- Quote/contact emails are sent to `marting2046@gmail.com`.
- The sender can reply directly to the customer because the API route sets `replyTo` to the submitted email address.
