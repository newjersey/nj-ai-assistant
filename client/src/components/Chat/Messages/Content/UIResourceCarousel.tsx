import React, { useState } from 'react';
import { Button } from '@librechat/client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { UIResource } from 'librechat-data-provider';
import UIResourceRenderer, { isSupportedUIResource } from '~/components/MCPUIResource/Renderer';
<<<<<<< HEAD
import { useOptionalMessagesOperations } from '~/Providers';
import { handleUIAction } from '~/utils';
=======
import { useMessagePartsHost } from '~/Providers/MessagePartsHostContext';
import { cn, handleUIAction } from '~/utils';
>>>>>>> upstream/main
import { useLocalize } from '~/hooks';

interface UIResourceCarouselProps {
  uiResources: UIResource[];
}

const UIResourceCarousel: React.FC<UIResourceCarouselProps> = React.memo(({ uiResources }) => {
  const localize = useLocalize();
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
<<<<<<< HEAD
  const { ask } = useOptionalMessagesOperations();
=======
  const ask = useMessagePartsHost().useMessagesAsk();
>>>>>>> upstream/main
  const supportedUIResources = React.useMemo(
    () => uiResources.filter(isSupportedUIResource),
    [uiResources],
  );

  const handleScroll = React.useCallback(() => {
    if (!scrollContainerRef.current) return;

<<<<<<< HEAD
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
=======
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    /** In RTL `scrollLeft` is 0 at the right edge and negative toward the left; normalize to the offset from the left edge. */
    const maxScroll = scrollWidth - clientWidth;
    const fromLeft =
      getComputedStyle(container).direction === 'rtl' ? maxScroll + scrollLeft : scrollLeft;
    setShowLeftArrow(fromLeft > 0);
    setShowRightArrow(fromLeft < maxScroll - 10);
>>>>>>> upstream/main
  }, []);

  const scroll = React.useCallback((direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;

    const viewportWidth = scrollContainerRef.current.clientWidth;
    const scrollAmount = Math.floor(viewportWidth * 0.9);
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const newScroll =
      direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  }, []);

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, supportedUIResources.length]);

  if (supportedUIResources.length === 0) {
    return null;
  }

  if (supportedUIResources.length === 1) {
    return (
      <UIResourceRenderer
        resource={supportedUIResources[0]}
        onUIAction={async (result) => handleUIAction(result, ask)}
        htmlProps={{
          autoResizeIframe: { width: true, height: true },
        }}
      />
    );
  }

  return (
    <div
      className="relative mb-4 pt-3"
      onMouseEnter={() => setIsContainerHovered(true)}
      onMouseLeave={() => setIsContainerHovered(false)}
    >
      <div
<<<<<<< HEAD
        className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface-primary to-transparent transition-opacity duration-500 ease-in-out ${
=======
        className={`from-surface-primary pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r to-transparent transition-opacity duration-500 ease-in-out ${
>>>>>>> upstream/main
          showLeftArrow ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
<<<<<<< HEAD
        className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface-primary to-transparent transition-opacity duration-500 ease-in-out ${
=======
        className={`from-surface-primary pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l to-transparent transition-opacity duration-500 ease-in-out ${
>>>>>>> upstream/main
          showRightArrow ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {showLeftArrow && (
        <Button
<<<<<<< HEAD
          variant="ghost"
          size="icon"
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 z-20 h-auto w-auto -translate-y-1/2 rounded-xl bg-surface-fixed p-2 text-text-fixed shadow-lg transition-all duration-200 hover:scale-110 hover:bg-surface-fixed-hover hover:text-text-fixed hover:shadow-xl active:scale-95 ${
            isContainerHovered ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
=======
          variant="carousel-nav"
          onClick={() => scroll('left')}
          className={cn(
            'absolute top-1/2 left-2 z-20 -translate-y-1/2 transition-all duration-200 hover:scale-110 active:scale-95',
            isContainerHovered ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
>>>>>>> upstream/main
          aria-label={localize('com_ui_scroll_left')}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth"
      >
        {supportedUIResources.map((uiResource, index) => {
          const height = 360;
          const width = 230;

          return (
            <div
              key={index}
<<<<<<< HEAD
              className="flex-shrink-0 transform-gpu transition-all duration-300 ease-out animate-in fade-in-0 slide-in-from-bottom-5"
=======
              className="animate-in fade-in-0 slide-in-from-bottom-5 shrink-0 transform-gpu transition-all duration-300 ease-out"
>>>>>>> upstream/main
              style={{
                width: `${width}px`,
                minHeight: `${height}px`,
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex h-full flex-col">
                <UIResourceRenderer
                  resource={uiResource}
                  onUIAction={async (result) => handleUIAction(result, ask)}
                  htmlProps={{
                    autoResizeIframe: { width: true, height: true },
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {showRightArrow && (
        <Button
<<<<<<< HEAD
          variant="ghost"
          size="icon"
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 z-20 h-auto w-auto -translate-y-1/2 rounded-xl bg-surface-fixed p-2 text-text-fixed shadow-lg transition-all duration-200 hover:scale-110 hover:bg-surface-fixed-hover hover:text-text-fixed hover:shadow-xl active:scale-95 ${
            isContainerHovered ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
=======
          variant="carousel-nav"
          onClick={() => scroll('right')}
          className={cn(
            'absolute top-1/2 right-2 z-20 -translate-y-1/2 transition-all duration-200 hover:scale-110 active:scale-95',
            isContainerHovered ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
>>>>>>> upstream/main
          aria-label={localize('com_ui_scroll_right')}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
});

export default UIResourceCarousel;
