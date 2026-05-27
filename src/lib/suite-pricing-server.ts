import 'server-only';

import type { SuitePricing } from '@/src/types';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';
import { mapSuitePricingFromDb, type DbSuitePricing } from '@/src/lib/db/mappers';

type SuitePricingQuery = {
  shipId?: string;
  shipName?: string;
};

export async function getPublicSuitePricing(options?: SuitePricingQuery): Promise<SuitePricing[]> {
  const supabase = await createSupabaseServerClient();

  let query = supabase.from('suite_pricing').select('*');

  if (options?.shipId) {
    query = query.eq('ship_id', options.shipId);
  }

  if (options?.shipName) {
    query = query.eq('ship_name', options.shipName);
  }

  const { data, error } = await query.order('suite_name', { ascending: true });

  if (error) {
    console.error('Failed to load suite pricing:', error.message);
    return [];
  }

  return ((data ?? []) as DbSuitePricing[]).map(mapSuitePricingFromDb);
}
