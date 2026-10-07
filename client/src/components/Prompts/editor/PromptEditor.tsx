import { useRef, useMemo, memo } from 'react';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import supersub from 'remark-supersub';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { EditIcon, Check } from 'lucide-react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextareaAutosize, Button, TooltipAnchor } from '@librechat/client';
import type { PluggableList } from 'unified';
import { codeNoExecution } from '~/components/Chat/Messages/Content/MarkdownComponents';
import VariablesDropdown from './VariablesDropdown';
import { PromptVariableGfm } from './Markdown';
import { cn, langSubset } from '~/utils';
import { useLocalize } from '~/hooks';

type Props = {
  name: string;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const PromptEditor: React.FC<Props> = ({ name, isEditing, setIsEditing }) => {
  const localize = useLocalize();
  const { control } = useFormContext();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const EditorIcon = useMemo(() => {
    return isEditing ? Check : EditIcon;
  }, [isEditing]);

  const rehypePlugins: PluggableList = [
    [rehypeKatex],
    [
      rehypeHighlight,
      {
        detect: true,
        ignoreMissing: true,
        subset: langSubset,
      },
    ],
  ];

  return (
    <div className="flex max-h-[85vh] flex-col sm:max-h-[85vh]">
      <h2 className="sr-only">{localize('com_ui_control_bar')}</h2>
      <div
        className={cn(
<<<<<<< HEAD
          'relative w-full flex-1 overflow-auto rounded-xl border border-border-medium p-3 text-left transition-all duration-200 sm:p-4',
          isEditing ? '' : 'cursor-pointer hover:bg-surface-tertiary',
        )}
      >
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1">
=======
          'border-border-medium relative w-full flex-1 overflow-auto rounded-xl border p-3 text-left transition-all duration-200 sm:p-4',
          isEditing ? '' : 'hover:bg-surface-tertiary cursor-pointer',
        )}
      >
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
>>>>>>> upstream/main
          <VariablesDropdown fieldName={name} finalFocus={textareaRef} />
          <TooltipAnchor
            description={isEditing ? localize('com_ui_save') : localize('com_ui_edit')}
            render={
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setIsEditing((prev) => !prev)}
                aria-label={isEditing ? localize('com_ui_save') : localize('com_ui_edit')}
<<<<<<< HEAD
                className="size-8 p-0 hover:bg-surface-tertiary"
              >
                <EditorIcon className="size-4 text-text-secondary" aria-hidden="true" />
=======
                className="hover:bg-surface-tertiary size-8 p-0"
              >
                <EditorIcon className="text-text-secondary size-4" aria-hidden="true" />
>>>>>>> upstream/main
              </Button>
            }
          />
        </div>
        {!isEditing && (
          <button
            type="button"
            aria-label={localize('com_ui_edit')}
<<<<<<< HEAD
            className="absolute inset-0 z-0 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary"
=======
            className="focus-visible:ring-ring-primary absolute inset-0 z-0 rounded-xl focus:outline-hidden focus-visible:ring-2"
>>>>>>> upstream/main
            onClick={() => setIsEditing(true)}
          />
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            isEditing ? (
              <TextareaAutosize
<<<<<<< HEAD
=======
                focusOutline="hidden"
>>>>>>> upstream/main
                {...field}
                ref={(el: HTMLTextAreaElement | null) => {
                  field.ref(el);
                  textareaRef.current = el;
                }}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
<<<<<<< HEAD
                className="w-full resize-none overflow-y-auto bg-transparent font-mono text-sm leading-relaxed text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary sm:text-base"
=======
                className="text-text-primary placeholder:text-text-tertiary focus-visible:ring-ring-primary w-full resize-none overflow-y-auto bg-transparent font-mono text-sm leading-relaxed focus-visible:ring-2 sm:text-base"
>>>>>>> upstream/main
                minRows={4}
                maxRows={16}
                onBlur={(e) => {
                  /** Opening the variables menu moves focus into it; that is not leaving the editor */
                  if (e.relatedTarget?.closest('[role="menu"]')) {
                    return;
                  }
                  setIsEditing(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    e.preventDefault();
                    setIsEditing(false);
                  }
                }}
                placeholder={localize('com_ui_prompt_input')}
                aria-label={localize('com_ui_prompt_input')}
              />
            ) : (
              <div
                className="group/preview relative min-h-[6rem] overflow-y-auto text-sm sm:text-base"
                style={{ maxHeight: '24rem' }}
                onClick={() => setIsEditing(true)}
              >
                {!field.value ? (
<<<<<<< HEAD
                  <p className="italic text-text-tertiary">{localize('com_ui_click_to_edit')}</p>
=======
                  <p className="text-text-tertiary italic">{localize('com_ui_click_to_edit')}</p>
>>>>>>> upstream/main
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[
                      /** @ts-ignore */
                      supersub,
                      remarkGfm,
                      [remarkMath, { singleDollarTextMath: false }],
                    ]}
                    /** @ts-ignore */
                    rehypePlugins={rehypePlugins}
                    /** @ts-ignore */
                    components={{ p: PromptVariableGfm, code: codeNoExecution }}
<<<<<<< HEAD
                    className="markdown prose dark:prose-invert light w-full break-words text-text-primary"
=======
                    className="markdown prose dark:prose-invert light text-text-primary w-full break-words"
>>>>>>> upstream/main
                  >
                    {field.value}
                  </ReactMarkdown>
                )}
                <div className="pointer-events-none sticky bottom-1/2 z-10 flex translate-y-1/2 items-center justify-center opacity-0 transition-all duration-200 group-hover/preview:opacity-100">
<<<<<<< HEAD
                  <div className="flex items-center gap-2 rounded-lg border border-border-light bg-surface-primary px-3 py-1.5 shadow-md">
                    <EditIcon className="size-4 text-text-secondary" aria-hidden="true" />
                    <span className="text-sm font-medium text-text-primary">
=======
                  <div className="border-border-light bg-surface-primary flex items-center gap-2 rounded-lg border px-3 py-1.5 shadow-md">
                    <EditIcon className="text-text-secondary size-4" aria-hidden="true" />
                    <span className="text-text-primary text-sm font-medium">
>>>>>>> upstream/main
                      {localize('com_ui_click_to_edit')}
                    </span>
                  </div>
                </div>
              </div>
            )
          }
        />
      </div>
    </div>
  );
};

export default memo(PromptEditor);
