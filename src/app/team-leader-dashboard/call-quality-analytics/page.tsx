"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
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
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Error,
  Assessment,
  Phone,
  Person,
  Schedule,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

/**
 * Call Quality Analytics page component displaying comprehensive call quality metrics
 * and performance data based on WorkIndia's call quality parameters.
 * @returns The CallQualityAnalyticsPage component
 */
export default function CallQualityAnalyticsPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const handleViewChange = (newView: string) => {
    setAnchorEl(null);
    
    // Navigate to the appropriate page based on view selection
    if (newView === "generic") {
      router.push('/dashboard');
    } else if (newView === "team-lead") {
      router.push('/team-dashboard/overview');
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mock data for call quality metrics
  const callQualityData = [
    {
      id: 1,
      parameter: "Call Opening / Adherence to Opening Script",
      score: 5,
      type: "Non-Fatal",
      currentScore: 4.2,
      adherence: 84,
      description: "Greet employer, introduce with name, mention WorkIndia, state feedback call purpose"
    },
    {
      id: 2,
      parameter: "Effective Questioning and Probing",
      score: 35,
      type: "Fatal",
      currentScore: 28.5,
      adherence: 81,
      description: "Agent must ask all 5 mandatory questions clearly and appropriately"
    },
    {
      id: 3,
      parameter: "Interruptions (if any)",
      score: 5,
      type: "Non-Fatal",
      currentScore: 4.8,
      adherence: 96,
      description: "Agent should not interrupt employer unless absolutely necessary"
    },
    {
      id: 4,
      parameter: "Unnecessary or Off-topic Conversation",
      score: 5,
      type: "Non-Fatal",
      currentScore: 4.6,
      adherence: 92,
      description: "Avoid irrelevant, personal, or casual talk not related to feedback objective"
    },
    {
      id: 5,
      parameter: "Incomplete Notes",
      score: 20,
      type: "Fatal",
      currentScore: 18.2,
      adherence: 91,
      description: "Fails to capture, records incorrectly, or leaves field blank"
    },
    {
      id: 6,
      parameter: "Correct Disposition Selection",
      score: 10,
      type: "Fatal",
      currentScore: 9.1,
      adherence: 91,
      description: "Final disposition must match employer's actual response"
    },
    {
      id: 7,
      parameter: "Proper Call Flow / Sequence Followed",
      score: 10,
      type: "Non-Fatal",
      currentScore: 9.3,
      adherence: 93,
      description: "Introduction → Feedback Questions → Call Closing"
    },
    {
      id: 8,
      parameter: "No False or Misleading Promises Made",
      score: 5,
      type: "Non-Fatal",
      currentScore: 4.9,
      adherence: 98,
      description: "Avoid misleading or over-promising statements"
    },
    {
      id: 9,
      parameter: "Proper Call Disconnection / Call Closing",
      score: 5,
      type: "Non-Fatal",
      currentScore: 4.7,
      adherence: 94,
      description: "Agent must politely thank employer and clearly close the call"
    }
  ];

  const agentPerformance = [
    { name: "Priya Sharma", totalScore: 87.2, fatalErrors: 0, nonFatalErrors: 2, calls: 45 },
    { name: "Arjun Patel", totalScore: 82.1, fatalErrors: 1, nonFatalErrors: 3, calls: 38 },
    { name: "Kavya Reddy", totalScore: 94.5, fatalErrors: 0, nonFatalErrors: 1, calls: 52 },
    { name: "Rajesh Kumar", totalScore: 76.8, fatalErrors: 2, nonFatalErrors: 4, calls: 41 },
    { name: "Sneha Singh", totalScore: 89.3, fatalErrors: 0, nonFatalErrors: 2, calls: 36 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 80) return "warning";
    return "error";
  };

  const getTypeColor = (type: string) => {
    return type === "Fatal" ? "error" : "warning";
  };

  const getTrendIcon = (score: number) => {
    return score >= 85 ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="call-quality" />

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
                call-quality-analytics.localhost:3000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                onClick={logout}
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
              Call Quality Analytics
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive call quality metrics and performance analysis based on WorkIndia standards
            </Typography>
          </Box>

          {/* Scoring Rules Alert */}
          <Alert severity="info" sx={{ mb: 4 }}>
            <AlertTitle>Scoring Rules</AlertTitle>
            <Typography variant="body2">
              <strong>Fatal Errors:</strong> Single fatal error = 30% score reduction, Multiple fatal errors = 75% score reduction<br/>
              <strong>Non-Fatal Errors:</strong> Single non-fatal error = 10% score reduction, Multiple non-fatal errors = 20% score reduction
            </Typography>
          </Alert>

          {/* Key Metrics Cards */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 3, 
            mb: 4 
          }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Overall Score
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      87.2%
                    </Typography>
                  </Box>
                  <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Calls
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      212
                    </Typography>
                  </Box>
                  <Phone sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Fatal Errors
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="error.main">
                      3
                    </Typography>
                  </Box>
                  <Error sx={{ fontSize: 40, color: 'error.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Avg Call Duration
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="info.main">
                      8:45
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Call Quality Parameters Table */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Call Quality Parameters Analysis
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Parameter</strong></TableCell>
                      <TableCell align="center"><strong>Max Score</strong></TableCell>
                      <TableCell align="center"><strong>Type</strong></TableCell>
                      <TableCell align="center"><strong>Current Score</strong></TableCell>
                      <TableCell align="center"><strong>Adherence %</strong></TableCell>
                      <TableCell align="center"><strong>Trend</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {callQualityData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {item.parameter}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" fontWeight={600}>
                            {item.score}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={item.type} 
                            color={getTypeColor(item.type)}
                            size="small"
                            icon={item.type === "Fatal" ? <Warning /> : <CheckCircle />}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            fontWeight={600}
                            color={`${getScoreColor(item.currentScore)}.main`}
                          >
                            {item.currentScore.toFixed(1)}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={item.adherence} 
                              sx={{ width: 60, height: 8, borderRadius: 4 }}
                              color={getScoreColor(item.adherence)}
                            />
                            <Typography variant="body2" fontWeight={600}>
                              {item.adherence}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {getTrendIcon(item.adherence)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Agent Performance Table */}
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Agent Performance Summary
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Agent Name</strong></TableCell>
                      <TableCell align="center"><strong>Total Score</strong></TableCell>
                      <TableCell align="center"><strong>Fatal Errors</strong></TableCell>
                      <TableCell align="center"><strong>Non-Fatal Errors</strong></TableCell>
                      <TableCell align="center"><strong>Total Calls</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {agentPerformance.map((agent, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
                            <Typography variant="body2" fontWeight={600}>
                              {agent.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            fontWeight={600}
                            color={`${getScoreColor(agent.totalScore)}.main`}
                          >
                            {agent.totalScore}%
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            fontWeight={600}
                            color={agent.fatalErrors > 0 ? "error.main" : "success.main"}
                          >
                            {agent.fatalErrors}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography 
                            variant="body2" 
                            fontWeight={600}
                            color={agent.nonFatalErrors > 2 ? "warning.main" : "success.main"}
                          >
                            {agent.nonFatalErrors}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" fontWeight={600}>
                            {agent.calls}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip 
                            label={agent.fatalErrors === 0 ? "Excellent" : agent.fatalErrors === 1 ? "Good" : "Needs Improvement"}
                            color={agent.fatalErrors === 0 ? "success" : agent.fatalErrors === 1 ? "warning" : "error"}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
