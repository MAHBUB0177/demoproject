import withPWA from "next-pwa";

const runtimeCaching = [
  {
    urlPattern: /^\/_next\/static\/.*/, // Next.js JS/CSS chunks
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
    options: { 
      cacheName: "google-fonts-webfonts",
      expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
    },
  },
];

const config = {
  reactStrictMode: true,
  experimental: { esmExternals: true }, // ensure ES modules work
};

export default withPWA({
  ...config,
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching,
});
