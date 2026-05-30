'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import SiteLoading from './SiteLoading';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const [showLoader, setShowLoader] = useState(!isAdminRoute);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isAdminRoute) {
      setShowLoader(false);
      return;
    }

    setShowLoader(true);

    const hideLoader = window.setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    isFirstRender.current = false;

    return () => {
      window.clearTimeout(hideLoader);
    };
  }, [pathname, isAdminRoute]);

  // For admin routes, render children without Navbar/Footer wrapper
  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            key={pathname ?? 'site-loading'}
            className="fixed inset-0 z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <SiteLoading
              title="Sundarbans passage is loading"
              description="We are preparing the tides, decks, and booking paths for your next Sundarbans journey."
              mode="public"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      <motion.main 
        className="grow pt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
