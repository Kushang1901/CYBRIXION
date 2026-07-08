'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Award, CheckCircle2, Lock, Download, ExternalLink, Printer } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { dbService } from '@/services/dbService';
import { mockPrograms, mockModules, mockLessons } from '@/data/mockData';
import { User, Enrollment, Certificate } from '@/types';

export default function CertificatePage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const [lessonsLeft, setLessonsLeft] = useState(0);

  const loadProgressData = (userObj: User) => {
    const enr = dbService.getEnrollment(userObj.id);
    setEnrollment(enr);

    if (enr) {
      const percent = dbService.getProgramProgressPercentage(userObj.id);
      setProgressPercent(percent);

      const certs = dbService.getCertificates(userObj.id);
      setCertificates(certs);
      const found = certs.find(c => c.programId === enr.programId);
      if (found) {
        setActiveCert(found);
      }

      // Calculate lessons remaining
      const progModules = mockModules.filter(m => m.programId === enr.programId);
      const progModuleIds = progModules.map(m => m.id);
      const progLessons = mockLessons.filter(l => progModuleIds.includes(l.moduleId));
      
      const progress = dbService.getLessonProgress(userObj.id);
      const completedCount = progress.filter(p => 
        p.completed && progLessons.some(l => l.id === p.lessonId)
      ).length;
      
      setLessonsLeft(Math.max(0, progLessons.length - completedCount));
    }
  };

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);
    loadProgressData(user);
  }, []);

  const handleGenerateCertificate = () => {
    if (!student || !enrollment) return;
    
    // In order to generate, we need progress to be 100%.
    // Force complete progress for simulation if they click generate when eligible
    if (progressPercent < 100) {
      const progModules = mockModules.filter(m => m.programId === enrollment.programId);
      const progModuleIds = progModules.map(m => m.id);
      const progLessons = mockLessons.filter(l => progModuleIds.includes(l.moduleId));
      
      // Mark all lessons as completed in dbService
      progLessons.forEach((l) => {
        const progress = dbService.getLessonProgress(student.id);
        const exists = progress.some(p => p.lessonId === l.id && p.completed);
        if (!exists) {
          dbService.toggleLessonCompletion(student.id, l.id);
        }
      });
    }

    const cert = dbService.checkAndGenerateCertificate(student.id);
    if (cert) {
      setActiveCert(cert);
    }
    loadProgressData(student);
  };

  const handleDevAutoComplete = () => {
    if (!student) return;
    // Set progress to 100% immediately
    const enr = dbService.getEnrollment(student.id);
    if (!enr) return;
    const progModules = mockModules.filter(m => m.programId === enr.programId);
    const progModuleIds = progModules.map(m => m.id);
    const progLessons = mockLessons.filter(l => progModuleIds.includes(l.moduleId));
    
    progLessons.forEach((l) => {
      const progress = dbService.getLessonProgress(student.id);
      const exists = progress.some(p => p.lessonId === l.id && p.completed);
      if (!exists) {
        dbService.toggleLessonCompletion(student.id, l.id);
      }
    });

    loadProgressData(student);
  };

  if (!student || !enrollment) return null;

  const activeProgramObj = mockPrograms.find(p => p.id === enrollment.programId);
  const eligible = progressPercent >= 100;

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Cohort Accreditation</span>
          <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
            Digital Certificate Registry
          </h1>
          <p className="text-xs text-text-dark-secondary">
            View status requirements or access your issued digital cybersecurity credential.
          </p>
        </div>

        {/* Developer Auto-Complete Shortcut */}
        {!eligible && !activeCert && (
          <button 
            onClick={handleDevAutoComplete}
            className="px-3 py-1.5 bg-brand-violet/25 hover:bg-brand-violet/40 text-brand-violet border border-brand-violet/30 hover:border-brand-violet/60 rounded-lg text-[10px] font-bold transition-all cursor-pointer"
            title="Auto-complete all lessons in database to unlock certificate claim"
          >
            [Dev Sandbox] Complete Course (100%)
          </button>
        )}
      </div>

      {/* THREE CONDITIONAL STATE LAYOUTS */}

      {/* STATE 1: ISSUED */}
      {activeCert ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Certificate Preview card */}
          <div className="lg:col-span-8 space-y-4">
            <Card variant="dark" className="border-4 border-slate-800 bg-slate-950 p-6 md:p-10 relative overflow-hidden bg-grid-pattern shadow-2xl">
              
              {/* Left cyan stripe */}
              <div className="absolute top-0 left-0 w-2 h-full bg-brand-cyan" />
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-brand-cyan" />
                  <span className="font-manrope font-bold text-xs tracking-wide text-white">CYBRIXON</span>
                </div>
                <Badge variant="cyan" className="text-[9px] uppercase">VERIFIED INTERNSHIP CREDENTIAL</Badge>
              </div>

              <div className="text-center flex flex-col items-center gap-4 my-8">
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">This is to certify that</span>
                <h2 className="font-manrope font-extrabold text-2xl md:text-3xl text-white tracking-tight border-b border-slate-800 pb-2 w-full max-w-md">
                  {student.name}
                </h2>
                <p className="text-xs text-text-dark-secondary leading-relaxed max-w-sm">
                  has successfully completed the requirements for the
                </p>
                <h3 className="font-manrope font-bold text-base md:text-lg text-brand-cyan">
                  {activeProgramObj?.title}
                </h3>
                <p className="text-[10px] text-text-dark-secondary leading-relaxed">
                  including structural networking protocols, log analysis, system hardening, and web application threat assessments.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-850 flex justify-between items-end">
                <div className="text-left text-xs">
                  <span className="text-[9px] text-slate-500 uppercase block">Issue Date</span>
                  <span className="font-semibold text-white">
                    {new Date(activeCert.issueDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 text-xs">
                  <div className="w-8 h-8 bg-white p-0.5 rounded flex items-center justify-center">
                    <div className="w-full h-full bg-brand-dark" />
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 uppercase block">Certificate Verification ID</span>
                    <span className="font-mono text-brand-cyan text-[10px]">{activeCert.certificateId}</span>
                  </div>
                </div>
              </div>

            </Card>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4">
              <h4 className="font-manrope font-bold text-sm text-white border-b border-slate-800 pb-2">Credential Details</h4>
              
              <div className="space-y-3.5 text-xs text-text-dark-secondary">
                <div className="flex justify-between">
                  <span>Student:</span>
                  <span className="font-semibold text-white">{student.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Program Path:</span>
                  <span className="font-semibold text-white">{activeProgramObj?.title}</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Credential ID:</span>
                  <span className="font-bold text-brand-cyan">{activeCert.certificateId}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 bg-brand-blue hover:bg-blue-600 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <Link
                  href={`/certificate-verification?id=${activeCert.certificateId}`}
                  className="w-full py-2.5 bg-brand-navy border border-slate-800 hover:border-slate-700 rounded-lg text-xs font-semibold text-text-dark-secondary hover:text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  Test Verification Link
                </Link>
              </div>
            </Card>

            <div className="p-4 bg-brand-navy border border-slate-800 rounded-xl text-[10px] text-text-dark-secondary leading-normal">
              <span className="font-semibold text-brand-cyan block mb-0.5">Accreditation Advisory</span>
              This certificate constitutes a technical verification benchmark. It does not represent university or official national accreditation.
            </div>
          </div>

        </div>
      ) : eligible ? (
        
        // STATE 2: ELIGIBLE
        <Card variant="dark" className="p-8 border-slate-800 bg-brand-navy text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mx-auto">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <Badge variant="cyan">ELIGIBLE FOR ACCREDITATION</Badge>
            <h3 className="font-manrope font-extrabold text-2xl text-white tracking-tight">
              Internship Requirements Completed
            </h3>
            <p className="text-xs text-text-dark-secondary leading-relaxed max-w-sm mx-auto">
              You have completed 100% of the lessons in your internship program database. Claim your verifiable digital certificate below.
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <Button onClick={handleGenerateCertificate} variant="primary" className="w-full flex justify-center items-center py-2.5" glow>
              Generate Digital Certificate
            </Button>
          </div>
        </Card>
      ) : (
        
        // STATE 3: NOT ELIGIBLE
        <Card variant="dark" className="p-8 border-slate-800 bg-brand-navy text-center max-w-xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-850 flex items-center justify-center text-slate-500 mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Badge variant="secondary">CERTIFICATE LOCKED</Badge>
            <h3 className="font-manrope font-extrabold text-xl text-white tracking-tight">
              Requirements Pending
            </h3>
            <p className="text-xs text-text-dark-secondary leading-relaxed max-w-sm mx-auto">
              You must achieve 100% progress parameters before your certificate can be generated.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-3 max-w-sm mx-auto text-left text-xs text-text-dark-secondary">
            <div className="flex justify-between">
              <span>Overall Progress:</span>
              <span className="font-semibold text-brand-cyan">{progressPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span>Lessons Remaining:</span>
              <span className="font-semibold text-white">{lessonsLeft} Lessons</span>
            </div>
            <div className="flex justify-between">
              <span>Project Review Audit:</span>
              <span className="font-semibold text-white">Pending Submission</span>
            </div>
          </div>

          <div className="max-w-xs mx-auto">
            <Button href="/dashboard/learning" variant="primary" className="w-full flex justify-center items-center py-2.5" glow>
              Resume Learning Modules
            </Button>
          </div>
        </Card>
      )}

    </div>
  );
}
