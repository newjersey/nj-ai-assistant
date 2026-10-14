import { useState, useMemo } from 'react';
import { Copy, Check } from 'lucide';
import { Button, MorphIcon, TooltipAnchor } from '@librechat/client';
import type { TMessage, SearchResultData } from 'librechat-data-provider';
import type { MarkdownVariant } from '~/utils/richtext';
<<<<<<< HEAD
import { useLocalize, useCopyMessageToClipboard, hasCopyableText } from '~/hooks';
=======
import {
  useLocalize,
  useCopyMessageToClipboard,
  getMessageClipboardSource,
  hasCopyableText,
} from '~/hooks';
>>>>>>> upstream/main
import { revealOnRowHoverClasses } from './styles';
import { cn } from '~/utils';

type THoverButtons = {
  message: TMessage;
  searchResults?: { [key: string]: SearchResultData };
  /** The renderer this row's message was displayed with, when it is not the authorship default. */
  variant?: MarkdownVariant;
};

export default function MinimalHoverButtons({ message, searchResults, variant }: THoverButtons) {
  const localize = useLocalize();
  const [isCopied, setIsCopied] = useState(false);
<<<<<<< HEAD
  const copyToClipboard = useCopyMessageToClipboard({
    text: message.text,
    content: message.content,
    searchResults,
    isCreatedByUser: message.isCreatedByUser,
    error: message.error,
    variant,
  });
  const canCopy = useMemo(
    () => hasCopyableText({ text: message.text, content: message.content, searchResults }),
    [message.text, message.content, searchResults],
  );

  return (
    <div className="visible mt-1 flex justify-center gap-1 self-end text-text-tertiary lg:justify-start">
=======
  const clipboardSource = useMemo(() => getMessageClipboardSource(message), [message]);
  const copyToClipboard = useCopyMessageToClipboard({
    ...clipboardSource,
    searchResults,
    variant: clipboardSource.variant ?? variant,
  });
  const canCopy = useMemo(
    () => hasCopyableText({ ...clipboardSource, searchResults }),
    [clipboardSource, searchResults],
  );

  return (
    <div className="text-text-tertiary visible mt-1 flex justify-center gap-1 self-end lg:justify-start">
>>>>>>> upstream/main
      <TooltipAnchor
        description={
          isCopied ? localize('com_ui_copied_to_clipboard') : localize('com_ui_copy_to_clipboard')
        }
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              isCopied
                ? localize('com_ui_copied_to_clipboard')
                : localize('com_ui_copy_to_clipboard')
            }
            className={cn(
<<<<<<< HEAD
              'ml-0 flex size-auto items-center gap-1.5 rounded-lg p-1.5 text-xs text-text-secondary-alt',
              'hover:bg-surface-hover hover:text-text-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
=======
              'text-text-secondary-alt ml-0 flex size-auto items-center gap-1.5 rounded-lg p-1.5 text-xs',
              'hover:bg-surface-hover hover:text-text-primary',
              'focus-visible:ring-text-primary focus-visible:ring-2',
>>>>>>> upstream/main
              revealOnRowHoverClasses,
            )}
            disabled={!canCopy}
            onClick={() => copyToClipboard(setIsCopied)}
          >
<<<<<<< HEAD
            <MorphIcon icon={isCopied ? Check : Copy} size={19} />
=======
            <MorphIcon icon={isCopied ? Check : Copy} size="1.1875rem" />
>>>>>>> upstream/main
          </Button>
        }
      />
    </div>
  );
}
