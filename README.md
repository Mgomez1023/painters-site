<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Chicago Elite Painting & Trim

The site now sends both website forms through a Vercel serverless API route using Resend.

## Environment variables

Add these in your local `.env.local` file and in the Vercel project settings:

```bash
RESEND_API_KEY=re_123
# Optional but recommended once your sending domain is verified in Resend
RESEND_FROM_EMAIL="Chicago Elite Painting <hello@yourdomain.com>"
```

`RESEND_API_KEY` is required. `RESEND_FROM_EMAIL` is optional and falls back to `onboarding@resend.dev`.

## Run locally

1. Install dependencies:
   `npm install`
2. Start the frontend:
   `npm run dev`
3. For end-to-end API testing, run the project through Vercel locally so `/api/contact` is available:
   `vercel dev`

## Deploy on Vercel

1. Import the repo into Vercel.
2. Set `RESEND_API_KEY` in Project Settings > Environment Variables.
3. Optionally set `RESEND_FROM_EMAIL` after verifying your sending domain in Resend.
4. Deploy. The frontend will build with Vite and the mail handler will deploy from `api/contact.ts`.

## Form behavior

- Quote form submissions and contact form submissions both post to `/api/contact`.
- Emails are sent to `marting2046@gmail.com` and `Martin2mvp@yahoo.com`.
- The sender can reply directly to the customer because the API route sets `replyTo` to the submitted email address.
