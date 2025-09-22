"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { TeamFilters } from "@/components/team-dashboard/team-filters";
import { Leaderboards } from "@/components/team-dashboard/leaderboards";
import { TrendAnalysis } from "@/components/team-dashboard/trend-analysis";
import { TeamMetrics } from "@/components/team-dashboard/team-metrics";
import { MuiLCAPanel } from "@/components/lca";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { DistributionPlots } from "@/components/team-dashboard/distribution-plots";
import { CoachingLeaderboards } from "@/components/team-dashboard/coaching-leaderboards";
import { RadarChart } from "@/components/team-dashboard/radar-chart";
import { ErrorBoundary } from "@/components/error-boundary";
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
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Group,
  Star,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
} from "@mui/icons-material";

/**
 * Team dashboard page component displaying team metrics and performance data.
 * Includes LCA (Linguistic & Conversation Flow Analysis) tab for team-level analysis.
 * @returns The TeamDashboardPage component
 */
export default function TeamDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"team" | "lca">("team");
  const [showLCAPanel, setShowLCAPanel] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: "team" | "lca") => {
    setActiveTab(newValue);
    if (newValue === "lca") {
      setShowLCAPanel(true);
    }
  };

  const handleViewChange = (newView: string) => {
    setAnchorEl(null);
    
    // Navigate to the appropriate page based on view selection with correct base path
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    if (newView === "generic") {
      router.push(`${basePath}/dashboard`);
    } else if (newView === "team-lead") {
      router.push(`${basePath}/team-dashboard/overview`);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
                team-dashboard.localhost:3000
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* View Type Dropdown */}
              <Chip
                icon={<SupervisorAccount />}
                label="Team Lead view"
                color="secondary"
                onClick={handleMenuClick}
                deleteIcon={<KeyboardArrowDown />}
                onDelete={handleMenuClick}
                variant="outlined"
                sx={{ 
                  fontWeight: 600,
                  '& .MuiChip-deleteIcon': {
                    color: 'inherit',
                  },
                }}
              />

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem 
                  onClick={() => handleViewChange("generic")}
                >
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem 
                  onClick={() => handleViewChange("team-lead")}
                  selected={true}
                >
                  <SupervisorAccount sx={{ mr: 1 }} />
                  Team Lead view
                </MenuItem>
              </Menu>

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
        <Container maxWidth="xl" sx={{ 
          flexGrow: 1, 
          py: 3,
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Team Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive team performance metrics and analytics
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
            <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
              {/* Filters */}
              <Box sx={{ mb: 3 }}>
                <ErrorBoundary>
                  <TeamFilters />
                </ErrorBoundary>
              </Box>

              {/* Team Metrics Overview */}
              <Box sx={{ mb: 3 }}>
                <ErrorBoundary>
                  <TeamMetrics />
                </ErrorBoundary>
              </Box>

              {/* Main Content - Stacked Layout */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                mt: 3,
                maxWidth: '100%',
                overflow: 'hidden'
              }}>
                {/* Agent Leaderboards */}
                <ErrorBoundary>
                  <Leaderboards />
                </ErrorBoundary>

                {/* Trend Analysis */}
                <ErrorBoundary>
                  <TrendAnalysis />
                </ErrorBoundary>

                {/* Distribution Plots */}
                <ErrorBoundary>
                  <DistributionPlots />
                </ErrorBoundary>

                {/* Coaching Leaderboards */}
                <ErrorBoundary>
                  <CoachingLeaderboards />
                </ErrorBoundary>

                {/* Radar Chart */}
                <ErrorBoundary>
                  <RadarChart />
                </ErrorBoundary>
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
        <MuiLCAPanel
          conversationId="TEAM-DASHBOARD-001"
          onClose={() => setShowLCAPanel(false)}
        />
      )}
    </Box>
  );
}