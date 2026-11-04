import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { act, render, screen } from '@testing-library/react';
import {
  EModelEndpoint,
  EToolResources,
  FileSources,
  mergeFileConfig,
} from 'librechat-data-provider';
import type { TEndpointsConfig } from 'librechat-data-provider';
import type { ExtendedFile, AgentForm } from '~/common';
import FileContext from '../Agents/FileContext';

const mockMutateAsync = jest.fn();
const mockEndpointsConfig: TEndpointsConfig = {
  [EModelEndpoint.agents]: { userProvide: false, order: 1 },
};
const mockFileConfig = mergeFileConfig({ endpoints: { default: { fileLimit: 10 } } });

jest.mock('~/data-provider', () => ({
  useDeleteFilesMutation: () => ({ mutateAsync: mockMutateAsync }),
  useGetEndpointsQuery: () => ({ data: mockEndpointsConfig }),
  useGetFileConfig: ({ select }: { select?: (data: unknown) => unknown }) => ({
    data: select != null ? select(mockFileConfig) : mockFileConfig,
  }),
}));

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useAgentFileConfig: jest.requireActual('~/hooks/Agents/useAgentFileConfig').default,
  useLazyEffect: jest.requireActual('~/hooks/Generic/useLazyEffect').useLazyEffect,
}));

jest.mock('~/hooks/Files/useFileHandling', () => ({
  useFileHandlingNoChatContext: () => ({ handleFileChange: jest.fn() }),
  clearUploadRecovery: jest.fn(),
}));

jest.mock('~/hooks/Files/useSetFilesToDelete', () => ({
  __esModule: true,
  default: () => jest.fn(),
}));

jest.mock('@librechat/client', () => ({
  useToastContext: () => ({ showToast: jest.fn() }),
}));

jest.mock('~/components/Chat/Input/Files/FileContainer', () => {
  return function MockFileContainer({
    file,
    onDelete,
  }: {
    file: ExtendedFile;
    onDelete: () => void;
  }) {
    return <button data-testid={`del-${file.file_id}`} onClick={onDelete} />;
  };
});

jest.mock('~/components/Chat/Input/Files/Image', () => {
  return function MockImage() {
    return null;
  };
});

const existingFile = {
  file_id: 'test-file',
  type: 'application/pdf',
  filepath: '/uploads/test-file.pdf',
  filename: 'test-file.pdf',
  size: 1024,
  progress: 1,
  source: FileSources.local,
} as ExtendedFile;

function Wrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm<AgentForm>();
  return <FormProvider {...methods}>{children}</FormProvider>;
}

describe('NJ FileContext', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockMutateAsync.mockReset();
    mockMutateAsync.mockResolvedValue({ message: 'ok', deletedFileIds: [], failedFileIds: [] });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('uses the context tool resource when deleting an agent file', () => {
    render(
      <Wrapper>
        <FileContext agent_id="agent-123" files={[[existingFile.file_id, existingFile]]} />
      </Wrapper>,
    );

    act(() => {
      jest.advanceTimersByTime(750);
    });
    act(() => {
      screen.getByTestId('del-test-file').click();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    expect(mockMutateAsync).toHaveBeenCalledWith({
      files: [expect.objectContaining({ file_id: 'test-file' })],
      agent_id: 'agent-123',
      tool_resource: EToolResources.context,
    });
  });
});
