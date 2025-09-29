import { redirect } from 'next/navigation';

/**
 * Home page component that redirects to the dashboard.
 * @returns Redirects to /dashboard
 */
export default function HomePage() {
  redirect('/analytics/');
}