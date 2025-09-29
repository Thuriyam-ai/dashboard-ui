import React from 'react';
import { MetricCard } from './MetricCard';
import { ChartCard } from './ChartCard';
import { SystemHealth } from './SystemHealth';
import { RecentActivity } from './RecentActivity';
import { DashboardConfig } from '../types';
import styles from './Dashboard.module.scss';

interface DashboardProps {
  config: DashboardConfig;
  userRole: string;
}

const roleColors = {
  team_manager: 'bg-blue-500',
  team_leader: 'bg-emerald-500',
  agent: 'bg-purple-500'
};

const roleLabels = {
  team_manager: 'Team Manager Dashboard',
  team_leader: 'Team Leader Dashboard',
  agent: 'Agent Dashboard'
};

export function Dashboard({ config, userRole }: DashboardProps) {
  const accentColor = roleColors[userRole as keyof typeof roleColors] || roleColors.team_manager;
  const dashboardTitle = roleLabels[userRole as keyof typeof roleLabels] || 'Dashboard Overview';

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>{dashboardTitle}</h1>
        <p className={styles.dashboardSubtitle}>Monitor your key metrics and system performance</p>
      </div>

      {/* Metrics Grid */}
      <div className={styles.metricsGrid}>
        {config.metrics.map((metric, index) => (
          <MetricCard 
            key={index} 
            metric={metric} 
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Charts and Activity Grid */}
      <div className={styles.chartsActivityGrid}>
        <div className={styles.chartsSection}>
          {config.charts.map((chart) => (
            <ChartCard
              key={chart.id}
              title={chart.title}
              type={chart.type}
              data={chart.data}
              accentColor={accentColor}
            />
          ))}
        </div>
        
        <div className={styles.activitySection}>
          <RecentActivity />
          <SystemHealth />
        </div>
      </div>
    </div>
  );
}