'use client';

import React from 'react';
import { BookOpen, FileText, Download, Lock, Shield, ExternalLink, HelpCircle, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ResourcesPage() {
  const publicGuides = [
    { title: 'Cybersecurity Beginner Learning Roadmap', type: 'Guide Brief', desc: 'A step-by-step layout of networking, command line controls, and basic security models to study.', action: 'Read Online' },
    { title: 'Introduction to Port Scanning & Network Mapping', type: 'Cheat Sheet', desc: 'Understanding basic Nmap syntax: host discovery, port checking, and logging parameters.', action: 'Download PDF' },
    { title: 'OWASP Top 10 Vulnerabilities Summary', type: 'Reference Sheet', desc: 'Brief guidelines of the top 10 web application vulnerabilities and code-level remediation steps.', action: 'Read Online' },
  ];

  const glossaryItems = [
    { term: 'CIA Triad', definition: 'The core security model representing Confidentiality (protecting data), Integrity (preventing tampering), and Availability (system access).' },
    { term: 'Threat Actor', definition: 'An individual or group that executes actions targeting data breaches or system compromise (e.g. script kiddies, state actors).' },
    { term: 'Port Mapping', definition: 'The process of scanning a network device to identify which communication ports (e.g. SSH 22, HTTP 80) are open and accepting traffic.' },
    { term: 'SIEM', definition: 'Security Information and Event Management. Systems that collect, correlate, and log security events from across an enterprise network.' },
  ];

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">LEARNING RESOURCES</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Security Guides & Roadmaps
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            Access our public documentation and security glossaries to accelerate your foundational cybersecurity studies.
          </p>
        </Container>
      </section>

      {/* CORE GUIDES */}
      <section className="py-20 bg-white">
        <Container>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Public resources list */}
            <div className="lg:col-span-8 space-y-8">
              <h3 className="font-manrope font-extrabold text-xl text-brand-dark pb-3 border-b border-slate-100 flex items-center gap-2">
                <BookOpen className="w-5.5 h-5.5 text-brand-blue" />
                Public Cybersecurity Guides
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {publicGuides.map((guide, idx) => (
                  <Card key={idx} variant="light" className="p-6 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2 py-0.5 rounded">
                          {guide.type}
                        </span>
                      </div>
                      <h4 className="font-manrope font-bold text-sm text-brand-dark mb-2">{guide.title}</h4>
                      <p className="text-xs text-text-light-secondary leading-relaxed mb-4">{guide.desc}</p>
                    </div>
                    <button className="text-xs font-semibold text-brand-blue flex items-center gap-1 hover:text-blue-700 transition-colors mt-2 cursor-pointer">
                      {guide.action} <ExternalLink className="w-3 h-3" />
                    </button>
                  </Card>
                ))}
              </div>

              {/* Glossary */}
              <div className="pt-8 space-y-6">
                <h3 className="font-manrope font-extrabold text-xl text-brand-dark pb-3 border-b border-slate-100 flex items-center gap-2">
                  <Shield className="w-5.5 h-5.5 text-brand-blue" />
                  Key Security Terms Glossary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {glossaryItems.map((item, idx) => (
                    <div key={idx} className="p-5 bg-[#F7F9FC] border border-slate-200 rounded-xl">
                      <span className="font-manrope font-bold text-sm text-brand-dark block mb-1.5">{item.term}</span>
                      <p className="text-xs text-text-light-secondary leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Protected Content Notification */}
            <div className="lg:col-span-4">
              <div className="p-6 bg-brand-navy border border-slate-800 rounded-2xl shadow-lg text-white flex flex-col gap-5 bg-grid-pattern relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-brand-cyan/15 rounded-full blur-[10px]" />
                
                <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                  <Lock className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className="font-manrope font-bold text-base text-white mb-2">Student Enrolled Resources</h4>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">
                    Internship lecture notes, deep command guides, network architecture slides, threat capture logs, and risk matrix worksheets are protected and only available inside the Student Dashboard.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 space-y-3.5">
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-secondary">
                    <Check className="w-4 h-4 text-brand-cyan" />
                    <span>60-Day Network Scanning PDFs</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-secondary">
                    <Check className="w-4 h-4 text-brand-cyan" />
                    <span>90-Day GRC Risk Register sheets</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-secondary">
                    <Check className="w-4 h-4 text-brand-cyan" />
                    <span>Wazuh alerts deployment scripts</span>
                  </div>
                </div>

                <Button href="/login" variant="primary" size="sm" className="w-full" glow>
                  Login to Student Portal
                </Button>
              </div>
            </div>

          </div>
          
        </Container>
      </section>

      <Footer />
    </>
  );
}
