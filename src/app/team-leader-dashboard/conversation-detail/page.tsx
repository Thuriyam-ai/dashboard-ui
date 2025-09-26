"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
  ConversationTimelineBar,
  TalkRatioGauge,
  EventCallouts,
  SpeechDynamicsPanel,
} from "@/components/conversation-view";
import { MuiLCAPanel } from "@/components/lca";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  Grid,
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
  ArrowBack,
  Chat,
  Star,
  Phone,
  Schedule,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Warning,
  Assessment,
  Psychology,
  Analytics,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

interface ConversationDetail {
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
  campaign: string;
  team: string;
  disposition: string;
  btaScore: number;
  lcaScore: number;
  sentiment: "positive" | "neutral" | "negative";
  keyTopics: string[];
  callObjectives: string[];
  outcomes: string[];
}

/**
 * Team Leader Conversation Detail page component
 * Displays comprehensive conversation analysis with BTA and LCA analytics
 * @returns The ConversationDetailPage component
 */
export default function ConversationDetailPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"conversation" | "lca">("conversation");
  const [showLCAPanel, setShowLCAPanel] = useState(false);
  const { logout } = useAuth();

  const handleViewChange = (newView: string) => {
    setAnchorEl(null);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: "conversation" | "lca") => {
    setActiveTab(newValue);
    if (newValue === "lca") {
      setShowLCAPanel(true);
    } else {
      setShowLCAPanel(false);
    }
  };

  const handleBackToConversations = () => {
    router.push('/team-leader-dashboard/conversations');
  };

  // Mock conversation detail data
  const conversationDetail: ConversationDetail = {
    id: "CONV-001",
    agentName: "Kavya Reddy",
    customerName: "Rajesh Kumar",
    duration: "8:45",
    date: "2024-01-15",
    status: "completed",
    qualityScore: 92,
    fillerWords: 3,
    interruptions: 1,
    talkToListenRatio: 0.58,
    campaign: "Customer Support",
    team: "Technical Support",
    disposition: "Issue Resolved",
    btaScore: 88,
    lcaScore: 85,
    sentiment: "positive",
    keyTopics: ["Account Access", "Password Reset", "Security Settings"],
    callObjectives: ["Resolve login issue", "Provide security guidance", "Ensure customer satisfaction"],
    outcomes: ["Issue resolved", "Customer educated", "Follow-up scheduled"],
  };

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
        return <Cancel />;
      default:
        return <Warning />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "success";
      case "neutral":
        return "info";
      case "negative":
        return "error";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="conversations" />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
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
            <Button
              startIcon={<ArrowBack />}
              onClick={handleBackToConversations}
              sx={{ mr: 2 }}
            >
              Back to Conversations
            </Button>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                conversation-detail.localhost:3001
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
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />

          {/* Conversation Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Conversation Analysis: {conversationDetail.id}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {conversationDetail.agentName} ↔ {conversationDetail.customerName}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
              <Chip
                icon={getStatusIcon(conversationDetail.status)}
                label={conversationDetail.status.charAt(0).toUpperCase() + conversationDetail.status.slice(1)}
                color={getStatusColor(conversationDetail.status) as any}
                size="small"
              />
              <Chip
                label={conversationDetail.team}
                size="small"
                variant="outlined"
              />
              <Chip
                label={conversationDetail.campaign}
                size="small"
                variant="outlined"
              />
              <Typography variant="body2" color="text.secondary">
                {formatDate(conversationDetail.date)} • {conversationDetail.duration}
              </Typography>
            </Box>
          </Box>

          {/* Key Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Overall Quality Score
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="primary">
                        {conversationDetail.qualityScore}
                      </Typography>
                    </Box>
                    <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationDetail.qualityScore}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    color={conversationDetail.qualityScore >= 80 ? "success" : conversationDetail.qualityScore >= 60 ? "warning" : "error"}
                  />
                </CardContent>
              </Card>
            </Grid>


            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        LCA Score
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="warning.main">
                        {conversationDetail.lcaScore}
                      </Typography>
                    </Box>
                    <Analytics sx={{ fontSize: 40, color: 'warning.main' }} />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={conversationDetail.lcaScore}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    color={conversationDetail.lcaScore >= 80 ? "success" : conversationDetail.lcaScore >= 60 ? "warning" : "error"}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Sentiment
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color={getSentimentColor(conversationDetail.sentiment) + ".main"}>
                        {conversationDetail.sentiment.charAt(0).toUpperCase() + conversationDetail.sentiment.slice(1)}
                      </Typography>
                    </Box>
                    <Chat sx={{ fontSize: 40, color: getSentimentColor(conversationDetail.sentiment) + ".main" }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Analysis Tabs */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="conversation analysis tabs">
                <Tab
                  icon={<Chat />}
                  label="Conversation Analysis"
                  value="conversation"
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 0 }}>
              {/* Conversation Analysis Tab */}
              {activeTab === "conversation" && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Interactive Conversation Analysis
                  </Typography>
                  
                  {/* Transcript Player */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Conversation Transcript</Typography>
                    <Card variant="outlined">
                      <CardContent>
                        <Box sx={{ 
                          height: 200, 
                          backgroundColor: 'grey.50', 
                          borderRadius: 1, 
                          p: 2,
                          overflow: 'auto'
                        }}>
                          <Box sx={{ mb: 2 }}>
                            <Chip label="Agent: Kavya Reddy" size="small" color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" component="span">
                              00:00 - 00:15
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            "Hello Mr. Kumar, thank you for calling our support line. I'm Kavya from the technical support team. How can I assist you today?"
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Chip label="Customer: Rajesh Kumar" size="small" color="secondary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" component="span">
                              00:15 - 00:45
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            "Hi Kavya, I'm having trouble logging into my account. It keeps saying my password is incorrect, but I'm sure I'm entering it right."
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Chip label="Agent: Kavya Reddy" size="small" color="primary" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary" component="span">
                              00:45 - 01:20
                            </Typography>
                          </Box>
                          <Typography variant="body2">
                            "I understand your frustration. Let me help you resolve this. First, let me verify your account details and then we'll reset your password securely."
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Speaker Timeline</Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="h4" color="primary" fontWeight={700}>
                                {Math.round(conversationDetail.talkToListenRatio * 100)}%
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Agent Talk Ratio
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={conversationDetail.talkToListenRatio * 100}
                                sx={{ mt: 1, height: 8, borderRadius: 4 }}
                                color="primary"
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Call Metrics</Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="error.main" fontWeight={700}>
                                  {conversationDetail.interruptions}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Interruptions
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h5" color="warning.main" fontWeight={700}>
                                  {conversationDetail.fillerWords}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Filler Words
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
