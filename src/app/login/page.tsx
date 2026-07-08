'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, Mail, Lock, Eye, EyeOff, Key, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';

const loginSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  rememberMe: z.boolean().optional()
});

type LoginValues = z.infer<typeof loginSchema>;

function generateId(prefix: string): string {
  return `${prefix}-${Math.floor(Date.now() + Math.random() * 1000000).toString(36)}`;
}

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginValues) => {
    setAuthError(null);
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const authenticatedUser = dbService.authenticateUser(data.email, data.password);
      if (authenticatedUser) {
        dbService.setCurrentUser(authenticatedUser);
        router.push('/dashboard');
      } else {
        setAuthError('Invalid email or password. To create a new workspace, please Register first.');
      }
    } catch (err) {
      setAuthError('Authentication failed. Check your connection or credentials.');
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-900 text-white font-inter">
      
      {/* LEFT COLUMN: Technical branding & ethical notices (Desktop only) */}
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
          <Badge variant="cyan" className="w-fit">PORTAL SECURITY ENGAGED</Badge>
          <h2 className="text-3xl font-manrope font-extrabold text-white leading-tight">
            Review Security Incident Records and Learning Logs
          </h2>
          <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed max-w-sm">
            Access your active cohort dashboard to complete homework assignments, compile lab files, check live webinars, and verify credentials.
          </p>
        </div>

        <div className="relative z-10 border-t border-slate-800/80 pt-6">
          <span className="text-[10px] uppercase font-bold text-brand-cyan block mb-1">Ethical Advisory</span>
          <p className="text-[10px] text-text-dark-secondary leading-relaxed">
            All database operations, authentication paths, and cookie parameters are simulated in this sandbox environment. 
          </p>
        </div>

      </div>

      {/* RIGHT COLUMN: Form Card */}
      <div className="lg:col-span-7 flex items-center justify-center p-6 md:p-12 bg-slate-950 bg-dot-pattern">
        
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <Link href="/" className="inline-flex lg:hidden items-center gap-2 group mb-6">
              <Shield className="w-5.5 h-5.5 text-brand-cyan" />
              <span className="font-manrope font-extrabold text-lg text-white">
                CYB<span className="text-brand-cyan">RIXON</span>
              </span>
            </Link>
            <h1 className="text-2xl font-manrope font-extrabold text-white">Student Login</h1>
            <p className="text-xs text-text-dark-secondary mt-1">Provide your credentials to access the learning portal.</p>
          </div>

          {authError && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex gap-3 text-error text-xs items-center">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
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

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Password</label>
                <Link href="/forgot-password" className="text-[10px] text-brand-cyan hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="Password"
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

            {/* Remember Me checkbox */}
            <div className="flex items-center gap-2">
              <input 
                id="rememberMe" 
                type="checkbox" 
                className="w-4 h-4 bg-slate-900 border-slate-800 rounded cursor-pointer"
                {...register('rememberMe')}
              />
              <label htmlFor="rememberMe" className="text-xs text-text-dark-secondary cursor-pointer select-none">
                Remember my session in this browser
              </label>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full flex justify-center items-center py-2.5" 
              disabled={isSubmitting}
              glow
            >
              {isSubmitting ? 'Verifying...' : 'Sign In'}
            </Button>

          </form>

          <div className="text-center text-xs text-text-dark-secondary">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-brand-cyan font-bold hover:underline">
              Register here
            </Link>
          </div>

          {/* Demo access guidelines */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg text-[10px] text-text-dark-secondary leading-normal flex items-start gap-2.5">
            <Key className="w-4.5 h-4.5 text-brand-cyan flex-shrink-0" />
            <div>
              <span className="font-bold text-brand-cyan block mb-0.5">Demo Account Credentials:</span>
              <span>
                To preview the pre-configured mock dashboard, type the credentials: **aarav.sharma@gmail.com** / **password123**. To create your own student workspace, please **Register here** first, choose a program, and complete the sandbox payment.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
