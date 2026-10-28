<<<<<<< HEAD
import { useMemo, useState } from 'react';
import { useAtomValue } from 'jotai';
import { ChevronDown, CornerDownRight, Radio } from 'lucide-react';
import { ContentTypes, EModelEndpoint } from 'librechat-data-provider';
import { Button, Collapsible, CollapsibleContent, CollapsibleTrigger } from '@librechat/client';
import type { TMessageContentParts } from 'librechat-data-provider';
import type { ReactNode } from 'react';
import type { ChildConversationTurn } from './adapters';
import type { TranslationKeys } from '~/hooks';
import { SubagentActivityContent, SubagentStatus } from './SubagentActivity';
=======
import { useContext, useMemo, useState } from 'react';
import { Radio } from 'lucide-react';
import { ContentTypes } from 'librechat-data-provider';
import {
  Alert,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@librechat/client';
import type { TMessage, TMessageContentParts } from 'librechat-data-provider';
import type { ReactNode } from 'react';
import type { ToolContentQuery } from '~/components/Chat/Messages/Content/disclosure';
import type { TaskContentScope } from '~/data-provider/Subagents/content';
import type { MessagePartsHost } from '~/hooks/Chat/contract';
import type { ChildConversationTurn } from './adapters';
import type { TranslationKeys } from '~/hooks';
import type { TurnAuthor } from './author';
import {
  TaskContentScopeContext,
  useSubagentTaskContentQuery,
  useSubagentToolContentQuery,
} from '~/data-provider/Subagents/content';
import SystemEventHeader, {
  SystemEventIcon,
  systemEventHeaderClasses,
} from '~/components/Chat/Messages/ui/SystemEvent';
import { MessagePartsHostProvider, useMessagePartsHost } from '~/Providers/MessagePartsHostContext';
import { SubagentActivityContent, SubagentStatus, getActivityContent } from './SubagentActivity';
import ResumeAuthorHeader from '~/components/Chat/Messages/Content/Parts/ResumeAuthorHeader';
import { useSearchResultsByTurn } from '~/hooks/Messages/useSearchResultsByTurn';
import { ErrorSourceProvider } from '~/components/Messages/Content/Error/source';
import MinimalHoverButtons from '~/components/Chat/Messages/MinimalHoverButtons';
>>>>>>> upstream/main
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
import { AuthorContext } from '~/Providers/AuthorContext';
import { ChatContext } from '~/Providers/ChatContext';
import { isEmptyContentPart } from '~/utils/messages';
import { hasTerminalOutcome } from './outcome';
import { standardContent } from './adapters';
>>>>>>> upstream/main
import { useChatSurface } from './surface';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

<<<<<<< HEAD
=======
type ConversationRecovery = Omit<TaskContentScope, 'taskId'> & {
  selectedTaskId: string;
  ready: boolean;
};

const RESUME_AUTHOR_HEADER = <ResumeAuthorHeader />;
const ignoreMessage: ReturnType<MessagePartsHost['useMessagesAsk']> = () => undefined;
const useNoMessagesAsk: MessagePartsHost['useMessagesAsk'] = () => ignoreMessage;

>>>>>>> upstream/main
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
          <Button type="button" variant="disclosure" className={systemEventHeaderClasses}>
            <SystemEventHeader
              icon={<ExternalEventIcon />}
              label={label}
              detail={`${details.eventType} · ${details.sourceType}`}
              expanded={expanded}
            />
            <span className="sr-only">{details.occurredAt}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
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
  const showThinking = useAtomValue(showThinkingAtom);
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
  const showThinking = useMessagePartsHost().useShowThinking();
>>>>>>> upstream/main
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
<<<<<<< HEAD
=======
  const message = useMemo<TMessage>(
    () => ({
      messageId: `${turn.taskId}:trigger`,
      parentMessageId: null,
      conversationId: null,
      isCreatedByUser: true,
      text: '',
      content,
    }),
    [content, turn.taskId],
  );
>>>>>>> upstream/main
  if (turn.trigger.kind === 'external_event') {
    return <ExternalEventTrigger turn={turn} fullWidth={fullWidth} />;
  }
  return (
    <MessageRow
      id={`${turn.taskId}:trigger`}
<<<<<<< HEAD
      icon={<TriggerIcon kind={turn.trigger.kind} />}
      label={label}
      footer={null}
=======
      icon={parentAuthor.icon}
      label={parentAuthor.name}
      footer={<MinimalHoverButtons message={message} />}
>>>>>>> upstream/main
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
<<<<<<< HEAD
}: {
  turn: ChildConversationTurn;
  state: 'ready' | 'loading' | 'error';
  agentId?: string;
=======
  toolContentQuery,
  notice,
}: {
  notice?: ReactNode;
  toolContentQuery?: ToolContentQuery;
  turn: ChildConversationTurn;
  state: 'ready' | 'loading' | 'error';
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
  const detailsLimited = turn.activity.activityTruncated === true;
=======
  const activity = turn.activity;
  const content = useMemo(() => getActivityContent(activity), [activity]);
  const outcomeContent = useMemo<TMessageContentParts[] | undefined>(() => {
    const outcome = turn.outcome;
    if (
      isLiveSubagentStatus(activity.status) ||
      !outcome?.text ||
      hasTerminalOutcome(content, outcome, activity.status)
    )
      return undefined;
    return [{ type: ContentTypes.TEXT, text: outcome.text, phase: 'final_answer' }];
  }, [content, turn.outcome, activity.status]);
  const message = useMemo<TMessage>(
    () => ({
      messageId: activity.messageId ?? `${turn.taskId}:assistant`,
      parentMessageId: `${turn.taskId}:trigger`,
      conversationId: conversationId ?? null,
      isCreatedByUser: false,
      text: '',
      content: outcomeContent == null ? content : [...content, ...outcomeContent],
    }),
    [content, outcomeContent, conversationId, activity.messageId, turn.taskId],
  );
  const searchResults = useSearchResultsByTurn(activity.attachments);
  const messageAuthor = useMemo(() => ({ icon: author.icon, label: author.name }), [author]);
  const detailsLimited = activity.activityTruncated === true;
>>>>>>> upstream/main
  let limitedNotice: ReactNode;
  if (detailsLimited && onLoadDetails != null && detailState !== 'unavailable') {
    limitedNotice = (
      <Button type="button" variant="ghost" size="sm" onClick={onLoadDetails}>
<<<<<<< HEAD
        {detailState === 'error'
          ? localize('com_ui_retry')
          : localize('com_ui_subagent_show_full_activity')}
=======
        {detailState === 'error' ? localize('com_ui_retry') : localize('com_ui_load_more')}
>>>>>>> upstream/main
      </Button>
    );
  } else {
    limitedNotice = localize('com_ui_subagent_activity_details_unavailable');
  }
  let footerContent: ReactNode = null;
<<<<<<< HEAD
  if (isAbnormalTerminalStatus(turn.activity.status)) {
    footerContent = <SubagentStatus activity={turn.activity} />;
  } else if (isLiveSubagentStatus(turn.activity.status)) {
=======
  if (isAbnormalTerminalStatus(activity.status)) {
    footerContent = <SubagentStatus activity={activity} />;
  } else if (isLiveSubagentStatus(activity.status)) {
>>>>>>> upstream/main
    const triggeredAt = turn.trigger.createdAt ?? turn.trigger.externalEvent?.occurredAt;
    const startedAt = triggeredAt == null ? NaN : Date.parse(triggeredAt);
    footerContent = <ElapsedTimer start={Number.isFinite(startedAt) ? startedAt : undefined} />;
  }
  /** The main chat footer's own metrics, held whether or not anything occupies
   *  the slot: the timer leaving at completion must not step the turns below it
   *  upward, and the reading has to be sized by the same `text-xs` its main
   *  chat counterpart inherits rather than by the panel's body size. */
  const footer = (
<<<<<<< HEAD
    <div className={cn('mt-1 flex justify-start gap-3', messageFooterClasses)}>{footerContent}</div>
  );
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
    <div className={cn('mt-1 flex justify-start gap-3', messageFooterClasses)}>
      {footerContent}
      {!isLiveSubagentStatus(activity.status) && (
        <MinimalHoverButtons message={message} searchResults={searchResults} />
      )}
    </div>
  );
  return (
    <MessageRow
      id={message.messageId}
      icon={author.icon}
      label={author.name}
      footer={footer}
      ariaLabel={author.name}
>>>>>>> upstream/main
      headerPrefix=""
      isCreatedByUser={false}
      fullWidth={fullWidth}
    >
<<<<<<< HEAD
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
        <div className="mt-2 text-xs text-text-secondary">{limitedNotice}</div>
      )}
      {detailState === 'loading' && (
        <div className="mt-2 text-xs text-text-secondary" aria-live="polite">
=======
      {notice}
      <AuthorContext.Provider value={messageAuthor}>
        <ErrorSourceProvider message={message}>
          <SubagentActivityContent
            activity={activity}
            activityId={message.messageId}
            content={content}
            authorHeader={RESUME_AUTHOR_HEADER}
            searchResults={searchResults}
            toolContentQuery={toolContentQuery}
            state={state}
            showPrompt={false}
            conversationId={conversationId}
            underHeaderIcon
            onCancelControl={onCancelControl}
          />
          {outcomeContent != null && (
            <ContentParts
              content={outcomeContent}
              messageId={message.messageId}
              conversationId={conversationId}
              isCreatedByUser={false}
              isSubmitting={false}
              isLast
              isLatestMessage={false}
              showThinking={false}
            />
          )}
        </ErrorSourceProvider>
      </AuthorContext.Provider>
      {detailsLimited && detailState !== 'loading' && (
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

<<<<<<< HEAD
export default function SubagentConversation({
  turns,
  agentId,
=======
function RecoveredChildMessage({
  recovery,
  ...props
}: React.ComponentProps<typeof ChildMessage> & { recovery?: ConversationRecovery }) {
  const localize = useLocalize();
  const scope = useMemo<TaskContentScope>(
    () => ({
      parentConversationId: recovery?.parentConversationId ?? '',
      threadId: recovery?.threadId ?? '',
      taskId: props.turn.taskId,
    }),
    [recovery?.parentConversationId, recovery?.threadId, props.turn.taskId],
  );
  const recovered = useSubagentTaskContentQuery(scope, {
    enabled:
      recovery != null &&
      props.turn.contentRecoveryAvailable !== false &&
      (props.turn.taskId !== recovery.selectedTaskId ||
        recovery.ready ||
        !isLiveSubagentStatus(props.turn.activity.status)),
  });
  const turn = useMemo(() => {
    const snapshot = recovered.data;
    if (snapshot == null || props.turn.contentRecoveryAvailable === false) {
      return {
        ...props.turn,
        activity: {
          ...props.turn.activity,
          content: standardContent(getActivityContent(props.turn.activity), 'hidden'),
        },
      };
    }
    const preserveActivity = !snapshot.content.some(
      (part) => part != null && !isEmptyContentPart(part),
    );
    return {
      ...props.turn,
      activity: {
        ...props.turn.activity,
        messageId: snapshot.messageId,
        content: standardContent(
          preserveActivity ? getActivityContent(props.turn.activity) : snapshot.content,
          'hidden',
        ),
        status: snapshot.status,
        activityTruncated: preserveActivity
          ? props.turn.activity.activityTruncated
          : snapshot.throughSequence < snapshot.targetThroughSequence ||
            (!isLiveSubagentStatus(snapshot.status) && snapshot.recovery === 'partial'),
      },
    };
  }, [recovered.data, props.turn]);
  const notice =
    props.turn.contentRecoveryAvailable !== false &&
    recovered.isError &&
    !recovered.isUnavailable ? (
      <Alert variant="error" className="mb-2">
        <div className="flex items-center gap-2">
          <span>{localize('com_ui_conversation_load_error')}</span>
          <Button variant="ghost" size="sm" onClick={() => void recovered.refetch()}>
            {localize('com_ui_retry')}
          </Button>
        </div>
      </Alert>
    ) : undefined;
  return (
    <TaskContentScopeContext.Provider value={scope}>
      <ChildMessage
        {...props}
        turn={turn}
        state={
          recovered.data == null || props.turn.contentRecoveryAvailable === false
            ? props.state
            : 'ready'
        }
        toolContentQuery={useSubagentToolContentQuery}
        notice={notice}
      />
    </TaskContentScopeContext.Provider>
  );
}

export default function SubagentConversation({
  turns,
  author,
  parentAuthor,
>>>>>>> upstream/main
  conversationId,
  stateByTask,
  controllableTaskId,
  onCancelControl,
  detailStateByTask,
  onLoadTurnDetails,
<<<<<<< HEAD
}: {
  turns: ChildConversationTurn[];
  agentId?: string;
=======
  interactive = false,
  toolContentQueries,
  recovery,
}: {
  recovery?: ConversationRecovery;
  /** Task-authorized preview hooks, backed by the recovery API rather than child message reads. */
  toolContentQueries?: ReadonlyMap<string, ToolContentQuery>;
  turns: ChildConversationTurn[];
  /** Only foreground children share their parent's live approval scope. */
  interactive?: boolean;
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
<<<<<<< HEAD
  return (
    <div className="flex flex-col gap-6 py-4" data-subagent-conversation>
      {turns.map((turn) => (
        <section
          key={turn.taskId}
          className="flex flex-col gap-4"
          data-subagent-thread-turn={turn.taskId}
        >
          <div className="px-4">
            <TriggerMessage turn={turn} fullWidth={fullWidth} />
          </div>
          <div className="px-4">
            <ChildMessage
              turn={turn}
              agentId={agentId}
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
=======
  const parentChat = useContext(ChatContext);
  const host = useMessagePartsHost();
  const contentHost = useMemo(() => ({ ...host, useMessagesAsk: useNoMessagesAsk }), [host]);
  const Message = recovery == null ? ChildMessage : RecoveredChildMessage;
  return (
    <ChatContext.Provider value={interactive ? parentChat : null}>
      <MessagePartsHostProvider host={contentHost}>
        <div className="flex flex-col gap-6 py-4" data-subagent-conversation>
          {turns.map((turn) => (
            <section
              key={turn.taskId}
              className="flex flex-col gap-4"
              data-subagent-thread-turn={turn.taskId}
            >
              <div className="px-4">
                <TriggerMessage turn={turn} fullWidth={fullWidth} parentAuthor={parentAuthor} />
              </div>
              <div className="px-4">
                <Message
                  turn={turn}
                  recovery={recovery}
                  author={author}
                  conversationId={conversationId}
                  fullWidth={fullWidth}
                  state={stateByTask?.get(turn.taskId) ?? 'ready'}
                  onCancelControl={
                    onCancelControl == null || turn.taskId !== controllableTaskId
                      ? undefined
                      : (controlId) => onCancelControl(turn.taskId, controlId)
                  }
                  toolContentQuery={toolContentQueries?.get(turn.taskId)}
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
      </MessagePartsHostProvider>
    </ChatContext.Provider>
>>>>>>> upstream/main
  );
}
