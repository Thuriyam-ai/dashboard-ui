/**
 * Represents a campaign in a list view.
 */
export interface Campaign {
  id: string;
  name: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELED' | 'ARCHIVED';
  goal_name: string;
  team_name: string;
  starts_at: string | null;
  ends_at: string | null;
  conversations: number;
  avg_score: number;
  completion_rate: number;
}

/**
 * Represents the detailed view of a campaign, including foreign keys.
 */
export interface CampaignDetail extends Campaign {
  goal_id: string;
  team_id: string;
  // any other detailed fields can be added here
}

/**
 * Payload for creating a new campaign.
 */
export interface CampaignCreate {
  name: string;
  goal_id: string;
  team_id: string;
  starts_at?: string | null;
  ends_at?: string | null;
}

/**
 * Payload for updating an existing campaign.
 */
export interface CampaignUpdate {
  name?: string;
  team_id?: string;
  starts_at?: string | null;
  ends_at?: string | null;
}