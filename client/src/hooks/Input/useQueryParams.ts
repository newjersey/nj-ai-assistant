<<<<<<< HEAD
import { useEffect, useCallback, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useSearchParams } from 'react-router-dom';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { QueryKeys, EModelEndpoint, PermissionBits } from 'librechat-data-provider';
import type {
  AgentListResponse,
  TEndpointsConfig,
  TStartupConfig,
  TPreset,
} from 'librechat-data-provider';
=======
import { useEffect, useCallback, useRef, useState, useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useSearchParams } from 'react-router-dom';
import {
  QueryKeys,
  parseConvo,
  EModelEndpoint,
  PermissionBits,
  getEndpointField,
  getDefaultParamsEndpoint,
} from 'librechat-data-provider';
import type {
  AgentListResponse,
  TEndpointsConfig,
  TConversation,
  TStartupConfig,
  TPreset,
} from 'librechat-data-provider';
import type { QueryClient } from '@tanstack/react-query';
>>>>>>> upstream/main
import {
  clearModelForNonEphemeralAgent,
  removeUnavailableTools,
  specDisplayFieldReset,
  processValidSettings,
<<<<<<< HEAD
  getModelSpecIconURL,
=======
  mergeQuerySettingsWithSpec,
  getModelSpecPreset,
>>>>>>> upstream/main
  getConvoSwitchLogic,
  logger,
} from '~/utils';
import { useAuthContext, useAgentsMap, useDefaultConvo, useSubmitMessage } from '~/hooks';
import { startupConfigKey, useGetAgentByIdQuery } from '~/data-provider';
import { useChatContext, useChatFormContext } from '~/Providers';
import store from '~/store';

const PROJECT_ID_SEARCH_PARAM = 'projectId';

