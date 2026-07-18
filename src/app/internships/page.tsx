'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle2, ChevronRight, Filter, Terminal, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockPrograms } from '@/data/mockData';

export default function InternshipsPage() {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  const filteredPrograms = mockPrograms.filter((program) => {
    if (activeFilter === 'All') return true;
    return program.level === activeFilter;
  });

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">INTERNSHIP PROGRAMS</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Choose Your Cybersecurity Path
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            Structured programs designed for different learning stages, from introductory networking concepts to advanced incident response specializations.
          </p>
        </Container>
      </section>

      {/* DIRECTORY SECTION */}
      <section className="py-16 bg-[#030712] border-b border-slate-900 text-white">
        <Container>
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-sm text-text-dark-secondary font-medium">
              <Filter className="w-4.5 h-4.5" />
              Filter by Difficulty:
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#0B1524] text-white border-brand-logo-purple/40 shadow-sm shadow-brand-logo-purple/10'
                      : 'bg-[#0B1524]/20 text-text-dark-secondary border-slate-800/80 hover:bg-[#0B1524]/40'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => {
              const isPopular = program.id === 'prog-60-day';
              const isAdvanced = program.id === 'prog-90-day';

              return (
                <Card 
                  key={program.id}
                  variant={isAdvanced ? 'dark' : 'light'} 
                  hoverGlow 
                  className={`flex flex-col border ${
                    isPopular 
                      ? 'border-2 border-brand-blue relative overflow-visible' 
                      : isAdvanced 
                      ? 'border-slate-805 bg-brand-navy bg-grid-pattern' 
                      : 'border-slate-200'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-[10px] font-bold font-manrope px-3 py-0.5 rounded-full uppercase tracking-wider z-10">
                      Most Popular
                    </div>
                  )}

                  <div className="p-8 flex-1 flex flex-col gap-5">
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-bold uppercase tracking-wider ${isAdvanced ? 'text-brand-violet' : 'text-slate-500'}`}>
                        {program.level} Level
                      </span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isAdvanced 
                          ? 'bg-brand-violet/15 text-brand-violet border border-brand-violet/20' 
                          : 'bg-brand-blue/5 text-brand-blue border border-brand-blue/10'
                      }`}>
                        {program.durationDays} Days
                      </span>
                    </div>

                    <h3 className={`font-manrope font-extrabold text-2xl ${isAdvanced ? 'text-white' : 'text-brand-dark'}`}>
                      {program.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed ${isAdvanced ? 'text-text-dark-secondary' : 'text-text-light-secondary'}`}>
                      {program.description}
                    </p>

                    {/* Specializations badge lists for 90-day program */}
                    {isAdvanced && (
                      <div className="space-y-2 mt-2">
                        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block">Specializations:</span>
                        <div className="flex gap-2">
                          <Badge variant="cyan">SOC Analyst</Badge>
                          <Badge variant="cyan">VAPT</Badge>
                          <Badge variant="cyan">GRC</Badge>
                        </div>
                      </div>
                    )}

                    <div className={`pt-5 border-t mt-auto space-y-3 ${isAdvanced ? 'border-slate-800' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        <CheckCircle2 className={`w-4.5 h-4.5 ${isAdvanced ? 'text-brand-cyan' : 'text-success'}`} />
                        <span className={isAdvanced ? 'text-text-dark-primary' : 'text-text-light-primary'}>
                          {program.id === 'prog-30-day' ? '4-Week Path' : program.id === 'prog-60-day' ? '8-Week Path' : '12-Week Path'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        <CheckCircle2 className={`w-4.5 h-4.5 ${isAdvanced ? 'text-brand-cyan' : 'text-success'}`} />
                        <span className={isAdvanced ? 'text-text-dark-primary' : 'text-text-light-primary'}>
                          {program.projectsCount} Practical {program.projectsCount === 1 ? 'Project' : 'Projects'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-xs font-semibold">
                        <CheckCircle2 className={`w-4.5 h-4.5 ${isAdvanced ? 'text-brand-cyan' : 'text-success'}`} />
                        <span className={isAdvanced ? 'text-text-dark-primary' : 'text-text-light-primary'}>
                          {program.id === 'prog-30-day' ? 'Introductory Security Tools' : program.id === 'prog-60-day' ? 'Resume Guidance Included' : 'Full Job Prep & Mocking'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 border-t flex items-center ${isAdvanced ? 'bg-[#101E31] border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <Button 
                      href={`/internships/${program.slug}`}
                      variant={isAdvanced ? 'secondary' : 'primary'} 
                      className="w-full"
                    >
                      View Program Details
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* TOOLS AND CONCEPTS */}
      <section className="py-20 md:py-26 bg-[#050b16] text-white border-t border-slate-900 bg-grid-pattern">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">CONCEPTS & TOOLSETS</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Enterprise Tools and Methodologies Covered
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              We focus on standard security operations toolsets used by corporate security centers.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { name: 'Nmap', desc: 'Port Scanning' },
              { name: 'Wireshark', desc: 'Packet Analysis' },
              { name: 'Burp Suite', desc: 'Web App Pentesting' },
              { name: 'Linux OS', desc: 'CLI Hardening' },
              { name: 'Windows Security', desc: 'System Controls' },
              { name: 'OWASP Top 10', desc: 'Web Flaws mapping' },
              { name: 'SIEM Concepts', desc: 'Event Correlating' },
              { name: 'Wazuh SIEM', desc: 'Host Alerting' },
              { name: 'MITRE ATT&CK', desc: 'Tactics Registry' },
              { name: 'Log Analysis', desc: 'Traffic Auditing' },
              { name: 'Risk Assessment', desc: 'GRC Mitigation' },
              { name: 'ISO 27001', desc: 'Compliance Frame' }
            ].map((tool, idx) => (
              <div 
                key={idx} 
                className="bg-[#0B1524]/50 border border-slate-800/80 p-4 rounded-xl flex flex-col items-center text-center transition-all hover:bg-[#0B1524] hover:border-brand-logo-purple/30 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-logo-purple/10 flex items-center justify-center text-brand-logo-purple mb-3">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="font-manrope font-bold text-sm text-white">{tool.name}</span>
                <span className="text-[10px] text-text-dark-secondary mt-1">{tool.desc}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-text-dark-secondary mt-8 italic">
            *Topics and tools vary by internship program and selected specialization track.
          </p>
        </Container>
      </section>

      {/* CERTIFICATE PREVIEW (Shifted) */}
      <section className="py-20 md:py-28 bg-[#030712] text-white border-t border-slate-900 bg-dot-pattern">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">CREDENTIALS</span>
              <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white leading-tight">
                Earn a Verifiable Cybersecurity Credential
              </h2>
              <p className="text-sm text-text-dark-secondary leading-relaxed">
                Upon meeting program criteria—completing modules, scoring on assignments, and passing review audits—you receive a digital certificate containing a unique registration ID.
              </p>
              <div className="p-4 bg-brand-navy border border-slate-800 rounded-xl text-xs space-y-2">
                <span className="font-semibold text-brand-logo-purple block">Accreditation Advisory Notice</span>
                <p className="text-text-dark-secondary leading-relaxed">
                  CYBRIXON certificates represent technical competency benchmarks and structured internship completion. They do not constitute official university accreditation or government degrees.
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <Button href="/certificate-verification" variant="outline">
                  Verify a Certificate
                </Button>
              </div>
            </div>

            {/* Premium Certificate Preview Layout */}
            <div className="lg:col-span-7 flex justify-center">
              <div className="w-full max-w-[560px] bg-slate-900 border-4 border-slate-800 rounded-xl p-8 relative shadow-2xl overflow-hidden bg-grid-pattern">
                
                {/* Accent red lines */}
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-logo-red" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-logo-purple" />
                    <span className="font-manrope font-bold text-xs tracking-wide text-white">CYBRIXON</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-logo-purple border border-brand-logo-purple/20 px-2 py-0.5 rounded">
                    INTERNSHIP PROGRAM
                  </span>
                </div>

                <div className="text-center flex flex-col items-center gap-4 my-6">
                  <span className="text-[10px] uppercase tracking-widest text-text-dark-secondary font-bold">This is to certify that</span>
                  <h3 className="font-manrope font-extrabold text-2xl text-white tracking-tight border-b border-slate-800 pb-2 w-full max-w-sm">
                    Aarav Sharma
                  </h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed max-w-sm">
                    has successfully completed the requirements for the
                  </p>
                  <h4 className="font-manrope font-bold text-base text-brand-logo-red">
                    60-Day Cybersecurity Internship
                  </h4>
                  <p className="text-[10px] text-text-dark-secondary leading-relaxed">
                    comprising Network Port Audits, Web Security Assessment, and GRC policies.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800/80 flex justify-between items-end">
                  <div className="text-left">
                    <span className="text-[9px] text-text-dark-secondary uppercase block">Issue Date</span>
                    <span className="text-xs font-semibold text-white">July 5, 2026</span>
                  </div>
                  
                  {/* Mock QR / ID block */}
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <div className="w-8 h-8 bg-white p-0.5 rounded flex items-center justify-center">
                      <div className="w-full h-full bg-brand-dark" /> {/* Dummy QR center */}
                    </div>
                    <div>
                      <span className="text-[8px] text-text-dark-secondary uppercase block">Certificate ID</span>
                      <span className="text-[10px] font-mono text-brand-logo-purple">CYB-2026-000145</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
