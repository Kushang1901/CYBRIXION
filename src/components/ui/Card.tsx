import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'glass';
  hoverGlow?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  variant = 'light',
  hoverGlow = false,
  onClick
}: CardProps) {
  const baseStyles = 'rounded-xl border transition-all duration-300';
  
  const variants = {
    light: 'bg-brand-elevated/70 backdrop-blur-md border-slate-800/80 text-text-dark-primary shadow-md',
    dark: 'bg-brand-navy border-slate-800 text-text-dark-primary shadow-lg',
    glass: 'bg-brand-navy/60 backdrop-blur-md border-slate-800/80 text-text-dark-primary shadow-lg'
  };

  const hoverStyles = hoverGlow 
    ? (variant === 'light' 
        ? 'hover:-translate-y-1 hover:shadow-[0_0_22px_rgba(99,39,111,0.2)] hover:border-brand-logo-purple/40' 
        : 'hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:border-brand-cyan/40')
    : onClick 
    ? 'hover:cursor-pointer hover:bg-brand-elevated/90' 
    : '';

  return (
    <div 
      className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
      onClick={onClick}
      style={{ overflow: className.includes('overflow-visible') ? 'visible' : 'hidden' }}
    >
      {children}
    </div>
  );
}
