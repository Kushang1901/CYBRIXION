'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { 
  Shield, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Lock, 
  BookOpen, 
  AlertTriangle,
  Play,
  FileText,
  Volume2
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';
import { mockModules, mockLessons } from '@/data/mockData';
import { User, Enrollment, Lesson, LessonProgress } from '@/types';

interface PageProps {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export default function LessonReaderPage({ params }: PageProps) {
  const router = useRouter();
  const { moduleId, lessonId } = React.use(params);

  const [student, setStudent] = useState<User | null>(null);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [moduleLessons, setModuleLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completed, setCompleted] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const enr = dbService.getEnrollment(user.id);
    setEnrollment(enr);

    const activeModLessons = mockLessons.filter((l) => l.moduleId === moduleId);
    setModuleLessons(activeModLessons);

    const lesson = mockLessons.find((l) => l.id === lessonId);
    if (!lesson) {
      notFound();
    }
    setCurrentLesson(lesson);

    const progress = dbService.getLessonProgress(user.id);
    setLessonProgress(progress);
    setCompleted(progress.some((p) => p.lessonId === lessonId && p.completed));
  }, [moduleId, lessonId]);

  if (!student || !enrollment || !currentLesson) return null;

  const currentModuleObj = mockModules.find(m => m.id === moduleId);
  
  const currentIdx = moduleLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? moduleLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < moduleLessons.length - 1 ? moduleLessons[currentIdx + 1] : null;

  const handleMarkComplete = () => {
    const nextState = dbService.toggleLessonCompletion(student.id, currentLesson.id);
    setCompleted(nextState);
    
    // Refresh progress state
    const progress = dbService.getLessonProgress(student.id);
    setLessonProgress(progress);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TOP BAR */}
      <div className="flex items-center gap-3">
        <Link 
          href="/dashboard/learning"
          className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">
            {currentModuleObj?.title} / Week {currentModuleObj?.weekNumber}
          </span>
          <h1 className="text-xl md:text-2xl font-manrope font-extrabold text-white tracking-tight">
            {currentLesson.title}
          </h1>
        </div>
      </div>

      {/* CORE WORKSPACE SPLIT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 25% Lesson list sidebar navigation */}
        <div className="lg:col-span-3">
          <Card variant="dark" className="p-4 border-slate-800 bg-brand-navy space-y-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 block">Module Lessons</span>
            
            <div className="space-y-1">
              {moduleLessons.map((l) => {
                const isCompleted = lessonProgress.some(p => p.lessonId === l.id && p.completed);
                const isCurrent = l.id === lessonId;

                return (
                  <Link
                    key={l.id}
                    href={`/dashboard/learning/${moduleId}/${l.id}`}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isCurrent 
                        ? 'bg-brand-blue text-white shadow-sm' 
                        : 'text-text-dark-secondary hover:text-white hover:bg-brand-elevated'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{l.title}</span>
                    </div>
                    {isCompleted && (
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>

        {/* CENTER COLUMN: 60% Formatted text content */}
        <div className="lg:col-span-6 space-y-6">
          <Card variant="dark" className="p-6 md:p-8 border-slate-800 bg-brand-navy text-text-dark-primary leading-relaxed relative">
            
            {/* Custom Markdown Parser (Rough emulation for mock contents) */}
            <div className="text-xs md:text-sm space-y-5 text-text-dark-secondary">
              
              {/* Splitting standard tags */}
              {currentLesson.content.split('\n\n').map((para, paraIdx) => {
                // Check if Heading 3
                if (para.startsWith('### ')) {
                  return (
                    <h3 key={paraIdx} className="font-manrope font-extrabold text-base md:text-lg text-white pt-2">
                      {para.replace('### ', '')}
                    </h3>
                  );
                }
                
                // Check if Heading 4
                if (para.startsWith('#### ')) {
                  return (
                    <h4 key={paraIdx} className="font-manrope font-bold text-sm text-white pt-1">
                      {para.replace('#### ', '')}
                    </h4>
                  );
                }

                // Check if Heading 5
                if (para.startsWith('##### ')) {
                  return (
                    <h5 key={paraIdx} className="font-manrope font-semibold text-xs text-brand-cyan pt-1">
                      {para.replace('##### ', '')}
                    </h5>
                  );
                }

                // Check if Blockquote Warning Alert
                if (para.startsWith('> [!WARNING]')) {
                  const cleaned = para.replace('> [!WARNING]', '').replace('> ', '').trim();
                  return (
                    <div key={paraIdx} className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex gap-3 text-red-400">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold block mb-0.5">Ethical Security Warning</span>
                        {cleaned}
                      </div>
                    </div>
                  );
                }

                // Check if Blockquote Caution Alert
                if (para.startsWith('> [!CAUTION]')) {
                  const cleaned = para.replace('> [!CAUTION]', '').replace('> ', '').trim();
                  return (
                    <div key={paraIdx} className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl flex gap-3 text-amber-400">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold block mb-0.5">Defensive scanning constraints</span>
                        {cleaned}
                      </div>
                    </div>
                  );
                }

                // Check if list items
                if (para.startsWith('- ')) {
                  return (
                    <ul key={paraIdx} className="list-disc pl-5 space-y-2">
                      {para.split('\n').map((item, idx) => (
                        <li key={idx} className="text-text-dark-secondary">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }

                // Check if code block
                if (para.startsWith('```')) {
                  const cleaned = para.replace(/```[a-z]*/g, '').trim();
                  return (
                    <pre key={paraIdx} className="p-4 bg-slate-950 rounded-xl overflow-x-auto text-[10px] md:text-xs font-mono text-emerald-400 border border-slate-900 leading-normal">
                      <code>{cleaned}</code>
                    </pre>
                  );
                }

                return (
                  <p key={paraIdx} className="leading-relaxed">
                    {para}
                  </p>
                );
              })}

            </div>

          </Card>

          {/* READER CONTROL FOOTER */}
          <div className="flex justify-between items-center bg-[#0B1728] border border-slate-800 rounded-xl p-4">
            {prevLesson ? (
              <Link 
                href={`/dashboard/learning/${moduleId}/${prevLesson.id}`}
                className="px-3.5 py-2 border border-slate-800 hover:border-slate-700 text-xs font-bold text-text-dark-secondary hover:text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Prev
              </Link>
            ) : (
              <div className="w-16" />
            )}

            <button
              onClick={handleMarkComplete}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                completed 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/15'
                  : 'bg-brand-cyan text-brand-dark hover:bg-white shadow'
              }`}
            >
              <Check className="w-4.5 h-4.5" />
              {completed ? 'Lesson Completed' : 'Mark Completed'}
            </button>

            {nextLesson ? (
              <Link 
                href={`/dashboard/learning/${moduleId}/${nextLesson.id}`}
                className="px-3.5 py-2 border border-slate-800 hover:border-slate-700 text-xs font-bold text-text-dark-secondary hover:text-white rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
              >
                Next
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div className="w-16" />
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: 15% Notes / warnings */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Support Notes */}
          <Card variant="dark" className="p-4 border-slate-800 bg-brand-navy space-y-2">
            <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-wider block">Security Lab Guidelines</span>
            <p className="text-[11px] text-text-dark-secondary leading-normal">
              Execute scanning configurations inside isolated VMware or VirtualBox guest systems containing targeted vulnerable VMs (e.g. Metasploitable). Never scan external gateways.
            </p>
          </Card>

          <Card variant="dark" className="p-4 border-slate-800 bg-brand-navy space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Resource Files</span>
            <div className="space-y-2 text-[11px] text-text-dark-secondary font-medium">
              <Link href="/dashboard/resources" className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors">
                <FileText className="w-3.5 h-3.5" /> Study Notes PDF
              </Link>
              <Link href="/dashboard/live-sessions" className="flex items-center gap-1.5 hover:text-brand-cyan transition-colors">
                <Volume2 className="w-3.5 h-3.5" /> Nmap Webinar
              </Link>
            </div>
          </Card>

        </div>

      </div>

    </div>
  );
}
