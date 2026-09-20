import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <div>
      {/* Page header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <h1 className="text-lg font-bold">Home</h1>
      </div>

      {/* Feed placeholder */}
      <div className="p-4">
        {/* Thought composer placeholder */}
        <div className="card p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="skeleton h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1">
              <div className="skeleton h-5 w-48 mb-2 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
            </div>
          </div>
        </div>

        {/* Feed skeleton */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card p-4 mb-3"
          >
            <div className="flex items-start gap-3">
              <div className="skeleton h-10 w-10 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-32 rounded" />
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-4 w-4/5 rounded" />
                <div className="flex gap-4 mt-3">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="skeleton h-6 w-12 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <p className="text-center text-sm text-muted-foreground py-8">
          🚀 Feed coming in Phase 6 — Authentication first!
        </p>
      </div>
    </div>
  );
}
