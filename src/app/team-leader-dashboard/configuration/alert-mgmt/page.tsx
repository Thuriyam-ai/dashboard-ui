"use client";

import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Container,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton as MuiIconButton,
  Switch,
  FormControlLabel,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  Settings,
  Notifications,
  Add,
  Edit,
  Delete,
  Warning,
  Error,
  Info,
  CheckCircle,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function AlertManagementPage() {
  // Mock alert data
  const alerts = [
    {
      id: 1,
      name: "High Call Volume Alert",
      description: "Notify when call volume exceeds 100 calls/hour",
      type: "warning",
      status: "active",
      threshold: "100 calls/hour",
      lastTriggered: "2024-01-15 14:30",
      recipients: ["team-lead@company.com", "manager@company.com"],
    },
    {
      id: 2,
      name: "Low Customer Satisfaction",
      description: "Alert when satisfaction drops below 80%",
      type: "error",
      status: "active",
      threshold: "< 80%",
      lastTriggered: "2024-01-14 09:15",
      recipients: ["team-lead@company.com"],
    },
    {
      id: 3,
      name: "System Performance Issue",
      description: "Notify of any system performance degradation",
      type: "info",
      status: "inactive",
      threshold: "Response time > 5s",
      lastTriggered: "Never",
      recipients: ["dev-team@company.com"],
    },
    {
      id: 4,
      name: "Goal Achievement Milestone",
      description: "Celebrate when goals are 90% complete",
      type: "success",
      status: "active",
      threshold: "90% progress",
      lastTriggered: "2024-01-12 16:45",
      recipients: ["team-lead@company.com", "team@company.com"],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      case "success":
        return "success";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "error":
        return <Error />;
      case "warning":
        return <Warning />;
      case "info":
        return <Info />;
      case "success":
        return <CheckCircle />;
      default:
        return <Notifications />;
    }
  };

  const handleToggleAlert = (alertId: number) => {
    // Handle alert toggle logic here
    console.log(`Toggling alert ${alertId}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="alert-mgmt" />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
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
                team-leader-dashboard/configuration/alert-mgmt.localhost:3000
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <BookmarkBorder />
              </IconButton>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', fontSize: '0.875rem' }}>
                  TL
                </Avatar>
                <Typography variant="body2" fontWeight={500}>
                  Team Leader
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
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
              underline="hover"
              color="inherit"
              href="/team-leader-dashboard"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Home fontSize="small" />
              Team Leader Dashboard
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/team-leader-dashboard/configuration"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
              <Settings fontSize="small" />
              Configuration Mgmt
            </Link>
            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Notifications fontSize="small" />
              Alert Mgmt
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                Alert Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Configure and manage system alerts and notifications
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 'fit-content' }}
            >
              Create Alert
            </Button>
          </Box>

          {/* Alert Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Alerts
                  </Typography>
                  <Typography variant="h3" color="primary" fontWeight={700}>
                    {alerts.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Active
                  </Typography>
                  <Typography variant="h3" color="success.main" fontWeight={700}>
                    {alerts.filter(a => a.status === 'active').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Triggered Today
                  </Typography>
                  <Typography variant="h3" color="warning.main" fontWeight={700}>
                    3
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Critical Alerts
                  </Typography>
                  <Typography variant="h3" color="error.main" fontWeight={700}>
                    {alerts.filter(a => a.type === 'error').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Alerts Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Alert Configuration
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Alert Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Threshold</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Triggered</TableCell>
                      <TableCell>Recipients</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {alert.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {alert.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getTypeIcon(alert.type)}
                            label={alert.type.toUpperCase()}
                            color={getTypeColor(alert.type) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight={500}>
                            {alert.threshold}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={alert.status === 'active'}
                                onChange={() => handleToggleAlert(alert.id)}
                                color="primary"
                              />
                            }
                            label={alert.status === 'active' ? 'Active' : 'Inactive'}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {alert.lastTriggered}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {alert.recipients.length} recipient(s)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <MuiIconButton size="small" color="primary">
                              <Edit />
                            </MuiIconButton>
                            <MuiIconButton size="small" color="error">
                              <Delete />
                            </MuiIconButton>
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
    </Box>
  );
}
