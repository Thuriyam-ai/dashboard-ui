import type { GlobalSettings } from "./global-settings.type";

/**
 * QA environment settings.
 *
 * This file contains the global settings specific to the QA environment.
 * It is imported and returned when `NEXT_PUBLIC_ENV` is set to `qa`.
 */
const qaSettings: GlobalSettings = {
  urlConfig: {
    EVENT_URL: "https://example-qa-url.com", // Example URL for qa
  },
  apiKey: {
    EVENT_API_KEY: "example-qa-api-key", // Example API key for qa
  },
};

export default qaSettings;
