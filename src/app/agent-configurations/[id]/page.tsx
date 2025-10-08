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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Grid,
  Avatar,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  MoreVert,
  BookmarkBorder,
  Lock,
  ArrowBack,
  Save,
  Cancel,
  Settings,
  Security,
  Psychology,
  Description,
  CheckCircle,
} from "@mui/icons-material";
import { useAuth } from "@/contexts/auth-context";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`configuration-tabpanel-${index}`}
      aria-labelledby={`configuration-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AgentConfigurationDetailPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);

  // Configuration state
  const [configName, setConfigName] = useState("Production Customer Support");
  const [status, setStatus] = useState("active");
  const [description, setDescription] = useState("Main customer support bot for production environment");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    router.push("/agent-configurations");
  };

  const handleSave = () => {
    // Save configuration logic
    console.log("Saving configuration...");
  };

  const handleCancel = () => {
    router.push("/agent-configurations");
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <IconButton onClick={handleBack} sx={{ color: 'text.secondary' }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
                {configName}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Box>

          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={handleTabChange} aria-label="configuration tabs">
                <Tab 
                  icon={<Settings />} 
                  label="General" 
                  id="configuration-tab-0"
                  aria-controls="configuration-tabpanel-0"
                />
                <Tab 
                  icon={<Security />} 
                  label="Guardrails" 
                  id="configuration-tab-1"
                  aria-controls="configuration-tabpanel-1"
                />
                <Tab 
                  icon={<Psychology />} 
                  label="Model Routing" 
                  id="configuration-tab-2"
                  aria-controls="configuration-tabpanel-2"
                />
                <Tab 
                  icon={<Description />} 
                  label="System Prompt" 
                  id="configuration-tab-3"
                  aria-controls="configuration-tabpanel-3"
                />
                <Tab 
                  icon={<CheckCircle />} 
                  label="Compliance" 
                  id="configuration-tab-4"
                  aria-controls="configuration-tabpanel-4"
                />
              </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                General Configuration
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Configuration Name"
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={status}
                      label="Status"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Guardrails Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Define safety rules and boundaries for the agent's behavior
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Prohibited Topics"
                    placeholder="Enter topics the agent should never discuss (e.g., politics, personal information)"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Escalation Triggers"
                    placeholder="Define keywords or conditions that trigger human handoff"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Response Filters"
                    placeholder="Rules to prevent inappropriate language or responses"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Model Routing Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure how the agent processes and routes different types of requests
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Primary Model"
                    value="GPT-4"
                    variant="outlined"
                    disabled
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Intent Recognition Model"
                    placeholder="Configure NLP model for intent detection"
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Fallback Strategy"
                    placeholder="What to do when the agent doesn't understand user input"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                System Prompt Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Define the core directive and behavior instructions for the agent
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Core Directive"
                    placeholder="You are a helpful and polite customer support assistant..."
                    multiline
                    rows={6}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role Definition"
                    placeholder="Define the agent's specific role and responsibilities"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contextual Information"
                    placeholder="Provide initial context the agent should always be aware of"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Compliance Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure legal, regulatory, and policy compliance settings
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Data Privacy Settings"
                    placeholder="Configure GDPR, CCPA, HIPAA compliance settings"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Audit Logging"
                    placeholder="Configure conversation data and decision logging"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Security Policies"
                    placeholder="Define encryption, access controls, and security measures"
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </TabPanel>

            <Divider />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', p: 3 }}>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
                Save Configuration
              </Button>
            </Box>
          </Card>
        </Box>
    </PageLayout>
  );
}
