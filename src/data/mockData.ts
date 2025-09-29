import { User, DashboardConfig } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    role: 'team_manager'
  },
  {
    id: '2',
    name: 'Arjun Patel',
    email: 'arjun.patel@company.com',
    role: 'team_leader'
  },
  {
    id: '3',
    name: 'Kavya Reddy',
    email: 'kavya.reddy@company.com',
    role: 'agent'
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@company.com',
    role: 'team_manager'
  },
  {
    id: '5',
    name: 'Sneha Gupta',
    email: 'sneha.gupta@company.com',
    role: 'team_leader'
  },
  {
    id: '6',
    name: 'Vikram Singh',
    email: 'vikram.singh@company.com',
    role: 'agent'
  },
  {
    id: '7',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@company.com',
    role: 'agent'
  },
  {
    id: '8',
    name: 'Rohit Mehta',
    email: 'rohit.mehta@company.com',
    role: 'team_leader'
  },
  {
    id: '9',
    name: 'Deepika Nair',
    email: 'deepika.nair@company.com',
    role: 'agent'
  },
  {
    id: '10',
    name: 'Karthik Krishnan',
    email: 'karthik.krishnan@company.com',
    role: 'team_manager'
  }
];

export const dashboardConfigs: Record<string, DashboardConfig> = {
  team_manager: {
    metrics: [
      { title: 'Total Revenue', value: '$2.4M', change: 12.5, changeType: 'positive', icon: 'DollarSign' },
      { title: 'Team Performance', value: '87%', change: 5.3, changeType: 'positive', icon: 'Users' },
      { title: 'Project Completion', value: '92%', change: 3.7, changeType: 'positive', icon: 'CheckCircle' },
      { title: 'Budget Utilization', value: '78%', change: -2.1, changeType: 'negative', icon: 'PieChart' }
    ],
    charts: [
      {
        id: 'team-performance',
        title: 'Team Performance Overview',
        type: 'area',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Performance Score',
            data: [82, 85, 88, 84, 90, 87, 89, 91, 88, 92, 90, 94],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true
          }]
        }
      },
      {
        id: 'project-status',
        title: 'Project Status Distribution',
        type: 'bar',
        data: {
          labels: ['Completed', 'In Progress', 'Planning', 'On Hold'],
          datasets: [{
            label: 'Projects',
            data: [15, 8, 3, 2],
            backgroundColor: 'rgba(59, 130, 246, 0.8)'
          }]
        }
      }
    ]
  },
  team_leader: {
    metrics: [
      { title: 'Team Productivity', value: '89%', change: 4.2, changeType: 'positive', icon: 'TrendingUp' },
      { title: 'Task Completion', value: '94%', change: 2.8, changeType: 'positive', icon: 'CheckCircle' },
      { title: 'Quality Score', value: '96%', change: 1.5, changeType: 'positive', icon: 'Star' },
      { title: 'Team Satisfaction', value: '4.3/5', change: 0.2, changeType: 'positive', icon: 'Heart' }
    ],
    charts: [
      {
        id: 'daily-productivity',
        title: 'Daily Productivity Trends',
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Productivity Score',
            data: [88, 92, 87, 94, 89, 85, 82],
            borderColor: 'rgb(16, 185, 129)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)'
          }]
        }
      },
      {
        id: 'task-distribution',
        title: 'Task Distribution by Priority',
        type: 'pie',
        data: {
          labels: ['High Priority', 'Medium Priority', 'Low Priority', 'Backlog'],
          datasets: [{
            label: 'Tasks',
            data: [12, 18, 8, 5],
            backgroundColor: [
              'rgba(16, 185, 129, 0.8)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ]
          }]
        }
      }
    ]
  },
  agent: {
    metrics: [
      { title: 'Tickets Resolved', value: '47', change: 12.3, changeType: 'positive', icon: 'CheckCircle' },
      { title: 'Response Time', value: '2.3min', change: -8.5, changeType: 'positive', icon: 'Clock' },
      { title: 'Customer Rating', value: '4.8/5', change: 0.3, changeType: 'positive', icon: 'Star' },
      { title: 'Resolution Rate', value: '94%', change: 2.1, changeType: 'positive', icon: 'Target' }
    ],
    charts: [
      {
        id: 'daily-tickets',
        title: 'Daily Ticket Resolution',
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Tickets Resolved',
            data: [8, 12, 10, 15, 11, 6, 4],
            borderColor: 'rgb(147, 51, 234)',
            backgroundColor: 'rgba(147, 51, 234, 0.1)'
          }]
        }
      },
      {
        id: 'ticket-categories',
        title: 'Ticket Categories',
        type: 'bar',
        data: {
          labels: ['Technical', 'Billing', 'General', 'Escalation'],
          datasets: [{
            label: 'Tickets',
            data: [18, 12, 15, 3],
            backgroundColor: 'rgba(147, 51, 234, 0.8)'
          }]
        }
      }
    ]
  }
};