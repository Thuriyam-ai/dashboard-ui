"use client";

import { useState } from "react";
// import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
// import {
//   InteractiveTranscriptPlayer,
//   SpeakerTimeline,
//   KeyMetricsPanel,
//   ConversationTimelineBar,
//   TalkRatioGauge,
//   EventCallouts,
//   SpeechDynamicsPanel,
// } from "@/components/conversation-view";
// import { MuiLCAPanel } from "@/components/lca";
// import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Chat,
  Star,
} from "@mui/icons-material";

/**
 * Analytics Conversation View page component.
 * Displays conversation analysis within the analytics section.
 * @returns The AnalyticsConversationViewPage component
 */
export default function AnalyticsConversationViewPage() {
  const [activeTab, setActiveTab] = useState<"conversation" | "lca">(
    "conversation",
  );
  const [showLCAPanel, setShowLCAPanel] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: "conversation" | "lca") => {
    setActiveTab(newValue);
    if (newValue === "lca") {
      setShowLCAPanel(true);
    }
  };

  const handleCloseLCAPanel = () => {
    setShowLCAPanel(false);
    setActiveTab("conversation");
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
                analytics-conversation.localhost:3000
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
          <Breadcrumbs />
          
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Analytics Conversation View
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Detailed conversation analysis within the analytics dashboard
            </Typography>
          </Box>

          {/* Tab Navigation */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 48,
                },
              }}
            >
              <Tab
                icon={<Chat />}
                iconPosition="start"
                label="Conversation Analysis"
                value="conversation"
                sx={{ mr: 2 }}
              />
              <Tab
                icon={<Star />}
                iconPosition="start"
                label="LCA Analysis"
                value="lca"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {activeTab === "conversation" && (
            <Box>
              {/* FR-DV-4.1: Conversation Timeline Bar */}
              <ConversationTimelineBar
                totalDuration={320}
                segments={[]}
                onSegmentClick={(segment) => {
                  console.log("Timeline segment clicked:", segment);
                }}
              />

              {/* Main Content Grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 3,
                mt: 3
              }}>
                {/* Left Column - Transcript and Analysis */}
                <Box>
                  <InteractiveTranscriptPlayer />
                  <SpeakerTimeline />

                  {/* FR-DV-4.3: Event Callouts */}
                  <EventCallouts
                    events={[]}
                    onEventClick={(event) => {
                      console.log("Event clicked:", event);
                    }}
                  />
                </Box>

                {/* Right Column - Metrics and Analysis */}
                <Box>
                  <KeyMetricsPanel />

                  {/* FR-DV-4.2: Talk Ratio Gauge */}
                  <TalkRatioGauge agentPercentage={65} customerPercentage={35} />

                  {/* FR-DV-4.4: Speech Dynamics Panel */}
                  <SpeechDynamicsPanel />
                </Box>
              </Box>
            </Box>
          )}

          {activeTab === "lca" && (
            <Card sx={{ mt: 3 }}>
              <CardContent sx={{ textAlign: 'center', py: 6 }}>
                <Box sx={{ mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.main',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Star sx={{ fontSize: 32 }} />
                  </Avatar>
                </Box>
                <Typography variant="h5" component="h3" fontWeight={600} gutterBottom>
                  LCA Analysis
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                  Click the button below to open the detailed Linguistic &
                  Conversation Flow Analysis panel
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Star />}
                  onClick={() => setShowLCAPanel(true)}
                >
                  Open LCA Panel
                </Button>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>

      {/* LCA Panel Modal */}
      {showLCAPanel && (
        <MuiLCAPanel
          conversationId="ANALYTICS-CONV-001"
          onClose={handleCloseLCAPanel}
        />
      )}
    </Box>
  );
}