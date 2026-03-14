"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import crystalsData from "@/app/data/crystals.json";

// Minimal crystal type for quiz purposes
interface QuizCrystal {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  hardness: number;
}

const allCrystals: QuizCrystal[] = crystalsData.map((c) => ({
  id: c.id,
  name: c.name,
  subtitle: c.subtitle,
  category: c.category,
  hardness: c.hardness,
}));

// ── Group matching (inline, mirrors groups.ts logic) ─────────
const GROUP_PATTERNS: { patterns: string[]; ids?: string[] }[] = [
  { patterns: ["quartz", "chalcedony"], ids: ["aqua-aura-quartz", "opal", "pink-opal", "fire-opal", "boulder-opal"] },
  { patterns: ["feldspar", "feldspathoid"], ids: ["rainbow-moonstone"] },
  { patterns: ["garnet"] },
  { patterns: ["tourmaline"], ids: ["tourmaline", "black-tourmaline", "watermelon-tourmaline", "tourmalinated-quartz", "rubellite", "indicolite", "paraiba-tourmaline"] },
  { patterns: ["beryl"] },
  { patterns: ["carbonate"], ids: ["malachite", "azurite", "rhodochrosite", "smithsonite", "dolomite", "aragonite", "calcite", "caribbean-calcite", "green-calcite", "orange-calcite", "mangano-calcite", "cobaltocalcite", "optical-calcite", "gaspeite"] },
  { patterns: ["sulfide"] },
  { patterns: ["oxide", "hydroxide", "corundum", "chrysoberyl", "spinel"], ids: ["ruby", "sapphire", "spinel", "chrysoberyl", "cats-eye-chrysoberyl", "alexandrite", "goethite", "diaspore"] },
  { patterns: ["phosphate", "arsenate", "vanadate", "apatite"], ids: ["turquoise", "variscite", "wavellite", "blue-apatite", "fluorapatite", "amblygonite"] },
  { patterns: ["sulfate"], ids: ["selenite", "celestite", "barite", "desert-rose"] },
  { patterns: ["native element", "carbide"], ids: ["gold", "silver", "native-copper", "platinum", "diamond", "native-sulfur", "bismuth"] },
  { patterns: ["organic"], ids: ["amber", "pearl", "coral", "jet", "ammolite", "petrified-wood"] },
  { patterns: ["volcanic glass", "volcanic rock", "impact glass", "tektite", "natural glass", "rhyolite"], ids: ["obsidian", "mahogany-obsidian", "rainbow-obsidian", "snowflake-obsidian", "moldavite", "tektite", "fulgurite", "libyan-desert-glass", "apache-tear", "lava-rock"] },
  { patterns: ["pyroxene", "amphibole", "inosilicate", "spodumene"], ids: ["nephrite", "actinolite", "kunzite", "hiddenite", "bronzite"] },
  { patterns: ["mica", "phyllosilicate", "clinochlore"], ids: ["muscovite", "lepidolite", "fuchsite", "seraphinite", "serpentine", "soapstone", "talc"] },
  { patterns: ["zeolite"], ids: ["stilbite", "apophyllite", "scolecite", "prehnite", "okenite", "cavansite"] },
  { patterns: ["epidote", "zoisite", "sorosilicate"], ids: ["epidote", "tanzanite", "thulite", "ruby-zoisite", "vesuvianite", "piemontite"] },
  { patterns: ["halide", "fluorite"], ids: ["fluorite", "blue-halite"] },
  { patterns: ["nesosilicate", "cyclosilicate", "tectosilicate", "silicate mineral", "silicate group", "olivine", "cordierite", "pectolite", "charoite"], ids: ["topaz", "imperial-topaz", "blue-topaz", "kyanite", "black-kyanite", "zircon", "staurolite", "dumortierite", "peridot", "titanite", "chiastolite", "iolite", "sugilite", "dioptase", "benitoite", "eudialyte", "danburite", "larimar", "charoite", "jade"] },
  { patterns: ["igneous rock", "metamorphic rock", "altered granite", "granite with", "banded iron", "concretion", "sedimentary rock"], ids: ["lapis-lazuli", "unakite", "septarian", "k2-stone", "nuummite", "preseli-bluestone", "dalmatian-stone", "tigers-iron", "chrysanthemum-stone", "shungite", "tiffany-stone"] },
];

function getCrystalGroupIndex(crystal: QuizCrystal): number {
  // Check explicit ID matches first
  for (let i = 0; i < GROUP_PATTERNS.length; i++) {
    if (GROUP_PATTERNS[i].ids?.includes(crystal.id)) return i;
  }
  // Then check category patterns
  const cat = crystal.category.toLowerCase();
  for (let i = 0; i < GROUP_PATTERNS.length; i++) {
    if (GROUP_PATTERNS[i].patterns.some((p) => cat.includes(p.toLowerCase()))) return i;
  }
  return -1;
}

// ── Shuffle helper ───────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Build wrong answers ──────────────────────────────────────
function pickWrongAnswers(correct: QuizCrystal, pool: QuizCrystal[]): QuizCrystal[] {
  const correctGroup = getCrystalGroupIndex(correct);
  const others = pool.filter((c) => c.id !== correct.id);

  // Priority 1: same mineral group
  const sameGroup = others.filter((c) => correctGroup >= 0 && getCrystalGroupIndex(c) === correctGroup);
  // Priority 2: similar hardness
  const similarHardness = others.filter((c) => Math.abs(c.hardness - correct.hardness) <= 1.5 && !sameGroup.includes(c));

  const candidates = [...shuffle(sameGroup), ...shuffle(similarHardness), ...shuffle(others)];
  const seen = new Set<string>();
  const result: QuizCrystal[] = [];
  for (const c of candidates) {
    if (!seen.has(c.id)) {
      seen.add(c.id);
      result.push(c);
      if (result.length === 3) break;
    }
  }
  return result;
}

