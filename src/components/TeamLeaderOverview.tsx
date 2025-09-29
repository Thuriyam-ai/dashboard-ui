import { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  Star, 
  MessageSquare,
  Search,
  X,
  BarChart3,
  Activity,
  Target,
  AlertTriangle,
  MoreHorizontal,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Maximize2,
  Minimize2,
  Settings,
  TrendingUp
} from 'lucide-react';

import styles from './TeamLeaderOverview.module.scss';

// 1. Define the Agent type
type Agent = {
  id: number;
  name: string;
  score: number;
  calls: number;
  satisfaction: number;
  talkRatio: number;
  interruptions: number;
  monologues: number;
};

// 2. Declare the agents array above component
const agents: Agent[] = [
  { id: 1, name: 'Priya Sharma', score: 94.5, calls: 52, satisfaction: 4.8, talkRatio: 58, interruptions: 1, monologues: 2.3 },
  { id: 2, name: 'Arjun Patel', score: 92.1, calls: 48, satisfaction: 4.7, talkRatio: 62, interruptions: 2, monologues: 3.1 },
  { id: 3, name: 'Kavya Reddy', score: 89.8, calls: 45, satisfaction: 4.6, talkRatio: 55, interruptions: 0, monologues: 1.8 },
  { id: 4, name: 'Sneha Gupta', score: 87.2, calls: 41, satisfaction: 4.5, talkRatio: 65, interruptions: 3, monologues: 4.2 },
  { id: 5, name: 'Vikram Singh', score: 85.6, calls: 39, satisfaction: 4.3, talkRatio: 68, interruptions: 4, monologues: 5.1 }
];

