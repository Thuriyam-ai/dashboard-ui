"use client";

import { useState } from "react";
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
  Grid,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
  Search,
  FilterList,
  Message,
  Phone,
  Schedule,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
  Download,
  Visibility,
} from "@mui/icons-material";

interface Conversation {
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
}

/**
 * Conversations page component for Team Leader Dashboard
 * Displays comprehensive conversation analytics and management interface
 * @returns The ConversationsPage component
 */
export default function ConversationsPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");

  const handleViewChange = (newView: string) => {
    setAnchorEl(null);
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    if (newView === "generic") {
      router.push(`${basePath}/dashboard`);
    } else if (newView === "team-lead") {
      router.push(`${basePath}/team-dashboard/overview`);
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Mock conversation data
  const conversations: Conversation[] = [
    {
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
    },
    {
      id: "CONV-002",
      agentName: "Priya Sharma",
      customerName: "Sneha Singh",
      duration: "12:30",
      date: "2024-01-15",
      status: "completed",
      qualityScore: 88,
      fillerWords: 5,
      interruptions: 2,
      talkToListenRatio: 0.62,
      campaign: "Sales",
      team: "Sales Team",
      disposition: "Sale Closed",
    },
    {
      id: "CONV-003",
      agentName: "Arjun Patel",
      customerName: "Meera Joshi",
      duration: "6:15",
      date: "2024-01-15",
      status: "in-progress",
      qualityScore: 0,
      fillerWords: 0,
      interruptions: 0,
      talkToListenRatio: 0,
      campaign: "Customer Support",
      team: "Customer Support",
      disposition: "In Progress",
    },
    {
      id: "CONV-004",
      agentName: "Rajesh Kumar",
      customerName: "Vikram Singh",
      duration: "4:20",
      date: "2024-01-14",
      status: "failed",
      qualityScore: 45,
      fillerWords: 12,
      interruptions: 8,
      talkToListenRatio: 0.75,
      campaign: "Customer Support",
      team: "Customer Support",
      disposition: "Call Dropped",
    },
    {
      id: "CONV-005",
      agentName: "Sneha Singh",
      customerName: "Anita Desai",
      duration: "15:45",
      date: "2024-01-14",
      status: "completed",
      qualityScore: 95,
      fillerWords: 2,
      interruptions: 0,
      talkToListenRatio: 0.55,
      campaign: "Sales",
      team: "Sales Team",
      disposition: "Lead Generated",
    },
  ];

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

  const getQualityColor = (score: number) => {
    if (score >= 80) return "success.main";
    if (score >= 60) return "warning.main";
    return "error.main";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = 
      conv.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    const matchesTeam = teamFilter === "all" || conv.team === teamFilter;
    
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const completedConversations = conversations.filter(c => c.status === "completed");
  const avgQualityScore = completedConversations.length > 0 
    ? Math.round(completedConversations.reduce((sum, c) => sum + c.qualityScore, 0) / completedConversations.length)
    : 0;
  const avgDuration = completedConversations.length > 0
    ? Math.round(completedConversations.reduce((sum, c) => {
        const [minutes, seconds] = c.duration.split(':').map(Number);
        return sum + (minutes * 60 + seconds);
      }, 0) / completedConversations.length / 60)
    : 0;

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
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                team-leader-dashboard-conversations.localhost:3000
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* View Type Dropdown */}
              <Chip
                icon={<SupervisorAccount />}
                label="Team Lead view"
                color="secondary"
                onClick={handleMenuClick}
                deleteIcon={<KeyboardArrowDown />}
                onDelete={handleMenuClick}
                variant="outlined"
                sx={{
                  fontWeight: 600,
                  '& .MuiChip-deleteIcon': {
                    color: 'inherit',
                  },
                }}
              />

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem
                  onClick={() => handleViewChange("generic")}
                >
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem
                  onClick={() => handleViewChange("team-lead")}
                  selected={true}
                >
                  <SupervisorAccount sx={{ mr: 1 }} />
                  Team Lead view
                </MenuItem>
              </Menu>

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
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Conversations Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Monitor and analyze team conversations with comprehensive analytics
            </Typography>
          </Box>

          {/* Key Metrics Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Total Conversations
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="primary">
                        {conversations.length}
                      </Typography>
                    </Box>
                    <Message sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Completed
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="success.main">
                        {completedConversations.length}
                      </Typography>
                    </Box>
                    <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Avg Quality Score
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="info.main">
                        {avgQualityScore}
                      </Typography>
                    </Box>
                    <TrendingUp sx={{ fontSize: 40, color: 'info.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography color="text.secondary" gutterBottom>
                        Avg Duration
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="warning.main">
                        {avgDuration}m
                      </Typography>
                    </Box>
                    <Schedule sx={{ fontSize: 40, color: 'warning.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters and Search */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 300 }}
                />
                
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Status"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Status</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Team</InputLabel>
                  <Select
                    value={teamFilter}
                    label="Team"
                    onChange={(e) => setTeamFilter(e.target.value)}
                  >
                    <MenuItem value="all">All Teams</MenuItem>
                    <MenuItem value="Technical Support">Technical Support</MenuItem>
                    <MenuItem value="Sales Team">Sales Team</MenuItem>
                    <MenuItem value="Customer Support">Customer Support</MenuItem>
                  </Select>
                </FormControl>

                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTeamFilter("all");
                  }}
                >
                  Reset Filters
                </Button>

                <Button
                  variant="contained"
                  startIcon={<Download />}
                  sx={{ ml: 'auto' }}
                >
                  Export Data
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Conversations Table */}
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Conversation Details ({filteredConversations.length} conversations)
              </Typography>
              
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Conversation ID</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Quality Score</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Disposition</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredConversations.map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {conversation.id}
                          </Typography>
                        </TableCell>
                        <TableCell>{conversation.agentName}</TableCell>
                        <TableCell>{conversation.customerName}</TableCell>
                        <TableCell>{conversation.duration}</TableCell>
                        <TableCell>{formatDate(conversation.date)}</TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(conversation.status)}
                            label={conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                            color={getStatusColor(conversation.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {conversation.status === "completed" ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                color={getQualityColor(conversation.qualityScore)}
                              >
                                {conversation.qualityScore}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={conversation.qualityScore}
                                sx={{ width: 50, height: 6, borderRadius: 3 }}
                                color={conversation.qualityScore >= 80 ? "success" : conversation.qualityScore >= 60 ? "warning" : "error"}
                              />
                            </Box>
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              -
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={conversation.team}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{conversation.disposition}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            variant="outlined"
                            onClick={() => {
                              const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
                              router.push(`${basePath}/team-leader-dashboard/conversation-detail`);
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
