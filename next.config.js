/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
  target: "experimental-serverless-trace",
};
