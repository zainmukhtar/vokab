import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { levels } from "@/lib/levels"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-800 mb-3">
          Vokab
        </h1>
        <p className="text-slate-500 text-lg">
          Learn German vocabulary, one level at a time
        </p>
      </div>

      {/* Level Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {levels.map((level) => (
          <Link key={level.code} href={`/learn/${level.code}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full">
              <CardHeader className="pb-2">
                <div className={`w-12 h-12 rounded-xl ${level.color} flex items-center justify-center mb-3`}>
                  <span className="text-white font-bold text-lg">{level.label}</span>
                </div>
                <Badge variant="outline" className="w-fit">
                  {level.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-slate-500 text-sm mb-4">
                  {level.description}
                </p>
                <p className="text-slate-800 font-semibold text-sm">
                  {level.wordCount.toLocaleString()} words
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

    </main>
  )
}