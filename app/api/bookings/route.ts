import { NextRequest } from 'next/server';
import type { Booking } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapBookingFromDb, mapBookingToDb, type DbBooking } from '@/src/lib/db/mappers';

const BOOKING_ID_PREFIX = 'BK-';

function buildBookingId(): string {
  return `${BOOKING_ID_PREFIX}${Math.floor(1000 + Math.random() * 9000)}`;
}

function normalizeDateRangeLabel(startDate: string, endDate: string, label?: string | null): string | null {
  if (label && label.trim()) {
    return label;
  }
  if (startDate && endDate) {
    return `${startDate} - ${endDate}`;
  }
  return null;
}

function getSortColumn(sortBy: string | null): 'created_at' | 'travel_start' {
  if (sortBy === 'travelStart') {
    return 'travel_start';
  }
  return 'created_at';
}

export async function GET(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();
  if (!isStaffOrAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.trim() ?? '';
  const status = url.searchParams.get('status');
  const paymentStatus = url.searchParams.get('paymentStatus');
  const sortBy = getSortColumn(url.searchParams.get('sortBy'));
  const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';
  const limit = Number(url.searchParams.get('limit') ?? 0);
  const offset = Number(url.searchParams.get('offset') ?? 0);

  let query = supabase.from('bookings').select('*');

  if (status) {
    query = query.eq('status', status);
  }

  if (paymentStatus) {
    query = query.eq('payment_status', paymentStatus);
  }

  if (search) {
    const like = `%${search}%`;
    query = query.or(
      [
        `id.ilike.${like}`,
        `customer_name.ilike.${like}`,
        `customer_email.ilike.${like}`,
        `package_id.ilike.${like}`,
        `package_label.ilike.${like}`,
        `ship_id.ilike.${like}`,
        `ship_name.ilike.${like}`,
        `suite_title.ilike.${like}`,
      ].join(',')
    );
  }

  query = query.order(sortBy, { ascending: sortOrder === 'asc' });

  if (limit > 0) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as DbBooking[];
  return Response.json(rows.map(mapBookingFromDb));
}

export async function POST(request: NextRequest) {
  const { supabase, isStaffOrAdmin } = await getAdminContext();

  let payload: Partial<Booking> = {};
  try {
    payload = (await request.json()) as Partial<Booking>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const customerName = payload.customerName?.trim() ?? '';
  const travelStart = payload.travelStart ?? '';
  const travelEnd = payload.travelEnd ?? '';
  const passengers = payload.passengers ?? 0;

  if (!customerName) {
    return Response.json({ error: 'Customer name is required.' }, { status: 400 });
  }

  if (!travelStart || !travelEnd) {
    return Response.json({ error: 'Travel dates are required.' }, { status: 400 });
  }

  if (passengers < 1) {
    return Response.json({ error: 'At least one passenger is required.' }, { status: 400 });
  }

  const now = new Date().toISOString().split('T')[0];
  const id = isStaffOrAdmin && payload.id ? payload.id : buildBookingId();
  const status = isStaffOrAdmin ? payload.status ?? 'pending' : 'pending';
  const paymentStatus = isStaffOrAdmin ? payload.paymentStatus ?? 'unpaid' : 'unpaid';

  const normalized: Partial<Booking> = {
    ...payload,
    id,
    customerName,
    travelStart,
    travelEnd,
    passengers,
    shipName: payload.shipName ?? payload.shipId,
    packageLabel: payload.packageLabel ?? payload.packageId,
    destinationName: payload.destinationName ?? payload.destinationId,
    selectedDateRangeLabel: normalizeDateRangeLabel(
      travelStart,
      travelEnd,
      payload.selectedDateRangeLabel
    ) ?? undefined,
    status,
    paymentStatus,
    createdAt: payload.createdAt ?? now,
  };

  const insertPayload = mapBookingToDb(normalized);

  const { data, error } = await supabase
    .from('bookings')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(mapBookingFromDb(data as DbBooking));
}
