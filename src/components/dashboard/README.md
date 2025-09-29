# Team Dashboard Components

This directory contains the components for the Team Dashboard, implementing aggregated team/campaign analytics with leaderboards, trend analysis, and filtering capabilities.

## Components

### TeamFilters

- **Purpose**: Filtering component for Team, Campaign, and Date Range
- **Features**:
  - Team selection (All Teams, Customer Support, Sales, Technical Support)
  - Campaign filtering (All Campaigns, Holiday Sale, Product Launch, etc.)
  - Date range selection (Last 7/30/90 days, Custom range)
  - Active filters display with removal capability
  - Reset filters functionality

### Leaderboards

- **Purpose**: Agent performance rankings and comparisons
- **Features**:
  - **Best Talk-to-Listen Ratio**: Rankings based on optimal ratios (40-60%)
  - **Lowest Interruptions**: Rankings by interruption count
  - **Highest Quality Score**: Rankings by conversation quality
  - Medal icons for top 3 performers (Gold, Silver, Bronze)
  - Indian agent names (Priya Sharma, Arjun Patel, Kavya Reddy, etc.)
  - Team color coding and hover effects

### TrendAnalysis

- **Purpose**: Time-based trend analysis widgets
- **Features**:
  - Summary cards showing average metrics
  - Trend indicators (Increasing, Decreasing, Stable)
  - Interactive bar chart for Talk-to-Listen ratio trends
  - 15-day trend visualization
  - Performance indicators with color coding

### TeamMetrics

- **Purpose**: Team performance overview metrics
- **Features**:
  - Active Agents count
  - Average Quality Score
  - Total Conversations
  - Average Duration
  - Interruption Rate
  - Customer Satisfaction score
  - Change indicators with trend icons

## Requirements Fulfilled

### ✅ FR-DV-4.4: Leaderboards & Comparisons

- Agent leaderboards for best Talk-to-Listen ratios
- Rankings for lowest interruption counts
- Performance comparisons across teams
- Medal system for top performers

### ✅ FR-DV-4.5: Trend Analysis

- Time-based trend widgets
- Average talk ratio trends over time
- Performance metrics visualization
- Interactive charts and indicators

### ✅ FR-DV-4.6: Filtering

- Team-based filtering (Customer Support, Sales, Technical Support)
- Campaign filtering (Holiday Sale, Product Launch, etc.)
- Date range filtering (7/30/90 days, custom range)
- Active filters display and management

## Indian Agent Names Used

### Agents

- **Priya Sharma** - Customer Support (Top performer)
- **Arjun Patel** - Sales Team
- **Kavya Reddy** - Technical Support (Quality leader)
- **Rajesh Kumar** - Customer Support
- **Sneha Singh** - Sales Team

### Teams

- **Customer Support** - Blue theme
- **Sales** - Green theme
- **Technical Support** - Purple theme

## Data Structure

### Agent Interface

```typescript
interface Agent {
  id: string;
  name: string;
  team: string;
  talkToListenRatio: number;
  interruptions: number;
  qualityScore: number;
  totalConversations: number;
  avgDuration: string;
}
```

### Trend Data Interface

```typescript
interface TrendData {
  date: string;
  talkRatio: number;
  interruptions: number;
  qualityScore: number;
  totalConversations: number;
}
```

## Usage

```tsx
import { TeamFilters, Leaderboards, TrendAnalysis, TeamMetrics } from '@/components/team-dashboard';

// Use in Team Dashboard page
<TeamFilters />
<TeamMetrics />
<Leaderboards />
<TrendAnalysis />
```

## Navigation Structure

### Analytics Sidebar (Nested)

1. **Analytics** (Parent)
   - **Overview** - Conversation analysis (`/analytics`)
   - **Team Dashboard** - Team & campaign analytics (`/team-dashboard`)

## Features Implemented

- ✅ Nested sidebar navigation for Analytics
- ✅ Team Dashboard with comprehensive filtering
- ✅ Agent leaderboards with Indian names
- ✅ Trend analysis with interactive charts
- ✅ Team metrics overview
- ✅ Responsive design and hover effects
- ✅ Color-coded performance indicators
- ✅ Medal system for top performers
