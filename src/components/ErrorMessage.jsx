import { HiExclamationTriangle } from 'react-icons/hi2';

/**
 * Reusable error message component.
 */
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <HiExclamationTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-surface-800 mb-2">
        Something went wrong
      </h3>
      <p className="text-surface-500 text-center max-w-md mb-6">
        {message || 'An unexpected error occurred. Please try again.'}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}
