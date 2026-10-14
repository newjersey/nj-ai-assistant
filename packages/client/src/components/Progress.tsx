import * as React from 'react';
<<<<<<< HEAD
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '~/utils';

const Progress: React.ForwardRefExoticComponent<
  Omit<ProgressPrimitive.ProgressProps & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-surface-tertiary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-surface-inverted transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
=======
import { ClassProp } from 'class-variance-authority/types';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils';

/** Fill tone for the indicator; the track stays neutral in every variant. */
const progressIndicatorVariants: (
  props?:
    | ({
        variant?: 'default' | 'warning' | 'error' | null | undefined;
      } & ClassProp)
    | undefined,
) => string = cva('h-full w-full flex-1 transition-all motion-reduce:transition-none', {
  variants: {
    variant: {
      default: 'bg-surface-inverted',
      warning: 'bg-status-warning',
      error: 'bg-status-error',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressIndicatorVariants> {}

const Progress: React.ForwardRefExoticComponent<
  ProgressProps & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, variant, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      className={cn(
        'bg-surface-tertiary relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={progressIndicatorVariants({ variant })}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
>>>>>>> upstream/main
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
