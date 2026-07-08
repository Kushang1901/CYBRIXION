'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Briefcase, Calendar, Award, CheckCircle2, AlertTriangle, ChevronRight, FileText, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockPrograms, mockModules, mockLessons, mockSpecializations } from '@/data/mockData';
import { User, Enrollment } from '@/types';

export default function MyInternshipPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      const percent = dbService.getProgramProgressPercentage(user.id);
      setProgressPercent(percent);

      // Simple mock module completed calculations
      setCompletedModulesCount(percent >= 100 ? 8 : percent >= 38 ? 3 : 1);
    }
  }, []);

  if (!student || !enrollment) return null;

  const activeProgramObj = mockPrograms.find(p => p.id === enrollment.programId);
  const activeModules = mockModules.filter(m => m.programId === enrollment.programId);
  
  // Resolve specialization if 90-day program
  const specializationObj = enrollment.specializationId 
    ? mockSpecializations.find(s => s.id === enrollment.specializationId)
    : null;

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Cohort Profile</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          My Internship Details
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Review your cohort boundaries, expected completion dates, and module outlines.
        </p>
      </div>

      {/* COHORT SPECS CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core details */}
        <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4 md:col-span-2">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <Briefcase className="w-5.5 h-5.5 text-brand-cyan" />
            <h3 className="font-manrope font-bold text-base text-white">Active Internship Summary</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Program Path:</span>
              <span className="font-semibold text-white">{activeProgramObj?.title}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Cohort Status:</span>
              <span className="text-emerald-500 font-bold">ACTIVE ENROLLMENT</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Commencement Date:</span>
              <span className="font-semibold text-white">
                {new Date(enrollment.startDate).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Expected Completion:</span>
              <span className="font-semibold text-white">
                {new Date(enrollment.expectedEndDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {specializationObj && (
            <div className="p-4 bg-[#101E31]/70 border border-slate-850 rounded-xl space-y-1">
              <span className="text-[9px] uppercase font-bold text-brand-cyan block">Target Specialty Track:</span>
              <h4 className="font-manrope font-bold text-xs text-white">{specializationObj.title}</h4>
              <p className="text-[10px] text-text-dark-secondary leading-normal">{specializationObj.description}</p>
            </div>
          )}
        </Card>

        {/* Requirements Card */}
        <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="font-manrope font-bold text-sm text-white border-b border-slate-800 pb-2">Requirements Summary</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-dark-secondary">Modules Completed:</span>
                <span className="font-semibold text-white">{completedModulesCount} / {activeModules.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-dark-secondary">Worksheets Graded:</span>
                <span className="font-semibold text-white">1 Passed</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-dark-secondary">Verification Audits:</span>
                <span className="font-semibold text-white">Pending</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between">
            <span className="text-[10px] text-text-dark-secondary">Progress percentage:</span>
            <span className="text-sm font-extrabold text-brand-cyan">{progressPercent}%</span>
          </div>
        </Card>

      </div>

      {/* MODULE OUTLINES CHECKLIST */}
      <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
        <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-3 mb-4">
          Internship Curriculum Modules Checklist
        </h3>

        <div className="space-y-3">
          {activeModules.map((mod, idx) => {
            const isCompleted = idx < completedModulesCount;
            const isActive = idx === completedModulesCount;

            return (
              <div 
                key={mod.id} 
                className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-colors ${
                  isCompleted 
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-text-dark-primary' 
                    : isActive 
                    ? 'bg-[#101E31] border-brand-cyan/20 text-white' 
                    : 'bg-brand-dark/40 border-slate-800/80 text-text-dark-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-manrope font-bold text-xs ${
                    isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : isActive 
                      ? 'bg-brand-cyan/10 text-brand-cyan' 
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {mod.weekNumber}
                  </div>
                  <div>
                    <h4 className="font-manrope font-bold text-xs md:text-sm">{mod.title}</h4>
                    <span className="text-[10px] block opacity-80">Week {mod.weekNumber} Coursework</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {isCompleted ? (
                    <Badge variant="success" className="text-[9px] px-2 py-0">COMPLETED</Badge>
                  ) : isActive ? (
                    <Badge variant="cyan" className="text-[9px] px-2 py-0">IN PROGRESS</Badge>
                  ) : (
                    <Badge variant="secondary" className="text-[9px] px-2 py-0">LOCKED</Badge>
                  )}
                  <Link href="/dashboard/learning" className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

    </div>
  );
}
