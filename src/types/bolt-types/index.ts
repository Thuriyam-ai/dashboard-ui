export interface BoltUser {
  id: string;
  name: string;
  email: string;
  role: 'team_manager' | 'team_leader' | 'agent';
  avatar?: string;
}

export interface BoltMetricCard {
  title: string;
  value: string | number;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface BoltChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
    fill?: boolean;
  }[];
}

export interface BoltDashboardConfig {
  metrics: BoltMetricCard[];
  charts: {
    id: string;
    title: string;
    type: 'line' | 'bar' | 'pie' | 'area';
    data: BoltChartData;
  }[];
}

// Agent type for Team Leader Overview
export interface BoltAgent {
  id: number;
  name: string;
  score: number;
  calls: number;
  satisfaction: number;
  talkRatio: number;
  interruptions: number;
  monologues: number;
}

// Widget types for dashboard
export interface BoltWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'leaderboard' | 'activity';
  data?: any;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
}

// Conversation types
export interface BoltConversation {
  id: string;
  agentId: string;
  customerId: string;
  duration: string;
  date: string;
  status: 'completed' | 'in-progress' | 'failed';
  qualityScore: number;
  team: string;
  disposition: string;
}

// Goal types
export interface BoltGoal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  deadline: string;
  status: 'active' | 'completed' | 'paused';
  team: string;
}

// Campaign types
export interface BoltCampaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  goalVersion: string;
  assignedTeam: string;
  duration: string;
  metrics: {
    calls: number;
    success: number;
    conversion: number;
  };
}
