import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import Container from '../ui/Container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark border-t border-slate-800 text-text-dark-secondary py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* BRAND COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <img 
                src="/logo_withoutbg.png" 
                alt="CYBRIXION" 
                className="h-9 w-auto transition-all duration-300"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="font-manrope font-extrabold text-[16px] tracking-[0.12em] text-white transition-all duration-300 group-hover:text-brand-cyan">
                  CYBRIXION
                </span>
                <span className="font-manrope font-semibold text-[8px] tracking-[0.35em] text-text-dark-secondary uppercase mt-0.5">
                  SECURITY
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm">
              A comprehensive cybersecurity learning and structured internship platform designed to take students from theory to practice with real projects, verified credentials, and career readiness.
            </p>
            <div className="p-4 bg-brand-navy border border-slate-800/80 rounded-lg max-w-sm">
              <span className="text-xs font-semibold text-brand-logo-purple uppercase tracking-wider block mb-1">Ethical Commitment</span>
              <p className="text-xs leading-relaxed text-text-dark-secondary">
                All cybersecurity scanning, analysis, and laboratory exercises on this platform are strictly intended for legal, authorized, educational, and defensive purposes. Unauthorized testing is strictly prohibited.
              </p>
            </div>
          </div>

          {/* EXPLORE COLUMN */}
          <div className="flex flex-col gap-4">
            <span className="font-manrope font-semibold text-sm text-white uppercase tracking-wider">Explore</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/" className="hover:text-brand-cyan transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-brand-cyan transition-colors">About CYBRIXON</Link></li>
              <li><Link href="/internships" className="hover:text-brand-cyan transition-colors">Internship Programs</Link></li>
            </ul>
          </div>

          {/* STUDENT PORTAL COLUMN */}
          <div className="flex flex-col gap-4">
            <span className="font-manrope font-semibold text-sm text-white uppercase tracking-wider">Student Hub</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/login" className="hover:text-brand-cyan transition-colors">Student Login</Link></li>
              <li><Link href="/register" className="hover:text-brand-cyan transition-colors">Register Account</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-cyan transition-colors">Student Dashboard</Link></li>
              <li><Link href="/certificate-verification" className="hover:text-brand-cyan transition-colors">Verify Certificate</Link></li>
            </ul>
          </div>

          {/* HELP & RESOURCES COLUMN */}
          <div className="flex flex-col gap-4">
            <span className="font-manrope font-semibold text-sm text-white uppercase tracking-wider">Support</span>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/faq" className="hover:text-brand-cyan transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-brand-cyan transition-colors">Contact Support</Link></li>
              <li><Link href="/apply" className="hover:text-brand-cyan transition-colors">Apply for Internship</Link></li>
            </ul>
          </div>

        </div>

        {/* BOTTOM METRICS */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {currentYear} CYBRIXON. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-brand-cyan transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-brand-cyan transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-brand-cyan transition-colors">Refund Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
