import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Add Cloudflare R2 domain here once media storage is wired:
    // { protocol: "https", hostname: "media.rootanroo.com" }
  },
};

export default withNextIntl(nextConfig);
