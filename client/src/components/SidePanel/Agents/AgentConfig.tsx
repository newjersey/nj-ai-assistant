/* eslint-disable i18next/no-literal-string */
/* ^ We're not worried about i18n for this app ^ */

import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { Input, Label } from '@librechat/client';
import { Controller, useWatch, useFormContext } from 'react-hook-form';
import type { AgentForm } from '~/common';
import { ResolvedProviderIcon } from '~/components/Endpoints/ResolvedProviderIcon';
import { njInputClass } from '~/nj/components/Agents/agentInputStyle';
import { validateEmail, cn, createProviderOption } from '~/utils';
import FileContext from '~/nj/components/Agents/FileContext';
import AgentCategorySelector from './AgentCategorySelector';
import { useLocalize, useAgentCapabilities } from '~/hooks';
import FileSearch from '~/nj/components/Agents/FileSearch';
import TipComponent from '~/nj/components/TipComponent';
import { useAgentFileEntries } from './Tools/hooks';
import { useAgentPanelContext } from '~/Providers';
import { useProviderIcon } from '~/hooks/Endpoint';
import ToolsSection from './Tools/ToolsSection';
import Instructions from './Instructions';
import AgentAvatar from './AgentAvatar';
import { Panel } from '~/common';
import store from '~/store';

const fieldClass = 'h-9';
const sectionLabelClass = 'font-semibold';
const labelClass = 'mb-2 text-token-text-primary block text-sm font-semibold';

