import type { GlobalSettings } from './global-settings.type';

/**
 * Beta environment settings.
 *
 * This file contains the global settings specific to the Beta environment.
 * It is imported and returned when `NEXT_PUBLIC_ENV` is set to `beta`.
 */
const betaSettings: GlobalSettings = {
  urlConfig: {
    EVENT_URL: 'https://example-beta-url.com', // Example URL for beta
  },
  apiKey: {
    EVENT_API_KEY: 'example-beta-api-key', // Example API key for beta
  },
};

export default betaSettings;
