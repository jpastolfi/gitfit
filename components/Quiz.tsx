"use client";

import { useState } from "react";
import questions from "@/data/questions.json";

type Answer = { questionId: number; selectedIndex: number; correct: boolean };

const LABELS = ["A", "B", "C", "D"];

export default function Quiz() {
  const [step, setStep] = useState<"idle" | "playing" | "result">("idle");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const q = questions[current];
  const totalQ = questions.length;

  function start() {
    setStep("playing");
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setAnswers([]);
  }

  function selectOption(idx: number) {
    if (revealed) return;
    setSelected(idx);
  }

  function confirm() {
    if (selected === null || revealed) return;
    const correct = selected === q.correctIndex;
    setAnswers((prev) => [
      ...prev,
      { questionId: q.id, selectedIndex: selected, correct },
    ]);
    setRevealed(true);
  }

  function next() {
    if (current + 1 >= totalQ) {
      setStep("result");
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  if (step === "idle") {
    return (
      <div className="animate-pop flex flex-col items-center gap-6 py-8">
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", textAlign: "center", maxWidth: 480 }}>
          Responde a {totalQ} perguntas sobre saúde e fitness.<br />
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
    const allCorrect = score === totalQ;
    const wrong = answers.filter((a) => !a.correct);

    return (
      <div className="animate-pop flex flex-col gap-6">
        <div
          style={{
            padding: "2rem",
            borderRadius: "0.5rem",
            border: `2px solid ${allCorrect ? "#22c55e" : "#ef4444"}`,
            backgroundColor: allCorrect
              ? "rgba(34,197,94,0.08)"
              : "rgba(239,68,68,0.08)",
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
            {score}/{totalQ} correctas
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            {allCorrect
              ? "Perfeito! Ganhas o teu adesivo da 42 Lisboa. Agora vem fazer os squats para ganhar o pin! 🦆"
              : "Boa tentativa! Revê as respostas abaixo e tenta outra vez."}
          </div>
        </div>

        {wrong.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
              PERGUNTAS ERRADAS
            </div>
            {wrong.map((a) => {
              const wq = questions.find((q) => q.id === a.questionId)!;
              return (
                <div
                  key={a.questionId}
                  style={{
                    padding: "1.25rem",
                    borderRadius: "0.375rem",
                    backgroundColor: "var(--bg-card2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{wq.question}</div>
                  <div style={{ color: "#ef4444", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                    A tua resposta: {wq.options[a.selectedIndex]}
                  </div>
                  <div style={{ color: "#22c55e", fontSize: "0.9rem", marginBottom: "0.75rem" }}>
                    Resposta correcta: {wq.options[wq.correctIndex]}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      borderLeft: "3px solid var(--orange)",
                      paddingLeft: "0.75rem",
                    }}
                  >
                    {wq.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button className="btn-outline" onClick={start}>
          Tentar novamente
        </button>
      </div>
    );
  }

  // Playing
  const progress = ((current) / totalQ) * 100;

  return (
    <div className="animate-pop flex flex-col gap-6">
      <div className="flex items-center justify-between" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
        <span>
          Pergunta{" "}
          <span style={{ color: "var(--orange)", fontWeight: 700 }}>{current + 1}</span>/{totalQ}
        </span>
        <span>
          {answers.filter((a) => a.correct).length} correctas
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.5 }}>
        {q.question}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {q.options.map((opt, idx) => {
          let cls = "option-btn";
          if (revealed) {
            if (idx === q.correctIndex) cls += " correct";
            else if (idx === selected) cls += " wrong";
          } else if (idx === selected) {
            cls += " selected";
          }

          return (
            <button
              key={idx}
              className={cls}
              onClick={() => selectOption(idx)}
              disabled={revealed}
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
          );
        })}
      </div>

      {revealed && (
        <div
          style={{
            fontSize: "0.9rem",
            color: "var(--text-muted)",
            borderLeft: "3px solid var(--orange)",
            paddingLeft: "0.75rem",
          }}
        >
          {q.explanation}
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        {!revealed ? (
          <button
            className="btn-orange"
            onClick={confirm}
            disabled={selected === null}
            style={{ flex: 1 }}
          >
            Confirmar
          </button>
        ) : (
          <button className="btn-orange" onClick={next} style={{ flex: 1 }}>
            {current + 1 >= totalQ ? "Ver resultados" : "Próxima →"}
          </button>
        )}
      </div>
    </div>
  );
}
