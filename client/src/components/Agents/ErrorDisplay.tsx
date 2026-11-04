import React from 'react';
<<<<<<< HEAD
import { Button } from '@librechat/client';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

// Comprehensive error type that handles all possible error structures
type ApiError =
  | string
  | Error
  | {
      message?: string;
      status?: number;
      code?: string;
      response?: {
        data?: {
          userMessage?: string;
          suggestion?: string;
          message?: string;
        };
        status?: number;
      };
      data?: {
        userMessage?: string;
        suggestion?: string;
        message?: string;
      };
    };
=======
import { RetryableError } from '@librechat/client';
import { Hourglass, SearchX, ServerCrash, Timer, TriangleAlert, WifiOff } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useGetStartupConfig } from '~/data-provider';
import { useLocalize } from '~/hooks';

/** Fields the API attaches to a failure, at whichever level the client sees it. */
interface ErrorPayload {
  userMessage?: string;
  suggestion?: string;
  message?: string;
}

/** An axios error, a plain `Error`, a string, or a bare payload from the API. */
interface ErrorShape extends ErrorPayload {
  code?: string;
  status?: number;
  response?: {
    status?: number;
    data?: ErrorPayload;
  };
  data?: ErrorPayload;
}

export type ApiError = string | Error | ErrorShape;
>>>>>>> upstream/main

interface ErrorDisplayProps {
  error: ApiError;
  onRetry?: () => void;
<<<<<<< HEAD
=======
  /** True while the owning query is fetching again, so the action can report progress. */
  isRetrying?: boolean;
>>>>>>> upstream/main
  context?: {
    searchQuery?: string;
    category?: string;
  };
}

<<<<<<< HEAD
/**
 * User-friendly error display component with actionable suggestions
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry, context }) => {
  const localize = useLocalize();

  // Type guards
  const isErrorObject = (err: ApiError): err is { [key: string]: unknown } => {
    return typeof err === 'object' && err !== null && !(err instanceof Error);
  };

  const isErrorInstance = (err: ApiError): err is Error => {
    return err instanceof Error;
  };

  // Extract user-friendly error information
  const getErrorInfo = (): { title: string; message: string; suggestion: string } => {
    // Handle different error types
    let errorData: unknown;

    if (typeof error === 'string') {
      errorData = { message: error };
    } else if (isErrorInstance(error)) {
      errorData = { message: error.message };
    } else if (isErrorObject(error)) {
      // Handle axios error response structure
      errorData = (error as any)?.response?.data || (error as any)?.data || error;
    } else {
      errorData = error;
    }

    // Handle network errors first
    let errorMessage = '';
    if (isErrorInstance(error)) {
      errorMessage = error.message;
    } else if (isErrorObject(error) && (error as any)?.message) {
      errorMessage = (error as any).message;
    }

    const errorCode = isErrorObject(error) ? (error as any)?.code : '';

    // Handle timeout errors specifically
    if (errorCode === 'ECONNABORTED' || errorMessage?.includes('timeout')) {
      return {
        title: localize('com_agents_error_timeout_title'),
        message: localize('com_agents_error_timeout_message'),
        suggestion: localize('com_agents_error_timeout_suggestion'),
      };
    }

    if (errorCode === 'NETWORK_ERROR' || errorMessage?.includes('Network Error')) {
      return {
        title: localize('com_agents_error_network_title'),
        message: localize('com_agents_error_network_message'),
        suggestion: localize('com_agents_error_network_suggestion'),
      };
    }

    // Handle specific HTTP status codes before generic userMessage
    const status = isErrorObject(error) ? (error as any)?.response?.status : null;
    if (status) {
      if (status === 404) {
        return {
          title: localize('com_agents_error_not_found_title'),
          message: getNotFoundMessage(),
          suggestion: localize('com_agents_error_not_found_suggestion'),
        };
      }

      if (status === 400) {
        return {
          title: localize('com_agents_error_invalid_request'),
          message:
            (errorData as any)?.userMessage || localize('com_agents_error_bad_request_message'),
          suggestion:
            (errorData as any)?.suggestion || localize('com_agents_error_bad_request_suggestion'),
        };
      }

      if (status >= 500) {
        return {
          title: localize('com_agents_error_server_title'),
          message: localize('com_agents_error_server_message'),
          suggestion: localize('com_agents_error_server_suggestion'),
        };
      }
    }

    // Use user-friendly message from backend if available (after specific status code handling)
    if (errorData && typeof errorData === 'object' && (errorData as any)?.userMessage) {
      return {
        title: getContextualTitle(),
        message: (errorData as any).userMessage,
        suggestion:
          (errorData as any).suggestion || localize('com_agents_error_suggestion_generic'),
      };
    }

    // Fallback to generic error with contextual title
    return {
      title: getContextualTitle(),
      message: localize('com_agents_error_generic'),
      suggestion: localize('com_agents_error_suggestion_generic'),
    };
  };

=======
/** Which failure this is: drives the icon, the tone, and whether retrying can help. */
type ErrorKind =
  | 'network'
  | 'timeout'
  | 'rate_limit'
  | 'server'
  | 'not_found'
  | 'bad_request'
  | 'generic';

