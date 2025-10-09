// src/types/api/goal.ts

// --- Utility & Summary Types ---
export interface Owner {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface ActiveGoalSummary {
  goal_id: string;
  goal_name: string;
  active_version_no: number;
}

export interface SimpleSuccessResponse {
  success: boolean;
  message: string;
}

// --- Enum Types from Spec ---
export type DataType = "TEXT" | "NUMBER" | "BOOLEAN" | "SELECT" | "MULTI_SELECT" | "DATE" | "DATETIME";
export type DispositionCategory = "SUCCESS" | "FAILURE" | "NEUTRAL";
export type FailureType = "FATAL" | "NON_FATAL";
export type ScoringType = "MANUAL" | "AUTO_COMPLETENESS" | "AUTO_SENTIMENT" | "AUTO_KEYWORD";

// --- Schema Types for API Payloads & Responses ---

export interface OutcomefieldItem {
  attribute_name: string;
  data_type: DataType;
  configuration?: string;
  elicitation_prompt: string | null;
  is_required: boolean;
  is_pii: boolean;
  weight: number;
  display_order: number;
}

export interface ScorecardparametersItem {
  name: string;
  max_score: number;
  failure_type: FailureType;
  rules_and_explanation: string | null;
  scoring_type: ScoringType;
  display_order: number;
}

export interface InsightsItem {
  name: string;
  is_enabled: boolean;
  display_order: number;
}

export interface DispositionItem {
  name: string;
  category: DispositionCategory;
  display_order: number;
  description: string | null;
}

// For creating a new goal (flat structure)
export interface GoalCreateRequest {
  organization_id: string;
  owner_id: string;
  name: string;
  description: string | null;
  team_id: string | null;
  tags: string | null;
  prompt_text: string | null;
  dynamic_variables?: string;
  model_params?: object | null;
  output_config?: object | null;
  outcomefields?: OutcomefieldItem[];
  scorecardparameters?: ScorecardparametersItem[];
  insights?: InsightsItem[];
  dispositions?: DispositionItem[];
}

// For updating a draft (same as create)
export type GoalUpdateRequest = GoalCreateRequest;

// For the main goal listing page
export interface GoalDetailResponse {
  goal_id: string;
  goal_name: string;
  description: string | null;
  updated_at: string;
  conversations: number;
  owner_name: string;
  team_name: string | null;
  avg_score: number;
  completion_score: number;
  published_version_no: number | null;
  draft_version_no: number | null;
  is_editable: boolean; // <-- ADDED: Determines if a goal can be edited (e.g., no active campaigns).
}

// For fetching a specific version to edit (flat structure)
export interface GoalVersionDetailResponse {
  name: string;
  description: string | null;
  team_id: string | null;
  owner_id: string;
  tags: string | null;
  prompt_text: string;
  dynamic_variables: string;
  outcomefields: OutcomefieldItem[];
  insights: InsightsItem[];
  dispositions: DispositionItem[];
  scorecardparameters: ScorecardparametersItem[];
}