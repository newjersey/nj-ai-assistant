import React from 'react';
<<<<<<< HEAD
=======
import { MessageSurfaceContext } from './ui/surface';
>>>>>>> upstream/main
import { cn } from '~/utils';

const MinimalMessages = React.forwardRef(
  (
    props: { children: React.ReactNode; className?: string },
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        className={cn(
<<<<<<< HEAD
          'relative flex w-full grow overflow-hidden bg-surface-secondary',
          props.className,
        )}
      >
        <div className="transition-width relative h-full w-full flex-1 overflow-auto bg-surface-secondary">
          <div className="flex h-full flex-col" role="presentation" tabIndex={0}>
            <div className="flex-1 overflow-hidden overflow-y-auto">
              <div className="dark:gpt-dark-gray relative h-full">
=======
          'bg-surface-secondary relative flex w-full grow overflow-hidden',
          props.className,
        )}
      >
        <div className="bg-surface-secondary relative h-full w-full flex-1 overflow-auto">
          <div className="flex h-full flex-col" role="presentation" tabIndex={0}>
            <div className="flex-1 overflow-hidden overflow-y-auto">
              <div className="relative h-full">
>>>>>>> upstream/main
                <div
                  ref={ref}
                  style={{
                    height: '100%',
                    overflowY: 'auto',
                    width: '100%',
                  }}
                >
                  <div className="flex flex-col pb-9 text-sm">
<<<<<<< HEAD
                    {props.children}
                    <div className="dark:gpt-dark-gray group h-0 w-full flex-shrink-0 dark:border-gray-800/50" />
=======
                    <MessageSurfaceContext.Provider value="bg-surface-secondary">
                      {props.children}
                    </MessageSurfaceContext.Provider>
                    <div className="group h-0 w-full shrink-0" />
>>>>>>> upstream/main
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MinimalMessages;
