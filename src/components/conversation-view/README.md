# Conversation View Components

This directory contains the components for the Single Conversation View screen, implementing the dashboard and visualization requirements.

## Components

### InteractiveTranscriptPlayer

- **Purpose**: Displays synchronized transcript with audio playback
- **Features**:
  - Audio synchronization with transcript segments
  - Visual highlighting of filler words (yellow background)
  - Clear indication of long pauses (e.g., [PAUSE 3.5s])
  - Visual flagging of interruptions
  - Click-to-seek functionality
  - Play/pause controls with time display

### SpeakerTimeline

- **Purpose**: Horizontal bar chart showing who spoke and when
- **Features**:
  - Color-coded speaker segments
  - Interactive timeline with hover tooltips
  - Time markers for easy navigation
  - Speaker statistics panel
  - Responsive design

### KeyMetricsPanel

- **Purpose**: Displays core conversation metrics
- **Features**:
  - Talk-to-Listen ratio gauge with color-coded zones
  - Counter widgets for filler words, interruptions, and silence duration
  - Transcript quality score with circular progress indicator
  - Animated metrics on load
  - Status badges for quick assessment

## Data Structure

### TranscriptSegment

```typescript
interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  startTime: number;
  endTime: number;
  fillerWords: string[];
  isInterruption: boolean;
  pauseDuration?: number;
}
```

### SpeakerSegment

```typescript
interface SpeakerSegment {
  speaker: string;
  startTime: number;
  endTime: number;
  duration: number;
}
```

### ConversationMetrics

```typescript
interface ConversationMetrics {
  talkToListenRatio: number;
  fillerWords: number;
  interruptions: number;
  totalSilenceDuration: number;
  transcriptQualityScore: number;
}
```

## Usage

```tsx
import { InteractiveTranscriptPlayer, SpeakerTimeline, KeyMetricsPanel } from '@/components/conversation-view';

// Use in your page component
<InteractiveTranscriptPlayer
  transcriptData={transcriptData}
  audioUrl="/audio/conversation.mp3"
/>
<SpeakerTimeline
  conversationData={speakerData}
  totalDuration={120}
/>
<KeyMetricsPanel
  metrics={conversationMetrics}
/>
```

## Styling

All components use SCSS modules for styling with:

- Responsive design patterns
- Consistent color scheme
- Smooth animations and transitions
- Accessibility considerations
- Modern UI/UX patterns

## Requirements Fulfilled

- ✅ FR-DV-4.1: Interactive Transcript Player with synchronized audio
- ✅ FR-DV-4.2: Speaker Timeline horizontal bar chart
- ✅ FR-DV-4.3: Key Metrics Panel with gauges and counters
