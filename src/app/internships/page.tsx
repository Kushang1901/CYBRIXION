'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle2, ChevronRight, Filter } from 'lucide-react';
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
      <section className="py-16 bg-white">
        <Container>
          
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-sm text-text-light-secondary font-medium">
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
                      ? 'bg-[#07111F] text-white border-[#07111F] shadow-sm'
                      : 'bg-slate-50 text-text-light-secondary border-slate-200 hover:bg-slate-100'
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

      <Footer />
    </>
  );
}
