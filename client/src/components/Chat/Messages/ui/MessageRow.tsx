<<<<<<< HEAD
=======
import { Zap } from 'lucide-react';
>>>>>>> upstream/main
import type { ReactNode } from 'react';
import MessageTimestamp from './MessageTimestamp';
import HeaderLabel from './HeaderLabel';
import { cn } from '~/utils';

type MessageRowProps = {
  id?: string;
  label: string;
  hoverLabel?: string | null;
  icon: ReactNode;
  children: ReactNode;
  footer: ReactNode;
  timestamp?: string | null;
  ariaLabel?: string;
  headerPrefix?: string;
  isCreatedByUser: boolean;
  hasParallelContent?: boolean;
  fullWidth?: boolean;
  isEditing?: boolean;
<<<<<<< HEAD
  /** Full-width block without the author header or user bubble — for rows
   *  whose body carries its own header (e.g. wake-up task cards). */
  plain?: boolean;
  className?: string;
};

=======
  /** Marks a host-authored turn with no author to name (background-tool
   *  wake-ups, external events): it keeps the user's position and bubble shape,
   *  outlined instead of filled, under this visible heading. */
  systemLabel?: string;
  /** A user-side turn written by someone other than the reader — a parent agent
   *  briefing its subagent, a subagent reporting back. It keeps the user's
   *  position and bubble, under the same avatar-and-name header an agent turn
   *  carries. */
  showAuthor?: boolean;
  /** Outline the user-side bubble instead of filling it: content the host
   *  delivered rather than words someone typed. Implied by `systemLabel`. */
  outlined?: boolean;
  className?: string;
};

/** `mb-1` keeps the name off its own first line of body text. Static per side:
 *  every agent row in a thread renders one, so it is never merged at runtime. */
const authorHeaderClasses = {
  start:
    'text-text-primary mb-1 flex min-h-7 w-full items-center gap-2 text-sm font-semibold select-none',
  end: 'text-text-primary mb-1 flex min-h-7 items-center justify-end gap-2 text-sm font-semibold select-none',
} as const;

/** The author line every visible-author turn shares, so an agent's turn and an
 *  agent-written user-side turn cannot drift apart. A render helper rather than
 *  a component, so a main chat row's tree stays exactly as deep as before. */
function renderAuthorHeader({
  icon,
  label,
  hoverLabel,
  headerPrefix,
  timestamp,
  align,
}: Pick<MessageRowProps, 'icon' | 'label' | 'hoverLabel' | 'headerPrefix' | 'timestamp'> & {
  align: 'start' | 'end';
}) {
  return (
    <h2 className={authorHeaderClasses[align]}>
      {align === 'end' && (
        <MessageTimestamp value={timestamp} className="mr-auto shrink-0 font-normal" />
      )}
      <span
        aria-hidden="true"
        className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full"
      >
        {icon}
      </span>
      <span className="sr-only">{headerPrefix}</span>
      <HeaderLabel label={label} hoverLabel={hoverLabel} />
      {align === 'start' && (
        <MessageTimestamp value={timestamp} className="ml-auto shrink-0 font-normal" />
      )}
    </h2>
  );
}

>>>>>>> upstream/main
export function getMessageRowWidthClass({
  fullWidth = false,
  hasParallelContent = false,
}: {
  fullWidth?: boolean;
  hasParallelContent?: boolean;
} = {}) {
  if (fullWidth) return 'w-full max-w-full sm:px-2';
  if (hasParallelContent) return 'w-full sm:px-2 md:max-w-[58rem] xl:max-w-[70rem]';
  return 'w-full sm:px-2 md:max-w-3xl xl:max-w-4xl';
}

