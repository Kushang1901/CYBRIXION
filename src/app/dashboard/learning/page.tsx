'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, BookOpen, CheckCircle, Lock, ChevronDown, ChevronUp, AlertCircle, Play } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockPrograms, mockModules, mockLessons } from '@/data/mockData';
import { User, Enrollment, Lesson, LessonProgress } from '@/types';

export default function LearningPage() {
  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    if (enr) {
      const progress = dbService.getLessonProgress(user.id);
      setLessonProgress(progress);

      const activeModules = mockModules.filter(m => m.programId === enr.programId);
      
      // Auto expand the active/first few modules
      const initialExpanded: Record<string, boolean> = {};
      activeModules.forEach((m, idx) => {
        initialExpanded[m.id] = idx <= 1; // Expand first 2 modules by default
      });
      setExpandedWeeks(initialExpanded);
    }
  }, []);

  if (!student || !enrollment) return null;

  const activeProgramObj = mockPrograms.find(p => p.id === enrollment.programId);
  const activeModules = mockModules.filter(m => m.programId === enrollment.programId);

  const toggleWeek = (moduleId: string) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const isLessonCompleted = (lessonId: string) => {
    return lessonProgress.some((p) => p.lessonId === lessonId && p.completed);
  };

  // Logic to determine if a module is locked:
  // For the demo, let's unlock weeks 1-4. Weeks 5-8 are locked for beginner 30-day, but unlocked for 60-day.
  // 90-day track specializations are unlocked if that specialization is selected.
  const isModuleLocked = (moduleId: string, weekNumber: number) => {
    // 30-day program has 4 weeks. Any week > 4 is locked.
    if (enrollment.programId === 'prog-30-day' && weekNumber > 4) return true;
    
    // 90-day program phase 2 modules are locked if they don't match the student's selected specialization.
    const modObj = mockModules.find(m => m.id === moduleId);
    if (enrollment.programId === 'prog-90-day' && modObj?.specializationId) {
      return modObj.specializationId !== enrollment.specializationId;
    }

    return false;
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Curriculum Syllabus</span>
          <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
            Learning Modules
          </h1>
          <p className="text-xs text-text-dark-secondary">
            Select a weekly block below to read lessons and check course objectives.
          </p>
        </div>
        
        <div className="bg-brand-navy border border-slate-800 rounded-lg px-4 py-2 text-xs flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-cyan" />
          <span className="font-semibold text-white">Syllabus Path:</span>
          <span className="text-brand-cyan">{activeProgramObj?.title}</span>
        </div>
      </div>

      {/* SYLLABUS BLOCKS ACCORDION */}
      <div className="space-y-5">
        {activeModules.map((module) => {
          const isExpanded = !!expandedWeeks[module.id];
          const isLocked = isModuleLocked(module.id, module.weekNumber);
          const moduleLessons = mockLessons.filter((l) => l.moduleId === module.id);
          
          // Calculate module stats
          const totalLessonsCount = moduleLessons.length;
          const completedCount = moduleLessons.filter(l => isLessonCompleted(l.id)).length;
          const isAllCompleted = totalLessonsCount > 0 && completedCount === totalLessonsCount;

          return (
            <Card 
              key={module.id} 
              variant="dark" 
              className={`border transition-colors ${
                isLocked 
                  ? 'border-slate-850 opacity-60 bg-brand-dark/20' 
                  : isExpanded 
                  ? 'border-slate-800 bg-brand-navy shadow-lg' 
                  : 'border-slate-800 bg-brand-navy'
              }`}
            >
              
              {/* TRIGGER BAR */}
              <button
                onClick={() => !isLocked && toggleWeek(module.id)}
                className={`w-full px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                  isLocked ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={isLocked}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-manrope font-bold text-xs ${
                    isLocked 
                      ? 'bg-slate-800 text-slate-500' 
                      : isAllCompleted 
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/25' 
                      : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25'
                  }`}>
                    W{module.weekNumber}
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-sm md:text-base text-white">{module.title}</h3>
                    <span className="text-[10px] text-text-dark-secondary block">
                      {isLocked ? 'Syllabus track locked' : `Week ${module.weekNumber} Block | ${completedCount}/${totalLessonsCount || 4} Completed`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-12 md:ml-0 shrink-0">
                  {isLocked ? (
                    <Badge variant="secondary" className="text-[9px] flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Locked
                    </Badge>
                  ) : isAllCompleted ? (
                    <Badge variant="success" className="text-[9px]">COMPLETED</Badge>
                  ) : completedCount > 0 ? (
                    <Badge variant="cyan" className="text-[9px]">IN PROGRESS</Badge>
                  ) : (
                    <Badge variant="info" className="text-[9px]">NOT STARTED</Badge>
                  )}
                  
                  {!isLocked && (
                    <div className="p-1 rounded hover:bg-slate-800 transition-colors text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  )}
                </div>
              </button>

              {/* EXPANDED LESSON LISTS */}
              {!isLocked && isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-850 divide-y divide-slate-850">
                  {moduleLessons.length > 0 ? (
                    moduleLessons.map((lesson) => {
                      const completed = isLessonCompleted(lesson.id);
                      
                      return (
                        <div 
                          key={lesson.id} 
                          className="py-3 flex items-center justify-between text-xs md:text-sm gap-4 group"
                        >
                          <div className="flex items-center gap-3">
                            {completed ? (
                              <CheckCircle className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <BookOpen className="w-4.5 h-4.5 text-slate-500 group-hover:text-brand-cyan transition-colors flex-shrink-0" />
                            )}
                            <span className={`font-semibold ${completed ? 'text-text-dark-secondary line-through' : 'text-text-dark-primary'}`}>
                              {lesson.title}
                            </span>
                          </div>

                          <Link 
                            href={`/dashboard/learning/${module.id}/${lesson.id}`}
                            className={`px-3 py-1.5 rounded text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                              completed 
                                ? 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white' 
                                : 'bg-brand-blue hover:bg-blue-600 text-white shadow-sm'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            {completed ? 'Review' : 'Start'}
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-4 text-center text-xs text-text-dark-secondary italic flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-500" />
                      Detailed lesson text is locked in this demo dashboard outline. Try reviewing Week 1 modules!
                    </div>
                  )}
                </div>
              )}

            </Card>
          );
        })}
      </div>

    </div>
  );
}
