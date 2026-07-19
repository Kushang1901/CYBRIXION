import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  glow?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  glow = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-manrope font-semibold rounded-lg transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-brand-blue hover:bg-[#1850A8] text-white border border-transparent shadow-[0_4px_14px_rgba(30,96,200,0.35)] hover:shadow-[0_6px_20px_rgba(30,96,200,0.50)]',
    secondary: 'bg-brand-navy hover:bg-brand-elevated text-brand-cyan border border-brand-cyan/20 hover:border-brand-cyan/40 shadow-sm',
    outline: 'bg-transparent border border-white/15 hover:border-brand-blue text-text-dark-primary hover:text-brand-cyan hover:border-brand-cyan/50',
    ghost: 'bg-transparent text-text-dark-secondary hover:text-text-dark-primary hover:bg-white/5',
    danger: 'bg-error hover:bg-red-600 text-white shadow-sm'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5'
  };

  const glowStyles = glow && variant === 'secondary'
    ? 'shadow-[0_0_18px_rgba(34,211,238,0.25)]'
    : glow && variant === 'primary'
    ? 'shadow-[0_0_20px_rgba(30,96,200,0.50)]'
    : '';

  const fullClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${glowStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={fullClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={fullClassName} {...props}>
      {children}
    </button>
  );
}
