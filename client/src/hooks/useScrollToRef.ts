<<<<<<< HEAD
import { RefObject, useCallback } from 'react';
import throttle from 'lodash/throttle';
=======
import { useEffect, useMemo, useRef } from 'react';
import throttle from 'lodash/throttle';
import type { RefObject } from 'react';
>>>>>>> upstream/main

type TUseScrollToRef = {
  targetRef: RefObject<HTMLDivElement>;
  callback: () => void;
  smoothCallback: () => void;
};

type ThrottledFunction = (() => void) & {
  cancel: () => void;
  flush: () => void;
};

type ScrollToRefReturn = {
  scrollToRef?: ThrottledFunction;
  handleSmoothToRef: React.MouseEventHandler<HTMLButtonElement>;
};

export default function useScrollToRef({
  targetRef,
  callback,
  smoothCallback,
}: TUseScrollToRef): ScrollToRefReturn {
<<<<<<< HEAD
  const logAndScroll = (behavior: 'instant' | 'smooth', callbackFn: () => void) => {
    // Debugging:
    // console.log(`Scrolling with behavior: ${behavior}, Time: ${new Date().toISOString()}`);
    targetRef.current?.scrollIntoView({ behavior });
    callbackFn();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollToRef = useCallback(
    throttle(() => logAndScroll('instant', callback), 145, { leading: true }),
    [targetRef],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollToRefSmooth = useCallback(
    throttle(() => logAndScroll('smooth', smoothCallback), 750, { leading: true }),
    [targetRef],
  );

=======
  const callbacksRef = useRef({ callback, smoothCallback });
  useEffect(() => {
    callbacksRef.current = { callback, smoothCallback };
  }, [callback, smoothCallback]);

  const scrollToRef = useMemo(
    () =>
      throttle(
        () => {
          targetRef.current?.scrollIntoView({ behavior: 'instant' });
          callbacksRef.current.callback();
        },
        145,
        { leading: true },
      ),
    [targetRef],
  );

  const scrollToRefSmooth = useMemo(
    () =>
      throttle(
        () => {
          targetRef.current?.scrollIntoView({ behavior: 'smooth' });
          callbacksRef.current.smoothCallback();
        },
        750,
        { leading: true },
      ),
    [targetRef],
  );

  useEffect(
    () => () => {
      scrollToRef.cancel();
      scrollToRefSmooth.cancel();
    },
    [scrollToRef, scrollToRefSmooth],
  );

>>>>>>> upstream/main
  const handleSmoothToRef: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    scrollToRefSmooth();
  };

  return {
    scrollToRef,
    handleSmoothToRef,
  };
}
