/**
 * Defines the type for global-level settings or configuration.
 *
 * This interface is used to enforce a consistent structure for the global settings
 * across different environment settings (e.g., development, production).
 *
 * Any new setting variable, object, or configuration must be added here first to define its type.
 * This ensures type safety and consistency when working with environment-specific configurations.
 *
 * The `GlobalSettings` type is imported and used in all environment settings files.
 */
export interface GlobalSettings {
  /**
   * Configuration for URLs used in the application.
   */
  urlConfig: {
    EVENT_URL: string;
  };

  /**
   * Configuration for API keys used in the application.
   */
  apiKey: {
    EVENT_API_KEY: string;
  };
}
