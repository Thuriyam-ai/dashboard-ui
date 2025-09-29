"use client";

import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from '@/components/dashboard';
import { BoltTeamLeaderOverview } from '../../components/bolt-components';

export default function BoltOverviewPage() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Sidebar activeItem="overview" context="team-leader" />
      
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <BoltTeamLeaderOverview />
      </Box>
    </Box>
  );
}
