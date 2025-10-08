"use client";

import { ConversationDetails } from "../../test-page/test";

export default function ConversationDetailPage() {
  const mockConversation = {
    id: 1,
    agent: "Testbot",
    customer: "John Doe",
    type: "Call",
    category: "Sales",
    date: "2024-01-15",
    time: "10:30 AM",
    duration: "1:40",
    status: "Completed",
    rating: 5,
    quality: 85,
    talkRatio: 65,
    interruptions: 2,
    summary: "Customer expressed interest in personal loan offer from Creditmann. Loan details sent via SMS to customer's mobile number. Interest rates start from 10.99% per annum for eligible customers. Approval process typically takes 24-48 hours.",
    tags: ["loan", "credit", "personal loan", "SMS"],
    conversationId: "CONV-2024-001",
    owner: "Testbot",
    account: "Creditmann",
    score: 85,
    scoreTrend: "up" as const,
    previousScore: 80
  };

  const handleBack = () => {
    // In a real app, this would navigate back
    console.log("Navigate back to conversations");
  };

  return (
    <ConversationDetails 
      conversation={mockConversation} 
      onBack={handleBack}
    />
  );
}