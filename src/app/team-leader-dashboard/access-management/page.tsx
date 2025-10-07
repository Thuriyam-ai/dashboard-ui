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
  IconButton,
  Button,
  Avatar,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Checkbox,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Search,
  Upload,
  PersonAdd,
  FilterList,
  Edit,
  Delete,
  MoreVert,
  Lock,
  People,
  Business,
  Security,
  Public,
  Add,
  Group,
  Close,
  Save,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

// Define a constant for the sidebar width to reuse it
const DRAWER_WIDTH = 280;

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    role: "Admin",
    team: "Engineering",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "RK",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "30 minutes ago",
    avatar: "PS",
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@company.com",
    role: "Team Lead",
    team: "Product",
    status: "Active",
    lastActive: "1 day ago",
    avatar: "AP",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    email: "sneha.gupta@company.com",
    role: "Analyst",
    team: "Operations",
    status: "Inactive",
    lastActive: "1 week ago",
    avatar: "SG",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "3 hours ago",
    avatar: "VS",
  },
  {
    id: 6,
    name: "Anita Reddy",
    email: "anita.reddy@company.com",
    role: "Manager",
    team: "Operations",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "AR",
  },
];

// Mock team data
const mockTeams = [
  {
    id: 1,
    name: "Engineering",
    description: "Core development team",
    members: 8,
    lastActive: "2 hours ago",
    created: "2024-01-01",
  },
  {
    id: 2,
    name: "Product",
    description: "Product management and strategy",
    members: 5,
    lastActive: "1 day ago",
    created: "2024-01-05",
  },
  {
    id: 3,
    name: "Operations",
    description: "Platform operations and monitoring",
    members: 3,
    lastActive: "3 hours ago",
    created: "2024-01-10",
  },
];

/**
 * Access Management page component for Team Leader Dashboard
 */