// ── Generate quiz questions ──────────────────────────────────
interface Question {
  correct: QuizCrystal;
  options: QuizCrystal[];
}

function generateQuestions(count: number): Question[] {
  const picked = shuffle(allCrystals).slice(0, count);
  return picked.map((correct) => {
    const wrong = pickWrongAnswers(correct, allCrystals);
    const options = shuffle([correct, ...wrong]);
    return { correct, options };
  });
}

// ── Score messages ────────────────────────────────────────────
function getScoreMessage(score: number): string {
  if (score === 10) return "Perfect. You might be a geologist.";
  if (score >= 8) return "Impressive. You know your minerals.";
  if (score >= 6) return "Solid. A few tricky ones in there.";
  if (score >= 4) return "Not bad. The rare ones are tough.";
  return "Keep exploring. Every expert started here.";
}

const TOTAL_QUESTIONS = 10;

// ── Quiz Component ───────────────────────────────────────────
export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"playing" | "revealed" | "done">("playing");

  // Generate questions on mount
  useEffect(() => {
    setQuestions(generateQuestions(TOTAL_QUESTIONS));
  }, []);

  const handleAnswer = useCallback(
    (crystalId: string) => {
      if (phase !== "playing" || !questions[current]) return;
      setSelected(crystalId);
      const isCorrect = crystalId === questions[current].correct.id;
      if (isCorrect) setScore((s) => s + 1);
      setPhase("revealed");

      setTimeout(() => {
        if (current + 1 >= TOTAL_QUESTIONS) {
          setPhase("done");
        } else {
          setCurrent((c) => c + 1);
          setSelected(null);
          setPhase("playing");
        }
      }, 1500);
    },
    [phase, current, questions]
  );

  const playAgain = useCallback(() => {
    setQuestions(generateQuestions(TOTAL_QUESTIONS));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setPhase("playing");
  }, []);

  // Loading state
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <p className="text-brand-muted font-body text-center">Loading quiz...</p>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className="max-w-2xl mx-auto px-4 py-20">
      {/* Page header */}
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Test Your Knowledge
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Crystal <em>Quiz</em>
      </h1>
      <p className="text-brand-muted text-lg font-body mt-4 max-w-xl leading-relaxed">
        Can you name the crystal from its image? Ten questions, four choices each.
      </p>

      {/* Quiz card */}
      <div className="mt-10 bg-brand-surface border border-brand-border rounded-xl p-6">
        {phase === "done" ? (
          /* ── Score screen ─────────────────────────── */
          <div className="text-center py-8">
            <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-2">
              Final Score
            </p>
            <p className="font-heading text-6xl text-white">
              {score}<span className="text-brand-muted text-3xl"> / {TOTAL_QUESTIONS}</span>
            </p>
            <p className="text-white/70 font-body text-lg mt-4 italic">
              {getScoreMessage(score)}
            </p>
            <button
              onClick={playAgain}
              className="mt-8 px-6 py-3 bg-brand-accent hover:bg-brand-accent-dark text-white font-body font-medium rounded-lg transition-colors"
            >
              Play Again
            </button>
            <div className="mt-4">
              <Link href="/?browse=all" className="text-brand-accent text-sm font-body hover:underline">
                Browse all crystals →
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* ── Progress bar + score ──────────────── */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-brand-muted text-sm font-body">
                Question {current + 1} of {TOTAL_QUESTIONS}
              </span>
              <span className="text-white text-sm font-body font-medium">
                {score} / {TOTAL_QUESTIONS}
              </span>
            </div>
            <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-brand-accent rounded-full transition-all duration-300"
                style={{ width: `${((current) / TOTAL_QUESTIONS) * 100}%` }}
              />
            </div>

            {/* ── Crystal image ─────────────────────── */}
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden border border-brand-border">
                <img
                  src={`/crystals/${question.correct.id}.webp`}
                  alt="Mystery crystal"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ── Hint (subtitle) ───────────────────── */}
            <p className="text-center text-brand-muted text-sm font-body italic mb-6">
              Hint: {question.correct.subtitle}
            </p>

            {/* ── Answer buttons ────────────────────── */}
            <div className="space-y-3">
              {question.options.map((option) => {
                const isCorrectAnswer = option.id === question.correct.id;
                const isSelected = selected === option.id;
                const revealed = phase === "revealed";

                let btnClass =
                  "w-full text-left px-4 py-3 rounded-lg border font-body text-sm transition-all ";

                if (revealed && isCorrectAnswer) {
                  btnClass += "border-emerald-500 bg-emerald-500/15 text-emerald-300";
                } else if (revealed && isSelected && !isCorrectAnswer) {
                  btnClass += "border-red-500 bg-red-500/15 text-red-300";
                } else if (revealed) {
                  btnClass += "border-brand-border bg-brand-surface text-brand-muted opacity-50";
                } else {
                  btnClass +=
                    "border-brand-border bg-brand-surface text-white hover:border-brand-accent/40 hover:bg-brand-border/30 cursor-pointer";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.id)}
                    disabled={phase === "revealed"}
                    className={btnClass}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
