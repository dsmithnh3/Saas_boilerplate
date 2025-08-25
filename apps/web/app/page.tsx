import { redirect } from 'next/navigation';

/**
 * Home page: immediately redirects to the dashboard. Because the app's
 * primary entry point is the dashboard, the root route simply performs
 * a server‑side redirect. Using the `next/navigation` API ensures that
 * the redirect happens during server rendering.
 */
export default function HomePage() {
  redirect('/dashboard');
}
