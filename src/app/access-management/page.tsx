"use client";

import { useState, useEffect } from "react";
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
  Grid,
  Modal,
  Backdrop,
  Fade,
  Pagination,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MoreVert,
  BookmarkBorder,
  Lock,
  Search,
  FilterList,
  PersonAdd,
  Group,
  Edit,
  Delete,
  Upload,
  Security,
  People,
  Business,
  Public,
  Add,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Priya Sharma",
    email: "priya.sharma@company.com",
    role: "Admin",
    team: "Engineering",
    department: "Technology",
    status: "Active",
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@company.com",
    role: "Developer",
    team: "Frontend",
    department: "Engineering",
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: 3,
    name: "Anita Patel",
    email: "anita.patel@company.com",
    role: "Team Lead",
    team: "Backend",
    department: "Engineering",
    status: "Active",
    lastActive: "30 minutes ago"
  },
  {
    id: 4,
    name: "Vikram Singh",
    email: "vikram.singh@company.com",
      role: "Manager",
    team: "Product",
    department: "Product",
      status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: 5,
    name: "Sunita Reddy",
    email: "sunita.reddy@company.com",
    role: "Analyst",
    team: "Data",
    department: "Analytics",
      status: "Active",
    lastActive: "45 minutes ago"
  }
];

const mockTeams = [
  {
    id: 1,
    name: "Engineering Team",
    description: "Full-stack development team",
    memberCount: 12,
    status: "Active"
  },
  {
    id: 2,
    name: "Product Team",
    description: "Product management and design",
    memberCount: 8,
    status: "Active"
  },
  {
    id: 3,
    name: "Data Analytics",
    description: "Data science and analytics",
    memberCount: 6,
    status: "Active"
  }
];

