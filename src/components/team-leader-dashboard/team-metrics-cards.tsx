"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  LinearProgress,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Phone,
  CheckCircle,
} from "@mui/icons-material";

interface TeamMetricsCardsProps {
  className?: string;
}

export function TeamMetricsCards({ className }: TeamMetricsCardsProps) {
  const teamMetrics = [
    {
      title: "Team Size",
      value: "12",
      subtitle: "Active Agents",
      icon: <People />,
      color: "primary",
      trend: "+2 this month",
      trendColor: "success",
    },
    {
      title: "Avg Performance",
      value: "87%",
      subtitle: "Team Score",
      icon: <TrendingUp />,
      color: "success",
      trend: "+5% from last month",
      trendColor: "success",
    },
    {
      title: "Call Volume",
      value: "1,247",
      subtitle: "Calls Today",
      icon: <Phone />,
      color: "info",
      trend: "+12% from yesterday",
      trendColor: "info",
    },
    {
      title: "Success Rate",
      value: "94%",
      subtitle: "Resolution Rate",
      icon: <CheckCircle />,
      color: "warning",
      trend: "+3% this week",
      trendColor: "success",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {teamMetrics.map((metric, index) => (
        <Grid xs={12} md={6} lg={3} key={index}>
          <Card
            sx={{
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: `${metric.color}.main`,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {metric.icon}
                </Box>
                <Chip
                  label={metric.trend}
                  size="small"
                  color={metric.trendColor as any}
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              </Box>
              
              <Typography variant="h4" fontWeight={700} gutterBottom>
                {metric.value}
              </Typography>
              
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {metric.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {metric.subtitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
