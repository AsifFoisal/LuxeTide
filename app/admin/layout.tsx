import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { getAdminContext } from '@/src/lib/supabase/admin';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { isStaffOrAdmin, userId } = await getAdminContext();

  if (!isStaffOrAdmin) {
    const message = userId
      ? 'Your account does not have admin access.'
      : 'Please sign in to access the admin panel.';
    const param = userId ? 'error' : 'message';
    redirect(`/auth/login?${param}=${encodeURIComponent(message)}`);
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
