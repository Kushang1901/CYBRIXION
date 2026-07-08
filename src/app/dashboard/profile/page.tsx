'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User as UserIcon, Mail, Phone, BookOpen, MapPin, CheckCircle2, UserCheck } from 'lucide-react';

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { dbService } from '@/services/dbService';
import { User, Profile } from '@/types';

const profileFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  phone: z.string().min(10, { message: 'Phone must be at least 10 digits.' }),
  college: z.string().min(3, { message: 'College name is required.' }),
  degree: z.string().min(2, { message: 'Degree field is required.' }),
  currentYear: z.string().min(1, { message: 'Academic year is required.' }),
  city: z.string().min(2, { message: 'City location is required.' }),
  experienceLevel: z.string().min(1, { message: 'Select your experience level.' }),
  careerGoal: z.string().min(5, { message: 'Specify your career goals.' }),
  linkedinUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema)
  });

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (!user) return;
    setCurrentUser(user);

    const prof = dbService.getProfile(user.id);
    if (prof) {
      setProfile(prof);

      // Pre-fill form fields
      setValue('name', user.name);
      setValue('phone', prof.phone || '');
      setValue('college', prof.college || '');
      setValue('degree', prof.degree || '');
      setValue('currentYear', prof.currentYear || '3rd Year');
      setValue('city', prof.city || '');
      setValue('experienceLevel', prof.experienceLevel || 'Beginner');
      setValue('careerGoal', prof.careerGoal || '');
      setValue('linkedinUrl', prof.linkedinUrl || '');
      setValue('githubUrl', prof.githubUrl || '');
    }
  }, [setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!currentUser || !profile) return;
    
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Update session
    const updatedUser = {
      ...currentUser,
      name: data.name
    };
    dbService.setCurrentUser(updatedUser);
    setCurrentUser(updatedUser);

    // Update profile
    const updatedProfile = {
      ...profile,
      phone: data.phone,
      college: data.college,
      degree: data.degree,
      currentYear: data.currentYear,
      city: data.city,
      experienceLevel: data.experienceLevel,
      careerGoal: data.careerGoal,
      linkedinUrl: data.linkedinUrl || '',
      githubUrl: data.githubUrl || ''
    };
    dbService.updateProfile(updatedProfile);
    setProfile(updatedProfile);

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!currentUser || !profile) return null;

  return (
    <div className="space-y-6">
      
      {/* HEADER TITLE */}
      <div className="flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-brand-cyan uppercase tracking-widest block">Account Settings</span>
          <h1 className="text-2xl md:text-3xl font-manrope font-extrabold text-white tracking-tight">
            Student Profile
          </h1>
          <p className="text-xs text-text-dark-secondary">
            Manage your personal academic details and external professional links.
          </p>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Profile changes updated successfully.</span>
        </div>
      )}

      {/* PROFILE FORM */}
      <Card variant="dark" className="p-6 md:p-8 border-slate-800 bg-brand-navy">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <h3 className="font-manrope font-bold text-base text-white border-b border-slate-850 pb-2 mb-4">Contact Info</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Full Name *</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('name')}
                />
              </div>
              {errors.name && <span className="text-[10px] text-error font-medium">{errors.name.message}</span>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('phone')}
                />
              </div>
              {errors.phone && <span className="text-[10px] text-error font-medium">{errors.phone.message}</span>}
            </div>
          </div>

          <h3 className="font-manrope font-bold text-base text-white border-b border-slate-850 pb-2 mb-4 pt-4">Academic & Career Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* College */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">College / University *</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('college')}
                />
              </div>
              {errors.college && <span className="text-[10px] text-error font-medium">{errors.college.message}</span>}
            </div>

            {/* Degree */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Degree & Major *</label>
              <input 
                type="text"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                {...register('degree')}
              />
              {errors.degree && <span className="text-[10px] text-error font-medium">{errors.degree.message}</span>}
            </div>

            {/* Year */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Academic Year *</label>
              <select 
                className="w-full px-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                {...register('currentYear')}
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
                <option value="Graduated">Graduated</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">City Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('city')}
                />
              </div>
              {errors.city && <span className="text-[10px] text-error font-medium">{errors.city.message}</span>}
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Experience Level *</label>
              <select 
                className="w-full px-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                {...register('experienceLevel')}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Career Goals */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Career Target Interest *</label>
              <input 
                type="text"
                placeholder="e.g. SOC Analyst"
                className="w-full px-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                {...register('careerGoal')}
              />
              {errors.careerGoal && <span className="text-[10px] text-error font-medium">{errors.careerGoal.message}</span>}
            </div>
          </div>

          <h3 className="font-manrope font-bold text-base text-white border-b border-slate-850 pb-2 mb-4 pt-4">Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LinkedIn */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">LinkedIn Profile URL</label>
              <div className="relative">
                <LinkedinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('linkedinUrl')}
                />
              </div>
              {errors.linkedinUrl && <span className="text-[10px] text-error font-medium">{errors.linkedinUrl.message}</span>}
            </div>

            {/* GitHub */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">GitHub Profile URL</label>
              <div className="relative">
                <GithubIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text"
                  placeholder="https://github.com/username"
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-850 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('githubUrl')}
                />
              </div>
              {errors.githubUrl && <span className="text-[10px] text-error font-medium">{errors.githubUrl.message}</span>}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 flex justify-end">
            <Button 
              type="submit" 
              variant="primary" 
              className="px-6 py-2" 
              disabled={isSubmitting}
              glow
            >
              {isSubmitting ? 'Saving changes...' : 'Save Profile'}
            </Button>
          </div>

        </form>
      </Card>

    </div>
  );
}
