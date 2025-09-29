import React from 'react';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import styles from './SystemHealth.module.scss';

interface HealthMetric {
  label: string;
  value: string;
  percentage: number;
  status: 'good' | 'warning' | 'error';
  description: string;
}

const healthMetrics: HealthMetric[] = [
  {
    label: 'API Response Time',
    value: 'Average: 120ms',
    percentage: 85,
    status: 'good',
    description: 'Good'
  },
  {
    label: 'System Uptime',
    value: 'Last 24 hours',
    percentage: 99.8,
    status: 'good',
    description: '99.8%'
  },
  {
    label: 'Error Rate',
    value: 'Within acceptable range',
    percentage: 0.2,
    status: 'good',
    description: '0.2%'
  }
];

export function SystemHealth() {
  const getStatusColorClass = (status: string) => {
    switch (status) {
      case 'good': return styles.good;
      case 'warning': return styles.warning;
      case 'error': return styles.error;
      default: return styles.default;
    }
  };

  const getProgressColorClass = (status: string) => {
    switch (status) {
      case 'good': return styles.good;
      case 'warning': return styles.warning;
      case 'error': return styles.error;
      default: return styles.default;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle size={16} className={`${styles.statusIcon} ${styles.good}`} />;
      case 'warning': return <AlertCircle size={16} className={`${styles.statusIcon} ${styles.warning}`} />;
      case 'error': return <AlertCircle size={16} className={`${styles.statusIcon} ${styles.error}`} />;
      default: return <Clock size={16} className={`${styles.statusIcon} ${styles.default}`} />;
    }
  };

  return (
    <div className={styles.systemHealthCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <Activity size={18} />
        </div>
        <h3 className={styles.cardTitle}>System Health</h3>
      </div>
      
      <div className={styles.metricsContainer}>
        {healthMetrics.map((metric, index) => (
          <div key={index} className={styles.metricItem}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <div className={styles.metricStatus}>
                {getStatusIcon(metric.status)}
                <span className={`${styles.statusText} ${getStatusColorClass(metric.status)}`}>
                  {metric.description}
                </span>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <div 
                className={`${styles.progressBar} ${getProgressColorClass(metric.status)}`}
                style={{ 
                  width: metric.label === 'Error Rate' ? '8%' : `${Math.min(metric.percentage, 100)}%` 
                }}
              />
            </div>
            <span className={styles.metricValue}>{metric.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}