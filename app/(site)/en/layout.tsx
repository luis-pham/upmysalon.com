import type { Metadata } from 'next';

export const metadata: Metadata = {
  other: {
    'content-language': 'en',
  },
};

/** English legal routes — content lang set per page; keep site chrome unchanged. */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return children;
}
