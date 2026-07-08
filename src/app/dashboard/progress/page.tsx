'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Activity, CheckCircle, Award, FileText, TrendingUp, Calendar } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockPrograms, mockModules, mockLessons } from '@/data/mockData';
import { User, Enrollment } from '@/types';

export default function ProgressPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [assignmentsSubmits, setAssignmentsSubmits] = useState(0);
  const [projectsSubmits, setProjectsSubmits] = useState(0);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      const percent = dbService.getProgramProgressPercentage(user.id);
      setProgressPercent(percent);

      const progModules = mockModules.filter(m => m.programId === enr.programId);
      const progModuleIds = progModules.map(m => m.id);
      const progLessons = mockLessons.filter(l => progModuleIds.includes(l.moduleId));
      setTotalLessons(progLessons.length);

      const progress = dbService.getLessonProgress(user.id);
      const completedCount = progress.filter(p => 
        p.completed && progLessons.some(l => l.id === p.lessonId)
      ).length;
      setLessonsCompleted(completedCount);

      const asgSubs = dbService.getAssignmentSubmissions(user.id);
      setAssignmentsSubmits(asgSubs.length);

      const projSubs = dbService.getProjectSubmissions(user.id);
      setProjectsSubmits(projSubs.length);
    }
  }, []);

  if (!student || !enrollment) return null;

  const activeProgramObj = mockPrograms.find(p => p.id === enrollment.programId);

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Metrics Analytics</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Progress & Completion Metrics
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Track your overall learning progress, submissions counts, and certificate criteria.
        </p>
      </div>

      {/* CORE STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Progress Circle card */}
        <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy flex flex-col items-center justify-center text-center gap-4">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* SVG circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="54" className="stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle 
                cx="64" 
                cy="64" 
                r="54" 
                className="stroke-brand-cyan transition-all duration-500" 
                strokeWidth="8" 
                fill="transparent"
                strokeDasharray={339.29}
                strokeDashoffset={339.29 - (339.29 * progressPercent) / 100}
              />
            </svg>
            <span className="absolute font-manrope font-extrabold text-2xl text-white">{progressPercent}%</span>
          </div>

          <div>
            <h4 className="font-manrope font-bold text-sm text-white">Overall Completion</h4>
            <span className="text-[10px] text-text-dark-secondary">{activeProgramObj?.title}</span>
          </div>
        </Card>

        {/* Milestone Stats */}
        <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4 md:col-span-2">
          <h3 className="font-manrope font-bold text-sm text-white border-b border-slate-800 pb-2">Cohort Metrics Log</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Lessons Completed</span>
                <span className="font-bold text-white mt-1 block">{lessonsCompleted} / {totalLessons}</span>
              </div>
              <CheckCircle className="w-5 h-5 text-brand-cyan" />
            </div>

            <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Assignments Submitted</span>
                <span className="font-bold text-white mt-1 block">{assignmentsSubmits} submitted</span>
              </div>
              <FileText className="w-5 h-5 text-brand-cyan" />
            </div>

            <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Projects Completed</span>
                <span className="font-bold text-white mt-1 block">{projectsSubmits} submitted</span>
              </div>
              <TrendingUp className="w-5 h-5 text-brand-cyan" />
            </div>

            <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Certificate Claimable</span>
                <span className={`font-bold mt-1 block ${progressPercent >= 100 ? 'text-emerald-500' : 'text-slate-500'}`}>
                  {progressPercent >= 100 ? 'ELlGIBLE' : 'LOCKED'}
                </span>
              </div>
              <Award className={`w-5 h-5 ${progressPercent >= 100 ? 'text-emerald-500' : 'text-slate-500'}`} />
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
}
