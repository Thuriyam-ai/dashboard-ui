'use client';

import styles from './recent-deployments.module.scss';

interface Deployment {
  id: string;
  botName: string;
  environment: string;
  version: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

export function RecentDeployments() {
  const deployments: Deployment[] = [
    {
      id: '1',
      botName: 'Priya Customer Support Bot',
      environment: 'Production',
      version: 'v2.1.4',
      status: 'success',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      botName: 'Arjun Sales Assistant Bot',
      environment: 'Staging',
      version: 'v1.8.2',
      status: 'pending',
      timestamp: '15 minutes ago',
    },
    {
      id: '3',
      botName: 'Kavya FAQ Bot',
      environment: 'Production',
      version: 'v3.0.1',
      status: 'failed',
      timestamp: '1 hour ago',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        );
      case 'pending':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case 'failed':
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#38a169';
      case 'pending':
        return '#dd6b20';
      case 'failed':
        return '#e53e3e';
      default:
        return '#718096';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.5c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm0 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
          </svg>
        </div>
        <h2 className={styles.title}>Recent Deployments</h2>
      </div>

      <div className={styles.deploymentsList}>
        {deployments.map((deployment) => (
          <div key={deployment.id} className={styles.deploymentItem}>
            <div
              className={styles.statusIcon}
              style={{ color: getStatusColor(deployment.status) }}
            >
              {getStatusIcon(deployment.status)}
            </div>
            <div className={styles.deploymentInfo}>
              <div className={styles.botName}>{deployment.botName}</div>
              <div className={styles.deploymentDetails}>
                {deployment.environment} • {deployment.version}
              </div>
            </div>
            <div className={styles.deploymentMeta}>
              <div
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(deployment.status) }}
              >
                {deployment.status}
              </div>
              <div className={styles.timestamp}>{deployment.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
