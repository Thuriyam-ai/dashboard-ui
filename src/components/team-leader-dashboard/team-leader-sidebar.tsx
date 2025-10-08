"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  Analytics,
  Message,
  Support,
  TrendingUp,
  Settings,
  Flag,
  Campaign,
  Notifications,
  SmartToy,
  People,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";

interface TeamLeaderSidebarProps {
  activeItem?: string;
}

export function TeamLeaderSidebar({ activeItem = "overview" }: TeamLeaderSidebarProps) {
  const router = useRouter();
  const navItems = [
    {
      id: "call-quality",
      label: "Insights",
      icon: <Analytics />,
      path: "/call-quality-analytics",
    },
    {
      id: "conversations",
      label: "Conversations",
      icon: <Message />,
      path: "/conversations",
    },
  ];

  const configurationItems = [
    {
      id: "config-mgmt",
      label: "Config Mgmt",
      icon: <Settings />,
      children: [
        {
          id: "agent-configurations",
          label: "Agents",
          icon: <SmartToy />,
          path: "/agent-configurations",
        },
        {
          id: "goal-mgmt",
          label: "Goals",
          icon: <Flag />,
          path: "/goal-mgmt",
        },
        {
          id: "campaign-mgmt",
          label: "Campaigns",
          icon: <Campaign />,
          path: "/campaign-mgmt",
        },
      ],
    },
  ];

  const handleNavClick = (path: string) => {
    // Navigation logic with correct URLs including basePath for GitHub Pages
    // Check if we're on GitHub Pages by looking at the hostname
    router.push(path)
  };

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
              Team Leader
            </Typography>
            <Typography sx={{
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 500,
              marginTop: '0.125rem',
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Management Dashboard
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
          {/* MANAGEMENT */}
          ANALYTICS
        </Typography>
        
        <List sx={{ px: 0 }}>
          {navItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={() => handleNavClick(item.path)}
              sx={{
                mx: '1rem',
                mb: '0.125rem',
                borderRadius: '0.75rem',
                backgroundColor: activeItem === item.id ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                color: activeItem === item.id ? 'white' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                border: activeItem === item.id ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: activeItem === item.id ? 'rgba(102, 126, 234, 0.2)' : 'rgba(255, 255, 255, 0.05)',
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
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'inherit',
                    letterSpacing: '-0.01em',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
            </ListItem>
          ))}
          
          {/* Config Mgmt Section - Always Expanded */}
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
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
                mb: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.6875rem',
              }}
            >
              CONFIGURATIONS
            </Typography>
            {configurationItems[0].children.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                sx={{
                  borderRadius: '0.5rem',
                  backgroundColor: activeItem === item.id ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                  color: activeItem === item.id ? 'white' : 'rgba(255, 255, 255, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                  mb: '0.125rem',
                  border: activeItem === item.id ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid transparent',
                  '&:hover': {
                    backgroundColor: activeItem === item.id ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.05)',
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
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'inherit',
                      letterSpacing: '-0.01em',
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                    },
                  }}
                />
              </ListItem>
            ))}
          </Box>

          {/* Access Management Section - Always Expanded */}
          <Box sx={{ 
            ml: '1.25rem',
            mt: '0.5rem',
            mb: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.125rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            pl: '0.75rem',
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.5)',
                fontWeight: 600,
                mb: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontSize: '0.6875rem',
              }}
            >
              ACCESS MANAGEMENT
            </Typography>
            <ListItem
              onClick={() => handleNavClick('/access-management')}
              sx={{
                borderRadius: '0.5rem',
                backgroundColor: activeItem === 'access-management' ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
                color: activeItem === 'access-management' ? 'white' : 'rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
                mb: '0.125rem',
                border: activeItem === 'access-management' ? '1px solid rgba(102, 126, 234, 0.2)' : '1px solid transparent',
                '&:hover': {
                  backgroundColor: activeItem === 'access-management' ? 'rgba(102, 126, 234, 0.15)' : 'rgba(255, 255, 255, 0.05)',
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
                <People />
              </ListItemIcon>
              <ListItemText 
                primary="Access Management" 
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    color: 'inherit',
                    letterSpacing: '-0.01em',
                    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                  },
                }}
              />
            </ListItem>
          </Box>
        </List>
      </Box>
    </Box>
  );
}