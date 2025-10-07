"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import styles from "./ConversationDetailPage.module.css";
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
  Divider,
  InputAdornment,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Drawer,
  Slider,
} from "@mui/material";
import { Close } from "@mui/icons-material";
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
  PlaylistAddCheck,
  DoneAll,
  Schedule,
  Save,
  Edit,
  Share,
  Download,
  Phone,
  Description,
  Person,
  AccessTime,
  Mic,
  Folder,
  Star,
  TrendingUp,
  VolumeUp,
  Fullscreen,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import {
  getConversationDetail,
  submitScorecardReview,
  submitOutcomeReview,
} from "@/data/services/conversation-service";
import {
  ConversationDetailResponse,
  ConversationScorecard,
  ConversationOutcome,
  ScorecardParameterAnalysis,
  OutcomeFieldAnalysis,
} from "@/types/api/conversation";

// Define a constant for the sidebar width to reuse it
const DRAWER_WIDTH = 280;

type TabValue = "ai-stats" | "reviewer";

export default function ConversationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logout } = useAuth();

  const conversationId = searchParams.get("id") || "conv_001";
  const [conversation, setConversation] = useState<ConversationDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("ai-stats");
  const [sidedrawOpen, setSidedrawOpen] = useState(false);
  const [scoringCriteria, setScoringCriteria] = useState({
    callOpening: 0,
    effectiveQuestioning: 0,
    interruptions: 0,
    offTopicConversation: 0,
    dispositionSelection: 0,
    callFlow: 0,
    falsePromises: 0,
    callDisconnection: 0
  });

  const [scoringReasons, setScoringReasons] = useState({
    callOpening: '',
    effectiveQuestioning: '',
    interruptions: '',
    offTopicConversation: '',
    dispositionSelection: '',
    callFlow: '',
    falsePromises: '',
    callDisconnection: ''
  });

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 3 minutes in seconds
  const [volume, setVolume] = useState(80);

  // Fetch conversation details
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        setLoading(true);
        const data = await getConversationDetail(conversationId);
        setConversation(data);
      } catch (err) {
        console.error("Failed to fetch conversation:", err);
        setError("Failed to load conversation details");
      } finally {
        setLoading(false);
      }
    };

    fetchConversation();
  }, [conversationId]);

  const handleBackToConversations = () => {
    router.push("/team-leader-dashboard/conversations");
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleScoreConversation = () => {
    console.log('Opening sidedraw...');
    setSidedrawOpen(true);
  };

  const handleCloseSidedraw = () => {
    setSidedrawOpen(false);
  };

  const handleSaveScores = () => {
    // Save scoring logic here
    console.log('Saving scores:', scoringCriteria);
    setSidedrawOpen(false);
  };

  const handleScoringChange = (criteria: string, value: number) => {
    setScoringCriteria(prev => ({
      ...prev,
      [criteria]: value
    }));
  };

  const handleReasonChange = (key: string, value: string) => {
    setScoringReasons(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !conversation) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error || "Conversation not found"}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <TeamLeaderSidebar />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          maxWidth: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Navigation Bar */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={handleBackToConversations}
                sx={{ 
                  color: 'primary.main',
                  textTransform: 'none'
                }}
              >
                Back to Conversations
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <BookmarkBorder />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* Title and Call Info */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Voice Call to Ankush M
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {conversation.conversation_id}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                2024-01-15 at 4:30 PM
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Main Content - Two Column Layout */}
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          minHeight: 'calc(100vh - 200px)', 
          width: '100%', 
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
          pr: 2  // Add right padding to prevent edge clipping
        }}>
          {/* Left Panel - Audio Player and Transcript */}
          <Box sx={{ 
            flex: '0 0 calc(41.67% - 12px)', 
            minWidth: 0,
            maxWidth: 'calc(41.67% - 12px)',
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              
              {/* Audio Player Card */}
              <Card sx={{ borderRadius: 2, borderTop: '4px solid #1976d2' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone sx={{ color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Audio Player
                      </Typography>
                    </Box>
                    <IconButton>
                      <Download />
                    </IconButton>
                </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Conversation Recording
                  </Typography>

                  {/* Audio Controls */}
                  <Box sx={{ backgroundColor: '#1a1a1a', borderRadius: 2, p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <IconButton 
                        sx={{ color: 'white' }}
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                      </IconButton>
                      
                      <Typography variant="body2" sx={{ color: 'white', minWidth: '40px' }}>
                        {formatTime(currentTime)}
                      </Typography>
                      
                      <Box sx={{ flexGrow: 1, mx: 2 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(currentTime / duration) * 100}
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#1976d2'
                            }
                          }}
                        />
                </Box>
                      
                      <Typography variant="body2" sx={{ color: 'white', minWidth: '40px' }}>
                        /{formatDuration(duration)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <VolumeUp sx={{ color: 'white' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress 
                          variant="determinate" 
                          value={volume}
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            backgroundColor: 'rgba(255,255,255,0.3)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#1976d2'
                            }
                          }}
                        />
                      </Box>
                      <IconButton sx={{ color: 'white' }}>
                        <Fullscreen />
                      </IconButton>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Transcript Card */}
              <Card sx={{ borderRadius: 2, borderTop: '4px solid #2e7d32' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Description sx={{ color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Transcript
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select value="all" displayEmpty>
                          <MenuItem value="all">All Sentiments</MenuItem>
                          <MenuItem value="positive">Positive</MenuItem>
                          <MenuItem value="neutral">Neutral</MenuItem>
                          <MenuItem value="negative">Negative</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton>
                        <Download />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Conversation Text
                  </Typography>

                  {/* Transcript Content */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '50px' }}>
                        0:00
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Lalit Bal (Agent)
                          </Typography>
                          <Chip label="neutral" size="small" color="default" />
                        </Box>
                        <Typography variant="body2">
                          Hello! This is Testbot from Creditmann. I wanted to talk to you about a loan offer that might interest you. Would you like to receive the details via SMS?
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '50px' }}>
                        0:11
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Customer (Customer)
                          </Typography>
                          <Chip label="positive" size="small" color="success" />
                        </Box>
                        <Typography variant="body2">
                          Yes, I would be interested in hearing more about the loan offer.
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '50px' }}>
                        0:18
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Lalit Bal (Agent)
                          </Typography>
                          <Chip label="positive" size="small" color="success" />
                        </Box>
                        <Typography variant="body2">
                          Great! I'll send you the details via SMS. Can you confirm your mobile number?
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: '50px' }}>
                        0:25
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            Customer (Customer)
                          </Typography>
                          <Chip label="neutral" size="small" color="default" />
                        </Box>
                        <Typography variant="body2">
                          Yes, it's +919482540097
                    </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
                </Box>

          {/* Right Panel - Analytics and Stats */}
          <Box sx={{ 
            flex: '0 0 calc(58.33% - 12px)', 
            minWidth: 0,
            maxWidth: 'calc(58.33% - 12px)',
            overflow: 'hidden',
            maxHeight: 'calc(100vh - 200px)',  // Prevent vertical overflow
            boxSizing: 'border-box'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 3,
              height: '100%'
            }}>
              
              {/* Tabs */}
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              flexShrink: 0,  // Prevent tabs from shrinking
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                minHeight: 48,
              }
            }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Score" value="ai-stats" />
                  <Tab label="Reviewer Score" value="reviewer" />
              </Tabs>
            </Box>

              {/* Tab Content Container */}
              <Box sx={{ 
                flexGrow: 1, 
                overflow: 'hidden',
                minHeight: 0  // Allow shrinking
              }}>
                {/* AI Stats Tab Content */}
                {activeTab === "ai-stats" && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2,
                  height: '100%',
                  overflow: 'hidden'
                }}>
                  {/* Score Widget - Large */}
                  <Box>
                    <Card sx={{ 
                      borderRadius: 2, 
                      borderTop: '4px solid #ff9800',
                      height: 300,  // Fixed square height
                      width: '100%',
                      maxWidth: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      boxSizing: 'border-box'
                    }}>
                      <CardContent sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        p: 3
                      }}>
                        {/* Header */}
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                            <Star sx={{ color: 'primary.main' }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Score
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Overall Quality Assessment
                          </Typography>
                        </Box>

                        {/* Main Score */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Typography variant="h1" sx={{ 
                            fontWeight: 700, 
                            color: 'warning.main',
                            fontSize: '4rem',
                            lineHeight: 1
                          }}>
                            89
                          </Typography>
                        </Box>

                        {/* Metrics */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                              Agent Score
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              89
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>

                </Box>
              )}

                {/* Reviewer Tab Content */}
                {activeTab === "reviewer" && (
                <Box sx={{ 
                  height: '100%',
                  overflow: 'hidden'
                }}>
                    <Card sx={{ 
                      borderRadius: 2, 
                      borderTop: '4px solid #673ab7',
                      minHeight: 400,
                      maxHeight: 'calc(100vh - 400px)',  // Dynamic height based on viewport
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden'
                    }}>
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Technical Support Quality Assessment Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: '#ff9800', 
                            borderRadius: 2, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <CheckCircle sx={{ color: 'white' }} />
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Technical Support Quality Assessment
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              Evaluate technical troubleshooting and support effectiveness
                            </Typography>
                          </Box>
                        </Box>

                        {/* No Score Section */}
                        <Box sx={{ textAlign: 'center', mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            No Score
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            This conversation has not been manually scored yet
                          </Typography>
                        </Box>

                        {/* Conversation Details Bar */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'space-between', 
                          backgroundColor: '#f5f5f5', 
                          borderRadius: 2, 
                          p: 2, 
                          mb: 4,
                          flexWrap: 'wrap',
                          gap: 2
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule sx={{ color: '#ff9800' }} />
                            <Typography variant="body2">Pending Review</Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Star sx={{ color: '#2196f3' }} />
                            <Typography variant="body2">89/100</Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Schedule sx={{ color: 'text.secondary' }} />
                            <Typography variant="body2">Never</Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chat sx={{ color: '#9c27b0' }} />
                            <Typography variant="body2">Voice Call</Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AccessTime sx={{ color: '#4caf50' }} />
                            <Typography variant="body2">10:15</Typography>
                          </Box>
                          <Divider orientation="vertical" flexItem />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Person sx={{ color: '#2196f3' }} />
                            <Typography variant="body2">Lalit Bal</Typography>
                          </Box>
                        </Box>

                        {/* Score This Conversation Button */}
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                          <Button 
                            variant="contained" 
                            size="large"
                            onClick={handleScoreConversation}
                            sx={{ 
                              px: 4, 
                              py: 1.5, 
                              fontSize: '1rem',
                              fontWeight: 600,
                              textTransform: 'none'
                            }}
                          >
                            Score this Conversation
                          </Button>
                        </Box>

                        {/* Footer Note */}
                        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                          Manual scoring will be used to reconcile with AI-generated scores
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Auditor Scoring Sidedraw */}
      <Drawer
        anchor="right"
        open={sidedrawOpen}
        onClose={handleCloseSidedraw}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            padding: 3,
            height: '100vh',
            overflow: 'hidden',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                Reviewer Scoring
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Manually score this conversation
              </Typography>
            </Box>
            <IconButton onClick={handleCloseSidedraw}>
              <Close />
            </IconButton>
          </Box>

          {/* Scrollable Content Area */}
          <Box sx={{ 
            flex: 1, 
            overflow: 'auto',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Quality Template */}
            <Card sx={{ borderRadius: 2, borderTop: '4px solid #2e7d32', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Quality Template
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>Select Template</InputLabel>
                  <Select value="technical-support" label="Select Template">
                    <MenuItem value="technical-support">Technical Support</MenuItem>
                    <MenuItem value="customer-service">Customer Service</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {/* Quality Scorecard */}
            <Card sx={{ borderRadius: 2, borderTop: '4px solid #2e7d32', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Quality Scorecard
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Total Score: 100 points
              </Typography>

              {/* Scoring Parameters Table */}
              <Box sx={{ 
                overflow: 'auto', 
                maxHeight: '400px',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 1
              }}>
                <Box sx={{ minWidth: 500 }}>
                  {/* Table Header */}
                  <Box sx={{ 
                    display: 'flex', 
                    borderBottom: '2px solid',
                    borderColor: 'grey.300',
                    pb: 1,
                    mb: 2,
                    backgroundColor: 'grey.100'
                  }}>
                    <Box sx={{ flex: '0 0 200px', fontWeight: 600 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Parameter Name
                      </Typography>
                    </Box>
                    <Box sx={{ flex: '0 0 60px', fontWeight: 600, textAlign: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Score
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, fontWeight: 600, textAlign: 'center' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        Reasons
                      </Typography>
                    </Box>
                  </Box>

                  {/* Table Rows */}
                  {[
                    { key: 'callOpening', name: 'Call Opening / Adherence to Opening', maxScore: 15 },
                    { key: 'effectiveQuestioning', name: 'Effective Questioning and Probing', maxScore: 15 },
                    { key: 'interruptions', name: 'Interruptions (if any)', maxScore: 10 },
                    { key: 'offTopicConversation', name: 'Unnecessary or Off-topic Conversation', maxScore: 10 },
                    { key: 'dispositionSelection', name: 'Correct Disposition Selection', maxScore: 15 },
                    { key: 'callFlow', name: 'Proper Call Flow / Sequence Following', maxScore: 15 },
                    { key: 'falsePromises', name: 'No False or Misleading Promises Made', maxScore: 10 },
                    { key: 'callDisconnection', name: 'Proper Call Disconnection / Call Closure', maxScore: 10 }
                  ].map((param, index) => (
                    <Box key={param.key} sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start',
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                      backgroundColor: index % 2 === 0 ? 'white' : 'grey.50',
                      '&:last-child': { borderBottom: 'none' }
                    }}>
                      {/* Parameter Name */}
                      <Box sx={{ 
                        flex: '0 0 200px', 
                        pr: 2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            lineHeight: 1.4,
                            wordBreak: 'break-word'
                          }}
                        >
                          {param.name}
                        </Typography>
                      </Box>
                      
                      {/* Score Input */}
                      <Box sx={{ 
                        flex: '0 0 60px', 
                        px: 1,
                        minHeight: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start'
                      }}>
                        <TextField
                          size="small"
                          type="number"
                          value={scoringCriteria[param.key] || 0}
                          onChange={(e) => handleScoringChange(param.key, parseInt(e.target.value) || 0)}
                          inputProps={{ 
                            min: 0, 
                            max: param.maxScore
                          }}
                          sx={{
                            width: '50px',
                            '& .MuiOutlinedInput-root': {
                              height: '32px',
                              width: '50px'
                            },
                            '& .MuiInputBase-input': {
                              textAlign: 'left',
                              padding: '4px 6px',
                              fontSize: '0.875rem'
                            }
                          }}
                        />
                        <Typography variant="caption" sx={{ 
                          display: 'block', 
                          mt: 0.5, 
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                          textAlign: 'left'
                        }}>
                          /{param.maxScore}
                        </Typography>
                      </Box>
                      
                      {/* Reasons Input */}
                      <Box sx={{ 
                        flex: 1, 
                        pl: 2,
                        minHeight: '40px',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <TextField
                          size="small"
                          placeholder="Enter reasons..."
                          multiline
                          rows={2}
                          value={scoringReasons[param.key] || ''}
                          onChange={(e) => handleReasonChange(param.key, e.target.value)}
                          sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                              fontSize: '0.875rem'
                            },
                            '& .MuiInputBase-input': {
                              textAlign: 'left',
                              padding: '4px 6px',
                              verticalAlign: 'top'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Total Score Display */}
              <Box sx={{ 
                mt: 3, 
                p: 2, 
                backgroundColor: 'grey.50', 
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.200',
                textAlign: 'center'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Total Score: {Object.values(scoringCriteria).reduce((sum, score) => sum + (score || 0), 0)}/100 points
                </Typography>
              </Box>
            </CardContent>
          </Card>
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexShrink: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCloseSidedraw}
              sx={{ 
                py: 1.5,
                textTransform: 'none'
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSaveScores}
              sx={{ 
                py: 1.5,
                textTransform: 'none'
              }}
            >
              Save scores
            </Button>
          </Box>
      </Box>
      </Drawer>
    </Box>
  );
}