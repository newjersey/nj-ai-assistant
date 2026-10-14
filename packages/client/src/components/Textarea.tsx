<<<<<<< HEAD
/* eslint-disable */
import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
=======
import * as React from 'react';
>>>>>>> upstream/main
import { fieldBase } from './Field';
import { cn } from '~/utils';
import './Field.css';

<<<<<<< HEAD
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className = '', ...props }, ref) => {
  return (
    <textarea
      className={cn(fieldBase, 'min-h-20 resize-none bg-surface-secondary', className)}
      ref={ref}
      {...props}
    />
  );
});
=======
/** `document` is a long-form editor that reads like the text it will become. */
const TEXTAREA_VARIANTS = {
  default: 'bg-surface-secondary',
  transparent: 'bg-transparent',
  document: 'bg-transparent text-base leading-relaxed',
} as const;

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  variant?: keyof typeof TEXTAREA_VARIANTS;
};

const Textarea: React.ForwardRefExoticComponent<
  TextareaProps & React.RefAttributes<HTMLTextAreaElement>
> = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    return (
      <textarea
        className={cn(fieldBase, TEXTAREA_VARIANTS[variant], 'min-h-20 resize-none', className)}
        ref={ref}
        {...props}
      />
    );
  },
);
>>>>>>> upstream/main
Textarea.displayName = 'Textarea';

export { Textarea };
