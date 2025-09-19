'use client';

import styles from './trend-analysis.module.scss';

interface TrendData {
  date: string;
  talkRatio: number;
  interruptions: number;
  qualityScore: number;
  totalConversations: number;
}

export function TrendAnalysis() {
  // Mock trend data for the last 30 days
  const trendData: TrendData[] = [
    {
      date: '2024-01-01',
      talkRatio: 0.62,
      interruptions: 2.1,
      qualityScore: 89,
      totalConversations: 45,
    },
    {
      date: '2024-01-02',
      talkRatio: 0.58,
      interruptions: 1.8,
      qualityScore: 92,
      totalConversations: 52,
    },
    {
      date: '2024-01-03',
      talkRatio: 0.65,
      interruptions: 2.3,
      qualityScore: 87,
      totalConversations: 38,
    },
    {
      date: '2024-01-04',
      talkRatio: 0.59,
      interruptions: 1.5,
      qualityScore: 94,
      totalConversations: 48,
    },
    {
      date: '2024-01-05',
      talkRatio: 0.61,
      interruptions: 2.0,
      qualityScore: 90,
      totalConversations: 41,
    },
    {
      date: '2024-01-06',
      talkRatio: 0.57,
      interruptions: 1.7,
      qualityScore: 93,
      totalConversations: 55,
    },
    {
      date: '2024-01-07',
      talkRatio: 0.63,
      interruptions: 2.2,
      qualityScore: 88,
      totalConversations: 43,
    },
    {
      date: '2024-01-08',
      talkRatio: 0.6,
      interruptions: 1.9,
      qualityScore: 91,
      totalConversations: 49,
    },
    {
      date: '2024-01-09',
      talkRatio: 0.58,
      interruptions: 1.6,
      qualityScore: 95,
      totalConversations: 47,
    },
    {
      date: '2024-01-10',
      talkRatio: 0.64,
      interruptions: 2.4,
      qualityScore: 86,
      totalConversations: 39,
    },
    {
      date: '2024-01-11',
      talkRatio: 0.59,
      interruptions: 1.8,
      qualityScore: 92,
      totalConversations: 51,
    },
    {
      date: '2024-01-12',
      talkRatio: 0.61,
      interruptions: 2.1,
      qualityScore: 89,
      totalConversations: 44,
    },
    {
      date: '2024-01-13',
      talkRatio: 0.57,
      interruptions: 1.5,
      qualityScore: 94,
      totalConversations: 53,
    },
    {
      date: '2024-01-14',
      talkRatio: 0.62,
      interruptions: 2.0,
      qualityScore: 90,
      totalConversations: 42,
    },
    {
      date: '2024-01-15',
      talkRatio: 0.58,
      interruptions: 1.7,
      qualityScore: 93,
      totalConversations: 46,
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const getTrendDirection = (current: number, previous: number) => {
    if (current > previous) return 'up';
    if (current < previous) return 'down';
    return 'stable';
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
          </svg>
        );
      case 'down':
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

  const getTrendColor = (direction: string) => {
    switch (direction) {
      case 'up':
        return '#38a169';
      case 'down':
        return '#e53e3e';
      default:
        return '#718096';
    }
  };

  // Calculate averages for the period
  const avgTalkRatio =
    trendData.reduce((sum, d) => sum + d.talkRatio, 0) / trendData.length;
  const avgInterruptions =
    trendData.reduce((sum, d) => sum + d.interruptions, 0) / trendData.length;
  const avgQualityScore =
    trendData.reduce((sum, d) => sum + d.qualityScore, 0) / trendData.length;
  const totalConversations = trendData.reduce(
    (sum, d) => sum + d.totalConversations,
    0,
  );

  // Calculate trends (comparing first half vs second half)
  const midPoint = Math.floor(trendData.length / 2);
  const firstHalfAvg =
    trendData.slice(0, midPoint).reduce((sum, d) => sum + d.talkRatio, 0) /
    midPoint;
  const secondHalfAvg =
    trendData.slice(midPoint).reduce((sum, d) => sum + d.talkRatio, 0) /
    (trendData.length - midPoint);
  const talkRatioTrend = getTrendDirection(secondHalfAvg, firstHalfAvg);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Trend Analysis</h2>
        <p className={styles.subtitle}>Team performance trends over time</p>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>
              {Math.round(avgTalkRatio * 100)}%
            </div>
            <div className={styles.summaryLabel}>Avg Talk Ratio</div>
            <div
              className={styles.summaryTrend}
              style={{ color: getTrendColor(talkRatioTrend) }}
            >
              {getTrendIcon(talkRatioTrend)}
              {talkRatioTrend === 'up'
                ? 'Increasing'
                : talkRatioTrend === 'down'
                  ? 'Decreasing'
                  : 'Stable'}
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>
              {avgInterruptions.toFixed(1)}
            </div>
            <div className={styles.summaryLabel}>Avg Interruptions</div>
            <div className={styles.summaryTrend}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Stable
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>
              {Math.round(avgQualityScore)}
            </div>
            <div className={styles.summaryLabel}>Avg Quality Score</div>
            <div className={styles.summaryTrend}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              Improving
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>{totalConversations}</div>
            <div className={styles.summaryLabel}>Total Conversations</div>
            <div className={styles.summaryTrend}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              Growing
            </div>
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className={styles.trendChart}>
        <div className={styles.chartHeader}>
          <h3 className={styles.chartTitle}>Talk-to-Listen Ratio Trend</h3>
          <div className={styles.chartSubtitle}>Last 15 days</div>
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartGrid}>
            {trendData.map((data, index) => (
              <div key={data.date} className={styles.chartBar}>
                <div
                  className={styles.bar}
                  style={{
                    height: `${data.talkRatio * 100}%`,
                    backgroundColor:
                      data.talkRatio <= 0.6 ? '#38a169' : '#dd6b20',
                  }}
                />
                <div className={styles.barLabel}>{formatDate(data.date)}</div>
                <div className={styles.barValue}>
                  {Math.round(data.talkRatio * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
