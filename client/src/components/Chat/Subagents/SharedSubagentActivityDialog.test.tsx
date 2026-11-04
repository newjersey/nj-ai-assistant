import React from 'react';
import { ContentTypes } from 'librechat-data-provider';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
<<<<<<< HEAD
import type { TMessageContentParts } from 'librechat-data-provider';
=======
import type { TMessage, TMessageContentParts } from 'librechat-data-provider';
>>>>>>> upstream/main
import SubagentCall from '~/components/Chat/Messages/Content/Parts/SubagentCall';
import SharedSubagentActivityDialog from './SharedSubagentActivityDialog';
import { MessageContext } from '~/Providers/MessageContext';
import { ShareContext } from '~/Providers/ShareContext';
import { ChatSurfaceHarness } from 'test/harness';

const mockUseSubagentThreadQuery = jest.fn();

jest.mock('~/data-provider', () => ({
  useSubagentThreadQuery: (...args: unknown[]) => mockUseSubagentThreadQuery(...args),
}));

jest.mock('~/hooks', () => ({
  useLocalize:
    () =>
<<<<<<< HEAD
    (key: string, values?: Record<number, string>): string => {
      if (key === 'com_ui_subagent_dialog_title') return `Agent ${values?.[0] ?? ''}`;
=======
    (key: string): string => {
>>>>>>> upstream/main
      if (key === 'com_ui_subagent_complete') return 'Ran agent';
      if (key === 'com_ui_subagent_activity') return 'Agent activity';
      return key;
    },
}));

jest.mock('~/Providers', () => ({ useAgentsMapContext: () => ({}) }));
jest.mock('~/components/Share/MessageIcon', () => ({ __esModule: true, default: () => null }));
<<<<<<< HEAD
=======
jest.mock('~/components/Chat/Messages/MessageIcon', () => ({
  __esModule: true,
  default: ({ iconData }: { iconData: { iconURL?: string } }) => (
    <span data-testid="author-face" data-icon={iconData.iconURL} />
  ),
}));
>>>>>>> upstream/main
jest.mock('~/hooks/MCP', () => ({ useMCPServerNames: () => [] }));

jest.mock('./SubagentActivity', () => ({
  __esModule: true,
  SubagentActivityScrollSurface: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="shared-scroll-surface">{children}</div>
  ),
  default: ({
    activity,
  }: {
    activity: { title: string; items: Array<{ type: string; text?: string }> };
  }) => (
    <div data-testid="shared-subagent-activity">
      <span>{activity.title}</span>
      {activity.items.map((item, index) => (
        <span key={index}>{item.text ?? item.type}</span>
      ))}
    </div>
  ),
}));

jest.mock('./SubagentConversation', () => ({
  __esModule: true,
  default: ({
    turns,
<<<<<<< HEAD
  }: {
=======
    author,
    parentAuthor,
  }: {
    author: { name: string };
    parentAuthor: { name: string };
>>>>>>> upstream/main
    turns: Array<{
      taskId: string;
      trigger: { summary: string };
      activity: { items: Array<{ type: string; text?: string }> };
    }>;
<<<<<<< HEAD
  }) => (
    <div data-testid="subagent-conversation">
      {turns.map((turn) => (
        <div key={turn.taskId}>
          {turn.trigger.summary}
          {turn.activity.items.map((item, index) => (
            <span key={index}>{item.text ?? item.type}</span>
          ))}
        </div>
      ))}
    </div>
  ),
=======
  }) => {
    const { MessageSurfaceContext } = jest.requireActual('~/components/Chat/Messages/ui/surface');
    return (
      <MessageSurfaceContext.Consumer>
        {(surface: string) => (
          <div
            data-testid="subagent-conversation"
            data-message-surface={surface}
            data-author={author.name}
            data-parent-author={parentAuthor.name}
          >
            {turns.map((turn) => (
              <div key={turn.taskId}>
                {turn.trigger.summary}
                {turn.activity.items.map((item, index) => (
                  <span key={index}>{item.text ?? item.type}</span>
                ))}
              </div>
            ))}
          </div>
        )}
      </MessageSurfaceContext.Consumer>
    );
  },
>>>>>>> upstream/main
}));

const persistedContent = (text: string): TMessageContentParts[] => [
  { type: ContentTypes.TEXT, text } as TMessageContentParts,
];

const detachedOutput = JSON.stringify({
  background_task_id: 'task-1',
  subagent_thread_id: 'thread-1',
  tool: 'subagent',
  subagent_type: 'researcher',
  status: 'running',
  message:
    'Started subagent "researcher" background task. Poll the host background-task tool with background_task_id "task-1".',
});

<<<<<<< HEAD
=======
/** The shared thread as ShareView holds it: the agent that dispatched the child. */
const sharedMessages = [
  {
    messageId: 'shared-parent',
    parentMessageId: null,
    conversationId: 'shared-conversation',
    isCreatedByUser: false,
    endpoint: 'agents',
    model: 'agent_parent',
    sender: 'Lia',
    iconURL: '/lia.png',
    text: '',
  } as unknown as TMessage,
];

