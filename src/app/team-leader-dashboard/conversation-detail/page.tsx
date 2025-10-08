"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import styles from "./ConversationDetailPage.module.css";
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
  Edit,
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
  [paramId: string]: { score: string; reason: string };
};

type OutcomeReviewState = {
  [attributeId: string]: { value: any; reason: string };
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

  const [savingItemId, setSavingItemId] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

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
        for (const [id, paramData] of Object.entries(mappedData.scorecard)) {
          initialScorecardReviews[id] = {
            score:
              paramData.review_score?.toString() ??
              paramData.score.toString(),
            reason: paramData.reason_for_update ?? "",
          };
        }
        setScorecardReviews(initialScorecardReviews);

        const initialOutcomeReviews: OutcomeReviewState = {};
        for (const [id, outcomeData] of Object.entries(mappedData.outcome)) {
          initialOutcomeReviews[id] = {
            value: outcomeData.reviewer_value ?? "",
            reason: outcomeData.reviewer_reason ?? "",
          };
        }
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
    parameterId: string,
    field: "score" | "reason",
    value: string
  ) => {
    setScorecardReviews((prev) => ({
      ...prev,
      [parameterId]: { ...prev[parameterId], [field]: value },
    }));
  };

  const handleOutcomeReviewChange = (
    attributeId: string,
    field: "value" | "reason",
    value: any
  ) => {
    setOutcomeReviews((prev) => ({
      ...prev,
      [attributeId]: { ...prev[attributeId], [field]: value },
    }));
  };

  const handleSaveScorecardItem = async (
    parameterId: string,
    maxScore: number
  ) => {
    if (!conversationId) {
      setSnackbarMessage("Error: Conversation ID is missing.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const review = scorecardReviews[parameterId];
    const scoreValue = parseInt(review.score, 10);

    if (
      !review.score ||
      isNaN(scoreValue) ||
      scoreValue < 0 ||
      scoreValue > maxScore
    ) {
      setSnackbarMessage(
        `Please enter a valid score between 0 and ${maxScore}.`
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!review.reason.trim()) {
      setSnackbarMessage("A reason is required to submit the review.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setSavingItemId(parameterId);
    try {
      const payload = {
        review_score: scoreValue,
        reason_for_update: review.reason,
      };
      await submitScorecardReview(conversationId, parameterId, payload);
      setSnackbarMessage(`Review for "${parameterId}" saved successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSavingItemId(null);
    }
  };

  const handleSaveOutcomeItem = async (attributeId: string) => {
    if (!conversationId) {
      setSnackbarMessage("Error: Conversation ID is missing.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    const review = outcomeReviews[attributeId];
    if (review.value === null || review.value === "") {
      setSnackbarMessage("The reviewer value cannot be empty.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    if (!review.reason.trim()) {
      setSnackbarMessage("A reason is required to submit the review.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setSavingItemId(attributeId);
    try {
      const payload = {
        reviewer_value: review.value,
        reviewer_reason: review.reason,
      };
      await submitOutcomeReview(conversationId, attributeId, payload);
      setSnackbarMessage(`Review for "${attributeId}" saved successfully!`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setSavingItemId(null);
    }
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
  const scorecardEntries = Object.entries(
    detail.scorecard
  ) as [string, ScorecardParameterAnalysis][];
  const outcomeEntries = Object.entries(
    detail.outcome
  ) as [string, OutcomeFieldAnalysis][];

  // First, filter out any parameters where the effective score is -1 (Not Applicable)
  const validScorecardEntries = scorecardEntries.filter(([, paramData]) => {
    const effectiveScore = paramData.review_score ?? paramData.score;
    return effectiveScore !== -1;
  });

  // Now, calculate the totals using only the valid entries
  const totalPossibleScore = validScorecardEntries.reduce(
    (sum, [, paramData]) => sum + paramData.max_score,
    0
  );
  
  const totalAchievedScore = validScorecardEntries.reduce(
    (sum, [, paramData]) =>
      sum + (paramData.review_score ?? paramData.score),
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
                        Total QC Score: {totalAchievedScore} /{" "}
                        {totalPossibleScore} ({Math.round(scorecardPercentage)}
                        % Adherence)
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={scorecardPercentage}
                        sx={{ mt: 1, height: 10, borderRadius: 4, mb: 3 }}
                        color={scorecardPercentage >= 80 ? "success" : "error"}
                      />
                      <Grid container spacing={3} alignItems="stretch">
                        {scorecardEntries.map(([parameterId, paramData]) => {
                          const maxScore = paramData.max_score;
                          const displayScore =
                            paramData.score ?? paramData.score;
                          const scoreColor = getScoreColor(
                            displayScore,
                            maxScore
                          );
                          const isSavingThis = savingItemId === parameterId;
                          const wasReviewed = paramData.review_score !== null;

                          return (
                            <Grid item xs={12} md={6} lg={4} key={parameterId}>
                              <Card
                                variant="elevation"
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  width: "72vw"
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
                                      {paramData.parameter}
                                    </Typography>
                                    <Chip
                                      label={`Score: ${displayScore}/${maxScore}`}
                                      icon={wasReviewed ? <Edit /> : undefined}
                                      color={scoreColor as any}
                                      size="small"
                                      variant={
                                        wasReviewed ? "filled" : "outlined"
                                      }
                                    />
                                  </Box>
                                  <Typography
                                    variant="body2"
                                    sx={{ mt: 1, mb: 1, fontStyle: "italic" }}
                                  >
                                    {paramData.explanation}
                                  </Typography>
                                  <Box sx={{ mt: 2, mb: 2 }}>
                                    <Typography
                                      variant="caption"
                                      fontWeight={600}
                                      fontSize={"0.875rem"}
                                    >
                                      Rule Analysis:
                                    </Typography>
                                    {paramData.sub_rule_analysis.map(
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
                                              sx={{ 
                                                fontWeight: 500,
                                                fontSize: "0.85rem"
                                              }}
                                            >
                                              {rule.rule}
                                            </Typography>
                                            <Typography
                                              variant="caption"
                                              color="text.secondary"
                                              display="block"
                                              fontSize={"0.85rem"}
                                            >
                                              <i>Reason:</i> {rule.reason}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      )
                                    )}
                                  </Box>
                                  <Divider sx={{ my: 2 }}>
                                    <Chip
                                      label="Manual Review"
                                      size="small"
                                    />
                                  </Divider>
                                  <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                      label="Score"
                                      type="number"
                                      size="small"
                                      value={
                                        scorecardReviews[parameterId]?.score ||
                                        ""
                                      }
                                      onChange={(e) =>
                                        handleScorecardReviewChange(
                                          parameterId,
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
                                        scorecardReviews[parameterId]
                                          ?.reason || ""
                                      }
                                      onChange={(e) =>
                                        handleScorecardReviewChange(
                                          parameterId,
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
                                        handleSaveScorecardItem(
                                          parameterId,
                                          maxScore
                                        )
                                      }
                                    >
                                      {isSavingThis
                                        ? "Saving..."
                                        : "Save"}
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
                        Disposition:{" "}
                        <b>{detail.disposition.toUpperCase()}</b>
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                      >
                        The final disposition from the conversation data.
                      </Typography>
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          gutterBottom
                        >
                          Outcome Fields Extracted
                        </Typography>
                        {outcomeEntries.length > 0 ? (
                          <Grid container spacing={3}>
                            {outcomeEntries.map(
                              ([attributeId, outcomeData]) => {
                                let displayValue = String(
                                  outcomeData.extracted_value ?? "N/A"
                                );
                                if (
                                  typeof outcomeData.extracted_value ===
                                  "boolean"
                                ) {
                                  displayValue = outcomeData.extracted_value
                                    ? "Yes"
                                    : "No";
                                }
                                const isSavingThis = savingItemId === attributeId;

                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={6}
                                    key={attributeId}
                                  >
                                    <div className={styles.outcomeCard}>
                                      <h4 className={styles.outcomeHeader}>
                                        Extracted: {outcomeData.attribute_name}
                                      </h4>
                                      <div className={styles.dataGrid}>
                                        <div className={styles.dataColumn}>
                                          <label
                                            className={styles.fieldLabel}
                                          >
                                            Extracted Value
                                          </label>
                                          <p
                                            className={
                                              styles.extractedValue
                                            }
                                          >
                                            {displayValue}
                                          </p>
                                        </div>
                                        <div className={styles.dataColumn}>
                                          <label
                                            className={styles.fieldLabel}
                                          >
                                            AI Reasoning
                                          </label>
                                          <p
                                            className={
                                              styles.extractedValue
                                            }
                                          >
                                            {outcomeData.reasoning}
                                          </p>
                                        </div>
                                      </div>
                                      <hr className={styles.divider} />
                                      <div className={styles.dataGrid}>
                                        <div className={styles.dataColumn}>
                                          <div className={styles.fieldGroup}>
                                            <label
                                              className={styles.fieldLabel}
                                              htmlFor={`reviewer-outcome-${attributeId}`}
                                            >
                                              Reviewer Outcome
                                            </label>
                                            <input
                                              id={`reviewer-outcome-${attributeId}`}
                                              type="text"
                                              className={styles.textInput}
                                              value={
                                                outcomeReviews[attributeId]?.value ||
                                                ""
                                              }
                                              onChange={(e) =>
                                                handleOutcomeReviewChange(
                                                  attributeId,
                                                  "value",
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Enter correct value..."
                                            />
                                          </div>
                                        </div>
                                        <div className={styles.dataColumn}>
                                          <div className={styles.fieldGroup}>
                                            <label
                                              className={styles.fieldLabel}
                                              htmlFor={`reviewer-reason-${attributeId}`}
                                            >
                                              Reason for Change
                                            </label>
                                            <textarea
                                              id={`reviewer-reason-${attributeId}`}
                                              className={
                                                styles.textAreaInput
                                              }
                                              value={
                                                outcomeReviews[attributeId]
                                                  ?.reason || ""
                                              }
                                              onChange={(e) =>
                                                handleOutcomeReviewChange(
                                                  attributeId,
                                                  "reason",
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Explain the reason for change..."
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className={styles.actionsContainer}
                                      >
                                        <button
                                          className={styles.saveButton}
                                          disabled={isSavingThis}
                                          onClick={() =>
                                            handleSaveOutcomeItem(
                                              attributeId
                                            )
                                          }
                                        >
                                          {isSavingThis
                                            ? "Saving..."
                                            : "Save Changes"}
                                        </button>
                                      </div>
                                    </div>
                                  </Grid>
                                );
                              }
                            )}
                          </Grid>
                        ) : (
                          <Alert severity="warning">
                            No specific outcome fields were extracted.
                          </Alert>
                        )}
                      </Box>
                      <Box sx={{ mt: 4 }}>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          gutterBottom
                        >
                          Key Topics Discussed
                        </Typography>
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                        >
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
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}