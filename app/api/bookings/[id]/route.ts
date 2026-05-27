import { NextRequest } from 'next/server';
import type { Booking } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapBookingFromDb, mapBookingToDb, type DbBooking } from '@/src/lib/db/mappers';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return Response.json({ error: 'Booking not found.' }, { status: 404 });
  }

  return Response.json(mapBookingFromDb(data as DbBooking));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let updates: Partial<Booking> = {};
  try {
    updates = (await request.json()) as Partial<Booking>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;

  if (safeUpdates.travelStart && safeUpdates.travelEnd && !safeUpdates.selectedDateRangeLabel) {
    safeUpdates.selectedDateRangeLabel = `${safeUpdates.travelStart} - ${safeUpdates.travelEnd}`;
  }

  const updatePayload = mapBookingToDb(safeUpdates);

  const { data, error } = await supabase
    .from('bookings')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: 'Booking not found.' }, { status: 404 });
  }

  return Response.json(mapBookingFromDb(data as DbBooking));
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
