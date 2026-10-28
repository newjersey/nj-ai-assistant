import '@testing-library/jest-dom';
<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { OGDialog, OGDialogContent } from '../OriginalDialog';

/**
 * A dialog traps focus, and a popover opened inside it is expected to take that
 * trap over — Radix does this by pausing the outer scope when the inner one
 * mounts. Both scopes have to come from the same copy of
 * `@radix-ui/react-focus-scope` for that hand-off to happen; with duplicates,
 * the dialog never yields and the popover's options cannot be reached by
 * keyboard. `radixLayers.spec.ts` pins the packaging invariant; this asserts
 * the behaviour it exists for.
 */
it('lets a portaled select option hold focus inside a dialog', () => {
  render(
    <OGDialog open>
      <OGDialogContent>
        <Select open value="ask">
          <SelectTrigger aria-label="Execution environment">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ask">Ask before changes</SelectItem>
            <SelectItem value="accept">Accept edits</SelectItem>
          </SelectContent>
        </Select>
=======
import { act, fireEvent, render, screen } from '@testing-library/react';
import { OGDialog, OGDialogContent } from '../OriginalDialog';
import Dropdown from '../Dropdown';

/**
 * A dialog traps focus inside its own DOM and hides every other body child from
 * assistive technology. A select list portaled out of it could be neither reached
 * by keyboard nor read, so inside a dialog `Dropdown` renders the list in place:
 * the list is exposed, and the keyboard can move through it and pick an option.
 */
it('lets the keyboard pick a select option inside a dialog', async () => {
  const onChange = jest.fn();
  render(
    <OGDialog open>
      <OGDialogContent>
        <Dropdown
          value="ask"
          onChange={onChange}
          ariaLabel="Execution environment"
          options={[
            { value: 'ask', label: 'Ask before changes' },
            { value: 'accept', label: 'Accept edits' },
          ]}
        />
>>>>>>> upstream/main
      </OGDialogContent>
    </OGDialog>,
  );

<<<<<<< HEAD
  const option = screen.getByRole('option', { name: 'Accept edits' });
  option.focus();

  expect(document.activeElement).toBe(option);
=======
  const trigger = screen.getByRole('combobox', { name: 'Execution environment' });
  await act(async () => {
    trigger.focus();
    fireEvent.click(trigger);
  });
  const listbox = await screen.findByRole('listbox');
  expect(screen.getByRole('dialog')).toContainElement(listbox);
  expect(document.activeElement).toBe(listbox);

  await act(async () => {
    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
  });
  const active = listbox.getAttribute('aria-activedescendant');
  expect(active).toBe(screen.getByRole('option', { name: 'Accept edits' }).id);

  await act(async () => {
    fireEvent.keyDown(listbox, { key: 'Enter' });
  });
  expect(onChange).toHaveBeenCalledWith('accept');
>>>>>>> upstream/main
});
