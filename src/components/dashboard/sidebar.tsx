"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Dashboard,
  RocketLaunch,
  Key,
  Settings,
  Analytics,
  People,
  ChevronRight,
  ExpandMore,
} from "@mui/icons-material";

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  isActive?: boolean;
  children?: NavItem[];
}

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem: propActiveItem }: SidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || "dashboard");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Update local state when prop changes
  useEffect(() => {
    if (propActiveItem) {
      setActiveItem(propActiveItem);
    }
  }, [propActiveItem]);

  const handleNavClick = (itemId: string) => {
    // Navigation logic with correct URLs including basePath for GitHub Pages
    // Next.js router handles basePath automatically
    
    switch (itemId) {
      case "dashboard":
        window.location.href = '/dashboard';
        break;
      case "analytics-overview":
        window.location.href = '/analytics';
        break;
      case "team-dashboard":
        window.location.href = '/analytics/team';
        break;
      case "conversation-view":
        window.location.href = '/conversation-view';
        break;
      case "agent-config":
        window.location.href = '/agent-config';
        break;
      case "access-mgmt":
        window.location.href = '/access-management';
        break;
      case "platform-settings":
        window.location.href = '/platform-settings';
        break;
      case "observability":
        window.location.href = '/observability';
        break;
      case "developer-hub":
        window.location.href = '/developer-hub';
        break;
      default:
        console.log(`Navigating to: ${itemId}`);
    }
  };

  const handleExpandClick = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const navItems: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      description: "Overview & Analytics",
      icon: <Dashboard />,
      isActive: true,
    },
    {
      id: "agent-config",
      label: "Agent Configurations",
      description: "Deploy & Configure Agents",
      icon: <RocketLaunch />,
    },
    {
      id: "access-mgmt",
      label: "Access Management",
      description: "Users & Permissions",
      icon: <Key />,
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
      icon: <Analytics />,
    },
    {
      id: "developer-hub",
      label: "Developer Hub",
      description: "APIs & Documentation",
      icon: <People />,
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
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 280,
        height: '100vh',
        backgroundColor: '#1a202c',
        color: 'white',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: '1.5rem 1.25rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
      }}>
        <Box sx={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem'
        }}>
          <Box sx={{
            width: '2.25rem',
            height: '2.25rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}>
            <svg fill="white" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem' }}>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              BotConfig
            </Typography>
            <Typography sx={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 500,
              marginTop: '0.125rem',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Admin Dashboard
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, py: '1.25rem' }}>
        <Typography sx={{
          fontSize: '0.6875rem',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.5)',
          textTransform: 'uppercase',
          letterSpacing: '0.125em',
          px: '1.25rem',
          mb: '1rem',
          mt: '0.25rem',
          fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          MANAGEMENT
        </Typography>
        
        <List sx={{ px: 0 }}>
          {navItems.map((item) => (
            <Box key={item.id}>
              <ListItem
                onClick={() => {
                  setActiveItem(item.id);
                  if (item.children) {
                    handleExpandClick(item.id);
                  } else {
                    handleNavClick(item.id);
                  }
                }}
                sx={{
                  mx: '1rem',
                  mb: '0.125rem',
                  borderRadius: '0.75rem',
                  backgroundColor: activeItem === item.id || (item.children && item.children.some((child) => activeItem === child.id)) ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                  color: activeItem === item.id || (item.children && item.children.some((child) => activeItem === child.id)) ? 'white' : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  border: activeItem === item.id ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: activeItem === item.id || (item.children && item.children.some((child) => activeItem === child.id)) ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: 'white',
                    transform: 'translateX(4px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'inherit',
                    minWidth: '1.25rem',
                    mr: '0.875rem',
                  },
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.description}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'inherit',
                      letterSpacing: '-0.01em',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                    '& .MuiListItemText-secondary': {
                      fontSize: '0.75rem',
                      color: 'inherit',
                      fontWeight: 400,
                      marginTop: '0.125rem',
                      opacity: 0.8,
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  }}
                />
                {item.children && (
                  <Box sx={{ 
                    color: 'rgba(255, 255, 255, 0.5)',
                    transition: 'color 250ms ease-in-out'
                  }}>
                    {expandedItems.includes(item.id) ? <ExpandMore /> : <ChevronRight />}
                  </Box>
                )}
              </ListItem>

              {/* Nested Items */}
              {item.children && (
                <Collapse in={expandedItems.includes(item.id)} timeout="auto">
                  <Box sx={{ 
                    ml: '1.25rem',
                    mt: '0.25rem',
                    mb: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.125rem',
                    borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                    pl: '0.75rem',
                  }}>
                    {item.children.map((child) => (
                      <ListItem
                        key={child.id}
                        onClick={() => {
                          setActiveItem(child.id);
                          handleNavClick(child.id);
                        }}
                        sx={{
                          borderRadius: '0.5rem',
                          backgroundColor: activeItem === child.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                          color: activeItem === child.id ? 'white' : 'rgba(255, 255, 255, 0.6)',
                          cursor: 'pointer',
                          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                          mb: '0.125rem',
                          border: activeItem === child.id ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid transparent',
                          '&:hover': {
                            backgroundColor: activeItem === child.id ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                            color: 'white',
                            transform: 'translateX(2px)',
                            border: '1px solid rgba(102, 126, 234, 0.15)',
                          },
                          '& .MuiListItemIcon-root': {
                            color: 'inherit',
                            minWidth: '1rem',
                            mr: '0.625rem',
                          },
                        }}
                      >
                        <ListItemIcon>
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.label}
                          secondary={child.description}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.8125rem',
                              fontWeight: 500,
                              color: 'inherit',
                              letterSpacing: '-0.01em',
                              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            },
                            '& .MuiListItemText-secondary': {
                              fontSize: '0.6875rem',
                              color: 'inherit',
                              fontWeight: 400,
                              marginTop: '0.125rem',
                              opacity: 0.8,
                              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </Box>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );
}
