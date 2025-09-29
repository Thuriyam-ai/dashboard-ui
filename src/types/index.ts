export interface User {
  id: string;
  name: string;
  email: string;
  role: 'team_manager' | 'team_leader' | 'agent';
  avatar?: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export interface DashboardConfig {
  metrics: MetricCard[];
  charts: {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area';
    data: ChartData;
  }[];
}