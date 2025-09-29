"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { Sidebar } from '../../components/Sidebar';
import { UserSelector } from '../../components/UserSelector';
import { CallQualityAnalytics } from '../../components/CallQualityAnalytics';
import { users } from '../../data/mockData';
import styles from '../../components/bolt-components/bolt-complete-sidebar.module.scss';

export default function CallQualityAnalyticsPage() {
  const [selectedUser, setSelectedUser] = useState(users.find(user => user.role === 'team_leader') || users[0]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
    // Navigate to appropriate default page based on role
    const basePath = window.location.hostname === 'thuriyam-ai.github.io' ? '/dashboard-ui' : '';
    if (user.role === 'team_leader') {
      router.push(`${basePath}/overview`);
    } else {
      router.push(`${basePath}/dashboard`);
    }
  };

  const handleViewChange = (view: string) => {
    const basePath = window.location.hostname === 'thuriyam-ai.github.io' ? '/dashboard-ui' : '';
    router.push(`${basePath}/${view === 'dashboard' ? '' : view}`);
  };

  return (
    <div className={styles.sidebarContainer}>
      <Sidebar currentView="analytics" onViewChange={handleViewChange} userRole={selectedUser.role} />

      <div className={styles.mainContent}>
        {/* Header */}
        <AppBar 
          position="static" 
          className={styles.header}
        >
          <Toolbar className={styles.headerContent}>
            <div className={styles.headerLeft}>
              <Typography variant="h5" className={styles.headerTitle}>
                Conversation Intelligence Platform
              </Typography>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <UserSelector
                users={users as any}
                selectedUser={selectedUser as any}
                onUserSelect={handleUserSelect}
                isOpen={isUserDropdownOpen}
                onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className={styles.contentArea}>
          <CallQualityAnalytics />
        </div>
      </div>
    </div>
  );
}
