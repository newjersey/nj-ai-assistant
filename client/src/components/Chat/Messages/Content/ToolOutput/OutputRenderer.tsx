<<<<<<< HEAD
import { useState, useMemo, useCallback } from 'react';
import copy from 'copy-to-clipboard';
import { Button } from '@librechat/client';
import { hasToolCallErrorPrefix, stripToolCallErrorPrefix } from 'librechat-data-provider';
import CopyButton from '~/components/Messages/Content/CopyButton';
=======
import { useRef, useState, useMemo, useCallback, useLayoutEffect } from 'react';
import copy from 'copy-to-clipboard';
import { Button } from '@librechat/client';
import { hasToolCallErrorPrefix, stripToolCallErrorPrefix } from 'librechat-data-provider';
import type { UIEvent } from 'react';
import CopyButton from '~/components/Messages/Content/CopyButton';
import { useToolContentPending } from '../disclosure';
import { PANE_COPY_REVEAL } from '../rows';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

interface ContentBlock {
  type?: string;
  text?: string;
}

const ERROR_INNER = /^Error\s+\w+ing to endpoint\s*\(HTTP \d+\):\s*/i;

function cleanError(text: string): string {
  let cleaned = stripToolCallErrorPrefix(text).trim();
  cleaned = cleaned.replace(ERROR_INNER, '').trim();
  if (cleaned.endsWith('Please fix your mistakes.')) {
    cleaned = cleaned.slice(0, -'Please fix your mistakes.'.length).trim();
  }
  return cleaned;
}

<<<<<<< HEAD
export function isError(text: string): boolean {
  return hasToolCallErrorPrefix(text) || text.startsWith('Error processing tool');
=======
/** The feedback a call gets when its input fails schema validation: the SDK
 *  returns it to the model as a plain `Error:` block closed by this sentence,
 *  with the run step still `completed`. Mirrors the server's own verdict in
 *  `completedToolExecutionStatus`, so a card, a group header and a phase
 *  agree with the label the server wrote for the same call. */
const VALIDATION_FEEDBACK = /^Error:[\s\S]*\n Please fix your mistakes\.$/i;

export function isError(text: string): boolean {
  return (
    hasToolCallErrorPrefix(text) ||
    text.startsWith('Error processing tool') ||
    VALIDATION_FEEDBACK.test(text)
  );
>>>>>>> upstream/main
}

function isStructuredText(text: string): boolean {
  return text.includes('\n') || text.includes('{') || text.includes(':');
}

interface ExtractedText {
  text: string;
  rawError: string;
  error: boolean;
  /** When true, `text` contains raw JSON that should be rendered as a highlighted code block. */
  isJson: boolean;
}

<<<<<<< HEAD
function extractText(raw: string): ExtractedText {
=======
function extractText(raw: string, verbatim = false): ExtractedText {
  /** Command output keeps its exact bytes, whitespace-only output included:
   *  indentation and blank lines are part of it. */
  if (verbatim) {
    return { text: raw, rawError: '', error: isError(raw.trim()), isJson: false };
  }

>>>>>>> upstream/main
  const trimmed = raw.trim();
  if (!trimmed) {
    return { text: '', rawError: '', error: false, isJson: false };
  }

  if (isError(trimmed)) {
    return { text: cleanError(trimmed), rawError: trimmed, error: true, isJson: false };
  }

  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed: unknown = JSON.parse(trimmed);

      if (Array.isArray(parsed)) {
        const textBlocks = parsed.filter(
          (b: ContentBlock) => typeof b === 'object' && b !== null && typeof b.text === 'string',
        );
        if (textBlocks.length > 0) {
          const joined = (textBlocks as ContentBlock[])
            .map((b) => b.text)
            .join('\n')
            .trim();
          if (isError(joined)) {
            return { text: cleanError(joined), rawError: joined, error: true, isJson: false };
          }
          return { text: joined, rawError: '', error: false, isJson: false };
        }
      }

      // Render structured JSON as a highlighted code block
      return {
        text: JSON.stringify(parsed, null, 2),
        rawError: '',
        error: false,
        isJson: true,
      };
    } catch {
      // Not JSON
    }
  }

  return { text: trimmed, rawError: '', error: false, isJson: false };
}

<<<<<<< HEAD
const TRUNCATE_LINES = 20;
const VISIBLE_LINES = 15;

interface OutputRendererProps {
  text: string;
}

