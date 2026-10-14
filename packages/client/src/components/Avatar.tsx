import React, { useState, useMemo, useCallback } from 'react';
import type { TUser } from 'librechat-data-provider';
import { Skeleton } from './Skeleton';
import { useAvatar } from '~/hooks';
<<<<<<< HEAD
=======
import { pxToRem } from '~/utils';
>>>>>>> upstream/main
import { UserIcon } from '~/svgs';

export interface AvatarProps {
  user?: TUser;
  size?: number;
  className?: string;
  alt?: string;
  showDefaultWhenEmpty?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  user,
  size = 32,
  className = '',
  alt,
  showDefaultWhenEmpty = true,
}) => {
  const avatarSrc = useAvatar(user);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const avatarSeed = useMemo(
    () => user?.avatar || user?.username || user?.email || '',
    [user?.avatar, user?.username, user?.email],
  );

  const altText = useMemo(
    () => alt || `${user?.name || user?.username || user?.email || ''}'s avatar`,
    [alt, user?.name, user?.username, user?.email],
  );

  const imageSrc = useMemo(() => {
    if (!avatarSeed || imageError) return '';
    return (user?.avatar ?? '') || avatarSrc || '';
  }, [user?.avatar, avatarSrc, avatarSeed, imageError]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  const DefaultAvatar = useCallback(
    () => (
      <div
        style={{
<<<<<<< HEAD
          backgroundColor: 'rgb(121, 137, 255)',
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: 'rgba(240, 246, 252, 0.1) 0px 0px 0px 1px',
        }}
        className={`relative flex items-center justify-center rounded-full p-1 text-text-primary ${className}`}
=======
          width: pxToRem(size),
          height: pxToRem(size),
        }}
        className={`bg-avatar-fill text-avatar-text ring-avatar-edge/10 relative flex items-center justify-center rounded-full p-1 ring-1 ${className}`}
>>>>>>> upstream/main
        aria-hidden="true"
      >
        <UserIcon />
      </div>
    ),
    [size, className],
  );

  if (avatarSeed.length === 0 && showDefaultWhenEmpty) {
    return <DefaultAvatar />;
  }

  if (avatarSeed.length > 0 && !imageError) {
    return (
<<<<<<< HEAD
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        {!imageLoaded && (
          <Skeleton className="rounded-full" style={{ width: `${size}px`, height: `${size}px` }} />
=======
      <div className="relative" style={{ width: pxToRem(size), height: pxToRem(size) }}>
        {!imageLoaded && (
          <Skeleton
            className="rounded-full"
            style={{ width: pxToRem(size), height: pxToRem(size) }}
          />
>>>>>>> upstream/main
        )}

        <img
          style={{
<<<<<<< HEAD
            width: `${size}px`,
            height: `${size}px`,
=======
            width: pxToRem(size),
            height: pxToRem(size),
>>>>>>> upstream/main
            display: imageLoaded ? 'block' : 'none',
          }}
          className={`rounded-full ${className}`}
          src={imageSrc}
          alt={altText}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
    );
  }

  if (imageError && showDefaultWhenEmpty) {
    return <DefaultAvatar />;
  }

  return null;
};

export default Avatar;
