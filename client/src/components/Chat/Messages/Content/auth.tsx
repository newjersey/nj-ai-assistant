import { createContext, useContext } from 'react';
import { TriangleAlert } from 'lucide-react';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

export const ToolAuthWarningContext = createContext(false);

export function ToolAuthWarning({ className }: { className?: string }) {
  const localize = useLocalize();
  const suppressed = useContext(ToolAuthWarningContext);

  if (suppressed) {
    return null;
  }

  return (
<<<<<<< HEAD
    <p className={cn('flex items-center text-xs text-text-warning', className)}>
      <TriangleAlert className="mr-1.5 inline-block h-4 w-4" aria-hidden="true" />
=======
    <p className={cn('text-text-warning flex items-center text-xs', className)}>
      <TriangleAlert className="me-1.5 inline-block h-4 w-4" aria-hidden="true" />
>>>>>>> upstream/main
      {localize('com_assistants_allow_sites_you_trust')}
    </p>
  );
}
