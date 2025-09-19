"use client";

import styles from "./metrics-cards.module.scss";

interface MetricCard {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendColor: "green" | "blue" | "orange" | "red";
  icon: string;
  iconColor: string;
}

export function MetricsCards() {
  const metrics: MetricCard[] = [
    {
      id: "active-bots",
      title: "Active Bots",
      value: "12",
      trend: "+2 this week",
      trendColor: "green",
      icon: "robot",
      iconColor: "#3182ce",
    },
    {
      id: "deployments-today",
      title: "Deployments Today",
      value: "8",
      trend: "+25% from yesterday",
      trendColor: "green",
      icon: "rocket",
      iconColor: "#38a169",
    },
    {
      id: "active-users",
      title: "Active Users",
      value: "1,234",
      trend: "+12% this month",
      trendColor: "green",
      icon: "users",
      iconColor: "#805ad5",
    },
    {
      id: "issues",
      title: "Issues",
      value: "3",
      trend: "2 resolved today",
      trendColor: "blue",
      icon: "warning",
      iconColor: "#dd6b20",
    },
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      robot: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      ),
      rocket: (
        <path d="M12 2.5c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm0 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
      ),
      users: (
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17.5c-.8 0-1.54.5-1.85 1.26L13.5 16H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9L6.34 8.54A1.5 1.5 0 0 0 4.8 8H3.5c-.8 0-1.54.5-1.85 1.26L.5 16H3v6h4.5z" />
      ),
      warning: <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />,
    };
    return icons[iconName as keyof typeof icons] || icons.robot;
  };

  return (
    <div className={styles.metricsGrid}>
      {metrics.map((metric) => (
        <div key={metric.id} className={styles.metricCard}>
          <div className={styles.cardHeader}>
            <div
              className={styles.cardIcon}
              style={{ backgroundColor: metric.iconColor }}
            >
              <svg fill="white" viewBox="0 0 24 24">
                {getIcon(metric.icon)}
              </svg>
            </div>
            <div className={styles.chartIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z" />
              </svg>
            </div>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={styles.metricTitle}>{metric.title}</div>
            <div
              className={`${styles.metricTrend} ${styles[metric.trendColor]}`}
            >
              {metric.trend}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
