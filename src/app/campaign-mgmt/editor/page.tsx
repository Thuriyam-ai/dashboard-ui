// src/app/campaign-mgmt/editor/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageLayout from "@/components/layout/page-layout";
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Avatar, Card,
  CardContent, TextField, FormControl, InputLabel, Select, Grid, Alert,
  MenuItem, CircularProgress, FormHelperText,
} from "@mui/material";
import { Save, ArrowBack, Psychology, Group } from "@mui/icons-material";
import { getCampaignById, createCampaign, updateCampaign } from "@/data/services/campaign-service";
import { getActiveGoalsSummary } from "@/data/services/goal-service";
import { getAllTeams } from "@/data/services/util-service";
import { ActiveGoalSummary } from "@/types/api/goal";
import { TeamSummary } from "@/types/api/team";
import { CampaignCreate, CampaignUpdate } from "@/types/api/campaign";

const formatDateForInput = (isoDate: string | null | undefined): string => {
  if (!isoDate) return "";
  return isoDate.split('T')[0];
};

interface FormErrors {
  campaignName?: string;
  startDate?: string;
  endDate?: string;
  selectedGoalId?: string;
  selectedTeamId?: string;
}

function CampaignEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState("Create New Campaign");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  const [availableGoals, setAvailableGoals] = useState<ActiveGoalSummary[]>([]);
  const [availableTeams, setAvailableTeams] = useState<TeamSummary[]>([]);

  useEffect(() => {
    const id = searchParams.get('id');
    const initialize = async () => {
      try {
        const [goalsData, teamsData] = await Promise.all([getActiveGoalsSummary(), getAllTeams()]);
        setAvailableGoals(goalsData);
        setAvailableTeams(teamsData);
        if (id) {
          setIsEditing(true);
          setCampaignId(id);
          setPageTitle("Edit Campaign");
          await loadCampaignData(id);
        }
      } catch (err) {
        setApiError("Failed to load necessary data. Please try again.");
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
  
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!campaignName.trim()) errors.campaignName = "Campaign name is required.";
    if (!selectedGoalId) errors.selectedGoalId = "A goal must be selected.";
    if (!selectedTeamId) errors.selectedTeamId = "A team must be assigned.";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to the start of today
    
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!isEditing && start && start < today) {
        errors.startDate = "Start date cannot be in the past.";
    }

    if (start && end && end < start) {
        errors.endDate = "End date must be on or after the start date.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    setApiError(null);
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    const starts_at = startDate ? new Date(startDate).toISOString() : null;
    const ends_at = endDate ? new Date(endDate).toISOString() : null;

    try {
      if (isEditing && campaignId) {
        const payload: CampaignUpdate = { starts_at, ends_at }; // Per API spec for update
        await updateCampaign(campaignId, payload);
      } else {
        const payload: CampaignCreate = { 
          name: campaignName, 
          goal_id: selectedGoalId, 
          team_id: selectedTeamId, 
          starts_at, 
          ends_at, 
          business_objective: "TBD", 
          status: "UPCOMING", 
          organization_id: "org-1" // This should be dynamic in a real app
        };
        await createCampaign(payload);
      }
      router.push('/campaign-mgmt');
    } catch (err: any) {
      // Display backend validation error
      const message = err.response?.data?.detail || "Failed to save the campaign. An unknown error occurred.";
      setApiError(message);
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <PageLayout activeItem="campaign-mgmt">
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <IconButton onClick={() => router.push('/campaign-mgmt')}><ArrowBack /></IconButton>
            <Typography variant="h6" sx={{ ml: 2, flexGrow: 1 }}>{pageTitle}</Typography>
            <Button variant="contained" startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : <Save />} onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Campaign'}
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {apiError && <Alert severity="error" sx={{ mb: 2 }}>{apiError}</Alert>}
          
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight={600} gutterBottom>Campaign Configuration</Typography>
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <TextField 
                      label="Campaign Name" 
                      value={campaignName} 
                      onChange={(e) => setCampaignName(e.target.value)} 
                      required 
                      disabled={isEditing} // Field disabled on edit
                      error={!!formErrors.campaignName}
                      helperText={formErrors.campaignName || "A unique, human-readable name for this campaign"}
                    />
                  </FormControl>
                  <Box>
                    <Typography variant="body1" color="text.secondary" gutterBottom>Campaign Duration</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                         <TextField label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth error={!!formErrors.startDate} helperText={formErrors.startDate}/>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth error={!!formErrors.endDate} helperText={formErrors.endDate}/>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }} required error={!!formErrors.selectedGoalId}>
                    <InputLabel>Goal Selection</InputLabel>
                    <Select value={selectedGoalId} onChange={(e) => setSelectedGoalId(e.target.value)} label="Goal Selection" disabled={isEditing}>
                      {availableGoals.map((goal) => (
                        <MenuItem key={goal.goal_id} value={goal.goal_id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Psychology sx={{ fontSize: 16 }} />{goal.goal_name} (v{goal.active_version_no})</Box>
                        </MenuItem>
                      ))}
                    </Select>
                    {formErrors.selectedGoalId && <FormHelperText>{formErrors.selectedGoalId}</FormHelperText>}
                  </FormControl>
                  <FormControl fullWidth required error={!!formErrors.selectedTeamId}>
                    <InputLabel>Team Assignment</InputLabel>
                    <Select value={selectedTeamId} onChange={(e) => setSelectedTeamId(e.target.value)} label="Team Assignment" disabled={isEditing}>
                      {availableTeams.map((team) => (
                        <MenuItem key={team.id} value={team.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Group sx={{ fontSize: 16 }} />{team.name}</Box>
                        </MenuItem>
                      ))}
                    </Select>
                     {formErrors.selectedTeamId && <FormHelperText>{formErrors.selectedTeamId}</FormHelperText>}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
    </PageLayout>
  );
}

export default function CampaignEditorPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <CampaignEditorContent />
    </Suspense>
  );
}