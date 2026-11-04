import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
<<<<<<< HEAD
=======
import { announceOAuthSettled } from '~/data-provider';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

export default function OAuthSuccess() {
  const localize = useLocalize();
  const [searchParams] = useSearchParams();
  const [secondsLeft, setSecondsLeft] = useState(3);
  const serverName = searchParams.get('serverName');
<<<<<<< HEAD
=======
  const flowId = searchParams.get('flow') ?? undefined;

  useEffect(() => {
    /** Reaches the window that started the sign-in even when the provider severed the popup. */
    announceOAuthSettled({ outcome: 'succeeded', flowId });
  }, [flowId]);
>>>>>>> upstream/main

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          window.close();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
<<<<<<< HEAD
    <div className="flex min-h-screen items-center justify-center bg-surface-secondary p-8">
      <div className="w-full max-w-md rounded-xl bg-surface-primary p-8 text-center shadow-lg">
        <h1 className="mb-4 text-3xl font-bold text-text-primary">
          {localize('com_ui_oauth_success_title') || 'Authentication Successful'}
        </h1>
        <p className="mb-2 text-sm text-text-secondary">
          {localize('com_ui_oauth_success_description') ||
            'Your authentication was successful. This window will close in'}{' '}
          <span className="font-medium text-accent-primary">{secondsLeft}</span>{' '}
          {localize('com_ui_seconds') || 'seconds'}.
        </p>
        {serverName && (
          <p className="mt-4 text-xs text-text-tertiary">
=======
    <div className="bg-surface-secondary flex min-h-screen items-center justify-center p-8">
      <div className="bg-surface-primary w-full max-w-md rounded-xl p-8 text-center shadow-lg">
        <h1 className="text-text-primary mb-4 text-3xl font-bold">
          {localize('com_ui_oauth_success_title') || 'Authentication Successful'}
        </h1>
        <p className="text-text-secondary mb-2 text-sm">
          {localize('com_ui_oauth_success_description') ||
            'Your authentication was successful. This window will close in'}{' '}
          <span className="text-accent-primary font-medium">{secondsLeft}</span>{' '}
          {localize('com_ui_seconds') || 'seconds'}.
        </p>
        {serverName && (
          <p className="text-text-tertiary mt-4 text-xs">
>>>>>>> upstream/main
            {localize('com_ui_oauth_connected_to') || 'Connected to'}:{' '}
            <span className="font-medium">{serverName}</span>
          </p>
        )}
      </div>
    </div>
  );
}
