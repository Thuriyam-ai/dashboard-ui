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
  Select,
  MenuItem as SelectMenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Alert,
  AlertTitle,
  Grid,
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
  Cancel,
  Notifications,
  Warning,
  Error,
  Info,
  CheckCircle,
  Schedule,
  PriorityHigh,
  LowPriority,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

function AlertEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [alertId, setAlertId] = useState<string | null>(null);
  const { logout } = useAuth();

  // Alert Configuration State
  const [alertName, setAlertName] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState(true);
  const [threshold, setThreshold] = useState("");
  const [metric, setMetric] = useState("");
  const [team, setTeam] = useState("");
  const [frequency, setFrequency] = useState("");
  const [recipients, setRecipients] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  // Available options
  const alertTypes = [
    { value: "Quality", label: "Quality Score" },
    { value: "Volume", label: "Call Volume" },
    { value: "Satisfaction", label: "Customer Satisfaction" },
    { value: "System", label: "System Performance" },
    { value: "Response", label: "Response Time" },
    { value: "Escalation", label: "Escalation Rate" },
  ];

  const priorities = [
    { value: "Critical", label: "Critical", icon: <Error /> },
    { value: "High", label: "High", icon: <PriorityHigh /> },
    { value: "Medium", label: "Medium", icon: <Warning /> },
    { value: "Low", label: "Low", icon: <LowPriority /> },
  ];

  const metrics = [
    { value: "Quality Score", label: "Quality Score (%)" },
    { value: "Call Volume", label: "Call Volume (calls/hour)" },
    { value: "Customer Rating", label: "Customer Rating (1-5)" },
    { value: "Response Time", label: "Response Time (ms)" },
    { value: "Escalation Rate", label: "Escalation Rate (%)" },
    { value: "Resolution Time", label: "Resolution Time (minutes)" },
  ];

  const teams = [
    "Sales Team Alpha",
    "Support Team Beta",
    "Onboarding Team Gamma",
    "All Teams",
    "IT Team",
    "Management Team",
  ];

  const frequencies = [
    "Real-time",
    "Every 5 minutes",
    "Every 15 minutes",
    "Hourly",
    "Daily",
    "Weekly",
  ];

  useEffect(() => {
    const id = searchParams.get('id');
    const clone = searchParams.get('clone');
    
    if (id) {
      setIsEditing(true);
      setAlertId(id);
      loadAlertData(id);
    } else if (clone) {
      setIsEditing(false); // Cloning creates a new entry
      setAlertId(null);
      loadAlertData(clone); // Load data from the cloned alert
      setAlertName(prev => `${prev} (Clone)`); // Modify name for clone
    } else {
      setIsEditing(false);
      setAlertId(null);
      resetForm();
    }
  }, [searchParams]);

  const loadAlertData = (id: string) => {
    // In a real app, fetch alert data by id
    // For now, populate with sample data
    setAlertName("Low Quality Score Alert");
    setDescription("Triggers when agent quality score drops below 70%");
    setAlertType("Quality");
    setPriority("High");
    setStatus(true);
    setThreshold("70");
    setMetric("Quality Score");
    setTeam("Sales Team Alpha");
    setFrequency("Real-time");
    setRecipients("team-lead@company.com, manager@company.com");
    setEmailEnabled(true);
    setSmsEnabled(false);
    setWebhookEnabled(false);
    setWebhookUrl("");
  };

  const resetForm = () => {
    setAlertName("");
    setDescription("");
    setAlertType("");
    setPriority("");
    setStatus(true);
    setThreshold("");
    setMetric("");
    setTeam("");
    setFrequency("Real-time");
    setRecipients("");
    setEmailEnabled(true);
    setSmsEnabled(false);
    setWebhookEnabled(false);
    setWebhookUrl("");
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
    router.push('/team-leader-dashboard/alert-mgmt');
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving alert...");
    // After save, redirect back to dashboard
    router.push('/team-leader-dashboard/alert-mgmt');
  };

  const handleCancel = () => {
    router.push('/team-leader-dashboard/alert-mgmt');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "error";
      case "High": return "warning";
      case "Medium": return "info";
      case "Low": return "success";
      default: return "default";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quality": return "primary";
      case "Volume": return "secondary";
      case "Satisfaction": return "success";
      case "System": return "error";
      default: return "default";
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="alert-mgmt" />

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
                onClick={logout}
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
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              {isEditing ? `Edit Alert: ${alertName || 'Loading...'}` : "Create New Alert"}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Configure alert conditions and notification settings
            </Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Alert Configuration
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Alert Name"
                    value={alertName}
                    onChange={(e) => setAlertName(e.target.value)}
                    placeholder="e.g., Low Quality Score Alert"
                    sx={{ mb: 3 }}
                    helperText="A unique, descriptive name for this alert"
                  />

                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of what this alert monitors"
                    multiline
                    rows={3}
                    sx={{ mb: 3 }}
                    helperText="Explain what conditions trigger this alert"
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Alert Type</InputLabel>
                    <Select
                      value={alertType}
                      label="Alert Type"
                      onChange={(e) => setAlertType(e.target.value as string)}
                    >
                      {alertTypes.map((type) => (
                        <SelectMenuItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Priority Level</InputLabel>
                    <Select
                      value={priority}
                      label="Priority Level"
                      onChange={(e) => setPriority(e.target.value as string)}
                    >
                      {priorities.map((p) => (
                        <SelectMenuItem key={p.value} value={p.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {p.icon}
                            {p.label}
                          </Box>
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Metric to Monitor</InputLabel>
                    <Select
                      value={metric}
                      label="Metric to Monitor"
                      onChange={(e) => setMetric(e.target.value as string)}
                    >
                      {metrics.map((m) => (
                        <SelectMenuItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Threshold Value"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    placeholder="e.g., 70, 50, 4.0"
                    sx={{ mb: 3 }}
                    helperText="The value that triggers the alert"
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Team Assignment</InputLabel>
                    <Select
                      value={team}
                      label="Team Assignment"
                      onChange={(e) => setTeam(e.target.value as string)}
                    >
                      {teams.map((t) => (
                        <SelectMenuItem key={t} value={t}>
                          {t}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Check Frequency</InputLabel>
                    <Select
                      value={frequency}
                      label="Check Frequency"
                      onChange={(e) => setFrequency(e.target.value as string)}
                    >
                      {frequencies.map((f) => (
                        <SelectMenuItem key={f} value={f}>
                          {f}
                        </SelectMenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                Notification Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Recipients"
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="email1@company.com, email2@company.com"
                    sx={{ mb: 3 }}
                    helperText="Comma-separated list of email addresses"
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailEnabled}
                        onChange={(e) => setEmailEnabled(e.target.checked)}
                      />
                    }
                    label="Email Notifications"
                    sx={{ mb: 2 }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={smsEnabled}
                        onChange={(e) => setSmsEnabled(e.target.checked)}
                      />
                    }
                    label="SMS Notifications"
                    sx={{ mb: 2 }}
                  />

                  <FormControlLabel
                    control={
                      <Switch
                        checked={webhookEnabled}
                        onChange={(e) => setWebhookEnabled(e.target.checked)}
                      />
                    }
                    label="Webhook Notifications"
                    sx={{ mb: 2 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  {webhookEnabled && (
                    <TextField
                      fullWidth
                      label="Webhook URL"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://api.company.com/webhook/alerts"
                      sx={{ mb: 3 }}
                      helperText="URL to send webhook notifications to"
                    />
                  )}

                  <FormControlLabel
                    control={
                      <Switch
                        checked={status}
                        onChange={(e) => setStatus(e.target.checked)}
                      />
                    }
                    label="Alert Active"
                    sx={{ mb: 2 }}
                    helperText="Enable or disable this alert"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Alert Preview */}
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Alert Preview
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Notifications sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                      <Typography variant="h6" fontWeight={600}>{alertName || 'Untitled Alert'}</Typography>
                      <Typography variant="body2" color="text.secondary">Alert Name</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Box sx={{ fontSize: 32, color: getTypeColor(alertType) + '.main', mb: 1 }}>
                        {alertType === 'Quality' && <CheckCircle />}
                        {alertType === 'Volume' && <Schedule />}
                        {alertType === 'Satisfaction' && <Info />}
                        {alertType === 'System' && <Error />}
                        {!alertType && <Notifications />}
                      </Box>
                      <Typography variant="h6" fontWeight={600}>{alertType || 'No Type'}</Typography>
                      <Typography variant="body2" color="text.secondary">Alert Type</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Box sx={{ fontSize: 32, color: getPriorityColor(priority) + '.main', mb: 1 }}>
                        {priority === 'Critical' && <Error />}
                        {priority === 'High' && <PriorityHigh />}
                        {priority === 'Medium' && <Warning />}
                        {priority === 'Low' && <LowPriority />}
                        {!priority && <Info />}
                      </Box>
                      <Typography variant="h6" fontWeight={600}>{priority || 'No Priority'}</Typography>
                      <Typography variant="body2" color="text.secondary">Priority Level</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Card variant="outlined">
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Box sx={{ fontSize: 32, color: status ? 'success.main' : 'text.secondary', mb: 1 }}>
                        {status ? <CheckCircle /> : <Error />}
                      </Box>
                      <Typography variant="h6" fontWeight={600}>{status ? 'Active' : 'Inactive'}</Typography>
                      <Typography variant="body2" color="text.secondary">Status</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" startIcon={<Cancel />} onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
              {isEditing ? "Save Changes" : "Create Alert"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default function AlertEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AlertEditorContent />
    </Suspense>
  );
}
