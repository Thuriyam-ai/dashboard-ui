"use client";

import styles from "./leaderboards.module.scss";

interface Agent {
  id: string;
  name: string;
  team: string;
  talkToListenRatio: number;
  interruptions: number;
  qualityScore: number;
  totalConversations: number;
  avgDuration: string;
}

export function Leaderboards() {
  // Mock data with Indian agent names
  const agents: Agent[] = [
    {
      id: "1",
      name: "Priya Sharma",
      team: "Customer Support",
      talkToListenRatio: 0.58,
      interruptions: 1,
      qualityScore: 95,
      totalConversations: 45,
      avgDuration: "8:30",
    },
    {
      id: "2",
      name: "Arjun Patel",
      team: "Sales",
      talkToListenRatio: 0.62,
      interruptions: 2,
      qualityScore: 92,
      totalConversations: 38,
      avgDuration: "12:15",
    },
    {
      id: "3",
      name: "Kavya Reddy",
      team: "Technical Support",
      talkToListenRatio: 0.55,
      interruptions: 0,
      qualityScore: 98,
      totalConversations: 52,
      avgDuration: "15:45",
    },
    {
      id: "4",
      name: "Rajesh Kumar",
      team: "Customer Support",
      talkToListenRatio: 0.65,
      interruptions: 3,
      qualityScore: 87,
      totalConversations: 41,
      avgDuration: "7:20",
    },
    {
      id: "5",
      name: "Sneha Singh",
      team: "Sales",
      talkToListenRatio: 0.59,
      interruptions: 1,
      qualityScore: 94,
      totalConversations: 36,
      avgDuration: "11:30",
    },
  ];

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className={styles.goldMedal}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      case 1:
        return (
          <div className={styles.silverMedal}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      case 2:
        return (
          <div className={styles.bronzeMedal}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      default:
        return <div className={styles.rankNumber}>{index + 1}</div>;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return "#38a169";
    if (score >= 80) return "#dd6b20";
    return "#e53e3e";
  };

  const getTeamColor = (team: string) => {
    switch (team) {
      case "Customer Support":
        return "#3182ce";
      case "Sales":
        return "#38a169";
      case "Technical Support":
        return "#805ad5";
      default:
        return "#718096";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Agent Leaderboards</h2>
        <p className={styles.subtitle}>
          Performance rankings based on key metrics
        </p>
      </div>

      <div className={styles.leaderboardsGrid}>
        {/* Talk-to-Listen Ratio Leaderboard */}
        <div className={styles.leaderboardCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className={styles.cardTitle}>Best Talk-to-Listen Ratio</div>
            <div className={styles.cardSubtitle}>
              Lower is better (optimal: 40-60%)
            </div>
          </div>

          <div className={styles.leaderboardList}>
            {agents
              .sort(
                (a, b) =>
                  Math.abs(a.talkToListenRatio - 0.5) -
                  Math.abs(b.talkToListenRatio - 0.5),
              )
              .map((agent, index) => (
                <div key={agent.id} className={styles.leaderboardItem}>
                  <div className={styles.rank}>{getRankIcon(index)}</div>
                  <div className={styles.agentInfo}>
                    <div className={styles.agentName}>{agent.name}</div>
                    <div
                      className={styles.agentTeam}
                      style={{ color: getTeamColor(agent.team) }}
                    >
                      {agent.team}
                    </div>
                  </div>
                  <div className={styles.metricValue}>
                    {Math.round(agent.talkToListenRatio * 100)}%
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Lowest Interruptions Leaderboard */}
        <div className={styles.leaderboardCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className={styles.cardTitle}>Lowest Interruptions</div>
            <div className={styles.cardSubtitle}>
              Fewer interruptions = better performance
            </div>
          </div>

          <div className={styles.leaderboardList}>
            {agents
              .sort((a, b) => a.interruptions - b.interruptions)
              .map((agent, index) => (
                <div key={agent.id} className={styles.leaderboardItem}>
                  <div className={styles.rank}>{getRankIcon(index)}</div>
                  <div className={styles.agentInfo}>
                    <div className={styles.agentName}>{agent.name}</div>
                    <div
                      className={styles.agentTeam}
                      style={{ color: getTeamColor(agent.team) }}
                    >
                      {agent.team}
                    </div>
                  </div>
                  <div className={styles.metricValue}>
                    {agent.interruptions}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Quality Score Leaderboard */}
        <div className={styles.leaderboardCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className={styles.cardTitle}>Highest Quality Score</div>
            <div className={styles.cardSubtitle}>
              Overall conversation quality
            </div>
          </div>

          <div className={styles.leaderboardList}>
            {agents
              .sort((a, b) => b.qualityScore - a.qualityScore)
              .map((agent, index) => (
                <div key={agent.id} className={styles.leaderboardItem}>
                  <div className={styles.rank}>{getRankIcon(index)}</div>
                  <div className={styles.agentInfo}>
                    <div className={styles.agentName}>{agent.name}</div>
                    <div
                      className={styles.agentTeam}
                      style={{ color: getTeamColor(agent.team) }}
                    >
                      {agent.team}
                    </div>
                  </div>
                  <div
                    className={styles.metricValue}
                    style={{ color: getQualityColor(agent.qualityScore) }}
                  >
                    {agent.qualityScore}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
