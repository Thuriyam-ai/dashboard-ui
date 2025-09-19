/**
 * Type definitions for Conversation View components
 */

export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  startTime: number;
  endTime: number;
  fillerWords: string[];
  isInterruption: boolean;
  pauseDuration?: number;
}

export interface SpeakerSegment {
  speaker: string;
  startTime: number;
  endTime: number;
  duration: number;
}

export interface ConversationMetrics {
  talkToListenRatio: number;
  fillerWords: number;
  interruptions: number;
  totalSilenceDuration: number;
  transcriptQualityScore: number;
}

export interface SpeakerStats {
  speaker: string;
  totalTime: number;
  percentage: number;
  segmentCount: number;
}

export type SpeakerColor = 'Agent' | 'Customer' | 'System' | 'Other';

export interface SpeakerColors {
  Agent: string;
  Customer: string;
  System: string;
  Other: string;
}

export type RatioStatus = 'Optimal' | 'Acceptable' | 'Needs Improvement';
export type QualityStatus = 'Excellent' | 'Good' | 'Poor';
