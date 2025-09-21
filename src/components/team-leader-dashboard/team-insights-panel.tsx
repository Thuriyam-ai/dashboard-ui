"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Warning,
  CheckCircle,
  Info,
  TrendingUp,
  Schedule,
  Assignment,
} from "@mui/icons-material";

interface TeamInsightsPanelProps {
  className?: string;
}

export function TeamInsightsPanel({ className }: TeamInsightsPanelProps) {
  const insights = [
    {
      type: "warning",
      icon: <Warning />,
      title: "High Call Volume Alert",
      description: "Call volume is 15% above average today. Consider additional support.",
      time: "2 hours ago",
    },
    {
      type: "success",
      icon: <CheckCircle />,
      title: "Goal Achievement",
      description: "Team exceeded monthly customer satisfaction target by 3%.",
      time: "4 hours ago",
    },
    {
      type: "info",
      icon: <Info />,
      title: "Training Opportunity",
      description: "Vikram could benefit from advanced call handling training.",
      time: "1 day ago",
    },
    {
      type: "success",
      icon: <TrendingUp />,
      title: "Performance Improvement",
      description: "Team performance score increased by 5% this week.",
      time: "2 days ago",
    },
  ];

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "warning";
      case "success":
        return "success";
      case "info":
        return "info";
      default:
        return "default";
    }
  };

  const upcomingTasks = [
    { task: "Weekly team review meeting", time: "Tomorrow 10:00 AM", priority: "high" },
    { task: "Performance evaluation - Kavya", time: "Friday 2:00 PM", priority: "medium" },
    { task: "Training session - New agents", time: "Next Monday 9:00 AM", priority: "high" },
    { task: "Monthly report preparation", time: "End of month", priority: "medium" },
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
    <Grid container spacing={3}>
      {/* Insights & Alerts */}
      <Grid xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Info color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Team Insights & Alerts
              </Typography>
            </Box>
            
            <List sx={{ p: 0 }}>
              {insights.map((insight, index) => (
                <Box key={index}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon sx={{ minWidth: 50, mr: 2 }}>
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: `${getInsightColor(insight.type)}.light`,
                          color: `${getInsightColor(insight.type)}.main`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {insight.icon}
                      </Box>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {insight.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {insight.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {insight.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < insights.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Upcoming Tasks */}
      <Grid xs={12} md={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Schedule color="primary" />
              <Typography variant="h6" fontWeight={600}>
                Upcoming Tasks
              </Typography>
            </Box>
            
            <List sx={{ p: 0 }}>
              {upcomingTasks.map((task, index) => (
                <Box key={index}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemIcon sx={{ minWidth: 50, mr: 2 }}>
                      <Assignment color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {task.task}
                            </Typography>
                            <Chip
                              label={task.priority.toUpperCase()}
                              color={getPriorityColor(task.priority) as any}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {task.time}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < upcomingTasks.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
