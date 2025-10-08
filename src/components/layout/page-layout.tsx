'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import { TeamLeaderSidebar } from '../../components/team-leader-dashboard/team-leader-sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  activeItem: string;
}

const DRAWER_WIDTH = 280;

export default function PageLayout({ children, activeItem }: PageLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar 
        activeItem={activeItem}
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
      />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          marginLeft: '240px',
          paddingLeft: '50px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
