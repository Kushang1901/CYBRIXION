'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, TrendingUp, Calendar, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockProjects, mockModules } from '@/data/mockData';
import { User, Enrollment, Project, ProjectSubmission } from '@/types';

export default function ProjectsPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      const subs = dbService.getProjectSubmissions(user.id);
      setSubmissions(subs);
    }
  }, []);

  if (!student || !enrollment) return null;

  // Filter projects matching student's program
  const activeProjects = mockProjects.filter(p => p.programId === enrollment.programId);

  const getSubmissionStatus = (projectId: string) => {
    const sub = submissions.find(s => s.projectId === projectId);
    if (!sub) return 'NOT_STARTED';
    return sub.status;
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Portfolio Records</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Practical Portfolio Projects
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Complete and submit mandatory cybersecurity mini & major audits. Evaluated reports will build your hiring profile.
        </p>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map((proj) => {
          const status = getSubmissionStatus(proj.id);

          return (
            <Card 
              key={proj.id} 
              variant="dark" 
              className="p-6 border-slate-800 bg-brand-navy flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Badge variant={proj.type === 'MAJOR' ? 'purple' : 'primary'} className="text-[9px] px-2.5 py-0.5">
                    {proj.type} PROJECT
                  </Badge>
                  
                  {status === 'APPROVED' && (
                    <Badge variant="success" className="text-[9px]">APPROVED</Badge>
                  )}
                  {status === 'UNDER_REVIEW' && (
                    <Badge variant="warning" className="text-[9px]">UNDER REVIEW</Badge>
                  )}
                  {status === 'SUBMITTED' && (
                    <Badge variant="cyan" className="text-[9px]">SUBMITTED</Badge>
                  )}
                  {status === 'NOT_STARTED' && (
                    <Badge variant="info" className="text-[9px]">NOT STARTED</Badge>
                  )}
                </div>

                <div>
                  <h3 className="font-manrope font-bold text-sm md:text-base text-white">{proj.title}</h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed mt-2 line-clamp-3">
                    {proj.requirements.replace(/[*#]/g, '').slice(0, 150)}...
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-text-dark-secondary font-semibold">
                  <Calendar className="w-4 h-4 text-brand-cyan" />
                  <span>Deadline: {proj.deadline ? new Date(proj.deadline).toLocaleDateString() : 'End of Cohort'}</span>
                </div>

                <Link 
                  href={`/dashboard/projects/${proj.id}`}
                  className="text-xs font-bold text-brand-cyan flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  Configure <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </Card>
          );
        })}

        {activeProjects.length === 0 && (
          <div className="p-8 text-center text-xs text-text-dark-secondary italic border border-dashed border-slate-800 rounded-2xl w-full col-span-2">
            No active portfolio projects required for your current program tier.
          </div>
        )}
      </div>

    </div>
  );
}
