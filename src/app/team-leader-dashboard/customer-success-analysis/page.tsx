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
  TrendingUp,
  Star,
  People,
  ThumbUp,
  ThumbDown,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function CustomerSuccessAnalysisPage() {
  // Mock customer success data
  const successMetrics = [
    {
      name: "Net Promoter Score (NPS)",
      value: "67",
      target: "70",
      trend: "up",
      change: "+5",
      description: "Customer loyalty indicator",
    },
    {
      name: "Customer Satisfaction (CSAT)",
      value: "4.2/5",
      target: "4.5/5",
      trend: "up",
      change: "+0.3",
      description: "Overall satisfaction rating",
    },
    {
      name: "Customer Effort Score (CES)",
      value: "2.1/5",
      target: "2.0/5",
      trend: "down",
      change: "+0.1",
      description: "Ease of getting help",
    },
    {
      name: "Retention Rate",
      value: "94%",
      target: "95%",
      trend: "up",
      change: "+2%",
      description: "Customer retention",
    },
  ];

  const customerSegments = [
    {
      segment: "Enterprise",
      customers: 45,
      satisfaction: "4.5/5",
      retention: "96%",
      growth: "+8%",
    },
    {
      segment: "Mid-Market",
      customers: 120,
      satisfaction: "4.2/5",
      retention: "94%",
      growth: "+12%",
    },
    {
      segment: "SMB",
      customers: 280,
      satisfaction: "4.0/5",
      retention: "92%",
      growth: "+15%",
    },
    {
      segment: "Startup",
      customers: 155,
      satisfaction: "4.3/5",
      retention: "89%",
      growth: "+22%",
    },
  ];

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "success" : "error";
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? <TrendingUp /> : <TrendingUp sx={{ transform: 'rotate(180deg)' }} />;
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="customer-success-analysis" />
      
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
                team-leader-dashboard/customer-success-analysis.localhost:3000
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
              <TrendingUp fontSize="small" />
              Customer Success Analysis
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Customer Success Analysis
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive view of customer satisfaction, retention, and success metrics
            </Typography>
          </Box>

          {/* Success Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {successMetrics.map((metric, index) => (
              <Grid xs={12} md={6} lg={3} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Star color="primary" />
                      <Typography variant="h6">
                        {metric.name}
                      </Typography>
                    </Box>
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
                    <Typography variant="caption" color="text.secondary">
                      {metric.description}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={metric.trend === "up" ? 85 : 70}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        mt: 1,
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

          {/* Customer Segments Analysis */}
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer Segments Performance
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Segment</TableCell>
                          <TableCell align="right">Customers</TableCell>
                          <TableCell align="right">Satisfaction</TableCell>
                          <TableCell align="right">Retention</TableCell>
                          <TableCell align="right">Growth</TableCell>
                          <TableCell align="center">Trend</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {customerSegments.map((segment, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {segment.segment}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {segment.customers}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Star color="primary" fontSize="small" />
                                <Typography variant="body2" fontWeight={500}>
                                  {segment.satisfaction}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight={500}>
                                {segment.retention}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Chip
                                label={segment.growth}
                                color="success"
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ThumbUp color="success" />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Success Insights
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Customer success metrics are trending positively across all segments. 
                    Enterprise customers show the highest satisfaction and retention rates.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Startup segment shows the highest growth rate, indicating successful 
                    onboarding and early-stage customer success initiatives.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Focus areas: Improving CES score and maintaining high retention rates 
                    across all segments.
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
