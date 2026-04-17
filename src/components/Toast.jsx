import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { HiCheckCircle, HiInformationCircle, HiXMark } from 'react-icons/hi2';

/**
 * Toast notification component.
 * Auto-dismisses after 3 seconds.
 */
export default function Toast() {
  const { toast, dismissToast } = useCart();
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!toast) return;

    setIsExiting(false);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(dismissToast, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast, dismissToast]);

  if (!toast) return null;

  const icons = {
    success: <HiCheckCircle className="w-5 h-5 text-emerald-500" />,
    info: <HiInformationCircle className="w-5 h-5 text-primary-500" />,
  };

  const bgColors = {
    success: 'bg-emerald-50 border-emerald-200',
    info: 'bg-primary-50 border-primary-200',
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
          flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
          ${bgColors[toast.type] || bgColors.success}
          ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}
        `}
      >
        {icons[toast.type] || icons.success}
        <p className="text-sm font-medium text-surface-700 max-w-xs truncate">
          {toast.message}
        </p>
        <button
          onClick={() => {
            setIsExiting(true);
            setTimeout(dismissToast, 300);
          }}
          className="ml-2 text-surface-400 hover:text-surface-600 transition-colors"
        >
          <HiXMark className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
