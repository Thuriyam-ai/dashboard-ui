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
  Schedule,
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
import * as XLSX from "xlsx";

const DRAWER_WIDTH = 280;

export default function ConversationsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loadingCampaigns, setLoadingCampaigns] = useState<boolean>(true);
  const [campaignError, setCampaignError] = useState<string | null>(null);

  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [loadingTeams, setLoadingTeams] = useState<boolean>(true);
  const [teamError, setTeamError] = useState<string | null>(null);

  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [loadingConversations, setLoadingConversations] = useState<boolean>(true);
  const [conversationError, setConversationError] = useState<string | null>(null);

  const [isExporting, setIsExporting] = useState(false);

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

  useEffect(() => {
    const fetchConversations = async () => {
      setLoadingConversations(true);
      setConversationError(null);
      try {
        // The API call in `listConversations` needs to be updated to handle "all"
        // For now, we assume it fetches all if the ID is "all" or null/undefined
        const data = await listConversations({
          campaign_id: campaignFilter === "all" ? undefined : campaignFilter,
          team_id: teamFilter === "all" ? undefined : teamFilter,
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

  const filteredConversations = useMemo(() => 
    conversations.filter((conv) =>
      conv.agent_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.employer_user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.conversation_id.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [conversations, searchTerm]
  );

  // **Calculated Summary Statistics**
  const summaryStats = useMemo(() => {
    if (filteredConversations.length === 0) {
      return {
        total: 0,
        completed: 0,
        avgScore: 0,
        avgDuration: 0,
      };
    }

    const completedCount = filteredConversations.filter(
      (conv) => conv.avyukta_status?.toUpperCase() === "COMPLETED"
    ).length;

    const conversationsWithScores = filteredConversations.filter(
      (conv) => typeof conv.QC_score === 'number'
    );
    const totalScore = conversationsWithScores.reduce(
      (acc, conv) => acc + (conv.QC_score || 0),
      0
    );
    const avgScore = conversationsWithScores.length > 0
      ? Math.round(totalScore / conversationsWithScores.length)
      : 0;

    const totalDuration = filteredConversations.reduce(
      (acc, conv) => acc + (conv.length_in_sec || 0),
      0
    );
    const avgDurationInSeconds = totalDuration / filteredConversations.length;
    const avgDurationInMinutes = Math.round(avgDurationInSeconds / 60);

    return {
      total: filteredConversations.length,
      completed: completedCount,
      avgScore: avgScore,
      avgDuration: avgDurationInMinutes,
    };
  }, [filteredConversations]);

  const handleExportData = () => {
    if (filteredConversations.length === 0) {
      alert("No data to export.");
      return;
    }
    setIsExporting(true);

    const flattenObject = (obj: any, parentKey = '', result: { [key: string]: any } = {}) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          const value = obj[key];
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            flattenObject(value, newKey, result);
          } else if (Array.isArray(value)) {
            result[newKey] = JSON.stringify(value, null, 2);
          } else {
            result[newKey] = value;
          }
        }
      }
      return result;
    };

    setTimeout(() => {
      try {
        const transformedConversations = filteredConversations.map(conv => {
            const newConv = JSON.parse(JSON.stringify(conv));
            delete newConv.logging_comments;
            if (newConv.analytics_data) {
                if (newConv.analytics_data.outcome) {
                    for (const key in newConv.analytics_data.outcome) {
                        if (Object.prototype.hasOwnProperty.call(newConv.analytics_data.outcome, key)) {
                            const item = newConv.analytics_data.outcome[key];
                            newConv.analytics_data.outcome[key] = {
                                extracted_value: item.extracted_value,
                                reasoning: item.reasoning,
                                reviewer_value: item.reviewer_value,
                                reviewer_reason: item.reviewer_reason,
                            };
                        }
                    }
                }
                if (newConv.analytics_data.scorecard) {
                    for (const key in newConv.analytics_data.scorecard) {
                        if (Object.prototype.hasOwnProperty.call(newConv.analytics_data.scorecard, key)) {
                            const item = newConv.analytics_data.scorecard[key];
                            newConv.analytics_data.scorecard[key] = {
                                score: item.score,
                                explanation: item.explanation,
                                max_score: item.max_score,
                                review_score: item.review_score,
                                reason_for_update: item.reason_for_update,
                            };
                        }
                    }
                }
                const { analytics_data, ...rest } = newConv;
                return { ...rest, ...analytics_data };
            }
            return newConv;
        });

        const conversationsByCampaign = transformedConversations.reduce((acc, conv) => {
          const campaignId = conv.campaign_id || 'Uncategorized';
          if (!acc[campaignId]) acc[campaignId] = [];
          acc[campaignId].push(conv as any);
          return acc;
        }, {} as Record<string, any[]>);

        const workbook = XLSX.utils.book_new();

        for (const campaignId in conversationsByCampaign) {
          if (!Object.prototype.hasOwnProperty.call(conversationsByCampaign, campaignId)) continue;
          
          const campaignConversations = conversationsByCampaign[campaignId];
          const flattenedData = campaignConversations.map(conv => flattenObject(conv));
          if (flattenedData.length === 0) continue;

          const allHeaders = Object.keys(flattenedData.reduce((res, row) => ({ ...res, ...row }), {}));
          const headerParts = allHeaders.map(h => h.split('.'));
          const maxDepth = Math.max(...headerParts.map(p => p.length));

          const headerRows: string[][] = Array.from({ length: maxDepth }, () => []);
          allHeaders.forEach(header => {
            const parts = header.split('.');
            for (let i = 0; i < maxDepth; i++) {
              headerRows[i].push(parts[i] || '');
            }
          });

          const dataRows = flattenedData.map(row => allHeaders.map(header => row[header] ?? ''));
          const sheetData = [...headerRows, ...dataRows];
          const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

          const merges = [];
          for (let R = 0; R < maxDepth; ++R) {
            for (let C = 0; C < headerRows[R].length; ++C) {
              if (!headerRows[R][C] || merges.some(m => R >= m.s.r && R <= m.e.r && C >= m.s.c && C <= m.e.c)) continue;
              let C_end = C;
              while (C_end + 1 < headerRows[R].length && headerRows[R][C_end + 1] === headerRows[R][C]) {
                let isSameParent = true;
                for (let r_parent = 0; r_parent < R; r_parent++) {
                  if (headerRows[r_parent][C] !== headerRows[r_parent][C_end + 1]) {
                    isSameParent = false;
                    break;
                  }
                }
                if (!isSameParent) break;
                C_end++;
              }
              let R_end = R;
              while (R_end + 1 < maxDepth && !headerRows[R_end + 1][C]) R_end++;
              if (R !== R_end || C !== C_end) merges.push({ s: { r: R, c: C }, e: { r: R_end, c: C_end } });
            }
          }
          worksheet['!merges'] = merges;

          const numCols = sheetData[0] ? sheetData[0].length : 0;
          const cols = Array.from({ length: numCols }, () => ({ wch: 10 }));

          for (let C = 0; C < numCols; ++C) {
              let maxWidth = 0;
              for (let R = 0; R < sheetData.length; ++R) {
                  const cellContent = sheetData[R][C];
                  const contentLength = cellContent ? String(cellContent).length : 0;
                  if (contentLength > maxWidth) {
                      maxWidth = contentLength;
                  }
              }
              cols[C] = { wch: Math.min(Math.max(maxWidth + 2, 10), 60) };
          }
          worksheet['!cols'] = cols;

          const range = XLSX.utils.decode_range(worksheet['!ref']!);
          for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
              const cell = worksheet[cellAddress];
              if (!cell) continue;
              if (!cell.s) cell.s = {};
              if (!cell.s.alignment) cell.s.alignment = {};
              cell.s.alignment.wrapText = true;
              cell.s.alignment.vertical = "top";

              if (R < maxDepth) {
                if (!cell.s.fill) cell.s.fill = {};
                cell.s.fill.fgColor = { rgb: "FFFF00" };
                if (!cell.s.font) cell.s.font = {};
                cell.s.font.bold = true;
              }
            }
          }
          
          const campaignInfo = campaigns.find(c => c.id === campaignId);
          const sheetName = (campaignInfo?.name || campaignId).replace(/[\/\\?*[\]:]/g, '').substring(0, 31);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
        }

        const today = new Date().toISOString().split('T')[0];
        XLSX.writeFile(workbook, `conversations_export_${today}.xlsx`);

      } catch (error) {
        console.error("Failed to export data:", error);
        alert("An error occurred while exporting the data.");
      } finally {
        setIsExporting(false);
      }
    }, 100);
  };

  const getStatusColor = (status: string | null | undefined) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED": return "success";
      case "IN-PROGRESS": return "info";
      case "FAILED": return "error";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string | null | undefined) => {
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

  const formatDate = (dateString: string | { $date: string }) => {
      const dateVal = typeof dateString === 'string' ? dateString : dateString?.$date;
      if (!dateVal) return '-';
      
      const date = new Date(dateVal);
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
                <TextField placeholder="Search by ID, Agent, Customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>), }} sx={{ minWidth: 300, flexGrow: { xs: 1, md: 0 } }} />
                
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

                <Button variant="outlined" startIcon={<Refresh />} onClick={() => { setSearchTerm(""); setCampaignFilter("all"); setTeamFilter("all"); }}>Reset Filters</Button>
                
                <Button 
                  variant="contained" 
                  startIcon={isExporting ? <CircularProgress size={20} color="inherit" /> : <Download />} 
                  sx={{ ml: 'auto' }}
                  onClick={handleExportData}
                  disabled={isExporting || filteredConversations.length === 0}
                >
                  {isExporting ? 'Exporting...' : 'Export Data'}
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Total Conversations</Typography><Typography variant="h4" fontWeight={700} color="primary">{summaryStats.total}</Typography></Box><Message sx={{ fontSize: 40, color: 'primary.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Completed</Typography><Typography variant="h4" fontWeight={700} color="success.main">{summaryStats.completed}</Typography></Box><CheckCircle sx={{ fontSize: 40, color: 'success.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Avg Quality Score</Typography><Typography variant="h4" fontWeight={700} color="info.main">{summaryStats.avgScore}</Typography></Box><TrendingUp sx={{ fontSize: 40, color: 'info.main' }} /></Box></CardContent></Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><Box><Typography color="text.secondary" gutterBottom>Avg Duration</Typography><Typography variant="h4" fontWeight={700} color="warning.main">{summaryStats.avgDuration}m</Typography></Box><Schedule sx={{ fontSize: 40, color: 'warning.main' }} /></Box></CardContent></Card>
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
                        const callDate = conv.call_timestamp;
                        
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