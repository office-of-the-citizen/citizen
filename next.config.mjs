/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  // The Citizen Application is an independent renderer. It has NO webpack
  // aliases into modules/, runtime/, kernel/, or any other CAOS layer.
  // The only bridge to the operating system is the projection SDK (sdk/),
  // which reads emitted projection artifacts or a remote gateway URL.
};

export default nextConfig;
