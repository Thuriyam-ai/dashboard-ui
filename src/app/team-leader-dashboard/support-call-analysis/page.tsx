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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  Support,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function SupportCallAnalysisPage() {
  // Mock support analysis data
  const supportMetrics = [
    {
      name: "First Call Resolution Rate",
      value: "78%",
      target: "85%",
      trend: "up",
      change: "+5%",
    },
    {
      name: "Average Resolution Time",
      value: "4.2 hours",
      target: "3.0 hours",
      trend: "down",
      change: "-0.8 hours",
    },
    {
      name: "Customer Satisfaction",
      value: "4.3/5",
      target: "4.5/5",
      trend: "up",
      change: "+0.2",
    },
    {
      name: "Escalation Rate",
      value: "12%",
      target: "8%",
      trend: "down",
      change: "-2%",
    },
  ];

  const topIssues = [
    { issue: "Account Access Problems", count: 45, percentage: 23 },
    { issue: "Billing Inquiries", count: 38, percentage: 19 },
    { issue: "Technical Support", count: 32, percentage: 16 },
    { issue: "Feature Requests", count: 28, percentage: 14 },
    { issue: "General Questions", count: 25, percentage: 13 },
    { issue: "Other", count: 30, percentage: 15 },
  ];

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "success" : "error";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp /> : <TrendingDown />;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="support-call-analysis" />
      
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
                team-leader-dashboard/support-call-analysis.localhost:3000
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
              <Support fontSize="small" />
              Support Call Analysis
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Support Call Analysis
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive analysis of support team performance and customer issues
            </Typography>
          </Box>

          {/* Support Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {supportMetrics.map((metric, index) => (
              <Grid xs={12} md={6} lg={3} key={index}>
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
                        icon={getTrendIcon(metric.trend)}
                        label={metric.change}
                        color={getTrendColor(metric.trend) as any}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.trend === "up" ? 85 : 65}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.trend === "up" ? 'success.main' : 'warning.main',
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Top Issues Analysis */}
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Top Support Issues
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Issue Type</TableCell>
                          <TableCell align="right">Count</TableCell>
                          <TableCell align="right">%</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topIssues.map((issue, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="body2">
                                {issue.issue}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {issue.count}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {issue.percentage}%
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Insights
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    The support team is showing positive trends in customer satisfaction and 
                    resolution rates. Focus areas for improvement include reducing escalation rates 
                    and optimizing first call resolution times.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Account access problems remain the top issue type, suggesting potential 
                    improvements in user onboarding and documentation.
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
