"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { ConversationOverview } from "@/components/analytics/conversation-overview";
import { ConversationDetailView } from "@/components/analytics/conversation-detail-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
// import MuiAnalyticsPage from "./mui-page";

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
  return (
    <div style={{ padding: '20px' }}>
      <h1>Analytics Page</h1>
      <p>Analytics functionality coming soon...</p>
    </div>
  );
}
