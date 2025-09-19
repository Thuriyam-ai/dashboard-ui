"use client";

import styles from "./system-health.module.scss";

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  progress: number;
  status: "good" | "warning" | "critical";
  statusText: string;
}

export function SystemHealth() {
  const healthMetrics: HealthMetric[] = [
    {
      id: "api-response-time",
      label: "API Response Time",
      value: "Average: 120ms",
      progress: 85,
      status: "good",
      statusText: "Good",
    },
    {
      id: "bot-availability",
      label: "Bot Availability",
      value: "Last 24 hours",
      progress: 99.8,
      status: "good",
      statusText: "99.8%",
    },
    {
      id: "error-rate",
      label: "Error Rate",
      value: "Within acceptable range",
      progress: 2,
      status: "warning",
      statusText: "0.2%",
    },
  ];

  const getProgressColor = (status: string) => {
    switch (status) {
      case "good":
        return "#38a169";
      case "warning":
        return "#dd6b20";
      case "critical":
        return "#e53e3e";
      default:
        return "#718096";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z" />
          </svg>
        </div>
        <h2 className={styles.title}>System Health</h2>
      </div>

      <div className={styles.metricsList}>
        {healthMetrics.map((metric) => (
          <div key={metric.id} className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <div className={styles.metricLabel}>{metric.label}</div>
              <div className={styles.metricValue}>{metric.value}</div>
            </div>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${metric.progress}%`,
                    backgroundColor: getProgressColor(metric.status),
                  }}
                />
              </div>
              <div
                className={styles.statusText}
                style={{ color: getProgressColor(metric.status) }}
              >
                {metric.statusText}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
