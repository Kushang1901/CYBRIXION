'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, Mail, Key, CheckCircle2, ArrowLeft, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { dbService } from '@/services/dbService';

// Schema definitions for each step
const emailSchema = z.object({
  email: z.string().email({ message: 'Provide a valid email address.' })
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be exactly 6 digits.' })
});

const passwordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters.' })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword']
});

type EmailValues = z.infer<typeof emailSchema>;
type OtpValues = z.infer<typeof otpSchema>;
type PasswordValues = z.infer<typeof passwordSchema>;

type RecoveryStep = 'EMAIL' | 'OTP' | 'PASSWORD' | 'SUCCESS';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<RecoveryStep>('EMAIL');
  const [emailAddress, setEmailAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [otpResent, setOtpResent] = useState(false);

  // Email Step Form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: emailSubmitting }
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema)
  });

  // OTP Step Form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors, isSubmitting: otpSubmitting }
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema)
  });

  // Password Step Form
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting }
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema)
  });

  // Handlers
  const handleEmailSubmit = async (data: EmailValues) => {
    setAuthError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Verify if the email is registered in our local mock database
    const users = dbService.getRegisteredUsers();
    const exists = users.some(u => u.user.email.toLowerCase() === data.email.toLowerCase());

    if (!exists) {
      setAuthError('This email is not registered in our database. Please check and try again.');
      return;
    }

    setEmailAddress(data.email);
    setStep('OTP');
  };

  const handleOtpSubmit = async (data: OtpValues) => {
    setAuthError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Simulated verification code is 123456
    if (data.otp !== '123456') {
      setAuthError('Invalid verification code. Please type the mock code: 123456');
      return;
    }

    setStep('PASSWORD');
  };

  const handlePasswordSubmit = async (data: PasswordValues) => {
    setAuthError(null);
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Save the new password to dbService
    const success = dbService.updateUserPassword(emailAddress, data.password);

    if (!success) {
      setAuthError('Failed to update password. Please try again.');
      return;
    }

    setStep('SUCCESS');
  };

  const handleResendOtp = () => {
    setOtpResent(true);
    setAuthError(null);
    setTimeout(() => setOtpResent(false), 3000);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-slate-900 text-white font-inter">
      
      {/* LEFT COLUMN: Technical branding (Desktop only) */}
      <div className="hidden lg:flex lg:col-span-5 bg-brand-dark bg-grid-pattern border-r border-slate-800 p-12 flex flex-col justify-between relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-cyan/10 rounded-full blur-[80px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-2 group relative z-10 w-fit">
          <Shield className="w-6 h-6 text-brand-cyan" />
          <span className="font-manrope font-extrabold text-xl tracking-tight text-white">
            CYB<span className="text-brand-cyan">RIXON</span>
          </span>
        </Link>

        <div className="space-y-6 relative z-10 my-auto">
          <Badge variant="cyan" className="w-fit">PASSWORD KEY RECOVERY</Badge>
          <h2 className="text-3xl font-manrope font-extrabold text-white leading-tight">
            Recover Access to Your Student Dashboard
          </h2>
          <p className="text-xs md:text-sm text-text-dark-secondary leading-relaxed max-w-sm">
            We will guide you through verifying your identity and resetting your password safely to access your active cybersecurity training course.
          </p>
        </div>

        <div className="relative z-10 border-t border-slate-800/80 pt-6">
          <span className="text-[10px] text-text-dark-secondary leading-relaxed">
            CYBRIXON Student Portal Systems. Verification processes are fully sandboxed.
          </span>
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
            <h1 className="text-2xl font-manrope font-extrabold text-white">Reset Password</h1>
            <p className="text-xs text-text-dark-secondary mt-1">
              {step === 'EMAIL' && 'Provide your registered email address to receive an OTP code.'}
              {step === 'OTP' && 'Verify the 6-digit OTP code sent to your inbox.'}
              {step === 'PASSWORD' && 'Setup a secure new password for your account.'}
              {step === 'SUCCESS' && 'Verification successful.'}
            </p>
          </div>

          {authError && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg flex gap-3 text-error text-xs items-center">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* STEP 1: EMAIL ADDRESS INPUT */}
          {step === 'EMAIL' && (
            <form onSubmit={handleSubmitEmail(handleEmailSubmit)} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Registered Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="e.g. yourname@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                    {...registerEmail('email')}
                  />
                </div>
                {emailErrors.email && <span className="text-[10px] text-error font-medium">{emailErrors.email.message}</span>}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full flex justify-center items-center py-2.5 mt-2" 
                disabled={emailSubmitting}
                glow
              >
                {emailSubmitting ? 'Requesting OTP...' : 'Send Verification OTP'}
              </Button>

              <div className="text-center text-xs mt-4">
                <Link href="/login" className="text-text-dark-secondary hover:text-white flex items-center justify-center gap-1 hover:underline">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}

          {/* STEP 2: OTP VERIFICATION */}
          {step === 'OTP' && (
            <form onSubmit={handleSubmitOtp(handleOtpSubmit)} className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 rounded-lg flex gap-2">
                <Key className="w-4 h-4 flex-shrink-0" />
                <div>
                  <span className="font-bold block mb-0.5">Sandbox Verification OTP:</span>
                  <span>Use simulated verification OTP code: **123456** to complete this step.</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Enter 6-Digit Code</label>
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="e.g. 123456"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-center font-mono text-lg tracking-widest focus:border-brand-blue"
                  {...registerOtp('otp')}
                />
                {otpErrors.otp && <span className="text-[10px] text-error font-medium">{otpErrors.otp.message}</span>}
              </div>

              <div className="flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => setStep('EMAIL')}
                  className="text-text-dark-secondary hover:text-white hover:underline cursor-pointer"
                >
                  Change Email
                </button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-brand-cyan hover:underline cursor-pointer"
                >
                  {otpResent ? 'Code Resent!' : 'Resend OTP Code'}
                </button>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full flex justify-center items-center py-2.5 mt-2" 
                disabled={otpSubmitting}
                glow
              >
                {otpSubmitting ? 'Verifying OTP...' : 'Verify OTP'}
              </Button>
            </form>
          )}

          {/* STEP 3: PASSWORD GENERATION */}
          {step === 'PASSWORD' && (
            <form onSubmit={handleSubmitPassword(handlePasswordSubmit)} className="space-y-4">
              
              {/* New Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                    {...registerPassword('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordErrors.password && <span className="text-[10px] text-error font-medium">{passwordErrors.password.message}</span>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder="Retype new password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs md:text-sm focus:border-brand-blue"
                    {...registerPassword('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordErrors.confirmPassword && <span className="text-[10px] text-error font-medium">{passwordErrors.confirmPassword.message}</span>}
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full flex justify-center items-center py-2.5 mt-2" 
                disabled={passwordSubmitting}
                glow
              >
                {passwordSubmitting ? 'Updating Password...' : 'Save & Reset Password'}
              </Button>
            </form>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 'SUCCESS' && (
            <Card variant="light" className="p-6 border-2 border-emerald-500 bg-emerald-50/20 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-manrope font-bold text-sm text-white">Password Updated</h4>
                <p className="text-xs text-text-dark-secondary mt-1 leading-relaxed">
                  Your credentials have been successfully updated. You can now use your email address and new password to log in.
                </p>
              </div>
              <Link href="/login" className="w-full py-2.5 bg-brand-blue hover:bg-blue-600 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all mt-2">
                <ArrowLeft className="w-4 h-4" />
                Go to Sign In
              </Link>
            </Card>
          )}

        </div>

      </div>

    </div>
  );
}
