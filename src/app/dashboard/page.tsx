'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Play, 
  Award, 
  FileText, 
  TrendingUp, 
  Calendar, 
  ShieldAlert, 
  Volume2, 
  ChevronRight,
  CheckCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockPrograms, mockModules, mockLessons, mockAnnouncements, mockLiveSessions } from '@/data/mockData';
import { User, Enrollment } from '@/types';

export default function DashboardOverviewPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [pendingAssignments, setPendingAssignments] = useState(0);
  const [projectStatusText, setProjectStatusText] = useState('0/0 Approved');
  const [eligibleForCert, setEligibleForCert] = useState(false);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      // Calculate progress metrics
      const percent = dbService.getProgramProgressPercentage(user.id);
      setProgressPercent(percent);
      setEligibleForCert(percent >= 100);

      const progModules = mockModules.filter(m => m.programId === enr.programId);
      const progModuleIds = progModules.map(m => m.id);
      const progLessons = mockLessons.filter(l => progModuleIds.includes(l.moduleId));
      setTotalLessons(progLessons.length);

      const progress = dbService.getLessonProgress(user.id);
      const completedCount = progress.filter(p => 
        p.completed && progLessons.some(l => l.id === p.lessonId)
      ).length;
      setLessonsCompleted(completedCount);

      // Calculations for assignments & projects
      const assignmentsSubmits = dbService.getAssignmentSubmissions(user.id);
      const programAssignments = mockModules
        .filter(m => m.programId === enr.programId)
        .flatMap(m => m.id); // Module IDs
      
      const totalAsgs = progress.length; // Approximate for demo
      setPendingAssignments(Math.max(1, 3 - assignmentsSubmits.length));

      const projectSubmits = dbService.getProjectSubmissions(user.id);
      setProjectStatusText(projectSubmits.length > 0 ? `${projectSubmits.filter(s=>s.status==='APPROVED').length}/2 Approved` : '0/2 Approved');
    }
  }, []);

  if (!student || !enrollment) return null;

  const activeProgramObj = mockPrograms.find(p => p.id === enrollment.programId);
  const activeModules = mockModules.filter(m => m.programId === enrollment.programId);
  const firstModule = activeModules[0];
  const lessonsForFirstMod = mockLessons.filter(l => l.moduleId === firstModule?.id);
  const nextLessonObj = lessonsForFirstMod.find((l, idx) => idx === lessonsCompleted) || lessonsForFirstMod[0];

  return (
    <div className="space-y-6">
      
      {/* WELCOME BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Dashboard Overview</span>
          <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
            Welcome back, {student.name}
          </h1>
          <p className="text-xs text-text-dark-secondary">
            Here is a summary of your active cybersecurity training program.
          </p>
        </div>
        
        {eligibleForCert ? (
          <Badge variant="success" className="text-xs py-1 px-3 border border-emerald-500/30 flex items-center gap-1.5 animate-pulse">
            <Award className="w-4 h-4" />
            Certificate Ready
          </Badge>
        ) : (
          <Badge variant="cyan" className="text-xs py-1 px-3 border border-brand-cyan/20">
            Cohort Member
          </Badge>
        )}
      </div>

      {/* STATS MATRIX CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Stat 1 */}
        <Card variant="dark" className="p-5 border-slate-800 bg-brand-navy flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-dark-secondary font-bold uppercase tracking-wider block">Completed Lessons</span>
            <h3 className="font-manrope font-extrabold text-2xl text-white mt-1">
              {lessonsCompleted} <span className="text-xs text-text-dark-secondary font-medium">/ {totalLessons || 8}</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-brand-blue/15 border border-brand-blue/20 flex items-center justify-center text-brand-blue">
            <BookOpen className="w-5 h-5" />
          </div>
        </Card>

        {/* Stat 2 */}
        <Card variant="dark" className="p-5 border-slate-800 bg-brand-navy flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-dark-secondary font-bold uppercase tracking-wider block">Pending Tasks</span>
            <h3 className="font-manrope font-extrabold text-2xl text-white mt-1">
              {pendingAssignments} <span className="text-xs text-text-dark-secondary font-medium">Worksheets</span>
            </h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <FileText className="w-5 h-5" />
          </div>
        </Card>

        {/* Stat 3 */}
        <Card variant="dark" className="p-5 border-slate-800 bg-brand-navy flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-dark-secondary font-bold uppercase tracking-wider block">Project Status</span>
            <h3 className="font-manrope font-extrabold text-2xl text-white mt-1">
              {projectStatusText}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-brand-violet/15 border border-brand-violet/20 flex items-center justify-center text-brand-violet">
            <TrendingUp className="w-5 h-5" />
          </div>
        </Card>

        {/* Stat 4 */}
        <Card variant="dark" className="p-5 border-slate-800 bg-brand-navy flex items-center justify-between">
          <div>
            <span className="text-[10px] text-text-dark-secondary font-bold uppercase tracking-wider block">Total Progress</span>
            <h3 className="font-manrope font-extrabold text-2xl text-brand-cyan mt-1">
              {progressPercent}%
            </h3>
          </div>
          <div className="w-10 h-10 rounded-lg bg-brand-cyan/15 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
            <CheckCircle className="w-5 h-5" />
          </div>
        </Card>

      </div>

      {/* DETAILED LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE INTERNSHIP & LEARNING */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Internship Progress */}
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy bg-grid-pattern relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-brand-cyan/15 rounded-full blur-[20px] pointer-events-none" />
            
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <Badge variant="cyan" className="text-[9px] mb-1">ACTIVE TRAINING COHORT</Badge>
                  <h3 className="font-manrope font-extrabold text-xl text-white tracking-tight">{activeProgramObj?.title}</h3>
                  <span className="text-[11px] text-text-dark-secondary">Duration: {activeProgramObj?.durationDays} Days | Level: {activeProgramObj?.level}</span>
                </div>
                
                <span className="text-2xl font-manrope font-extrabold text-brand-cyan">{progressPercent}%</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-cyan h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>

              {/* Next Lesson Box */}
              {nextLessonObj ? (
                <div className="p-4 bg-[#101E31]/80 border border-slate-850 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-brand-cyan font-bold block mb-1">Up Next:</span>
                    <h4 className="font-manrope font-bold text-sm text-white">{nextLessonObj.title}</h4>
                    <p className="text-xs text-text-dark-secondary mt-0.5 max-w-md">Continue with your next scheduled technical lesson.</p>
                  </div>
                  <Link 
                    href={`/dashboard/learning/${nextLessonObj.moduleId}/${nextLessonObj.id}`}
                    className="px-4 py-2 bg-brand-blue hover:bg-blue-600 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all text-white shrink-0 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Resume Lesson
                  </Link>
                </div>
              ) : (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-xs text-emerald-400">
                  Congratulations! You have completed all lessons in this internship course checklist.
                </div>
              )}
            </div>

          </Card>

          {/* Live webinar widget */}
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
            <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-cyan" />
              Upcoming Live Session
            </h3>
            
            {mockLiveSessions.length > 0 ? (
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <h4 className="font-manrope font-bold text-sm text-white">{mockLiveSessions[0].title}</h4>
                  <span className="text-xs text-text-dark-secondary block mt-0.5">Instructor: {mockLiveSessions[0].instructor}</span>
                  <div className="flex gap-4 mt-2.5 text-xs text-brand-cyan font-semibold">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> July 10, 2026</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 3:00 PM IST</span>
                  </div>
                </div>

                <a 
                  href={mockLiveSessions[0].joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-brand-cyan text-brand-dark hover:bg-white rounded-lg text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer shrink-0"
                >
                  Join Meeting <ChevronRight className="w-4.5 h-4.5" />
                </a>
              </div>
            ) : (
              <div className="text-xs text-text-dark-secondary italic">No upcoming webinars scheduled.</div>
            )}
          </Card>

        </div>

        {/* RIGHT COLUMN: ANNOUNCEMENTS & CERTIFICATE CHECK */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recent Announcement Board */}
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
            <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-3 mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-brand-cyan" />
              Cohort Announcements
            </h3>
            
            <div className="space-y-4">
              {mockAnnouncements.slice(0, 2).map((ann) => (
                <div key={ann.id} className="text-xs space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold block">
                    {new Date(ann.date).toLocaleDateString()}
                  </span>
                  <h4 className="font-semibold text-white">{ann.title}</h4>
                  <p className="text-text-dark-secondary leading-relaxed">{ann.content}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Certificate Claim Area */}
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy text-center flex flex-col items-center gap-4 relative overflow-hidden bg-grid-pattern">
            <Award className="w-10 h-10 text-brand-cyan" />
            
            <div>
              <h4 className="font-manrope font-bold text-sm text-white">Certificate Eligibility</h4>
              {eligibleForCert ? (
                <p className="text-xs text-text-dark-secondary mt-1 leading-relaxed">
                  Congratulations! You have completed all learning modules. Claim your verified certificate below.
                </p>
              ) : (
                <p className="text-xs text-text-dark-secondary mt-1 leading-relaxed">
                  Required: Reach 100% learning completion to unlock your verifiable cybersecurity credential document.
                </p>
              )}
            </div>

            <div className="w-full pt-2">
              {eligibleForCert ? (
                <Link 
                  href="/dashboard/certificate"
                  className="w-full block py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-xs font-semibold text-white text-center shadow transition-all cursor-pointer"
                >
                  Claim Certificate
                </Link>
              ) : (
                <div className="w-full py-2 bg-slate-800 text-slate-500 rounded-lg text-xs font-semibold text-center select-none cursor-not-allowed">
                  Claim Certificate (Locked)
                </div>
              )}
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
