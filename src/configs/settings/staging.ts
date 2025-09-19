import type { GlobalSettings } from "./global-settings.type";

/**
 * Staging environment settings.
 *
 * This file contains the global settings specific to the Staging environment.
 * It is imported and returned when `NEXT_PUBLIC_ENV` is set to `staging`.
 */
const stagingSettings: GlobalSettings = {
  urlConfig: {
    EVENT_URL: "https://example-staging-url.com", // Example URL for staging
  },
  apiKey: {
    EVENT_API_KEY: "example-staging-api-key", // Example API key for staging
  },
};

export default stagingSettings;
