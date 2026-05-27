"use client";

import { useState, useEffect } from "react";
import type { T } from "@/lib/translations";

type PollState = {
  votes: Record<string, number>;
};

const NAMES = ["QuackFit", "Buff Duck", "Duck Norris"];
const STORAGE_KEY = "gitfit_mascot_poll";

function loadState(): PollState {
  if (typeof window === "undefined") return { votes: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { votes: {} };
    const parsed = JSON.parse(raw);
    return { votes: parsed.votes ?? {} };
  } catch {
    return { votes: {} };
  }
}

function saveState(state: PollState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function MascotPoll({ t }: { t: T }) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voteFor, setVoteFor] = useState<string | null>(null);
  const [justVoted, setJustVoted] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setVotes(loadState().votes);
    setHydrated(true);
  }, []);

  const total = Object.values(votes).reduce((s, v) => s + v, 0);
  const maxVotes = Math.max(...NAMES.map((n) => votes[n] ?? 0), 0);

  function handleVote() {
    if (!voteFor) return;
    const next = { ...votes, [voteFor]: (votes[voteFor] ?? 0) + 1 };
    setVotes(next);
    saveState({ votes: next });
    setJustVoted(true);
    setVoteFor(null);
    setTimeout(() => setJustVoted(false), 2000);
  }

  if (!hydrated) return null;

  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: "var(--bg-card2)",
        border: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.12em",
          color: "var(--text-muted)",
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{t.voteTitle}</span>
        {total > 0 && <span style={{ color: "var(--orange)" }}>{t.voteCount(total)}</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {NAMES.map((name) => (
          <label
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.9rem 1rem",
              borderRadius: "0.375rem",
              border: `2px solid ${voteFor === name ? "var(--orange)" : "var(--border)"}`,
              backgroundColor: voteFor === name ? "rgba(247,148,29,0.08)" : "var(--bg-card)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <input
              type="radio"
              name="mascot"
              value={name}
              checked={voteFor === name}
              onChange={() => setVoteFor(name)}
              style={{ accentColor: "var(--orange)", width: 16, height: 16 }}
            />
            <span style={{ fontWeight: voteFor === name ? 700 : 400 }}>{name}</span>
          </label>
        ))}

        <button
          className="btn-orange"
          onClick={handleVote}
          disabled={!voteFor}
          style={{ marginTop: "0.5rem" }}
        >
          {t.voteBtn}
        </button>

        {justVoted && (
          <div style={{ color: "#22c55e", fontSize: "0.85rem", textAlign: "center" }}>
            ✓ {t.voteSaved}
          </div>
        )}
      </div>
    </div>
  );
}
