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
  Avatar,
  Card,
  CardContent,
  Chip,
  Menu,
  MenuItem,
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
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
  Save,
  ArrowBack,
  Add,
  Delete,
  Edit,
  ContentCopy,
  Person,
  Description,
  LocalOffer,
  Group,
  Psychology,
  Assessment,
  DataObject,
  Analytics,
  Score,
  CheckCircle,
  Cancel,
  Warning,
} from "@mui/icons-material";

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [goalId, setGoalId] = useState<string | null>(null);

  // Goal Metadata State
  const [goalName, setGoalName] = useState("");
  const [owner, setOwner] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");

  // Data Fields State
  const [dataFields, setDataFields] = useState<DataField[]>([
    {
      id: "1",
      attribute: "customer_name",
      dataType: "Text",
      options: "",
      elicitationPrompt: "What is your full name?",
      required: true,
      weight: 10,
    },
  ]);

  // Analytics State
  const [sentimentAnalysis, setSentimentAnalysis] = useState(true);
  const [intentExtraction, setIntentExtraction] = useState(true);
  const [emergentTopics, setEmergentTopics] = useState(false);
  const [dispositions, setDispositions] = useState(["Qualified Lead", "Callback Required", "Not Interested"]);

  // Quality Parameters State
  const [qualityParameters, setQualityParameters] = useState<QualityParameter[]>([
    {
      id: "1",
      parameter: "Call Opening Adherence",
      maxScore: 5,
      failureType: "Non-Fatal",
      rules: "Agent must greet professionally and introduce themselves clearly.",
    },
  ]);

  useEffect(() => {
    const id = searchParams.get('id');
    const clone = searchParams.get('clone');
    
    if (id) {
      setIsEditing(true);
      setGoalId(id);
      // Load existing goal data
      loadGoalData(id);
    } else if (clone) {
      setIsEditing(false);
      setGoalId(null);
      // Load goal data for cloning
      loadGoalData(clone);
    } else {
      setIsEditing(false);
      setGoalId(null);
    }
  }, [searchParams]);

  const loadGoalData = (id: string) => {
    // Mock data loading - in real app, this would be an API call
    setGoalName("Loan Pre-Qualification");
    setOwner("John Smith");
    setDescription("Qualify potential borrowers for loan products based on financial criteria and creditworthiness.");
    setTags("sales,qualification,finance");
    setAssignedTeam("Sales Team Alpha");
    setSystemPrompt("You are a professional loan qualification specialist. Your goal is to assess potential borrowers' eligibility for various loan products while maintaining a helpful and professional demeanor.");
  };

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

  const handleBack = () => {
    router.push('/team-leader-dashboard/goal-mgmt');
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving goal...");
    // After save, redirect back to dashboard
    handleBack();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Data Fields Management
  const addDataField = () => {
    const newField: DataField = {
      id: Date.now().toString(),
      attribute: "",
      dataType: "Text",
      options: "",
      elicitationPrompt: "",
      required: false,
      weight: 5,
    };
    setDataFields([...dataFields, newField]);
  };

  const updateDataField = (id: string, field: Partial<DataField>) => {
    setDataFields(dataFields.map(f => f.id === id ? { ...f, ...field } : f));
  };

  const removeDataField = (id: string) => {
    setDataFields(dataFields.filter(f => f.id !== id));
  };

  // Quality Parameters Management
  const addQualityParameter = () => {
    const newParam: QualityParameter = {
      id: Date.now().toString(),
      parameter: "",
      maxScore: 5,
      failureType: "Non-Fatal",
      rules: "",
    };
    setQualityParameters([...qualityParameters, newParam]);
  };

  const updateQualityParameter = (id: string, param: Partial<QualityParameter>) => {
    setQualityParameters(qualityParameters.map(p => p.id === id ? { ...p, ...param } : p));
  };

  const removeQualityParameter = (id: string) => {
    setQualityParameters(qualityParameters.filter(p => p.id !== id));
  };

  const totalScore = qualityParameters.reduce((sum, param) => sum + param.maxScore, 0);

  const addDisposition = () => {
    setDispositions([...dispositions, ""]);
  };

  const updateDisposition = (index: number, value: string) => {
    const newDispositions = [...dispositions];
    newDispositions[index] = value;
    setDispositions(newDispositions);
  };

  const removeDisposition = (index: number) => {
    setDispositions(dispositions.filter((_, i) => i !== index));
  };

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
              <IconButton onClick={handleBack} sx={{ mr: 1 }}>
                <ArrowBack />
              </IconButton>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {isEditing ? 'Edit Goal' : 'Create New Goal'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {goalName || 'Untitled Goal'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{ ml: 2 }}
              >
                Save Goal
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />

          {/* Tabs */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="goal editor tabs">
                <Tab
                  icon={<Psychology />}
                  label="Interaction Blueprint"
                  value={0}
                  iconPosition="start"
                />
                <Tab
                  icon={<DataObject />}
                  label="Structured Data Capture"
                  value={1}
                  iconPosition="start"
                />
                <Tab
                  icon={<Analytics />}
                  label="Conversation Insights"
                  value={2}
                  iconPosition="start"
                />
                <Tab
                  icon={<Score />}
                  label="Quality Scorecard"
                  value={3}
                  iconPosition="start"
                />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 0 }}>
              {/* Tab 1: Interaction Blueprint */}
              {activeTab === 0 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Goal Configuration
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{xs:12, md:6}}>
                      <TextField
                        fullWidth
                        label="Goal Name"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        placeholder="e.g., Loan Pre-Qualification"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        placeholder="Person responsible for this goal"
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="sales,qualification,finance"
                        helperText="Comma-separated tags for searchability"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Default Assigned Team</InputLabel>
                        <Select
                          value={assignedTeam}
                          onChange={(e) => setAssignedTeam(e.target.value)}
                          label="Default Assigned Team"
                        >
                          <MenuItem value="Sales Team Alpha">Sales Team Alpha</MenuItem>
                          <MenuItem value="Support Team Beta">Support Team Beta</MenuItem>
                          <MenuItem value="Sales Team Gamma">Sales Team Gamma</MenuItem>
                          <MenuItem value="Product Team Delta">Product Team Delta</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed explanation of this goal's purpose and objectives"
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    System Prompt (Interaction Blueprint)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Define the persona, objectives, and constraints for the agent. Use dynamic variables like {"{{customer_name}}"} and {"{{agent_name}}"} for personalization.
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={8}
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    placeholder="You are a professional loan qualification specialist. Your goal is to assess potential borrowers' eligibility for various loan products while maintaining a helpful and professional demeanor..."
                    sx={{
                      '& .MuiInputBase-root': {
                        fontFamily: 'monospace',
                      }
                    }}
                  />
                </Box>
              )}

              {/* Tab 2: Structured Data Capture */}
              {activeTab === 1 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                      Data Fields Configuration
                    </Typography>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addDataField}
                    >
                      Add Field
                    </Button>
                  </Box>

                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Attribute</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Data Type</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Options/Validation</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Elicitation Prompt</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Required</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Weight</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataFields.map((field) => (
                          <TableRow key={field.id}>
                            <TableCell>
                              <TextField
                                size="small"
                                value={field.attribute}
                                onChange={(e) => updateDataField(field.id, { attribute: e.target.value })}
                                placeholder="e.g., loan_type"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <FormControl size="small" fullWidth>
                                <Select
                                  value={field.dataType}
                                  onChange={(e) => updateDataField(field.id, { dataType: e.target.value })}
                                >
                                  <MenuItem value="Text">Text</MenuItem>
                                  <MenuItem value="Number">Number</MenuItem>
                                  <MenuItem value="Boolean">Boolean</MenuItem>
                                  <MenuItem value="Select">Select</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value={field.options}
                                onChange={(e) => updateDataField(field.id, { options: e.target.value })}
                                placeholder={field.dataType === 'Select' ? 'option1,option2,option3' : 'regex pattern'}
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                value={field.elicitationPrompt}
                                onChange={(e) => updateDataField(field.id, { elicitationPrompt: e.target.value })}
                                placeholder="What is your...?"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <Checkbox
                                checked={field.required}
                                onChange={(e) => updateDataField(field.id, { required: e.target.checked })}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={field.weight}
                                onChange={(e) => updateDataField(field.id, { weight: parseInt(e.target.value) || 0 })}
                                inputProps={{ min: 0, max: 100 }}
                                sx={{ width: 80 }}
                              />
                            </TableCell>
                            <TableCell>
                              <MuiIconButton
                                size="small"
                                color="error"
                                onClick={() => removeDataField(field.id)}
                              >
                                <Delete />
                              </MuiIconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}

              {/* Tab 3: Conversation Insights */}
              {activeTab === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                    Post-Conversation Analytics
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid size={{xs:12, md:6}}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Analytics Models
                          </Typography>
                          <Stack spacing={2}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={sentimentAnalysis}
                                  onChange={(e) => setSentimentAnalysis(e.target.checked)}
                                />
                              }
                              label="Sentiment Analysis"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={intentExtraction}
                                  onChange={(e) => setIntentExtraction(e.target.checked)}
                                />
                              }
                              label="Intent Extraction"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={emergentTopics}
                                  onChange={(e) => setEmergentTopics(e.target.checked)}
                                />
                              }
                              label="Emergent Topics Detection"
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{xs:12, md:6}}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6" gutterBottom>
                            Disposition Configuration
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Define possible conversation outcomes for this goal
                          </Typography>
                          <Stack spacing={1}>
                            {dispositions.map((disposition, index) => (
                              <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                  size="small"
                                  value={disposition}
                                  onChange={(e) => updateDisposition(index, e.target.value)}
                                  placeholder="e.g., Qualified Lead"
                                  fullWidth
                                />
                                <MuiIconButton
                                  size="small"
                                  color="error"
                                  onClick={() => removeDisposition(index)}
                                >
                                  <Delete />
                                </MuiIconButton>
                              </Box>
                            ))}
                            <Button
                              size="small"
                              startIcon={<Add />}
                              onClick={addDisposition}
                              variant="outlined"
                            >
                              Add Disposition
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Tab 4: Quality Scorecard */}
              {activeTab === 3 && (
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box>
                      <Typography variant="h5" fontWeight={600}>
                        Quality Parameters Configuration
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Score: {totalScore} points
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addQualityParameter}
                    >
                      Add Parameter
                    </Button>
                  </Box>

                  <Alert severity="info" sx={{ mb: 3 }}>
                    <AlertTitle>Scoring Rules</AlertTitle>
                    <strong>Fatal Errors:</strong> Single fatal error = 30% score reduction, Multiple fatal errors = 75% score reduction<br/>
                    <strong>Non-Fatal Errors:</strong> Single non-fatal error = 10% score reduction, Multiple non-fatal errors = 20% score reduction
                  </Alert>

                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Parameter</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Max Score</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Failure Type</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Rules & Explanation</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {qualityParameters.map((param) => (
                          <TableRow key={param.id}>
                            <TableCell>
                              <TextField
                                size="small"
                                value={param.parameter}
                                onChange={(e) => updateQualityParameter(param.id, { parameter: e.target.value })}
                                placeholder="e.g., Call Opening Adherence"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="number"
                                value={param.maxScore}
                                onChange={(e) => updateQualityParameter(param.id, { maxScore: parseInt(e.target.value) || 0 })}
                                inputProps={{ min: 1, max: 100 }}
                                sx={{ width: 100 }}
                              />
                            </TableCell>
                            <TableCell>
                              <FormControl size="small" fullWidth>
                                <Select
                                  value={param.failureType}
                                  onChange={(e) => updateQualityParameter(param.id, { failureType: e.target.value })}
                                >
                                  <MenuItem value="Non-Fatal">Non-Fatal</MenuItem>
                                  <MenuItem value="Fatal">Fatal</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                multiline
                                rows={2}
                                value={param.rules}
                                onChange={(e) => updateQualityParameter(param.id, { rules: e.target.value })}
                                placeholder="Detailed guidelines for reviewers on how to score this parameter"
                                fullWidth
                              />
                            </TableCell>
                            <TableCell>
                              <MuiIconButton
                                size="small"
                                color="error"
                                onClick={() => removeQualityParameter(param.id)}
                              >
                                <Delete />
                              </MuiIconButton>
                            </TableCell>
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
