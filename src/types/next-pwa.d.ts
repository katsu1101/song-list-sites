declare module "next-pwa" {
  import type { NextConfig } from "next";

  export type PWAOptions = Record<string, unknown>;

  const nextPWA: (options?: PWAOptions) => (nextConfig: NextConfig) => NextConfig;
  export default nextPWA;
}
