"use client";

import React, { useState } from "react";
import styles from "./coaching-leaderboards.module.scss";

interface AgentCoachingData {
  id: string;
  name: string;
  monologueFrequency: number;
  interruptionRate: number;
  avgConversationLength: number;
  talkRatio: number;
  coachingPriority: "high" | "medium" | "low";
}

interface CoachingLeaderboardsProps {
  agents?: AgentCoachingData[];
}

export function CoachingLeaderboards({ agents }: CoachingLeaderboardsProps) {
  const [activeTab, setActiveTab] = useState<"monologue" | "interruption">("monologue");

  // Mock data for demonstration
  const mockAgents: AgentCoachingData[] = [
    { id: "1", name: "Sarah Johnson", monologueFrequency: 3.2, interruptionRate: 0.8, avgConversationLength: 8.5, talkRatio: 0.65, coachingPriority: "high" },
    { id: "2", name: "Mike Chen", monologueFrequency: 1.2, interruptionRate: 1.5, avgConversationLength: 12.3, talkRatio: 0.45, coachingPriority: "medium" },
    { id: "3", name: "Emily Rodriguez", monologueFrequency: 3.8, interruptionRate: 0.3, avgConversationLength: 6.8, talkRatio: 0.72, coachingPriority: "high" },
    { id: "4", name: "David Kim", monologueFrequency: 0.9, interruptionRate: 2.1, avgConversationLength: 15.2, talkRatio: 0.38, coachingPriority: "medium" },
    { id: "5", name: "Lisa Wang", monologueFrequency: 2.8, interruptionRate: 1.2, avgConversationLength: 9.7, talkRatio: 0.58, coachingPriority: "medium" },
    { id: "6", name: "James Wilson", monologueFrequency: 1.5, interruptionRate: 1.8, avgConversationLength: 11.4, talkRatio: 0.41, coachingPriority: "low" },
    { id: "7", name: "Maria Garcia", monologueFrequency: 2.9, interruptionRate: 0.6, avgConversationLength: 7.9, talkRatio: 0.69, coachingPriority: "medium" },
    { id: "8", name: "Alex Thompson", monologueFrequency: 1.8, interruptionRate: 1.4, avgConversationLength: 10.1, talkRatio: 0.52, coachingPriority: "low" },
  ];

  const displayAgents = agents || mockAgents;

  const getCoachingPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return styles.highPriority;
      case "medium":
        return styles.mediumPriority;
      case "low":
        return styles.lowPriority;
      default:
        return styles.lowPriority;
    }
  };

  const getCoachingPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Unknown";
    }
  };

  const getCoachingRecommendation = (agent: AgentCoachingData, metric: string) => {
    if (metric === "monologue") {
      if (agent.monologueFrequency > 3.0) {
        return "Focus on active listening and shorter responses";
      } else if (agent.monologueFrequency > 2.0) {
        return "Practice asking more questions";
      } else {
        return "Good balance - maintain current approach";
      }
    } else {
      if (agent.interruptionRate > 2.0) {
        return "Work on patience and listening skills";
      } else if (agent.interruptionRate > 1.0) {
        return "Practice waiting for natural pauses";
      } else {
        return "Excellent listening skills";
      }
    }
  };

  const sortedByMonologue = [...displayAgents].sort((a, b) => b.monologueFrequency - a.monologueFrequency);
  const sortedByInterruption = [...displayAgents].sort((a, b) => b.interruptionRate - a.interruptionRate);

  const currentAgents = activeTab === "monologue" ? sortedByMonologue : sortedByInterruption;

  return (
    <div className={styles.coachingLeaderboards}>
      <h3 className={styles.title}>Coaching Leaderboards</h3>
      <p className={styles.subtitle}>Identify agents who need coaching on specific conversation skills</p>

      {/* Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tab} ${activeTab === "monologue" ? styles.active : ""}`}
          onClick={() => setActiveTab("monologue")}
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className={styles.tabIcon}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Monologue Frequency
        </button>
        <button
          className={`${styles.tab} ${activeTab === "interruption" ? styles.active : ""}`}
          onClick={() => setActiveTab("interruption")}
        >
          <svg fill="currentColor" viewBox="0 0 24 24" className={styles.tabIcon}>
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6h-7.6z" />
          </svg>
          Interruption Rate
        </button>
      </div>

      {/* Leaderboard Content */}
      <div className={styles.leaderboardContent}>
        <div className={styles.leaderboardHeader}>
          <div className={styles.rankColumn}>Rank</div>
          <div className={styles.agentColumn}>Agent</div>
          <div className={styles.metricColumn}>
            {activeTab === "monologue" ? "Monologue Freq." : "Interruption Rate"}
          </div>
          <div className={styles.priorityColumn}>Priority</div>
          <div className={styles.recommendationColumn}>Coaching Focus</div>
        </div>

        <div className={styles.leaderboardList}>
          {currentAgents.map((agent, index) => (
            <div key={agent.id} className={styles.leaderboardItem}>
              <div className={styles.rankColumn}>
                <span className={`${styles.rank} ${index < 3 ? styles.topRank : ""}`}>
                  {index + 1}
                </span>
              </div>
              <div className={styles.agentColumn}>
                <div className={styles.agentInfo}>
                  <div className={styles.agentName}>{agent.name}</div>
                  <div className={styles.agentDetails}>
                    Avg. Length: {agent.avgConversationLength.toFixed(1)}min | 
                    Talk Ratio: {(agent.talkRatio * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              <div className={styles.metricColumn}>
                <span className={styles.metricValue}>
                  {activeTab === "monologue" 
                    ? agent.monologueFrequency.toFixed(1)
                    : agent.interruptionRate.toFixed(1)
                  }
                </span>
                <span className={styles.metricUnit}>
                  {activeTab === "monologue" ? "per call" : "per hour"}
                </span>
              </div>
              <div className={styles.priorityColumn}>
                <span className={`${styles.priorityBadge} ${getCoachingPriorityColor(agent.coachingPriority)}`}>
                  {getCoachingPriorityLabel(agent.coachingPriority)}
                </span>
              </div>
              <div className={styles.recommendationColumn}>
                <span className={styles.recommendation}>
                  {getCoachingRecommendation(agent, activeTab)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className={styles.summaryStats}>
        <div className={styles.statCard}>
          <h4>High Priority Agents</h4>
          <span className={styles.statValue}>
            {displayAgents.filter(agent => agent.coachingPriority === "high").length}
          </span>
          <span className={styles.statLabel}>Need immediate coaching</span>
        </div>
        <div className={styles.statCard}>
          <h4>Team Average</h4>
          <span className={styles.statValue}>
            {activeTab === "monologue" 
              ? (displayAgents.reduce((sum, agent) => sum + agent.monologueFrequency, 0) / displayAgents.length).toFixed(1)
              : (displayAgents.reduce((sum, agent) => sum + agent.interruptionRate, 0) / displayAgents.length).toFixed(1)
            }
          </span>
          <span className={styles.statLabel}>
            {activeTab === "monologue" ? "Monologues per call" : "Interruptions per hour"}
          </span>
        </div>
        <div className={styles.statCard}>
          <h4>Coaching Opportunities</h4>
          <span className={styles.statValue}>
            {displayAgents.filter(agent => 
              agent.coachingPriority === "high" || agent.coachingPriority === "medium"
            ).length}
          </span>
          <span className={styles.statLabel}>Agents needing support</span>
        </div>
      </div>
    </div>
  );
}
