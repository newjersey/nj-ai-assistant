import { forwardRef } from 'react';
import { Input, Label, SecretInput } from '@librechat/client';
import type { ChangeEvent, FC, Ref } from 'react';
<<<<<<< HEAD
import { cn } from '~/utils/';
import { useLocalize } from '~/hooks';
=======
import { useLocalize } from '~/hooks';
import { cn } from '~/utils/';
>>>>>>> upstream/main

interface InputWithLabelProps {
  id: string;
  value: string;
  label: string;
  subLabel?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  labelClassName?: string;
  inputClassName?: string;
  secret?: boolean;
  ref?: Ref<HTMLInputElement>;
}

const InputWithLabel: FC<InputWithLabelProps> = forwardRef((props, ref) => {
  const {
    id,
    value,
    label,
    secret = false,
    subLabel,
    onChange,
    labelClassName = '',
    inputClassName = '',
  } = props;
  const localize = useLocalize();
  return (
    <>
      <div className={cn('mt-4 flex flex-row', labelClassName)}>
        <Label htmlFor={id} className="text-left text-sm font-medium">
          {label}
        </Label>
        {subLabel && (
<<<<<<< HEAD
          <Label className="mx-1 text-right text-sm text-text-secondary">{subLabel}</Label>
=======
          <Label variant="secondary" className="mx-1 text-right text-sm">
            {subLabel}
          </Label>
>>>>>>> upstream/main
        )}
        <br />
      </div>
      <div className="h-1" />
      {secret ? (
        <SecretInput
          id={id}
          data-testid={`input-${id}`}
          value={value ?? ''}
          onChange={onChange}
          ref={ref}
          autoComplete="new-password"
          data-lpignore="true"
          data-1p-ignore="true"
          controlsOnHover
          placeholder={`${localize('com_endpoint_config_value')} ${label}`}
          className={cn('flex h-10 max-h-10 w-full resize-none px-3 py-2', inputClassName)}
        />
      ) : (
        <Input
          id={id}
          data-testid={`input-${id}`}
          value={value ?? ''}
          onChange={onChange}
          ref={ref}
          placeholder={`${localize('com_endpoint_config_value')} ${label}`}
          className={cn('flex h-10 max-h-10 w-full resize-none px-3 py-2', inputClassName)}
        />
      )}
    </>
  );
});

export default InputWithLabel;
