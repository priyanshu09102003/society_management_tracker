import { ReactNode } from "react";

export function AuthHero({
  children,
  fullScreen = false,
}: {
  children: ReactNode;
  fullScreen?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0d0d1b] ${
        fullScreen ? "min-h-screen" : "rounded-b-[24px]"
      }`}
    >
      {/* starfield */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20px 30px, white, transparent), radial-gradient(1px 1px at 90px 80px, white, transparent), radial-gradient(1px 1px at 150px 40px, white, transparent), radial-gradient(1px 1px at 200px 120px, white, transparent), radial-gradient(1px 1px at 60px 150px, white, transparent), radial-gradient(1px 1px at 250px 60px, white, transparent), radial-gradient(1px 1px at 300px 180px, white, transparent)",
          backgroundSize: "320px 200px",
          backgroundRepeat: "repeat",
        }}
      />
      {/* glow blob */}
      <div className="absolute -top-24 left-1/4 w-[300px] h-[300px] rounded-full bg-[#375DFB] opacity-30 blur-[80px]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}