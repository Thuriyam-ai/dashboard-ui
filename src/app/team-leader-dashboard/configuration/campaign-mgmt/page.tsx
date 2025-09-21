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
  LinearProgress,
} from "@mui/material";
import {
  BookmarkBorder,
  MoreVert,
  Logout,
  Home,
  Leaderboard,
  Settings,
  Campaign,
  Add,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  Visibility,
} from "@mui/icons-material";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";

export default function CampaignManagementPage() {
  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: "Q1 Customer Retention",
      description: "Focus on retaining existing customers with targeted outreach",
      status: "active",
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      budget: "$50,000",
      spent: "$32,500",
      progress: 65,
      leads: 1250,
      conversions: 89,
    },
    {
      id: 2,
      name: "Product Launch Awareness",
      description: "Increase awareness for new product launch",
      status: "paused",
      startDate: "2024-02-15",
      endDate: "2024-04-15",
      budget: "$75,000",
      spent: "$18,750",
      progress: 25,
      leads: 890,
      conversions: 45,
    },
    {
      id: 3,
      name: "Lead Generation Push",
      description: "Generate new leads for sales team",
      status: "planning",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      budget: "$30,000",
      spent: "$0",
      progress: 0,
      leads: 0,
      conversions: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "paused":
        return "warning";
      case "planning":
        return "info";
      case "completed":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayArrow />;
      case "paused":
        return <Pause />;
      case "planning":
        return <Campaign />;
      default:
        return <Campaign />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="campaign-mgmt" />
      
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
                team-leader-dashboard/configuration/campaign-mgmt.localhost:3000
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
              <Campaign fontSize="small" />
              Campaign Mgmt
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                Campaign Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Create, manage, and track marketing campaigns
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{ height: 'fit-content' }}
            >
              Create Campaign
            </Button>
          </Box>

          {/* Campaign Overview Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Campaigns
                  </Typography>
                  <Typography variant="h3" color="primary" fontWeight={700}>
                    {campaigns.length}
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
                    {campaigns.filter(c => c.status === 'active').length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Total Leads
                  </Typography>
                  <Typography variant="h3" color="info.main" fontWeight={700}>
                    {campaigns.reduce((sum, c) => sum + c.leads, 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Conversions
                  </Typography>
                  <Typography variant="h3" color="warning.main" fontWeight={700}>
                    {campaigns.reduce((sum, c) => sum + c.conversions, 0)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Campaigns Table */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Campaign Overview
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Campaign Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Budget</TableCell>
                      <TableCell>Spent</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Leads</TableCell>
                      <TableCell>Conversions</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {campaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {campaign.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {campaign.startDate} - {campaign.endDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {campaign.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(campaign.status)}
                            label={campaign.status.toUpperCase()}
                            color={getStatusColor(campaign.status) as any}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{campaign.budget}</TableCell>
                        <TableCell>{campaign.spent}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 100, height: 8, bgcolor: 'grey.200', borderRadius: 1, overflow: 'hidden' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={campaign.progress} 
                                sx={{ height: '100%' }}
                              />
                            </Box>
                            <Typography variant="body2">
                              {campaign.progress}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{campaign.leads}</TableCell>
                        <TableCell>{campaign.conversions}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <MuiIconButton size="small" color="primary">
                              <Visibility />
                            </MuiIconButton>
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
