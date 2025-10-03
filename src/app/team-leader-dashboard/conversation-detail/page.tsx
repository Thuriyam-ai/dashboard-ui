"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
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
  Grid,
  LinearProgress,
  Alert,
  AlertTitle,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  ArrowBack,
  Chat,
  CheckCircle,
  Cancel,
  Warning,
  Assessment,
  Analytics,
  PlaylistAddCheck, // For Scorecard
  DoneAll, // For Outcomes
  Schedule, 
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { getConversationDetail } from "@/data/services/conversation-service";
import { 
  ConversationDetailResponse,
  ConversationScorecard,
  ConversationOutcome,
  ScorecardParameterAnalysis,
} from "@/types/api/conversation";

// --- Types & Mocks ---

// Helper function to extract date string from MongoDB-style date object or string
const extractDate = (date: { $date: string } | string | undefined): string => {
  if (typeof date === 'object' && date && '$date' in date) {
    return date.$date;
  }
  return date as string || new Date().toISOString();
};

interface UIEnhancedConversationDetail {
  id: string;
  agentName: string; 
  customerName: string; 
  duration: string; 
  date: string; 
  status: "completed" | "in-progress" | "failed" | string;
  qualityScore: number; 
  talkToListenRatio: number; // Mocked for Conversation Analysis tab
  campaign: string; // Mocked/Derived
  team: string; // Mocked/Derived
  disposition: string; 
  btaScore: number; // Mocked
  lcaScore: number; // Mocked
  sentiment: "positive" | "neutral" | "negative"; // Mocked
  fillerWords: number; // Mocked
  interruptions: number; // Mocked
  keyTopics: string[]; // Mocked
  audioUrl: string; 
  
  // Data directly from analytics_data
  scorecard: ConversationScorecard;
  outcome: ConversationOutcome;
}

// Data structure to hold all fetched data
interface ConversationData {
  detail: UIEnhancedConversationDetail;
}

type TabValue = "conversation" | "scorecard" | "outcomes";

// Helper to map API data to UI structure
const mapToUI = (apiData: ConversationDetailResponse): UIEnhancedConversationDetail => {
    // Safely parse nested data
    const scorecard = apiData.analytics_data?.scorecard || {};
    const outcome = apiData.analytics_data?.outcome || {};

    const callTimestamp = extractDate(apiData.call_timestamp);
    
    return {
        id: apiData.conversation_id,
        agentName: "Kavya Reddy", // Mocked - Replace with actual data source (e.g., user service)
        customerName: "Rajesh Kumar", // Mocked
        duration: `${Math.floor(apiData.length_in_sec / 60)}:${(apiData.length_in_sec % 60).toString().padStart(2, '0')}`,
        date: callTimestamp,
        status: (apiData.avyukta_status || "completed").toLowerCase() as any,
        qualityScore: apiData.QC_score,
        talkToListenRatio: 0.58, // Mocked 
        campaign: "Customer Support", // Mocked 
        team: "Technical Support", // Mocked 
        disposition: apiData.lamh_disposition,
        btaScore: 88, // Mocked
        lcaScore: 85, // Mocked
        sentiment: "positive", // Mocked
        fillerWords: 3, // Mocked
        interruptions: 1, // Mocked
        keyTopics: ["Account Access", "Password Reset", "Security Settings"], // Mocked
        audioUrl: apiData.recording_url,
        
        scorecard: scorecard,
        outcome: outcome,
    };
};

/**
 * Team Leader Conversation Detail page component
 */
