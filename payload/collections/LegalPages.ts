/**
 * Payload collection: legalPages
 * Mount in payload.config.ts when Payload + Supabase are wired:
 *   import { LegalPages } from './collections/LegalPages'
 *   collections: [..., LegalPages]
 *
 * Field shape matches lib/legal.ts + content/legalPages.seed.json.
 * Typed loosely so the app builds before `payload` is installed.
 */

export const LEGAL_SLUGS = ['privacy', 'terms', 'sms-consent', 'refund'] as const;

export const LegalPages = {
  slug: 'legalPages',
  labels: {
    singular: 'Legal Page',
    plural: 'Legal Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'lastUpdated', 'updatedAt'],
    group: 'Content',
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: LEGAL_SLUGS.map((value) => ({ label: value, value })),
      admin: { description: 'URL slug: /{slug} (VI) and /en/{slug} (EN)' },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title (VI)',
    },
    {
      name: 'titleEn',
      type: 'text',
      required: true,
      label: 'Title (EN)',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Leave empty to show [NGÀY] / [DATE] placeholders until filled.',
      },
    },
    {
      name: 'bodyVi',
      type: 'richText',
      required: true,
      label: 'Body (Vietnamese)',
    },
    {
      name: 'bodyEn',
      type: 'richText',
      required: true,
      label: 'Body (English)',
    },
    {
      name: 'seoVi',
      type: 'group',
      label: 'SEO (VI)',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'seoEn',
      type: 'group',
      label: 'SEO (EN)',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
};
