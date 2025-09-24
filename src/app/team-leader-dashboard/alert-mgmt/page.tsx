"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Alert,
  AlertTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Grid,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Dashboard,
  SupervisorAccount,
  KeyboardArrowDown,
  Notifications,
  Add,
  Edit,
  Delete,
  Warning,
  Error,
  Info,
  CheckCircle,
  Schedule,
  PriorityHigh,
  LowPriority,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

export default function AlertManagementPage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const { logout } = useAuth();

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

  const handleCreateAlert = () => {
    router.push('/team-leader-dashboard/alert-mgmt/editor');
  };

  const handleEditAlert = (alertId: string) => {
    router.push(`/team-leader-dashboard/alert-mgmt/editor?id=${alertId}`);
  };

  const handleCloneAlert = (alertId: string) => {
    router.push(`/team-leader-dashboard/alert-mgmt/editor?clone=${alertId}`);
  };

  const handleDeleteAlert = (alert: any) => {
    setSelectedAlert(alert);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Delete logic here
    console.log("Deleting alert:", selectedAlert);
    setDeleteDialogOpen(false);
    setSelectedAlert(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedAlert(null);
  };

  // Mock alert data
  const alerts = [
    {
      id: "alert-001",
      name: "Low Quality Score Alert",
      description: "Triggers when agent quality score drops below 70%",
      type: "Quality",
      priority: "High",
      status: "Active",
      threshold: 70,
      metric: "Quality Score",
      team: "Sales Team Alpha",
      frequency: "Real-time",
      lastTriggered: "2024-01-15 14:30",
      triggerCount: 12,
      recipients: ["team-lead@company.com", "manager@company.com"],
    },
    {
      id: "alert-002",
      name: "High Call Volume Alert",
      description: "Notifies when call volume exceeds 50 calls per hour",
      type: "Volume",
      priority: "Medium",
      status: "Active",
      threshold: 50,
      metric: "Calls per Hour",
      team: "Support Team Beta",
      frequency: "Hourly",
      lastTriggered: "2024-01-15 13:45",
      triggerCount: 8,
      recipients: ["supervisor@company.com"],
    },
    {
      id: "alert-003",
      name: "Customer Satisfaction Drop",
      description: "Alerts when customer satisfaction drops below 4.0",
      type: "Satisfaction",
      priority: "High",
      status: "Inactive",
      threshold: 4.0,
      metric: "Customer Rating",
      team: "All Teams",
      frequency: "Daily",
      lastTriggered: "2024-01-14 09:15",
      triggerCount: 3,
      recipients: ["director@company.com", "team-lead@company.com"],
    },
    {
      id: "alert-004",
      name: "System Performance Alert",
      description: "Monitors system response time and alerts on delays",
      type: "System",
      priority: "Critical",
      status: "Active",
      threshold: 5000,
      metric: "Response Time (ms)",
      team: "IT Team",
      frequency: "Real-time",
      lastTriggered: "2024-01-15 15:20",
      triggerCount: 25,
      recipients: ["admin@company.com", "devops@company.com"],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "error";
      case "High": return "warning";
      case "Medium": return "info";
      case "Low": return "success";
      default: return "default";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Critical": return <Error />;
      case "High": return <PriorityHigh />;
      case "Medium": return <Warning />;
      case "Low": return <LowPriority />;
      default: return <Info />;
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
              Alert Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Configure and manage system alerts for team performance monitoring
            </Typography>
          </Box>

          {/* Alert Summary Cards */}
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 3,
            mb: 4
          }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Total Alerts
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="primary">
                      {alerts.length}
                    </Typography>
                  </Box>
                  <Notifications sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Active Alerts
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      {alerts.filter(a => a.status === 'Active').length}
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      High Priority
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="warning.main">
                      {alerts.filter(a => a.priority === 'High' || a.priority === 'Critical').length}
                    </Typography>
                  </Box>
                  <PriorityHigh sx={{ fontSize: 40, color: 'warning.main' }} />
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      Triggers Today
                    </Typography>
                    <Typography variant="h4" fontWeight={700} color="info.main">
                      {alerts.reduce((sum, a) => sum + a.triggerCount, 0)}
                    </Typography>
                  </Box>
                  <Schedule sx={{ fontSize: 40, color: 'info.main' }} />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Create New Alert Button */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleCreateAlert}
              sx={{ fontWeight: 600 }}
            >
              Create New Alert
            </Button>
          </Box>

          {/* Alerts Table */}
          <Card>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom sx={{ mb: 3 }}>
                Alert Configuration
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                      <TableCell sx={{ fontWeight: 600 }}>Alert Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Priority</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Threshold</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Last Triggered</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body1" fontWeight={600}>
                              {alert.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {alert.description}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={alert.type}
                            size="small"
                            color={getTypeColor(alert.type) as any}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={alert.priority}
                            size="small"
                            color={getPriorityColor(alert.priority) as any}
                            icon={getPriorityIcon(alert.priority)}
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={alert.status}
                            size="small"
                            color={alert.status === 'Active' ? 'success' : 'default'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={600}>
                            {alert.threshold} {alert.metric.includes('Score') ? '%' : alert.metric.includes('Time') ? 'ms' : ''}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {alert.team}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {alert.lastTriggered}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ({alert.triggerCount} times)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              size="small"
                              startIcon={<Edit />}
                              onClick={() => handleEditAlert(alert.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              size="small"
                              startIcon={<Notifications />}
                              onClick={() => handleCloneAlert(alert.id)}
                            >
                              Clone
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              startIcon={<Delete />}
                              onClick={() => handleDeleteAlert(alert)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Alert</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the alert "{selectedAlert?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
