<<<<<<< HEAD
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import * as Ariakit from '@ariakit/react';
import { Spinner } from '@librechat/client';
import { Constants } from 'librechat-data-provider';
import type { TConversation } from 'librechat-data-provider';
import type { CurrencyConfig } from '~/utils';
import useCompactConversation, { supportsCompaction } from '~/hooks/Chat/useCompactConversation';
import { useGetLangfuseSessionLinkQuery, useGetStartupConfig } from '~/data-provider';
import useTokenUsage from '~/hooks/Chat/useTokenUsage';
import CompactAction from './CompactAction';
import { formatTokens, cn } from '~/utils';
import { useLocalize } from '~/hooks';
=======
import { memo } from 'react';
import { Spinner } from '@librechat/client';
import { Constants } from 'librechat-data-provider';
import type { TConversation } from 'librechat-data-provider';
import type { TokenUsageView } from '~/hooks/Chat/useTokenUsage';
import type { CurrencyConfig } from '~/utils';
import useCompactConversation, { supportsCompaction } from '~/hooks/Chat/useCompactConversation';
import { useGetLangfuseSessionLinkQuery, useGetStartupConfig } from '~/data-provider';
import Balance, { Summary as BalanceSummary } from '~/components/Balance';
import useBalanceSummary from '~/hooks/useBalanceSummary';
import useTokenUsage from '~/hooks/Chat/useTokenUsage';
import CompactAction from './CompactAction';
import { formatTokens } from '~/utils';
import { useLocalize } from '~/hooks';
import UsagePopover from './Popover';
>>>>>>> upstream/main
import Breakdown from './Breakdown';
import Gauge from './Gauge';

interface TokenUsageProps {
  index: number;
  conversation: TConversation | null;
  isSubmitting: boolean;
}

<<<<<<< HEAD
/** Hover pacing: a brief intent delay so sweeping past the gauge doesn't pop
 *  the card open, and a grace period for the pointer to travel into it. */
const SHOW_DELAY_MS = 100;
const HIDE_DELAY_MS = 150;

