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
  Divider,
  InputAdornment,
  Snackbar,
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
  PlaylistAddCheck,
  DoneAll,
  Schedule,
  Save,
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

const extractDate = (date: { $date: string } | string | undefined): string => {
  if (typeof date === "object" && date && "$date" in date) return date.$date;
  return (date as string) || new Date().toISOString();
};

interface UIEnhancedConversationDetail {
  id: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  status: "completed" | "in-progress" | "failed" | string;
  qualityScore: number;
  talkToListenRatio: number;
  campaign: string;
  team: string;
  disposition: string;
  btaScore: number;
  lcaScore: number;
  sentiment: "positive" | "neutral" | "negative";
  fillerWords: number;
  interruptions: number;
  keyTopics: string[];
  audioUrl: string;
  scorecard: ConversationScorecard;
  outcome: ConversationOutcome;
}

interface ConversationData {
  detail: UIEnhancedConversationDetail;
}

type TabValue = "conversation" | "scorecard" | "outcomes";

type ScorecardReviewState = {
  [parameter: string]: { score: string; reason: string };
};

type OutcomeReviewState = {
  [attribute_name: string]: { value: string; reason: string };
};

const mapToUI = (
  apiData: ConversationDetailResponse
): UIEnhancedConversationDetail => {
  const scorecard = apiData.analytics_data?.scorecard || {};
  const outcome = apiData.analytics_data?.outcome || {};
  const callTimestamp = extractDate(apiData.call_timestamp);

  return {
    id: apiData.conversation_id,
    agentName: "Kavya Reddy",
    customerName: "Rajesh Kumar",
    duration: `${Math.floor(apiData.length_in_sec / 60)}:${(
      apiData.length_in_sec % 60
    )
      .toString()
      .padStart(2, "0")}`,
    date: callTimestamp,
    status: (apiData.avyukta_status || "completed").toLowerCase() as any,
    qualityScore: apiData.QC_score,
    talkToListenRatio: 0.58,
    campaign: "Customer Support",
    team: "Technical Support",
    disposition: apiData.lamh_disposition,
    btaScore: 88,
    lcaScore: 85,
    sentiment: "positive",
    fillerWords: 3,
    interruptions: 1,
    keyTopics: ["Account Access", "Password Reset", "Security Settings"],
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

  const [conversationData, setConversationData] =
    useState<ConversationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabValue>("conversation");

  const [scorecardReviews, setScorecardReviews] =
    useState<ScorecardReviewState>({});
  const [outcomeReviews, setOutcomeReviews] = useState<OutcomeReviewState>({});

  // --- UPDATED STATE FOR INDIVIDUAL ITEM SAVING ---
  const [savingItemId, setSavingItemId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const conversationId = searchParams.get("id");

  useEffect(() => {
    if (!conversationId) {
      setLoading(false);
      setError("Conversation ID is missing from the URL.");
      return;
    }

    const fetchAllDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const detailResponse = await getConversationDetail(conversationId);
        const mappedData = mapToUI(detailResponse);
        setConversationData({ detail: mappedData });

        const initialScorecardReviews: ScorecardReviewState = {};
        Object.values(mappedData.scorecard).forEach((param) => {
          initialScorecardReviews[param.parameter] = { score: "", reason: "" };
        });
        setScorecardReviews(initialScorecardReviews);

        const initialOutcomeReviews: OutcomeReviewState = {};
        Object.values(mappedData.outcome).forEach((field) => {
          initialOutcomeReviews[field.attribute_name] = {
            value: "",
            reason: "",
          };
        });
        setOutcomeReviews(initialOutcomeReviews);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [conversationId]);

  const handleScorecardReviewChange = (
    parameter: string,
    field: "score" | "reason",
    value: string
  ) => {
    setScorecardReviews((prev) => ({
      ...prev,
      [parameter]: { ...prev[parameter], [field]: value },
    }));
  };

  const handleOutcomeReviewChange = (
    attribute_name: string,
    field: "value" | "reason",
    value: string
  ) => {
    setOutcomeReviews((prev) => ({
      ...prev,
      [attribute_name]: { ...prev[attribute_name], [field]: value },
    }));
  };

  // --- NEW HANDLERS FOR INDIVIDUAL SAVES ---
  const handleSaveScorecardItem = (parameter: string) => {
    setSavingItemId(parameter);
    console.log(
      `Saving review for parameter: "${parameter}"`,
      scorecardReviews[parameter]
    );

    setTimeout(() => {
      setSavingItemId(null);
      setSnackbarMessage(`Review for "${parameter}" saved successfully!`);
      setSnackbarOpen(true);
    }, 1500);
  };

  const handleSaveOutcomeItem = (attribute: string) => {
    setSavingItemId(attribute);
    console.log(
      `Saving review for outcome: "${attribute}"`,
      outcomeReviews[attribute]
    );

    setTimeout(() => {
      setSavingItemId(null);
      setSnackbarMessage(`Review for "${attribute}" saved successfully!`);
      setSnackbarOpen(true);
    }, 1500);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: TabValue) =>
    setActiveTab(newValue);
  const handleBackToConversations = () =>
    router.push("/team-leader-dashboard/conversations");
  const getStatusColor = (status: string) =>
    ({ completed: "success", "in-progress": "info", failed: "error" }[status] ||
    "default");
  const getStatusIcon = (status: string) =>
    ({
      completed: <CheckCircle />,
      "in-progress": <Schedule />,
      failed: <Cancel />,
    }[status] || <Warning />);
  const getSentimentColor = (sentiment: string) =>
    ({ positive: "success", neutral: "info", negative: "error" }[sentiment] ||
    "default");
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading conversation details...</Typography>
      </Box>
    );
  }

  if (error || !conversationData) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Alert severity="error">
          <AlertTitle>Error Loading Conversation</AlertTitle>
          {error ||
            `Conversation details could not be loaded for ID: ${conversationId}.`}
          <Button onClick={handleBackToConversations} sx={{ ml: 2 }}>
            Go Back
          </Button>
        </Alert>
      </Container>
    );
  }

  const { detail } = conversationData;
  const scorecardParams = Object.values(
    detail.scorecard
  ) as ScorecardParameterAnalysis[];
  const outcomeFields = Object.values(detail.outcome);
  const totalPossibleScore = scorecardParams.reduce(
    (sum, param) => sum + param.max_score,
    0
  );
  const totalAchievedScore = scorecardParams.reduce(
    (sum, param) => sum + param.score,
    0
  );
  const scorecardPercentage =
    totalPossibleScore > 0
      ? (totalAchievedScore / totalPossibleScore) * 100
      : 0;

  const getScoreColor = (score: number, max: number) => {
    const percentage = max > 0 ? (score / max) * 100 : 0;
    if (percentage >= 80) return "success";
    if (percentage >= 50) return "warning";
    return "error";
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <TeamLeaderSidebar activeItem="conversations" />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          marginLeft: "280px",
        }}
      >
        <AppBar
          position="static"
          elevation={1}
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
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
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", color: "text.secondary" }}
              >
                conversation-detail.localhost:3001
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
                <BookmarkBorder />
              </IconButton>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mr: 2 }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                    fontSize: "0.875rem",
                  }}
                >
                  W
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  Work
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: "text.secondary" }}>
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
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              Conversation Analysis: {detail.id}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {detail.agentName} ↔ {detail.customerName}
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
              <Chip
                icon={getStatusIcon(detail.status)}
                label={
                  detail.status.charAt(0).toUpperCase() + detail.status.slice(1)
                }
                color={getStatusColor(detail.status) as any}
                size="small"
              />
              <Chip label={detail.team} size="small" variant="outlined" />
              <Chip label={detail.campaign} size="small" variant="outlined" />
              <Typography variant="body2" color="text.secondary">
                {formatDate(detail.date)} • {detail.duration}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Overall Quality Score
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="primary">
                        {detail.qualityScore}
                      </Typography>
                    </Box>
                    <Assessment sx={{ fontSize: 40, color: "primary.main" }} />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={detail.qualityScore}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    color={detail.qualityScore >= 80 ? "success" : "warning"}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        LCA Score
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        color="warning.main"
                      >
                        {detail.lcaScore}
                      </Typography>
                    </Box>
                    <Analytics sx={{ fontSize: 40, color: "warning.main" }} />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={detail.lcaScore}
                    sx={{ mt: 1, height: 8, borderRadius: 4 }}
                    color={detail.lcaScore >= 80 ? "success" : "warning"}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Sentiment
                      </Typography>
                      <Typography
                        variant="h4"
                        fontWeight={700}
                        color={`${getSentimentColor(detail.sentiment)}.main`}
                      >
                        {detail.sentiment.charAt(0).toUpperCase() +
                          detail.sentiment.slice(1)}
                      </Typography>
                    </Box>
                    <Chat
                      sx={{
                        fontSize: 40,
                        color: `${getSentimentColor(detail.sentiment)}.main`,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Disposition
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {detail.disposition}
                      </Typography>
                    </Box>
                    <DoneAll sx={{ fontSize: 40, color: "success.main" }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Conversation Playback & Transcript
              </Typography>
              <Box
                sx={{
                  p: 2,
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  backgroundColor: "action.hover",
                }}
              >
                <audio controls style={{ width: "100%" }}>
                  <source src={detail.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </Box>
              <Card variant="outlined" sx={{ mt: 2 }}>
                <CardContent>
                  <Box sx={{ height: 200, overflow: "auto" }}>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={`Agent: ${detail.agentName}`}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        00:00 - 00:15
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      "Hello Mr. Kumar, thank you for calling..."
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={`Customer: ${detail.customerName}`}
                        size="small"
                        color="secondary"
                        sx={{ mr: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        00:15 - 00:45
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      "Hi Kavya, I'm having trouble logging in..."
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        label={`Agent: ${detail.agentName}`}
                        size="small"
                        color="primary"
                        sx={{ mr: 1 }}
                      />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                      >
                        00:45 - 01:20
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      "I understand your frustration..."
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab
                  icon={<Chat />}
                  label="Conversation Analysis"
                  value="conversation"
                  iconPosition="start"
                />
                <Tab
                  icon={<PlaylistAddCheck />}
                  label="Scorecard"
                  value="scorecard"
                  iconPosition="start"
                />
                <Tab
                  icon={<DoneAll />}
                  label="Outcomes"
                  value="outcomes"
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            <CardContent sx={{ p: 0 }}>
              {activeTab === "conversation" && (
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    Call Analysis Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Speaker Timeline
                      </Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Box
                            sx={{
                              height: 150,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="h4"
                                color="primary"
                                fontWeight={700}
                              >
                                {Math.round(detail.talkToListenRatio * 100)}%
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Agent Talk Ratio
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={detail.talkToListenRatio * 100}
                                sx={{ mt: 1, height: 8, borderRadius: 4 }}
                                color="primary"
                              />
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>
                        Call Metrics
                      </Typography>
                      <Card variant="outlined">
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography
                                  variant="h5"
                                  color="error.main"
                                  fontWeight={700}
                                >
                                  {detail.interruptions}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Interruptions
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={6}>
                              <Box sx={{ textAlign: "center" }}>
                                <Typography
                                  variant="h5"
                                  color="warning.main"
                                  fontWeight={700}
                                >
                                  {detail.fillerWords}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
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

              {activeTab === "scorecard" && (
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    Agent Performance Scorecard
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Total QC Score: {detail.qualityScore} /{" "}
                        {Math.round(scorecardPercentage)}% Adherence
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={scorecardPercentage}
                        sx={{ mt: 1, height: 10, borderRadius: 4, mb: 3 }}
                        color={scorecardPercentage >= 80 ? "success" : "error"}
                      />
                      <Grid container spacing={3} alignItems="stretch">
                        {scorecardParams.map((param, index) => {
                          const maxScore = param.max_score;
                          const scoreColor = getScoreColor(
                            param.score,
                            maxScore
                          );
                          const isSavingThis = savingItemId === param.parameter;
                          return (
                            <Grid item xs={12} md={6} lg={4} key={index}>
                              <Card
                                variant="elevation"
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <CardContent
                                  sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="subtitle1"
                                      fontWeight={600}
                                    >
                                      {param.parameter}
                                    </Typography>
                                    <Chip
                                      label={`Score: ${param.score}/${maxScore}`}
                                      color={scoreColor as any}
                                      size="small"
                                    />
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ mt: 1, mb: 1, fontStyle: "italic" }}
                                  >
                                    {param.explanation}
                                  </Typography>
                                  <Box sx={{ mt: 2, mb: 2 }}>
                                    <Typography
                                      variant="caption"
                                      fontWeight={600}
                                    >
                                      Rule Analysis:
                                    </Typography>
                                    {param.sub_rule_analysis.map(
                                      (rule, idx) => (
                                        <Box
                                          key={idx}
                                          sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            mt: 0.5,
                                            fontSize: "0.75rem",
                                          }}
                                        >
                                          {rule.status === "Pass" ? (
                                            <CheckCircle
                                              color="success"
                                              sx={{
                                                fontSize: 14,
                                                mr: 0.5,
                                                mt: "2px",
                                                flexShrink: 0,
                                              }}
                                            />
                                          ) : (
                                            <Cancel
                                              color="error"
                                              sx={{
                                                fontSize: 14,
                                                mr: 0.5,
                                                mt: "2px",
                                                flexShrink: 0,
                                              }}
                                            />
                                          )}
                                          <Box>
                                            <Typography
                                              variant="caption"
                                              sx={{ fontWeight: 500 }}
                                            >
                                              {rule.rule}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                              display="block"
                                            >
                                              **Reason:** {rule.reason}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                  <Divider sx={{ my: 2 }}>
                                    <Chip label="Manual Review" size="small" />
                                  </Divider>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                      label="Reviewer Score"
                                      type="number"
                                      size="small"
                                      value={
                                        scorecardReviews[param.parameter]
                                          ?.score || ""
                                      }
                                      onChange={(e) =>
                                        handleScorecardReviewChange(
                                          param.parameter,
                                          "score",
                                          e.target.value
                                        )
                                      }
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            / {maxScore}
                                          </InputAdornment>
                                        ),
                                        inputProps: { min: 0, max: maxScore },
                                      }}
                                      sx={{ width: 120, mb: 2 }}
                                    />
                                    <TextField
                                      label="Reason for Change"
                                      multiline
                                      rows={2}
                                      size="small"
                                      fullWidth
                                      value={
                                        scorecardReviews[param.parameter]
                                          ?.reason || ""
                                      }
                                      onChange={(e) =>
                                        handleScorecardReviewChange(
                                          param.parameter,
                                          "reason",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Box>
                                  <Box
                                    sx={{
                                      mt: 2,
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                  >
                                    <Button
                                      variant="contained"
                                      size="small"
                                      disabled={isSavingThis}
                                      startIcon={
                                        isSavingThis ? (
                                          <CircularProgress
                                            size={16}
                                            color="inherit"
                                          />
                                        ) : (
                                          <Save />
                                        )
                                      }
                                      onClick={() =>
                                        handleSaveScorecardItem(param.parameter)
                                      }
                                    >
                                      {isSavingThis ? "Saving..." : "Save"}
                                    </Button>
                                  </Box>
                                </CardContent>
                              </Card>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
              )}

              {activeTab === "outcomes" && (
                <Box sx={{ p: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    sx={{ mb: 3 }}
                  >
                    Call Outcomes and Extracted Metadata
                  </Typography>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Disposition: **{detail.disposition}**
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        The final disposition from the conversation data.
                      </Typography>
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          Outcome Fields Extracted
                        </Typography>
                        {outcomeFields.length > 0 ? (
                          <Grid container spacing={3}>
                            {outcomeFields.map((field, index) => {
                              let displayValue = String(
                                field.extracted_value ?? "N/A"
                              );
                              if (typeof field.extracted_value === "boolean")
                                displayValue = field.extracted_value
                                  ? "Yes"
                                  : "No";
                              const isSavingThis =
                                savingItemId === field.attribute_name;
                              return (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                  <Card
                                    variant="outlined"
                                    sx={{
                                      height: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <CardContent
                                      sx={{
                                        flexGrow: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <TextField
                                        fullWidth
                                        label={`Extracted: ${field.attribute_name}`}
                                        variant="outlined"
                                        value={displayValue}
                                        InputProps={{ readOnly: true }}
                                        sx={{ mb: 2 }}
                                        helperText={`**Reasoning:** ${field.reasoning}`}
                                        multiline
                                        rows={2}
                                      />
                                      <Divider sx={{ my: 1 }} />
                                      <Box sx={{ flexGrow: 1 }}>
                                        <TextField
                                          label="Reviewer Outcome"
                                          fullWidth
                                          variant="filled"
                                          value={
                                            outcomeReviews[field.attribute_name]
                                              ?.value || ""
                                          }
                                          onChange={(e) =>
                                            handleOutcomeReviewChange(
                                              field.attribute_name,
                                              "value",
                                              e.target.value
                                            )
                                          }
                                          sx={{ mt: 2, mb: 2 }}
                                        />
                                        <TextField
                                          label="Reason for Change"
                                          fullWidth
                                          variant="filled"
                                          multiline
                                          rows={2}
                                          value={
                                            outcomeReviews[field.attribute_name]
                                              ?.reason || ""
                                          }
                                          onChange={(e) =>
                                            handleOutcomeReviewChange(
                                              field.attribute_name,
                                              "reason",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Box>
                                      <Box
                                        sx={{
                                          mt: 2,
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Button
                                          variant="contained"
                                          size="small"
                                          disabled={isSavingThis}
                                          startIcon={
                                            isSavingThis ? (
                                              <CircularProgress
                                                size={16}
                                                color="inherit"
                                              />
                                            ) : (
                                              <Save />
                                            )
                                          }
                                          onClick={() =>
                                            handleSaveOutcomeItem(
                                              field.attribute_name
                                            )
                                          }
                                        >
                                          {isSavingThis ? "Saving..." : "Save"}
                                        </Button>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              );
                            })}
                          </Grid>
                        ) : (
                          <Alert severity="warning">
                            No specific outcome fields were extracted.
                          </Alert>
                        )}
                      </Box>
                      <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          Key Topics Discussed
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {detail.keyTopics.map((topic, index) => (
                            <Chip key={index} label={topic} />
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

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}