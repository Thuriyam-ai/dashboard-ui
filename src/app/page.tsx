import Link from 'next/link';

/**
 * Home page component displaying navigation links to all available pages.
 * @returns The HomePage component
 */
export default function HomePage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>WorkIndia Next Starter Kit</h1>
      <p>
        Welcome to the WorkIndia Next.js starter kit with Vercel deployment.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <h2>Available Pages:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/dashboard"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Dashboard
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/analytics"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Analytics
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/conversation-view"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Conversation View
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/conversation-view-demo"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Conversation View Demo
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/team-dashboard"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Team Dashboard
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/example-components"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Example Components
            </Link>
          </li>
          <li style={{ margin: '0.5rem 0' }}>
            <Link
              href="/example-home"
              style={{ color: '#3182ce', textDecoration: 'none' }}
            >
              Example Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
