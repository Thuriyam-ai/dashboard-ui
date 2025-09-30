/**
 * Represents a conversation object returned from the backend API.
 * Based on the ConversationResponse schema from the OpenAPI spec.
 */
export interface ConversationResponse {
  conversation_id: string;
  agent_id: string;
  employer_user_id: string; // Used as Customer ID
  campaign_id: string;
  team_id: string;
  length_in_sec: number;
  call_timestamp: string; // ISO date string
  avyukta_status: string | null; // e.g., "COMPLETED", "FAILED"
  lamh_disposition: string;
  QC_score: number;
  // Other fields from the API can be added as needed
  [key: string]: any; 
}