import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

export default function Badge({ name, description, icon, color, earned = false, size = 'md' }) {
  const Icon = LucideIcons[icon.charAt(0).toUpperCase() + icon.slice(1)] || LucideIcons.Award;

  const sizes = {
    sm: { container: 'p-2', icon: 'w-5 h-5', text: 'text-xs' },
    md: { container: 'p-3', icon: 'w-7 h-7', text: 'text-sm' },
    lg: { container: 'p-4', icon: 'w-9 h-9', text: 'text-base' },
  };
  const s = sizes[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center gap-1.5 ${s.container} rounded-2xl ${
        earned ? 'bg-white dark:bg-dark-light shadow-lg' : 'bg-gray-100 dark:bg-dark-light/50 opacity-50'
      } ${earned ? '' : 'grayscale'}`}
    >
      <div
        className={`${s.icon} rounded-xl flex items-center justify-center`}
        style={{ color: earned ? color : '#9ca3af' }}
      >
        <Icon className={s.icon} />
      </div>
      <div className="text-center">
        <p className={`font-semibold ${s.text}`}>{name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}
