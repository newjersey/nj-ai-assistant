import { useState, useRef, useEffect, useMemo, memo, useCallback } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { useSetRecoilState, useRecoilValue } from 'recoil';
<<<<<<< HEAD
import { Input, Spinner, useCombobox } from '@librechat/client';
import type { TPromptGroup } from 'librechat-data-provider';
import type { PromptOption } from '~/common';
import useInitPopoverInput from '~/hooks/Input/useInitPopoverInput';
import { removeCharIfLast, detectVariables } from '~/utils';
import { useRecordPromptUsage } from '~/data-provider';
import { VariableDialog } from '~/components/Prompts';
import { usePromptGroupsContext } from '~/Providers';
import { activateCatalog } from '~/hooks';
import MentionItem from './MentionItem';
import { useLocalize } from '~/hooks';
=======
import { Input, Spinner, useCombobox, useRemScale, useToastContext } from '@librechat/client';
import type { TPromptGroup } from 'librechat-data-provider';
import type { PromptOption } from '~/common';
import {
  removeCharIfLast,
  detectVariables,
  isExternalPromptGroup,
  getPromptResolveErrorMessage,
} from '~/utils';
import { activateCatalog, useLocalize, usePromptContentResolver } from '~/hooks';
import useChatScopedRequest from '~/hooks/Prompts/useChatScopedRequest';
import useInitPopoverInput from '~/hooks/Input/useInitPopoverInput';
import { useRecordPromptUsage } from '~/data-provider';
import { VariableDialog } from '~/components/Prompts';
import { usePromptGroupsContext } from '~/Providers';
import MentionItem from './MentionItem';
>>>>>>> upstream/main
import store from '~/store';

const commandChar = '/';

const PopoverContainer = memo(
  ({
    index,
    children,
    isVariableDialogOpen,
    variableGroup,
<<<<<<< HEAD
=======
    variableText,
>>>>>>> upstream/main
    setVariableDialogOpen,
    textAreaRef,
  }: {
    index: number;
    children: React.ReactNode;
    isVariableDialogOpen: boolean;
    variableGroup: TPromptGroup | null;
<<<<<<< HEAD
=======
    variableText: string | undefined;
>>>>>>> upstream/main
    setVariableDialogOpen: (isOpen: boolean) => void;
    textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  }) => {
    const showPromptsPopover = useRecoilValue(store.showPromptsPopoverFamily(index));
    return (
      <>
        {showPromptsPopover ? children : null}
        <VariableDialog
          open={isVariableDialogOpen}
          onClose={() => {
            setVariableDialogOpen(false);
            requestAnimationFrame(() => {
              textAreaRef.current?.focus();
            });
          }}
          group={variableGroup}
<<<<<<< HEAD
=======
          promptText={variableText}
>>>>>>> upstream/main
        />
      </>
    );
  },
);

const ROW_HEIGHT = 44;

function PromptsCommand({
  index,
  textAreaRef,
  submitPrompt,
}: {
  index: number;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  submitPrompt: (textPrompt: string) => void;
}) {
  const localize = useLocalize();
<<<<<<< HEAD
  const { mutate: recordUsage } = useRecordPromptUsage();
=======
  const remScale = useRemScale();
  const { showToast } = useToastContext();
  const { mutate: recordUsage } = useRecordPromptUsage();
  const resolvePromptContent = usePromptContentResolver();
>>>>>>> upstream/main
  const promptGroupsContext = usePromptGroupsContext();
  const { allPromptGroups, hasAccess, requestAllPromptGroups } = promptGroupsContext ?? {};
  const { data, isLoading } = allPromptGroups ?? {};
  const showPromptsPopover = useRecoilValue(store.showPromptsPopoverFamily(index));

  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isVariableDialogOpen, setVariableDialogOpen] = useState(false);
  const [variableGroup, setVariableGroup] = useState<TPromptGroup | null>(null);
<<<<<<< HEAD
  const setShowPromptsPopover = useSetRecoilState(store.showPromptsPopoverFamily(index));

=======
  const [variableText, setVariableText] = useState<string | undefined>(undefined);
  const setShowPromptsPopover = useSetRecoilState(store.showPromptsPopoverFamily(index));

  /** A resolve that was started for one chat must not land on another; see
   *  `useChatScopedRequest` for the three cancellation keys. On cancel, a
   *  variable dialog opened from the stale read closes rather than
   *  surviving into the chat the user moved to. */
  const { begin, isCurrent, isMounted } = useChatScopedRequest(index, () => {
    setVariableDialogOpen(false);
  });