export default function MessageRow({
  id,
  icon,
  label,
  hoverLabel,
  footer,
  children,
  timestamp,
  ariaLabel,
  className,
  headerPrefix,
  isCreatedByUser,
  hasParallelContent = false,
  fullWidth = false,
  isEditing = false,
<<<<<<< HEAD
  plain = false,
=======
  systemLabel,
  showAuthor = false,
  outlined = false,
>>>>>>> upstream/main
}: MessageRowProps) {
  // Same column as ChatForm: max-width plus `sm:px-2`, so the body lines
  // up with the composer surface rather than the form's outer box.
  const widthClass = getMessageRowWidthClass({ fullWidth, hasParallelContent });
<<<<<<< HEAD
=======
  const isSystem = systemLabel != null && systemLabel !== '';
  const isUserSide = isCreatedByUser || isSystem;
>>>>>>> upstream/main

  return (
    <div
      id={id}
      role="group"
      aria-label={ariaLabel}
      className={cn(
<<<<<<< HEAD
        'message-render group mx-auto flex min-w-0 flex-1 font-theme-ui transition-[max-width] duration-theme-normal motion-reduce:transition-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
        isCreatedByUser && !plain ? 'justify-end' : 'items-start',
=======
        'message-render group font-theme-ui duration-theme-normal mx-auto flex min-w-0 flex-1 transition-[max-width] motion-reduce:transition-none',
        'focus-visible:ring-text-primary focus-visible:ring-2 focus-visible:outline-hidden',
        isUserSide ? 'justify-end' : 'items-start',
>>>>>>> upstream/main
        widthClass,
        className,
      )}
    >
      <div
        className={cn(
          'relative flex min-w-0 flex-col',
<<<<<<< HEAD
          isCreatedByUser ? 'user-turn' : 'agent-turn',
          (hasParallelContent || isEditing || plain) && 'w-full',
          !hasParallelContent &&
            !plain &&
            isCreatedByUser &&
            cn('ml-auto items-end', !isEditing && 'w-fit max-w-[90%] sm:max-w-[85%]'),
          !hasParallelContent && !isCreatedByUser && !isEditing && 'flex-1',
        )}
      >
        {!hasParallelContent &&
          !plain &&
          (isCreatedByUser ? (
            <h2 className="sr-only">
              {headerPrefix}
              {label}
              <MessageTimestamp value={timestamp} />
            </h2>
          ) : (
            /** `mb-1` keeps the name off its own first line of body text. */
            <h2 className="mb-1 flex min-h-7 w-full select-none items-center gap-2 text-sm font-semibold text-text-primary">
              <span
                aria-hidden="true"
                className="flex size-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
              >
                {icon}
              </span>
              <span className="sr-only">{headerPrefix}</span>
              <HeaderLabel label={label} hoverLabel={hoverLabel} />
              <MessageTimestamp value={timestamp} className="ml-auto shrink-0 font-normal" />
            </h2>
          ))}

        <div className={cn('flex w-full flex-col gap-1', isCreatedByUser && !plain && 'items-end')}>
          <div
            className={cn(
              'flex min-h-[20px] max-w-full flex-grow flex-col gap-0',
              isCreatedByUser && !isEditing && !plain
                ? 'w-fit rounded-theme-surface rounded-br-theme-control bg-surface-tertiary px-theme-normal py-2.5'
=======
          isUserSide ? 'user-turn' : 'agent-turn',
          (hasParallelContent || isEditing) && 'w-full',
          !hasParallelContent &&
            isUserSide &&
            cn('ml-auto items-end', !isEditing && 'w-fit max-w-[90%] sm:max-w-[85%]'),
          !hasParallelContent && !isUserSide && !isEditing && 'flex-1',
        )}
      >
        {isSystem && (
          <h2 className="text-text-secondary mb-1 flex items-center gap-1.5 pr-1.5 text-xs font-medium tracking-wide uppercase select-none">
            <Zap size={12} aria-hidden="true" />
            {systemLabel}
            <span className="sr-only">
              <MessageTimestamp value={timestamp} />
            </span>
          </h2>
        )}
        {!hasParallelContent && !isSystem && isCreatedByUser && !showAuthor && (
          <h2 className="sr-only">
            {headerPrefix}
            {label}
            <MessageTimestamp value={timestamp} />
          </h2>
        )}
        {!hasParallelContent &&
          !isSystem &&
          (!isCreatedByUser || showAuthor) &&
          renderAuthorHeader({
            icon,
            label,
            hoverLabel,
            headerPrefix,
            timestamp,
            align: isCreatedByUser ? 'end' : 'start',
          })}

        <div className={cn('flex w-full flex-col gap-1', isUserSide && 'items-end')}>
          <div
            className={cn(
              'flex min-h-[1.25rem] max-w-full grow flex-col gap-0',
              isUserSide && !isEditing
                ? cn(
                    'rounded-theme-surface rounded-br-theme-control px-theme-normal w-fit',
                    isSystem || outlined
                      ? 'border-border-medium border py-1.5'
                      : 'bg-surface-user-message py-2.5',
                  )
>>>>>>> upstream/main
                : 'w-full',
            )}
            data-testid="message-body"
          >
            {children}
          </div>
<<<<<<< HEAD
          <div className={cn('w-full', isCreatedByUser && !plain && 'flex justify-end')}>
            {footer}
          </div>
=======
          <div className={cn('w-full', isUserSide && 'flex justify-end')}>{footer}</div>
>>>>>>> upstream/main
        </div>
      </div>
    </div>
  );
}
