import type { Config } from 'tailwindcss';
import uiConfig from '@acme/ui/tailwind.config';

/**
 * Tailwind configuration for the Next.js application. It extends the base
 * configuration defined in the UI package to reuse design tokens and
 * components. Additional application‑specific customisations can be added
 * under the `theme.extend` section.
 */
const config: Config = {
  presets: [uiConfig as unknown as Config],
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
};

export default config;
