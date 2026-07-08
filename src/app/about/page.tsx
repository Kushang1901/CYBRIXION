'use client';

import React from 'react';
import { Shield, Target, BookOpen, UserCheck, Scale } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">ABOUT CYBRIXON</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Our Directive & Mission
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            CYBRIXON is a cybersecurity learning and internship platform focused on strong fundamentals, practical understanding, responsible security learning, and clear career direction.
          </p>
        </Container>
      </section>

      {/* CORE STATEMENTS */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="light" className="p-8 border border-slate-200 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Mission</h3>
              <p className="text-xs md:text-sm text-text-light-secondary leading-relaxed">
                To bridge the gap between academic theory and practical security operations. We provide students with structured roadmap curriculums, practical assignments, and portfolio-worthy project tasks.
              </p>
            </Card>

            <Card variant="light" className="p-8 border border-slate-200 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Vision</h3>
              <p className="text-xs md:text-sm text-text-light-secondary leading-relaxed">
                To cultivate a network of cyber defenders who approach security systematically, understanding how packets, OS kernel security, and application flows work before relying on automated tools.
              </p>
            </Card>

            <Card variant="light" className="p-8 border border-slate-200 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Method</h3>
              <p className="text-xs md:text-sm text-text-light-secondary leading-relaxed">
                A concept-first approach. We structure learning week-by-week and require students to run diagnostics and write summaries inside legal sandboxes to earn verifiable completion credentials.
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* OBJECTIVES */}
      <section className="py-20 bg-[#F7F9FC] border-t border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">CORE OBJECTIVES</span>
              <h2 className="text-3xl font-manrope font-extrabold text-brand-dark">
                Key Benchmarks of Our Internships
              </h2>
              <p className="text-sm text-text-light-secondary leading-relaxed">
                We measure our system outcomes by our ability to deliver technical clarity and ethical principles.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Provide Starting Direction', desc: 'Introduce clear introductory and advanced paths to remove learning confusion.' },
                { title: 'Build Strong Fundamentals', desc: 'Master networking protocols (TCP/UDP, port mappings) and OS user groups first.' },
                { title: 'Practical Understanding', desc: 'Write network scan analysis audits and log evaluations matching workplace formats.' },
                { title: 'Promote Ethical Learning', desc: 'Enforce boundary agreements and remind users of authorization laws.' },
                { title: 'Create Career Awareness', desc: 'Deconstruct SOC, Pentesting, and GRC operations so learners understand actual industry options.' }
              ].map((obj, idx) => (
                <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/15 flex items-center justify-center text-brand-blue font-manrope font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="font-manrope font-bold text-sm text-brand-dark">{obj.title}</h4>
                  <p className="text-xs text-text-light-secondary leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* COMMITMENT & ETHICS */}
      <section className="py-20 bg-white">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-6 text-center items-center">
            <Scale className="w-12 h-12 text-brand-blue" />
            <h2 className="text-3xl font-manrope font-extrabold text-brand-dark">
              Ethical Code of Conduct
            </h2>
            <p className="text-sm text-text-light-secondary leading-relaxed">
              Cybersecurity skills represent significant operational power. In our courses and tasks, we emphasize that offensive security techniques are dual-use tools. While they are necessary to understand threats and test controls, using them without authorization is a violation of international regulations.
            </p>
            <div className="w-full bg-[#07111F] border border-slate-800 rounded-xl p-6 text-left text-white mt-4 relative overflow-hidden bg-grid-pattern">
              <h4 className="font-manrope font-bold text-sm text-brand-cyan mb-2">Notice to All Candidates</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                By participating in CYBRIXON programs, you agree to never execute scanning utilities, exploit scripts, or vulnerability checkers against systems that you do not own, or systems where you lack a signed, written Scope of Work (SoW) authorization. Defensive systems are engineered to log and block unauthorized scans, and security organizations will report illegal probing to relevant authorities.
              </p>
            </div>
            
            <div className="flex gap-4 mt-6">
              <Button href="/internships" variant="primary" glow>
                View Available Programs
              </Button>
              <Button href="/contact" variant="outline">
                Contact Admissions
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
