import React, { createContext, useContext, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { useLatestMessage } from '~/hooks/Messages/useLatestMessage';
import { getLatestText } from '~/utils';
import store from '~/store';

export interface ArtifactsContextValue {
  isSubmitting: boolean;
  latestMessageId: string | null;
  latestMessageText: string;
  conversationId: string | null;
<<<<<<< HEAD
=======
  /** Whether this host offers opening the pane in its own window. The pane
   *  consumes the deployment's `interface.artifactUndocking` rather than
   *  reading config itself: the host already knows, and only the host knows
   *  whether a window it would have to render is available at all. */
  canUndock: boolean;
>>>>>>> upstream/main
}

const ArtifactsContext = createContext<ArtifactsContextValue | undefined>(undefined);

interface ArtifactsProviderProps {
  children: React.ReactNode;
<<<<<<< HEAD
  value?: Partial<ArtifactsContextValue>;
=======
  /* The capability has no safe default, so the host has to answer it: a
   * provider that guessed would either offer a window the deployment forbids
   * or hide a control it allows. Everything else here has a chat-shaped
   * fallback the host can leave alone. */
  value: Partial<Omit<ArtifactsContextValue, 'canUndock'>> &
    Pick<ArtifactsContextValue, 'canUndock'>;
>>>>>>> upstream/main
}

export function ArtifactsProvider({ children, value }: ArtifactsProviderProps) {
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(0));
  const latestMessage = useLatestMessage(0);
  const conversationId = useRecoilValue(store.conversationIdByIndex(0));

  const chatLatestMessageText = useMemo(() => {
    return getLatestText(latestMessage);
  }, [latestMessage]);

<<<<<<< HEAD
  const defaultContextValue = useMemo<ArtifactsContextValue>(
=======
  const defaultContextValue = useMemo<Omit<ArtifactsContextValue, 'canUndock'>>(
>>>>>>> upstream/main
    () => ({
      isSubmitting,
      conversationId: conversationId ?? null,
      latestMessageText: chatLatestMessageText,
      latestMessageId: latestMessage?.messageId ?? null,
    }),
    [isSubmitting, chatLatestMessageText, latestMessage?.messageId, conversationId],
  );

  const contextValue = useMemo<ArtifactsContextValue>(
<<<<<<< HEAD
    () => (value ? { ...defaultContextValue, ...value } : defaultContextValue),
=======
    () => ({ ...defaultContextValue, ...value }),
>>>>>>> upstream/main
    [defaultContextValue, value],
  );

  return <ArtifactsContext.Provider value={contextValue}>{children}</ArtifactsContext.Provider>;
}

export function useArtifactsContext() {
  const context = useContext(ArtifactsContext);
  if (!context) {
    throw new Error('useArtifactsContext must be used within ArtifactsProvider');
  }
  return context;
}
