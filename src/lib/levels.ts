export type Level = {
  code: string
  label: string
  name: string
  description: string
  wordCount: number
  color: string
  textColor: string    // ← NEW
  emoji: string        // ← NEW
}


export const levels: Level[] = [
  {
    code: "a1",
    label: "A1",
    name: "Beginner",
    description: "Essential everyday words and phrases",
    wordCount: 834,
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
    emoji: "🌱",
  },
  {
    code: "a2",
    label: "A2",
    name: "Elementary",
    description: "Common situations and familiar topics",
    wordCount: 1408,
    color: "bg-blue-500",
    textColor: "text-blue-600",
    emoji: "📘",
  },
  {
    code: "b1",
    label: "B1",
    name: "Intermediate",
    description: "Main points on familiar matters",
    wordCount: 2000,
    color: "bg-violet-500",
    textColor: "text-violet-600",
    emoji: "🚀",
  },
  {
    code: "b2",
    label: "B2",
    name: "Upper Intermediate",
    description: "Complex texts and technical discussion",
    wordCount: 2000,
    color: "bg-orange-500",
    textColor: "text-orange-600",
    emoji: "⚡",
  },
]