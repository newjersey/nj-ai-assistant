import { createContext, useContext } from 'react';
<<<<<<< HEAD
import type { TConversation } from 'librechat-data-provider';
import type { SetterOrUpdater } from 'recoil';
import type { ConvoGenerator } from '~/common';

type TAddedChatContext = {
  conversation: TConversation | null;
  setConversation: SetterOrUpdater<TConversation | null>;
  generateConversation: ConvoGenerator;
};

export const AddedChatContext = createContext<TAddedChatContext>({} as TAddedChatContext);
=======
import type { AddedChatContract } from '~/hooks/Chat/contract';

export const AddedChatContext = createContext<AddedChatContract>({} as AddedChatContract);
>>>>>>> upstream/main
export const useAddedChatContext = () => useContext(AddedChatContext);
