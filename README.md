# Domek

Apartment booking marketplace in Polish. Guests browse and book places to stay, hosts publish and manage their listings, an admin moderates the catalogue.

**Live demo:** https://domek-six.vercel.app

Use the quick demo buttons on the login page to sign in as a guest or a host. No registration needed.

## Features

- Listing catalogue and listing detail pages
- Sign in with email and password or with Google
- One-click demo accounts (guest, host)
- Private routes for signed-in users
- Any user can become a host
- Host panel: create, edit and hide listings, with server-side validation
- Admin panel: all listings across hosts, hide or restore any of them
- Ownership checked on the server in every action, not only in the UI
- Nothing is hard-deleted: listings are hidden, bookings get a status
- Booking flow (in progress)

## Stack

- Next.js 16 (App Router, Server Components, Server Actions)
- TypeScript
- Tailwind CSS v4, shadcn/ui
- Prisma 7 + PostgreSQL (Neon)
- Better Auth
- Zod
- Vercel

## Project structure

```
src/
  app/
    (home)/      home page
    (public)/    search, listing page
    (auth)/      login, register
    (private)/   pages for signed-in users: host, admin, account
  components/
    layout/      header, footer, nav, logo, site shell
    ui/          shadcn components
  features/      code grouped by feature: auth, host, admin, listings
  lib/           auth, session, Prisma client, data access, validation
prisma/          schema, seed
```

## Running locally

```bash
git clone https://github.com/oleksandr-vyshnevskyi/domek.git
cd domek
npm install
```

Create `.env` with:

```
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
DEMO_PASSWORD=
DEMO_GUEST_EMAIL=
DEMO_HOST_EMAIL=
DEMO_ADMIN_EMAIL=
```

Then:

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open http://localhost:3000.

## Author

Oleksandr Vyshnevskyi · [vyshnevsky.com](https://vyshnevsky.com) · [LinkedIn](https://www.linkedin.com/in/oleksandr-vyshnevskyi-dev)