export default function AgentConfig() {
  const localize = useLocalize();
  const methods = useFormContext<AgentForm>();
  const { setActivePanel, endpointsConfig, agentsConfig } = useAgentPanelContext();
  const { contextEnabled, fileSearchEnabled } = useAgentCapabilities(agentsConfig?.capabilities);

  const {
    control,
    formState: { errors },
  } = methods;
  const provider = useWatch({ control, name: 'provider' });
  const model = useWatch({ control, name: 'model' });
  const agent = useWatch({ control, name: 'agent' });
  const agent_id = useWatch({ control, name: 'id' });
  const { contextFiles, knowledgeFiles } = useAgentFileEntries();

  // NJ: We don't allow users to select their model, so we have to set it by default
  const defaultPreset = useRecoilValue(store.defaultPreset);
  useEffect(() => {
    if (defaultPreset?.endpoint && defaultPreset?.model) {
      methods.setValue('provider', createProviderOption(defaultPreset.endpoint));
      methods.setValue('model', defaultPreset.model);
    }
  }, [defaultPreset, methods]);

  const providerValue = typeof provider === 'string' ? provider : provider?.value;
  const { provider: providerId, imageURL } = useProviderIcon({
    endpoint: providerValue as string,
    endpointsConfig,
  });

  /**
   * NJ: There are enough customizations that we simply return our own component lib
   *
   * Make sure to check that the LibreChat implementation hasn't drifted too far functionality-wise!
   */
  return (
    <div className="h-auto pt-3">
      {/* Identity */}
      <div className="mx-3">
        <h3 className={sectionLabelClass}>Identity</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Give your agent a clear, descriptive name
        </p>
      </div>

      <div className="px-3 pb-3 pt-4">
        <label className={labelClass} htmlFor="name">
          Agent Name
          <span className="ml-1 text-status-error">*</span>
        </label>
        <Controller
          name="name"
          rules={{ required: localize('com_ui_agent_name_is_required') }}
          control={control}
          render={({ field }) => (
            <>
              <input
                {...field}
                value={field.value ?? ''}
                maxLength={256}
                className={njInputClass}
                id="name"
                type="text"
                placeholder="Required: give your agent a name"
              />
              <div
                className={cn(
                  'mt-1 w-56 text-sm text-status-error',
                  errors.name ? 'visible h-auto' : 'invisible h-0',
                )}
                role="alert"
              >
                {errors.name ? errors.name.message : ' '}
              </div>
            </>
          )}
        />
      </div>

      <div className="px-3 pb-4">
        <label className={labelClass} htmlFor="description">
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              value={field.value ?? ''}
              maxLength={512}
              className={njInputClass}
              id="description"
              type="text"
              placeholder="Optional: Describe your Agent here"
              aria-label="Agent description"
            />
          )}
        />
      </div>

      <hr className="mb-4 border-border-light" />

      {/* Instructions */}
      <div className="mx-3 pb-3">
        <h3 className={sectionLabelClass}>Instructions</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Define what your agent does, how it behaves, and what it should focus on.
        </p>
      </div>

      <div className="px-3">
        <Instructions />
      </div>

      <div className="mb-3 mt-1 flex w-full justify-end pr-4">
        <Link
          to="nj/agent-guide"
          className="text-sm font-semibold text-blue-500 underline hover:text-blue-600"
        >
          View agent guide
        </Link>
      </div>

      <TipComponent
        title="Building complex instructions?"
        description="For longer or more complex instructions, you can upload them as a file instead of writing them here."
        stateKey="showAgentComplexBanner"
      />

      {/* File context */}
      {contextEnabled && <FileContext agent_id={agent_id} files={contextFiles} />}

      {/* File search */}
      {fileSearchEnabled && <FileSearch agent_id={agent_id} files={knowledgeFiles} />}
    </div>
  );

  return (
    <div className="h-auto pt-1">
      {/* IDENTITY — flat header, always visible, avatar inline */}
      <div className="mb-3 mt-1 flex items-center gap-3">
        <div className="flex-shrink-0">
          <AgentAvatar avatar={agent?.['avatar'] ?? null} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Controller
            name="name"
            rules={{ required: localize('com_ui_agent_name_is_required') }}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <Input
                  {...field}
                  value={field.value ?? ''}
                  maxLength={256}
                  className={cn(fieldClass, 'font-medium')}
                  id="name"
                  type="text"
                  placeholder={localize('com_agents_name_placeholder')}
                  aria-label={localize('com_ui_agent_name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'agent-name-error' : undefined}
                />
                {errors.name && (
                  <div id="agent-name-error" className="mt-1 text-xs text-red-500" role="alert">
                    {errors.name.message}
                  </div>
                )}
              </div>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value ?? ''}
                maxLength={512}
                className={fieldClass}
                id="description"
                type="text"
                placeholder={localize('com_agents_description_placeholder')}
                aria-label={localize('com_ui_agent_description')}
              />
            )}
          />
        </div>
      </div>

      {/* MODEL + CATEGORY — balanced 2-column grid */}
      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="flex min-w-0 flex-col">
          <Label
            className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-text-secondary"
            htmlFor="provider"
          >
            {localize('com_ui_model')} <span className="text-red-500">*</span>
          </Label>
          <button
            id="provider"
            type="button"
            onClick={() => setActivePanel(Panel.model)}
            title={model || undefined}
            className={cn(
              'relative flex h-9 w-full min-w-0 items-center overflow-hidden rounded-lg border border-border-light bg-surface-secondary text-sm font-medium text-text-primary transition-colors hover:bg-surface-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary',
              model != null && model ? 'px-1' : 'px-3',
            )}
          >
            <div className="flex w-full min-w-0 items-center gap-2">
              {providerValue !== undefined && (
                <div className="shadow-stroke relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white text-black dark:bg-white">
                  {/* NJ: This block leads to TypeScript errors
                  <ResolvedProviderIcon
                    provider={providerId}
                    imageURL={imageURL}
                    size={16}
                    className="h-2/3 w-2/3"
                  />
                  */}
                </div>
              )}
              <span className="truncate">
                {model != null && model ? model : localize('com_ui_select_model')}
              </span>
            </div>
          </button>
        </div>
        <div className="flex flex-col">
          <Label
            className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-text-secondary"
            htmlFor="category-selector"
          >
            {localize('com_ui_category')} <span className="text-red-500">*</span>
          </Label>
          <AgentCategorySelector className="w-full rounded-lg" />
        </div>
      </div>

      {/* INSTRUCTIONS */}
      <Instructions />

      {/* TOOLS — unified built-ins / tools / actions / mcp / skills */}
      <ToolsSection agentId={agent_id} />

      {/* FILE CONTEXT — standalone section, separate from the tool library */}
      {contextEnabled && (
        <div className="mb-3">
          <FileContext agent_id={agent_id} files={contextFiles} />
        </div>
      )}

      {/* SUPPORT CONTACT */}
      <div className="mb-3 flex flex-col">
        <Label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          {localize('com_ui_support_contact')}
        </Label>
        <div className="space-y-2">
          <Controller
            name="support_contact.name"
            control={control}
            rules={{
              minLength: {
                value: 3,
                message: localize('com_ui_support_contact_name_min_length', { minLength: 3 }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col">
                <Input
                  {...field}
                  value={field.value ?? ''}
                  className={cn(fieldClass, error && 'border-2 border-red-500')}
                  id="support-contact-name"
                  type="text"
                  placeholder={localize('com_ui_support_contact_name_placeholder')}
                  aria-label={localize('com_ui_support_contact_name')}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'support-contact-name-error' : undefined}
                />
                {error && (
                  <span
                    id="support-contact-name-error"
                    className="mt-1 text-xs text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
          <Controller
            name="support_contact.email"
            control={control}
            rules={{
              validate: (value) =>
                validateEmail(value ?? '', localize('com_ui_support_contact_email_invalid')),
            }}
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col">
                <Input
                  {...field}
                  value={field.value ?? ''}
                  className={cn(fieldClass, error && 'border-2 border-red-500')}
                  id="support-contact-email"
                  type="email"
                  placeholder={localize('com_ui_support_contact_email_placeholder')}
                  aria-label={localize('com_ui_support_contact_email')}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'support-contact-email-error' : undefined}
                />
                {error && (
                  <span
                    id="support-contact-email-error"
                    className="mt-1 text-xs text-red-500"
                    role="alert"
                    aria-live="polite"
                  >
                    {error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
