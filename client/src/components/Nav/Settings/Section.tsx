import type { ReactNode } from 'react';
import { cn } from '~/utils';

interface SectionProps {
  heading: string;
  icon?: ReactNode;
  danger?: boolean;
  children: ReactNode;
}

export default function Section({ heading, icon, danger, children }: SectionProps) {
  return (
    <section className="mb-7">
      <h3
        className={cn(
<<<<<<< HEAD
          'mb-2 flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide',
=======
          'mb-1 flex items-center gap-1.5 px-1 text-xs font-medium tracking-wide uppercase',
>>>>>>> upstream/main
          danger ? 'text-text-destructive' : 'text-text-secondary',
        )}
      >
        {icon}
        {heading}
      </h3>
<<<<<<< HEAD
      <div
        className={cn(
          'divide-y divide-border-light overflow-hidden rounded-xl border text-sm text-text-primary',
          danger ? 'border-status-error-border' : 'border-border-light',
=======
      {/* A section is a group, not a card: spacing and the label above carry the
          grouping. The destructive section keeps its edge, where the box is the
          warning rather than decoration. */}
      <div
        className={cn(
          'text-text-primary overflow-hidden rounded-xl text-sm',
          danger && 'border-status-error-border border',
>>>>>>> upstream/main
        )}
      >
        {children}
      </div>
    </section>
  );
}
