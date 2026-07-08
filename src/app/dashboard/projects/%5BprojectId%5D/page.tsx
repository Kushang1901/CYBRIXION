'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { 
  Shield, 
  ArrowLeft, 
  Calendar, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { dbService } from '@/services/dbService';
import { mockProjects } from '@/data/mockData';
import { User, Enrollment, Project, ProjectSubmission } from '@/types';

interface PageProps {
  params: Promise<{ projectId: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { projectId } = React.use(params);

  const [student, setStudent] = useState<User | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [submission, setSubmission] = useState<ProjectSubmission | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const proj = mockProjects.find(p => p.id === projectId);
    if (!proj) {
      notFound();
    }
    setProject(proj);

    const subs = dbService.getProjectSubmissions(user.id);
    const sub = subs.find(s => s.projectId === projectId);
    if (sub) {
      setSubmission(sub);
    }
  }, [projectId]);

  if (!student || !project) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileSelected) return;

    setIsUploading(true);
    // Simulate upload latency
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockFileUrl = `/uploads/projects/${fileSelected.name.replace(/\s+/g, '_')}`;
    const newSub = dbService.submitProject(student.id, project.id, mockFileUrl);
    
    setSubmission(newSub);
    setFileSelected(null);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TOP BAR */}
      <div className="flex items-center gap-3">
        <Link 
          href="/dashboard/projects"
          className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Portfolio Project Scope</span>
          <h1 className="text-xl md:text-2xl font-manrope font-extrabold text-white tracking-tight">
            {project.title}
          </h1>
        </div>
      </div>

      {/* CORE WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 60% Project details */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="dark" className="p-6 md:p-8 border-slate-800 bg-brand-navy space-y-5">
            <div>
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2 mb-3">Scope & Deliverables</h3>
              
              {/* Parse standard tags */}
              <div className="text-xs md:text-sm text-text-dark-secondary space-y-4">
                {project.requirements.split('\n\n').map((para, paraIdx) => {
                  if (para.startsWith('**Objective**:') || para.startsWith('**Scope of Work**:') || para.startsWith('**Deliverables**:')) {
                    return (
                      <h4 key={paraIdx} className="font-manrope font-bold text-sm text-white pt-2">
                        {para.replace(/\*\*/g, '')}
                      </h4>
                    );
                  }
                  
                  if (para.startsWith('> [!WARNING]')) {
                    const cleaned = para.replace('> [!WARNING]', '').replace('> ', '').trim();
                    return (
                      <div key={paraIdx} className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl flex gap-3 text-red-400">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500 mt-0.5" />
                        <div className="text-[11px] leading-relaxed text-left">
                          <span className="font-bold block mb-0.5">Ethical Scope warning</span>
                          {cleaned}
                        </div>
                      </div>
                    );
                  }

                  if (para.startsWith('- ')) {
                    return (
                      <ul key={paraIdx} className="list-disc pl-5 space-y-1">
                        {para.split('\n').map((item, idx) => (
                          <li key={idx}>{item.replace('- ', '')}</li>
                        ))}
                      </ul>
                    );
                  }

                  if (para.startsWith('1. ') || para.startsWith('2. ') || para.startsWith('3. ') || para.startsWith('4. ')) {
                    return (
                      <ul key={paraIdx} className="list-decimal pl-5 space-y-1">
                        {para.split('\n').map((item, idx) => (
                          <li key={idx}>{item.slice(2).trim()}</li>
                        ))}
                      </ul>
                    );
                  }

                  return (
                    <p key={paraIdx} className="leading-relaxed">{para}</p>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Submission portal */}
          {submission ? (
            <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4">
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2">Submission Logs</h3>
              
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">Audit Report PDF:</span>
                  <span className="font-bold text-brand-cyan">{submission.fileUrl.split('/').pop()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">Logged At:</span>
                  <span className="font-semibold text-white">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">Auditing Status:</span>
                  <Badge 
                    variant={submission.status === 'APPROVED' ? 'success' : 'warning'}
                    className="text-[9px] px-2 py-0"
                  >
                    {submission.status}
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs text-text-dark-secondary leading-relaxed">
                <span className="font-bold text-white block mb-1">Assessor Feedback Note</span>
                {submission.status === 'APPROVED' ? (
                  <span className="text-emerald-400">Excellent auditing format. Scan scopes align with legal boundaries. No further edits required.</span>
                ) : (
                  <span>Under review. The auditing assessor will cross-check your scanning outputs and mitigation plans within 48 hours.</span>
                )}
              </div>
            </Card>
          ) : (
            <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2 mb-4">Submit Audit Report</h3>
              
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                
                <div className="border-2 border-dashed border-slate-800 hover:border-brand-cyan/40 rounded-xl p-8 text-center transition-colors relative cursor-pointer bg-slate-900/40">
                  <input 
                    type="file" 
                    accept=".pdf,.zip" 
                    onChange={fileSelected ? undefined : handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    required
                  />
                  <UploadCloud className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                  {fileSelected ? (
                    <div>
                      <span className="text-xs font-bold text-brand-cyan">{fileSelected.name}</span>
                      <span className="text-[10px] text-text-dark-secondary block mt-1">
                        Size: {(fileSelected.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-semibold text-white block">Click to Browse Audit File</span>
                      <span className="text-[10px] text-text-dark-secondary block mt-1">Supports PDF or ZIP folders up to 15MB</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-[10px] text-text-dark-secondary leading-normal flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Demo Simulator: Uploaded documents are cached in browser state memory and will reset upon logging out.
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full flex justify-center items-center py-2.5" 
                  disabled={!fileSelected || isUploading}
                  glow
                >
                  {isUploading ? 'Registering sandbox file...' : 'Submit Portfolio Project'}
                </Button>

              </form>
            </Card>
          )}

        </div>

        {/* RIGHT COLUMN: 40% Metadata Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4">
            <h4 className="font-manrope font-bold text-sm text-white border-b border-slate-800 pb-2">Project Checklist</h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Project Class:</span>
                <span className="font-semibold text-white">{project.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Compliance Bound:</span>
                <span className="font-semibold text-brand-cyan">Defensive Sandbox</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Assessor Review:</span>
                <span className="font-semibold text-white">Manual Audit Log</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
