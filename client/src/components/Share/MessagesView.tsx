import { useState } from 'react';
import type { TMessage } from 'librechat-data-provider';
import MultiMessage from './MultiMessage';
import { useLocalize } from '~/hooks';

export default function MessagesView({
  messagesTree: _messagesTree,
  conversationId,
}: {
  messagesTree?: TMessage[] | null;
  conversationId: string;
}) {
  const localize = useLocalize();
  const [currentEditId, setCurrentEditId] = useState<number | string | null>(-1);
  return (
    <div className="min-h-0 flex-1 overflow-hidden" data-testid="messages-view">
<<<<<<< HEAD
      <div className="dark:gpt-dark-gray relative h-full">
=======
      <div className="relative h-full">
>>>>>>> upstream/main
        <div
          style={{
            height: '100%',
            overflowY: 'auto',
            width: '100%',
          }}
        >
          <div className="flex flex-col pb-16 text-sm">
            {(_messagesTree && _messagesTree.length === 0) || _messagesTree === null ? (
<<<<<<< HEAD
              <div className="flex w-full items-center justify-center gap-1 bg-surface-secondary p-3 text-sm text-text-tertiary">
=======
              <div className="bg-surface-secondary text-text-tertiary flex w-full items-center justify-center gap-1 p-3 text-sm">
>>>>>>> upstream/main
                {localize('com_ui_nothing_found')}
              </div>
            ) : (
              <>
                <div>
                  <MultiMessage
                    key={conversationId} // avoid internal state mixture
                    messagesTree={_messagesTree}
                    messageId={conversationId ?? null}
                    setCurrentEditId={setCurrentEditId}
                    currentEditId={currentEditId ?? null}
                  />
                </div>
              </>
            )}
<<<<<<< HEAD
            <div className="dark:gpt-dark-gray group h-0 w-full flex-shrink-0 dark:border-gray-800/50" />
=======
            <div className="group h-0 w-full shrink-0" />
>>>>>>> upstream/main
          </div>
        </div>
      </div>
    </div>
  );
}
