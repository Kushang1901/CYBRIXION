'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Target, 
  BookOpen, 
  UserCheck, 
  Scale, 
  Check, 
  X, 
  Star, 
  Terminal, 
  Award, 
  Cpu, 
  Activity, 
  Info,
  Layers,
  Zap,
  Eye,
  Sliders
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CrystalsBackground from '@/components/ui/CrystalsBackground';

export default function AboutPage() {
  const [activeConsole, setActiveConsole] = useState<'mission' | 'vision' | 'method'>('mission');

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-[#030712] text-white bg-grid-pattern border-b border-slate-900 overflow-hidden">
        <CrystalsBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-logo-purple/10 rounded-full blur-[90px] pointer-events-none" />
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

      {/* UNIQUE SECURITY OPERATIONS CONSOLE SECTION */}
      <section className="py-20 bg-[#050b16] border-b border-slate-900 relative">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">COMMAND CENTER</span>
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              Platform Core Principles
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              Explore our core objectives, security philosophies, and platform delivery standards.
            </p>
          </div>

          {/* Console UI Panel */}
          <div className="max-w-4xl mx-auto border border-slate-800 rounded-2xl bg-black/60 shadow-2xl overflow-hidden backdrop-blur-md">
            
            {/* Terminal Top Bar */}
            <div className="bg-slate-950 border-b border-slate-850 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-logo-red inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-logo-purple inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan inline-block" />
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest ml-3">SYS_OPS_CORE_CONSOLE // SEC_DIRECTIVE</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-brand-logo-purple animate-pulse" />
                  LATENCY: 14ms
                </span>
                <span className="border-l border-slate-800 pl-3">STATUS: ACTIVE</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[380px]">
              
              {/* Left Control Column (Tabs) */}
              <div className="md:col-span-4 border-r border-slate-850 bg-slate-950/40 p-5 flex flex-col gap-3 justify-center">
                
                {/* Tab 1 */}
                <button 
                  onClick={() => setActiveConsole('mission')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left font-mono transition-all duration-300 cursor-pointer ${
                    activeConsole === 'mission'
                      ? 'bg-brand-logo-red/10 border-brand-logo-red/40 text-white shadow-[0_0_15px_rgba(211,34,42,0.1)]'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/30'
                  }`}
                >
                  <Target className={`w-4.5 h-4.5 ${activeConsole === 'mission' ? 'text-brand-logo-red' : 'text-slate-500'}`} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">01. COMMAND</span>
                    <span className="text-xs font-bold">OUR MISSION</span>
                  </div>
                </button>

                {/* Tab 2 */}
                <button 
                  onClick={() => setActiveConsole('vision')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left font-mono transition-all duration-300 cursor-pointer ${
                    activeConsole === 'vision'
                      ? 'bg-brand-logo-purple/10 border-brand-logo-purple/40 text-white shadow-[0_0_15px_rgba(99,39,111,0.15)]'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/30'
                  }`}
                >
                  <Eye className={`w-4.5 h-4.5 ${activeConsole === 'vision' ? 'text-brand-logo-purple' : 'text-slate-500'}`} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">02. INTEL</span>
                    <span className="text-xs font-bold">OUR VISION</span>
                  </div>
                </button>

                {/* Tab 3 */}
                <button 
                  onClick={() => setActiveConsole('method')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left font-mono transition-all duration-300 cursor-pointer ${
                    activeConsole === 'method'
                      ? 'bg-brand-cyan/10 border-brand-cyan/40 text-white shadow-[0_0_15px_rgba(34,211,238,0.1)]'
                      : 'bg-transparent border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-900/30'
                  }`}
                >
                  <Sliders className={`w-4.5 h-4.5 ${activeConsole === 'method' ? 'text-brand-cyan' : 'text-slate-500'}`} />
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">03. PROTOCOL</span>
                    <span className="text-xs font-bold">OUR METHOD</span>
                  </div>
                </button>

              </div>

              {/* Right Content Panel (Interactive Terminal Window) */}
              <div className="md:col-span-8 p-8 flex flex-col justify-between bg-slate-950/20">
                <div>
                  {/* Console Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-850">
                    <span className="text-[10px] font-mono text-brand-logo-purple font-bold tracking-wider uppercase">
                      {activeConsole === 'mission' ? '// INITIATING_MISSION_PROTOCOL' : activeConsole === 'vision' ? '// ANALYZING_VISION_LANDSCAPE' : '// LOADING_OPERATIONAL_STEPS'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-650 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-800">
                      ID_REF: {activeConsole === 'mission' ? 'SEC-01' : activeConsole === 'vision' ? 'SEC-02' : 'SEC-03'}
                    </span>
                  </div>

                  {/* Dynamic Panel Content */}
                  {activeConsole === 'mission' && (
                    <div className="flex flex-col gap-4 animate-fadeIn">
                      <h3 className="font-manrope font-bold text-2xl text-white">Bridging the Academic Gap</h3>
                      <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed">
                        To construct a reliable bridge between academic computer science theory and practical cybersecurity operations. We provide students with structured roadmap curriculums, practical assignments, and portfolio-worthy projects.
                      </p>
                      <div className="bg-brand-logo-red/5 border border-brand-logo-red/10 rounded-lg p-3 text-[11px] text-brand-logo-red flex gap-2 items-start mt-2">
                        <Info className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                        <span>Our mission focuses on delivering actual technical readiness, preparing students to confidently execute entry-level SOC and defensive assessments.</span>
                      </div>
                    </div>
                  )}

                  {activeConsole === 'vision' && (
                    <div className="flex flex-col gap-4 animate-fadeIn">
                      <h3 className="font-manrope font-bold text-2xl text-white">Cultivating Systematic Defenders</h3>
                      <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed">
                        To cultivate a network of cyber defenders who approach security systematically, understanding how packets, OS kernel security, and application flows work before relying on automated tools.
                      </p>
                      <div className="bg-brand-logo-purple/5 border border-brand-logo-purple/10 rounded-lg p-3 text-[11px] text-brand-logo-purple flex gap-2 items-start mt-2">
                        <Info className="w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                        <span>We envision an industry staffed by analytical professionals who understand the packets and code, rather than "script kiddies" who rely solely on third-party scanners.</span>
                      </div>
                    </div>
                  )}

                  {activeConsole === 'method' && (
                    <div className="flex flex-col gap-4 animate-fadeIn">
                      <h3 className="font-manrope font-bold text-2xl text-white">A Concept-First Pedagogy</h3>
                      <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed">
                        A concept-first approach. We structure learning week-by-week and require students to run diagnostics and write summaries inside legal sandboxes to earn verifiable completion credentials.
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-text-dark-secondary mt-2">
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Master OSI Layers First</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Hands-On Lab Work</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Graded Worksheets</li>
                        <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-success" /> Scope Boundary Rules</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Console Footer Text */}
                <div className="mt-8 pt-4 border-t border-slate-850 flex items-center justify-between text-[9px] font-mono text-slate-600">
                  <span>SECURE_DATA_ENCRYPTION_ACTIVE</span>
                  <span>CYBRIXON // SECURE_SHELL_v2.0</span>
                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* MERGED: WHY CYBRIXON - 6 PILLARS OF GROWTH */}
      <section className="py-20 bg-[#030712] border-b border-slate-900">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">METHODOLOGY</span>
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              How We Help You Grow
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              We structure our curriculum around practical tasks, ethical codes, and career-readiness checklists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-red/10 border border-brand-logo-red/20 flex items-center justify-center text-brand-logo-red">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Concept-First Approach</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Understand the OSI layers, TCP three-way handshake flags, and Windows security token flows before running vulnerability scanner software.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Hands-On Exposure</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Analyze traffic captures in Wireshark and construct Nmap scan profiles targeting authorized lab servers to witness packet exchanges.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Expert Guidance</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Ask doubts on our scheduled live support sessions and review feedback on completed worksheets and scan deliverables.
              </p>
            </Card>

            {/* Pillar 4 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-red/10 border border-brand-logo-red/20 flex items-center justify-center text-brand-logo-red">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Career Direction</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Map your goals to SOC, VAPT, or GRC operations, and get assistance with technical resume drafting and structural interview mockups.
              </p>
            </Card>

            {/* Pillar 5 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Independent Mindset</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Develop security researcher habits: how to parse log files, verify bug reports, read documentation, and resolve scan errors.
              </p>
            </Card>

            {/* Pillar 6 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/80 bg-brand-elevated/20">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Ethical Practices</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Commit to legal authorization and scanning scopes, preparing for structured defensive operations in corporate environments.
              </p>
            </Card>

          </div>
        </Container>
      </section>

      {/* MERGED: WHY CYBRIXON - COMPARATIVE ANALYSIS TABLE */}
      <section className="py-20 bg-[#050b16] border-b border-slate-900">
        <Container className="max-w-4xl">
          <div className="text-center mb-12 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">COMPARATIVE ANALYSIS</span>
            <h2 className="text-2xl md:text-3xl font-manrope font-extrabold text-white">
              Random Learning vs. Structured CYBRIXON Learning
            </h2>
            <p className="text-sm text-text-dark-secondary max-w-lg leading-relaxed">
              Analyzing how our structured model compares to unguided self-study formats.
            </p>
          </div>

          {/* Table Container */}
          <div className="overflow-hidden border border-slate-800 rounded-xl bg-black/45 shadow-lg">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-950 text-white border-b border-slate-850 font-manrope font-semibold">
                  <th className="p-4 md:p-5 w-1/2">Random Tutorial Study</th>
                  <th className="p-4 md:p-5 w-1/2 border-l border-slate-850 text-brand-logo-red">CYBRIXON Structured Internship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850 text-text-dark-primary">
                
                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Disjointed Tutorials</span>
                      <span className="text-xs text-text-dark-secondary">Watching random videos without a unified roadmap or completion milestones.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-850">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-logo-purple block">Structured Roadmap</span>
                        <span className="text-xs text-text-dark-secondary">Week-by-week curriculum tracking with explicit core focus and outcomes.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Tool Memorization</span>
                      <span className="text-xs text-text-dark-secondary">Running command lines from scripts without understanding packets or protocols.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-850">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-logo-purple block">Concept Understanding</span>
                        <span className="text-xs text-text-dark-secondary">Mastering OSI models, TCP handshakes, and event logs before using scan tools.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Passive Watching</span>
                      <span className="text-xs text-text-dark-secondary">Passively observing stream screencasts without performing lab testing yourself.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-850">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-logo-purple block">Practical Tasks</span>
                        <span className="text-xs text-text-dark-secondary">Submitting worksheets and port audits for actual scoring and guidance.</span>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">No Clear Direction</span>
                      <span className="text-xs text-text-dark-secondary">Unsure how your learning fits into professional specialties or role requirements.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-850">
                    <div className="flex items-start gap-2.5">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-logo-purple block">Career-Path Clarity</span>
                        <span className="text-xs text-text-dark-secondary">Curriculum flows into dedicated SOC Analyst, VAPT, or GRC specialty tracks.</span>
                      </div>
                    </div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* OBJECTIVES */}
      <section className="py-20 bg-[#030712] border-b border-slate-900">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col gap-4">
              <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">CORE OBJECTIVES</span>
              <h2 className="text-3xl font-manrope font-extrabold text-white">
                Key Benchmarks of Our Internships
              </h2>
              <p className="text-sm text-text-dark-secondary leading-relaxed">
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
                <div key={idx} className="p-5 bg-brand-elevated/40 border border-slate-800 rounded-xl flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-logo-purple/15 flex items-center justify-center text-brand-logo-purple font-manrope font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="font-manrope font-bold text-sm text-white">{obj.title}</h4>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">{obj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* COMMITMENT & ETHICS */}
      <section className="py-20 bg-[#050b16] border-b border-slate-900">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-6 text-center items-center">
            <Scale className="w-12 h-12 text-brand-logo-red" />
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              Ethical Code of Conduct
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              Cybersecurity skills represent significant operational power. In our courses and tasks, we emphasize that offensive security techniques are dual-use tools. While they are necessary to understand threats and test controls, using them without authorization is a violation of international regulations.
            </p>
            <div className="w-full bg-black border border-slate-800 rounded-xl p-6 text-left text-white mt-4 relative overflow-hidden bg-grid-pattern">
              <h4 className="font-manrope font-bold text-sm text-brand-logo-red mb-2">Notice to All Candidates</h4>
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
