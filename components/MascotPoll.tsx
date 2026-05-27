"use client";

import { useState, useEffect } from "react";
import type { T } from "@/lib/translations";

type PollState = {
  votes: Record<string, number>;
  voted: string | null;
};

const NAMES = ["QuackFit", "Buff Duck", "Duck Norris"];
const STORAGE_KEY = "gitfit_mascot_poll";

function loadState(): PollState {
  if (typeof window === "undefined") return { votes: {}, voted: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { votes: {}, voted: null };
    return JSON.parse(raw) as PollState;
  } catch {
    return { votes: {}, voted: null };
  }
}

function saveState(state: PollState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function MascotPoll({ t }: { t: T }) {
  const [poll, setPoll] = useState<PollState>({ votes: {}, voted: null });
  const [voteFor, setVoteFor] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPoll(loadState());
    setHydrated(true);
  }, []);

  const total = Object.values(poll.votes).reduce((s, v) => s + v, 0);
  const maxVotes = Math.max(...NAMES.map((n) => poll.votes[n] ?? 0), 0);

  function handleVote() {
    if (!voteFor || poll.voted) return;
    setPoll((prev) => {
      const next: PollState = {
        votes: { ...prev.votes, [voteFor]: (prev.votes[voteFor] ?? 0) + 1 },
        voted: voteFor,
      };
      saveState(next);
      return next;
    });
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

      {poll.voted ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {NAMES.map((name) => {
            const v = poll.votes[name] ?? 0;
            const pct = total > 0 ? Math.round((v / total) * 100) : 0;
            const isLeading = v === maxVotes && maxVotes > 0;
            return (
              <div key={name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9rem",
                    marginBottom: "0.3rem",
                    fontWeight: name === poll.voted ? 700 : 400,
                    color: isLeading ? "var(--orange)" : "var(--text)",
                  }}
                >
                  <span>
                    {isLeading && "🏆 "}
                    {name}
                    {name === poll.voted && (
                      <span style={{ color: "var(--text-muted)", fontWeight: 400 }}> {t.yourVote}</span>
                    )}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
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
        </div>
      )}
    </div>
  );
}
