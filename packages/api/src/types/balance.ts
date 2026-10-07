<<<<<<< HEAD
import type { RefillIntervalUnit } from 'librechat-data-provider';
=======
import type { BalanceRefillMode, RefillIntervalUnit } from 'librechat-data-provider';
>>>>>>> upstream/main

export interface BalanceUpdateFields {
  user?: string;
  tokenCredits?: number;
  autoRefillEnabled?: boolean;
  refillIntervalValue?: number;
  refillIntervalUnit?: RefillIntervalUnit;
  refillAmount?: number;
<<<<<<< HEAD
=======
  refillMode?: BalanceRefillMode;
>>>>>>> upstream/main
  lastRefill?: Date;
}
