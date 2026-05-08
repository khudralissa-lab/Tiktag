export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: "#000" }}>
      {/* Cover shimmer */}
      <div className="w-full h-[160px] animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />

      {/* Hero content */}
      <div className="px-5 text-center">
        {/* Avatar */}
        <div className="flex justify-center" style={{ marginTop: -44 }}>
          <div
            className="w-[88px] h-[88px] rounded-full animate-pulse shrink-0"
            style={{ background: "rgba(255,255,255,0.08)", border: "3px solid #000" }}
          />
        </div>

        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="h-7 w-44 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="h-4 w-28 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-3.5 w-20 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>

        <div className="mt-5 space-y-2.5">
          <div className="h-[52px] rounded-[18px] animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-10 rounded-xl animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar shimmer */}
      <div className="mt-5 px-4">
        <div
          className="flex gap-1.5 p-1 rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {[68, 60, 80, 52, 68].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-xl animate-pulse shrink-0"
              style={{ width: w, background: "rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>
      </div>

      {/* Content shimmer */}
      <div className="px-5 mt-6 space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-16 rounded-2xl animate-pulse"
            style={{ background: "rgba(255,255,255,0.03)", opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
