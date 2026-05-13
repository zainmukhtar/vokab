"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { levels } from "@/lib/levels"
import { Word } from "@/lib/types"

type Stats = {
  streak: number
  correct: number
  total: number
  learned: number
}

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const levelCode = params.level as string
  const levelInfo = levels.find((l) => l.code === levelCode)

  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [stats, setStats] = useState<Stats>({
    streak: 0,
    correct: 0,
    total: 0,
    learned: 0,
  })
  const [animating, setAnimating] = useState(false)

  // Load stats from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(`vokab-stats-${levelCode}`)
    if (saved) setStats(JSON.parse(saved))
  }, [levelCode])

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (stats.total > 0) {
      localStorage.setItem(
        `vokab-stats-${levelCode}`,
        JSON.stringify(stats)
      )
    }
  }, [stats, levelCode])

  // Fetch words
  useEffect(() => {
    async function fetchWords() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/vocab?level=${levelCode}`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setWords(data.data)
      } catch {
        setError("Failed to load vocabulary. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchWords()
  }, [levelCode])

  const handleReveal = () => {
    if (!isRevealed) setIsRevealed(true)
  }

  const handleAnswer = useCallback(
    (gotIt: boolean) => {
      if (animating) return
      setAnimating(true)

      // Update stats
      setStats((prev) => {
        const newCorrect = gotIt ? prev.correct + 1 : prev.correct
        const newTotal = prev.total + 1
        const newStreak = gotIt ? prev.streak + 1 : 0
        const newLearned = gotIt ? prev.learned + 1 : prev.learned
        return {
          correct: newCorrect,
          total: newTotal,
          streak: newStreak,
          learned: newLearned,
        }
      })

      // Move to next word after short delay
      setTimeout(() => {
        setIsRevealed(false)
        setCurrentIndex((prev) =>
          prev < words.length - 1 ? prev + 1 : prev
        )
        setAnimating(false)
      }, 300)
    },
    [animating, words.length]
  )

  const accuracy =
    stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0

  const currentWord = words[currentIndex]

  // ── Loading ──
  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="text-center relative z-10">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 text-sm">Loading vocabulary...</p>
          <p className="text-zinc-700 text-xs mt-1">
            First load may take 20–30s
          </p>
        </div>
      </main>
    )
  }

  // ── Error ──
  if (error) {
    return (
      <main className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="text-zinc-400 text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:border-zinc-500 transition-colors"
          >
            Go back home
          </button>
        </div>
      </main>
    )
  }

  // ── Main ──
  return (
    <main className="min-h-screen bg-[#09090b] flex flex-col relative overflow-hidden">

      {/* ── NAV ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          ← Back
        </button>

        {/* Level chip */}
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: levelInfo?.glowColor }}
          />
          <span className="text-zinc-400 text-xs">
            {levelInfo?.label} · {levelInfo?.name}
          </span>
        </div>

        <span className="text-zinc-600 text-xs">
          {currentIndex + 1} / {words.length}
        </span>
      </nav>

      {/* ── PIP PROGRESS ── */}
      <div className="relative z-10 flex gap-1 px-6 py-3 border-b border-zinc-900">
        {Array.from({ length: Math.min(words.length, 20) }).map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full transition-colors duration-300"
            style={{
              background:
                i < currentIndex
                  ? "#fff"
                  : i === currentIndex
                  ? "#52525b"
                  : "#27272a",
            }}
          />
        ))}
        {words.length > 20 && (
          <span className="text-zinc-700 text-xs ml-1">
            +{words.length - 20}
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-6 py-8 max-w-3xl mx-auto w-full">

        <p className="text-zinc-600 text-xs uppercase tracking-widest mb-6">
          {isRevealed ? "Did you know it?" : "Do you know this word?"}
        </p>

        {/* ── CARD ── */}
        {currentWord && (
          <>
            {!isRevealed ? (

              /* FRONT — single centered card */
              <div
                onClick={handleReveal}
                className="w-full bg-[#111113] border border-zinc-800 rounded-2xl p-10 text-center cursor-pointer hover:border-zinc-600 transition-colors duration-200 relative overflow-hidden mb-6 min-h-[360px] flex flex-col items-center justify-center"
              >
                {/* Glow line */}
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${levelInfo?.glowColor}, transparent)`,
                  }}
                />

                <h2 className="text-5xl font-medium text-white tracking-tight mb-4">
                  {currentWord.german}
                </h2>

                <div className="flex items-center justify-center gap-2 mb-8">
                  {currentWord.gender && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-[#0c1a3e] text-blue-400 border border-blue-900">
                      {currentWord.gender}
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 text-zinc-500">
                    {currentWord.pos}
                  </span>
                </div>

                <p className="text-zinc-700 text-xs uppercase tracking-widest">
                  tap to reveal →
                </p>
              </div>

            ) : (

              /* BACK — split card */
              <div
                className="w-full bg-[#111113] border border-zinc-800 rounded-2xl overflow-hidden mb-6 relative"
              >
                {/* Glow line */}
                <div
                  className="absolute top-0 left-1/4 right-1/4 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${levelInfo?.glowColor}, transparent)`,
                  }}
                />

                <div className="grid grid-cols-2 min-h-[360px]">

                  {/* Left — German */}
                  <div className="p-8 border-r border-zinc-800 flex flex-col justify-center">
                    <h2 className="text-3xl font-medium text-white tracking-tight mb-3">
                      {currentWord.german}
                    </h2>
                    <div className="flex items-center gap-2 flex-wrap">
                      {currentWord.gender && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#0c1a3e] text-blue-400 border border-blue-900">
                          {currentWord.gender}
                        </span>
                      )}
                      <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-800 text-zinc-600">
                        {currentWord.pos}
                      </span>
                    </div>
                  </div>

                  {/* Right — English */}
                  <div className="p-8 bg-[#0d0d0f] flex flex-col justify-center">
                    <p
                      className="font-medium text-white tracking-tight mb-1"
                      style={{
                        fontSize: currentWord.english.length > 30
                          ? "14px"
                          : currentWord.english.length > 15
                          ? "18px"
                          : "24px",
                        lineHeight: "1.3",
                      }}
                    >
                      {currentWord.english}
                    </p>
                    {currentWord.all_translations !== currentWord.english && (
                      <p className="text-zinc-600 text-xs mb-4">
                        also: {currentWord.all_translations}
                      </p>
                    )}
                    {currentWord.example_de && (
                      <div className="border-l-2 border-zinc-800 pl-3 mt-2">
                        <p className="text-zinc-400 text-xs leading-relaxed mb-1">
                          {currentWord.example_de}
                        </p>
                        <p className="text-zinc-600 text-xs leading-relaxed">
                          {currentWord.example_en}
                        </p>
                      </div>
                    )}
                  </div>

                </div>
              </div>

            )}

            {/* ── ASSESSMENT BUTTONS ── */}
            {isRevealed && (
              <div className="flex gap-3 w-full mb-8">
                <button
                  onClick={() => handleAnswer(false)}
                  disabled={animating}
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors duration-150 border"
                  style={{
                    background: "#1a0505",
                    color: "#ef4444",
                    borderColor: "#7f1d1d",
                  }}
                >
                  ✗ &nbsp;Didn't know
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  disabled={animating}
                  className="flex-1 py-3 rounded-xl text-sm font-medium transition-colors duration-150 border"
                  style={{
                    background: "#051a0e",
                    color: "#22c55e",
                    borderColor: "#14532d",
                  }}
                >
                  ✓ &nbsp;Got it
                </button>
              </div>
            )}

            {/* placeholder spacing when not revealed */}
            {!isRevealed && <div className="mb-8" />}
          </>
        )}

        {/* ── STATS ── */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {[
            { value: stats.streak, label: "Streak" },
            { value: `${accuracy}%`, label: "Accuracy" },
            { value: stats.learned, label: "Learned" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-[#111113] border border-zinc-800 rounded-xl py-4 text-center"
            >
              <div className="text-xl font-medium text-white mb-0.5">
                {s.value}
              </div>
              <div className="text-zinc-600 text-xs uppercase tracking-widest">
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}