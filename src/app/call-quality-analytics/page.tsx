"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from '@/components/layout/page-layout';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Avatar,
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Grid,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  TrendingUp,
  TrendingDown,
  Warning,
  CheckCircle,
  Error,
  Assessment,
  Phone,
  Person,
  Schedule,
  Download, // Import the Download icon
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { getAllCampaigns } from "@/data/services/campaign-service";
import { 
  getCampaignParametersAnalysis, 
  getAgentsPerformanceSummaryForCampaign 
} from "@/data/services/analytics-service";
import { Campaign } from "@/types/api/campaign";
import { ParameterAnalysis, AgentPerformance } from "@/types/api/analytics";
import * as XLSX from "xlsx"; // Import the xlsx library

/**
 * Call Quality Analytics page component displaying comprehensive call quality metrics
 * and performance data based on WorkIndia's call quality parameters.
 * @returns The CallQualityAnalyticsPage component
 */
export default function CallQualityAnalyticsPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<string>("None");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { logout } = useAuth();

  // State for campaigns dropdown
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  // State for parameters analysis data
  const [parameters, setParameters] = useState<ParameterAnalysis[]>([]);
  const [loadingParameters, setLoadingParameters] = useState<boolean>(false);
  const [parametersError, setParametersError] = useState<string | null>(null);

  // State for agent performance data
  const [agentPerformance, setAgentPerformance] = useState<AgentPerformance[]>([]);
  const [loadingAgents, setLoadingAgents] = useState<boolean>(false);
  const [agentError, setAgentError] = useState<string | null>(null);

  // Fetch campaigns for the dropdown
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoadingCampaigns(true);
        const fetchedCampaigns = await getAllCampaigns();
        setCampaigns(fetchedCampaigns);
        setCampaignError(null);
      } catch (error) {
        console.error("Failed to fetch campaigns for filter:", error);
        setCampaignError("Could not load campaigns.");
      } finally {
        setLoadingCampaigns(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Fetch analysis data when a campaign is selected
  useEffect(() => {
    if (selectedCampaign === "None") {
      setParameters([]);
      setAgentPerformance([]);
      setParametersError(null);
      setAgentError(null);
      return;
    }

    const fetchCampaignData = async () => {
      // Fetch parameters analysis
      setLoadingParameters(true);
      setParametersError(null);
      getCampaignParametersAnalysis(selectedCampaign)
        .then(data => setParameters(data))
        .catch(error => {
          console.error("Failed to fetch parameters analysis:", error);
          setParametersError("Failed to load campaign parameters analysis. Please try again.");
        })
        .finally(() => setLoadingParameters(false));

      // Fetch agent performance
      setLoadingAgents(true);
      setAgentError(null);
      getAgentsPerformanceSummaryForCampaign(selectedCampaign)
        .then(data => setAgentPerformance(data))
        .catch(error => {
          console.error("Failed to fetch agent performance:", error);
          setAgentError("Failed to load agent performance summary. Please try again.");
        })
        .finally(() => setLoadingAgents(false));
    };

    fetchCampaignData();
  }, [selectedCampaign]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCampaignChange = (event: SelectChangeEvent<string>) => {
    const campaignId = event.target.value;
    setSelectedCampaign(campaignId);

    if (campaignId === "None") {
      setStartDate("");
      setEndDate("");
      return;
    }

    const selected = campaigns.find(c => c.id === campaignId);
    if (selected) {
      setStartDate(selected.starts_at ? selected.starts_at.substring(0, 10) : "");
      setEndDate(selected.ends_at ? selected.ends_at.substring(0, 10) : "");
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  // Helper function to generate a formatted timestamp
  const getTimestamp = () => {
    const d = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
  };

  // Handler for exporting parameters data to Excel
  const handleExportParameters = () => {
    if (parameters.length === 0) return;

    const fileName = `call_quality_parameters_analysis_${getTimestamp()}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(parameters);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Parameters Analysis");
    XLSX.writeFile(workbook, fileName);
  };

  // Handler for exporting agent performance data to Excel
  const handleExportAgents = () => {
    if (agentPerformance.length === 0) return;

    const fileName = `agent_performance_summary_${getTimestamp()}.xlsx`;
    const worksheet = XLSX.utils.json_to_sheet(agentPerformance);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Agent Performance");
    XLSX.writeFile(workbook, fileName);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "success";
    if (score >= 80) return "warning";
    return "error";
  };

  const getTypeColor = (type: string) => {
    return type.toUpperCase() === "FATAL" ? "error" : "warning";
  };

  const getTrendIcon = (score: number) => {
    return score >= 85 ? <TrendingUp color="success" /> : <TrendingDown color="error" />;
  };

  return (
    <PageLayout activeItem="call-quality">
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
                call-quality-analytics.localhost:3000
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
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3, maxWidth: '100%', overflow: 'hidden' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Call Quality Analytics
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive call quality metrics and performance analysis based on WorkIndia standards
            </Typography>
          </Box>

          <Alert severity="info" sx={{ mb: 4 }}>
            <AlertTitle>Scoring Rules</AlertTitle>
            <Typography variant="body2">
              <strong>Fatal Errors:</strong> Single fatal error = 30% score reduction, Multiple fatal errors = 75% score reduction<br/>
              <strong>Non-Fatal Errors:</strong> Single non-fatal error = 10% score reduction, Multiple non-fatal errors = 20% score reduction
            </Typography>
          </Alert>

          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth disabled={loadingCampaigns}>
                    <InputLabel id="campaign-select-label">Campaign</InputLabel>
                    <Select
                      labelId="campaign-select-label"
                      id="campaign-select"
                      value={selectedCampaign}
                      label="Campaign"
                      onChange={handleCampaignChange}
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {campaigns.map((campaign) => (
                        <MenuItem key={campaign.id} value={campaign.id}>
                          {campaign.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {loadingCampaigns && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', right: 40, marginTop: '-12px' }} />}
                  </FormControl>
                  {campaignError && <Typography color="error" variant="caption">{campaignError}</Typography>}
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    disabled
                    id="start-date"
                    label="Start Date"
                    value={startDate}
                    InputLabelProps={{ shrink: !!startDate }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                   <TextField
                    fullWidth
                    disabled
                    id="end-date"
                    label="End Date"
                    value={endDate}
                    InputLabelProps={{ shrink: !!endDate }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Key Metrics Cards - Hardcoded as requested */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Overall Score
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      87.2%
                    </Typography>
                  </Box>
                  <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Calls
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      10
                    </Typography>
                  </Box>
                  <Phone sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Fatal Errors
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="error.main">
                      0
                    </Typography>
                  </Box>
                  <Error sx={{ fontSize: 40, color: 'error.main' }} />
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Avg Call Duration
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="info.main">
                      8:45
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Call Quality Parameters Table - Dynamic */}
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Call Quality Parameters Analysis
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Download />}
                  onClick={handleExportParameters}
                  disabled={parameters.length === 0 || loadingParameters}
                >
                  Export Data
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Parameter</strong></TableCell>
                      <TableCell align="center"><strong>Max Score</strong></TableCell>
                      <TableCell align="center"><strong>Type</strong></TableCell>
                      <TableCell align="center"><strong>Current Score</strong></TableCell>
                      <TableCell align="center"><strong>Adherence %</strong></TableCell>
                      <TableCell align="center"><strong>Trend</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingParameters ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : parametersError ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Alert severity="error">{parametersError}</Alert>
                        </TableCell>
                      </TableRow>
                    ) : parameters.length === 0 && selectedCampaign !== "None" ? (
                      <TableRow>
                         <TableCell colSpan={6} align="center">
                          No parameter data available for this campaign.
                        </TableCell>
                      </TableRow>
                    ) : parameters.length === 0 ? (
                        <TableRow>
                         <TableCell colSpan={6} align="center">
                          Select a campaign to view its parameters analysis.
                        </TableCell>
                      </TableRow>
                    ) : (
                      parameters.map((item) => (
                        <TableRow key={item.parameter}>
                          <TableCell>
                            <Typography variant="body2" fontWeight={600}>
                              {item.parameter}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" fontWeight={600}>
                              {item.max_score}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={item.type} 
                              color={getTypeColor(item.type)}
                              size="small"
                              icon={item.type.toUpperCase() === "FATAL" ? <Warning /> : <CheckCircle />}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={`${getScoreColor(item.current_score)}.main`}
                            >
                              {item.current_score.toFixed(1)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={item.adherence_percentage} 
                                sx={{ width: 60, height: 8, borderRadius: 4 }}
                                color={getScoreColor(item.adherence_percentage)}
                              />
                              <Typography variant="body2" fontWeight={600}>
                                {item.adherence_percentage}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            {getTrendIcon(item.adherence_percentage)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Agent Performance Table - Dynamic */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Agent Performance Summary
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Download />}
                  onClick={handleExportAgents}
                  disabled={agentPerformance.length === 0 || loadingAgents}
                >
                  Export Data
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Agent ID</strong></TableCell>
                      <TableCell align="center"><strong>Total Score</strong></TableCell>
                      <TableCell align="center"><strong>Fatal Errors</strong></TableCell>
                      <TableCell align="center"><strong>Non-Fatal Errors</strong></TableCell>
                      <TableCell align="center"><strong>Total Calls</strong></TableCell>
                      <TableCell align="center"><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loadingAgents ? (
                       <TableRow>
                        <TableCell colSpan={6} align="center">
                          <CircularProgress />
                        </TableCell>
                      </TableRow>
                    ) : agentError ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Alert severity="error">{agentError}</Alert>
                        </TableCell>
                      </TableRow>
                    ) : agentPerformance.length === 0 && selectedCampaign !== "None" ? (
                      <TableRow>
                         <TableCell colSpan={6} align="center">
                          No agent performance data available for this campaign.
                        </TableCell>
                      </TableRow>
                    ) : agentPerformance.length === 0 ? (
                      <TableRow>
                         <TableCell colSpan={6} align="center">
                          Select a campaign to view agent performance.
                        </TableCell>
                      </TableRow>
                    ) : (
                      agentPerformance.map((agent) => (
                        <TableRow key={agent.agent_id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Person sx={{ fontSize: 20, color: 'text.secondary' }} />
                              <Typography variant="body2" fontWeight={600}>
                                {agent.agent_id}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={`${getScoreColor(agent.total_score)}.main`}
                            >
                              {agent.total_score.toFixed(1)}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={agent.fatal_errors > 0 ? "error.main" : "success.main"}
                            >
                              {agent.fatal_errors}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={agent.non_fatal_errors > 2 ? "warning.main" : "success.main"}
                            >
                              {agent.non_fatal_errors}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" fontWeight={600}>
                              {agent.total_calls}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip 
                              label={agent.fatal_errors === 0 ? "Excellent" : agent.fatal_errors === 1 ? "Good" : "Needs Improvement"}
                              color={agent.fatal_errors === 0 ? "success" : agent.fatal_errors === 1 ? "warning" : "error"}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
    </PageLayout>
  );
}