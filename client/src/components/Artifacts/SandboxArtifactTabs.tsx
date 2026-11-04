<<<<<<< HEAD
import { useEffect, useRef } from 'react';
=======
import { useMemo, useRef } from 'react';
>>>>>>> upstream/main
import * as Tabs from '@radix-ui/react-tabs';
import type { SandpackPreviewRef } from '@codesandbox/sandpack-react/unstyled';
import type { editor } from 'monaco-editor';
import type { Artifact } from '~/common';
import { useGetSharedStartupConfig, useGetStartupConfig } from '~/data-provider';
import useArtifactProps from '~/hooks/Artifacts/useArtifactProps';
<<<<<<< HEAD
import { ArtifactCodeEditor } from './ArtifactCodeEditor';
import { useCodeState } from '~/Providers/EditorContext';
=======
import { useArtifactCode } from '~/Providers/EditorContext';
import { ArtifactCodeEditor } from './ArtifactCodeEditor';
>>>>>>> upstream/main
import { ArtifactPreview } from './ArtifactPreview';
import { useShareContext } from '~/Providers';

export default function SandboxArtifactTabs({
  artifact,
  previewRef,
  isSharedConvo,
}: {
  artifact: Artifact;
  previewRef: React.MutableRefObject<SandpackPreviewRef>;
  isSharedConvo?: boolean;
}) {
<<<<<<< HEAD
  const { currentCode, setCurrentCode } = useCodeState();
=======
>>>>>>> upstream/main
  const { shareId } = useShareContext();
  const shouldUseSharedConfig =
    isSharedConvo === true && typeof shareId === 'string' && shareId.length > 0;
  const { data: startupConfig } = useGetStartupConfig({ enabled: !shouldUseSharedConfig });
  const { data: sharedStartupConfig } = useGetSharedStartupConfig(shareId, {
    enabled: shouldUseSharedConfig,
  });
  const resolvedStartupConfig = shouldUseSharedConfig ? sharedStartupConfig : startupConfig;
  const monacoRef = useRef<editor.IStandaloneCodeEditor | null>(null);
<<<<<<< HEAD
  const lastIdRef = useRef<string | null>(null);

  /* The reset lands only after commit, so the render that switches artifacts
   * still sees the previous artifact's editor text. */
  const hasCurrentArtifactCode = lastIdRef.current === artifact.id;

  useEffect(() => {
    if (artifact.id !== lastIdRef.current) {
      setCurrentCode(undefined);
    }
    lastIdRef.current = artifact.id;
  }, [artifact.id, setCurrentCode]);

  const { files, fileKey, template, sharedProps } = useArtifactProps({ artifact });
=======

  /* The buffer belongs to whichever artifact last wrote it, so a pane that
   * remounted for another host keeps this artifact's unsaved text; a copy
   * another artifact displaced is just as much this artifact's text. */
  const editedCode = useArtifactCode(artifact.id);

  const { files, fileKey, template, sharedProps, deriveFiles } = useArtifactProps({ artifact });

  /* An artifact whose preview entry is derived from its source needs the whole
   * set rebuilt from the editor text; `ArtifactPreview` can only swap the file
   * the editor owns. Empty text counts as no edit there, so it does here too. */
  const previewFiles = useMemo(
    () => (deriveFiles != null && editedCode ? deriveFiles(editedCode) : files),
    [deriveFiles, editedCode, files],
  );
>>>>>>> upstream/main

  return (
    <div className="flex h-full w-full flex-col">
      <Tabs.Content
        value="code"
        id="artifacts-code"
<<<<<<< HEAD
        className="h-full w-full flex-grow overflow-auto"
=======
        className="h-full w-full grow overflow-auto"
>>>>>>> upstream/main
        tabIndex={-1}
      >
        <ArtifactCodeEditor
          artifact={artifact}
          monacoRef={monacoRef}
          readOnly={isSharedConvo === true}
        />
      </Tabs.Content>

<<<<<<< HEAD
      <Tabs.Content
        value="preview"
        className="h-full w-full flex-grow overflow-hidden"
        tabIndex={-1}
      >
        <ArtifactPreview
          files={files}
=======
      <Tabs.Content value="preview" className="h-full w-full grow overflow-hidden" tabIndex={-1}>
        <ArtifactPreview
          files={previewFiles}
>>>>>>> upstream/main
          fileKey={fileKey}
          template={template}
          previewRef={previewRef}
          sharedProps={sharedProps}
<<<<<<< HEAD
          currentCode={hasCurrentArtifactCode ? currentCode : undefined}
=======
          currentCode={editedCode}
>>>>>>> upstream/main
          startupConfig={resolvedStartupConfig}
        />
      </Tabs.Content>
    </div>
  );
}
