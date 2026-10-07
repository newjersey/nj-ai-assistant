import { Button, EmptyState } from '@librechat/client';
import { CalendarClock, TriangleAlert } from 'lucide-react';
import { useLocalize } from '~/hooks';

interface ScheduleEmptyStateProps {
  canCreate?: boolean;
  isError?: boolean;
<<<<<<< HEAD
=======
  isFiltered?: boolean;
>>>>>>> upstream/main
  onRetry?: () => void;
}

export default function ScheduleEmptyState({
  canCreate = false,
  isError = false,
<<<<<<< HEAD
=======
  isFiltered = false,
>>>>>>> upstream/main
  onRetry,
}: ScheduleEmptyStateProps) {
  const localize = useLocalize();

  if (isError) {
    return (
      <EmptyState
        icon={TriangleAlert}
        title={localize('com_ui_schedules_error')}
        action={
          <Button type="button" variant="outline" size="sm" onClick={onRetry}>
            {localize('com_ui_retry')}
          </Button>
        }
      />
    );
  }

<<<<<<< HEAD
=======
  if (isFiltered) {
    return <EmptyState icon={CalendarClock} description={localize('com_ui_no_schedules_match')} />;
  }

>>>>>>> upstream/main
  return (
    <EmptyState
      icon={CalendarClock}
      title={localize('com_ui_no_schedules_title')}
      // Only invite creation where the panel actually offers it: a USE-only role
      // has no create button, so telling it to create one is a dead end.
      description={canCreate ? localize('com_ui_no_schedules') : undefined}
    />
  );
}
