import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import ProjectChatOptions from '~/components/Projects/ProjectChatOptions';
import { render, screen } from 'test/layout-test-utils';

describe('ProjectChatOptions NJ customizations', () => {
  const ProjectChatOptionsWithState = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
      <ProjectChatOptions
        conversation={{
          conversationId: 'test-convo',
          title: 'Test Chat',
          chatProjectId: 'test-project',
          endpoint: null,
          createdAt: '2026-10-26T00:00:00.000Z',
          updatedAt: '2026-10-26T00:00:00.000Z',
        }}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    );
  };

  test('hides the delete option from the dropdown', async () => {
    render(<ProjectChatOptionsWithState />);
    await userEvent.click(screen.getByRole('button', { name: 'Conversation Menu Options' }));
    await screen.findByRole('menu');

    expect(screen.queryByRole('menuitem', { name: 'Delete' })).not.toBeInTheDocument();

    expect(screen.getByRole('menuitem', { name: 'Change project' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Remove from project' })).toBeInTheDocument();
  });
});
