import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@acme/ui';
import { ToastProvider } from '@acme/ui';

// Load a custom font. Inter is chosen for its excellent legibility.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'IR SaaS Platform',
  description: 'An industrial refrigeration management platform built with Next.js',
};

/**
 * Root layout for the entire application. It registers global providers
 * (theme and toast) and applies global styles. All pages and layouts
 * defined under the `app` directory will be rendered inside this component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
