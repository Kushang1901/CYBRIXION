import React from 'react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'cyan' | 'purple';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'primary',
  children,
  className = ''
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold font-inter tracking-wide';
  
  const variants = {
    primary: 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20',
    secondary: 'bg-brand-navy border border-slate-800 text-text-dark-secondary',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    error: 'bg-error/10 text-error border border-error/20',
    info: 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-brand-elevated dark:text-text-dark-secondary dark:border-slate-800',
    cyan: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20',
    purple: 'bg-brand-violet/10 text-brand-violet border border-brand-violet/20'
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
