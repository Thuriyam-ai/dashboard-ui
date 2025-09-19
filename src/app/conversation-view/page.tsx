'use client';

import styles from './page.module.scss';
import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
} from '@/components/conversation-view';

/**
 * Single Conversation View page component.
 * Displays the full conversation analysis with interactive transcript,
 * speaker timeline, and key metrics visualization.
 * @returns The Single Conversation View page layout
 */
export default function ConversationViewPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Page Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Single Conversation View</h1>
          <p className={styles.subtitle}>
            Comprehensive analysis and visualization of conversation data
          </p>
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
      </div>
    </div>
  );
}