export default function AccessManagementPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(mockUsers.map(user => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleManageTeam = (team: any) => {
    setSelectedTeam(team);
    setTeamManagementOpen(true);
  };

  const handleCloseTeamManagement = () => {
    setTeamManagementOpen(false);
    setSelectedTeam(null);
  };

  const handleSaveTeam = () => {
    // Handle team save logic here
    console.log('Saving team:', selectedTeam);
    handleCloseTeamManagement();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "error";
      case "Developer": return "success";
      case "Team Lead": return "info";
      case "Manager": return "warning";
      case "Analyst": return "default";
      default: return "default";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "success" : "default";
  };

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar 
        activeItem="access-management"
      />

      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginLeft: { md: `${DRAWER_WIDTH}px` }
        }}
      >
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MoreVert />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                team-leader-dashboard-access-management.localhost:3000
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button variant="contained" color="error" size="small" startIcon={<Lock />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Access Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage users, teams, roles, and enterprise federation
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab 
                icon={<People />} 
                label="Users" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Business />} 
                label="Teams" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Security />} 
                label="Roles & Permissions" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
              <Tab 
                icon={<Public />} 
                label="Enterprise Federation" 
                iconPosition="start"
                sx={{ textTransform: 'none', fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          {/* User Management Content */}
          {activeTab === 0 && (
            <Box>
              {/* User Management Header */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  User Management
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Manage user accounts and permissions
                </Typography>

                {/* Search and Action Bar */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', mb: 3 }}>
                  <TextField
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ minWidth: 300, flexGrow: { xs: 1, md: 0 } }}
                  />
                  
                  <Button
                    variant="outlined"
                    startIcon={<Upload />}
                    sx={{ textTransform: 'none' }}
                  >
                    Bulk Import
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    sx={{ textTransform: 'none' }}
                  >
                    Invite User
                  </Button>
                  
                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ textTransform: 'none', ml: 'auto' }}
                  >
                    Filter
                  </Button>
                </Box>
              </Box>

              {/* User Table */}
              <Card>
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              indeterminate={selectedUsers.length > 0 && selectedUsers.length < mockUsers.length}
                              checked={selectedUsers.length === mockUsers.length}
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Last active</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id} hover>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                                  {user.avatar}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={600}>
                                    {user.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {user.email}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={user.role} 
                                size="small" 
                                color={getRoleColor(user.role)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{user.team}</Typography>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={user.status} 
                                size="small" 
                                color={getStatusColor(user.status)}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{user.lastActive}</Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton size="small" color="primary">
                                  <Edit fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="error">
                                  <Delete fontSize="small" />
                                </IconButton>
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Teams Management Content */}
          {activeTab === 1 && (
            <Box>
              {/* Team Dashboard Header */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
                  Team Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Create and manage teams within your organization
                </Typography>

                {/* Create Team Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ textTransform: 'none' }}
                  >
                    Create Team
                  </Button>
                </Box>
              </Box>

              {/* Teams Table */}
              <Card>
                <CardContent sx={{ p: 0 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: 'action.hover' }}>
                          <TableCell sx={{ fontWeight: 600 }}>Team name</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Members</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Last active</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockTeams.map((team) => (
                          <TableRow key={team.id} hover>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Business sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
                                <Box>
                                  <Typography variant="body2" fontWeight={600} color="primary.main">
                                    {team.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {team.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Group sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                                <Typography variant="body2">{team.members}</Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{team.lastActive}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">{team.created}</Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', gap: 1 }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{ textTransform: 'none' }}
                                  onClick={() => handleManageTeam(team)}
                                >
                                  Manage
                                </Button>
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 0 && activeTab !== 1 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary">
                {activeTab === 2 && "Roles & Permissions"}
                {activeTab === 3 && "Enterprise Federation"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                This section is coming soon...
              </Typography>
            </Box>
          )}
        </Container>
      </Box>

      {/* Team Management Drawer */}
      <Drawer
        anchor="right"
        open={teamManagementOpen}
        onClose={handleCloseTeamManagement}
        sx={{
          '& .MuiDrawer-paper': {
            width: 500,
            padding: 3,
            height: '100vh',
            overflow: 'hidden',
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" fontWeight={700}>
              Manage Team
            </Typography>
            <IconButton onClick={handleCloseTeamManagement}>
              <Close />
            </IconButton>
          </Box>

          {/* Scrollable Content */}
          <Box sx={{
            flex: 1,
            overflow: 'auto',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {selectedTeam && (
              <>
                {/* Team Information */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Team Information
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Business sx={{ color: 'primary.main', fontSize: '2rem' }} />
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="primary.main">
                          {selectedTeam.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedTeam.description}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <TextField
                        label="Team Name"
                        value={selectedTeam.name}
                        size="small"
                        sx={{ flex: 1 }}
                      />
                    </Box>
                    <TextField
                      label="Description"
                      value={selectedTeam.description}
                      multiline
                      rows={2}
                      fullWidth
                    />
                  </CardContent>
                </Card>

                {/* Team Statistics */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      Team Statistics
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3 }}>
                      <Box>
                        <Typography variant="h4" fontWeight={700} color="primary.main">
                          {selectedTeam.members}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Members
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="h4" fontWeight={700} color="success.main">
                          {selectedTeam.members - 1}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Active Members
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>

                {/* Team Members */}
                <Card sx={{ mb: 3 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" fontWeight={600}>
                        Team Members
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<PersonAdd />}
                        size="small"
                        sx={{ textTransform: 'none' }}
                      >
                        Add Member
                      </Button>
                    </Box>
                    <List>
                      {mockUsers.filter(user => user.team === selectedTeam.name).map((member) => (
                        <ListItem key={member.id} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <Avatar sx={{ bgcolor: 'primary.main', fontSize: '0.875rem' }}>
                              {member.avatar}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={member.name}
                            secondary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                <Chip 
                                  label={member.role} 
                                  size="small" 
                                  color={getRoleColor(member.role)}
                                  variant="outlined"
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {member.email}
                                </Typography>
                              </Box>
                            }
                          />
                          <IconButton size="small" color="error">
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 3, flexShrink: 0 }}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCloseTeamManagement}
              sx={{ textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSaveTeam}
              startIcon={<Save />}
              sx={{ textTransform: 'none' }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
