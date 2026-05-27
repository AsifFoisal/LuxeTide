'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/src/lib/supabase/server';

async function getOrigin(): Promise<string> {
  const headerStore = await headers();
  return headerStore.get('origin') ?? '';
}

function redirectWithMessage(path: string, key: 'error' | 'message', value: string) {
  const params = new URLSearchParams({ [key]: value });
  redirect(`${path}?${params.toString()}`);
}

export async function login(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    redirectWithMessage('/auth/login', 'error', 'Email and password are required.');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirectWithMessage('/auth/login', 'error', error.message || 'Login failed.');
  }

  redirect('/admin');
}

export async function signup(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!email || !password) {
    redirectWithMessage('/auth/signup', 'error', 'Email and password are required.');
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/login?message=Email%20confirmed.%20Please%20sign%20in.`,
    },
  });

  if (error) {
    redirectWithMessage('/auth/signup', 'error', error.message || 'Sign up failed.');
  }

  redirectWithMessage('/auth/login', 'message', 'Check your inbox to confirm your email, then sign in.');
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();

  if (!email) {
    redirectWithMessage('/auth/reset', 'error', 'Email is required.');
  }

  const supabase = await createSupabaseServerClient();
  const origin = await getOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/reset`,
  });

  if (error) {
    redirectWithMessage('/auth/reset', 'error', error.message || 'Reset request failed.');
  }

  redirectWithMessage('/auth/reset', 'message', 'Check your email for the reset link.');
}
