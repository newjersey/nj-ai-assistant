import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
<<<<<<< HEAD
import { ChevronDown, CornerDownRight, Radio } from 'lucide-react';
import { ContentTypes, EModelEndpoint } from 'librechat-data-provider';
=======
import { Radio } from 'lucide-react';
import { ContentTypes } from 'librechat-data-provider';
>>>>>>> upstream/main
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@librechat/client';
import type { TMessageContentParts } from 'librechat-data-provider';
import type { ReactNode } from 'react';
import type { ChildConversationTurn } from './adapters';
import type { TranslationKeys } from '~/hooks';
<<<<<<< HEAD
=======
import type { TurnAuthor } from './author';
import SystemEventHeader, {
  SystemEventIcon,
  systemEventHeaderClasses,
} from '~/components/Chat/Messages/ui/SystemEvent';
>>>>>>> upstream/main
import { SubagentActivityContent, SubagentStatus } from './SubagentActivity';
import ContentParts from '~/components/Chat/Messages/Content/ContentParts';
import { isAbnormalTerminalStatus, isLiveSubagentStatus } from './status';
import { messageFooterClasses } from '~/components/Chat/Messages/styles';
import MessageRow from '~/components/Chat/Messages/ui/MessageRow';
import { ElapsedTimer } from '~/components/Chat/Messages/Elapsed';
<<<<<<< HEAD
import MessageIcon from '~/components/Chat/Messages/MessageIcon';
import { showThinkingAtom } from '~/store/showThinking';
import { useAgentsMapContext } from '~/Providers';
=======
import { showThinkingAtom } from '~/store/showThinking';
>>>>>>> upstream/main
import { useChatSurface } from './surface';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

const TRIGGER_LABELS = {
  parent_dispatch: 'com_ui_subagent_trigger_parent_dispatch',
  parent_continuation: 'com_ui_subagent_trigger_parent_continuation',
  external_event: 'com_ui_subagent_trigger_external_event',
} as const satisfies Record<ChildConversationTurn['trigger']['kind'], TranslationKeys>;

