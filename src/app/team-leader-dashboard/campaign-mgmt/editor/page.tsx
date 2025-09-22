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
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Alert,
  AlertTitle,
  Divider,
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
  Campaign,
  CalendarToday,
  Psychology,
  Group,
  Info,
} from "@mui/icons-material";
// Using simple date inputs instead of complex date pickers

function CampaignEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [campaignId, setCampaignId] = useState<string | null>(null);

  // Campaign Configuration State
  const [campaignName, setCampaignName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");

  useEffect(() => {
    const id = searchParams.get('id');
    const clone = searchParams.get('clone');
    
    if (id) {
      setIsEditing(true);
      setCampaignId(id);
      // Load existing campaign data
      loadCampaignData(id);
    } else if (clone) {
      setIsEditing(false);
      setCampaignId(null);
      // Load campaign data for cloning
      loadCampaignData(clone);
    } else {
      setIsEditing(false);
      setCampaignId(null);
    }
  }, [searchParams]);

  const loadCampaignData = (id: string) => {
    // Mock data loading - in real app, this would be an API call
    setCampaignName("Q1 Loan Qualification Drive");
    setStartDate("2024-01-01");
    setEndDate("2024-03-31");
    setSelectedGoal("goal-1");
    setAssignedTeam("Sales Team Alpha");
  };

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

  const handleBack = () => {
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    router.push(`${basePath}/team-leader-dashboard/campaign-mgmt`);
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving campaign...");
    // After save, redirect back to dashboard
    handleBack();
  };

  // Mock data for goals and teams
  const availableGoals = [
    { id: "goal-1", name: "Loan Pre-Qualification v2.1", status: "active" },
    { id: "goal-2", name: "Customer Support Resolution v1.3", status: "active" },
    { id: "goal-3", name: "Lead Generation v1.0", status: "draft" },
    { id: "goal-4", name: "Product Feedback Collection v1.2", status: "active" },
  ];

  const availableTeams = [
    "Sales Team Alpha",
    "Support Team Beta", 
    "Sales Team Gamma",
    "Product Team Delta",
  ];

  const selectedGoalData = availableGoals.find(goal => goal.id === selectedGoal);

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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                <IconButton onClick={handleBack} sx={{ mr: 1 }}>
                  <ArrowBack />
                </IconButton>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {isEditing ? 'Edit Campaign' : 'Create New Campaign'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {campaignName || 'Untitled Campaign'}
                  </Typography>
                </Box>
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

                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{ ml: 2 }}
                >
                  Save Campaign
                </Button>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Main Content */}
          <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
            <Breadcrumbs />

            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                  Campaign Configuration
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Campaign Name"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g., Q1 Loan Qualification Drive"
                      sx={{ mb: 3 }}
                      helperText="A unique, human-readable name for this campaign"
                    />

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                        Campaign Duration
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="End Date"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                            size="small"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Goal Selection</InputLabel>
                      <Select
                        value={selectedGoal}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        label="Goal Selection"
                      >
                        {availableGoals.map((goal) => (
                          <MenuItem key={goal.id} value={goal.id}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Psychology sx={{ fontSize: 16 }} />
                              <Box>
                                <Typography variant="body2">{goal.name}</Typography>
                                <Chip 
                                  label={goal.status} 
                                  size="small" 
                                  color={goal.status === 'active' ? 'success' : 'default'}
                                  sx={{ fontSize: '0.625rem', height: 16 }}
                                />
                              </Box>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel>Team Assignment</InputLabel>
                      <Select
                        value={assignedTeam}
                        onChange={(e) => setAssignedTeam(e.target.value)}
                        label="Team Assignment"
                      >
                        {availableTeams.map((team) => (
                          <MenuItem key={team} value={team}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Group sx={{ fontSize: 16 }} />
                              <Typography variant="body2">{team}</Typography>
                            </Box>
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Selected Goal Information */}
                {selectedGoalData && (
                  <>
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                      Selected Goal Information
                    </Typography>
                    <Alert severity="info" sx={{ mb: 3 }}>
                      <AlertTitle>Goal Details</AlertTitle>
                      <Typography variant="body2">
                        <strong>Goal:</strong> {selectedGoalData.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Status:</strong> {selectedGoalData.status}
                      </Typography>
                      <Typography variant="body2">
                        This goal will serve as the playbook for this campaign. All conversations 
                        in this campaign will follow the interaction blueprint, data capture requirements, 
                        and quality parameters defined in this goal version.
                      </Typography>
                    </Alert>
                  </>
                )}

                {/* Campaign Summary */}
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Campaign Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Campaign sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {campaignName || 'Untitled Campaign'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Campaign Name
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <CalendarToday sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {startDate && endDate ? 
                            `${Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} days` : 
                            'Not set'
                          }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Duration
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Psychology sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {selectedGoalData ? selectedGoalData.name.split(' ')[0] : 'None'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Goal Version
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Card variant="outlined">
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Group sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h6" fontWeight={600}>
                          {assignedTeam ? assignedTeam.split(' ')[0] : 'None'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Assigned Team
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
  );
}

export default function CampaignEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CampaignEditorContent />
    </Suspense>
  );
}
