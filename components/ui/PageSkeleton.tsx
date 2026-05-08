export default function PageSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="p-4 md:p-8 max-w-2xl">
      <div className="h-7 w-40 bg-white/[0.06] rounded-xl animate-pulse mb-2" />
      <div className="h-4 w-64 bg-white/[0.04] rounded-lg animate-pulse mb-8" />
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-12 bg-white/[0.04] rounded-xl animate-pulse" style={{ opacity: 1 - i * 0.1 }} />
        ))}
      </div>
    </div>
  );
}
