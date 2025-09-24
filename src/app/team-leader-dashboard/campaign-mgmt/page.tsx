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
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
  Add,
  Edit,
  ContentCopy,
  Delete,
  PlayArrow,
  Pause,
  CheckCircle,
  Schedule,
  Campaign,
  TrendingUp,
  Assessment,
  Group,
  CalendarToday,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

export default function CampaignManagementPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const { logout } = useAuth();

  const handleViewChange = (newView: string) => {
    setAnchorEl(null);
    if (newView === "generic") {
      router.push('/dashboard');
    } else if (newView === "team-lead") {
      router.push('/team-dashboard/overview');
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCreateCampaign = () => {
    router.push('/team-leader-dashboard/campaign-mgmt/editor');
  };

  const handleEditCampaign = (campaignId: string) => {
    router.push(`/team-leader-dashboard/campaign-mgmt/editor?id=${campaignId}`);
  };

  const handleCloneCampaign = (campaignId: string) => {
    router.push(`/team-leader-dashboard/campaign-mgmt/editor?clone=${campaignId}`);
  };

  const handleDeleteCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting campaign:", selectedCampaign);
    setDeleteDialogOpen(false);
    setSelectedCampaign(null);
  };

  // Mock data for campaigns
  const campaigns = [
    {
      id: "campaign-1",
      name: "Q1 Loan Qualification Drive",
      status: "active",
      goalVersion: "Loan Pre-Qualification v2.1",
      assignedTeam: "Sales Team Alpha",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      totalConversations: 1247,
      averageScore: 87.3,
      completionRate: 92.1,
      lastUpdated: "2024-01-15",
    },
    {
      id: "campaign-2",
      name: "Customer Support Excellence",
      status: "active",
      goalVersion: "Customer Support Resolution v1.3",
      assignedTeam: "Support Team Beta",
      startDate: "2024-01-15",
      endDate: "2024-04-15",
      totalConversations: 2156,
      averageScore: 91.7,
      completionRate: 88.4,
      lastUpdated: "2024-01-14",
    },
    {
      id: "campaign-3",
      name: "Enterprise Lead Generation",
      status: "upcoming",
      goalVersion: "Lead Generation v1.0",
      assignedTeam: "Sales Team Gamma",
      startDate: "2024-02-01",
      endDate: "2024-05-31",
      totalConversations: 0,
      averageScore: 0,
      completionRate: 0,
      lastUpdated: "2024-01-13",
    },
    {
      id: "campaign-4",
      name: "Product Feedback Collection",
      status: "completed",
      goalVersion: "Product Feedback Collection v1.2",
      assignedTeam: "Product Team Delta",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
      totalConversations: 543,
      averageScore: 84.2,
      completionRate: 95.6,
      lastUpdated: "2023-12-31",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'upcoming': return 'info';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <PlayArrow />;
      case 'upcoming': return <Schedule />;
      case 'completed': return <CheckCircle />;
      default: return <Pause />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="campaign-mgmt" />

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
                team-leader-dashboard.localhost:3000
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
                onClick={logout}
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                  Campaign Management
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Create and manage conversation campaigns for your teams
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateCampaign}
                sx={{ 
                  px: 3, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Create New Campaign
              </Button>
            </Box>
          </Box>

          {/* Campaigns Table */}
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Active Campaigns
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Campaign Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Goal Version</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Assigned Team</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Conversations</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Avg Score</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Completion Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Campaign sx={{ color: 'primary.main' }} />
                            <Typography variant="body2" fontWeight={600}>
                              {campaign.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={campaign.status}
                            size="small"
                            color={getStatusColor(campaign.status) as any}
                            icon={getStatusIcon(campaign.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {campaign.goalVersion}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Group sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {campaign.assignedTeam}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">
                              {campaign.startDate} - {campaign.endDate}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {campaign.totalConversations.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={
                                campaign.averageScore >= 90
                                  ? "success.main"
                                  : campaign.averageScore >= 70
                                    ? "warning.main"
                                    : "error.main"
                              }
                            >
                              {campaign.averageScore}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={campaign.averageScore}
                              sx={{ width: 40, height: 4, borderRadius: 2 }}
                              color={campaign.averageScore >= 90 ? "success" : campaign.averageScore >= 70 ? "warning" : "error"}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography 
                              variant="body2" 
                              fontWeight={600}
                              color={
                                campaign.completionRate >= 90
                                  ? "success.main"
                                  : campaign.completionRate >= 70
                                    ? "warning.main"
                                    : "error.main"
                              }
                            >
                              {campaign.completionRate}%
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={campaign.completionRate}
                              sx={{ width: 40, height: 4, borderRadius: 2 }}
                              color={campaign.completionRate >= 90 ? "success" : campaign.completionRate >= 70 ? "warning" : "error"}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Button
                              size="small"
                              startIcon={<Edit />}
                              onClick={() => handleEditCampaign(campaign.id)}
                              variant="outlined"
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              startIcon={<ContentCopy />}
                              onClick={() => handleCloneCampaign(campaign.id)}
                              variant="outlined"
                            >
                              Clone
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Delete />}
                              onClick={() => handleDeleteCampaign(campaign)}
                              color="error"
                              variant="outlined"
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Empty State */}
          {campaigns.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Campaign sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No Campaigns Created Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your first campaign to start managing conversation objectives for your teams.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateCampaign}
                size="large"
              >
                Create Your First Campaign
              </Button>
            </Box>
          )}
        </Container>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Delete Campaign</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the campaign "{selectedCampaign?.name}"? This action cannot be undone.
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              Deleting this campaign will remove all associated data and historical records.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete Campaign
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
