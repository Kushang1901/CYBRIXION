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
    primary: 'bg-brand-blue hover:bg-blue-600 text-white border border-transparent shadow-[0_4px_14px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.4)]',
    secondary: 'bg-brand-navy hover:bg-brand-elevated text-brand-cyan border border-brand-cyan/20 hover:border-brand-cyan/40 shadow-sm',
    outline: 'bg-transparent border border-text-light-secondary/20 hover:border-brand-blue text-text-light-primary hover:text-brand-blue dark:text-text-dark-primary dark:border-brand-cyan/20 dark:hover:border-brand-cyan dark:hover:text-brand-cyan',
    ghost: 'bg-transparent text-text-light-secondary hover:text-text-light-primary hover:bg-black/5 dark:text-text-dark-secondary dark:hover:text-text-dark-primary dark:hover:bg-white/5',
    danger: 'bg-error hover:bg-red-600 text-white shadow-sm'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5'
  };

  const glowStyles = glow && variant === 'secondary'
    ? 'cyan-glow shadow-[0_0_15px_rgba(34,211,238,0.25)]'
    : glow && variant === 'primary'
    ? 'shadow-[0_0_15px_rgba(59,130,246,0.4)]'
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