export default function AccessManagementPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [ssoModalOpen, setSsoModalOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(filteredUsers.map(user => user.id));
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

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="access-management" />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px', paddingLeft: '24px' }}>
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
              <IconButton size="small" sx={{ color: 'text.secondary' }}><BookmarkBorder /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}><Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>W</Avatar><Typography variant="body2" fontWeight={500}>Work</Typography></Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
              <Button variant="contained" color="error" size="small" startIcon={<Lock />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Access Management</Typography>
            <Typography variant="h6" color="text.secondary">Manage user access, teams, and permissions across your organization</Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>User Management</Typography>
                <Button variant="contained" startIcon={<PersonAdd />}>Add User</Button>
          </Box>

              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
                  sx={{ flexGrow: 1 }}
                />
                <Button variant="outlined" startIcon={<FilterList />}>Filter</Button>
              </Box>

                  <TableContainer>
                    <Table>
                      <TableHead>
                    <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                          indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length}
                          checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Team</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Active</TableCell>
                      <TableCell>Actions</TableCell>
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
                            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                              {user.name.charAt(0)}
                                </Avatar>
                                <Box>
                              <Typography variant="body2" fontWeight={500}>{user.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{user.department}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                        <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Chip 
                                label={user.role} 
                            color={getRoleColor(user.role) as any} 
                                size="small" 
                              />
                            </TableCell>
                        <TableCell>{user.team}</TableCell>
                            <TableCell>
                              <Chip 
                                label={user.status} 
                            color={getStatusColor(user.status) as any} 
                                size="small" 
                              />
                            </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                            <TableCell>
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
                                </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
                  <Tab label="Teams" />
                  <Tab label="Enterprise Federation (SSO)" />
                </Tabs>
            </Box>

              {activeTab === 0 && (
                <Box sx={{ py: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>Teams</Typography>
                    <Button variant="contained" startIcon={<Group />}>Create Team</Button>
              </Box>

                  <Grid container spacing={3}>
                        {mockTeams.map((team) => (
                      <Grid item xs={12} sm={6} md={4} key={team.id}>
                        <Card sx={{ height: '100%' }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                <Typography variant="h6" fontWeight={600}>{team.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{team.description}</Typography>
                                </Box>
                              <IconButton size="small">
                                <MoreVert fontSize="small" />
                              </IconButton>
                              </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">{team.memberCount} members</Typography>
                              <Chip label={team.status} color={team.status === 'Active' ? 'success' : 'default'} size="small" />
                              </Box>
                                <Button
                                  variant="outlined"
                                  size="small"
                              fullWidth
                              onClick={() => {
                                setSelectedTeam(team);
                                setTeamModalOpen(true);
                              }}
                                >
                                  Manage
                                </Button>
                </CardContent>
              </Card>
                      </Grid>
                    ))}
                  </Grid>
            </Box>
          )}

              {activeTab === 1 && (
                <Box sx={{ py: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>Single Sign-On Configuration</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Configure enterprise authentication providers for seamless user access
                </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card>
                  <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>G</Avatar>
                      <Box>
                              <Typography variant="h6" fontWeight={600}>Google Workspace</Typography>
                              <Typography variant="body2" color="text.secondary">Configure Google SSO</Typography>
                      </Box>
                    </Box>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Enable single sign-on with Google Workspace for your organization
                      </Typography>
                          <Button variant="outlined" size="small" onClick={() => setSsoModalOpen(true)}>
                        Configure
                      </Button>
                  </CardContent>
                </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Card>
                  <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Avatar sx={{ bgcolor: 'info.main' }}>M</Avatar>
                      <Box>
                              <Typography variant="h6" fontWeight={600}>Microsoft Azure AD</Typography>
                              <Typography variant="body2" color="text.secondary">Configure Azure AD SSO</Typography>
                      </Box>
                    </Box>
                          <Typography variant="body2" sx={{ mb: 2 }}>
                            Integrate with Microsoft Azure Active Directory
                      </Typography>
                          <Button variant="outlined" size="small" disabled>
                            Coming Soon
                      </Button>
                  </CardContent>
                </Card>
                    </Grid>
                  </Grid>
                      </Box>
              )}
                  </CardContent>
                </Card>
        </Container>
      </Box>

      {/* Team Management Modal */}
      <Modal
        open={teamModalOpen}
        onClose={() => setTeamModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={teamModalOpen}>
          <Box
            sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
            bgcolor: 'background.paper',
              border: '2px solid #000',
            boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                Manage Team: {selectedTeam?.name}
              </Typography>
              <IconButton onClick={() => setTeamModalOpen(false)}>
                <MoreVert />
              </IconButton>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Team Members</Typography>
              <List>
                {mockUsers.slice(0, 10).map((user) => (
                  <ListItem key={user.id} sx={{ px: 0 }}>
                              <ListItemIcon>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {user.name.charAt(0)}
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                      primary={user.name}
                      secondary={user.email}
                    />
                    <Chip label={user.role} color={getRoleColor(user.role) as any} size="small" />
                            </ListItem>
                          ))}
                        </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Pagination count={3} color="primary" />
                        </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => setTeamModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained">
                Save Changes
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* SSO Configuration Modal */}
      <Modal
        open={ssoModalOpen}
        onClose={() => setSsoModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={ssoModalOpen}>
          <Box
            sx={{
            position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 500,
            bgcolor: 'background.paper',
              border: '2px solid #000',
            boxShadow: 24,
              p: 4,
              borderRadius: 2,
              maxHeight: '80vh',
              overflow: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight={600}>
                  Google SSO Configuration
                </Typography>
              <IconButton onClick={() => setSsoModalOpen(false)}>
                <MoreVert />
              </IconButton>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>OAuth Credentials</Typography>
                  <TextField
                    fullWidth
                    label="Client ID"
                placeholder="Enter Google OAuth Client ID"
                sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Client Secret"
                placeholder="Enter Google OAuth Client Secret"
                    type="password"
                sx={{ mb: 2 }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>Authentication Settings</Typography>
                  <TextField
                    fullWidth
                    label="Redirect URI"
                placeholder="https://yourdomain.com/auth/callback"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Domain"
                placeholder="yourdomain.com"
                sx={{ mb: 2 }}
              />
              </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={() => setSsoModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="contained">
                Save Configuration
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}