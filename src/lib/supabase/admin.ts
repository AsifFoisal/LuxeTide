import type { SupabaseClient } from '@supabase/supabase-js';
import type { AdminUser } from '@/src/types';
import { createSupabaseServerClient } from './server';
import { mapAdminUserFromDb, type DbAdminUser } from '@/src/lib/db/mappers';

export type AdminContext = {
  supabase: SupabaseClient;
  userId: string | null;
  adminUser: AdminUser | null;
  isStaffOrAdmin: boolean;
  isAdmin: boolean;
};

export async function getAdminContext(): Promise<AdminContext> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  const user = error ? null : data.user;

  if (!user) {
    return {
      supabase,
      userId: null,
      adminUser: null,
      isStaffOrAdmin: false,
      isAdmin: false,
    };
  }

  const adminResult = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .maybeSingle<DbAdminUser>();

  if (adminResult.error || !adminResult.data) {
    return {
      supabase,
      userId: user.id,
      adminUser: null,
      isStaffOrAdmin: false,
      isAdmin: false,
    };
  }

  const adminUser = mapAdminUserFromDb(adminResult.data);
  const isActive = adminUser.status === 'active';
  const isAdmin = isActive && adminUser.role === 'admin';
  const isStaffOrAdmin = isActive && (adminUser.role === 'admin' || adminUser.role === 'staff');

  return {
    supabase,
    userId: user.id,
    adminUser,
    isStaffOrAdmin,
    isAdmin,
  };
}