<<<<<<< HEAD
function TriggerIcon({ kind }: { kind: ChildConversationTurn['trigger']['kind'] }) {
  const Icon = kind === 'external_event' ? Radio : CornerDownRight;
  return (
    <span className="flex size-6 items-center justify-center rounded-full bg-surface-tertiary text-text-secondary">
      <Icon size={14} aria-hidden />
    </span>
=======
function ExternalEventIcon() {
  return (
    <SystemEventIcon>
      <Radio size={14} />
    </SystemEventIcon>
>>>>>>> upstream/main
  );
}

function ExternalEventTrigger({
  turn,
  fullWidth,
}: {
  turn: ChildConversationTurn;
  fullWidth: boolean;
}) {
  const localize = useLocalize();
  const [expanded, setExpanded] = useState(false);
  const details = turn.trigger.externalEvent;
  const label = localize('com_ui_subagent_trigger_external_event');
  let body: ReactNode;
  if (details == null) {
    body = (
<<<<<<< HEAD
      <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
        <TriggerIcon kind="external_event" />
        <span>{label}</span>
=======
      <div className="text-text-secondary flex items-center gap-2 py-1 text-sm">
        <SystemEventHeader icon={<ExternalEventIcon />} label={label} />
>>>>>>> upstream/main
      </div>
    );
  } else {
    body = (
      <Collapsible open={expanded} onOpenChange={setExpanded}>
        <CollapsibleTrigger asChild>
<<<<<<< HEAD
          <Button
            type="button"
            variant="ghost"
            className="h-auto min-h-6 w-full justify-start gap-1.5 px-0 text-left text-xs font-medium text-text-secondary hover:bg-transparent hover:text-text-primary"
          >
            <TriggerIcon kind="external_event" />
            <span>{label}</span>
            <span className="min-w-0 truncate font-normal">
              {details.eventType} · {details.sourceType}
            </span>
            <span className="sr-only">{details.occurredAt}</span>
            <ChevronDown
              size={14}
              aria-hidden
              className={`ml-auto shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-8 border-l border-border-light py-1 pl-3 text-xs text-text-secondary">
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt>{localize('com_ui_subagent_event_type')}</dt>
            <dd className="break-words text-text-primary">{details.eventType}</dd>
            <dt>{localize('com_ui_subagent_event_source')}</dt>
            <dd className="break-words text-text-primary">{details.sourceType}</dd>
            <dt>{localize('com_ui_subagent_event_received')}</dt>
            <dd className="break-words text-text-primary">
=======
          <Button type="button" variant="ghost" className={systemEventHeaderClasses}>
            <SystemEventHeader
              icon={<ExternalEventIcon />}
              label={label}
              detail={`${details.eventType} · ${details.sourceType}`}
              expanded={expanded}
            />
            <span className="sr-only">{details.occurredAt}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="text-text-secondary pt-0.5 pb-1 text-xs">
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
            <dt>{localize('com_ui_subagent_event_type')}</dt>
            <dd className="text-text-primary break-words">{details.eventType}</dd>
            <dt>{localize('com_ui_subagent_event_source')}</dt>
            <dd className="text-text-primary break-words">{details.sourceType}</dd>
            <dt>{localize('com_ui_subagent_event_received')}</dt>
            <dd className="text-text-primary break-words">
>>>>>>> upstream/main
              {new Date(details.occurredAt).toLocaleString()}
            </dd>
            {details.expectedActionToolName != null && (
              <>
                <dt>{localize('com_ui_subagent_event_expected_action')}</dt>
<<<<<<< HEAD
                <dd className="break-words text-text-primary">{details.expectedActionToolName}</dd>
=======
                <dd className="text-text-primary break-words">{details.expectedActionToolName}</dd>
>>>>>>> upstream/main
              </>
            )}
          </dl>
        </CollapsibleContent>
      </Collapsible>
    );
  }
  return (
    <MessageRow
      id={`${turn.taskId}:trigger`}
<<<<<<< HEAD
      icon={<TriggerIcon kind="external_event" />}
=======
      icon={<ExternalEventIcon />}
>>>>>>> upstream/main
      label={label}
      footer={null}
      timestamp={turn.trigger.createdAt ?? details?.occurredAt}
      ariaLabel={label}
      headerPrefix=""
      isCreatedByUser={true}
<<<<<<< HEAD
=======
      systemLabel={localize('com_ui_system_event')}
>>>>>>> upstream/main
      fullWidth={fullWidth}
    >
      {body}
    </MessageRow>
  );
}

<<<<<<< HEAD
function TriggerMessage({ turn, fullWidth }: { turn: ChildConversationTurn; fullWidth: boolean }) {
=======
/** A parent agent's briefing or follow-up is the user side of this conversation
 *  with the parent as its author, so it is main chat's user turn under the
 *  parent's name and face. Only an external event, which no agent wrote, stays
 *  a system turn. */
function TriggerMessage({
  turn,
  fullWidth,
  parentAuthor,
}: {
  turn: ChildConversationTurn;
  fullWidth: boolean;
  parentAuthor: TurnAuthor;
}) {
>>>>>>> upstream/main
  const showThinking = useAtomValue(showThinkingAtom);
  const localize = useLocalize();
  const label = localize(TRIGGER_LABELS[turn.trigger.kind]);
  const content = useMemo<TMessageContentParts[]>(
    () =>
      turn.trigger.summary === ''
        ? []
        : [
            {
              type: ContentTypes.TEXT,
              text: turn.trigger.summary,
            } as TMessageContentParts,
          ],
    [turn.trigger.summary],
  );
  if (turn.trigger.kind === 'external_event') {
    return <ExternalEventTrigger turn={turn} fullWidth={fullWidth} />;
  }
  return (
    <MessageRow
      id={`${turn.taskId}:trigger`}
<<<<<<< HEAD
      icon={<TriggerIcon kind={turn.trigger.kind} />}
      label={label}
=======
      icon={parentAuthor.icon}
      label={parentAuthor.name}
>>>>>>> upstream/main
      footer={null}
      timestamp={turn.trigger.createdAt}
      ariaLabel={label}
      headerPrefix=""
      isCreatedByUser={true}
<<<<<<< HEAD
      fullWidth={fullWidth}
    >
      <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-text-secondary">
        <TriggerIcon kind={turn.trigger.kind} />
        <span>{label}</span>
      </div>
      {content.length > 0 && (
=======
      showAuthor
      fullWidth={fullWidth}
    >
      {content.length > 0 ? (
>>>>>>> upstream/main
        <ContentParts
          content={content}
          messageId={`${turn.taskId}:trigger`}
          conversationId={null}
          isCreatedByUser={true}
          showThinking={showThinking}
          isLast={false}
          isSubmitting={false}
          isLatestMessage={false}
        />
<<<<<<< HEAD
      )}
      {turn.trigger.summaryTruncated === true && (
        <div className="mt-1 text-xs italic text-text-secondary">
=======
      ) : (
        <div className="text-text-secondary text-sm italic">{label}</div>
      )}
      {turn.trigger.summaryTruncated === true && (
        <div className="text-text-secondary mt-1 text-xs italic">
>>>>>>> upstream/main
          {localize('com_ui_subagent_trigger_truncated')}
        </div>
      )}
    </MessageRow>
  );
}

function ChildMessage({
  turn,
  state,
<<<<<<< HEAD
  agentId,
=======
  author,
>>>>>>> upstream/main
  conversationId,
  fullWidth,
  onCancelControl,
  detailState,
  onLoadDetails,
}: {
  turn: ChildConversationTurn;
  state: 'ready' | 'loading' | 'error';
<<<<<<< HEAD
  agentId?: string;
=======
  author: TurnAuthor;
>>>>>>> upstream/main
  conversationId?: string | null;
  fullWidth: boolean;
  onCancelControl?: (controlId: string) => void;
  detailState?: 'idle' | 'loading' | 'unavailable' | 'error';
  onLoadDetails?: () => void;
}) {
  const localize = useLocalize();
<<<<<<< HEAD
  const agentsMap = useAgentsMapContext();
  const agent = agentId == null ? undefined : agentsMap?.[agentId];
  const label = agent?.name ?? turn.activity.title;
=======
>>>>>>> upstream/main
  const detailsLimited = turn.activity.activityTruncated === true;
  let limitedNotice: ReactNode;
  if (detailsLimited && onLoadDetails != null && detailState !== 'unavailable') {
    limitedNotice = (
      <Button type="button" variant="ghost" size="sm" onClick={onLoadDetails}>
        {detailState === 'error'
          ? localize('com_ui_retry')
          : localize('com_ui_subagent_show_full_activity')}
      </Button>
    );
  } else {
    limitedNotice = localize('com_ui_subagent_activity_details_unavailable');
  }
  let footerContent: ReactNode = null;
  if (isAbnormalTerminalStatus(turn.activity.status)) {
    footerContent = <SubagentStatus activity={turn.activity} />;
  } else if (isLiveSubagentStatus(turn.activity.status)) {
    const triggeredAt = turn.trigger.createdAt ?? turn.trigger.externalEvent?.occurredAt;
    const startedAt = triggeredAt == null ? NaN : Date.parse(triggeredAt);
    footerContent = <ElapsedTimer start={Number.isFinite(startedAt) ? startedAt : undefined} />;
  }
  /** The main chat footer's own metrics, held whether or not anything occupies
   *  the slot: the timer leaving at completion must not step the turns below it
   *  upward, and the reading has to be sized by the same `text-xs` its main
   *  chat counterpart inherits rather than by the panel's body size. */
  const footer = (
    <div className={cn('mt-1 flex justify-start gap-3', messageFooterClasses)}>{footerContent}</div>
  );
<<<<<<< HEAD
  const iconData = {
    endpoint: EModelEndpoint.agents,
    modelLabel: label,
    isCreatedByUser: false,
  };
  return (
    <MessageRow
      id={`${turn.taskId}:assistant`}
      /** The main chat author glyph, unconditionally: with no resolved agent it
       *  falls back to the endpoint icon there too, so an unresolved child does
       *  not get a differently-inset placeholder of its own. */
      icon={<MessageIcon iconData={iconData} agent={agent} />}
      label={label}
      footer={footer}
      ariaLabel={label}
=======
  return (
    <MessageRow
      id={`${turn.taskId}:assistant`}
      icon={author.icon}
      label={author.name}
      footer={footer}
      ariaLabel={author.name}
>>>>>>> upstream/main
      headerPrefix=""
      isCreatedByUser={false}
      fullWidth={fullWidth}
    >
      <SubagentActivityContent
        activity={turn.activity}
        activityId={`${turn.taskId}:assistant`}
        state={state}
        showPrompt={false}
        conversationId={conversationId}
        underHeaderIcon
        onCancelControl={onCancelControl}
      />
      {detailsLimited && detailState !== 'loading' && (
<<<<<<< HEAD
        <div className="mt-2 text-xs text-text-secondary">{limitedNotice}</div>
      )}
      {detailState === 'loading' && (
        <div className="mt-2 text-xs text-text-secondary" aria-live="polite">
=======
        <div className="text-text-secondary mt-2 text-xs">{limitedNotice}</div>
      )}
      {detailState === 'loading' && (
        <div className="text-text-secondary mt-2 text-xs" aria-live="polite">
>>>>>>> upstream/main
          {localize('com_ui_loading')}
        </div>
      )}
    </MessageRow>
  );
}

export default function SubagentConversation({
  turns,
<<<<<<< HEAD
  agentId,
=======
  author,
  parentAuthor,
>>>>>>> upstream/main
  conversationId,
  stateByTask,
  controllableTaskId,
  onCancelControl,
  detailStateByTask,
  onLoadTurnDetails,
}: {
  turns: ChildConversationTurn[];
<<<<<<< HEAD
  agentId?: string;
=======
  /** The child agent: every assistant turn's header. */
  author: TurnAuthor;
  /** The agent that briefs the child: every parent-written turn's header. */
  parentAuthor: TurnAuthor;
>>>>>>> upstream/main
  conversationId?: string | null;
  stateByTask?: ReadonlyMap<string, 'ready' | 'loading' | 'error'>;
  controllableTaskId?: string;
  onCancelControl?: (taskId: string, controlId: string) => void;
  detailStateByTask?: ReadonlyMap<string, 'idle' | 'loading' | 'unavailable' | 'error'>;
  onLoadTurnDetails?: (taskId: string) => void;
}) {
  const { maximizeChatSpace: fullWidth } = useChatSurface();
  return (
    <div className="flex flex-col gap-6 py-4" data-subagent-conversation>
      {turns.map((turn) => (
        <section
          key={turn.taskId}
          className="flex flex-col gap-4"
          data-subagent-thread-turn={turn.taskId}
        >
          <div className="px-4">
<<<<<<< HEAD
            <TriggerMessage turn={turn} fullWidth={fullWidth} />
=======
            <TriggerMessage turn={turn} fullWidth={fullWidth} parentAuthor={parentAuthor} />
>>>>>>> upstream/main
          </div>
          <div className="px-4">
            <ChildMessage
              turn={turn}
<<<<<<< HEAD
              agentId={agentId}
=======
              author={author}
>>>>>>> upstream/main
              conversationId={conversationId}
              fullWidth={fullWidth}
              state={stateByTask?.get(turn.taskId) ?? 'ready'}
              onCancelControl={
                onCancelControl == null || turn.taskId !== controllableTaskId
                  ? undefined
                  : (controlId) => onCancelControl(turn.taskId, controlId)
              }
              detailState={detailStateByTask?.get(turn.taskId)}
              onLoadDetails={
                turn.activity.activityTruncated !== true || onLoadTurnDetails == null
                  ? undefined
                  : () => onLoadTurnDetails(turn.taskId)
              }
            />
          </div>
        </section>
      ))}
    </div>
  );
}
