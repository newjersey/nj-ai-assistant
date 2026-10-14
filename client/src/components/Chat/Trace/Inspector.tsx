<<<<<<< HEAD
import { memo, useId } from 'react';
import { X } from 'lucide-react';
import { Button, Spinner } from '@librechat/client';
import type { TTraceContent } from 'librechat-data-provider';
import type { ReactNode } from 'react';
import type { TranslationKeys } from '~/hooks';
import type { TraceNode } from './model';
import { useConversationTraceRecordQuery } from '~/data-provider';
import { useTraceFormat, recordDurationText } from './format';
import { formatCost, formatTokens } from '~/utils/tokens';
import { KIND_APPEARANCE, STATUS_LABEL } from './kinds';
import { formatJSON } from '~/utils/json';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

type Field = { label: TranslationKeys; value: ReactNode };
=======
import { memo, useId, useState } from 'react';
import copy from 'copy-to-clipboard';
import { Link } from 'react-router-dom';
import { X, Copy, Check, MessageSquare } from 'lucide-react';
import { Button, Spinner, buttonVariants } from '@librechat/client';
import type { TTraceContent, TTraceRecordDetail } from 'librechat-data-provider';
import type { ReactNode } from 'react';
import type { RecordPresentation, ToolCallView } from './present';
import type { TranslationKeys } from '~/hooks';
import type { TraceNode } from './model';
import StackedToolIcons from '~/components/Chat/Messages/Content/ToolOutput/StackedToolIcons';
import { useConversationTraceRecordQuery } from '~/data-provider';
import { useTraceFormat, recordDurationText } from './format';
import { formatCost, formatTokens } from '~/utils/tokens';
import { appearanceOf, STATUS_LABEL } from './kinds';
import { cn, renderAgentAvatar } from '~/utils';
import Conversation from './Conversation';
import { formatJSON } from '~/utils/json';
import { useLocalize } from '~/hooks';

type Field = { label: TranslationKeys; value: ReactNode };
type ToolFor = (name: string) => Pick<RecordPresentation, 'title' | 'caption'>;
>>>>>>> upstream/main

