'use client';

import React from 'react';
import { Check, X, Shield, Star, BookOpen, UserCheck, Terminal, Award } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function WhyChooseUsPage() {
  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">WHY CYBRIXON</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            A Concept-First Learning Structure
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            We focus on constructing technical competency from the ground up, avoiding shortcut tutorials and memorization templates.
          </p>
        </Container>
      </section>

      {/* CORE VALUE PILLARS */}
      <section className="py-20 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">METHODOLOGY</span>
            <h2 className="text-3xl font-manrope font-extrabold text-brand-dark">
              How We Help You Grow
            </h2>
            <p className="text-sm text-text-light-secondary leading-relaxed">
              We structure our curriculum around practical tasks, ethical codes, and career-readiness checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Concept-First Approach</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Understand the OSI layers, TCP three-way handshake flags, and Windows security token flows before running vulnerability scanner software.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Hands-On exposure</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Analyze traffic captures in Wireshark and construct Nmap scan profiles targeting authorized lab servers to witness packet exchanges.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Expert Guidance</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Ask doubts on our scheduled live support sessions and review feedback on completed worksheets and scan deliverables.
              </p>
            </Card>

            {/* Pillar 4 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Career Direction</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Map your goals to SOC, VAPT, or GRC operations, and get assistance with technical resume drafting and structural interview mockups.
              </p>
            </Card>

            {/* Pillar 5 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Independent Mindset</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Develop security researcher habits: how to parse log files, verify bug reports, read documentation, and resolve scan errors.
              </p>
            </Card>

            {/* Pillar 6 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-brand-dark">Ethical Practices</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Commit to legal authorization and scanning scopes, preparing for structured defensive operations in corporate environments.
              </p>
            </Card>

          </div>
        </Container>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-20 bg-[#F7F9FC] border-t border-b border-slate-200">
        <Container className="max-w-4xl">
          <div className="text-center mb-12 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">COMPARATIVE ANALYSIS</span>
            <h2 className="text-2xl md:text-3xl font-manrope font-extrabold text-brand-dark">
              Random Learning vs. Structured CYBRIXON Learning
            </h2>
            <p className="text-sm text-text-light-secondary max-w-lg leading-relaxed">
              Analyzing how our structured model compares to unguided self-study formats.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-[#07111F] text-white border-b border-slate-800 font-manrope font-semibold">
                  <th className="p-4 md:p-5 w-1/2">Random Tutorial Study</th>
                  <th className="p-4 md:p-5 w-1/2 border-l border-slate-800 text-brand-cyan">CYBRIXON Structured Internship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-text-light-primary">
                
                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Disjointed Tutorials</span>
                      <span className="text-xs text-text-light-secondary">Watching random videos without a unified roadmap or completion milestones.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-blue block">Structured Roadmap</span>
                        <span className="text-xs text-text-light-secondary">Week-by-week curriculum tracking with explicit core focus and outcomes.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Tool Memorization</span>
                      <span className="text-xs text-text-light-secondary">Running command lines from scripts without understanding packets or protocols.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-blue block">Concept Understanding</span>
                        <span className="text-xs text-text-light-secondary">Mastering OSI models, TCP handshakes, and event logs before using scan tools.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Passive Watching</span>
                      <span className="text-xs text-text-light-secondary">Passively observing stream screencasts without performing lab testing yourself.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-blue block">Practical Tasks</span>
                        <span className="text-xs text-text-light-secondary">Submitting worksheets and port audits for actual scoring and guidance.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">No Clear Direction</span>
                      <span className="text-xs text-text-light-secondary">Unsure how your learning fits into professional specialties or role requirements.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-blue block">Career-Path Clarity</span>
                        <span className="text-xs text-text-light-secondary">Curriculum flows into dedicated SOC Analyst, VAPT, or GRC specialty tracks.</span>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-brand-dark text-white text-center border-t border-slate-800 bg-grid-pattern relative">
        <Container className="max-w-2xl relative z-10 flex flex-col items-center gap-6">
          <h2 className="text-3xl font-manrope font-extrabold text-white">
            Choose Structured Learning
          </h2>
          <p className="text-sm text-text-dark-secondary leading-relaxed">
            Begin with the 30-day fundamentals or choose our 90-day advanced specialization track to accelerate your cybersecurity journey.
          </p>
          <div className="flex gap-4">
            <Button href="/internships" variant="primary" glow>
              Explore Programs
            </Button>
            <Button href="/apply" variant="secondary">
              Apply Now
            </Button>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
