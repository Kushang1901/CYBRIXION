'use client';

import React, { useState, useEffect } from 'react';
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
import CrystalsBackground from '@/components/ui/CrystalsBackground';

const CYCLING_PHRASES = [
  'Network Security',
  'Ethical Hacking',
  'Penetration Testing',
  'SOC Analysis',
  'Threat Intelligence',
  'Web App Security',
  'GRC & Compliance',
];

function CyclingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % CYCLING_PHRASES.length);
        setVisible(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: 'inline-block',
        color: '#1E60C8',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {CYCLING_PHRASES[index]}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative pt-[120px] pb-24 md:pt-[150px] md:pb-32 bg-black dark-theme overflow-hidden bg-grid-pattern">
        <CrystalsBackground />
        
        {/* Dark blue glow overlays */}
        <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-brand-blue/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-brand-mid-blue/12 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT COLUMN: INTRO TEXT & CTA */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left relative z-10">
              {/* Small pill badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '999px',
                  padding: '4px 14px',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(4px)',
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                We don&apos;t just teach, we build it.
              </div>

              <h1
                style={{
                  fontSize: 'clamp(1.9rem, 4.5vw, 3.0rem)',
                  fontWeight: 800,
                  color: '#fff',
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  margin: 0,
                }}
              >
                Start Learning<br />
                <span style={{ whiteSpace: 'nowrap' }}>
                  Now <CyclingText />
                </span>
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <a
                  href="/apply"
                  className="group"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #1E60C8 0%, #154290 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '999px',
                    padding: '12px 28px',
                    fontSize: '14.5px',
                    fontWeight: 700,
                    color: '#fff',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(30, 96, 200, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(30, 96, 200, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(30, 96, 200, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span>Signup Now</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ fontSize: '15px' }}>↗</span>
                </a>
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
              
              {/* Outer Blue Orbiting Particle */}
              <div className="absolute w-2.5 h-2.5 bg-brand-blue rounded-full custom-orbit-violet shadow-[0_0_15px_#1E60C8] z-20 pointer-events-none" />

              {/* Holographic Glowing Scanning Rings */}
              <div className="absolute pointer-events-none" style={{ transform: 'rotateX(65deg) rotateY(-15deg)' }}>
                <div className="w-[420px] h-[420px] border border-brand-blue/25 rounded-full custom-spin-slow-reverse" />
              </div>
              <div className="absolute pointer-events-none" style={{ transform: 'rotateX(65deg) rotateY(10deg)' }}>
                <div className="w-[360px] h-[360px] border border-dashed border-brand-cyan/25 rounded-full custom-spin-slow" />
              </div>

              {/* Digital Grid Scan Area */}
              <div className="absolute inset-0 bg-radial-gradient from-brand-blue/8 to-transparent blur-3xl pointer-events-none" />

              {/* 3D Shield Model */}
              <div 
                className="relative w-[320px] h-[370px] custom-float-rotate-3d flex items-center justify-center"
                style={{ perspective: '1000px' }}
              >
                
                {/* 1. Deep 3D Shadow/Glow Layer */}
                <div 
                  className="absolute w-[290px] h-[340px] bg-gradient-to-b from-brand-blue/20 to-brand-mid-blue/25 blur-2xl rounded-[3rem] pointer-events-none"
                  style={{ transform: 'translateZ(-30px)' }}
                />

                {/* 2. Middle Layer: Hologram Digital Core Grid */}
                <div 
                  className="absolute w-[270px] h-[320px] bg-[#020B18]/60 border border-brand-blue/20 rounded-[2.5rem] flex items-center justify-center overflow-hidden pointer-events-none shadow-[inset_0_0_40px_rgba(30,96,200,0.12)]"
                  style={{ transform: 'translateZ(-12px)' }}
                >
                  <div className="absolute inset-0 bg-dot-pattern opacity-40" />
                  <div className="w-48 h-48 rounded-full border border-brand-blue/15 animate-ping opacity-30" />
                </div>

                {/* 3. Front Layer: Main Shield Armor Plate */}
                <div 
                  className="absolute w-[280px] h-[330px] bg-gradient-to-b from-[#071525] to-[#020B18] border-2 border-brand-blue/60 rounded-[2.5rem] shadow-[0_0_55px_rgba(30,96,200,0.30)] flex flex-col items-center justify-center overflow-hidden"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  
                  {/* Digital Tech Grid Overlay */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-15" />

                  {/* Shield SVG Shield Silhouette Shape and Icon */}
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    
                    {/* Glowing outer circle indicator */}
                    <div className="absolute inset-0 border border-dashed border-brand-cyan/50 rounded-full custom-spin-slow-reverse" />
                    
                    {/* Solid rotating sub-ring */}
                    <div className="absolute w-28 h-28 border-2 border-brand-blue/25 rounded-full" />
                    
                    {/* SVG Shield Drawing */}
                    <svg className="w-20 h-20 text-brand-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>

                  </div>

                  {/* Glowing Laser Scan Bar */}
                  <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-brand-blue/20 to-transparent custom-shield-scan" />

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
      <section className="bg-brand-navy border-y border-slate-800/60 text-text-dark-primary py-10 relative z-10">
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
      <section className="py-20 md:py-28 bg-black border-t border-slate-900/80">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">OUR DIRECTIVE</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Built Around Clear Purpose
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              We help the next generation of cybersecurity learners build practical skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-800/60">
              <div className="w-12 h-12 rounded-xl bg-brand-logo-red/15 flex items-center justify-center text-brand-logo-red">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-white">Our Mission</h3>
              <p className="text-sm leading-relaxed text-text-dark-secondary">
                Help the next generation of cybersecurity learners build practical understanding through structured and understandable learning.
              </p>
            </Card>

            {/* Card 2 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-800/60">
              <div className="w-12 h-12 rounded-xl bg-brand-logo-purple/15 flex items-center justify-center text-brand-logo-purple">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-white">Our Vision</h3>
              <p className="text-sm leading-relaxed text-text-dark-secondary">
                Create a learning ecosystem where students can understand cybersecurity roles, tools, threats, defensive concepts, and career paths with confidence.
              </p>
            </Card>

            {/* Card 3 */}
            <Card variant="light" className="p-8 flex flex-col gap-4 border border-slate-800/60">
              <div className="w-12 h-12 rounded-xl bg-brand-logo-purple/15 flex items-center justify-center text-brand-logo-purple">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="font-manrope font-bold text-xl text-white">Our Method</h3>
              <ul className="space-y-2 text-sm text-text-dark-secondary">
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

      {/* FEATURED INTERNSHIP PROGRAMS — Compact Summary Cards */}
      <section className="py-20 md:py-28 bg-brand-navy border-t border-slate-800/60">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">FEATURED INTERNSHIPS</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Choose Your Cybersecurity Path
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              Three structured programs tailored to your background. View full details on the Internships page.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            
            {/* 30-Day Compact Card */}
            <div className="group flex flex-col sm:flex-row border border-slate-800/70 rounded-2xl bg-brand-elevated/40 overflow-hidden hover:border-brand-blue/40 hover:shadow-[0_0_20px_rgba(30,96,200,0.12)] transition-all duration-300 p-4 items-center gap-5">
              {/* Image Container (Round Edge Box) */}
              <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-950/80 border border-slate-800">
                <img 
                  src="/beginner.png" 
                  alt="30-Day Cybersecurity Internship" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Duration badge over image */}
                <span className="absolute top-3 left-3 text-[9px] font-bold text-brand-cyan bg-black/75 backdrop-blur-sm border border-brand-cyan/20 px-2 py-0.5 rounded-full z-10">30 DAYS</span>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Beginner Level</span>
                  </div>
                  <h3 className="font-manrope font-bold text-base text-white group-hover:text-brand-cyan transition-colors">30-Day Cybersecurity Internship</h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed line-clamp-2">
                    Covering cybersecurity fundamentals, networking basics, operating systems, and ethical scanning tools.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button 
                    href="/internships/30-day-cybersecurity-internship" 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto hover:bg-brand-blue hover:text-white hover:border-transparent hover:shadow-[0_0_15px_rgba(30,96,200,0.50)]"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 60-Day Compact Card (Most Popular) */}
            <div className="group flex flex-col sm:flex-row border-2 border-brand-blue/40 rounded-2xl bg-brand-elevated/40 overflow-hidden hover:border-brand-blue/70 hover:shadow-[0_0_28px_rgba(30,96,200,0.20)] transition-all duration-300 p-4 items-center gap-5 relative">
              {/* Image Container (Round Edge Box) */}
              <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-950/80 border border-brand-blue/20">
                <img 
                  src="/Intermediate.png" 
                  alt="60-Day Cybersecurity Internship" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold text-brand-cyan bg-black/75 backdrop-blur-sm border border-brand-cyan/20 px-2 py-0.5 rounded-full z-10">60 DAYS</span>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Intermediate Level</span>
                    <span className="bg-brand-logo-red text-white text-[8px] font-extrabold font-manrope px-2.5 py-0.5 rounded uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="font-manrope font-bold text-base text-white group-hover:text-brand-cyan transition-colors">60-Day Cybersecurity Internship</h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed line-clamp-2">
                    Network security, scanning concepts, web security, OWASP Top 10, log analysis, and career support.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button 
                    href="/internships/60-day-cybersecurity-internship" 
                    variant="primary" 
                    size="sm" 
                    glow
                    className="w-full sm:w-auto"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 90-Day Compact Card */}
            <div className="group flex flex-col sm:flex-row border border-slate-800/70 rounded-2xl bg-brand-elevated/40 overflow-hidden hover:border-brand-blue/40 hover:shadow-[0_0_20px_rgba(30,96,200,0.12)] transition-all duration-300 p-4 items-center gap-5">
              {/* Image Container (Round Edge Box) */}
              <div className="w-full sm:w-48 h-32 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-950/80 border border-slate-800">
                <img 
                  src="/Advanced.png" 
                  alt="90-Day Advanced Internship" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 text-[9px] font-bold text-brand-cyan bg-black/75 backdrop-blur-sm border border-brand-cyan/20 px-2 py-0.5 rounded-full z-10">90 DAYS</span>
              </div>
              {/* Content */}
              <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-logo-purple uppercase tracking-wider">Advanced Level</span>
                  </div>
                  <h3 className="font-manrope font-bold text-base text-white group-hover:text-brand-cyan transition-colors">90-Day Advanced Internship</h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed line-clamp-2">
                    Advanced core security training with specialized tracks: SOC Analyst, VAPT, or GRC operations.
                  </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button 
                    href="/internships/90-day-advanced-cybersecurity-internship" 
                    variant="outline" 
                    size="sm"
                    className="w-full sm:w-auto hover:bg-brand-blue hover:text-white hover:border-transparent hover:shadow-[0_0_15px_rgba(30,96,200,0.50)]"
                  >
                    View Details
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Link to full internships page */}
          <div className="text-center mt-10">
            <Button href="/internships" variant="secondary" size="md">
              View All Program Details
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 bg-black border-t border-slate-900/80">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">PROCESS ROADMAP</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Your Path From Enrollment to Certificate
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              A transparent, step-by-step layout of how you progress through our programs.
            </p>
          </div>

          {/* Desktop Connected Steps */}
          <div className="hidden lg:grid grid-cols-9 gap-4 items-start relative mt-10">
            {/* Step lines back */}
            <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-slate-800/80 -z-0" />
            
            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">1</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Explore</h5>
              <span className="text-[10px] text-text-dark-secondary">Choose a Program</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">2</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Apply</h5>
              <span className="text-[10px] text-text-dark-secondary">Fill Application</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">3</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Access</h5>
              <span className="text-[10px] text-text-dark-secondary">Enter Dashboard</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">4</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Learn</h5>
              <span className="text-[10px] text-text-dark-secondary">Structured Lessons</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">5</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Practice</h5>
              <span className="text-[10px] text-text-dark-secondary">Submit Tasks</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">6</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Build</h5>
              <span className="text-[10px] text-text-dark-secondary">Compile Projects</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">7</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Track</h5>
              <span className="text-[10px] text-text-dark-secondary">View Completion</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-blue text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(30,96,200,0.5)]">8</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Audit</h5>
              <span className="text-[10px] text-text-dark-secondary">Fulfill Criteria</span>
            </div>

            <div className="col-span-1 flex flex-col items-center text-center relative z-10">
              <div className="w-10 h-10 rounded-full bg-brand-logo-red text-white font-manrope font-bold text-sm flex items-center justify-center shadow-[0_0_12px_rgba(211,34,42,0.5)] border-2 border-brand-blue/40">9</div>
              <h5 className="font-manrope font-bold text-xs text-white mt-3 mb-1">Verify</h5>
              <span className="text-[10px] text-text-dark-secondary">Earn Certificate</span>
            </div>
          </div>

          {/* Mobile vertical layout */}
          <div className="lg:hidden flex flex-col gap-6 pl-4 border-l-2 border-slate-800 ml-4">
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">1. Explore a Program</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Select a 30-day, 60-day, or 90-day internship path.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">2. Apply or Enroll</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Register your student account details and program preference.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">3. Access Your Dashboard</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Get immediate portal access to your active coursework checklist.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">4. Learn Through Structured Modules</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Access readable technical lessons and download guides directly.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">5. Complete Weekly Assignments</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Apply your module knowledge on practical worksheets.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">6. Compile Portfolio Projects</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Author standard network scans and audit reports within lab environments.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">7. Track Progress</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Monitor completion metrics in real time.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-blue" />
              <h5 className="font-manrope font-bold text-sm text-white">8. Complete Requirements</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Validate that all core checklists have been graded successfully.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-[12px] h-[12px] rounded-full bg-brand-logo-red" />
              <h5 className="font-manrope font-bold text-sm text-white">9. Receive Verified Certificate</h5>
              <p className="text-xs text-text-dark-secondary mt-0.5">Gain a public digital credential with a secure verification serial.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* LEARNING EXPERIENCE */}
      <section className="py-20 md:py-28 bg-brand-navy border-t border-slate-800/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-5 text-left">
              <span className="text-xs font-bold text-brand-logo-purple uppercase tracking-wider">LEARNING CONTEXT</span>
              <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white leading-tight">
                An Educational Ecosystem Focused on Practice
              </h2>
              <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
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
                    <span className="text-xs md:text-sm font-semibold text-text-dark-primary">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-brand-elevated/50 border border-slate-800/60 rounded-xl hover:border-brand-blue/30 transition-colors">
                <span className="text-xs font-bold text-brand-blue block mb-1">Concept-First Method</span>
                <p className="text-xs text-text-dark-secondary leading-relaxed">
                  We verify that you understand standard transport layer handshakes and subnet architectures prior to demonstrating automated penetration tools.
                </p>
              </div>
              <div className="p-6 bg-brand-elevated/50 border border-slate-800/60 rounded-xl hover:border-brand-blue/30 transition-colors">
                <span className="text-xs font-bold text-brand-blue block mb-1">Zero Stock Photography</span>
                <p className="text-xs text-text-dark-secondary leading-relaxed">
                  All graphics are conceptual flowcharts, actual commands, and realistic dashboard panels designed to simulate developer and security analyst terminals.
                </p>
              </div>
              <div className="p-6 bg-brand-elevated/50 border border-slate-800/60 rounded-xl hover:border-brand-blue/30 transition-colors">
                <span className="text-xs font-bold text-brand-blue block mb-1">Ethics & Safety Warnings</span>
                <p className="text-xs text-text-dark-secondary leading-relaxed">
                  Every technical scanning module highlights the requirements of legal permissions and local lab environments to prevent unintentional computer law breaches.
                </p>
              </div>
              <div className="p-6 bg-brand-elevated/50 border border-slate-800/60 rounded-xl hover:border-brand-blue/30 transition-colors">
                <span className="text-xs font-bold text-brand-blue block mb-1">No Video Stream Promises</span>
                <p className="text-xs text-text-dark-secondary leading-relaxed">
                  Our core format focuses on readable text lessons, references, and scheduled live meetings. Recorded video streams are not featured as currently available resources.
                </p>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* CAREER PATHS */}
      <section className="py-20 md:py-28 bg-black border-t border-slate-900/80">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">CAREER TRACKS</span>
            <h2 className="text-3xl md:text-4xl font-manrope font-extrabold text-white">
              Understand Your Targeted Professional Roles
            </h2>
            <p className="text-sm md:text-base text-text-dark-secondary leading-relaxed">
              Explore primary specializations. *Note: We provide skills training and resume guidance; we do not guarantee job placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* SOC Analyst */}
            <div className="bg-brand-elevated/50 border border-slate-800/70 rounded-xl p-6 hover:border-brand-blue/35 hover:shadow-[0_0_16px_rgba(30,96,200,0.12)] transition-all duration-300">
              <h4 className="font-manrope font-bold text-base text-white mb-2">SOC Analyst</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Monitors logs, detects system alerts, evaluates malicious packets, and responds to host events.
              </p>
            </div>

            {/* VAPT Specialist */}
            <div className="bg-brand-elevated/50 border border-slate-800/70 rounded-xl p-6 hover:border-brand-blue/35 hover:shadow-[0_0_16px_rgba(30,96,200,0.12)] transition-all duration-300">
              <h4 className="font-manrope font-bold text-base text-white mb-2">VAPT / Pentester</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Runs vulnerability scans, maps software versions, checks web endpoints, and compiles security audit logs.
              </p>
            </div>

            {/* GRC Associate */}
            <div className="bg-brand-elevated/50 border border-slate-800/70 rounded-xl p-6 hover:border-brand-blue/35 hover:shadow-[0_0_16px_rgba(30,96,200,0.12)] transition-all duration-300">
              <h4 className="font-manrope font-bold text-base text-white mb-2">GRC Associate</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Defines security policies, monitors risk registers, drafts audits, and cross-checks PCI-DSS and ISO standards.
              </p>
            </div>

            {/* Security Operations */}
            <div className="bg-brand-elevated/50 border border-slate-800/70 rounded-xl p-6 hover:border-brand-blue/35 hover:shadow-[0_0_16px_rgba(30,96,200,0.12)] transition-all duration-300">
              <h4 className="font-manrope font-bold text-base text-white mb-2">Security Operator</h4>
              <p className="text-xs text-text-dark-secondary leading-relaxed">
                Applies system hardening patches, updates user access permissions, and reviews active firewalls.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-26 bg-brand-navy text-white border-t border-slate-800/60 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-blue/10 rounded-full blur-[100px] pointer-events-none" />
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
