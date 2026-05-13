import Link from "next/link"
import { levels } from "@/lib/levels"
import InstallButtons from "@/components/InstallButtons";

export default function Home() {
  return (
    <main>
      {/* ── WHITE HERO ── */}
      <section className="bg-white px-6 pt-20 pb-24 text-center">

        {/* Pill */}
        <div className="inline-flex items-center gap-4 px-3 py-1 mb-6">
          <img
            src="/icons/icon-384x384.png"
            alt="Vokab"
            className="w-20 h-20 rounded-md"
          />
          <span className="text-4xl font-bold text-zinc-700 tracking-tight leading-none">
            Vokab
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-medium text-zinc-900 tracking-tight leading-tight mb-4">
          Learn German.<br />
          <span className="text-zinc-300">One word</span> at a time.
        </h1>

        {/* Subheadline */}
        <p className="text-zinc-400 text-base max-w-sm mx-auto leading-relaxed mb-8">
          8,242 carefully curated words across four CEFR levels.
          Built for real progress, not just streaks.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Link
            href="/learn/a1"
            className="bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            Start learning — free
          </Link>
            <a
            href="#levels"
            className="text-zinc-900 text-sm border border-zinc-200 px-5 py-2.5 rounded-lg hover:bg-zinc-50 transition-colors"
          >
            See all levels →
          </a>
        </div>

        {/* Stats row */}
        <div className="inline-flex border border-zinc-200 rounded-xl overflow-hidden divide-x divide-zinc-200">
          {[
            { num: "8,242", label: "Words" },
            { num: "4", label: "Levels" },
            { num: "A1–B2", label: "CEFR" },
            { num: "Free", label: "Always" },
          ].map((s) => (
            <div key={s.label} className="px-5 py-3 text-center">
              <div className="text-lg font-medium text-zinc-900">{s.num}</div>
              <div className="text-xs text-zinc-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <InstallButtons />
      </section>

      {/* ── DIAGONAL CUT ── */}
      <div
        className="bg-white"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom right, #ffffff 49.9%, #09090b 50%)",
        }}
      />

      {/* ── DARK SECTION ── */}
      <section
        id="levels"
        className="bg-[#09090b] px-6 pb-24 relative overflow-hidden"
      >

        {/* Grid texture */}
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

        <div className="relative z-10 max-w-3xl mx-auto">

          {/* Dark section header */}
          <div className="text-center pt-14 pb-10">
            <p className="text-zinc-600 text-xs uppercase tracking-widest mb-3">
              Choose your level
            </p>
            <h2 className="text-3xl sm:text-4xl font-medium text-white tracking-tight leading-tight mb-3">
              Everything you need<br />to master German.
            </h2>
            <p className="text-zinc-500 text-sm">
              Start anywhere. Go at your own pace. Every word matters.
            </p>
          </div>

          {/* Level cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {levels.map((level) => (
              <Link key={level.code} href={`/learn/${level.code}`}>
                <div
                  className="group bg-[#111113] border border-zinc-800 rounded-xl p-5 relative overflow-hidden hover:border-zinc-600 transition-colors duration-200 cursor-pointer"
                >

                  {/* Top glow line */}
                  <div
                    className="absolute top-0 left-1/4 right-1/4 h-px"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${level.glowColor}, transparent)`,
                    }}
                  />

                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base mb-4"
                    style={{ background: level.iconBg }}
                  >
                    {level.emoji}
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-sm font-medium mb-1">
                    {level.label} · {level.name}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                    {level.description}
                  </p>

                  {/* Footer row */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-medium px-2.5 py-1 rounded-full border"
                      style={{
                        color: level.tagColor,
                        borderColor: level.tagBorder,
                        background: level.tagBg,
                      }}
                    >
                      {level.tag}
                    </span>
                    <span className="text-zinc-700 text-xs">
                      {level.wordCount.toLocaleString()} words
                    </span>
                  </div>

                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#000] text-center py-10">
        <p className="text-zinc-400 text-sm">
          Made with ❤️ by Zayn Mukhtar{" "}
        </p>
      </footer>

    </main>
  )
}