function TokenUsageIndicator({
  index,
  conversation,
=======
interface ContextCardProps {
  view: TokenUsageView;
  conversationId: string;
  isSubmitting: boolean;
  showCost: boolean;
  currency?: CurrencyConfig;
  langfuseConnectionAccess: boolean;
  compaction: ReturnType<typeof useCompactConversation>;
  compactionAvailable: boolean;
}

/** The context half of the card. Mounted only while the card is open, so the
 *  Langfuse session link resolves on demand rather than per conversation. */
function ContextCard({
  view,
  conversationId,
>>>>>>> upstream/main
  isSubmitting,
  showCost,
  currency,
  langfuseConnectionAccess,
<<<<<<< HEAD
  compactionEnabled,
}: TokenUsageProps & {
  showCost: boolean;
  currency?: CurrencyConfig;
  langfuseConnectionAccess: boolean;
  compactionEnabled: boolean;
}) {
  const localize = useLocalize();
  const view = useTokenUsage({ index, conversation, isSubmitting });
  /** Owned here, not in the popover: `unmountOnHide` would otherwise lose the
   *  in-flight state the moment the pointer leaves. */
  const compaction = useCompactConversation();
  const compactionAvailable = compactionEnabled && supportsCompaction(conversation?.endpoint);
  const popover = Ariakit.usePopoverStore({ placement: 'top' });
  const popoverOpen = Ariakit.useStoreState(popover, 'open');
  const disclosureRef = useRef<HTMLButtonElement>(null);
  const conversationId = conversation?.conversationId ?? '';
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /**
   * Ariakit only restores focus to the trigger on hide when it took focus on
   * show, so keep `autoFocusOnShow` on for click/keyboard opens (Escape returns
   * focus to the gauge) and off for hover so it never pulls focus off the
   * composer mid-typing.
   */
  const [focusOnShow, setFocusOnShow] = useState(true);
  /** A click pins an open popover: hover no longer holds it, so the pointer can
   *  leave without it closing. Cleared when the popover closes by any path
   *  (Escape, outside click, a second click). */
  const pinnedRef = useRef(false);
  /** The pin state as of the pointerdown that precedes a mouse click. The
   *  pointerdown may hide the popover (hideOnInteractOutside does not exempt
   *  the disclosure's inner elements), which clears `pinnedRef` via the close
   *  effect before the click handler runs; the click must decide from this
   *  snapshot instead. */
  const pinAtPointerDownRef = useRef(false);

  const cancelTimers = useCallback(() => {
    if (showTimerRef.current != null) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current != null) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);
  const openByPointer = useCallback(() => {
    if (pinnedRef.current) {
      return;
    }
    cancelTimers();
    if (popover.getState().open) {
      return;
    }
    showTimerRef.current = setTimeout(() => {
      showTimerRef.current = null;
      setFocusOnShow(false);
      popover.show();
    }, SHOW_DELAY_MS);
  }, [cancelTimers, popover]);
  const scheduleHide = useCallback(() => {
    if (pinnedRef.current) {
      return;
    }
    cancelTimers();
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      popover.hide();
    }, HIDE_DELAY_MS);
  }, [cancelTimers, popover]);

  useEffect(() => {
    if (!popoverOpen) {
      pinnedRef.current = false;
    }
  }, [popoverOpen]);

  /** Pending hover work must not outlive its target: cancel it on unmount and
   *  when the branch changes under the pointer, so a delayed show cannot open
   *  the popover for a conversation the user has navigated away from. */
  useEffect(() => cancelTimers, [cancelTimers, conversationId]);

  const canResolveLangfuseSession =
    langfuseConnectionAccess &&
    popoverOpen &&
=======
  compaction,
  compactionAvailable,
}: ContextCardProps) {
  const canResolveLangfuseSession =
    langfuseConnectionAccess &&
>>>>>>> upstream/main
    !isSubmitting &&
    conversationId !== '' &&
    conversationId !== Constants.NEW_CONVO &&
    conversationId !== Constants.PENDING_CONVO;
  const { data: langfuseSession } = useGetLangfuseSessionLinkQuery(
    conversationId,
    canResolveLangfuseSession,
  );

<<<<<<< HEAD
  /** Hide until the branch has data — keeps a fresh, message-less chat clean and
   *  lets the indicator animate into view once the first tokens land. */
  if (view.usedTokens <= 0) {
=======
  return (
    <>
      <Breakdown
        view={view}
        showCost={showCost}
        compactionAvailable={compactionAvailable}
        currency={currency}
        langfuseSessionUrl={langfuseSession?.url ?? undefined}
      />
      {compactionAvailable && (
        <>
          <div className="border-border-light border-t" role="separator" />
          <CompactAction
            compact={compaction.compact}
            canCompact={compaction.canCompact}
            isCompacting={compaction.isCompacting}
          />
        </>
      )}
    </>
  );
}

function TokenUsageIndicator({
  index,
  conversation,
  isSubmitting,
  showCost,
  currency,
  langfuseConnectionAccess,
  compactionEnabled,
  balanceEnabled,
}: TokenUsageProps & {
  showCost: boolean;
  currency?: CurrencyConfig;
  langfuseConnectionAccess: boolean;
  compactionEnabled: boolean;
  balanceEnabled: boolean;
}) {
  const localize = useLocalize();
  const view = useTokenUsage({ index, conversation, isSubmitting });
  /** Owned here, not in the popover: `unmountOnHide` would otherwise lose the
   *  in-flight state the moment the pointer leaves. */
  const compaction = useCompactConversation();
  const compactionAvailable = compactionEnabled && supportsCompaction(conversation?.endpoint);
  const conversationId = conversation?.conversationId ?? '';
  const hasContext = view.usedTokens > 0;

  /** Without balance, hide until the branch has data — keeps a fresh,
   *  message-less chat clean and lets the indicator animate into view once the
   *  first tokens land. With balance, the card always has something to show. */
  if (!hasContext && !balanceEnabled) {
>>>>>>> upstream/main
    return null;
  }

  const hasMax = view.maxTokens != null && view.maxTokens > 0;
<<<<<<< HEAD
  const usageAriaLabel = hasMax
    ? localize('com_ui_context_usage_label', {
        0: formatTokens(view.usedTokens),
        1: formatTokens(view.maxTokens ?? 0),
        2: String(Math.round(view.percent)),
      })
    : localize('com_ui_context_usage_label_unknown', { 0: formatTokens(view.usedTokens) });
  const ariaLabel = compaction.isCompacting
    ? localize('com_ui_context_compacting')
    : usageAriaLabel;
  const showCompactingIndicator = compaction.isCompacting && !popoverOpen;

  return (
    <>
      {/* Hover shows the breakdown; the disclosure keeps click / Enter / Space
          working for touch and keyboard users. Taps also emit pointer
          enter/leave, so the hover timers are gated to hover-capable pointers
          or a tap would hide the popover it just opened. */}
      <Ariakit.PopoverDisclosure
        ref={disclosureRef}
        store={popover}
        type="button"
        data-testid="token-usage"
        aria-label={ariaLabel}
        aria-busy={compaction.isCompacting}
        aria-haspopup="dialog"
        onPointerDown={() => {
          pinAtPointerDownRef.current = pinnedRef.current;
        }}
        onPointerEnter={(e) => {
          if (e.pointerType !== 'touch') {
            openByPointer();
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch') {
            scheduleHide();
          }
        }}
        onClick={(e) => {
          cancelTimers();
          e.preventDefault();
          /** Mouse clicks (detail > 0) decide from the pointerdown snapshot:
           *  the pointerdown may have hidden the popover and cleared the live
           *  pin before this handler ran. Keyboard clicks carry no pointerdown,
           *  so the live pin state is the truth there. */
          const wasPinned = e.detail > 0 ? pinAtPointerDownRef.current : pinnedRef.current;
          if (wasPinned) {
            pinnedRef.current = false;
            popover.hide();
            return;
          }
          if (!popover.getState().open) {
            setFocusOnShow(true);
          }
          pinnedRef.current = true;
          popover.show();
        }}
        className={cn(
          'flex size-theme-control items-center justify-center rounded-theme-control-round transition-colors',
          'hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
          'duration-300 animate-in fade-in zoom-in-95',
        )}
      >
        {showCompactingIndicator ? (
          <Spinner className="size-5 text-text-secondary" />
=======
  let usageAriaLabel = localize('com_nav_balance');
  if (hasContext) {
    usageAriaLabel = hasMax
      ? localize('com_ui_context_usage_label', {
          0: formatTokens(view.usedTokens),
          1: formatTokens(view.maxTokens ?? 0),
          2: String(Math.round(view.percent)),
        })
      : localize('com_ui_context_usage_label_unknown', { 0: formatTokens(view.usedTokens) });
  }
  const ariaLabel = compaction.isCompacting
    ? localize('com_ui_context_compacting')
    : usageAriaLabel;

  return (
    <UsagePopover
      resetKey={conversationId}
      label={ariaLabel}
      cardLabel={localize(hasContext ? 'com_ui_context_usage' : 'com_nav_balance')}
      busy={compaction.isCompacting}
      trigger={(open) =>
        compaction.isCompacting && !open ? (
          <Spinner className="text-text-secondary size-5" />
>>>>>>> upstream/main
        ) : (
          <span
            role="meter"
            aria-valuemin={0}
            aria-valuemax={hasMax ? view.maxTokens : undefined}
            aria-valuenow={view.usedTokens}
            aria-label={localize('com_ui_context_usage')}
            className="flex items-center justify-center"
          >
<<<<<<< HEAD
            <Gauge percent={view.percent} indeterminate={!hasMax} />
          </span>
        )}
      </Ariakit.PopoverDisclosure>
      {/* Focus the labelled dialog on keyboard/click open so screen readers
          enter and announce the breakdown, and so focus stays contained instead
          of falling back to the body (which the composer's global focus logic
          would steal). The visible ring is suppressed via focus:outline-none,
          and finalFocus returns focus to the gauge trigger on close. */}
      <Ariakit.Popover
        store={popover}
        gutter={8}
        portal
        unmountOnHide
        autoFocusOnShow={focusOnShow}
        finalFocus={disclosureRef}
        aria-label={localize('com_ui_context_usage')}
        onPointerEnter={cancelTimers}
        onPointerLeave={(e) => {
          if (e.pointerType !== 'touch') {
            scheduleHide();
          }
        }}
        className={cn(
          // NJ: Custom token meter card border + background
          'z-[200] rounded-xl border border-[var(--border-warm-gray-12)] bg-surface-primary-alt p-3 text-text-primary shadow-lg focus:outline-none',
          'origin-bottom translate-y-1 scale-95 opacity-0 transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none',
          'data-[enter]:translate-y-0 data-[enter]:scale-100 data-[enter]:opacity-100',
          'data-[leave]:translate-y-1 data-[leave]:scale-95 data-[leave]:opacity-0',
        )}
      >
        {/* The popover owns its width, which the breakdown held only while it
            was the sole child of a shrink-to-fit box. */}
        <div className="w-72 space-y-3">
          <Breakdown
            view={view}
            showCost={showCost}
            compactionAvailable={compactionAvailable}
            currency={currency}
            langfuseSessionUrl={langfuseSession?.url ?? undefined}
          />
          {compactionAvailable && (
            <>
              <div className="border-t border-border-light" role="separator" />
              <CompactAction
                compact={compaction.compact}
                canCompact={compaction.canCompact}
                isCompacting={compaction.isCompacting}
              />
            </>
          )}
        </div>
      </Ariakit.Popover>
    </>
=======
            <Gauge percent={view.percent} indeterminate={hasContext && !hasMax} />
          </span>
        )
      }
    >
      {/* The popover owns its width, which the breakdown held only while it
          was the sole child of a shrink-to-fit box. */}
      <div className="w-72 max-w-full space-y-3">
        {hasContext && (
          <ContextCard
            view={view}
            conversationId={conversationId}
            isSubmitting={isSubmitting}
            showCost={showCost}
            currency={currency}
            langfuseConnectionAccess={langfuseConnectionAccess}
            compaction={compaction}
            compactionAvailable={compactionAvailable}
          />
        )}
        {balanceEnabled && (
          <Balance className={hasContext ? 'border-border-light border-t pt-3' : undefined} />
        )}
      </div>
    </UsagePopover>
  );
}

/** The gauge for a deployment that turned context usage off but meters credits:
 *  its ring is the share of the balance allotment spent. */
function BalanceIndicator({ conversationId }: { conversationId: string }) {
  const localize = useLocalize();
  const { state, currency } = useBalanceSummary();
  if (state.status === 'empty') {
    return null;
  }
  const summary = state.status === 'success' ? state.summary : null;
  const usedPercent = summary?.usedPercent ?? null;
  const label = localize('com_nav_balance');

  return (
    <UsagePopover
      resetKey={conversationId}
      label={label}
      cardLabel={label}
      busy={state.status === 'loading'}
      trigger={() =>
        /** A meter has no indeterminate state: until there is a share to report
         *  (loading, failed, nothing to measure against) the ring is decoration
         *  and the button's label carries the name. */
        usedPercent != null ? (
          <span
            role="meter"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={usedPercent}
            aria-label={localize('com_ui_balance_used_label')}
            className="flex items-center justify-center"
          >
            <Gauge percent={usedPercent} indeterminate={false} tone={summary?.tone} />
          </span>
        ) : (
          <span aria-hidden="true" className="flex items-center justify-center">
            <Gauge percent={0} indeterminate />
          </span>
        )
      }
    >
      <div className="w-72 max-w-full">
        <BalanceSummary state={state} currency={currency} />
      </div>
    </UsagePopover>
>>>>>>> upstream/main
  );
}

/** Config gate kept outside the indicator so disabled deployments mount nothing */
const TokenUsage = memo(function TokenUsage(props: TokenUsageProps) {
  const { data: startupConfig } = useGetStartupConfig();
  /** Wait for config before mounting: until it loads `contextUsage === false`
   *  reads as undefined, so a disabled deployment would briefly mount the
   *  indicator and fire the token-config query on first load */
<<<<<<< HEAD
  if (startupConfig == null || startupConfig.interface?.contextUsage === false) {
    return null;
  }
=======
  if (startupConfig == null) {
    return null;
  }
  const balanceEnabled = startupConfig.balance?.enabled === true;
  if (startupConfig.interface?.contextUsage === false) {
    return balanceEnabled ? (
      <BalanceIndicator conversationId={props.conversation?.conversationId ?? ''} />
    ) : null;
  }
>>>>>>> upstream/main
  return (
    <TokenUsageIndicator
      {...props}
      showCost={startupConfig.interface?.contextCost === true}
      currency={startupConfig.interface?.currency}
      langfuseConnectionAccess={startupConfig.langfuseConnectionAccess === true}
      /** Same `summarization.enabled` switch that governs the automatic detour,
       *  advertised positively: a server that does not know the capability
       *  (a cached config from an older release) must not receive the request,
       *  which it would run as an empty, billed ordinary turn. */
      compactionEnabled={startupConfig.compactionEnabled === true}
<<<<<<< HEAD
=======
      balanceEnabled={balanceEnabled}
>>>>>>> upstream/main
    />
  );
});

export default TokenUsage;
