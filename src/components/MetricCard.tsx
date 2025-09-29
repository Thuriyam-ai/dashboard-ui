import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Heart, Target, Users, CheckCircle, PieChart, Star, Database, FileText, Zap, Activity, Clock, AlertTriangle } from 'lucide-react';
import { MetricCard as MetricCardType } from '../types';
import styles from './MetricCard.module.scss';

const iconMap = {
  DollarSign,
  TrendingUp,
  Heart,
  Target,
  Users,
  CheckCircle,
  PieChart,
  Star,
  Database,
  FileText,
  Zap,
  Activity,
  Clock,
  AlertTriangle
};

interface MetricCardProps {
  metric: MetricCardType;
  accentColor: string;
}

export function MetricCard({ metric, accentColor }: MetricCardProps) {
  const IconComponent = iconMap[metric.icon as keyof typeof iconMap] || TrendingUp;
  const isPositiveChange = metric.changeType === 'positive';
  const isNegativeChange = metric.changeType === 'negative';

  // Determine icon color class based on accent color
  const getIconColorClass = () => {
    if (accentColor.includes('blue')) return styles.blue;
    if (accentColor.includes('emerald')) return styles.emerald;
    if (accentColor.includes('purple')) return styles.purple;
    return styles.blue; // default
  };

  return (
    <div className={styles.metricCard}>
      <div className={styles.cardContent}>
        <div className={styles.cardMain}>
          <div className={`${styles.iconContainer} ${getIconColorClass()}`}>
            <IconComponent size={20} />
          </div>
          <h3 className={styles.metricTitle}>{metric.title}</h3>
          <p className={styles.metricValue}>{metric.value}</p>
          <div className={styles.changeContainer}>
            {isPositiveChange && <TrendingUp size={14} className={`${styles.trendIcon} ${styles.positive}`} />}
            {isNegativeChange && <TrendingDown size={14} className={`${styles.trendIcon} ${styles.negative}`} />}
            <span className={`${styles.changeValue} ${
              isPositiveChange ? styles.positive : 
              isNegativeChange ? styles.negative : 
              styles.neutral
            }`}>
              {Math.abs(metric.change)}%
            </span>
            <span className={styles.changeLabel}>this period</span>
          </div>
        </div>
      </div>
    </div>
  );
}