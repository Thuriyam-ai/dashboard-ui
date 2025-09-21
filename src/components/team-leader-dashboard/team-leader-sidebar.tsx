"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
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
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

interface TeamLeaderSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function TeamLeaderSidebar({ open, onClose }: TeamLeaderSidebarProps) {
  const [configurationOpen, setConfigurationOpen] = React.useState(false);

  const handleConfigurationClick = () => {
    setConfigurationOpen(!configurationOpen);
  };

  const navItems = [
    {
      id: "overview",
      label: "Overview",
      icon: <Dashboard />,
      path: "/team-leader-dashboard",
    },
    {
      id: "call-quality",
      label: "Call Quality Analytics",
      icon: <Analytics />,
      path: "/team-leader-dashboard/call-quality-analytics",
    },
    {
      id: "conversations",
      label: "Conversations view",
      icon: <Message />,
      path: "/team-leader-dashboard/conversations-view",
    },
    {
      id: "support-call",
      label: "Support Call Analysis",
      icon: <Support />,
      path: "/team-leader-dashboard/support-call-analysis",
    },
    {
      id: "customer-success",
      label: "Customer Success Analysis",
      icon: <TrendingUp />,
      path: "/team-leader-dashboard/customer-success-analysis",
    },
  ];

  const configurationItems = [
    {
      id: "goal-mgmt",
      label: "Goal Mgmt",
      icon: <Flag />,
      path: "/team-leader-dashboard/configuration/goal-mgmt",
    },
    {
      id: "campaign-mgmt",
      label: "Campaign Mgmt",
      icon: <Campaign />,
      path: "/team-leader-dashboard/configuration/campaign-mgmt",
    },
    {
      id: "alert-mgmt",
      label: "Alert Mgmt",
      icon: <Notifications />,
      path: "/team-leader-dashboard/configuration/alert-mgmt",
    },
  ];

  const handleNavClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 280,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 280,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2" }}>
          Team Leader Dashboard
        </Typography>
      </Box>
      
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => handleNavClick(item.path)}
            sx={{
              "&:hover": {
                backgroundColor: "#e3f2fd",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, mr: 2 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        
        <ListItem button onClick={handleConfigurationClick}>
          <ListItemIcon sx={{ minWidth: 40, mr: 2 }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Configuration Mgmt" />
          {configurationOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        
        <Collapse in={configurationOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {configurationItems.map((item) => (
              <ListItem
                key={item.id}
                button
                onClick={() => handleNavClick(item.path)}
                sx={{
                  pl: 4,
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, mr: 2 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}