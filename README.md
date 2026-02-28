# CLA Academy

A full-featured academy web app **without** Supabase, Stripe, or Resend for now. All features work with **mock data** and **local storage** so you can run it locally and add your GoDaddy domain and real services later.

## What’s included

- **Teacher & student login** — name + email + role (stored in browser)
- **Courses** — create, edit, publish; add sessions with Zoom/Teams/Google Meet links
- **Availability** — teachers set weekly day/time slots
- **Bookings** — demo flow (real booking + emails when you add Supabase + Resend)
- **Dashboards** — separate for students (my bookings, my courses) and teachers (sessions, availability, courses)
- **Placeholders** — “Stripe coming soon”, “Resend when connected”, etc.

## Run locally

```bash
cd cla-academy
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in with any name/email and choose **Student** or **Teacher**.

## Adding your GoDaddy domain

1. Build and deploy the app (e.g. to **Vercel**):
   - Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
   - After deploy you’ll get a URL like `cla-academy.vercel.app`.

2. In **GoDaddy** (or your DNS provider):
   - Add a **CNAME** record pointing your domain (e.g. `academy.yourdomain.com`) to `cname.vercel-dns.com`, or use Vercel’s A record instructions.
   - In Vercel: Project → Settings → Domains → add your domain and follow the steps.

3. Use that domain as your app URL when you add environment variables later (Supabase redirect URLs, Stripe success/cancel URLs, etc.).

## Adding Supabase later

- **Auth**: Replace the mock login in `src/app/providers.tsx` and `src/app/login/page.tsx` with Supabase Auth (e.g. `signInWithOAuth` for Google/Apple).
- **Data**: Replace `src/lib/mock-store.ts` with Supabase client calls to your tables (profiles, courses, sessions, availability_slots, bookings). You can use the schema from the other academy project as reference.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

## Adding Stripe later

- Add Stripe SDK and create Checkout sessions for:
  - **Sessions**: when a student books a slot (create booking → redirect to Stripe → on success confirm booking).
  - **Courses**: when a student enrolls (create enrollment after payment).
- Add a webhook route for `checkout.session.completed` to confirm bookings/enrollments and trigger receipt emails.
- Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`.

## Adding Resend later

- Send **booking confirmation** when a booking is created (to student and teacher, with meeting link).
- Send **reminder** 15 minutes before the session (with Zoom/Teams link).
- Send **receipt** after payment (to student and teacher).
- Use a cron (e.g. Vercel Cron) to call an API route that finds upcoming sessions and sends reminders.
- Set `RESEND_API_KEY` and `EMAIL_FROM`.

## Project structure

- `src/app` — pages and layout
- `src/app/providers.tsx` — auth context (mock login/signOut)
- `src/lib/mock-store.ts` — all data in localStorage (replace with Supabase when ready)
- `src/types/mock.ts` — TypeScript types for courses, sessions, bookings, etc.

Once your domain is live and you’re ready, you can add Supabase, Stripe, and Resend step by step without changing the overall structure of the app.
