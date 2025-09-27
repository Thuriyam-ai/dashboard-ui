export interface Version {
  version_id: string;
  version_number: number;
  status: string;
}

export interface Goal {
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