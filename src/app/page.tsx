import Link from "next/link"
import { levels } from "@/lib/levels"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* ── Hero Section ── */}
      <section className="px-4 pt-24 pb-16 text-center">

        {/* Logo pill */}
        <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 mb-8">
          <span className="text-lg">🇩🇪</span>
          <span className="text-slate-600 text-sm font-medium">
            German Vocabulary
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight mb-4">
          Vokab
        </h1>

        {/* Subheadline */}
        <p className="text-slate-500 text-xl max-w-md mx-auto leading-relaxed mb-12">
          Learn German vocabulary one level at a time.
          <br />
          <span className="text-slate-400">From beginner to advanced.</span>
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-16">
          <span>8,242 words</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>4 levels</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>Free forever</span>
        </div>

      </section>

      {/* ── Level Cards ── */}
      <section className="px-4 pb-24 max-w-4xl mx-auto">

        <p className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8">
          Choose your level
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {levels.map((level) => (
            <Link key={level.code} href={`/learn/${level.code}`}>

              <div className="group relative bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden">

                {/* Colored top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${level.color}`} />

                {/* Card content */}
                <div className="flex items-start justify-between mb-4 mt-1">

                  {/* Left — emoji + level label */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{level.emoji}</span>
                    <div>
                      <span className={`text-xs font-bold uppercase tracking-widest ${level.textColor}`}>
                        {level.label}
                      </span>
                      <h3 className="text-slate-800 font-bold text-lg leading-tight">
                        {level.name}
                      </h3>
                    </div>
                  </div>

                  {/* Right — word count pill */}
                  <span className="bg-slate-100 text-slate-500 text-xs font-medium px-3 py-1 rounded-full">
                    {level.wordCount.toLocaleString()} words
                  </span>

                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {level.description}
                </p>

                {/* Start link */}
                <div className={`flex items-center gap-1 text-sm font-semibold ${level.textColor} group-hover:gap-2 transition-all duration-200`}>
                  Start learning
                  <span>→</span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* ── Footer ── */}
      <footer className="text-center pb-10 text-slate-300 text-sm">
        Made with ❤️ by Zayn Mukhtar
      </footer>
    </main>
  )
}