"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  LinearProgress,
  Chip,
  useTheme,
} from "@mui/material";
import { Analytics } from "@mui/icons-material";

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  progress: number;
  status: "good" | "warning" | "critical";
  statusText: string;
}

export function SystemHealth() {
  const theme = useTheme();
  
  const healthMetrics: HealthMetric[] = [
    {
      id: "api-response-time",
      label: "API Response Time",
      value: "Average: 120ms",
      progress: 85,
      status: "good",
      statusText: "Good",
    },
    {
      id: "bot-availability",
      label: "Bot Availability",
      value: "Last 24 hours",
      progress: 99.8,
      status: "good",
      statusText: "99.8%",
    },
    {
      id: "error-rate",
      label: "Error Rate",
      value: "Within acceptable range",
      progress: 2,
      status: "warning",
      statusText: "0.2%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "success";
      case "warning":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        avatar={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 40,
              height: 40,
              backgroundColor: "primary.main",
              borderRadius: 2,
              color: "white",
            }}
          >
            <Analytics />
          </Box>
        }
        title={
          <Typography variant="h6" component="h2" fontWeight={600}>
            System Health
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {healthMetrics.map((metric) => (
            <Box key={metric.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.primary"
                >
                  {metric.label}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "0.75rem" }}
                >
                  {metric.value}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={metric.progress}
                    color={getStatusColor(metric.status)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                    }}
                  />
                </Box>
                
                <Chip
                  label={metric.statusText}
                  color={getStatusColor(metric.status)}
                  size="small"
                  sx={{
                    minWidth: 60,
                    fontSize: "0.75rem",
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
