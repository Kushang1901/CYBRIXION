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
      <section className="py-16 bg-white">
        <Container className="max-w-3xl">
          
          {/* Progress Timeline Header */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-6 mb-10 text-xs md:text-sm font-semibold">
            <span className={step >= 0 ? 'text-brand-blue' : 'text-slate-400'}>1. Application</span>
            <ChevronRight className="w-4 h-4 text-slate-350" />
            <span className={step >= 1 ? 'text-brand-blue' : 'text-slate-400'}>2. Review</span>
            <ChevronRight className="w-4 h-4 text-slate-350" />
            <span className={step >= 2 ? 'text-brand-blue' : 'text-slate-400'}>3. Payment</span>
            <ChevronRight className="w-4 h-4 text-slate-350" />
            <span className={step === 3 ? 'text-brand-blue' : 'text-slate-400'}>4. Success</span>
          </div>

          {/* STEP 0: FORM INPUTS */}
          {step === 0 && (
            <Card variant="light" className="p-8 border border-slate-200 shadow-md">
              <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <h3 className="font-manrope font-bold text-lg text-brand-dark mb-4 pb-2 border-b border-slate-100">Personal Information</h3>
                
                {/* Full name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Aarav Sharma"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('fullName')}
                    />
                    {errors.fullName && <span className="text-[10px] text-error font-medium">{errors.fullName.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address *</label>
                    <input 
                      type="email" 
                      placeholder="e.g. aarav.sharma@gmail.com"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('email')}
                    />
                    {errors.email && <span className="text-[10px] text-error font-medium">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Phone & City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="e.g. 9876543210"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('phone')}
                    />
                    {errors.phone && <span className="text-[10px] text-error font-medium">{errors.phone.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">City of Residence *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. New Delhi"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('city')}
                    />
                    {errors.city && <span className="text-[10px] text-error font-medium">{errors.city.message}</span>}
                  </div>
                </div>

                <h3 className="font-manrope font-bold text-lg text-brand-dark mb-4 pt-4 pb-2 border-b border-slate-100">Academic Background</h3>
                
                {/* College & Degree */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">College / University *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. NIT Delhi"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('college')}
                    />
                    {errors.college && <span className="text-[10px] text-error font-medium">{errors.college.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Degree & Major *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. B.Tech Computer Science"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('degree')}
                    />
                    {errors.degree && <span className="text-[10px] text-error font-medium">{errors.degree.message}</span>}
                  </div>
                </div>

                {/* Academic Year & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Current Year *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
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

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Cybersecurity Experience *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('experienceLevel')}
                    >
                      <option value="Beginner">Beginner (Concept familiarity)</option>
                      <option value="Intermediate">Intermediate (Used Linux/ports)</option>
                      <option value="Advanced">Advanced (Practical pentest experience)</option>
                    </select>
                  </div>
                </div>

                <h3 className="font-manrope font-bold text-lg text-brand-dark mb-4 pt-4 pb-2 border-b border-slate-100">Program & Motivation</h3>

                {/* Program selector */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Interested Program *</label>
                    <select 
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('interestedProgram')}
                    >
                      {mockPrograms.map(p => (
                        <option key={p.id} value={p.id}>{p.title} ({p.durationDays} Days)</option>
                      ))}
                    </select>
                  </div>

                  {/* CONDITIONAL SPECIALIZATION FOR 90-DAY */}
                  {watchedProgram === 'prog-90-day' && (
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-blue uppercase tracking-wide">Target Specialization *</label>
                      <select 
                        className="px-4 py-2.5 bg-slate-50 border border-brand-blue/35 rounded-lg text-xs md:text-sm"
                        {...register('interestedSpecialization')}
                      >
                        <option value="spec-soc">SOC Analyst Track</option>
                        <option value="spec-vapt">VAPT Track</option>
                        <option value="spec-grc">GRC Track</option>
                        <option value="not-sure">Not Sure / Decide Later</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Motivations */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Why do you want to join this program? *</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe your learning expectations and motivation..."
                    className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm resize-y"
                    {...register('whyJoin')}
                  />
                  {errors.whyJoin && <span className="text-[10px] text-error font-medium">{errors.whyJoin.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Describe your Career Goals *</label>
                  <textarea 
                    rows={2}
                    placeholder="Specify targeted roles (e.g. SOC Analyst, Pentester, Security Operations)..."
                    className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm resize-y"
                    {...register('careerGoal')}
                  />
                  {errors.careerGoal && <span className="text-[10px] text-error font-medium">{errors.careerGoal.message}</span>}
                </div>

                {/* Socials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">LinkedIn Profile URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://linkedin.com/in/username"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('linkedinUrl')}
                    />
                    {errors.linkedinUrl && <span className="text-[10px] text-error font-medium">{errors.linkedinUrl.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">GitHub Profile URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="e.g. https://github.com/username"
                      className="px-4 py-2.5 bg-slate-50 border border-slate-250 rounded-lg text-xs md:text-sm"
                      {...register('githubUrl')}
                    />
                    {errors.githubUrl && <span className="text-[10px] text-error font-medium">{errors.githubUrl.message}</span>}
                  </div>
                </div>

                {/* Terms accepted */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-start gap-2.5">
                    <input 
                      id="termsAccepted" 
                      type="checkbox" 
                      className="w-4 h-4 mt-0.5 cursor-pointer"
                      {...register('termsAccepted')}
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-text-light-secondary leading-normal">
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
            <Card variant="light" className="p-8 border border-slate-200 shadow-md space-y-6">
              <h3 className="font-manrope font-bold text-lg text-brand-dark pb-2 border-b border-slate-100">Review Application Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-xs md:text-sm">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Candidate Name</span>
                  <span className="font-semibold text-brand-dark">{formData.fullName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                  <span className="font-semibold text-brand-dark">{formData.email}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Number</span>
                  <span className="font-semibold text-brand-dark">{formData.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">City</span>
                  <span className="font-semibold text-brand-dark">{formData.city}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">College / University</span>
                  <span className="font-semibold text-brand-dark">{formData.college}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Degree / Major</span>
                  <span className="font-semibold text-brand-dark">{formData.degree} ({formData.currentYear})</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected Program</span>
                  <span className="font-semibold text-brand-blue">{selectedProgramObj?.title} ({selectedProgramObj?.durationDays} Days)</span>
                </div>
                {formData.interestedProgram === 'prog-90-day' && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Specialization Track</span>
                    <span className="font-semibold text-brand-violet">
                      {formData.interestedSpecialization === 'spec-soc' && 'SOC Analyst Track'}
                      {formData.interestedSpecialization === 'spec-vapt' && 'VAPT Track'}
                      {formData.interestedSpecialization === 'spec-grc' && 'GRC Track'}
                      {formData.interestedSpecialization === 'not-sure' && 'To Be Decided'}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={() => setStep(0)} 
                  className="w-1/2 py-2.5 border border-slate-250 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 text-text-light-secondary cursor-pointer"
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
            <Card variant="light" className="p-8 border border-slate-200 shadow-md space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <CreditCard className="w-6 h-6 text-brand-blue" />
                <h3 className="font-manrope font-bold text-lg text-brand-dark">CYBRIXON Enrollment sandbox</h3>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-800 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider block">Demo Sandbox Simulator</span>
                <p className="text-[11px] leading-relaxed">
                  This gateway is provider-agnostic and sandbox-ready. No actual payment provider is linked. Clicking "Complete Registration" will record an active enrollment and initialize your credentials in local storage.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs md:text-sm py-2 border-b border-slate-100">
                  <span className="text-text-light-secondary">Selected Internship:</span>
                  <span className="font-semibold text-brand-dark">{selectedProgramObj?.title}</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm py-2 border-b border-slate-100">
                  <span className="text-text-light-secondary">Program Tuition Fees:</span>
                  <span className="font-bold text-brand-dark">Demo / Free Sandbox</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm py-2">
                  <span className="text-text-light-secondary font-bold">Total Fees:</span>
                  <span className="font-extrabold text-sm text-brand-blue">$0.00</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <button 
                  onClick={() => setStep(1)} 
                  className="w-1/2 py-2.5 border border-slate-250 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5 text-text-light-secondary cursor-pointer"
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
            <Card variant="light" className="p-8 border border-slate-200 shadow-xl text-center space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <div>
                  <Badge variant="success">ACTIVE ENROLLMENT</Badge>
                  <h3 className="font-manrope font-extrabold text-2xl text-brand-dark mt-2 tracking-tight">
                    Registration Completed Successfully
                  </h3>
                  <p className="text-xs md:text-sm text-text-light-secondary max-w-sm mx-auto mt-2 leading-relaxed">
                    Welcome to CYBRIXON, {formData.fullName}. Your student profile has been created and your active credentials logged in the sandbox.
                  </p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3 max-w-md mx-auto text-left text-xs text-text-light-primary">
                <div className="flex justify-between">
                  <span className="text-text-light-secondary">Student Name:</span>
                  <span className="font-semibold">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light-secondary">Enrollment Program:</span>
                  <span className="font-semibold text-brand-blue">{selectedProgramObj?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light-secondary">Credentials Setup:</span>
                  <span className="font-semibold text-emerald-600">Logged In automatically</span>
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
