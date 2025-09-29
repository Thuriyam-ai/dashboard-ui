"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, AppBar, Toolbar, Typography, CircularProgress } from '@mui/material';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../components/Dashboard';
import { UserSelector } from '../components/UserSelector';
import { TeamLeaderOverview } from '../components/TeamLeaderOverview';
import { CallQualityAnalytics } from '../components/CallQualityAnalytics';
import { Conversations } from '../components/Conversations';
import { GoalManagement } from '../components/GoalManagement';
import { CampaignManagement } from '../components/CampaignManagement';
import { AlertManagement } from '../components/AlertManagement';
import { AuthGuard } from '../components/auth-guard/auth-guard';
import { useAuth } from '../contexts/auth-context';
import { users, dashboardConfigs } from '../data/mockData';
import styles from '../components/bolt-components/bolt-complete-sidebar.module.scss';

export default function HomePage() {
  const [selectedUser, setSelectedUser] = useState(users.find(user => user.role === 'team_leader') || users[0]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  // Get current view from URL (Next.js equivalent of React Router location.pathname)
  const getCurrentView = () => {
    const path = pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/overview') return 'overview';
    if (path === '/call-quality-analytics') return 'call-quality-analytics';
    if (path === '/conversations') return 'conversations';
    if (path === '/goal-mgmt') return 'goal-mgmt';
    if (path === '/campaign-mgmt') return 'campaign-mgmt';
    if (path === '/alert-mgmt') return 'alert-mgmt';
    if (path === '/agent-configurations') return 'agent-configurations';
    if (path === '/access-management') return 'access-management';
    if (path === '/platform-settings') return 'platform-settings';
    if (path === '/observability') return 'observability';
    if (path === '/developer-hub') return 'developer-hub';
    if (path === '/agent-analytics') return 'agent-analytics';
    if (path === '/config-management') return 'config-management';
    return 'dashboard';
  };

  const currentView = getCurrentView();

  const handleUserSelect = (user: typeof users[0]) => {
    setSelectedUser(user);
    setIsUserDropdownOpen(false);
    // Navigate to appropriate default page based on role (Next.js router.push)
    if (user.role === 'team_leader') {
      router.push('/overview');
    } else {
      router.push('/dashboard');
    }
  };

  const handleViewChange = (view: string) => {
    // Next.js routing equivalent
    const route = view === 'dashboard' ? '/' : `/${view}`;
    router.push(route);
  };

  // Update selected user when role changes in URL
  useEffect(() => {
    if (currentView === 'overview' || currentView === 'call-quality-analytics' || 
        currentView === 'conversations' || currentView === 'goal-mgmt' || 
        currentView === 'campaign-mgmt' || currentView === 'alert-mgmt') {
      // Find a team leader user if current user is not team leader
      if (selectedUser.role !== 'team_leader') {
        const teamLeader = users.find(user => user.role === 'team_leader');
        if (teamLeader) {
          setSelectedUser(teamLeader);
        }
      }
    }
  }, [currentView, selectedUser.role]);

  const currentConfig = dashboardConfigs[selectedUser.role];

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <TeamLeaderOverview />;
      case 'call-quality-analytics':
        return <CallQualityAnalytics />;
      case 'conversations':
        return <Conversations />;
      case 'goal-mgmt':
        return <GoalManagement />;
      case 'campaign-mgmt':
        return <CampaignManagement />;
      case 'alert-mgmt':
        return <AlertManagement />;
      case 'dashboard':
        return <Dashboard config={currentConfig} userRole={selectedUser.role} />;
      default:
        return (
          <Box sx={{ 
            flex: 1, 
            backgroundColor: '#f9fafb', 
            p: 8, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
                {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/([A-Z])/g, ' $1')}
              </Typography>
              <Typography variant="body1" sx={{ color: '#6b7280' }}>
                This section is coming soon. Click on Dashboard in the Explorer to see the analytics.
              </Typography>
            </Box>
          </Box>
        );
    }
  };

  // Temporarily disable auth to get dashboard working
  // const { isAuthenticated, isLoading } = useAuth();

  return (
    <div className={styles.sidebarContainer}>
      <Sidebar currentView={currentView} onViewChange={handleViewChange} userRole={selectedUser.role} />

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
                users={users}
                selectedUser={selectedUser}
                onUserSelect={handleUserSelect}
                isOpen={isUserDropdownOpen}
                onToggle={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <div className={styles.contentArea}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}