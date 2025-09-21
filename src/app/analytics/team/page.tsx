"use client";

import { useState } from "react";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { TeamFilters } from "@/components/team-dashboard/team-filters";
import { Leaderboards } from "@/components/team-dashboard/leaderboards";
import { TrendAnalysis } from "@/components/team-dashboard/trend-analysis";
import { TeamMetrics } from "@/components/team-dashboard/team-metrics";
import { LCAPanel } from "@/components/lca";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
  Group,
  Star,
} from "@mui/icons-material";

/**
 * Team Analytics page component displaying team metrics and performance data.
 * This is the analytics/team route that shows team-level analysis.
 * @returns The TeamAnalyticsPage component
 */
export default function TeamAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"team" | "lca">("team");
  const [showLCAPanel, setShowLCAPanel] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: "team" | "lca") => {
    setActiveTab(newValue);
    if (newValue === "lca") {
      setShowLCAPanel(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <MuiSidebar activeItem="team-dashboard" />

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
                analytics-team.localhost:3000
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
              Team Analytics
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Team & Campaign Analytics with Leaderboards and Trend Analysis
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
                icon={<Group />}
                iconPosition="start"
                label="Team Analytics"
                value="team"
                sx={{ mr: 2 }}
              />
              <Tab
                icon={<Star />}
                iconPosition="start"
                label="Team LCA Analysis"
                value="lca"
              />
            </Tabs>
          </Box>

          {/* Tab Content */}
          {activeTab === "team" && (
            <Box>
              {/* Filters */}
              <TeamFilters />

              {/* Team Metrics Overview */}
              <TeamMetrics />

              {/* Main Content Grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
                gap: 3,
                mt: 3
              }}>
                {/* Left Column - Leaderboards */}
                <Box>
                  <Leaderboards />
                </Box>

                {/* Right Column - Trend Analysis */}
                <Box>
                  <TrendAnalysis />
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
                  Team LCA Analysis
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                  Click the button below to open the detailed Team-level
                  Linguistic & Conversation Flow Analysis panel
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Star />}
                  onClick={() => setShowLCAPanel(true)}
                >
                  Open Team LCA Panel
                </Button>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>

      {/* LCA Panel Modal */}
      {showLCAPanel && (
        <LCAPanel
          conversationId="TEAM-ANALYTICS-001"
          onClose={() => setShowLCAPanel(false)}
        />
      )}
    </Box>
  );
}
