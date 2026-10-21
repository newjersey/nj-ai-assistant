import React from 'react';
import { FilterInput } from '@librechat/client';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { CreateSkillMenu } from '~/components/Skills/buttons';
import { useHasAccess, useLocalize } from '~/hooks';
<<<<<<< HEAD
import { cn } from '~/utils';

=======
import { PanelHeader } from '~/components/ui';

/**
 * The skills panel head. Built on the shared `PanelHeader` so the title, the create
 * action and the filter sit where every other panel puts them.
 */
>>>>>>> upstream/main
export default function FilterSkills({
  searchTerm,
  onSearchChange,
  className = '',
}: {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  const localize = useLocalize();
  const hasCreateAccess = useHasAccess({
    permissionType: PermissionTypes.SKILLS,
    permission: Permissions.CREATE,
  });

  return (
<<<<<<< HEAD
    <div className={cn('flex flex-col gap-2', className)}>
      <div role="search" className="flex items-center gap-2">
        <FilterInput
          inputId="skills-filter"
          label={localize('com_ui_filter_skills_name')}
          value={searchTerm}
          onChange={onSearchChange}
          containerClassName="flex-1"
        />
        {hasCreateAccess && <CreateSkillMenu />}
      </div>
    </div>
=======
    <PanelHeader
      className={className}
      title={localize('com_ui_skills')}
      action={hasCreateAccess && <CreateSkillMenu />}
      search={
        <div role="search">
          <FilterInput
            inputId="skills-filter"
            label={localize('com_ui_filter_skills_name')}
            value={searchTerm}
            onChange={onSearchChange}
          />
        </div>
      }
    />
>>>>>>> upstream/main
  );
}
