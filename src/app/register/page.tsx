'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, User, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Provide a valid email address.' }),
  phone: z.string().min(10, { message: 'Provide a valid phone number (min 10 digits).' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters.' }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms of service.'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword']
});

type RegisterValues = z.infer<typeof registerSchema>;

function generateId(prefix: string): string {
  return `${prefix}-${Math.floor(Date.now() + Math.random() * 1000000).toString(36)}`;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterValues) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Register user session inside localStorage DB
    const newUser = {
      id: generateId('usr'),
      email: data.email,
      name: data.fullName,
      role: 'STUDENT' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    dbService.registerNewUser(newUser, data.password);
    dbService.setCurrentUser(newUser);

    // Initialize blank profile
    dbService.updateProfile({
      id: generateId('prof'),
      userId: newUser.id,
      phone: data.phone,
      college: 'Selected College',
      degree: 'Computer Science',
      currentYear: '3rd Year',
      city: 'Delhi',
      experienceLevel: 'Beginner',
      careerGoal: 'Cybersecurity Specialist',
      linkedinUrl: '',
      githubUrl: '',
    });
    // Redirect to the course selection & payment page
    router.push('/apply');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-900 text-white font-inter">
      
      {/* LEFT COLUMN: Technical branding (Desktop only) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark bg-grid-pattern border-r border-slate-800 p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-brand-cyan/15 rounded-full blur-[80px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2 group relative z-10 w-fit">
          <Shield className="w-6 h-6 text-brand-cyan" />
          <span className="font-manrope font-extrabold text-xl tracking-tight text-white">
            CYB<span className="text-brand-cyan">RIXON</span>
          </span>
        </Link>

        <div className="space-y-6 relative z-10 my-auto">
          <Badge variant="cyan" className="w-fit">PORTAL REGISTRATION ENGAGED</Badge>
          <h2 className="text-3xl font-manrope font-extrabold text-white leading-tight">
            Initiate Your Structured Cybersecurity Training
          </h2>
          <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed max-w-sm">
            Create an account to enroll in our beginner or advanced internships and start compiling real-world security audits and scans.
          </p>
        </div>

        <div className="relative z-10 border-t border-slate-800/80 pt-6">
          <span className="text-[10px] uppercase font-bold text-brand-cyan block mb-1">Ethical Compliance</span>
          <p className="text-[10px] text-text-dark-secondary leading-relaxed">
            By registering, you commit to legal scanning scopes and agree to only conduct security exercises in authorized local environments.
          </p>
        </div>

      </div>

      {/* RIGHT COLUMN: Form Card */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12 bg-slate-950 bg-dot-pattern">
        
        <div className="w-full max-w-md space-y-6">
          
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex lg:hidden items-center gap-2 group mb-4">
              <Shield className="w-5.5 h-5.5 text-brand-cyan" />
              <span className="font-manrope font-extrabold text-lg text-white">
                CYB<span className="text-brand-cyan">RIXON</span>
              </span>
            </Link>
            <h1 className="text-2xl font-manrope font-extrabold text-white">Create Account</h1>
            <p className="text-xs text-text-dark-secondary mt-1">Register your student account details to begin.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="e.g. Aarav Sharma"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('fullName')}
                />
              </div>
              {errors.fullName && <span className="text-[10px] text-error font-medium">{errors.fullName.message}</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  placeholder="e.g. aarav.sharma@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('email')}
                />
              </div>
              {errors.email && <span className="text-[10px] text-error font-medium">{errors.email.message}</span>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="tel" 
                  placeholder="e.g. 9876543210"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                  {...register('phone')}
                />
              </div>
              {errors.phone && <span className="text-[10px] text-error font-medium">{errors.phone.message}</span>}
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Min 6 chars"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <span className="text-[10px] text-error font-medium">{errors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Retype password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-[10px] text-error font-medium">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            {/* Terms accepted */}
            <div className="flex items-start gap-2 pt-2">
              <input 
                id="termsAccepted" 
                type="checkbox" 
                className="w-4 h-4 mt-0.5 bg-slate-900 border-slate-800 rounded cursor-pointer"
                {...register('termsAccepted')}
              />
              <label htmlFor="termsAccepted" className="text-[11px] text-text-dark-secondary leading-normal cursor-pointer select-none">
                I accept the terms of service and commit to lawful system testing boundaries. *
              </label>
            </div>
            {errors.termsAccepted && <span className="text-[10px] text-error font-medium block">{errors.termsAccepted.message}</span>}

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full flex justify-center items-center py-2.5 mt-2" 
              disabled={isSubmitting}
              glow
            >
              {isSubmitting ? 'Creating Account...' : 'Register Account'}
            </Button>

          </form>

          <div className="text-center text-xs text-text-dark-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-cyan font-bold hover:underline">
              Login here
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}
