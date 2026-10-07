import React, { memo, useState } from 'react';
import { AlertCircle } from 'lucide-react';
<<<<<<< HEAD
import { ProviderIcon } from '@librechat/client';
=======
import { pxToRem, ProviderIcon } from '@librechat/client';
>>>>>>> upstream/main
import { resolveProviderId } from 'librechat-data-provider';
import { EntityEndpointMark, isEntityEndpoint } from '~/components/Endpoints/EntityEndpointMark';
import CustomIcon from '~/components/ui/CustomIcon';
import { isImageURL } from '~/utils/icons';

interface GroupIconProps {
  iconURL: string;
  groupName: string;
}

const GroupIcon: React.FC<GroupIconProps> = ({ iconURL, groupName }) => {
  const [imageError, setImageError] = useState(false);
  const provider = resolveProviderId(iconURL);

  const handleImageError = () => {
    setImageError(true);
  };

  if (isEntityEndpoint(iconURL)) {
    return (
<<<<<<< HEAD
      <div className="relative" style={{ width: 20, height: 20, margin: '2px' }} title={groupName}>
=======
      <div
        className="relative"
        style={{ width: pxToRem(20), height: pxToRem(20), margin: pxToRem(2) }}
        title={groupName}
      >
>>>>>>> upstream/main
        <EntityEndpointMark endpoint={iconURL} />
      </div>
    );
  }

  if (provider || !isImageURL(iconURL) || imageError) {
    return (
<<<<<<< HEAD
      <div className="relative" style={{ width: 20, height: 20, margin: '2px' }}>
        <ProviderIcon provider={provider} size={20} className="icon-md shrink-0" />
        {imageError && (
          <div
            className="absolute flex items-center justify-center rounded-full bg-surface-destructive"
            style={{ width: '14px', height: '14px', top: 0, right: 0 }}
          >
            <AlertCircle size={10} className="text-text-on-status" />
=======
      <div
        className="relative"
        style={{ width: pxToRem(20), height: pxToRem(20), margin: pxToRem(2) }}
      >
        <ProviderIcon provider={provider} size={20} className="icon-md shrink-0" />
        {imageError && (
          <div
            className="bg-surface-destructive absolute flex items-center justify-center rounded-full"
            style={{ width: pxToRem(14), height: pxToRem(14), top: 0, right: 0 }}
          >
            <AlertCircle className="text-text-on-status size-2.5" />
>>>>>>> upstream/main
          </div>
        )}
      </div>
    );
  }

  return (
    <div
<<<<<<< HEAD
      className="icon-md shrink-0 overflow-hidden rounded-full text-text-primary"
      style={{ width: 20, height: 20 }}
=======
      className="icon-md text-text-primary shrink-0 overflow-hidden rounded-full"
      style={{ width: pxToRem(20), height: pxToRem(20) }}
>>>>>>> upstream/main
    >
      <CustomIcon
        src={iconURL}
        alt={groupName}
        className="h-full w-full object-cover"
        onError={handleImageError}
      />
    </div>
  );
};

export default memo(GroupIcon);
