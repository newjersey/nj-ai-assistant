<<<<<<< HEAD
import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import { throttle } from 'lodash';
import { Spinner } from '@librechat/client';
import { PermissionBits } from 'librechat-data-provider';
import { AutoSizer, List as VirtualList, WindowScroller } from 'react-virtualized';
import type t from 'librechat-data-provider';
import { useMarketplaceAgentsInfiniteQuery } from '~/data-provider/Agents';
import { useAgentCategories, useLocalize } from '~/hooks';
import { useHasData } from './SmartLoader';
import ErrorDisplay from './ErrorDisplay';
import AgentCard from './AgentCard';
import { cn } from '~/utils';

interface VirtualizedAgentGridProps {
  category: string;
  searchQuery: string;
  onSelectAgent: (agent: t.Agent) => void;
  scrollElement?: HTMLElement | null;
}

// Constants for layout calculations
const CARD_HEIGHT = 160; // h-40 in pixels
const GAP_SIZE = 24; // gap-6 in pixels
const ROW_HEIGHT = CARD_HEIGHT + GAP_SIZE;
const CARDS_PER_ROW_MOBILE = 1;
const CARDS_PER_ROW_DESKTOP = 2;
const OVERSCAN_ROW_COUNT = 3;

/**
 * Virtualized grid component for displaying agent cards with high performance
 */
