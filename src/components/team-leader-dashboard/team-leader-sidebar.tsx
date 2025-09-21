"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  Avatar,
} from "@mui/material";
import {
  Dashboard,
  Analytics,
  Chat,
  Support,
  TrendingUp,
  Settings,
  ExpandLess,
  ExpandMore,
  CheckCircle,
  Flag,
  Campaign,
  Notifications,
  Phone,
  People,
} from "@mui/icons-material";

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
}

interface TeamLeaderSidebarProps {
  activeItem?: string;
}

export function TeamLeaderSidebar({ activeItem: propActiveItem }: TeamLeaderSidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || "overview");
  const [configOpen, setConfigOpen] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    if (propActiveItem) {
      setActiveItem(propActiveItem);
    }
  }, [propActiveItem]);

  const handleNavClick = (itemId: string) => {
    // Navigation logic with correct URLs including basePath for GitHub Pages
    const basePath = process.env.NODE_ENV === 'production' ? '/dashboard-ui' : '';
    
    switch (itemId) {
      case "overview":
        window.location.href = `${basePath}/team-leader-dashboard`;
        break;
      case "call-quality-analytics":
        window.location.href = `${basePath}/team-leader-dashboard/call-quality-analytics`;
        break;
      case "conversations-view":
        window.location.href = `${basePath}/team-leader-dashboard/conversations-view`;
        break;
      case "support-call-analysis":
        window.location.href = `${basePath}/team-leader-dashboard/support-call-analysis`;
        break;
      case "customer-success-analysis":
        window.location.href = `${basePath}/team-leader-dashboard/customer-success-analysis`;
        break;
      case "goal-mgmt":
        window.location.href = `${basePath}/team-leader-dashboard/configuration/goal-mgmt`;
        break;
      case "campaign-mgmt":
        window.location.href = `${basePath}/team-leader-dashboard/configuration/campaign-mgmt`;
        break;
      case "alert-mgmt":
        window.location.href = `${basePath}/team-leader-dashboard/configuration/alert-mgmt`;
        break;
      default:
        console.log(`Navigating to: ${itemId}`);
    }
  };

  const navItems: NavItem[] = [
    {
      id: "overview",
      label: "Overview",
      description: "Team Performance Summary",
      icon: <Dashboard />,
    },
    {
      id: "call-quality-analytics",
      label: "Call Quality Analytics",
      description: "Quality Metrics & Insights",
      icon: <Phone />,
    },
    {
      id: "conversations-view",
      label: "Conversations View",
      description: "Real-time Conversation Monitoring",
      icon: <Chat />,
    },
    {
      id: "support-call-analysis",
      label: "Support Call Analysis",
      description: "Support Performance Analytics",
      icon: <Support />,
    },
    {
      id: "customer-success-analysis",
      label: "Customer Success Analysis",
      description: "Customer Satisfaction Metrics",
      icon: <TrendingUp />,
    },
    {
      id: "configuration-mgmt",
      label: "Configuration Mgmt",
      description: "Team & System Configuration",
      icon: <Settings />,
      children: [
        {
          id: "goal-mgmt",
          label: "Goal Mgmt",
          description: "Set & Track Team Goals",
          icon: <Flag />,
        },
        {
          id: "campaign-mgmt",
          label: "Campaign Mgmt",
          description: "Manage Marketing Campaigns",
          icon: <Campaign />,
        },
        {
          id: "alert-mgmt",
          label: "Alert Mgmt",
          description: "Configure System Alerts",
          icon: <Notifications />,
        },
      ],
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              bgcolor: 'secondary.main',
              mr: 2,
              width: 40,
              height: 40,
            }}
          >
            <People />
          </Avatar>
          <Box>
            <Typography variant="h6" noWrap component="div" fontWeight={700}>
              Team Leader
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Management Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="overline"
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
            letterSpacing: 1,
            mb: 2,
            display: 'block',
          }}
        >
          TEAM MANAGEMENT
        </Typography>
        
        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      setConfigOpen(!configOpen);
                    } else {
                      setActiveItem(item.id);
                      handleNavClick(item.id);
                    }
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    backgroundColor: 
                      activeItem === item.id || 
                      (item.children && item.children.some(child => activeItem === child.id))
                        ? 'secondary.main'
                        : 'transparent',
                    color: 
                      activeItem === item.id || 
                      (item.children && item.children.some(child => activeItem === child.id))
                        ? 'secondary.contrastText'
                        : 'text.primary',
                    '&:hover': {
                      backgroundColor: 
                        activeItem === item.id || 
                        (item.children && item.children.some(child => activeItem === child.id))
                          ? 'secondary.dark'
                          : 'action.hover',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                    secondaryTypographyProps={{
                      fontSize: '0.75rem',
                      color: 'inherit',
                      sx: { opacity: 0.8 },
                    }}
                  />
                  {item.children && (
                    <Box sx={{ ml: 1 }}>
                      {configOpen ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Render nested items */}
              {item.children && (
                <Collapse in={configOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding sx={{ pl: 4, pr: 2 }}>
                    {item.children.map((child) => (
                      <ListItem key={child.id} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            setActiveItem(child.id);
                            handleNavClick(child.id);
                          }}
                          sx={{
                            borderRadius: 2,
                            mb: 0.5,
                            backgroundColor: activeItem === child.id ? 'secondary.main' : 'transparent',
                            color: activeItem === child.id ? 'secondary.contrastText' : 'text.primary',
                            '&:hover': {
                              backgroundColor: activeItem === child.id ? 'secondary.dark' : 'action.hover',
                            },
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              color: 'inherit',
                              minWidth: 40,
                            }}
                          >
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={child.label}
                            secondary={child.description}
                            primaryTypographyProps={{
                              fontWeight: 500,
                              fontSize: '0.875rem',
                            }}
                            secondaryTypographyProps={{
                              fontSize: '0.75rem',
                              color: 'inherit',
                              sx: { opacity: 0.8 },
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
