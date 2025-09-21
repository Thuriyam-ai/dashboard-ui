"use client";

import { useState } from "react";
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
  Chat,
  PlayArrow,
  Pause,
  Stop,
  ArrowBack,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
} from "@/components/conversation-view";

export default function ConversationsViewPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  
  // Mock conversation data
  const conversations = [
    {
      id: "CONV-001",
      agent: "Priya Sharma",
      customer: "Rajesh Kumar",
      status: "active",
      duration: "5:32",
      startTime: "14:30",
      type: "support",
      priority: "high",
    },
    {
      id: "CONV-002",
      agent: "Arjun Patel",
      customer: "Sneha Singh",
      status: "waiting",
      duration: "0:00",
      startTime: "14:25",
      type: "sales",
      priority: "medium",
    },
    {
      id: "CONV-003",
      agent: "Kavya Reddy",
      customer: "Vikram Joshi",
      status: "completed",
      duration: "8:45",
      startTime: "13:15",
      type: "support",
      priority: "low",
    },
    {
      id: "CONV-004",
      agent: "Priya Sharma",
      customer: "Anita Gupta",
      status: "active",
      duration: "3:20",
      startTime: "14:40",
      type: "billing",
      priority: "high",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "waiting":
        return "warning";
      case "completed":
        return "info";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayArrow />;
      case "waiting":
        return <Pause />;
      case "completed":
        return <Stop />;
      default:
        return <Chat />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const handleViewDetails = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="conversations-view" />
      
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
                team-leader-dashboard/conversations-view.localhost:3000
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
              <Chat fontSize="small" />
              Conversations View
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4 }}>
            {selectedConversation ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handleBackToList}
                  size="small"
                >
                  Back to Conversations
                </Button>
              </Box>
            ) : null}
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              {selectedConversation ? `Conversation ${selectedConversation} Details` : "Conversations View"}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {selectedConversation 
                ? "Detailed analysis and transcript for the selected conversation"
                : "Real-time monitoring of all team conversations and interactions"
              }
            </Typography>
          </Box>

          {selectedConversation ? (
            /* Conversation Details View */
            <Box>
              {/* Main Content Grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                gap: 3,
                mt: 3
              }}>
                {/* Left Column - Transcript and Timeline */}
                <Box>
                  <InteractiveTranscriptPlayer />
                  <Box sx={{ mt: 3 }}>
                    <SpeakerTimeline />
                  </Box>
                </Box>

                {/* Right Column - Key Metrics */}
                <Box>
                  <KeyMetricsPanel />
                </Box>
              </Box>
            </Box>
          ) : (
            /* Conversations List View */
            <Box>
              {/* Summary Cards */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Active Conversations
                      </Typography>
                      <Typography variant="h3" color="success.main" fontWeight={700}>
                        {conversations.filter(c => c.status === 'active').length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Waiting Queue
                      </Typography>
                      <Typography variant="h3" color="warning.main" fontWeight={700}>
                        {conversations.filter(c => c.status === 'waiting').length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Completed Today
                      </Typography>
                      <Typography variant="h3" color="info.main" fontWeight={700}>
                        {conversations.filter(c => c.status === 'completed').length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid xs={12} md={3}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        High Priority
                      </Typography>
                      <Typography variant="h3" color="error.main" fontWeight={700}>
                        {conversations.filter(c => c.priority === 'high').length}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Conversations Table */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Live Conversations
                  </Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Conversation ID</TableCell>
                          <TableCell>Agent</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Priority</TableCell>
                          <TableCell>Duration</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {conversations.map((conversation) => (
                          <TableRow key={conversation.id}>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={600}>
                                {conversation.id}
                              </Typography>
                            </TableCell>
                            <TableCell>{conversation.agent}</TableCell>
                            <TableCell>{conversation.customer}</TableCell>
                            <TableCell>
                              <Chip
                                icon={getStatusIcon(conversation.status)}
                                label={conversation.status.toUpperCase()}
                                color={getStatusColor(conversation.status) as "success" | "warning" | "info" | "default"}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {conversation.type}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={conversation.priority.toUpperCase()}
                                color={getPriorityColor(conversation.priority) as "error" | "warning" | "success" | "default"}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight={500}>
                                {conversation.duration}
                              </Typography>
                            </TableCell>
                            <TableCell>{conversation.startTime}</TableCell>
                            <TableCell>
                              <Button 
                                size="small" 
                                variant="outlined"
                                onClick={() => handleViewDetails(conversation.id)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
