import React from 'react';
import Container from '@/components/ui/Container';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// DEVELOPMENT NOTE: The contents of this document represent general educational placeholders.
// Final policy texts must be reviewed by a qualified legal professional before production deployment.

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <section className="pt-24 pb-16 bg-[#07111F] text-white">
        <Container>
          <h1 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">Refund Policy</h1>
          <span className="text-xs text-text-dark-secondary block mt-2">Last Updated: July 8, 2026</span>
        </Container>
      </section>
      
      <section className="py-16 bg-white text-xs md:text-sm text-text-light-primary leading-relaxed">
        <Container className="max-w-3xl space-y-6">
          <p>
            This policy outlines the guidelines regarding refund requests and cohort adjustments on the CYBRIXON platform.
          </p>
          
          <h3 className="font-manrope font-bold text-base text-brand-dark">1. Sandbox Admission Tier</h3>
          <p>
            Applying and registering accounts during the sandbox/demo mode is completely free of charge. No payment integrations are live.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">2. Future Paid Cohorts</h3>
          <p>
            When paid cohort placements go live, candidates will be eligible to request refunds within a specified window (typically 3-7 days from cohort start date) provided no assignments have been submitted or certificates generated. Refund eligibility criteria will be verified by the admin panel.
          </p>

          <h3 className="font-manrope font-bold text-base text-brand-dark">3. Account Cancellations</h3>
          <p>
            Candidates who request voluntary cancellation of their enrollment after the cohort deadline are not eligible for partial refunds. Special concessions may be granted under extreme medical circumstances upon request.
          </p>
        </Container>
      </section>
      <Footer />
    </>
  );
}