>>>>>>> upstream/main
  const prompts = useMemo(() => data?.promptGroups, [data]);
  const promptsMap = useMemo(() => data?.promptsMap, [data]);

  const { open, setOpen, searchValue, setSearchValue, matches } = useCombobox({
    value: '',
    options: prompts ?? [],
  });

  const initInputRef = useInitPopoverInput({
    inputRef,
    textAreaRef,
    commandChar,
    setSearchValue,
    setOpen,
  });

  const handleSelect = useCallback(
<<<<<<< HEAD
    (mention?: PromptOption, e?: React.KeyboardEvent<HTMLInputElement>) => {
=======
    async (mention?: PromptOption, e?: React.KeyboardEvent<HTMLInputElement>) => {
>>>>>>> upstream/main
      if (!mention) {
        return;
      }

      setSearchValue('');
      setOpen(false);
      setShowPromptsPopover(false);

      if (textAreaRef.current) {
        removeCharIfLast(textAreaRef.current, commandChar);
      }

      const group = promptsMap?.[mention.id];
      if (!group) {
        return;
      }

<<<<<<< HEAD
      const hasVariables = detectVariables(group.productionPrompt?.prompt ?? '');
      if (hasVariables) {
        if (e && e.key === 'Tab') {
          e.preventDefault();
        }
        setVariableGroup(group);
        setVariableDialogOpen(true);
        return;
      } else {
        submitPrompt(group.productionPrompt?.prompt ?? '');
        if (group._id) {
          recordUsage(group._id);
        }
=======
      const isLangfuse = isExternalPromptGroup(group);
      /** Native resolution is synchronous, so the dialog-vs-submit split is already
       *  known here; a Langfuse group's content (and so its variables) is unknown
       *  until it resolves, so Tab's default focus move is held off either way. */
      const hasKnownVariables =
        !isLangfuse && detectVariables(group.productionPrompt?.prompt ?? '');
      if (e && e.key === 'Tab' && (isLangfuse || hasKnownVariables)) {
        e.preventDefault();
      }

      /** Supersedes a resolve still pending for a prior selection: `begin`
       *  bumps the token, so that request's own guard above now discards it
       *  instead of this one waiting behind it. */
      const token = begin();
      if (isLangfuse) {
        showToast({ status: 'info', message: localize('com_ui_prompt_resolving') });
      }
      try {
        const text = await resolvePromptContent(group);
        /** The popover may have unmounted, or the active conversation may
         *  have changed, while the Langfuse resolve was in flight; a stale
         *  continuation must not submit, stage, or record for a chat the
         *  user left. */
        if (!isMounted() || !isCurrent(token)) {
          return;
        }
        if (!text?.trim()) {
          textAreaRef.current?.focus();
          return;
        }
        if (detectVariables(text)) {
          setVariableGroup(group);
          setVariableText(text);
          setVariableDialogOpen(true);
          return;
        }
        submitPrompt(text);
        if (group._id) {
          recordUsage(group._id);
        }
        textAreaRef.current?.focus();
      } catch (error) {
        if (isMounted() && isCurrent(token)) {
          showToast({ status: 'error', message: getPromptResolveErrorMessage(error, localize) });
          textAreaRef.current?.focus();
        }
>>>>>>> upstream/main
      }
    },
    [
      setSearchValue,
      setOpen,
      setShowPromptsPopover,
      textAreaRef,
      promptsMap,
      submitPrompt,
      recordUsage,
<<<<<<< HEAD
=======
      resolvePromptContent,
      showToast,
      localize,
      begin,
      isCurrent,
      isMounted,
>>>>>>> upstream/main
    ],
  );

  useEffect(() => {
    if (!open) {
      setActiveIndex(0);
      setSearchValue('');
    } else {
      /** Opening the picker before background warmup starts the fetch now */
      activateCatalog('prompts');
      setVariableGroup(null);
<<<<<<< HEAD
=======
      setVariableText(undefined);
>>>>>>> upstream/main
    }
  }, [open, setSearchValue]);

  /** The full prompt list is fetched on first popover open, not at app startup */
  useEffect(() => {
    if (showPromptsPopover) {
      requestAllPromptGroups?.();
    }
  }, [showPromptsPopover, requestAllPromptGroups]);

  useEffect(() => {
    setActiveIndex((prev) => Math.min(prev, Math.max(matches.length - 1, 0)));
  }, [matches.length]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const currentActiveItem = document.getElementById(`prompt-item-${activeIndex}`);
    currentActiveItem?.scrollIntoView({ behavior: 'instant', block: 'nearest' });
  }, [activeIndex]);

  if (!hasAccess) {
    return null;
  }

  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const mention = matches[index] as PromptOption;
    return (
      <MentionItem
        index={index}
        type="prompt"
        key={key}
        style={style}
        onClick={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = null;
          handleSelect(mention);
        }}
        name={mention.label ?? ''}
        icon={mention.icon}
        description={mention.description}
        isActive={index === activeIndex}
      />
    );
  };

  return (
    <PopoverContainer
      index={index}
      isVariableDialogOpen={isVariableDialogOpen}
      variableGroup={variableGroup}
<<<<<<< HEAD
=======
      variableText={variableText}
>>>>>>> upstream/main
      setVariableDialogOpen={setVariableDialogOpen}
      textAreaRef={textAreaRef}
    >
      <div className="absolute bottom-28 z-10 w-full space-y-2">
<<<<<<< HEAD
        <div className="popover border-token-border-light rounded-2xl border bg-surface-tertiary-alt p-2 shadow-lg">
          <Input
            ref={initInputRef}
            placeholder={localize('com_ui_command_usage_placeholder')}
            className="mb-1 h-auto w-full rounded-none border-0 bg-surface-tertiary-alt p-2 text-sm text-text-primary focus:outline-none"
=======
        <div className="popover border-border-light bg-surface-tertiary-alt rounded-theme-popover border p-2 shadow-lg">
          <Input
            ref={initInputRef}
            placeholder={localize('com_ui_command_usage_placeholder')}
            variant="embedded"
            className="mb-1"
>>>>>>> upstream/main
            autoComplete="off"
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setOpen(false);
                setShowPromptsPopover(false);
                textAreaRef.current?.focus();
              }
              if (e.key === 'ArrowDown') {
                if (matches.length === 0) {
                  return;
                }
                setActiveIndex((prevIndex) => (prevIndex + 1) % matches.length);
              } else if (e.key === 'ArrowUp') {
                if (matches.length === 0) {
                  return;
                }
                setActiveIndex((prevIndex) => (prevIndex - 1 + matches.length) % matches.length);
              } else if (e.key === 'Enter' || e.key === 'Tab') {
                if (matches.length === 0) {
                  e.preventDefault();
                  setOpen(false);
                  setShowPromptsPopover(false);
                  textAreaRef.current?.focus();
                  return;
                }
                if (e.key === 'Enter') {
                  e.preventDefault();
                }
                handleSelect(matches[activeIndex] as PromptOption | undefined, e);
              } else if (e.key === 'Backspace' && searchValue === '') {
                setOpen(false);
                setShowPromptsPopover(false);
                textAreaRef.current?.focus();
              }
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              timeoutRef.current = setTimeout(() => {
                setOpen(false);
                setShowPromptsPopover(false);
              }, 150);
            }}
          />
          {open && isLoading && matches.length === 0 && (
<<<<<<< HEAD
            <div className="flex h-32 items-center justify-center text-text-primary">
=======
            <div className="text-text-primary flex h-32 items-center justify-center">
>>>>>>> upstream/main
              <Spinner />
            </div>
          )}
          {open && matches.length > 0 && (
            <div className="max-h-40">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    width={width}
                    overscanRowCount={5}
<<<<<<< HEAD
                    rowHeight={ROW_HEIGHT}
                    rowCount={matches.length}
                    rowRenderer={rowRenderer}
                    scrollToIndex={activeIndex}
                    height={Math.min(matches.length * ROW_HEIGHT, 160)}
=======
                    rowHeight={ROW_HEIGHT * remScale}
                    rowCount={matches.length}
                    rowRenderer={rowRenderer}
                    scrollToIndex={activeIndex}
                    height={Math.min(matches.length * ROW_HEIGHT, 160) * remScale}
>>>>>>> upstream/main
                  />
                )}
              </AutoSizer>
            </div>
          )}
        </div>
      </div>
    </PopoverContainer>
  );
}

export default memo(PromptsCommand);
