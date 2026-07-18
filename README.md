# UpMySalon Landing

Next.js App Router (TypeScript) marketing site for UpMySalon.

## Scripts

```bash
npm install
npm run dev                 # http://localhost:3000 + /admin
npm run build
npm start
npm run payload             # Payload CLI
npm run generate:types
```

## Environment

Copy `.env.example` → `.env.local` and fill:

```bash
DATABASE_URI=               # Supabase Postgres (pooler 6543 or direct 5432 for local)
PAYLOAD_SECRET=             # openssl rand -base64 32
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
NEXT_PUBLIC_GTM_ID=         # optional
# + demo env if using live call demo
```

Then: `npm run dev` → mở **http://localhost:3000/admin** → tạo user admin lần đầu.

Media tạm lưu local (`/media`). R2 gắn sau (`docs/06-deploy.md`). Site marketing vẫn đọc seed `content/` cho đến khi đổi `lib/content.ts` sang Payload Local API.

## Structure

- `app/(site)/` — marketing routes
- `app/(payload)/` — Payload admin `/admin` + REST `/api/*`
- `payload/` + `payload.config.ts` — CMS collections
- `content/` — seed copy (frontend source of truth until CMS wired)
- `lib/content.ts` — content access layer
- `docs/` — setup / content model / deploy

## Next steps

1. Mày: `.env.local` với `DATABASE_URI` + `PAYLOAD_SECRET`
2. Mình (tiếp): blocks + seed pages, đổi `lib/content.ts` → Payload
3. R2 khi sẵn sàng → storage adapter S3
