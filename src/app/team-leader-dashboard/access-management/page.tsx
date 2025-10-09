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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  Switch,
  Snackbar, // Added for toast notifications
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
import { User, Team, UserUpdatePayload } from "@/types/api/access-management";
import * as accessManagementService from "@/data/services/access-management-service";
import { formatRelativeTime } from "@/utilities/date-util";
import { useDebounce } from "@/hooks/use-debounce";

// Define a constant for the sidebar width to reuse it
const DRAWER_WIDTH = 280;

type ToastSeverity = "success" | "error" | "info" | "warning";

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

  // User Filter State
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<{ team: string; status: string }>({ team: "", status: "" });
  const [tempFilters, setTempFilters] = useState(filters);

  // User Edit Modal State
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Team Create Modal State
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  
  // Team Menu State
  const [teamMenuAnchorEl, setTeamMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenuTeam, setSelectedMenuTeam] = useState<Team | null>(null);

  // Team Tab State & Modal State
  const [teamManagementOpen, setTeamManagementOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [isLoadingTeamMembers, setIsLoadingTeamMembers] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;
  
  // Toast State
  const [toast, setToast] = useState<{ open: boolean; message: string; severity: ToastSeverity }>({ open: false, message: "", severity: "success" });

  // Confirmation Dialog State
  const [confirmation, setConfirmation] = useState<{ open: boolean; title: string; content: string; onConfirm: () => void; }>({ open: false, title: "", content: "", onConfirm: () => {} });

  // Data fetching functions
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        const params: { [key: string]: any } = {
            username: debouncedSearchTerm || undefined,
            email: debouncedSearchTerm || undefined,
            team_slug: filters.team || undefined,
        };
        if (filters.status) {
            params.is_active = filters.status === 'active';
        }

        const fetchedUsers = await accessManagementService.getUsers(params);
        setUsers(fetchedUsers);
    } catch (err) {
        setError("Failed to load users. Please try again later.");
    } finally {
        setIsLoading(false);
    }
  }, [debouncedSearchTerm, filters]);

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
          console.error("Failed to load team members");
      } finally {
          setIsLoadingTeamMembers(false);
      }
  }, []);

  // Effects for fetching data based on tab and search term
  useEffect(() => {
    if (activeTab === 0) {
      fetchUsers();
    } 
    fetchTeams();
  }, [activeTab, fetchUsers, fetchTeams]);
  
  useEffect(() => {
    if (selectedTeam) {
        fetchTeamMembers(selectedTeam.slug);
    }
  }, [selectedTeam, fetchTeamMembers]);

  // Handlers
  const showToast = (message: string, severity: ToastSeverity) => {
    setToast({ open: true, message, severity });
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };
  
  const openConfirmation = (title: string, content: string, onConfirm: () => void) => {
    setConfirmation({ open: true, title, content, onConfirm });
  };

  const handleCloseConfirmation = () => {
    setConfirmation({ ...confirmation, open: false });
  };

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
  
  // User Action Handlers
  const handleOpenEditUserModal = (user: User) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleCloseEditUserModal = () => {
    setIsEditUserModalOpen(false);
    setEditingUser(null);
  };

  const handleUpdateUser = async (payload: UserUpdatePayload) => {
    if (!editingUser) return;
    try {
      await accessManagementService.updateUser(editingUser.email, payload);
      handleCloseEditUserModal();
      showToast("User updated successfully", "success");
      fetchUsers(); // Refresh users
    } catch (error) {
      showToast("Failed to update user.", "error");
      console.error(error);
    }
  };

  const handleDeleteUser = (userEmail: string, userName: string) => {
    openConfirmation(
      `Delete User?`,
      `Are you sure you want to delete ${userName}? This action cannot be undone.`,
      async () => {
        try {
          await accessManagementService.deleteUser(userEmail);
          showToast("User deleted successfully.", "success");
          fetchUsers(); // Refresh user list
        } catch (error) {
          showToast("Failed to delete user.", "error");
        }
        handleCloseConfirmation();
      }
    );
  };

  // Filter Handlers
  const handleOpenFilterModal = () => {
    setTempFilters(filters);
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => setIsFilterModalOpen(false);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    handleCloseFilterModal();
  };

  const handleClearFilters = () => {
    const clearedFilters = { team: "", status: "" };
    setFilters(clearedFilters);
    setTempFilters(clearedFilters);
    handleCloseFilterModal();
  };

  // Team Action Handlers
  const handleOpenCreateTeamModal = () => setIsCreateTeamModalOpen(true);
  const handleCloseCreateTeamModal = () => {
    setIsCreateTeamModalOpen(false);
    setNewTeamName("");
  };

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) {
        showToast("Team name cannot be empty.", "warning");
        return;
    }
    const slug = newTeamName.trim().toLowerCase().replace(/\s+/g, '-');
    const organization_id = users[0]?.organization_id || "default-org-id"; 
    
    try {
        await accessManagementService.createTeam({
            name: newTeamName.trim(),
            slug,
            organization_id,
        });
        handleCloseCreateTeamModal();
        showToast("Team created successfully!", "success");
        fetchTeams(); 
    } catch (error) {
        showToast("Failed to create team. A team with this name may already exist.", "error");
        console.error(error);
    }
  };
  
  const handleDeleteTeam = () => {
    if (!selectedMenuTeam) return;
    const teamToDelete = selectedMenuTeam; // Capture the team before closing the menu
    handleTeamMenuClose(); // Close menu first
    openConfirmation(
      `Delete Team?`,
      `Are you sure you want to delete "${teamToDelete.name}"? This action is permanent.`,
      async () => {
        try {
          await accessManagementService.deleteTeam(teamToDelete.slug);
          showToast("Team deleted successfully.", "success");
          fetchTeams();
        } catch (error) {
          showToast("Failed to delete team.", "error");
        }
        handleCloseConfirmation();
      }
    );
  };
  
  const handleTeamMenuOpen = (event: React.MouseEvent<HTMLElement>, team: Team) => {
      setTeamMenuAnchorEl(event.currentTarget);
      setSelectedMenuTeam(team);
  };

  const handleTeamMenuClose = () => {
      setTeamMenuAnchorEl(null);
      setSelectedMenuTeam(null);
  };

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
  
  const handleRemoveMember = (teamSlug: string, userEmail: string, userName: string) => {
    openConfirmation(
        `Remove Member?`,
        `Are you sure you want to remove ${userName} from this team?`,
        async () => {
            try {
                await accessManagementService.removeUserFromTeam(teamSlug, userEmail);
                showToast("Member removed successfully.", "success");
                fetchTeamMembers(teamSlug); // Refresh member list
            } catch (error) {
                showToast("Failed to remove member.", "error");
            }
            handleCloseConfirmation();
        }
    );
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
    if (isLoading && activeTab === 0) { 
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
                          <IconButton size="small" color="primary" onClick={() => handleOpenEditUserModal(user)}><Edit fontSize="small" /></IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDeleteUser(user.email, `${user.first_name} ${user.last_name}`)}><Delete fontSize="small" /></IconButton>
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
      if (isLoading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
      }
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
                          <IconButton size="small" onClick={(event) => handleTeamMenuOpen(event, team)}><MoreVert fontSize="small" /></IconButton>
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
                  <Button variant="outlined" startIcon={<FilterList />} sx={{ textTransform: "none", ml: "auto" }} onClick={handleOpenFilterModal}>Filter</Button>
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
                  <Button variant="contained" startIcon={<Add />} sx={{ textTransform: "none" }} onClick={handleOpenCreateTeamModal}>Create Team</Button>
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
                                    <IconButton size="small" color="error" onClick={() => handleRemoveMember(selectedTeam.slug, member.email, `${member.first_name} ${member.last_name}`)}>
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
          </Box>
        </Fade>
      </Modal>

      {/* Edit User Modal */}
      <Dialog open={isEditUserModalOpen} onClose={handleCloseEditUserModal} fullWidth maxWidth="sm">
          <DialogTitle>Edit User: {editingUser?.first_name} {editingUser?.last_name}</DialogTitle>
          <DialogContent>
              <DialogContentText sx={{mb: 2}}>
                  Update the user's details below.
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="first_name"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={editingUser?.first_name}
                  onChange={(e) => setEditingUser(prev => prev ? {...prev, first_name: e.target.value} : null)}
              />
              <TextField
                  margin="dense"
                  id="last_name"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={editingUser?.last_name}
                  onChange={(e) => setEditingUser(prev => prev ? {...prev, last_name: e.target.value} : null)}
              />
              <FormControl component="fieldset" fullWidth margin="dense">
                <Typography component="legend" variant="body2" color="text.secondary" sx={{ mt: 1 }}>Status</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>Inactive</Typography>
                    <Switch
                        checked={editingUser?.is_active || false}
                        onChange={(e) => setEditingUser(prev => prev ? { ...prev, is_active: e.target.checked } : null)}
                        name="is_active"
                    />
                    <Typography>Active</Typography>
                </Box>
              </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
              <Button onClick={handleCloseEditUserModal}>Cancel</Button>
              <Button onClick={() => handleUpdateUser({ 
                  first_name: editingUser?.first_name || '', 
                  last_name: editingUser?.last_name || '', 
                  is_active: editingUser?.is_active 
                })} 
                variant="contained"
              >
                Save Changes
              </Button>
          </DialogActions>
      </Dialog>
      
      {/* Create Team Modal */}
      <Dialog open={isCreateTeamModalOpen} onClose={handleCloseCreateTeamModal} fullWidth maxWidth="sm">
          <DialogTitle>Create New Team</DialogTitle>
          <DialogContent>
              <DialogContentText sx={{mb: 2}}>
                  Enter a name for the new team. A unique slug will be generated automatically.
              </DialogContentText>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Team Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
              />
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button onClick={handleCloseCreateTeamModal}>Cancel</Button>
              <Button onClick={handleCreateTeam} variant="contained">Create Team</Button>
          </DialogActions>
      </Dialog>
      
      {/* Team Actions Menu */}
      <Menu
        anchorEl={teamMenuAnchorEl}
        open={Boolean(teamMenuAnchorEl)}
        onClose={handleTeamMenuClose}
      >
        <MenuItem onClick={handleDeleteTeam} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Delete fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Delete Team
        </MenuItem>
      </Menu>

      {/* Filter Users Modal */}
      <Dialog open={isFilterModalOpen} onClose={handleCloseFilterModal} fullWidth maxWidth="xs">
        <DialogTitle>Filter Users</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="filter-team-label">Team</InputLabel>
            <Select
              labelId="filter-team-label"
              value={tempFilters.team}
              label="Team"
              onChange={(e) => setTempFilters({ ...tempFilters, team: e.target.value })}
            >
              <MenuItem value=""><em>All Teams</em></MenuItem>
              {teams.map((team) => (
                  <MenuItem key={team.slug} value={team.slug}>{team.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="filter-status-label">Status</InputLabel>
            <Select
              labelId="filter-status-label"
              value={tempFilters.status}
              label="Status"
              onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
            >
              <MenuItem value=""><em>All Statuses</em></MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'space-between' }}>
            <Button onClick={handleClearFilters} color="secondary">Clear Filters</Button>
            <Box>
                <Button onClick={handleCloseFilterModal}>Cancel</Button>
                <Button onClick={handleApplyFilters} variant="contained">Apply</Button>
            </Box>
        </DialogActions>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmation.open}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {confirmation.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmation.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation}>Cancel</Button>
          <Button onClick={confirmation.onConfirm} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Notification */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}