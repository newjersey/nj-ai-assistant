import { memo, useId, useMemo, useState } from 'react';
import { ChevronRight, CircleAlert, CircleDashed } from 'lucide-react';
import type { RefObject, CSSProperties, KeyboardEvent } from 'react';
<<<<<<< HEAD
import type { TraceModel, TraceNode, TraceRow, TraceTurn, TraceWindow } from './model';
import { useTraceFormat, recordDurationText } from './format';
import { KIND_APPEARANCE, STATUS_LABEL } from './kinds';
import { formatTokens } from '~/utils/tokens';
import { useRowWindow } from './virtual';
import { useLocalize } from '~/hooks';
import { turnKey } from './model';
import { cn } from '~/utils';
=======
import type { Agent } from 'librechat-data-provider';
import type {
  TraceRow,
  TraceNode,
  TraceStep,
  TraceTurn,
  TraceSpan,
  TraceModel,
  TraceScale,
  TraceWindow,
} from './model';
import type { RecordPresentation } from './present';
import StackedToolIcons from '~/components/Chat/Messages/Content/ToolOutput/StackedToolIcons';
import { spanOf, stepSpan, turnSpan, turnKey, boundsOf, isLabelRecord } from './model';
import { useTraceFormat, recordDurationText } from './format';
import { formatCost, formatTokens } from '~/utils/tokens';
import { appearanceOf, STATUS_LABEL } from './kinds';
import { cn, renderAgentAvatar } from '~/utils';
import { useRowWindow } from './virtual';
import { useLocalize } from '~/hooks';
>>>>>>> upstream/main

const ROW_HEIGHT = 32;
const HEADER_HEIGHT = 28;
const INDENT_PX = 14;
<<<<<<< HEAD
=======
/** Tool names a step header lists before summarizing the rest as a count. */
const STEP_TOOL_NAMES = 3;
>>>>>>> upstream/main
/** Shown only while the tree itself has keyboard focus, so a pointer user sees just the selection. */
const ACTIVE_RING =
  'group-focus-visible/tree:ring-2 group-focus-visible/tree:ring-inset group-focus-visible/tree:ring-ring-primary';
const GRID =
  'grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(5rem,1fr)] md:grid-cols-[minmax(14rem,2fr)_5rem_4.5rem_minmax(10rem,3fr)]';
<<<<<<< HEAD

type Domain = { start: number; span: number };

const barStyle = (start: number, end: number, domain: Domain): CSSProperties => ({
  left: `${((start - domain.start) / domain.span) * 100}%`,
  width: `${((end - start) / domain.span) * 100}%`,
});