export default function OutputRenderer({ text }: OutputRendererProps) {
  const localize = useLocalize();
  const { text: displayText, rawError, error, isJson } = useMemo(() => extractText(text), [text]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(() => {
    setIsCopied(true);
    copy(displayText, { format: 'text/plain' });
    setTimeout(() => setIsCopied(false), 3000);
  }, [displayText]);
=======
/** Whether the default renderer would draw anything for this output. Callers
 *  that decide a panel is worth showing use it, so the two cannot disagree. */
export function hasRenderableOutput(raw?: string | null): boolean {
  return extractText(raw ?? '').text.length > 0;
}

export interface OutputSegment {
  text: string;
  className?: string;
}

interface OutputRendererProps {
  text: string;
  copyText?: string;
  /** Forces error styling when the caller detected a failure the text itself does not mark. */
  error?: boolean;
  /** `terminal` renders command output: monospace and verbatim (no JSON reformatting). */
  variant?: 'default' | 'terminal';
  /** Terminal output split into styled runs whose texts join to `text` (for example stdout,
   *  stderr and an exit trailer). Rendered in place of the plain text. */
  segments?: OutputSegment[];
}

export default function OutputRenderer({
  text,
  copyText,
  error: forceError = false,
  variant = 'default',
  segments,
}: OutputRendererProps) {
  const localize = useLocalize();
  const terminal = variant === 'terminal';
  const extracted = useMemo(() => extractText(text, terminal), [text, terminal]);
  const { text: displayText, rawError, isJson } = extracted;
  const error = extracted.error || forceError;
  const [showErrorDetails, setShowErrorDetails] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const outputRef = useRef<HTMLPreElement>(null);
  /** Whether the reader is at the bottom of the box; scrolling up stops the follow. */
  const followRef = useRef(true);

  /* Terminal output opens on its last lines, where failures, stack traces and the
     exit trailer land, and keeps following new output until the reader scrolls up. */
  useLayoutEffect(() => {
    const node = outputRef.current;
    if (terminal && node != null && followRef.current) {
      node.scrollTop = node.scrollHeight;
    }
  }, [terminal, displayText, segments]);

  const handleOutputScroll = useCallback((event: UIEvent<HTMLPreElement>) => {
    const node = event.currentTarget;
    followRef.current = node.scrollHeight - node.scrollTop - node.clientHeight <= 8;
  }, []);

  const contentPending = useToolContentPending();
  const handleCopy = useCallback(() => {
    if (contentPending) {
      return;
    }
    setIsCopied(true);
    copy(copyText ?? displayText, { format: 'text/plain' });
    setTimeout(() => setIsCopied(false), 3000);
  }, [contentPending, copyText, displayText]);
>>>>>>> upstream/main

  if (!displayText) {
    return null;
  }

<<<<<<< HEAD
  const lines = displayText.split('\n');
  const needsTruncation = lines.length > TRUNCATE_LINES;
  const visibleText =
    needsTruncation && !isExpanded ? lines.slice(0, VISIBLE_LINES).join('\n') : displayText;
  const structured = !isJson && isStructuredText(displayText);

  return (
    <div>
      <div className="relative pr-10">
        {isJson ? (
          <pre className="max-h-[300px] overflow-auto rounded text-xs">
            <code className="hljs language-json !whitespace-pre-wrap !break-words">
              {visibleText}
=======
  const structured = !isJson && (terminal || isStructuredText(displayText));
  const styled = terminal && segments != null && !error;

  return (
    <div>
      <div className="group/copy relative">
        {isJson ? (
          <pre className="max-h-[18.75rem] overflow-auto rounded text-xs">
            <code className="hljs language-json !break-words !whitespace-pre-wrap">
              {displayText}
>>>>>>> upstream/main
            </code>
          </pre>
        ) : (
          <pre
<<<<<<< HEAD
            className={cn(
              'max-h-[300px] overflow-auto whitespace-pre-wrap break-words text-xs',
              error && 'font-mono text-status-error',
              !error && structured && 'font-mono text-text-secondary',
              !error && !structured && 'font-sans text-sm text-text-primary',
            )}
          >
            {visibleText}
          </pre>
        )}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <CopyButton
            isCopied={isCopied}
            onClick={handleCopy}
            iconOnly
            label={localize('com_ui_copy')}
          />
        </div>
      </div>
      {needsTruncation && (
        <Button
          variant="link"
          size="sm"
          className="mt-1 h-auto p-0 text-xs text-text-secondary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-heavy"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? localize('com_ui_show_less') : localize('com_ui_show_more')}
        </Button>
      )}
=======
            ref={outputRef}
            onScroll={terminal ? handleOutputScroll : undefined}
            className={cn(
              'max-h-[18.75rem] overflow-auto text-xs break-words whitespace-pre-wrap',
              error && 'text-status-error font-mono',
              !error && structured && 'font-mono',
              !error && structured && (terminal ? 'text-text-primary' : 'text-text-secondary'),
              !error && !structured && 'text-text-primary font-sans text-sm',
            )}
          >
            {styled
              ? segments?.map((segment, i) =>
                  segment.text === '' ? null : (
                    <span key={i} className={segment.className}>
                      {segment.text}
                    </span>
                  ),
                )
              : displayText}
          </pre>
        )}
        <CopyButton
          isCopied={isCopied}
          onClick={handleCopy}
          disabled={contentPending}
          iconOnly
          label={localize('com_ui_copy')}
          className={cn('bg-presentation absolute right-0 bottom-0 z-[1]', PANE_COPY_REVEAL)}
        />
      </div>
>>>>>>> upstream/main
      {error && rawError && rawError !== displayText && (
        <Button
          variant="link"
          size="sm"
<<<<<<< HEAD
          className="mt-1 block h-auto p-0 text-xs text-text-secondary underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-heavy"
=======
          className="text-text-secondary focus-visible:ring-border-heavy mt-1 block h-auto p-0 text-xs underline focus-visible:ring-2"
>>>>>>> upstream/main
          onClick={() => setShowErrorDetails((prev) => !prev)}
        >
          {localize('com_ui_details')}
        </Button>
      )}
      {showErrorDetails && rawError && (
<<<<<<< HEAD
        <pre className="mt-2 max-h-[200px] overflow-auto whitespace-pre-wrap break-words font-mono text-xs text-status-error">
=======
        <pre className="text-status-error mt-2 max-h-[12.5rem] overflow-auto font-mono text-xs break-words whitespace-pre-wrap">
>>>>>>> upstream/main
          {rawError}
        </pre>
      )}
    </div>
  );
}
