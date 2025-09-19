"use client";

import styles from "./talk-ratio-gauge.module.scss";

interface TalkRatioGaugeProps {
  agentPercentage: number; // 0-100
  customerPercentage: number; // 0-100
  className?: string;
}

/**
 * Talk Ratio Gauge component (FR-DV-4.2).
 * Displays a circular gauge widget showing agent vs customer talk ratio percentage.
 * Uses color-coding to indicate healthy balance (green for 40-60%) vs imbalanced conversation.
 * @param props - Component props
 * @param props.agentPercentage - Agent talk percentage (0-100)
 * @param props.customerPercentage - Customer talk percentage (0-100)
 * @param props.className - Optional CSS class name
 * @returns The TalkRatioGauge component
 */
export function TalkRatioGauge({
  agentPercentage,
  customerPercentage,
  className,
}: TalkRatioGaugeProps) {
  // Mock data for demonstration
  const mockAgentPercentage = agentPercentage || 65;
  const mockCustomerPercentage = customerPercentage || 35;

  const getBalanceStatus = (agentPct: number, customerPct: number) => {
    const minHealthy = 40;
    const maxHealthy = 60;

    if (
      (agentPct >= minHealthy && agentPct <= maxHealthy) ||
      (customerPct >= minHealthy && customerPct <= maxHealthy)
    ) {
      return "healthy";
    } else if (agentPct > 70 || customerPct > 70) {
      return "imbalanced";
    } else {
      return "moderate";
    }
  };

  const balanceStatus = getBalanceStatus(
    mockAgentPercentage,
    mockCustomerPercentage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "#38a169";
      case "imbalanced":
        return "#e53e3e";
      case "moderate":
        return "#d69e2e";
      default:
        return "#4a5568";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "healthy":
        return "Balanced";
      case "imbalanced":
        return "Imbalanced";
      case "moderate":
        return "Moderate";
      default:
        return "Unknown";
    }
  };

  // Calculate the stroke-dasharray for the circular progress
  const circumference = 2 * Math.PI * 45; // radius = 45
  const agentStrokeDasharray = `${(mockAgentPercentage / 100) * circumference} ${circumference}`;
  const customerStrokeDasharray = `${(mockCustomerPercentage / 100) * circumference} ${circumference}`;

  return (
    <div className={`${styles.gaugeContainer} ${className || ""}`}>
      <div className={styles.gaugeHeader}>
        <h3 className={styles.gaugeTitle}>Talk Ratio</h3>
        <div className={`${styles.statusBadge} ${styles[balanceStatus]}`}>
          {getStatusLabel(balanceStatus)}
        </div>
      </div>

      <div className={styles.gaugeWrapper}>
        <svg className={styles.gaugeSvg} viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />

          {/* Agent progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#3182ce"
            strokeWidth="8"
            strokeDasharray={agentStrokeDasharray}
            strokeDashoffset="0"
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className={styles.agentProgress}
          />

          {/* Customer progress circle (overlay) */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#38a169"
            strokeWidth="8"
            strokeDasharray={customerStrokeDasharray}
            strokeDashoffset={`-${(mockAgentPercentage / 100) * circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className={styles.customerProgress}
          />
        </svg>

        {/* Center content */}
        <div className={styles.gaugeCenter}>
          <div className={styles.ratioDisplay}>
            <div className={styles.agentRatio}>
              <span className={styles.ratioLabel}>Agent</span>
              <span className={styles.ratioValue}>{mockAgentPercentage}%</span>
            </div>
            <div className={styles.customerRatio}>
              <span className={styles.ratioLabel}>Customer</span>
              <span className={styles.ratioValue}>
                {mockCustomerPercentage}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed breakdown */}
      <div className={styles.breakdown}>
        <div className={styles.breakdownItem}>
          <div className={`${styles.breakdownColor} ${styles.agent}`}></div>
          <span className={styles.breakdownLabel}>Agent Speaking</span>
          <span className={styles.breakdownValue}>{mockAgentPercentage}%</span>
        </div>
        <div className={styles.breakdownItem}>
          <div className={`${styles.breakdownColor} ${styles.customer}`}></div>
          <span className={styles.breakdownLabel}>Customer Speaking</span>
          <span className={styles.breakdownValue}>
            {mockCustomerPercentage}%
          </span>
        </div>
      </div>

      {/* Balance indicator */}
      <div className={styles.balanceIndicator}>
        <div className={styles.balanceBar}>
          <div
            className={`${styles.balanceFill} ${styles[balanceStatus]}`}
            style={{
              width: `${Math.abs(50 - mockAgentPercentage) * 2}%`,
              left: `${Math.min(mockAgentPercentage, 50)}%`,
            }}
          />
        </div>
        <div className={styles.balanceLabels}>
          <span className={styles.balanceLabel}>Agent Heavy</span>
          <span className={styles.balanceLabel}>Balanced</span>
          <span className={styles.balanceLabel}>Customer Heavy</span>
        </div>
      </div>
    </div>
  );
}
