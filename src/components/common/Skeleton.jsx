import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-dark-light rounded-2xl overflow-hidden shadow-lg animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-700" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
        <div className="flex gap-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16" />
          <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-16" />
        </div>
        <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-full" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-3 bg-gray-300 dark:bg-gray-700 rounded"
          style={{ width: `${100 - i * 10}%` }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-64 mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
