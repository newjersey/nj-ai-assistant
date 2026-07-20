/* eslint-disable i18next/no-literal-string */
/* ^ We're not worried about i18n for this app ^ */

import { Link } from 'react-router-dom';
import type { SetterOrUpdater } from 'recoil';

/**
 * Splash page that introduces the memories feature to users.
 */
export default function MemoryPanelSplash({
  setShowSplashPage,
}: {
  setShowSplashPage: SetterOrUpdater<boolean>;
}) {
  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="flex min-h-full flex-col">
        {/* Adds top spacing */}
        <div className="flex-1" />

        {/* Splash info */}
        <div className="flex flex-col gap-4 p-1">
          <h1 className="text-xl font-bold">User memories</h1>

          <p className="text-md text-text-primary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>

          <Link
            to="nj/release-notes"
            className="text-md font-semibold text-jersey-button underline hover:decoration-2"
          >
            Read the release notes
          </Link>

          <button
            onClick={() => setShowSplashPage(false)}
            className="text-md w-full rounded bg-jersey-button py-3 font-semibold text-white hover:bg-jersey-button-hover"
          >
            View your memories
          </button>
        </div>

        {/* Adds bottom spacing */}
        <div className="flex-[2]" />
      </div>
    </div>
  );
}
