export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen mx-auto" style={{ background: "#000", maxWidth: 460 }}>
      {/* Cover shimmer */}
      <div className="w-full h-[180px] animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />

      {/* Hero content */}
      <div className="px-5 pb-6 text-center">
        {/* Avatar */}
        <div className="flex justify-center" style={{ marginTop: -52 }}>
          <div
            className="w-[104px] h-[104px] rounded-full animate-pulse shrink-0"
            style={{ background: "rgba(255,255,255,0.08)", border: "3.5px solid #000" }}
          />
        </div>

        <div className="mt-3 flex flex-col items-center gap-2.5">
          <div className="h-8 w-48 rounded-xl animate-pulse" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="h-4 w-32 rounded-lg animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }} />
          <div className="h-3.5 w-24 rounded animate-pulse" style={{ background: "rgba(255,255,255,0.04)" }} />
        </div>

        <div className="mt-5 space-y-2.5">
          <div className="h-[54px] rounded-[18px] animate-pulse" style={{ background: "rgba(255,255,255,0.06)" }} />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 h-11 rounded-[14px] animate-pulse"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar shimmer */}
      <div className="px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="flex gap-0.5 p-1 rounded-[18px] overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          {[68, 60, 80, 52, 68].map((w, i) => (
            <div
              key={i}
              className="h-9 flex-1 rounded-[14px] animate-pulse shrink-0"
              style={{ background: "rgba(255,255,255,0.05)" }}
            />
          ))}
        </div>
      </div>

      {/* Content shimmer */}
      <div className="px-4 mt-5 space-y-3">
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