function RecordBar({ node, domain }: { node: TraceNode; domain: Domain }) {
  const { record } = node;
  const appearance = KIND_APPEARANCE[record.kind];
  const solid = record.status === 'error' ? 'bg-status-error' : appearance.bar;

  if (node.end == null) {
=======
/** With a cost column beside the tokens; both are wide-screen columns. */
const GRID_WITH_COST =
  'grid grid-cols-[minmax(0,1fr)_4.5rem_minmax(5rem,1fr)] md:grid-cols-[minmax(14rem,2fr)_5rem_4.5rem_5rem_minmax(10rem,3fr)]';

type Domain = { start: number; span: number };

const barStyle = (span: TraceSpan, domain: Domain): CSSProperties => ({
  left: `${((span.start - domain.start) / domain.span) * 100}%`,
  width: `${((span.end - span.start) / domain.span) * 100}%`,
});

function RecordBar({
  node,
  scale,
  domain,
}: {
  node: TraceNode;
  scale: TraceScale;
  domain: Domain;
}) {
  const { record } = node;
  const appearance = appearanceOf(record);
  const solid = record.status === 'error' ? 'bg-status-error' : appearance.bar;

  if (scale === 'time' && node.end == null) {
>>>>>>> upstream/main
    return (
      <span
        className={cn('absolute top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45', solid)}
        style={{ left: `${((node.start - domain.start) / domain.span) * 100}%` }}
      />
    );
  }

<<<<<<< HEAD
  const duration = node.end - node.start;
  const ttftShare =
    node.firstToken != null && duration > 0 ? (node.firstToken - node.start) / duration : 0;
  return (
    <span
      className="absolute top-1/2 flex h-2.5 min-w-[2px] -translate-y-1/2 overflow-hidden rounded-sm"
      style={barStyle(node.start, node.end, domain)}
=======
  const span = spanOf(node, scale);
  const duration = span.end - span.start;
  const ttftShare =
    scale === 'time' && node.firstToken != null && duration > 0
      ? (node.firstToken - node.start) / duration
      : 0;
  return (
    <span
      className="absolute top-1/2 flex h-2.5 min-w-[2px] -translate-y-1/2 overflow-hidden rounded-sm"
      style={barStyle(span, domain)}
>>>>>>> upstream/main
    >
      {ttftShare > 0 && (
        <span
          className={cn(
            'h-full',
            record.status === 'error' ? 'bg-status-error/40' : appearance.tint,
          )}
          style={{ width: `${ttftShare * 100}%` }}
        />
      )}
      <span className={cn('h-full flex-1', solid)} />
    </span>
  );
}

<<<<<<< HEAD
function TurnBar({ turn, domain }: { turn: TraceTurn; domain: Domain }) {
  return (
    <span
      className="absolute top-1/2 h-1 min-w-[2px] -translate-y-1/2 rounded-full bg-border-heavy"
      style={barStyle(turn.start, turn.end, domain)}
=======
function GroupBar({ span, domain }: { span: TraceSpan; domain: Domain }) {
  return (
    <span
      className="bg-border-heavy absolute top-1/2 h-1 min-w-[2px] -translate-y-1/2 rounded-full"
      style={barStyle(span, domain)}
>>>>>>> upstream/main
    />
  );
}

function recordTokens(node: TraceNode): string {
  const usage = node.record.usage;
  if (node.record.kind !== 'generation' || usage == null) {
    return '';
  }
  const total = usage.total ?? (usage.input ?? 0) + (usage.output ?? 0);
  return total > 0 ? formatTokens(total) : '';
}

<<<<<<< HEAD
const toDomain = (start: number, end: number): Domain => ({
  start,
  span: Math.max(end - start, 1),
});

/**
 * The hierarchical record list: one row per turn and per record. Each bar is
 * scaled to its own response, so a short turn in a long conversation stays
 * legible, until an interval is focused and every row shares that scale. Rows
 * are windowed, and the tree follows the ARIA tree pattern through
=======
const toDomain = (span: TraceSpan): Domain => ({
  start: span.start,
  span: Math.max(span.end - span.start, 1),
});

/**
 * The hierarchical record list: one row per turn, per step and per record. Each
 * bar is scaled to its own response, so a short turn in a long conversation
 * stays legible, until an interval is focused and every row shares that scale.
 * Rows are windowed, and the tree follows the ARIA tree pattern through
>>>>>>> upstream/main
 * `aria-activedescendant`, which must name a mounted row, so the active row
 * stays rendered while the window scrolls away from it.
 */
function Ledger({
  rows,
  model,
<<<<<<< HEAD
  view,
  selectedId,
  treeRef,
=======
  scale,
  view,
  selectedId,
  treeRef,
  presentFor,
  askedFor,
  toolTitleFor,
  agentOf,
  unrecordedCalls,
  stepOffsets,
  mcpIconMap,
  showCost,
  currency,
>>>>>>> upstream/main
  onSelect,
  onToggle,
}: {
  rows: TraceRow[];
  model: TraceModel;
<<<<<<< HEAD
  view: TraceWindow | null;
  selectedId: string | null;
  treeRef: RefObject<HTMLDivElement>;
=======
  scale: TraceScale;
  view: TraceWindow | null;
  selectedId: string | null;
  treeRef: RefObject<HTMLDivElement>;
  presentFor: (node: TraceNode) => RecordPresentation;
  /** The user message a response answered, which tells one response from another. */
  askedFor: (messageId: string) => string | undefined;
  /** A tool's name as the chat's tool cards give it. */
  toolTitleFor: (name: string) => string;
  agentOf: (agentId: string) => Agent | undefined;
  /** Tool calls the trace names no record for, by response, as the chat's messages count them. */
  unrecordedCalls: ReadonlyMap<string, number>;
  /** Steps of a response that ran before its first loaded one, by response. */
  stepOffsets: ReadonlyMap<string, number>;
  mcpIconMap: Map<string, string>;
  /** Whether the deployment shows cost, as the context usage gauge does. */
  showCost: boolean;
  currency?: { code: string; rate: number };
>>>>>>> upstream/main
  onSelect: (id: string) => void;
  onToggle: (key: string) => void;
}) {
  const localize = useLocalize();
  const format = useTraceFormat();
  const idPrefix = useId();
<<<<<<< HEAD
=======
  const grid = showCost ? GRID_WITH_COST : GRID;
  /** The rows name themselves with `aria-label`, so what a column shows has to be said there too. */
  const costText = (cost?: number) =>
    showCost && cost != null
      ? `, ${localize('com_ui_trace_summary_cost')} ${formatCost(cost, currency)}`
      : '';
  const costCell = (cost?: number) =>
    showCost && (
      <span className="text-text-secondary hidden truncate text-right text-xs font-normal tabular-nums md:block">
        {cost != null ? formatCost(cost, currency) : ''}
      </span>
    );
>>>>>>> upstream/main
  const scrollRef = treeRef;
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const { first, last } = useRowWindow(scrollRef, rows.length, ROW_HEIGHT, {
    offset: HEADER_HEIGHT,
  });

  const indexByKey = useMemo(() => new Map(rows.map((row, index) => [row.key, index])), [rows]);
  const turnDomains = useMemo(
<<<<<<< HEAD
    () => new Map(model.turns.map((turn) => [turn.messageId, toDomain(turn.start, turn.end)])),
    [model],
  );
  const viewDomain = useMemo(() => (view ? toDomain(view.start, view.end) : null), [view]);
  const domainFor = (messageId: string): Domain =>
    viewDomain ?? turnDomains.get(messageId) ?? toDomain(model.start, model.end);
  const activeIndex = activeKey != null ? (indexByKey.get(activeKey) ?? 0) : 0;
  const activeRow = rows[activeIndex];
  const rowId = (key: string) => `${idPrefix}-${key}`;
=======
    () => new Map(model.turns.map((turn) => [turn.messageId, toDomain(turnSpan(turn, scale))])),
    [model, scale],
  );
  const viewDomain = useMemo(() => (view ? toDomain(view) : null), [view]);
  const bounds = boundsOf(model, scale);
  const domainFor = (messageId: string): Domain =>
    viewDomain ?? turnDomains.get(messageId) ?? toDomain(bounds);
  const activeIndex = activeKey != null ? (indexByKey.get(activeKey) ?? 0) : 0;
  const activeRow = rows[activeIndex];
  const rowId = (key: string) => `${idPrefix}-${key}`;
  const position = (value: number) =>
    scale === 'sequence' ? String(Math.round(value)) : format.duration(value - bounds.start);
>>>>>>> upstream/main

  /** Keeps a keyboard-moved row inside the viewport so its windowed element mounts. */
  const scrollIntoView = (index: number) => {
    const element = scrollRef.current;
    if (!element) {
      return;
    }
    const top = index * ROW_HEIGHT;
    if (top < element.scrollTop) {
      element.scrollTop = top;
    } else if (HEADER_HEIGHT + top + ROW_HEIGHT > element.scrollTop + element.clientHeight) {
      element.scrollTop = HEADER_HEIGHT + top + ROW_HEIGHT - element.clientHeight;
    }
  };

  const moveTo = (index: number) => {
    const clamped = Math.min(Math.max(index, 0), rows.length - 1);
    const row = rows[clamped];
    scrollIntoView(clamped);
    if (row) {
      setActiveKey(row.key);
    }
  };

  const activate = (row: TraceRow) => {
    setActiveKey(row.key);
    if (row.type === 'record') {
      onSelect(row.key);
    } else {
      onToggle(row.key);
    }
  };

<<<<<<< HEAD
=======
  const parentKeyOf = (row: TraceRow): string | undefined => {
    if (row.type === 'turn') {
      return undefined;
    }
    if (row.type === 'step') {
      return turnKey(row.step.messageId);
    }
    const { node } = row;
    const stepParent = model.mode === 'simple' ? node.stepKey : null;
    return node.viewParentId ?? stepParent ?? turnKey(node.record.messageId);
  };

>>>>>>> upstream/main
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!activeRow) {
      return;
    }
<<<<<<< HEAD
    const expandable = activeRow.type === 'turn' || activeRow.hasChildren;
=======
    const expandable = activeRow.type !== 'record' || activeRow.hasChildren;
>>>>>>> upstream/main
    const pageSize = Math.max(1, Math.floor((scrollRef.current?.clientHeight ?? 0) / ROW_HEIGHT));
    const handlers: Record<string, () => void> = {
      ArrowDown: () => moveTo(activeIndex + 1),
      ArrowUp: () => moveTo(activeIndex - 1),
      PageDown: () => moveTo(activeIndex + pageSize),
      PageUp: () => moveTo(activeIndex - pageSize),
      Home: () => moveTo(0),
      End: () => moveTo(rows.length - 1),
      ArrowRight: () => {
        if (expandable && !activeRow.expanded) {
          onToggle(activeRow.key);
        } else if (expandable) {
          moveTo(activeIndex + 1);
        }
      },
      ArrowLeft: () => {
        if (expandable && activeRow.expanded) {
          onToggle(activeRow.key);
          return;
        }
<<<<<<< HEAD
        if (activeRow.type === 'record') {
          const { node } = activeRow;
          const parentKey = node.parentId ?? turnKey(node.record.messageId);
          const parentIndex = indexByKey.get(parentKey);
          if (parentIndex != null) {
            moveTo(parentIndex);
          }
=======
        const parentKey = parentKeyOf(activeRow);
        const parentIndex = parentKey != null ? indexByKey.get(parentKey) : undefined;
        if (parentIndex != null) {
          moveTo(parentIndex);
>>>>>>> upstream/main
        }
      },
      Enter: () => activate(activeRow),
      ' ': () => activate(activeRow),
    };
    const handler = handlers[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

<<<<<<< HEAD
  const renderRow = (row: TraceRow, index: number) => {
    const style: CSSProperties = { top: HEADER_HEIGHT + index * ROW_HEIGHT, height: ROW_HEIGHT };
    const active = activeRow?.key === row.key;
    const common = {
      id: rowId(row.key),
      role: 'treeitem',
      'aria-posinset': row.position,
      'aria-setsize': row.setSize,
      style,
      onClick: () => activate(row),
    };

    if (row.type === 'turn') {
      const { turn } = row;
      const label = localize('com_ui_trace_turn', { 0: format.clock(turn.start) });
      return (
        <div
          key={row.key}
          {...common}
          aria-level={1}
          aria-expanded={row.expanded}
          aria-label={`${label}, ${localize('com_ui_trace_turn_records', { 0: String(turn.recordCount) })}, ${format.duration(turn.end - turn.start)}`}
          className={cn(
            GRID,
            'absolute inset-x-0 cursor-pointer items-center gap-2 border-t border-border-light bg-surface-primary-alt px-2 text-xs font-semibold text-text-primary hover:bg-surface-hover',
            active && ACTIVE_RING,
          )}
        >
          <span className="flex min-w-0 items-center gap-1.5">
            <ChevronRight
              aria-hidden="true"
              className={cn(
                'size-3.5 shrink-0 text-text-secondary transition-transform motion-reduce:transition-none',
                row.expanded && 'rotate-90',
              )}
            />
            <span className="truncate">{label}</span>
            {turn.errorCount > 0 && (
              <CircleAlert aria-hidden="true" className="size-3.5 shrink-0 text-status-error" />
            )}
          </span>
          <span className="text-right font-normal tabular-nums text-text-secondary">
            {format.duration(turn.end - turn.start)}
          </span>
          <span className="hidden md:block" />
          <span className="relative h-full overflow-hidden">
            <TurnBar turn={turn} domain={domainFor(turn.messageId)} />
          </span>
        </div>
      );
=======
  const chevron = (expanded: boolean) => (
    <ChevronRight
      aria-hidden="true"
      className={cn(
        'text-text-secondary size-3.5 shrink-0 transition-transform motion-reduce:transition-none',
        expanded && 'rotate-90',
      )}
    />
  );

  const turnSummary = (turn: TraceTurn) => {
    const toolCalls = turn.toolCalls + (unrecordedCalls.get(turn.messageId) ?? 0);
    const asked = askedFor(turn.messageId);
    /** The counts come first: the question is the part a narrow row can afford to truncate. */
    return [
      localize(
        turn.generations === 1
          ? 'com_ui_trace_model_calls_count_one'
          : 'com_ui_trace_model_calls_count',
        { count: turn.generations },
      ),
      localize(
        toolCalls === 1 ? 'com_ui_trace_tool_calls_count_one' : 'com_ui_trace_tool_calls_count',
        { count: toolCalls },
      ),
      ...(asked ? [localize('com_ui_trace_asked', { 0: asked })] : []),
    ].join(' · ');
  };

  const stepDescription = (step: TraceStep) => {
    const names = [...step.toolNames];
    const tools = names
      .slice(0, STEP_TOOL_NAMES)
      .map(([name, count]) =>
        count > 1
          ? localize('com_ui_trace_tool_times', { 0: toolTitleFor(name), 1: String(count) })
          : toolTitleFor(name),
      );
    if (names.length > STEP_TOOL_NAMES) {
      tools.push(
        localize('com_ui_trace_tools_more', { 0: String(names.length - STEP_TOOL_NAMES) }),
      );
    }
    return [format.duration(step.end - step.start), ...tools].join(' · ');
  };

  const renderGroupRow = (
    row: Extract<TraceRow, { type: 'turn' | 'step' }>,
    index: number,
    {
      label,
      description,
      errorCount,
      recordCount,
      span,
      messageId,
      indent,
      agents = [],
    }: {
      label: string;
      description: string;
      errorCount: number;
      recordCount: number;
      span: TraceSpan;
      messageId: string;
      indent: number;
      agents?: TraceTurn['agents'];
    },
  ) => {
    const active = activeRow?.key === row.key;
    return (
      <div
        key={row.key}
        id={rowId(row.key)}
        role="treeitem"
        aria-posinset={row.position}
        aria-setsize={row.setSize}
        aria-level={row.level}
        aria-expanded={row.expanded}
        aria-selected={false}
        aria-label={`${label}, ${description}, ${localize('com_ui_trace_turn_records', { 0: String(recordCount) })}${costText(row.type === 'turn' ? row.turn.cost : row.step.cost)}`}
        style={{ top: HEADER_HEIGHT + index * ROW_HEIGHT, height: ROW_HEIGHT }}
        onClick={() => activate(row)}
        className={cn(
          grid,
          'text-text-primary hover:bg-surface-hover absolute inset-x-0 cursor-pointer items-center gap-2 px-2 text-xs',
          row.type === 'turn'
            ? 'border-border-light bg-surface-primary-alt border-t font-semibold'
            : 'font-medium',
          active && ACTIVE_RING,
        )}
      >
        <span className="flex min-w-0 items-center gap-1.5" style={{ paddingLeft: indent }}>
          {chevron(row.expanded)}
          <span className="shrink-0 truncate">{label}</span>
          {agents.map(({ agentId, recordId }) => {
            const agent = agentOf(agentId);
            const name = agent?.name || localize('com_ui_agent');
            return (
              <button
                key={agentId}
                type="button"
                aria-label={localize('com_ui_trace_agent_details', { 0: name })}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelect(recordId);
                }}
                onKeyDown={(event) => event.stopPropagation()}
                className={cn(
                  'border-border-light hover:bg-surface-hover flex max-w-[45%] shrink-0 items-center gap-1 rounded-full border py-0.5 pr-2 pl-0.5 font-medium',
                  selectedId === recordId && 'bg-surface-active-alt',
                )}
              >
                {renderAgentAvatar(agent ?? null, { size: 'icon', showBorder: false })}
                <span className="truncate">{name}</span>
              </button>
            );
          })}
          <span className="text-text-secondary min-w-0 shrink-[3] truncate font-normal">
            {description}
          </span>
          {errorCount > 0 && (
            <CircleAlert aria-hidden="true" className="text-status-error size-3.5 shrink-0" />
          )}
        </span>
        <span className="text-text-secondary text-right font-normal tabular-nums">
          {format.duration(
            row.type === 'turn' ? row.turn.end - row.turn.start : row.step.end - row.step.start,
          )}
        </span>
        <span className="hidden md:block" />
        {costCell(row.type === 'turn' ? row.turn.cost : row.step.cost)}
        <span className="relative h-full overflow-hidden">
          <GroupBar span={span} domain={domainFor(messageId)} />
        </span>
      </div>
    );
  };

  const renderRow = (row: TraceRow, index: number) => {
    if (row.type === 'turn') {
      const { turn } = row;
      return renderGroupRow(row, index, {
        label: localize('com_ui_trace_turn', { 0: format.clock(turn.start) }),
        description: turnSummary(turn),
        errorCount: turn.errorCount,
        recordCount: turn.recordCount,
        span: turnSpan(turn, scale),
        messageId: turn.messageId,
        indent: 0,
        agents: turn.agents,
      });
    }
    if (row.type === 'step') {
      const { step } = row;
      return renderGroupRow(row, index, {
        label:
          step.origin === 'title'
            ? localize('com_ui_trace_title_step')
            : localize('com_ui_trace_step', {
                0: String(step.index + (stepOffsets.get(step.messageId) ?? 0)),
              }),
        description: stepDescription(step),
        errorCount: step.errorCount,
        recordCount: step.recordCount,
        span: stepSpan(step, scale),
        messageId: step.messageId,
        indent: INDENT_PX,
      });
>>>>>>> upstream/main
    }

    const { node } = row;
    const { record } = node;
<<<<<<< HEAD
    const turnStart = turnDomains.get(record.messageId)?.start ?? model.start;
    const appearance = KIND_APPEARANCE[record.kind];
=======
    const active = activeRow?.key === row.key;
    const turnStart = model.turns.find((turn) => turn.messageId === record.messageId)?.start;
    const appearance = appearanceOf(record);
>>>>>>> upstream/main
    const Icon = appearance.icon;
    const running = record.status === 'running';
    const duration = recordDurationText(node, format, localize(STATUS_LABEL.running));
    const statusText =
      record.status === 'error' || record.status === 'warning'
        ? `${duration}, ${localize(STATUS_LABEL[record.status])}`
        : duration;
<<<<<<< HEAD
=======
    const presentation = presentFor(node);
    const { title, caption, preview, technicalName, toolNames } = presentation;
    const name = [caption != null ? `${title} (${caption})` : title, preview]
      .filter((part) => part != null)
      .join(': ');
    const isLabel = isLabelRecord(record);
>>>>>>> upstream/main

    return (
      <div
        key={row.key}
<<<<<<< HEAD
        {...common}
        aria-level={node.depth + 2}
        aria-expanded={row.hasChildren ? row.expanded : undefined}
        aria-selected={selectedId === row.key}
        aria-label={localize('com_ui_trace_bar_description', {
          0: `${record.name}, ${localize(appearance.label)}`,
          1: format.duration(node.start - turnStart),
          2: statusText,
        })}
        className={cn(
          GRID,
          'absolute inset-x-0 cursor-pointer items-center gap-2 px-2 text-sm text-text-primary hover:bg-surface-hover',
=======
        id={rowId(row.key)}
        role="treeitem"
        aria-posinset={row.position}
        aria-setsize={row.setSize}
        aria-level={row.level}
        aria-expanded={row.hasChildren ? row.expanded : undefined}
        aria-selected={selectedId === row.key}
        aria-label={localize('com_ui_trace_bar_description', {
          0: `${name}, ${localize(appearance.label)}`,
          1: format.duration(node.start - (turnStart ?? model.start)),
          2: `${statusText}${costText(record.cost)}`,
        })}
        style={{ top: HEADER_HEIGHT + index * ROW_HEIGHT, height: ROW_HEIGHT }}
        onClick={() => activate(row)}
        className={cn(
          grid,
          'text-text-primary hover:bg-surface-hover absolute inset-x-0 cursor-pointer items-center gap-2 px-2 text-sm',
>>>>>>> upstream/main
          selectedId === row.key && 'bg-surface-active-alt',
          active && ACTIVE_RING,
        )}
      >
        <span
          className="flex min-w-0 items-center gap-1.5"
<<<<<<< HEAD
          style={{ paddingLeft: node.depth * INDENT_PX }}
=======
          style={{ paddingLeft: (row.level - 2) * INDENT_PX }}
>>>>>>> upstream/main
        >
          <span
            aria-hidden="true"
            onClick={(event) => {
              if (row.hasChildren) {
                event.stopPropagation();
                setActiveKey(row.key);
                onToggle(row.key);
              }
            }}
            className="flex size-4 shrink-0 items-center justify-center"
          >
<<<<<<< HEAD
            {row.hasChildren && (
              <ChevronRight
                className={cn(
                  'size-3.5 text-text-secondary transition-transform motion-reduce:transition-none',
                  row.expanded && 'rotate-90',
                )}
              />
            )}
          </span>
          <Icon aria-hidden="true" className="size-3.5 shrink-0 text-text-secondary" />
          <span className="min-w-[3ch] truncate">{record.name}</span>
          {record.model != null && (
            <span className="hidden min-w-0 shrink-[4] truncate text-xs text-text-secondary sm:inline">
=======
            {row.hasChildren && chevron(row.expanded)}
          </span>
          {presentation.agent !== undefined &&
            renderAgentAvatar(presentation.agent, { size: 'icon', showBorder: false })}
          {presentation.agent === undefined && toolNames != null && (
            <span className="flex shrink-0 items-center">
              <StackedToolIcons toolNames={toolNames} mcpIconMap={mcpIconMap} />
            </span>
          )}
          {presentation.agent === undefined && toolNames == null && (
            <Icon aria-hidden="true" className="text-text-secondary size-3.5 shrink-0" />
          )}
          <span
            className={cn(
              'max-w-[60%] truncate',
              isLabel ? 'text-text-secondary shrink-0' : 'min-w-[3ch] shrink-[0.25]',
            )}
          >
            {title}
          </span>
          {caption != null && (
            <span className="text-text-secondary hidden shrink-[2] truncate text-xs sm:inline">
              {caption}
            </span>
          )}
          {preview != null && (
            <span
              className={cn(
                'min-w-[4ch] shrink-[3] truncate text-xs',
                isLabel
                  ? 'bg-surface-tertiary text-text-primary rounded-full px-2 py-0.5 font-medium'
                  : 'text-text-secondary flex-1',
              )}
              title={preview}
            >
              {preview}
            </span>
          )}
          {model.mode === 'full' && technicalName != null && (
            <span className="text-text-tertiary hidden min-w-0 shrink-[6] truncate font-mono text-[11px] lg:inline">
              {technicalName}
            </span>
          )}
          {record.model != null && (
            <span className="text-text-secondary hidden min-w-0 shrink-[4] truncate text-xs sm:inline">
>>>>>>> upstream/main
              {record.model}
            </span>
          )}
          {record.status === 'error' && (
<<<<<<< HEAD
            <CircleAlert aria-hidden="true" className="size-3.5 shrink-0 text-status-error" />
          )}
          {running && (
            <CircleDashed aria-hidden="true" className="size-3.5 shrink-0 text-text-secondary" />
          )}
        </span>
        <span className="truncate text-right text-xs tabular-nums text-text-secondary">
          {duration}
        </span>
        <span className="hidden text-right text-xs tabular-nums text-text-secondary md:block">
          {recordTokens(node)}
        </span>
        <span className="relative h-full overflow-hidden">
          <RecordBar node={node} domain={domainFor(record.messageId)} />
=======
            <CircleAlert aria-hidden="true" className="text-status-error size-3.5 shrink-0" />
          )}
          {running && (
            <CircleDashed aria-hidden="true" className="text-text-secondary size-3.5 shrink-0" />
          )}
        </span>
        <span className="text-text-secondary truncate text-right text-xs tabular-nums">
          {duration}
        </span>
        <span className="text-text-secondary hidden text-right text-xs tabular-nums md:block">
          {recordTokens(node)}
        </span>
        {costCell(record.cost)}
        <span className="relative h-full overflow-hidden">
          <RecordBar node={node} scale={scale} domain={domainFor(record.messageId)} />
>>>>>>> upstream/main
        </span>
      </div>
    );
  };

  const visibleRows: JSX.Element[] = [];
  for (let index = first; index <= last && index < rows.length; index++) {
    visibleRows.push(renderRow(rows[index], index));
  }
  if (activeRow && (activeIndex < first || activeIndex > last)) {
    visibleRows.push(renderRow(activeRow, activeIndex));
  }

  return (
    <div
      ref={scrollRef}
      role="tree"
      tabIndex={0}
      aria-label={localize('com_ui_trace_records')}
      aria-activedescendant={activeRow ? rowId(activeRow.key) : undefined}
      onKeyDown={handleKeyDown}
      onFocus={() => {
        if (activeKey == null && rows[0]) {
          setActiveKey(rows[0].key);
        }
      }}
      data-testid="trace-ledger"
<<<<<<< HEAD
      className="group/tree relative min-h-0 flex-1 overflow-auto focus-visible:outline-none"
=======
      className="group/tree relative min-h-0 flex-1 overflow-auto focus-visible:outline-hidden"
>>>>>>> upstream/main
    >
      <div
        aria-hidden="true"
        className={cn(
<<<<<<< HEAD
          GRID,
          'sticky top-0 z-10 h-7 items-center gap-2 border-b border-border-light bg-presentation px-2 text-[11px] font-medium uppercase tracking-wide text-text-secondary',
=======
          grid,
          'border-border-light bg-presentation text-text-secondary sticky top-0 z-10 h-7 items-center gap-2 border-b px-2 text-[11px] font-medium tracking-wide uppercase',
>>>>>>> upstream/main
        )}
      >
        <span>{localize('com_ui_trace_column_name')}</span>
        <span className="text-right">{localize('com_ui_trace_column_duration')}</span>
        <span className="hidden text-right md:block">{localize('com_ui_trace_column_tokens')}</span>
<<<<<<< HEAD
        {viewDomain ? (
          <span className="flex justify-between normal-case tabular-nums tracking-normal">
            <span>{format.duration(viewDomain.start - model.start)}</span>
            <span>{format.duration(viewDomain.start + viewDomain.span - model.start)}</span>
=======
        {showCost && (
          <span className="hidden text-right md:block">
            {localize('com_ui_trace_summary_cost')}
          </span>
        )}
        {viewDomain ? (
          <span className="flex justify-between tracking-normal normal-case tabular-nums">
            <span>{position(viewDomain.start)}</span>
            <span>{position(viewDomain.start + viewDomain.span)}</span>
>>>>>>> upstream/main
          </span>
        ) : (
          <span>{localize('com_ui_trace_column_timeline')}</span>
        )}
      </div>
      <div role="presentation" style={{ height: rows.length * ROW_HEIGHT }}>
        {visibleRows}
      </div>
    </div>
  );
}

export default memo(Ledger);
