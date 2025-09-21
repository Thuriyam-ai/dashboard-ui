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
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton as MuiIconButton,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  Settings,
  Flag,
  Add,
  Edit,
  Delete,
  TrendingUp,
  TrendingDown,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function GoalManagementPage() {
  // Mock goal data
  const goals = [
    {
      id: 1,
      name: "Customer Satisfaction Target",
      description: "Achieve 95% customer satisfaction rating",
      target: "95%",
      current: "92%",
      progress: 92,
      status: "on-track",
      deadline: "2024-03-31",
    },
    {
      id: 2,
      name: "Call Resolution Time",
      description: "Reduce average call resolution time",
      target: "5 minutes",
      current: "6.2 minutes",
      progress: 80,
      status: "needs-attention",
      deadline: "2024-02-28",
    },
    {
      id: 3,
      name: "Team Productivity",
      description: "Increase team productivity by 15%",
      target: "115%",
      current: "108%",
      progress: 94,
      status: "on-track",
      deadline: "2024-04-15",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "success";
      case "needs-attention":
        return "warning";
      case "at-risk":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <TrendingUp />;
      case "needs-attention":
        return <TrendingDown />;
      default:
        return <TrendingUp />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="goal-mgmt" />
      
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
                team-leader-dashboard/configuration/goal-mgmt.localhost:3000
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
            <Link
              underline="hover"
              color="inherit"
              href="/team-leader-dashboard/configuration"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Settings fontSize="small" />
              Configuration Mgmt
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Flag fontSize="small" />
              Goal Mgmt
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                Goal Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Set, track, and manage team performance goals
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 'fit-content' }}
            >
              Add New Goal
            </Button>
          </Box>

          {/* Goals Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Goals
                  </Typography>
                  <Typography variant="h3" color="primary" fontWeight={700}>
                    {goals.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    On Track
                  </Typography>
                  <Typography variant="h3" color="success.main" fontWeight={700}>
                    {goals.filter(g => g.status === 'on-track').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Needs Attention
                  </Typography>
                  <Typography variant="h3" color="warning.main" fontWeight={700}>
                    {goals.filter(g => g.status === 'needs-attention').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Goals Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Goals
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Goal Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Target</TableCell>
                      <TableCell>Current</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Deadline</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {goals.map((goal) => (
                      <TableRow key={goal.id}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {goal.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{goal.description}</TableCell>
                        <TableCell>{goal.target}</TableCell>
                        <TableCell>{goal.current}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 100, height: 8, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                              <Box 
                                sx={{ 
                                  width: `${goal.progress}%`, 
                                  height: '100%', 
                                  bgcolor: goal.status === 'on-track' ? 'success.main' : 'warning.main',
                                }} 
                              />
                            </Box>
                            <Typography variant="body2">
                              {goal.progress}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(goal.status)}
                            label={goal.status.replace('-', ' ').toUpperCase()}
                            color={getStatusColor(goal.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{goal.deadline}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <MuiIconButton size="small" color="primary">
                              <Edit />
                            </MuiIconButton>
                            <MuiIconButton size="small" color="error">
                              <Delete />
                            </MuiIconButton>
                          </Box>
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
