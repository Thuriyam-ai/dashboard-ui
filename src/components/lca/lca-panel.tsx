"use client";

import { useState } from "react";
import styles from "./lca-panel.module.scss";

interface LCAMetrics {
  linguisticComplexity: number;
  conversationFlow: number;
  sentimentScore: number;
  topicCoherence: number;
  languageDiversity: number;
  responseTime: number;
}

interface LCAPanelProps {
  conversationId: string;
  onClose: () => void;
}

/**
 * LCA (Linguistic & Conversation Flow Analysis) Panel component.
 * Displays detailed linguistic and conversation flow analysis for a conversation.
 * @param props - Component props
 * @param props.conversationId - ID of the conversation to analyze
 * @param props.onClose - Function to close the panel
 * @returns The LCA Panel component
 */
export function LCAPanel({ conversationId, onClose }: LCAPanelProps) {
  const [activeTab, setActiveTab] = useState<
    "linguistic" | "flow" | "sentiment"
  >("linguistic");

  // Mock LCA data
  const lcaMetrics: LCAMetrics = {
    linguisticComplexity: 78,
    conversationFlow: 85,
    sentimentScore: 72,
    topicCoherence: 90,
    languageDiversity: 65,
    responseTime: 2.3,
  };

  const linguisticAnalysis = {
    vocabularyRichness: 7.2,
    sentenceComplexity: 6.8,
    grammaticalAccuracy: 94,
    wordFrequency: {
      customer: 12,
      service: 8,
      help: 6,
      issue: 5,
      problem: 4,
    },
    languagePatterns: [
      "Polite greetings used consistently",
      "Technical terms explained clearly",
      "Active listening demonstrated",
      "Empathy expressed appropriately",
    ],
  };

  const flowAnalysis = {
    turnTaking: 88,
    topicTransitions: 82,
    conversationStructure: 91,
    interruptionHandling: 76,
    flowMetrics: [
      { label: "Natural Flow", value: 85, status: "good" },
      { label: "Topic Coherence", value: 90, status: "excellent" },
      { label: "Response Relevance", value: 78, status: "good" },
      { label: "Conversation Pacing", value: 82, status: "good" },
    ],
  };

  const sentimentAnalysis = {
    overallSentiment: "positive",
    sentimentTrend: [
      { time: "0:00", sentiment: 0.2 },
      { time: "2:30", sentiment: 0.4 },
      { time: "5:00", sentiment: 0.6 },
      { time: "7:30", sentiment: 0.8 },
      { time: "10:00", sentiment: 0.7 },
    ],
    emotionalMarkers: [
      "Frustration detected at 2:15",
      "Relief expressed at 5:30",
      "Satisfaction confirmed at 8:45",
    ],
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 className={styles.title}>LCA Analysis</h2>
          <p className={styles.subtitle}>Conversation ID: {conversationId}</p>
          <button className={styles.closeButton} onClick={onClose}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "linguistic" ? styles.active : ""}`}
            onClick={() => setActiveTab("linguistic")}
          >
            Linguistic Analysis
          </button>
          <button
            className={`${styles.tab} ${activeTab === "flow" ? styles.active : ""}`}
            onClick={() => setActiveTab("flow")}
          >
            Conversation Flow
          </button>
          <button
            className={`${styles.tab} ${activeTab === "sentiment" ? styles.active : ""}`}
            onClick={() => setActiveTab("sentiment")}
          >
            Sentiment Analysis
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === "linguistic" && (
            <div className={styles.tabContent}>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3>Vocabulary Richness</h3>
                  <div className={styles.metricValue}>
                    {linguisticAnalysis.vocabularyRichness}
                  </div>
                  <div className={styles.metricLabel}>out of 10</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Sentence Complexity</h3>
                  <div className={styles.metricValue}>
                    {linguisticAnalysis.sentenceComplexity}
                  </div>
                  <div className={styles.metricLabel}>out of 10</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Grammatical Accuracy</h3>
                  <div className={styles.metricValue}>
                    {linguisticAnalysis.grammaticalAccuracy}%
                  </div>
                  <div className={styles.metricLabel}>accuracy</div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Word Frequency Analysis</h3>
                <div className={styles.wordCloud}>
                  {Object.entries(linguisticAnalysis.wordFrequency).map(
                    ([word, count]) => (
                      <span
                        key={word}
                        className={styles.word}
                        style={{ fontSize: `${count * 2}px` }}
                      >
                        {word} ({count})
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Language Patterns</h3>
                <ul className={styles.patternsList}>
                  {linguisticAnalysis.languagePatterns.map((pattern, index) => (
                    <li key={index} className={styles.pattern}>
                      <span className={styles.checkmark}>✓</span>
                      {pattern}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "flow" && (
            <div className={styles.tabContent}>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3>Turn Taking</h3>
                  <div className={styles.metricValue}>
                    {flowAnalysis.turnTaking}%
                  </div>
                  <div className={styles.metricLabel}>efficiency</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Topic Transitions</h3>
                  <div className={styles.metricValue}>
                    {flowAnalysis.topicTransitions}%
                  </div>
                  <div className={styles.metricLabel}>smoothness</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Conversation Structure</h3>
                  <div className={styles.metricValue}>
                    {flowAnalysis.conversationStructure}%
                  </div>
                  <div className={styles.metricLabel}>clarity</div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Flow Metrics</h3>
                <div className={styles.flowMetrics}>
                  {flowAnalysis.flowMetrics.map((metric, index) => (
                    <div key={index} className={styles.flowMetric}>
                      <div className={styles.flowMetricHeader}>
                        <span className={styles.flowMetricLabel}>
                          {metric.label}
                        </span>
                        <span
                          className={`${styles.flowMetricStatus} ${styles[metric.status]}`}
                        >
                          {metric.status}
                        </span>
                      </div>
                      <div className={styles.flowMetricBar}>
                        <div
                          className={styles.flowMetricFill}
                          style={{ width: `${metric.value}%` }}
                        />
                      </div>
                      <div className={styles.flowMetricValue}>
                        {metric.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "sentiment" && (
            <div className={styles.tabContent}>
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <h3>Overall Sentiment</h3>
                  <div
                    className={`${styles.metricValue} ${styles[sentimentAnalysis.overallSentiment]}`}
                  >
                    {sentimentAnalysis.overallSentiment}
                  </div>
                  <div className={styles.metricLabel}>tone</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Sentiment Score</h3>
                  <div className={styles.metricValue}>
                    {lcaMetrics.sentimentScore}
                  </div>
                  <div className={styles.metricLabel}>out of 100</div>
                </div>
                <div className={styles.metricCard}>
                  <h3>Emotional Stability</h3>
                  <div className={styles.metricValue}>82%</div>
                  <div className={styles.metricLabel}>consistency</div>
                </div>
              </div>

              <div className={styles.section}>
                <h3>Sentiment Trend</h3>
                <div className={styles.sentimentChart}>
                  {sentimentAnalysis.sentimentTrend.map((point, index) => (
                    <div key={index} className={styles.sentimentPoint}>
                      <div
                        className={styles.sentimentBar}
                        style={{ height: `${point.sentiment * 100}%` }}
                      />
                      <span className={styles.sentimentTime}>{point.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Emotional Markers</h3>
                <ul className={styles.emotionalMarkers}>
                  {sentimentAnalysis.emotionalMarkers.map((marker, index) => (
                    <li key={index} className={styles.emotionalMarker}>
                      <span className={styles.emotionalIcon}>🎯</span>
                      {marker}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
