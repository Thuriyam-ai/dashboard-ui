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

          {/* Placeholder for other tabs */}
          {activeTab !== 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" color="text.secondary">
                {activeTab === 1 && "Teams Management"}
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
    </Box>
  );
}
