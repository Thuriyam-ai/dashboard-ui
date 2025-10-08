"use client";

import { useState } from "react";
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
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MoreVert,
  BookmarkBorder,
  Lock,
  Search,
  FilterList,
  Add,
  ContentCopy,
  Edit,
  Delete,
  ArrowForward,
  CheckCircle,
  Schedule,
  Archive,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

// Mock data for bot configurations
const mockBotConfigurations = [
  {
    id: 1,
    name: "Production Customer Support",
    status: "active",
    description: "Main customer support bot for production environment",
    primaryModel: "GPT-4",
    lastModified: "2024-01-15 14:30",
    author: "John Doe",
    version: "v2.1.4"
  },
  {
    id: 2,
    name: "Sales Assistant Bot",
    status: "draft",
    description: "Helps with sales inquiries and lead qualification",
    primaryModel: "Claude-3",
    lastModified: "2024-01-14 09:15",
    author: "Jane Smith",
    version: "v1.8.2"
  },
  {
    id: 3,
    name: "FAQ Bot",
    status: "archived",
    description: "Handles frequently asked questions",
    primaryModel: "GPT-3.5 Turbo",
    lastModified: "2024-01-10 16:45",
    author: "Mike Johnson",
    version: "v3.0.1"
  }
];

export default function AgentConfigurationsPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "success";
      case "draft": return "warning";
      case "archived": return "default";
      default: return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle fontSize="small" />;
      case "draft": return <Schedule fontSize="small" />;
      case "archived": return <Archive fontSize="small" />;
      default: return null;
    }
  };

  const filteredConfigurations = mockBotConfigurations.filter(config =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (statusFilter !== "all" && config.status === statusFilter)
  );

  const handleCreateConfiguration = () => {
    router.push("/agent-configurations/new");
  };

  const handleViewConfiguration = (id: number) => {
    router.push(`/agent-configurations/${id}`);
  };

  return (
    <PageLayout activeItem="agent-configurations">
        <AppBar position="static" elevation={1} sx={{ backgroundColor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                agent-configurations.localhost:3000
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><BookmarkBorder /></IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem' }}>W</Avatar>
                <Typography variant="body2" fontWeight={500}>Work</Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><MoreVert /></IconButton>
              <Button variant="contained" color="error" size="small" startIcon={<Lock />} sx={{ ml: 1 }} onClick={logout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, py: 4, px: 4 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Agent Configurations
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Define the behavior of each individual chatbot instance
            </Typography>
          </Box>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600}>Bot Configurations</Typography>
                <Button 
                  variant="contained" 
                  startIcon={<Add />}
                  onClick={handleCreateConfiguration}
                >
                  New Configuration
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                  placeholder="Search configurations..."
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
                <Button variant="outlined" startIcon={<FilterList />}>
                  Filter
                </Button>
                <Button variant="outlined">
                  All Status
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredConfigurations.map((config) => (
                  <Card key={config.id} sx={{ border: '1px solid', borderColor: 'divider' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                              {config.name}
                            </Typography>
                            <Chip 
                              label={config.status.charAt(0).toUpperCase() + config.status.slice(1)} 
                              color={getStatusColor(config.status) as any} 
                              size="small"
                              icon={getStatusIcon(config.status)}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {config.description}
                          </Typography>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Primary Model: <strong>{config.primaryModel}</strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Last Modified: <strong>{config.lastModified}</strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Author: <strong>{config.author}</strong>
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="text.secondary">
                                Version: <strong>{config.version}</strong>
                              </Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <ContentCopy fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" sx={{ color: 'text.secondary' }}>
                            <Delete fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            sx={{ color: 'text.secondary' }}
                            onClick={() => handleViewConfiguration(config.id)}
                          >
                            <ArrowForward fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
    </PageLayout>
  );
}
