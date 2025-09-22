"use client";

import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Container,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Analytics,
} from "@mui/icons-material";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { MuiConversationOverview } from "@/components/analytics/mui-conversation-overview";

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
 * MUI Analytics page component displaying conversation analysis and performance insights.
 * @returns The MuiAnalyticsPage component
 */
export default function MuiAnalyticsPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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
    // Navigate to the conversation view page with correct basePath
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    window.location.href = `${basePath}/analytics/conversation-view?id=${conversation.id}`;
  };

  const handleBackToOverview = () => {
    setSelectedConversation(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <MuiSidebar activeItem="analytics-overview" />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar 
          position="static" 
          elevation={1}
          sx={{ 
            backgroundColor: 'background.paper',
            color: 'text.primary',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                analytics-admin.localhost:3000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <BookmarkBorder />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                  W
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  Work
                </Typography>
              </Box>
              
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <MoreVert />
              </IconButton>
              
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<Logout />}
                sx={{ ml: 1 }}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
              underline="hover"
              color="inherit"
              href="/dashboard-ui/dashboard"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home fontSize="small" />
              Home
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Analytics fontSize="small" />
              Analytics
            </Typography>
          </Breadcrumbs>

          {!selectedConversation ? (
            <>
              {/* Header */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                  Analytics Dashboard
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Conversation analysis and performance insights
                </Typography>
              </Box>

              {/* Conversation Overview */}
              <MuiConversationOverview
                conversations={conversations}
                onConversationSelect={handleConversationSelect}
              />
            </>
          ) : (
            <Box>
              <Typography variant="h4" gutterBottom>
                Conversation Detail View
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Detailed analysis for conversation {selectedConversation.id}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleBackToOverview}
                sx={{ mb: 3 }}
              >
                Back to Overview
              </Button>
              {/* Add detailed conversation view here */}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
