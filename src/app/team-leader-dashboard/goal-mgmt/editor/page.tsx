// src/app/team-leader-dashboard/goal-mgmt/editor/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Card, CardContent, Tabs, Tab,
  TextField, FormControl, InputLabel, Select, FormControlLabel, Checkbox, Grid, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton as MuiIconButton,
  Alert, AlertTitle, Divider, Stack, MenuItem, CircularProgress,
} from "@mui/material";
import { Save, ArrowBack, Add, Delete, Psychology, DataObject, Analytics, Score } from "@mui/icons-material";
import {
  getOwners, getTeams, createGoal, getGoalVersion, updateDraftVersion,
} from "@/data/services/goal-service";
import {
  Owner, Team, GoalCreateRequest, GoalVersionDetailResponse, DataType, DispositionCategory, FailureType, ScoringType, InsightsItem,
} from "@/types/api/goal";

// State interfaces for the form tables
interface DataField {
  id: string; attribute_name: string; data_type: DataType; is_pii: boolean;
  elicitation_prompt: string | null; is_required: boolean; weight: number;
}
interface Disposition {
  id: string; name: string; category: DispositionCategory;
}
interface QualityParameter {
  id: string; name: string; max_score: number; failure_type: FailureType;
  scoring_type: ScoringType; rules_and_explanation: string | null;
}

function GoalEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dropdown Data
  const [owners, setOwners] = useState<Owner[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // Form State
  const [goalName, setGoalName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [assignedTeamId, setAssignedTeamId] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [dataFields, setDataFields] = useState<DataField[]>([]);
  const [insights, setInsights] = useState<InsightsItem[]>([]);
  const [dispositions, setDispositions] = useState<Disposition[]>([]);
  const [qualityParameters, setQualityParameters] = useState<QualityParameter[]>([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const [ownersData, teamsData] = await Promise.all([getOwners(), getTeams()]);
        setOwners(ownersData);
        setTeams(teamsData);

        const id = searchParams.get('id');
        const cloneId = searchParams.get('clone');
        
        if (id) { // Edit Mode
          setIsEditing(true);
          setGoalId(id);
          try {
            const draftData = await getGoalVersion(id, 'draft');
            populateFormState(draftData);
          } catch (error) {
            console.log("No draft found, fetching active version to edit.");
            const activeData = await getGoalVersion(id, 'active');
            populateFormState(activeData);
          }
        } else if (cloneId) { // Clone Mode
          const versionData = await getGoalVersion(cloneId, 'draft');
          populateFormState(versionData);
        } else { // Create Mode
          setInsights([
            { name: "Sentiment Analysis", is_enabled: true, display_order: 1 },
            { name: "Intent Extraction", is_enabled: true, display_order: 2 },
            { name: "Emergent Topics Detection", is_enabled: false, display_order: 3 },
          ]);
        }
      } catch (error) {
        console.error("Initialization failed:", error);
        alert("Failed to load goal data for the editor.");
        router.push('/team-leader-dashboard/goal-mgmt');
      } finally {
        setIsLoading(false);
      }
    };
    initialize();
  }, [searchParams, router]);

  const populateFormState = (data: GoalVersionDetailResponse) => {
    setGoalName(data.name);
    setDescription(data.description || "");
    setOwnerId(data.owner_id);
    setAssignedTeamId(data.team_id || "");
    setTags(data.tags || "");
    setSystemPrompt(data.prompt_text);
    setDataFields(data.outcomefields.map(d => ({ ...d, id: Math.random().toString() })));
    setInsights(data.insights);
    setDispositions(data.dispositions.map(d => ({ ...d, id: Math.random().toString() })));
    setQualityParameters(data.scorecardparameters.map(p => ({ ...p, id: Math.random().toString() })));
  };

  const handleSave = async () => {
    if (!goalName || !ownerId) {
        alert("Please fill in Goal Name and Owner.");
        return;
    }
    setIsSaving(true);
    
    const payload: GoalCreateRequest = {
      organization_id: "org-1",
      owner_id: ownerId,
      name: goalName,
      description: description,
      team_id: assignedTeamId || null,
      tags: tags,
      prompt_text: systemPrompt,
      outcomefields: dataFields.map(({id, ...rest}, i) => ({ ...rest, display_order: i + 1, configuration: '{}' })),
      insights: insights.map((insight, i) => ({ ...insight, display_order: i + 1})),
      dispositions: dispositions.map(({id, ...rest}, i) => ({ ...rest, description: null, display_order: i + 1 })),
      scorecardparameters: qualityParameters.map(({id, ...rest}, i) => ({ ...rest, display_order: i + 1 })),
    };

    try {
      if (isEditing && goalId) {
        await updateDraftVersion(goalId, payload);
        alert("Goal draft updated successfully!");
      } else {
        await createGoal(payload);
        alert("Goal created successfully!");
      }
      router.push('/team-leader-dashboard/goal-mgmt');
    } catch (error) {
      console.error("Failed to save goal:", error);
      alert("Error: Could not save the goal.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- UI Handlers ---
  const handleBack = () => router.push('/team-leader-dashboard/goal-mgmt');
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);
  const totalScore = qualityParameters.reduce((sum, param) => sum + param.max_score, 0);
  
  const addDataField = () => setDataFields([...dataFields, { id: Date.now().toString(), attribute_name: "", data_type: "TEXT", elicitation_prompt: "", is_pii: false, is_required: false, weight: 10 }]);
  const updateDataField = (id: string, field: Partial<DataField>) => setDataFields(dataFields.map(f => f.id === id ? { ...f, ...field } : f));
  const removeDataField = (id: string) => setDataFields(dataFields.filter(f => f.id !== id));
  
  const addDisposition = () => setDispositions([...dispositions, { id: Date.now().toString(), name: "", category: "NEUTRAL" }]);
  const updateDisposition = (id: string, field: Partial<Disposition>) => setDispositions(dispositions.map(d => d.id === id ? { ...d, ...field } : d));
  const removeDisposition = (id: string) => setDispositions(dispositions.filter(d => d.id !== id));
  
  const addQualityParameter = () => setQualityParameters([...qualityParameters, { id: Date.now().toString(), name: "", max_score: 5, failure_type: "NON_FATAL", scoring_type: "MANUAL", rules_and_explanation: "" }]);
  const updateQualityParameter = (id: string, param: Partial<QualityParameter>) => setQualityParameters(qualityParameters.map(p => p.id === id ? { ...p, ...param } : p));
  const removeQualityParameter = (id: string) => setQualityParameters(qualityParameters.filter(p => p.id !== id));

  const handleInsightChange = (name: string, is_enabled: boolean) => {
    setInsights(insights.map(i => i.name === name ? { ...i, is_enabled } : i));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="goal-mgmt" />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <IconButton onClick={handleBack}><ArrowBack /></IconButton>
              <Box>
                <Typography variant="h6" fontWeight={600}>{isEditing ? 'Edit Goal' : 'Create New Goal'}</Typography>
                <Typography variant="body2" color="text.secondary">{goalName || 'Untitled Goal'}</Typography>
              </Box>
            </Box>
            <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Goal'}
            </Button>
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
                        <TextField fullWidth label="Goal Name" value={goalName} onChange={(e) => setGoalName(e.target.value)} sx={{ mb: 2 }} required />
                        <FormControl fullWidth sx={{ mb: 2 }} required>
                          <InputLabel>Owner</InputLabel>
                          <Select value={ownerId} onChange={(e) => setOwnerId(e.target.value)} label="Owner">
                            {owners.map((owner) => (<MenuItem key={owner.id} value={owner.id}>{owner.name}</MenuItem>))}
                          </Select>
                        </FormControl>
                        <TextField fullWidth label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} helperText="Comma-separated tags" sx={{ mb: 2 }} />
                      </Grid>
                      <Grid size={{xs:12,md:6}}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel>Default Assigned Team</InputLabel>
                          <Select value={assignedTeamId} onChange={(e) => setAssignedTeamId(e.target.value)} label="Default Assigned Team">
                            <MenuItem value=""><em>None</em></MenuItem>
                            {teams.map((team) => (<MenuItem key={team.id} value={team.id}>{team.name}</MenuItem>))}
                          </Select>
                        </FormControl>
                        <TextField fullWidth multiline rows={4} label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>System Prompt (Interaction Blueprint)</Typography>
                    <TextField fullWidth multiline rows={8} value={systemPrompt} onChange={(e) => setSystemPrompt(e.target.value)} />
                 </Box>
              )}
              {activeTab === 1 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>Structured Data Capture (Outcome Fields)</Typography>
                    <Button variant="outlined" startIcon={<Add />} onClick={addDataField}>Add Field</Button>
                  </Box>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: 'action.hover' }}}>
                          <TableCell>Attribute Name</TableCell><TableCell>Data Type</TableCell><TableCell>Elicitation Prompt</TableCell>
                          <TableCell align="center">Required</TableCell><TableCell align="center">PII</TableCell><TableCell>Weight</TableCell><TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataFields.map((field) => (
                          <TableRow key={field.id}>
                            <TableCell><TextField size="small" value={field.attribute_name} onChange={(e) => updateDataField(field.id, { attribute_name: e.target.value })} fullWidth /></TableCell>
                            <TableCell sx={{ minWidth: 150 }}>
                              <FormControl size="small" fullWidth>
                                <Select value={field.data_type} onChange={(e) => updateDataField(field.id, { data_type: e.target.value as DataType })}>
                                  <MenuItem value="TEXT">Text</MenuItem><MenuItem value="NUMBER">Number</MenuItem><MenuItem value="BOOLEAN">Boolean</MenuItem><MenuItem value="SELECT">Select</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell><TextField size="small" value={field.elicitation_prompt || ''} onChange={(e) => updateDataField(field.id, { elicitation_prompt: e.target.value })} fullWidth /></TableCell>
                            <TableCell align="center"><Checkbox checked={field.is_required} onChange={(e) => updateDataField(field.id, { is_required: e.target.checked })} /></TableCell>
                            <TableCell align="center"><Checkbox checked={field.is_pii} onChange={(e) => updateDataField(field.id, { is_pii: e.target.checked })} /></TableCell>
                            <TableCell><TextField size="small" type="number" value={field.weight} onChange={(e) => updateDataField(field.id, { weight: parseInt(e.target.value) || 0 })} sx={{ width: 80 }} /></TableCell>
                            <TableCell><MuiIconButton size="small" color="error" onClick={() => removeDataField(field.id)}><Delete /></MuiIconButton></TableCell>
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
                        <Stack spacing={1}>
                          {insights.map(insight => (
                              <FormControlLabel 
                                key={insight.name}
                                control={
                                  <Checkbox 
                                    checked={insight.is_enabled} 
                                    onChange={(e) => handleInsightChange(insight.name, e.target.checked)}
                                  />
                                } 
                                label={insight.name}
                              />
                          ))}
                        </Stack>
                      </CardContent></Card>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                      <Card variant="outlined"><CardContent>
                        <Typography variant="h6" gutterBottom>Dispositions</Typography>
                        <Stack spacing={1.5}>
                          {dispositions.map((disp) => (
                            <Box key={disp.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                              <TextField size="small" label="Name" value={disp.name} onChange={(e) => updateDisposition(disp.id, {name: e.target.value})} fullWidth />
                              <FormControl size="small" sx={{minWidth: 120}}>
                                <InputLabel>Category</InputLabel>
                                <Select value={disp.category} onChange={(e) => updateDisposition(disp.id, {category: e.target.value as DispositionCategory})} label="Category">
                                  <MenuItem value="SUCCESS">Success</MenuItem><MenuItem value="FAILURE">Failure</MenuItem><MenuItem value="NEUTRAL">Neutral</MenuItem>
                                </Select>
                              </FormControl>
                              <MuiIconButton color="error" onClick={() => removeDisposition(disp.id)}><Delete /></MuiIconButton>
                            </Box>
                          ))}
                          <Button size="small" startIcon={<Add />} onClick={addDisposition} variant="outlined" sx={{alignSelf: 'flex-start'}}>Add Disposition</Button>
                        </Stack>
                      </CardContent></Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {activeTab === 3 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box><Typography variant="h5" fontWeight={600}>Quality Scorecard</Typography><Typography variant="body2" color="text.secondary">Total Score: {totalScore} points</Typography></Box>
                    <Button variant="outlined" startIcon={<Add />} onClick={addQualityParameter}>Add Parameter</Button>
                  </Box>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead><TableRow sx={{ '& .MuiTableCell-root': { fontWeight: 600, backgroundColor: 'action.hover' }}}>
                        <TableCell>Parameter Name</TableCell><TableCell>Scoring Type</TableCell><TableCell>Failure Type</TableCell>
                        <TableCell>Max Score</TableCell><TableCell sx={{width: '30%'}}>Rules & Explanation</TableCell><TableCell>Actions</TableCell>
                      </TableRow></TableHead>
                      <TableBody>
                        {qualityParameters.map((param) => (
                          <TableRow key={param.id}>
                            <TableCell><TextField size="small" value={param.name} onChange={(e) => updateQualityParameter(param.id, { name: e.target.value })} fullWidth /></TableCell>
                            <TableCell sx={{ minWidth: 180 }}>
                              <FormControl size="small" fullWidth>
                                <Select value={param.scoring_type} onChange={(e) => updateQualityParameter(param.id, { scoring_type: e.target.value as ScoringType })}>
                                  <MenuItem value="MANUAL">Manual</MenuItem><MenuItem value="AUTO_KEYWORD">Auto Keyword</MenuItem><MenuItem value="AUTO_SENTIMENT">Auto Sentiment</MenuItem><MenuItem value="AUTO_COMPLETENESS">Auto Completeness</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell sx={{ minWidth: 150 }}>
                              <FormControl size="small" fullWidth>
                                <Select value={param.failure_type} onChange={(e) => updateQualityParameter(param.id, { failure_type: e.target.value as FailureType })}>
                                  <MenuItem value="NON_FATAL">Non-Fatal</MenuItem><MenuItem value="FATAL">Fatal</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell><TextField size="small" type="number" value={param.max_score} onChange={(e) => updateQualityParameter(param.id, { max_score: parseInt(e.target.value) || 0 })} sx={{ width: 80 }} /></TableCell>
                            <TableCell><TextField size="small" value={param.rules_and_explanation || ''} onChange={(e) => updateQualityParameter(param.id, { rules_and_explanation: e.target.value })} fullWidth /></TableCell>
                            <TableCell><MuiIconButton size="small" color="error" onClick={() => removeQualityParameter(param.id)}><Delete /></MuiIconButton></TableCell>
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

export default function GoalEditorPage() {
  return (
    <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>}>
      <GoalEditorContent />
    </Suspense>
  );
}