export function TeamLeaderOverview() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [widgetMenu, setWidgetMenu] = useState<string | null>(null);
  const [showAnalyticsCards, setShowAnalyticsCards] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleExpandWidget = (widgetId: string) => {
    setExpandedWidget(expandedWidget === widgetId ? null : widgetId);
    setWidgetMenu(null);
  };

  const handleWidgetAction = (widgetId: string, action: string) => {
    console.log(`Widget ${widgetId} action: ${action}`);
    setWidgetMenu(null);
  };


  return (
    <div className={styles.overviewContainer}>
      {/* Quick Filters Bar */}
      <div className={styles.filtersContainer}>
        <div className={styles.filtersCard}>
          <div className={styles.filtersContent}>
            <div className={styles.searchContainer}>
              <div className={styles.searchWrapper}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search agents, campaigns, or metrics..."
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div className={styles.dropdownsContainer}>
              <select className={styles.select}>
                <option>All Teams</option>
                <option>Sales Team</option>
                <option>Support Team</option>
                <option>Marketing Team</option>
              </select>
              <select className={styles.select}>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Custom Range</option>
              </select>
              <select className={styles.select}>
                <option>All Campaigns</option>
                <option>Q4 Push</option>
                <option>Holiday Special</option>
                <option>New Product Launch</option>
              </select>
              <button 
                onClick={() => setShowFilters(true)}
                className={styles.advancedFiltersButton}
              >
                <Filter className="w-4 h-4" />
                <span>Advanced Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className={styles.mainContent}>
        {/* Top Row: Metrics and Performance Trends Side by Side */}
        <div className={styles.topRow} style={{ 
          display: 'flex', 
          flexDirection: isDesktop ? 'row' : 'column', 
          gap: '1.5rem' 
        }}>
          {/* Key Performance Metrics */}
          <div className={`${styles.metricsSection} ${expandedWidget === 'metrics' ? styles.expanded : ''}`} style={{ flex: 1 }}>
            <div className={`${styles.metricsCard} ${expandedWidget === 'metrics' ? styles.expanded : ''}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>Conversational Metrics</h3>
                  <p className={styles.cardSubtitle}>Core conversation quality and performance indicators</p>
                </div>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleExpandWidget('metrics')}
                    className={styles.actionButton}
                    title={expandedWidget === 'metrics' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'metrics' ? 
                      <Minimize2 className={styles.actionIcon} /> : 
                      <Maximize2 className={styles.actionIcon} />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('metrics')}
                      className={styles.actionButton}
                      title="More options"
                    >
                      <MoreHorizontal className={styles.actionIcon} />
                    </button>
                    {widgetMenu === 'metrics' && (
                      <div className={styles.widgetDropdown}>
                        <div className={styles.dropdownContent}>
                          <button
                            onClick={() => handleWidgetAction('metrics', 'refresh')}
                            className={styles.dropdownItem}
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('metrics', 'export')}
                            className={styles.dropdownItem}
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('metrics', 'settings')}
                            className={styles.dropdownItem}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Widget Settings</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
        </div>
            </div>
              <div className={styles.metricsGrid}>
                {/* Active Agents */}
                <div className={`${styles.metricCard} ${styles.blue}`}>
                  <div className={styles.metricHeader}>
                    <div className={`${styles.metricIcon} ${styles.blue}`}>
                      <Users className={styles.metricIconSvg} />
                    </div>
                    <BarChart3 className={styles.metricChartIcon} />
                  </div>
                  <div className={styles.metricValue}>12</div>
                  <div className={styles.metricLabel}>Active Agents</div>
                  <div className={styles.metricTrend}>
                    <svg className={`${styles.trendIcon} ${styles.positive}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`${styles.trendText} ${styles.positive}`}>+2 this month</span>
                  </div>
                </div>

                {/* Average Quality Score */}
                <div className={`${styles.metricCard} ${styles.green}`}>
                  <div className={styles.metricHeader}>
                    <div className={`${styles.metricIcon} ${styles.green}`}>
                      <Star className={styles.metricIconSvg} />
                    </div>
                    <BarChart3 className={styles.metricChartIcon} />
                  </div>
                  <div className={styles.metricValue}>91.2</div>
                  <div className={styles.metricLabel}>Average Quality Score</div>
                  <div className={styles.metricTrend}>
                    <svg className={`${styles.trendIcon} ${styles.positive}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`${styles.trendText} ${styles.positive}`}>+3.5% from last month</span>
                  </div>
                </div>

                {/* Total Conversations */}
                <div className={`${styles.metricCard} ${styles.purple}`}>
                  <div className={styles.metricHeader}>
                    <div className={`${styles.metricIcon} ${styles.purple}`}>
                      <MessageSquare className={styles.metricIconSvg} />
                    </div>
                    <BarChart3 className={styles.metricChartIcon} />
                  </div>
                  <div className={styles.metricValue}>1,247</div>
                  <div className={styles.metricLabel}>Total Conversations</div>
                  <div className={styles.metricTrend}>
                    <svg className={`${styles.trendIcon} ${styles.positive}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`${styles.trendText} ${styles.positive}`}>+15% this week</span>
                  </div>
                </div>

                {/* Average Duration */}
                <div className={`${styles.metricCard} ${styles.orange}`}>
                  <div className={styles.metricHeader}>
                    <div className={`${styles.metricIcon} ${styles.orange}`}>
                      <Clock className={styles.metricIconSvg} />
                    </div>
                    <BarChart3 className={styles.metricChartIcon} />
                  </div>
                  <div className={styles.metricValue}>9:45</div>
                  <div className={styles.metricLabel}>Average Duration</div>
                  <div className={styles.metricTrend}>
                    <svg className={`${styles.trendIcon} ${styles.positive}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`${styles.trendText} ${styles.positive}`}>-2 min from last week</span>
                  </div>
                </div>

                {/* Interruption Rate */}
                <div className={`${styles.metricCard} ${styles.red}`}>
                  <div className={styles.metricHeader}>
                    <div className={`${styles.metricIcon} ${styles.red}`}>
                      <AlertTriangle className={styles.metricIconSvg} />
                    </div>
                    <BarChart3 className={styles.metricChartIcon} />
                  </div>
                  <div className={styles.metricValue}>1.8</div>
                  <div className={styles.metricLabel}>Interruption Rate</div>
                  <div className={styles.metricTrend}>
                    <svg className={`${styles.trendIcon} ${styles.negative}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className={`${styles.trendText} ${styles.negative}`}>+0.3 from last month</span>
                  </div>
                </div>

                {/* Customer Satisfaction */}
                
              </div>
              
              {/* Summary Section */}
              <div className={styles.summarySection}>
                <div className={styles.summaryGrid}>
                  {/* Performance Summary */}
                  <div className={`${styles.summaryCard} ${styles.grayCard}`}>
                    <h4 className={`${styles.summaryTitle} ${styles.summaryTitleWithIcon}`}>
                      <BarChart3 className={`${styles.summaryIcon} ${styles.grayIcon}`} />
                      Performance Summary
                    </h4>
                    <div className={styles.summaryList}>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Team Efficiency</span>
                        <span className={`${styles.summaryValue} ${styles.positive}`}>↑ 8.2%</span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Quality Consistency</span>
                        <span className={`${styles.summaryValue} ${styles.positive}`}>↑ 5.1%</span>
                      </div>
                      <div className={styles.summaryItem}>
                        <span className={styles.summaryLabel}>Response Time</span>
                        <span className={`${styles.summaryValue} ${styles.negative}`}>↑ 12%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Insights */}
                  <div className={`${styles.summaryCard} ${styles.blueCard}`}>
                    <h4 className={`${styles.summaryTitle} ${styles.summaryTitleWithIcon}`}>
                      <Activity className={`${styles.summaryIcon} ${styles.blueIcon}`} />
                      Quick Insights
                    </h4>
                    <div className={styles.summaryList}>
                      <div className={styles.insightItem}>
                        <div className={`${styles.insightDot} ${styles.greenDot}`}></div>
                        <span className={styles.insightText}>Quality scores above team average</span>
                      </div>
                      <div className={styles.insightItem}>
                        <div className={`${styles.insightDot} ${styles.yellowDot}`}></div>
                        <span className={styles.insightText}>Monitor interruption patterns</span>
                      </div>
                      <div className={styles.insightItem}>
                        <div className={`${styles.insightDot} ${styles.blueDot}`}></div>
                        <span className={styles.insightText}>Conversation volume trending up</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>

          {/* Trend Analysis */}
          <div className={`${styles.metricsSection} ${expandedWidget === 'trends' ? styles.expanded : ''}`} style={{ flex: 1 }}>
            <div className={`${styles.metricsCard} ${expandedWidget === 'trends' ? styles.expanded : ''}`}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.cardTitle}>Trend Analysis</h3>
                  <p className={styles.cardSubtitle}>Team performance trends over time</p>
                </div>
                <div className={styles.cardActions}>
                  <button
                    onClick={() => handleExpandWidget('trends')}
                    className={styles.actionButton}
                    title={expandedWidget === 'trends' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'trends' ? 
                      <Minimize2 className={styles.actionIcon} /> : 
                      <Maximize2 className={styles.actionIcon} />
                    }
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setWidgetMenu('trends')}
                      className={styles.actionButton}
                      title="More options"
                    >
                      <MoreHorizontal className={styles.actionIcon} />
                    </button>
                    {widgetMenu === 'trends' && (
                      <div className={styles.widgetDropdown}>
                        <div className={styles.dropdownContent}>
                          <button
                            onClick={() => handleWidgetAction('trends', 'refresh')}
                            className={styles.dropdownItem}
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('trends', 'export')}
                            className={styles.dropdownItem}
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Chart</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('trends', 'settings')}
                            className={styles.dropdownItem}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Chart Settings</span>
                          </button>
                </div>
              </div>
                    )}
            </div>
        </div>
      </div>
              
              {/* Combined Trend Analysis Chart */}
              <div className={styles.chartContainer}>
                <div className={styles.chartWrapper}>
                  <div className={styles.chartArea}>
                    <svg width="100%" height="100%" viewBox="0 0 500 200" className="overflow-visible">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid-combined" width="50" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid-combined)" />
                      
                      {/* Y-axis labels */}
                      <text x="15" y="25" textAnchor="start" className={styles.chartLabel}>100%</text>
                      <text x="15" y="65" textAnchor="start" className={styles.chartLabel}>75%</text>
                      <text x="15" y="105" textAnchor="start" className={styles.chartLabel}>50%</text>
                      <text x="15" y="145" textAnchor="start" className={styles.chartLabel}>25%</text>
                      <text x="15" y="185" textAnchor="start" className={styles.chartLabel}>0%</text>
                      
                      {/* Avg Talk Ratio (Blue) */}
                      <polyline
                        points="80,120 140,110 200,100 260,90 320,80 380,70"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="120" r="3" fill="#3b82f6" />
                      <circle cx="140" cy="110" r="3" fill="#3b82f6" />
                      <circle cx="200" cy="100" r="3" fill="#3b82f6" />
                      <circle cx="260" cy="90" r="3" fill="#3b82f6" />
                      <circle cx="320" cy="80" r="3" fill="#3b82f6" />
                      <circle cx="380" cy="70" r="3" fill="#3b82f6" />
                      
                      {/* Avg Interruptions (Gray) */}
                      <polyline
                        points="80,60 140,62 200,60 260,58 320,60 380,59"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="60" r="3" fill="#6b7280" />
                      <circle cx="140" cy="62" r="3" fill="#6b7280" />
                      <circle cx="200" cy="60" r="3" fill="#6b7280" />
                      <circle cx="260" cy="58" r="3" fill="#6b7280" />
                      <circle cx="320" cy="60" r="3" fill="#6b7280" />
                      <circle cx="380" cy="59" r="3" fill="#6b7280" />
                      
                      {/* Avg Quality Score (Green) */}
                      <polyline
                        points="80,90 140,80 200,70 260,60 320,50 380,40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="90" r="3" fill="#10b981" />
                      <circle cx="140" cy="80" r="3" fill="#10b981" />
                      <circle cx="200" cy="70" r="3" fill="#10b981" />
                      <circle cx="260" cy="60" r="3" fill="#10b981" />
                      <circle cx="320" cy="50" r="3" fill="#10b981" />
                      <circle cx="380" cy="40" r="3" fill="#10b981" />
                      
                      {/* Total Conversations (Purple) */}
                      <polyline
                        points="80,150 140,140 200,130 260,120 320,110 380,100"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="3"
                      />
                      <circle cx="80" cy="150" r="3" fill="#8b5cf6" />
                      <circle cx="140" cy="140" r="3" fill="#8b5cf6" />
                      <circle cx="200" cy="130" r="3" fill="#8b5cf6" />
                      <circle cx="260" cy="120" r="3" fill="#8b5cf6" />
                      <circle cx="320" cy="110" r="3" fill="#8b5cf6" />
                      <circle cx="380" cy="100" r="3" fill="#8b5cf6" />
                      
                      {/* X-axis labels */}
                      <text x="80" y="195" textAnchor="middle" className={styles.chartLabel}>Mon</text>
                      <text x="140" y="195" textAnchor="middle" className={styles.chartLabel}>Tue</text>
                      <text x="200" y="195" textAnchor="middle" className={styles.chartLabel}>Wed</text>
                      <text x="260" y="195" textAnchor="middle" className={styles.chartLabel}>Thu</text>
                      <text x="320" y="195" textAnchor="middle" className={styles.chartLabel}>Fri</text>
                      <text x="380" y="195" textAnchor="middle" className={styles.chartLabel}>Sat</text>
                    </svg>
            </div>
                  
                  {/* Legend */}
                  <div className={styles.chartLegend}>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.blue}`}></div>
                      <span className={styles.legendText}>Avg Talk Ratio (60%)</span>
                      <svg className={`${styles.legendIcon} ${styles.red}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.gray}`}></div>
                      <span className={styles.legendText}>Avg Interruptions (1.9)</span>
                      <svg className={`${styles.legendIcon} ${styles.gray}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.green}`}></div>
                      <span className={styles.legendText}>Avg Quality Score (91)</span>
                      <svg className={`${styles.legendIcon} ${styles.green}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className={styles.legendItem}>
                      <div className={`${styles.legendDot} ${styles.purple}`}></div>
                      <span className={styles.legendText}>Total Conversations (693)</span>
                      <svg className={`${styles.legendIcon} ${styles.green}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

        {/* Call Quality Analytics */}
        <div className={`${styles.analyticsSection} ${expandedWidget === 'analytics' ? styles.expanded : ''} ${expandedWidget === 'metrics' ? styles.hidden : ''} ${expandedWidget === 'trends' ? styles.hidden : ''}`}>
          <div className={`${styles.analyticsCard} ${expandedWidget === 'analytics' ? styles.expandedCard : ''}`}>
          <div className={styles.analyticsHeader}>
            <div>
              <h3 className={styles.analyticsTitle}>Conversational Analysis</h3>
              <p className={styles.analyticsSubtitle}>Advanced conversation flow metrics and coaching insights</p>
            </div>
                <div className={styles.analyticsActions}>
              <button 
                onClick={() => setShowAnalyticsCards(!showAnalyticsCards)}
                className={styles.analyticsViewButton}
              >
                <Eye className={styles.analyticsIcon} />
                <span>{showAnalyticsCards ? 'Hide Insights' : 'View Insights'}</span>
              </button>
              <div className={styles.analyticsControlButtons}>
                <button
                  onClick={() => handleExpandWidget('analytics')}
                  className={styles.analyticsControlButton}
                  title={expandedWidget === 'analytics' ? 'Minimize' : 'Maximize'}
                >
                  {expandedWidget === 'analytics' ? 
                    <Minimize2 className={styles.analyticsControlIcon} /> : 
                    <Maximize2 className={styles.analyticsControlIcon} />
                  }
                </button>
                <div className={styles.analyticsDropdownContainer}>
                  <button
                    onClick={() => setWidgetMenu('analytics')}
                    className={styles.analyticsControlButton}
                    title="More options"
                  >
                    <MoreHorizontal className={styles.analyticsControlIcon} />
                  </button>
                  {widgetMenu === 'analytics' && (
                    <div className={styles.analyticsDropdown}>
                      <div className={styles.analyticsDropdownContent}>
                        <button
                          onClick={() => handleWidgetAction('analytics', 'refresh')}
                          className={styles.analyticsDropdownItem}
                        >
                          <RefreshCw className={styles.analyticsDropdownIcon} />
                          <span>Refresh Data</span>
                        </button>
                        <button
                          onClick={() => handleWidgetAction('analytics', 'export')}
                          className={styles.analyticsDropdownItem}
                        >
                          <Download className={styles.analyticsDropdownIcon} />
                          <span>Export Analytics</span>
                        </button>
                        <button
                          onClick={() => handleWidgetAction('analytics', 'settings')}
                          className={styles.analyticsDropdownItem}
                        >
                          <Settings className={styles.analyticsDropdownIcon} />
                          <span>Analytics Settings</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
                </div>
        </div>

          {!showAnalyticsCards ? (
            <div className={styles.analyticsCardsGrid}>
              {/* Flow Analysis */}
              <div className={`${styles.analyticsCard} ${styles.blueCard}`}>
                <div className={styles.analyticsCardHeader}>
                  <div className={`${styles.analyticsCardIcon} ${styles.blueIcon}`}>
                    <BarChart3 className={styles.analyticsCardIconSvg} />
                </div>
                  <span className={`${styles.analyticsCardStatus} ${styles.blueStatus}`}>Good</span>
              </div>
                <div className={`${styles.analyticsCardValue} ${styles.blueValue}`}>78%</div>
                <div className={`${styles.analyticsCardLabel} ${styles.blueLabel}`}>Flow Quality Score</div>
                <div className={`${styles.analyticsCardTrend} ${styles.blueTrend}`}>+3% from last week</div>
            </div>

              {/* Content Analysis */}
              <div className={`${styles.analyticsCard} ${styles.greenCard}`}>
                <div className={styles.analyticsCardHeader}>
                  <div className={`${styles.analyticsCardIcon} ${styles.greenIcon}`}>
                    <Target className={styles.analyticsCardIconSvg} />
                </div>
                  <span className={`${styles.analyticsCardStatus} ${styles.greenStatus}`}>Excellent</span>
              </div>
                <div className={`${styles.analyticsCardValue} ${styles.greenValue}`}>92%</div>
                <div className={`${styles.analyticsCardLabel} ${styles.greenLabel}`}>Content Relevance</div>
                <div className={`${styles.analyticsCardTrend} ${styles.greenTrend}`}>+5% from last week</div>
            </div>

              {/* Sentiment Analysis */}
              <div className={`${styles.analyticsCard} ${styles.purpleCard}`}>
                <div className={styles.analyticsCardHeader}>
                  <div className={`${styles.analyticsCardIcon} ${styles.purpleIcon}`}>
                    <Activity className={styles.analyticsCardIconSvg} />
                </div>
                  <span className={`${styles.analyticsCardStatus} ${styles.purpleStatus}`}>Positive</span>
              </div>
                <div className={`${styles.analyticsCardValue} ${styles.purpleValue}`}>85%</div>
                <div className={`${styles.analyticsCardLabel} ${styles.purpleLabel}`}>Positive Sentiment</div>
                <div className={`${styles.analyticsCardTrend} ${styles.purpleTrend}`}>+2% from last week</div>
            </div>
          </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Flow Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-blue-50 px-4 py-3 rounded-lg">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  Flow Metrics
                </h4>
                <div className="space-y-6">
                  {/* Talk Ratio Distribution (Box Plot) */}
                  <div className="pb-6 border-b border-gray-200">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-blue-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Talk Ratio Distribution</h5>
                      </div>
                      <div className="border-b border-blue-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100">
                      <div className="h-32 bg-white rounded-lg p-4 shadow-sm">
                        <svg width="100%" height="100%" viewBox="0 0 240 80">
                          <g transform="translate(30, 15)">
                          {/* Y-axis */}
                            <line x1="0" y1="0" x2="0" y2="50" stroke="#374151" strokeWidth="1.5"/>
                            <text x="-8" y="5" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">100%</text>
                            <text x="-8" y="25" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">50%</text>
                            <text x="-8" y="45" fontSize="9" fill="#6B7280" textAnchor="end" fontWeight="500">0%</text>
                            
                          {/* X-axis */}
                            <line x1="0" y1="50" x2="180" y2="50" stroke="#374151" strokeWidth="1.5"/>
                            <text x="30" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">40%</text>
                            <text x="70" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">60%</text>
                            <text x="110" y="65" fontSize="9" fill="#6B7280" textAnchor="middle" fontWeight="500">80%</text>
                            
                            {/* Box plot */}
                            <rect x="60" y="25" width="50" height="25" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="1.5" rx="2"/>
                            <line x1="85" y1="25" x2="85" y2="50" stroke="#1E40AF" strokeWidth="2.5"/>
                            <line x1="40" y1="37" x2="60" y2="37" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="110" y1="37" x2="130" y2="37" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="40" y1="32" x2="40" y2="42" stroke="#3B82F6" strokeWidth="2"/>
                            <line x1="130" y1="32" x2="130" y2="42" stroke="#3B82F6" strokeWidth="2"/>
                            
                            {/* Outliers */}
                            <circle cx="150" cy="20" r="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
                            <circle cx="160" cy="15" r="4" fill="#EF4444" stroke="#DC2626" strokeWidth="1"/>
                            
                            {/* Grid lines */}
                            <line x1="0" y1="25" x2="180" y2="25" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2,2"/>
                            <line x1="0" y1="37" x2="180" y2="37" stroke="#E5E7EB" strokeWidth="0.5" strokeDasharray="2,2"/>
                        </g>
                      </svg>
                        
                        {/* Enhanced Legend */}
                        <div className="flex justify-center space-x-6 mt-3 text-xs">
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-300 rounded border border-blue-400"></div>
                            <span className="text-gray-700 font-medium">Q1-Q3 Range</span>
            </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-800 rounded"></div>
                            <span className="text-gray-700 font-medium">Median</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full border border-red-600"></div>
                            <span className="text-gray-700 font-medium">Outliers</span>
                          </div>
                        </div>
                      </div>
        </div>
      </div>

                  {/* Coaching Leaderboards */}
                  <div className="pb-6 border-b border-gray-200">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Coaching Leaderboards</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Monologue Frequency Leaderboard */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-orange-100">
                        <h6 className="text-xs font-medium text-gray-700 mb-3 text-center flex items-center justify-center space-x-1">
                          <MessageSquare className="w-3 h-3 text-orange-600" />
                          <span>Monologue Frequency</span>
                        </h6>
                        <div className="space-y-2">
                          {agents.sort((a, b) => a.monologues - b.monologues).map((agent, index) => (
                            <div 
                              key={agent.id} 
                              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowAgentDetails(true);
                              }}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 
                                index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}>
                                  {index + 1}
            </div>
                              <div className="flex-1">
                                <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                                <div className="text-xs text-gray-600">{agent.calls} calls</div>
          </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{agent.monologues}</div>
                                <div className="text-xs text-gray-500">per call</div>
                              </div>
                              <div className="w-12">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${
                                    agent.monologues <= 2 ? 'bg-green-500' :
                                    agent.monologues <= 3 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} style={{ width: `${Math.min(agent.monologues * 20, 100)}%` }}></div>
                                </div>
                              </div>
            </div>
                          ))}
            </div>
          </div>
          
                      {/* Interruption Rate Leaderboard */}
                      <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                        <h6 className="text-xs font-medium text-gray-700 mb-3 text-center flex items-center justify-center space-x-1">
                          <AlertTriangle className="w-3 h-3 text-purple-600" />
                          <span>Interruption Rate</span>
                        </h6>
                        <div className="space-y-2">
                          {agents.sort((a, b) => a.interruptions - b.interruptions).map((agent, index) => (
                            <div 
                              key={agent.id} 
                              className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowAgentDetails(true);
                              }}
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                                index === 0 ? 'bg-green-500' : 
                                index === 1 ? 'bg-blue-500' : 
                                index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                                }`}>
                                  {index + 1}
            </div>
                              <div className="flex-1">
                                <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                                <div className="text-xs text-gray-600">{agent.calls} calls</div>
          </div>
                              <div className="text-right">
                                <div className="text-sm font-bold text-gray-900">{agent.interruptions}</div>
                                <div className="text-xs text-gray-500">per call</div>
                              </div>
                              <div className="w-12">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div className={`h-1.5 rounded-full ${
                                    agent.interruptions <= 1 ? 'bg-green-500' :
                                    agent.interruptions <= 2 ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} style={{ width: `${Math.min(agent.interruptions * 25, 100)}%` }}></div>
                                </div>
                              </div>
        </div>
              ))}
            </div>
            </div>
          </div>
        </div>

                  {/* Rep vs Team Average Radar Chart */}
              <div>
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Rep vs Team Average</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="h-40 bg-white rounded-lg p-4 shadow-sm flex items-center justify-center">
                        <svg width="140" height="140" viewBox="0 0 140 140">
                          <g transform="translate(70, 70)">
                          {/* Radar chart grid */}
                          {[1, 2, 3, 4, 5].map(ring => (
                            <polygon
                              key={ring}
                                points="0,-50 43.3,-25 43.3,25 0,50 -43.3,25 -43.3,-25"
                              fill="none"
                                stroke="#E5E7EB"
                                strokeWidth="1.5"
                              transform={`scale(${ring * 0.2})`}
                            />
                          ))}
                          
                          {/* Radar chart axes */}
                          {[0, 1, 2, 3, 4, 5].map(i => (
                            <line
                              key={i}
                              x1="0"
                              y1="0"
                                x2={50 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)}
                                y2={50 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}
                                stroke="#E5E7EB"
                                strokeWidth="1.5"
                            />
                          ))}
                          
                          {/* Team average (blue) */}
                          <polygon
                              points="0,-40 34.6,-20 34.6,20 0,40 -34.6,20 -34.6,-20"
                              fill="rgba(59, 130, 246, 0.4)"
                              stroke="#3B82F6"
                              strokeWidth="2.5"
                          />
                          
                          {/* Individual agent (red) */}
                          <polygon
                              points="0,-45 39.0,-22.5 39.0,22.5 0,45 -39.0,22.5 -39.0,-22.5"
                              fill="rgba(239, 68, 68, 0.4)"
                              stroke="#EF4444"
                              strokeWidth="2.5"
                            />
                            
                            {/* Center dot */}
                            <circle cx="0" cy="0" r="3" fill="#374151"/>
                        </g>
                      </svg>
                        
                        {/* Enhanced Legend */}
                        <div className="ml-6 flex flex-col space-y-3 text-xs">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-blue-500 rounded border border-blue-600"></div>
                            <span className="text-gray-700 font-medium">Team Average</span>
              </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-red-500 rounded border border-red-600"></div>
                            <span className="text-gray-700 font-medium">Priya Sharma</span>
                          </div>
              </div>
            </div>
                    </div>
            </div>

          </div>
        </div>

              {/* Content Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-green-50 px-4 py-3 rounded-lg">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Content Metrics
                </h4>
                <div className="space-y-6">
                  {/* FR-DV-4.4: Keyword & Competitor Heatmap */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <BarChart3 className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Keyword & Competitor Heatmap</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-green-100">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Competitor Mentions */}
                        <div>
                          <h6 className="text-xs font-medium text-gray-600 mb-2 text-center">Competitor Mentions</h6>
                          <div className="space-y-2">
                            {[
                              { name: 'Competitor A', mentions: 45, intensity: 'high' },
                              { name: 'Competitor B', mentions: 32, intensity: 'medium' },
                              { name: 'Competitor C', mentions: 18, intensity: 'low' }
                            ].map((competitor, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                                <span className="text-xs font-medium text-gray-700">{competitor.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-600">{competitor.mentions}</span>
                                  <div className={`w-3 h-3 rounded-full ${
                                    competitor.intensity === 'high' ? 'bg-red-500' :
                                    competitor.intensity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                                  }`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Product Mentions */}
                        <div>
                          <h6 className="text-xs font-medium text-gray-600 mb-2 text-center">Product Mentions</h6>
                          <div className="space-y-2">
                            {[
                              { name: 'Product X', mentions: 67, intensity: 'high' },
                              { name: 'Product Y', mentions: 43, intensity: 'medium' },
                              { name: 'Product Z', mentions: 25, intensity: 'low' }
                            ].map((product, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
                                <span className="text-xs font-medium text-gray-700">{product.name}</span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-600">{product.mentions}</span>
                                  <div className={`w-3 h-3 rounded-full ${
                                    product.intensity === 'high' ? 'bg-blue-500' :
                                    product.intensity === 'medium' ? 'bg-blue-400' : 'bg-blue-300'
                                  }`}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FR-DV-4.5: Intent Distribution Chart */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Intent Distribution</h5>
                      </div>
                      <div className="border-b border-blue-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-blue-100">
                      <div className="space-y-3">
                        {[
                          { intent: 'Objection Handling', percentage: 35, color: 'bg-red-500' },
                          { intent: 'Product Inquiry', percentage: 28, color: 'bg-blue-500' },
                          { intent: 'Technical Support', percentage: 22, color: 'bg-green-500' },
                          { intent: 'Billing Questions', percentage: 15, color: 'bg-yellow-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                            <div className="w-32 text-xs font-medium text-gray-700">{item.intent}</div>
                            <div className="flex-1 bg-white rounded-full h-4 border">
                        <div 
                                className={`${item.color} h-4 rounded-full flex items-center justify-end pr-2`}
                                style={{ width: `${item.percentage}%` }}
                        >
                                <span className="text-white text-xs font-medium">{item.percentage}%</span>
              </div>
            </div>
                </div>
                  ))}
                      </div>
                    </div>
                  </div>

                  {/* FR-DV-4.6: Trending Topics */}
                  <div>
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Trending Topics</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="space-y-3">
                        {[
                          { topic: 'AI Integration', trend: 'up', mentions: 89, change: '+12%' },
                          { topic: 'Security Concerns', trend: 'up', mentions: 67, change: '+8%' },
                          { topic: 'Pricing Questions', trend: 'down', mentions: 45, change: '-3%' },
                          { topic: 'Feature Requests', trend: 'up', mentions: 78, change: '+15%' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-2 h-2 rounded-full ${
                                item.trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <span className="text-sm font-medium text-gray-700">{item.topic}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="text-xs text-gray-600">{item.mentions} mentions</span>
                              <span className={`text-xs font-medium ${
                                item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                              }`}>{item.change}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sentiment Analysis Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 pb-3 border-b border-gray-200 flex items-center bg-purple-50 px-4 py-3 rounded-lg">
                  <Activity className="w-5 h-5 mr-2 text-purple-600" />
                  Sentiment Distribution
                </h4>
                <div className="space-y-6">
                  {/* FR-DV-4.4: Sentiment Distribution */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Activity className="w-4 h-4 text-purple-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Sentiment Distribution</h5>
                      </div>
                      <div className="border-b border-purple-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-purple-100">
                      <div className="space-y-3">
                        {[
                          { label: 'Positive', value: 70, color: 'bg-green-500' },
                          { label: 'Neutral', value: 20, color: 'bg-yellow-500' },
                          { label: 'Negative', value: 10, color: 'bg-red-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                            <div className="w-20 text-sm font-medium text-gray-700">{item.label}</div>
                            <div className="flex-1 bg-white rounded-full h-6 border">
                        <div 
                          className={`${item.color} h-6 rounded-full flex items-center justify-end pr-2`}
                          style={{ width: `${item.value}%` }}
                        >
                          <span className="text-white text-sm font-medium">{item.value}%</span>
                  </div>
                  </div>
                  </div>
                  ))}
            </div>
          </div>
            </div>

                  {/* FR-DV-4.5: Escalation Rate Trend */}
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-red-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Escalation Rate Trend</h5>
          </div>
                      <div className="border-b border-red-200 mt-1"></div>
        </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-red-100">
                      <div className="h-24 bg-white rounded-lg p-3">
                        <svg width="100%" height="100%" viewBox="0 0 200 60">
                          <g transform="translate(20, 10)">
                            {/* Y-axis */}
                            <line x1="0" y1="0" x2="0" y2="40" stroke="#374151" strokeWidth="1.5"/>
                            <text x="-5" y="5" fontSize="8" fill="#6B7280" textAnchor="end">25%</text>
                            <text x="-5" y="25" fontSize="8" fill="#6B7280" textAnchor="end">15%</text>
                            <text x="-5" y="45" fontSize="8" fill="#6B7280" textAnchor="end">5%</text>
                            
                            {/* X-axis */}
                            <line x1="0" y1="40" x2="160" y2="40" stroke="#374151" strokeWidth="1.5"/>
                            <text x="20" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Mon</text>
                            <text x="60" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Tue</text>
                            <text x="100" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Wed</text>
                            <text x="140" y="55" fontSize="8" fill="#6B7280" textAnchor="middle">Thu</text>
                            
                            {/* Escalation trend line */}
                            <polyline
                              points="20,35 40,30 60,25 80,20 100,18 120,15 140,12"
                              fill="none"
                              stroke="#EF4444"
                              strokeWidth="2"
                            />
                            
                            {/* Data points */}
                            <circle cx="20" cy="35" r="3" fill="#EF4444"/>
                            <circle cx="40" cy="30" r="3" fill="#EF4444"/>
                            <circle cx="60" cy="25" r="3" fill="#EF4444"/>
                            <circle cx="80" cy="20" r="3" fill="#EF4444"/>
                            <circle cx="100" cy="18" r="3" fill="#EF4444"/>
                            <circle cx="120" cy="15" r="3" fill="#EF4444"/>
                            <circle cx="140" cy="12" r="3" fill="#EF4444"/>
                          </g>
                        </svg>
              </div>
                      <div className="mt-2 text-center">
                        <span className="text-xs text-gray-600">Escalation rate decreasing: 18% → 12%</span>
            </div>
                    </div>
                  </div>

                  {/* FR-DV-4.6: Agent Empathy Leaderboard */}
                  <div>
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <h5 className="text-sm font-medium text-gray-700 inline-block">Agent Empathy Leaderboard</h5>
                      </div>
                      <div className="border-b border-green-200 mt-1"></div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-green-100">
                      <div className="space-y-2">
                        {agents.sort((a, b) => b.score - a.score).map((agent, index) => (
                          <div 
                            key={agent.id} 
                            className="flex items-center space-x-3 p-2 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setShowAgentDetails(true);
                            }}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                              index === 0 ? 'bg-green-500' : 
                              index === 1 ? 'bg-blue-500' : 
                              index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}>
                              {index + 1}
                  </div>
                  <div className="flex-1">
                              <div className="text-xs font-medium text-gray-900">{agent.name}</div>
                              <div className="text-xs text-gray-600">{agent.calls} calls</div>
                  </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-gray-900">{agent.score}</div>
                              <div className="text-xs text-gray-500">empathy score</div>
                            </div>
                            <div className="w-12">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div className={`h-1.5 rounded-full ${
                                  agent.score >= 90 ? 'bg-green-500' :
                                  agent.score >= 80 ? 'bg-blue-500' :
                                  agent.score >= 70 ? 'bg-yellow-500' :
                                  'bg-red-500'
                                }`} style={{ width: `${agent.score}%` }}></div>
                              </div>
                            </div>
                </div>
              ))}
                      </div>
                    </div>
                  </div>
                </div>
          </div>
            </div>
          )}
            </div>
          </div>

        {/* Third Row: Performance Leaderboards */}
        <div className={styles.leaderboardsGrid}>

          {/* FR-DV-4.4: Talk-to-Listen Ratio Leaderboard */}
          <div className={`${styles.leaderboardSection} ${expandedWidget === 'talkListenLeaderboard' ? styles.expanded : ''}`}>
            <div className={`${styles.leaderboardCard} ${styles.orangeCard} ${expandedWidget === 'talkListenLeaderboard' ? styles.expandedCard : ''}`}>
              <div className={styles.leaderboardHeader}>
                <div>
                  <h3 className={styles.leaderboardTitle}>Talk-to-Listen Ratio Leaderboard</h3>
                  <p className={styles.leaderboardSubtitle}>Best performing agents by conversation balance</p>
                </div>
              <div className={styles.leaderboardActions}>
                  <button
                    onClick={() => handleExpandWidget('talkListenLeaderboard')}
                    className={styles.leaderboardActionButton}
                    title={expandedWidget === 'talkListenLeaderboard' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'talkListenLeaderboard' ? 
                      <Minimize2 className={styles.leaderboardActionIcon} /> : 
                      <Maximize2 className={styles.leaderboardActionIcon} />
                    }
                  </button>
                  <div className={styles.leaderboardDropdownContainer}>
                    <button
                      onClick={() => setWidgetMenu('talkListenLeaderboard')}
                      className={styles.leaderboardActionButton}
                      title="More options"
                    >
                      <MoreHorizontal className={styles.leaderboardActionIcon} />
                    </button>
                    {widgetMenu === 'talkListenLeaderboard' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'refresh')}
                            className={styles.dropdownItem}
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'export')}
                            className={styles.dropdownItem}
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Leaderboard</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('talkListenLeaderboard', 'settings')}
                            className={styles.dropdownItem}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Leaderboard Settings</span>
                          </button>
              </div>
            </div>
                    )}
                  </div>
            </div>
          </div>

            <div className={styles.leaderboardItems}>
                {agents.sort((a, b) => b.talkRatio - a.talkRatio).map((agent, index) => (
                <div 
                  key={agent.id} 
                  className={styles.leaderboardItem}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setShowAgentDetails(true);
                  }}
                >
                  <div className={`${styles.leaderboardRank} ${
                    index === 0 ? styles.firstPlace :
                    index === 1 ? styles.secondPlace :
                    index === 2 ? styles.thirdPlace : styles.otherPlace
                  }`}>
                    {index + 1}
                  </div>
                  <div className={styles.leaderboardAgentInfo}>
                    <div className={styles.leaderboardAgentName}>{agent.name}</div>
                    <div className={styles.leaderboardAgentStats}>{agent.calls} calls • {agent.satisfaction}★ rating</div>
                  </div>
                  <div className={styles.leaderboardAgentScore}>
                      <div className={styles.leaderboardScoreValue}>{agent.talkRatio}%</div>
                      <div className={styles.leaderboardScoreLabel}>Talk Ratio</div>
                    </div>
                    <div className={styles.leaderboardProgressContainer}>
                      <div className={styles.leaderboardProgressBar}>
                        <div 
                          className={styles.leaderboardProgressFill} 
                          style={{ width: `${agent.talkRatio}%` }}
                        ></div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* FR-DV-4.4: Interruption Count Leaderboard */}
          <div className={`${styles.leaderboardSection} ${expandedWidget === 'interruptionLeaderboard' ? styles.expanded : ''}`}>
            <div className={`${styles.leaderboardCard} ${styles.redCard} ${expandedWidget === 'interruptionLeaderboard' ? styles.expandedCard : ''}`}>
              <div className={styles.leaderboardHeader}>
                <div>
                  <h3 className={styles.leaderboardTitle}>Lowest Interruption Count</h3>
                  <p className={styles.leaderboardSubtitle}>Agents with best listening skills</p>
                </div>
            <div className={styles.leaderboardActions}>
                  <button
                    onClick={() => handleExpandWidget('interruptionLeaderboard')}
                    className={styles.leaderboardActionButton}
                    title={expandedWidget === 'interruptionLeaderboard' ? 'Minimize' : 'Maximize'}
                  >
                    {expandedWidget === 'interruptionLeaderboard' ? 
                      <Minimize2 className={styles.leaderboardActionIcon} /> : 
                      <Maximize2 className={styles.leaderboardActionIcon} />
                    }
                  </button>
                  <div className={styles.leaderboardDropdownContainer}>
                    <button
                      onClick={() => setWidgetMenu('interruptionLeaderboard')}
                      className={styles.leaderboardActionButton}
                      title="More options"
                    >
                      <MoreHorizontal className={styles.leaderboardActionIcon} />
                    </button>
                    {widgetMenu === 'interruptionLeaderboard' && (
                      <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                        <div className="py-1">
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'refresh')}
                            className={styles.dropdownItem}
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span>Refresh Data</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'export')}
                            className={styles.dropdownItem}
                          >
                            <Download className="w-4 h-4" />
                            <span>Export Leaderboard</span>
                          </button>
                          <button
                            onClick={() => handleWidgetAction('interruptionLeaderboard', 'settings')}
                            className={styles.dropdownItem}
                          >
                            <Settings className="w-4 h-4" />
                            <span>Leaderboard Settings</span>
                          </button>
            </div>
          </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className={styles.leaderboardItems}>
                {agents.sort((a, b) => a.interruptions - b.interruptions).map((agent, index) => (
                  <div 
                    key={agent.id} 
                    className={styles.leaderboardItem}
                    onClick={() => {
                      setSelectedAgent(agent);
                      setShowAgentDetails(true);
                    }}
                  >
                    <div className={`${styles.leaderboardRank} ${
                      index === 0 ? styles.firstPlace :
                      index === 1 ? styles.secondPlace :
                      index === 2 ? styles.thirdPlace : styles.otherPlace
                    }`}>
                      {index + 1}
                    </div>
                    <div className={styles.leaderboardAgentInfo}>
                      <div className={styles.leaderboardAgentName}>{agent.name}</div>
                      <div className={styles.leaderboardAgentStats}>{agent.calls} calls • {agent.satisfaction}★ rating</div>
                    </div>
                    <div className={styles.leaderboardAgentScore}>
                      <div className={styles.leaderboardScoreValue}>{agent.interruptions}</div>
                      <div className={styles.leaderboardScoreLabel}>Interruptions</div>
                    </div>
                    <div className={styles.leaderboardProgressContainer}>
                      <div className={styles.leaderboardProgressBar}>
                        <div 
                          className={`${styles.leaderboardProgressFill} ${
                            agent.interruptions <= 1 ? styles.goodProgress :
                            agent.interruptions <= 2 ? styles.warningProgress : styles.badProgress
                          }`}
                          style={{ width: `${Math.min(agent.interruptions * 20, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
          </div>
        </div>
        </div>

      </div>


      {/* Advanced Filters Side Drawer */}
      {showFilters && (
        <div className={styles.sideDrawerBackdrop}>
          <div className={styles.sideDrawerOverlay} onClick={() => setShowFilters(false)}></div>
          <div className={styles.sideDrawerPanel}>
            <div className={styles.sideDrawerContent}>
              <div className={styles.sideDrawerHeader}>
                <h3 className={styles.sideDrawerTitle}>Advanced Filters</h3>
                <button 
                  onClick={() => setShowFilters(false)}
                  className={styles.sideDrawerCloseButton}
                >
                  <X className={styles.sideDrawerCloseIcon} />
                </button>
              </div>
              <div className={styles.sideDrawerBody}>
                <div className={styles.sideDrawerSection}>
                  <label className={styles.sideDrawerLabel}>Date Range</label>
                  <select className={styles.sideDrawerSelect}>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom Range</option>
                  </select>
                  
                  {/* Custom Date Range */}
                  <div className={styles.customDateRange}>
                    <h4 className={styles.customDateRangeTitle}>Custom Date Range</h4>
                    <div className={styles.dateRangeGrid}>
                      <div>
                        <label className={styles.dateRangeLabel}>From Date</label>
                        <input 
                          type="date" 
                          className={styles.dateRangeInput}
                          defaultValue="2024-01-01"
                        />
                      </div>
                      <div>
                        <label className={styles.dateRangeLabel}>To Date</label>
                        <input 
                          type="date" 
                          className={styles.dateRangeInput}
                          defaultValue="2024-01-31"
                        />
                      </div>
                    </div>
                    <div className={styles.dateRangeActions}>
                      <button className={styles.dateRangeButton}>
                        Apply
                      </button>
                      <button className={styles.dateRangeButtonSecondary}>
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.sideDrawerSection}>
                  <label className={styles.sideDrawerLabel}>Team</label>
                  <div className={styles.filterChips}>
                    <button className={`${styles.filterChip} ${styles.filterChipActive}`}>
                      All Teams
                    </button>
                    <button className={styles.filterChip}>
                      Sales Team
                    </button>
                    <button className={styles.filterChip}>
                      Support Team
                    </button>
                    <button className={styles.filterChip}>
                      Marketing Team
                    </button>
                  </div>
                </div>
                <div className={styles.sideDrawerSection}>
                  <label className={styles.sideDrawerLabel}>Agent</label>
                  <div className={styles.filterChips}>
                    <button className={`${styles.filterChip} ${styles.filterChipActive}`}>
                      All Agents
                    </button>
                    {agents.slice(0, 4).map(agent => (
                      <button key={agent.id} className={styles.filterChip}>
                        {agent.name}
                      </button>
                    ))}
                    <button className={styles.filterChipMore}>
                      +{agents.length - 4} more
                    </button>
                  </div>
                </div>
                <div className={styles.sideDrawerSection}>
                  <label className={styles.sideDrawerLabel}>Performance Score</label>
                  <div className={styles.filterChips}>
                    <button className={`${styles.filterChip} ${styles.filterChipActive}`}>
                      All Scores
                    </button>
                    <button className={styles.filterChip}>
                      Excellent (90+)
                    </button>
                    <button className={styles.filterChip}>
                      Good (70-89)
                    </button>
                    <button className={styles.filterChip}>
                      Average (50-69)
                    </button>
                    <button className={styles.filterChip}>
                      Needs Improvement (&lt;50)
                    </button>
                  </div>
                </div>
                <div className={styles.sideDrawerSection}>
                  <label className={styles.sideDrawerLabel}>Call Volume</label>
                  <div className={styles.filterChips}>
                    <button className={`${styles.filterChip} ${styles.filterChipActive}`}>
                      All Volumes
                    </button>
                    <button className={styles.filterChip}>
                      High (50+)
                    </button>
                    <button className={styles.filterChip}>
                      Medium (20-49)
                    </button>
                    <button className={styles.filterChip}>
                      Low (&lt;20)
                    </button>
                  </div>
                </div>
                
                {/* Save Views Section - Compact */}
                <div className={styles.saveViewsSection}>
                  <div className={styles.saveViewsHeader}>
                    <label className={styles.saveViewsLabel}>Save Views</label>
                    <button className={styles.saveViewsManageButton}>Manage</button>
                  </div>
                  <div className={styles.saveViewsInputContainer}>
                    <input 
                      type="text" 
                      placeholder="View name..."
                      className={styles.saveViewsInput}
                    />
                    <button className={styles.saveViewsSaveButton}>
                      Save
                    </button>
                  </div>
                  <div className={styles.savedViewsChips}>
                    <button className={styles.savedViewChip}>
                      Last Week
                    </button>
                    <button className={styles.savedViewChip}>
                      Q4 Perf
                    </button>
                    <button className={styles.savedViewChip}>
                      Top Agents
                    </button>
                  </div>
                </div>
                
                <div className={styles.actionButtonsSection}>
                  <div className={styles.actionButtonsContainer}>
                    <button className={styles.applyFiltersButton}>
                      Apply Filters
                    </button>
                    <button className={styles.resetFiltersButton}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Agent Details Side Drawer */}
      {showAgentDetails && selectedAgent && (
        <div className={styles.agentDetailsBackdrop}>
          <div className={styles.agentDetailsOverlay} onClick={() => setShowAgentDetails(false)}></div>
          <div className={styles.agentDetailsPanel}>
            <div className={styles.agentDetailsContent}>
              <div className={styles.agentDetailsHeader}>
                <h3 className={styles.agentDetailsTitle}>Agent Details</h3>
                <button 
                  onClick={() => setShowAgentDetails(false)}
                  className={styles.agentDetailsCloseButton}
                >
                  <X className={styles.agentDetailsCloseIcon} />
                </button>
              </div>
              <div className={styles.agentDetailsBody}>
                <div className={styles.agentProfile}>
                  <div className={styles.agentAvatar}>
                    {selectedAgent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className={styles.agentName}>{selectedAgent.name}</h4>
                  <p className={styles.agentRole}>Sales Representative</p>
                </div>
                
                {/* Performance Metrics */}
                <div className={styles.agentMetricsGrid}>
                  <div className={styles.agentMetricCard}>
                    <div className={`${styles.agentMetricValue} ${styles.blueValue}`}>{selectedAgent.score}</div>
                    <div className={styles.agentMetricLabel}>Overall Score</div>
                  </div>
                  <div className={styles.agentMetricCard}>
                    <div className={`${styles.agentMetricValue} ${styles.greenValue}`}>{selectedAgent.calls}</div>
                    <div className={styles.agentMetricLabel}>Total Calls</div>
                  </div>
                  <div className={styles.agentMetricCard}>
                    <div className={`${styles.agentMetricValue} ${styles.yellowValue}`}>{selectedAgent.satisfaction}</div>
                    <div className={styles.agentMetricLabel}>Satisfaction</div>
                  </div>
                  <div className={styles.agentMetricCard}>
                    <div className={`${styles.agentMetricValue} ${styles.purpleValue}`}>{selectedAgent.talkRatio}%</div>
                    <div className={styles.agentMetricLabel}>Talk Ratio</div>
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className={styles.additionalMetrics}>
                  <div className={styles.additionalMetricRow}>
                    <span className={styles.additionalMetricLabel}>Interruptions</span>
                    <span className={styles.additionalMetricValue}>{selectedAgent.interruptions}</span>
                  </div>
                  <div className={styles.additionalMetricRow}>
                    <span className={styles.additionalMetricLabel}>Avg Monologue Length</span>
                    <span className={styles.additionalMetricValue}>{selectedAgent.monologues}m</span>
                  </div>
                </div>

                {/* Performance Insights */}
                <div className={styles.performanceInsights}>
                  <h5 className={styles.insightsTitle}>Performance Insights</h5>
                  <div className={styles.insightsList}>
                    <div className={styles.insightItem}>
                      <div className={`${styles.insightDot} ${styles.greenDot}`}></div>
                      <span>Above average performance score</span>
                    </div>
                    <div className={styles.insightItem}>
                      <div className={`${styles.insightDot} ${styles.blueDot}`}></div>
                      <span>Good customer satisfaction rating</span>
                    </div>
                    <div className={styles.insightItem}>
                      <div className={`${styles.insightDot} ${styles.yellowDot}`}></div>
                      <span>Room for improvement in talk ratio</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.agentActionButtons}>
                  <button className={`${styles.agentActionButton} ${styles.primaryButton}`}>
                    View Full Profile
                  </button>
                  <button className={`${styles.agentActionButton} ${styles.secondaryButton}`}>
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}