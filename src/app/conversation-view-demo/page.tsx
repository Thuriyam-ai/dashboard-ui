"use client";

import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
} from "@/components/conversation-view";
import styles from "./page.module.scss";

/**
 * Demo page for the Single Conversation View components.
 * This page showcases all the conversation analysis features with sample data.
 * @returns The demo page layout
 */
export default function ConversationViewDemoPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Single Conversation View Demo</h1>
          <p className={styles.subtitle}>
            Interactive demonstration of conversation analysis features
          </p>
          <div className={styles.navigation}>
            <a href="/conversation-view" className={styles.navLink}>
              View Full Page
            </a>
            <a href="/example-components" className={styles.navLink}>
              Back to Examples
            </a>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Left Column - Transcript and Timeline */}
          <div className={styles.leftColumn}>
            <InteractiveTranscriptPlayer />
            <SpeakerTimeline />
          </div>

          {/* Right Column - Key Metrics */}
          <div className={styles.rightColumn}>
            <KeyMetricsPanel />
          </div>
        </div>

        {/* Feature Overview */}
        <div className={styles.featureOverview}>
          <h2 className={styles.overviewTitle}>Features Implemented</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>
                Interactive Transcript Player
              </h3>
              <ul className={styles.featureList}>
                <li>Audio synchronization with transcript segments</li>
                <li>Visual highlighting of filler words (yellow background)</li>
                <li>Clear indication of long pauses</li>
                <li>Visual flagging of interruptions</li>
                <li>Click-to-seek functionality</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Speaker Timeline</h3>
              <ul className={styles.featureList}>
                <li>Horizontal bar chart showing speaker segments</li>
                <li>Color-coded speakers with interactive tooltips</li>
                <li>Time markers for easy navigation</li>
                <li>Speaker statistics panel</li>
                <li>Responsive design</li>
              </ul>
            </div>
            <div className={styles.featureCard}>
              <h3 className={styles.featureTitle}>Key Metrics Panel</h3>
              <ul className={styles.featureList}>
                <li>Talk-to-Listen ratio gauge with color zones</li>
                <li>Counter widgets for filler words and interruptions</li>
                <li>Transcript quality score with circular progress</li>
                <li>Animated metrics on load</li>
                <li>Status badges for quick assessment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
