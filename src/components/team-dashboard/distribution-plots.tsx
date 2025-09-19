"use client";

import React from "react";
import styles from "./distribution-plots.module.scss";

interface AgentData {
  id: string;
  name: string;
  talkRatio: number;
  monologueFrequency: number;
  interruptionRate: number;
  avgConversationLength: number;
}

interface DistributionPlotsProps {
  agents?: AgentData[];
}

export function DistributionPlots({ agents }: DistributionPlotsProps) {
  // Mock data for demonstration
  const mockAgents: AgentData[] = [
    { id: "1", name: "Sarah Johnson", talkRatio: 0.65, monologueFrequency: 2.3, interruptionRate: 0.8, avgConversationLength: 8.5 },
    { id: "2", name: "Mike Chen", talkRatio: 0.45, monologueFrequency: 1.2, interruptionRate: 1.5, avgConversationLength: 12.3 },
    { id: "3", name: "Emily Rodriguez", talkRatio: 0.72, monologueFrequency: 3.1, interruptionRate: 0.3, avgConversationLength: 6.8 },
    { id: "4", name: "David Kim", talkRatio: 0.38, monologueFrequency: 0.9, interruptionRate: 2.1, avgConversationLength: 15.2 },
    { id: "5", name: "Lisa Wang", talkRatio: 0.58, monologueFrequency: 2.8, interruptionRate: 1.2, avgConversationLength: 9.7 },
    { id: "6", name: "James Wilson", talkRatio: 0.41, monologueFrequency: 1.5, interruptionRate: 1.8, avgConversationLength: 11.4 },
    { id: "7", name: "Maria Garcia", talkRatio: 0.69, monologueFrequency: 2.9, interruptionRate: 0.6, avgConversationLength: 7.9 },
    { id: "8", name: "Alex Thompson", talkRatio: 0.52, monologueFrequency: 1.8, interruptionRate: 1.4, avgConversationLength: 10.1 },
  ];

  const displayAgents = agents || mockAgents;

  const calculateBoxPlotStats = (values: number[]) => {
    const sorted = [...values].sort((a, b) => a - b);
    const q1 = sorted[Math.floor(sorted.length * 0.25)];
    const median = sorted[Math.floor(sorted.length * 0.5)];
    const q3 = sorted[Math.floor(sorted.length * 0.75)];
    const min = Math.min(...sorted);
    const max = Math.max(...sorted);
    return { min, q1, median, q3, max };
  };

  const talkRatios = displayAgents.map(agent => agent.talkRatio);
  const monologueFreqs = displayAgents.map(agent => agent.monologueFrequency);
  const interruptionRates = displayAgents.map(agent => agent.interruptionRate);

  const talkRatioStats = calculateBoxPlotStats(talkRatios);
  const monologueStats = calculateBoxPlotStats(monologueFreqs);
  const interruptionStats = calculateBoxPlotStats(interruptionRates);

  const getOutlierAgents = (values: number[], threshold: number = 1.5) => {
    const stats = calculateBoxPlotStats(values);
    const iqr = stats.q3 - stats.q1;
    const lowerBound = stats.q1 - threshold * iqr;
    const upperBound = stats.q3 + threshold * iqr;
    
    return displayAgents.filter((agent, index) => 
      values[index] < lowerBound || values[index] > upperBound
    );
  };

  const talkRatioOutliers = getOutlierAgents(talkRatios);
  const monologueOutliers = getOutlierAgents(monologueFreqs);
  const interruptionOutliers = getOutlierAgents(interruptionRates);

  return (
    <div className={styles.distributionPlots}>
      <h3 className={styles.title}>Distribution Analysis</h3>
      <p className={styles.subtitle}>Box plots showing distribution of key metrics across all agents</p>

      <div className={styles.plotsGrid}>
        {/* Talk Ratio Distribution */}
        <div className={styles.plotContainer}>
          <h4 className={styles.plotTitle}>Talk Ratio Distribution</h4>
          <div className={styles.boxPlot}>
            <div className={styles.boxPlotContainer}>
              <div className={styles.boxPlotBox}>
                <div className={styles.boxPlotWhisker} style={{ left: `${talkRatioStats.min * 100}%` }}></div>
                <div className={styles.boxPlotBoxInner} style={{ 
                  left: `${talkRatioStats.q1 * 100}%`,
                  width: `${(talkRatioStats.q3 - talkRatioStats.q1) * 100}%`
                }}>
                  <div className={styles.boxPlotMedian} style={{ 
                    left: `${((talkRatioStats.median - talkRatioStats.q1) / (talkRatioStats.q3 - talkRatioStats.q1)) * 100}%`
                  }}></div>
                </div>
                <div className={styles.boxPlotWhisker} style={{ left: `${talkRatioStats.max * 100}%` }}></div>
              </div>
              <div className={styles.boxPlotLabels}>
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Median:</span>
              <span className={styles.statValue}>{(talkRatioStats.median * 100).toFixed(1)}%</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>IQR:</span>
              <span className={styles.statValue}>{((talkRatioStats.q3 - talkRatioStats.q1) * 100).toFixed(1)}%</span>
            </div>
          </div>
          {talkRatioOutliers.length > 0 && (
            <div className={styles.outliers}>
              <span className={styles.outlierLabel}>Outliers:</span>
              {talkRatioOutliers.map(agent => (
                <span key={agent.id} className={styles.outlierAgent}>
                  {agent.name} ({(agent.talkRatio * 100).toFixed(1)}%)
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Monologue Frequency Distribution */}
        <div className={styles.plotContainer}>
          <h4 className={styles.plotTitle}>Monologue Frequency Distribution</h4>
          <div className={styles.boxPlot}>
            <div className={styles.boxPlotContainer}>
              <div className={styles.boxPlotBox}>
                <div className={styles.boxPlotWhisker} style={{ left: `${(monologueStats.min / 4) * 100}%` }}></div>
                <div className={styles.boxPlotBoxInner} style={{ 
                  left: `${(monologueStats.q1 / 4) * 100}%`,
                  width: `${((monologueStats.q3 - monologueStats.q1) / 4) * 100}%`
                }}>
                  <div className={styles.boxPlotMedian} style={{ 
                    left: `${(((monologueStats.median - monologueStats.q1) / (monologueStats.q3 - monologueStats.q1)) * 100)}%`
                  }}></div>
                </div>
                <div className={styles.boxPlotWhisker} style={{ left: `${(monologueStats.max / 4) * 100}%` }}></div>
              </div>
              <div className={styles.boxPlotLabels}>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4+</span>
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Median:</span>
              <span className={styles.statValue}>{monologueStats.median.toFixed(1)}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>IQR:</span>
              <span className={styles.statValue}>{(monologueStats.q3 - monologueStats.q1).toFixed(1)}</span>
            </div>
          </div>
          {monologueOutliers.length > 0 && (
            <div className={styles.outliers}>
              <span className={styles.outlierLabel}>Outliers:</span>
              {monologueOutliers.map(agent => (
                <span key={agent.id} className={styles.outlierAgent}>
                  {agent.name} ({agent.monologueFrequency.toFixed(1)})
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Interruption Rate Distribution */}
        <div className={styles.plotContainer}>
          <h4 className={styles.plotTitle}>Interruption Rate Distribution</h4>
          <div className={styles.boxPlot}>
            <div className={styles.boxPlotContainer}>
              <div className={styles.boxPlotBox}>
                <div className={styles.boxPlotWhisker} style={{ left: `${(interruptionStats.min / 3) * 100}%` }}></div>
                <div className={styles.boxPlotBoxInner} style={{ 
                  left: `${(interruptionStats.q1 / 3) * 100}%`,
                  width: `${((interruptionStats.q3 - interruptionStats.q1) / 3) * 100}%`
                }}>
                  <div className={styles.boxPlotMedian} style={{ 
                    left: `${(((interruptionStats.median - interruptionStats.q1) / (interruptionStats.q3 - interruptionStats.q1)) * 100)}%`
                  }}></div>
                </div>
                <div className={styles.boxPlotWhisker} style={{ left: `${(interruptionStats.max / 3) * 100}%` }}></div>
              </div>
              <div className={styles.boxPlotLabels}>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3+</span>
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Median:</span>
              <span className={styles.statValue}>{interruptionStats.median.toFixed(1)}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>IQR:</span>
              <span className={styles.statValue}>{(interruptionStats.q3 - interruptionStats.q1).toFixed(1)}</span>
            </div>
          </div>
          {interruptionOutliers.length > 0 && (
            <div className={styles.outliers}>
              <span className={styles.outlierLabel}>Outliers:</span>
              {interruptionOutliers.map(agent => (
                <span key={agent.id} className={styles.outlierAgent}>
                  {agent.name} ({agent.interruptionRate.toFixed(1)})
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.summary}>
        <h4>Key Insights</h4>
        <ul>
          <li>Talk ratio distribution shows {talkRatioOutliers.length > 0 ? `${talkRatioOutliers.length} outlier(s)` : 'normal distribution'}</li>
          <li>Monologue frequency has {monologueOutliers.length > 0 ? `${monologueOutliers.length} agent(s) needing coaching` : 'consistent patterns'}</li>
          <li>Interruption rates indicate {interruptionOutliers.length > 0 ? `${interruptionOutliers.length} agent(s) with communication issues` : 'healthy interaction patterns'}</li>
        </ul>
      </div>
    </div>
  );
}
