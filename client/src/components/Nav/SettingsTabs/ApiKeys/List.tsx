import { Plus, KeyRound } from 'lucide-react';
import { Button, Spinner } from '@librechat/client';
import { useGetAgentApiKeysQuery } from 'librechat-data-provider/react-query';
import { useLocalize } from '~/hooks';
import Item from './Item';

type ListProps = {
  onCreate: () => void;
  headingId?: string;
};

export default function List({ onCreate, headingId }: ListProps) {
  const localize = useLocalize();
  const { data, isLoading, isError, isFetching, refetch } = useGetAgentApiKeysQuery();

  if (isLoading) {
    return (
      <div
        data-testid="api-keys-loading"
<<<<<<< HEAD
        className="flex items-center justify-center rounded-xl border border-border-light py-12"
      >
        <Spinner className="h-6 w-6 text-text-secondary" />
=======
        className="border-border-light flex items-center justify-center rounded-xl border py-12"
      >
        <Spinner tone="secondary" className="h-6 w-6" />
>>>>>>> upstream/main
      </div>
    );
  }

  if (isError && data == null) {
    return (
<<<<<<< HEAD
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border-light px-6 py-10 text-center">
        <p className="text-sm text-text-secondary">{localize('com_ui_api_keys_load_error')}</p>
=======
      <div className="border-border-light flex flex-col items-center gap-3 rounded-xl border px-6 py-10 text-center">
        <p className="text-text-secondary text-sm">{localize('com_ui_api_keys_load_error')}</p>
>>>>>>> upstream/main
        <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
          {localize('com_ui_retry')}
        </Button>
      </div>
    );
  }

  const keys = data?.keys ?? [];

  if (keys.length === 0) {
    return (
<<<<<<< HEAD
      <div className="flex flex-col items-center gap-3 rounded-xl border border-border-light px-6 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary text-text-secondary">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-text-primary">
            {localize('com_ui_api_keys_empty_title')}
          </h3>
          <p className="mx-auto max-w-xs text-sm text-text-secondary">
=======
      <div className="border-border-light flex flex-col items-center gap-3 rounded-xl border px-6 py-12 text-center">
        <span className="bg-surface-secondary text-text-secondary flex h-12 w-12 items-center justify-center rounded-full">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <h3 className="text-text-primary text-sm font-medium">
            {localize('com_ui_api_keys_empty_title')}
          </h3>
          <p className="text-text-secondary mx-auto max-w-xs text-sm">
>>>>>>> upstream/main
            {localize('com_ui_api_keys_empty_text')}
          </p>
        </div>
        <Button size="sm" className="mt-1 gap-1.5" onClick={onCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          {localize('com_ui_create_api_key')}
        </Button>
      </div>
    );
  }

  return (
    <ul
<<<<<<< HEAD
      className="divide-y divide-border-light overflow-hidden rounded-xl border border-border-light"
=======
      className="divide-border-light border-border-light divide-y overflow-hidden rounded-xl border"
>>>>>>> upstream/main
      aria-labelledby={headingId}
      aria-label={headingId == null ? localize('com_ui_agent_api_keys') : undefined}
    >
      {keys.map((apiKey) => (
        <Item key={apiKey.id} apiKey={apiKey} />
      ))}
    </ul>
  );
}
