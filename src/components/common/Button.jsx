import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 focus:ring-primary',
    secondary: 'bg-secondary hover:bg-yellow-500 text-white shadow-lg shadow-secondary/30 focus:ring-secondary',
    danger: 'bg-danger hover:bg-red-600 text-white shadow-lg shadow-danger/30 focus:ring-danger',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-dark-light text-gray-700 dark:text-gray-300',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent',
    glass: 'glass text-white border-white/30 hover:bg-white/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  return (
    <motion.button
      type={type}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </motion.button>
  );
}
