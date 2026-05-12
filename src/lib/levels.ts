export type Level = {
  code: string       // "a1", "a2" etc - used in the URL
  label: string      // "A1", "A2" etc - displayed to user
  name: string       // "Beginner" etc
  description: string
  wordCount: number
  color: string      // Tailwind color class for each card
}

export const levels: Level[] = [
  {
    code: "a1",
    label: "A1",
    name: "Beginner",
    description: "Essential everyday words and phrases",
    wordCount: 834,
    color: "bg-emerald-500",
  },
  {
    code: "a2",
    label: "A2",
    name: "Elementary",
    description: "Common situations and familiar topics",
    wordCount: 1200,
    color: "bg-blue-500",
  },
  {
    code: "b1",
    label: "B1",
    name: "Intermediate",
    description: "Main points on familiar matters",
    wordCount: 1500,
    color: "bg-violet-500",
  },
  {
    code: "b2",
    label: "B2",
    name: "Upper Intermediate",
    description: "Complex texts and technical discussion",
    wordCount: 1800,
    color: "bg-orange-500",
  },
]