import { memo } from 'react';
import type { TranslationKeys } from '~/hooks';
import type { TraceSummary } from './model';
import { formatCost, formatTokens } from '~/utils/tokens';
import { useTraceFormat } from './format';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type SummaryItem = { key: string; label: TranslationKeys; value: string; alert?: boolean };

function TraceSummaryBar({
  summary,
<<<<<<< HEAD
=======
  unrecordedCalls,
>>>>>>> upstream/main
  showCost,
  currency,
}: {
  summary: TraceSummary;
<<<<<<< HEAD
=======
  /** Tool calls the trace names no record for, by response, as the chat's messages count them. */
  unrecordedCalls?: ReadonlyMap<string, number>;
>>>>>>> upstream/main
  showCost: boolean;
  currency?: { code: string; rate: number };
}) {
  const localize = useLocalize();
  const format = useTraceFormat();
<<<<<<< HEAD
=======
  let toolCalls = summary.toolCalls;
  for (const count of unrecordedCalls?.values() ?? []) {
    toolCalls += count;
  }
>>>>>>> upstream/main
  const items: SummaryItem[] = [
    {
      key: 'duration',
      label: 'com_ui_trace_summary_duration',
      value: format.duration(summary.duration),
    },
    { key: 'turns', label: 'com_ui_trace_summary_turns', value: String(summary.turns) },
    {
      key: 'generations',
      label: 'com_ui_trace_summary_generations',
      value: String(summary.generations),
    },
<<<<<<< HEAD
    { key: 'tools', label: 'com_ui_trace_summary_tools', value: String(summary.toolCalls) },
=======
    { key: 'tools', label: 'com_ui_trace_summary_tools', value: String(toolCalls) },
    ...(summary.labels > 0
      ? [
          {
            key: 'labels',
            label: 'com_ui_trace_summary_labels' as const,
            value: String(summary.labels),
          },
        ]
      : []),
>>>>>>> upstream/main
    {
      key: 'tokens',
      label: 'com_ui_trace_summary_tokens',
      value: formatTokens(summary.totalTokens),
    },
  ];
  if (showCost && summary.cost != null) {
    items.push({
      key: 'cost',
      label: 'com_ui_trace_summary_cost',
      value: formatCost(summary.cost, currency),
    });
  }
  if (summary.errors > 0) {
    items.push({
      key: 'errors',
      label: 'com_ui_trace_summary_errors',
      value: String(summary.errors),
      alert: true,
    });
  }

  return (
    <dl
      aria-label={localize('com_ui_trace_summary')}
      className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm"
    >
      {items.map((item) => (
        <div key={item.key} className="flex items-baseline gap-1.5">
<<<<<<< HEAD
          <dt className="text-xs text-text-secondary">{localize(item.label)}</dt>
=======
          <dt className="text-text-secondary text-xs">{localize(item.label)}</dt>
>>>>>>> upstream/main
          <dd
            className={cn(
              'font-medium tabular-nums',
              item.alert === true ? 'text-status-error' : 'text-text-primary',
            )}
          >
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default memo(TraceSummaryBar);