<<<<<<< HEAD
const injectAgentIntoAgentsMap = (queryClient: QueryClient, agent: any) => {
=======
const injectAgentIntoAgentsMap = (
  queryClient: QueryClient,
  agent: AgentListResponse['data'][number],
) => {
>>>>>>> upstream/main
  const editCacheKey = [QueryKeys.agents, { requiredPermission: PermissionBits.EDIT }];
  const editCache = queryClient.getQueryData<AgentListResponse>(editCacheKey);

  if (editCache?.data && !editCache.data.some((cachedAgent) => cachedAgent.id === agent.id)) {
    // Inject agent into EDIT cache so dropdown can display it
    const updatedCache = {
      ...editCache,
      data: [agent, ...editCache.data],
    };
    queryClient.setQueryData(editCacheKey, updatedCache);
    logger.log('agent', 'Injected URL agent into cache:', agent);
  }
};

<<<<<<< HEAD
/**
 * Hook that processes URL query parameters to initialize chat with specified settings and prompt.
 * Handles model switching, prompt auto-filling, and optional auto-submission with race condition protection.
 * Supports immediate or deferred submission based on whether settings need to be applied first.
 */
export default function useQueryParams({
  textAreaRef,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
=======
/** Stages URL prompts, then auto-submits once normalized conversation settings match. */
export default function useQueryParams({
  textAreaRef,
  routePending = false,
  onBeforePrompt,
  onPromptSettled,
}: {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  routePending?: boolean;
  onBeforePrompt?: () => void;
  onPromptSettled?: (text: string, conversationId: string | null | undefined) => void;
>>>>>>> upstream/main
}) {
  const maxAttempts = 50;
  const attemptsRef = useRef(0);
  const MAX_SETTINGS_WAIT_MS = 3000;
  const processedRef = useRef(false);
  const pendingSubmitRef = useRef(false);
<<<<<<< HEAD
  const settingsAppliedRef = useRef(false);
=======
  const validatingRef = useRef(false);
>>>>>>> upstream/main
  const submissionHandledRef = useRef(false);
  const promptTextRef = useRef<string | null>(null);
  const validSettingsRef = useRef<TPreset | null>(null);
  const settingsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
<<<<<<< HEAD

  const methods = useChatFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
=======
  const requestIdRef = useRef(0);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'preparing' | 'failed'>('idle');

  const routePendingRef = useRef(routePending);
  routePendingRef.current = routePending;
  const onPromptSettledRef = useRef(onPromptSettled);
  onPromptSettledRef.current = onPromptSettled;
  const methods = useChatFormContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const setSearchParamsRef = useRef(setSearchParams);
  setSearchParamsRef.current = setSearchParams;
  const location = useLocation();
  const searchIdentity = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.sort();
    return params.toString();
  }, [searchParams]);
  const requestIdentity = useMemo(() => {
    const params = new URLSearchParams(searchIdentity);
    params.delete(PROJECT_ID_SEARCH_PARAM);
    return params.toString();
  }, [searchIdentity]);
  const previousRequestIdentityRef = useRef(requestIdentity);
  const route = {
    pathname: location.pathname,
    search: searchIdentity,
    projectId: searchParams.get(PROJECT_ID_SEARCH_PARAM),
  };
  const originRouteRef = useRef(route);
  const routeRef = useRef(route);
  routeRef.current = route;
  const originConversationRef = useRef<string | null | undefined>(null);
  const destinationRef = useRef<{
    conversationId: string;
    chatProjectId: TConversation['chatProjectId'];
    route: typeof route;
  } | null>(null);
  const cancelledRef = useRef(false);
  const mountedRef = useRef(true);
>>>>>>> upstream/main
  const getDefaultConversation = useDefaultConvo();
  const modularChat = useRecoilValue(store.modularChat);
  const availableTools = useRecoilValue(store.availableTools);
  const { submitMessage } = useSubmitMessage();
<<<<<<< HEAD
=======
  const submitMessageRef = useRef(submitMessage);
  submitMessageRef.current = submitMessage;
>>>>>>> upstream/main

  const queryClient = useQueryClient();
  const { conversation, newConversation } = useChatContext();

  const urlAgentId = searchParams.get('agent_id') || '';
  const { data: urlAgent } = useGetAgentByIdQuery(urlAgentId);

  const getPreservedSearchParams = useCallback(() => {
    const preservedParams = new URLSearchParams();
<<<<<<< HEAD
    const projectId = searchParams.get(PROJECT_ID_SEARCH_PARAM);
=======
    const projectId = routeRef.current.projectId;
>>>>>>> upstream/main
    if (projectId) {
      preservedParams.set(PROJECT_ID_SEARCH_PARAM, projectId);
    }
    return preservedParams;
<<<<<<< HEAD
  }, [searchParams]);
=======
  }, []);

  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const ownsComposer = useCallback(() => {
    const currentId = conversationRef.current?.conversationId;
    const current = routeRef.current;
    return (
      ((current.projectId === originRouteRef.current.projectId &&
        current.pathname === originRouteRef.current.pathname) ||
        (destinationRef.current != null &&
          current.pathname === destinationRef.current.route.pathname &&
          current.projectId === destinationRef.current.route.projectId)) &&
      (!processedRef.current ||
        currentId == null ||
        currentId === originConversationRef.current ||
        currentId === destinationRef.current?.conversationId) &&
      (destinationRef.current == null ||
        currentId !== destinationRef.current.conversationId ||
        (conversationRef.current?.chatProjectId ?? null) === destinationRef.current.chatProjectId)
    );
  }, []);

  const ownsRequest = useCallback(
    (requestId = requestIdRef.current) =>
      requestId === requestIdRef.current &&
      mountedRef.current &&
      !cancelledRef.current &&
      ((routeRef.current.pathname === originRouteRef.current.pathname &&
        routeRef.current.search === originRouteRef.current.search) ||
        (routeRef.current.pathname === destinationRef.current?.route.pathname &&
          routeRef.current.search === destinationRef.current.route.search)) &&
      ownsComposer(),
    [ownsComposer],
  );

  /** Match the route that useNewConvo writes, including its inherited project. */
  const expectDestination = useCallback((template: Partial<TConversation>) => {
    const conversationId = template.conversationId ?? 'new';
    const params = new URLSearchParams(originRouteRef.current.search);
    params.delete(PROJECT_ID_SEARCH_PARAM);
    const projectId = conversationId === 'new' ? template.chatProjectId || null : null;
    if (projectId) {
      params.set(PROJECT_ID_SEARCH_PARAM, projectId);
    }
    params.sort();
    destinationRef.current = {
      conversationId,
      chatProjectId: template.chatProjectId ?? null,
      route: { pathname: `/c/${conversationId}`, search: params.toString(), projectId },
    };
  }, []);

  const cancelRequest = useCallback(() => {
    requestIdRef.current += 1;
    cancelledRef.current = true;
    processedRef.current = true;
    submissionHandledRef.current = true;
    pendingSubmitRef.current = false;
    validatingRef.current = false;
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
      settingsTimeoutRef.current = null;
    }
    setSubmissionStatus('idle');
  }, []);

  useEffect(() => {
    const identityChanged = previousRequestIdentityRef.current !== requestIdentity;
    previousRequestIdentityRef.current = requestIdentity;
    const prompt = searchParams.get('prompt') || searchParams.get('q');
    if (identityChanged && prompt) {
      /** Project rewrites retain this identity; a new prompt URL starts a separate request. */
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
        settingsTimeoutRef.current = null;
      }
      requestIdRef.current += 1;
      attemptsRef.current = 0;
      processedRef.current = false;
      submissionHandledRef.current = false;
      pendingSubmitRef.current = false;
      validatingRef.current = false;
      promptTextRef.current = null;
      validSettingsRef.current = null;
      originConversationRef.current = null;
      destinationRef.current = null;
      originRouteRef.current = routeRef.current;
      cancelledRef.current = false;
      setSubmissionStatus('idle');
    }
    if (
      ((!submissionHandledRef.current || validatingRef.current) && !ownsRequest()) ||
      (submissionStatus === 'failed' && !ownsComposer())
    ) {
      cancelRequest();
    }
  }, [
    location,
    conversation,
    searchIdentity,
    requestIdentity,
    searchParams,
    submissionStatus,
    ownsComposer,
    ownsRequest,
    cancelRequest,
  ]);

  const areSettingsApplied = useCallback(() => {
    const convo = conversationRef.current;
    if (!validSettingsRef.current || !convo) {
      return false;
    }

    const endpointsConfig = queryClient.getQueryData<TEndpointsConfig>([QueryKeys.endpoints]) ?? {};
    const normalizedSettings = convo.endpoint
      ? parseConvo({
          endpoint: convo.endpoint,
          endpointType: convo.endpointType,
          conversation: validSettingsRef.current,
          defaultParamsEndpoint: getDefaultParamsEndpoint(endpointsConfig, convo.endpoint),
        })
      : validSettingsRef.current;

    for (const [key, value] of Object.entries(validSettingsRef.current)) {
      if (['presetOverride', 'iconURL', 'modelLabel'].includes(key)) {
        continue;
      }

      let expectedValue = normalizedSettings?.[key];
      if (key === 'endpoint' || (key === 'tools' && value != null)) {
        expectedValue = value;
      } else if (key === 'endpointType') {
        expectedValue = value ?? getEndpointField(endpointsConfig, convo.endpoint, 'type');
      }
      if (!isEqual(convo[key], expectedValue)) {
        return false;
      }
    }

    return true;
  }, [queryClient]);
