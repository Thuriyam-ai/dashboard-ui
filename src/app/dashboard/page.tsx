"use client";

import React from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';
import { Analytics, Message, Flag, Campaign } from '@mui/icons-material';
import { Sidebar } from '@/components/dashboard';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    const isGitHubPages = window.location.hostname === 'thuriyam-ai.github.io';
    const basePath = isGitHubPages ? '/dashboard-ui' : '';
    router.push(`${basePath}${path}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar activeItem="dashboard" context="dashboard" />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Quick stats and actions for your AI operations.
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={600} color="primary.main">
                    5
                  </Typography>
                  <Typography color="text.secondary">Total Conversations</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={600} color="success.main">
                    92%
                  </Typography>
                  <Typography color="text.secondary">Success Rate</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={600} color="info.main">
                    3
                  </Typography>
                  <Typography color="text.secondary">Active Agents</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="div" fontWeight={600} color="warning.main">
                    1.2s
                  </Typography>
                  <Typography color="text.secondary">Avg. Response Time</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography variant="h4" component="h2" fontWeight={600} gutterBottom sx={{ mt: 4 }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Analytics />}
                onClick={() => handleNavigation('/analytics')}
              >
                View Analytics
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Message />}
                onClick={() => handleNavigation('/conversations')}
              >
                Manage Conversations
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Flag />}
                onClick={() => handleNavigation('/goals')}
              >
                Set Goals
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<Campaign />}
                onClick={() => handleNavigation('/campaigns')}
              >
                Manage Campaigns
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}