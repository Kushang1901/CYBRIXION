'use client';

import React from 'react';
import { Shield, FolderOpen, Download, FileText, FileSpreadsheet, Lock } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockResources } from '@/data/mockData';

export default function StudentResourcesPage() {
  const getReadableSize = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Reference Center</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Syllabus Reference Files
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Download PDF checklists, reference guides, and slide presentation PPT files.
        </p>
      </div>

      {/* RESOURCES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockResources.map((res) => (
          <Card 
            key={res.id} 
            variant="dark" 
            className="p-5 border-slate-800 bg-brand-navy flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#101E31] border border-slate-800 flex items-center justify-center text-brand-cyan flex-shrink-0">
                {res.type === 'PDF' ? <FileText className="w-5 h-5" /> : <FileSpreadsheet className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <h3 className="font-manrope font-bold text-sm text-white truncate">{res.title}</h3>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-text-dark-secondary">
                  <span>Format: {res.type}</span>
                  <span>Size: {getReadableSize(res.sizeBytes)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Demo notice: Downloading simulated file...')}
              className="p-2.5 rounded-lg border border-slate-800 hover:border-brand-cyan/40 hover:bg-[#101E31] text-text-dark-secondary hover:text-brand-cyan transition-all cursor-pointer flex-shrink-0"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>

          </Card>
        ))}
      </div>

    </div>
  );
}
