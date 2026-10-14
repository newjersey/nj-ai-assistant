import * as React from 'react';
import { X } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
<<<<<<< HEAD
import { Button, ButtonProps } from './Button';
import { useMediaQuery } from '~/hooks';
import { cn } from '~/utils';
=======
import { cn, disabledFillClasses } from '~/utils';
import { Button, ButtonProps } from './Button';
import { useMediaQuery } from '~/hooks';
>>>>>>> upstream/main

const Dialog: React.FC<DialogPrimitive.DialogProps> = DialogPrimitive.Root;

const DialogTrigger: React.ForwardRefExoticComponent<
  DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
> = DialogPrimitive.Trigger;

type DialogPortalProps = DialogPrimitive.DialogPortalProps & { className?: string };

const DialogPortal = ({ className = '', children, ...props }: DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...(props as DialogPortalProps)}>
    <div className="fixed inset-0 z-[999] flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
<<<<<<< HEAD
      'fixed inset-0 z-[999] bg-surface-overlay/65 transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
=======
      'bg-scrim-modal data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-[999] transition-all duration-100',
>>>>>>> upstream/main
      className ?? '',
    )}
    {...props}
    ref={ref}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
  disableScroll?: boolean;
};

const DialogContent: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, 'ref'> & {
    showCloseButton?: boolean;
    disableScroll?: boolean;
  } & React.RefAttributes<HTMLDivElement>
> = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  (
    { className, children = true, showCloseButton = true, disableScroll = false, ...props },
    ref,
  ) => {
    const isSmallScreen = useMediaQuery('(max-width: 768px)');
    return (
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            /** The dialog surface is otherwise borderless: in high contrast it sits
             *  on a canvas of its own colour, so it needs a drawn edge. */
<<<<<<< HEAD
            'fixed z-[999] grid w-full gap-4 rounded-b-lg bg-surface-dialog pb-6 animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 high-contrast:border high-contrast:border-solid high-contrast:border-border-medium sm:rounded-lg',
            isSmallScreen
              ? 'fixed left-1/2 top-1/2 z-[999] m-auto grid w-11/12 -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-surface-dialog pb-6'
=======
            'bg-surface-dialog animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 high-contrast:border high-contrast:border-solid high-contrast:border-border-medium fixed z-[999] grid w-full gap-4 rounded-b-lg pb-6 sm:rounded-lg',
            isSmallScreen
              ? 'bg-surface-dialog fixed top-1/2 left-1/2 z-[999] m-auto grid w-11/12 -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl pb-6'
>>>>>>> upstream/main
              : '',
            disableScroll ? 'overflow-hidden' : '',
            className ?? '',
          )}
          {...props}
        >
          {children}
          {showCloseButton && (
<<<<<<< HEAD
            <DialogPrimitive.Close className="absolute right-6 top-[1.6rem] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-surface-hover">
              <X className="h-5 w-5 text-text-primary" aria-hidden="true" />
=======
            <DialogPrimitive.Close className="focus:ring-focus-control data-[state=open]:bg-surface-hover absolute top-[1.6rem] right-6 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
              <X className="text-text-primary size-theme-icon-md" aria-hidden="true" />
>>>>>>> upstream/main
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPortal>
    );
  },
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
  displayName: string;
} = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
<<<<<<< HEAD
  <div
    className={cn(
      'flex flex-col space-y-2 border-b border-border-light p-6 pb-4 text-left',
      className ?? '',
    )}
    {...props}
  />
=======
  <div className={cn('flex flex-col space-y-2 p-6 pb-4 text-left', className ?? '')} {...props} />
>>>>>>> upstream/main
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter: {
  ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element;
  displayName: string;
} = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): JSX.Element => (
  <div
    className={cn('flex flex-row justify-between space-x-2 px-6 py-4', className ?? '')}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, 'ref'> &
    React.RefAttributes<HTMLHeadingElement>
> = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
<<<<<<< HEAD
    className={cn('text-lg font-semibold text-text-primary', className ?? '')}
=======
    className={cn('text-text-primary font-display text-lg font-semibold', className ?? '')}
>>>>>>> upstream/main
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, 'ref'> &
    React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
<<<<<<< HEAD
    className={cn('text-sm text-text-secondary', className ?? '')}
=======
    className={cn('text-text-secondary text-sm', className ?? '')}
>>>>>>> upstream/main
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogClose: React.ForwardRefExoticComponent<
  Omit<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>, 'ref'> &
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
<<<<<<< HEAD
      'mt-2 inline-flex h-10 items-center justify-center rounded-lg border border-border-light bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      className ?? '',
      /* Important: for accessibility */
      'focus:ring-2 focus:ring-text-primary focus:ring-offset-2',
=======
      'border-border-light text-text-primary hover:bg-surface-hover h-theme-button mt-2 inline-flex items-center justify-center rounded-lg border bg-transparent px-4 py-2 text-sm font-semibold transition-colors focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      disabledFillClasses,
      className ?? '',
      /* Important: for accessibility */
      'focus:ring-focus-control focus:ring-2 focus:ring-offset-2',
>>>>>>> upstream/main
    )}
    {...props}
  />
));
DialogClose.displayName = DialogPrimitive.Title.displayName;

const DialogButton: React.ForwardRefExoticComponent<
  Omit<ButtonProps & React.RefAttributes<HTMLButtonElement>, 'ref'> &
    React.RefAttributes<HTMLButtonElement>
> = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn(
<<<<<<< HEAD
      'mt-2 inline-flex h-10 items-center justify-center rounded-lg border border-border-light bg-transparent px-4 py-2 text-sm font-semibold text-text-primary transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      className ?? '',
      /* Important: for accessibility */
      'focus:ring-2 focus:ring-text-primary focus:ring-offset-2',
=======
      'border-border-light text-text-primary hover:bg-surface-hover focus:ring-focus-control h-theme-button mt-2 inline-flex items-center justify-center rounded-lg border bg-transparent px-4 py-2 text-sm font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0',
      disabledFillClasses,
      className ?? '',
      /* Important: for accessibility */
      'focus:ring-focus-control focus:ring-2 focus:ring-offset-2',
>>>>>>> upstream/main
    )}
    {...props}
  />
));
DialogButton.displayName = DialogPrimitive.Title.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogButton,
};
