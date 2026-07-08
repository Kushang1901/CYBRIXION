import React from 'react';
import Container from '@/components/ui/Container';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// DEVELOPMENT NOTE: The contents of this document represent general educational placeholders.
// Final policy texts must be reviewed by a qualified legal professional before production deployment.

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <section className="pt-24 pb-16 bg-[#07111F] text-white">
        <Container>
          <h1 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">Privacy Policy</h1>
          <span className="text-xs text-text-dark-secondary block mt-2">Last Updated: July 8, 2026</span>
        </Container>
      </section>
      
      <section className="py-16 bg-white text-xs md:text-sm text-text-light-primary leading-relaxed">
        <Container className="max-w-3xl space-y-6">
          <p>
            Welcome to CYBRIXON. We respect your privacy and are committed to protecting the personal data you share with us. This policy details how we handle user information, cookies, and student dashboard records.
          </p>
          
          <h3 className="font-manrope font-bold text-base text-brand-dark">1. Data We Collect</h3>
          <p>
            When you register an account or apply for internships, we collect details including your name, email, phone number, academic details (college, year of study, degree), and external profile URLs (LinkedIn, GitHub). We also temporarily cache lesson completions, assignment submissions, and progress calculations.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">2. How We Use Data</h3>
          <p>
            We use your details to configure your dashboard, evaluate assignments, generate certificates, and address support queries. We do not sell or lease candidate details to third-party databases.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">3. Cookies & Cache</h3>
          <p>
            We use local storage keys and browser cookies to maintain your login session and progress status. You can block cookies in your browser settings, though it may require you to re-verify details upon page reloads.
          </p>
        </Container>
      </section>
      <Footer />
    </>
  );
}
