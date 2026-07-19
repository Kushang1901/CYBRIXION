'use client';

import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Shield, 
  User, 
  Mail, 
  FileText, 
  Check, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  Calendar,
  Lock,
  ArrowLeft
} from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { dbService } from '@/services/dbService';
import { mockPrograms } from '@/data/mockData';

const applyFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Provide a valid email address.' }),
  phone: z.string().min(10, { message: 'Provide a valid phone number (min 10 digits).' }),
  city: z.string().min(2, { message: 'City is required.' }),
  college: z.string().min(3, { message: 'College/University name is required.' }),
  degree: z.string().min(2, { message: 'Degree/Field of study is required.' }),
  currentYear: z.string().min(1, { message: 'Select your current academic year.' }),
  experienceLevel: z.string().min(1, { message: 'Select your cybersecurity experience level.' }),
  interestedProgram: z.string().min(1, { message: 'Select your desired internship program.' }),
  interestedSpecialization: z.string().optional(),
  whyJoin: z.string().min(15, { message: 'Provide a brief answer (min 15 characters).' }),
  careerGoal: z.string().min(10, { message: 'Specify your career goals (min 10 characters).' }),
  linkedinUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms of study and ethical scanning bounds.'
  })
});

type ApplyFormValues = z.infer<typeof applyFormSchema>;

function generateId(prefix: string): string {
  return `${prefix}-${Math.floor(Date.now() + Math.random() * 1000000).toString(36)}`;
}

