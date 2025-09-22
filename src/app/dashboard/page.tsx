"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { RecentDeployments } from "@/components/dashboard/recent-deployments";
import { SystemHealth } from "@/components/dashboard/system-health";
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
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  KeyboardArrowDown,
  SupervisorAccount,
  Dashboard,
  Analytics,
  Message,
  Settings,
} from "@mui/icons-material";

/**
 * Dashboard page component.
 * Displays the main admin dashboard with overview, metrics, deployments, and system health.
 * @returns The Dashboard page layout
 */
export default function DashboardPage() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState("generic");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewChange = (newView: string) => {
    setCurrentView(newView);
    setAnchorEl(null);
    
    // Navigate to the appropriate page based on view selection
    if (newView === "team-lead") {
      router.push('/team-dashboard/overview');
    } else if (newView === "generic") {
      router.push('/dashboard');
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getViewTypeLabel = () => {
    return currentView === "generic" ? "Generic view" : "Team Lead view";
  };

  const getViewTypeColor = () => {
    return currentView === "generic" ? "primary" : "secondary";
  };

  const getViewTypeIcon = () => {
    return currentView === "generic" ? <Dashboard /> : <SupervisorAccount />;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {currentView === "generic" ? (
        <MuiSidebar activeItem="dashboard" />
      ) : (
        <TeamLeaderSidebar activeItem="overview" />
      )}
      
      <Box sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginLeft: '280px', // Account for fixed sidebar width
        minHeight: '100vh'
      }}>
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
                dashboard-admin.localhost:3000
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
                  selected={currentView === "generic"}
                >
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem 
                  onClick={() => handleViewChange("team-lead")}
                  selected={currentView === "team-lead"}
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

        {/* Dashboard Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              {currentView === "generic" ? "Dashboard Overview" : "Team Leader Dashboard"}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {currentView === "generic" 
                ? "Monitor your bot deployments and system health"
                : "Comprehensive team performance and analytics overview"
              }
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Current View:
              </Typography>
              <Chip 
                icon={getViewTypeIcon()}
                label={getViewTypeLabel()} 
                color={getViewTypeColor()} 
                size="small" 
                variant="filled"
              />
            </Box>
          </Box>

          {currentView === "generic" ? (
            <>
              {/* Key Metrics Cards */}
              <MetricsCards />

              {/* Bottom Section */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
                gap: 3, 
                mt: 3 
              }}>
                <RecentDeployments />
                <SystemHealth />
              </Box>
            </>
          ) : (
            <>
              {/* Team Leader Dashboard Content */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
                  Team Performance Overview
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Monitor team performance, analyze call quality, and manage configurations from your dedicated dashboard.
                </Typography>
              </Box>

              {/* Team Leader Metrics Grid */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, 
                gap: 3, 
                mb: 4 
              }}>
                {/* Active Agents */}
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                    24
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Active Agents
                  </Typography>
                </Box>

                {/* Average Quality Score */}
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                    87%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Avg Quality Score
                  </Typography>
                </Box>

                {/* Total Conversations */}
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                    1,247
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Conversations
                  </Typography>
                </Box>

                {/* Customer Satisfaction */}
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                  textAlign: 'center'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'warning.main', mb: 1 }}>
                    4.8
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Customer Satisfaction
                  </Typography>
                </Box>
              </Box>

              {/* Team Leader Quick Actions */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, 
                gap: 3 
              }}>
                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Quick Actions
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<Analytics />}>
                      View Call Quality Analytics
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Message />}>
                      Review Conversations
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Settings />}>
                      Manage Configurations
                    </Button>
                  </Box>
                </Box>

                <Box sx={{ 
                  p: 3, 
                  borderRadius: 2, 
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider'
                }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Team performance review completed</Typography>
                      <Typography variant="caption" color="text.secondary">2h ago</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">Quality score alert triggered</Typography>
                      <Typography variant="caption" color="text.secondary">4h ago</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">New agent onboarding completed</Typography>
                      <Typography variant="caption" color="text.secondary">1d ago</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
