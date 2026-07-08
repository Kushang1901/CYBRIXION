import React from 'react';
import Container from '@/components/ui/Container';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// DEVELOPMENT NOTE: The contents of this document represent general educational placeholders.
// Final policy texts must be reviewed by a qualified legal professional before production deployment.

export default function TermsPage() {
  return (
    <>
      <Header />
      <section className="pt-24 pb-16 bg-[#07111F] text-white">
        <Container>
          <h1 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">Terms and Conditions</h1>
          <span className="text-xs text-text-dark-secondary block mt-2">Last Updated: July 8, 2026</span>
        </Container>
      </section>
      
      <section className="py-16 bg-white text-xs md:text-sm text-text-light-primary leading-relaxed">
        <Container className="max-w-3xl space-y-6">
          <p>
            By accessing the CYBRIXON platform, you agree to comply with and be bound by the following terms of service.
          </p>
          
          <h3 className="font-manrope font-bold text-base text-brand-dark">1. Educational Bounds</h3>
          <p>
            CYBRIXON provides practical cybersecurity internships and structured learning modules. We do not issue university degrees, national accreditation marks, or official government certifications.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">2. Ethical & Lawful System Use</h3>
          <p>
            You agree to only use scanning tools (e.g. Nmap) and testing scripts against authorized lab environments or target systems where you possess explicit, written permission from the owner. Port probing or vulnerability testing without consent is illegal and grounds for immediate termination of your platform account.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">3. Accounts & Security</h3>
          <p>
            You are responsible for safeguarding your login credentials. If you suspect unauthorized access, contact admin support immediately. We reserve the right to suspend accounts displaying suspicious automated traffic.
          </p>
        </Container>
      </section>
      <Footer />
    </>
  );
}
