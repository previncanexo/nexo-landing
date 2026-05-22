import bgImage from "figma:asset/fbc4fb7b7590ab076b87a1125a2fbf0a0f763c82.png";

export function BackgroundMesh() {
  return (
    <>
      {/* Base background image */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* CSS-only orbs — no JS scroll tracking, GPU-composited via transform+opacity only */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Orb 1 — Purple — Top Right */}
        <div
          style={{
            background: 'radial-gradient(circle, var(--purple) 0%, transparent 70%)',
            animation: 'orb-pulse-1 10s ease-in-out infinite',
          }}
          className="orb-animated absolute -top-32 -right-32 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full opacity-25 blur-[48px] lg:blur-[100px]"
        />

        {/* Orb 2 — Pink — Middle Left (hidden on mobile) */}
        <div
          style={{
            background: 'radial-gradient(circle, var(--pink) 0%, transparent 70%)',
            animation: 'orb-pulse-2 12s ease-in-out 3s infinite',
          }}
          className="orb-animated absolute top-1/3 -left-40 w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] rounded-full opacity-20 blur-[80px] lg:blur-[100px] hidden md:block"
        />

        {/* Orb 3 — Peach — Bottom Center (hidden on mobile) */}
        <div
          style={{
            background: 'radial-gradient(circle, var(--peach) 0%, transparent 70%)',
            animation: 'orb-pulse-2 14s ease-in-out 5s infinite',
          }}
          className="orb-animated absolute bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] lg:w-[500px] lg:h-[500px] rounded-full opacity-15 blur-[80px] lg:blur-[100px] hidden md:block"
        />
      </div>
    </>
  );
}
