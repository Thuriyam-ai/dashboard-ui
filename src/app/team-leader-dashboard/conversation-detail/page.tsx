"use client";

import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { ConversationDetails } from "../../test-page/test";

export default function ConversationDetailPage() {
  const router = useRouter();
  
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
    router.push("/team-leader-dashboard/conversations");
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TeamLeaderSidebar activeItem="conversations" />
      <Box sx={{ flexGrow: 1, marginLeft: '280px' }}>
        <ConversationDetails 
          conversation={mockConversation} 
          onBack={handleBack}
        />
      </Box>
    </Box>
  );
}