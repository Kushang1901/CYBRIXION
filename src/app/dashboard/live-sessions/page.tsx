'use client';

import React from 'react';
import { Shield, Calendar, Clock, Video, UserCheck, ExternalLink } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { mockLiveSessions } from '@/data/mockData';

export default function LiveSessionsPage() {
  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Cohort Schedule</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Scheduled Live Sessions
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Join scheduled technical Q&A doubt webinars and resume review panels with security assessors.
        </p>
      </div>

      {/* MEETINGS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockLiveSessions.map((session) => (
          <Card 
            key={session.id} 
            variant="dark" 
            className="p-6 border-slate-800 bg-brand-navy flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <Badge variant={session.status === 'LIVE' ? 'error' : 'cyan'} className="text-[9px] px-2 py-0.5 animate-pulse">
                  {session.status}
                </Badge>
                
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Web Meeting</span>
              </div>

              <div>
                <h3 className="font-manrope font-bold text-sm md:text-base text-white">{session.title}</h3>
                <div className="space-y-1.5 mt-3 text-xs text-text-dark-secondary">
                  <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4 text-brand-cyan" /> {session.instructor}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-cyan" /> July 10, 2026</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-cyan" /> 3:00 PM IST (60 mins)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850 mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={session.joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-2 bg-brand-cyan hover:bg-white text-brand-dark rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Video className="w-3.5 h-3.5 fill-current" />
                Join Meeting
              </a>
              <button
                className="w-full sm:w-1/2 py-2 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-text-dark-secondary hover:text-white rounded-lg text-center flex items-center justify-center gap-1.5 transition-all cursor-default"
                title="Add to Google Calendar placeholder"
              >
                Add to Calendar
              </button>
            </div>

          </Card>
        ))}
      </div>

    </div>
  );
}
