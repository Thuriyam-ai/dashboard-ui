import { useState } from 'react';
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
  Drawer,
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
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface ConversationDetailsProps {
  conversation: {
    id: number;
    agent: string;
    customer: string;
    type: string;
    category: string;
    date: string;
    time: string;
    duration: string;
    status: string;
    rating: number | null;
    quality: number;
    talkRatio: number;
    interruptions: number;
    summary: string;
    tags: string[];
    conversationId: string;
    owner: string;
    account: string;
    score: number;
    scoreTrend: 'up' | 'down' | 'stable';
    previousScore?: number;
  };
  onBack: () => void;
}

const GradientCard = styled(Card)(({ theme }) => ({
  borderTop: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[1],
}));

const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  boxShadow: theme.shadows[3],
}));

export function ConversationDetails({ conversation, onBack }: ConversationDetailsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState(0);
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

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setVolume(isMuted ? 1 : 0);
  };

  const transcriptData = [
    { time: "0:00", speaker: "Agent", text: "Hello! This is Testbot from Creditmann. I wanted to talk to you about a loan offer that might interest you. Would you like to receive the details via SMS?", sentiment: "neutral" },
    { time: "0:11", speaker: "Customer", text: "Yes, I would be interested in hearing more about the loan offer.", sentiment: "positive" },
    { time: "0:18", speaker: "Agent", text: "Great! I'll send you the details via SMS. Can you confirm your mobile number?", sentiment: "positive" },
    { time: "0:25", speaker: "Customer", text: "Yes, it's +919482540097", sentiment: "neutral" },
    { time: "0:30", speaker: "Agent", text: "Perfect! I've sent you the loan details via SMS. The offer includes a personal loan of up to ₹5 lakhs with competitive interest rates.", sentiment: "positive" },
    { time: "0:45", speaker: "Customer", text: "That sounds good. What are the interest rates?", sentiment: "positive" },
    { time: "0:50", speaker: "Agent", text: "The interest rates start from 10.99% per annum for eligible customers. The exact rate will be determined based on your credit profile.", sentiment: "neutral" },
    { time: "1:05", speaker: "Customer", text: "How long does the approval process take?", sentiment: "neutral" },
    { time: "1:10", speaker: "Agent", text: "The approval process typically takes 24-48 hours for eligible customers. You'll receive an SMS confirmation once approved.", sentiment: "neutral" },
    { time: "1:25", speaker: "Customer", text: "That's quick. I'll wait for the SMS with the details.", sentiment: "positive" },
    { time: "1:30", speaker: "Agent", text: "Excellent! Is there anything else I can help you with today?", sentiment: "positive" },
    { time: "1:35", speaker: "Customer", text: "No, that's all. Thank you for the information.", sentiment: "positive" },
    { time: "1:40", speaker: "Agent", text: "You're welcome! Have a great day and thank you for choosing Creditmann!", sentiment: "positive" }
  ];

  const toggleLike = (index: number) => {
    setLikedTranscriptEntries(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredTranscriptData = transcriptData.filter(item =>
    selectedSentiment === 'all' || item.sentiment === selectedSentiment
  );

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 80) return 'warning';
    return 'error';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider', px: 6, py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<ArrowBack />}
              onClick={onBack}
              sx={{ color: 'text.secondary' }}
            >
              Back to Conversations
            </Button>
            <Divider orientation="vertical" flexItem />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {conversation.type} to {conversation.customer}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {conversation.conversationId} • {conversation.date} at {conversation.time}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" color="default">
              <Share />
            </IconButton>
            <IconButton size="small" color="default">
              <BookmarkBorder />
            </IconButton>
            <IconButton size="small" color="default">
              <MoreHoriz />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              {/* Audio Player */}
              <GradientCard>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <GradientAvatar>
                        <Phone />
                      </GradientAvatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          Audio Player
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Conversation Recording
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                  </Stack>

                  {/* Audio Controls */}
                  <Paper sx={{ bgcolor: 'grey.900', p: 2, borderRadius: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                          onClick={handlePlayPause}
                          sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                        >
                          {isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>
                        <Box>
                          <Typography variant="body2" color="white" fontWeight="500">
                            Conversation Recording
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'grey.400' }}>
                            {formatTime(currentTime)} / {formatTime(duration)}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton onClick={toggleMute} sx={{ color: 'white' }}>
                          {isMuted ? <VolumeOff /> : <VolumeUp />}
                        </IconButton>
                        <Slider
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          min={0}
                          max={1}
                          step={0.1}
                          sx={{ width: 80, color: 'white' }}
                        />
                        <IconButton sx={{ color: 'white' }}>
                          <Fullscreen />
                        </IconButton>
                      </Stack>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={(currentTime / duration) * 100}
                      sx={{ height: 4, borderRadius: 2 }}
                    />
                  </Paper>
                </CardContent>
              </GradientCard>

              {/* Transcript */}
              <Card sx={{ borderTop: 4, borderColor: 'success.main' }}>
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <Description />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          Transcript
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Conversation Text
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <FormControl size="small" sx={{ minWidth: 150 }}>
                        <Select
                          value={selectedSentiment}
                          onChange={(e) => setSelectedSentiment(e.target.value)}
                        >
                          <MenuItem value="all">All Sentiments</MenuItem>
                          <MenuItem value="positive">Positive</MenuItem>
                          <MenuItem value="neutral">Neutral</MenuItem>
                          <MenuItem value="negative">Negative</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton size="small">
                        <Download />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <Stack spacing={2}>
                      {filteredTranscriptData.map((item, originalIndex) => {
                        const actualIndex = transcriptData.findIndex(t => t === item);
                        return (
                          <Paper
                            key={actualIndex}
                            elevation={0}
                            sx={{
                              p: 2,
                              '&:hover': { bgcolor: 'grey.50' },
                              transition: 'background-color 0.2s'
                            }}
                          >
                            <Stack direction="row" spacing={2}>
                              <Typography
                                variant="caption"
                                sx={{ fontFamily: 'monospace', minWidth: 48, color: 'text.secondary' }}
                              >
                                {item.time}
                              </Typography>
                              <Box flex={1}>
                                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                  <Typography variant="body2" fontWeight="500">
                                    {item.speaker === 'Agent' ? conversation.agent : item.speaker}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">•</Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {item.speaker === 'Agent' ? 'Agent' : 'Customer'}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">•</Typography>
                                  <Chip
                                    label={item.sentiment}
                                    size="small"
                                    color={getSentimentColor(item.sentiment) as any}
                                  />
                                </Stack>
                                <Typography variant="body2" color="text.secondary">
                                  {item.text}
                                </Typography>
                              </Box>
                              <IconButton
                                size="small"
                                onClick={() => toggleLike(actualIndex)}
                                color={likedTranscriptEntries.includes(actualIndex) ? 'error' : 'default'}
                              >
                                {likedTranscriptEntries.includes(actualIndex) ? <Favorite /> : <FavoriteBorder />}
                              </IconButton>
                            </Stack>
                          </Paper>
                        );
                      })}
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} lg={7}>
            <Card sx={{ borderTop: 4, borderColor: 'secondary.main' }}>
              <CardContent>
                <Tabs
                  value={activeAnalysisTab}
                  onChange={(_e, newValue) => setActiveAnalysisTab(newValue)}
                  sx={{ mb: 3 }}
                >
                  <Tab label="Stats" />
                  <Tab label="AI Insights" />
                  <Tab label="Snippets" />
                  <Tab label="Topics" />
                  <Tab label="Audit" />
                </Tabs>

                {/* Stats Tab */}
                {activeAnalysisTab === 0 && (
                  <Stack spacing={3}>
                    {/* Score Card */}
                    <Paper sx={{ bgcolor: 'secondary.50', p: 3 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <Star />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="600">
                              Score
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Overall Quality Assessment
                            </Typography>
                          </Box>
                        </Stack>
                        <Avatar
                          sx={{
                            width: 64,
                            height: 64,
                            bgcolor: `${getScoreColor(conversation.score)}.main`,
                            fontSize: '1.5rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {conversation.score}
                        </Avatar>
                      </Stack>

                      <Grid container spacing={2} textAlign="center">
                        <Grid item xs={4}>
                          {savedHumanScore !== null ? (
                            <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
                              <Box textAlign="center">
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mx: 'auto', mb: 0.5 }}>
                                  <ShowChart fontSize="small" />
                                </Avatar>
                                <Typography
                                  variant="body2"
                                  fontWeight="bold"
                                  color={`${getScoreColor(conversation.score)}.main`}
                                >
                                  {conversation.score}
                                </Typography>
                              </Box>
                              <Box textAlign="center">
                                <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, mx: 'auto', mb: 0.5 }}>
                                  <Person fontSize="small" />
                                </Avatar>
                                <Typography
                                  variant="body2"
                                  fontWeight="bold"
                                  color={`${getScoreColor(savedHumanScore)}.main`}
                                >
                                  {savedHumanScore}
                                </Typography>
                              </Box>
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1} justifyContent="center" mb={1}>
                              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                                <ShowChart fontSize="small" />
                              </Avatar>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color={`${getScoreColor(conversation.score)}.main`}
                                sx={{ lineHeight: '32px' }}
                              >
                                {conversation.score}
                              </Typography>
                            </Stack>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            Agent Score
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" fontWeight="600">
                            {conversation.rating || 'N/A'}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Customer Rating
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant="h6" fontWeight="600" color="success.main">
                            {conversation.status}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Status
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>

                    {/* Metrics Grid */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Paper sx={{ bgcolor: 'grey.50', p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Person fontSize="small" color="action" />
                            <Typography variant="body2" fontWeight="500">
                              Talk Ratio
                            </Typography>
                          </Stack>
                          <Typography variant="h5" fontWeight="bold">
                            {conversation.talkRatio}%
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ bgcolor: 'grey.50', p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Timer fontSize="small" color="action" />
                            <Typography variant="body2" fontWeight="500">
                              Duration
                            </Typography>
                          </Stack>
                          <Typography variant="h5" fontWeight="bold">
                            {conversation.duration}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ bgcolor: 'grey.50', p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Mic fontSize="small" color="action" />
                            <Typography variant="body2" fontWeight="500">
                              Interruptions
                            </Typography>
                          </Stack>
                          <Typography variant="h5" fontWeight="bold">
                            {conversation.interruptions}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={6}>
                        <Paper sx={{ bgcolor: 'grey.50', p: 2 }}>
                          <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                            <Message fontSize="small" color="action" />
                            <Typography variant="body2" fontWeight="500">
                              Category
                            </Typography>
                          </Stack>
                          <Typography variant="body1" fontWeight="bold">
                            {conversation.category}
                          </Typography>
                        </Paper>
                      </Grid>
                    </Grid>

                    {/* Agent Performance */}
                    <Paper sx={{ bgcolor: 'primary.50', p: 3 }}>
                      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <ShowChart />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            Agent Performance
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {conversation.owner}
                          </Typography>
                        </Box>
                      </Stack>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Quality Score
                          </Typography>
                          <Stack direction="row" spacing={1} alignItems="center">
                            {conversation.scoreTrend === 'up' && <TrendingUp color="success" fontSize="small" />}
                            {conversation.scoreTrend === 'down' && <TrendingDown color="error" fontSize="small" />}
                            <Typography variant="body2" fontWeight="600">
                              {conversation.quality}/100
                            </Typography>
                          </Stack>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Call Efficiency
                          </Typography>
                          <Typography variant="body2" fontWeight="600" color="success.main">
                            High
                          </Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            Customer Satisfaction
                          </Typography>
                          <Typography variant="body2" fontWeight="600">
                            {conversation.rating || 'N/A'}/5
                          </Typography>
                        </Stack>
                      </Stack>
                    </Paper>
                  </Stack>
                )}

                {/* AI Insights Tab */}
                {activeAnalysisTab === 1 && (
                  <Paper sx={{ bgcolor: 'success.50', p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                      <Avatar sx={{ bgcolor: 'success.main' }}>
                        <CenterFocusStrong />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          AI Insights
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Automated Analysis
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={2}>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="body2" fontWeight="500" mb={2}>
                          Key Topics Identified
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <Chip label="Loan Offer" color="primary" size="small" />
                          <Chip label="SMS Details" color="success" size="small" />
                          <Chip label="Interest Rates" color="secondary" size="small" />
                          <Chip label="Approval Process" color="warning" size="small" />
                        </Stack>
                      </Paper>
                      <Paper sx={{ p: 2 }}>
                        <Typography variant="body2" fontWeight="500" mb={2}>
                          Sentiment Analysis
                        </Typography>
                        <Grid container spacing={2} textAlign="center">
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="bold" color="success.main">
                              6
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Positive
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="bold" color="warning.main">
                              4
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Neutral
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography variant="h6" fontWeight="bold" color="error.main">
                              0
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Negative
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Stack>
                  </Paper>
                )}

                {/* Snippets Tab */}
                {activeAnalysisTab === 2 && (
                  <Paper sx={{ bgcolor: 'warning.50', p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                      <Avatar sx={{ bgcolor: 'warning.main' }}>
                        <Description />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          Conversation Snippets
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Key Moments
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={2}>
                      <Paper sx={{ p: 2, borderLeft: 4, borderColor: 'primary.main' }}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          0:00 - Agent
                        </Typography>
                        <Typography variant="body2">
                          "Hello! This is Testbot from Creditmann. I wanted to talk to you about a loan offer..."
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, borderLeft: 4, borderColor: 'success.main' }}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          0:11 - Customer
                        </Typography>
                        <Typography variant="body2">
                          "Yes, I would be interested in hearing more about the loan offer."
                        </Typography>
                      </Paper>
                      <Paper sx={{ p: 2, borderLeft: 4, borderColor: 'secondary.main' }}>
                        <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                          1:05 - Customer
                        </Typography>
                        <Typography variant="body2">
                          "How long does the approval process take?"
                        </Typography>
                      </Paper>
                    </Stack>
                  </Paper>
                )}

                {/* Topics Tab */}
                {activeAnalysisTab === 3 && (
                  <Paper sx={{ bgcolor: 'secondary.50', p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <BarChart />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          Topic Analysis
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Conversation Themes
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack spacing={2}>
                      <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" fontWeight="500">
                            Loan Information
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            45%
                          </Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={45} sx={{ height: 8, borderRadius: 4 }} />
                      </Paper>
                      <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" fontWeight="500">
                            Customer Queries
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            30%
                          </Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={30} color="success" sx={{ height: 8, borderRadius: 4 }} />
                      </Paper>
                      <Paper sx={{ p: 2 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                          <Typography variant="body2" fontWeight="500">
                            Process Details
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            25%
                          </Typography>
                        </Stack>
                        <LinearProgress variant="determinate" value={25} color="secondary" sx={{ height: 8, borderRadius: 4 }} />
                      </Paper>
                    </Stack>
                  </Paper>
                )}

                {/* Audit Tab */}
                {activeAnalysisTab === 4 && (
                  <Paper sx={{ bgcolor: 'error.50', p: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                      <Avatar sx={{ bgcolor: 'error.main' }}>
                        <CheckCircle />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="600">
                          {scoringTemplate.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {scoringTemplate.description}
                        </Typography>
                      </Box>
                    </Stack>
                    <Paper sx={{ p: 3 }}>
                      <Box textAlign="center" mb={3}>
                        <Typography variant="h3" fontWeight="bold" color="text.disabled" mb={1}>
                          No Score
                        </Typography>
                        <Typography variant="body2" color="text.secondary" mb={3}>
                          This conversation has not been manually scored yet
                        </Typography>
                      </Box>

                      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarToday fontSize="small" color="warning" />
                              <Typography variant="body2">Pending Review</Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Star fontSize="small" color="primary" />
                              <Typography variant="body2">{conversation.score}/100</Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarToday fontSize="small" color="action" />
                              <Typography variant="body2">Never</Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Message fontSize="small" color="secondary" />
                              <Typography variant="body2">{conversation.type}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Timer fontSize="small" color="success" />
                              <Typography variant="body2">{conversation.duration}</Typography>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Person fontSize="small" color="primary" />
                              <Typography variant="body2">{conversation.agent}</Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Paper>

                      <Box textAlign="center" mb={2}>
                        <Button
                          variant="contained"
                          onClick={() => setShowAuditorScoring(true)}
                          size="large"
                        >
                          Score this conversation
                        </Button>
                      </Box>

                      <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
                        Manual scoring will be used to reconcile with AI-generated scores
                      </Typography>
                    </Paper>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Post Call Summary */}
        <Card sx={{ borderTop: 4, borderColor: 'success.main', mt: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <GradientAvatar sx={{ width: 48, height: 48, bgcolor: 'success.main' }}>
                  <Description />
                </GradientAvatar>
                <Box>
                  <Typography variant="h6" fontWeight="600">
                    Post Call Summary
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    AI-Generated Analysis
                  </Typography>
                </Box>
              </Stack>
              <IconButton size="small">
                <Download />
              </IconButton>
            </Stack>

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Paper sx={{ bgcolor: 'primary.50', p: 3 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircle fontSize="small" color="primary" />
                      <span>Key Points Discussed</span>
                    </Stack>
                  </Typography>
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0
                        }}
                      />
                      <Typography variant="body2">
                        Customer expressed interest in personal loan offer from Creditmann
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0
                        }}
                      />
                      <Typography variant="body2">
                        Loan details sent via SMS to customer's mobile number (+919482540097)
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0
                        }}
                      />
                      <Typography variant="body2">
                        Interest rates start from 10.99% per annum for eligible customers
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0
                        }}
                      />
                      <Typography variant="body2">
                        Approval process typically takes 24-48 hours
                      </Typography>
                    </Stack>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ bgcolor: 'success.50', p: 3 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Favorite fontSize="small" color="success" />
                      <span>Customer Sentiment</span>
                    </Stack>
                  </Typography>
                  <Grid container spacing={1} textAlign="center" mb={2}>
                    <Grid item xs={4}>
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        6
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Positive
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h5" fontWeight="bold" color="warning.main">
                        4
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Neutral
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="h5" fontWeight="bold" color="error.main">
                        0
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Negative
                      </Typography>
                    </Grid>
                  </Grid>
                  <Paper sx={{ p: 2, bgcolor: 'white' }}>
                    <Typography variant="body2">
                      <Typography component="span" fontWeight="500">
                        Overall:
                      </Typography>{' '}
                      Customer showed strong interest and positive engagement throughout the conversation.
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ bgcolor: 'warning.50', p: 3 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CenterFocusStrong fontSize="small" color="warning" />
                      <span>Action Items</span>
                    </Stack>
                  </Typography>
                  <Stack spacing={1.5}>
                    <Paper sx={{ p: 1.5, bgcolor: 'white' }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'success.main',
                            borderRadius: '50%'
                          }}
                        />
                        <Typography variant="body2" flex={1}>
                          SMS sent with loan details
                        </Typography>
                        <Chip label="Completed" color="success" size="small" />
                      </Stack>
                    </Paper>
                    <Paper sx={{ p: 1.5, bgcolor: 'white' }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'warning.main',
                            borderRadius: '50%'
                          }}
                        />
                        <Typography variant="body2" flex={1}>
                          Monitor customer response
                        </Typography>
                        <Chip label="Pending" color="warning" size="small" />
                      </Stack>
                    </Paper>
                    <Paper sx={{ p: 1.5, bgcolor: 'white' }}>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            bgcolor: 'primary.main',
                            borderRadius: '50%'
                          }}
                        />
                        <Typography variant="body2" flex={1}>
                          Follow up in 24-48h
                        </Typography>
                        <Chip label="Scheduled" color="primary" size="small" />
                      </Stack>
                    </Paper>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={3}>
                <Paper sx={{ bgcolor: 'secondary.50', p: 3 }}>
                  <Typography variant="subtitle2" fontWeight="600" mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Star fontSize="small" color="secondary" />
                      <span>Quality Assessment</span>
                    </Stack>
                  </Typography>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: 'white', textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                          Excellent
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Agent Performance
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: 'white', textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                          High
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Engagement
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  <Paper sx={{ p: 2, bgcolor: 'white' }}>
                    <Typography variant="body2">
                      <Typography component="span" fontWeight="500">
                        Summary:
                      </Typography>{' '}
                      Agent demonstrated excellent product knowledge and maintained positive engagement.
                    </Typography>
                  </Paper>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      {/* Auditor Scoring Drawer */}
      <Drawer
        anchor="right"
        open={showAuditorScoring}
        onClose={() => setShowAuditorScoring(false)}
        PaperProps={{ sx: { width: 400 } }}
      >
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" fontWeight="600">
                Auditor Scoring
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manually score this conversation
              </Typography>
            </Box>
            <IconButton onClick={() => setShowAuditorScoring(false)}>
              <Close />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ p: 3, overflowY: 'auto', flex: 1 }}>
          <Stack spacing={3}>
            {/* Conversation Info */}
            <Paper sx={{ bgcolor: 'grey.50', p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={2}>
                Conversation Details
              </Typography>
              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Agent:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {conversation.agent}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Duration:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {conversation.duration}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    Category:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {conversation.category}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    AI Score:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {conversation.score}/100
                  </Typography>
                </Stack>
              </Stack>
            </Paper>

            {/* Template Selection */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={2}>
                Quality Template
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Select Template</InputLabel>
                <Select
                  value={selectedTemplate}
                  label="Select Template"
                  onChange={(e) => handleTemplateChange(e.target.value)}
                >
                  <MenuItem value="technical support">Technical Support</MenuItem>
                  <MenuItem value="sales/tech sales">Sales/Tech Sales</MenuItem>
                  <MenuItem value="customer success">Customer Success</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Select>
              </FormControl>
            </Paper>

            {/* Scoring Criteria */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={2}>
                Scoring Criteria
              </Typography>
              <Stack spacing={3}>
                {scoringTemplate.criteria.map((criterion) => (
                  <Box key={criterion.key}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {criterion.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {criterion.description}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="600" color="primary.main">
                        {auditorScores[criterion.key as keyof typeof auditorScores] || 0}/{criterion.max}
                      </Typography>
                    </Stack>
                    <Slider
                      value={auditorScores[criterion.key as keyof typeof auditorScores] || 0}
                      onChange={(_e, value) =>
                        setAuditorScores({
                          ...auditorScores,
                          [criterion.key]: value as number
                        })
                      }
                      min={0}
                      max={criterion.max}
                      marks
                      valueLabelDisplay="auto"
                    />
                    {criterion !== scoringTemplate.criteria[scoringTemplate.criteria.length - 1] && (
                      <Divider sx={{ mt: 2 }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>

            {/* Overall Score */}
            <Paper sx={{ bgcolor: 'primary.50', p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={2}>
                Overall Score
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  {scoringTemplate.criteria.reduce((total, criterion) => {
                    const score = auditorScores[criterion.key as keyof typeof auditorScores];
                    return total + (typeof score === 'number' ? score : 0);
                  }, 0)}/{scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((scoringTemplate.criteria.reduce((total, criterion) => {
                    const score = auditorScores[criterion.key as keyof typeof auditorScores];
                    return total + (typeof score === 'number' ? score : 0);
                  }, 0) / scoringTemplate.criteria.reduce((total, criterion) => total + criterion.max, 0)) * 100)}%
                </Typography>
              </Stack>
            </Paper>

            {/* Notes */}
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="600" mb={2}>
                Audit Notes
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Add your observations and recommendations..."
                value={auditorScores.notes}
                onChange={(e) =>
                  setAuditorScores({ ...auditorScores, notes: e.target.value })
                }
              />
            </Paper>
          </Stack>
        </Box>

        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setShowAuditorScoring(false)}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
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
            >
              Save scores
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
