"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MuiSidebar } from "@/components/dashboard/mui-sidebar";
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
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Alert,
  AlertTitle,
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
  Visibility,
  TrendingUp,
  TrendingDown,
  Assessment,
  Phone,
  Schedule,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
} from "@mui/icons-material";

export default function AnalyticsOverviewPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleViewDetails = (conversationId: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    router.push(`${basePath}/team-leader-dashboard/conversation-detail?id=${conversationId}`);
  };

  // Mock data for conversations
  const conversations = [
    {
      id: "conv-001",
      customerName: "Rajesh Kumar",
      agentName: "Kavya Reddy",
      team: "Sales Team Alpha",
      duration: "8:45",
      status: "completed",
      qualityScore: 88,
      sentiment: "positive",
      disposition: "Qualified Lead",
      timestamp: "2024-01-15 14:30",
      campaign: "Q1 Loan Qualification Drive",
    },
    {
      id: "conv-002",
      customerName: "Priya Sharma",
      agentName: "Arjun Singh",
      team: "Support Team Beta",
      duration: "12:20",
      status: "completed",
      qualityScore: 92,
      sentiment: "positive",
      disposition: "Issue Resolved",
      timestamp: "2024-01-15 13:15",
      campaign: "Customer Support Excellence",
    },
    {
      id: "conv-003",
      customerName: "Amit Patel",
      agentName: "Sneha Gupta",
      team: "Sales Team Alpha",
      duration: "5:30",
      status: "completed",
      qualityScore: 75,
      sentiment: "neutral",
      disposition: "Callback Required",
      timestamp: "2024-01-15 11:45",
      campaign: "Q1 Loan Qualification Drive",
    },
    {
      id: "conv-004",
      customerName: "Deepika Singh",
      agentName: "Rohit Verma",
      team: "Product Team Delta",
      duration: "15:10",
      status: "completed",
      qualityScore: 95,
      sentiment: "positive",
      disposition: "Feedback Collected",
      timestamp: "2024-01-15 10:20",
      campaign: "Product Feedback Collection",
    },
    {
      id: "conv-005",
      customerName: "Vikram Joshi",
      agentName: "Anita Desai",
      team: "Sales Team Gamma",
      duration: "3:45",
      status: "completed",
      qualityScore: 68,
      sentiment: "negative",
      disposition: "Not Interested",
      timestamp: "2024-01-15 09:30",
      campaign: "Enterprise Lead Generation",
    },
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    const matchesTeam = teamFilter === "all" || conv.team === teamFilter;
    return matchesSearch && matchesStatus && matchesTeam;
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      case 'neutral': return 'warning';
      default: return 'default';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp />;
      case 'negative': return <TrendingDown />;
      case 'neutral': return <TrendingDown />;
      default: return <Assessment />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in-progress': return <Schedule />;
      case 'failed': return <Cancel />;
      default: return <Warning />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <MuiSidebar activeItem="analytics" />

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
                analytics-overview.localhost:3000
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* View Type Dropdown */}
              <Chip
                icon={<Dashboard />}
                label="Generic view"
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
                  selected={true}
                >
                  <Dashboard sx={{ mr: 1 }} />
                  Generic view
                </MenuItem>
                <MenuItem
                  onClick={() => handleViewChange("team-lead")}
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
              Conversation Analytics Overview
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Comprehensive analysis of all conversation data across teams and campaigns
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
                    <Phone sx={{ fontSize: 40, color: 'primary.main' }} />
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
                        Average Score
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="success.main">
                        {Math.round(conversations.reduce((sum, conv) => sum + conv.qualityScore, 0) / conversations.length)}%
                      </Typography>
                    </Box>
                    <Assessment sx={{ fontSize: 40, color: 'success.main' }} />
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
                      <Typography variant="h4" fontWeight={700} color="info.main">
                        9:10
                      </Typography>
                    </Box>
                    <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
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
                        Completion Rate
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="warning.main">
                        100%
                      </Typography>
                    </Box>
                    <CheckCircle sx={{ fontSize: 40, color: 'warning.main' }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Filters */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Filters
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
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
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="failed">Failed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Team</InputLabel>
                    <Select
                      value={teamFilter}
                      onChange={(e) => setTeamFilter(e.target.value)}
                      label="Team"
                    >
                      <MenuItem value="all">All Teams</MenuItem>
                      <MenuItem value="Sales Team Alpha">Sales Team Alpha</MenuItem>
                      <MenuItem value="Support Team Beta">Support Team Beta</MenuItem>
                      <MenuItem value="Sales Team Gamma">Sales Team Gamma</MenuItem>
                      <MenuItem value="Product Team Delta">Product Team Delta</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Conversations Table */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" fontWeight={600}>
                  Recent Conversations
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  size="small"
                >
                  Refresh
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Agent</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Quality Score</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Sentiment</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Disposition</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Campaign</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredConversations.map((conversation) => (
                      <TableRow key={conversation.id}>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {conversation.customerName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {conversation.timestamp}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {conversation.agentName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={conversation.team.split(' ')[0]}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {conversation.duration}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={conversation.status}
                            size="small"
                            color={getStatusColor(conversation.status) as any}
                            icon={getStatusIcon(conversation.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={
                                conversation.qualityScore >= 90
                                  ? "success.main"
                                  : conversation.qualityScore >= 70
                                    ? "warning.main"
                                    : "error.main"
                              }
                            >
                              {conversation.qualityScore}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={conversation.qualityScore}
                              sx={{ width: 40, height: 4, borderRadius: 2 }}
                              color={conversation.qualityScore >= 90 ? "success" : conversation.qualityScore >= 70 ? "warning" : "error"}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={conversation.sentiment}
                            size="small"
                            color={getSentimentColor(conversation.sentiment) as any}
                            icon={getSentimentIcon(conversation.sentiment)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {conversation.disposition}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {conversation.campaign}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            variant="outlined"
                            onClick={() => handleViewDetails(conversation.id)}
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
