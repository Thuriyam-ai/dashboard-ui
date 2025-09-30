/**
 * Represents the analysis of a single quality parameter for a campaign.
 * Based on the ParameterAnalysis schema from the OpenAPI spec.
 */
export interface ParameterAnalysis {
  parameter: string;
  max_score: number;
  type: string;
  current_score: number;
  adherence_percentage: number;
}