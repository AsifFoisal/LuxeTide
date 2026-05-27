import { NextRequest } from 'next/server';
import type { Schedule } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapScheduleFromDb, mapScheduleToDb, type DbSchedule } from '@/src/lib/db/mappers';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('schedules')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return Response.json({ error: 'Schedule not found.' }, { status: 404 });
  }

  return Response.json(mapScheduleFromDb(data as DbSchedule));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let updates: Partial<Schedule> = {};
  try {
    updates = (await request.json()) as Partial<Schedule>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;
  safeUpdates.updatedAt = new Date().toISOString().split('T')[0];

  const updatePayload = mapScheduleToDb(safeUpdates);

  const { data, error } = await supabase
    .from('schedules')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: 'Schedule not found.' }, { status: 404 });
  }

  return Response.json(mapScheduleFromDb(data as DbSchedule));
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase.from('schedules').delete().eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
