"use client";

import { useState } from "react";
import Image from "next/image";
import Quiz from "@/components/Quiz";
import MascotPoll from "@/components/MascotPoll";
import { translations, type Lang } from "@/lib/translations";

export default function Home() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = translations[lang];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <Image src="/mascot-picto.png" alt="GitFit picto" width={36} height={36} style={{ borderRadius: "50%" }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", letterSpacing: "0.04em" }}>GitFit</div>
          <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            {t.headerSub}
          </div>
        </div>
        <button
          onClick={() => setLang((l) => (l === "pt" ? "en" : "pt"))}
          style={{
            padding: "0.35rem 0.85rem",
            borderRadius: "0.3rem",
            border: "2px solid var(--orange)",
            backgroundColor: "transparent",
            color: "var(--orange)",
            fontFamily: "inherit",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            letterSpacing: "0.08em",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--orange)";
            e.currentTarget.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "var(--orange)";
          }}
        >
          {t.langBtn}
        </button>
      </header>

      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "2.5rem 1.25rem 4rem",
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
        }}
      >
        {/* Hero */}
        <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.75rem" }}>
          <Image
            src="/logo-full.png"
            alt="GitFit logo"
            width={340}
            height={340}
            priority
            style={{ borderRadius: "1rem", maxWidth: "100%", height: "auto" }}
          />
          <div>
            <h1
              style={{
                fontSize: "clamp(1rem, 4vw, 2rem)",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ color: "var(--orange)" }}>&lt;</span>
              {" "}Squat Quiz Challenge{" "}
              <span style={{ color: "var(--orange)" }}>/&gt;</span>
            </h1>
            <p style={{ color: "var(--text-muted)", marginTop: "0.75rem", fontSize: "0.95rem", lineHeight: 1.7 }}>
              {t.heroSub}
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <PrizeCard icon={<TagIcon />} label={t.prize1Label} desc={t.prize1Desc} />
            <PrizeCard icon={<DumbbellIcon />} label={t.prize2Label} desc={t.prize2Desc} />
          </div>
        </section>

        {/* Quiz */}
        <section>
          <SectionHeader index="01" title={t.section01} />
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <Quiz t={t} lang={lang} />
          </div>
        </section>

        {/* Mascot Poll */}
        <section>
          <SectionHeader index="02" title={t.section02} />
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.5rem 0 1.5rem" }}>
            {t.pollDesc}
          </p>
          <MascotPoll t={t} />
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.8rem",
            borderTop: "1px solid var(--border)",
            paddingTop: "2rem",
          }}
        >
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--orange)", fontWeight: 700 }}>GitFit</span> · 42 Lisboa · 2026
          </div>
          <div>jcosta-a · jastolfi</div>
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span
        style={{
          fontSize: "0.7rem",
          color: "var(--orange)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          border: "1px solid var(--orange)",
          padding: "0.15rem 0.5rem",
          borderRadius: "0.2rem",
          opacity: 0.7,
        }}
      >
        {index}
      </span>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0, letterSpacing: "0.04em" }}>{title}</h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
    </div>
  );
}

function PrizeCard({ icon, label, desc }: { icon: React.ReactNode; label: string; desc: string }) {
  return (
    <div
      style={{
        padding: "1rem 1.25rem",
        borderRadius: "0.375rem",
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-card)",
        textAlign: "center",
        minWidth: 160,
        flex: "1 1 160px",
        maxWidth: 220,
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>{icon}</div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "var(--orange)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginBottom: "0.3rem",
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{desc}</div>
    </div>
  );
}

function TagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--orange)" aria-hidden="true">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  );
}

function DumbbellIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--orange)" aria-hidden="true">
      <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 5.57 2 7.71 3.43 9.14 2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22 14.86 20.57 16.29 22 18.43 19.86 19.86 18.43 22 16.29 20.57 14.86z" />
    </svg>
  );
}
