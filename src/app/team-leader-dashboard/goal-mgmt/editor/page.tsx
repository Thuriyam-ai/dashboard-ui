// src/app/team-leader-dashboard/goal-mgmt/editor/page.tsx

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton as MuiIconButton,
  Alert,
  AlertTitle,
  Divider,
  Stack,
  MenuItem,
} from "@mui/material";
import {
  Save,
  ArrowBack,
  Add,
  Delete,
  Psychology,
  DataObject,
  Analytics,
  Score,
} from "@mui/icons-material";

import {
  Owner,
  Team,
  GoalCreateRequest
} from "@/types/api/goal"

// Assumes your service file is correctly set up as provided previously
import {
  getOwners,
  getTeams,
  createGoal,
} from "@/data/services/goal-service";


interface DataField {
  id: string;
  attribute: string;
  dataType: string;
  options: string;
  elicitationPrompt: string;
  required: boolean;
  weight: number;
}

interface QualityParameter {
  id: string;
  parameter: string;
  maxScore: number;
  failureType: string;
  rules: string;
}

function GoalEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // --- Dropdown Data State ---
  const [owners, setOwners] = useState<Owner[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  // --- Form State ---
  const [goalName, setGoalName] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [assignedTeamId, setAssignedTeamId] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  const [dataFields, setDataFields] = useState<DataField[]>([
    { id: "1", attribute: "customer_name", dataType: "TEXT", options: "", elicitationPrompt: "What is your full name?", required: true, weight: 10 },
  ]);

  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [intentExtraction, setIntentExtraction] = useState(true);
  const [emergentTopics, setEmergentTopics] = useState(false);
  const [dispositions, setDispositions] = useState(["Qualified Lead", "Callback Required", "Not Interested"]);

  const [qualityParameters, setQualityParameters] = useState<QualityParameter[]>([
    { id: "1", parameter: "Call Opening Adherence", maxScore: 5, failureType: "NON_FATAL", rules: "Agent must greet professionally." },
  ]);

  // --- Effects ---
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [ownersData, teamsData] = await Promise.all([getOwners(), getTeams()]);
        setOwners(ownersData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Failed to load owners or teams", error);
      }
    };
    fetchDropdownData();

    const id = searchParams.get('id');
    const clone = searchParams.get('clone');
    if (id) {
      setIsEditing(true);
      setGoalId(id);
      loadGoalData(id);
    } else if (clone) {
      setIsEditing(false);
      setGoalId(null);
      loadGoalData(clone);
    }
  }, [searchParams]);

  // --- Data Loading and Saving ---
  const loadGoalData = (id: string) => {
    // Mock data loading
    setGoalName("Loan Pre-Qualification");
    setDescription("Qualify potential borrowers for loan products.");
    setTags("sales,qualification,finance");
    setSystemPrompt("You are a professional loan qualification specialist.");
  };

  const handleSave = async () => {
    if (!goalName || !ownerId || !assignedTeamId) {
        alert("Please fill in Goal Name, Owner, and Assigned Team.");
        return;
    }
    setIsSaving(true);
    
    const payload: GoalCreateRequest = {
      interaction_blueprint: {
        goal_metadata: {
          name: goalName, description: description, owner_id: ownerId,
          default_team_id: assignedTeamId, tags: tags,
        },
        prompt_text: systemPrompt,
        dynamic_variables: "{}",
      },
      structured_data: dataFields.map((field, index) => ({
        attribute_name: field.attribute,
        data_type: field.dataType.toUpperCase(),
        is_required: field.required,
        is_pii: false, weight: field.weight, display_order: index + 1,
        configuration: "{}", elicitation_prompt: field.elicitationPrompt,
      })),
      conversation_insights: {
        conversation_insights_config: {
          "sentiment_analysis": sentimentAnalysis,
          "intent_extraction": intentExtraction,
          "emergent_topics_detection": emergentTopics,
        },
        disposition_config: dispositions.map((name, index) => ({
          name: name, category: "NEUTRAL", display_order: index + 1,
          description: null,
        })),
      },
      quality_scorecard: qualityParameters.map((param, index) => ({
        name: param.parameter, max_score: param.maxScore,
        failure_type: param.failureType.toUpperCase(),
        scoring_type: "MANUAL", display_order: index + 1,
        rules_and_explanation: param.rules,
      })),
    };

    try {
      const response = await createGoal(payload);
      alert(response.message);
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
  const addDataField = () => setDataFields([...dataFields, { id: Date.now().toString(), attribute: "", dataType: "TEXT", options: "", elicitationPrompt: "", required: false, weight: 5 }]);
  const updateDataField = (id: string, field: Partial<DataField>) => setDataFields(dataFields.map(f => f.id === id ? { ...f, ...field } : f));
  const removeDataField = (id: string) => setDataFields(dataFields.filter(f => f.id !== id));
  const addQualityParameter = () => setQualityParameters([...qualityParameters, { id: Date.now().toString(), parameter: "", maxScore: 5, failureType: "NON_FATAL", rules: "" }]);
  const updateQualityParameter = (id: string, param: Partial<QualityParameter>) => setQualityParameters(qualityParameters.map(p => p.id === id ? { ...p, ...param } : p));
  const removeQualityParameter = (id: string) => setQualityParameters(qualityParameters.filter(p => p.id !== id));
  const addDisposition = () => setDispositions([...dispositions, ""]);
  const updateDisposition = (index: number, value: string) => setDispositions(dispositions.map((d, i) => i === index ? value : d));
  const removeDisposition = (index: number) => setDispositions(dispositions.filter((_, i) => i !== index));

  const totalScore = qualityParameters.reduce((sum, param) => sum + param.maxScore, 0);

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
            <CardContent sx={{ p: 0 }}>
              {activeTab === 0 && (
                 <Box sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Goal Configuration</Typography>
                    <Grid container spacing={3}>
                      <Grid size={{xs:12,md:6}}>
                        <TextField fullWidth label="Goal Name" value={goalName} onChange={(e) => setGoalName(e.target.value)} sx={{ mb: 2 }} />
                        <FormControl fullWidth sx={{ mb: 2 }}>
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
                    <Typography variant="h5" fontWeight={600}>Data Fields Configuration</Typography>
                    <Button variant="outlined" startIcon={<Add />} onClick={addDataField}>Add Field</Button>
                  </Box>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell>Attribute</TableCell>
                          <TableCell>Data Type</TableCell>
                          <TableCell>Options/Validation</TableCell>
                          <TableCell>Elicitation Prompt</TableCell>
                          <TableCell>Required</TableCell>
                          <TableCell>Weight</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataFields.map((field) => (
                          <TableRow key={field.id}>
                            <TableCell><TextField size="small" value={field.attribute} onChange={(e) => updateDataField(field.id, { attribute: e.target.value })} fullWidth /></TableCell>
                            <TableCell>
                              <FormControl size="small" fullWidth>
                                <Select value={field.dataType} onChange={(e) => updateDataField(field.id, { dataType: e.target.value })}>
                                  <MenuItem value="TEXT">Text</MenuItem><MenuItem value="NUMBER">Number</MenuItem><MenuItem value="BOOLEAN">Boolean</MenuItem><MenuItem value="SELECT">Select</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell><TextField size="small" value={field.options} onChange={(e) => updateDataField(field.id, { options: e.target.value })} fullWidth /></TableCell>
                            <TableCell><TextField size="small" value={field.elicitationPrompt} onChange={(e) => updateDataField(field.id, { elicitationPrompt: e.target.value })} fullWidth /></TableCell>
                            <TableCell><Checkbox checked={field.required} onChange={(e) => updateDataField(field.id, { required: e.target.checked })} /></TableCell>
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
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>Post-Conversation Analytics</Typography>
                  <Grid container spacing={3}>
                    <Grid size={{xs:12,md:6}}>
                      <Card variant="outlined"><CardContent>
                        <Typography variant="h6" gutterBottom>Analytics Models</Typography>
                        <Stack spacing={2}>
                          <FormControlLabel control={<Checkbox checked={sentimentAnalysis} onChange={(e) => setSentimentAnalysis(e.target.checked)}/>} label="Sentiment Analysis"/>
                          <FormControlLabel control={<Checkbox checked={intentExtraction} onChange={(e) => setIntentExtraction(e.target.checked)}/>} label="Intent Extraction"/>
                          <FormControlLabel control={<Checkbox checked={emergentTopics} onChange={(e) => setEmergentTopics(e.target.checked)}/>} label="Emergent Topics Detection"/>
                        </Stack>
                      </CardContent></Card>
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                      <Card variant="outlined"><CardContent>
                        <Typography variant="h6" gutterBottom>Disposition Configuration</Typography>
                        <Stack spacing={1}>
                          {dispositions.map((disposition, index) => (
                            <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                              <TextField size="small" value={disposition} onChange={(e) => updateDisposition(index, e.target.value)} fullWidth />
                              <MuiIconButton size="small" color="error" onClick={() => removeDisposition(index)}><Delete /></MuiIconButton>
                            </Box>
                          ))}
                          <Button size="small" startIcon={<Add />} onClick={addDisposition} variant="text">Add Disposition</Button>
                        </Stack>
                      </CardContent></Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {activeTab === 3 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box><Typography variant="h5" fontWeight={600}>Quality Parameters</Typography><Typography variant="body2" color="text.secondary">Total Score: {totalScore} points</Typography></Box>
                    <Button variant="outlined" startIcon={<Add />} onClick={addQualityParameter}>Add Parameter</Button>
                  </Box>
                  <Alert severity="info" sx={{ mb: 3 }}><AlertTitle>Scoring Rules</AlertTitle>Details about fatal and non-fatal errors...</Alert>
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead><TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell>Parameter</TableCell><TableCell>Max Score</TableCell><TableCell>Failure Type</TableCell><TableCell>Rules & Explanation</TableCell><TableCell>Actions</TableCell>
                      </TableRow></TableHead>
                      <TableBody>
                        {qualityParameters.map((param) => (
                          <TableRow key={param.id}>
                            <TableCell><TextField size="small" value={param.parameter} onChange={(e) => updateQualityParameter(param.id, { parameter: e.target.value })} fullWidth /></TableCell>
                            <TableCell><TextField size="small" type="number" value={param.maxScore} onChange={(e) => updateQualityParameter(param.id, { maxScore: parseInt(e.target.value) || 0 })} sx={{ width: 100 }} /></TableCell>
                            <TableCell>
                              <FormControl size="small" fullWidth>
                                <Select value={param.failureType} onChange={(e) => updateQualityParameter(param.id, { failureType: e.target.value })}>
                                  <MenuItem value="NON_FATAL">Non-Fatal</MenuItem><MenuItem value="FATAL">Fatal</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell><TextField size="small" multiline rows={2} value={param.rules} onChange={(e) => updateQualityParameter(param.id, { rules: e.target.value })} fullWidth /></TableCell>
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
    <Suspense fallback={<div>Loading...</div>}>
      <GoalEditorContent />
    </Suspense>
  );
}