const VirtualizedAgentGrid: React.FC<VirtualizedAgentGridProps> = ({
  category,
  searchQuery,
  onSelectAgent,
  scrollElement,
}) => {
  const localize = useLocalize();
  const listRef = useRef<VirtualList>(null);
  const { categories } = useAgentCategories();

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: {
      requiredPermission: number;
      category?: string;
      search?: string;
      limit: number;
      promoted?: 0 | 1;
    } = {
      requiredPermission: PermissionBits.VIEW,
      // Align with AgentGrid to eliminate API mismatch as a factor
      limit: 6,
    };

    if (searchQuery) {
      params.search = searchQuery;
      if (category !== 'all' && category !== 'promoted') {
        params.category = category;
      }
    } else {
      if (category === 'promoted') {
        params.promoted = 1;
      } else if (category !== 'all') {
        params.category = category;
      }
    }

    return params;
  }, [category, searchQuery]);

  // Use infinite query
  const {
    data,
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useMarketplaceAgentsInfiniteQuery(queryParams);

  // Flatten pages into single array
  const currentAgents = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.data || []);
  }, [data?.pages]);

  const hasData = useHasData(data?.pages?.[0]);

  // Direct scroll handling for virtualized component to avoid hook conflicts
  useEffect(() => {
    if (!scrollElement) return;

    const throttledScrollHandler = throttle(() => {
      const { scrollTop, scrollHeight, clientHeight } = scrollElement;
      const scrollPosition = (scrollTop + clientHeight) / scrollHeight;

      if (scrollPosition >= 0.8 && hasNextPage && !isFetchingNextPage && !isFetching) {
        fetchNextPage();
      }
    }, 200);

    scrollElement.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', throttledScrollHandler);
      throttledScrollHandler.cancel?.();
    };
  }, [scrollElement, hasNextPage, isFetchingNextPage, isFetching, fetchNextPage, category]);

  // Separate effect for list re-rendering on data changes
  useEffect(() => {
    if (listRef.current) {
      listRef.current.forceUpdateGrid();
    }
  }, [currentAgents]);

  // Helper functions for grid calculations
  const getCardsPerRow = useCallback((width: number) => {
    return width >= 768 ? CARDS_PER_ROW_DESKTOP : CARDS_PER_ROW_MOBILE;
  }, []);

  const getRowCount = useCallback((agentCount: number, cardsPerRow: number) => {
    return Math.ceil(agentCount / cardsPerRow);
  }, []);

  const getRowItems = useCallback(
    (rowIndex: number, cardsPerRow: number) => {
      const startIndex = rowIndex * cardsPerRow;
      const endIndex = Math.min(startIndex + cardsPerRow, currentAgents.length);
      return currentAgents.slice(startIndex, endIndex);
    },
    [currentAgents],
  );

  const getCategoryDisplayName = (categoryValue: string) => {
    const categoryData = categories.find((cat) => cat.value === categoryValue);
    if (categoryData) {
      return categoryData.label;
    }

    if (categoryValue === 'promoted') {
      return localize('com_agents_top_picks');
    }
    if (categoryValue === 'all') {
      return 'All';
    }

    return categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
  };

  // Row renderer for virtual list
  const rowRenderer = useCallback(
    ({ index, key, style, parent }: any) => {
      const containerWidth = parent?.props?.width || 800;
      const cardsPerRow = getCardsPerRow(containerWidth);
      const rowAgents = getRowItems(index, cardsPerRow);
      const totalRows = getRowCount(currentAgents.length, cardsPerRow);
      const isLastRow = index === totalRows - 1;
      const showLoading = isFetchingNextPage && isLastRow;

      return (
        <div key={key} style={style}>
          <div
            className={cn(
              'grid gap-6 px-0',
              cardsPerRow === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2',
            )}
            role="row"
            aria-rowindex={index + 1}
          >
            {rowAgents.map((agent: t.Agent, cardIndex: number) => {
              const globalIndex = index * cardsPerRow + cardIndex;
              return (
                <div key={`${agent.id}-${globalIndex}`} role="gridcell">
                  <AgentCard agent={agent} onSelect={onSelectAgent} />
=======
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DIALOG_SCRIM_CLASS, OGDialog } from '@librechat/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual';
import type { Range } from '@tanstack/react-virtual';
import type t from 'librechat-data-provider';
import {
  BACKDROP_ENTER_TRANSITION,
  BACKDROP_EXIT_TRANSITION,
  MORPH_HANDOFF_MS,
  readSurfaceRadius,
} from './morph';
import { useGetAgentByIdQuery } from '~/data-provider/Agents';
import AgentDetailContent from './AgentDetailContent';
import AgentCard from './AgentCard';
import { cn } from '~/utils';

const isAgentUnavailableError = (error: unknown): boolean => {
  if (
    error == null ||
    typeof error !== 'object' ||
    !('response' in error) ||
    error.response == null ||
    typeof error.response !== 'object' ||
    !('status' in error.response)
  ) {
    return false;
  }
  return error.response.status === 403 || error.response.status === 404;
};
const mergeRevalidatedAgent = (agent: t.Agent, revalidatedAgent: t.Agent | undefined): t.Agent =>
  revalidatedAgent == null ? agent : { ...agent, ...revalidatedAgent };

interface VirtualizedAgentGridProps {
  agents: t.Agent[];
  scrollElementRef: React.RefObject<HTMLElement>;
  label: string;
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
  onSelectAgent?: (agent: t.Agent) => void;
  /**
   * Rendered whenever the marketplace has something else to say — no results, or a
   * failure it is recovering from. It lives here rather than beside this component
   * because this grid owns the detail dialog and the focus it has to hand back: a parent
   * that swapped the grid out for those states would tear an open dialog down mid-flight
   * and strand keyboard focus. Rows that are already loaded keep their place; the
   * placeholder follows them instead of replacing them.
   */
  placeholder?: React.ReactNode;
  /**
   * Height the placeholder reserves at the top of the scroll frame while it is pinned
   * there. A focused row that the reserve does not already clear is scrolled out from
   * under it, which is the case for a row the reader had already scrolled past.
   */
  placeholderInset?: number;
}

const OVERSCAN_ROWS = 2;
const WINDOW_THRESHOLD = 32;
const FOCUSABLE = 'button:not(:disabled), a[href]';
/** Just under the dialog's own overlay layer, so the dim covers the grid only. */
const BACKDROP_Z_INDEX = 129;
/** Above sibling cards, below the dim, so a morphing card never clips a neighbour. */
const LIFTED_ROW_Z_INDEX = 20;

/** One measured row per virtual item preserves the existing 1–4-column card layout. */
export default function VirtualizedAgentGrid({
  agents,
  scrollElementRef,
  label,
  hasNextPage,
  isFetching,
  onLoadMore,
  onSelectAgent,
  placeholder,
  placeholderInset = 0,
}: VirtualizedAgentGridProps) {
  const [listElement, setListElement] = useState<HTMLDivElement | null>(null);
  const [hostElement, setHostElement] = useState<HTMLDivElement | null>(null);
  const [layout, setLayout] = useState({ columns: 1, width: 0, gap: 20, margin: 0, estimate: 300 });
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const [focusedAgentId, setFocusedAgentId] = useState<string | null>(null);
  /**
   * `closing` keeps the dialog mounted after Radix reports the close so its
   * dialog-only content can leave before the shared surface is handed back to
   * the card; the card stays put for both phases so the grid never reflows.
   */
  const [selection, setSelection] = useState<{
    agent: t.Agent;
    phase: 'open' | 'closing';
  } | null>(null);
  /**
   * The card whose surface is taking part in the morph. It outlives `selection`
   * because the contraction runs after the dialog has already handed the
   * surface back, and it has to stay above its neighbours until then.
   */
  const [liftedAgentId, setLiftedAgentId] = useState<string | null>(null);
  /**
   * The radius token resolved for the whole list, not per morph: the projection
   * keeps a `borderRadius` it has been handed once, so a value that came and
   * went with a selection would pin a morphed card's corner to whatever the
   * theme was at the time. Re-resolved when the theme rewrites the root.
   */
  const [surfaceRadius, setSurfaceRadius] = useState(readSurfaceRadius);
  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setSurfaceRadius(readSurfaceRadius()));
    observer.observe(root, { attributes: true, attributeFilter: ['style', 'class'] });
    return () => observer.disconnect();
  }, []);
  const reducedMotion = useReducedMotion();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(closeTimerRef.current), []);
  const selectedTriggerRef = useRef<HTMLButtonElement>(null);
  /**
   * Each mounted card's description paragraph, by agent. The dialog morphs its
   * copy out of the wrapping the card gave it, and asks for the paragraph again
   * on the way out, so the lookup is by agent rather than a ref that follows
   * the selection: a card reports its paragraph when it mounts, which is the
   * only time `motion.p` resolves the ref it forwards.
   */
  const descriptionNodes = useRef(new Map<string, HTMLParagraphElement>());
  const findDescription = useCallback((agentId: string) => {
    return descriptionNodes.current.get(agentId) ?? null;
  }, []);
  /**
   * Where focus goes when the dialog closes. Normally the card it expanded from, but that
   * card can be gone before the dialog is — a refresh that revoked access, deleted the
   * agent, or reordered it out of the cached pages — and the dialog deliberately stays
   * open on its stored selection. Restoring to a detached button drops keyboard focus out
   * of the page entirely, so the grid host is the fallback; it outlives both the card and
   * the list, which the empty state replaces.
   */
  const focusReturnRef = useRef<HTMLButtonElement | HTMLDivElement | null>(null);
  const resizeAnchorRef = useRef<number | null>(null);
  const focusedElementRef = useRef<HTMLElement | null>(null);
  const pendingFocusRef = useRef<{ id: string; backwards: boolean } | null>(null);
  const rowCount = Math.ceil(agents.length / layout.columns);
  const windowed = agents.length > WINDOW_THRESHOLD;

  const indexById = useMemo(() => {
    const indexes = new Map<string, number>();
    for (let index = 0; index < agents.length; index++) {
      indexes.set(agents[index].id, index);
    }
    return indexes;
  }, [agents]);
  const focusedIndex = focusedAgentId == null ? undefined : indexById.get(focusedAgentId);
  const selectedIndex = selection ? indexById.get(selection.agent.id) : undefined;
  const focusedRow = focusedIndex == null ? undefined : Math.floor(focusedIndex / layout.columns);
  const selectedRow =
    selectedIndex == null ? undefined : Math.floor(selectedIndex / layout.columns);
  const liftedIndex = liftedAgentId == null ? undefined : indexById.get(liftedAgentId);
  const liftedRow = liftedIndex == null ? undefined : Math.floor(liftedIndex / layout.columns);
  /**
   * Missing from the cursor window is not proof of deletion: sorting, paging, and scope
   * changes can all move a row out of the loaded pages. Ask the per-agent endpoint instead;
   * it enforces the current access check. While that request is in flight, action controls
   * stay inert, but a transient non-403/404 failure does not permanently mark the agent gone.
   */
  const selectedAgentQuery = useGetAgentByIdQuery(selection?.agent.id, {
    enabled: selection != null,
    staleTime: 0,
    refetchOnMount: 'always',
  });
  const selectedAgentUnavailable =
    selection != null && isAgentUnavailableError(selectedAgentQuery.error);
  const selectedAgentChecking =
    selection != null && selectedAgentQuery.isFetching && !selectedAgentUnavailable;
  const revalidateSelectedAgent = selectedAgentQuery.refetch;
  const selectedAgentId = selection?.agent.id;
  useEffect(() => {
    if (selectedAgentId != null && selectedIndex == null) {
      /* A missing cursor-window row may just have moved pages, so revalidate the
         captured id when the refresh actually removes it instead of inferring deletion. */
      void revalidateSelectedAgent();
    }
  }, [revalidateSelectedAgent, selectedAgentId, selectedIndex]);
  /** No source card in the list, or reduced motion: the dialog just fades. */
  const morphing = reducedMotion !== true && selection != null && selectedIndex != null;
  /**
   * The open dialog reads the row the list holds now, not the one it was opened from: a
   * background refresh can land a newer description, avatar, support contact or
   * conversation starter while the dialog is up, and a starter must not launch a chat
   * with text its owner has already replaced.
   *
   * Out of the window there is no row, and the per-agent endpoint is authoritative only
   * for what it returns: its VIEW response carries no `category`
   * (`api/server/controllers/agents/v1.js`), so replacing the captured row outright would
   * drop the badge off an agent that still has one. The revalidated fields are therefore
   * laid over the snapshot — fresh where the endpoint speaks, captured where it is silent.
   */
  let selectedAgent: t.Agent | null = null;
  if (selection != null) {
    if (selectedIndex != null) {
      selectedAgent = mergeRevalidatedAgent(agents[selectedIndex], selectedAgentQuery.data);
    } else if (selectedAgentQuery.data != null) {
      selectedAgent = mergeRevalidatedAgent(selection.agent, selectedAgentQuery.data);
    } else {
      selectedAgent = selection.agent;
    }
  }

  const getScrollElement = useCallback(() => scrollElementRef.current, [scrollElementRef]);
  const estimateSize = useCallback(() => layout.estimate, [layout.estimate]);
  const getItemKey = useCallback(
    (index: number) => `${layout.columns}:${agents[index * layout.columns]?.id ?? index}`,
    [agents, layout.columns],
  );
  const rangeExtractor = useCallback(
    (range: Range) => {
      const indexes = defaultRangeExtractor(range);
      for (const row of [focusedRow, selectedRow, liftedRow]) {
        if (row != null && row < range.count && !indexes.includes(row)) {
          indexes.push(row);
        }
      }
      return indexes.sort((a, b) => a - b);
    },
    [focusedRow, liftedRow, selectedRow],
  );
  const virtualizer = useVirtualizer<HTMLElement, HTMLDivElement>({
    enabled: listElement != null && layout.width > 0 && scrollElementRef.current != null,
    count: rowCount,
    getScrollElement,
    estimateSize,
    getItemKey,
    rangeExtractor,
    overscan: OVERSCAN_ROWS,
    gap: layout.gap,
    scrollMargin: layout.margin,
  });

  useLayoutEffect(() => {
    const frame = scrollElementRef.current;
    if (!listElement || !frame) {
      return;
    }
    frame.scrollTop = 0;
    const updateLayout = () => {
      const rect = listElement.getBoundingClientRect();
      if (rect.width === 0) {
        return;
      }
      const style = getComputedStyle(listElement);
      const columns = Math.max(1, Math.min(4, style.gridTemplateColumns.split(' ').length));
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const next = {
        columns,
        width: rect.width,
        gap: parseFloat(style.rowGap) || 0,
        margin: rect.top - frame.getBoundingClientRect().top - frame.clientTop + frame.scrollTop,
        estimate: fontSize * 18.75,
      };
      const previous = layoutRef.current;
      if (
        previous.width === next.width &&
        previous.columns === next.columns &&
        previous.gap === next.gap &&
        previous.margin === next.margin &&
        previous.estimate === next.estimate
      ) {
        return;
      }
      if (previous.width > 0 && previous.columns !== columns) {
        resizeAnchorRef.current = (virtualizer.range?.startIndex ?? 0) * previous.columns;
      }
      layoutRef.current = next;
      setLayout(next);
    };
    updateLayout();
    const observer = new ResizeObserver(updateLayout);
    observer.observe(listElement);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [listElement, scrollElementRef, virtualizer]);

  useLayoutEffect(() => {
    const anchor = resizeAnchorRef.current;
    if (anchor == null || rowCount === 0) {
      return;
    }
    resizeAnchorRef.current = null;
    virtualizer.scrollToIndex(Math.min(rowCount - 1, Math.floor(anchor / layout.columns)), {
      align: 'start',
    });
  }, [layout.columns, rowCount, virtualizer]);

  const virtualRows = virtualizer.getVirtualItems();
  const visibleEnd = virtualizer.range?.endIndex;
  useEffect(() => {
    if (
      hasNextPage &&
      !isFetching &&
      visibleEnd != null &&
      visibleEnd + OVERSCAN_ROWS >= rowCount - 1
    ) {
      onLoadMore();
    }
  }, [hasNextPage, isFetching, onLoadMore, rowCount, visibleEnd]);

  const handleSelect = useCallback(
    (agent: t.Agent) => {
      clearTimeout(closeTimerRef.current);
      setFocusedAgentId(agent.id);
      setSelection({ agent, phase: 'open' });
      if (reducedMotion !== true) {
        setLiftedAgentId(agent.id);
      }
      onSelectAgent?.(agent);
    },
    [onSelectAgent, reducedMotion],
  );
  /**
   * Radix reports the close for every route out of the dialog — close button,
   * Escape and backdrop — so the reverse morph is driven from one place. The
   * card is remounted with the dialog in a single commit, which is what lets
   * the projection hand the surface straight back without a crossfade. The
   * selection is never dropped synchronously: `OGDialog` restores focus to the
   * selected card's trigger in a macrotask, so that card has to stay mounted
   * until after it runs, reduced motion included.
   */
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        return;
      }
      clearTimeout(closeTimerRef.current);
      setSelection((current) => (current == null ? current : { ...current, phase: 'closing' }));
      closeTimerRef.current = setTimeout(
        () => setSelection(null),
        reducedMotion === true ? 0 : MORPH_HANDOFF_MS,
      );
    },
    [reducedMotion],
  );
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!(event.target instanceof Element) || !event.currentTarget.contains(event.target)) {
        return;
      }
      const item = event.target.closest<HTMLElement>('[data-agent-index]');
      const agent = item ? agents[Number(item.dataset.agentIndex)] : undefined;
      if (agent) {
        setFocusedAgentId(agent.id);
        if (event.target instanceof HTMLElement) {
          focusedElementRef.current = event.target;
        }
      }
    },
    [agents],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        event.key !== 'Tab' ||
        !(event.target instanceof HTMLElement) ||
        !event.currentTarget.contains(event.target)
      ) {
        return;
      }
      const item = event.target.closest<HTMLElement>('[data-agent-index]');
      if (!item) {
        return;
      }
      const controls = item.querySelectorAll<HTMLElement>(FOCUSABLE);
      const boundary = event.shiftKey ? controls[0] : controls[controls.length - 1];
      if (event.target !== boundary) {
        return;
      }
      const index = Number(item.dataset.agentIndex) + (event.shiftKey ? -1 : 1);
      const nextAgent = agents[index];
      if (!nextAgent || event.currentTarget.querySelector(`[data-agent-index="${index}"]`)) {
        return;
      }
      event.preventDefault();
      pendingFocusRef.current = { id: nextAgent.id, backwards: event.shiftKey };
      setFocusedAgentId(nextAgent.id);
      virtualizer.scrollToIndex(Math.floor(index / layout.columns), { align: 'auto' });
    },
    [agents, layout.columns, virtualizer],
  );

  useLayoutEffect(() => {
    const pending = pendingFocusRef.current;
    const index = pending ? indexById.get(pending.id) : undefined;
    if (!pending || index == null || !listElement) {
      return;
    }
    const item = listElement.querySelector(`[data-agent-index="${index}"]`);
    const controls = item?.querySelectorAll<HTMLElement>(FOCUSABLE);
    const target = pending.backwards ? controls?.[controls.length - 1] : controls?.[0];
    if (target) {
      pendingFocusRef.current = null;
      target.focus();
    }
  }, [focusedAgentId, indexById, listElement, virtualRows]);
  /**
   * Virtual row keys intentionally follow the first agent in each row so measured rows can be
   * recycled. When a reorder changes that key, React removes the focused trigger; restore the
   * same agent only when that removal actually left focus on the document body, never when the
   * user has moved focus elsewhere.
   */
  useLayoutEffect(() => {
    const focusedElement = focusedElementRef.current;
    if (
      focusedAgentId == null ||
      focusedElement == null ||
      focusedElement.isConnected ||
      document.activeElement !== document.body ||
      !listElement
    ) {
      return;
    }
    const index = indexById.get(focusedAgentId);
    if (index == null) {
      return;
    }
    const item = listElement.querySelector(`[data-agent-index="${index}"]`);
    const target = item?.querySelector<HTMLElement>(FOCUSABLE);
    if (target) {
      focusedElementRef.current = target;
      target.focus();
    }
  }, [focusedAgentId, indexById, listElement, virtualRows]);

  /**
   * The pinned placeholder reserves its height at the top of the content, so the rows
   * start below it — but a row the reader has already scrolled past still travels under
   * it. A focused card there would carry a focus ring nobody can see, so the frame
   * scrolls back by the overlap, which the reserve has made room for. Only the focused
   * card is moved into view: the reader's own scroll position is otherwise left alone.
   */
  useLayoutEffect(() => {
    const frame = scrollElementRef.current;
    const focusedElement = focusedElementRef.current;
    if (
      placeholderInset <= 0 ||
      frame == null ||
      focusedElement == null ||
      !focusedElement.isConnected ||
      document.activeElement !== focusedElement
    ) {
      return;
    }
    const obstructedUntil = frame.getBoundingClientRect().top + frame.clientTop + placeholderInset;
    const overlap = obstructedUntil - focusedElement.getBoundingClientRect().top;
    if (overlap > 0) {
      frame.scrollTop = Math.max(0, frame.scrollTop - overlap);
    }
  }, [focusedAgentId, placeholderInset, scrollElementRef, virtualRows]);

  /* Runs after every commit so the ref is current when `OGDialog` reads it on close: the
     card's own trigger while it is mounted, the grid once it is not. */
  useLayoutEffect(() => {
    focusReturnRef.current = selectedTriggerRef.current ?? hostElement;
  });

  const rows = windowed
    ? virtualRows
    : Array.from({ length: rowCount }, (_, index) => ({ index, key: getItemKey(index), start: 0 }));
  const columns = `repeat(${layout.columns}, minmax(0, 1fr))`;

  return (
    <OGDialog
      open={selection?.phase === 'open'}
      onOpenChange={handleOpenChange}
      triggerRef={focusReturnRef}
    >
      {/* Stays mounted in both states so the dialog always has somewhere to hand focus
          back to, even when the refresh that removed the selected agent also emptied the
          marketplace. */}
      <div ref={setHostElement} tabIndex={-1} className="min-w-0 focus-visible:outline-hidden">
        {/* The rows stay mounted while the marketplace has something else to say: replacing
            the list collapses its scrollable height, the browser clamps the scroll position to
            the shorter document, and the remount that follows a recovery starts the list at
            the top again — so a transient pagination failure would send someone browsing deep
            in the marketplace back to the first row. The placeholder therefore sits beside the
            rows rather than in their place, and before them, so recovery is first in reading
            and keyboard order: a failure card pins itself to the top of the scroll frame,
            where placing it after the rows would have made keyboard users traverse every
            loaded agent to reach Retry. With no rows there is no height to keep, and the
            placeholder is all there is to show. */}
        {placeholder}
        {agents.length > 0 && (
          <div
            role="list"
            tabIndex={-1}
            ref={setListElement}
            className="relative grid min-w-0 grid-cols-[repeat(auto-fill,minmax(min(100%,max(20rem,calc((100%_-_3.75rem)/4))),1fr))] gap-5"
            style={windowed ? { height: virtualizer.getTotalSize() } : undefined}
            aria-label={label}
            onFocusCapture={handleFocus}
            onKeyDownCapture={handleKeyDown}
          >
            {rows.map((row) => {
              const cards: React.ReactNode[] = [];
              const end = Math.min((row.index + 1) * layout.columns, agents.length);
              for (let index = row.index * layout.columns; index < end; index++) {
                const agent = agents[index];
                const selected = selection?.agent.id === agent.id;
                cards.push(
                  <div
                    key={agent.id}
                    role="listitem"
                    aria-posinset={index + 1}
                    aria-setsize={agents.length}
                    data-agent-index={index}
                    className={
                      agent.id === liftedAgentId ? 'relative h-full min-w-0' : 'h-full min-w-0'
                    }
                    style={agent.id === liftedAgentId ? { zIndex: LIFTED_ROW_Z_INDEX } : undefined}
                  >
                    <AgentCard
                      agent={agent}
                      onSelect={handleSelect}
                      expanded={selected}
                      morphing={agent.id === liftedAgentId}
                      surfaceRadius={surfaceRadius}
                      ref={selected ? selectedTriggerRef : undefined}
                      descriptionRef={(node) => {
                        if (node == null) {
                          descriptionNodes.current.delete(agent.id);
                        } else {
                          descriptionNodes.current.set(agent.id, node);
                        }
                      }}
                    />
                  </div>,
                );
              }
              return (
                <div
                  key={row.key}
                  role="presentation"
                  data-index={row.index}
                  ref={virtualizer.measureElement}
                  className={
                    windowed
                      ? 'absolute top-0 left-0 grid w-full items-stretch gap-5'
                      : 'relative col-span-full grid items-stretch gap-5'
                  }
                  style={{
                    gridTemplateColumns: columns,
                    ...(windowed
                      ? { transform: `translateY(${row.start - layout.margin}px)` }
                      : {}),
                    ...(row.index === liftedRow ? { zIndex: LIFTED_ROW_Z_INDEX } : {}),
                  }}
                >
                  {cards}
>>>>>>> upstream/main
                </div>
              );
            })}
          </div>
<<<<<<< HEAD

          {showLoading && (
            <div
              className="flex justify-center py-4"
              role="status"
              aria-live="polite"
              aria-label={localize('com_agents_loading')}
            >
              <Spinner className="h-6 w-6 text-text-primary" />
              <span className="sr-only">{localize('com_agents_loading')}</span>
            </div>
          )}
        </div>
      );
    },
    [
      currentAgents,
      getCardsPerRow,
      getRowItems,
      getRowCount,
      isFetchingNextPage,
      localize,
      onSelectAgent,
    ],
  );

  // Simple loading spinner
  const loadingSpinner = (
    <div className="flex justify-center py-12">
      <Spinner className="h-8 w-8 text-text-primary" />
    </div>
  );

  // Handle error state
  if (error) {
    return (
      <ErrorDisplay
        error={error || 'Unknown error occurred'}
        onRetry={() => refetch()}
        context={{ searchQuery, category }}
      />
    );
  }

  // Handle loading state
  if ((isLoading || (isFetching && !isFetchingNextPage)) && !hasData) {
    return loadingSpinner;
  }

  // Handle empty results
  if ((!currentAgents || currentAgents.length === 0) && !isLoading && !isFetching) {
    return (
      <div
        className="py-12 text-center text-text-secondary"
        role="status"
        aria-live="polite"
        aria-label={
          searchQuery
            ? localize('com_agents_search_empty_heading')
            : localize('com_agents_empty_state_heading')
        }
      >
        <h3 className="mb-2 text-lg font-medium">{localize('com_agents_empty_state_heading')}</h3>
      </div>
    );
  }

  // Main virtualized content
  return (
    <div
      className="space-y-6"
      role="tabpanel"
      id={`category-panel-${category}`}
      aria-labelledby={`category-tab-${category}`}
      aria-live="polite"
      aria-busy={isLoading && !hasData}
    >
      {/* Screen reader announcement */}
      <div id="search-results-count" className="sr-only" aria-live="polite" aria-atomic="true">
        {localize('com_agents_grid_announcement', {
          count: currentAgents?.length || 0,
          category: getCategoryDisplayName(category),
        })}
      </div>

      {/* Virtualized grid with external scroll integration */}
      <div
        role="grid"
        aria-label={localize('com_agents_grid_announcement', {
          count: currentAgents.length,
          category: getCategoryDisplayName(category),
        })}
      >
        {scrollElement ? (
          <WindowScroller scrollElement={scrollElement}>
            {({ height, isScrolling, registerChild, onChildScroll, scrollTop }) => (
              <AutoSizer disableHeight>
                {({ width }) => {
                  const cardsPerRow = getCardsPerRow(width);
                  const rowCount = getRowCount(currentAgents.length, cardsPerRow);

                  return (
                    <div ref={registerChild as React.LegacyRef<HTMLDivElement>}>
                      <VirtualList
                        ref={listRef}
                        autoHeight
                        height={height}
                        isScrolling={isScrolling}
                        onScroll={onChildScroll}
                        overscanRowCount={OVERSCAN_ROW_COUNT}
                        rowCount={rowCount}
                        rowHeight={ROW_HEIGHT}
                        rowRenderer={rowRenderer}
                        scrollTop={scrollTop}
                        width={width}
                        style={{ outline: 'none' }}
                        aria-rowcount={rowCount}
                        data-testid="virtual-list"
                        data-total-rows={rowCount}
                      />
                    </div>
                  );
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        ) : (
          // Fallback for when no external scroll element is provided
          <div style={{ height: 600 }}>
            <AutoSizer>
              {({ width, height }) => {
                const cardsPerRow = getCardsPerRow(width);
                const rowCount = getRowCount(currentAgents.length, cardsPerRow);

                return (
                  <VirtualList
                    ref={listRef}
                    height={height}
                    overscanRowCount={OVERSCAN_ROW_COUNT}
                    rowCount={rowCount}
                    rowHeight={ROW_HEIGHT}
                    rowRenderer={rowRenderer}
                    width={width}
                    style={{ outline: 'none' }}
                    aria-rowcount={rowCount}
                    data-testid="virtual-list"
                    data-total-rows={rowCount}
                  />
                );
              }}
            </AutoSizer>
          </div>
        )}
      </div>

      {/* End of results indicator */}
      {!hasNextPage && currentAgents && currentAgents.length > 0 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">{localize('com_agents_no_more_results')}</p>
        </div>
      )}
    </div>
  );
};

export default VirtualizedAgentGrid;
=======
        )}
      </div>
      {createPortal(
        <AnimatePresence onExitComplete={() => setLiftedAgentId(null)}>
          {/* Dropped on the close itself rather than when the dialog unmounts:
              the surface cannot start contracting until the handover is over, so
              the dim leaving is what answers the click. Its exit spans the
              handover and the contraction, which is also what keeps the card
              lifted above its neighbours until the surface has landed. */}
          {morphing && selection?.phase === 'open' && (
            <motion.div
              key="agent-detail-backdrop"
              aria-hidden="true"
              className={cn('pointer-events-none fixed inset-0', DIALOG_SCRIM_CLASS)}
              style={{ zIndex: BACKDROP_Z_INDEX }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: BACKDROP_ENTER_TRANSITION }}
              exit={{ opacity: 0, transition: BACKDROP_EXIT_TRANSITION }}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
      {selection != null && selectedAgent != null && (
        <AgentDetailContent
          agent={selectedAgent}
          /* Without a mounted source card — the filters or the search moved on
             — there is nothing to morph from, so the dialog just fades. */
          morph={morphing ? selection.phase : undefined}
          surfaceRadius={surfaceRadius}
          descriptionSource={findDescription}
          actionsUnavailable={selectedAgentUnavailable}
          actionsDisabled={selectedAgentChecking}
        />
      )}
    </OGDialog>
  );
}
>>>>>>> upstream/main
