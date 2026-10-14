import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Trigger } from '@radix-ui/react-popover';
import { useLocalize } from '~/hooks';

export default function TitleButton({ primaryText = '', secondaryText = '' }) {
  const localize = useLocalize();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Trigger asChild>
      <button
<<<<<<< HEAD
        className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-lg font-medium transition-colors duration-200 hover:bg-surface-hover radix-state-open:bg-surface-hover"
=======
        className="group hover:bg-surface-hover data-[state=open]:bg-surface-hover flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-lg font-medium transition-colors duration-200"
>>>>>>> upstream/main
        aria-label={localize('com_ui_endpoint_menu')}
        aria-expanded={isExpanded}
        role="combobox"
        aria-haspopup="listbox"
        aria-controls="llm-endpoint-menu"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <span className="text-text-primary"> {primaryText} </span>
<<<<<<< HEAD
          {!!secondaryText && <span className="text-token-text-secondary">{secondaryText}</span>}
        </div>
        <ChevronDown className="text-token-text-secondary size-4" aria-hidden="true" />
=======
          {!!secondaryText && <span className="text-text-secondary">{secondaryText}</span>}
        </div>
        <ChevronDown className="text-text-secondary size-4" aria-hidden="true" />
>>>>>>> upstream/main
      </button>
    </Trigger>
  );
}
