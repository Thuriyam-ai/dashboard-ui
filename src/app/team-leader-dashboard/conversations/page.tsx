"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  Card,
  CardContent,
  Chip,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Grid,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Search,
  Message,
  Schedule, // <-- Imported Schedule
  TrendingUp,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
  Download,
  Visibility,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { getAllCampaigns } from "@/data/services/campaign-service";
import { getAllTeams } from "@/data/services/util-service";
import { listConversations } from "@/data/services/conversation-service";
import { Campaign } from "@/types/api/campaign";
import { TeamSummary } from "@/types/api/team";
import { ConversationResponse } from "@/types/api/conversation";

// Define a constant for the sidebar width to reuse it
const DRAWER_WIDTH = 280;

/**
 * Conversations page component for Team Leader Dashboard
 */
export default function ConversationsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  // State for dropdown data
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [loadingTeams, setLoadingTeams] = useState<boolean>(true);
  const [teamError, setTeamError] = useState<string | null>(null);

  // State for conversation data
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [loadingConversations, setLoadingConversations] = useState<boolean>(true);
  const [conversationError, setConversationError] = useState<string | null>(null);

  // Fetch data for filters (campaigns and teams)
  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        setLoadingCampaigns(true);
        setLoadingTeams(true);
        const [fetchedCampaigns, fetchedTeams] = await Promise.all([
          getAllCampaigns(),
          getAllTeams(),
        ]);
        setCampaigns(fetchedCampaigns);
        setTeams(fetchedTeams);
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
        setCampaignError("Could not load campaigns.");
        setTeamError("Could not load teams.");
      } finally {
        setLoadingCampaigns(false);
        setLoadingTeams(false);
      }
    };
    fetchFilterData();
  }, []);

  // Fetch conversations when filters change
  useEffect(() => {
    const fetchConversations = async () => {
      setLoadingConversations(true);
      setConversationError(null);
      try {
        const data = await listConversations({
          campaignId: campaignFilter,
          teamId: teamFilter,
        });
        setConversations(data);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
        setConversationError("Failed to load conversations. Please try again.");
      } finally {
        setLoadingConversations(false);
      }
    };
    fetchConversations();
  }, [campaignFilter, teamFilter]);

  const teamMap = useMemo(() => new Map(teams.map(team => [team.id, team.name])), [teams]);

  const getStatusColor = (status: string | null) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED": return "success";
      case "IN-PROGRESS": return "info";
      case "FAILED": return "error";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED": return <CheckCircle />;
      case "IN-PROGRESS": return <Schedule />;
      case "FAILED": return <Cancel />;
      default: return <Warning />;
    }
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  const formatDate = (dateString: string) => {
    // Helper to handle potential MongoDate format
    let date;
    try {
        date = new Date(dateString.includes('$date') ? JSON.parse(dateString).$date : dateString);
    } catch {
        date = new Date(dateString);
    }

    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
    });
  };

  const formatSeconds = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.agent_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.employer_user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.conversation_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (conversationId: string) => {
    router.push(`/team-leader-dashboard/conversation-detail?id=${conversationId}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar 
        activeItem="conversations"
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginLeft: { md: `${DRAWER_WIDTH}px` }
        }}
      >
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                team-leader-dashboard-conversations.localhost:3000
              </Typography>
            </Box>
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

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Conversations Management</Typography>
            <Typography variant="h6" color="text.secondary">Monitor and analyze team conversations with comprehensive analytics</Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField placeholder="Search by ID, Agent, Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} variant="standard" InputProps={{ startAdornment: (<InputAdornment position="start"><Search sx={{ color: 'text.secondary' }} /></InputAdornment>), disableUnderline: true, }} sx={{ minWidth: 300, flexGrow: { xs: 1, md: 0 }, bgcolor: 'grey.50', borderRadius: 2, px: 2, py: 1, '&:hover': { bgcolor: 'grey.100', }, '&:focus-within': { bgcolor: 'white', boxShadow: '0 0 0 2px rgba(49, 130, 206, 0.1)', }, }} />
                
                <FormControl sx={{ minWidth: 150 }} disabled={loadingCampaigns}>
                  <InputLabel>Campaign</InputLabel>
                  <Select value={campaignFilter} label="Campaign" onChange={(e) => setCampaignFilter(e.target.value as string)}>
                    <MenuItem value="all">All Campaigns</MenuItem>
                    {campaigns.map((campaign) => (<MenuItem key={campaign.id} value={campaign.id}>{campaign.name}</MenuItem>))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }} disabled={loadingTeams}>
                  <InputLabel>Team</InputLabel>
                  <Select value={teamFilter} label="Team" onChange={(e) => setTeamFilter(e.target.value as string)}>
                    <MenuItem value="all">All Teams</MenuItem>
                    {teams.map((team) => (<MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>))}
                  </Select>
                </FormControl>

                <Button variant="outlined" startIcon={<Refresh />} onClick={() => { setSearchTerm(""); setCampaignFilter("all"); setTeamFilter("all"); }}>Reset filters</Button>
                <Button variant="contained" startIcon={<Download />} sx={{ ml: 'auto' }}>Export data</Button>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Total Conversations</Typography><Typography variant="h4" fontWeight={700} color="primary">{conversations.length}</Typography></Box><Message sx={{ fontSize: 40, color: 'primary.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Completed</Typography><Typography variant="h4" fontWeight={700} color="success.main">3</Typography></Box><CheckCircle sx={{ fontSize: 40, color: 'success.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Avg Quality Score</Typography><Typography variant="h4" fontWeight={700} color="info.main">92</Typography></Box><TrendingUp sx={{ fontSize: 40, color: 'info.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Avg Duration</Typography><Typography variant="h4" fontWeight={700} color="warning.main">12m</Typography></Box><Schedule sx={{ fontSize: 40, color: 'warning.main' }} /></Box></CardContent></Card>
            </Grid>
          </Grid>
          
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Conversation Details ({filteredConversations.length} conversations)
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead><TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Conversation ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Agent ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Customer ID</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Quality Score</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Disposition</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow></TableHead>
                  <TableBody>
                    {loadingConversations ? (
                      <TableRow><TableCell colSpan={10} align="center"><CircularProgress /></TableCell></TableRow>
                    ) : conversationError ? (
                      <TableRow><TableCell colSpan={10}><Alert severity="error">{conversationError}</Alert></TableCell></TableRow>
                    ) : filteredConversations.length === 0 ? (
                      <TableRow><TableCell colSpan={10} align="center">No conversations found for the selected filters.</TableCell></TableRow>
                    ) : (
                      filteredConversations.map((conv) => {
                        const qualityScore = conv.QC_score;
                        // Correctly extract the date for display
                        const callDate = typeof conv.call_timestamp === 'string' ? conv.call_timestamp : conv.call_timestamp?.$date || new Date().toISOString();
                        
                        return (
                          <TableRow key={conv.conversation_id}>
                            <TableCell><Typography variant="body2" fontWeight={600}>{conv.conversation_id}</Typography></TableCell>
                            <TableCell>{conv.agent_id}</TableCell>
                            <TableCell>{conv.employer_user_id}</TableCell>
                            <TableCell>{formatSeconds(conv.length_in_sec)}</TableCell>
                            <TableCell>{formatDate(callDate)}</TableCell>
                            <TableCell>
                              <Chip icon={getStatusIcon(conv.avyukta_status)} label={conv.avyukta_status || 'Unknown'} color={getStatusColor(conv.avyukta_status)} size="small" />
                            </TableCell>
                            <TableCell>
                              {typeof qualityScore === 'number' ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography variant="body2" fontWeight={600} color={getQualityColor(qualityScore)}>{qualityScore}</Typography>
                                  <LinearProgress variant="determinate" value={qualityScore} sx={{ width: 50, height: 6, borderRadius: 3 }} color={qualityScore >= 80 ? "success" : qualityScore >= 50 ? "warning" : "error"} />
                                </Box>
                              ) : (<Typography variant="body2" color="text.secondary">-</Typography>)}
                            </TableCell>
                            <TableCell><Chip label={teamMap.get(conv.team_id) || 'Unknown'} size="small" variant="outlined" /></TableCell>
                            <TableCell>{conv.lamh_disposition}</TableCell>
                            <TableCell>
                              <Button 
                                size="small" 
                                startIcon={<Visibility />} 
                                variant="outlined" 
                                onClick={() => handleViewDetails(conv.conversation_id)}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}