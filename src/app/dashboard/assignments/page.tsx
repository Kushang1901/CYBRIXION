'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, FileText, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockAssignments, mockModules } from '@/data/mockData';
import { User, Enrollment, Assignment, AssignmentSubmission } from '@/types';

export default function AssignmentsPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      const subs = dbService.getAssignmentSubmissions(user.id);
      setSubmissions(subs);
    }
  }, []);

  if (!student || !enrollment) return null;

  // Filter assignments matching active program modules
  const activeModuleIds = mockModules
    .filter(m => m.programId === enrollment.programId)
    .map(m => m.id);

  const activeAssignments = mockAssignments.filter(a => activeModuleIds.includes(a.moduleId));

  const getSubmissionStatus = (assignmentId: string) => {
    const sub = submissions.find(s => s.assignmentId === assignmentId);
    if (!sub) return { status: 'NOT_STARTED', points: null };
    return { status: sub.status, points: sub.points };
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Task Manager</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Worksheets & Assignments
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Complete and submit worksheets matching your modules before the due dates.
        </p>
      </div>

      {/* ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeAssignments.map((asg) => {
          const { status, points } = getSubmissionStatus(asg.id);
          const moduleObj = mockModules.find(m => m.id === asg.moduleId);

          return (
            <Card 
              key={asg.id} 
              variant="dark" 
              className="p-6 border-slate-800 bg-brand-navy flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[9px] px-2 py-0.5">
                    Week {moduleObj?.weekNumber || 1}
                  </Badge>
                  
                  {status === 'GRADED' && (
                    <Badge variant="success" className="text-[9px]">GRADED ({points}/{asg.maxPoints})</Badge>
                  )}
                  {status === 'UNDER_REVIEW' && (
                    <Badge variant="warning" className="text-[9px]">UNDER REVIEW</Badge>
                  )}
                  {status === 'SUBMITTED' && (
                    <Badge variant="primary" className="text-[9px]">SUBMITTED</Badge>
                  )}
                  {status === 'NOT_STARTED' && (
                    <Badge variant="info" className="text-[9px]">NOT STARTED</Badge>
                  )}
                </div>

                <div>
                  <h3 className="font-manrope font-bold text-sm md:text-base text-white">{asg.title}</h3>
                  <p className="text-xs text-text-dark-secondary leading-relaxed mt-2 line-clamp-2">
                    {asg.instruction}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-text-dark-secondary font-semibold">
                  <Calendar className="w-4 h-4 text-brand-cyan" />
                  <span>Due: {asg.deadline ? new Date(asg.deadline).toLocaleDateString() : 'N/A'}</span>
                </div>

                <Link 
                  href={`/dashboard/assignments/${asg.id}`}
                  className="text-xs font-bold text-brand-cyan flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                >
                  Manage <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

            </Card>
          );
        })}

        {activeAssignments.length === 0 && (
          <div className="p-8 text-center text-xs text-text-dark-secondary italic border border-dashed border-slate-800 rounded-2xl w-full col-span-2">
            No active assignments logged for this cohort block.
          </div>
        )}
      </div>

    </div>
  );
}
