import * as React from 'react';
import { JSX } from 'react/jsx-runtime';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
<<<<<<< HEAD
import { cn } from '~/utils';
=======
import { useDialogDepth } from './OriginalDialog';
import { cn, disabledFillClasses } from '~/utils';
>>>>>>> upstream/main

const AlertDialog: React.FC<AlertDialogPrimitive.AlertDialogProps> = AlertDialogPrimitive.Root;

const AlertDialogTrigger: React.ForwardRefExoticComponent<
  AlertDialogPrimitive.AlertDialogTriggerProps & React.RefAttributes<HTMLButtonElement>
> = AlertDialogPrimitive.Trigger;

type AlertPortalProps = AlertDialogPrimitive.AlertDialogPortalProps & { className?: string };

<<<<<<< HEAD
const AlertDialogPortal = ({ className = '', children, ...props }: AlertPortalProps) => (
  <AlertDialogPrimitive.Portal className={cn(className)} {...(props as AlertPortalProps)}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
);
=======
const AlertDialogPortal = ({ className = '', children, ...props }: AlertPortalProps) => {
  const dialogDepth = useDialogDepth();
  const zIndex = dialogDepth > 0 ? 190 + (dialogDepth - 1) * 60 : 50;

  return (
    <AlertDialogPrimitive.Portal className={cn(className)} {...(props as AlertPortalProps)}>
      <div
        className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        style={{ zIndex }}
      >
        {children}
      </div>
    </AlertDialogPrimitive.Portal>
  );
};
>>>>>>> upstream/main
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
<<<<<<< HEAD
>(({ className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-surface-overlay/90 transition-opacity animate-in fade-in',
      className,
    )}
    {...props}
    ref={ref}
  />
));
=======
>(({ className = '', style, ...props }, ref) => {
  const dialogDepth = useDialogDepth();
  const zIndex = dialogDepth > 0 ? 190 + (dialogDepth - 1) * 60 : 50;

  return (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'bg-scrim-alert animate-in fade-in fixed inset-0 z-50 transition-opacity',
        className,
      )}
      style={{ ...style, zIndex }}
      {...props}
      ref={ref}
    />
  );
});
>>>>>>> upstream/main
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent: React.ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.AlertDialogContentProps & React.RefAttributes<HTMLDivElement>, 'ref'> &
    React.RefAttributes<HTMLDivElement>
> = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
<<<<<<< HEAD
>(({ className = '', ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        /** The dialog surface is otherwise borderless: in high contrast it sits on
         *  a canvas of its own colour, so it needs a drawn edge. */
        'fixed z-50 grid w-full max-w-lg scale-100 gap-4 bg-surface-dialog p-6 opacity-100 animate-in fade-in-90 slide-in-from-bottom-10 high-contrast:border high-contrast:border-solid high-contrast:border-border-medium sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full',
        className,
      )}
      {...props}
    />
  </AlertDialogPortal>
));
=======
>(({ className = '', style, ...props }, ref) => {
  const dialogDepth = useDialogDepth();
  const zIndex = dialogDepth > 0 ? 200 + (dialogDepth - 1) * 60 : 50;

  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          /** The dialog surface is otherwise borderless: in high contrast it sits on
           *  a canvas of its own colour, so it needs a drawn edge. */
          'bg-surface-dialog animate-in fade-in-90 slide-in-from-bottom-10 high-contrast:border high-contrast:border-solid high-contrast:border-border-medium sm:zoom-in-90 sm:slide-in-from-bottom-0 fixed z-50 grid w-full max-w-lg scale-100 gap-4 p-6 opacity-100 sm:rounded-lg md:w-full',
          className,
        )}
        style={{ ...style, zIndex }}
        {...props}
      />
    </AlertDialogPortal>
  );
});
>>>>>>> upstream/main
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
  displayName: string;
} = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
  displayName: string;
} = ({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle: React.ForwardRefExoticComponent<
  Omit<
    AlertDialogPrimitive.AlertDialogTitleProps & React.RefAttributes<HTMLHeadingElement>,
    'ref'
  > &
    React.RefAttributes<HTMLHeadingElement>
> = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
<<<<<<< HEAD
    className={cn('text-lg font-semibold text-text-primary', className)}
=======
    className={cn('text-text-primary font-display text-lg font-semibold', className)}
>>>>>>> upstream/main
    {...props}
  />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription: React.ForwardRefExoticComponent<
  Omit<
    AlertDialogPrimitive.AlertDialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>,
    'ref'
  > &
    React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
<<<<<<< HEAD
    className={cn('text-sm text-text-secondary', className)}
=======
    className={cn('text-text-secondary text-sm', className)}
>>>>>>> upstream/main
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction: React.ForwardRefExoticComponent<
  Omit<
    AlertDialogPrimitive.AlertDialogActionProps & React.RefAttributes<HTMLButtonElement>,
    'ref'
  > &
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(
<<<<<<< HEAD
      'inline-flex h-10 items-center justify-center rounded-md bg-surface-inverted px-4 py-2 text-sm font-semibold text-text-inverted transition-colors hover:bg-surface-inverted-hover focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
=======
      'bg-surface-inverted text-text-inverted hover:bg-surface-inverted-hover focus:ring-focus-control inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      disabledFillClasses,
>>>>>>> upstream/main
      className,
    )}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel: React.ForwardRefExoticComponent<
  Omit<
    AlertDialogPrimitive.AlertDialogCancelProps & React.RefAttributes<HTMLButtonElement>,
    'ref'
  > &
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className = '', ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
<<<<<<< HEAD
      'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-border-light bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
=======
      'border-border-light text-text-primary hover:bg-surface-hover focus:ring-focus-control mt-2 inline-flex h-10 items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      disabledFillClasses,
>>>>>>> upstream/main
      className,
    )}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
