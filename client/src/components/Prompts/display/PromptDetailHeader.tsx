import { format } from 'date-fns';
import { TooltipAnchor } from '@librechat/client';
<<<<<<< HEAD
import { User, Calendar, EarthIcon, BarChart3 } from 'lucide-react';
import type { TPromptGroup } from 'librechat-data-provider';
import { useLocalize, useAuthContext } from '~/hooks';
import CategoryIcon from '../utils/CategoryIcon';
=======
import { User, Calendar, EarthIcon, BarChart3, Cloud } from 'lucide-react';
import type { TPromptGroup } from 'librechat-data-provider';
import { useLocalize, useAuthContext } from '~/hooks';
import CategoryIcon from '../utils/CategoryIcon';
import { isExternalPromptGroup } from '~/utils';
>>>>>>> upstream/main

interface PromptDetailHeaderProps {
  group: TPromptGroup;
}

const PromptDetailHeader = ({ group }: PromptDetailHeaderProps) => {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const formattedDate = group.createdAt ? format(new Date(group.createdAt), 'MMM d, yyyy') : null;
  const isSharedPrompt = group.author !== user?.id && Boolean(group.authorName);

  const isGlobalGroup = group.isPublic === true;
<<<<<<< HEAD
=======
  const isExternal = isExternalPromptGroup(group);
>>>>>>> upstream/main

  return (
    <div className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:gap-4">
      {group.category && (
<<<<<<< HEAD
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-secondary">
=======
        <div className="bg-surface-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
>>>>>>> upstream/main
          <CategoryIcon category={group.category} className="h-6 w-6" />
        </div>
      )}

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex min-w-0 items-center gap-2">
<<<<<<< HEAD
          <h2 className="truncate text-xl font-bold text-text-primary" title={group.name}>
=======
          <h2 className="text-text-primary truncate text-xl font-bold" title={group.name}>
>>>>>>> upstream/main
            {group.name}
          </h2>
          {isGlobalGroup && (
            <TooltipAnchor
              description={localize('com_ui_sr_global_prompt')}
              side="top"
              render={
                <EarthIcon
<<<<<<< HEAD
                  className="h-5 w-5 shrink-0 text-accent-primary"
=======
                  className="text-accent-primary h-5 w-5 shrink-0"
>>>>>>> upstream/main
                  aria-label={localize('com_ui_sr_global_prompt')}
                />
              }
            />
          )}
<<<<<<< HEAD
        </div>
        {group.oneliner && (
          <p className="text-sm text-text-secondary sm:truncate">{group.oneliner}</p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
          {isSharedPrompt && (
            <span className="flex items-center gap-1">
              <User className="h-3 w-3 text-text-secondary" aria-hidden="true" />
=======
          {isExternal && (
            <TooltipAnchor
              description={localize('com_ui_prompt_source_langfuse')}
              side="top"
              render={
                <Cloud
                  className="text-text-secondary h-5 w-5 shrink-0"
                  aria-label={localize('com_ui_prompt_source_langfuse')}
                />
              }
            />
          )}
        </div>
        {group.oneliner && (
          <p className="text-text-secondary text-sm sm:truncate">{group.oneliner}</p>
        )}
        <div className="text-text-secondary mt-1 flex flex-wrap items-center gap-3 text-xs">
          {isSharedPrompt && (
            <span className="flex items-center gap-1">
              <User className="text-text-secondary h-3 w-3" aria-hidden="true" />
>>>>>>> upstream/main
              {localize('com_ui_by_author', { 0: group.authorName })}
            </span>
          )}
          {formattedDate && (
            <time className="flex items-center gap-1" dateTime={group.createdAt?.toString()}>
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {formattedDate}
            </time>
          )}
          {group.numberOfGenerations != null && group.numberOfGenerations > 0 && (
            <span className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" aria-hidden="true" />
              {localize('com_ui_usage')}: {group.numberOfGenerations}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptDetailHeader;
