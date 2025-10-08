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
        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function NewAgentConfigurationPage() {
  const router = useRouter();
  const { logout } = useAuth();
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [activeTab, setActiveTab] = useState(0);

  // Configuration state
  const [configName, setConfigName] = useState("");
  const [status, setStatus] = useState("draft");
  const [description, setDescription] = useState("");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBack = () => {
    router.push("/agent-configurations");
  };

  const handleSave = () => {
    // Save new configuration logic
    console.log("Creating new configuration...");
    router.push("/agent-configurations");
  };

  const handleCancel = () => {
    router.push("/agent-configurations");
  };

  return (
    <PageLayout activeItem="agent-configurations">
        {/* Header Section */}
        <Box sx={{ py: 4, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <IconButton onClick={handleBack} sx={{ color: '#64748b', '&:hover': { backgroundColor: '#f1f5f9' } }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} sx={{ color: '#1e293b', mb: 0.5 }}>
                New Agent Configuration
              </Typography>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                Create a new chatbot configuration
              </Typography>
            </Box>
          </Box>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', mb: 0 }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  color: '#64748b',
                  minHeight: '48px',
                  '&.Mui-selected': {
                    color: '#3b82f6',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#3b82f6',
                  height: '2px',
                },
              }}
            >
              <Tab 
                icon={<Settings sx={{ fontSize: '1.25rem', color: activeTab === 0 ? '#3b82f6' : '#64748b' }} />} 
                label="General" 
                iconPosition="start"
              />
              <Tab 
                icon={<Security sx={{ fontSize: '1.25rem', color: activeTab === 1 ? '#3b82f6' : '#64748b' }} />} 
                label="Guardrails" 
                iconPosition="start"
              />
              <Tab 
                icon={<Psychology sx={{ fontSize: '1.25rem', color: activeTab === 2 ? '#3b82f6' : '#64748b' }} />} 
                label="Model Routing" 
                iconPosition="start"
              />
              <Tab 
                icon={<Description sx={{ fontSize: '1.25rem', color: activeTab === 3 ? '#3b82f6' : '#64748b' }} />} 
                label="System Prompt" 
                iconPosition="start"
              />
              <Tab 
                icon={<CheckCircle sx={{ fontSize: '1.25rem', color: activeTab === 4 ? '#3b82f6' : '#64748b' }} />} 
                label="Compliance" 
                iconPosition="start"
              />
            </Tabs>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, px: 0 }}>
          <Card sx={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0'
          }}>
            <TabPanel value={activeTab} index={0}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b', mb: 3 }}>
                General Configuration
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <TextField
                  label="Configuration Name"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  placeholder="Configuration Name"
                  sx={{
                    flex: 1.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <FormControl sx={{ flex: 0.5, minWidth: 100, maxWidth: 150 }}>
                  <InputLabel sx={{ color: '#374151', fontWeight: 500 }}>Status</InputLabel>
                  <Select
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                      },
                    }}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                placeholder="Description"
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '& fieldset': {
                      borderColor: '#d1d5db',
                    },
                    '&:hover fieldset': {
                      borderColor: '#9ca3af',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#374151',
                    fontWeight: 500,
                  },
                }}
              />

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  Create Configuration
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b', mb: 3 }}>
                Guardrails Configuration
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Define safety rules and boundaries for the agent's behavior
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <TextField
                  fullWidth
                  label="Prohibited Topics"
                  placeholder="Enter topics the agent should never discuss (e.g., politics, personal information)"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Escalation Triggers"
                  placeholder="Define keywords or conditions that trigger human handoff"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Response Filters"
                  placeholder="Rules to prevent inappropriate language or responses"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  Create Configuration
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b', mb: 3 }}>
                Model Routing Configuration
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Configure how the agent processes and routes different types of requests
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#374151', fontWeight: 500 }}>Primary Model</InputLabel>
                  <Select
                    value="gpt-4"
                    label="Primary Model"
                    sx={{
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                      },
                    }}
                  >
                    <MenuItem value="gpt-4">GPT-4</MenuItem>
                    <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                    <MenuItem value="claude-3">Claude-3</MenuItem>
                    <MenuItem value="claude-2">Claude-2</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  label="Intent Recognition Model"
                  placeholder="Configure NLP model for intent detection"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Fallback Strategy"
                  placeholder="What to do when the agent doesn't understand user input"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  Create Configuration
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b', mb: 3 }}>
                System Prompt Configuration
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Define the core directive and behavior instructions for the agent
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <TextField
                  fullWidth
                  label="Core Directive"
                  placeholder="You are a helpful and polite customer support assistant..."
                  multiline
                  rows={6}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Role Definition"
                  placeholder="Define the agent's specific role and responsibilities"
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Contextual Information"
                  placeholder="Provide initial context the agent should always be aware of"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  Create Configuration
                </Button>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <Typography variant="h6" fontWeight={600} sx={{ color: '#1e293b', mb: 3 }}>
                Compliance Configuration
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                Configure legal, regulatory, and policy compliance settings
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                <TextField
                  fullWidth
                  label="Data Privacy Settings"
                  placeholder="Configure GDPR, CCPA, HIPAA compliance settings"
                  multiline
                  rows={4}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Audit Logging"
                  placeholder="Configure conversation data and decision logging"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Security Policies"
                  placeholder="Define encryption, access controls, and security measures"
                  multiline
                  rows={3}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      '& fieldset': {
                        borderColor: '#d1d5db',
                      },
                      '&:hover fieldset': {
                        borderColor: '#9ca3af',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#3b82f6',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#374151',
                      fontWeight: 500,
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    borderColor: '#d1d5db',
                    color: '#374151',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: '#9ca3af',
                      backgroundColor: '#f9fafb',
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  startIcon={<Save />}
                  sx={{
                    backgroundColor: '#3b82f6',
                    textTransform: 'none',
                    fontWeight: 500,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#2563eb',
                    },
                  }}
                >
                  Create Configuration
                </Button>
              </Box>
            </TabPanel>
          </Card>
        </Box>
    </PageLayout>
  );
}
