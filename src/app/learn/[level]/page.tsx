"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { levels } from "@/lib/levels"
import { Word } from "@/lib/types"

export default function LearnPage() {
  // Get the level from the URL e.g. "a1" from /learn/a1
  const params = useParams()
  const router = useRouter()
  const levelCode = params.level as string

  // Find the level info from our levels data
  const levelInfo = levels.find((l) => l.code === levelCode)

  // State — these are variables that when changed, re-render the UI
  const [words, setWords] = useState<Word[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch words when the page loads
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
  }, [levelCode]) // Re-runs if the level changes

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
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
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
        >
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
      <div className="max-w-xl mx-auto mb-8">
        <div className="w-full bg-slate-200 rounded-full h-1.5">
          <div
            className="bg-slate-700 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      {currentWord && (
        <Card className="max-w-xl mx-auto shadow-md">
          <CardContent className="py-16 text-center">

            {/* Gender + part of speech */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {currentWord.gender && (
                <Badge variant="secondary">{currentWord.gender}</Badge>
              )}
              <Badge variant="outline">{currentWord.pos}</Badge>
            </div>

            {/* The German word */}
            <h2 className="text-5xl font-bold text-slate-800 mb-3">
              {currentWord.german}
            </h2>

            {/* English translation */}
            <p className="text-2xl text-slate-500 mb-8">
              {currentWord.english}
            </p>

            {/* Example sentence */}
            {currentWord.example_de && (
              <div className="bg-slate-50 rounded-lg p-4 text-left border border-slate-100">
                <p className="text-slate-700 text-sm font-medium mb-1">
                  {currentWord.example_de}
                </p>
                <p className="text-slate-400 text-sm">
                  {currentWord.example_en}
                </p>
              </div>
            )}

          </CardContent>
        </Card>
      )}

      {/* Navigation buttons */}
      <div className="max-w-xl mx-auto flex justify-between mt-8">
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