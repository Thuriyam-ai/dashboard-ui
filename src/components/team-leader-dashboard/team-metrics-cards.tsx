"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import {
  People,
  TrendingUp,
  Phone,
  CheckCircle,
} from "@mui/icons-material";

export function TeamMetricsCards() {
  const metrics = [
    {
      title: "Team Size",
      value: "12",
      icon: <People sx={{ fontSize: 40, color: "#1976d2" }} />,
      color: "#1976d2",
    },
    {
      title: "Avg Performance",
      value: "87%",
      icon: <TrendingUp sx={{ fontSize: 40, color: "#4caf50" }} />,
      color: "#4caf50",
    },
    {
      title: "Call Volume",
      value: "1,247",
      icon: <Phone sx={{ fontSize: 40, color: "#ff9800" }} />,
      color: "#ff9800",
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: <CheckCircle sx={{ fontSize: 40, color: "#9c27b0" }} />,
      color: "#9c27b0",
    },
  ];

  return (
    <Grid container spacing={3}>
      {metrics.map((metric, index) => (
        <Grid xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: `2px solid ${metric.color}20`,
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
                transition: "all 0.3s ease",
              },
            }}
          >
            <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
              <Box sx={{ mb: 2 }}>
                {metric.icon}
              </Box>
              <Typography variant="h4" component="h2" sx={{ fontWeight: "bold", mb: 1 }}>
                {metric.value}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {metric.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}