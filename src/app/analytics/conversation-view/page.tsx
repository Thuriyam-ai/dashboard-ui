"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { Sidebar } from "@/components/dashboard/sidebar";
import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
  ConversationTimelineBar,
  TalkRatioGauge,
  EventCallouts,
  SpeechDynamicsPanel,
} from "@/components/conversation-view";
import { LCAPanel } from "@/components/lca";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

/**
 * Single Conversation View page component within Analytics section.
 * Displays the full conversation analysis with interactive transcript,
 * speaker timeline, and key metrics visualization.
 * Includes LCA (Linguistic & Conversation Flow Analysis) tab.
 * @returns The Single Conversation View page layout
 */
export default function AnalyticsConversationViewPage() {
  const [activeTab, setActiveTab] = useState<"conversation" | "lca">(
    "conversation",
  );
  const [showLCAPanel, setShowLCAPanel] = useState(false);

  const handleLCATabClick = () => {
    setActiveTab("lca");
    setShowLCAPanel(true);
  };

  const handleCloseLCAPanel = () => {
    setShowLCAPanel(false);
    setActiveTab("conversation");
  };

  return (
    <div className={styles.container}>
      <Sidebar activeItem="analytics-overview" />
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.urlBar}>
            <span className={styles.url}>analytics-conversation.localhost:3000</span>
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

        {/* Conversation View Content */}
        <div className={styles.conversationContent}>
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Page Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>Single Conversation View</h1>
            <p className={styles.subtitle}>
              Comprehensive analysis and visualization of conversation data
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={styles.tabNavigation}>
            <button
              className={`${styles.tab} ${activeTab === "conversation" ? styles.active : ""}`}
              onClick={() => setActiveTab("conversation")}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className={styles.tabIcon}
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Conversation Analysis
            </button>
            <button
              className={`${styles.tab} ${activeTab === "lca" ? styles.active : ""}`}
              onClick={handleLCATabClick}
            >
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                className={styles.tabIcon}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              LCA Analysis
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "conversation" && (
            <div className={styles.tabContent}>
              {/* FR-DV-4.1: Conversation Timeline Bar */}
              <ConversationTimelineBar
                totalDuration={320}
                segments={[]}
                onSegmentClick={(segment) => {
                  console.log("Timeline segment clicked:", segment);
                }}
              />

              {/* Main Content Grid */}
              <div className={styles.mainGrid}>
                {/* Left Column - Transcript and Analysis */}
                <div className={styles.leftColumn}>
                  <InteractiveTranscriptPlayer />
                  <SpeakerTimeline />

                  {/* FR-DV-4.3: Event Callouts */}
                  <EventCallouts
                    events={[]}
                    onEventClick={(event) => {
                      console.log("Event clicked:", event);
                    }}
                  />
                </div>

                {/* Right Column - Metrics and Analysis */}
                <div className={styles.rightColumn}>
                  <KeyMetricsPanel />

                  {/* FR-DV-4.2: Talk Ratio Gauge */}
                  <TalkRatioGauge agentPercentage={65} customerPercentage={35} />

                  {/* FR-DV-4.4: Speech Dynamics Panel */}
                  <SpeechDynamicsPanel />
                </div>
              </div>
            </div>
          )}

          {activeTab === "lca" && (
            <div className={styles.tabContent}>
              <div className={styles.lcaPlaceholder}>
                <div className={styles.lcaIcon}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <h3 className={styles.lcaTitle}>LCA Analysis</h3>
                <p className={styles.lcaDescription}>
                  Click the button below to open the detailed Linguistic &
                  Conversation Flow Analysis panel
                </p>
                <button
                  className={styles.lcaButton}
                  onClick={() => setShowLCAPanel(true)}
                >
                  Open LCA Panel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LCA Panel Modal */}
      {showLCAPanel && (
        <LCAPanel conversationId="CONV-001" onClose={handleCloseLCAPanel} />
      )}
    </div>
  );
}
