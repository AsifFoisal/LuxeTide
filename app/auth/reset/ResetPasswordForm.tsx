'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PremiumButton, PremiumInput } from '@/src/components/PremiumUI';
import { createSupabaseBrowserClient } from '@/src/lib/supabase/browser';

type RecoveryTokens = {
  accessToken: string;
  refreshToken: string;
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const [tokens, setTokens] = useState<RecoveryTokens | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (!hash) {
      return;
    }

    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type = params.get('type');

    if (accessToken && refreshToken && type === 'recovery') {
      setTokens({ accessToken, refreshToken });
    }
  }, []);

  if (!tokens) {
    return null;
  }

  const handleUpdatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSaving(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      });

      if (sessionError) {
        throw sessionError;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        throw updateError;
      }

      router.replace('/auth/login?message=Password%20updated.%20Please%20sign%20in.');
    } catch (err) {
      console.error('Password update failed:', err);
      setError('Unable to update password. Please request a new reset link.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdatePassword} className="space-y-4 border border-white/10 bg-slate-900/60 p-6 sm:p-8">
      <div className="space-y-1">
        <p className="text-sm text-slate-300">Set a new password</p>
        <p className="text-xs text-slate-500">This form is shown after you open the reset link.</p>
      </div>

      {error && (
        <div className="border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
          New Password
        </label>
        <PremiumInput
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          className="h-12 w-full"
          placeholder="Enter a new password"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
          Confirm Password
        </label>
        <PremiumInput
          type="password"
          value={confirmPassword}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
          className="h-12 w-full"
          placeholder="Confirm the new password"
        />
      </div>
      <PremiumButton type="submit" className="h-12 w-full" disabled={isSaving}>
        {isSaving ? 'Updating...' : 'Update Password'}
      </PremiumButton>
    </form>
  );
}
