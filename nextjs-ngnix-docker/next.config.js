module.exports = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 3840],
  },
  eslint: { ignoreDuringBuilds: true },
  env: {
    basePath: "https://devadminapi.blokchi.com",
    baseUrl: "https://www.blokchi.com",
    accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.E7Q2k840Sp7uB2Uz7xwNcHw5Hi2xE5qadHOS8Sjom2U`,
    googleSiteKey: "6LcQEXsjAAAAAMWfLyzQhpKMJ9u9VrCQvBre1UnX",
  },
  webpack: (config, options) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};

