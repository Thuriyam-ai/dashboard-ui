"use client";

import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
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
  Avatar 
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
} from "@mui/icons-material";

/**
 * Dashboard page component.
 * Displays the main admin dashboard with overview, metrics, deployments, and system health.
 * @returns The Dashboard page layout
 */
export default function DashboardPage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <MuiSidebar activeItem="dashboard" />
      
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
                dashboard-admin.localhost:3000
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

        {/* Dashboard Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs />
          
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monitor your bot deployments and system health
            </Typography>
          </Box>

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
        </Container>
      </Box>
    </Box>
  );
}
