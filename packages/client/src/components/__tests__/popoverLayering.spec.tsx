import '@testing-library/jest-dom';
<<<<<<< HEAD
import { render, screen } from '@testing-library/react';
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from '../HoverCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../Select';
import { OGDialog, OGDialogContent } from '../OriginalDialog';
=======
import { act, fireEvent, render, screen } from '@testing-library/react';
import { HoverCard, HoverCardContent, HoverCardPortal, HoverCardTrigger } from '../HoverCard';
import { DialogLayer, OGDialog, OGDialogContent } from '../OriginalDialog';
import Dropdown from '../Dropdown';
>>>>>>> upstream/main

/**
 * A portaled popover lands beside the dialog in the DOM, not inside it, so its
 * own z-index decides whether it is reachable. `OGDialogContent` sits at 140
 * over an opaque overlay at 130: a popover left on the shadcn default (40, 50)
 * opens *behind* both, invisible and unclickable, while the dialog around it
 * still takes clicks — the shape of the Run Code settings being unusable once
 * danny-avila/LibreChat#15722 moved them into a dialog.
 *
 * The modal dialog also parks `pointer-events: none` on the body, and Radix
 * re-enables it only for layers registered in the same copy of
 * `react-dismissable-layer` — which a popover from another copy is not.
 */
const DIALOG_CONTENT_Z_INDEX = 140;

function zIndexOf(element: HTMLElement): number {
  return Number(element.style.zIndex);
}

function EnvironmentSelect() {
  return (
<<<<<<< HEAD
    <Select open value="attached">
      <SelectTrigger aria-label="Execution environment">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="attached">Attached VM</SelectItem>
      </SelectContent>
    </Select>
  );
}

=======
    <Dropdown
      value="attached"
      onChange={() => undefined}
      ariaLabel="Execution environment"
      options={[{ value: 'attached', label: 'Attached VM' }]}
    />
  );
}

/** The Ariakit select opens from its trigger rather than a controlled `open` prop. */
async function openSelect() {
  await act(async () => {
    fireEvent.click(screen.getByRole('combobox', { name: 'Execution environment' }));
  });
  return screen.findByRole('listbox');
}

>>>>>>> upstream/main
function HelpHoverCard() {
  return (
    <HoverCard open>
      <HoverCardTrigger>help</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent>What stateful sessions do</HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  );
}

describe('portaled popovers inside a dialog', () => {
<<<<<<< HEAD
  it('opens a select above the dialog content it belongs to', () => {
=======
  it('opens a select above the dialog content it belongs to', async () => {
>>>>>>> upstream/main
    render(
      <OGDialog open>
        <OGDialogContent>
          <EnvironmentSelect />
        </OGDialogContent>
      </OGDialog>,
    );

<<<<<<< HEAD
    const listbox = screen.getByRole('listbox');
    expect(zIndexOf(listbox)).toBeGreaterThan(DIALOG_CONTENT_Z_INDEX);
    expect(listbox.style.pointerEvents).toBe('auto');
=======
    const listbox = await openSelect();
    expect(zIndexOf(listbox)).toBeGreaterThan(DIALOG_CONTENT_Z_INDEX);
    expect(listbox).toHaveClass('[pointer-events:auto]');
  });

  /** The Settings dialog is a Headless UI panel at z-50, not an OGDialog, so it declares its own
   *  dialog level (berry-13/LibreChat#249). */
  it('opens a select above a non-OGDialog panel that declares a dialog layer', async () => {
    render(
      <DialogLayer>
        <EnvironmentSelect />
      </DialogLayer>,
    );

    const listbox = await openSelect();
    expect(zIndexOf(listbox)).toBeGreaterThan(50);
    expect(listbox).toHaveClass('[pointer-events:auto]');
>>>>>>> upstream/main
  });

  it('opens a hover card above the dialog content it belongs to', () => {
    render(
      <OGDialog open>
        <OGDialogContent>
          <HelpHoverCard />
        </OGDialogContent>
      </OGDialog>,
    );

    const card = screen.getByText('What stateful sessions do');
    expect(zIndexOf(card)).toBeGreaterThan(DIALOG_CONTENT_Z_INDEX);
    expect(card.style.pointerEvents).toBe('auto');
  });

  /** Outside a dialog the CSS layer still decides, so a consumer that raises it
<<<<<<< HEAD
   *  by class — `z-[999]` to clear the legacy `Dialog` — keeps that override.
   *
   *  Only the absence of OUR inline z-index is asserted. `pointer-events` is
   *  Radix's to set out here: a select disables outside pointer events for its
   *  own layer stack, and whether a sibling popover then reads `auto` depends
   *  on whether the two share a copy of `react-dismissable-layer` — which is a
   *  packaging fact, not this hook's contract. */
  it('leaves the CSS layer alone outside any dialog', () => {
=======
   *  by class keeps that override.
   *
   *  Only the absence of OUR inline z-index is asserted; the list keeps its
   *  `z-40` class, which a consumer can still raise. */
  it('leaves the CSS layer alone outside any dialog', async () => {
>>>>>>> upstream/main
    render(
      <>
        <EnvironmentSelect />
        <HelpHoverCard />
      </>,
    );

<<<<<<< HEAD
    const listbox = screen.getByRole('listbox');
=======
    const listbox = await openSelect();
>>>>>>> upstream/main
    const card = screen.getByText('What stateful sessions do');
    expect(listbox.style.zIndex).toBe('');
    expect(listbox).toHaveClass('z-40');
    expect(card.style.zIndex).toBe('');
    expect(card).toHaveClass('z-50');
  });
});
