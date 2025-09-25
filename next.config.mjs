import withPWAInit from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    // Cache Next.js static files (_next/static)
    {
      urlPattern: /^\/_next\/static\/.*/,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-resources" },
    },
    // Cache Google Fonts CSS
    {
      urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "google-fonts-stylesheets" },
    },
    // Cache Google Fonts files
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
  ],
});

export default withPWA(nextConfig);
