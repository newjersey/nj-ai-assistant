/* eslint-disable i18next/no-literal-string */
/* ^ We're not worried about i18n for this app ^ */

import { Controller, useFormContext } from 'react-hook-form';
import type { AgentForm } from '~/common';
import { VariableEditor } from '~/components/Variables';
import { useLocalize } from '~/hooks';

export default function Instructions() {
  const localize = useLocalize();
  const { control } = useFormContext<AgentForm>();

  return (
    <Controller
      name="instructions"
      control={control}
      // NJ: Agent instructions are a required field
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        // NJ: Modify styling
        <div className="flex flex-col">
          <VariableEditor
            id="instructions"
            label="Give your agent a task" // NJ: Custom language
            variableTooltipText="Add variable to instructions" // NJ: Custom variable tooltip
            labelHelp={
              <p className="text-sm text-text-secondary">
                Agents work best when they have a clearly defined identity and behavior. Define your
                agent&apos;s role, expertise, criteria for success, and how it should respond.
              </p>
            }
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={field.onBlur}
            inputRef={field.ref}
            placeholder={localize('com_agents_instructions_placeholder')}
            className="min-h-[118px] resize-y bg-white" // NJ: Custom styles
            labelClassName="block text-sm font-semibold text-text-primary" // NJ: Custom styles
            rows={3}
            required={true}
            invalid={error != null}
          />
          {error && (
            <span
              className="mt-1 text-xs text-text-destructive transition duration-300 ease-in-out"
              role="alert"
            >
              Add agent instructions before saving
            </span>
          )}
        </div>
      )}
    />
  );
}
