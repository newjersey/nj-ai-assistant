/* eslint-disable i18next/no-literal-string */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import type { TMessage } from 'librechat-data-provider';
import Files from '../Files';

jest.mock('~/Providers', () => ({
  useFileMapContext: () => ({}),
  useShareContext: () => ({}),
}));
jest.mock(
  '~/components/Chat/Input/Files/FileContainer',
  () =>
    ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>file action</button>,
);
<<<<<<< HEAD
jest.mock('../Image', () => () => <div>image preview</div>);
=======
jest.mock('../Image', () => ({ alignRight }: { alignRight?: boolean }) => (
  <div data-testid="image-preview" data-aligned-right={String(alignRight)}>
    image preview
  </div>
));
>>>>>>> upstream/main
jest.mock(
  '../FilePreviewDialog',
  () =>
    ({ open, deliveryPath }: { open: boolean; deliveryPath?: string }) =>
      open ? <div>preview: {deliveryPath}</div> : null,
);

it('exposes extracted image text without changing ordinary image previews', () => {
  render(
    <Files
      message={
        {
          files: [
            { file_id: 'text-image', type: 'image/png', llmDeliveryPath: 'text' },
            { file_id: 'image', type: 'image/png' },
          ],
        } as TMessage
      }
    />,
  );
  expect(screen.getAllByText('image preview')).toHaveLength(1);
<<<<<<< HEAD
=======
  expect(screen.getByTestId('image-preview')).toHaveAttribute('data-aligned-right', 'true');
>>>>>>> upstream/main
  fireEvent.click(screen.getByText('file action'));
  expect(screen.getByText('preview: text')).toBeInTheDocument();
});
