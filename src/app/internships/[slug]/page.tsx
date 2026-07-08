'use client';

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Shield, 
  Clock, 
  Award, 
  Terminal, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ArrowRight,
  BookOpen,
  FileCode,
  Calendar,
  AlertTriangle
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { mockPrograms, mockModules, mockLessons, mockSpecializations } from '@/data/mockData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function InternshipDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  
  const program = mockPrograms.find((p) => p.slug === slug);
  if (!program) {
    notFound();
  }

  // Filter modules for this program
  const programModules = mockModules.filter((m) => m.programId === program.id);
  
  // Accordion open/close state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [programModules[0]?.id || '']: true // First module open by default
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Specific prerequisites and outcomes based on program
  const programInfo = {
    'prog-30-day': {
      prerequisites: 'No prior technical experience required. Basic familiarity with using computers and operating systems is helpful.',
      eligibility: 'Open to B.Tech, BCA, BSc IT, and all aspiring cybersecurity learners looking for a starting directory.',
      learningFormat: 'Self-paced readable lessons, practical guide sheets, and one structured mini project.',
      outcomes: [
        'Understand the core security principles (CIA Triad, threat actor types).',
        'Learn basic networking layers, ports, and TCP/UDP communication.',
        'Navigate the Linux command terminal and modify file permissions.',
        'Run basic authorized scans using Nmap and read reports.'
      ]
    },
    'prog-60-day': {
      prerequisites: 'Basic knowledge of operating systems. Familiarity with standard networking concepts is recommended but not mandatory.',
      eligibility: 'Designed for IT/Computer Science students, web developers, and junior systems administrators.',
      learningFormat: 'Deep modules, practical worksheets, two major reports, and resume-mapping webinars.',
      outcomes: [
        'Master security scanning modes (SYN Stealth, service detection) in Nmap.',
        'Analyze firewall rules, security logs, and traffic exchanges.',
        'Understand common web application vulnerabilities (OWASP Top 10).',
        'Receive guidance on crafting a professional cybersecurity resume.'
      ]
    },
    'prog-90-day': {
      prerequisites: 'Knowledge of networking basics and operating system controls. Passion for deep technical investigation.',
      eligibility: 'Ideal for pre-final/final year college candidates and professionals seeking specialized roles (SOC, VAPT, GRC).',
      learningFormat: 'Comprehensive core module, track specializations selection, major audit report, mock interview.',
      outcomes: [
        'Gain foundational cybersecurity exposure, then choose a specialized focus.',
        'SOC Track: Practice alert management, log triage, and SIEM tool workflows.',
        'VAPT Track: Conduct web application testing using Burp Suite and Nikto.',
        'GRC Track: Draft compliance policies and construct risk assessment registers.'
      ]
    }
  }[program.id] || {
    prerequisites: 'Basic computer science understanding.',
    eligibility: 'All students interested in security.',
    learningFormat: 'Structured readable coursework and projects.',
    outcomes: ['Gain practical cybersecurity understanding.']
  };

  return (
    <>
      <Header />
      
      {/* PROGRAM HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            
            <div className="lg:col-span-8 flex flex-col gap-4 text-left">
              <Badge variant="cyan" className="w-fit">
                {program.level} LEVEL PROGRAM
              </Badge>
              <h1 className="text-3xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
                {program.title}
              </h1>
              <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed max-w-2xl">
                {program.description}
              </p>
              
              {/* Program details banner */}
              <div className="flex flex-wrap gap-6 mt-4">
                <div className="flex items-center gap-2 text-xs text-text-dark-primary font-medium">
                  <Clock className="w-4.5 h-4.5 text-brand-cyan" />
                  <span>Duration: {program.durationDays} Days</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-dark-primary font-medium">
                  <Terminal className="w-4.5 h-4.5 text-brand-cyan" />
                  <span>{program.projectsCount} {program.projectsCount === 1 ? 'Practical Project' : 'Practical Projects'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-dark-primary font-medium">
                  <Award className="w-4.5 h-4.5 text-brand-cyan" />
                  <span>Verifiable Digital Certificate</span>
                </div>
              </div>
            </div>

            {/* Quick Action Side Panel */}
            <div className="lg:col-span-4 w-full">
              <div className="p-6 bg-brand-navy border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-4">
                <span className="text-xs text-text-dark-secondary">Admissions are currently open for this cohort.</span>
                <div className="flex flex-col gap-3">
                  <Button href={`/apply?program=${program.id}`} variant="primary" className="w-full" glow>
                    Apply for Internship
                    <ArrowRight className="w-4.5 h-4.5" />
                  </Button>
                  <Button href="/contact" variant="outline" className="w-full">
                    Enquire Now
                  </Button>
                </div>
                <span className="text-[10px] text-text-dark-secondary text-center">
                  *Aarav Sharma is enrolled in the 60-Day Internship by default for demo.
                </span>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* CORE INFO */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col gap-10">
              
              {/* Overview */}
              <div>
                <h3 className="font-manrope font-extrabold text-xl text-brand-dark mb-4">Program Overview</h3>
                <p className="text-sm text-text-light-secondary leading-relaxed">
                  Our {program.title} focuses on delivering technical clarity. Rather than requiring candidates to simply memorize scanning commands, we walk them through the structural architecture of networks, operating systems, and payloads. This allows students to build critical troubleshooting and diagnostic skills necessary for corporate security analyst positions.
                </p>
              </div>

              {/* Specializations Note for 90-day */}
              {program.id === 'prog-90-day' && (
                <div className="bg-[#F7F9FC] border border-slate-200 p-6 rounded-xl space-y-4">
                  <h4 className="font-manrope font-bold text-base text-brand-dark">Phase 2 Specialization Pathways</h4>
                  <p className="text-xs text-text-light-secondary leading-relaxed">
                    All students complete a common cybersecurity foundation block in the first 4 weeks, and then proceed directly into one of the following tracks for weeks 5-12:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <span className="text-xs font-bold text-brand-blue block mb-1">SOC Analyst Track</span>
                      <p className="text-[10px] text-text-light-secondary leading-normal">Log ingestion, MITRE ATT&CK maps, wazuh alerts, and threat triage.</p>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <span className="text-xs font-bold text-brand-blue block mb-1">VAPT Track</span>
                      <p className="text-[10px] text-text-light-secondary leading-normal">Web scanning, Burp Suite intercept, OWASP checks, and audit logging.</p>
                    </div>
                    <div className="p-4 bg-white border border-slate-200 rounded-lg">
                      <span className="text-xs font-bold text-brand-blue block mb-1">GRC Track</span>
                      <p className="text-[10px] text-text-light-secondary leading-normal">ISO 27001 scopes, risk matrix registers, policy drafting, and GDPR checks.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* What you will learn */}
              <div>
                <h3 className="font-manrope font-extrabold text-xl text-brand-dark mb-4">What You Will Learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {programInfo.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs md:text-sm text-text-light-primary leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum Accordion */}
              <div>
                <h3 className="font-manrope font-extrabold text-xl text-brand-dark mb-2">Program Curriculum</h3>
                <p className="text-xs text-text-light-secondary mb-6">
                  Click on modules to view week breakdowns and lesson rosters.
                </p>
                
                <div className="space-y-4">
                  {programModules.map((module) => {
                    const isExpanded = !!expandedModules[module.id];
                    const moduleLessons = mockLessons.filter((l) => l.moduleId === module.id);
                    
                    return (
                      <div 
                        key={module.id} 
                        className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                      >
                        {/* Header trigger */}
                        <button
                          onClick={() => toggleModule(module.id)}
                          className="w-full px-5 py-4 bg-slate-50 flex items-center justify-between hover:bg-slate-100/80 transition-colors text-left cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-2.5 py-0.5 rounded">
                              Week {module.weekNumber}
                            </span>
                            <h4 className="font-manrope font-bold text-sm md:text-base text-brand-dark">
                              {module.title}
                            </h4>
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                        </button>

                        {/* Content roster */}
                        {isExpanded && (
                          <div className="p-4 bg-white border-t border-slate-150 divide-y divide-slate-100">
                            {moduleLessons.length > 0 ? (
                              moduleLessons.map((lesson) => (
                                <div key={lesson.id} className="py-2.5 flex items-center justify-between text-xs text-text-light-primary">
                                  <div className="flex items-center gap-2">
                                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                                    <span className="font-medium">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-text-light-secondary font-medium">
                                    <Lock className="w-3 h-3 text-slate-400" />
                                    <span>Locked</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="py-2 text-xs text-text-light-secondary italic flex items-center gap-2">
                                <Lock className="w-3.5 h-3.5 text-slate-400" />
                                Lesson outline is protected. Enroll in this program to view lesson content.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Side Info Cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <Card variant="light" className="p-6 border border-slate-200 flex flex-col gap-4">
                <h4 className="font-manrope font-bold text-base text-brand-dark border-b border-slate-100 pb-2">Program Prerequisites</h4>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  {programInfo.prerequisites}
                </p>
              </Card>

              <Card variant="light" className="p-6 border border-slate-200 flex flex-col gap-4">
                <h4 className="font-manrope font-bold text-base text-brand-dark border-b border-slate-100 pb-2">Candidate Eligibility</h4>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  {programInfo.eligibility}
                </p>
              </Card>

              <Card variant="light" className="p-6 border border-slate-200 flex flex-col gap-4">
                <h4 className="font-manrope font-bold text-base text-brand-dark border-b border-slate-100 pb-2">Learning Format</h4>
                <p className="text-xs text-text-light-secondary leading-relaxed font-medium mb-1">
                  {programInfo.learningFormat}
                </p>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3 text-amber-800">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold block mb-0.5">Video Resource Disclaimer</span>
                    Our core curriculum is text-based. Live webinars are scheduled to support your projects, but recorded video playback is not offered.
                  </div>
                </div>
              </Card>

            </div>

          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
