import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`w-full max-w-[1280px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 ${className}`}>
      {children}
    </Component>
  );
}
