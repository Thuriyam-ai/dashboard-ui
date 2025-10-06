// src/types/api/conversation.ts

/**
 * Represents the MongoDB $date structure
 */
interface MongoDate {
  $date: string;
}

/**
 * Represents the structure of a single Scorecard Parameter's analysis found inside analytics_data.scorecard
 */
export interface ScorecardParameterAnalysis {
  parameter: string;
  score: number;
  max_score: number;
  explanation: string;
  sub_rule_analysis: Array<{
    rule: string;
    status: 'Pass' | 'Fail';
    reason: string;
  }>;
  review_score: number | null;
  reason_for_update: string;
}

/**
 * Represents the full Scorecard object, which is a dictionary of ScorecardParameterAnalysis.
 * Uses an index signature to accommodate dynamic parameter names.
 */
export interface ConversationScorecard {
  [key: string]: ScorecardParameterAnalysis;
}

/**
 * Represents the structure of a single Outcome Field's analysis found inside analytics_data.outcome
 */
export interface OutcomeFieldAnalysis {
  attribute_name: string;
  extracted_value: string | number | boolean | null;
  reasoning: string;
  reviewer_value: string | number | boolean | null;
  reviewer_reason: string;
}

/**
 * Represents the full Outcome object, which is a dictionary of OutcomeFieldAnalysis.
 */
export interface ConversationOutcome {
  [key: string]: OutcomeFieldAnalysis;
}

/**
 * Represents a conversation object returned from the backend API for a list view.
 * Note: This might differ slightly from the full detail response.
 */
export interface ConversationResponse {
  conversation_id: string;
  agent_id: string;
  employer_user_id: string;
  campaign_id: string;
  team_id: string;
  length_in_sec: number;
  call_timestamp: string; // List view uses a simple string
  avyukta_status: string | null;
  lamh_disposition: string;
  QC_score: number;
}

/**
 * Represents the full, detailed conversation object returned from GET /api/v1/conversations/{id}
 */
export interface ConversationDetailResponse {
  _id: { $oid: string };
  conversation_id: string;
  agent_id: string;
  employer_user_id: string;
  campaign_id: string;
  team_id: string;
  goal_id: string;
  org_id: string;
  
  lead_mobile_no: number;
  lead_id: string;
  recording_url: string;
  length_in_sec: number;
  avyukta_status: string | null; 
  comments: string | null;
  out_transcription_url: string | null;

  call_timestamp: MongoDate | string; 
  lamh_created_at: MongoDate | string;
  created_at: MongoDate | string;
  updated_at: MongoDate | string;
  deleted_at: MongoDate | null;
  
  lamh_disposition: string;
  QC_score: number;
  
  created_by: string;
  updated_by: string;
  deleted_by: string;

  logging_comments: any | null; 
  actions: any | null;
  errors: any | null;

  analytics_data: {
    outcome: ConversationOutcome;
    scorecard: ConversationScorecard;
  } | null;
}

export interface ListConversationsParams {
  campaignId?: string | null;
  teamId?: string | null;
  skip?: number;
  limit?: number;
}

/**
 * Payload for submitting a scorecard parameter review.
 * Corresponds to: PUT /api/v1/conversations/{id}/scorecard/{param_name}
 */
export interface ScorecardReviewPayload {
  review_score: number;
  reason_for_update: string;
}

/**
 * Payload for submitting an outcome parameter review.
 * Corresponds to: PUT /api/v1/conversations/{id}/outcome/{param_name}
 */
export interface OutcomeReviewPayload {
  reviewer_value: any; // Can be string, number, boolean, etc.
  reviewer_reason: string;
}