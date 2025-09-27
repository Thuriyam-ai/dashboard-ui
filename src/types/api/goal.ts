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

export interface GoalMetadata {
  name: string;
  description: string | null;
  default_team_id: string | null;
  owner_id: string;
  tags: string | null;
}

export interface InteractionBlueprint {
  goal_metadata: GoalMetadata;
  prompt_text: string;
  dynamic_variables: string;
}

export interface StructuredDataItem {
  attribute_name: string;
  data_type: DataType;
  configuration?: string;
  elicitation_prompt: string | null;
  is_required: boolean;
  is_pii: boolean;
  weight: number;
  display_order: number;
}

export interface DispositionConfigItem {
  name: string;
  description: string | null;
  category: DispositionCategory;
  display_order: number;
}

export interface ConversationInsights {
  conversation_insights_config: { [key: string]: boolean };
  disposition_config: DispositionConfigItem[];
}

export interface QualityScorecardItem {
  name: string;
  max_score: number;
  failure_type: FailureType;
  rules_and_explanation: string | null;
  scoring_type: ScoringType;
  display_order: number;
}

// For creating or updating a goal
export interface GoalCreateRequest {
  interaction_blueprint: InteractionBlueprint;
  structured_data: StructuredDataItem[];
  conversation_insights: ConversationInsights;
  quality_scorecard: QualityScorecardItem[];
}
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
}

// For fetching a specific version to edit
export interface GoalVersionDetailResponse {
  interaction_blueprint: InteractionBlueprint;
  structured_data: StructuredDataItem[];
  conversation_insights: ConversationInsights;
  quality_scorecard: QualityScorecardItem[];
}