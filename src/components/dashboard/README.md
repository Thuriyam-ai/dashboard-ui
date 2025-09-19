# Dashboard Components

This directory contains the components for the BotConfig Admin Dashboard, implementing a modern admin interface similar to the reference design.

## Components

### Sidebar

- **Purpose**: Navigation sidebar with dark theme
- **Features**:
  - BotConfig branding with logo
  - Management section with navigation items
  - Active state highlighting
  - Responsive design
  - Analytics item (replacing Agent Analytics as requested)

### MetricsCards

- **Purpose**: Key metrics display cards
- **Features**:
  - Four metric cards: Active Bots, Deployments Today, Active Users, Issues
  - Color-coded icons and trends
  - Hover animations
  - Responsive grid layout

### RecentDeployments

- **Purpose**: Recent bot deployments list
- **Features**:
  - Indian agent names (Priya, Arjun, Kavya)
  - Status indicators (success, pending, failed)
  - Environment and version information
  - Timestamps
  - Interactive hover effects

### SystemHealth

- **Purpose**: System health metrics with progress bars
- **Features**:
  - API Response Time tracking
  - Bot Availability monitoring
  - Error Rate visualization
  - Color-coded progress bars
  - Status indicators

## Indian Agent Names Used

- **Priya Customer Support Bot** - Customer support operations
- **Arjun Sales Assistant Bot** - Sales and lead generation
- **Kavya FAQ Bot** - Frequently asked questions handling

## Navigation Items

1. **Dashboard** - Overview & Analytics (currently active)
2. **Agent Configurations** - Deploy & Configure Agents
3. **Access Management** - Users & Permissions
4. **Platform Settings** - System Configuration
5. **Observability** - Monitoring & Analytics
6. **Developer Hub** - APIs & Documentation
7. **Analytics** - Performance & Intelligence (replaced Agent Analytics)

## Usage

```tsx
import { Sidebar, MetricsCards, RecentDeployments, SystemHealth } from '@/components/dashboard';

// Use in your dashboard page
<Sidebar />
<MetricsCards />
<RecentDeployments />
<SystemHealth />
```

## Styling

All components use SCSS modules with:

- Dark sidebar theme (#1a202c)
- Light main content area
- Consistent color palette
- Smooth animations and transitions
- Responsive design patterns
- Modern card-based layouts

## Features Implemented

- ✅ Dark sidebar navigation with Analytics item
- ✅ Key metrics cards with Indian agent names
- ✅ Recent deployments with status indicators
- ✅ System health monitoring with progress bars
- ✅ Responsive design and hover effects
- ✅ Modern admin dashboard styling
