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
}

/**
 * Represents the full Scorecard object, which is a dictionary of ScorecardParameterAnalysis.
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
}

/**
 * Represents the full Outcome object, which is a dictionary of OutcomeFieldAnalysis.
 */
export interface ConversationOutcome {
  [key: string]: OutcomeFieldAnalysis;
}

/**
 * Represents a conversation object returned from the backend API.
 */
export interface ConversationResponse {
  _id: { $oid: string }; // Added
  conversation_id: string;
  agent_id: string;
  employer_user_id: string; // Used as Customer ID
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

  // Corrected type to handle MongoDB $date structure
  call_timestamp: MongoDate | string; 
  lamh_created_at: MongoDate | string;
  created_at: MongoDate | string;
  updated_at: MongoDate | string;
  deleted_at: MongoDate | null; // Added
  
  lamh_disposition: string; // Added/Corrected
  QC_score: number;
  
  created_by: string; // Added
  updated_by: string; // Added
  deleted_by: string; // Added

  logging_comments: any | null; 
  actions: any | null;
  errors: any | null;

  analytics_data: {
    outcome: ConversationOutcome;
    scorecard: ConversationScorecard;
  } | null;
}

export type ConversationDetailResponse = ConversationResponse;

// Placeholder for List API structure (unchanged)
export interface ListConversationsParams {
  campaignId?: string | null;
  teamId?: string | null;
  skip?: number;
  limit?: number;
}