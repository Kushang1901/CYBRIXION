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
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Internships', href: '/internships' },
    { label: 'Resources', href: '/resources' },
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
          ? 'bg-[#07111F] border-slate-800/50'
          : 'bg-transparent border-transparent'
      }`}
    >
      <Container className="h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative w-9 h-9 flex items-center justify-center bg-brand-cyan/10 border border-brand-cyan/30 rounded-lg group-hover:border-brand-cyan/80 transition-all duration-300">
            <Shield className="w-5 h-5 text-brand-cyan group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-brand-cyan/20 blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-manrope font-extrabold text-xl tracking-tight text-white">
            CYB<span className="text-brand-cyan">RIXON</span>
          </span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-manrope text-sm font-medium transition-colors hover:text-brand-cyan ${
                isActive(link.href)
                  ? 'text-brand-cyan font-semibold'
                  : 'text-text-dark-secondary'
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
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Shield className="w-5 h-5 text-brand-cyan" />
            <span className="font-manrope font-extrabold text-lg text-white">
              CYB<span className="text-brand-cyan">RIXON</span>
            </span>
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
