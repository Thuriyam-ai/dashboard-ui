export interface Version {
  version_id: string;
  version_number: number;
  status: string;
}

export interface Goal {
  goal_id: string;
  goal_name: string;
  goal_description: string;
  team_name: string;
  status: string;
  conversations: number;
  avg_score: number;
  completion_score: number;
  versions: Version[];
  active_version: Version;
  is_owner: boolean;
  updated_at: string;
}