import { config as loadEnv } from 'dotenv';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { Users } from './payload/collections/Users';
import { Media } from './payload/collections/Media';
import { Pages } from './payload/collections/Pages';
import { Posts } from './payload/collections/Posts';
import { LegalPages } from './payload/collections/LegalPages';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Next loads .env.local automatically; Payload CLI / some RSC paths need this.
loadEnv({ path: path.resolve(dirname, '.env.local') });
loadEnv({ path: path.resolve(dirname, '.env') });

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  'http://localhost:3000';

const databaseURIRaw =
  process.env.DATABASE_URI?.trim() || process.env.DATABASE_URI_DIRECT?.trim() || '';

if (!databaseURIRaw) {
  throw new Error(
    'Missing DATABASE_URI. Copy .env.example → .env.local and paste your Supabase Postgres connection string (Settings → Database). Do not use localhost unless you run Postgres locally.',
  );
}

/**
 * Normalize Supabase/pg SSL query params.
 * Newer `pg` warns that sslmode=require will change meaning; for Supabase use
 * uselibpqcompat=true&sslmode=require (pool.ssl.rejectUnauthorized=false below).
 */
function normalizeDatabaseURI(uri: string): string {
  try {
    const url = new URL(uri);
    const isRemote = !['localhost', '127.0.0.1'].includes(url.hostname);
    if (!isRemote) return uri;
    if (!url.searchParams.has('uselibpqcompat')) {
      url.searchParams.set('uselibpqcompat', 'true');
    }
    if (!url.searchParams.has('sslmode') || url.searchParams.get('sslmode') === 'prefer') {
      url.searchParams.set('sslmode', 'require');
    }
    return url.toString();
  } catch {
    return uri;
  }
}

const databaseURI = normalizeDatabaseURI(databaseURIRaw);

const r2Bucket = process.env.R2_BUCKET?.trim() || '';
const r2Endpoint = process.env.R2_ENDPOINT?.trim() || '';
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID?.trim() || '';
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim() || '';
const r2PublicUrl = (process.env.R2_PUBLIC_URL?.trim() || '').replace(/\/$/, '');
const r2Enabled = Boolean(r2Bucket && r2Endpoint && r2AccessKeyId && r2SecretAccessKey && r2PublicUrl);

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, LegalPages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'dev-only-change-me-before-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseURI,
      // Supabase uses a cert chain Node rejects by default (SELF_SIGNED_CERT_IN_CHAIN).
      ssl: databaseURI.includes('localhost') ? undefined : { rejectUnauthorized: false },
    },
    // Dev: auto-push schema. Production: `payload migrate` (docs/06-deploy.md).
    push: process.env.PAYLOAD_DATABASE_PUSH === 'true' || process.env.NODE_ENV !== 'production',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: r2Enabled,
      bucket: r2Bucket,
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            return `${r2PublicUrl}/${key}`;
          },
        },
      },
      config: {
        credentials: {
          accessKeyId: r2AccessKeyId,
          secretAccessKey: r2SecretAccessKey,
        },
        region: process.env.S3_REGION?.trim() || 'auto',
        endpoint: r2Endpoint,
        forcePathStyle: true,
      },
    }),
  ],
});