/**
 * One heading plus one line. The old three-tier title/message/suggestion stack
 * repeated itself ("Connection Problem" / "Unable to connect to the server." /
 * "Check your internet connection…"), so the detail line carries the single
 * most useful sentence: what to do about it, or what specifically was missing.
 */
interface ErrorInfo {
  kind: ErrorKind;
  title: string;
  detail: string;
}

/**
 * Only transport and server failures clear up on their own, so only those get
 * an automatic retry: a 404 here is an empty result and a 400 is a malformed
 * request, and repeating either just burns requests behind an unchanging state.
 * `not_found` is also the marketplace's "nothing matched" state, so it stays
 * neutral rather than painting an empty search red. A 408 and a 429 are
 * backpressure rather than answers, and the marketplace query
 * (`~/data-provider/Agents/queries.ts`) already retries both, so the card has to
 * keep recovering once those short attempts are spent.
 */
const ERROR_KINDS: Record<
  ErrorKind,
  { icon: LucideIcon; transient: boolean; tone: 'error' | 'neutral' }
> = {
  network: { icon: WifiOff, transient: true, tone: 'error' },
  timeout: { icon: Timer, transient: true, tone: 'error' },
  rate_limit: { icon: Hourglass, transient: true, tone: 'error' },
  server: { icon: ServerCrash, transient: true, tone: 'error' },
  not_found: { icon: SearchX, transient: false, tone: 'neutral' },
  bad_request: { icon: TriangleAlert, transient: false, tone: 'error' },
  generic: { icon: TriangleAlert, transient: false, tone: 'error' },
};

/**
 * Marketplace failures: classifies whatever the API or axios handed back, picks
 * the copy for it, and hands the rest — layout, automatic recovery, waiting
 * affordances — to the shared `RetryableError`.
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry,
  isRetrying = false,
  context,
}) => {
  const { data: startupConfig } = useGetStartupConfig();
  /* Operators own the recovery cadence (`interface.marketplace.retryDelaysMs`); anything
     that is not an array leaves the shipped sequence in place, and an empty one is a
     deliberate "ask only when I click". */
  const configured = startupConfig?.interface?.marketplace?.retryDelaysMs;
  const retryDelaysMs = Array.isArray(configured) ? configured : undefined;
  const localize = useLocalize();
>>>>>>> upstream/main
  /**
   * Get contextual title based on current operation
   */
  const getContextualTitle = (): string => {
    if (context?.searchQuery) {
      return localize('com_agents_error_search_title');
    }

    if (context?.category) {
      return localize('com_agents_error_category_title');
    }

    return localize('com_agents_error_title');
  };

  /**
   * Get context-specific not found message
   */
  const getNotFoundMessage = (): string => {
    if (context?.searchQuery) {
      return localize('com_agents_search_no_results', { query: context.searchQuery });
    }

    if (context?.category && context.category !== 'all') {
      return localize('com_agents_category_empty', { category: context.category });
    }

    return localize('com_agents_error_not_found_message');
  };

