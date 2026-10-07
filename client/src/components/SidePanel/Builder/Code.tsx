import { Capabilities } from 'librechat-data-provider';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox,
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
  CircleHelpIcon,
} from '@librechat/client';
import type { AssistantForm } from '~/common';
import { useLocalize } from '~/hooks';
import { ESide } from '~/common';

export default function Code({ version }: { version: number | string }) {
  const localize = useLocalize();
  const methods = useFormContext<AssistantForm>();
  const { control, setValue, getValues } = methods;

  return (
    <>
      <HoverCard openDelay={50}>
        <div className="flex items-center">
          <Controller
            name={Capabilities.code_interpreter}
            control={control}
            render={({ field }) => (
              <Checkbox
                {...field}
                checked={field.value}
                onCheckedChange={field.onChange}
<<<<<<< HEAD
                className="relative float-left mr-2 inline-flex h-4 w-4 cursor-pointer"
=======
                className="relative float-left mr-2 inline-flex cursor-pointer"
>>>>>>> upstream/main
                value={field.value.toString()}
                aria-labelledby={Capabilities.code_interpreter}
              />
            )}
          />
          <button
            type="button"
<<<<<<< HEAD
            className="flex items-center space-x-2"
=======
            className="text-text-tertiary flex items-center space-x-2"
>>>>>>> upstream/main
            onClick={() =>
              setValue(Capabilities.code_interpreter, !getValues(Capabilities.code_interpreter), {
                shouldDirty: true,
              })
            }
          >
            <label
              id={Capabilities.code_interpreter}
<<<<<<< HEAD
              className="form-check-label text-token-text-primary w-full cursor-pointer"
=======
              className="form-check-label text-text-primary w-full cursor-pointer"
>>>>>>> upstream/main
              htmlFor={Capabilities.code_interpreter}
            >
              {localize('com_assistants_code_interpreter')}
            </label>
            <HoverCardTrigger>
<<<<<<< HEAD
              <CircleHelpIcon className="h-5 w-5 text-gray-500" />
=======
              <CircleHelpIcon className="h-5 w-5" />
>>>>>>> upstream/main
            </HoverCardTrigger>
          </button>
          <HoverCardPortal>
            <HoverCardContent side={ESide.Top} className="w-80">
              <div className="space-y-2">
<<<<<<< HEAD
                <p className="text-sm text-gray-600 dark:text-gray-300">
=======
                <p className="text-text-secondary text-sm">
>>>>>>> upstream/main
                  {version == 2 && localize('com_assistants_code_interpreter_info')}
                </p>
              </div>
            </HoverCardContent>
          </HoverCardPortal>
        </div>
      </HoverCard>
    </>
  );
}
