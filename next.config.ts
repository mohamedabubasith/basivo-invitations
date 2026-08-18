import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Each invitation is a fast, host-anywhere static site.
  output: "export",
  // Static export has no image-optimization server; serve images as-is.
  // (Client photos are expected to be pre-sized; see WeddingConfig.couple.*.photo)
  images: { unoptimized: true },
  // Emit /nikah/ -> /nikah/index.html style paths so it hosts on any static host.
  trailingSlash: true,
};

export default nextConfig;
