
import { 
  LayoutDashboard, 
  Rocket, 
  Key, 
  Settings, 
  Activity, 
  Code, 
  TrendingUp, 
  Cog,
  Plus,
  User,
  Grid3X3, 
  BarChart3,
  MessageSquare,
  Megaphone,
  Bell,
  Target
} from 'lucide-react';

import styles from './bolt-components/bolt-complete-sidebar.module.scss';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole?: string;
}

const adminSidebarItems = [
  { 
    id: 'dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    description: 'Overview & Analytics'
  },
  { 
    id: 'agent-configurations', 
    icon: Rocket, 
    label: 'Agent Configurations',
    description: 'Deploy & Configure Agents'
  },
  { 
    id: 'access-management', 
    icon: Key, 
    label: 'Access Management',
    description: 'Users & Permissions'
  },
  { 
    id: 'platform-settings', 
    icon: Settings, 
    label: 'Platform Settings',
    description: 'System Configuration'
  },
  { 
    id: 'observability', 
    icon: Activity, 
    label: 'Observability',
    description: 'Monitoring & Analytics'
  },
  { 
    id: 'developer-hub', 
    icon: Code, 
    label: 'Developer Hub',
    description: 'APIs & Documentation'
  },
  { 
    id: 'agent-analytics', 
    icon: TrendingUp, 
    label: 'Agent Analytics',
    description: 'Performance & Intelligence'
  },
  { 
    id: 'config-management', 
    icon: Cog, 
    label: 'Config Management',
    description: 'Campaign & Goal Configuration'
  }
];

const teamLeaderSidebarItems = [
  { 
    id: 'overview',
    icon: Grid3X3, 
    label: 'Overview',
    description: 'Team Overview & Metrics'
  },
  { 
    id: 'conversations',
    icon: MessageSquare, 
    label: 'Conversations',
    description: 'Team Conversations'
  },
  { 
    id: 'call-quality-analytics',
    icon: BarChart3, 
    label: 'Call Quality Analytics',
    description: 'Call Performance Analysis'
  },
 
  { 
    id: 'goal-mgmt',
    icon: Target, 
    label: 'Goal Mgmt',
    description: 'Goal Management'
  },
  { 
    id: 'campaign-mgmt',
    icon: Megaphone, 
    label: 'Campaign Mgmt',
    description: 'Campaign Management'
  },
  { 
    id: 'alert-mgmt',
    icon: Bell, 
    label: 'Alert Mgmt',
    description: 'Alert Management'
  }
];

export function Sidebar({ currentView, onViewChange, userRole = 'team_manager' }: SidebarProps) {
  const sidebarItems = userRole === 'team_leader' ? teamLeaderSidebarItems : adminSidebarItems;

  return (
    <div className={styles.sidebar}>
      {/* Logo/Brand */}
      <div className={styles.logoSection}>
        <div className={styles.logoIcon}>
          <div className={styles.logoInner}>
            <div className={styles.logoDot}></div>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className={styles.navSection}>
        <div className={styles.navItems}>
          {sidebarItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <div key={item.id} className={styles.navItem}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`${styles.navButton} ${isActive ? styles.navButtonActive : styles.navButtonInactive}`}
                  title={item.label}
                >
                  <IconComponent size={20} />
                  {isActive && (
                    <div className={styles.activeIndicator} />
                  )}
                </button>
                
                {/* Tooltip */}
                <div className={styles.tooltip}>
                  <div className={styles.tooltipLabel}>{item.label}</div>
                  <div className={styles.tooltipDescription}>{item.description}</div>
                  <div className={styles.tooltipArrow}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Button */}
      <div className={styles.addButtonSection}>
        <button
          className={styles.addButton}
          title="Add New"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* User Profile */}
      <div className={styles.userSection}>
        <div className={styles.userAvatar}>
          <User size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
}
