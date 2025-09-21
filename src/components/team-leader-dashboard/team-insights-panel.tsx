"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import {
  TrendingUp,
  Warning,
  CheckCircle,
  Schedule,
  Star,
} from "@mui/icons-material";

export function TeamInsightsPanel() {
  const insights = [
    {
      icon: <TrendingUp sx={{ color: "#4caf50" }} />,
      text: "Team performance increased by 15% this week",
      priority: "high",
    },
    {
      icon: <Warning sx={{ color: "#ff9800" }} />,
      text: "3 agents need coaching on call quality",
      priority: "medium",
    },
    {
      icon: <CheckCircle sx={{ color: "#2196f3" }} />,
      text: "Customer satisfaction score above target",
      priority: "low",
    },
  ];

  const upcomingTasks = [
    {
      icon: <Schedule sx={{ color: "#9c27b0" }} />,
      text: "Weekly team meeting at 2:00 PM",
      time: "Today",
    },
    {
      icon: <Star sx={{ color: "#ff5722" }} />,
      text: "Performance review for Sarah Johnson",
      time: "Tomorrow",
    },
    {
      icon: <CheckCircle sx={{ color: "#4caf50" }} />,
      text: "Monthly goal assessment",
      time: "Friday",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Key Insights
          </Typography>
          <List>
            {insights.map((insight, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40, mr: 2 }}>
                  {insight.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={insight.text}
                  secondary={
                    <Chip 
                      label={insight.priority} 
                      size="small" 
                      color={getPriorityColor(insight.priority) as "error" | "warning" | "info" | "default"}
                      sx={{ mt: 1 }}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ flex: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upcoming Tasks
          </Typography>
          <List>
            {upcomingTasks.map((task, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40, mr: 2 }}>
                  {task.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={task.text}
                  secondary={
                    <Chip 
                      label={task.time} 
                      size="small" 
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}