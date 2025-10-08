"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from '../../components/layout/page-layout';
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button,
  Avatar, Card, CardContent, Chip, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, Alert, AlertTitle, CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  BookmarkBorder, MoreVert, Logout, Add, Edit, ContentCopy,
  Delete, PlayArrow, Pause, Assessment, Group, CheckCircle,
  FileCopy as FileCopyIcon,
  Check as CheckIcon, // <-- 1. Import the Check icon for feedback
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { getAllGoals, publishDraftVersion, deleteGoal } from "@/data/services/goal-service";
import { GoalDetailResponse } from "@/types/api/goal";

export default function GoalManagementPage() {
  const router = useRouter();
  const [goals, setGoals] = useState<GoalDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<GoalDetailResponse | null>(null);
  const { logout } = useAuth();
  
  // --- 2. ADDED: State to track which ID has been copied ---
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchGoals = async () => {
    try {
      setIsLoading(true);
      const data = await getAllGoals();
      setGoals(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch goals. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handlePublish = async (goalId: string) => {
    try {
        await publishDraftVersion(goalId);
        alert("Draft published successfully!");
        await fetchGoals();
    } catch (error) {
        console.error("Failed to publish draft:", error);
        alert("Error: Could not publish draft.");
    }
  };

  const confirmDelete = async () => {
    if (!selectedGoal) return;
    try {
        await deleteGoal(selectedGoal.goal_id);
        alert(`Goal "${selectedGoal.goal_name}" archived.`);
        setGoals(goals.filter(g => g.goal_id !== selectedGoal.goal_id));
    } catch (error) {
        console.error("Failed to delete goal:", error);
        alert("Error: Could not delete goal.");
    } finally {
        setDeleteDialogOpen(false);
        setSelectedGoal(null);
    }
  };
  
  const handleCreateGoal = () => router.push('/goal-mgmt/editor');
  const handleEditGoal = (goalId: string) => router.push(`/goal-mgmt/editor?id=${goalId}`);
  const handleCloneGoal = (goalId: string) => router.push(`/goal-mgmt/editor?clone=${goalId}`);
  const handleDeleteGoal = (goal: GoalDetailResponse) => { setSelectedGoal(goal); setDeleteDialogOpen(true); };

  // --- 3. UPDATED: Copy function now provides visual feedback ---
  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      setCopiedId(id); // Set the copied ID
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy ID: ', err);
    });
  };

  const renderContent = () => {
    if (isLoading) {
      return (<Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>);
    }
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    }
    if (goals.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Assessment sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>No Goals Created Yet</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleCreateGoal} size="large">Create your first goal</Button>
        </Box>
      );
    }
    return (
      <Grid container spacing={2}>
        {goals.map((goal) => (
          <Grid item xs={12} key={goal.goal_id}>
            <Card sx={{ transition: 'all 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4},width:"75vw" }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                  <Box sx={{ flex: '1 1 50%', minWidth: 300 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                      <Typography variant="h6" fontWeight={600}>{goal.goal_name}</Typography>
                      <Chip label={`Published: ${goal.published_version_no != null ? `v${goal.published_version_no}` : 'None'}`} size="small" color="success" icon={<PlayArrow sx={{ fontSize: 16 }} />} />
                      <Chip label={`Draft: ${goal.draft_version_no != null ? `v${goal.draft_version_no}` : 'None'}`} size="small" color="default" icon={<Pause sx={{ fontSize: 16 }} />} />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>{goal.description}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      Last updated: {new Date(goal.updated_at).toLocaleDateString()}
                    </Typography>
                  </Box>

                  <Box sx={{ flex: '1 1 150px', minWidth: 150 }}>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>Assigned Team</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Group sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" fontWeight={500}>{goal.team_name || 'N/A'}</Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button 
                      size="small" 
                      startIcon={<Edit />} 
                      onClick={() => handleEditGoal(goal.goal_id)} 
                      disabled={!goal.draft_version_no && !goal.published_version_no}
                    >
                      Edit
                    </Button>
                    <Button size="small" startIcon={<CheckCircle />} onClick={() => handlePublish(goal.goal_id)} disabled={!goal.draft_version_no}>
                      Publish Draft
                    </Button>
                    <Tooltip title={!goal.published_version_no ? "A goal must have a published version to be cloned." : ""}>
                      <span>
                        <Button
                          size="small"
                          startIcon={<ContentCopy />}
                          onClick={() => handleCloneGoal(goal.goal_id)}
                          variant="outlined"
                          disabled={!goal.published_version_no}
                        >
                          Clone
                        </Button>
                      </span>
                    </Tooltip>

                    {/* --- 4. ADDED: New button with conditional feedback --- */}
                    <Button
                      size="small"
                      variant="outlined"
                      color={copiedId === goal.goal_id ? "success" : "primary"}
                      startIcon={copiedId === goal.goal_id ? <CheckIcon /> : <FileCopyIcon />}
                      onClick={() => handleCopyId(goal.goal_id)}
                    >
                      {copiedId === goal.goal_id ? "Copied" : "Copy ID"}
                    </Button>

                    <Button size="small" startIcon={<Delete />} onClick={() => handleDeleteGoal(goal)} color="error" variant="outlined">
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <PageLayout activeItem="goal-mgmt">
      <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}><Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>goal-mgmt.localhost:3000</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><BookmarkBorder /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}><Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>W</Avatar><Typography variant="body2" fontWeight={500}>Work</Typography></Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
              <Button variant="contained" color="error" size="small" startIcon={<Logout />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3}}>
          <Box sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>Goal Management</Typography>
                <Typography color="text.secondary">Create and manage conversation goals for your teams</Typography>
              </Box>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateGoal} sx={{ px: 2, py: 1 }}>
                Create New Goal
              </Button>
            </Box>
          </Box>
          {renderContent()}
        </Container>
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Archive Goal</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to archive the goal "{selectedGoal?.goal_name}"?</Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Warning</AlertTitle>Archiving this goal will remove it from active lists and disable associated campaigns.
            </Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Archive Goal</Button>
          </DialogActions>
        </Dialog>
    </PageLayout>
  );
}