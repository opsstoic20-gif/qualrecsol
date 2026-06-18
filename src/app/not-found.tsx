import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
        background: "var(--gradient-brand)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 400px at 50% 0%, rgba(255,255,255,0.12), transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: "520px" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "clamp(64px, 14vw, 120px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: "#93B4F7" }}>404</div>
        <h1 style={{ color: "#fff", marginTop: "12px", fontSize: "clamp(1.75rem, 1.4rem + 1.5vw, 2.25rem)" }}>This page isn&apos;t here.</h1>
        <p style={{ marginTop: "14px", color: "rgba(255,255,255,0.82)", fontSize: "17px", lineHeight: 1.6 }}>
          The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
        </p>
        {/* faint pipeline motif */}
        <div aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0", margin: "36px auto", maxWidth: "320px" }}>
          <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.35)" }} />
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 4 ? 1 : "0 0 auto" }}>
              <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#fff", flex: "0 0 auto" }} />
              {i < 4 && <div style={{ flex: 1, height: "2px", background: "rgba(255,255,255,0.35)" }} />}
            </div>
          ))}
        </div>
        <Link
          href="/"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fff", color: "var(--brand-ink)", borderRadius: "10px", padding: "14px 24px", fontFamily: "var(--font-body)", fontSize: "16px", fontWeight: 600 }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
