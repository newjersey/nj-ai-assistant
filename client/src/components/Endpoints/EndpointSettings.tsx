import { useRecoilValue } from 'recoil';
import { useGetModelsQuery } from 'librechat-data-provider/react-query';
import { getEndpointField, SettingsViews } from 'librechat-data-provider';
import type { TConversation } from 'librechat-data-provider';
import type { TSettingsProps } from '~/common';
import { useGetEndpointsQuery } from '~/data-provider';
import { getSettings } from './Settings';
import { cn } from '~/utils';
import store from '~/store';

export default function Settings({
  conversation,
  setOption,
  isPreset = false,
  className = '',
}: TSettingsProps) {
  const modelsQuery = useGetModelsQuery();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const currentSettingsView = useRecoilValue(store.currentSettingsView);
  const endpointType = getEndpointField(endpointsConfig, conversation?.endpoint ?? '', 'type');
  const endpoint = endpointType ?? conversation?.endpoint ?? '';
  if (!endpoint || currentSettingsView !== SettingsViews.default) {
    return null;
  }

  const { settings, multiViewSettings } = getSettings();
  const { endpoint: _endpoint } = conversation as TConversation;
  const models = modelsQuery.data?.[_endpoint ?? ''] ?? [];
  const OptionComponent = settings[endpoint];

  if (OptionComponent) {
    return (
<<<<<<< HEAD
      <div className={cn('h-[500px] overflow-y-auto md:mb-2 md:h-[350px]', className)}>
=======
      <div
        className={cn(
          'h-[min(31.25rem,70vh)] overflow-y-auto md:mb-2 md:h-[min(21.875rem,70vh)]',
          className,
        )}
      >
>>>>>>> upstream/main
        <OptionComponent
          conversation={conversation}
          setOption={setOption}
          models={models}
          isPreset={isPreset}
        />
      </div>
    );
  }

  const MultiViewComponent = multiViewSettings[endpoint];

  if (MultiViewComponent == null) {
    return null;
  }

  return (
<<<<<<< HEAD
    <div className={cn('hide-scrollbar h-[500px] overflow-y-auto md:mb-2 md:h-[350px]', className)}>
=======
    <div
      className={cn(
        'hide-scrollbar h-[min(31.25rem,70vh)] overflow-y-auto md:mb-2 md:h-[min(21.875rem,70vh)]',
        className,
      )}
    >
>>>>>>> upstream/main
      <MultiViewComponent conversation={conversation} models={models} isPreset={isPreset} />
    </div>
  );
}
