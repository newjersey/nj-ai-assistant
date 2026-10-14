<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Button, Input } from '@librechat/client';
=======
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X } from 'lucide-react';
import { Button, FilterInput } from '@librechat/client';
>>>>>>> upstream/main
import { useDebounce, useLocalize } from '~/hooks';

/**
 * Props for the SearchBar component
 */
interface SearchBarProps {
  /** Current search query value */
  value: string;
  /** Callback fired when the search query changes */
  onSearch: (query: string) => void;
<<<<<<< HEAD
  /** Additional CSS classes */
=======
  /**
   * Additional CSS classes for the wrapper. The component carries no width cap of
   * its own, so the caller owns sizing (e.g. `max-w-[420px]` in a toolbar row).
   */
>>>>>>> upstream/main
  className?: string;
}

/**
 * SearchBar - Component for searching agents with debounced input
 *
 * Provides a search input with clear button and debounced search functionality.
 * Includes proper ARIA attributes for accessibility and visual indicators.
 * Uses 300ms debounce delay to prevent excessive API calls during typing.
 */
const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch, className = '' }) => {
  const localize = useLocalize();
  const [searchTerm, setSearchTerm] = useState(value);
<<<<<<< HEAD
=======
  const inputRef = useRef<HTMLInputElement>(null);
>>>>>>> upstream/main

  // Debounced search value (300ms delay)
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Update internal state when props change
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  // Trigger search when debounced value changes
  useEffect(() => {
    // Only trigger search if the debounced value matches current searchTerm
    // This prevents stale debounced values from triggering after clear
    if (debouncedSearchTerm !== value && debouncedSearchTerm === searchTerm) {
      onSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearch, value, searchTerm]);

  /**
   * Handle search input changes
   *
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Clear the search input and reset results
   */
  const handleClear = useCallback(() => {
    // Immediately call parent onSearch to clear the URL parameter
    onSearch('');
    // Also clear local state
    setSearchTerm('');
<<<<<<< HEAD
  }, [onSearch]);

  return (
    <div className={`relative w-full max-w-4xl ${className}`} role="search">
      <label htmlFor="agent-search" className="sr-only">
        {localize('com_agents_search_instructions')}
      </label>
      <Input
        id="agent-search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={localize('com_agents_search_placeholder')}
        className="h-12 rounded-xl border-border-medium bg-transparent pl-12 pr-12 text-lg text-text-primary shadow-md transition-[border-color,box-shadow] duration-200 placeholder:text-text-secondary focus:border-border-heavy focus:shadow-lg focus:ring-0"
        aria-label={localize('com_agents_search_aria')}
=======
    inputRef.current?.focus();
  }, [onSearch]);

  return (
    <div className={`relative w-full ${className}`} role="search">
      <FilterInput
        inputId="agent-search"
        label={localize('com_agents_search_aria')}
        type="text"
        ref={inputRef}
        value={searchTerm}
        onChange={handleChange}
        className="focus-visible:ring-text-primary pe-10 focus-visible:ring-2 focus-visible:ring-inset"
>>>>>>> upstream/main
        aria-describedby="search-instructions search-results-count"
        autoComplete="off"
        spellCheck="false"
      />

<<<<<<< HEAD
      <div className="absolute inset-y-0 left-0 flex items-center pl-4" aria-hidden="true">
        <Search className="size-5 text-text-secondary" />
      </div>
=======
>>>>>>> upstream/main
      {/* Hidden instructions for screen readers */}
      <div id="search-instructions" className="sr-only">
        {localize('com_agents_search_instructions')}
      </div>
      {/* Show clear button only when search has value - Google style */}
      {searchTerm && (
        <Button
          variant="ghost"
<<<<<<< HEAD
          size="icon"
          type="button"
          onClick={handleClear}
          className="group absolute right-4 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2"
          aria-label={localize('com_agents_clear_search')}
          title={localize('com_agents_clear_search')}
        >
          <X
            className="size-5 text-text-secondary transition-colors duration-200 group-hover:text-text-primary"
            strokeWidth={2.5}
            aria-hidden="true"
          />
=======
          size="icon-sm"
          type="button"
          onClick={handleClear}
          /* `ghost` only colours its hover state, so the glyph would inherit the
             document's colour and disappear against a dark surface. */
          className="text-text-secondary absolute end-0.5 top-1/2 -translate-y-1/2 rounded-md transition-none"
          aria-label={localize('com_agents_clear_search')}
        >
          <X className="size-4" aria-hidden="true" />
>>>>>>> upstream/main
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
