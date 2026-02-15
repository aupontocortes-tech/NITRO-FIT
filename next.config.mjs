/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // Avisos "navigateReducer" / "clientReducer" no dev com Turbopack são conhecidos
  // e não afetam build nem produção. Para dev sem esses avisos: npm run dev:webpack
}

export default nextConfig
