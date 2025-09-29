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
  Chip,
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
  Message,
  Support,
  TrendingUp,
  Flag,
  Campaign,
  Notifications,
  RocketLaunch,
  Key,
} from "@mui/icons-material";

interface NavItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
  path?: string;
  badge?: string;
}

interface MuiSidebarProps {
  activeItem?: string;
  context?: 'dashboard' | 'team-leader';
}

export function MuiSidebar({ activeItem: propActiveItem, context = 'dashboard' }: MuiSidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || "dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Update local state when prop changes
  useEffect(() => {
    if (propActiveItem) {
      setActiveItem(propActiveItem);
    }
  }, [propActiveItem]);

  const handleNavClick = (item: NavItem) => {
    if (item.children) {
      toggleExpanded(item.id);
      return;
    }

    const path = item.path || getDefaultPath(item.id);
    
    // Navigation logic with correct URLs including basePath for GitHub Pages
    const isGitHubPages = window.location.hostname === 'thuriyam-ai.github.io';
    const basePath = isGitHubPages ? '/dashboard-ui' : '';
    
    window.location.href = `${basePath}${path}`;
  };

  const getDefaultPath = (itemId: string): string => {
    const pathMap: Record<string, string> = {
      "dashboard": "/dashboard",
      "analytics-overview": "/analytics",
      "team-dashboard": "/analytics/team",
      "conversation-view": "/conversation-view",
      "agent-config": "/agent-config",
      "access-mgmt": "/access-management",
      "platform-settings": "/platform-settings",
      "observability": "/observability",
      "developer-hub": "/developer-hub",
      "call-quality": "/analytics",
      "conversations": "/conversations",
      "goal-mgmt": "/goals",
      "campaign-mgmt": "/campaigns",
    };
    
    return pathMap[itemId] || `/${itemId}`;
  };

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Unified navigation items based on context
  const getNavItems = (): NavItem[] => {
    if (context === 'team-leader') {
      return [
        {
          id: "call-quality",
          label: "Insights",
          description: "Call Quality Analytics",
          icon: <Analytics />,
          path: "/analytics",
        },
        {
          id: "conversations",
          label: "Conversations",
          description: "Conversation Management",
          icon: <Message />,
          path: "/conversations",
        },
        {
          id: "goal-mgmt",
          label: "Goals",
          description: "Goal Management",
          icon: <Flag />,
          path: "/goals",
        },
        {
          id: "campaign-mgmt",
          label: "Campaigns",
          description: "Campaign Management",
          icon: <Campaign />,
          path: "/campaigns",
        },
      ];
    }

    // Default dashboard navigation
    return [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Overview & Analytics",
        icon: <Dashboard />,
      },
      {
        id: "analytics-overview",
        label: "Analytics",
        description: "Conversation Analytics",
        icon: <Analytics />,
        children: [
          {
            id: "team-dashboard",
            label: "Team Dashboard",
            icon: <People />,
            path: "/analytics/team",
          },
          {
            id: "conversation-view",
            label: "Conversation View",
            icon: <Message />,
            path: "/conversation-view",
          },
        ],
      },
      {
        id: "agent-config",
        label: "Agent Configuration",
        description: "AI Agent Settings",
        icon: <RocketLaunch />,
      },
      {
        id: "access-mgmt",
        label: "Access Management",
        description: "User Permissions",
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
        description: "Monitoring & Logging",
        icon: <Monitor />,
      },
      {
        id: "developer-hub",
        label: "Developer Hub",
        description: "API Documentation",
        icon: <Code />,
      },
    ];
  };

  const navItems = getNavItems();

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;

    return (
      <Box key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavClick(item)}
            sx={{
              pl: level === 0 ? 2 : 4 + level * 2,
              py: 1.5,
              mx: 1,
              borderRadius: 1,
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                backgroundColor: isActive ? 'primary.dark' : 'action.hover',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon
              sx={{
                color: isActive ? 'primary.contrastText' : 'text.secondary',
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: isActive ? 600 : 400,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
                sx: { 
                  color: isActive ? 'primary.contrastText' : 'text.secondary',
                  opacity: 0.8,
                },
              }}
            />
            {item.badge && (
              <Chip
                label={item.badge}
                size="small"
                color="primary"
                sx={{ ml: 1, fontSize: '0.75rem' }}
              />
            )}
            {hasChildren && (
              <Box sx={{ ml: 1 }}>
                {isExpanded ? <ExpandLess /> : <ExpandMore />}
              </Box>
            )}
          </ListItemButton>
        </ListItem>

        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map((child) => renderNavItem(child, level + 1))}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

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
          borderRightColor: 'divider',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid',
          borderBottomColor: 'divider',
          background: 'linear-gradient(135deg, primary.main 0%, primary.dark 100%)',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
            }}
          >
            <RocketLaunch />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '1.125rem',
                lineHeight: 1.2,
              }}
            >
              {context === 'team-leader' ? 'Team Leader' : 'Dashboard'}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.75rem',
              }}
            >
              AI Agent Platform
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <List>
          {navItems.map((item) => renderNavItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderTopColor: 'divider',
          textAlign: 'center',
          backgroundColor: 'grey.50',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
          }}
        >
          v1.0.0
        </Typography>
      </Box>
    </Drawer>
  );
}