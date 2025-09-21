"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Work,
  KeyboardArrowDown,
  SupervisorAccount,
  Dashboard,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard";
import { TeamMetricsCards } from "@/components/team-leader-dashboard";
import { TeamPerformanceChart } from "@/components/team-leader-dashboard";
import { TeamInsightsPanel } from "@/components/team-leader-dashboard";

export default function TeamLeaderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewType, setViewType] = useState<"generic" | "team-lead">("team-lead");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewChange = (type: "generic" | "team-lead") => {
    setViewType(type);
    setAnchorEl(null);
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
    return viewType === "generic" ? "default" : "primary";
  };

  const getViewTypeIcon = () => {
    return viewType === "generic" ? <Dashboard /> : <SupervisorAccount />;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <TeamLeaderSidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <Box component="main" sx={{ flexGrow: 1, ml: sidebarOpen ? 0 : 0 }}>
        <AppBar position="static" sx={{ bgcolor: "white", color: "text.primary", boxShadow: 1 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Link underline="hover" color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Typography color="text.primary">Team Leader Dashboard</Typography>
            </Breadcrumbs>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Work sx={{ color: "#1976d2" }} />
              <Chip
                icon={getViewTypeIcon()}
                label={getViewTypeLabel()}
                onClick={handleMenuClick}
                deleteIcon={<KeyboardArrowDown />}
                onDelete={handleMenuClick}
                color={getViewTypeColor() as "default" | "primary"}
                variant="outlined"
                sx={{ cursor: "pointer" }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleViewChange("generic")}>
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem onClick={() => handleViewChange("team-lead")}>
                  <SupervisorAccount sx={{ mr: 1 }} />
                  Team Lead view
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
              Team Leader Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Comprehensive team performance and analytics overview
            </Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <TeamMetricsCards />
          </Box>

          <Box sx={{ mb: 4 }}>
            <TeamPerformanceChart />
          </Box>

          <Box>
            <TeamInsightsPanel />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}