>>>>>>> upstream/main

  /**
   * Applies settings from URL query parameters to create a new conversation.
   * Handles model spec lookup, endpoint normalization, and conversation switching logic.
   * Ensures tools compatibility and preserves existing conversation when appropriate.
   */
  const newQueryConvo = useCallback(
    (_newPreset?: TPreset) => {
      if (!_newPreset) {
        return;
      }
      let newPreset = removeUnavailableTools(_newPreset, availableTools);
      if (newPreset.spec != null && newPreset.spec !== '') {
        const startupConfig = queryClient.getQueryData<TStartupConfig>(startupConfigKey(true));
        const modelSpecs = startupConfig?.modelSpecs?.list ?? [];
        const spec = modelSpecs.find((s) => s.name === newPreset.spec);
<<<<<<< HEAD
        if (!spec) {
          return;
        }
        newPreset = {
          ...spec.preset,
          iconURL: getModelSpecIconURL(spec),
          spec: spec.name,
        } as TPreset;
=======
        if (spec) {
          newPreset = mergeQuerySettingsWithSpec(getModelSpecPreset(spec), newPreset);
        }
        /** Hidden specs remain opaque here and are resolved server-side by name. */
>>>>>>> upstream/main
      }

      let newEndpoint = newPreset.endpoint ?? '';
      const endpointsConfig = queryClient.getQueryData<TEndpointsConfig>([QueryKeys.endpoints]);

      if (newEndpoint && endpointsConfig && !endpointsConfig[newEndpoint]) {
        const normalizedNewEndpoint = newEndpoint.toLowerCase();
        for (const [key, value] of Object.entries(endpointsConfig)) {
          if (
            value &&
            value.type === EModelEndpoint.custom &&
            key.toLowerCase() === normalizedNewEndpoint
          ) {
            newEndpoint = key;
            newPreset.endpoint = key;
            newPreset.endpointType = EModelEndpoint.custom;
            break;
          }
        }
      }

<<<<<<< HEAD
=======
      clearModelForNonEphemeralAgent(newPreset);
      validSettingsRef.current = newPreset;
      if (areSettingsApplied()) {
        return true;
      }

>>>>>>> upstream/main
      const {
        template,
        shouldSwitch,
        isNewModular,
        newEndpointType,
        isCurrentModular,
        isExistingConversation,
      } = getConvoSwitchLogic({
        newEndpoint,
        modularChat,
        conversation,
        endpointsConfig,
      });

      const resetFields = newPreset.spec == null ? specDisplayFieldReset : {};
      if (newPreset.spec == null) {
        Object.assign(template, specDisplayFieldReset);
        newPreset = { ...newPreset, ...specDisplayFieldReset };
      }

      // Sync agent_id from newPreset to template, then clear model if non-ephemeral agent
      if (newPreset.agent_id) {
        template.agent_id = newPreset.agent_id;
      }
      clearModelForNonEphemeralAgent(template);

      const isModular = isCurrentModular && isNewModular && shouldSwitch;
      if (isExistingConversation && isModular) {
        template.endpointType = newEndpointType as EModelEndpoint | undefined;

        const currentConvo = getDefaultConversation({
          /* target endpointType is necessary to avoid endpoint mixing */
          conversation: {
            ...(conversation ?? {}),
            endpointType: template.endpointType,
            ...resetFields,
          },
          preset: template,
          cleanOutput: newPreset.spec != null && newPreset.spec !== '',
        });

        /* We don't reset the latest message, only when changing settings mid-converstion */
        logger.log('conversation', 'Switching conversation from query params', currentConvo);
<<<<<<< HEAD
=======
        expectDestination(currentConvo);
>>>>>>> upstream/main
        newConversation({
          template: currentConvo,
          preset: newPreset,
          keepAddedConvos: true,
<<<<<<< HEAD
        });
        return;
      }

      newConversation({
        template: { chatProjectId: conversation?.chatProjectId ?? null },
        preset: newPreset,
        keepAddedConvos: true,
      });
    },
    [
=======
          keepComposerState: true,
        });
        return true;
      }

      const newTemplate = {
        chatProjectId: conversation?.chatProjectId ?? null,
        ...(newPreset.agent_id ? { agent_id: newPreset.agent_id } : {}),
      };
      expectDestination(newTemplate);
      newConversation({
        template: newTemplate,
        preset: newPreset,
        keepAddedConvos: true,
        keepComposerState: true,
      });
      return true;
    },
    [
      areSettingsApplied,
      expectDestination,
>>>>>>> upstream/main
      queryClient,
      modularChat,
      conversation,
      availableTools,
      newConversation,
      getDefaultConversation,
    ],
  );

