"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Slider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal,
  Backdrop,
  Fade,
  LinearProgress,
  Paper,
  Divider,
  Avatar,
  Stack,
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack,
  PlayArrow,
  Pause,
  VolumeUp,
  Fullscreen,
  Download,
  Phone,
  Star,
  TrendingUp,
  TrendingDown,
  BarChart,
  FavoriteBorder,
  Favorite,
  CheckCircle,
  Close,
  Share,
  BookmarkBorder,
  MoreHoriz,
  MoreVert,
  Refresh,
  Settings,
  Description,
  Timer,
  Mic,
  VolumeOff,
  Person,
  CalendarToday,
  Message,
  ShowChart,
  CenterFocusStrong,
  Warning,
  ExpandMore,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: theme.shadows[3],
}));

export default function ConversationDetailPage() {
  const router = useRouter();
  
  const conversation = {
    id: 1,
    agent: "Testbot",
    customer: "John Doe",
    type: "Call",
    category: "Sales",
    date: "2024-01-15",
    time: "10:30 AM",
    duration: "1:40",
    status: "Completed",
    rating: 5,
    quality: 85,
    talkRatio: 65,
    interruptions: 2,
    summary: "Customer expressed interest in personal loan offer from Creditmann. Loan details sent via SMS to customer's mobile number. Interest rates start from 10.99% per annum for eligible customers. Approval process typically takes 24-48 hours.",
    tags: ["loan", "credit", "personal loan", "SMS"],
    conversationId: "CONV-2024-001",
    owner: "Testbot",
    account: "Creditmann",
    score: 85,
    scoreTrend: "up" as const,
    previousScore: 80
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState(0);
  const [activeTab, setActiveTab] = useState('ai-stats');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [likedTranscriptEntries, setLikedTranscriptEntries] = useState<number[]>([]);
  const [showAuditorScoring, setShowAuditorScoring] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [auditorScores, setAuditorScores] = useState({
    technicalDiagnosis: 0,
    solutionProvision: 0,
    troubleshootingSteps: 0,
    technicalCommunication: 0,
    documentation: 0,
    needsAssessment: 0,
    objectionHandling: 0,
    valueProposition: 0,
    closingTechniques: 0,
    relationshipBuilding: 0,
    proactiveSupport: 0,
    retentionStrategies: 0,
    upsellingOpportunities: 0,
    feedbackCollection: 0,
    accountManagement: 0,
    communication: 0,
    productKnowledge: 0,
    customerSatisfaction: 0,
    compliance: 0,
    customerService: 0,
    technicalAccuracy: 0,
    salesEffectiveness: 0,
    problemResolution: 0,
    overall: 0,
    notes: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState(conversation.category);
  const [savedHumanScore, setSavedHumanScore] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getScoringTemplate = (category: string) => {
    switch (category.toLowerCase()) {
      case 'technical support':
        return {
          title: 'Technical Support Quality Assessment',
          description: 'Evaluate technical troubleshooting and support effectiveness',
          criteria: [
            { key: 'technicalDiagnosis', label: 'Technical Diagnosis', max: 30, description: 'Ability to accurately identify and diagnose technical issues' },
            { key: 'solutionProvision', label: 'Solution Provision', max: 25, description: 'Quality and effectiveness of technical solutions provided' },
            { key: 'troubleshootingSteps', label: 'Troubleshooting Process', max: 20, description: 'Logical and systematic approach to problem-solving' },
            { key: 'technicalCommunication', label: 'Technical Communication', max: 15, description: 'Ability to explain complex technical concepts clearly' },
            { key: 'documentation', label: 'Documentation & Follow-up', max: 10, description: 'Proper case documentation and follow-up procedures' }
          ]
        };
      case 'sales':
      case 'tech sales':
        return {
          title: 'Sales Performance Assessment',
          description: 'Evaluate sales techniques and deal-closing effectiveness',
          criteria: [
            { key: 'needsAssessment', label: 'Needs Assessment', max: 25, description: 'Quality of discovering and understanding customer needs' },
            { key: 'objectionHandling', label: 'Objection Handling', max: 25, description: 'Effectiveness in addressing customer concerns and objections' },
            { key: 'valueProposition', label: 'Value Proposition', max: 20, description: 'Clear articulation of product benefits and value' },
            { key: 'closingTechniques', label: 'Closing Techniques', max: 20, description: 'Ability to move conversation toward purchase decision' },
            { key: 'relationshipBuilding', label: 'Relationship Building', max: 10, description: 'Establishing trust and rapport with potential customers' }
          ]
        };
      case 'customer success':
        return {
          title: 'Customer Success Quality Assessment',
          description: 'Evaluate customer relationship management and retention efforts',
          criteria: [
            { key: 'proactiveSupport', label: 'Proactive Support', max: 30, description: 'Anticipating and addressing customer needs before issues arise' },
            { key: 'retentionStrategies', label: 'Retention Strategies', max: 25, description: 'Implementation of strategies to maintain customer loyalty' },
            { key: 'upsellingOpportunities', label: 'Growth Opportunities', max: 20, description: 'Identifying and presenting relevant upselling opportunities' },
            { key: 'feedbackCollection', label: 'Feedback Collection', max: 15, description: 'Gathering and acting on customer feedback effectively' },
            { key: 'accountManagement', label: 'Account Management', max: 10, description: 'Overall account health monitoring and management' }
          ]
        };
      default:
        return {
          title: 'General Conversation Assessment',
          description: 'Evaluate overall conversation quality and customer service',
          criteria: [
            { key: 'communication', label: 'Communication Quality', max: 25, description: 'Clarity, professionalism, and effectiveness of communication' },
            { key: 'productKnowledge', label: 'Product Knowledge', max: 25, description: 'Understanding and accuracy of product/service information' },
            { key: 'customerSatisfaction', label: 'Customer Satisfaction', max: 25, description: 'Overall customer experience and satisfaction levels' },
            { key: 'compliance', label: 'Compliance & Procedures', max: 25, description: 'Adherence to company policies and standard procedures' }
          ]
        };
    }
  };

  const scoringTemplate = getScoringTemplate(selectedTemplate);

  const handleTemplateChange = (newTemplate: string) => {
    setSelectedTemplate(newTemplate);
    setAuditorScores({
      technicalDiagnosis: 0,
      solutionProvision: 0,
      troubleshootingSteps: 0,
      technicalCommunication: 0,
      documentation: 0,
      needsAssessment: 0,
      objectionHandling: 0,
      valueProposition: 0,
      closingTechniques: 0,
      relationshipBuilding: 0,
      proactiveSupport: 0,
      retentionStrategies: 0,
      upsellingOpportunities: 0,
      feedbackCollection: 0,
      accountManagement: 0,
      communication: 0,
      productKnowledge: 0,
      customerSatisfaction: 0,
      compliance: 0,
      customerService: 0,
      technicalAccuracy: 0,
      salesEffectiveness: 0,
      problemResolution: 0,
      overall: 0,
      notes: auditorScores.notes
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    const newVolume = newValue as number;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: event.clientX - modalPosition.x,
      y: event.clientY - modalPosition.y
    });
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      setModalPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleSentimentChange = (event: SelectChangeEvent<string>) => {
    setSelectedSentiment(event.target.value);
  };

  const toggleLike = (index: number) => {
    setLikedTranscriptEntries(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp color="success" />;
      case 'down': return <TrendingDown color="error" />;
      default: return <BarChart color="info" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sales': return 'primary';
      case 'support': return 'info';
      case 'technical': return 'warning';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const mockTranscript = [
    { time: "0:00", speaker: "Agent", text: "Hello, thank you for calling Creditmann. This is Sarah, how can I help you today?" },
    { time: "0:05", speaker: "Customer", text: "Hi Sarah, I'm interested in learning about your personal loan options." },
    { time: "0:12", speaker: "Agent", text: "I'd be happy to help you with that! To provide you with the best options, could you tell me a bit about your current financial situation?" },
    { time: "0:20", speaker: "Customer", text: "Sure, I'm currently employed and looking to consolidate some existing debt." },
    { time: "0:28", speaker: "Agent", text: "That's a great reason to consider a personal loan. What's your approximate monthly income range?" },
    { time: "0:35", speaker: "Customer", text: "I make around $4,000 per month after taxes." },
    { time: "0:42", speaker: "Agent", text: "Perfect! Based on your income, you could qualify for a loan up to $25,000. Our rates start from 10.99% APR for qualified borrowers." },
    { time: "0:52", speaker: "Customer", text: "That sounds reasonable. What would the monthly payment be for a $15,000 loan?" },
    { time: "1:00", speaker: "Agent", text: "For a $15,000 loan at 12.5% APR over 36 months, your monthly payment would be approximately $502." },
    { time: "1:08", speaker: "Customer", text: "That works for my budget. How do I apply?" },
    { time: "1:15", speaker: "Agent", text: "Great! I can start your application right now. I'll need some basic information and then send you a secure link to complete the process." },
    { time: "1:25", speaker: "Customer", text: "Perfect, let's do it." },
    { time: "1:30", speaker: "Agent", text: "Excellent! I'm sending the application link to your email now. You should receive it within the next few minutes." }
  ];

  const filteredTranscript = selectedSentiment === 'all' 
    ? mockTranscript 
    : mockTranscript.filter(entry => entry.speaker.toLowerCase() === selectedSentiment);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <TeamLeaderSidebar activeItem="conversations" />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          width: { xs: '100%', md: 'calc(100% - 280px)' },
          marginLeft: { md: '280px' },
          bgcolor: 'grey.50', 
          minHeight: '100vh' 
        }}
      >
        {/* Header */}
        <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', px: 6, py: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                startIcon={<ArrowBack />}
                onClick={() => router.push("/team-leader-dashboard/conversations")}
                sx={{ textTransform: 'none' }}
              >
                Back to Conversations
              </Button>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Conversation Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {conversation.conversationId} • {conversation.date} at {conversation.time}
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <BookmarkBorder />
              </IconButton>
              <IconButton onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Download /></ListItemIcon>
                  <ListItemText>Export Transcript</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Refresh /></ListItemIcon>
                  <ListItemText>Refresh Analysis</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon><Settings /></ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </Paper>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: 'row', flexWrap: 'nowrap' }}>
            {/* Left Column */}
            <Box sx={{ flex: '0 0 41.67%', minWidth: 0, maxWidth: '41.67%' }}>
              <Stack spacing={3}>
                {/* Audio Player */}
                <Card sx={{ borderTop: 4, borderColor: 'primary.main' }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                      <IconButton
                        onClick={() => setIsPlaying(!isPlaying)}
                        sx={{ bgcolor: 'primary.main', color: 'white' }}
                      >
                        {isPlaying ? <Pause /> : <PlayArrow />}
                      </IconButton>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600">
                          {conversation.conversationId} - {conversation.agent}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {conversation.date} at {conversation.time} • Duration: {conversation.duration}
                        </Typography>
                      </Box>
                      <IconButton onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeOff /> : <VolumeUp />}
                      </IconButton>
                    </Stack>
                    
                    <Box sx={{ mb: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(currentTime / duration) * 100}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                      <Stack direction="row" justifyContent="space-between" mt={1}>
                        <Typography variant="caption">
                          {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
                        </Typography>
                        <Typography variant="caption">
                          {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
                        </Typography>
                      </Stack>
                    </Box>

                    <Stack direction="row" spacing={1} justifyContent="center">
                      <IconButton size="small">
                        <Phone />
                      </IconButton>
                      <IconButton size="small">
                        <Star />
                      </IconButton>
                      <IconButton size="small">
                        <Share />
                      </IconButton>
                      <IconButton size="small">
                        <Fullscreen />
                      </IconButton>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Transcript */}
                <Card sx={{ borderTop: 4, borderColor: 'success.main' }}>
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" fontWeight="600">
                        Transcript
                      </Typography>
                      <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Filter</InputLabel>
                        <Select
                          value={selectedSentiment}
                          label="Filter"
                          onChange={handleSentimentChange}
                        >
                          <MenuItem value="all">All</MenuItem>
                          <MenuItem value="agent">Agent</MenuItem>
                          <MenuItem value="customer">Customer</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                      {filteredTranscript.map((entry, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Chip 
                                label={entry.speaker} 
                                size="small" 
                                color={entry.speaker === 'Agent' ? 'primary' : 'secondary'}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {entry.time}
                              </Typography>
                            </Box>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleLike(index)}
                            >
                              {likedTranscriptEntries.includes(index) ? 
                                <Favorite color="error" /> : 
                                <FavoriteBorder />
                              }
                            </IconButton>
                          </Box>
                          <Typography variant="body2">
                            {entry.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Stack>
            </Box>

            {/* Right Column */}
            <Box sx={{ flex: '0 0 58.33%', minWidth: 0, maxWidth: '58.33%' }}>
              {/* Tabs */}
              <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                flexShrink: 0,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 48,
                }
              }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="AI score" value="ai-stats" />
                  <Tab label="Reviewer Score" value="reviewer" />
                </Tabs>
              </Box>

              {/* Tab Content */}
              <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                {activeTab === 'ai-stats' && (
                  <Card sx={{ 
                    borderRadius: 2, 
                    borderTop: '4px solid #ff9800',
                    height: 300,
                    width: '100%',
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxSizing: 'border-box'
                  }}>
                    <CardContent sx={{ 
                      flex: 1, 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3
                    }}>
                      <Avatar sx={{ 
                        bgcolor: 'primary.main', 
                        width: 80, 
                        height: 80, 
                        mb: 2,
                        fontSize: '2rem',
                        fontWeight: 'bold'
                      }}>
                        {conversation.score}
                      </Avatar>
                      <Typography variant="h5" fontWeight="600" gutterBottom>
                        AI Score
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Overall conversation quality assessment
                      </Typography>
                    </CardContent>
                  </Card>
                )}

                {activeTab === 'reviewer' && (
                  <Card sx={{ borderRadius: 2, borderTop: '4px solid #9c27b0' }}>
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" color="text.secondary" gutterBottom>
                          No Score
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          This conversation has not been manually scored yet
                        </Typography>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        p: 2,
                        bgcolor: 'grey.50',
                        borderRadius: 1,
                        mb: 3
                      }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {conversation.agent.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="600">
                              {conversation.agent}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {conversation.duration} • {conversation.category}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip
                          label={conversation.status}
                          color={getScoreColor(conversation.quality)}
                        />
                      </Box>

                      <Box sx={{ textAlign: 'center' }}>
                        <Button
                          variant="contained"
                          onClick={() => setShowAuditorScoring(true)}
                          size="large"
                          sx={{ textTransform: 'none' }}
                        >
                          Score this conversation
                        </Button>
                      </Box>

                      <Typography variant="caption" color="text.secondary" textAlign="center" display="block" sx={{ mt: 2 }}>
                        Manual scoring will be used to reconcile with AI-generated scores
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Box>
          </Box>
        </Container>

        {/* Scoring Modal */}
        <Modal
          open={showAuditorScoring}
          onClose={() => setShowAuditorScoring(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showAuditorScoring}>
            <Box sx={{
              position: 'absolute',
              top: modalPosition.y === 0 ? '50%' : 'auto',
              left: modalPosition.x === 0 ? '50%' : 'auto',
              transform: modalPosition.x === 0 && modalPosition.y === 0 ? 'translate(-50%, -50%)' : `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
              width: { xs: '95%', sm: '80%', md: '70%', lg: '60%' },
              maxWidth: '900px',
              minWidth: '600px',
              height: '80vh',
              maxHeight: '80vh',
              minHeight: '400px',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              resize: 'both',
              border: '2px solid',
              borderColor: 'primary.main',
              cursor: isDragging ? 'grabbing' : 'default'
            }}>
              {/* Modal Header */}
              <Box
                onMouseDown={handleMouseDown}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'primary.50',
                  cursor: 'grab',
                  '&:active': {
                    cursor: 'grabbing'
                  }
                }}>
                <Box>
                  <Typography variant="h6" fontWeight={600} color="primary.main">
                    Conversation Scoring
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                    Review and score conversation parameters
                  </Typography>
                </Box>
                <IconButton onClick={() => setShowAuditorScoring(false)} size="small">
                  <Close />
                </IconButton>
              </Box>

              {/* Modal Content */}
              <Box sx={{
                flex: 1,
                overflow: 'auto',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}>
                {/* Scoring Parameters - Single Accordion Layout */}
                <Box>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
                    Scoring Parameters
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                    Compare AI scores with your manual assessment
                  </Typography>

                  <Stack spacing={1}>
                    {scoringTemplate.criteria.map((criterion) => (
                      <Accordion key={criterion.key} sx={{ border: '1px solid', borderColor: 'divider' }}>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          sx={{
                            bgcolor: 'grey.50',
                            '&:hover': { bgcolor: 'grey.100' }
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', mr: 2 }}>
                            <Box sx={{ flex: 1 }}>
                              {/* Parameter Name */}
                              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                                {criterion.label}
                              </Typography>
                              {/* Parameter Description */}
                              <Typography variant="body2" color="text.secondary">
                                {criterion.description}
                              </Typography>
                            </Box>
                            {/* Score */}
                            <Typography variant="body2" color="text.secondary" sx={{ flexShrink: 0, ml: 2 }}>
                              Score: {auditorScores[criterion.key as keyof typeof auditorScores] || 0}/{criterion.max}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            {/* Scoring Inputs */}
                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                              {/* Score Input */}
                              <Box sx={{ flex: '0 0 120px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <TextField
                                    size="small"
                                    type="number"
                                    value={auditorScores[criterion.key as keyof typeof auditorScores] || 0}
                                    onChange={(e) =>
                                      setAuditorScores({
                                        ...auditorScores,
                                        [criterion.key]: parseInt(e.target.value) || 0
                                      })
                                    }
                                    inputProps={{ min: 0, max: criterion.max }}
                                    sx={{ width: 60 }}
                                  />
                                  <Typography variant="body2" color="text.secondary">
                                    / {criterion.max}
                                  </Typography>
                                </Box>
                              </Box>

                              {/* Reasons */}
                              <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                  Reasons & Feedback
                                </Typography>
                                <TextField
                                  fullWidth
                                  multiline
                                  rows={3}
                                  placeholder="Add comments or feedback for this parameter..."
                                  variant="outlined"
                                  size="small"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </Stack>
                </Box>

                {/* Total Score Display - AI vs Human */}
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="subtitle1" fontWeight={600} textAlign="center" gutterBottom sx={{ fontSize: '1rem' }}>
                    Total Score Comparison
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mt: 2 }}>
                    {/* AI Score */}
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'info.50', borderRadius: 1, border: '2px solid', borderColor: 'info.main' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        AI Score
                      </Typography>
                      <Typography variant="h3" fontWeight={700} color="info.main">
                        {scoringTemplate.criteria.reduce((total, criterion) => {
                          const score = auditorScores[criterion.key as keyof typeof auditorScores];
                          return total + (typeof score === 'number' ? score : 0);
                        }, 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        out of {scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)} points
                      </Typography>
                    </Box>

                    {/* Human Score */}
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: 'primary.50', borderRadius: 1, border: '2px solid', borderColor: 'primary.main' }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Reviewer Score
                      </Typography>
                      <Typography variant="h3" fontWeight={700} color="primary.main">
                        {scoringTemplate.criteria.reduce((total, criterion) => {
                          const score = auditorScores[criterion.key as keyof typeof auditorScores];
                          return total + (typeof score === 'number' ? score : 0);
                        }, 0)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        out of {scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)} points
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Modal Footer */}
              <Box sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
                bgcolor: 'grey.50',
                position: 'relative'
              }}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  onClick={() => setShowAuditorScoring(false)}
                  sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  onClick={() => {
                    const totalHumanScore = scoringTemplate.criteria.reduce((total, criterion) => {
                      const score = auditorScores[criterion.key as keyof typeof auditorScores];
                      return total + (typeof score === 'number' ? score : 0);
                    }, 0);
                    setSavedHumanScore(totalHumanScore);
                    console.log('Auditor Scores:', auditorScores);
                    alert('Scores saved successfully!');
                    setShowAuditorScoring(false);
                  }}
                  sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                >
                  Save scores
                </Button>

                {/* Resize Indicator */}
                <Box sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 24,
                  height: 24,
                  background: 'linear-gradient(135deg, transparent 40%, primary.main 40%, primary.main 50%, transparent 50%, transparent 60%, primary.main 60%)',
                  cursor: 'nw-resize',
                  opacity: 0.8,
                  '&:hover': {
                    opacity: 1,
                    background: 'linear-gradient(135deg, transparent 40%, primary.dark 40%, primary.dark 50%, transparent 50%, transparent 60%, primary.dark 60%)'
                  }
                }} />
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
}