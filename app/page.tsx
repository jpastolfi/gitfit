import Image from "next/image";
import Quiz from "@/components/Quiz";
import MascotPoll from "@/components/MascotPoll";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "var(--bg-card)",
        }}
      >
        <Image src="/mascot.png" alt="GitFit mascot" width={40} height={40} />
        <div>
          <div style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
            <span style={{ color: "var(--orange)" }}>&lt;</span>
            GitFit
            <span style={{ color: "var(--orange)" }}> /&gt;</span>
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
            42 LISBOA · WHERE COMMITS MEET GAINS
          </div>
        </div>
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
        <section style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <Image
            src="/mascot.png"
            alt="GitFit mascot duck"
            width={160}
            height={160}
            priority
          />
          <div>
            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 3rem)",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--orange)" }}>&lt;</span>
              Squat Quiz Challenge
              <span style={{ color: "var(--orange)" }}> /&gt;</span>
            </h1>
            <p
              style={{
                color: "var(--text-muted)",
                marginTop: "0.75rem",
                fontSize: "0.95rem",
                lineHeight: 1.7,
              }}
            >
              Acerta o quiz → faz os squats → ganhas o pin! 🦆💪
            </p>
          </div>

          {/* Prize info */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <PrizeCard
              emoji="🏷️"
              label="Quiz completo"
              desc="Adesivo da 42 Lisboa"
            />
            <PrizeCard
              emoji="📌"
              label="Quiz + 30–40 squats"
              desc="Pin fitness exclusivo"
            />
          </div>
        </section>

        {/* Quiz */}
        <section>
          <SectionHeader index="01" title="Squat Quiz" />
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <Quiz />
          </div>
        </section>

        {/* Mascot Poll */}
        <section>
          <SectionHeader index="02" title="Nome da Mascote" />
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: "0.5rem 0 1.5rem" }}>
            O nosso pato musculado precisa de um nome. Vota no teu favorito!
          </p>
          <MascotPoll />
        </section>

        {/* Footer */}
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
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: 700,
          margin: 0,
          letterSpacing: "0.04em",
        }}
      >
        {title}
      </h2>
      <div style={{ flex: 1, height: "1px", backgroundColor: "var(--border)" }} />
    </div>
  );
}

function PrizeCard({ emoji, label, desc }: { emoji: string; label: string; desc: string }) {
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
      <div style={{ fontSize: "1.75rem", marginBottom: "0.4rem" }}>{emoji}</div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "var(--orange)",
          fontWeight: 700,
          letterSpacing: "0.08em",
          marginBottom: "0.3rem",
        }}
      >
        {label.toUpperCase()}
      </div>
      <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{desc}</div>
    </div>
  );
}
