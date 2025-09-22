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
  People,
  Settings,
  Security,
  Monitor,
  Code,
  ExpandLess,
  ExpandMore,
  CheckCircle,
} from "@mui/icons-material";

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
}

interface MuiSidebarProps {
  activeItem?: string;
}

export function MuiSidebar({ activeItem: propActiveItem }: MuiSidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || "dashboard");
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Update local state when prop changes
  useEffect(() => {
    if (propActiveItem) {
      setActiveItem(propActiveItem);
    }
  }, [propActiveItem]);

  const handleNavClick = (itemId: string) => {
    // Navigation logic with correct URLs including basePath for GitHub Pages
    // Check if we're on GitHub Pages by looking at the hostname
    const isGitHubPages = window.location.hostname === 'thuriyam-ai.github.io';
    const basePath = isGitHubPages ? '/dashboard-ui' : '';
    
    switch (itemId) {
      case "dashboard":
        window.location.href = `${basePath}/dashboard`;
        break;
      case "analytics-overview":
        window.location.href = `${basePath}/analytics`;
        break;
      case "team-dashboard":
        window.location.href = `${basePath}/analytics/team`;
        break;
      case "conversation-view":
        window.location.href = `${basePath}/conversation-view`;
        break;
      case "agent-config":
        window.location.href = `${basePath}/agent-config`;
        break;
      case "access-mgmt":
        window.location.href = `${basePath}/access-management`;
        break;
      case "platform-settings":
        window.location.href = `${basePath}/platform-settings`;
        break;
      case "observability":
        window.location.href = `${basePath}/observability`;
        break;
      case "developer-hub":
        window.location.href = `${basePath}/developer-hub`;
        break;
      default:
        console.log(`Navigating to: ${itemId}`);
    }
  };

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Overview & Analytics",
      icon: <Dashboard />,
    },
    {
      id: "agent-config",
      label: "Agent Configurations",
      description: "Deploy & Configure Agents",
      icon: <Settings />,
    },
    {
      id: "access-mgmt",
      label: "Access Management",
      description: "Users & Permissions",
      icon: <Security />,
    },
    {
      id: "platform-settings",
      label: "Platform Settings",
      description: "System Configuration",
      icon: <Settings />,
    },
    {
      id: "observability",
      label: "Observability",
      description: "Monitoring & Analytics",
      icon: <Monitor />,
    },
    {
      id: "developer-hub",
      label: "Developer Hub",
      description: "APIs & Documentation",
      icon: <Code />,
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Performance & Intelligence",
      icon: <Analytics />,
      children: [
        {
          id: "analytics-overview",
          label: "Overview",
          description: "Conversation Analysis",
          icon: <Analytics />,
        },
        {
          id: "team-dashboard",
          label: "Team Dashboard",
          description: "Team & Campaign Analytics",
          icon: <People />,
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
              bgcolor: 'primary.main',
              mr: 2,
              width: 40,
              height: 40,
            }}
          >
            <CheckCircle />
          </Avatar>
          <Box>
            <Typography variant="h6" noWrap component="div" fontWeight={700}>
              BotConfig
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Admin Dashboard
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
          MANAGEMENT
        </Typography>
        
        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      setAnalyticsOpen(!analyticsOpen);
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
                        ? 'primary.main'
                        : 'transparent',
                    color: 
                      activeItem === item.id || 
                      (item.children && item.children.some(child => activeItem === child.id))
                        ? 'primary.contrastText'
                        : 'text.primary',
                    '&:hover': {
                      backgroundColor: 
                        activeItem === item.id || 
                        (item.children && item.children.some(child => activeItem === child.id))
                          ? 'primary.dark'
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
                      {analyticsOpen ? <ExpandLess /> : <ExpandMore />}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Render nested items */}
              {item.children && (
                <Collapse in={analyticsOpen} timeout="auto" unmountOnExit>
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
                            backgroundColor: activeItem === child.id ? 'primary.main' : 'transparent',
                            color: activeItem === child.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                              backgroundColor: activeItem === child.id ? 'primary.dark' : 'action.hover',
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
