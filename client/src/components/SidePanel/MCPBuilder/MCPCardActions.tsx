import React from 'react';
<<<<<<< HEAD
import { Spinner, TooltipAnchor } from '@librechat/client';
import { Pencil, PlugZap, SlidersHorizontal, RefreshCw, X, Trash2 } from 'lucide-react';
import type { MCPServerStatus } from 'librechat-data-provider';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';
=======
import { Button, Spinner, TooltipAnchor } from '@librechat/client';
import { KeyRound, Pencil, PlugZap, RefreshCw, Unlink, X } from 'lucide-react';
import type { MCPServerStatus } from 'librechat-data-provider';
import { cn, rowActionClasses, rowActionSlotClasses } from '~/utils';
import { useLocalize } from '~/hooks';
>>>>>>> upstream/main

interface MCPCardActionsProps {
  serverName: string;
  serverStatus?: MCPServerStatus;
  isInitializing: boolean;
  canCancel: boolean;
  hasCustomUserVars: boolean;
  canEdit: boolean;
  editButtonRef?: React.RefObject<HTMLDivElement>;
  onEditClick: (e: React.MouseEvent) => void;
  onConfigClick: (e: React.MouseEvent) => void;
  onInitialize: () => void;
  onCancel: (e: React.MouseEvent) => void;
  onRevoke?: () => void;
}

/**
<<<<<<< HEAD
 * Standardized action buttons for MCP server cards.
 *
 * Unified icon system (each icon has ONE meaning):
 * - Pencil: Edit server definition (Settings panel only)
 * - PlugZap: Connect/Authenticate (for disconnected/error servers)
 * - SlidersHorizontal: Configure custom variables (for connected servers with vars)
 * - Trash2: Revoke OAuth access (for connected OAuth servers)
 * - RefreshCw: Reconnect/Refresh (for connected servers)
 * - Spinner: Loading state (with X on hover for cancel)
=======
 * The actions on an MCP server row.
 *
 * One icon, one meaning, and the meaning is the noun the action acts on rather
 * than a generic verb:
 * - Pencil: the server definition (Settings panel only)
 * - KeyRound: the credentials this server asks each user for, which is also what
 *   marks a server as needing authentication
 * - PlugZap: the connection, made
 * - Unlink: the account grant, given up. Revoking is dropping the link between
 *   this user and the provider, NOT deleting the server, which is what a trash can
 *   said here before and what it stays reserved for. A broken link rather than a
 *   pulled plug, because the grant and the transport are different things: revoking
 *   one does not close the other
 * - RefreshCw: reconnecting a server that is already connected
 * - Spinner, with X on hover: a connection in flight, and cancelling it
>>>>>>> upstream/main
 */
