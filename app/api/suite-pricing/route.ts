import { NextRequest } from 'next/server';
import type { SuitePricing } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapSuitePricingFromDb, mapSuitePricingToDb, type DbSuitePricing } from '@/src/lib/db/mappers';

export async function GET(request: NextRequest) {
  const { supabase } = await getAdminContext();

  const url = new URL(request.url);
  const shipId = url.searchParams.get('shipId');
  const shipName = url.searchParams.get('shipName');

  let query = supabase.from('suite_pricing').select('*');

  if (shipId) {
    query = query.eq('ship_id', shipId);
  }

  if (shipName) {
    query = query.eq('ship_name', shipName);
  }

  const { data, error } = await query.order('suite_name', { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as DbSuitePricing[];
  return Response.json(rows.map(mapSuitePricingFromDb));
}

export async function POST(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: Partial<SuitePricing> = {};
  try {
    payload = (await request.json()) as Partial<SuitePricing>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!payload.shipId || !payload.shipName) {
    return Response.json({ error: 'Ship details are required.' }, { status: 400 });
  }

  if (!payload.suiteName) {
    return Response.json({ error: 'Suite name is required.' }, { status: 400 });
  }

  if (!payload.pricePerNight || payload.pricePerNight < 1) {
    return Response.json({ error: 'Suite price is required.' }, { status: 400 });
  }

  if (!payload.capacity || payload.capacity < 1) {
    return Response.json({ error: 'Suite capacity is required.' }, { status: 400 });
  }

  const now = new Date().toISOString().split('T')[0];
  const normalized: Partial<SuitePricing> = {
    ...payload,
    createdAt: payload.createdAt ?? now,
    updatedAt: payload.updatedAt ?? now,
  };

  const insertPayload = mapSuitePricingToDb(normalized);

  const { data, error } = await supabase
    .from('suite_pricing')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: error?.message ?? 'Failed to create suite pricing.' }, { status: 500 });
  }

  return Response.json(mapSuitePricingFromDb(data as DbSuitePricing));
}
