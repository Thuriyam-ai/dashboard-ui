"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  LinearProgress,
} from "@mui/material";
import {
  Chat,
  CheckCircle,
  Star,
  TrendingUp,
  TrendingDown,
  Visibility,
  Schedule,
  Error,
} from "@mui/icons-material";

interface Conversation {
  id: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  status: "completed" | "in-progress" | "failed";
  qualityScore: number;
  fillerWords: number;
  interruptions: number;
  talkToListenRatio: number;
}

interface MuiConversationOverviewProps {
  conversations: Conversation[];
  onConversationSelect: (conversation: Conversation) => void;
}

export function MuiConversationOverview({
  conversations,
  onConversationSelect,
}: MuiConversationOverviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "info";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle />;
      case "in-progress":
        return <Schedule />;
      case "failed":
        return <Error />;
      default:
        return <CheckCircle />;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "error";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const summaryCards = [
    {
      title: "Total Conversations",
      value: conversations.length,
      icon: <Chat />,
      color: "primary" as const,
      progress: 100,
    },
    {
      title: "Completed",
      value: conversations.filter((c) => c.status === "completed").length,
      icon: <CheckCircle />,
      color: "success" as const,
      progress: (conversations.filter((c) => c.status === "completed").length / conversations.length) * 100,
    },
    {
      title: "Avg Quality Score",
      value: Math.round(
        conversations.reduce((sum, c) => sum + c.qualityScore, 0) / conversations.length
      ),
      icon: <Star />,
      color: "warning" as const,
      progress: Math.round(
        conversations.reduce((sum, c) => sum + c.qualityScore, 0) / conversations.length
      ),
    },
    {
      title: "Avg Talk Ratio",
      value: `${Math.round(
        (conversations.reduce((sum, c) => sum + c.talkToListenRatio, 0) / conversations.length) * 100
      )}%`,
      icon: <TrendingUp />,
      color: "info" as const,
      progress: Math.round(
        (conversations.reduce((sum, c) => sum + c.talkToListenRatio, 0) / conversations.length) * 100
      ),
    },
  ];

  return (
    <Box>
      {/* Summary Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 4, flexWrap: 'wrap' }}>
        {summaryCards.map((card, index) => (
          <Box key={index} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
            <Card
              sx={{
                height: '100%',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    sx={{
                      bgcolor: `${card.color}.main`,
                      mr: 2,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" component="div" fontWeight={700}>
                      {card.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={card.progress}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: `${card.color}.main`,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Conversations List */}
      <Card>
        <CardContent>
          <Box mb={3}>
            <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
              Recent Conversations
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click on any conversation to view detailed analysis
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3,
                    backgroundColor: 'action.hover',
                  },
                }}
                onClick={() => onConversationSelect(conversation)}
              >
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box>
                      <Typography variant="h6" component="div" fontWeight={600}>
                        {conversation.agentName} ↔ {conversation.customerName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(conversation.date)} • {conversation.duration}
                      </Typography>
                    </Box>
                    <Chip
                      icon={getStatusIcon(conversation.status)}
                      label={conversation.status}
                      color={getStatusColor(conversation.status)}
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ flex: '1 1 120px', textAlign: 'center', p: 1 }}>
                      <Typography variant="h6" color="primary" fontWeight={600}>
                        {conversation.qualityScore}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Quality Score
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 120px', textAlign: 'center', p: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {conversation.fillerWords}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Filler Words
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 120px', textAlign: 'center', p: 1 }}>
                      <Typography variant="h6" fontWeight={600}>
                        {conversation.interruptions}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Interruptions
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '1 1 120px', textAlign: 'center', p: 1 }}>
                      <Typography variant="h6" color="secondary" fontWeight={600}>
                        {Math.round(conversation.talkToListenRatio * 100)}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Talk Ratio
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Tooltip title="View detailed analysis">
                      <IconButton size="small" color="primary">
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
