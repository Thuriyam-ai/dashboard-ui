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

/**
 * Represents the performance summary of a single agent.
 * Based on the AgentPerformance schema from the OpenAPI spec.
 */
export interface AgentPerformance {
  agent_id: string;
  total_score: number;
  fatal_errors: number;
  non_fatal_errors: number;
  total_calls: number;
}