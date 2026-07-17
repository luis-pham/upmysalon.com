export type DemoServiceItem = {
  name: string;
  price: number;
  duration: string;
  enabled: boolean;
};

export type DemoServiceCategory = {
  id: string;
  label: string;
  items: DemoServiceItem[];
};

/** Flat row for RingBooker demoConfig.services payload. */
export type DemoServiceRow = {
  category: string;
  name: string;
  price: number;
  duration: string;
  enabled: boolean;
};

export const DEFAULT_SHOP_NAME = 'ABC Nails Studio';
export const DEFAULT_CITY_FALLBACK = 'Garden Grove, CA';

/** Nail vertical defaults — mirrors RingBooker `demo-vertical-config.ts` nail-salon. */
export const NAIL_SERVICE_CATEGORIES: DemoServiceCategory[] = [
  {
    id: 'manicure',
    label: 'Manicure',
    items: [
      { name: 'Regular Manicure', price: 18, duration: '30 min', enabled: true },
      { name: 'Gel Manicure', price: 32, duration: '45 min', enabled: true },
      { name: 'Dip Powder', price: 40, duration: '60 min', enabled: true },
      { name: 'Acrylic Full Set', price: 50, duration: '75 min', enabled: true },
    ],
  },
  {
    id: 'pedicure',
    label: 'Pedicure',
    items: [
      { name: 'Regular Pedicure', price: 28, duration: '35 min', enabled: true },
      { name: 'Gel Pedicure', price: 42, duration: '50 min', enabled: true },
      { name: 'Deluxe Pedicure', price: 55, duration: '60 min', enabled: true },
    ],
  },
];

export const DEFAULT_DEMO_CONFIG = {
  address: '',
  primaryHours: 'Mon-Sat 9am-7pm',
  secondaryHours: 'Sun 10am-5pm',
  staffNames: ['Lan', 'Mai', 'Thu'] as string[],
  serviceCategories: NAIL_SERVICE_CATEGORIES,
};

export function cloneServiceCategories(cats: DemoServiceCategory[]): DemoServiceCategory[] {
  return cats.map((c) => ({
    ...c,
    items: c.items.map((item) => ({ ...item })),
  }));
}

export function flattenServiceCategories(cats: DemoServiceCategory[]): DemoServiceRow[] {
  return cats.flatMap((c) =>
    c.items.map((item) => ({
      category: c.label,
      name: item.name,
      price: item.price,
      duration: item.duration,
      enabled: item.enabled,
    })),
  );
}

/** Infer city for RingBooker payload from a full US-style address (no separate city field). */
export function parseCityFromAddress(address: string): string {
  let parts = address.split(',').map((p) => p.trim()).filter(Boolean);
  while (
    parts.length > 1 &&
    /^(?:usa|u\.s\.a\.|us|united states|united states of america)$/i.test(parts[parts.length - 1] ?? '')
  ) {
    parts = parts.slice(0, -1);
  }
  while (parts.length > 1 && /^\d{4,5}(?:-\d{4})?$/.test(parts[parts.length - 1] ?? '')) {
    parts = parts.slice(0, -1);
  }
  if (parts.length >= 3) {
    const cityPart = parts[parts.length - 2] ?? '';
    const statePart = (parts[parts.length - 1] ?? '').replace(/\s*\d{5}.*$/, '').trim();
    return statePart ? `${cityPart}, ${statePart}` : cityPart;
  }
  if (parts.length === 2) {
    const cityPart = parts[0] ?? '';
    const statePart = (parts[1] ?? '').replace(/\s*\d{5}.*$/, '').trim();
    return statePart ? `${cityPart}, ${statePart}` : cityPart;
  }
  return parts[0] ?? '';
}
