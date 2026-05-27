import { NextRequest } from 'next/server';
import type { AdminUser } from '@/src/types';
import { getAdminContext } from '@/src/lib/supabase/admin';
import { mapAdminUserFromDb, mapAdminUserToDb, type DbAdminUser } from '@/src/lib/db/mappers';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isAdmin } = await getAdminContext();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return Response.json({ error: 'Admin user not found.' }, { status: 404 });
  }

  return Response.json(mapAdminUserFromDb(data as DbAdminUser));
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isAdmin } = await getAdminContext();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let updates: Partial<AdminUser> = {};
  try {
    updates = (await request.json()) as Partial<AdminUser>;
  } catch {
    return Response.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const { id: _id, createdAt: _createdAt, ...safeUpdates } = updates;
  const updatePayload = mapAdminUserToDb(safeUpdates);

  const { data, error } = await supabase
    .from('admin_users')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single();

  if (error || !data) {
    return Response.json({ error: 'Admin user not found.' }, { status: 404 });
  }

  return Response.json(mapAdminUserFromDb(data as DbAdminUser));
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, isAdmin } = await getAdminContext();
  if (!isAdmin) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { error } = await supabase.from('admin_users').delete().eq('id', id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