export default function ConversationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout } = useAuth();
  
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("conversation");

  // Get the conversation ID from the URL query parameter 'id'
  const conversationId = searchParams.get('id');

  // --- Data Fetching Effect ---
  useEffect(() => {
    // 1. Check if ID is available
    if (!conversationId) {
        setLoading(false);
        setError("Conversation ID is missing from the URL.");
        return;
    }
    
    const fetchAllDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 2. Use the ID from the URL to fetch data
        const detailResponse = await getConversationDetail(conversationId);
        
        setConversationData({
          detail: mapToUI(detailResponse),
        });

      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred while fetching conversation details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [conversationId]); // Rerun effect when conversationId changes

  // Helper functions
  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleBackToConversations = () => router.push('/team-leader-dashboard/conversations');

  const getStatusColor = (status: string) => ({ completed: "success", "in-progress": "info", failed: "error" }[status] || "default");
  
  const getStatusIcon = (status: string) => ({ completed: <CheckCircle />, "in-progress": <Schedule />, failed: <Cancel /> }[status] || <Warning />);
  
  const getSentimentColor = (sentiment: string) => ({ positive: "success", neutral: "info", negative: "error" }[sentiment] || "default");

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading conversation and analysis details...</Typography>
      </Box>
    );
  }

  if (error || !conversationData) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Alert severity="error">
          <AlertTitle>Error Loading Conversation</AlertTitle>
          {error || `Conversation details could not be loaded for ID: ${conversationId}.`}
          <Button onClick={handleBackToConversations} sx={{ ml: 2 }}>Go Back</Button>
        </Alert>
      </Container>
    );
  }

  // Destructure for cleaner JSX
  const { detail } = conversationData;
  const scorecardParams = Object.values(detail.scorecard) as ScorecardParameterAnalysis[];
  const outcomeFields = Object.values(detail.outcome);
  
  // FIXED: Calculation using max_score from API data
  const totalPossibleScore = scorecardParams.reduce((sum, param) => sum + param.max_score, 0);
  const totalAchievedScore = scorecardParams.reduce((sum, param) => sum + param.score, 0);
  const scorecardPercentage = totalPossibleScore > 0 ? (totalAchievedScore / totalPossibleScore) * 100 : 0;
  
  // Helper to determine score visualization color (based on a simple pass/fail threshold)
  const getScoreColor = (score: number, max: number) => {
    const percentage = (score / max) * 100;
    if (percentage >= 80) return 'success';
    if (percentage >= 50) return 'warning';
    return 'error';
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="conversations" />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        {/* Top Bar */}
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Button startIcon={<ArrowBack />} onClick={handleBackToConversations} sx={{ mr: 2 }}>Back to Conversations</Button>
            <Box sx={{ flexGrow: 1 }}><Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>conversation-detail.localhost:3001</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><BookmarkBorder /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>W</Avatar>
                <Typography variant="body2" fontWeight={500}>Work</Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
              <Button variant="contained" color="error" size="small" startIcon={<Logout />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>
        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          {/* Conversation Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Conversation Analysis: {detail.id}</Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>{detail.agentName} ↔ {detail.customerName}</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}>
              <Chip icon={getStatusIcon(detail.status)} label={detail.status.charAt(0).toUpperCase() + detail.status.slice(1)} color={getStatusColor(detail.status) as any} size="small" />
              <Chip label={detail.team} size="small" variant="outlined" />
              <Chip label={detail.campaign} size="small" variant="outlined" />
              <Typography variant="body2" color="text.secondary">{formatDate(detail.date)} • {detail.duration}</Typography>
            </Box>
          </Box>

          {/* Key Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box><Typography color="text.secondary" gutterBottom>Overall Quality Score</Typography><Typography variant="h4" fontWeight={700} color="primary">{detail.qualityScore}</Typography></Box>
                  <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <LinearProgress variant="determinate" value={detail.qualityScore} sx={{ mt: 1, height: 8, borderRadius: 4 }} color={detail.qualityScore >= 80 ? "success" : "warning"} />
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box><Typography color="text.secondary" gutterBottom>LCA Score</Typography><Typography variant="h4" fontWeight={700} color="warning.main">{detail.lcaScore}</Typography></Box>
                  <Analytics sx={{ fontSize: 40, color: 'warning.main' }} />
                </Box>
                <LinearProgress variant="determinate" value={detail.lcaScore} sx={{ mt: 1, height: 8, borderRadius: 4 }} color={detail.lcaScore >= 80 ? "success" : "warning"} />
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>Sentiment</Typography>
                    <Typography variant="h4" fontWeight={700} color={`${getSentimentColor(detail.sentiment)}.main`}>
                      {detail.sentiment.charAt(0).toUpperCase() + detail.sentiment.slice(1)}
                    </Typography>
                  </Box>
                  <Chat sx={{ fontSize: 40, color: `${getSentimentColor(detail.sentiment)}.main`}} />
                </Box>
              </CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>Disposition</Typography>
                    <Typography variant="h4" fontWeight={700}>
                      {detail.disposition}
                    </Typography>
                  </Box>
                  <DoneAll sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
              </CardContent></Card>
            </Grid>
          </Grid>

          {/* --- NEW LOCATION: PERSISTENT AUDIO PLAYER & TRANSCRIPT --- */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Conversation Playback & Transcript</Typography>
                <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1, backgroundColor: 'action.hover' }}>
                    <audio controls style={{ width: '100%' }}>
                      <source src={detail.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                </Box>
                <Card variant="outlined" sx={{ mt: 2 }}>
                    <CardContent>
                        <Box sx={{ height: 200, overflow: 'auto' }}>
                            <Box sx={{ mb: 2 }}><Chip label={`Agent: ${detail.agentName}`} size="small" color="primary" sx={{ mr: 1 }} /><Typography variant="body2" color="text.secondary" component="span">00:00 - 00:15</Typography></Box>
                            <Typography variant="body2" sx={{ mb: 2 }}>"Hello Mr. Kumar, thank you for calling our support line. I'm Kavya from the technical support team. How can I assist you today?"</Typography>
                            <Box sx={{ mb: 2 }}><Chip label={`Customer: ${detail.customerName}`} size="small" color="secondary" sx={{ mr: 1 }} /><Typography variant="body2" color="text.secondary" component="span">00:15 - 00:45</Typography></Box>
                            <Typography variant="body2" sx={{ mb: 2 }}>"Hi Kavya, I'm having trouble logging into my account. It keeps saying my password is incorrect, but I'm sure I'm entering it right."</Typography>
                            <Box sx={{ mb: 2 }}><Chip label={`Agent: ${detail.agentName}`} size="small" color="primary" sx={{ mr: 1 }} /><Typography variant="body2" color="text.secondary" component="span">00:45 - 01:20</Typography></Box>
                            <Typography variant="body2">"I understand your frustration. Let me help you resolve this. First, let me verify your account details and then we'll reset your password securely."</Typography>
                        </Box>
                    </CardContent>
                </Card>
            </CardContent>
          </Card>

          {/* Analysis Tabs */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="conversation analysis tabs">
                <Tab icon={<Chat />} label="Conversation Analysis" value="conversation" iconPosition="start" />
                <Tab icon={<PlaylistAddCheck />} label="Scorecard" value="scorecard" iconPosition="start" />
                <Tab icon={<DoneAll />} label="Outcomes" value="outcomes" iconPosition="start" />
              </Tabs>
            </Box>
            <CardContent sx={{ p: 0 }}>
              {/* Conversation Analysis Tab Content (Cleaned up) */}
              {activeTab === "conversation" && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Call Analysis Details</Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Speaker Timeline</Typography>
                      <Card variant="outlined"><CardContent>
                        <Box sx={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" color="primary" fontWeight={700}>{Math.round(detail.talkToListenRatio * 100)}%</Typography>
                            <Typography variant="body2" color="text.secondary">Agent Talk Ratio</Typography>
                            <LinearProgress variant="determinate" value={detail.talkToListenRatio * 100} sx={{ mt: 1, height: 8, borderRadius: 4 }} color="primary" />
                          </Box>
                        </Box>
                      </CardContent></Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Call Metrics</Typography>
                      <Card variant="outlined"><CardContent><Grid container spacing={2}>
                        <Grid item xs={6}><Box sx={{ textAlign: 'center' }}><Typography variant="h5" color="error.main" fontWeight={700}>{detail.interruptions}</Typography><Typography variant="body2" color="text.secondary">Interruptions</Typography></Box></Grid>
                        <Grid item xs={6}><Box sx={{ textAlign: 'center' }}><Typography variant="h5" color="warning.main" fontWeight={700}>{detail.fillerWords}</Typography><Typography variant="body2" color="text.secondary">Filler Words</Typography></Box></Grid>
                      </Grid></CardContent></Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Scorecard Tab Content (Using Nested API Data) */}
              {activeTab === "scorecard" && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Agent Performance Scorecard</Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" color="text.secondary" gutterBottom>Total QC Score: {detail.qualityScore} / {Math.round(scorecardPercentage)}% Adherence</Typography>
                      {/* Using the total scorecard percentage for the main progress bar based on detailed scores */}
                      <LinearProgress variant="determinate" value={scorecardPercentage} sx={{ mt: 1, height: 10, borderRadius: 4, mb: 3 }} color={scorecardPercentage >= 80 ? "success" : "error"} />
                      
                      {/* FIXED: Using lg={4} to ensure uniform 3-column layout, and using param.max_score */}
                      <Grid container spacing={3} alignItems="stretch">
                        {scorecardParams.length > 0 ? (
                          scorecardParams.map((param, index) => {
                            const maxScore = param.max_score; // Use max_score from API response
                            const scoreColor = getScoreColor(param.score, maxScore);
                            const adherence = maxScore > 0 ? (param.score / maxScore) * 100 : 0;

                            return (
                              <Grid item xs={12} md={6} lg={4} key={index}>
                                <Card variant="elevation" sx={{ height: '100%', borderLeft: `4px solid ${scoreColor === 'error' ? 'red' : scoreColor === 'warning' ? 'orange' : 'green'}` }}>
                                  <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                      <Typography variant="subtitle1" fontWeight={600}>{param.parameter}</Typography>
                                      <Chip label={`Score: ${param.score}/${maxScore}`} color={scoreColor as any} size="small" />
                                    </Box>
                                    <Typography variant="body2" sx={{ mt: 1, mb: 1, fontStyle: 'italic' }}>{param.explanation}</Typography>
                                    
                                    <Box sx={{ mt: 2 }}>
                                      <Typography variant="caption" fontWeight={600}>Rule Analysis ({Math.round(adherence)}% Adherence):</Typography>
                                      {param.sub_rule_analysis.map((rule, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', mt: 0.5, fontSize: '0.75rem' }}>
                                          {rule.status === 'Pass' ? 
                                            <CheckCircle color="success" sx={{ fontSize: 14, mr: 0.5, mt: '2px', flexShrink: 0 }} /> : 
                                            <Cancel color="error" sx={{ fontSize: 14, mr: 0.5, mt: '2px', flexShrink: 0 }} />
                                          }
                                          <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 500, lineHeight: 1.2 }}>{rule.rule}</Typography>
                                            <Typography variant="caption" color="text.secondary" display="block" sx={{ lineHeight: 1.2 }}>**Reason:** {rule.reason}</Typography>
                                          </Box>
                                        </Box>
                                      ))}
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                            );
                          })
                        ) : (
                          <Alert severity="info" sx={{ width: '100%', m: 2 }}>No detailed scorecard analysis found in the conversation data.</Alert>
                        )}
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {/* Outcomes Tab Content (Using Nested API Data) */}
              {activeTab === "outcomes" && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Call Outcomes and Extracted Metadata</Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>Disposition: **{detail.disposition}**</Typography>
                      <Typography variant="body1" color="text.secondary" gutterBottom>The final disposition from the conversation data.</Typography>
                      
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Outcome Fields Extracted</Typography>
                        {outcomeFields.length > 0 ? (
                            <Grid container spacing={3}>
                            {outcomeFields.map((field, index) => {
                                // Format value for display
                                let displayValue = String(field.extracted_value ?? 'N/A');
                                if (field.extracted_value === null) displayValue = 'N/A';
                                if (typeof field.extracted_value === 'boolean') displayValue = field.extracted_value ? 'Yes' : 'No';

                                return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <TextField
                                    fullWidth
                                    label={field.attribute_name}
                                    variant="outlined"
                                    value={displayValue}
                                    InputProps={{ readOnly: true }}
                                    sx={{ mb: 2 }}
                                    helperText={`**Reasoning:** ${field.reasoning}`}
                                    multiline
                                    rows={2}
                                    />
                                </Grid>
                                )
                            })}
                            </Grid>
                        ) : (
                             <Alert severity="warning">No specific outcome fields were extracted or found in the conversation data.</Alert>
                        )}
                      </Box>

                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>Key Topics Discussed (Hardcoded)</Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {detail.keyTopics.map((topic, index) => (
                            <Chip key={index} label={topic} size="medium" color="default" variant="filled" />
                          ))}
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}