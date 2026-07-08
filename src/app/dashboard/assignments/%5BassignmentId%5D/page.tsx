'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, notFound } from 'next/navigation';
import { 
  Shield, 
  ArrowLeft, 
  FileText, 
  Calendar, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Download
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { dbService } from '@/services/dbService';
import { mockAssignments } from '@/data/mockData';
import { User, Enrollment, Assignment, AssignmentSubmission } from '@/types';

interface PageProps {
  params: Promise<{ assignmentId: string }>;
}

export default function AssignmentDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { assignmentId } = React.use(params);

  const [student, setStudent] = useState<User | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submission, setSubmission] = useState<AssignmentSubmission | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setStudent(user);

    const asg = mockAssignments.find(a => a.id === assignmentId);
    if (!asg) {
      notFound();
    }
    setAssignment(asg);

    const subs = dbService.getAssignmentSubmissions(user.id);
    const sub = subs.find(s => s.assignmentId === assignmentId);
    if (sub) {
      setSubmission(sub);
    }
  }, [assignmentId]);

  if (!student || !assignment) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0]);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileSelected) return;

    setIsUploading(true);
    // Simulate network upload
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const mockFileUrl = `/uploads/${fileSelected.name.replace(/\s+/g, '_')}`;
    const newSub = dbService.submitAssignment(student.id, assignment.id, mockFileUrl);
    
    setSubmission(newSub);
    setFileSelected(null);
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TOP BAR */}
      <div className="flex items-center gap-3">
        <Link 
          href="/dashboard/assignments"
          className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5" />
        </Link>
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Worksheet Detail</span>
          <h1 className="text-xl md:text-2xl font-manrope font-extrabold text-white tracking-tight">
            {assignment.title}
          </h1>
        </div>
      </div>

      {/* BODY CONFIG SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: 60% Instructions */}
        <div className="lg:col-span-8 space-y-6">
          <Card variant="dark" className="p-6 md:p-8 border-slate-800 bg-brand-navy space-y-5">
            <div>
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2 mb-3">Task Instructions</h3>
              <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed">
                {assignment.instruction}
              </p>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
              <span className="font-bold text-brand-cyan uppercase tracking-wider block">Submission Criteria</span>
              <ul className="list-disc pl-5 space-y-1.5 text-text-dark-secondary">
                <li>Allowed file formats: <strong className="text-white">PDF, ZIP</strong></li>
                <li>Maximum file size threshold: <strong className="text-white">10MB</strong></li>
                <li>Late submissions will automatically be flagged for partial grading.</li>
              </ul>
            </div>
          </Card>

          {/* Submission history / Upload form */}
          {submission ? (
            <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4">
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2">Submission History</h3>
              
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">File Submitted:</span>
                  <a href="#" className="text-brand-cyan hover:underline flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {submission.fileUrl.split('/').pop()}
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">Submitted At:</span>
                  <span className="font-semibold text-white">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-dark-secondary">Evaluation Status:</span>
                  <Badge 
                    variant={
                      submission.status === 'GRADED' ? 'success' : 
                      submission.status === 'UNDER_REVIEW' ? 'warning' : 'primary'
                    }
                    className="text-[9px] px-2 py-0"
                  >
                    {submission.status}
                  </Badge>
                </div>
              </div>

              {submission.status === 'GRADED' && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-4.5 h-4.5" /> Instructor Evaluation
                    </span>
                    <span className="font-bold text-emerald-500">{submission.points} / {assignment.maxPoints} Points</span>
                  </div>
                  <p className="text-xs text-text-dark-secondary leading-relaxed">
                    {submission.feedback}
                  </p>
                </div>
              )}
            </Card>
          ) : (
            <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
              <h3 className="font-manrope font-bold text-base text-white border-b border-slate-800 pb-2 mb-4">Submit Assignment</h3>
              
              <form onSubmit={handleUploadSubmit} className="space-y-4">
                
                <div className="border-2 border-dashed border-slate-800 hover:border-brand-cyan/40 rounded-xl p-8 text-center transition-colors relative cursor-pointer bg-slate-900/40">
                  <input 
                    type="file" 
                    accept=".pdf,.zip" 
                    onChange={handleFileChange}
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
                      <span className="text-xs font-semibold text-white block">Click to Browse File</span>
                      <span className="text-[10px] text-text-dark-secondary block mt-1">Supports PDF or ZIP folders up to 10MB</span>
                    </div>
                  )}
                </div>

                <div className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-[10px] text-text-dark-secondary leading-normal flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  Demo Simulator: File attachments are cached in local browser memory and will not be transferred to a cloud storage server.
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full flex justify-center items-center py-2.5" 
                  disabled={!fileSelected || isUploading}
                  glow
                >
                  {isUploading ? 'Uploading sandbox file...' : 'Upload Worksheets'}
                </Button>

              </form>
            </Card>
          )}
        </div>

        {/* RIGHT COLUMN: 40% Metadata Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy space-y-4">
            <h4 className="font-manrope font-bold text-sm text-white border-b border-slate-800 pb-2">Worksheet Metrics</h4>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Maximum Points:</span>
                <span className="font-semibold text-white">{assignment.maxPoints} Points</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Deadline Date:</span>
                <span className="font-semibold text-white">
                  {assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dark-secondary">Associated Module:</span>
                <span className="font-semibold text-brand-cyan">Week 1 / foundations</span>
              </div>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