>>>>>>> upstream/main
function renderSharedCall(input: {
  output?: string;
  persistedContent?: TMessageContentParts[];
  detached?: boolean;
<<<<<<< HEAD
=======
  partIndex?: number;
  messages?: TMessage[];
  subagentType?: string;
  subagentIdentity?: { subagentKind: 'graph'; subagentAgentId: 'graph:self' };
>>>>>>> upstream/main
}) {
  return render(
    <ChatSurfaceHarness>
      <ShareContext.Provider value={{ isSharedConvo: true, shareId: 'share-1' }}>
        <MessageContext.Provider
          value={{
            conversationId: 'shared-conversation',
            messageId: 'shared-parent',
<<<<<<< HEAD
=======
            partIndex: input.partIndex,
>>>>>>> upstream/main
            isExpanded: false,
          }}
        >
          <SubagentCall
            toolCallId="shared-call"
            initialProgress={1}
            args={{
<<<<<<< HEAD
              subagent_type: 'researcher',
=======
              subagent_type: input.subagentType ?? 'researcher',
>>>>>>> upstream/main
              description: 'Review the release.',
              run_in_background: input.detached === true,
            }}
            output={input.output}
<<<<<<< HEAD
            persistedContent={input.persistedContent}
          />
          <SharedSubagentActivityDialog shareId="share-1" />
=======
            subagentIdentity={input.subagentIdentity}
            persistedContent={input.persistedContent}
          />
          <SharedSubagentActivityDialog
            shareId="share-1"
            messages={input.messages ?? sharedMessages}
          />
>>>>>>> upstream/main
        </MessageContext.Provider>
      </ShareContext.Provider>
    </ChatSurfaceHarness>,
  );
}

describe('SharedSubagentActivityDialog', () => {
  beforeEach(() => mockUseSubagentThreadQuery.mockClear());

  it('opens readable foreground activity from the shared message payload and restores focus', async () => {
    renderSharedCall({
      output: 'Legacy fallback.',
      persistedContent: persistedContent('Shared review complete.'),
    });
    const trigger = screen.getByRole('button', { name: 'Ran agent' });

    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
<<<<<<< HEAD
    expect(screen.getByText('Shared review complete.')).toBeInTheDocument();
=======
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute(
      'data-message-surface',
      'bg-surface-dialog',
    );
    expect(screen.getByText('Shared review complete.')).toBeInTheDocument();
    /** Named as main chat names them: the child by its readable type, the
     *  briefing by the shared agent that sent it. */
    expect(screen.getByRole('heading', { name: 'researcher' })).toBeInTheDocument();
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute(
      'data-author',
      'researcher',
    );
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute(
      'data-parent-author',
      'Lia',
    );
>>>>>>> upstream/main
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(trigger).toHaveFocus());
  });

<<<<<<< HEAD
=======
  it('reuses the historical parent avatar for a shared self-spawn', () => {
    renderSharedCall({ subagentType: 'self', persistedContent: persistedContent('Self work.') });
    fireEvent.click(screen.getByRole('button', { name: 'Ran agent' }));
    expect(screen.getByRole('heading', { name: 'Lia' })).toBeInTheDocument();
    expect(screen.getByTestId('author-face')).toHaveAttribute('data-icon', '/lia.png');
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute('data-author', 'Lia');
  });

  it('uses the exact shared part when provider tool IDs repeat', () => {
    renderSharedCall({
      subagentType: 'self',
      partIndex: 1,
      persistedContent: persistedContent('Lane work.'),
      messages: [
        {
          ...sharedMessages[0],
          content: [
            {
              type: ContentTypes.TOOL_CALL,
              agentId: 'agent_parent',
              tool_call: { id: 'shared-call', name: 'subagent', args: {} },
            },
            {
              type: ContentTypes.TOOL_CALL,
              agentId: 'agent_missing_lane',
              tool_call: { id: 'shared-call', name: 'subagent', args: {} },
            },
          ],
        },
      ],
    });
    fireEvent.click(screen.getByRole('button', { name: 'Ran agent' }));
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute(
      'data-parent-author',
      'com_ui_subagent_parent_agent',
    );
    expect(screen.queryByRole('heading', { name: 'Lia' })).not.toBeInTheDocument();
  });

  it('preserves a shared graph alias named self instead of the parent author', () => {
    renderSharedCall({
      subagentType: 'self',
      subagentIdentity: { subagentKind: 'graph', subagentAgentId: 'graph:self' },
      persistedContent: persistedContent('Graph work.'),
    });
    fireEvent.click(screen.getByRole('button', { name: 'Ran agent' }));
    expect(screen.getByRole('heading', { name: 'self' })).toBeInTheDocument();
    expect(screen.getByTestId('subagent-conversation')).toHaveAttribute('data-author', 'self');
    expect(screen.getByTestId('author-face')).not.toHaveAttribute('data-icon', '/lia.png');
  });

>>>>>>> upstream/main
  it('renders detached persisted activity without performing the private durable query', () => {
    renderSharedCall({
      output: detachedOutput,
      persistedContent: persistedContent('Detached work survived refresh.'),
      detached: true,
    });

    fireEvent.click(screen.getByRole('button', { name: 'Agent activity' }));

    expect(screen.getByText('Detached work survived refresh.')).toBeInTheDocument();
    expect(mockUseSubagentThreadQuery).not.toHaveBeenCalled();
  });

  it('makes a detached shared card without persisted activity explicitly noninteractive', () => {
    renderSharedCall({ output: detachedOutput, detached: true });

    expect(screen.getByRole('button', { name: 'Agent activity' })).toBeDisabled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(mockUseSubagentThreadQuery).not.toHaveBeenCalled();
  });

  it('keeps a shared detached card with only invisible reservations noninteractive', () => {
    renderSharedCall({
      output: detachedOutput,
      detached: true,
      persistedContent: [
        {
          type: ContentTypes.ACTIVITY_LABEL,
          activity_label: '',
        } as TMessageContentParts,
      ],
    });

    expect(screen.getByRole('button', { name: 'Agent activity' })).toBeDisabled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
