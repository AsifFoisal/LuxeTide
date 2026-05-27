import { NextRequest } from 'next/server';
import type { SuiteAvailability } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import {
  mapSuiteAvailabilityFromDb,
  mapSuiteAvailabilityToDb,
  type DbSuiteAvailability,
} from '@/src/lib/db/mappers';

export async function GET(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  const url = new URL(request.url);
  const status = url.searchParams.get('status');

  let query = supabase.from('suite_availability').select('*');

  if (isStaffOrAdmin) {
    if (status) {
      query = query.eq('status', status);
    }
  } else {
    query = query.eq('status', 'active');
  }

  const { data, error } = await query.order('start_date', { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as DbSuiteAvailability[];
  return Response.json(rows.map(mapSuiteAvailabilityFromDb));
}

export async function POST(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: Partial<SuiteAvailability> = {};
  try {
    payload = (await request.json()) as Partial<SuiteAvailability>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!payload.shipId || !payload.shipName) {
    return Response.json({ error: 'Ship details are required.' }, { status: 400 });
  }

  if (!payload.startDate || !payload.endDate) {
    return Response.json({ error: 'Date range is required.' }, { status: 400 });
  }

  const now = new Date().toISOString().split('T')[0];
  const normalized: Partial<SuiteAvailability> = {
    ...payload,
    status: payload.status ?? 'active',
    createdAt: payload.createdAt ?? now,
    updatedAt: payload.updatedAt ?? now,
  };

  const insertPayload = mapSuiteAvailabilityToDb(normalized);

  const { data, error } = await supabase
    .from('suite_availability')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: error?.message ?? 'Failed to create availability.' }, { status: 500 });
  }

  return Response.json(mapSuiteAvailabilityFromDb(data as DbSuiteAvailability));
}
