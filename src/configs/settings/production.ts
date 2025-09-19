import type { GlobalSettings } from "./global-settings.type";

/**
 * Production environment settings.
 *
 * This file contains the global settings specific to the production environment.
 * It is imported and returned when `NEXT_PUBLIC_ENV` is set to `production`.
 */
const productionSettings: GlobalSettings = {
  urlConfig: {
    EVENT_URL: "https://example-prod-url.com", // Example URL for production
  },
  apiKey: {
    EVENT_API_KEY: "example-prod-api-key", // Example API key for production
  },
};

export default productionSettings;
