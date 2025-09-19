'use client';

import styles from './team-metrics.module.scss';

interface TeamMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  iconColor: string;
}

export function TeamMetrics() {
  const metrics: TeamMetric[] = [
    {
      id: 'total-agents',
      title: 'Active Agents',
      value: '12',
      change: '+2 this month',
      changeType: 'positive',
      icon: 'users',
      iconColor: '#3182ce',
    },
    {
      id: 'avg-quality',
      title: 'Average Quality Score',
      value: '91.2',
      change: '+3.5% from last month',
      changeType: 'positive',
      icon: 'star',
      iconColor: '#38a169',
    },
    {
      id: 'total-conversations',
      title: 'Total Conversations',
      value: '1,247',
      change: '+15% this week',
      changeType: 'positive',
      icon: 'chat',
      iconColor: '#805ad5',
    },
    {
      id: 'avg-duration',
      title: 'Average Duration',
      value: '9:45',
      change: '-2 min from last week',
      changeType: 'positive',
      icon: 'clock',
      iconColor: '#dd6b20',
    },
    {
      id: 'interruption-rate',
      title: 'Interruption Rate',
      value: '1.8',
      change: '+0.3 from last month',
      changeType: 'negative',
      icon: 'warning',
      iconColor: '#e53e3e',
    },
    {
      id: 'customer-satisfaction',
      title: 'Customer Satisfaction',
      value: '4.7/5',
      change: '+0.2 from last month',
      changeType: 'positive',
      icon: 'heart',
      iconColor: '#38a169',
    },
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      users: (
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17.5c-.8 0-1.54.5-1.85 1.26L13.5 16H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9L6.34 8.54A1.5 1.5 0 0 0 4.8 8H3.5c-.8 0-1.54.5-1.85 1.26L.5 16H3v6h4.5z" />
      ),
      star: (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      ),
      chat: (
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
      ),
      clock: (
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
      ),
      warning: <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />,
      heart: (
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      ),
    };
    return icons[iconName as keyof typeof icons] || icons.users;
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return '#38a169';
      case 'negative':
        return '#e53e3e';
      default:
        return '#718096';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
          </svg>
        );
      case 'negative':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z" />
          </svg>
        );
      default:
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Team Performance Overview</h2>
        <p className={styles.subtitle}>
          Key metrics and performance indicators
        </p>
      </div>

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
                className={styles.metricChange}
                style={{ color: getChangeColor(metric.changeType) }}
              >
                <div className={styles.changeIcon}>
                  {getChangeIcon(metric.changeType)}
                </div>
                <span className={styles.changeText}>{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