function Section({ title, fields }: { title: TranslationKeys; fields: Field[] }) {
  const localize = useLocalize();
  if (fields.length === 0) {
    return null;
  }
  return (
    <section className="flex flex-col gap-1.5">
<<<<<<< HEAD
      <h4 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
=======
      <h4 className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
>>>>>>> upstream/main
        {localize(title)}
      </h4>
      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm">
        {fields.map((field) => (
          <div key={field.label} className="contents">
            <dt className="text-text-secondary">{localize(field.label)}</dt>
<<<<<<< HEAD
            <dd className="min-w-0 break-words text-right tabular-nums text-text-primary">
=======
            <dd className="text-text-primary min-w-0 text-right break-words tabular-nums">
>>>>>>> upstream/main
              {field.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ContentBlock({ label, content }: { label: TranslationKeys; content?: TTraceContent }) {
  const localize = useLocalize();
  if (!content) {
    return null;
  }
  const text = content.truncated ? content.value : formatJSON(content.value);
  return (
    <section className="flex flex-col gap-1">
<<<<<<< HEAD
      <h4 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        {localize(label)}
      </h4>
      <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg border border-border-light bg-surface-primary-alt p-2 font-mono text-xs text-text-primary">
        {text}
      </pre>
      {content.truncated && (
        <p className="text-xs text-text-secondary">{localize('com_ui_trace_truncated')}</p>
=======
      <h4 className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
        {localize(label)}
      </h4>
      <pre className="border-border-light bg-surface-primary-alt text-text-primary max-h-80 overflow-auto rounded-lg border p-2 font-mono text-xs break-words whitespace-pre-wrap">
        {text}
      </pre>
      {content.truncated && (
        <p className="text-text-secondary text-xs">{localize('com_ui_trace_truncated')}</p>
>>>>>>> upstream/main
      )}
    </section>
  );
}

function RecordContent({
  conversationId,
  recordId,
  messageId,
  sourceId,
<<<<<<< HEAD
=======
  toolFor,
  mcpIconMap,
  placeholder,
>>>>>>> upstream/main
}: {
  conversationId: string;
  recordId: string;
  messageId: string;
  sourceId?: string;
<<<<<<< HEAD
}) {
  const localize = useLocalize();
=======
  toolFor: ToolFor;
  mcpIconMap: Map<string, string>;
  /** What the chat already knows the record wrote: shown at once, until the record's own reply loads. */
  placeholder?: ReactNode;
}) {
  const localize = useLocalize();
  const [raw, setRaw] = useState(false);
>>>>>>> upstream/main
  const { data, isLoading, isError, refetch } = useConversationTraceRecordQuery(
    { conversationId, recordId, messageId, sourceId },
    true,
  );

  if (isLoading) {
    return (
<<<<<<< HEAD
      <div className="flex justify-center py-4" role="status">
        <Spinner className="size-4 text-text-secondary" />
        <span className="sr-only">{localize('com_ui_trace_loading')}</span>
      </div>
=======
      <>
        {placeholder}
        <div className="flex justify-center py-4" role="status">
          <Spinner className="text-text-secondary size-4" />
          <span className="sr-only">{localize('com_ui_trace_loading')}</span>
        </div>
      </>
>>>>>>> upstream/main
    );
  }
  if (isError || !data) {
    return (
<<<<<<< HEAD
      <div className="flex flex-col items-start gap-2 text-sm text-text-secondary">
=======
      <div className="text-text-secondary flex flex-col items-start gap-2 text-sm">
>>>>>>> upstream/main
        <p>{localize('com_ui_trace_content_error')}</p>
        <Button size="sm" variant="outline" onClick={() => refetch()}>
          {localize('com_ui_retry')}
        </Button>
      </div>
    );
  }
  if (!data.contentAvailable) {
<<<<<<< HEAD
    return <p className="text-sm text-text-secondary">{localize('com_ui_trace_content_hidden')}</p>;
  }
  if (!data.input && !data.output && !data.metadata) {
    return <p className="text-sm text-text-secondary">{localize('com_ui_trace_content_empty')}</p>;
  }
  return (
    <div className="flex flex-col gap-3">
      <ContentBlock label="com_ui_trace_input" content={data.input} />
      <ContentBlock label="com_ui_trace_output" content={data.output} />
      <ContentBlock label="com_ui_trace_metadata" content={data.metadata} />
=======
    return <p className="text-text-secondary text-sm">{localize('com_ui_trace_content_hidden')}</p>;
  }
  if (!data.input && !data.output && !data.metadata) {
    return <p className="text-text-secondary text-sm">{localize('com_ui_trace_content_empty')}</p>;
  }
  const readable = data.prompt != null || data.reply != null;
  return (
    <div className="flex flex-col gap-3">
      {data.reply == null && placeholder}
      {readable && (
        <Button
          size="sm"
          variant="ghost"
          aria-pressed={raw}
          className="self-end"
          onClick={() => setRaw((current) => !current)}
        >
          {localize(raw ? 'com_ui_trace_view_conversation' : 'com_ui_trace_view_raw')}
        </Button>
      )}
      {readable && !raw && (
        <Conversation
          prompt={data.prompt}
          reply={data.reply}
          toolTitleFor={toolFor}
          mcpIconMap={mcpIconMap}
        />
      )}
      {(!readable || raw) && (
        <RawContent input={data.input} output={data.output} metadata={data.metadata} />
      )}
>>>>>>> upstream/main
    </div>
  );
}

<<<<<<< HEAD
/** Details for the selected record; input and output load only when the deployment allows them. */
function Inspector({
  node,
=======
function RawContent({
  input,
  output,
  metadata,
}: Pick<TTraceRecordDetail, 'input' | 'output' | 'metadata'>) {
  return (
    <div className="flex flex-col gap-3">
      <ContentBlock label="com_ui_trace_input" content={input} />
      <ContentBlock label="com_ui_trace_output" content={output} />
      <ContentBlock label="com_ui_trace_metadata" content={metadata} />
    </div>
  );
}

const COPIED_MS = 2000;
const CALL_CONTENT_LENGTH = 4000;

function toContent(value?: string, previewed = false): TTraceContent | undefined {
  if (value == null) {
    return undefined;
  }
  const truncated = value.length > CALL_CONTENT_LENGTH;
  return {
    value: truncated ? value.slice(0, CALL_CONTENT_LENGTH) : value,
    truncated: truncated || previewed,
  };
}

/** The saved agent a record ran: who it is, its id to copy, and a chat with it one click away. */
function AgentCard({ agent, agentId }: { agent: RecordPresentation['agent']; agentId: string }) {
  const localize = useLocalize();
  const [copied, setCopied] = useState(false);
  const copyId = () => {
    copy(agentId);
    setCopied(true);
    setTimeout(() => setCopied(false), COPIED_MS);
  };
  return (
    <section className="flex flex-col gap-3">
      {agent?.description != null && agent.description !== '' && (
        <p className="text-text-secondary text-sm">{agent.description}</p>
      )}
      {agent == null && (
        <p className="text-text-secondary text-sm">{localize('com_ui_trace_agent_unavailable')}</p>
      )}
      <div className="border-border-light bg-surface-primary-alt flex items-center gap-1 rounded-lg border py-0.5 pr-0.5 pl-2.5">
        <span className="text-text-secondary min-w-0 flex-1 truncate font-mono text-xs select-all">
          {agentId}
        </span>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={copyId}
          aria-label={localize(copied ? 'com_ui_copied' : 'com_ui_trace_copy_agent_id')}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <Copy className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      {agent != null && (
        <Link
          to={`/c/new?agent_id=${encodeURIComponent(agentId)}`}
          className={cn(buttonVariants({ variant: 'default', size: 'sm' }), 'self-start')}
        >
          <MessageSquare className="size-4" aria-hidden="true" />
          {localize('com_ui_trace_chat_with_agent')}
        </Link>
      )}
    </section>
  );
}

/** A tool round's calls as the chat's own tool cards hold them: no trace read, no content gate. */
function ToolCalls({
  calls,
  fromConversation,
  mcpIconMap,
}: {
  calls: ToolCallView[];
  /** The chat's own message supplied the calls; otherwise they are only the names the trace recorded. */
  fromConversation: boolean;
  mcpIconMap: Map<string, string>;
}) {
  const localize = useLocalize();
  return (
    <section className="flex flex-col gap-3">
      {calls.map((call, index) => (
        <div key={`${call.name}-${index}`} className="flex flex-col gap-1.5">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <StackedToolIcons toolNames={[call.name]} mcpIconMap={mcpIconMap} />
            <span className="min-w-0 truncate">{call.title}</span>
            {call.caption != null && (
              <span className="text-text-secondary truncate text-xs font-normal">
                {call.caption}
              </span>
            )}
          </h4>
          <ContentBlock
            label="com_ui_trace_tool_sent"
            content={toContent(call.input, call.inputTruncated)}
          />
          <ContentBlock
            label="com_ui_trace_tool_returned"
            content={toContent(call.output, call.outputTruncated)}
          />
        </div>
      ))}
      {fromConversation && (
        <p className="text-text-secondary text-xs">{localize('com_ui_trace_from_conversation')}</p>
      )}
    </section>
  );
}

/** Details for the selected record; input and output load only when the deployment allows them. */
function Inspector({
  node,
  presentation,
  mcpIconMap,
  toolFor,
>>>>>>> upstream/main
  turnStart,
  sourceId,
  conversationId,
  showContent,
  showCost,
  currency,
  onClose,
}: {
  node: TraceNode;
<<<<<<< HEAD
=======
  presentation: RecordPresentation;
  mcpIconMap: Map<string, string>;
  toolFor: ToolFor;
>>>>>>> upstream/main
  turnStart: number;
  /** The page source that listed this record. */
  sourceId?: string;
  conversationId: string;
  showContent: boolean;
  showCost: boolean;
  currency?: { code: string; rate: number };
  onClose: () => void;
}) {
  const localize = useLocalize();
  const format = useTraceFormat();
  const headingId = useId();
  const { record } = node;
<<<<<<< HEAD
  const appearance = KIND_APPEARANCE[record.kind];
=======
  const appearance = appearanceOf(record);
>>>>>>> upstream/main
  const Icon = appearance.icon;
  const { usage } = record;

  const timing: Field[] = [
    { label: 'com_ui_trace_started', value: format.clock(node.start) },
    { label: 'com_ui_trace_offset', value: format.duration(node.start - turnStart) },
    {
      label: 'com_ui_trace_column_duration',
      value: recordDurationText(node, format, localize(STATUS_LABEL.running)),
    },
  ];
  if (node.firstToken != null) {
    timing.push({
      label: 'com_ui_trace_ttft',
      value: format.duration(node.firstToken - node.start),
    });
    if (node.end != null) {
      timing.push({
        label: 'com_ui_trace_decoding',
        value: format.duration(node.end - node.firstToken),
      });
    }
  }

  const usageFields: Field[] = (
    [
      ['com_ui_trace_usage_input', usage?.input],
      ['com_ui_trace_usage_output', usage?.output],
      ['com_ui_trace_usage_reasoning', usage?.reasoning],
      ['com_ui_trace_usage_cache_read', usage?.cacheRead],
      ['com_ui_trace_usage_cache_write', usage?.cacheWrite],
      ['com_ui_trace_usage_total', usage?.total],
    ] as Array<[TranslationKeys, number | undefined]>
  )
    .filter((entry): entry is [TranslationKeys, number] => entry[1] != null)
    .map(([label, value]) => ({ label, value: formatTokens(value) }));
  if (showCost && record.cost != null) {
    usageFields.push({
      label: 'com_ui_trace_summary_cost',
      value: formatCost(record.cost, currency),
    });
  }

<<<<<<< HEAD
=======
  const preview = presentation.calls == null && presentation.preview != null && (
    <p className="border-border-light bg-surface-primary-alt rounded-lg border p-2 text-sm break-words whitespace-pre-wrap">
      {presentation.preview}
    </p>
  );
  /** A model call is read as a conversation, which is what the panel is opened for, so it leads. */
  const leadsWithContent = showContent && record.kind === 'generation';
  const content = (
    <RecordContent
      conversationId={conversationId}
      recordId={record.id}
      messageId={record.messageId}
      sourceId={sourceId}
      toolFor={toolFor}
      mcpIconMap={mcpIconMap}
      placeholder={leadsWithContent ? preview : undefined}
    />
  );

>>>>>>> upstream/main
  return (
    <aside
      aria-labelledby={headingId}
      data-testid="trace-inspector"
<<<<<<< HEAD
      className="flex min-h-0 flex-col border-border-light bg-presentation max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-20 max-md:max-h-[65%] max-md:rounded-t-2xl max-md:border-t max-md:shadow-lg md:w-[22rem] md:shrink-0 md:border-l"
    >
      <div className="flex items-center gap-2 border-b border-border-light px-3 py-2">
        <Icon aria-hidden="true" className="size-4 shrink-0 text-text-secondary" />
        <h3 id={headingId} className="min-w-0 flex-1 truncate text-sm font-semibold">
          {record.name}
=======
      className="border-border-light bg-presentation flex min-h-0 flex-col max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-20 max-md:max-h-[65%] max-md:rounded-t-2xl max-md:border-t max-md:shadow-lg md:w-[22rem] md:shrink-0 md:border-l"
    >
      <div className="border-border-light flex items-center gap-2 border-b px-3 py-2">
        {presentation.agent !== undefined &&
          renderAgentAvatar(presentation.agent, { size: 'icon', showBorder: false })}
        {presentation.agent === undefined && presentation.toolNames != null && (
          <StackedToolIcons toolNames={presentation.toolNames} mcpIconMap={mcpIconMap} />
        )}
        {presentation.agent === undefined && presentation.toolNames == null && (
          <Icon aria-hidden="true" className="text-text-secondary size-4 shrink-0" />
        )}
        <h3 id={headingId} className="min-w-0 flex-1 truncate text-sm font-semibold">
          {presentation.title}
          {presentation.caption != null && (
            <span className="text-text-secondary ml-1.5 text-xs font-normal">
              {presentation.caption}
            </span>
          )}
>>>>>>> upstream/main
        </h3>
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={onClose}
          aria-label={localize('com_ui_trace_close_details')}
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>
      <div className="flex min-h-0 flex-col gap-4 overflow-y-auto p-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
<<<<<<< HEAD
          <span className="rounded-full border border-border-light px-2 py-0.5 text-text-secondary">
=======
          <span className="border-border-light text-text-secondary rounded-full border px-2 py-0.5">
>>>>>>> upstream/main
            {localize(appearance.label)}
          </span>
          <span
            className={cn(
              'rounded-full border px-2 py-0.5',
              record.status === 'error' &&
                'border-status-error-border bg-status-error-subtle text-status-error',
              record.status === 'warning' &&
                'border-status-warning-border bg-status-warning-subtle text-status-warning',
              (record.status === 'ok' || record.status === 'running') &&
                'border-border-light text-text-secondary',
            )}
          >
            {localize(STATUS_LABEL[record.status])}
          </span>
        </div>
        {record.statusMessage != null && (
          <p
            className={cn(
<<<<<<< HEAD
              'whitespace-pre-wrap break-words rounded-lg border p-2 text-xs',
=======
              'rounded-lg border p-2 text-xs break-words whitespace-pre-wrap',
>>>>>>> upstream/main
              record.status === 'error'
                ? 'border-status-error-border bg-status-error-subtle text-status-error'
                : 'border-status-warning-border bg-status-warning-subtle text-status-warning',
            )}
          >
            {record.statusMessage}
          </p>
        )}
<<<<<<< HEAD
=======
        {record.agentId != null && presentation.agent !== undefined && (
          <AgentCard agent={presentation.agent} agentId={record.agentId} />
        )}
        {!leadsWithContent && preview}
        {leadsWithContent && content}
        {presentation.calls != null && (
          <ToolCalls
            calls={presentation.calls}
            fromConversation={presentation.callsFrom === 'conversation'}
            mcpIconMap={mcpIconMap}
          />
        )}
>>>>>>> upstream/main
        <Section title="com_ui_trace_timing" fields={timing} />
        <Section
          title="com_ui_trace_model"
          fields={
            record.model != null ? [{ label: 'com_ui_trace_model', value: record.model }] : []
          }
        />
        <Section title="com_ui_trace_usage" fields={usageFields} />
        <Section
          title="com_ui_trace_identifiers"
          fields={[
<<<<<<< HEAD
            {
              label: 'com_ui_trace_record_id',
              value: <span className="select-all font-mono text-xs">{record.id}</span>,
            },
            {
              label: 'com_ui_trace_trace_id',
              value: <span className="select-all font-mono text-xs">{record.traceId}</span>,
            },
          ]}
        />
        {showContent && (
          <section className="flex flex-col gap-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
              {localize('com_ui_trace_content')}
            </h4>
            <RecordContent
              conversationId={conversationId}
              recordId={record.id}
              messageId={record.messageId}
              sourceId={sourceId}
            />
=======
            ...(presentation.technicalName != null
              ? [
                  {
                    label: 'com_ui_trace_recorded_as' as const,
                    value: <span className="font-mono text-xs">{presentation.technicalName}</span>,
                  },
                ]
              : []),
            {
              label: 'com_ui_trace_record_id',
              value: <span className="font-mono text-xs select-all">{record.id}</span>,
            },
            {
              label: 'com_ui_trace_trace_id',
              value: <span className="font-mono text-xs select-all">{record.traceId}</span>,
            },
          ]}
        />
        {showContent && !leadsWithContent && (
          <section className="flex flex-col gap-2">
            <h4 className="text-text-secondary text-xs font-semibold tracking-wide uppercase">
              {localize('com_ui_trace_content')}
            </h4>
            {content}
>>>>>>> upstream/main
          </section>
        )}
      </div>
    </aside>
  );
}

export default memo(Inspector);
