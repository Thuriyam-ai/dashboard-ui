import React from 'react';
import { BarChart3, LineChart, PieChart, Activity } from 'lucide-react';
import styles from './ChartCard.module.scss';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any;
  accentColor: string;
}

const chartIcons = {
  line: LineChart,
  bar: BarChart3,
  pie: PieChart,
  area: Activity
};

export function ChartCard({ title, type, data, accentColor }: ChartCardProps) {
  const IconComponent = chartIcons[type];
  
  // Determine icon color class based on accent color
  const getIconColorClass = () => {
    if (accentColor.includes('blue')) return styles.blue;
    if (accentColor.includes('emerald')) return styles.emerald;
    if (accentColor.includes('purple')) return styles.purple;
    return styles.blue; // default
  };

  // Determine bar color class based on accent color
  const getBarColorClass = () => {
    if (accentColor.includes('blue')) return styles.blue;
    if (accentColor.includes('emerald')) return styles.emerald;
    if (accentColor.includes('purple')) return styles.purple;
    return styles.blue; // default
  };
  
  // Simple visualization for demonstration - in a real app, you'd use a charting library
  const renderChart = () => {
    if (type === 'bar' || type === 'line' || type === 'area') {
      const maxValue = Math.max(...data.datasets[0].data);
      return (
        <div className={styles.chartContainer}>
          {data.datasets[0].data.map((value: number, index: number) => (
            <div key={index} className={styles.chartBar}>
              <div 
                className={`${styles.bar} ${getBarColorClass()}`}
                style={{ 
                  height: `${(value / maxValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
              <span className={styles.barLabel}>
                {data.labels[index]}
              </span>
            </div>
          ))}
        </div>
      );
    }
    
    if (type === 'pie') {
      const total = data.datasets[0].data.reduce((sum: number, val: number) => sum + val, 0);
      return (
        <div className={styles.pieContainer}>
          {data.labels.map((label: string, index: number) => {
            const value = data.datasets[0].data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            return (
              <div key={label} className={styles.pieItem}>
                <div className={styles.pieItemLeft}>
                  <div 
                    className={styles.pieColor}
                    style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}
                  />
                  <span className={styles.pieLabel}>{label}</span>
                </div>
                <span className={styles.pieValue}>{percentage}%</span>
              </div>
            );
          })}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={styles.chartCard}>
      <div className={styles.cardHeader}>
        <div className={`${styles.iconContainer} ${getIconColorClass()}`}>
          <IconComponent size={18} />
        </div>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      {renderChart()}
    </div>
  );
}