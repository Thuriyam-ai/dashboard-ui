"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ConversationOverview } from "@/components/analytics/conversation-overview";
import { ConversationDetailView } from "@/components/analytics/conversation-detail-view";

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

/**
 * Analytics page component displaying conversation analysis and performance insights.
 * @returns The AnalyticsPage component
 */
export default function AnalyticsPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  // Mock conversation data with Indian names
  const conversations: Conversation[] = [
    {
      id: "1",
      agentName: "Priya Sharma",
      customerName: "Rajesh Kumar",
      duration: "8:45",
      date: "2024-01-15",
      status: "completed",
      qualityScore: 87,
      fillerWords: 12,
      interruptions: 3,
      talkToListenRatio: 0.65,
    },
    {
      id: "2",
      agentName: "Arjun Patel",
      customerName: "Sneha Singh",
      duration: "12:30",
      date: "2024-01-15",
      status: "completed",
      qualityScore: 92,
      fillerWords: 8,
      interruptions: 1,
      talkToListenRatio: 0.58,
    },
    {
      id: "3",
      agentName: "Kavya Reddy",
      customerName: "Vikram Joshi",
      duration: "6:20",
      date: "2024-01-14",
      status: "completed",
      qualityScore: 78,
      fillerWords: 15,
      interruptions: 5,
      talkToListenRatio: 0.72,
    },
    {
      id: "4",
      agentName: "Priya Sharma",
      customerName: "Anita Gupta",
      duration: "15:10",
      date: "2024-01-14",
      status: "completed",
      qualityScore: 95,
      fillerWords: 5,
      interruptions: 0,
      talkToListenRatio: 0.52,
    },
    {
      id: "5",
      agentName: "Arjun Patel",
      customerName: "Deepak Verma",
      duration: "4:35",
      date: "2024-01-13",
      status: "failed",
      qualityScore: 45,
      fillerWords: 25,
      interruptions: 8,
      talkToListenRatio: 0.85,
    },
  ];

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBackToOverview = () => {
    setSelectedConversation(null);
  };

  return (
    <div className={styles.container}>
      <Sidebar activeItem="analytics-overview" />
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={styles.urlBar}>
            <span className={styles.url}>analytics-admin.localhost:3000</span>
          </div>
          <div className={styles.topBarActions}>
            <button className={styles.bookmarkButton} aria-label="Bookmark">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>
            <button className={styles.userButton} aria-label="User Profile">
              <span className={styles.userInitial}>W</span>
              <span className={styles.userText}>Work</span>
            </button>
            <button className={styles.menuButton} aria-label="Menu">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
            <button className={styles.logoutButton}>
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Analytics Content */}
        <div className={styles.analyticsContent}>
          {!selectedConversation ? (
            <>
              {/* Header */}
              <div className={styles.header}>
                <h1 className={styles.title}>Analytics Dashboard</h1>
                <p className={styles.subtitle}>
                  Conversation analysis and performance insights
                </p>
              </div>

              {/* Conversation Overview */}
              <ConversationOverview
                conversations={conversations}
                onConversationSelect={handleConversationSelect}
              />
            </>
          ) : (
            <ConversationDetailView
              conversation={selectedConversation}
              onBack={handleBackToOverview}
            />
          )}
        </div>
      </div>
    </div>
  );
}
