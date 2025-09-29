import React from 'react';
import { Rocket, CheckCircle, Clock, AlertCircle, Zap } from 'lucide-react';
import styles from './RecentActivity.module.scss';

interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'success' | 'pending' | 'failed' | 'processing';
  timestamp: string;
  type: 'deployment' | 'analysis' | 'report' | 'system';
}

const activityData: ActivityItem[] = [
  {
    id: '1',
    title: 'Quarterly Report Generated',
    subtitle: 'Executive Dashboard • Q4 2024',
    status: 'success',
    timestamp: '2 minutes ago',
    type: 'report'
  },
  {
    id: '2',
    title: 'Data Pipeline Update',
    subtitle: 'Analytics Engine • v2.1.4',
    status: 'pending',
    timestamp: '15 minutes ago',
    type: 'system'
  },
  {
    id: '3',
    title: 'Performance Analysis',
    subtitle: 'Team Metrics • Weekly Report',
    status: 'processing',
    timestamp: '32 minutes ago',
    type: 'analysis'
  },
  {
    id: '4',
    title: 'System Backup',
    subtitle: 'Database • Scheduled',
    status: 'failed',
    timestamp: '1 hour ago',
    type: 'system'
  }
];

export function RecentActivity() {
  const getStatusIconClass = (status: string) => {
    switch (status) {
      case 'success': return styles.success;
      case 'pending': return styles.pending;
      case 'failed': return styles.failed;
      case 'processing': return styles.processing;
      default: return styles.default;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className={`${styles.activityIcon} ${styles.success}`} />;
      case 'pending': return <Clock size={16} className={`${styles.activityIcon} ${styles.pending}`} />;
      case 'failed': return <AlertCircle size={16} className={`${styles.activityIcon} ${styles.failed}`} />;
      case 'processing': return <Zap size={16} className={`${styles.activityIcon} ${styles.processing}`} />;
      default: return <Clock size={16} className={`${styles.activityIcon} ${styles.default}`} />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success': return 'success';
      case 'pending': return 'pending';
      case 'failed': return 'failed';
      case 'processing': return 'processing';
      default: return 'unknown';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'success': return styles.success;
      case 'pending': return styles.pending;
      case 'failed': return styles.failed;
      case 'processing': return styles.processing;
      default: return styles.default;
    }
  };

  return (
    <div className={styles.recentActivityCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <Rocket size={18} />
        </div>
        <h3 className={styles.cardTitle}>Recent Activity</h3>
      </div>
      
      <div className={styles.activityContainer}>
        {activityData.map((item) => (
          <div key={item.id} className={styles.activityItem}>
            <div className={styles.activityIcon}>
              {getStatusIcon(item.status)}
            </div>
            <div className={styles.activityContent}>
              <div className={styles.activityHeader}>
                <p className={styles.activityTitle}>{item.title}</p>
                <div className={styles.statusContainer}>
                  <span className={`${styles.statusBadge} ${getStatusBadgeClass(item.status)}`}>
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </div>
              <p className={styles.activitySubtitle}>{item.subtitle}</p>
              <p className={styles.activityTimestamp}>{item.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}