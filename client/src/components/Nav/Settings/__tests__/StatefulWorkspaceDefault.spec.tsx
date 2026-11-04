import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import type { ReactNode } from 'react';
=======
>>>>>>> upstream/main
import StatefulWorkspaceDefault from '../StatefulWorkspaceDefault';

const mockMutate = jest.fn();
const mockShowToast = jest.fn();
let mockAllowedEnvironments: Array<'user' | 'agent-user' | 'conversation'> | undefined;

jest.mock('@librechat/client', () => ({
<<<<<<< HEAD
  Select: ({
    value,
    onValueChange,
    disabled,
    children,
  }: {
    value: string;
    onValueChange: (value: string) => void;
    disabled?: boolean;
    children: ReactNode;
  }) => (
    <select
      aria-label="workspace-default"
      value={value}
      disabled={disabled}
      onChange={(event) => onValueChange(event.target.value)}
    >
      {children}
    </select>
  ),
  SelectTrigger: ({ children }: { children: ReactNode }) => children,
  SelectValue: () => null,
  SelectContent: ({ children }: { children: ReactNode }) => children,
  SelectItem: ({
    value,
    children,
    disabled,
  }: {
    value: string;
    children: ReactNode;
    disabled?: boolean;
  }) => (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  ),
=======
  ...jest.requireActual('@librechat/client'),
>>>>>>> upstream/main
  useToastContext: () => ({ showToast: mockShowToast }),
}));

jest.mock('~/hooks', () => ({
  useLocalize: () => (key: string) => key,
  useGetAgentsConfig: () => ({
    agentsConfig: {
      capabilities: ['stateful_code_sessions'],
      statefulCodeSessions:
        mockAllowedEnvironments == null
          ? undefined
          : { allowedEnvironments: mockAllowedEnvironments },
    },
  }),
}));

jest.mock('~/data-provider', () => ({
  useGetUserQuery: () => ({
    data: { personalization: { statefulCodeEnvironment: 'agent-user' } },
  }),
  useUpdateUserPreferencesMutation: () => ({
    mutate: mockMutate,
    isLoading: false,
  }),
}));

describe('StatefulWorkspaceDefault', () => {
  beforeEach(() => {
    mockMutate.mockClear();
    mockAllowedEnvironments = undefined;
  });

  it('shows the saved user preference', () => {
    render(<StatefulWorkspaceDefault />);

<<<<<<< HEAD
    expect(screen.getByRole('combobox', { name: 'workspace-default' })).toHaveValue('agent-user');
=======
    expect(screen.getByTestId('default-stateful-workspace')).toHaveTextContent(
      'com_ui_stateful_code_environment_agent_user',
    );
  });

  it('describes the trigger with the workspace explanation', () => {
    render(<StatefulWorkspaceDefault />);

    expect(screen.getByTestId('default-stateful-workspace')).toHaveAccessibleDescription(
      'com_ui_default_stateful_workspace_description',
    );
>>>>>>> upstream/main
  });

  it('persists a new default for future agents', async () => {
    render(<StatefulWorkspaceDefault />);

<<<<<<< HEAD
    await userEvent.selectOptions(
      screen.getByRole('combobox', { name: 'workspace-default' }),
      'conversation',
=======
    await userEvent.click(screen.getByTestId('default-stateful-workspace'));
    await userEvent.click(
      await screen.findByRole('option', { name: 'com_ui_stateful_code_environment_conversation' }),
>>>>>>> upstream/main
    );

    expect(mockMutate).toHaveBeenCalledWith({ statefulCodeEnvironment: 'conversation' });
  });

<<<<<<< HEAD
  it('only enables deployment-allowed scopes while preserving the saved value', () => {
    mockAllowedEnvironments = ['user'];

    render(<StatefulWorkspaceDefault />);

    expect(
      screen.getByRole('option', { name: 'com_ui_stateful_code_environment_user' }),
    ).toBeEnabled();
    expect(
      screen.getByRole('option', { name: 'com_ui_stateful_code_environment_agent_user' }),
    ).toBeDisabled();
=======
  it('lists the saved disallowed scope as disabled', async () => {
    mockAllowedEnvironments = ['user'];

    render(<StatefulWorkspaceDefault />);
    await userEvent.click(screen.getByTestId('default-stateful-workspace'));

    expect(
      await screen.findByRole('option', { name: 'com_ui_stateful_code_environment_user' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: 'com_ui_stateful_code_environment_agent_user' }),
    ).toHaveAttribute('aria-disabled', 'true');
>>>>>>> upstream/main
    expect(
      screen.queryByRole('option', { name: 'com_ui_stateful_code_environment_conversation' }),
    ).not.toBeInTheDocument();
  });
});
