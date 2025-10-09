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
  Modal,
  Backdrop,
  Fade,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Pagination,
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
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

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
  {
    id: 7,
    name: "Suresh Verma",
    email: "suresh.verma@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "4 hours ago",
    avatar: "SV",
  },
  {
    id: 8,
    name: "Meera Joshi",
    email: "meera.joshi@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "MJ",
  },
  {
    id: 9,
    name: "Ravi Agarwal",
    email: "ravi.agarwal@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "RA",
  },
  {
    id: 10,
    name: "Kavita Singh",
    email: "kavita.singh@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "30 minutes ago",
    avatar: "KS",
  },
  {
    id: 11,
    name: "Deepak Mehta",
    email: "deepak.mehta@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "DM",
  },
  {
    id: 12,
    name: "Sunita Agarwal",
    email: "sunita.agarwal@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "45 minutes ago",
    avatar: "SA",
  },
  {
    id: 13,
    name: "Rohit Gupta",
    email: "rohit.gupta@company.com",
    role: "Developer",
    team: "Engineering",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "RG",
  },
];

// Mock team data
const mockTeams = [
  {
    id: 1,
    name: "Engineering",
    description: "Core development team",
    members: 12,
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
  const [currentPage, setCurrentPage] = useState(1);
  const [configureSSOOpen, setConfigureSSOOpen] = useState(false);
  const membersPerPage = 10;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedUsers(mockUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
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
    setCurrentPage(1);
  };

  const handleOpenConfigureSSO = () => {
    setConfigureSSOOpen(true);
  };

  const handleCloseConfigureSSO = () => {
    setConfigureSSOOpen(false);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const getPaginatedMembers = () => {
    if (!selectedTeam) return [];
    const teamMembers = mockUsers.filter(
      (user) => user.team === selectedTeam.name
    );
    const startIndex = (currentPage - 1) * membersPerPage;
    const endIndex = startIndex + membersPerPage;
    return teamMembers.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    if (!selectedTeam) return 0;
    const teamMembers = mockUsers.filter(
      (user) => user.team === selectedTeam.name
    );
    return Math.ceil(teamMembers.length / membersPerPage);
  };

  const handleSaveTeam = () => {
    // Handle team save logic here
    console.log("Saving team:", selectedTeam);
    handleCloseTeamManagement();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "error";
      case "Developer":
        return "success";
      case "Team Lead":
        return "info";
      case "Manager":
        return "warning";
      case "Analyst":
        return "default";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "success" : "default";
  };

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <TeamLeaderSidebar activeItem="access-management" />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          marginLeft: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <AppBar
          position="static"
          elevation={1}
          sx={{
            backgroundColor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MoreVert />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body2"
                sx={{ fontFamily: "monospace", color: "text.secondary" }}
              >
                team-leader-dashboard-access-management.localhost:3000
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<Lock />}
                sx={{ ml: 1 }}
                onClick={logout}
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          {/* Header Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={700}
              gutterBottom
            >
              Access Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage users and teams
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                icon={<People />}
                label="Users"
                iconPosition="start"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
              <Tab
                icon={<Business />}
                label="Teams"
                iconPosition="start"
                sx={{ textTransform: "none", fontWeight: 600 }}
              />
            </Tabs>
          </Box>

          {/* User Management Content */}
          {activeTab === 0 && (
            <Box>
              {/* User Management Header */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight={700}
                  gutterBottom
                >
                  User Management
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Manage user accounts and permissions
                </Typography>

                {/* Search and Action Bar */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    flexWrap: "wrap",
                    mb: 3,
                  }}
                >
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
                    sx={{ textTransform: "none" }}
                  >
                    Bulk Import
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    sx={{ textTransform: "none" }}
                  >
                    Invite User
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ textTransform: "none", ml: "auto" }}
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
                        <TableRow sx={{ backgroundColor: "action.hover" }}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              indeterminate={
                                selectedUsers.length > 0 &&
                                selectedUsers.length < mockUsers.length
                              }
                              checked={
                                selectedUsers.length === mockUsers.length
                              }
                              onChange={handleSelectAll}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>User</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Team</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Last active
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Actions
                          </TableCell>
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
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    bgcolor: "primary.main",
                                    fontSize: "0.875rem",
                                  }}
                                >
                                  {user.avatar}
                                </Avatar>
                                <Box>
                                  <Typography variant="body2" fontWeight={600}>
                                    {user.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
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
                                {user.team}
                              </Typography>
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
                              <Typography variant="body2">
                                {user.lastActive}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
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
                <Typography
                  variant="h4"
                  component="h2"
                  fontWeight={700}
                  gutterBottom
                >
                  Team Dashboard
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Create and manage teams within your organization
                </Typography>

                {/* Create Team Button */}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ textTransform: "none" }}
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
                        <TableRow sx={{ backgroundColor: "action.hover" }}>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Team name
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Members
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Last active
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Created
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600 }}>
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {mockTeams.map((team) => (
                          <TableRow key={team.id} hover>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Business
                                  sx={{
                                    color: "primary.main",
                                    fontSize: "1.25rem",
                                  }}
                                />
                                <Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    color="primary.main"
                                  >
                                    {team.name}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {team.description}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Group
                                  sx={{
                                    fontSize: "1rem",
                                    color: "text.secondary",
                                  }}
                                />
                                <Typography variant="body2">
                                  {team.members}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {team.lastActive}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {team.created}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  sx={{ textTransform: "none" }}
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
        </Container>
      </Box>

      {/* Team Management Modal */}
      <Modal
        open={teamManagementOpen}
        onClose={handleCloseTeamManagement}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={teamManagementOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
              maxWidth: "1200px",
              height: "90vh",
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 0,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                Manage Team
              </Typography>
              <IconButton onClick={handleCloseTeamManagement}>
                <Close />
              </IconButton>
            </Box>

            {/* Scrollable Content */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
                minHeight: 0,
                maxHeight: "calc(90vh - 140px)", // Account for header and footer
              }}
            >
              {selectedTeam && (
                <>
                  {/* Team Members */}
                  <Card
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      boxShadow: 2,
                      mb: 3,
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      {/* Team Header */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2,
                        }}
                      >
                        <Business
                          sx={{ color: "primary.main", fontSize: "1.5rem" }}
                        />
                        <Box>
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            color="primary.main"
                          >
                            {selectedTeam.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {selectedTeam.description}
                          </Typography>
                        </Box>
                      </Box>

                      {/* Members Header */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>
                          Team Members (
                          {
                            mockUsers.filter(
                              (user) => user.team === selectedTeam.name
                            ).length
                          }
                          )
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<PersonAdd />}
                          size="small"
                          sx={{ textTransform: "none" }}
                        >
                          Add Member
                        </Button>
                      </Box>

                      {/* Members List Container with Fixed Height */}
                      <Box
                        sx={{
                          maxHeight: "500px",
                          overflow: "auto",
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          mb: 2,
                        }}
                      >
                        <List sx={{ p: 0 }}>
                          {getPaginatedMembers().map((member) => (
                            <ListItem
                              key={member.id}
                              sx={{
                                px: 2,
                                py: 1.5,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <ListItemIcon>
                                <Avatar
                                  sx={{
                                    bgcolor: "primary.main",
                                    fontSize: "0.875rem",
                                    width: 36,
                                    height: 36,
                                  }}
                                >
                                  {member.avatar}
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2" fontWeight={600}>
                                    {member.name}
                                  </Typography>
                                }
                                secondary={
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 1,
                                      mt: 0.5,
                                    }}
                                  >
                                    <Chip
                                      label={member.role}
                                      color={getRoleColor(member.role)}
                                      variant="outlined"
                                      size="small"
                                    />
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ fontSize: "0.75rem" }}
                                    >
                                      {member.email}
                                    </Typography>
                                    <Chip
                                      label={member.status}
                                      color={getStatusColor(member.status)}
                                      size="small"
                                    />
                                  </Box>
                                }
                              />
                              <IconButton size="small" color="error">
                                <Delete fontSize="small" />
                              </IconButton>
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      {/* Pagination Controls */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: 2,
                          p: 2,
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 1,
                          bgcolor: "grey.50",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Showing {(currentPage - 1) * membersPerPage + 1}-
                          {Math.min(
                            currentPage * membersPerPage,
                            mockUsers.filter(
                              (user) => user.team === selectedTeam.name
                            ).length
                          )}{" "}
                          of{" "}
                          {
                            mockUsers.filter(
                              (user) => user.team === selectedTeam.name
                            ).length
                          }{" "}
                          members
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Page {currentPage} of {getTotalPages()}
                          </Typography>
                          <Pagination
                            count={getTotalPages()}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size="small"
                            showFirstButton
                            showLastButton
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </>
              )}
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                flexShrink: 0,
              }}
            >
              <Button
                variant="outlined"
                fullWidth
                onClick={handleCloseTeamManagement}
                sx={{ textTransform: "none", py: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSaveTeam}
                startIcon={<Save />}
                sx={{ textTransform: "none", py: 1 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Configure SSO Modal */}
      <Modal
        open={configureSSOOpen}
        onClose={handleCloseConfigureSSO}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={configureSSOOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "600px", md: "700px" },
              maxHeight: "90vh",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                p: 3,
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
                  <Security />
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Configure Google SSO
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Set up Google OAuth 2.0 authentication
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={handleCloseConfigureSSO} size="small">
                <Close />
              </IconButton>
            </Box>

            {/* Modal Content */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* OAuth Credentials Section */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    OAuth 2.0 Credentials
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Enter your Google OAuth application credentials
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mb: 1, fontSize: "0.875rem" }}
                      >
                        Client ID
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
                        variant="outlined"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": { fontSize: "0.875rem" },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mb: 1, fontSize: "0.875rem" }}
                      >
                        Client Secret
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Enter your client secret"
                        variant="outlined"
                        size="small"
                        type="password"
                        sx={{
                          "& .MuiInputBase-input": { fontSize: "0.875rem" },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{ mb: 1, fontSize: "0.875rem" }}
                      >
                        Redirect URI
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="https://app.company.com/auth/google/callback"
                        variant="outlined"
                        size="small"
                        helperText="Must match the redirect URI configured in Google Console"
                        sx={{
                          "& .MuiInputBase-input": { fontSize: "0.875rem" },
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Authentication Settings Section */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Authentication Settings
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    Configure how users authenticate with Google SSO
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Sync user profiles
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Keep user information updated from Google
                        </Typography>
                      </Box>
                      <Checkbox defaultChecked />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Enforce SSO
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Require Google SSO for all users
                        </Typography>
                      </Box>
                      <Checkbox defaultChecked />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          Auto-provision users
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Automatically create accounts for new Google users
                        </Typography>
                      </Box>
                      <Checkbox />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Modal Footer */}
            <Box
              sx={{
                p: 3,
                borderTop: "1px solid",
                borderColor: "divider",
                display: "flex",
                gap: 2,
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="outlined"
                onClick={handleCloseConfigureSSO}
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleCloseConfigureSSO}
                startIcon={<Save />}
                sx={{ textTransform: "none" }}
              >
                Save Configuration
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
