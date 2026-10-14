import { useMemo, useCallback, useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import { useRecoilValue } from 'recoil';
import { HatGlasses } from 'lucide-react';
import { easings } from '@react-spring/web';
import { EModelEndpoint } from 'librechat-data-provider';
import { BirthdayIcon, TooltipAnchor, SplitText } from '@librechat/client';
import { useChatContext, useAgentsMapContext, useAssistantsMapContext } from '~/Providers';
import Description, { isHtmlDescription } from '~/components/ui/Description';
import { useGetEndpointsQuery, useGetStartupConfig } from '~/data-provider';
import { NewJerseyLanding } from '~/nj/components/NewJerseyLanding';
import { getIconEndpoint, getEntity, getModelSpec } from '~/utils';
import { useLocalize, useAuthContext, useGreeting } from '~/hooks';
import AgentContact from '~/components/Agents/AgentContact';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
import temporaryStore from '~/store/temporary';
=======
import { HatGlasses } from 'lucide-react';
import { easings } from '@react-spring/web';
import { EModelEndpoint } from 'librechat-data-provider';
import { BirthdayIcon, TooltipAnchor, SplitText, useRemScale } from '@librechat/client';
import { useChatContext, useAgentsMapContext, useAssistantsMapContext } from '~/Providers';
import Description, { isHtmlDescription } from '~/components/ui/Description';
import { useGetEndpointsQuery, useGetStartupConfig } from '~/data-provider';
import { getIconEndpoint, getEntity, getModelSpec } from '~/utils';
import { useLocalize, useAuthContext, useGreeting } from '~/hooks';
import { useChatSettings } from '~/Providers/ChatSettingsContext';
import AgentContact from '~/components/Agents/AgentContact';
import ConvoIcon from '~/components/Endpoints/ConvoIcon';
>>>>>>> upstream/main

const containerClassName =
  'shadow-stroke relative flex h-full items-center justify-center rounded-full bg-presentation text-text-primary dark:after:shadow-none ';

/** Stable references: fresh literals re-initialized SplitText's springs and
 * re-rendered every grapheme span on each Landing render. */
const greetingAnimationFrom = { opacity: 0, transform: 'translate3d(0,50px,0)' };
const greetingAnimationTo = { opacity: 1, transform: 'translate3d(0,0,0)' };

function getTextSizeClass(text: string | undefined | null) {
  if (!text) {
    return 'text-xl sm:text-2xl';
  }

<<<<<<< HEAD
  if (text.length < 40) {
=======
  if (text.length < 56) {
>>>>>>> upstream/main
    return 'text-2xl sm:text-4xl';
  }

  if (text.length < 70) {
    return 'text-xl sm:text-2xl';
  }

  return 'text-lg sm:text-base';
}

export default function Landing({ centerFormOnLanding }: { centerFormOnLanding: boolean }) {
  const { conversation } = useChatContext();
  const agentsMap = useAgentsMapContext();
  const assistantMap = useAssistantsMapContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { user } = useAuthContext();
  const localize = useLocalize();
<<<<<<< HEAD
  const isTemporary = useRecoilValue(temporaryStore.isTemporary);
=======
  const remScale = useRemScale();
  const { isTemporary } = useChatSettings();
>>>>>>> upstream/main

  const [textHasMultipleLines, setTextHasMultipleLines] = useState(false);
  const [lineCount, setLineCount] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const endpointType = useMemo(() => {
    let ep = conversation?.endpoint ?? '';
    if (ep === EModelEndpoint.azureOpenAI) {
      ep = EModelEndpoint.openAI;
    }
    return getIconEndpoint({
      endpointsConfig,
      iconURL: conversation?.iconURL,
      endpoint: ep,
    });
  }, [conversation?.endpoint, conversation?.iconURL, endpointsConfig]);

  const { entity, isAgent, isAssistant } = getEntity({
    endpoint: endpointType,
    agentsMap,
    assistantMap,
    agent_id: conversation?.agent_id,
    assistant_id: conversation?.assistant_id,
  });

  const modelSpec = useMemo(
    () => getModelSpec({ specName: conversation?.spec, startupConfig }),
    [conversation?.spec, startupConfig],
  );

  const brandedSpecLabel = modelSpec?.showOnLanding ? modelSpec.label : '';
  const brandedSpecDescription = (modelSpec?.showOnLanding && modelSpec.description) || '';
  const name = isTemporary ? '' : (entity?.name ?? brandedSpecLabel);
  const description = isTemporary
    ? localize('com_ui_temporary_description')
    : ((entity?.description || brandedSpecDescription || conversation?.greeting) ?? '');
  const descriptionIsHTML = isHtmlDescription(description);
  const selectedAgent =
    isAgent && conversation?.agent_id != null ? agentsMap?.[conversation.agent_id] : undefined;

  const customWelcome =
    typeof startupConfig?.interface?.customWelcome === 'string'
      ? startupConfig.interface.customWelcome
      : undefined;

  const scheduledGreeting = useGreeting(user?.name);

  const handleLineCountChange = useCallback((count: number) => {
    setTextHasMultipleLines(count > 1);
    setLineCount(count);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
<<<<<<< HEAD
  }, [lineCount, description, selectedAgent]);
=======
  }, [lineCount, description, selectedAgent, remScale]);
>>>>>>> upstream/main

  const getDynamicMargin = useMemo(() => {
    let margin = 'mb-0';

    if (lineCount > 2 || (description && description.length > 100)) {
      margin = 'mb-10';
    } else if (lineCount > 1 || (description && description.length > 0)) {
      margin = 'mb-6';
    } else if (textHasMultipleLines) {
      margin = 'mb-4';
    }

    if (contentHeight > 200) {
      margin = 'mb-16';
    } else if (contentHeight > 150) {
      margin = 'mb-12';
    }

    return margin;
  }, [lineCount, description, textHasMultipleLines, contentHeight]);

  const resolvedWelcome =
    customWelcome != null && user?.name
      ? customWelcome.replace(/{{user.name}}/g, user.name)
      : customWelcome;

  const greetingText = isTemporary
    ? localize('com_ui_temporary')
    : (resolvedWelcome ?? scheduledGreeting);

<<<<<<< HEAD
  // NJ: We normally fully customize the landing page, but if you're talking to an agent,
  // we want to make it more obvious what's going on, so we partially revert to normal layout
  if (isAgent && name) {
    return (
      <div
        className={`flex h-full transform-gpu flex-col items-center justify-center pt-10 transition-all duration-200 ${centerFormOnLanding ? 'max-h-full sm:max-h-0' : 'max-h-full'}`}
      >
        <div className="flex flex-col items-center gap-0 p-2 px-2.5 md:max-w-3xl xl:max-w-4xl">
          <h2 className="mb-3 text-center text-3xl font-bold">{name}</h2>
          {description && <p className="text-center text-sm text-text-secondary">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex h-full transform-gpu flex-col items-center justify-center pt-10 transition-all duration-200 ${centerFormOnLanding ? 'max-h-full sm:max-h-0' : 'max-h-full'}`}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-0 p-2">
        {/* NJ: We have our own custom landing content
=======
  return (
    <div
      className={`flex h-full transform-gpu flex-col items-center justify-center pb-16 transition-all duration-200 ${centerFormOnLanding ? 'max-h-full sm:max-h-0' : 'max-h-full'} ${getDynamicMargin}`}
    >
      <div ref={contentRef} className="flex flex-col items-center gap-0 p-2">
>>>>>>> upstream/main
        <div
          className={`flex ${textHasMultipleLines ? 'flex-col' : 'flex-col md:flex-row'} items-center justify-center gap-2`}
        >
          <div className={`relative size-10 justify-center ${textHasMultipleLines ? 'mb-2' : ''}`}>
            {isTemporary ? (
              <div className={containerClassName}>
<<<<<<< HEAD
                <HatGlasses className="h-2/3 w-2/3 text-text-primary" aria-hidden="true" />
=======
                <HatGlasses className="text-text-primary h-2/3 w-2/3" aria-hidden="true" />
>>>>>>> upstream/main
              </div>
            ) : (
              <ConvoIcon
                agentsMap={agentsMap}
                assistantMap={assistantMap}
                conversation={conversation}
                endpointsConfig={endpointsConfig}
                containerClassName={containerClassName}
                context="landing"
<<<<<<< HEAD
                className="h-2/3 w-2/3 text-text-primary"
=======
                className="text-text-primary h-2/3 w-2/3"
>>>>>>> upstream/main
                size={41}
              />
            )}
            {startupConfig?.showBirthdayIcon && (
              <TooltipAnchor
<<<<<<< HEAD
                className="absolute bottom-[27px] right-2"
=======
                className="absolute right-2 bottom-[1.6875rem]"
>>>>>>> upstream/main
                description={localize('com_ui_happy_birthday')}
                aria-label={localize('com_ui_happy_birthday')}
              >
                <BirthdayIcon />
              </TooltipAnchor>
            )}
          </div>
          {((isAgent || isAssistant) && name) || name ? (
            <div className="flex flex-col items-center gap-0 p-2">
              <SplitText
                key={`split-text-${name}`}
                text={name}
<<<<<<< HEAD
                className={`${getTextSizeClass(name)} font-medium text-text-primary`}
=======
                className={`${getTextSizeClass(name)} text-text-primary font-medium`}
>>>>>>> upstream/main
                delay={50}
                textAlign="center"
                animationFrom={greetingAnimationFrom}
                animationTo={greetingAnimationTo}
                easing={easings.easeOutCubic}
                threshold={0}
                rootMargin="0px"
                onLineCountChange={handleLineCountChange}
              />
            </div>
          ) : (
            <SplitText
              key={`split-text-${greetingText}${user?.name ? '-user' : ''}`}
              text={greetingText}
<<<<<<< HEAD
              className={`${getTextSizeClass(greetingText)} font-medium text-text-primary`}
=======
              className={`${getTextSizeClass(greetingText)} text-text-primary font-medium`}
>>>>>>> upstream/main
              delay={50}
              textAlign="center"
              animationFrom={greetingAnimationFrom}
              animationTo={greetingAnimationTo}
              easing={easings.easeOutCubic}
              threshold={0}
              rootMargin="0px"
              onLineCountChange={handleLineCountChange}
            />
          )}
        </div>
        <Description
          allowMedia
          description={description}
          className={
            descriptionIsHTML
<<<<<<< HEAD
              ? 'animate-fadeIn mt-4 flex max-w-md items-center justify-center gap-2 text-center text-sm font-normal text-text-primary [&_img]:inline-block [&_img]:h-4 [&_img]:w-4'
=======
              ? 'animate-fadeIn text-text-primary mt-4 flex max-w-md items-center justify-center gap-2 text-center text-sm font-normal [&_img]:inline-block [&_img]:h-4 [&_img]:w-4'
>>>>>>> upstream/main
              : `animate-fadeIn mt-4 max-w-md text-center text-sm font-normal ${isTemporary ? 'text-text-secondary' : 'text-text-primary'}`
          }
        />
        {selectedAgent && !isTemporary && (
          <AgentContact
            agent={selectedAgent}
            className="animate-fadeIn mt-2 max-w-md justify-center text-center text-sm"
          />
        )}
<<<<<<< HEAD
        */}
        <NewJerseyLanding />
=======
>>>>>>> upstream/main
      </div>
    </div>
  );
}
