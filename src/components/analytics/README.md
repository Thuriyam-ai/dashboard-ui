# Analytics Components

This directory contains the components for the Analytics page, which integrates the Single Conversation View screens into the Analytics sidebar item.

## Components

### ConversationOverview

- **Purpose**: Displays conversation overview with summary cards and clickable conversation list
- **Features**:
  - Summary cards showing total conversations, completed count, average quality score, and average talk ratio
  - List of recent conversations with Indian agent and customer names
  - Clickable conversation cards that trigger detailed view
  - Status indicators (completed, in-progress, failed)
  - Quality score color coding
  - Hover animations and interactive elements

### ConversationDetailView

- **Purpose**: Shows detailed conversation analysis using Single Conversation View components
- **Features**:
  - Back button to return to overview
  - Conversation header with agent/customer names, date, duration, and status
  - Integrated Interactive Transcript Player
  - Integrated Speaker Timeline
  - Integrated Key Metrics Panel
  - Responsive grid layout

## Indian Names Used

### Agents

- **Priya Sharma** - Customer support specialist
- **Arjun Patel** - Sales assistant
- **Kavya Reddy** - FAQ specialist

### Customers

- **Rajesh Kumar** - Customer support case
- **Sneha Singh** - Sales inquiry
- **Vikram Joshi** - Technical support
- **Anita Gupta** - Account assistance
- **Deepak Verma** - Failed conversation case

## Data Structure

### Conversation Interface

```typescript
interface Conversation {
  id: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  status: "completed" | "in-progress" | "failed";
  qualityScore: number;
  fillerWords: number;
  interruptions: number;
  talkToListenRatio: number;
}
```

## Integration with Single Conversation View

The Analytics page seamlessly integrates the existing Single Conversation View components:

1. **Interactive Transcript Player** - Shows conversation transcript with Indian names
2. **Speaker Timeline** - Displays speaker segments for agent and customer
3. **Key Metrics Panel** - Shows conversation-specific metrics

## Usage

```tsx
import { ConversationOverview, ConversationDetailView } from '@/components/analytics';

// Overview with conversation list
<ConversationOverview
  conversations={conversations}
  onConversationSelect={handleConversationSelect}
/>

// Detailed view with Single Conversation View components
<ConversationDetailView
  conversation={selectedConversation}
  onBack={handleBackToOverview}
/>
```

## Navigation Flow

1. **Analytics Page** (`/analytics`) - Shows conversation overview
2. **Click Conversation** - Opens detailed view in right panel
3. **Single Conversation View** - Shows transcript, timeline, and metrics
4. **Back Button** - Returns to overview

## Features Implemented

- ✅ Analytics sidebar item integration
- ✅ Conversation overview with Indian names
- ✅ Clickable conversation cards
- ✅ Detailed conversation view with Single Conversation View components
- ✅ Responsive layout and navigation
- ✅ Status indicators and quality scoring
- ✅ Mock data generation based on conversation details
- ✅ Back navigation functionality
