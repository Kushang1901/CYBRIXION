'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Shield, LogOut, LayoutDashboard } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { dbService } from '@/services/dbService';
import { User as UserType } from '@/types';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Monitor scroll height to apply glass backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor user login state
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentUser(dbService.getCurrentUser());
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleLogout = () => {
    dbService.logout();
    setCurrentUser(null);
    setMobileMenuOpen(false);
    router.push('/');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Internships', href: '/internships' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ];

  // Helper to determine active states
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-[76px] z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-brand-dark/80 backdrop-blur-md border-slate-800/80 shadow-md'
          : pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password'
          ? 'bg-[#030712] border-slate-800/50'
          : 'bg-transparent border-transparent'
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <img 
            src="/logo_withoutbg.png" 
            alt="CYBRIXION" 
            className="h-11 w-auto transition-all duration-300"
          />
          <div className="flex flex-col justify-center leading-none">
            <span className="font-manrope font-extrabold text-[19px] tracking-[0.12em] text-white transition-all duration-300 group-hover:text-brand-cyan">
              CYBRIXION
            </span>
            <span className="font-manrope font-semibold text-[9px] tracking-[0.35em] text-text-dark-secondary uppercase mt-0.5">
              SECURITY
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-manrope text-[13.5px] font-semibold tracking-wide transition-all duration-300 px-4 py-1.5 rounded-full ${
                isActive(link.href)
                  ? 'text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/25 shadow-[0_0_12px_rgba(34,211,238,0.12)]'
                  : 'text-text-dark-secondary border border-transparent hover:text-white hover:bg-white/5 hover:border-white/10'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP CALL TO ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-manrope text-sm font-semibold text-brand-cyan hover:text-white bg-brand-cyan/10 border border-brand-cyan/20 hover:border-brand-cyan/50 px-4 py-2 rounded-lg transition-all duration-300"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-2.5 rounded-lg border border-slate-800 hover:border-error/40 hover:bg-error/10 text-text-dark-secondary hover:text-error transition-all duration-300 cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4.5 h-4.5" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="font-manrope text-sm font-semibold text-text-dark-secondary hover:text-white transition-colors"
              >
                Login
              </Link>
              <Button href="/internships" variant="primary" size="sm" glow>
                Explore Programs
              </Button>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden items-center justify-center p-2 rounded-lg text-text-dark-secondary hover:text-white border border-slate-800 hover:bg-brand-elevated transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-brand-dark border-l border-slate-800 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-[76px] px-6 border-b border-slate-800/80 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img 
              src="/logo_withoutbg.png" 
              alt="CYBRIXION" 
              className="h-9 w-auto"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-manrope font-extrabold text-[16px] tracking-[0.12em] text-white">
                CYBRIXION
              </span>
              <span className="font-manrope font-semibold text-[8px] tracking-[0.35em] text-text-dark-secondary uppercase mt-0.5">
                SECURITY
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-lg text-text-dark-secondary hover:text-white border border-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col justify-between h-[calc(100vh-76px)]">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-manrope text-base font-semibold transition-colors py-1 ${
                  isActive(link.href)
                    ? 'text-brand-cyan'
                    : 'text-text-dark-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 font-manrope font-semibold text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 py-2.5 rounded-lg text-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 font-manrope font-semibold text-error bg-error/10 border border-error/20 py-2.5 rounded-lg text-center cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full font-manrope font-semibold text-text-dark-secondary hover:text-white py-2 text-center"
                >
                  Login
                </Link>
                <Button
                  href="/internships"
                  onClick={() => setMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                  glow
                >
                  Explore Programs
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* OVERLAY FOR MOBILE MENU */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
    </header>
  );
}
