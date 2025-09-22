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
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
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
  Add,
  Edit,
  ContentCopy,
  Delete,
  PlayArrow,
  Pause,
  TrendingUp,
  Assessment,
  Group,
  CheckCircle,
  Schedule,
} from "@mui/icons-material";

export default function GoalManagementPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);

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

  const handleCreateGoal = () => {
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    router.push(`${basePath}/team-leader-dashboard/goal-mgmt/editor`);
  };

  const handleEditGoal = (goalId: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    router.push(`${basePath}/team-leader-dashboard/goal-mgmt/editor?id=${goalId}`);
  };

  const handleCloneGoal = (goalId: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    router.push(`${basePath}/team-leader-dashboard/goal-mgmt/editor?clone=${goalId}`);
  };

  const handleDeleteGoal = (goal: any) => {
    setSelectedGoal(goal);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting goal:", selectedGoal);
    setDeleteDialogOpen(false);
    setSelectedGoal(null);
  };

  // Mock data for goals
  const goals = [
    {
      id: "goal-1",
      name: "Loan Pre-Qualification",
      status: "active",
      description: "Qualify potential borrowers for loan products based on financial criteria and creditworthiness.",
      assignedTeam: "Sales Team Alpha",
      totalConversations: 1247,
      averageScore: 87.3,
      completionRate: 92.1,
      lastUpdated: "2024-01-15",
      tags: ["sales", "qualification", "finance"],
    },
    {
      id: "goal-2",
      name: "Customer Support Resolution",
      status: "active",
      description: "Resolve customer inquiries and technical issues with high satisfaction ratings.",
      assignedTeam: "Support Team Beta",
      totalConversations: 2156,
      averageScore: 91.7,
      completionRate: 88.4,
      lastUpdated: "2024-01-14",
      tags: ["support", "resolution", "customer"],
    },
    {
      id: "goal-3",
      name: "Lead Generation",
      status: "draft",
      description: "Generate qualified leads for enterprise sales opportunities through targeted outreach.",
      assignedTeam: "Sales Team Gamma",
      totalConversations: 0,
      averageScore: 0,
      completionRate: 0,
      lastUpdated: "2024-01-13",
      tags: ["sales", "leads", "enterprise"],
    },
    {
      id: "goal-4",
      name: "Product Feedback Collection",
      status: "active",
      description: "Collect structured feedback from users about product features and user experience.",
      assignedTeam: "Product Team Delta",
      totalConversations: 543,
      averageScore: 84.2,
      completionRate: 95.6,
      lastUpdated: "2024-01-12",
      tags: ["feedback", "product", "ux"],
    },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="goal-mgmt" />

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
                  Goal Management
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Create and manage conversation goals for your teams
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateGoal}
                sx={{ 
                  px: 3, 
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Create New Goal
              </Button>
            </Box>
          </Box>

          {/* Goals Grid */}
          <Grid container spacing={3}>
            {goals.map((goal) => (
              <Grid item xs={12} md={6} lg={4} key={goal.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {goal.name}
                        </Typography>
                        <Chip
                          label={goal.status}
                          size="small"
                          color={goal.status === 'active' ? 'success' : 'default'}
                          icon={goal.status === 'active' ? <PlayArrow /> : <Pause />}
                          sx={{ mb: 1 }}
                        />
                      </Box>
                      <IconButton size="small">
                        <MoreVert />
                      </IconButton>
                    </Box>

                    {/* Description */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                      {goal.description}
                    </Typography>

                    {/* Team Assignment */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Group sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {goal.assignedTeam}
                      </Typography>
                    </Box>

                    {/* Tags */}
                    <Box sx={{ mb: 2 }}>
                      {goal.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    {/* Metrics */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={700} color="primary">
                            {goal.totalConversations.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Conversations
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={700} color="success.main">
                            {goal.averageScore}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Avg Score
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" fontWeight={700} color="info.main">
                            {goal.completionRate}%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Completion
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button
                        size="small"
                        startIcon={<Edit />}
                        onClick={() => handleEditGoal(goal.id)}
                        sx={{ flexGrow: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        startIcon={<ContentCopy />}
                        onClick={() => handleCloneGoal(goal.id)}
                        variant="outlined"
                      >
                        Clone
                      </Button>
                      <Button
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteGoal(goal)}
                        color="error"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </Box>

                    {/* Last Updated */}
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                      Last updated: {goal.lastUpdated}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {goals.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Assessment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                No Goals Created Yet
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your first goal to start managing conversation objectives for your teams.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleCreateGoal}
                size="large"
              >
                Create Your First Goal
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
          <DialogTitle>Delete Goal</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the goal "{selectedGoal?.name}"? This action cannot be undone.
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              Deleting this goal will remove all associated configurations and historical data.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete Goal
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
