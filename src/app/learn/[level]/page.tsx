"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { levels } from "@/lib/levels"
import { Word } from "@/lib/types"

export default function LearnPage() {
  const params = useParams()
  const router = useRouter()
  const levelCode = params.level as string
  const levelInfo = levels.find((l) => l.code === levelCode)

  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)  // ← NEW
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchWords() {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/vocab?level=${levelCode}`)
        const data = await response.json()
        if (!response.ok) throw new Error(data.error)
        setWords(data.data)
      } catch (err) {
        setError("Failed to load vocabulary. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchWords()
  }, [levelCode])

  // When moving to next/previous, always flip back to German side
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setIsFlipped(false)          // ← reset flip
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false)          // ← reset flip
      setCurrentIndex(currentIndex - 1)
    }
  }

  const currentWord = words[currentIndex]

  // ── Loading state ──
  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading vocabulary...</p>
          <p className="text-slate-400 text-xs mt-2">
            First load may take 20–30 seconds
          </p>
        </div>
      </main>
    )
  }

  // ── Error state ──
  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => router.push("/")}>Go back home</Button>
        </div>
      </main>
    )
  }

  // ── Main UI ──
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">

      {/* Top bar */}
      <div className="max-w-xl mx-auto flex items-center justify-between mb-8">
        <Button variant="ghost" onClick={() => router.push("/")}>
          ← Back
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{levelInfo?.label}</Badge>
          <span className="text-slate-500 text-sm">{levelInfo?.name}</span>
        </div>
        <span className="text-slate-400 text-sm">
          {currentIndex + 1} / {words.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div
            className="bg-slate-700 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Flip Card ── */}
      {currentWord && (
        <div
          className="max-w-xl mx-auto mb-10"
          style={{ perspective: "1000px" }}   
          // perspective gives the 3D depth effect
          // without it the flip looks flat
        >
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              transition: "transform 0.5s ease",
              position: "relative",
              height: "340px",
              cursor: "pointer",
            }}
          >

            {/* ── FRONT — German word ── */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center p-8 select-none"
            >
              <p className="text-slate-400 text-sm mb-6 tracking-widest uppercase">
                Tap to reveal
              </p>
              <h2 className="text-5xl font-bold text-slate-800 mb-4 text-center">
                {currentWord.german}
              </h2>
              <div className="flex items-center gap-2">
                {currentWord.gender && (
                  <Badge variant="secondary">{currentWord.gender}</Badge>
                )}
                <Badge variant="outline">{currentWord.pos}</Badge>
              </div>
            </div>

            {/* ── BACK — English translation ── */}
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",  
                // pre-rotated so it starts facing away
                // when the parent flips 180deg they cancel out = facing forward
              }}
              className="absolute inset-0 bg-slate-800 rounded-2xl shadow-md flex flex-col items-center justify-center p-8 select-none"
            >
              <p className="text-slate-400 text-sm mb-4 tracking-widest uppercase">
                Translation
              </p>
              <h2 className="text-4xl font-bold text-white mb-2 text-center">
                {currentWord.english}
              </h2>
              {currentWord.all_translations !== currentWord.english && (
                <p className="text-slate-400 text-sm mb-6 text-center">
                  also: {currentWord.all_translations}
                </p>
              )}

              {/* Example sentence */}
              {currentWord.example_de && (
                <div className="bg-slate-700 rounded-lg p-4 w-full mt-2">
                  <p className="text-slate-200 text-sm font-medium mb-1 text-center">
                    {currentWord.example_de}
                  </p>
                  <p className="text-slate-400 text-sm text-center">
                    {currentWord.example_en}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="max-w-xl mx-auto flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
        >
          Next →
        </Button>
      </div>

    </main>
  )
}