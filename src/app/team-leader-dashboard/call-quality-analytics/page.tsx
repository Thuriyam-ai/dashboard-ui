"use client";

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
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  Phone,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function CallQualityAnalyticsPage() {
  // Mock call quality data
  const qualityMetrics = [
    {
      name: "Average Call Duration",
      value: "8.5 minutes",
      target: "7.0 minutes",
      status: "above-target",
      trend: "+12%",
    },
    {
      name: "First Call Resolution",
      value: "78%",
      target: "85%",
      status: "below-target",
      trend: "-3%",
    },
    {
      name: "Customer Satisfaction",
      value: "4.2/5",
      target: "4.5/5",
      status: "below-target",
      trend: "-0.1",
    },
    {
      name: "Agent Talk Time",
      value: "65%",
      target: "60%",
      status: "above-target",
      trend: "+5%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "above-target":
        return "success";
      case "below-target":
        return "warning";
      case "on-target":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="call-quality-analytics" />
      
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
                team-leader-dashboard/call-quality-analytics.localhost:3000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
              href="/team-leader-dashboard"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home fontSize="small" />
              Team Leader Dashboard
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Phone fontSize="small" />
              Call Quality Analytics
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Call Quality Analytics
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monitor and analyze call quality metrics and performance indicators
            </Typography>
          </Box>

          {/* Quality Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {qualityMetrics.map((metric, index) => (
              <Grid key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {metric.name}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Target: {metric.target}
                      </Typography>
                      <Chip
                        label={metric.trend}
                        color={getStatusColor(metric.status) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.status === 'above-target' ? 100 : 75}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.status === 'above-target' ? 'success.main' : 'warning.main',
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Additional Analytics Content */}
          <Grid container spacing={3}>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Call Quality Trends
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Detailed analysis of call quality trends over time, including agent performance,
                    customer feedback, and resolution rates.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Agent Performance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Individual agent performance metrics, training recommendations,
                    and quality improvement suggestions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
