import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  level?: 1 | 2;
  className?: string;
}

export default function SectionHeading({ children, level = 2, className = '' }: SectionHeadingProps) {
  const baseClasses = 'font-bold tracking-tight';
  const levelClasses = level === 1 ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl';

  const Component = level === 1 ? 'h1' : 'h2';

  return <Component className={`${baseClasses} ${levelClasses} ${className}`}>{children}</Component>;
}
