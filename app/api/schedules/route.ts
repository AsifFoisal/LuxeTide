import { NextRequest } from 'next/server';
import type { Schedule } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapScheduleFromDb, mapScheduleToDb, type DbSchedule } from '@/src/lib/db/mappers';

export async function GET(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const available = url.searchParams.get('available') === 'true';

  let query = supabase.from('schedules').select('*');

  if (isStaffOrAdmin) {
    if (status) {
      query = query.eq('status', status);
    }
  } else {
    query = query.eq('status', 'scheduled');
  }

  const { data, error } = await query.order('departure_date', { ascending: true });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  let rows = (data ?? []).map((row) => mapScheduleFromDb(row as DbSchedule));

  if (available) {
    rows = rows.filter((schedule) => schedule.bookedSeats < schedule.totalCapacity);
  }

  return Response.json(rows);
}

export async function POST(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: Partial<Schedule> = {};
  try {
    payload = (await request.json()) as Partial<Schedule>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!payload.shipId || !payload.shipName) {
    return Response.json({ error: 'Ship details are required.' }, { status: 400 });
  }

  if (!payload.departureDate || !payload.returnDate) {
    return Response.json({ error: 'Schedule dates are required.' }, { status: 400 });
  }

  if (!payload.destination) {
    return Response.json({ error: 'Destination is required.' }, { status: 400 });
  }

  if (!payload.totalCapacity || payload.totalCapacity < 1) {
    return Response.json({ error: 'Total capacity is required.' }, { status: 400 });
  }

  const now = new Date().toISOString().split('T')[0];
  const normalized: Partial<Schedule> = {
    ...payload,
    status: payload.status ?? 'scheduled',
    bookedSeats: payload.bookedSeats ?? 0,
    createdAt: payload.createdAt ?? now,
    updatedAt: payload.updatedAt ?? now,
  };

  const insertPayload = mapScheduleToDb(normalized);

  const { data, error } = await supabase
    .from('schedules')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: error?.message ?? 'Failed to create schedule.' }, { status: 500 });
  }

  return Response.json(mapScheduleFromDb(data as DbSchedule));
}
