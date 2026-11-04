import { UIResourceRenderer as LegacyUIResourceRenderer } from '@mcp-ui/client';
<<<<<<< HEAD
import type { UIResource } from 'librechat-data-provider';
import type { ComponentProps } from 'react';
=======
import {
  isHtmlMediaType,
  isMcpAppMimeType,
  resolveMCPUIResourceMimeType,
} from 'librechat-data-provider';
import type { UIResource } from 'librechat-data-provider';
import type { ComponentProps } from 'react';
import { useMCPAppsPolicy } from '~/Providers/MCPAppsPolicyContext';
>>>>>>> upstream/main

type LegacyRendererProps = ComponentProps<typeof LegacyUIResourceRenderer>;

type UIResourceRendererProps = Omit<
  LegacyRendererProps,
  'resource' | 'remoteDomProps' | 'supportedContentTypes'
> & {
  resource: UIResource;
};

export function isSupportedUIResource(
  resource: UIResource | null | undefined,
): resource is UIResource {
<<<<<<< HEAD
  return (
    typeof resource?.mimeType === 'string' &&
    resource.mimeType.split(';', 1)[0].trim().toLowerCase() === 'text/html'
  );
=======
  if (!resource || (resource.mimeType != null && typeof resource.mimeType !== 'string')) {
    return false;
  }
  const mimeType = resolveMCPUIResourceMimeType(resource.mimeType);
  return !isMcpAppMimeType(mimeType) && isHtmlMediaType(mimeType);
>>>>>>> upstream/main
}

/** Restricts legacy MCP-UI rendering to sandboxed inline HTML resources. */
export default function UIResourceRenderer({
  resource,
  htmlProps,
  ...props
}: UIResourceRendererProps) {
<<<<<<< HEAD
  if (!isSupportedUIResource(resource)) {
=======
  const { legacyHtmlEnabled } = useMCPAppsPolicy();

  if (!legacyHtmlEnabled || !isSupportedUIResource(resource)) {
>>>>>>> upstream/main
    return null;
  }

  const safeResource = { ...resource };
  const safeHtmlProps = { ...htmlProps };
  delete safeResource.contentType;
  safeResource.mimeType = 'text/html';
  delete safeHtmlProps.sandboxPermissions;

  return (
    <LegacyUIResourceRenderer
      {...props}
      resource={safeResource}
      htmlProps={safeHtmlProps}
      supportedContentTypes={['rawHtml']}
    />
  );
}
