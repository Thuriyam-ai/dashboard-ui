'use client';

import styles from './conversation-detail-view.module.scss';
import {
  InteractiveTranscriptPlayer,
  SpeakerTimeline,
  KeyMetricsPanel,
} from '@/components/conversation-view';

interface Conversation {
  id: string;
  agentName: string;
  customerName: string;
  duration: string;
  date: string;
  status: 'completed' | 'in-progress' | 'failed';
  qualityScore: number;
  fillerWords: number;
  interruptions: number;
  talkToListenRatio: number;
}

interface ConversationDetailViewProps {
  conversation: Conversation;
  onBack: () => void;
}

export function ConversationDetailView({
  conversation,
  onBack,
}: ConversationDetailViewProps) {
  // Generate mock transcript data based on the conversation
  const generateTranscriptData = () => {
    const agentName = conversation.agentName.split(' ')[0];
    const customerName = conversation.customerName.split(' ')[0];

    return [
      {
        id: '1',
        speaker: agentName,
        text: `Hello ${customerName}, thank you for calling our support line. How can I help you today?`,
        startTime: 0,
        endTime: 4.2,
        fillerWords: [],
        isInterruption: false,
      },
      {
        id: '2',
        speaker: customerName,
        text: `Hi, um, I'm having trouble with my account login. It keeps saying my password is wrong.`,
        startTime: 4.5,
        endTime: 8.1,
        fillerWords: ['um'],
        isInterruption: false,
      },
      {
        id: '3',
        speaker: agentName,
        text: `I understand your frustration. Let me help you with that. Can you tell me your email address?`,
        startTime: 8.3,
        endTime: 12.7,
        fillerWords: [],
        isInterruption: false,
      },
      {
        id: '4',
        speaker: customerName,
        text: `Sure, it's ${customerName.toLowerCase()}@email.com`,
        startTime: 13.0,
        endTime: 15.2,
        fillerWords: [],
        isInterruption: false,
      },
      {
        id: '5',
        speaker: agentName,
        text: `Perfect. I can see your account here. The issue might be that your password has expired. Let me reset it for you.`,
        startTime: 15.5,
        endTime: 20.8,
        fillerWords: [],
        isInterruption: false,
      },
      {
        id: '6',
        speaker: customerName,
        text: `Oh, that would be great! Thank you so much.`,
        startTime: 21.0,
        endTime: 23.5,
        fillerWords: [],
        isInterruption: false,
      },
    ];
  };

  // Generate mock speaker timeline data
  const generateSpeakerData = () => {
    const agentName = conversation.agentName.split(' ')[0];
    const customerName = conversation.customerName.split(' ')[0];

    return [
      { speaker: agentName, startTime: 0, endTime: 4.2, duration: 4.2 },
      { speaker: customerName, startTime: 4.5, endTime: 8.1, duration: 3.6 },
      { speaker: agentName, startTime: 8.3, endTime: 12.7, duration: 4.4 },
      { speaker: customerName, startTime: 13.0, endTime: 15.2, duration: 2.2 },
      { speaker: agentName, startTime: 15.5, endTime: 20.8, duration: 5.3 },
      { speaker: customerName, startTime: 21.0, endTime: 23.5, duration: 2.5 },
    ];
  };

  // Generate metrics data based on conversation
  const generateMetricsData = () => {
    return {
      talkToListenRatio: conversation.talkToListenRatio,
      fillerWords: conversation.fillerWords,
      interruptions: conversation.interruptions,
      totalSilenceDuration: 8.5,
      transcriptQualityScore: conversation.qualityScore,
    };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#38a169';
      case 'in-progress':
        return '#3182ce';
      case 'failed':
        return '#e53e3e';
      default:
        return '#718096';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backButton}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to Overview
        </button>

        <div className={styles.conversationHeader}>
          <div className={styles.conversationTitle}>
            {conversation.agentName} ↔ {conversation.customerName}
          </div>
          <div className={styles.conversationMeta}>
            <span className={styles.date}>{formatDate(conversation.date)}</span>
            <span className={styles.duration}>
              Duration: {conversation.duration}
            </span>
            <span
              className={styles.status}
              style={{ color: getStatusColor(conversation.status) }}
            >
              {conversation.status.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column - Transcript and Timeline */}
        <div className={styles.leftColumn}>
          <InteractiveTranscriptPlayer
            transcriptData={generateTranscriptData()}
          />
          <SpeakerTimeline
            conversationData={generateSpeakerData()}
            totalDuration={25}
          />
        </div>

        {/* Right Column - Key Metrics */}
        <div className={styles.rightColumn}>
          <KeyMetricsPanel metrics={generateMetricsData()} />
        </div>
      </div>
    </div>
  );
}
