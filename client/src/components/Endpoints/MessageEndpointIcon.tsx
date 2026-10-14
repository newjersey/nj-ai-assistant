import { memo } from 'react';
import { Feather } from 'lucide-react';
import { EModelEndpoint, isAssistantsEndpoint } from 'librechat-data-provider';
<<<<<<< HEAD
import { AssistantIcon, TooltipAnchor, ProviderAvatar } from '@librechat/client';
import type { IconProps } from '~/common';
import NewJerseyIcon from '~/nj/svgs/NewJerseyIcon';
=======
import { pxToRem, AssistantIcon, TooltipAnchor, ProviderAvatar } from '@librechat/client';
import type { IconProps } from '~/common';
>>>>>>> upstream/main
import { useProviderIcon } from '~/hooks/Endpoint';
import { cn } from '~/utils';

const MessageEndpointIcon: React.FC<IconProps> = (props) => {
  const {
    error,
    iconURL = '',
    endpoint,
    size = 30,
    model = '',
    assistantName,
    agentName,
    endpointsConfig,
  } = props;
  const { provider, imageURL } = useProviderIcon({ endpoint, iconURL, endpointsConfig });

  const assistantsIcon = {
    icon: iconURL ? (
      <div className="relative flex h-6 w-6 items-center justify-center">
        <TooltipAnchor
          description={assistantName ?? ''}
          style={{
<<<<<<< HEAD
            width: size,
            height: size,
=======
            width: pxToRem(size),
            height: pxToRem(size),
>>>>>>> upstream/main
          }}
          className={cn('overflow-hidden rounded-full', props.className ?? '')}
        >
          <img
            className="shadow-stroke h-full w-full object-cover"
            src={iconURL}
            alt={assistantName}
            style={{ height: '80', width: '80' }}
          />
        </TooltipAnchor>
      </div>
    ) : (
      <div className="h-6 w-6">
        <div className="shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
<<<<<<< HEAD
          <AssistantIcon className="h-2/3 w-2/3 text-text-tertiary" />
=======
          <AssistantIcon className="text-text-tertiary h-2/3 w-2/3" />
>>>>>>> upstream/main
        </div>
      </div>
    ),
    name: endpoint,
  };

  const agentsIcon = {
    icon: iconURL ? (
      <div className="relative flex h-6 w-6 items-center justify-center">
        <TooltipAnchor
          description={agentName ?? ''}
          style={{
<<<<<<< HEAD
            width: size,
            height: size,
=======
            width: pxToRem(size),
            height: pxToRem(size),
>>>>>>> upstream/main
          }}
          className={cn('overflow-hidden rounded-full', props.className ?? '')}
        >
          <img
            className="shadow-stroke h-full w-full object-cover"
            src={iconURL}
            alt={agentName}
            style={{ height: '80', width: '80' }}
          />
        </TooltipAnchor>
      </div>
    ) : (
      <div className="h-6 w-6">
        <div className="shadow-stroke flex h-6 w-6 items-center justify-center overflow-hidden rounded-full">
<<<<<<< HEAD
          <Feather className="h-2/3 w-2/3 text-text-tertiary" aria-hidden="true" />
=======
          <Feather className="text-text-tertiary h-2/3 w-2/3" aria-hidden="true" />
>>>>>>> upstream/main
        </div>
      </div>
    ),
    name: endpoint,
  };

  const errorBadge = error === true && (
<<<<<<< HEAD
    <span className="absolute right-0 top-[20px] -mr-2 flex h-3 w-3 items-center justify-center rounded-full border border-surface-primary bg-status-error-strong text-[10px] text-text-on-status">
=======
    <span className="border-surface-primary bg-status-error-strong text-text-on-status absolute top-[1.25rem] right-0 -mr-2 flex h-3 w-3 items-center justify-center rounded-full border text-[10px]">
>>>>>>> upstream/main
      !
    </span>
  );

  if (isAssistantsEndpoint(endpoint)) {
    return assistantsIcon.icon;
  }

  if (endpoint === EModelEndpoint.agents) {
    return agentsIcon.icon;
  }

<<<<<<< HEAD
  // NJ: Every other model is our Bedrock-backed NJ AI Assistant, so brand it with the NJ logo
  return (
    <div
      title="NJ AI Assistant"
      style={{ width: size, height: size }}
      className={cn(
        'relative flex h-9 w-9 items-center justify-center rounded-sm p-1 text-text-primary',
        props.className ?? '',
      )}
    >
      <NewJerseyIcon />
      {errorBadge}
    </div>
  );

=======
>>>>>>> upstream/main
  if (imageURL != null) {
    return (
      <div
        title={endpoint ?? ''}
        style={{
<<<<<<< HEAD
          width: size,
          height: size,
        }}
        className={cn(
          'relative flex h-9 w-9 items-center justify-center rounded-sm p-1 text-text-primary',
=======
          width: pxToRem(size),
          height: pxToRem(size),
        }}
        className={cn(
          'text-text-primary relative flex h-9 w-9 items-center justify-center rounded-sm p-1',
>>>>>>> upstream/main
          props.className ?? '',
        )}
      >
        <div className="h-6 w-6">
          <div className="overflow-hidden rounded-full">
<<<<<<< HEAD
            {/* NJ: Comment this since it to TS error
            <img className="h-full w-full object-contain" src={imageURL} alt={`${endpoint} Icon`} />
            */}
=======
            <img className="h-full w-full object-contain" src={imageURL} alt={`${endpoint} Icon`} />
>>>>>>> upstream/main
          </div>
        </div>
        {errorBadge}
      </div>
    );
  }

  return (
    <ProviderAvatar provider={provider} model={model} size={size} className={props.className}>
      {errorBadge}
    </ProviderAvatar>
  );
};

export default memo(MessageEndpointIcon);
