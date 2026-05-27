export interface T {
  langBtn: string;
  headerSub: string;
  heroSub: string;
  prize1Label: string;
  prize1Desc: string;
  prize2Label: string;
  prize2Desc: string;
  section01: string;
  section02: string;
  pollDesc: string;
  quizIntro: string;
  startBtn: string;
  questionLabel: string;
  confirmBtn: string;
  seeResultsBtn: string;
  allCorrectMsg: string;
  notAllCorrectMsg: string;
  wrongSection: string;
  yourAnswer: string;
  correctAnswer: string;
  tryAgainBtn: string;
  correctOf: (s: number, t: number) => string;
  squatTitle: string;
  squatGoal: string;
  squatReset: string;
  squatUnit: string;
  squatComplete: string;
  voteTitle: string;
  voteBtn: string;
  yourVote: string;
  voteCount: (n: number) => string;
  voteSaved: string;
}

export const translations: Record<string, T> = {
  pt: {
    langBtn: "EN",
    headerSub: "42 LISBOA · WHERE COMMITS MEET GAINS",
    heroSub: "Acerta o quiz → faz os squats → ganhas o pin! 🦆💪",
    prize1Label: "QUIZ COMPLETO",
    prize1Desc: "Adesivo da 42 Lisboa",
    prize2Label: "QUIZ + 30–40 SQUATS",
    prize2Desc: "Pin fitness exclusivo",
    section01: "Squat Quiz",
    section02: "Nome da Mascote",
    pollDesc: "O nosso pato musculado precisa de um nome. Vota no teu favorito!",
    quizIntro: "Responde a 4 perguntas sobre saúde e fitness.\nAcerta tudo e conquista o teu adesivo da 42 Lisboa! 🏅",
    startBtn: "< Iniciar Quiz />",
    questionLabel: "Pergunta",
    confirmBtn: "Confirmar",
    seeResultsBtn: "Ver resultados",
    allCorrectMsg: "Perfeito! Ganhas o teu adesivo da 42 Lisboa. Agora faz os squats para ganhar o pin! 🦆",
    notAllCorrectMsg: "Boa tentativa! Revê as respostas abaixo e tenta outra vez.",
    wrongSection: "RESPOSTAS ERRADAS",
    yourAnswer: "A tua resposta:",
    correctAnswer: "Resposta correcta:",
    tryAgainBtn: "Tentar novamente",
    correctOf: (s, t) => `${s}/${t} correctas`,
    squatTitle: "Contador de Squats",
    squatGoal: "Meta: 30 squats",
    squatReset: "Reiniciar",
    squatUnit: "squats",
    squatComplete: "🏆 30 squats! Pin conquistado!",
    voteTitle: "VOTAR NO NOME",
    voteBtn: "Votar",
    yourVote: "← o teu voto",
    voteCount: (n) => `${n} ${n === 1 ? "voto" : "votos"}`,
    voteSaved: "Voto registado!",
  },
  en: {
    langBtn: "PT",
    headerSub: "42 LISBOA · WHERE COMMITS MEET GAINS",
    heroSub: "Ace the quiz → do the squats → win the pin! 🦆💪",
    prize1Label: "QUIZ COMPLETE",
    prize1Desc: "42 Lisboa sticker",
    prize2Label: "QUIZ + 30–40 SQUATS",
    prize2Desc: "Exclusive fitness pin",
    section01: "Squat Quiz",
    section02: "Mascot Name",
    pollDesc: "Our buff duck needs a name. Vote for your favourite!",
    quizIntro: "Answer 4 health & fitness questions.\nGet them all right and win your 42 Lisboa sticker! 🏅",
    startBtn: "< Start Quiz />",
    questionLabel: "Question",
    confirmBtn: "Confirm",
    seeResultsBtn: "See results",
    allCorrectMsg: "Perfect! You win your 42 Lisboa sticker. Now do the squats to win the pin! 🦆",
    notAllCorrectMsg: "Good try! Check the answers below and try again.",
    wrongSection: "WRONG ANSWERS",
    yourAnswer: "Your answer:",
    correctAnswer: "Correct answer:",
    tryAgainBtn: "Try again",
    correctOf: (s, t) => `${s}/${t} correct`,
    squatTitle: "Squat Counter",
    squatGoal: "Goal: 30 squats",
    squatReset: "Reset",
    squatUnit: "squats",
    squatComplete: "🏆 30 squats! Pin earned!",
    voteTitle: "VOTE FOR THE NAME",
    voteBtn: "Vote",
    yourVote: "← your vote",
    voteCount: (n) => `${n} ${n === 1 ? "vote" : "votes"}`,
    voteSaved: "Vote registered!",
  },
};

export type Lang = "pt" | "en";
