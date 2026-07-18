import { getPayload as getPayloadClient } from 'payload';
import config from '@payload-config';

/** Shared Local API helper for server components / scripts. */
export async function getPayload() {
  return getPayloadClient({ config });
}
