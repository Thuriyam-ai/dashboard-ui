"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TeamLeaderSidebar } from "@/components/team-leader-dashboard/team-leader-sidebar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import {
  Box, Container, Typography, AppBar, Toolbar, IconButton, Button, Avatar,
  Card, CardContent, Chip, Menu, MenuItem, Dialog, DialogTitle, DialogContent,
  DialogActions, Alert, AlertTitle, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, LinearProgress, ListItemIcon, ListItemText, CircularProgress,
} from "@mui/material";
import {
  BookmarkBorder, MoreVert, Logout, Add, Edit, ContentCopy, Delete, PlayArrow,
  Pause, CheckCircle, Schedule, Campaign, Group, CalendarToday,
  FileCopy as FileCopyIcon,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";
import { getAllCampaigns, deleteCampaign } from "@/data/services/campaign-service";
import { Campaign as CampaignType } from "@/types/api/campaign";

const ActionsMenu = ({ campaign, onEdit, onClone, onDelete, onCopy }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton aria-label="actions" onClick={handleClick}><MoreVert /></IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => { onEdit(campaign.id); handleClose(); }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onClone(campaign.id); handleClose(); }}>
          <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
          <ListItemText>Clone</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onCopy(campaign.id); handleClose(); }}>
          <ListItemIcon><FileCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Copy ID</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { onDelete(campaign); handleClose(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default function CampaignManagementPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignType | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        const data = await getAllCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError("Failed to load campaigns. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = () => router.push('/team-leader-dashboard/campaign-mgmt/editor');
  const handleEditCampaign = (campaignId: string) => router.push(`/team-leader-dashboard/campaign-mgmt/editor?id=${campaignId}`);
  const handleCloneCampaign = (campaignId: string) => router.push(`/team-leader-dashboard/campaign-mgmt/editor?clone=${campaignId}`);

  const handleCopyId = (campaignId: string) => {
    navigator.clipboard.writeText(campaignId).then(() => {
      alert(`Campaign ID copied to clipboard: ${campaignId}`);
    }).catch(err => {
      console.error('Failed to copy campaign ID: ', err);
      alert('Could not copy ID.');
    });
  };

  const handleDeleteCampaign = (campaign: CampaignType) => {
    setSelectedCampaign(campaign);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCampaign) return;
    try {
      await deleteCampaign(selectedCampaign.id);
      setCampaigns(prevCampaigns => prevCampaigns.filter(c => c.id !== selectedCampaign.id));
      setDeleteDialogOpen(false);
      setSelectedCampaign(null);
    } catch (err) {
      console.error("Failed to delete campaign", err);
    }
  };

  const getStatusColor = (status: CampaignType['status']) => {
    switch (status) {
      case 'ACTIVE': return 'success';
      case 'UPCOMING': return 'info';
      case 'COMPLETED': return 'default';
      default: return 'default';
    }
  };
  
  const getStatusIcon = (status: CampaignType['status']) => {
    switch (status) {
      case 'ACTIVE': return <PlayArrow />;
      case 'UPCOMING': return <Schedule />;
      case 'COMPLETED': return <CheckCircle />;
      default: return <Pause />;
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return "success";
    if (value >= 70) return "warning";
    return "error";
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '–';
    return new Date(dateString).toLocaleDateString('en-CA');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem="campaign-mgmt" />

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', marginLeft: '280px' }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}><Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>team-leader-dashboard.localhost:3000</Typography></Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><BookmarkBorder /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}><Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>W</Avatar><Typography variant="body2" fontWeight={500}>Work</Typography></Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
              <Button variant="contained" color="error" size="small" startIcon={<Logout />} sx={{ ml: 1 }} onClick={logout}>Logout</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Breadcrumbs />
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Campaign Management</Typography>
                <Typography variant="h6" color="text.secondary">Create and manage conversation campaigns for your teams</Typography>
              </Box>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateCampaign} sx={{ px: 3, py: 1.5, fontSize: '1rem', fontWeight: 600 }}>
                Create New Campaign
              </Button>
            </Box>
          </Box>

          <Card>
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="campaigns table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'action.hover' }}>
                    <TableCell sx={{ fontWeight: 600, width: '25%' }}>Campaign Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: '20%' }}>Goal</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Assigned Team</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Metrics</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow>
                  ) : error ? (
                    <TableRow><TableCell colSpan={7} align="center" sx={{ py: 5 }}><Alert severity="error">{error}</Alert></TableCell></TableRow>
                  ) : campaigns.map((campaign) => (
                    <TableRow key={campaign.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Campaign sx={{ color: 'primary.main' }} /><Typography variant="body2" fontWeight={600}>{campaign.name}</Typography></Box>
                      </TableCell>
                      <TableCell><Chip label={campaign.status} size="small" color={getStatusColor(campaign.status)} icon={getStatusIcon(campaign.status)} /></TableCell>
                      <TableCell><Typography variant="body2" color="text.secondary">{campaign.goal_name}</Typography></TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Group sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography variant="body2">{campaign.team_name}</Typography></Box>
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} /><Typography variant="body2">{formatDate(campaign.starts_at)} - {formatDate(campaign.ends_at)}</Typography></Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="body2" fontWeight={500}>Conv: {campaign.conversations.toLocaleString()}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography variant="body2" fontWeight={500} sx={{width: 75}}>Avg Score:</Typography><LinearProgress variant="determinate" value={campaign.avg_score} color={getMetricColor(campaign.avg_score)} sx={{ width: 50, height: 6, borderRadius: 3, flexGrow: 1 }} /><Typography variant="body2" fontWeight={600} color={`${getMetricColor(campaign.avg_score)}.main`}>{campaign.avg_score}%</Typography></Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Typography variant="body2" fontWeight={500} sx={{width: 75}}>Completion:</Typography><LinearProgress variant="determinate" value={campaign.completion_rate} color={getMetricColor(campaign.completion_rate)} sx={{ width: 50, height: 6, borderRadius: 3, flexGrow: 1 }} /><Typography variant="body2" fontWeight={600} color={`${getMetricColor(campaign.completion_rate)}.main`}>{campaign.completion_rate}%</Typography></Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <ActionsMenu 
                          campaign={campaign} 
                          onEdit={handleEditCampaign} 
                          onClone={handleCloneCampaign} 
                          onDelete={handleDeleteCampaign}
                          onCopy={handleCopyId}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {!isLoading && !error && campaigns.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8, mt: 2 }}>
              <Campaign sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h5" gutterBottom>No Campaigns Created Yet</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Create your first campaign to start managing conversation objectives for your teams.</Typography>
              <Button variant="contained" startIcon={<Add />} onClick={handleCreateCampaign} size="large">Create Your First Campaign</Button>
            </Box>
          )}
        </Container>

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Delete Campaign</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the campaign "{selectedCampaign?.name}"? This action cannot be undone.</Typography>
            <Alert severity="warning" sx={{ mt: 2 }}><AlertTitle>Warning</AlertTitle>Deleting this campaign will remove all associated data and historical records.</Alert>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">Delete Campaign</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}