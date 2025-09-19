'use client';

import styles from './page.module.scss';
import { Sidebar } from '@/components/dashboard/sidebar';
import { TeamFilters } from '@/components/team-dashboard/team-filters';
import { Leaderboards } from '@/components/team-dashboard/leaderboards';
import { TrendAnalysis } from '@/components/team-dashboard/trend-analysis';
import { TeamMetrics } from '@/components/team-dashboard/team-metrics';

/**
 * Team dashboard page component displaying team metrics and performance data.
 * @returns The TeamDashboardPage component
 */
export default function TeamDashboardPage() {
  return (
    <div className={styles.container}>
      <Sidebar activeItem="team-dashboard" />
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.urlBar}>
            <span className={styles.url}>
              team-dashboard-admin.localhost:3000
            </span>
          </div>
          <div className={styles.topBarActions}>
            <button className={styles.bookmarkButton} aria-label="Bookmark">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
            <button className={styles.userButton} aria-label="User Profile">
              <span className={styles.userInitial}>W</span>
              <span className={styles.userText}>Work</span>
            </button>
            <button className={styles.menuButton} aria-label="Menu">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
            <button className={styles.logoutButton}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Team Dashboard Content */}
        <div className={styles.dashboardContent}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Team Dashboard</h1>
            <p className={styles.subtitle}>
              Team & Campaign Analytics with Leaderboards and Trend Analysis
            </p>
          </div>

          {/* Filters */}
          <TeamFilters />

          {/* Team Metrics Overview */}
          <TeamMetrics />

          {/* Main Content Grid */}
          <div className={styles.mainGrid}>
            {/* Left Column - Leaderboards */}
            <div className={styles.leftColumn}>
              <Leaderboards />
            </div>

            {/* Right Column - Trend Analysis */}
            <div className={styles.rightColumn}>
              <TrendAnalysis />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
