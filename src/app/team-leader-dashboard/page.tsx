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
  Menu,
  MenuItem,
  Chip,
  Tabs,
  Tab,
  Card,
  CardContent,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  KeyboardArrowDown,
  SupervisorAccount,
  Dashboard,
  Group,
  Star,
} from "@mui/icons-material";
import { 
  TeamLeaderSidebar,
} from "@/components/team-leader-dashboard";
import { TeamFilters } from "@/components/team-dashboard/team-filters";
import { Leaderboards } from "@/components/team-dashboard/leaderboards";
import { TrendAnalysis } from "@/components/team-dashboard/trend-analysis";
import { TeamMetrics } from "@/components/team-dashboard/team-metrics";
import { DistributionPlots } from "@/components/team-dashboard/distribution-plots";
import { MuiLCAPanel } from "@/components/lca";

/**
 * Team Leader Dashboard page component with specialized navigation and analytics.
 * @returns The TeamLeaderDashboardPage component
 */
export default function TeamLeaderDashboardPage() {
  const [viewType, setViewType] = useState("team-lead");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"team" | "lca">("team");
  const [showLCAPanel, setShowLCAPanel] = useState(false);

  const handleViewChange = (newView: string) => {
    setViewType(newView);
    setAnchorEl(null);
    // Navigate to appropriate dashboard based on view
    if (newView === "generic") {
      window.location.href = '/dashboard/';
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getViewTypeLabel = () => {
    return viewType === "generic" ? "Generic view" : "Team Lead view";
  };

  const getViewTypeColor = () => {
    return viewType === "generic" ? "primary" : "secondary";
  };

  const getViewTypeIcon = () => {
    return viewType === "generic" ? <Dashboard /> : <SupervisorAccount />;
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: "team" | "lca") => {
    setActiveTab(newValue);
    if (newValue === "lca") {
      setShowLCAPanel(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="overview" />
      
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
                team-leader-dashboard.localhost:3000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* View Type Dropdown */}
              <Chip
                icon={getViewTypeIcon()}
                label={getViewTypeLabel()}
                color={getViewTypeColor()}
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
                  selected={viewType === "generic"}
                >
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem 
                  onClick={() => handleViewChange("team-lead")}
                  selected={viewType === "team-lead"}
                >
                  <SupervisorAccount sx={{ mr: 1 }} />
                  Team Lead view
                </MenuItem>
              </Menu>
              
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <BookmarkBorder />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
                  TL
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  Team Leader
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
              href="/dashboard"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home fontSize="small" />
              Home
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Leaderboard fontSize="small" />
              Team Leader Dashboard
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Team Leader Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Comprehensive team performance and analytics overview
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current View:
              </Typography>
              <Chip 
                label={getViewTypeLabel()} 
                color={getViewTypeColor()} 
                size="small" 
                variant="filled"
              />
            </Box>
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
            <Box>
              {/* Box Plot Analysis */}
              <DistributionPlots />
              
              {/* LCA Panel Button */}
              <Card sx={{ mt: 3 }}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
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
                    Advanced LCA Analysis
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
                    Click the button below to open the detailed Team-level
                    Linguistic & Conversation Flow Analysis panel with advanced metrics
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Star />}
                    onClick={() => setShowLCAPanel(true)}
                  >
                    Open Advanced LCA Panel
                  </Button>
                </CardContent>
              </Card>
            </Box>
          )}
        </Container>
      </Box>

      {/* LCA Panel Modal */}
      {showLCAPanel && (
        <MuiLCAPanel
          conversationId="TEAM-ANALYTICS-001"
          onClose={() => setShowLCAPanel(false)}
        />
      )}
    </Box>
  );
}
