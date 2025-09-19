"use client";

import styles from "./conversation-overview.module.scss";

interface Conversation {
  id: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  status: "completed" | "in-progress" | "failed";
  qualityScore: number;
  fillerWords: number;
  interruptions: number;
  talkToListenRatio: number;
}

interface ConversationOverviewProps {
  conversations: Conversation[];
  onConversationSelect: (conversation: Conversation) => void;
}

export function ConversationOverview({
  conversations,
  onConversationSelect,
}: ConversationOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#38a169";
      case "in-progress":
        return "#3182ce";
      case "failed":
        return "#e53e3e";
      default:
        return "#718096";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case "in-progress":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case "failed":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return "#38a169";
    if (score >= 60) return "#dd6b20";
    return "#e53e3e";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>{conversations.length}</div>
            <div className={styles.summaryLabel}>Total Conversations</div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>
              {conversations.filter((c) => c.status === "completed").length}
            </div>
            <div className={styles.summaryLabel}>Completed</div>
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
              {Math.round(
                conversations.reduce((sum, c) => sum + c.qualityScore, 0) /
                  conversations.length,
              )}
            </div>
            <div className={styles.summaryLabel}>Avg Quality Score</div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z" />
            </svg>
          </div>
          <div className={styles.summaryContent}>
            <div className={styles.summaryValue}>
              {Math.round(
                (conversations.reduce(
                  (sum, c) => sum + c.talkToListenRatio,
                  0,
                ) /
                  conversations.length) *
                  100,
              )}
              %
            </div>
            <div className={styles.summaryLabel}>Avg Talk Ratio</div>
          </div>
        </div>
      </div>

      {/* Conversations List */}
      <div className={styles.conversationsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Conversations</h2>
          <div className={styles.sectionSubtitle}>
            Click on any conversation to view detailed analysis
          </div>
        </div>

        <div className={styles.conversationsList}>
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={styles.conversationCard}
              onClick={() => onConversationSelect(conversation)}
            >
              <div className={styles.conversationHeader}>
                <div className={styles.conversationInfo}>
                  <div className={styles.conversationTitle}>
                    {conversation.agentName} ↔ {conversation.customerName}
                  </div>
                  <div className={styles.conversationMeta}>
                    {formatDate(conversation.date)} • {conversation.duration}
                  </div>
                </div>
                <div
                  className={styles.statusIndicator}
                  style={{ color: getStatusColor(conversation.status) }}
                >
                  {getStatusIcon(conversation.status)}
                </div>
              </div>

              <div className={styles.conversationMetrics}>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Quality Score:</span>
                  <span
                    className={styles.metricValue}
                    style={{
                      color: getQualityColor(conversation.qualityScore),
                    }}
                  >
                    {conversation.qualityScore}
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Filler Words:</span>
                  <span className={styles.metricValue}>
                    {conversation.fillerWords}
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Interruptions:</span>
                  <span className={styles.metricValue}>
                    {conversation.interruptions}
                  </span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>Talk Ratio:</span>
                  <span className={styles.metricValue}>
                    {Math.round(conversation.talkToListenRatio * 100)}%
                  </span>
                </div>
              </div>

              <div className={styles.clickHint}>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
                Click to view detailed analysis
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
