"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import {
  Search,
  FilterList,
  Add,
  MoreVert,
  Edit,
  Delete,
  People,
  Group,
  Security,
} from "@mui/icons-material";

export default function AccessManagementPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBackToDashboard = () => {
    router.push("/");
  };

  // Mock data
  const users = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh.kumar@company.com", role: "Manager", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya.sharma@company.com", role: "Agent", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit.patel@company.com", role: "Agent", status: "Inactive" },
    { id: 4, name: "Sneha Gupta", email: "sneha.gupta@company.com", role: "Supervisor", status: "Active" },
  ];

  const teams = [
    { id: 1, name: "Customer Support Team A", members: 8, manager: "Rajesh Kumar" },
    { id: 2, name: "Sales Team B", members: 12, manager: "Sneha Gupta" },
    { id: 3, name: "Technical Support", members: 6, manager: "Amit Patel" },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="access-management" />

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          marginLeft: '280px',
          paddingLeft: '24px'
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
              Access Management
              </Typography>
            <Button color="inherit" onClick={handleBackToDashboard}>
              Back to Dashboard
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth={false} sx={{ mt: 3, flexGrow: 1 }}>
          {/* Search and Filter Bar */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
              placeholder="Search users, teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                    <Search />
                        </InputAdornment>
                      ),
              }}
              sx={{ flexGrow: 1, maxWidth: 400 }}
            />
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
              sx={{ minWidth: 120 }}
                  >
              Filters
                  </Button>
                </Box>

          {/* Tabs */}
          <Card sx={{ mb: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab icon={<People />} label="User Management" />
                <Tab icon={<Group />} label="Teams" />
                <Tab icon={<Security />} label="Enterprise Federation" />
              </Tabs>
            </Box>

            {/* Tab Content */}
            <CardContent>
              {activeTab === 0 && (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">User Management</Typography>
                    <Button variant="contained" startIcon={<Add />}>
                      Add User
                    </Button>
              </Box>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                              <Chip 
                                label={user.status} 
                                color={user.status === 'Active' ? 'success' : 'default'}
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <Edit />
                                </IconButton>
                              <IconButton size="small">
                                <Delete />
                                </IconButton>
                                <IconButton size="small">
                                <MoreVert />
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Teams</Typography>
                    <Button variant="contained" startIcon={<Add />}>
                    Create Team
                  </Button>
              </Box>

                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Team Name</TableCell>
                          <TableCell>Members</TableCell>
                          <TableCell>Manager</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {teams.map((team) => (
                          <TableRow key={team.id}>
                            <TableCell>{team.name}</TableCell>
                            <TableCell>{team.members}</TableCell>
                            <TableCell>{team.manager}</TableCell>
                            <TableCell>
                              <IconButton size="small">
                                <Edit />
                              </IconButton>
                              <IconButton size="small">
                                <Delete />
                              </IconButton>
                                <IconButton size="small">
                                <MoreVert />
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>Enterprise Federation (SSO)</Typography>
                <Typography variant="body1" color="text.secondary">
                    Configure single sign-on (SSO) providers for your organization.
                </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" startIcon={<Add />}>
                      Add SSO Provider
                    </Button>
                  </Box>
                </Box>
              )}
                </CardContent>
              </Card>
        </Container>
      </Box>
    </Box>
  );
}