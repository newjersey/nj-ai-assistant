import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import TagManager from 'react-gtm-module';
import { installCloudFrontImageRetry } from '@librechat/client';
import {
  getTokenHeader,
  LocalStorageKeys,
  PermissionTypes,
  Permissions,
  resolveModelSpecEndpoint,
} from 'librechat-data-provider';
import type { TStartupConfig, TUser } from 'librechat-data-provider';
<<<<<<< HEAD
import { useMCPToolsQuery, useMCPServersQuery } from '~/data-provider';
import { cleanupTimestampedStorage } from '~/utils/timestamps';
import useSpeechSettingsInit from './useSpeechSettingsInit';
import { useHasAccess, useCatalogReady } from '~/hooks';
=======
import { cleanupTimestampedStorage } from '~/utils/timestamps';
import useSpeechSettingsInit from './useSpeechSettingsInit';
import { useHasAccess, useCatalogReady } from '~/hooks';
import { useMCPServersQuery } from '~/data-provider';
import { setDocumentTitle } from '~/utils';
>>>>>>> upstream/main
import store from '~/store';

export default function useAppStartup({
  startupConfig,
  user,
<<<<<<< HEAD
  mcpWarmupAllowed,
}: {
  startupConfig?: TStartupConfig;
  user?: TUser;
  mcpWarmupAllowed: boolean;
=======
}: {
  startupConfig?: TStartupConfig;
  user?: TUser;
>>>>>>> upstream/main
}) {
  const [defaultPreset, setDefaultPreset] = useRecoilState(store.defaultPreset);
  const canUseMcp = useHasAccess({
    permissionType: PermissionTypes.MCP_SERVERS,
    permission: Permissions.USE,
  });

  useSpeechSettingsInit(!!user);
<<<<<<< HEAD
  /** MCP catalogs are background-warmed: the queries stay off the startup
   * path until warmup releases them (or an MCP UI activates them). */
  const mcpServersReady = useCatalogReady('mcpServers');
  const mcpToolsReady = useCatalogReady('mcpTools');
  const { data: loadedServers, isLoading: serversLoading } = useMCPServersQuery({
    enabled: canUseMcp && mcpServersReady,
  });

  useMCPToolsQuery({
    enabled:
      canUseMcp &&
      mcpToolsReady &&
      !serversLoading &&
      !!loadedServers &&
      Object.keys(loadedServers).length > 0 &&
      mcpWarmupAllowed &&
      !!user,
  });
=======
  /** Server metadata may warm after first paint because it powers lightweight
   * navigation affordances. Tool discovery stays owned by visible MCP consumers. */
  const mcpServersReady = useCatalogReady('mcpServers');
  useMCPServersQuery({ enabled: canUseMcp && mcpServersReady });
>>>>>>> upstream/main

  /** Clean up old localStorage entries on startup */
  useEffect(() => {
    cleanupTimestampedStorage();
  }, []);

  /** Set the app title */
  useEffect(() => {
    const appTitle = startupConfig?.appTitle ?? '';
    if (!appTitle) {
      return;
    }
<<<<<<< HEAD
    document.title = appTitle;
=======
    setDocumentTitle(appTitle, true);
>>>>>>> upstream/main
    localStorage.setItem(LocalStorageKeys.APP_TITLE, appTitle);
  }, [startupConfig]);

  /** Set the default spec's preset as default */
  useEffect(() => {
    if (defaultPreset && defaultPreset.spec != null) {
      return;
    }

    const modelSpecs = startupConfig?.modelSpecs?.list;

    if (!modelSpecs || !modelSpecs.length) {
      return;
    }

    const defaultSpec = modelSpecs.find((spec) => spec.default);

    if (!defaultSpec) {
      return;
    }

    setDefaultPreset({
      ...defaultSpec.preset,
      endpoint: resolveModelSpecEndpoint(defaultSpec) ?? null,
      iconURL: defaultSpec.iconURL,
      spec: defaultSpec.name,
    });
  }, [defaultPreset, setDefaultPreset, startupConfig?.modelSpecs?.list]);

  useEffect(() => {
    return installCloudFrontImageRetry(startupConfig, { getAuthorizationHeader: getTokenHeader });
  }, [startupConfig]);

  useEffect(() => {
    if (startupConfig?.analyticsGtmId != null && typeof window.google_tag_manager === 'undefined') {
      const tagManagerArgs = {
        gtmId: startupConfig.analyticsGtmId,
      };
      TagManager.initialize(tagManagerArgs);
    }
  }, [startupConfig?.analyticsGtmId]);
}
