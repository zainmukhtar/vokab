"use client"

import { useState, useEffect } from "react"

export default function InstallButtons() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showIOSGuide, setShowIOSGuide] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Hide if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Catch Android/desktop install prompt
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true)
    })
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Android / Desktop — trigger native prompt
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") setIsInstalled(true)
      setDeferredPrompt(null)
    } else {
      // iOS — show manual guide
      setShowIOSGuide(true)
    }
  }

  if (isInstalled) return null

  return (
    <>
      <div className="bg-white px-6 pt-10 mt-8 text-center border-t border-zinc-100">
        <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">
          Get the app
        </p>
        {/* <h3 className="text-zinc-900 text-xl font-medium mb-2">
          Learn anywhere, anytime
        </h3>
        <p className="text-zinc-400 text-sm mb-6 max-w-xs mx-auto">
          Install Vokab on your device. No App Store needed — free forever.
        </p> */}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {/* iOS button — always shown, triggers guide */}
          <button
            onClick={() => setShowIOSGuide(true)}
            className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-700 transition-colors justify-center"
          >
            <span className="text-2xl">
                <svg role="img" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
            </span>
            <div className="text-left">
              <span className="block text-xs text-zinc-400">Download on</span>
              <span className="block text-sm font-medium">iPhone & iPad</span>
            </div>
          </button>

          {/* Android/Desktop button */}
          <button
            onClick={handleInstall}
            className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-700 transition-colors justify-center"
          >
            <span className="text-2xl">
                <svg role="img" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 0 0-.1521-.5676.416.416 0 0 0-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 0 0-.5677-.1521.4157.4157 0 0 0-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.1185-9.4396"/>
                </svg>
            </span>
            <div className="text-left">
              <span className="block text-xs text-zinc-400">Add to Home Screen</span>
              <span className="block text-sm font-medium">Android & Desktop</span>
            </div>
          </button>
        </div>
      </div>

      {/* iOS Guide Modal */}
      {showIOSGuide && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4"
          onClick={() => setShowIOSGuide(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-zinc-900 font-medium text-base">
                Add to Home Screen
              </h3>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="text-zinc-400 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { step: "1", icon: "", text: "Tap the Share button at the bottom of Safari" },
                { step: "2", icon: "", text: 'Scroll down and tap "Add to Home Screen"' },
                { step: "3", icon: "", text: 'Tap "Add" in the top right corner' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-0">
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white text-xs font-medium flex items-center justify-center flex-shrink-0">
                    {s.step}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full mt-6 bg-zinc-900 text-white py-3 rounded-xl text-sm font-medium"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  )
}