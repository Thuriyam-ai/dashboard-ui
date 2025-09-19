"use client";

import React, { useState } from "react";
import styles from "./radar-chart.module.scss";

interface AgentMetrics {
  id: string;
  name: string;
  talkRatio: number;
  monologueFrequency: number;
  interruptionRate: number;
  avgConversationLength: number;
  customerSatisfaction: number;
  resolutionRate: number;
}

interface RadarChartProps {
  agents?: AgentMetrics[];
  selectedAgent?: string;
}

export function RadarChart({ agents, selectedAgent }: RadarChartProps) {
  const [selectedAgentId, setSelectedAgentId] = useState(selectedAgent || "1");

  // Mock data for demonstration
  const mockAgents: AgentMetrics[] = [
    { id: "1", name: "Sarah Johnson", talkRatio: 0.65, monologueFrequency: 3.2, interruptionRate: 0.8, avgConversationLength: 8.5, customerSatisfaction: 4.2, resolutionRate: 0.85 },
    { id: "2", name: "Mike Chen", talkRatio: 0.45, monologueFrequency: 1.2, interruptionRate: 1.5, avgConversationLength: 12.3, customerSatisfaction: 4.5, resolutionRate: 0.92 },
    { id: "3", name: "Emily Rodriguez", talkRatio: 0.72, monologueFrequency: 3.8, interruptionRate: 0.3, avgConversationLength: 6.8, customerSatisfaction: 3.8, resolutionRate: 0.78 },
    { id: "4", name: "David Kim", talkRatio: 0.38, monologueFrequency: 0.9, interruptionRate: 2.1, avgConversationLength: 15.2, customerSatisfaction: 4.7, resolutionRate: 0.95 },
    { id: "5", name: "Lisa Wang", talkRatio: 0.58, monologueFrequency: 2.8, interruptionRate: 1.2, avgConversationLength: 9.7, customerSatisfaction: 4.1, resolutionRate: 0.88 },
  ];

  const displayAgents = agents || mockAgents;

  const selectedAgentData = displayAgents.find(agent => agent.id === selectedAgentId);
  const teamAverage = {
    talkRatio: displayAgents.reduce((sum, agent) => sum + agent.talkRatio, 0) / displayAgents.length,
    monologueFrequency: displayAgents.reduce((sum, agent) => sum + agent.monologueFrequency, 0) / displayAgents.length,
    interruptionRate: displayAgents.reduce((sum, agent) => sum + agent.interruptionRate, 0) / displayAgents.length,
    avgConversationLength: displayAgents.reduce((sum, agent) => sum + agent.avgConversationLength, 0) / displayAgents.length,
    customerSatisfaction: displayAgents.reduce((sum, agent) => sum + agent.customerSatisfaction, 0) / displayAgents.length,
    resolutionRate: displayAgents.reduce((sum, agent) => sum + agent.resolutionRate, 0) / displayAgents.length,
  };

  const metrics = [
    { key: "talkRatio", label: "Talk Ratio", max: 1, format: (val: number) => `${(val * 100).toFixed(0)}%` },
    { key: "monologueFrequency", label: "Monologue Freq", max: 4, format: (val: number) => val.toFixed(1) },
    { key: "interruptionRate", label: "Interruption Rate", max: 3, format: (val: number) => val.toFixed(1) },
    { key: "avgConversationLength", label: "Avg Length", max: 20, format: (val: number) => `${val.toFixed(1)}min` },
    { key: "customerSatisfaction", label: "Satisfaction", max: 5, format: (val: number) => val.toFixed(1) },
    { key: "resolutionRate", label: "Resolution Rate", max: 1, format: (val: number) => `${(val * 100).toFixed(0)}%` },
  ];

  const getRadarPoint = (value: number, max: number, angle: number, radius: number) => {
    const normalizedValue = Math.min(value / max, 1);
    const x = Math.cos(angle) * normalizedValue * radius;
    const y = Math.sin(angle) * normalizedValue * radius;
    return { x, y };
  };

  const generateRadarPath = (data: any, radius: number) => {
    const points = metrics.map((metric, index) => {
      const angle = (index * 2 * Math.PI) / metrics.length - Math.PI / 2;
      const point = getRadarPoint(data[metric.key], metric.max, angle, radius);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    });
    return points.join(' ') + ' Z';
  };

  const radius = 80;
  const centerX = 100;
  const centerY = 100;

  if (!selectedAgentData) return null;

  const agentPath = generateRadarPath(selectedAgentData, radius);
  const teamPath = generateRadarPath(teamAverage, radius);

  return (
    <div className={styles.radarChart}>
      <h3 className={styles.title}>Rep vs Team Average Comparison</h3>
      <p className={styles.subtitle}>Radar chart comparing individual agent performance against team averages</p>

      {/* Agent Selection */}
      <div className={styles.agentSelector}>
        <label htmlFor="agent-select" className={styles.selectorLabel}>Select Agent:</label>
        <select
          id="agent-select"
          value={selectedAgentId}
          onChange={(e) => setSelectedAgentId(e.target.value)}
          className={styles.selector}
        >
          {displayAgents.map(agent => (
            <option key={agent.id} value={agent.id}>{agent.name}</option>
          ))}
        </select>
      </div>

      {/* Radar Chart */}
      <div className={styles.chartContainer}>
        <svg width="200" height="200" viewBox="0 0 200 200" className={styles.radarSvg}>
          {/* Grid circles */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map((scale, index) => (
            <circle
              key={index}
              cx={centerX}
              cy={centerY}
              r={radius * scale}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Grid lines */}
          {metrics.map((_, index) => {
            const angle = (index * 2 * Math.PI) / metrics.length - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={centerX + x}
                y2={centerY + y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Team average area */}
          <path
            d={teamPath}
            fill="rgba(49, 130, 206, 0.1)"
            stroke="#3182ce"
            strokeWidth="2"
            className={styles.teamArea}
          />

          {/* Agent area */}
          <path
            d={agentPath}
            fill="rgba(229, 62, 62, 0.1)"
            stroke="#e53e3e"
            strokeWidth="2"
            className={styles.agentArea}
          />

          {/* Metric labels */}
          {metrics.map((metric, index) => {
            const angle = (index * 2 * Math.PI) / metrics.length - Math.PI / 2;
            const labelRadius = radius + 20;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            return (
              <text
                key={index}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={styles.metricLabel}
              >
                {metric.label}
              </text>
            );
          })}
        </svg>

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.agentColor}`}></div>
            <span>{selectedAgentData.name}</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.teamColor}`}></div>
            <span>Team Average</span>
          </div>
        </div>
      </div>

      {/* Metrics Comparison Table */}
      <div className={styles.metricsTable}>
        <h4>Detailed Comparison</h4>
        <div className={styles.tableContainer}>
          <div className={styles.tableHeader}>
            <div className={styles.metricColumn}>Metric</div>
            <div className={styles.agentColumn}>{selectedAgentData.name}</div>
            <div className={styles.teamColumn}>Team Average</div>
            <div className={styles.differenceColumn}>Difference</div>
          </div>
          {metrics.map((metric) => {
            const agentValue = selectedAgentData[metric.key as keyof AgentMetrics] as number;
            const teamValue = teamAverage[metric.key as keyof typeof teamAverage];
            const difference = agentValue - teamValue;
            const isPositive = difference > 0;
            
            return (
              <div key={metric.key} className={styles.tableRow}>
                <div className={styles.metricColumn}>{metric.label}</div>
                <div className={styles.agentColumn}>{metric.format(agentValue)}</div>
                <div className={styles.teamColumn}>{metric.format(teamValue)}</div>
                <div className={`${styles.differenceColumn} ${isPositive ? styles.positive : styles.negative}`}>
                  {isPositive ? '+' : ''}{metric.format(Math.abs(difference))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Performance Summary */}
      <div className={styles.performanceSummary}>
        <h4>Performance Summary</h4>
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <h5>Strengths</h5>
            <ul>
              {metrics.filter(metric => {
                const agentValue = selectedAgentData[metric.key as keyof AgentMetrics] as number;
                const teamValue = teamAverage[metric.key as keyof typeof teamAverage];
                return agentValue > teamValue;
              }).map(metric => (
                <li key={metric.key}>{metric.label}</li>
              ))}
            </ul>
          </div>
          <div className={styles.summaryCard}>
            <h5>Areas for Improvement</h5>
            <ul>
              {metrics.filter(metric => {
                const agentValue = selectedAgentData[metric.key as keyof AgentMetrics] as number;
                const teamValue = teamAverage[metric.key as keyof typeof teamAverage];
                return agentValue < teamValue;
              }).map(metric => (
                <li key={metric.key}>{metric.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
