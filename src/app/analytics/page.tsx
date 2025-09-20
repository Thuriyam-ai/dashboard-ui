"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ConversationOverview } from "@/components/analytics/conversation-overview";
import { ConversationDetailView } from "@/components/analytics/conversation-detail-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import MuiAnalyticsPage from "./mui-page";

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
  // Use MUI version for now - can switch back to original if needed
  return <MuiAnalyticsPage />;
}
