"use client";

import { useState } from "react";
import allQuestions from "@/data/questions.json";

type Question = (typeof allQuestions)[number];
type Answer = { question: Question; selectedIndex: number; correct: boolean };

const LABELS = ["A", "B", "C", "D"];
const QUIZ_SIZE = 4;

function pickRandom(pool: Question[], n: number): Question[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export default function Quiz() {
  const [step, setStep] = useState<"idle" | "playing" | "result">("idle");
  const [deck, setDeck] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const q = deck[current];

  function start() {
    setDeck(pickRandom(allQuestions, QUIZ_SIZE));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setStep("playing");
  }

  function confirm() {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    const newAnswers = [...answers, { question: q, selectedIndex: selected, correct }];
    setAnswers(newAnswers);

    if (current + 1 >= QUIZ_SIZE) {
      setStep("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  if (step === "idle") {
    return (
      <div className="animate-pop" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2rem 0" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", textAlign: "center", maxWidth: 480, margin: 0 }}>
          Responde a {QUIZ_SIZE} perguntas sobre saúde e fitness.<br />
          Acerta tudo e conquista o teu adesivo da 42 Lisboa! 🏅
        </p>
        <button className="btn-orange" onClick={start}>
          &lt; Iniciar Quiz /&gt;
        </button>
      </div>
    );
  }

  if (step === "result") {
    const score = answers.filter((a) => a.correct).length;
    const allCorrect = score === QUIZ_SIZE;
    const wrong = answers.filter((a) => !a.correct);

    return (
      <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div
          style={{
            padding: "2rem",
            borderRadius: "0.5rem",
            border: `2px solid ${allCorrect ? "#22c55e" : "#ef4444"}`,
            backgroundColor: allCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            {allCorrect ? "🏆" : "💪"}
          </div>
          <div
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              color: allCorrect ? "#22c55e" : "#ef4444",
              marginBottom: "0.5rem",
            }}
          >
            {score}/{QUIZ_SIZE} correctas
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            {allCorrect
              ? "Perfeito! Ganhas o teu adesivo da 42 Lisboa. Agora vem fazer os squats para ganhar o pin! 🦆"
              : "Boa tentativa! Revê as respostas abaixo e tenta outra vez."}
          </div>
        </div>

        {wrong.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              RESPOSTAS ERRADAS
            </div>
            {wrong.map((a, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "var(--bg-card2)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{a.question.question}</div>
                <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>
                  A tua resposta: {a.question.options[a.selectedIndex]}
                </div>
                <div style={{ color: "#22c55e", fontSize: "0.9rem" }}>
                  Resposta correcta: {a.question.options[a.question.correctIndex]}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    borderLeft: "3px solid var(--orange)",
                    paddingLeft: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {a.question.explanation}
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn-outline" onClick={start}>
          Tentar novamente
        </button>
      </div>
    );
  }

  // Playing — no feedback, just selection
  const progress = (current / QUIZ_SIZE) * 100;

  return (
    <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        <span>
          Pergunta{" "}
          <span style={{ color: "var(--orange)", fontWeight: 700 }}>{current + 1}</span>/{QUIZ_SIZE}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.5 }}>
        {q.question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className={`option-btn${selected === idx ? " selected" : ""}`}
            onClick={() => setSelected(idx)}
          >
            <span
              style={{
                minWidth: "1.5rem",
                height: "1.5rem",
                borderRadius: "50%",
                border: "2px solid currentColor",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                opacity: 0.7,
                flexShrink: 0,
              }}
            >
              {LABELS[idx]}
            </span>
            {opt}
          </button>
        ))}
      </div>

      <button
        className="btn-orange"
        onClick={confirm}
        disabled={selected === null}
        style={{ width: "100%" }}
      >
        {current + 1 >= QUIZ_SIZE ? "Ver resultados" : "Confirmar"}
      </button>
    </div>
  );
}
