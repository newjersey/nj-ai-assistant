import * as React from 'react';

// import { NumericFormat } from 'react-number-format';

import RCInputNumber from 'rc-input-number';
import * as InputNumberPrimitive from 'rc-input-number';
import type { ValueType } from '@rc-component/mini-decimal';
<<<<<<< HEAD
import { cn } from '~/utils';
=======
import { cn, disabledWithinFillClasses } from '~/utils';
import './InputNumber.css';
>>>>>>> upstream/main

// TODO help needed
// React.ElementRef<typeof LabelPrimitive.Root>,
// React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

<<<<<<< HEAD
const InputNumber: React.ForwardRefExoticComponent<
  InputNumberPrimitive.InputNumberProps<ValueType> & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<React.ElementRef<typeof RCInputNumber>, InputNumberPrimitive.InputNumberProps>(
  ({ className, ...props }, ref) => {
    return (
      <RCInputNumber
        className={cn(
          'flex max-h-5 w-full rounded-md border border-border-medium bg-transparent px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
=======
/** `option` is the borderless value that sits beside a setting's label, such as a slider's
 *  number: it reads as text until the row is hovered or the field is focused. Focus and the
 *  placeholder belong to the nested input rc-input-number renders, so they are matched there. */
const INPUT_NUMBER_VARIANTS: Record<'default' | 'option', string> = {
  default: '',
  option:
    'h-auto border-0 border-transparent p-0 pe-1 text-end shadow-none outline-hidden transition-colors hover:not-focus-within:bg-surface-hover focus-within:bg-surface-secondary [&_input]:placeholder:text-text-secondary [&_input:focus]:placeholder:text-text-primary group-hover/temp:border-border-light reset-rc-number-input reset-rc-number-input-text-right',
};

export type InputNumberProps = InputNumberPrimitive.InputNumberProps<ValueType> & {
  variant?: keyof typeof INPUT_NUMBER_VARIANTS;
};

const InputNumber: React.ForwardRefExoticComponent<
  InputNumberProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef<React.ElementRef<typeof RCInputNumber>, InputNumberProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <RCInputNumber
        className={cn(
          'border-border-control text-text-primary placeholder:text-text-tertiary flex max-h-5 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-hidden has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
          disabledWithinFillClasses,
          INPUT_NUMBER_VARIANTS[variant],
>>>>>>> upstream/main
          className ?? '',
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
InputNumber.displayName = 'Input';

<<<<<<< HEAD
// console.log(_InputNumber);

// const InputNumber = React.forwardRef(({ className, ...props }, ref) => {
//   return (
//     <NumericFormat
//       className={cn(
//         'flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-50 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900',
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   );
// });

=======
>>>>>>> upstream/main
export { InputNumber };
