'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type FAQCategory = 'General' | 'Internship' | 'Sessions' | 'Certificate' | 'Technical';

interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('General');
  const [expandedFAQ, setExpandedFAQ] = useState<Record<string, boolean>>({});

  const categories: { key: FAQCategory; label: string }[] = [
    { key: 'General', label: 'General Information' },
    { key: 'Internship', label: 'Internships & Learning' },
    { key: 'Sessions', label: 'Live Sessions' },
    { key: 'Certificate', label: 'Certificates' },
    { key: 'Technical', label: 'Technical Requirements' },
  ];

  const faqs: FAQItem[] = [
    // General
    {
      id: 'faq-gen-1',
      category: 'General',
      question: 'What is CYBRIXON?',
      answer: 'CYBRIXON is a specialized cybersecurity learning and structured internship platform designed to take students from theory to practice with hands-on projects, security scanning configurations, and verifiable digital credentials.'
    },
    {
      id: 'faq-gen-2',
      category: 'General',
      question: 'Who can join the platform?',
      answer: 'Our programs are open to college students (B.Tech, BCA, BSc IT), engineering graduates, IT professionals, or anyone looking to transition into cybersecurity domains.'
    },
    {
      id: 'faq-gen-3',
      category: 'General',
      question: 'Are beginners eligible to apply?',
      answer: 'Yes! The 30-Day Cybersecurity Internship is designed specifically for beginners and has no technical prerequisites. We start with fundamental operating systems and networking concepts.'
    },
    
    // Internship & Learning
    {
      id: 'faq-int-1',
      category: 'Internship',
      question: 'How does the internship work?',
      answer: 'Upon enrollment, students gain access to their personal Student Dashboard. They follow a week-by-week checklist of readable lessons, download study PDFs, complete practical worksheets, and author report deliverables for their portfolio projects.'
    },
    {
      id: 'faq-int-2',
      category: 'Internship',
      question: 'What learning resources are provided?',
      answer: 'Learning materials include high-quality, readable website-based articles, downloadable study PDF guides, architectural slides (PPT format), and step-by-step laboratory sheets.'
    },
    {
      id: 'faq-int-3',
      category: 'Internship',
      question: 'Are projects included in the program?',
      answer: 'Yes. Depending on the program, you will complete practical mini or major portfolio projects (e.g. Network Scanning Audits, OWASP Web App Assessments) mapping to real-world cybersecurity roles.'
    },
    {
      id: 'faq-int-4',
      category: 'Internship',
      question: 'What specializations exist on the platform?',
      answer: 'The 90-Day Advanced Internship offers three distinct pathways: Security Operations Center (SOC) Analyst track, Vulnerability Assessment & Penetration Testing (VAPT) track, and Governance, Risk & Compliance (GRC) track.'
    },

    // Sessions
    {
      id: 'faq-ses-1',
      category: 'Sessions',
      question: 'Are sessions live?',
      answer: 'Yes, we schedule regular live doubt-clearing sessions and webinars where senior security analysts review project objectives and address candidate questions.'
    },
    {
      id: 'faq-ses-2',
      category: 'Sessions',
      question: 'Are recorded videos available?',
      answer: 'Current learning delivery may include website-based lessons, PDF resources, presentations, practical guides, assignments, projects, and scheduled live sessions. Recorded video availability is not guaranteed unless explicitly mentioned for a specific program.'
    },

    // Certificate
    {
      id: 'faq-crt-1',
      category: 'Certificate',
      question: 'When is a certificate issued?',
      answer: 'Certificates are issued immediately after a candidate completes all required weekly modules, scores passing marks on worksheets, and passes the final review audit of their portfolio projects.'
    },
    {
      id: 'faq-crt-2',
      category: 'Certificate',
      question: 'Can certificates be verified by third parties?',
      answer: 'Yes. Every certificate features a unique digital security ID. Anyone (employers, university offices) can verify the authenticity of a credential on our public certificate-verification page.'
    },

    // Technical
    {
      id: 'faq-tec-1',
      category: 'Technical',
      question: 'Is prior programming or hacking experience required?',
      answer: 'No programming background is required for our beginner paths. However, a willingness to research command flags and read technical documentation is essential.'
    },
    {
      id: 'faq-tec-2',
      category: 'Technical',
      question: 'What device or system specification is needed?',
      answer: 'A standard laptop or desktop running Windows, macOS, or Linux with at least 4GB of RAM and a reliable internet connection is sufficient to access the dashboard and execute authorized scans.'
    },
    {
      id: 'faq-tec-3',
      category: 'Technical',
      question: 'How do I reset my password?',
      answer: 'You can trigger a password recovery email from the Login page by clicking "Forgot Password" and entering your registered email address.'
    }
  ];

  const filteredFaqs = faqs.filter((f) => f.category === activeCategory);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">HELP CENTER</Badge>
          <h1 className="text-4xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
            Quickly resolve inquiries regarding curriculum structure, certificates, live web meetings, and system prerequisites.
          </p>
        </Container>
      </section>

      {/* Accordion Layout */}
      <section className="py-20 bg-[#030712] text-white">
        <Container>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Desktop Category Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 block">Categories</span>
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setExpandedFAQ({});
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left text-xs md:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    activeCategory === cat.key
                      ? 'bg-[#0B1524] text-brand-cyan border-l-4 border-brand-cyan pl-3'
                      : 'bg-transparent text-text-dark-secondary hover:bg-[#0B1524]/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              ))}
            </div>

            {/* Accordion Content */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="font-manrope font-extrabold text-lg text-white pb-3 border-b border-slate-800 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-brand-cyan" />
                {categories.find((c) => c.key === activeCategory)?.label}
              </h3>
              
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isExpanded = !!expandedFAQ[faq.id];
                  
                  return (
                    <div 
                      key={faq.id}
                      className="border border-slate-800/85 bg-brand-navy/30 rounded-xl overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full px-5 py-4 bg-brand-navy/60 flex items-center justify-between hover:bg-brand-navy transition-colors text-left cursor-pointer"
                      >
                        <span className="font-manrope font-bold text-xs md:text-sm text-white">
                          {faq.question}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-cyan" /> : <ChevronDown className="w-4 h-4 text-brand-cyan" />}
                      </button>
                      
                      {isExpanded && (
                        <div className="p-5 bg-black/20 border-t border-slate-800 text-xs md:text-sm leading-relaxed text-text-dark-secondary">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </Container>
      </section>

      <Footer />
    </>
  );
}
