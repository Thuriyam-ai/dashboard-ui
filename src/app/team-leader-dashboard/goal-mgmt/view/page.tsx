// src/app/team-leader-dashboard/goal-mgmt/view/page.tsx

"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Card, CardContent, Tabs, Tab,
  TextField, FormControl, InputLabel, Select, Checkbox, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, Alert, Divider, Stack, MenuItem, 
  CircularProgress, Chip,
  FormControlLabel,
} from "@mui/material";
import { ArrowBack, Psychology, DataObject, Analytics, Score, CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { getGoalVersion, getOwners, getTeams } from "@/data/services/goal-service";
import { GoalVersionDetailResponse, Owner, Team } from "@/types/api/goal";
// src/app/team-leader-dashboard/goal-mgmt/view/page.tsx


function GoalViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State to hold all fetched data
  const [goalData, setGoalData] = useState<GoalVersionDetailResponse | null>(null);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [versionType, setVersionType] = useState<'Published' | 'Draft' | null>(null);

  const ownersMap = useMemo(() => new Map(owners.map(o => [o.id, o.name])), [owners]);
  const teamsMap = useMemo(() => new Map(teams.map(t => [t.id, t.name])), [teams]);

  useEffect(() => {
    const goalId = searchParams.get('id');
    if (!goalId) {
      setError("No Goal ID provided.");
      setIsLoading(false);
      return;
    }

    const fetchAllData = async () => {
      try {
        // Fetch dropdown data first
        const [ownersData, teamsData] = await Promise.all([getOwners(), getTeams()]);
        setOwners(ownersData);
        setTeams(teamsData);

        // Fetch goal data with fallback logic
        try {
          const activeData = await getGoalVersion(goalId, 'active');
          setGoalData(activeData);
          setVersionType('Published');
        } catch (activeError) {
          console.log("No active version found, fetching draft.");
          const draftData = await getGoalVersion(goalId, 'draft');
          setGoalData(draftData);
          setVersionType('Draft');
        }
      } catch (err) {
        console.error("Failed to load data for view:", err);
        setError("Could not find a published or draft version for this goal.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [searchParams]);

  const handleBack = () => router.push('/team-leader-dashboard/goal-mgmt');
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);
  
  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }
  
  if (error || !goalData) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error || "Goal data could not be loaded."}</Alert>
        <Button onClick={handleBack} sx={{ mt: 2 }}>Go Back</Button>
      </Container>
    );
  }

  const totalScore = goalData.scorecardparameters.reduce((sum, param) => sum + param.max_score, 0);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="goal-mgmt" />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <IconButton onClick={handleBack}><ArrowBack /></IconButton>
              <Box>
                <Typography variant="h6" fontWeight={600}>View Goal</Typography>
                <Typography variant="body2" color="text.secondary">{goalData.name} ({versionType} Version)</Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab icon={<Psychology />} label="Interaction Blueprint" value={0} iconPosition="start" />
                <Tab icon={<DataObject />} label="Structured Data Capture" value={1} iconPosition="start" />
                <Tab icon={<Analytics />} label="Conversation Insights" value={2} iconPosition="start" />
                <Tab icon={<Score />} label="Quality Scorecard" value={3} iconPosition="start" />
              </Tabs>
            </Box>
            <CardContent sx={{ p: 0, '& .MuiTableCell-root': { p: 1 } }}>
              {activeTab === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Goal Configuration</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12,md:6}}>
                      <TextField fullWidth label="Goal Name" value={goalData.name} sx={{ mb: 2 }} InputProps={{ readOnly: true }} variant="filled" />
                      <TextField fullWidth label="Owner" value={ownersMap.get(goalData.owner_id) || goalData.owner_id} sx={{ mb: 2 }} InputProps={{ readOnly: true }} variant="filled" />
                      <TextField fullWidth label="Tags" value={goalData.tags || 'N/A'} sx={{ mb: 2 }} InputProps={{ readOnly: true }} variant="filled" />
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                      <TextField fullWidth label="Default Assigned Team" value={teamsMap.get(goalData.team_id || '') || 'None'} sx={{ mb: 2 }} InputProps={{ readOnly: true }} variant="filled" />
                      <TextField fullWidth multiline rows={4} label="Description" value={goalData.description || 'N/A'} InputProps={{ readOnly: true }} variant="filled" />
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>System Prompt (Interaction Blueprint)</Typography>
                  <TextField fullWidth multiline rows={8} value={goalData.prompt_text} InputProps={{ readOnly: true }} variant="filled" />
                </Box>
              )}
              {activeTab === 1 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>Structured Data Capture (Outcome Fields)</Typography>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead><TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: 'action.hover' }}}>
                        <TableCell>Attribute Name</TableCell><TableCell>Data Type</TableCell><TableCell>Elicitation Prompt</TableCell>
                        <TableCell align="center">Required</TableCell><TableCell align="center">PII</TableCell><TableCell>Weight</TableCell>
                      </TableRow></TableHead>
                      <TableBody>
                        {goalData.outcomefields.map((field, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{field.attribute_name}</TableCell>
                            <TableCell><Chip size="small" label={field.data_type} /></TableCell>
                            <TableCell>{field.elicitation_prompt || 'N/A'}</TableCell>
                            <TableCell align="center">{field.is_required ? <CheckCircleOutline color="success" /> : <HighlightOff color="disabled" />}</TableCell>
                            <TableCell align="center">{field.is_pii ? <CheckCircleOutline color="error" /> : <HighlightOff color="disabled" />}</TableCell>
                            <TableCell>{field.weight}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
              {activeTab === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Conversation Insights</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12,md:6}}>
                      <Card variant="outlined"><CardContent>
                        <Typography variant="h6" gutterBottom>Analytics Models (Insights)</Typography>
                        <Stack spacing={1}>{goalData.insights.map(insight => (
                          <FormControlLabel key={insight.name} control={<Checkbox checked={insight.is_enabled} disabled />} label={insight.name} />
                        ))}</Stack>
                      </CardContent></Card>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                      <Card variant="outlined"><CardContent>
                        <Typography variant="h6" gutterBottom>Dispositions</Typography>
                        <Stack spacing={1.5}>{goalData.dispositions.map((disp, idx) => (
                          <Box key={idx} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField size="small" label="Name" value={disp.name} fullWidth InputProps={{ readOnly: true }} variant="filled" />
                            <TextField size="small" label="Category" value={disp.category} sx={{minWidth: 120}} InputProps={{ readOnly: true }} variant="filled" />
                          </Box>
                        ))}</Stack>
                      </CardContent></Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {activeTab === 3 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600}>Quality Scorecard <Chip label={`Total Score: ${totalScore} points`} /></Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ mt: 2 }}>
                    <Table>
                      <TableHead><TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: 'action.hover' }}}>
                        <TableCell>Parameter Name</TableCell><TableCell>Scoring Type</TableCell><TableCell>Failure Type</TableCell>
                        <TableCell>Max Score</TableCell><TableCell sx={{width: '30%'}}>Rules & Explanation</TableCell>
                      </TableRow></TableHead>
                      <TableBody>
                        {goalData.scorecardparameters.map((param, idx) => (
                          <TableRow key={idx}>
                            <TableCell>{param.name}</TableCell>
                            <TableCell><Chip size="small" label={param.scoring_type} /></TableCell>
                            <TableCell><Chip size="small" label={param.failure_type} color={param.failure_type === 'FATAL' ? 'error' : 'default'} /></TableCell>
                            <TableCell>{param.max_score}</TableCell>
                            <TableCell>{param.rules_and_explanation || 'N/A'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default function GoalViewPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <GoalViewContent />
    </Suspense>
  );
}