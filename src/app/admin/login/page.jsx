"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { QR } from "@/components/ui";

const el = React.createElement;

function Shell({ children }) {
  return el("main", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", background: "var(--surface-2)" } },
    el("div", { style: { width: "100%", maxWidth: "420px" } },
      el("div", { style: { textAlign: "center", marginBottom: "24px" } },
        /* eslint-disable-next-line @next/next/no-img-element */
        el("img", { src: "/logo-qualrec.png", alt: "Qualrec Solutions", style: { height: "44px", margin: "0 auto" } }),
        el("div", { style: { marginTop: "8px", fontFamily: "var(--font-body)", fontSize: "12px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 } }, "Admin")),
      el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "32px" } }, children)));
}

export default function AdminLogin() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [step, setStep] = React.useState("password"); // 'password' | 'challenge'
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [factorId, setFactorId] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  // If already fully authenticated, skip to dashboard.
  React.useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (data?.currentLevel === "aal2") router.replace("/admin");
    })();
  }, [supabase, router]);

  async function onPassword(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) { setErr(error.message || "Invalid email or password."); setBusy(false); return; }

      const { data: factors, error: fErr } = await supabase.auth.mfa.listFactors();
      if (fErr) { setErr(fErr.message); setBusy(false); return; }
      const verified = (factors?.totp || []).find((f) => f.status === "verified");
      if (!verified) {
        router.replace("/admin/enroll-2fa");
        return;
      }
      setFactorId(verified.id);
      setStep("challenge");
      setBusy(false);
    } catch (e) {
      setErr("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  async function onChallenge(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({ factorId });
      if (cErr) { setErr(cErr.message); setBusy(false); return; }
      const { error: vErr } = await supabase.auth.mfa.verify({ factorId, challengeId: challenge.id, code: code.trim() });
      if (vErr) { setErr("That code didn't match. Try again."); setBusy(false); return; }
      router.replace("/admin");
      router.refresh();
    } catch (e) {
      setErr("Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  if (step === "challenge") {
    return el(Shell, null,
      el("h1", { style: { fontSize: "22px", marginBottom: "6px" } }, "Two-factor code"),
      el("p", { style: { fontSize: "14px", color: "var(--body)", marginBottom: "22px", lineHeight: 1.55 } }, "Enter the 6-digit code from your authenticator app."),
      el("form", { onSubmit: onChallenge },
        el(QR.Input, { label: "6-digit code", value: code, onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", autoComplete: "one-time-code", placeholder: "123456", autoFocus: true }),
        err && el("div", { role: "alert", style: { marginTop: "14px", color: "#B91C1C", fontSize: "13.5px" } }, err),
        el("div", { style: { marginTop: "20px" } }, el(QR.Button, { type: "submit", variant: "primary", size: "lg", disabled: busy || code.length < 6, style: { width: "100%" } }, busy ? "Verifying…" : "Verify & sign in"))));
  }

  return el(Shell, null,
    el("h1", { style: { fontSize: "22px", marginBottom: "6px" } }, "Sign in"),
    el("p", { style: { fontSize: "14px", color: "var(--body)", marginBottom: "22px", lineHeight: 1.55 } }, "Admin access to manage jobs, applications, and messages."),
    el("form", { onSubmit: onPassword, style: { display: "flex", flexDirection: "column", gap: "16px" } },
      el(QR.Input, { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), autoComplete: "username", required: true }),
      el(QR.Input, { label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), autoComplete: "current-password", required: true }),
      err && el("div", { role: "alert", style: { color: "#B91C1C", fontSize: "13.5px" } }, err),
      el(QR.Button, { type: "submit", variant: "primary", size: "lg", disabled: busy, style: { width: "100%" } }, busy ? "Signing in…" : "Continue")));
}
