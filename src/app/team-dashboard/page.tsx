"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { TeamFilters } from "@/components/team-dashboard/team-filters";
import { Leaderboards } from "@/components/team-dashboard/leaderboards";
import { TrendAnalysis } from "@/components/team-dashboard/trend-analysis";
import { TeamMetrics } from "@/components/team-dashboard/team-metrics";
import { LCAPanel } from "@/components/lca";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DistributionPlots } from "@/components/team-dashboard/distribution-plots";
import { CoachingLeaderboards } from "@/components/team-dashboard/coaching-leaderboards";
import { RadarChart } from "@/components/team-dashboard/radar-chart";

/**
 * Team dashboard page component displaying team metrics and performance data.
 * Includes LCA (Linguistic & Conversation Flow Analysis) tab for team-level analysis.
 * @returns The TeamDashboardPage component
 */
export default function TeamDashboardPage() {
  const [activeTab, setActiveTab] = useState<"team" | "lca">("team");
  const [showLCAPanel, setShowLCAPanel] = useState(false);
  return (
    <div className={styles.container}>
      <MuiSidebar activeItem="team-dashboard" />
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
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Team Dashboard</h1>
            <p className={styles.subtitle}>
              Team & Campaign Analytics with Leaderboards and Trend Analysis
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tab} ${activeTab === "team" ? styles.active : ""}`}
              onClick={() => setActiveTab("team")}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className={styles.tabIcon}
              >
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01.99L14 10.5l-1-1.5c-.47-.62-1.21-.99-2.01-.99H9.46c-.8 0-1.54.37-2.01.99L5 10.5l-1-1.5C3.53 8.37 2.79 8 2 8H.5L3 15.5V22h2v-6h2v6h2v-6h2v6h2v-6h2v6h2z" />
              </svg>
              Team Analytics
            </button>
            <button
              className={`${styles.tab} ${activeTab === "lca" ? styles.active : ""}`}
              onClick={() => {
                setActiveTab("lca");
                setShowLCAPanel(true);
              }}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className={styles.tabIcon}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Team LCA Analysis
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "team" && (
            <div className={styles.tabContent}>
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
          )}

          {activeTab === "lca" && (
            <div className={styles.tabContent}>
              {/* FR-DV-4.5: Distribution Plots */}
              <DistributionPlots />

              {/* FR-DV-4.6: Coaching Leaderboards */}
              <CoachingLeaderboards />

              {/* FR-DV-4.7: Radar Chart for Comparison */}
              <RadarChart />

              {/* Additional LCA Panel Access */}
              <div className={styles.lcaPanelAccess}>
                <div className={styles.lcaPanelContent}>
                  <h3 className={styles.lcaPanelTitle}>Advanced LCA Analysis</h3>
                  <p className={styles.lcaPanelDescription}>
                    Access detailed linguistic analysis, conversation flow patterns, and sentiment analysis
                  </p>
                  <button
                    className={styles.lcaPanelButton}
                    onClick={() => setShowLCAPanel(true)}
                  >
                    Open Advanced LCA Panel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LCA Panel Modal */}
      {showLCAPanel && (
        <LCAPanel
          conversationId="TEAM-001"
          onClose={() => setShowLCAPanel(false)}
        />
      )}
    </div>
  );
}
