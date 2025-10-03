import { redirect } from 'next/navigation';

/**
 * Home page component that redirects to the dashboard.
 * @returns Redirects to /dashboard
 */
export default function TeamLeaderDashboard() {
  redirect('/team-leader-dashboard/call-quality-analytics/');
}