import withPWAInit from "next-pwa";

const withPWA = require("next-pwa")({
  dest: "public",      // where to generate the service worker
  register: true,       // auto-register SW
  skipWaiting: true,    // activate new SW immediately
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^\/_next\/static\/.*/, // Next.js static assets
      handler: "StaleWhileRevalidate",
      options: { cacheName: "static-resources" },
    },
    {
      urlPattern: /^https:\/\/fonts.googleapis.com\/.*/,
      handler: "StaleWhileRevalidate",
      options: { cacheName: "google-fonts-stylesheets" },
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\/.*/,
      handler: "CacheFirst",
      options: { cacheName: "google-fonts-webfonts", expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 } },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});