export default function MCPCardActions({
  serverName,
  serverStatus,
  isInitializing,
  canCancel,
  hasCustomUserVars,
  canEdit,
  editButtonRef,
  onEditClick,
  onConfigClick,
  onInitialize,
  onCancel,
  onRevoke,
}: MCPCardActionsProps) {
  const localize = useLocalize();

  const connectionState = serverStatus?.connectionState;
  const isConnected = connectionState === 'connected';
  const isConnecting = connectionState === 'connecting';
  const isDisconnected = connectionState === 'disconnected';
  const isError = connectionState === 'error';

<<<<<<< HEAD
  const buttonBaseClass = cn(
    'flex size-7 items-center justify-center rounded-md',
    'transition-colors duration-150',
    'text-text-secondary hover:text-text-secondary',
    'hover:bg-surface-tertiary',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary',
  );
=======
  /** A run in flight is a state of the row, not an action waiting to be found:
   *  the spinner and the cancel that replaces it stay put without a hover. */
  const loadingClass = rowActionClasses({ visible: true });
>>>>>>> upstream/main

  // Loading state - show spinner (with cancel option)
  if (isInitializing || isConnecting) {
    return (
<<<<<<< HEAD
      <div className="flex items-center gap-0.5">
=======
      <div className={rowActionSlotClasses({ open: true })}>
>>>>>>> upstream/main
        {/* Edit button stays visible during loading */}
        {canEdit && (
          <TooltipAnchor
            ref={editButtonRef}
            description={localize('com_ui_edit')}
            side="top"
<<<<<<< HEAD
            className={buttonBaseClass}
            aria-label={localize('com_ui_edit')}
            role="button"
            onClick={onEditClick}
          >
            <Pencil className="size-3.5" aria-hidden="true" />
          </TooltipAnchor>
=======
            render={
              <Button
                type="button"
                variant="row-action"
                size="icon-xs"
                aria-label={localize('com_ui_edit')}
                onClick={onEditClick}
              >
                <Pencil className="text-text-secondary size-4" aria-hidden="true" />
              </Button>
            }
          />
>>>>>>> upstream/main
        )}

        {/* Spinner with cancel on hover */}
        {canCancel ? (
          <TooltipAnchor
            description={localize('com_ui_cancel')}
            side="top"
<<<<<<< HEAD
            className={cn(buttonBaseClass, 'group')}
            aria-label={localize('com_ui_cancel')}
            role="button"
            onClick={onCancel}
          >
            <div className="relative size-4">
              <Spinner className="size-4 group-hover:opacity-0" />
              <X className="absolute inset-0 size-4 text-text-destructive opacity-0 group-hover:opacity-100" />
            </div>
          </TooltipAnchor>
        ) : (
          <div className={cn(buttonBaseClass, 'cursor-default hover:bg-transparent')}>
=======
            render={
              <Button
                type="button"
                variant="row-action"
                size="icon-xs"
                className="group/cancel"
                aria-label={localize('com_ui_cancel')}
                onClick={onCancel}
              >
                <div className="relative size-4">
                  {/* The fade belongs to the wrapper: the spinner's own opacity is the
                      primitive's, and so is the cancel cross's to the icon. */}
                  <span className="text-text-secondary absolute inset-0 flex items-center justify-center group-hover/cancel:opacity-0">
                    <Spinner className="size-4" />
                  </span>
                  <X className="text-text-destructive absolute inset-0 size-4 opacity-0 group-hover/cancel:opacity-100" />
                </div>
              </Button>
            }
          />
        ) : (
          <div className={cn(loadingClass, 'cursor-default hover:bg-transparent')}>
>>>>>>> upstream/main
            <Spinner
              className="size-4"
              aria-label={localize('com_nav_mcp_status_connecting', { 0: serverName })}
            />
          </div>
        )}
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="flex items-center gap-0.5">
      {/* Edit button - opens MCPServerDialog to edit server definition */}
      {canEdit && (
        <TooltipAnchor
          ref={editButtonRef}
          description={localize('com_ui_edit')}
          side="top"
          className={buttonBaseClass}
          aria-label={localize('com_ui_edit')}
          role="button"
          onClick={onEditClick}
        >
          <Pencil className="size-3.5" aria-hidden="true" />
        </TooltipAnchor>
=======
    <div className={rowActionSlotClasses()}>
      {/* Edit button - opens MCPServerDialog to edit server definition */}
      {canEdit && (
        <RowAction ref={editButtonRef} label={localize('com_ui_edit')} onClick={onEditClick}>
          <Pencil className="size-4" aria-hidden="true" />
        </RowAction>
>>>>>>> upstream/main
      )}

      {/* Connect button - for disconnected or error states */}
      {(isDisconnected || isError) && !serverStatus?.requestScoped && (
<<<<<<< HEAD
        <TooltipAnchor
          description={localize('com_nav_mcp_connect')}
          side="top"
          className={buttonBaseClass}
          aria-label={localize('com_nav_mcp_connect')}
          role="button"
          onClick={() => onInitialize()}
        >
          <PlugZap className="size-4" aria-hidden="true" />
        </TooltipAnchor>
=======
        <RowAction label={localize('com_nav_mcp_connect')} onClick={() => onInitialize()}>
          <PlugZap className="size-4" aria-hidden="true" />
        </RowAction>
>>>>>>> upstream/main
      )}

      {/* On-demand servers stay idle between requests, so their user variables
          must remain configurable without a live transport connection. */}
      {(isConnected || serverStatus?.requestScoped) && hasCustomUserVars && (
<<<<<<< HEAD
        <TooltipAnchor
          description={localize('com_ui_configure')}
          side="top"
          className={buttonBaseClass}
          aria-label={localize('com_ui_configure')}
          role="button"
          onClick={onConfigClick}
        >
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
        </TooltipAnchor>
=======
        <RowAction label={localize('com_ui_configure')} onClick={onConfigClick}>
          <KeyRound className="size-4" aria-hidden="true" />
        </RowAction>
>>>>>>> upstream/main
      )}

      {/* Refresh button - for connected servers (allows reconnection) */}
      {isConnected && !serverStatus?.requestScoped && (
<<<<<<< HEAD
        <TooltipAnchor
          description={localize('com_nav_mcp_reconnect')}
          side="top"
          className={buttonBaseClass}
          aria-label={localize('com_nav_mcp_reconnect')}
          role="button"
          onClick={() => onInitialize()}
        >
          <RefreshCw className="size-3.5" aria-hidden="true" />
        </TooltipAnchor>
=======
        <RowAction label={localize('com_nav_mcp_reconnect')} onClick={() => onInitialize()}>
          <RefreshCw className="size-4" aria-hidden="true" />
        </RowAction>
>>>>>>> upstream/main
      )}

      {/* Revoke button - for OAuth servers (available regardless of connection state) */}
      {serverStatus?.requiresOAuth && onRevoke && (
<<<<<<< HEAD
        <TooltipAnchor
          description={localize('com_ui_revoke')}
          side="top"
          className={buttonBaseClass}
          aria-label={localize('com_ui_revoke')}
          role="button"
          onClick={onRevoke}
        >
          <Trash2 className="size-3.5 text-text-destructive" aria-hidden="true" />
        </TooltipAnchor>
=======
        <RowAction label={localize('com_ui_revoke')} onClick={onRevoke}>
          <Unlink className="text-text-destructive size-4" aria-hidden="true" />
        </RowAction>
>>>>>>> upstream/main
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

/** A revealed row action with its tooltip: the label is both the tooltip and the name. */
const RowAction = React.forwardRef<
  HTMLDivElement,
  { label: string; onClick: (e: React.MouseEvent) => void; children: React.ReactNode }
>(function RowAction({ label, onClick, children }, ref) {
  return (
    <TooltipAnchor
      ref={ref}
      description={label}
      side="top"
      render={
        <Button
          type="button"
          variant="row-action-reveal"
          size="icon-xs"
          aria-label={label}
          onClick={onClick}
        >
          {children}
        </Button>
      }
    />
  );
});
>>>>>>> upstream/main