<<<<<<< HEAD
  const conversationRef = useRef(conversation);
  conversationRef.current = conversation;

  const areSettingsApplied = useCallback(() => {
    const convo = conversationRef.current;
    if (!validSettingsRef.current || !convo) {
      return false;
    }

    for (const [key, value] of Object.entries(validSettingsRef.current)) {
      if (['presetOverride', 'iconURL', 'spec', 'modelLabel'].includes(key)) {
        continue;
      }

      if (convo[key] !== value) {
        return false;
      }
    }

    return true;
  }, []);

  /**
   * Processes message submission exactly once, preventing duplicate submissions.
   * Sets the prompt text, submits the message, and cleans up URL parameters afterward.
   * Has internal guards to ensure it only executes once regardless of how many times it's called.
   */
  const processSubmission = useCallback(() => {
    if (submissionHandledRef.current || !pendingSubmitRef.current || !promptTextRef.current) {
=======
  const restoreUrlPrompt = useCallback(() => {
    const prompt = promptTextRef.current;
    if (ownsRequest() && prompt != null && methods.getValues('text') !== prompt) {
      methods.setValue('text', prompt, { shouldValidate: true });
    }
  }, [methods, ownsRequest]);

  const settlePrompt = useCallback(() => {
    if (!ownsRequest() || promptTextRef.current == null) {
      return;
    }
    onPromptSettledRef.current?.(
      methods.getValues('text'),
      destinationRef.current?.conversationId ?? conversationRef.current?.conversationId,
    );
  }, [methods, ownsRequest]);

  /** Consumes an auto-submit once, leaving a refused submission in the composer. */
  const processSubmission = useCallback(() => {
    if (
      submissionHandledRef.current ||
      !pendingSubmitRef.current ||
      !promptTextRef.current ||
      !ownsRequest()
    ) {
>>>>>>> upstream/main
      return;
    }

    submissionHandledRef.current = true;
    pendingSubmitRef.current = false;

<<<<<<< HEAD
    methods.setValue('text', promptTextRef.current, { shouldValidate: true });

    methods.handleSubmit((data) => {
      if (data.text?.trim()) {
        submitMessage(data);
        logger.log('conversation', 'Message submitted from query params');
      }
    })();

    setSearchParams(getPreservedSearchParams(), { replace: true });
  }, [methods, submitMessage, setSearchParams, getPreservedSearchParams]);
=======
    setSubmissionStatus('preparing');
    if (settingsTimeoutRef.current) {
      clearTimeout(settingsTimeoutRef.current);
      settingsTimeoutRef.current = null;
    }

    restoreUrlPrompt();
    const requestId = requestIdRef.current;
    validatingRef.current = true;
    const cleanUp = () => {
      if (requestId !== requestIdRef.current) {
        return;
      }
      validatingRef.current = false;
      if (ownsRequest(requestId)) {
        setSearchParamsRef.current(getPreservedSearchParams(), { replace: true });
      }
    };
    methods.handleSubmit(
      (data) => {
        if (!ownsRequest(requestId)) {
          return;
        }
        if (validSettingsRef.current && !areSettingsApplied()) {
          setSubmissionStatus('failed');
          settlePrompt();
          cleanUp();
          return;
        }
        setSubmissionStatus('idle');
        if (data.text?.trim() && submitMessageRef.current(data) !== false) {
          logger.log('conversation', 'Message submitted from query params');
        } else {
          settlePrompt();
        }
        cleanUp();
      },
      () => {
        if (ownsRequest(requestId)) {
          setSubmissionStatus('idle');
          settlePrompt();
        }
        cleanUp();
      },
    )();
  }, [
    methods,
    ownsRequest,
    areSettingsApplied,
    getPreservedSearchParams,
    restoreUrlPrompt,
    settlePrompt,
  ]);
>>>>>>> upstream/main

  useEffect(() => {
    const processQueryParams = () => {
      const queryParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        queryParams[key] = value;
      });

      // Support both 'prompt' and 'q' as query parameters, with 'prompt' taking precedence
      const decodedPrompt = queryParams.prompt || queryParams.q || '';
      const shouldAutoSubmit = queryParams.submit?.toLowerCase() === 'true';
      delete queryParams.prompt;
      delete queryParams.q;
      delete queryParams.submit;
      delete queryParams[PROJECT_ID_SEARCH_PARAM];
      const validSettings = processValidSettings(queryParams);

      return { decodedPrompt, validSettings, shouldAutoSubmit };
    };

<<<<<<< HEAD
    const intervalId = setInterval(() => {
=======
    const requestId = requestIdRef.current;
    const intervalId = setInterval(() => {
      if (requestId !== requestIdRef.current) {
        clearInterval(intervalId);
        return;
      }
>>>>>>> upstream/main
      if (processedRef.current || attemptsRef.current >= maxAttempts) {
        clearInterval(intervalId);
        if (attemptsRef.current >= maxAttempts) {
          console.warn('Max attempts reached, failed to process parameters');
        }
        return;
      }

<<<<<<< HEAD
      attemptsRef.current += 1;

      if (!textAreaRef.current) {
        return;
      }
=======
      if (!ownsRequest()) {
        cancelRequest();
        clearInterval(intervalId);
        return;
      }

      const currentConversation = conversationRef.current;
      if (
        routePendingRef.current ||
        !currentConversation ||
        (currentConversation.conversationId != null &&
          routeRef.current.pathname !== `/c/${currentConversation.conversationId}`)
      ) {
        return;
      }
      attemptsRef.current += 1;
      if (!textAreaRef.current) {
        return;
      }
      const { decodedPrompt, validSettings, shouldAutoSubmit } = processQueryParams();
      if (decodedPrompt && promptTextRef.current == null) {
        promptTextRef.current = decodedPrompt;
        onBeforePrompt?.();
        methods.setValue('text', decodedPrompt, { shouldValidate: true });
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(decodedPrompt.length, decodedPrompt.length);
      }

>>>>>>> upstream/main
      const startupConfig = queryClient.getQueryData<TStartupConfig>(startupConfigKey(true));
      if (!startupConfig) {
        return;
      }
<<<<<<< HEAD

      const { decodedPrompt, validSettings, shouldAutoSubmit } = processQueryParams();
=======
>>>>>>> upstream/main
      const hasSettings = Object.keys(validSettings).length > 0;

      const autoSubmitAllowed = startupConfig.interface?.autoSubmitFromUrl !== false;
      const willAutoSubmit = shouldAutoSubmit && autoSubmitAllowed;

      if (!willAutoSubmit) {
        submissionHandledRef.current = true;
      }

      /** Mark processing as complete and clean up as needed */
      const success = () => {
        processedRef.current = true;
        logger.log('conversation', 'Query parameters processed successfully');
        clearInterval(intervalId);

        // Defer URL cleanup until after submission completes (processSubmission handles it)
<<<<<<< HEAD
        if (!pendingSubmitRef.current) {
          setSearchParams(getPreservedSearchParams(), { replace: true });
        }
      };

      if (hasSettings) {
        validSettingsRef.current = validSettings;
      }

      if (decodedPrompt) {
        promptTextRef.current = decodedPrompt;
      }

      // Handle auto-submission
      if (willAutoSubmit && decodedPrompt) {
        if (hasSettings) {
          // Settings are changing, defer submission
          pendingSubmitRef.current = true;

          // Set a timeout to handle the case where settings might never fully apply
          settingsTimeoutRef.current = setTimeout(() => {
            if (!submissionHandledRef.current && pendingSubmitRef.current) {
              logger.log(
                'conversation',
                'Settings application timeout, proceeding with submission',
              );
              processSubmission();
            }
          }, MAX_SETTINGS_WAIT_MS);
        } else {
          methods.setValue('text', decodedPrompt, { shouldValidate: true });
          textAreaRef.current.focus();
          textAreaRef.current.setSelectionRange(decodedPrompt.length, decodedPrompt.length);

          methods.handleSubmit((data) => {
            if (data.text?.trim()) {
              submitMessage(data);
            }
          })();
        }
      } else if (decodedPrompt) {
        methods.setValue('text', decodedPrompt, { shouldValidate: true });
        textAreaRef.current.focus();
        textAreaRef.current.setSelectionRange(decodedPrompt.length, decodedPrompt.length);
=======
        if ((!willAutoSubmit || !decodedPrompt.trim()) && ownsRequest()) {
          settlePrompt();
          setSearchParamsRef.current(getPreservedSearchParams(), { replace: true });
        }
      };

      originConversationRef.current = conversationRef.current?.conversationId;
      const settingsAccepted = !hasSettings || newQueryConvo(validSettings) === true;
      if (willAutoSubmit && decodedPrompt.trim()) {
        pendingSubmitRef.current = true;
        if (!settingsAccepted) {
          pendingSubmitRef.current = false;
          submissionHandledRef.current = true;
          setSubmissionStatus('failed');
        } else if (!hasSettings || areSettingsApplied()) {
          processSubmission();
        } else {
          setSubmissionStatus('preparing');
          settingsTimeoutRef.current = setTimeout(() => {
            if (requestId !== requestIdRef.current) {
              return;
            }
            settingsTimeoutRef.current = null;
            if (!ownsRequest()) {
              cancelRequest();
              return;
            }
            if (!submissionHandledRef.current && pendingSubmitRef.current) {
              restoreUrlPrompt();
              pendingSubmitRef.current = false;
              submissionHandledRef.current = true;
              setSubmissionStatus('failed');
              logger.log('conversation', 'Settings application timeout, retaining prompt');
              settlePrompt();
              setSearchParamsRef.current(getPreservedSearchParams(), { replace: true });
            }
          }, MAX_SETTINGS_WAIT_MS);
        }
>>>>>>> upstream/main
      } else {
        submissionHandledRef.current = true;
      }

<<<<<<< HEAD
      if (hasSettings && !areSettingsApplied()) {
        newQueryConvo(validSettings);
      }

=======
>>>>>>> upstream/main
      success();
    }, 100);

    return () => {
      clearInterval(intervalId);
<<<<<<< HEAD
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
      }
    };
  }, [
    searchParams,
    methods,
    textAreaRef,
    newQueryConvo,
    newConversation,
    submitMessage,
    setSearchParams,
=======
    };
  }, [
    searchParams,
    requestIdentity,
    methods,
    textAreaRef,
    onBeforePrompt,
    routePending,
    settlePrompt,
    newQueryConvo,
    newConversation,
    submitMessage,
>>>>>>> upstream/main
    getPreservedSearchParams,
    queryClient,
    processSubmission,
    areSettingsApplied,
<<<<<<< HEAD
=======
    restoreUrlPrompt,
    ownsRequest,
    cancelRequest,
>>>>>>> upstream/main
  ]);

  useEffect(() => {
    // Only proceed if we've already processed URL parameters but haven't yet handled submission
    if (
      !processedRef.current ||
      submissionHandledRef.current ||
<<<<<<< HEAD
      settingsAppliedRef.current ||
      !validSettingsRef.current ||
      !conversation
=======
      !pendingSubmitRef.current ||
      !validSettingsRef.current ||
      !conversation ||
      !ownsRequest()
>>>>>>> upstream/main
    ) {
      return;
    }

<<<<<<< HEAD
    if (areSettingsApplied()) {
      settingsAppliedRef.current = true;

      if (pendingSubmitRef.current) {
        if (settingsTimeoutRef.current) {
          clearTimeout(settingsTimeoutRef.current);
          settingsTimeoutRef.current = null;
        }

        logger.log('conversation', 'Settings fully applied, processing submission');
        processSubmission();
      }
    }
  }, [conversation, processSubmission, areSettingsApplied]);
=======
    restoreUrlPrompt();
    if (areSettingsApplied()) {
      logger.log('conversation', 'Settings fully applied, processing submission');
      processSubmission();
    }
  }, [conversation, processSubmission, areSettingsApplied, restoreUrlPrompt, ownsRequest]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (settingsTimeoutRef.current) {
        clearTimeout(settingsTimeoutRef.current);
      }
    };
  }, []);
>>>>>>> upstream/main

  const { isAuthenticated } = useAuthContext();
  const agentsMap = useAgentsMap({ isAuthenticated });
  useEffect(() => {
    if (urlAgent) {
      injectAgentIntoAgentsMap(queryClient, urlAgent);
    }
  }, [urlAgent, queryClient, agentsMap]);
<<<<<<< HEAD
=======

  const clearSettingsError = useCallback(() => setSubmissionStatus('idle'), []);

  return {
    clearSettingsError,
    isPreparing: submissionStatus === 'preparing' && ownsRequest(),
    settingsError: submissionStatus === 'failed' && ownsComposer(),
  };
>>>>>>> upstream/main
}
