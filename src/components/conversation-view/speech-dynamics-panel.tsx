"use client";

import styles from "./speech-dynamics-panel.module.scss";

interface SpeechMetrics {
  agentWPM: number;
  customerWPM: number;
  agentTone: "calm" | "elevated" | "frustrated" | "professional" | "neutral";
  customerTone: "calm" | "elevated" | "frustrated" | "professional" | "neutral";
  averagePauseLength: number; // in seconds
  speechClarity: number; // 0-100
}

interface SpeechDynamicsPanelProps {
  metrics?: SpeechMetrics;
  className?: string;
}

/**
 * Speech Dynamics Panel component (FR-DV-4.4).
 * Displays the agent's average WPM against a "normal range" visual.
 * Provides a simple tag for the detected tone (e.g., "Tone: Elevated").
 * @param props - Component props
 * @param props.metrics - Speech metrics data
 * @param props.className - Optional CSS class name
 * @returns The SpeechDynamicsPanel component
 */
export function SpeechDynamicsPanel({
  metrics,
  className,
}: SpeechDynamicsPanelProps) {
  // Mock data for demonstration
  const mockMetrics: SpeechMetrics = metrics || {
    agentWPM: 145,
    customerWPM: 132,
    agentTone: "elevated",
    customerTone: "frustrated",
    averagePauseLength: 2.3,
    speechClarity: 87,
  };

  const normalWPMRange = { min: 120, max: 180 };
  const optimalWPMRange = { min: 140, max: 160 };

  const getWPMStatus = (wpm: number) => {
    if (wpm < normalWPMRange.min) return "slow";
    if (wpm > normalWPMRange.max) return "fast";
    if (wpm >= optimalWPMRange.min && wpm <= optimalWPMRange.max)
      return "optimal";
    return "normal";
  };

  const getToneColor = (tone: string) => {
    switch (tone) {
      case "calm":
        return "#38a169";
      case "elevated":
        return "#d69e2e";
      case "frustrated":
        return "#e53e3e";
      case "professional":
        return "#3182ce";
      case "neutral":
        return "#4a5568";
      default:
        return "#4a5568";
    }
  };

  const getToneIcon = (tone: string) => {
    switch (tone) {
      case "calm":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case "elevated":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "frustrated":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
          </svg>
        );
      case "professional":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7H9v2h2v2h2v-2h2V9h-2V7h-2z" />
          </svg>
        );
      case "neutral":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7H9v2h2v2h2v-2h2V9h-2V7h-2z" />
          </svg>
        );
      default:
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7H9v2h2v2h2v-2h2V9h-2V7h-2z" />
          </svg>
        );
    }
  };

  const agentWPMStatus = getWPMStatus(mockMetrics.agentWPM);
  const customerWPMStatus = getWPMStatus(mockMetrics.customerWPM);

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>Speech Dynamics</h3>
        <div className={styles.clarityScore}>
          <span className={styles.clarityLabel}>Clarity:</span>
          <span className={styles.clarityValue}>
            {mockMetrics.speechClarity}%
          </span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Agent Speech Analysis */}
        <div className={styles.speakerSection}>
          <div className={styles.speakerHeader}>
            <h4 className={styles.speakerTitle}>Agent Speech</h4>
            <div className={styles.toneIndicator}>
              <div
                className={styles.toneIcon}
                style={{ color: getToneColor(mockMetrics.agentTone) }}
              >
                {getToneIcon(mockMetrics.agentTone)}
              </div>
              <span className={styles.toneLabel}>
                Tone:{" "}
                {mockMetrics.agentTone.charAt(0).toUpperCase() +
                  mockMetrics.agentTone.slice(1)}
              </span>
            </div>
          </div>

          <div className={styles.wpmAnalysis}>
            <div className={styles.wpmDisplay}>
              <span className={styles.wpmValue}>{mockMetrics.agentWPM}</span>
              <span className={styles.wpmUnit}>WPM</span>
            </div>
            <div className={styles.wpmRange}>
              <div className={styles.rangeBar}>
                <div className={styles.rangeTrack}>
                  <div className={styles.optimalRange}></div>
                  <div
                    className={`${styles.wpmIndicator} ${styles[agentWPMStatus]}`}
                    style={{
                      left: `${((mockMetrics.agentWPM - 100) / 100) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>100</span>
                  <span>120</span>
                  <span>140</span>
                  <span>160</span>
                  <span>180</span>
                  <span>200</span>
                </div>
              </div>
              <div className={styles.wpmStatus}>
                <span
                  className={`${styles.statusBadge} ${styles[agentWPMStatus]}`}
                >
                  {agentWPMStatus.charAt(0).toUpperCase() +
                    agentWPMStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Speech Analysis */}
        <div className={styles.speakerSection}>
          <div className={styles.speakerHeader}>
            <h4 className={styles.speakerTitle}>Customer Speech</h4>
            <div className={styles.toneIndicator}>
              <div
                className={styles.toneIcon}
                style={{ color: getToneColor(mockMetrics.customerTone) }}
              >
                {getToneIcon(mockMetrics.customerTone)}
              </div>
              <span className={styles.toneLabel}>
                Tone:{" "}
                {mockMetrics.customerTone.charAt(0).toUpperCase() +
                  mockMetrics.customerTone.slice(1)}
              </span>
            </div>
          </div>

          <div className={styles.wpmAnalysis}>
            <div className={styles.wpmDisplay}>
              <span className={styles.wpmValue}>{mockMetrics.customerWPM}</span>
              <span className={styles.wpmUnit}>WPM</span>
            </div>
            <div className={styles.wpmRange}>
              <div className={styles.rangeBar}>
                <div className={styles.rangeTrack}>
                  <div className={styles.optimalRange}></div>
                  <div
                    className={`${styles.wpmIndicator} ${styles[customerWPMStatus]}`}
                    style={{
                      left: `${((mockMetrics.customerWPM - 100) / 100) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className={styles.rangeLabels}>
                  <span>100</span>
                  <span>120</span>
                  <span>140</span>
                  <span>160</span>
                  <span>180</span>
                  <span>200</span>
                </div>
              </div>
              <div className={styles.wpmStatus}>
                <span
                  className={`${styles.statusBadge} ${styles[customerWPMStatus]}`}
                >
                  {customerWPMStatus.charAt(0).toUpperCase() +
                    customerWPMStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className={styles.additionalMetrics}>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Avg Pause Length:</span>
            <span className={styles.metricValue}>
              {mockMetrics.averagePauseLength}s
            </span>
          </div>
          <div className={styles.metricItem}>
            <span className={styles.metricLabel}>Speech Clarity:</span>
            <span className={styles.metricValue}>
              {mockMetrics.speechClarity}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
