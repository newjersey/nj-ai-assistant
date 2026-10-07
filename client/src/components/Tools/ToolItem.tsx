import { Button } from '@librechat/client';
import { XCircle, PlusCircleIcon, Wrench } from 'lucide-react';
import type { TPlugin, AgentToolType } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';

type ToolItemProps = {
  tool: TPlugin | AgentToolType;
  onAddTool: () => void;
  onRemoveTool: () => void;
  isInstalled?: boolean;
};

function ToolItem({ tool, onAddTool, onRemoveTool, isInstalled = false }: ToolItemProps) {
  const localize = useLocalize();
  const handleClick = () => {
    if (isInstalled) {
      onRemoveTool();
    } else {
      onAddTool();
    }
  };

  const name =
    (tool as AgentToolType).metadata?.name ||
    (tool as AgentToolType).tool_id ||
    (tool as TPlugin).name;
  const description =
    (tool as AgentToolType).metadata?.description || (tool as TPlugin).description || '';
  const icon = (tool as AgentToolType).metadata?.icon || (tool as TPlugin).icon;

  return (
<<<<<<< HEAD
    <div className="flex flex-col gap-4 rounded border border-border-medium bg-transparent p-6">
      <div className="flex gap-4">
        <div className="h-[70px] w-[70px] shrink-0">
=======
    <div className="border-border-medium flex flex-col gap-4 rounded border bg-transparent p-6">
      <div className="flex gap-4">
        <div className="h-[4.375rem] w-[4.375rem] shrink-0">
>>>>>>> upstream/main
          <div className="relative h-full w-full">
            {icon ? (
              <img
                src={icon}
                alt={localize('com_ui_logo', { 0: name })}
<<<<<<< HEAD
                className="h-full w-full rounded-[5px] bg-surface-fixed"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[5px] border border-border-medium bg-transparent">
                <Wrench className="h-8 w-8 text-text-secondary" />
              </div>
            )}
            <div className="absolute inset-0 rounded-[5px] ring-1 ring-inset ring-border-light"></div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start justify-between">
          <div className="mb-2 line-clamp-1 max-w-full text-lg leading-5 text-text-primary">
=======
                className="bg-surface-fixed h-full w-full rounded-[5px]"
              />
            ) : (
              <div className="border-border-medium flex h-full w-full items-center justify-center rounded-[5px] border bg-transparent">
                <Wrench className="text-text-secondary h-8 w-8" />
              </div>
            )}
            <div className="ring-border-light absolute inset-0 rounded-[5px] ring-1 ring-inset"></div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start justify-between">
          <div className="text-text-primary mb-2 line-clamp-1 max-w-full text-lg leading-5">
>>>>>>> upstream/main
            {name}
          </div>
          {!isInstalled ? (
            <Button
              variant="submit"
              className="relative"
              aria-label={`${localize('com_ui_add')} ${name}`}
              onClick={handleClick}
            >
              <div className="flex w-full items-center justify-center gap-2">
                {localize('com_ui_add')}
                <PlusCircleIcon className="flex h-4 w-4 items-center stroke-2" aria-hidden="true" />
              </div>
            </Button>
          ) : (
            <Button
              variant="outline"
              className="relative"
              onClick={handleClick}
              aria-label={`${localize('com_nav_tool_remove')} ${name}`}
            >
              <div className="flex w-full items-center justify-center gap-2">
                {localize('com_nav_tool_remove')}
                <XCircle className="flex h-4 w-4 items-center stroke-2" aria-hidden="true" />
              </div>
            </Button>
          )}
        </div>
      </div>
<<<<<<< HEAD
      <div className="line-clamp-3 h-[60px] text-sm text-text-secondary">{description}</div>
=======
      <div className="text-text-secondary line-clamp-3 h-[3.75rem] text-sm">{description}</div>
>>>>>>> upstream/main
    </div>
  );
}

export default ToolItem;
