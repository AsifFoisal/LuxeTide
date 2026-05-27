import Link from 'next/link';
import { PremiumButton, PremiumInput } from '@/src/components/PremiumUI';
import { signup } from '../actions';

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { message?: string; error?: string };
}) {
  const message = searchParams?.message;
  const error = searchParams?.error;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-2 text-center">
          <p className="editorial-label text-gold">Admin Access</p>
          <h1 className="text-4xl font-heading text-white">Create an account</h1>
          <p className="text-sm text-slate-400">Invite-only accounts will need admin approval.</p>
        </div>

        {message && (
          <div className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 px-4 py-3 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="border border-rose-500/30 bg-rose-500/10 text-rose-200 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form action={signup} className="space-y-4 border border-white/10 bg-slate-900/60 p-6 sm:p-8">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
              Email
            </label>
            <PremiumInput name="email" type="email" required className="h-12 w-full" placeholder="admin@luxetide.com" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
              Password
            </label>
            <PremiumInput name="password" type="password" required className="h-12 w-full" placeholder="Create a strong password" />
          </div>
          <PremiumButton type="submit" className="h-12 w-full">
            Sign Up
          </PremiumButton>
        </form>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <Link href="/auth/login" className="hover:text-gold transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
