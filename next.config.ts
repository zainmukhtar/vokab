import withPWA from "@ducanh2912/next-pwa"

const nextConfig = withPWA({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
})({
  reactStrictMode: true,
  turbopack: {},   // ← tells Next.js we acknowledge Turbopack but webpack handles PWA
})

export default nextConfig