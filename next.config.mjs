/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // Consume built ESM package (dist/), not accidental src/*.js emit.
  transpilePackages: ["@office-of-the-citizen/caos-sdk"],
  // The Citizen Application is an independent renderer. It has NO webpack
  // aliases into modules/, runtime/, kernel/, or any other CAOS layer.
  // The only bridge to the operating system is the projection SDK (sdk/),
  // which reads emitted projection artifacts or a remote gateway URL.
};

export default nextConfig;
