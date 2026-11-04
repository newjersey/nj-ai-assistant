import { useCallback } from 'react';
import type { EModelEndpoint } from 'librechat-data-provider';
import type { SharePointFile } from '~/data-provider/Files/sharepoint';
import type { FileHandlingState } from './useFileHandling';
import useFileHandling, { useFileHandlingNoChatContext } from './useFileHandling';
import useSharePointDownload from './useSharePointDownload';

interface UseSharePointFileHandlingProps {
  fileSetter?: any;
  toolResource?: string;
  fileFilter?: (file: File) => boolean;
  additionalMetadata?: Record<string, string | undefined>;
  endpointOverride?: EModelEndpoint | string;
  endpointTypeOverride?: EModelEndpoint | string;
}

interface UseSharePointFileHandlingReturn {
  handleSharePointFiles: (files: SharePointFile[]) => Promise<void>;
  isProcessing: boolean;
  downloadProgress: any;
  error: string | null;
}

export default function useSharePointFileHandling(
  props?: UseSharePointFileHandlingProps,
): UseSharePointFileHandlingReturn {
<<<<<<< HEAD
  const { handleFiles } = useFileHandling(props);
  const { downloadSharePointFiles, isDownloading, downloadProgress, error } = useSharePointDownload(
    {
      onFilesDownloaded: async (downloadedFiles: File[]) => {
        const fileArray = Array.from(downloadedFiles);
        await handleFiles(fileArray, props?.toolResource);
      },
=======
  const { handleFiles, captureUploadLifecycle } = useFileHandling(props);
  const { downloadSharePointFiles, isDownloading, downloadProgress, error } = useSharePointDownload(
    {
>>>>>>> upstream/main
      onError: (error) => {
        console.error('SharePoint download failed:', error);
      },
    },
  );

  const handleSharePointFiles = useCallback(
    async (sharePointFiles: SharePointFile[]) => {
<<<<<<< HEAD
      try {
        await downloadSharePointFiles(sharePointFiles);
=======
      const toolResource = props?.toolResource;
      const lifecycle = captureUploadLifecycle(toolResource);
      try {
        const downloadedFiles = await downloadSharePointFiles(sharePointFiles);
        await handleFiles(downloadedFiles, toolResource, lifecycle);
>>>>>>> upstream/main
      } catch (error) {
        console.error('SharePoint file handling error:', error);
        throw error;
      }
    },
<<<<<<< HEAD
    [downloadSharePointFiles],
=======
    [downloadSharePointFiles, handleFiles, captureUploadLifecycle, props?.toolResource],
>>>>>>> upstream/main
  );

  return {
    handleSharePointFiles,
    isProcessing: isDownloading,
    downloadProgress,
    error,
  };
}

export function useSharePointFileHandlingNoChatContext(
  props: UseSharePointFileHandlingProps | undefined,
  fileState: FileHandlingState,
): UseSharePointFileHandlingReturn {
<<<<<<< HEAD
  const { handleFiles } = useFileHandlingNoChatContext(props, fileState);

  const { downloadSharePointFiles, isDownloading, downloadProgress, error } = useSharePointDownload(
    {
      onFilesDownloaded: async (downloadedFiles: File[]) => {
        const fileArray = Array.from(downloadedFiles);
        await handleFiles(fileArray, props?.toolResource);
      },
=======
  const { handleFiles, captureUploadLifecycle } = useFileHandlingNoChatContext(props, fileState);

  const { downloadSharePointFiles, isDownloading, downloadProgress, error } = useSharePointDownload(
    {
>>>>>>> upstream/main
      onError: (error) => {
        console.error('SharePoint download failed:', error);
      },
    },
  );

  const handleSharePointFiles = useCallback(
    async (sharePointFiles: SharePointFile[]) => {
<<<<<<< HEAD
      try {
        await downloadSharePointFiles(sharePointFiles);
=======
      const toolResource = props?.toolResource;
      const lifecycle = captureUploadLifecycle(toolResource);
      try {
        const downloadedFiles = await downloadSharePointFiles(sharePointFiles);
        await handleFiles(downloadedFiles, toolResource, lifecycle);
>>>>>>> upstream/main
      } catch (error) {
        console.error('SharePoint file handling error:', error);
        throw error;
      }
    },
<<<<<<< HEAD
    [downloadSharePointFiles],
=======
    [downloadSharePointFiles, handleFiles, captureUploadLifecycle, props?.toolResource],
>>>>>>> upstream/main
  );

  return {
    handleSharePointFiles,
    isProcessing: isDownloading,
    downloadProgress,
    error,
  };
}
