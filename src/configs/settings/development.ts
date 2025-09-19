import type { GlobalSettings } from "./global-settings.type";

/**
 * Development environment settings.
 *
 * This file contains the global settings specific to the development environment.
 * It is imported and returned when `NEXT_PUBLIC_ENV` is set to `development`.
 */
const developmentSettings: GlobalSettings = {
  // Add your development-specific settings here
  urlConfig: {
    EVENT_URL: "https://example-dev-url.com", // Example URL for development'
  },
  apiKey: {
    EVENT_API_KEY: "example-dev-api-key", // Example API key for development
  },
};

export default developmentSettings;
