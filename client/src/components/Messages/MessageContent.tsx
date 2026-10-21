import React from 'react';
import type { TMessageProps } from '~/common';
import { useMessageProcess, useMemoizedChatContext } from '~/hooks';
import { areMessageRowPropsEqual } from '~/utils';
import ContentRender from './ContentRender';

const MessageContainer = React.memo(function MessageContainer({
  handleScroll,
  children,
}: {
  handleScroll: (event?: unknown) => void;
  children: React.ReactNode;
}) {
  return (
    <div
<<<<<<< HEAD
      className="w-full border-0 bg-transparent text-text-primary"
=======
      className="text-text-primary w-full border-0 bg-transparent"
>>>>>>> upstream/main
      onWheel={handleScroll}
      onTouchMove={handleScroll}
    >
      {children}
    </div>
  );
});

function MessageContent(props: TMessageProps) {
  const { handleScroll, isSubmitting } = useMessageProcess({
    message: props.message,
  });
  const { message } = props;
<<<<<<< HEAD
  const { chatContext, effectiveIsSubmitting } = useMemoizedChatContext(message, isSubmitting);
=======
  const { chatContext, effectiveIsSubmitting, latestMessageId, latestMessageDepth } =
    useMemoizedChatContext(message, isSubmitting);
>>>>>>> upstream/main

  if (!message || typeof message !== 'object') {
    return null;
  }

  return (
    <MessageContainer handleScroll={handleScroll}>
      <div className="m-auto justify-center px-4 py-3 sm:px-0">
<<<<<<< HEAD
        <ContentRender {...props} isSubmitting={effectiveIsSubmitting} chatContext={chatContext} />
=======
        <ContentRender
          {...props}
          chatContext={chatContext}
          isSubmitting={effectiveIsSubmitting}
          latestMessageId={latestMessageId}
          latestMessageDepth={latestMessageDepth}
        />
>>>>>>> upstream/main
      </div>
    </MessageContainer>
  );
}

export default React.memo(MessageContent, areMessageRowPropsEqual);
