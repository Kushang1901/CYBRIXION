'use client';

import React, { useState } from 'react';
import { Shield, Bell, Lock, User, Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

export default function SettingsPage() {
  const [isSaved, setIsSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  // Notification configs
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyWebinar, setNotifyWebinar] = useState(true);
  const [notifyReview, setNotifyReview] = useState(true);

  // Privacy configs
  const [showProfilePublic, setShowProfilePublic] = useState(false);
  const [shareProgressLeaderboard, setShareProgressLeaderboard] = useState(true);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    alert('Demo sandbox: Password trigger simulated successfully. Local session remains cached.');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div>
        <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Portal Preferences</span>
        <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
          Portal Settings
        </h1>
        <p className="text-xs text-text-dark-secondary">
          Configure notification alerts, passwords, and privacy configurations.
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Preference configurations saved in sandbox database.</span>
        </div>
      )}

      {/* SETTINGS MODULES CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Preferences Forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Notifications & Privacy Form */}
          <Card variant="dark" className="p-6 md:p-8 border-slate-800 bg-brand-navy">
            <form onSubmit={handleSavePreferences} className="space-y-6">
              
              {/* Notification Toggles */}
              <div>
                <h3 className="font-manrope font-bold text-base text-white border-b border-slate-850 pb-2 mb-4 flex items-center gap-2">
                  <Bell className="w-4.5 h-4.5 text-brand-cyan" />
                  Notification Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs md:text-sm">
                    <div>
                      <span className="font-semibold text-white block">Email Alerts</span>
                      <span className="text-xs text-text-dark-secondary">Receive daily module schedules and report grading alerts.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifyEmail} 
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                      className="w-5 h-5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 text-xs md:text-sm border-t border-slate-850 pt-4">
                    <div>
                      <span className="font-semibold text-white block">Live Session Reminders</span>
                      <span className="text-xs text-text-dark-secondary">Email reminders 1 hour before scheduled webinars start.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifyWebinar} 
                      onChange={(e) => setNotifyWebinar(e.target.checked)}
                      className="w-5 h-5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 text-xs md:text-sm border-t border-slate-850 pt-4">
                    <div>
                      <span className="font-semibold text-white block">Assessor Review Logs</span>
                      <span className="text-xs text-text-dark-secondary">Instant alerts when an assessor registers comments on your reports.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifyReview} 
                      onChange={(e) => setNotifyReview(e.target.checked)}
                      className="w-5 h-5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Toggles */}
              <div className="pt-4 border-t border-slate-850">
                <h3 className="font-manrope font-bold text-base text-white pb-2 mb-4 flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-brand-cyan" />
                  Privacy Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 text-xs md:text-sm">
                    <div>
                      <span className="font-semibold text-white block">Public Profile Verification</span>
                      <span className="text-xs text-text-dark-secondary">Allow third-parties to view your college major details on certificate lookups.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={showProfilePublic} 
                      onChange={(e) => setShowProfilePublic(e.target.checked)}
                      className="w-5 h-5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-4 text-xs md:text-sm border-t border-slate-850 pt-4">
                    <div>
                      <span className="font-semibold text-white block">Syllabus Completion Leaderboard</span>
                      <span className="text-xs text-text-dark-secondary">Share your module progress percentages on cohort leaderboard listings.</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={shareProgressLeaderboard} 
                      onChange={(e) => setShareProgressLeaderboard(e.target.checked)}
                      className="w-5 h-5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-850 flex justify-end">
                <Button type="submit" variant="primary" glow>
                  Save Preferences
                </Button>
              </div>

            </form>
          </Card>

        </div>

        {/* RIGHT COLUMN: Password resets */}
        <div className="lg:col-span-4">
          <Card variant="dark" className="p-6 border-slate-800 bg-brand-navy">
            <h3 className="font-manrope font-bold text-base text-white border-b border-slate-850 pb-2 mb-4 flex items-center gap-2">
              <Lock className="w-4.5 h-4.5 text-brand-cyan" />
              Change Password
            </h3>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Current Password</label>
                <input 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  required
                />
              </div>

              <Button type="submit" variant="outline" className="w-full mt-2">
                Update Password
              </Button>
            </form>
          </Card>
        </div>

      </div>

    </div>
  );
}
