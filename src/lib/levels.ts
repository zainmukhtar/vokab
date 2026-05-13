export type Level = {
  code: string
  label: string
  name: string
  description: string
  wordCount: number
  color: string
  textColor: string
  emoji: string
  glowColor: string   // ← top glow line on dark card
  iconBg: string      // ← icon background
  tag: string         // ← badge text
  tagColor: string    // ← badge text color
  tagBorder: string   // ← badge border color
  tagBg: string       // ← badge background
}

export const levels: Level[] = [
  {
    code: "a1",
    label: "A1",
    name: "Beginner",
    description: "Essential everyday words — greetings, numbers, colors, family, and common objects.",
    wordCount: 834,
    color: "bg-emerald-500",
    textColor: "text-emerald-600",
    emoji: "🌱",
    glowColor: "#059669",
    iconBg: "#022c22",
    tag: "Start here",
    tagColor: "#059669",
    tagBorder: "#065f46",
    tagBg: "#022c22",
  },
  {
    code: "a2",
    label: "A2",
    name: "Elementary",
    description: "Common situations — travel, shopping, food, daily routines, and familiar topics.",
    wordCount: 1408,
    color: "bg-blue-500",
    textColor: "text-blue-600",
    emoji: "📘",
    glowColor: "#3b82f6",
    iconBg: "#0c1a3e",
    tag: "Popular",
    tagColor: "#3b82f6",
    tagBorder: "#1e40af",
    tagBg: "#0c1a3e",
  },
  {
    code: "b1",
    label: "B1",
    name: "Intermediate",
    description: "Express yourself on work, travel, and topics you care about. Speak with confidence.",
    wordCount: 2000,
    color: "bg-violet-500",
    textColor: "text-violet-600",
    emoji: "🚀",
    glowColor: "#8b5cf6",
    iconBg: "#1e0a3e",
    tag: "Recommended",
    tagColor: "#8b5cf6",
    tagBorder: "#4c1d95",
    tagBg: "#1e0a3e",
  },
  {
    code: "b2",
    label: "B2",
    name: "Upper intermediate",
    description: "Abstract topics, nuanced language, and complex technical discussions.",
    wordCount: 2000,
    color: "bg-orange-500",
    textColor: "text-orange-600",
    emoji: "⚡",
    glowColor: "#f97316",
    iconBg: "#3e1a08",
    tag: "Advanced",
    tagColor: "#f97316",
    tagBorder: "#9a3412",
    tagBg: "#3e1a08",
  },
]