'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Shield, 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Calendar, 
  FolderOpen, 
  Award, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell,
  Activity,
  Briefcase
} from 'lucide-react';
import { dbService } from '@/services/dbService';
import { User as UserType } from '@/types';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) {
      router.push('/login');
    } else {
      const enrollment = dbService.getEnrollment(user.id);
      if (!enrollment) {
        router.push('/apply');
      } else {
        setCurrentUser(user);
      }
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    dbService.logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Shield className="w-10 h-10 text-brand-cyan animate-pulse" />
          <span className="text-xs font-semibold text-text-dark-secondary">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  const sidebarLinks = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Internship', href: '/dashboard/internship', icon: Briefcase },
    { label: 'Learning Modules', href: '/dashboard/learning', icon: BookOpen },
    { label: 'Assignments', href: '/dashboard/assignments', icon: FileText },
    { label: 'Projects', href: '/dashboard/projects', icon: TrendingUp },
    { label: 'Live Sessions', href: '/dashboard/live-sessions', icon: Calendar },
    { label: 'Study Resources', href: '/dashboard/resources', icon: FolderOpen },
    { label: 'Progress Metrics', href: '/dashboard/progress', icon: Activity },
    { label: 'Certificate', href: '/dashboard/certificate', icon: Award },
    { label: 'Student Profile', href: '/dashboard/profile', icon: User },
    { label: 'Portal Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex font-inter">
      
      {/* SIDEBAR - DESKTOP */}
      <aside 
        className={`hidden lg:flex flex-col justify-between bg-brand-dark border-r border-slate-800 transition-all duration-300 ${
          sidebarCollapsed ? 'w-[76px]' : 'w-[260px]'
        } shrink-0`}
      >
        <div>
          {/* Sidebar Brand Header */}
          <div className="h-[76px] px-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Shield className="w-6 h-6 text-brand-cyan" />
              {!sidebarCollapsed && (
                <span className="font-manrope font-extrabold text-lg text-white">
                  CYB<span className="text-brand-cyan">RIXON</span>
                </span>
              )}
            </Link>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </button>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-1.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    active 
                      ? 'bg-brand-blue text-white shadow-[0_4px_12px_rgba(59,130,246,0.25)]' 
                      : 'text-text-dark-secondary hover:text-white hover:bg-brand-elevated'
                  }`}
                  title={sidebarCollapsed ? link.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{link.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-xs md:text-sm font-semibold text-error hover:bg-red-500/10 transition-all cursor-pointer"
            title={sidebarCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* WORKSPACE HEADER */}
        <header className="h-[76px] bg-brand-dark border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
          
          {/* Left info: Mobile toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h2 className="font-manrope font-bold text-sm text-text-dark-primary">Student Workspace</h2>
              <span className="text-[10px] text-text-dark-secondary">CYBRIXON Technical Intern Portal v1.0</span>
            </div>
          </div>

          {/* Right actions: Notifications & User profile quick link */}
          <div className="flex items-center gap-4 relative">
            
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 rounded-lg border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white relative cursor-pointer"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand-cyan rounded-full animate-pulse" />
              </button>
              
              {notificationOpen && (
                <>
                  <div className="absolute right-0 mt-3 w-72 bg-brand-navy border border-slate-800 rounded-xl shadow-2xl p-4 z-50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-cyan block mb-2">Announcements</span>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-white">Nmap Practical session updated</h4>
                        <p className="text-[10px] text-text-dark-secondary mt-0.5 leading-normal">
                          Live laboratory session scheduled for July 10 at 3:00 PM IST.
                        </p>
                      </div>
                      <div className="border-t border-slate-800 pt-2">
                        <h4 className="text-xs font-semibold text-white">Maintenance notice</h4>
                        <p className="text-[10px] text-text-dark-secondary mt-0.5 leading-normal">
                          System upgrades scheduled for July 12 from 2:00 AM - 4:00 AM IST.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fixed inset-0 z-40" onClick={() => setNotificationOpen(false)} />
                </>
              )}
            </div>

            {/* Profile widget */}
            <Link 
              href="/dashboard/profile"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-full bg-[#101E31] border border-slate-800 flex items-center justify-center font-manrope font-bold text-xs text-brand-cyan">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">{currentUser.name}</span>
                <span className="text-[9px] text-brand-cyan leading-none">Cohort Candidate</span>
              </div>
            </Link>

          </div>

        </header>

        {/* WORKSPACE CONTENT BODY */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-900 bg-dot-pattern">
          {children}
        </main>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-brand-dark border-r border-slate-800 shadow-2xl z-50 p-6 flex flex-col justify-between lg:hidden animate-slide-in">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="w-5 h-5 text-brand-cyan" />
                  <span className="font-manrope font-extrabold text-base text-white">
                    CYB<span className="text-brand-cyan">RIXON</span>
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                        active 
                          ? 'bg-brand-blue text-white shadow' 
                          : 'text-text-dark-secondary hover:text-white hover:bg-brand-elevated'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-error hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <LogOut className="w-4.5 h-4.5" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

// Minimal icons for chevron triggers
function ChevronLeftIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
