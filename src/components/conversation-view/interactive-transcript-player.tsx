'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './interactive-transcript-player.module.scss';
import type { TranscriptSegment } from './types';

interface InteractiveTranscriptPlayerProps {
  transcriptData?: TranscriptSegment[];
  audioUrl?: string;
}

/**
 * Interactive Transcript Player component.
 * Displays synchronized transcript with audio playback, highlighting filler words,
 * pauses, and interruptions.
 * @param props - Component props
 * @param props.transcriptData - Array of transcript segments
 * @param props.audioUrl - URL to the audio file
 * @returns The Interactive Transcript Player component
 */
export function InteractiveTranscriptPlayer({
  transcriptData,
  audioUrl,
}: InteractiveTranscriptPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock data for demonstration
  const MOCK_TRANSCRIPT_DATA: TranscriptSegment[] = [
    {
      id: '1',
      speaker: 'Agent',
      text: 'Hello, thank you for calling our support line. How can I help you today?',
      startTime: 0,
      endTime: 4.2,
      fillerWords: [],
      isInterruption: false,
    },
    {
      id: '2',
      speaker: 'Customer',
      text: "Hi, um, I'm having trouble with my account login. It keeps saying my password is wrong.",
      startTime: 4.5,
      endTime: 8.1,
      fillerWords: ['um'],
      isInterruption: false,
    },
    {
      id: '3',
      speaker: 'Agent',
      text: 'I understand your frustration. Let me help you with that. Can you tell me your email address?',
      startTime: 8.3,
      endTime: 12.7,
      fillerWords: [],
      isInterruption: false,
    },
    {
      id: '4',
      speaker: 'Customer',
      text: "Sure, it's john.doe@email.com",
      startTime: 13.0,
      endTime: 15.2,
      fillerWords: [],
      isInterruption: false,
    },
    {
      id: '5',
      speaker: 'Agent',
      text: 'Perfect. I can see your account here. The issue might be that your password has expired. Let me reset it for you.',
      startTime: 15.5,
      endTime: 20.8,
      fillerWords: [],
      isInterruption: false,
    },
    {
      id: '6',
      speaker: 'Customer',
      text: 'Oh, that would be great! Thank you so much.',
      startTime: 21.0,
      endTime: 23.5,
      fillerWords: [],
      isInterruption: false,
    },
  ];

  const data = transcriptData || MOCK_TRANSCRIPT_DATA;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);

      // Find current segment
      const currentSegment = data.find(
        (segment) =>
          audio.currentTime >= segment.startTime &&
          audio.currentTime <= segment.endTime,
      );
      setCurrentSegmentId(currentSegment?.id || null);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [data, audioUrl]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.warn('Audio playback failed:', error);
      });
    }
  };

  const handleSegmentClick = (segment: TranscriptSegment) => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    audio.currentTime = segment.startTime;
    audio.play().catch((error) => {
      console.warn('Audio playback failed:', error);
    });
  };

  const highlightFillerWords = (text: string, fillerWords: string[]) => {
    if (fillerWords.length === 0) return text;

    let highlightedText = text;
    fillerWords.forEach((filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      highlightedText = highlightedText.replace(
        regex,
        `<span class="${styles.fillerWord}">${filler}</span>`,
      );
    });
    return highlightedText;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Interactive Transcript Player</h2>
        <div className={styles.audioControls}>
          {audioUrl ? (
            <>
              <button
                onClick={handlePlayPause}
                className={styles.playButton}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    className={styles.icon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              <div className={styles.timeDisplay}>
                {formatTime(currentTime)} /{' '}
                {formatTime(data[data.length - 1]?.endTime || 0)}
              </div>
            </>
          ) : (
            <div className={styles.noAudioMessage}>
              <svg
                className={styles.icon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Audio not available - Transcript only mode
            </div>
          )}
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className={styles.transcriptContainer}>
        {data.map((segment) => (
          <div
            key={segment.id}
            className={`${styles.transcriptSegment} ${
              currentSegmentId === segment.id ? styles.activeSegment : ''
            } ${segment.isInterruption ? styles.interruption : ''}`}
            onClick={() => handleSegmentClick(segment)}
          >
            <div className={styles.segmentHeader}>
              <span className={styles.speaker}>{segment.speaker}</span>
              <span className={styles.timestamp}>
                {formatTime(segment.startTime)} - {formatTime(segment.endTime)}
              </span>
            </div>
            <div
              className={styles.segmentText}
              dangerouslySetInnerHTML={{
                __html: highlightFillerWords(segment.text, segment.fillerWords),
              }}
            />
            {segment.pauseDuration && (
              <div className={styles.pauseIndicator}>
                [PAUSE {segment.pauseDuration}s]
              </div>
            )}
            {segment.isInterruption && (
              <div className={styles.interruptionFlag}>
                <svg
                  className={styles.flagIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Interruption
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
