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
  Sliders,
  ArrowRight,
  ChevronDown,
  Rocket,
  Brain,
  Lock,
  TrendingUp,
  FileCode,
  Briefcase,
  FileText,
  Users
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CrystalsBackground from '@/components/ui/CrystalsBackground';

export default function AboutPage() {

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-16 bg-black text-white bg-grid-pattern border-b border-slate-900 overflow-hidden">
        <CrystalsBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-blue/8 rounded-full blur-[90px] pointer-events-none" />
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

      {/* MISSION / VISION / METHOD — Unique Neon Reveal Cards */}
      <section className="py-24 bg-black border-b border-slate-900 relative overflow-hidden">
        
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-brand-blue/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-brand-logo-purple/6 rounded-full blur-[100px] pointer-events-none" />
        
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">PLATFORM CORE</span>
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              The Three Pillars of CYBRIXON
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              Every decision we make is guided by these core principles.
            </p>
          </div>

          {/* 3 Large Unique Cards — stacked with left accent bar + content reveal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* MISSION Card */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800/70 hover:border-brand-logo-red/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(211,34,42,0.12)] bg-brand-navy cursor-default">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-logo-red/60 via-brand-logo-red to-brand-logo-red/60 group-hover:opacity-100 opacity-70 transition-opacity" />
              
              {/* Corner number */}
              <div className="absolute top-5 right-5 font-mono text-[10px] font-bold text-brand-logo-red/50 group-hover:text-brand-logo-red/80 transition-colors">01</div>
              
              <div className="p-8 flex flex-col gap-5">
                {/* Icon with animated ring */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-logo-red/20 group-hover:border-brand-logo-red/50 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-[6px] rounded-full bg-brand-logo-red/10 group-hover:bg-brand-logo-red/18 transition-colors flex items-center justify-center">
                    <Target className="w-6 h-6 text-brand-logo-red" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-brand-logo-red uppercase tracking-widest block mb-1">MISSION</span>
                  <h3 className="font-manrope font-bold text-2xl text-white mb-3 leading-tight">Bridging the Academic Gap</h3>
                  <p className="text-sm text-text-dark-secondary leading-relaxed">
                    To construct a reliable bridge between academic computer science theory and practical cybersecurity operations. We provide students with structured roadmap curriculums, practical assignments, and portfolio-worthy projects.
                  </p>
                </div>
                
                {/* Highlight box */}
                <div className="p-3 bg-brand-logo-red/5 border border-brand-logo-red/15 rounded-lg text-[11px] text-brand-logo-red leading-relaxed">
                  <span className="font-bold block mb-0.5">Our Promise</span>
                  Actual technical readiness — preparing students to confidently execute entry-level SOC and defensive assessments.
                </div>

                {/* Decorative terminal line */}
                <div className="font-mono text-[9px] text-slate-700 group-hover:text-slate-600 transition-colors pt-2 border-t border-slate-800/50">
                  <span className="text-brand-logo-red/60">▶</span> SEC_MISSION_PROTOCOL.init()
                </div>
              </div>
            </div>

            {/* VISION Card */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800/70 hover:border-brand-blue/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(30,96,200,0.12)] bg-brand-navy cursor-default lg:-mt-4 lg:mb-4">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue/60 via-brand-blue to-brand-blue/60 group-hover:opacity-100 opacity-70 transition-opacity" />
              
              {/* Corner number */}
              <div className="absolute top-5 right-5 font-mono text-[10px] font-bold text-brand-blue/50 group-hover:text-brand-blue/80 transition-colors">02</div>

              <div className="p-8 flex flex-col gap-5">
                {/* Icon with animated ring */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-blue/20 group-hover:border-brand-blue/55 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-[6px] rounded-full bg-brand-blue/10 group-hover:bg-brand-blue/18 transition-colors flex items-center justify-center">
                    <Eye className="w-6 h-6 text-brand-blue" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest block mb-1">VISION</span>
                  <h3 className="font-manrope font-bold text-2xl text-white mb-3 leading-tight">Cultivating Systematic Defenders</h3>
                  <p className="text-sm text-text-dark-secondary leading-relaxed">
                    To cultivate a network of cyber defenders who approach security systematically, understanding how packets, OS kernel security, and application flows work before relying on automated tools.
                  </p>
                </div>
                
                {/* Highlight box */}
                <div className="p-3 bg-brand-blue/5 border border-brand-blue/15 rounded-lg text-[11px] text-brand-cyan leading-relaxed">
                  <span className="font-bold block mb-0.5">Our Goal</span>
                  An industry staffed by analytical professionals who understand packets and code — not just automated scanners.
                </div>

                {/* Decorative terminal line */}
                <div className="font-mono text-[9px] text-slate-700 group-hover:text-slate-600 transition-colors pt-2 border-t border-slate-800/50">
                  <span className="text-brand-blue/60">▶</span> VISION_LANDSCAPE.analyze()
                </div>
              </div>
            </div>

            {/* METHOD Card */}
            <div className="group relative rounded-2xl overflow-hidden border border-slate-800/70 hover:border-brand-cyan/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.10)] bg-brand-navy cursor-default">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-cyan/50 via-brand-cyan to-brand-cyan/50 group-hover:opacity-100 opacity-60 transition-opacity" />
              
              {/* Corner number */}
              <div className="absolute top-5 right-5 font-mono text-[10px] font-bold text-brand-cyan/50 group-hover:text-brand-cyan/80 transition-colors">03</div>

              <div className="p-8 flex flex-col gap-5">
                {/* Icon with animated ring */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-2 border-brand-cyan/20 group-hover:border-brand-cyan/50 group-hover:scale-110 transition-all duration-500" />
                  <div className="absolute inset-[6px] rounded-full bg-brand-cyan/8 group-hover:bg-brand-cyan/15 transition-colors flex items-center justify-center">
                    <Sliders className="w-6 h-6 text-brand-cyan" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block mb-1">METHOD</span>
                  <h3 className="font-manrope font-bold text-2xl text-white mb-3 leading-tight">A Concept-First Pedagogy</h3>
                  <p className="text-sm text-text-dark-secondary leading-relaxed">
                    A concept-first approach. We structure learning week-by-week and require students to run diagnostics and write summaries inside legal sandboxes to earn verifiable completion credentials.
                  </p>
                </div>

                {/* Method checklist */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] text-text-dark-secondary">
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Master OSI Layers First</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Hands-On Lab Work</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Graded Worksheets</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Scope Boundary Rules</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Concept Before Tools</li>
                  <li className="flex items-center gap-1.5"><Check className="w-3 h-3 text-success flex-shrink-0" /> Career Mapping</li>
                </ul>

                {/* Decorative terminal line */}
                <div className="font-mono text-[9px] text-slate-700 group-hover:text-slate-600 transition-colors pt-2 border-t border-slate-800/50">
                  <span className="text-brand-cyan/60">▶</span> OPERATIONAL_STEPS.execute()
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* WHY CHOOSE CYBRIXON — Bento Grid Layout */}
      <section className="py-24 bg-brand-navy border-b border-slate-800/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
        
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">WHY CHOOSE US</span>
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              Structured to Deliver Competency
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              We focus on building actual operational knowledge, moving past superficial memorization.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            
            {/* Feature 1 — Large featured card */}
            <div className="lg:col-span-2 group relative p-7 rounded-2xl bg-brand-elevated/50 border border-slate-800/70 hover:border-brand-blue/40 hover:shadow-[0_0_30px_rgba(30,96,200,0.12)] transition-all duration-400 overflow-hidden">
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-blue/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-brand-blue/10 transition-colors" />
              <div className="flex flex-col gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/15 border border-brand-blue/25 flex items-center justify-center text-brand-blue">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-lg text-white mb-2">Structured Learning Path</h4>
                  <p className="text-sm text-text-dark-secondary leading-relaxed">
                    No random videos or disjointed tutorials. Follow a logical, sequential week-by-week curriculum mapped to industry goals. Every module builds on the last, ensuring you develop deep conceptual roots before moving to advanced techniques.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {['Week-by-Week', 'Sequential Logic', 'Industry-Mapped'].map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-brand-blue bg-brand-blue/8 border border-brand-blue/20 px-2.5 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative p-7 rounded-2xl bg-brand-elevated/50 border border-slate-800/70 hover:border-brand-logo-purple/35 hover:shadow-[0_0_20px_rgba(99,39,111,0.10)] transition-all duration-400 overflow-hidden">
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-logo-purple/12 border border-brand-logo-purple/25 flex items-center justify-center text-brand-logo-purple">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-base text-white mb-2">Practical Cyber Exposure</h4>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">
                    Work within legal sandboxes to scan and assess environments, learning exactly how traffic rules, systems, and protocols interact.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative p-7 rounded-2xl bg-brand-elevated/50 border border-slate-800/70 hover:border-brand-logo-red/30 hover:shadow-[0_0_20px_rgba(211,34,42,0.08)] transition-all duration-400">
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-logo-red/12 border border-brand-logo-red/25 flex items-center justify-center text-brand-logo-red">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-base text-white mb-2">Concept-First Principles</h4>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">
                    Understand underlying security models and networking layers prior to running automated vulnerability scanners.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative p-7 rounded-2xl bg-brand-elevated/50 border border-slate-800/70 hover:border-brand-blue/35 hover:shadow-[0_0_20px_rgba(30,96,200,0.10)] transition-all duration-400">
              <div className="flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-blue/12 border border-brand-blue/25 flex items-center justify-center text-brand-blue">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-manrope font-bold text-base text-white mb-2">Guided Assignments</h4>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">
                    Submit worksheets, analysis briefs, and scan reports. Get actual grading feedback to identify your gaps.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5 — Wide */}
            <div className="group relative lg:col-span-2 p-7 rounded-2xl bg-gradient-to-br from-brand-elevated/50 to-brand-deep-blue/40 border border-slate-800/70 hover:border-brand-cyan/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)] transition-all duration-400 overflow-hidden">
              <div className="absolute bottom-0 right-0 w-[200px] h-[150px] bg-brand-cyan/4 rounded-full blur-[60px] pointer-events-none" />
              <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                <div className="flex flex-col gap-4 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-brand-cyan/8 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-manrope font-bold text-base text-white mb-2">Career Direction & Real Projects</h4>
                    <p className="text-xs text-text-dark-secondary leading-relaxed">
                      Identify which specialty track fits your goals — SOC, VAPT, or GRC. Benefit from structured resume mapping, mock interviews, and enterprise-format project deliverables like network audit briefs and security reports.
                    </p>
                  </div>
                </div>
                <div className="flex-shrink-0 flex flex-col gap-2 text-[11px]">
                  {['SOC Analyst Track', 'VAPT Specialist Track', 'GRC Operations Track'].map((track, i) => (
                    <div key={i} className="flex items-center gap-2 text-text-dark-secondary">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                      {track}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* METHODOLOGY PILLARS */}
      <section className="py-20 bg-black border-b border-slate-900">
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
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-red/10 border border-brand-logo-red/20 flex items-center justify-center text-brand-logo-red">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Concept-First Approach</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Understand the OSI layers, TCP three-way handshake flags, and Windows security token flows before running vulnerability scanner software.
              </p>
            </Card>

            {/* Pillar 2 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Hands-On Exposure</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Analyze traffic captures in Wireshark and construct Nmap scan profiles targeting authorized lab servers to witness packet exchanges.
              </p>
            </Card>

            {/* Pillar 3 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Expert Guidance</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Ask doubts on our scheduled live support sessions and review feedback on completed worksheets and scan deliverables.
              </p>
            </Card>

            {/* Pillar 4 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-red/10 border border-brand-logo-red/20 flex items-center justify-center text-brand-logo-red">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Career Direction</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Map your goals to SOC, VAPT, or GRC operations, and get assistance with technical resume drafting and structural interview mockups.
              </p>
            </Card>

            {/* Pillar 5 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-logo-purple/10 border border-brand-logo-purple/20 flex items-center justify-center text-brand-logo-purple">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-base text-white">Independent Mindset</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Develop security researcher habits: how to parse log files, verify bug reports, read documentation, and resolve scan errors.
              </p>
            </Card>

            {/* Pillar 6 */}
            <Card variant="light" className="p-7 flex flex-col gap-4 border border-slate-800/70 bg-brand-elevated/20 hover:border-brand-blue/30 transition-colors">
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

      {/* COMPARATIVE ANALYSIS TABLE */}
      <section className="py-20 bg-brand-navy border-b border-slate-800/60">
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
          <div className="overflow-hidden border border-slate-800/70 rounded-xl bg-black/45 shadow-lg">
            <table className="w-full border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="bg-brand-elevated text-white border-b border-slate-800/80 font-manrope font-semibold">
                  <th className="p-4 md:p-5 w-1/2">Random Tutorial Study</th>
                  <th className="p-4 md:p-5 w-1/2 border-l border-slate-800/80 text-brand-logo-red">CYBRIXON Structured Internship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-text-dark-primary">
                
                <tr>
                  <td className="p-4 md:p-5 flex items-start gap-2.5">
                    <X className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Disjointed Tutorials</span>
                      <span className="text-xs text-text-dark-secondary">Watching random videos without a unified roadmap or completion milestones.</span>
                    </div>
                  </td>
                  <td className="p-4 md:p-5 border-l border-slate-800/60">
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
                  <td className="p-4 md:p-5 border-l border-slate-800/60">
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
                  <td className="p-4 md:p-5 border-l border-slate-800/60">
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
                  <td className="p-4 md:p-5 border-l border-slate-800/60">
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
      <section className="py-20 bg-black border-b border-slate-900">
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
                <div key={idx} className="p-5 bg-brand-elevated/40 border border-slate-800/60 rounded-xl flex flex-col gap-2 hover:border-brand-blue/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-brand-blue/15 flex items-center justify-center text-brand-blue font-manrope font-bold text-xs">
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
      <section className="py-20 bg-brand-navy border-b border-slate-800/60">
        <Container className="max-w-4xl">
          <div className="flex flex-col gap-6 text-center items-center">
            <Scale className="w-12 h-12 text-brand-logo-red" />
            <h2 className="text-3xl font-manrope font-extrabold text-white">
              Ethical Code of Conduct
            </h2>
            <p className="text-sm text-text-dark-secondary leading-relaxed">
              Cybersecurity skills represent significant operational power. In our courses and tasks, we emphasize that offensive security techniques are dual-use tools. While they are necessary to understand threats and test controls, using them without authorization is a violation of international regulations.
            </p>
            <div className="w-full bg-black/60 border border-slate-800/70 rounded-xl p-6 text-left text-white mt-4 relative overflow-hidden bg-grid-pattern">
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
