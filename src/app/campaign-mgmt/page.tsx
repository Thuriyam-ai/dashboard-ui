"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/page-layout";
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
  Alert,
  AlertTitle,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import {
  Search,
  Upload,
  FilterList,
  Edit,
  Delete,
  MoreVert,
  Add,
  Logout,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Cancel,
  Schedule,
  PlayArrow,
  Pause,
} from "@mui/icons-material";
import { getAllCampaigns, deleteCampaign } from "@/data/services/campaign-service";
import { Campaign } from "@/types/api/campaign";

/**
 * Campaign Management page component for Team Leader Dashboard
 */
export default function CampaignManagementPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [campaignToDelete, setCampaignToDelete] = useState<string | null>(null);

  // Load campaigns on component mount
  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllCampaigns();
      setCampaigns(data);
    } catch (err) {
      setError("Failed to load campaigns. Please try again.");
      console.error("Error loading campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async () => {
    if (!campaignToDelete) return;

    try {
      await deleteCampaign(campaignToDelete);
      setCampaigns(campaigns.filter(c => c.id !== campaignToDelete));
      setDeleteDialogOpen(false);
      setCampaignToDelete(null);
    } catch (err) {
      setError("Failed to delete campaign. Please try again.");
      console.error("Error deleting campaign:", err);
    }
  };

  const handleSelectCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleSelectAllCampaigns = () => {
    if (selectedCampaigns.length === filteredCampaigns.length) {
      setSelectedCampaigns([]);
    } else {
      setSelectedCampaigns(filteredCampaigns.map(c => c.id));
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, campaign: Campaign) => {
    setAnchorEl(event.currentTarget);
    setSelectedCampaign(campaign);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCampaign(null);
  };

  const handleEditCampaign = () => {
    if (selectedCampaign) {
      router.push(`/campaign-mgmt/editor?id=${selectedCampaign.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedCampaign) {
      setCampaignToDelete(selectedCampaign.id);
      setDeleteDialogOpen(true);
    }
    handleMenuClose();
  };

  const logout = () => {
    // Implement logout logic
    router.push('/login');
  };

  // Filter campaigns based on search term and status
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.goal_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.team_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || campaign.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'upcoming': return 'warning';
      case 'completed': return 'info';
      case 'canceled': return 'error';
      case 'archived': return 'default';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return <PlayArrow />;
      case 'upcoming': return <Schedule />;
      case 'completed': return <CheckCircle />;
      case 'canceled': return <Cancel />;
      case 'archived': return <Pause />;
      default: return <Schedule />;
    }
  };

  return (
    <PageLayout>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 600 }}>
            Campaign Management
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
            <Button variant="contained" color="error" size="small" startIcon={<Logout />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>Campaign Management</Typography>
              <Typography color="text.secondary">Create and manage marketing campaigns for your teams</Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => router.push('/campaign-mgmt/editor')}
              sx={{ px: 3 }}
            >
              New Campaign
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <TextField
                placeholder="Search campaigns..."
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
                size="small"
              />
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                size="small"
              >
                More Filters
              </Button>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedCampaigns.length > 0 && selectedCampaigns.length < filteredCampaigns.length}
                          checked={filteredCampaigns.length > 0 && selectedCampaigns.length === filteredCampaigns.length}
                          onChange={handleSelectAllCampaigns}
                        />
                      </TableCell>
                      <TableCell><strong>Campaign Name</strong></TableCell>
                      <TableCell><strong>Status</strong></TableCell>
                      <TableCell><strong>Goal</strong></TableCell>
                      <TableCell><strong>Team</strong></TableCell>
                      <TableCell><strong>Conversations</strong></TableCell>
                      <TableCell><strong>Avg Score</strong></TableCell>
                      <TableCell><strong>Completion Rate</strong></TableCell>
                      <TableCell><strong>Duration</strong></TableCell>
                      <TableCell align="right"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedCampaigns.includes(campaign.id)}
                            onChange={() => handleSelectCampaign(campaign.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle2" fontWeight={600}>
                              {campaign.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusIcon(campaign.status)}
                            label={campaign.status}
                            color={getStatusColor(campaign.status) as any}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>{campaign.goal_name}</TableCell>
                        <TableCell>{campaign.team_name}</TableCell>
                        <TableCell>{campaign.conversations.toLocaleString()}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {campaign.avg_score}%
                            </Typography>
                            {campaign.avg_score >= 80 ? (
                              <TrendingUp color="success" fontSize="small" />
                            ) : (
                              <TrendingDown color="error" fontSize="small" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Typography variant="body2" fontWeight={600}>
                              {campaign.completion_rate}%
                            </Typography>
                            {campaign.completion_rate >= 85 ? (
                              <TrendingUp color="success" fontSize="small" />
                            ) : (
                              <TrendingDown color="error" fontSize="small" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {campaign.starts_at && campaign.ends_at ? (
                              `${new Date(campaign.starts_at).toLocaleDateString()} - ${new Date(campaign.ends_at).toLocaleDateString()}`
                            ) : (
                              'Not set'
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, campaign)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {!loading && filteredCampaigns.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No campaigns found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria"
                    : "Create your first campaign to get started"
                  }
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditCampaign}>
            <Edit fontSize="small" sx={{ mr: 1 }} />
            Edit Campaign
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
            <Delete fontSize="small" sx={{ mr: 1 }} />
            Delete Campaign
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Campaign</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this campaign? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteCampaign} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageLayout>
  );
}