<<<<<<< HEAD
  const { title, message, suggestion } = getErrorInfo();

  return (
    <div className="py-12 text-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="mx-auto max-w-md space-y-4">
        {/* Error icon with proper accessibility */}
        <div className="flex justify-center">
          <div
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-full',
              'bg-status-error-subtle',
            )}
          >
            <svg
              className="h-6 w-6 text-status-error"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
              role="img"
              aria-label="Error icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
        </div>

        {/* Error content with proper headings and structure */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-text-primary" id="error-title">
            {title}
          </h3>
          <p className="text-text-secondary" id="error-message" aria-describedby="error-title">
            {message}
          </p>
          <p
            className="text-sm text-text-tertiary"
            id="error-suggestion"
            role="note"
            aria-label={`Suggestion: ${suggestion}`}
          >
            💡 {suggestion}
          </p>
        </div>

        {/* Retry button with enhanced accessibility */}
        {onRetry && (
          <div className="pt-2">
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className={cn('border-status-error text-status-error hover:bg-status-error-subtle')}
              aria-describedby="error-message error-suggestion"
              aria-label={`Retry action. ${message}`}
            >
              {localize('com_agents_error_retry')}
            </Button>
          </div>
        )}
      </div>
    </div>
=======
  /** Classify the failure and pick the copy that goes with it. */
  const getErrorInfo = (): ErrorInfo => {
    /* An `AxiosError` is an `Error`, so narrowing on `Error` and keeping only
       its message would throw away `response.status`, `response.data` and
       `code` — the fields this classification runs on. Only a bare string has
       to be wrapped. */
    const shape: ErrorShape = typeof error === 'string' ? { message: error } : error;

    const payload: ErrorPayload = shape.response?.data ?? shape.data ?? shape;
    const errorMessage = shape.message ?? '';
    const errorCode = shape.code;

    // Handle timeout errors specifically
    if (errorCode === 'ECONNABORTED' || errorMessage.includes('timeout')) {
      return {
        kind: 'timeout',
        title: localize('com_agents_error_timeout_title'),
        detail: localize('com_agents_error_timeout_suggestion'),
      };
    }

    // `ERR_NETWORK` is what axios reports for a dropped connection; the legacy
    // `NETWORK_ERROR` code and the message check keep hand-built errors working.
    if (
      errorCode === 'ERR_NETWORK' ||
      errorCode === 'NETWORK_ERROR' ||
      errorMessage.includes('Network Error')
    ) {
      return {
        kind: 'network',
        title: localize('com_agents_error_network_title'),
        detail: localize('com_agents_error_network_suggestion'),
      };
    }

    // Handle specific HTTP status codes before generic userMessage
    const status = shape.response?.status ?? shape.status;
    if (status != null) {
      if (status === 404) {
        return {
          kind: 'not_found',
          title: localize('com_agents_error_not_found_title'),
          detail: getNotFoundMessage(),
        };
      }

      if (status === 400) {
        return {
          kind: 'bad_request',
          title: localize('com_agents_error_invalid_request'),
          detail: payload.userMessage || localize('com_agents_error_bad_request_suggestion'),
        };
      }

      // A server-side request timeout, which the `timeout` copy already describes.
      if (status === 408) {
        return {
          kind: 'timeout',
          title: localize('com_agents_error_timeout_title'),
          detail: localize('com_agents_error_timeout_suggestion'),
        };
      }

      if (status === 429) {
        return {
          kind: 'rate_limit',
          title: localize('com_agents_error_rate_limit_title'),
          detail: localize('com_agents_error_rate_limit_suggestion'),
        };
      }

      if (status >= 500) {
        return {
          kind: 'server',
          title: localize('com_agents_error_server_title'),
          detail: localize('com_agents_error_server_suggestion'),
        };
      }
    }

    // Use user-friendly message from backend if available (after specific status code handling)
    if (payload.userMessage) {
      return {
        kind: 'generic',
        title: getContextualTitle(),
        detail: payload.userMessage,
      };
    }

    // Fallback to generic error with contextual title
    return {
      kind: 'generic',
      title: getContextualTitle(),
      detail: localize('com_agents_error_suggestion_generic'),
    };
  };

  const { kind, title, detail } = getErrorInfo();
  const { icon, transient, tone } = ERROR_KINDS[kind];

  return (
    <RetryableError
      title={title}
      detail={detail}
      icon={icon}
      tone={tone}
      onRetry={onRetry}
      isRetrying={isRetrying}
      autoRetry={transient}
      retryDelaysMs={retryDelaysMs}
      labels={{
        retry: localize('com_agents_error_retry'),
        retrying: localize('com_agents_error_retrying'),
        countdown: (seconds) => localize('com_agents_error_retry_countdown', { seconds }),
        // An empty sequence means manual-only recovery, not a stale page that needs reloading.
        reload: retryDelaysMs?.length === 0 ? undefined : localize('com_ui_refresh_page'),
      }}
    />
>>>>>>> upstream/main
  );
};

export default ErrorDisplay;
