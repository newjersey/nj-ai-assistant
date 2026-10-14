<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Feather } from 'lucide-react';
import { Skeleton } from '@librechat/client';
=======
import React, { useState } from 'react';
import { Feather } from 'lucide-react';
import { Skeleton } from '@librechat/client';
import { isEphemeralAgentId, parseEphemeralAgentId } from 'librechat-data-provider';
>>>>>>> upstream/main
import type t from 'librechat-data-provider';

/**
 * Extracts the avatar URL from an agent's avatar property
 * Handles both string and object formats
 */
export const getAgentAvatarUrl = (agent: t.Agent | null | undefined): string | null => {
  if (!agent?.avatar) {
    return null;
  }

  if (typeof agent.avatar === 'string') {
    return agent.avatar;
  }

  if (agent.avatar && typeof agent.avatar === 'object' && 'filepath' in agent.avatar) {
    return agent.avatar.filepath;
  }

  return null;
};

const LazyAgentAvatar = ({
  url,
  alt,
  imgClass,
<<<<<<< HEAD
=======
  fallbackClass,
>>>>>>> upstream/main
}: {
  url: string;
  alt: string;
  imgClass: string;
<<<<<<< HEAD
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [url]);
=======
  fallbackClass: string;
}) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  if (status === 'error') {
    return <Feather className={fallbackClass} strokeWidth={1.5} aria-hidden="true" />;
  }
>>>>>>> upstream/main

  return (
    <>
      <img
        src={url}
        alt={alt}
<<<<<<< HEAD
        className={imgClass}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      />
      {!isLoaded && <Skeleton className="absolute inset-0 rounded-full" aria-hidden="true" />}
=======
        className={`${imgClass} transition-opacity duration-150 motion-reduce:transition-none ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
      {status === 'loading' && (
        <Skeleton className="absolute inset-0 rounded-full" aria-hidden="true" />
      )}
>>>>>>> upstream/main
    </>
  );
};

/**
<<<<<<< HEAD
 * Renders an agent avatar with fallback to Bot icon
 * Consistent across all agent displays
=======
 * Renders a fixed-size avatar with an icon fallback for missing or failed images.
 *
 * `xs` fills the gap between `icon` (20px, meant to sit inline with a line of text)
 * and `sm` (48-56px): a compact card needs an avatar that reads as a picture without
 * dominating the row it shares with the agent name.
>>>>>>> upstream/main
 */
export const renderAgentAvatar = (
  agent: t.Agent | null | undefined,
  options: {
<<<<<<< HEAD
    size?: 'icon' | 'sm' | 'md' | 'lg' | 'xl';
=======
    size?: 'icon' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
>>>>>>> upstream/main
    className?: string;
    showBorder?: boolean;
  } = {},
): React.ReactElement => {
  const { size = 'md', className = '', showBorder = true } = options;

  const avatarUrl = getAgentAvatarUrl(agent);

  // Size mappings for responsive design
  const sizeClasses = {
    icon: 'h-5 w-5',
<<<<<<< HEAD
=======
    xs: 'h-8 w-8 sm:h-10 sm:w-10',
>>>>>>> upstream/main
    sm: 'h-12 w-12 sm:h-14 sm:w-14',
    md: 'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24',
    lg: 'h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28',
    xl: 'h-24 w-24',
  };

  const iconSizeClasses = {
    icon: 'h-4 w-4',
<<<<<<< HEAD
=======
    xs: 'h-5 w-5 sm:h-6 sm:w-6',
>>>>>>> upstream/main
    sm: 'h-6 w-6 sm:h-7 sm:w-7',
    md: 'h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10',
    lg: 'h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12',
    xl: 'h-10 w-10',
  };

<<<<<<< HEAD
  const placeholderSizeClasses = {
    icon: 'h-5 w-5',
    sm: 'h-10 w-10 sm:h-12 sm:w-12',
    md: 'h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20',
    lg: 'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24',
    xl: 'h-20 w-20',
  };

  const borderClasses = showBorder ? 'border-1 border-border-medium' : '';
=======
  // Tailwind v3 never generated border-1, so avatars have never painted a border; deliberate width belongs in a follow-up.
  const borderClasses = showBorder ? 'border-border-medium' : '';
>>>>>>> upstream/main

  if (avatarUrl) {
    return (
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}
      >
        <LazyAgentAvatar
<<<<<<< HEAD
          url={avatarUrl}
          alt={`${agent?.name || 'Agent'} avatar`}
          imgClass={`${sizeClasses[size]} rounded-full object-cover shadow-lg ${borderClasses}`}
=======
          key={avatarUrl}
          url={avatarUrl}
          alt={`${agent?.name || 'Agent'} avatar`}
          imgClass={`${sizeClasses[size]} rounded-full object-cover shadow-lg ${borderClasses}`}
          fallbackClass={`text-text-primary ${iconSizeClasses[size]}`}
>>>>>>> upstream/main
        />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <Feather className={`text-text-primary ${iconSizeClasses[size]}`} strokeWidth={1.5} />
    </div>
  );
};

/**
 * Gets the display name for a contact (prioritizes name over email)
 */
export const getContactDisplayName = (agent: t.Agent | null | undefined): string | null => {
  if (!agent) return null;

  const supportName = (agent as any).support_contact?.name;
  const supportEmail = (agent as any).support_contact?.email;
  const authorName = (agent as any).authorName;

  return supportName || authorName || supportEmail || null;
};

// All hardcoded category constants removed - now using database-driven categories
<<<<<<< HEAD
=======

/**
 * The provider and model an agents-endpoint conversation runs on: the saved
 * agent's, or the target encoded in an ephemeral agent id. A saved agent that
 * has not loaded yet resolves to nothing, so callers fail closed.
 */
export const resolveAgentTarget = (
  agentId: string | null | undefined,
  agent: Pick<t.Agent, 'provider' | 'model'> | null | undefined,
): { provider: string; model: string } | undefined => {
  if (agent != null) {
    return { provider: agent.provider ?? '', model: agent.model ?? '' };
  }
  if (agentId == null || !isEphemeralAgentId(agentId)) {
    return undefined;
  }
  const parsed = parseEphemeralAgentId(agentId);
  return parsed == null ? undefined : { provider: parsed.endpoint, model: parsed.model };
};
>>>>>>> upstream/main
