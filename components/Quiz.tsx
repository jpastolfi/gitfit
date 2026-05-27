"use client";

import { useState } from "react";
import allQuestions from "@/data/questions.json";
import type { T, Lang } from "@/lib/translations";

type Question = (typeof allQuestions)[number];
type Answer = { question: Question; selectedIndex: number; correct: boolean };

const LABELS = ["A", "B", "C", "D"];
const QUIZ_SIZE = 4;
const SQUAT_GOAL = 30;

function pickRandom(pool: Question[], n: number): Question[] {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n);
}

export default function Quiz({ t, lang }: { t: T; lang: Lang }) {
  const [step, setStep] = useState<"idle" | "playing" | "result">("idle");
  const [deck, setDeck] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [squats, setSquats] = useState(0);

  const q = deck[current];

  function start() {
    setDeck(pickRandom(allQuestions, QUIZ_SIZE));
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setSquats(0);
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

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (step === "idle") {
    return (
      <div className="animate-pop" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2rem 0" }}>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", textAlign: "center", maxWidth: 480, margin: 0, whiteSpace: "pre-line" }}>
          {t.quizIntro}
        </p>
        <button className="btn-orange" onClick={start}>{t.startBtn}</button>
      </div>
    );
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (step === "result") {
    const score = answers.filter((a) => a.correct).length;
    const allCorrect = score === QUIZ_SIZE;
    const wrong = answers.filter((a) => !a.correct);
    const squatsDone = squats >= SQUAT_GOAL;

    return (
      <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Score banner */}
        <div
          style={{
            padding: "1.75rem",
            borderRadius: "0.5rem",
            border: `2px solid ${allCorrect ? "#22c55e" : "#ef4444"}`,
            backgroundColor: allCorrect ? "rgba(34,197,94,0.08)" : "rgba(239,68,68,0.08)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{allCorrect ? "🏆" : "💪"}</div>
          <div style={{ fontSize: "1.4rem", fontWeight: 700, color: allCorrect ? "#22c55e" : "#ef4444", marginBottom: "0.5rem" }}>
            {t.correctOf(score, QUIZ_SIZE)}
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            {allCorrect ? t.allCorrectMsg : t.notAllCorrectMsg}
          </div>
        </div>

        {/* Squat counter — only on perfect score */}
        {allCorrect && (
          <div
            style={{
              padding: "1.75rem",
              borderRadius: "0.5rem",
              border: `2px solid ${squatsDone ? "#22c55e" : "var(--orange)"}`,
              backgroundColor: squatsDone ? "rgba(34,197,94,0.08)" : "rgba(247,148,29,0.06)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.25rem",
            }}
          >
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
              {t.squatTitle.toUpperCase()}
            </div>

            {squatsDone ? (
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#22c55e", textAlign: "center" }}>
                {t.squatComplete}
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center", lineHeight: 1 }}>
                  <span style={{ fontSize: "4.5rem", fontWeight: 700, color: "var(--orange)" }}>{squats}</span>
                  <span style={{ fontSize: "1.5rem", color: "var(--text-muted)", fontWeight: 400 }}>/{SQUAT_GOAL}</span>
                </div>

                <div style={{ width: "100%", maxWidth: 300 }}>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${(squats / SQUAT_GOAL) * 100}%` }} />
                  </div>
                </div>

                <button
                  onClick={() => setSquats((s) => Math.min(s + 1, SQUAT_GOAL))}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "var(--orange)",
                    color: "#000",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "transform 0.1s, background-color 0.15s",
                    letterSpacing: "0.04em",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onTouchStart={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
                  onTouchEnd={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  +1
                </button>

                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {t.squatGoal}
                </div>
              </>
            )}

            <button
              className="btn-outline"
              onClick={() => setSquats(0)}
              style={{ padding: "0.4rem 1.25rem", fontSize: "0.85rem" }}
            >
              {t.squatReset}
            </button>
          </div>
        )}

        {/* Wrong answers breakdown */}
        {wrong.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              {t.wrongSection}
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
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>{a.question.question[lang]}</div>
                <div style={{ color: "#ef4444", fontSize: "0.9rem" }}>{t.yourAnswer} {a.question.options[lang][a.selectedIndex]}</div>
                <div style={{ color: "#22c55e", fontSize: "0.9rem" }}>{t.correctAnswer} {a.question.options[lang][a.question.correctIndex]}</div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    borderLeft: "3px solid var(--orange)",
                    paddingLeft: "0.75rem",
                    marginTop: "0.25rem",
                  }}
                >
                  {a.question.explanation[lang]}
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn-outline" onClick={start}>{t.tryAgainBtn}</button>
      </div>
    );
  }

  // ── PLAYING ───────────────────────────────────────────────────────────────
  const progress = (current / QUIZ_SIZE) * 100;

  return (
    <div className="animate-pop" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-muted)", fontSize: "0.85rem" }}>
        <span>
          {t.questionLabel}{" "}
          <span style={{ color: "var(--orange)", fontWeight: 700 }}>{current + 1}</span>/{QUIZ_SIZE}
        </span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div style={{ fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.5 }}>{q.question[lang]}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {q.options[lang].map((opt, idx) => (
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
        {current + 1 >= QUIZ_SIZE ? t.seeResultsBtn : t.confirmBtn}
      </button>
    </div>
  );
}
