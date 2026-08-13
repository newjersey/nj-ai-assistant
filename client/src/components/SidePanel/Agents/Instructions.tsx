/* eslint-disable i18next/no-literal-string */
/* ^ We're not worried about i18n for this app ^ */

import { useState, useId } from 'react';
import * as Menu from '@ariakit/react/menu';
import { PlusCircle, Maximize2 } from 'lucide-react';
import { specialVariables } from 'librechat-data-provider';
import { Controller, useFormContext } from 'react-hook-form';
import {
  Label,
  Button,
  OGDialog,
  Textarea,
  DropdownPopup,
  OGDialogClose,
  TooltipAnchor,
  OGDialogTitle,
  OGDialogHeader,
  OGDialogContent,
  CircleHelpIcon,
  ESide,
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from '@librechat/client';
import type { TSpecialVarLabel } from 'librechat-data-provider';
import type { AgentForm } from '~/common';
import { njInputClass } from '~/nj/components/Agents/agentInputStyle';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

const textareaClass =
  'lc-field flex w-full rounded-lg border border-border-light bg-surface-secondary px-3 py-2 text-text-primary placeholder:text-text-secondary focus-visible:outline-none focus-visible:border-border-medium focus-visible:ring-2 focus-visible:ring-ring-primary disabled:cursor-not-allowed disabled:opacity-50';

interface VariableOption {
  label: TSpecialVarLabel;
  value: string;
}

const variableOptions: VariableOption[] = Object.keys(specialVariables).map((key) => ({
  label: `com_ui_special_var_${key}` as TSpecialVarLabel,
  value: `{{${key}}}`,
}));

export default function Instructions() {
  const menuId = useId();
  const dialogMenuId = useId();
  const localize = useLocalize();
  const methods = useFormContext<AgentForm>();
  const { control, setValue, getValues } = methods;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogMenuOpen, setIsDialogMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddVariable = (label: TSpecialVarLabel, value: string) => {
    const currentInstructions = getValues('instructions') || '';
    const spacer = currentInstructions.length > 0 ? '\n' : '';
    const prefix = localize(label);
    setValue('instructions', currentInstructions + spacer + prefix + ': ' + value);
    setIsMenuOpen(false);
    setIsDialogMenuOpen(false);
  };

  const variableItems = variableOptions.map((option) => ({
    label: localize(option.label) || option.label,
    onClick: () => handleAddVariable(option.label, option.value),
  }));

  return (
    <div>
      <div className="mb-2 flex items-center">
        {/* NJ: Customize how we explain the Instructions feature
        <label
          className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary"
          htmlFor="instructions"
        >
          {localize('com_ui_instructions')}
        </Label>
        */}
        <label
          className="text-token-text-primary block text-sm font-semibold"
          htmlFor="instructions"
        >
          Give your agent a task
          <span className="ml-1 text-status-error">*</span>
        </label>
        <HoverCard openDelay={50}>
          <HoverCardTrigger asChild>
            <span className="ml-2">
              <CircleHelpIcon className="h-4 w-4 text-text-tertiary" />
            </span>
          </HoverCardTrigger>
          <HoverCardPortal>
            <HoverCardContent side={ESide.Top} className="w-80">
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">
                  Agents work best when they have a clearly defined identity and behavior. Define
                  your agent&apos;s role, expertise, criteria for success, and how it should
                  respond.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardPortal>
        </HoverCard>
        {/* NJ: Use custom spacing around the buttons (and our classes on the buttons themselves) */}
        <div className="ml-auto flex items-center gap-1" title="Add variables to instructions">
          <DropdownPopup
            portal={true}
            mountByState={true}
            unmountOnHide={true}
            preserveTabOrder={true}
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            trigger={
              <Menu.MenuButton
                id="variables-menu-button"
                aria-label="Add variable to instructions"
                title="Add variable to instructions"
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-surface-primary-alt text-text-primary transition-colors duration-200 hover:bg-surface-tertiary"
              >
                <PlusCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden={true} />
              </Menu.MenuButton>
            }
            items={variableItems}
            menuId={menuId}
            className="pointer-events-auto z-30"
          />
          <TooltipAnchor
            description={localize('com_ui_expand_editor')}
            render={
              <Button
                variant="ghost"
                onClick={() => setIsDialogOpen(true)}
                aria-label={localize('com_ui_expand_editor')}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-surface-primary-alt p-0 text-text-primary transition-colors duration-200 hover:bg-surface-tertiary"
              >
                <Maximize2 className="h-4 w-4" strokeWidth={1.75} aria-hidden={true} />
              </Button>
            }
          />
        </div>
      </div>
      <Controller
        name="instructions"
        control={control}
        // NJ: We want agent instructions to be a required field
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <>
            <Textarea
              {...field}
              value={field.value ?? ''}
              className={cn(njInputClass, 'min-h-[118px] resize-y')}
              id="instructions"
              placeholder={localize('com_agents_instructions_placeholder')}
              rows={3}
              aria-label={localize('com_ui_instructions')}
              aria-required="true"
              aria-invalid={error ? 'true' : 'false'}
            />
            {error && (
              <span
                className="mt-1 text-xs text-red-500 transition duration-300 ease-in-out"
                role="alert"
              >
                {/* NJ: custom message for required agent
                instructions field} */}
                Add agent instructions before saving
              </span>
            )}
          </>
        )}
      />

      <OGDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <OGDialogContent
          className="flex h-[85vh] max-h-[85vh] w-11/12 max-w-6xl flex-col gap-4 p-6"
          showCloseButton={false}
        >
          <OGDialogHeader className="mb-2 pr-14">
            <OGDialogTitle className="text-left text-2xl font-semibold">
              {localize('com_ui_instructions')}
            </OGDialogTitle>
          </OGDialogHeader>
          <Controller
            name="instructions"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value ?? ''}
                className={cn(
                  textareaClass,
                  'min-h-0 flex-1 resize-none text-base leading-relaxed',
                )}
                placeholder={localize('com_agents_instructions_placeholder')}
                aria-label={localize('com_ui_instructions')}
              />
            )}
          />
          <div className="flex items-center justify-between">
            <DropdownPopup
              portal={true}
              mountByState={true}
              unmountOnHide={true}
              preserveTabOrder={true}
              isOpen={isDialogMenuOpen}
              setIsOpen={setIsDialogMenuOpen}
              trigger={
                <Menu.MenuButton
                  id="variables-menu-button-dialog"
                  render={
                    <Button variant="outline" className="gap-1.5">
                      <PlusCircle className="h-4 w-4" strokeWidth={1.75} aria-hidden={true} />
                      {localize('com_ui_variables')}
                    </Button>
                  }
                />
              }
              items={variableItems}
              menuId={dialogMenuId}
              className="pointer-events-auto z-[200]"
            />
            <OGDialogClose asChild>
              <Button>{localize('com_ui_done')}</Button>
            </OGDialogClose>
          </div>
        </OGDialogContent>
      </OGDialog>
    </div>
  );
}
