"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { QR } from "@/components/ui";

const el = React.createElement;

export default function Enroll2FA() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [qr, setQr] = React.useState("");
  const [secret, setSecret] = React.useState("");
  const [factorId, setFactorId] = React.useState("");
  const [code, setCode] = React.useState("");
  const [err, setErr] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin/login"); return; }
      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aal?.currentLevel === "aal2") { router.replace("/admin"); return; }
      try {
        // Remove any stale unverified factors so enroll doesn't conflict.
        const { data: factors } = await supabase.auth.mfa.listFactors();
        for (const f of factors?.all || []) {
          if (f.factor_type === "totp" && f.status !== "verified") {
            await supabase.auth.mfa.unenroll({ factorId: f.id });
          }
        }
        const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp", friendlyName: "Authenticator" });
        if (error) { setErr(error.message); setLoading(false); return; }
        setFactorId(data.id);
        setQr(data.totp.qr_code);
        setSecret(data.totp.secret);
        setLoading(false);
      } catch (e) {
        setErr("Could not start 2FA setup. Please try again.");
        setLoading(false);
      }
    })();
  }, [supabase, router]);

  async function onVerify(e) {
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

  return el("main", { style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", background: "var(--surface-2)" } },
    el("div", { style: { width: "100%", maxWidth: "460px" } },
      el("div", { style: { textAlign: "center", marginBottom: "24px" } },
        /* eslint-disable-next-line @next/next/no-img-element */
        el("img", { src: "/logo-qualrec.png", alt: "Qualrec Solutions", style: { height: "44px", margin: "0 auto" } })),
      el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", boxShadow: "var(--shadow-sm)", padding: "32px" } },
        el("h1", { style: { fontSize: "22px", marginBottom: "6px" } }, "Set up two-factor authentication"),
        el("p", { style: { fontSize: "14px", color: "var(--body)", marginBottom: "22px", lineHeight: 1.55 } }, "Scan the QR code with an authenticator app (Google Authenticator, Authy, 1Password), then enter the 6-digit code to finish."),
        loading
          ? el("p", { style: { color: "var(--muted)", fontSize: "14px" } }, "Preparing…")
          : el(React.Fragment, null,
              qr && el("div", { style: { display: "flex", justifyContent: "center", marginBottom: "16px" } },
                /* eslint-disable-next-line @next/next/no-img-element */
                el("img", { src: qr, alt: "TOTP QR code", width: 200, height: 200, style: { border: "1px solid var(--hairline)", borderRadius: "12px" } })),
              secret && el("div", { style: { textAlign: "center", marginBottom: "20px" } },
                el("div", { style: { fontSize: "12px", color: "var(--muted)", marginBottom: "4px" } }, "Or enter this key manually"),
                el("code", { style: { fontSize: "13px", color: "var(--ink)", background: "var(--surface-2)", padding: "6px 10px", borderRadius: "8px", letterSpacing: "0.05em", wordBreak: "break-all" } }, secret)),
              el("form", { onSubmit: onVerify },
                el(QR.Input, { label: "6-digit code", value: code, onChange: (e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6)), inputMode: "numeric", autoComplete: "one-time-code", placeholder: "123456" }),
                err && el("div", { role: "alert", style: { marginTop: "14px", color: "#B91C1C", fontSize: "13.5px" } }, err),
                el("div", { style: { marginTop: "20px" } }, el(QR.Button, { type: "submit", variant: "primary", size: "lg", disabled: busy || code.length < 6, style: { width: "100%" } }, busy ? "Verifying…" : "Verify & continue")))),
        err && loading && el("div", { role: "alert", style: { marginTop: "14px", color: "#B91C1C", fontSize: "13.5px" } }, err))));
}
