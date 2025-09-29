"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Card,
  CardContent, Chip, TextField, FormControl, InputLabel, Select, Grid, Alert,
  AlertTitle, Divider, MenuItem, CircularProgress,
} from "@mui/material";
import { Save, ArrowBack, Psychology, Group } from "@mui/icons-material";
import { getCampaignById, createCampaign, updateCampaign } from "@/data/services/campaign-service";
import { getActiveGoalsSummary } from "@/data/services/goal-service";
import { getAllTeams } from "@/data/services/util-service";
import { ActiveGoalSummary } from "@/types/api/goal";
import { TeamSummary } from "@/types/api/team";
import { CampaignCreate, CampaignUpdate } from "@/types/api/campaign";

// Helper to format an ISO date-time string to a YYYY-MM-DD string for date inputs
const formatDateForInput = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "";
  return isoDate.split('T')[0];
};

function CampaignEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Component State
  const [isEditing, setIsEditing] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState("Create New Campaign");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  // Dropdown Data State
  const [availableGoals, setAvailableGoals] = useState<ActiveGoalSummary[]>([]);
  const [availableTeams, setAvailableTeams] = useState<TeamSummary[]>([]);

  useEffect(() => {
    const id = searchParams.get('id');
    const cloneId = searchParams.get('clone');

    const initialize = async () => {
      try {
        // Fetch dropdown data first
        const [goalsData, teamsData] = await Promise.all([getActiveGoalsSummary(), getAllTeams()]);
        setAvailableGoals(goalsData);
        setAvailableTeams(teamsData);

        if (id) {
          setIsEditing(true);
          setCampaignId(id);
          setPageTitle("Edit Campaign");
          await loadCampaignData(id);
        } else if (cloneId) {
          setIsEditing(false);
          setCampaignId(null);
          setPageTitle("Create New Campaign (Cloned)");
          await loadCampaignData(cloneId);
        } else {
          setIsEditing(false);
          setCampaignId(null);
        }
      } catch (err) {
        setError("Failed to load necessary data. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [searchParams]);

  const loadCampaignData = async (id: string) => {
    const data = await getCampaignById(id);
    setCampaignName(data.name);
    setStartDate(formatDateForInput(data.starts_at));
    setEndDate(formatDateForInput(data.ends_at));
    setSelectedGoalId(data.goal_id);
    setSelectedTeamId(data.team_id);
  };

  const handleBack = () => router.push('/team-leader-dashboard/campaign-mgmt');

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    // Convert dates back to ISO strings for the API
    const starts_at = startDate ? new Date(startDate).toISOString() : null;
    const ends_at = endDate ? new Date(endDate).toISOString() : null;

    try {
      if (isEditing && campaignId) {
        const payload: CampaignUpdate = { name: campaignName, team_id: selectedTeamId, starts_at, ends_at, business_objective: "TBD", status: "UPCOMING" };
        await updateCampaign(campaignId, payload);
      } else {
        const payload: CampaignCreate = { name: campaignName, goal_id: selectedGoalId, team_id: selectedTeamId, starts_at, ends_at, business_objective: "TBD", status: "UPCOMING", organization_id: "org-1" };
        await createCampaign(payload);
      }
      handleBack();
    } catch (err) {
      setError("Failed to save the campaign. Please check the fields and try again.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  const selectedGoalData = availableGoals.find(goal => goal.goal_name === selectedGoalId);
  const selectedTeamData = availableTeams.find(team => team.id === selectedTeamId);

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="campaign-mgmt" />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <IconButton onClick={handleBack}><ArrowBack /></IconButton>
              <Box>
                <Typography variant="h6" fontWeight={600}>{pageTitle}</Typography>
                <Typography variant="body2" color="text.secondary">{campaignName || 'Untitled Campaign'}</Typography>
              </Box>
            </Box>
            <Button variant="contained" startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />} onClick={handleSave} disabled={isSaving} sx={{ ml: 2 }}>
              {isSaving ? 'Saving...' : 'Save Campaign'}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>Campaign Configuration</Typography>
              <Grid container spacing={3} sx={{mt: 1}}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g., Q1 Loan Qualification Drive" sx={{ mb: 3 }} helperText="A unique, human-readable name for this campaign" required/>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>Campaign Duration</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}><TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth/></Grid>
                      <Grid item xs={6}><TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth/></Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }} required>
                    <InputLabel>Goal Selection</InputLabel>
                    <Select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} label="Goal Selection" disabled={isEditing}>
                      {availableGoals.map((goal) => (
                        <MenuItem key={goal.goal_name} value={goal.goal_id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Psychology sx={{ fontSize: 16 }} /><Typography variant="body2">{goal.goal_name} (v{goal.active_version_no})</Typography></Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: 3 }} required>
                    <InputLabel>Team Assignment</InputLabel>
                    <Select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)} label="Team Assignment">
                      {availableTeams.map((team) => (
                        <MenuItem key={team.id} value={team.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Group sx={{ fontSize: 16 }} /><Typography variant="body2">{team.name}</Typography></Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {selectedGoalData && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>Selected Goal Information</Typography>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <AlertTitle>Goal Details: {selectedGoalData.goal_name}</AlertTitle>
                    This goal will serve as the playbook for this campaign. All conversations will follow the interaction blueprint and quality parameters defined in this goal version.
                  </Alert>
                </>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default function CampaignEditorPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <CampaignEditorContent />
    </Suspense>
  );
}
