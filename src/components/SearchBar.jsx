import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

/**
 * Debounced search bar input.
 * The actual debouncing happens in the parent via useDebounce hook.
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" />
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="input-field pl-10 pr-10"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
          aria-label="Clear search"
        >
          <HiXMark className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
