'use client';

import React from 'react';
import { Box } from '@mui/material';
import { TeamLeaderSidebar } from '../../components/team-leader-dashboard/team-leader-sidebar';

interface PageLayoutProps {
  children: React.ReactNode;
  activeItem: string;
}

export default function PageLayout({ children, activeItem }: PageLayoutProps) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <TeamLeaderSidebar activeItem={activeItem} />
      <Box 
        component="main"
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          marginLeft: '280px',
          paddingLeft: '24px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
