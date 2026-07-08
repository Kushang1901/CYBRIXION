'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Award, 
  Check, 
  Cpu, 
  Terminal, 
  Activity, 
  Lock, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  FileCode,
  Calendar
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-24 md:pt-[150px] md:pb-32 bg-brand-dark dark-theme overflow-hidden bg-grid-pattern">
        
        {/* Subtle cyan glow in background */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-brand-violet/10 rounded-full blur-[90px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: INTRO TEXT & CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left relative z-10">
              <Badge variant="cyan" className="w-fit">
                STRUCTURED CYBERSECURITY INTERNSHIPS
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-[54px] font-manrope font-extrabold text-white leading-[1.1] tracking-tight">
                Build Real Cybersecurity Skills. <br />
                <span className="text-brand-cyan">Start With the Right Path.</span>
              </h1>
              <p className="text-base md:text-lg text-text-dark-secondary leading-relaxed max-w-xl">
                CYBRIXON provides structured cybersecurity internship programs designed to help students build strong foundations, practical understanding, project experience, and clear career direction.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <Button href="/internships" variant="primary" size="lg" glow>
                  Explore Internships
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button href="/why-choose-us" variant="outline" size="lg">
                  See How It Works
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-6 border-t border-slate-800/80 mt-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="text-sm font-semibold text-text-dark-primary">Structured Learning</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="text-sm font-semibold text-text-dark-primary">Practical Projects</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="text-sm font-semibold text-text-dark-primary">Career-Focused Paths</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center">
                    <Check className="w-3 h-3 text-brand-cyan" />
                  </div>
                  <span className="text-sm font-semibold text-text-dark-primary">Verifiable Certificates</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: 3D ROTATING SHIELD HOLOGRAM */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end items-center h-[500px] lg:pr-12">
              
              {/* Inline CSS styling block to ensure Turbopack animation compatibility */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes floatRotate3d {
                  0% {
                    transform: rotateY(-22deg) rotateX(12deg) translateY(0px);
                  }
                  50% {
                    transform: rotateY(22deg) rotateX(-8deg) translateY(-24px);
                  }
                  100% {
                    transform: rotateY(-22deg) rotateX(12deg) translateY(0px);
                  }
                }
                @keyframes shieldScan {
                  0% { top: -10%; }
                  50% { top: 100%; }
                  100% { top: -10%; }
                }
                @keyframes orbitCyan {
                  0% { transform: rotateX(60deg) rotateY(10deg) rotateZ(0deg) translateX(240px) rotateZ(0deg); }
                  100% { transform: rotateX(60deg) rotateY(10deg) rotateZ(360deg) translateX(240px) rotateZ(-360deg); }
                }
                @keyframes orbitViolet {
                  0% { transform: rotateX(-45deg) rotateY(20deg) rotateZ(360deg) translateX(200px) rotateZ(-360deg); }
                  100% { transform: rotateX(-45deg) rotateY(20deg) rotateZ(0deg) translateX(200px) rotateZ(0deg); }
                }
                @keyframes spinSlow {
                  0% { transform: rotateZ(0deg); }
                  100% { transform: rotateZ(360deg); }
                }
                @keyframes spinSlowReverse {
                  0% { transform: rotateZ(360deg); }
                  100% { transform: rotateZ(0deg); }
                }
                .custom-float-rotate-3d {
                  animation: floatRotate3d 7s ease-in-out infinite;
                  transform-style: preserve-3d;
                }
                .custom-shield-scan {
                  animation: shieldScan 3.5s ease-in-out infinite;
                }
                .custom-orbit-cyan {
                  animation: orbitCyan 12s linear infinite;
                }
                .custom-orbit-violet {
                  animation: orbitViolet 15s linear infinite;
                }
                .custom-spin-slow {
                  animation: spinSlow 22s linear infinite;
                }
                .custom-spin-slow-reverse {
                  animation: spinSlowReverse 26s linear infinite;
                }
              `}} />

              {/* Outer Cyan Orbiting Particle */}
              <div className="absolute w-3 h-3 bg-brand-cyan rounded-full custom-orbit-cyan shadow-[0_0_15px_#22d3ee] z-20 pointer-events-none" />
              
              {/* Outer Violet Orbiting Particle */}
              <div className="absolute w-2.5 h-2.5 bg-brand-violet rounded-full custom-orbit-violet shadow-[0_0_15px_#8b5cf6] z-20 pointer-events-none" />

              {/* Holographic Glowing Scanning Rings */}
              <div className="absolute pointer-events-none" style={{ transform: 'rotateX(65deg) rotateY(-15deg)' }}>
                <div className="w-[420px] h-[420px] border border-brand-cyan/25 rounded-full custom-spin-slow-reverse" />
              </div>
              <div className="absolute pointer-events-none" style={{ transform: 'rotateX(65deg) rotateY(10deg)' }}>
                <div className="w-[360px] h-[360px] border border-dashed border-brand-violet/35 rounded-full custom-spin-slow" />
              </div>

              {/* Digital Grid Scan Area */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-cyan/10 to-transparent blur-3xl pointer-events-none" />

              {/* 3D Shield Model */}
              <div 
                className="relative w-[320px] h-[370px] custom-float-rotate-3d flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                
                {/* 1. Deep 3D Shadow/Glow Layer */}
                <div 
                  className="absolute w-[290px] h-[340px] bg-gradient-to-b from-brand-cyan/20 to-brand-violet/25 blur-2xl rounded-[3rem] pointer-events-none"
                  style={{ transform: 'translateZ(-30px)' }}
                />

                {/* 2. Middle Layer: Hologram Digital Core Grid */}
                <div 
                  className="absolute w-[270px] h-[320px] bg-[#0b1728]/60 border border-brand-violet/25 rounded-[2.5rem] flex items-center justify-center overflow-hidden pointer-events-none shadow-[inset_0_0_40px_rgba(139,92,246,0.15)]"
                  style={{ transform: 'translateZ(-12px)' }}
                >
                  <div className="absolute inset-0 bg-dot-pattern opacity-40" />
                  <div className="w-48 h-48 rounded-full border border-brand-violet/15 animate-ping opacity-30" />
                </div>

                {/* 3. Front Layer: Main Shield Armor Plate */}
                <div 
                  className="absolute w-[280px] h-[330px] bg-gradient-to-b from-[#0c1b30] to-[#071020] border-2 border-brand-cyan rounded-[2.5rem] shadow-[0_0_55px_rgba(34,211,238,0.25)] flex flex-col items-center justify-center overflow-hidden"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  
                  {/* Digital Tech Grid Overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-15" />

                  {/* Shield SVG Shield Silhouette Shape and Icon */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    
                    {/* Glowing outer circle indicator */}
                    <div className="absolute inset-0 border border-dashed border-brand-cyan/50 rounded-full custom-spin-slow-reverse" />
                    
                    {/* Solid rotating sub-ring */}
                    <div className="absolute w-28 h-28 border-2 border-brand-violet/25 rounded-full" />
                    
                    {/* SVG Shield Drawing */}
                    <svg className="w-20 h-20 text-brand-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                  </div>

                  {/* Glowing Laser Scan Bar */}
                  <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-brand-cyan/25 to-transparent custom-shield-scan" />

                  {/* Cybersecurity Encryption Label */}
                  <div className="mt-8 flex flex-col items-center gap-1.5">
                    <span className="text-xs font-mono tracking-widest text-brand-cyan font-extrabold">CYBRIXION SHIELD</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wide">SYS_GUARD_PROTOCOL_ACTIVE</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </Container>
      </section>

      {/* TRUST / VALUE BAR */}
      <section className="bg-brand-navy border-y border-slate-800 text-text-dark-primary py-10 relative z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 justify-items-center">
            <div className="flex flex-col items-center text-center">
              <BookOpen className="w-7 h-7 text-brand-cyan mb-2" />
              <h4 className="font-manrope font-bold text-sm text-white">Structured Curriculum</h4>
              <span className="text-xs text-text-dark-secondary mt-0.5">Step-by-step roadmap</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <FileCode className="w-7 h-7 text-brand-cyan mb-2" />
              <h4 className="font-manrope font-bold text-sm text-white">Practical Assignments</h4>
              <span className="text-xs text-text-dark-secondary mt-0.5">Learn by executing tasks</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Terminal className="w-7 h-7 text-brand-cyan mb-2" />
              <h4 className="font-manrope font-bold text-sm text-white">Real Projects</h4>
              <span className="text-xs text-text-dark-secondary mt-0.5">Hands-on exposure</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="w-7 h-7 text-brand-cyan mb-2" />
              <h4 className="font-manrope font-bold text-sm text-white">Verifiable Certificates</h4>
              <span className="text-xs text-text-dark-secondary mt-0.5">Unique digital security ID</span>
            </div>
          </div>
        </Container>
      </section>

      {/* OUR DIRECTIVE */}
      <section className="py-20 md:py-28 bg-[#F7F9FC]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">OUR DIRECTIVE</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-dark">
              Built Around Clear Purpose
            </h2>
            <p className="text-sm md:text-base text-text-light-secondary leading-relaxed">
              We help the next generation of cybersecurity learners build practical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Mission</h3>
              <p className="text-sm leading-relaxed text-text-light-secondary">
                Help the next generation of cybersecurity learners build practical understanding through structured and understandable learning.
              </p>
            </Card>

            {/* Card 2 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Vision</h3>
              <p className="text-sm leading-relaxed text-text-light-secondary">
                Create a learning ecosystem where students can understand cybersecurity roles, tools, threats, defensive concepts, and career paths with confidence.
              </p>
            </Card>

            {/* Card 3 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-brand-dark">Our Method</h3>
              <ul className="space-y-2 text-sm text-text-light-secondary">
                <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-success" /> Learn by Doing</li>
                <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-success" /> Strong Foundations First</li>
                <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-success" /> Understand Before Tools</li>
                <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-success" /> Think Like an Attacker</li>
                <li className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-success" /> Defend Responsibly</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* WHY CHOOSE CYBRIXON */}
      <section className="py-20 md:py-28 bg-[#07111F] text-white bg-dot-pattern border-t border-slate-800">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Structured to Deliver Competency
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              We focus on building actual operational knowledge, moving past superficial memorization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Structured Learning Path</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                No random videos or disjointed tutorials. Follow a logical, sequential week-by-week curriculum mapped to industry goals.
              </p>
            </Card>

            {/* Feature 2 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Terminal className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Practical Cyber Exposure</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Work within legal sandboxes to scan and assess environments, learning exactly how traffic rules, systems, and protocols interact.
              </p>
            </Card>

            {/* Feature 3 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Concept-First Principles</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Understand the underlying security models and networking layers prior to running automated vulnerability scanners.
              </p>
            </Card>

            {/* Feature 4 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Guided Assignments</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Submit worksheets, analysis briefs, and scan reports. Get actual grading feedback to identify your gaps.
              </p>
            </Card>

            {/* Feature 5 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <FileCode className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Real Projects</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Compile comprehensive security audits, network report briefs, and vulnerabilities registers matching enterprise deliverables.
              </p>
            </Card>

            {/* Feature 6 */}
            <Card variant="dark" hoverGlow className="p-7 flex flex-col gap-3.5 border-slate-800/80">
              <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-manrope font-bold text-lg text-white">Career Direction</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Identify which specialty track fits your goals best, and benefit from structured resume mapping and mock interviews.
              </p>
            </Card>

          </div>
        </Container>
      </section>

      {/* FEATURED INTERNSHIP PROGRAMS */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">FEATURED INTERNSHIPS</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-dark">
              Choose Your Cybersecurity Path
            </h2>
            <p className="text-sm md:text-base text-text-light-secondary leading-relaxed">
              We offer structured programs tailored to your current technical background and career objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 30-Day Card */}
            <Card variant="light" hoverGlow className="flex flex-col border border-slate-200">
              <div className="p-8 flex-1 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beginner Level</span>
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-full">30 Days</span>
                </div>
                <h3 className="font-manrope font-extrabold text-2xl text-brand-dark">30-Day Cybersecurity Internship</h3>
                <p className="text-sm text-text-light-secondary leading-relaxed">
                  A structured beginner-level path covering cybersecurity fundamentals, networking basics, operating systems, ethical principles, and introductory security tools.
                </p>
                <div className="pt-5 border-t border-slate-100 mt-auto space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>4-Week Path</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>Weekly Assignments</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>1 Practical Mini Project</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center">
                <Button href="/internships/30-day-cybersecurity-internship" variant="primary" className="w-full">
                  Learn Details
                </Button>
              </div>
            </Card>

            {/* 60-Day Card (MOST POPULAR) */}
            <Card variant="light" hoverGlow className="flex flex-col border-2 border-brand-blue relative overflow-visible">
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white text-[10px] font-bold font-manrope px-3.5 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="p-8 flex-1 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intermediate Level</span>
                  <span className="text-xs font-bold text-brand-blue bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-full">60 Days</span>
                </div>
                <h3 className="font-manrope font-extrabold text-2xl text-brand-dark">60-Day Cybersecurity Internship</h3>
                <p className="text-sm text-text-light-secondary leading-relaxed">
                  Build stronger foundations through network security, scanning concepts, web security, OWASP Top 10, log analysis, hands-on projects, and career guidance.
                </p>
                <div className="pt-5 border-t border-slate-100 mt-auto space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>8-Week In-Depth Curriculum</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>2 Practical Projects</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-light-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-success" />
                    <span>Resume Support & Interview Mocking</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center">
                <Button href="/internships/60-day-cybersecurity-internship" variant="primary" className="w-full">
                  Enroll Now
                </Button>
              </div>
            </Card>

            {/* 90-Day Card */}
            <Card variant="dark" hoverGlow className="flex flex-col border border-slate-800/80 bg-brand-navy relative overflow-hidden bg-grid-pattern">
              <div className="absolute top-0 right-[10%] w-[100px] h-[100px] bg-brand-violet/20 rounded-full blur-[20px]" />
              <div className="p-8 flex-1 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-brand-violet uppercase tracking-wider">Advanced Level</span>
                  <span className="text-xs font-bold text-brand-violet bg-brand-violet/10 border border-brand-violet/20 px-3 py-1 rounded-full">90 Days</span>
                </div>
                <h3 className="font-manrope font-extrabold text-2xl text-white">90-Day Advanced Internship</h3>
                <p className="text-sm text-text-dark-secondary leading-relaxed">
                  Complete an advanced core cybersecurity foundation and proceed directly into one of three specialization tracks based on your career interests.
                </p>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block">Specializations:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="cyan">SOC Analyst</Badge>
                    <Badge variant="cyan">VAPT</Badge>
                    <Badge variant="cyan">GRC</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-800 mt-auto space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-cyan" />
                    <span>12-Week Specialization Curriculum</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-cyan" />
                    <span>Major Portfolio Project</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-text-dark-primary font-medium">
                    <CheckCircle2 className="w-4.5 h-4.5 text-brand-cyan" />
                    <span>Job Preparation & Placement Mapping</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-[#101E31] border-t border-slate-800 flex items-center">
                <Button href="/internships/90-day-advanced-cybersecurity-internship" variant="secondary" className="w-full">
                  Explore Specializations
                </Button>
              </div>
            </Card>

          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-[#F7F9FC] border-t border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">PROCESS ROADMAP</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-dark">
              Your Path From Enrollment to Certificate
            </h2>
            <p className="text-sm md:text-base text-text-light-secondary leading-relaxed">
              A transparent, step-by-step layout of how you progress through our programs.
            </p>
          </div>

          {/* Desktop Connected Steps */}
          <div className="hidden lg:grid grid-cols-9 gap-4 items-start relative mt-10">
            {/* Step lines back */}
            <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-slate-200 -z-0" />
            
            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">1</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Explore</h5>
              <span className="text-[10px] text-text-light-secondary">Choose a Program</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">2</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Apply</h5>
              <span className="text-[10px] text-text-light-secondary">Fill Application</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">3</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Access</h5>
              <span className="text-[10px] text-text-light-secondary">Enter Dashboard</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">4</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Learn</h5>
              <span className="text-[10px] text-text-light-secondary">Structured Lessons</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">5</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Practice</h5>
              <span className="text-[10px] text-text-light-secondary">Submit Tasks</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">6</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Build</h5>
              <span className="text-[10px] text-text-light-secondary">Compile Projects</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">7</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Track</h5>
              <span className="text-[10px] text-text-light-secondary">View Completion</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-md">8</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Audit</h5>
              <span className="text-[10px] text-text-light-secondary">Fulfill Criteria</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-cyan text-brand-dark font-manrope font-bold text-sm flex items-center justify-center shadow-md border-2 border-brand-blue">9</div>
              <h5 className="font-manrope font-bold text-xs text-brand-dark mt-3 mb-1">Verify</h5>
              <span className="text-[10px] text-text-light-secondary">Earn Certificate</span>
            </div>
          </div>

          {/* Mobile vertical layout */}
          <div className="lg:hidden flex flex-col gap-6 pl-4 border-l-2 border-slate-200 ml-4">
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">1. Explore a Program</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Select a 30-day, 60-day, or 90-day internship path.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">2. Apply or Enroll</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Register your student account details and program preference.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">3. Access Your Dashboard</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Get immediate portal access to your active coursework checklist.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">4. Learn Through Structured Modules</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Access readable technical lessons and download guides directly.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">5. Complete Weekly Assignments</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Apply your module knowledge on practical worksheets.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">6. Compile Portfolio Projects</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Author standard network scans and audit reports within lab environments.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">7. Track Progress</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Monitor completion metrics in real time.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">8. Complete Requirements</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Validate that all core checklists have been graded successfully.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-cyan" />
              <h5 className="font-manrope font-bold text-sm text-brand-dark">9. Receive Verified Certificate</h5>
              <p className="text-xs text-text-light-secondary mt-0.5">Gain a public digital credential with a secure verification serial.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* TOOLS AND CONCEPTS */}
      <section className="py-20 md:py-26 bg-[#07111F] text-white border-t border-slate-800 bg-grid-pattern">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">CONCEPTS & TOOLSETS</span>
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
                className="bg-[#101E31]/50 border border-slate-850 p-4 rounded-xl flex flex-col items-center text-center transition-all hover:bg-[#101E31] hover:border-brand-cyan/20 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mb-3">
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

      {/* LEARNING EXPERIENCE */}
      <section className="py-20 md:py-28 bg-white border-t border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">LEARNING CONTEXT</span>
              <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-dark leading-tight">
                An Educational Ecosystem Focused on Practice
              </h2>
              <p className="text-sm md:text-base text-text-light-secondary leading-relaxed">
                CYBRIXON currently delivers course modules and guides via structured text documents, checklists, presentations, and live Q&A doubt clearance sessions. 
              </p>
              
              <div className="space-y-3.5 mt-2">
                {[
                  'Website-Based Lessons: High-fidelity readable articles',
                  'PDF Handouts: Detailed command references and cheat sheets',
                  'PPT Slides: Structural architectural overviews',
                  'Practical Guides: Lab setups and validation steps',
                  'Weekly Worksheets: Graded analytical tasks',
                  'Scheduled Live Sessions: Q&A support and guidance'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-text-light-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-50 border border-slate-250 rounded-xl">
                <span className="text-xs font-bold text-brand-blue block mb-1">Concept-First Method</span>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  We verify that you understand standard transport layer handshakes and subnet architectures prior to demonstrating automated penetration tools.
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-250 rounded-xl">
                <span className="text-xs font-bold text-brand-blue block mb-1">Zero Stock Photography</span>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  All graphics are conceptual flowcharts, actual commands, and realistic dashboard panels designed to simulate developer and security analyst terminals.
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-250 rounded-xl">
                <span className="text-xs font-bold text-brand-blue block mb-1">Ethics & Safety Warnings</span>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  Every technical scanning module highlights the requirements of legal permissions and local lab environments to prevent unintentional computer law breaches.
                </p>
              </div>
              <div className="p-6 bg-slate-50 border border-slate-250 rounded-xl">
                <span className="text-xs font-bold text-brand-blue block mb-1">No Video Stream Promises</span>
                <p className="text-xs text-text-light-secondary leading-relaxed">
                  Our core format focuses on readable text lessons, references, and scheduled live meetings. Recorded video streams are not featured as currently available resources.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* CAREER PATHS */}
      <section className="py-20 md:py-28 bg-[#F7F9FC] border-t border-slate-200">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">CAREER TRACKS</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-brand-dark">
              Understand Your Targeted Professional Roles
            </h2>
            <p className="text-sm md:text-base text-text-light-secondary leading-relaxed">
              Explore primary specializations. *Note: We provide skills training and resume guidance; we do not guarantee job placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* SOC Analyst */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-manrope font-bold text-base text-brand-dark mb-2">SOC Analyst</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Monitors logs, detects system alerts, evaluates malicious packets, and responds to host events.
              </p>
            </div>

            {/* VAPT Specialist */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-manrope font-bold text-base text-brand-dark mb-2">VAPT / Pentester</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Runs vulnerability scans, maps software versions, checks web endpoints, and compiles security audit logs.
              </p>
            </div>

            {/* GRC Associate */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-manrope font-bold text-base text-brand-dark mb-2">GRC Associate</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Defines security policies, monitors risk registers, drafts audits, and cross-checks PCI-DSS and ISO standards.
              </p>
            </div>

            {/* Security Operations */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h4 className="font-manrope font-bold text-base text-brand-dark mb-2">Security Operator</h4>
              <p className="text-xs text-text-light-secondary leading-relaxed">
                Applies system hardening patches, updates user access permissions, and reviews active firewalls.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* CERTIFICATE PREVIEW */}
      <section className="py-20 md:py-28 bg-[#07111F] text-white border-t border-slate-800 bg-dot-pattern">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">CREDENTIALS</span>
              <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white leading-tight">
                Earn a Verifiable cybersecurity Credential
              </h2>
              <p className="text-sm text-text-dark-secondary leading-relaxed">
                Upon meeting program criteria—completing modules, scoring on assignments, and passing review audits—you receive a digital certificate containing a unique registration ID.
              </p>
              <div className="p-4 bg-brand-navy border border-slate-800 rounded-xl text-xs space-y-2">
                <span className="font-semibold text-brand-cyan block">Accreditation Advisory Notice</span>
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
                
                {/* Accent cyan lines */}
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-cyan" />
                
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-brand-cyan" />
                    <span className="font-manrope font-bold text-xs tracking-wide text-white">CYBRIXON</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-brand-cyan border border-brand-cyan/20 px-2 py-0.5 rounded">
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
                  <h4 className="font-manrope font-bold text-base text-brand-cyan">
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
                      <span className="text-[10px] font-mono text-brand-cyan">CYB-2026-000145</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-26 bg-brand-dark text-white border-t border-slate-800 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/15 rounded-full blur-[100px] pointer-events-none" />
        <Container>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
            <h2 className="text-3xl md:text-5xl font-manrope font-extrabold tracking-tight text-white leading-tight">
              Ready to Start Your Cybersecurity Journey?
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary max-w-xl leading-relaxed">
              Explore our core curriculum details, submit your application, and begin working on authorized cybersecurity tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button href="/internships" variant="primary" size="lg" glow>
                Explore Internships
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}
