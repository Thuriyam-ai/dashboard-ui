'use client';

import React, { useState, useEffect } from 'react';
import styles from './sidebar.module.scss';

interface NavItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  isActive?: boolean;
  children?: NavItem[];
}

interface SidebarProps {
  activeItem?: string;
}

export function Sidebar({ activeItem: propActiveItem }: SidebarProps = {}) {
  const [activeItem, setActiveItem] = useState(propActiveItem || 'dashboard');

  // Update local state when prop changes
  useEffect(() => {
    if (propActiveItem) {
      setActiveItem(propActiveItem);
    }
  }, [propActiveItem]);

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'Overview & Analytics',
      icon: 'grid',
      isActive: true,
    },
    {
      id: 'agent-config',
      label: 'Agent Configurations',
      description: 'Deploy & Configure Agents',
      icon: 'rocket',
    },
    {
      id: 'access-mgmt',
      label: 'Access Management',
      description: 'Users & Permissions',
      icon: 'key',
    },
    {
      id: 'platform-settings',
      label: 'Platform Settings',
      description: 'System Configuration',
      icon: 'gear',
    },
    {
      id: 'observability',
      label: 'Observability',
      description: 'Monitoring & Analytics',
      icon: 'chart',
    },
    {
      id: 'developer-hub',
      label: 'Developer Hub',
      description: 'APIs & Documentation',
      icon: 'users',
    },
    {
      id: 'analytics',
      label: 'Analytics',
      description: 'Performance & Intelligence',
      icon: 'chart',
      children: [
        {
          id: 'analytics-overview',
          label: 'Overview',
          description: 'Conversation Analysis',
          icon: 'chart',
        },
        {
          id: 'team-dashboard',
          label: 'Team Dashboard',
          description: 'Team & Campaign Analytics',
          icon: 'users',
        },
      ],
    },
  ];

  const getIcon = (iconName: string) => {
    const icons = {
      grid: (
        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
      ),
      rocket: (
        <path d="M12 2.5c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1zm0 2c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm0 4c-.5 0-1-.5-1-1s.5-1 1-1 1 .5 1 1-.5 1-1 1z" />
      ),
      key: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      ),
      gear: (
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      ),
      chart: (
        <path d="M3 13h2v8H3v-8zm4-6h2v14H7V7zm4-4h2v18h-2V3zm4 8h2v10h-2V11z" />
      ),
      users: (
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17.5c-.8 0-1.54.5-1.85 1.26L13.5 16H16v6h4zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9L6.34 8.54A1.5 1.5 0 0 0 4.8 8H3.5c-.8 0-1.54.5-1.85 1.26L.5 16H3v6h4.5z" />
      ),
    };
    return icons[iconName as keyof typeof icons] || icons.grid;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <div className={styles.brandName}>BotConfig</div>
            <div className={styles.brandSubtitle}>Admin Dashboard</div>
          </div>
        </div>
      </div>

      <div className={styles.navigation}>
        <div className={styles.sectionTitle}>MANAGEMENT</div>
        <nav className={styles.navList}>
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                className={`${styles.navItem} ${activeItem === item.id || (item.children && item.children.some((child) => activeItem === child.id)) ? styles.active : ''}`}
                onClick={() => setActiveItem(item.id)}
              >
                <div className={styles.navIcon}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    {getIcon(item.icon)}
                  </svg>
                </div>
                <div className={styles.navContent}>
                  <div className={styles.navLabel}>{item.label}</div>
                  <div className={styles.navDescription}>
                    {item.description}
                  </div>
                </div>
                {item.children && (
                  <div className={styles.navArrow}>
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                )}
              </button>

              {/* Render nested items */}
              {item.children &&
                (activeItem === item.id ||
                  item.children.some((child) => activeItem === child.id)) && (
                  <div className={styles.nestedItems}>
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`${styles.nestedItem} ${activeItem === child.id ? styles.active : ''}`}
                        onClick={() => setActiveItem(child.id)}
                      >
                        <div className={styles.nestedIcon}>
                          <svg fill="currentColor" viewBox="0 0 24 24">
                            {getIcon(child.icon)}
                          </svg>
                        </div>
                        <div className={styles.nestedContent}>
                          <div className={styles.nestedLabel}>
                            {child.label}
                          </div>
                          <div className={styles.nestedDescription}>
                            {child.description}
                          </div>
                        </div>
                        {activeItem === child.id && (
                          <div className={styles.nestedArrow}>
                            <svg fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
