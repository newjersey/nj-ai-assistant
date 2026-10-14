<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronLeft, Check, Copy } from 'lucide-react';
import { Button, TooltipAnchor, labelVariants, useToastContext } from '@librechat/client';
import type { AgentForm } from '~/common';
import { useAgentPanelContext } from '~/Providers';
import OrchestrationHub from './OrchestrationHub';
import MaxAgentSteps from './MaxAgentSteps';
import { groupHeadingClass } from './ui';
=======
import { useState } from 'react';
import { ChevronLeft, Check, Copy } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { Button, TooltipAnchor, labelVariants, useToastContext } from '@librechat/client';
import type { AgentForm } from '~/common';
import { useAgentPanelContext } from '~/Providers';
import MaxAgentSteps from './MaxAgentSteps';
import { groupHeadingClass } from './ui';
import AgentChain from './AgentChain';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';
import { Panel } from '~/common';

export default function AdvancedPanel() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
<<<<<<< HEAD
  const { watch } = useFormContext<AgentForm>();
  const currentAgentId = watch('id');
=======
  const { watch, control } = useFormContext<AgentForm>();
  const currentAgentId = watch('id');
  const chainIds = watch('agent_ids');
>>>>>>> upstream/main
  const [copied, setCopied] = useState(false);

  const { setActivePanel } = useAgentPanelContext();

<<<<<<< HEAD
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

=======
>>>>>>> upstream/main
  const handleCopyAgentId = async () => {
    if (!currentAgentId) return;
    try {
      await navigator.clipboard.writeText(currentAgentId);
      setCopied(true);
      showToast({ message: localize('com_ui_agent_id_copied'), status: 'success' });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast({ message: localize('com_ui_error'), status: 'error' });
    }
  };

  return (
    <div className="mb-1 flex w-full flex-col gap-4 text-sm">
      <header className="grid grid-cols-[auto_1fr_auto] items-center gap-2 pt-1">
<<<<<<< HEAD
        {/* NJ: Use custom styling */}
        <button
          type="button"
          onClick={() => setActivePanel(Panel.builder)}
          aria-label={localize('com_ui_back_to_builder')}
          className="btn btn-neutral relative"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </button>
        <div className="mb-2 mt-2 text-xl font-medium">{localize('com_ui_advanced_settings')}</div>
        <span aria-hidden="true" className="h-10 w-10" />
=======
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setActivePanel(Panel.builder)}
          aria-label={localize('com_ui_back_to_builder')}
          className="border-border-light text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus-visible:ring-text-primary shrink-0 rounded-xl border focus-visible:ring-2"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
        </Button>
        <h2 className="text-text-primary text-center text-base font-semibold">
          {localize('com_ui_advanced_settings')}
        </h2>
        <span
          aria-hidden="true"
          className="size-theme-button min-h-theme-target min-w-theme-target"
        />
>>>>>>> upstream/main
      </header>

      <div className="flex flex-col gap-5 px-2 pb-2">
        <section className="flex flex-col gap-3">
          <span className={groupHeadingClass}>{localize('com_ui_essentials')}</span>
          <MaxAgentSteps />
        </section>

<<<<<<< HEAD
        <OrchestrationHub currentAgentId={currentAgentId} />

        {currentAgentId && (
          <div className="flex items-center justify-between gap-2 border-t border-border-light pt-3">
=======
        {(chainIds?.length ?? 0) > 0 && (
          <Controller
            name="agent_ids"
            control={control}
            defaultValue={[]}
            render={({ field }) => <AgentChain field={field} currentAgentId={currentAgentId} />}
          />
        )}

        {currentAgentId && (
          <div className="border-border-light flex items-center justify-between gap-2 border-t pt-3">
>>>>>>> upstream/main
            <span className={labelVariants({ variant: 'section' })}>
              {localize('com_ui_agent_id')}
            </span>
            <TooltipAnchor
              description={currentAgentId}
              render={
<<<<<<< HEAD
                <button
                  type="button"
                  onClick={handleCopyAgentId}
                  title={currentAgentId}
                  aria-label={localize('com_ui_agent_id_copy')}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-text-secondary transition-colors hover:bg-surface-secondary hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
                >
                  <code className="max-w-[150px] truncate font-mono text-xs">{currentAgentId}</code>
=======
                <Button
                  variant="ghost"
                  onClick={handleCopyAgentId}
                  aria-label={localize('com_ui_agent_id_copy')}
                  className="text-text-secondary hover:bg-surface-secondary hover:text-text-primary focus-visible:ring-text-primary h-auto gap-1.5 rounded-lg px-2 py-1 focus-visible:ring-2"
                >
                  <code className="max-w-[9.375rem] truncate font-mono text-xs">
                    {currentAgentId}
                  </code>
>>>>>>> upstream/main
                  <span className="t-icon-swap" data-state={copied ? 'b' : 'a'} aria-hidden="true">
                    <span className="t-icon" data-icon="a">
                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="t-icon" data-icon="b">
<<<<<<< HEAD
                      <Check className="h-3.5 w-3.5 text-status-success" aria-hidden="true" />
                    </span>
                  </span>
                </button>
=======
                      <Check className="text-status-success h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </Button>
>>>>>>> upstream/main
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
