"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  Person,
} from "@mui/icons-material";

interface TeamPerformanceChartProps {
  className?: string;
}

export function TeamPerformanceChart({ className }: TeamPerformanceChartProps) {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Senior Agent",
      performance: 95,
      callsToday: 23,
      satisfaction: 4.8,
      status: "excellent",
    },
    {
      name: "Arjun Patel",
      role: "Team Lead",
      performance: 92,
      callsToday: 18,
      satisfaction: 4.6,
      status: "excellent",
    },
    {
      name: "Kavya Reddy",
      role: "Agent",
      performance: 87,
      callsToday: 21,
      satisfaction: 4.4,
      status: "good",
    },
    {
      name: "Vikram Joshi",
      role: "Junior Agent",
      performance: 78,
      callsToday: 15,
      satisfaction: 4.2,
      status: "good",
    },
    {
      name: "Anita Gupta",
      role: "Agent",
      performance: 85,
      callsToday: 19,
      satisfaction: 4.5,
      status: "good",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "success";
      case "good":
        return "info";
      case "needs-improvement":
        return "warning";
      default:
        return "default";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return "success.main";
    if (performance >= 80) return "info.main";
    if (performance >= 70) return "warning.main";
    return "error.main";
  };

  return (
    <Grid container spacing={3}>
      {/* Team Performance Overview */}
      <Grid xs={12} md={8}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <TrendingUp color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Team Performance Overview
              </Typography>
            </Box>
            
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team Member</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Performance</TableCell>
                    <TableCell>Calls Today</TableCell>
                    <TableCell>Satisfaction</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teamMembers.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Person fontSize="small" color="action" />
                          <Typography variant="subtitle2" fontWeight={600}>
                            {member.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {member.role}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ width: 60, height: 8, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                            <LinearProgress
                              variant="determinate"
                              value={member.performance}
                              sx={{
                                height: '100%',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getPerformanceColor(member.performance),
                                },
                              }}
                            />
                          </Box>
                          <Typography variant="body2" fontWeight={500}>
                            {member.performance}%
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {member.callsToday}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {member.satisfaction}/5
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={member.status.replace('-', ' ').toUpperCase()}
                          color={getStatusColor(member.status) as any}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>

      {/* Quick Stats */}
      <Grid xs={12} md={4}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Team Quick Stats
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Average Performance
                </Typography>
                <Typography variant="h5" fontWeight={700} color="success.main">
                  87%
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Total Calls Today
                </Typography>
                <Typography variant="h5" fontWeight={700} color="info.main">
                  96
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Avg Satisfaction
                </Typography>
                <Typography variant="h5" fontWeight={700} color="warning.main">
                  4.5/5
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Active Agents
                </Typography>
                <Typography variant="h5" fontWeight={700} color="primary.main">
                  12
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Performance Trends
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2">
                  Team performance up 5% this week
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2">
                  Customer satisfaction improved
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingDown color="warning" fontSize="small" />
                <Typography variant="body2">
                  Call volume increased 12%
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp color="success" fontSize="small" />
                <Typography variant="body2">
                  Resolution rate at 94%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
