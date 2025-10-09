"use client";

import { useState, useEffect, useCallback } from "react";
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
  TextField,
  InputAdornment,
  Checkbox,
  Tabs,
  Tab,
  Modal,
  Backdrop,
  Fade,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Pagination,
  CircularProgress,
  Alert,
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
  Add,
  Group,
  Close,
  Save,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { User, Team } from "@/types/api/access-management";
import * as accessManagementService from "@/data/services/access-management-service";
import { formatRelativeTime } from "@/utilities/date-util";
import { useDebounce } from "@/hooks/use-debounce";

// Define a constant for the sidebar width to reuse it
const DRAWER_WIDTH = 280;

/**
 * Access Management page component for Team Leader Dashboard
 */
export default function AccessManagementPage() {
  const router = useRouter();
  const { logout } = useAuth();

  // Component State
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // User Tab State
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Team Tab State & Modal State
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  // Data fetching functions
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUsers = await accessManagementService.getUsers({
        // The API supports filtering by username or email.
        // We can pass the search term to both.
        username: debouncedSearchTerm,
        email: debouncedSearchTerm,
      });
      setUsers(fetchedUsers);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  const fetchTeams = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTeams = await accessManagementService.getTeams();
      setTeams(fetchedTeams);
    } catch (err) {
      setError("Failed to load teams. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const fetchTeamMembers = useCallback(async (slug: string) => {
      if (!slug) return;
      setIsLoadingTeamMembers(true);
      try {
          const members = await accessManagementService.getUsersInTeam(slug);
          setTeamMembers(members);
      } catch (err) {
          // Handle specific error for modal
          console.error("Failed to load team members");
      } finally {
          setIsLoadingTeamMembers(false);
      }
  }, []);

  // Effects for fetching data based on tab and search term
  useEffect(() => {
    if (activeTab === 0) {
      fetchUsers();
    } else if (activeTab === 1) {
      fetchTeams();
    }
  }, [activeTab, fetchUsers, fetchTeams]);
  
  useEffect(() => {
    if (selectedTeam) {
        fetchTeamMembers(selectedTeam.slug);
    }
  }, [selectedTeam, fetchTeamMembers]);

  // Handlers
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSelectedUsers([]);
  };
  
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(users.map((user) => user.email));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userEmail: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userEmail)
        ? prev.filter((id) => id !== userEmail)
        : [...prev, userEmail]
    );
  };

  const handleDeleteUser = async (userEmail: string) => {
      if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
          try {
              await accessManagementService.deleteUser(userEmail);
              fetchUsers(); // Refresh user list
          } catch (error) {
              alert("Failed to delete user.");
          }
      }
  }

  const handleManageTeam = (team: Team) => {
    setSelectedTeam(team);
    setTeamManagementOpen(true);
  };

  const handleCloseTeamManagement = () => {
    setTeamManagementOpen(false);
    setSelectedTeam(null);
    setTeamMembers([]);
    setCurrentPage(1);
  };
  
  const handleRemoveMember = async (teamSlug: string, userEmail: string) => {
      if (window.confirm(`Remove ${userEmail} from this team?`)) {
          try {
              await accessManagementService.removeUserFromTeam(teamSlug, userEmail);
              fetchTeamMembers(teamSlug); // Refresh member list
          } catch (error) {
              alert("Failed to remove member.");
          }
      }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };
  
  // UI Helpers
  const getPaginatedMembers = () => {
    const startIndex = (currentPage - 1) * membersPerPage;
    return teamMembers.slice(startIndex, startIndex + membersPerPage);
  };

  const getTotalPages = () => Math.ceil(teamMembers.length / membersPerPage);

  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin": return "error";
      case "super admin": return "error";
      case "developer": return "success";
      case "team lead": return "info";
      case "manager": return "warning";
      case "analyst": return "default";
      default: return "default";
    }
  };

  const getStatusColor = (status: boolean) => (status ? "success" : "default");

  const renderContent = () => {
    if (isLoading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }
    if (error) {
      return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
    }
    // Render Users Tab
    if (activeTab === 0) {
      return (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "action.hover" }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < users.length}
                        checked={users.length > 0 && selectedUsers.length === users.length}
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
                  {users.map((user) => (
                    <TableRow key={user.email} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.includes(user.email)}
                          onChange={() => handleSelectUser(user.email)}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Avatar sx={{ bgcolor: "primary.main", fontSize: "0.875rem" }}>
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={600}>
                              {user.first_name || ""} {user.last_name || user.username}
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
                        {/* As per assumption, showing the first team */}
                        <Typography variant="body2">
                          {user.teams && user.teams.length > 0 ? user.teams[0].name : "N/A"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.is_active ? "Active" : "Inactive"}
                          size="small"
                          color={getStatusColor(user.is_active)}
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatRelativeTime(user.last_login_at)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <IconButton size="small" color="primary"><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.email)}><Delete fontSize="small" /></IconButton>
                          <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      );
    }
    // Render Teams Tab
    if (activeTab === 1) {
      return (
        <Card>
          <CardContent sx={{ p: 0 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "action.hover" }}>
                    <TableCell sx={{ fontWeight: 600 }}>Team name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Members</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Last active</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Created</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teams.map((team) => (
                    <TableRow key={team.slug} hover>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Business sx={{ color: "primary.main", fontSize: "1.25rem" }}/>
                          <Typography variant="body2" fontWeight={600} color="primary.main">
                            {team.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Group sx={{ fontSize: "1rem", color: "text.secondary" }}/>
                          <Typography variant="body2">{team.users?.length || 0}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{formatRelativeTime(team.updated_at)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{new Date(team.created_at).toLocaleDateString()}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button variant="outlined" size="small" sx={{ textTransform: "none" }} onClick={() => handleManageTeam(team)}>
                            Manage
                          </Button>
                          <IconButton size="small"><MoreVert fontSize="small" /></IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      );
    }
    return null;
  };
  
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "background.default" }}>
      <TeamLeaderSidebar activeItem="access-management" />

      <Box component="main" sx={{ flexGrow: 1, display: "flex", flexDirection: "column", width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` }, marginLeft: { md: `${DRAWER_WIDTH}px` } }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: "background.paper", color: "text.primary", borderBottom: "1px solid", borderColor: "divider" }}>
          <Toolbar>
             <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                team-leader-dashboard-access-management.localhost:3000
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button variant="contained" color="error" size="small" startIcon={<Lock />} sx={{ ml: 1 }} onClick={logout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Access Management</Typography>
            <Typography variant="h6" color="text.secondary">Manage users and teams</Typography>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab icon={<People />} label="Users" iconPosition="start" sx={{ textTransform: "none", fontWeight: 600 }} />
              <Tab icon={<Business />} label="Teams" iconPosition="start" sx={{ textTransform: "none", fontWeight: 600 }} />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>User Management</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Manage user accounts and permissions</Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mb: 3 }}>
                  <TextField
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: (<InputAdornment position="start"><Search /></InputAdornment>) }}
                    sx={{ minWidth: 300, flexGrow: { xs: 1, md: 0 } }}
                  />
                  <Button variant="outlined" startIcon={<Upload />} sx={{ textTransform: "none" }}>Bulk Import</Button>
                  <Button variant="contained" startIcon={<PersonAdd />} sx={{ textTransform: "none" }}>Invite User</Button>
                  <Button variant="outlined" startIcon={<FilterList />} sx={{ textTransform: "none", ml: "auto" }}>Filter</Button>
                </Box>
              </Box>
              {renderContent()}
            </Box>
          )}

          {activeTab === 1 && (
            <Box>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>Team Dashboard</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Create and manage teams within your organization</Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
                  <Button variant="contained" startIcon={<Add />} sx={{ textTransform: "none" }}>Create Team</Button>
                </Box>
              </Box>
              {renderContent()}
            </Box>
          )}
        </Container>
      </Box>

      {/* Team Management Modal */}
      <Modal open={teamManagementOpen} onClose={handleCloseTeamManagement} closeAfterTransition>
        <Fade in={teamManagementOpen}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: { xs: "95%", md: "70%" }, maxWidth: "1200px", height: "90vh", bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 0, display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
              <Typography variant="h5" fontWeight={700}>Manage Team</Typography>
              <IconButton onClick={handleCloseTeamManagement}><Close /></IconButton>
            </Box>
            <Box sx={{ flex: 1, overflow: "auto", p: 3, display: "flex", flexDirection: "column", gap: 3 }}>
              {selectedTeam && (
                <Card sx={{ border: "1px solid", borderColor: "divider", boxShadow: 2 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                      <Business sx={{ color: "primary.main", fontSize: "1.5rem" }}/>
                      <Typography variant="h6" fontWeight={600} color="primary.main">{selectedTeam.name}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={600}>Team Members ({teamMembers.length})</Typography>
                      <Button variant="contained" startIcon={<PersonAdd />} size="small" sx={{ textTransform: "none" }}>Add Member</Button>
                    </Box>
                    <Box sx={{ maxHeight: "500px", overflow: "auto", border: "1px solid", borderColor: "divider", borderRadius: 1, mb: 2 }}>
                        {isLoadingTeamMembers ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
                        ) : (
                            <List sx={{ p: 0 }}>
                                {getPaginatedMembers().map((member) => (
                                <ListItem key={member.email} sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: "divider" }}>
                                    <ListItemIcon>
                                    <Avatar sx={{ bgcolor: "primary.main", fontSize: "0.875rem", width: 36, height: 36 }}>{member.first_name?.[0]}{member.last_name?.[0]}</Avatar>
                                    </ListItemIcon>
                                    <ListItemText
                                    primary={<Typography variant="body2" fontWeight={600}>{member.first_name || ""} {member.last_name || member.username}</Typography>}
                                    secondary={
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                                        <Chip label={member.role} color={getRoleColor(member.role)} variant="outlined" size="small"/>
                                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.75rem" }}>{member.email}</Typography>
                                        <Chip label={member.is_active ? "Active" : "Inactive"} color={getStatusColor(member.is_active)} size="small"/>
                                        </Box>
                                    }
                                    />
                                    <IconButton size="small" color="error" onClick={() => handleRemoveMember(selectedTeam.slug, member.email)}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, p: 2, border: "1px solid", borderColor: "divider", borderRadius: 1, bgcolor: "grey.50" }}>
                      <Typography variant="body2" color="text.secondary">
                        Showing {(currentPage - 1) * membersPerPage + 1}-
                        {Math.min(currentPage * membersPerPage, teamMembers.length)} of {teamMembers.length} members
                      </Typography>
                      <Pagination count={getTotalPages()} page={currentPage} onChange={handlePageChange} color="primary" size="small" showFirstButton showLastButton/>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Box>
            <Box sx={{ display: "flex", gap: 2, p: 2, borderTop: "1px solid", borderColor: "divider", flexShrink: 0 }}>
              <Button variant="outlined" fullWidth onClick={handleCloseTeamManagement} sx={{ textTransform: "none", py: 1 }}>Cancel</Button>
              <Button variant="contained" fullWidth startIcon={<Save />} sx={{ textTransform: "none", py: 1 }}>Save Changes</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}