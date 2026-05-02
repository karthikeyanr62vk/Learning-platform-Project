import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, max = 100, label, showPercentage = true, className = '' }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-sm">
          {label && <span className="text-gray-600 dark:text-gray-400 font-medium">{label}</span>}
          {showPercentage && (
            <span className="text-primary font-bold">{percentage}%</span>
          )}
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-200 dark:bg-dark-light rounded-full overflow-hidden">
        <motion.div
          className="h-full gradient-bg-card rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
