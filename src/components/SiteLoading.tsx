'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Compass, Ship, Sparkles, Waves } from 'lucide-react';

type SiteLoadingProps = {
  title: string;
  description: string;
  mode?: 'public' | 'quiet';
};

export default function SiteLoading({ title, description, mode = 'public' }: SiteLoadingProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  if (mode === 'quiet') {
    return (
      <div className="min-h-dvh bg-slate-950 flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/3 p-8 text-center shadow-2xl shadow-black/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Compass className="h-7 w-7" />
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.35em] text-gold/80">Loading</p>
          <h1 className="mt-3 text-2xl font-heading text-white">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
          <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-full bg-linear-to-r from-gold/60 via-sky-300 to-gold/60" />
          </div>
        </div>
      </div>
    );
  }

  const floatTransition = shouldAnimate ? { repeat: Infinity, repeatType: 'mirror' as const, duration: 3.2, ease: 'easeInOut' as const } : undefined;
  const waveTransition = shouldAnimate ? { repeat: Infinity, repeatType: 'mirror' as const, duration: 2.4, ease: 'easeInOut' as const } : undefined;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,rgba(217,180,102,0.18),transparent_34%),linear-gradient(180deg,#020408_0%,#07111D_48%,#04070B_100%)] flex items-center justify-center px-6">
      <div className="absolute inset-0 opacity-60">
        <div className="absolute left-[-8%] top-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-4%] top-1/3 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-1/2 h-72 w-3xl -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/20 bg-white/4 shadow-[0_0_80px_rgba(217,180,102,0.15)] backdrop-blur-xl"
        >
          <motion.div
            animate={shouldAnimate ? { y: [0, -7, 0], rotate: [0, 4, 0] } : undefined}
            transition={floatTransition}
            className="text-gold"
          >
            <Ship className="h-10 w-10" />
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-gold/40 blur-sm"
            animate={shouldAnimate ? { scaleX: [0.85, 1, 0.85], opacity: [0.45, 0.8, 0.45] } : undefined}
            transition={waveTransition}
          />
        </motion.div>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gold/70">Loading</p>
      </div>
    </div>
  );
}