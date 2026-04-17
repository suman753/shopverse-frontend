import { memo } from 'react';

/**
 * Category filter chips.
 * Renders clickable category buttons with an "All" option.
 */
function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('')}
        className={`
          px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${
            !selected
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
          }
        `}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200
            ${
              selected === cat
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default memo(CategoryFilter);
