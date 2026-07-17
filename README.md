# UpMySalon Landing

Next.js App Router (TypeScript) marketing site for UpMySalon.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## Environment

Copy `.env.example` → `.env.local` and fill values:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX   # Google Tag Manager
NEXT_PUBLIC_SERVER_URL=https://upmysalon.com
```

GTM chỉ load khi `NEXT_PUBLIC_GTM_ID` có giá trị (mọi trang qua root layout).

## Structure

- `app/(site)/` — routes (home, `[slug]`, blog)
- `app/(site)/_blocks/` — page section blocks (mostly server components)
- `components/` — Header/Footer/CTA/Home (Header + FAQ + sticky CTA are client)
- `content/pages.ts` — seed content (non-home)
- `lib/content.ts` — content access layer (swap to Payload later)
- `lib/constants.ts` — nav/contact constants
- `docs/` — CMS/setup specs (`01`–`05`)

## Next steps

Wire Payload + Supabase per `docs/01-setup.md` → `02` → `03`. Only `lib/content.ts` needs to change for CMS.
