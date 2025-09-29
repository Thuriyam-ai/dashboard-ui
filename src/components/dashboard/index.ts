// Main sidebar component (MUI-based)
export { Sidebar } from "./sidebar";

// Core dashboard components
export { MetricsCards } from "./metrics-cards";
export { RecentDeployments } from "./recent-deployments";
export { SystemHealth } from "./system-health";

// Team dashboard components (imported from team-dashboard)
export { TeamFilters } from "../team-dashboard/team-filters";
export { Leaderboards } from "../team-dashboard/leaderboards";
export { TrendAnalysis } from "../team-dashboard/trend-analysis";
export { TeamMetrics } from "../team-dashboard/team-metrics";
export { DistributionPlots } from "../team-dashboard/distribution-plots";
export { CoachingLeaderboards } from "../team-dashboard/coaching-leaderboards";
export { RadarChart } from "../team-dashboard/radar-chart";

// Team leader dashboard components (imported from team-leader-dashboard)
export { MuiSidebar as TeamLeaderSidebar } from "./mui-sidebar";
export { TeamMetricsCards } from "../team-leader-dashboard/team-metrics-cards";
export { TeamPerformanceChart } from "../team-leader-dashboard/team-performance-chart";
export { TeamInsightsPanel } from "../team-leader-dashboard/team-insights-panel";