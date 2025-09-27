"use client";

import { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Add,
  Edit,
  ContentCopy,
  Delete,
  PlayArrow,
  Pause,
  Group,
  Assessment,
  ErrorOutline,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

// Assuming these are in the locations we set up previously
import { getAllGoals } from '@/data/services/goal.service';
import { Goal } from '@/types/api/goal-management';

export default function GoalManagementPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const { logout } = useAuth();

  // --- API Data Handling ---
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllGoals({ skip: 0, limit: 100 });
        setGoals(data);
      } catch (err) {
        setError("Failed to load goals. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoals();
  }, []); // Empty array ensures this runs only once on mount

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCreateGoal = () => {
    router.push('/team-leader-dashboard/goal-mgmt/editor');
  };
  const handleEditGoal = (goalId: string) => {
    router.push(`/team-leader-dashboard/goal-mgmt/editor?id=${goalId}`);
  };
  const handleCloneGoal = (goalId: string) => {
    router.push(`/team-leader-dashboard/goal-mgmt/editor?clone=${goalId}`);
  };
  const handleDeleteGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    if (!selectedGoal) return;
    // Add real API delete logic here
    console.log("Deleting goal:", selectedGoal);
    setGoals(goals.filter(g => g.goal_id !== selectedGoal.goal_id));
    setDeleteDialogOpen(false);
    setSelectedGoal(null);
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'default' => {
    if (status === 'PUBLISHED') return 'success';
    if (status === 'ARCHIVED') return 'default';
    return 'warning'; // DRAFT
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f7f8fa' }}>
      <TeamLeaderSidebar activeItem="goal-mgmt" />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        {/* Top Bar */}
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                team-leader-dashboard.localhost:3000
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

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Goal Management</Typography>
                <Typography variant="h6" color="text.secondary">Create and manage conversation goals for your teams</Typography>
              </Box>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateGoal} sx={{ px: 3, py: 1.5, fontSize: '1rem', fontWeight: 600 }}>
                Create New Goal
              </Button>
            </Box>
          </Box>

          {/* Conditional Rendering for Loading, Error, and Data states */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" icon={<ErrorOutline fontSize="inherit" />}>
              <AlertTitle>Error</AlertTitle>
              {error}
            </Alert>
          ) : (
            <Grid container spacing={2}>
              {goals.map((goal) => (
                <Grid size={{xs:12}} key={goal.goal_id}>
                  <Card sx={{ transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                        {/* Left Section: Main Info - ADJUSTED TO API RESPONSE */}
                        <Box sx={{ flex: '1 1 40%', minWidth: 300 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>{goal.goal_name}</Typography>
                            <Chip
                              label={goal.active_version.status}
                              size="small"
                              color={getStatusColor(goal.active_version.status)}
                              icon={goal.active_version.status === 'PUBLISHED' ? <PlayArrow sx={{fontSize: 16}} /> : <Pause sx={{fontSize: 16}}/>}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{goal.goal_description}</Typography>
                          <Typography variant="caption" color="text.secondary">
                             Last updated: {new Date(goal.updated_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                        
                        {/* Center Section: Team - ADJUSTED TO API RESPONSE */}
                         <Box sx={{ flex: '1 1 150px', minWidth: 150}}>
                           <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Assigned Team</Typography>
                           <Box sx={{ display: 'flex', alignItems: 'center' }}>
                             <Group sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                             <Typography variant="body2" fontWeight={500}>{goal.team_name}</Typography>
                           </Box>
                         </Box>

                        {/* Center Section: Metrics - ADJUSTED TO API RESPONSE */}
                        <Box sx={{ display: 'flex', gap: 3, flex: '1 1 300px', justifyContent: 'space-around' }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700} color="primary">{goal.conversations.toLocaleString()}</Typography>
                            <Typography variant="caption" color="text.secondary">Conversations</Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700} color="success.main">{goal.avg_score}%</Typography>
                            <Typography variant="caption" color="text.secondary">Avg Score</Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" fontWeight={700} color="info.main">{goal.completion_score}%</Typography>
                            <Typography variant="caption" color="text.secondary">Completion</Typography>
                          </Box>
                        </Box>
                        
                        {/* Right Section: Actions - ADJUSTED TO API RESPONSE */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" startIcon={<Edit />} onClick={() => handleEditGoal(goal.goal_id)}>Edit</Button>
                          <Button size="small" startIcon={<ContentCopy />} onClick={() => handleCloneGoal(goal.goal_id)} variant="outlined">Clone</Button>
                          <Button size="small" startIcon={<Delete />} onClick={() => handleDeleteGoal(goal)} color="error" variant="outlined">Delete</Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Empty State (Only shows if not loading and goals array is empty) */}
          {!isLoading && goals.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Assessment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>No Goals Found</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Create your first goal to start managing conversation objectives for your teams.
              </Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateGoal} size="large">
                Create Your First Goal
              </Button>
            </Box>
          )}
        </Container>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Delete Goal</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the goal "{selectedGoal?.goal_name}"? This action cannot be undone.
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Warning</AlertTitle>
              Deleting this goal will remove all associated configurations and historical data.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete Goal</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}