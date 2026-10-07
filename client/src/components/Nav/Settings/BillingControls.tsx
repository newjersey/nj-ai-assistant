<<<<<<< HEAD
import type { TBalanceResponse } from 'librechat-data-provider';
import AutoRefillSettings from '../SettingsTabs/Balance/AutoRefillSettings';
import { useGetStartupConfig, useGetUserBalance } from '~/data-provider';
import TokenCreditsItem from '../SettingsTabs/Balance/TokenCreditsItem';
import { useAuthContext, useLocalize } from '~/hooks';

function useBalance(): Partial<TBalanceResponse> {
  const { isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();

  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && !!startupConfig?.balance?.enabled,
  });

  return balanceQuery.data ?? {};
}

export function TokenCredits() {
  const { tokenCredits = 0 } = useBalance();
  return <TokenCreditsItem tokenCredits={tokenCredits} />;
=======
import { Skeleton } from '@librechat/client';
import AutoRefillSettings from '../SettingsTabs/Balance/AutoRefillSettings';
import useBalanceSummary from '~/hooks/useBalanceSummary';
import { formatBalanceAmount } from '~/utils';
import Balance from '~/components/Balance';
import { useLocalize } from '~/hooks';

/** The same reading the context gauge shows, so both surfaces agree. */
export function TokenCredits() {
  return <Balance />;
>>>>>>> upstream/main
}

export function AutoRefill() {
  const localize = useLocalize();
<<<<<<< HEAD
  const {
    autoRefillEnabled = false,
    lastRefill,
    refillAmount,
    refillIntervalUnit,
    refillIntervalValue,
  } = useBalance();

  const hasValidRefillSettings =
    lastRefill !== undefined &&
    refillAmount !== undefined &&
    refillIntervalUnit !== undefined &&
    refillIntervalValue !== undefined;

  if (!autoRefillEnabled) {
    return (
      <div className="text-sm text-text-secondary">
=======
  const { state, currency, balance } = useBalanceSummary();

  /** Settings search can show this row without the balance row beside it, so it carries its
   *  own loading and failure states rather than relying on the summary's */
  if (state.status === 'loading') {
    return (
      <div className="space-y-2" aria-busy="true" data-testid="auto-refill-loading">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }
  if (state.status === 'error') {
    return (
      <div className="text-text-destructive text-sm" role="alert">
        {localize('com_nav_balance_auto_refill_error')}
      </div>
    );
  }
  if (state.status !== 'success' || balance == null) {
    return null;
  }

  const { summary } = state;
  const { lastRefill, refillIntervalUnit, refillIntervalValue } = balance;

  /** A non-positive refill amount never refills (the server requires a positive one), the same
   *  reading the balance summary gives it */
  if (!balance.autoRefillEnabled || summary.refillAmount == null) {
    return (
      <div className="text-text-secondary text-sm">
>>>>>>> upstream/main
        {localize('com_nav_balance_auto_refill_disabled')}
      </div>
    );
  }

<<<<<<< HEAD
  if (!hasValidRefillSettings) {
    return (
      <div className="text-sm text-text-destructive">
=======
  if (
    lastRefill === undefined ||
    refillIntervalUnit === undefined ||
    refillIntervalValue === undefined
  ) {
    return (
      <div className="text-text-destructive text-sm">
>>>>>>> upstream/main
        {localize('com_nav_balance_auto_refill_error')}
      </div>
    );
  }

  return (
    <AutoRefillSettings
<<<<<<< HEAD
      lastRefill={lastRefill}
      refillAmount={refillAmount}
=======
      refillMode={summary.refillMode}
      lastRefill={lastRefill}
      nextRefill={summary.nextRefill}
      /** Percent-only deployments show no credit figures anywhere */
      refillAmount={
        summary.display === 'percent'
          ? null
          : formatBalanceAmount(summary.refillAmount, summary.display, currency)
      }
>>>>>>> upstream/main
      refillIntervalUnit={refillIntervalUnit}
      refillIntervalValue={refillIntervalValue}
    />
  );
}
