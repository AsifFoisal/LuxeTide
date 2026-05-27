import { NextRequest } from 'next/server';
import type { AdminUser } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapAdminUserFromDb, mapAdminUserToDb, type DbAdminUser } from '@/src/lib/db/mappers';

export async function GET() {
  const { supabase, isAdmin } = await getAdminContext();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase.from('admin_users').select('*').order('created_at', { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as DbAdminUser[];
  return Response.json(rows.map(mapAdminUserFromDb));
}

export async function POST(request: NextRequest) {
  const { supabase, isAdmin } = await getAdminContext();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: Partial<AdminUser> = {};
  try {
    payload = (await request.json()) as Partial<AdminUser>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  if (!payload.id || !payload.email || !payload.name) {
    return Response.json({ error: 'User id, name, and email are required.' }, { status: 400 });
  }

  const insertPayload = mapAdminUserToDb(payload);

  const { data, error } = await supabase
    .from('admin_users')
    .insert(insertPayload)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: error?.message ?? 'Failed to create admin user.' }, { status: 500 });
  }

  return Response.json(mapAdminUserFromDb(data as DbAdminUser));
}
