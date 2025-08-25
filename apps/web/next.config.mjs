/**
 * Next.js configuration for the SaaS application.
 *
 * The `experimental.serverActions` flag enables server actions in the
 * app directory which allows us to colocate data mutations with the
 * components that trigger them. React strict mode and SWC minification
 * are enabled by default. Additional configuration (e.g. image domains
 * or rewrites) can be added here.
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
