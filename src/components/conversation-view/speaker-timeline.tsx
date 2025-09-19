'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './speaker-timeline.module.scss';
import type { SpeakerSegment, SpeakerStats, SpeakerColors } from './types';

interface SpeakerTimelineProps {
  conversationData?: SpeakerSegment[];
  totalDuration?: number;
}

/**
 * Speaker Timeline component.
 * Displays a horizontal bar chart showing who spoke and when throughout the conversation.
 * @param props - Component props
 * @param props.conversationData - Array of speaker segments
 * @param props.totalDuration - Total duration of the conversation in seconds
 * @returns The Speaker Timeline component
 */
export function SpeakerTimeline({
  conversationData,
  totalDuration = 25,
}: SpeakerTimelineProps) {
  const [hoveredSegment, setHoveredSegment] = useState<SpeakerSegment | null>(
    null,
  );
  const timelineRef = useRef<HTMLDivElement>(null);

  // Mock data for demonstration
  const MOCK_CONVERSATION_DATA: SpeakerSegment[] = [
    { speaker: 'Agent', startTime: 0, endTime: 4.2, duration: 4.2 },
    { speaker: 'Customer', startTime: 4.5, endTime: 8.1, duration: 3.6 },
    { speaker: 'Agent', startTime: 8.3, endTime: 12.7, duration: 4.4 },
    { speaker: 'Customer', startTime: 13.0, endTime: 15.2, duration: 2.2 },
    { speaker: 'Agent', startTime: 15.5, endTime: 20.8, duration: 5.3 },
    { speaker: 'Customer', startTime: 21.0, endTime: 23.5, duration: 2.5 },
  ];

  const data = conversationData || MOCK_CONVERSATION_DATA;
  const speakers = Array.from(new Set(data.map((segment) => segment.speaker)));
  const speakerColors: SpeakerColors = {
    Agent: '#3b82f6',
    Customer: '#10b981',
    System: '#f59e0b',
    Other: '#8b5cf6',
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSegmentWidth = (duration: number) => {
    return (duration / totalDuration) * 100;
  };

  const getSegmentPosition = (startTime: number) => {
    return (startTime / totalDuration) * 100;
  };

  const getSpeakerStats = (): SpeakerStats[] => {
    const stats = speakers.map((speaker) => {
      const segments = data.filter((segment) => segment.speaker === speaker);
      const totalTime = segments.reduce(
        (sum, segment) => sum + segment.duration,
        0,
      );
      const percentage = (totalTime / totalDuration) * 100;

      return {
        speaker,
        totalTime,
        percentage,
        segmentCount: segments.length,
      };
    });

    return stats.sort((a, b) => b.totalTime - a.totalTime);
  };

  const speakerStats = getSpeakerStats();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Speaker Timeline</h2>
        <div className={styles.duration}>
          Total Duration: {formatTime(totalDuration)}
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className={styles.timelineContainer}>
        <div className={styles.timelineHeader}>
          <span className={styles.timeLabel}>0:00</span>
          <span className={styles.timeLabel}>{formatTime(totalDuration)}</span>
        </div>

        <div ref={timelineRef} className={styles.timeline}>
          {data.map((segment, index) => (
            <div
              key={index}
              className={styles.segment}
              style={{
                width: `${getSegmentWidth(segment.duration)}%`,
                left: `${getSegmentPosition(segment.startTime)}%`,
                backgroundColor:
                  speakerColors[
                    segment.speaker as keyof typeof speakerColors
                  ] || '#6b7280',
              }}
              onMouseEnter={() => setHoveredSegment(segment)}
              onMouseLeave={() => setHoveredSegment(null)}
              title={`${segment.speaker}: ${formatTime(segment.startTime)} - ${formatTime(segment.endTime)}`}
            />
          ))}
        </div>

        {/* Time markers */}
        <div className={styles.timeMarkers}>
          {Array.from({ length: Math.ceil(totalDuration / 5) + 1 }, (_, i) => (
            <div
              key={i}
              className={styles.timeMarker}
              style={{ left: `${((i * 5) / totalDuration) * 100}%` }}
            >
              <span className={styles.markerTime}>{formatTime(i * 5)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Speaker Legend and Stats */}
      <div className={styles.legend}>
        <h3 className={styles.legendTitle}>Speaker Statistics</h3>
        <div className={styles.speakerStats}>
          {speakerStats.map((stat) => (
            <div key={stat.speaker} className={styles.speakerStat}>
              <div className={styles.speakerInfo}>
                <div
                  className={styles.speakerColor}
                  style={{
                    backgroundColor:
                      speakerColors[
                        stat.speaker as keyof typeof speakerColors
                      ] || '#6b7280',
                  }}
                />
                <span className={styles.speakerName}>{stat.speaker}</span>
              </div>
              <div className={styles.speakerMetrics}>
                <span className={styles.speakerTime}>
                  {formatTime(stat.totalTime)}
                </span>
                <span className={styles.speakerPercentage}>
                  ({stat.percentage.toFixed(1)}%)
                </span>
                <span className={styles.segmentCount}>
                  {stat.segmentCount} segments
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredSegment && (
        <div className={styles.tooltip}>
          <div className={styles.tooltipSpeaker}>{hoveredSegment.speaker}</div>
          <div className={styles.tooltipTime}>
            {formatTime(hoveredSegment.startTime)} -{' '}
            {formatTime(hoveredSegment.endTime)}
          </div>
          <div className={styles.tooltipDuration}>
            Duration: {formatTime(hoveredSegment.duration)}
          </div>
        </div>
      )}
    </div>
  );
}