export default function ApplyPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [formData, setFormData] = useState<ApplyFormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<ApplyFormValues>({
    resolver: zodResolver(applyFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      city: '',
      college: '',
      degree: '',
      currentYear: '3rd Year',
      experienceLevel: 'Beginner',
      interestedProgram: 'prog-60-day',
      interestedSpecialization: 'spec-soc',
      whyJoin: '',
      careerGoal: '',
      linkedinUrl: '',
      githubUrl: '',
      termsAccepted: undefined
    }
  });

  // Watch the selected program to show/hide conditional specialization fields
  const watchedProgram = useWatch({
    control,
    name: 'interestedProgram'
  });

  // Fill in default values if query parameters are present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const progParam = urlParams.get('program');
      if (progParam) {
        setValue('interestedProgram', progParam);
      }
    }
  }, [setValue]);

  const onFormSubmit = (data: ApplyFormValues) => {
    setFormData(data);
    setStep(1); // Proceed to Review details
  };

  const proceedToPayment = () => {
    setStep(2); // Proceed to demo Payment placeholder
  };

  const handleEnrollmentComplete = () => {
    if (!formData) return;

    // Create current user session and profile based on application details
    const newUser = {
      id: generateId('usr'),
      email: formData.email,
      name: formData.fullName,
      role: 'STUDENT' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dbService.setCurrentUser(newUser);

    const newProfile = {
      id: generateId('prof'),
      userId: newUser.id,
      phone: formData.phone,
      college: formData.college,
      degree: formData.degree,
      currentYear: formData.currentYear,
      city: formData.city,
      experienceLevel: formData.experienceLevel,
      careerGoal: formData.careerGoal,
      linkedinUrl: formData.linkedinUrl || '',
      githubUrl: formData.githubUrl || '',
      avatarUrl: '/images/avatar-placeholder.png'
    };
    dbService.updateProfile(newProfile);

    // Save enrollment details
    const spec = formData.interestedProgram === 'prog-90-day' ? formData.interestedSpecialization || 'spec-soc' : null;
    dbService.createEnrollment(formData.interestedProgram, spec);

    setStep(3); // Success splash screen
  };

  const selectedProgramObj = mockPrograms.find(p => p.id === (formData?.interestedProgram || watchedProgram));

  return (
    <>
      <Header />
      
      {/* PAGE HERO */}
      <section className="relative pt-[120px] pb-12 bg-[#07111F] text-white bg-grid-pattern border-b border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-brand-cyan/10 rounded-full blur-[90px] pointer-events-none" />
        <Container className="relative z-10 text-center max-w-3xl mx-auto flex flex-col gap-4">
          <Badge variant="cyan" className="w-fit mx-auto">CYBRIXON ADMISSIONS</Badge>
          <h1 className="text-3xl md:text-5xl font-manrope font-extrabold text-white tracking-tight">
            {step === 0 && 'Apply for Internship'}
            {step === 1 && 'Review Application'}
            {step === 2 && 'Enrollment Payment'}
            {step === 3 && 'Registration Complete'}
          </h1>
          <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed max-w-lg mx-auto">
            {step === 0 && 'Provide your academic details and program choice to initiate your admissions checklist.'}
            {step === 1 && 'Verify your inputs carefully prior to simulating cohort registration.'}
            {step === 2 && 'Complete the provider-agnostic sandbox payment placeholder to activate your Student Dashboard.'}
            {step === 3 && 'Your account credentials have been configured successfully. Navigate to your dashboard to begin.'}
          </p>
        </Container>
      </section>

      {/* BODY STEPS CONTROL */}
      <section className="py-16 bg-[#030712] text-white">
        <Container className="max-w-3xl">
          
          {/* Progress Timeline Header */}
          <div className="relative mb-12 flex justify-between items-center max-w-xl mx-auto">
            {/* Background Line */}
            <div className="absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-slate-800 -z-0" />
            {/* Active Progress Fill Line */}
            <div 
              className="absolute top-[18px] left-[5%] h-0.5 bg-gradient-to-r from-brand-cyan to-brand-blue transition-all duration-500 -z-0" 
              style={{ width: `${(step / 3) * 90}%` }}
            />

            {[
              { index: 0, label: 'Application', desc: 'Fill Details' },
              { index: 1, label: 'Review', desc: 'Verify Inputs' },
              { index: 2, label: 'Payment', desc: 'Sandbox Pay' },
              { index: 3, label: 'Success', desc: 'Dashboard Access' }
            ].map((s) => {
              const isActive = step === s.index;
              const isCompleted = step > s.index;
              
              return (
                <div key={s.index} className="flex flex-col items-center relative z-10">
                  <div 
                    className={`w-9 h-9 rounded-full font-manrope font-extrabold text-xs flex items-center justify-center transition-all duration-500 border ${
                      isCompleted
                        ? 'bg-brand-cyan border-brand-cyan text-brand-dark shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                        : isActive
                        ? 'bg-[#0B1524] border-brand-cyan text-brand-cyan shadow-[0_0_15px_rgba(34,211,238,0.25)]'
                        : 'bg-slate-950 border-slate-800 text-slate-500'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-black stroke-[3px]" />
                    ) : (
                      <span>{s.index + 1}</span>
                    )}
                  </div>
                  <span 
                    className={`font-manrope text-[11px] font-bold tracking-wide mt-2.5 transition-colors ${
                      isActive || isCompleted ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {s.label}
                  </span>
                  <span className="hidden sm:inline font-mono text-[9px] text-slate-600 uppercase tracking-wider mt-0.5">
                    {s.desc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 0: FORM INPUTS */}
          {step === 0 && (
            <Card variant="dark" className="p-8 border border-slate-800/80 bg-brand-navy shadow-md">
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <h3 className="font-manrope font-bold text-lg text-white mb-4 pb-2 border-b border-slate-800">Personal Information</h3>
                
                {/* Full name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aarav Sharma"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('fullName')}
                    />
                    {errors.fullName && <span className="text-[10px] text-error font-medium">{errors.fullName.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. aarav.sharma@gmail.com"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('email')}
                    />
                    {errors.email && <span className="text-[10px] text-error font-medium">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9876543210"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('phone')}
                    />
                    {errors.phone && <span className="text-[10px] text-error font-medium">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">City of Residence *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. New Delhi"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('city')}
                    />
                    {errors.city && <span className="text-[10px] text-error font-medium">{errors.city.message}</span>}
                  </div>
                </div>

                <h3 className="font-manrope font-bold text-lg text-white mb-4 pt-4 pb-2 border-b border-slate-800">Academic Background</h3>
                
                {/* College & Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">College / University *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. NIT Delhi"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('college')}
                    />
                    {errors.college && <span className="text-[10px] text-error font-medium">{errors.college.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Degree & Major *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech Computer Science"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('degree')}
                    />
                    {errors.degree && <span className="text-[10px] text-error font-medium">{errors.degree.message}</span>}
                  </div>
                </div>

                {/* Academic Year & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Current Year *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-brand-cyan/60 transition-all cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      {...register('currentYear')}
                    >
                      <option value="1st Year" className="bg-[#0B1524] text-white">1st Year</option>
                      <option value="2nd Year" className="bg-[#0B1524] text-white">2nd Year</option>
                      <option value="3rd Year" className="bg-[#0B1524] text-white">3rd Year</option>
                      <option value="4th Year" className="bg-[#0B1524] text-white">4th Year</option>
                      <option value="Graduated" className="bg-[#0B1524] text-white">Graduated</option>
                      <option value="Other" className="bg-[#0B1524] text-white">Other</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Cybersecurity Experience *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-brand-cyan/60 transition-all cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      {...register('experienceLevel')}
                    >
                      <option value="Beginner" className="bg-[#0B1524] text-white">Beginner (Concept familiarity)</option>
                      <option value="Intermediate" className="bg-[#0B1524] text-white">Intermediate (Used Linux/ports)</option>
                      <option value="Advanced" className="bg-[#0B1524] text-white">Advanced (Practical pentest experience)</option>
                    </select>
                  </div>
                </div>

                <h3 className="font-manrope font-bold text-lg text-white mb-4 pt-4 pb-2 border-b border-slate-800">Program & Motivation</h3>

                {/* Program selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Interested Program *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-brand-cyan/60 transition-all cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                      {...register('interestedProgram')}
                    >
                      {mockPrograms.map(p => (
                        <option key={p.id} value={p.id} className="bg-[#0B1524] text-white">{p.title} ({p.durationDays} Days)</option>
                      ))}
                    </select>
                  </div>

                  {/* CONDITIONAL SPECIALIZATION FOR 90-DAY */}
                  {watchedProgram === 'prog-90-day' && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-cyan uppercase tracking-wide">Target Specialization *</label>
                      <select 
                        className="px-4 py-2.5 bg-slate-950 border border-brand-cyan/35 rounded-lg text-xs md:text-sm text-white focus:outline-none focus:border-brand-cyan/60 transition-all cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                        {...register('interestedSpecialization')}
                      >
                        <option value="spec-soc" className="bg-[#0B1524] text-white">SOC Analyst Track</option>
                        <option value="spec-vapt" className="bg-[#0B1524] text-white">VAPT Track</option>
                        <option value="spec-grc" className="bg-[#0B1524] text-white">GRC Track</option>
                        <option value="not-sure" className="bg-[#0B1524] text-white">Not Sure / Decide Later</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Motivations */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Why do you want to join this program? *</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe your learning expectations and motivation..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all resize-y"
                    {...register('whyJoin')}
                  />
                  {errors.whyJoin && <span className="text-[10px] text-error font-medium">{errors.whyJoin.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Describe your Career Goals *</label>
                  <textarea 
                    rows={2}
                    placeholder="Specify targeted roles (e.g. SOC Analyst, Pentester, Security Operations)..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all resize-y"
                    {...register('careerGoal')}
                  />
                  {errors.careerGoal && <span className="text-[10px] text-error font-medium">{errors.careerGoal.message}</span>}
                </div>

                {/* Socials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">LinkedIn Profile URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://linkedin.com/in/username"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('linkedinUrl')}
                    />
                    {errors.linkedinUrl && <span className="text-[10px] text-error font-medium">{errors.linkedinUrl.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">GitHub Profile URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://github.com/username"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs md:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/60 transition-all"
                      {...register('githubUrl')}
                    />
                    {errors.githubUrl && <span className="text-[10px] text-error font-medium">{errors.githubUrl.message}</span>}
                  </div>
                </div>

                {/* Terms accepted */}
                <div className="pt-4 border-t border-slate-800 flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <input 
                      id="termsAccepted" 
                      type="checkbox" 
                      className="w-4 h-4 mt-0.5 cursor-pointer accent-brand-cyan"
                      {...register('termsAccepted')}
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-text-dark-secondary leading-normal">
                      I agree to the terms of study. I understand that CYBRIXON does not provide official university degrees. I commit to legal scanning bounds and agree to only conduct security exercises in authorized environments. *
                    </label>
                  </div>
                  {errors.termsAccepted && <span className="text-[10px] text-error font-medium">{errors.termsAccepted.message}</span>}
                </div>

                <Button type="submit" variant="primary" className="w-full flex justify-center items-center" glow>
                  Submit Application Details
                  <ChevronRight className="w-4.5 h-4.5" />
                </Button>

              </form>
            </Card>
          )}

          {/* STEP 1: REVIEW DETAILS */}
          {step === 1 && formData && (
            <Card variant="dark" className="p-8 border border-slate-800 bg-brand-navy shadow-md space-y-6">
              <h3 className="font-manrope font-bold text-lg text-white pb-2 border-b border-slate-800">Review Application Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs md:text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Candidate Name</span>
                  <span className="font-semibold text-white">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Email Address</span>
                  <span className="font-semibold text-white">{formData.email}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Phone Number</span>
                  <span className="font-semibold text-white">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">City</span>
                  <span className="font-semibold text-white">{formData.city}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">College / University</span>
                  <span className="font-semibold text-white">{formData.college}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Degree / Major</span>
                  <span className="font-semibold text-white">{formData.degree} ({formData.currentYear})</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Selected Program</span>
                  <span className="font-semibold text-brand-cyan">{selectedProgramObj?.title} ({selectedProgramObj?.durationDays} Days)</span>
                </div>
                {formData.interestedProgram === 'prog-90-day' && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Specialization Track</span>
                    <span className="font-semibold text-brand-violet">
                      {formData.interestedSpecialization === 'spec-soc' && 'SOC Analyst Track'}
                      {formData.interestedSpecialization === 'spec-vapt' && 'VAPT Track'}
                      {formData.interestedSpecialization === 'spec-grc' && 'GRC Track'}
                      {formData.interestedSpecialization === 'not-sure' && 'To Be Decided'}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-4">
                <button 
                  onClick={() => setStep(0)} 
                  className="w-1/2 py-2.5 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-900 transition-all flex items-center justify-center gap-1.5 text-text-dark-secondary cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Edit Form
                </button>
                <button 
                  onClick={proceedToPayment} 
                  className="w-1/2 py-2.5 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Proceed to Payment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          )}

          {/* STEP 2: DEMO PAYMENT GATEWAY */}
          {step === 2 && formData && (
            <Card variant="dark" className="p-8 border border-slate-800 bg-brand-navy shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <CreditCard className="w-6 h-6 text-brand-cyan" />
                <h3 className="font-manrope font-bold text-lg text-white">CYBRIXION Enrollment Sandbox</h3>
              </div>

              <div className="p-4 bg-[#101E31]/80 border border-brand-cyan/20 rounded-xl text-brand-cyan space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider block">Demo Sandbox Simulator</span>
                <p className="text-[11px] leading-relaxed">
                  This gateway is provider-agnostic and sandbox-ready. No actual payment provider is linked. Clicking "Complete Registration" will record an active enrollment and initialize your credentials in local storage.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs md:text-sm py-2 border-b border-slate-800">
                  <span className="text-text-dark-secondary">Selected Internship:</span>
                  <span className="font-semibold text-white">{selectedProgramObj?.title}</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm py-2 border-b border-slate-800">
                  <span className="text-text-dark-secondary">Program Tuition Fees:</span>
                  <span className="font-bold text-white">Demo / Free Sandbox</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm py-2">
                  <span className="text-text-dark-secondary font-bold">Total Fees:</span>
                  <span className="font-extrabold text-sm text-brand-cyan">$0.00</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex gap-4">
                <button 
                  onClick={() => setStep(1)} 
                  className="w-1/2 py-2.5 border border-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-900 transition-all flex items-center justify-center gap-1.5 text-text-dark-secondary cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Review Details
                </button>
                <button 
                  onClick={handleEnrollmentComplete} 
                  className="w-1/2 py-2.5 bg-brand-blue text-white rounded-lg text-xs font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(59,130,246,0.3)] cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Complete Registration
                </button>
              </div>
            </Card>
          )}

          {/* STEP 3: SUCCESS STATE SPLASH */}
          {step === 3 && formData && (
            <Card variant="dark" className="p-8 border border-slate-800 shadow-xl text-center space-y-6 bg-brand-navy">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <Badge variant="success">ACTIVE ENROLLMENT</Badge>
                  <h3 className="font-manrope font-extrabold text-2xl text-white mt-2 tracking-tight">
                    Registration Completed Successfully
                  </h3>
                  <p className="text-xs md:text-sm text-text-dark-secondary max-w-sm mx-auto mt-2 leading-relaxed">
                    Welcome to CYBRIXON, {formData.fullName}. Your student profile has been created and your active credentials logged in the sandbox.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3 max-w-md mx-auto text-left text-xs text-text-dark-primary">
                <div className="flex justify-between">
                  <span className="text-text-dark-secondary">Student Name:</span>
                  <span className="font-semibold text-white">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark-secondary">Enrollment Program:</span>
                  <span className="font-semibold text-brand-cyan">{selectedProgramObj?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-dark-secondary">Credentials Setup:</span>
                  <span className="font-semibold text-emerald-500">Logged In automatically</span>
                </div>
              </div>

              <div className="pt-4 max-w-md mx-auto">
                <Button href="/dashboard" variant="primary" className="w-full flex justify-center items-center" glow>
                  Go to Student Dashboard
                  <ChevronRight className="w-4.5 h-4.5" />
                </Button>
              </div>
            </Card>
          )}

        </Container>
      </section>

      <Footer />
    </>
  );
}
