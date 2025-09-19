"use client";

import styles from "./event-callouts.module.scss";

interface EventCallout {
  id: string;
  type: "monologue" | "interruption" | "silence" | "escalation" | "repetition";
  severity: "low" | "medium" | "high";
  message: string;
  timestamp: number; // in seconds
  duration?: number; // in seconds for monologues/silence
  count?: number; // for interruptions/repetitions
}

interface EventCalloutsProps {
  events?: EventCallout[];
  onEventClick?: (event: EventCallout) => void;
}

/**
 * Event Callouts component (FR-DV-4.3).
 * Displays explicit callout boxes or alerts for key negative events.
 * Shows events like "Agent monologue detected (2.1 minutes)" or "Agent interrupted the customer 4 times."
 * @param props - Component props
 * @param props.events - Array of negative events to display
 * @param props.onEventClick - Optional callback when an event is clicked
 * @returns The EventCallouts component
 */
export function EventCallouts({ events, onEventClick }: EventCalloutsProps) {
  // Mock data for demonstration
  const mockEvents: EventCallout[] = [
    {
      id: "1",
      type: "monologue",
      severity: "high",
      message: "Agent monologue detected (2.1 minutes)",
      timestamp: 45,
      duration: 126,
    },
    {
      id: "2",
      type: "interruption",
      severity: "medium",
      message: "Agent interrupted the customer 4 times",
      timestamp: 120,
      count: 4,
    },
    {
      id: "3",
      type: "silence",
      severity: "low",
      message: "Extended silence detected (8.5 seconds)",
      timestamp: 200,
      duration: 8.5,
    },
    {
      id: "4",
      type: "repetition",
      severity: "medium",
      message: "Agent repeated same phrase 3 times",
      timestamp: 180,
      count: 3,
    },
    {
      id: "5",
      type: "monologue",
      severity: "high",
      message: "Customer monologue detected (1.8 minutes)",
      timestamp: 300,
      duration: 108,
    },
  ];

  const displayEvents = events && events.length > 0 ? events : mockEvents;

  const getEventIcon = (type: string) => {
    switch (type) {
      case "monologue":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
      case "interruption":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
          </svg>
        );
      case "silence":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7H9v2h2v2h2v-2h2V9h-2V7h-2z" />
          </svg>
        );
      case "escalation":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      case "repetition":
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 7H9v2h2v2h2v-2h2V9h-2V7h-2z" />
          </svg>
        );
      default:
        return (
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        );
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "#e53e3e";
      case "medium":
        return "#d69e2e";
      case "low":
        return "#38a169";
      default:
        return "#4a5568";
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Unknown";
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (displayEvents.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Event Callouts</h3>
          <div className={styles.noEvents}>
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            <span>No negative events detected</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Event Callouts</h3>
        <div className={styles.eventCount}>
          {displayEvents.length} event{displayEvents.length !== 1 ? "s" : ""}{" "}
          detected
        </div>
      </div>

      <div className={styles.eventsList}>
        {displayEvents.map((event) => (
          <div
            key={event.id}
            className={`${styles.eventCallout} ${styles[event.severity]}`}
            onClick={() => onEventClick?.(event)}
          >
            <div className={styles.eventHeader}>
              <div className={styles.eventIcon}>{getEventIcon(event.type)}</div>
              <div className={styles.eventInfo}>
                <div className={styles.eventType}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
                <div className={styles.eventTimestamp}>
                  {formatTime(event.timestamp)}
                </div>
              </div>
              <div className={styles.severityBadge}>
                {getSeverityLabel(event.severity)}
              </div>
            </div>

            <div className={styles.eventMessage}>{event.message}</div>

            {(event.duration || event.count) && (
              <div className={styles.eventDetails}>
                {event.duration && (
                  <span className={styles.detailItem}>
                    Duration: {event.duration}s
                  </span>
                )}
                {event.count && (
                  <span className={styles.detailItem}>
                    Count: {event.count}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>High Priority:</span>
          <span className={styles.summaryValue}>
            {displayEvents.filter((e) => e.severity === "high").length}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Medium Priority:</span>
          <span className={styles.summaryValue}>
            {displayEvents.filter((e) => e.severity === "medium").length}
          </span>
        </div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>Low Priority:</span>
          <span className={styles.summaryValue}>
            {displayEvents.filter((e) => e.severity === "low").length}
          </span>
        </div>
      </div>
    </div>
  );
}
