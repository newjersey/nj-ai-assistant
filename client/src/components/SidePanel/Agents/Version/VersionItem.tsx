import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, RotateCcw, Circle } from 'lucide-react';
import {
  Label,
  Button,
  OGDialog,
  OGDialogTrigger,
  OGDialogTemplate,
  TooltipAnchor,
} from '@librechat/client';
import type { VersionRecord } from './types';
import { useLocalize, useClockFormat } from '~/hooks';
import { cn } from '~/utils';

type VersionItemProps = {
  version: VersionRecord;
  index: number;
  isActive: boolean;
  versionsLength: number;
  onRestore: (index: number) => void;
};

function getTimestampDate(version: VersionRecord): Date | null {
  const value = version.updatedAt ?? version.createdAt;
  if (!value) {
    return null;
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date;
}

function countItems(value: unknown): number {
  return Array.isArray(value) ? value.length : 0;
}

export default function VersionItem({
  version,
  index,
  isActive,
  versionsLength,
  onRestore,
}: VersionItemProps) {
  const localize = useLocalize();
  const hour12 = useClockFormat();
  const [open, setOpen] = useState(false);

  const versionNumber = versionsLength - index;
  const isLatest = index === 0;
  const isLast = index === versionsLength - 1;

  const date = getTimestampDate(version);
  const hasUpdatedAt = version.updatedAt != null;
  const hasCreatedAt = version.createdAt != null;
  const fallbackDateLabel = localize(
    hasUpdatedAt || hasCreatedAt
      ? 'com_ui_agent_version_unknown_date'
      : 'com_ui_agent_version_no_date',
  );
  const relativeLabel = date ? formatDistanceToNow(date, { addSuffix: true }) : fallbackDateLabel;
  const absoluteLabel = date ? date.toLocaleString(undefined, { hour12 }) : relativeLabel;

  const toolsCount = countItems(version.tools);
  const capabilitiesCount = countItems(version.capabilities);
  const summaryChips: Array<{ key: string; label: string }> = [];
  if (toolsCount > 0) {
    summaryChips.push({
      key: 'tools',
      label: localize(toolsCount === 1 ? 'com_ui_tools_count_one' : 'com_ui_tools_count', {
        count: toolsCount,
      }),
    });
  }
  if (capabilitiesCount > 0) {
    summaryChips.push({
      key: 'capabilities',
      label: localize(
        capabilitiesCount === 1 ? 'com_ui_capabilities_count_one' : 'com_ui_capabilities_count',
        { count: capabilitiesCount },
      ),
    });
  }

  const versionName = typeof version.name === 'string' ? version.name : null;
  const versionTitle = localize('com_ui_agent_version_title', { versionNumber });

  return (
    <li className="relative flex items-stretch" aria-current={isActive ? 'true' : undefined}>
      {/* Timeline rail */}
      <div className="relative flex w-6 shrink-0 justify-center">
        {!isLast && (
          <div
            className={cn(
<<<<<<< HEAD
              'absolute -bottom-3 top-0 w-px',
=======
              'absolute top-0 -bottom-3 w-px',
>>>>>>> upstream/main
              isActive ? 'bg-status-success-strong' : 'bg-border-light',
            )}
          />
        )}
        <div
          className={cn(
            'relative z-10 mt-4 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
            isActive
              ? 'border-status-success-strong bg-status-success-strong text-text-on-status'
              : 'border-border-medium bg-surface-primary text-text-secondary',
          )}
          aria-hidden="true"
        >
          {isActive ? (
            <Check className="size-3" strokeWidth={3} />
          ) : (
            <Circle className="size-1.5" fill="currentColor" />
          )}
        </div>
      </div>

      {/* Card */}
      <div
        className={cn(
          'group relative mb-2 ml-2 flex flex-1 flex-col rounded-xl border p-3 transition-colors',
          isActive
            ? 'border-status-success-border bg-status-success-subtle'
<<<<<<< HEAD
            : 'border-border-light bg-transparent hover:border-border-medium hover:bg-surface-secondary',
=======
            : 'border-border-light hover:border-border-medium hover:bg-surface-secondary bg-transparent',
>>>>>>> upstream/main
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'truncate text-sm font-semibold',
                  isActive ? 'text-status-success' : 'text-text-primary',
                )}
              >
                {versionTitle}
              </span>
              {isActive && (
<<<<<<< HEAD
                <span className="inline-flex items-center gap-1 rounded-full bg-status-success-subtle px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-status-success">
                  <span
                    className="size-1.5 rounded-full bg-status-success-strong"
=======
                <span className="bg-status-success-subtle text-status-success inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
                  <span
                    className="bg-status-success-strong size-1.5 rounded-full"
>>>>>>> upstream/main
                    aria-hidden="true"
                  />
                  {localize('com_ui_agent_version_current')}
                </span>
              )}
              {!isActive && isLatest && (
<<<<<<< HEAD
                <span className="rounded-full bg-surface-tertiary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
=======
                <span className="bg-surface-tertiary text-text-secondary rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase">
>>>>>>> upstream/main
                  {localize('com_ui_latest')}
                </span>
              )}
            </div>
            {versionName && (
<<<<<<< HEAD
              <span className="mt-0.5 truncate text-xs text-text-secondary" title={versionName}>
=======
              <span className="text-text-secondary mt-0.5 truncate text-xs" title={versionName}>
>>>>>>> upstream/main
                {versionName}
              </span>
            )}
          </div>
          {!isActive && (
            <OGDialog open={open} onOpenChange={setOpen}>
              <OGDialogTrigger asChild>
                <TooltipAnchor
                  description={localize('com_ui_agent_version_restore')}
                  side="left"
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={localize('com_ui_agent_version_restore')}
<<<<<<< HEAD
                      className="size-7 flex-shrink-0 rounded-lg border border-border-light text-text-secondary opacity-0 transition-all hover:border-border-medium focus:outline-none focus-visible:opacity-100 group-hover:opacity-100"
=======
                      className="border-border-light text-text-secondary hover:border-border-medium size-7 shrink-0 rounded-lg border opacity-0 transition-all group-hover:opacity-100 focus-visible:opacity-100"
>>>>>>> upstream/main
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </Button>
                  }
                />
              </OGDialogTrigger>
              <OGDialogTemplate
                title={localize('com_ui_agent_version_restore_confirm')}
<<<<<<< HEAD
                className="max-w-[450px]"
                main={
                  <div className="flex w-full flex-col gap-3 text-sm">
                    <Label className="text-left font-medium text-text-primary">
                      {localize('com_ui_agent_version_restore_description')}
                    </Label>
                    <div className="rounded-lg border border-border-light bg-surface-secondary px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-text-primary">
                          {versionTitle}
                        </span>
                        <time
                          className="text-xs text-text-secondary"
=======
                className="max-w-[28.125rem]"
                main={
                  <div className="flex w-full flex-col gap-3 text-sm">
                    <Label className="text-text-primary text-left font-medium">
                      {localize('com_ui_agent_version_restore_description')}
                    </Label>
                    <div className="border-border-light bg-surface-secondary rounded-lg border px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-text-primary text-sm font-semibold">
                          {versionTitle}
                        </span>
                        <time
                          className="text-text-secondary text-xs"
>>>>>>> upstream/main
                          dateTime={date?.toISOString()}
                        >
                          {absoluteLabel}
                        </time>
                      </div>
                      {versionName && (
<<<<<<< HEAD
                        <div className="mt-1 truncate text-xs text-text-secondary">
=======
                        <div className="text-text-secondary mt-1 truncate text-xs">
>>>>>>> upstream/main
                          {versionName}
                        </div>
                      )}
                    </div>
                  </div>
                }
                selection={{
                  selectHandler: () => onRestore(index),
                  selectClasses:
                    'bg-surface-submit hover:bg-surface-submit-hover text-text-on-status',
                  selectText: localize('com_ui_agent_version_restore'),
                }}
              />
            </OGDialog>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          {date ? (
            <TooltipAnchor
              description={absoluteLabel}
              side="bottom"
              render={
                <time
                  dateTime={date.toISOString()}
<<<<<<< HEAD
                  className="cursor-help text-xs text-text-secondary"
=======
                  className="text-text-secondary cursor-help text-xs"
>>>>>>> upstream/main
                >
                  {relativeLabel}
                </time>
              }
            />
          ) : (
<<<<<<< HEAD
            <span className="text-xs text-text-secondary">{relativeLabel}</span>
=======
            <span className="text-text-secondary text-xs">{relativeLabel}</span>
>>>>>>> upstream/main
          )}
          {summaryChips.length > 0 && (
            <>
              <span aria-hidden="true" className="text-text-tertiary">
                ·
              </span>
              {summaryChips.map((chip, i) => (
                <span key={chip.key} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span aria-hidden="true" className="text-text-tertiary">
                      ·
                    </span>
                  )}
<<<<<<< HEAD
                  <span className="text-xs text-text-secondary">{chip.label}</span>
=======
                  <span className="text-text-secondary text-xs">{chip.label}</span>
>>>>>>> upstream/main
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </li>
  );
}
