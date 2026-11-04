import React, { forwardRef } from 'react';
<<<<<<< HEAD
=======
import { SeriesLabel } from '@librechat/client';
>>>>>>> upstream/main
import { PrincipalType } from 'librechat-data-provider';
import type { TPrincipal } from 'librechat-data-provider';
import PrincipalAvatar from '~/components/Sharing/PrincipalAvatar';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

interface PeoplePickerSearchItemProps extends React.HTMLAttributes<HTMLDivElement> {
  principal: TPrincipal;
}

const PeoplePickerSearchItem = forwardRef<HTMLDivElement, PeoplePickerSearchItemProps>(
  function PeoplePickerSearchItem(
    { principal, className, style, onClick, ...props },
    forwardedRef,
  ) {
    const localize = useLocalize();
    const { name, email, type } = principal;

    const displayName = name || localize('com_ui_unknown');
    const subtitle = email || `${type} (${principal.source || 'local'})`;

<<<<<<< HEAD
    /** Semantic series roles rather than palette hues: a raw utility does not
     *  move when the theme does, and these labels render at 12px, so they answer
     *  to the text floor on whichever canvas the viewer picked. */
=======
    /** Semantic series slots rather than palette hues, so the dot moves with the theme. */
>>>>>>> upstream/main
    const getBadgeConfig = () => {
      switch (type) {
        case PrincipalType.USER:
          return {
<<<<<<< HEAD
            className: 'bg-series-1/10 text-series-1',
=======
            hue: 1 as const,
>>>>>>> upstream/main
            label: localize('com_ui_user'),
          };
        case PrincipalType.GROUP:
          return {
<<<<<<< HEAD
            className: 'bg-series-7/10 text-series-7',
=======
            hue: 7 as const,
>>>>>>> upstream/main
            label: localize('com_ui_group'),
          };
        case PrincipalType.ROLE:
          return {
<<<<<<< HEAD
            className: 'bg-series-6/10 text-series-6',
=======
            hue: 6 as const,
>>>>>>> upstream/main
            label: localize('com_ui_role'),
          };
        default:
          return {
<<<<<<< HEAD
            className: 'bg-surface-tertiary text-text-secondary',
=======
            hue: undefined,
>>>>>>> upstream/main
            label: type,
          };
      }
    };

    const badgeConfig = getBadgeConfig();

    return (
      <div
        {...props}
        ref={forwardedRef}
        className={cn('flex items-center gap-3 p-2', className)}
        style={style}
        onClick={(event) => {
          onClick?.(event);
        }}
      >
        <PrincipalAvatar principal={principal} size="md" />

        <div className="min-w-0 flex-1">
<<<<<<< HEAD
          <div className="truncate text-sm font-medium text-text-primary">{displayName}</div>
          <div className="truncate text-xs text-text-secondary">{subtitle}</div>
        </div>

        <div className="flex-shrink-0">
          <span
            className={cn(
              'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
              badgeConfig.className,
            )}
          >
            {badgeConfig.label}
          </span>
=======
          <div className="text-text-primary truncate text-sm font-medium">{displayName}</div>
          <div className="text-text-secondary truncate text-xs">{subtitle}</div>
        </div>

        <div className="shrink-0">
          <SeriesLabel hue={badgeConfig.hue} className="text-xs font-medium">
            {badgeConfig.label}
          </SeriesLabel>
>>>>>>> upstream/main
        </div>
      </div>
    );
  },
);

export default PeoplePickerSearchItem;
