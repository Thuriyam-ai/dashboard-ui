import developmentSettings from "./development";
import productionSettings from "./production";
import stagingSettings from "./staging";
import qaSettings from "./qa";
import betaSettings from "./beta";
import type { GlobalSettings } from "./global-settings.type";

/**
 * Retrieves the global settings based on the current environment.
 *
 * The environment is determined by the `NEXT_PUBLIC_ENV` environment variable.
 * Depending on the value of `NEXT_PUBLIC_ENV`, the corresponding settings
 * file is imported and returned. If the environment variable is not set or
 * does not match any case, an error is thrown.
 *
 * To add a new environment setting:
 * 1. Create a new file, e.g., `newEnv.ts`, and export the `GlobalSettings` from it.
 * 2. Import the new settings file in this file.
 * 3. Add a new case in the `switch` statement for the new environment.
 * 4. Return the imported settings for the new environment.
 * @throws Error - If `NEXT_PUBLIC_ENV` is not set or does not match any case.
 * @returns GlobalSettings - The global settings for the current environment.
 */
const getGlobalSettings = (): GlobalSettings => {
  if (!process.env.NEXT_PUBLIC_ENV) {
    throw new Error("NEXT_PUBLIC_ENV is not set");
  }

  switch (process.env.NEXT_PUBLIC_ENV) {
    case "development":
      return developmentSettings;
    case "production":
      return productionSettings;
    case "beta":
      return betaSettings;
    case "staging":
      return stagingSettings;
    case "qa":
      return qaSettings;
  }

  throw new Error(`Unknown environment: ${process.env.NEXT_PUBLIC_ENV}`);
};

/**
 * The global settings object for the application.
 * This is determined by the current environment and is exported for use across the app.
 */
export const globalSettings = getGlobalSettings();
