"use client";

import styles from "./conversation-timeline-bar.module.scss";

interface TimelineSegment {
  speaker: "agent" | "customer";
  startTime: number; // in seconds
  endTime: number; // in seconds
  duration: number; // in seconds
}

interface ConversationTimelineBarProps {
  totalDuration: number; // in seconds
  segments: TimelineSegment[];
  onSegmentClick?: (segment: TimelineSegment) => void;
}

/**
 * Conversation Timeline Bar component (FR-DV-4.1).
 * Displays a visual timeline of the conversation with different colors for agent and customer.
 * Shows long monologue blocks prominently for immediate at-a-glance understanding.
 * @param props - Component props
 * @param props.totalDuration - Total conversation duration in seconds
 * @param props.segments - Array of conversation segments
 * @param props.onSegmentClick - Optional callback when a segment is clicked
 * @returns The ConversationTimelineBar component
 */
export function ConversationTimelineBar({
  totalDuration,
  segments,
  onSegmentClick,
}: ConversationTimelineBarProps) {
  // Mock data for demonstration
  const mockSegments: TimelineSegment[] = [
    { speaker: "agent", startTime: 0, endTime: 15, duration: 15 },
    { speaker: "customer", startTime: 15, endTime: 45, duration: 30 },
    { speaker: "agent", startTime: 45, endTime: 120, duration: 75 }, // Long monologue
    { speaker: "customer", startTime: 120, endTime: 140, duration: 20 },
    { speaker: "agent", startTime: 140, endTime: 180, duration: 40 },
    { speaker: "customer", startTime: 180, endTime: 200, duration: 20 },
    { speaker: "agent", startTime: 200, endTime: 300, duration: 100 }, // Another long monologue
    { speaker: "customer", startTime: 300, endTime: 320, duration: 20 },
  ];

  const displaySegments = segments.length > 0 ? segments : mockSegments;
  const displayDuration = totalDuration > 0 ? totalDuration : 320;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getSegmentWidth = (duration: number): string => {
    return `${(duration / displayDuration) * 100}%`;
  };

  const getSegmentPosition = (startTime: number): string => {
    return `${(startTime / displayDuration) * 100}%`;
  };

  const isLongMonologue = (duration: number): boolean => {
    return duration > 60; // More than 1 minute
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timelineHeader}>
        <h3 className={styles.timelineTitle}>Conversation Timeline</h3>
        <div className={styles.timelineLegend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.agent}`}></div>
            <span>Agent</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.customer}`}></div>
            <span>Customer</span>
          </div>
        </div>
      </div>

      <div className={styles.timelineBar}>
        <div className={styles.timelineTrack}>
          {displaySegments.map((segment, index) => (
            <div
              key={index}
              className={`${styles.timelineSegment} ${
                segment.speaker === "agent" ? styles.agent : styles.customer
              } ${isLongMonologue(segment.duration) ? styles.longMonologue : ""}`}
              style={{
                width: getSegmentWidth(segment.duration),
                left: getSegmentPosition(segment.startTime),
              }}
              onClick={() => onSegmentClick?.(segment)}
              title={`${segment.speaker}: ${formatTime(
                segment.startTime,
              )} - ${formatTime(segment.endTime)} (${formatTime(
                segment.duration,
              )})`}
            >
              {isLongMonologue(segment.duration) && (
                <div className={styles.monologueIndicator}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Time markers */}
        <div className={styles.timeMarkers}>
          {Array.from({ length: Math.ceil(displayDuration / 60) }, (_, i) => (
            <div
              key={i}
              className={styles.timeMarker}
              style={{ left: `${((i * 60) / displayDuration) * 100}%` }}
            >
              <span className={styles.timeLabel}>{formatTime(i * 60)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline stats */}
      <div className={styles.timelineStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Duration:</span>
          <span className={styles.statValue}>
            {formatTime(displayDuration)}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Agent Segments:</span>
          <span className={styles.statValue}>
            {displaySegments.filter((s) => s.speaker === "agent").length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Customer Segments:</span>
          <span className={styles.statValue}>
            {displaySegments.filter((s) => s.speaker === "customer").length}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Long Monologues:</span>
          <span className={styles.statValue}>
            {displaySegments.filter((s) => isLongMonologue(s.duration)).length}
          </span>
        </div>
      </div>
    </div>
  );
}
