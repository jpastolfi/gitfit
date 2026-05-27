"use client";

import { useState, useEffect } from "react";

type PollState = {
  names: string[];
  votes: Record<string, number>;
  voted: string | null;
};

const INITIAL_NAMES = ["QuackFit", "Buff Duck", "Duck Norris"];
const STORAGE_KEY = "gitfit_mascot_poll";

function loadState(): PollState {
  if (typeof window === "undefined")
    return { names: INITIAL_NAMES, votes: {}, voted: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { names: INITIAL_NAMES, votes: {}, voted: null };
    const parsed = JSON.parse(raw) as PollState;
    // Ensure initial names are always present
    const merged = Array.from(new Set([...INITIAL_NAMES, ...parsed.names]));
    return { ...parsed, names: merged };
  } catch {
    return { names: INITIAL_NAMES, votes: {}, voted: null };
  }
}

function saveState(state: PollState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export default function MascotPoll() {
  const [poll, setPoll] = useState<PollState>({ names: INITIAL_NAMES, votes: {}, voted: null });
  const [suggestion, setSuggestion] = useState("");
  const [suggested, setSuggested] = useState(false);
  const [voteFor, setVoteFor] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPoll(loadState());
    setHydrated(true);
  }, []);

  function totalVotes() {
    return Object.values(poll.votes).reduce((s, v) => s + v, 0);
  }

  function handleVote() {
    if (!voteFor || poll.voted) return;
    setPoll((prev) => {
      const next: PollState = {
        ...prev,
        votes: { ...prev.votes, [voteFor]: (prev.votes[voteFor] ?? 0) + 1 },
        voted: voteFor,
      };
      saveState(next);
      return next;
    });
  }

  function handleSuggest(e: React.FormEvent) {
    e.preventDefault();
    const name = suggestion.trim();
    if (!name || name.length > 40) return;
    if (poll.names.map((n) => n.toLowerCase()).includes(name.toLowerCase())) {
      setSuggestion("");
      return;
    }
    setPoll((prev) => {
      const next: PollState = { ...prev, names: [...prev.names, name] };
      saveState(next);
      return next;
    });
    setSuggestion("");
    setSuggested(true);
    setTimeout(() => setSuggested(false), 3000);
  }

  const total = totalVotes();

  if (!hydrated) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Suggest a name */}
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
          }}
        >
          SUGERIR UM NOME
        </div>
        <form onSubmit={handleSuggest} style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Ex: Ducky McFitface"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            maxLength={40}
            style={{
              flex: 1,
              minWidth: 180,
              padding: "0.75rem 1rem",
              borderRadius: "0.375rem",
              border: "2px solid var(--border)",
              backgroundColor: "var(--bg-card)",
              color: "var(--text)",
              fontFamily: "inherit",
              fontSize: "0.95rem",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--orange)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          <button
            type="submit"
            className="btn-orange"
            disabled={!suggestion.trim()}
            style={{ padding: "0.75rem 1.25rem" }}
          >
            Sugerir
          </button>
        </form>
        {suggested && (
          <div style={{ color: "#22c55e", fontSize: "0.85rem", marginTop: "0.5rem" }}>
            Nome adicionado à lista! ✓
          </div>
        )}
      </div>

      {/* Vote */}
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
          <span>VOTAR NO NOME</span>
          {total > 0 && (
            <span style={{ color: "var(--orange)" }}>{total} {total === 1 ? "voto" : "votos"}</span>
          )}
        </div>

        {poll.voted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {poll.names.map((name) => {
              const v = poll.votes[name] ?? 0;
              const pct = total > 0 ? Math.round((v / total) * 100) : 0;
              const isWinner = poll.voted && v === Math.max(...poll.names.map((n) => poll.votes[n] ?? 0));
              return (
                <div key={name}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      marginBottom: "0.3rem",
                      fontWeight: name === poll.voted ? 700 : 400,
                      color: isWinner && total > 0 ? "var(--orange)" : "var(--text)",
                    }}
                  >
                    <span>
                      {isWinner && total > 0 && "🏆 "}
                      {name}
                      {name === poll.voted && " ← o teu voto"}
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
            {poll.names.map((name) => (
              <label
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.9rem 1rem",
                  borderRadius: "0.375rem",
                  border: `2px solid ${voteFor === name ? "var(--orange)" : "var(--border)"}`,
                  backgroundColor:
                    voteFor === name
                      ? "rgba(247,148,29,0.08)"
                      : "var(--bg-card)",
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
              Votar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
