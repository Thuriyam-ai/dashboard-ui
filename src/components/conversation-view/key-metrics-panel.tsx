"use client";

import { useState, useEffect } from "react";
import styles from "./key-metrics-panel.module.scss";
import type { ConversationMetrics, RatioStatus, QualityStatus } from "./types";

interface KeyMetricsPanelProps {
  metrics?: ConversationMetrics;
}

/**
 * Key Metrics Panel component.
 * Displays core conversation metrics including Talk-to-Listen ratio gauge,
 * counters for filler words, interruptions, and silence duration,
 * and transcript quality score.
 * @param props - Component props
 * @param props.metrics - Conversation metrics data
 * @returns The Key Metrics Panel component
 */
export function KeyMetricsPanel({ metrics }: KeyMetricsPanelProps) {
  const [animatedMetrics, setAnimatedMetrics] = useState({
    talkToListenRatio: 0,
    fillerWords: 0,
    interruptions: 0,
    totalSilenceDuration: 0,
    transcriptQualityScore: 0,
  });

  // Mock data for demonstration
  const MOCK_METRICS: ConversationMetrics = {
    talkToListenRatio: 0.65, // 65% talking, 35% listening
    fillerWords: 12,
    interruptions: 3,
    totalSilenceDuration: 8.5, // seconds
    transcriptQualityScore: 87, // out of 100
  };

  const data = metrics || MOCK_METRICS;

  useEffect(() => {
    // Animate metrics on component mount
    const animateMetrics = () => {
      const duration = 1000; // 1 second
      const steps = 60;
      const stepDuration = duration / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedMetrics({
          talkToListenRatio: data.talkToListenRatio * progress,
          fillerWords: Math.round(data.fillerWords * progress),
          interruptions: Math.round(data.interruptions * progress),
          totalSilenceDuration: data.totalSilenceDuration * progress,
          transcriptQualityScore: Math.round(
            data.transcriptQualityScore * progress,
          ),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedMetrics(data);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateMetrics();
  }, [data]);

  const getRatioColor = (ratio: number) => {
    if (ratio >= 0.4 && ratio <= 0.6) return "#10b981"; // Good range
    if (ratio >= 0.3 && ratio <= 0.7) return "#f59e0b"; // Acceptable range
    return "#ef4444"; // Poor range
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const formatDuration = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds.toFixed(1)}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(1)}s`;
  };

  const getRatioStatus = (ratio: number): RatioStatus => {
    if (ratio >= 0.4 && ratio <= 0.6) return "Optimal";
    if (ratio >= 0.3 && ratio <= 0.7) return "Acceptable";
    return "Needs Improvement";
  };

  const getQualityStatus = (score: number): QualityStatus => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Poor";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Key Metrics</h2>
        <div className={styles.subtitle}>Conversation Analysis</div>
      </div>

      <div className={styles.metricsGrid}>
        {/* Talk-to-Listen Ratio Gauge */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Talk-to-Listen Ratio</h3>
            <div
              className={styles.statusBadge}
              style={{
                backgroundColor: getRatioColor(
                  animatedMetrics.talkToListenRatio,
                ),
              }}
            >
              {getRatioStatus(animatedMetrics.talkToListenRatio)}
            </div>
          </div>
          <div className={styles.gaugeContainer}>
            <div className={styles.gauge}>
              <div
                className={styles.gaugeFill}
                style={{
                  width: `${animatedMetrics.talkToListenRatio * 100}%`,
                  backgroundColor: getRatioColor(
                    animatedMetrics.talkToListenRatio,
                  ),
                }}
              />
            </div>
            <div className={styles.gaugeLabels}>
              <span className={styles.gaugeLabel}>Listen</span>
              <span className={styles.gaugeValue}>
                {(animatedMetrics.talkToListenRatio * 100).toFixed(1)}%
              </span>
              <span className={styles.gaugeLabel}>Talk</span>
            </div>
          </div>
          <div className={styles.metricDescription}>
            Optimal range: 40% - 60%
          </div>
        </div>

        {/* Filler Words Counter */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Filler Words</h3>
            <div className={styles.metricIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
          </div>
          <div className={styles.counterValue}>
            {animatedMetrics.fillerWords}
          </div>
          <div className={styles.metricDescription}>
            Words like "um", "uh", "like"
          </div>
        </div>

        {/* Interruptions Counter */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Interruptions</h3>
            <div className={styles.metricIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
          <div className={styles.counterValue}>
            {animatedMetrics.interruptions}
          </div>
          <div className={styles.metricDescription}>
            Times speakers interrupted each other
          </div>
        </div>

        {/* Total Silence Duration */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Silence Duration</h3>
            <div className={styles.metricIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
              </svg>
            </div>
          </div>
          <div className={styles.counterValue}>
            {formatDuration(animatedMetrics.totalSilenceDuration)}
          </div>
          <div className={styles.metricDescription}>
            Total pause time in conversation
          </div>
        </div>

        {/* Transcript Quality Score */}
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <h3 className={styles.metricTitle}>Quality Score</h3>
            <div
              className={styles.statusBadge}
              style={{
                backgroundColor: getQualityColor(
                  animatedMetrics.transcriptQualityScore,
                ),
              }}
            >
              {getQualityStatus(animatedMetrics.transcriptQualityScore)}
            </div>
          </div>
          <div className={styles.scoreContainer}>
            <div className={styles.scoreCircle}>
              <div
                className={styles.scoreFill}
                style={{
                  background: `conic-gradient(${getQualityColor(animatedMetrics.transcriptQualityScore)} ${animatedMetrics.transcriptQualityScore * 3.6}deg, #e5e7eb 0deg)`,
                }}
              />
              <div className={styles.scoreValue}>
                {animatedMetrics.transcriptQualityScore}
              </div>
            </div>
          </div>
          <div className={styles.metricDescription}>
            Overall transcript clarity assessment
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <h3 className={styles.summaryTitle}>Conversation Summary</h3>
        <div className={styles.summaryContent}>
          <p>
            This conversation shows a{" "}
            {getRatioStatus(animatedMetrics.talkToListenRatio).toLowerCase()}
            talk-to-listen ratio with {animatedMetrics.fillerWords} filler words
            and {animatedMetrics.interruptions} interruptions. The transcript
            quality is{" "}
            {getQualityStatus(
              animatedMetrics.transcriptQualityScore,
            ).toLowerCase()}
            .
          </p>
        </div>
      </div>
    </div>
  );
}
