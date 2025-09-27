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


export interface Owner {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
}

export interface SimpleSuccessResponse {
    success: boolean;
    message: string;
}

export interface GoalCreateRequest {
  interaction_blueprint: {
    goal_metadata: {
      name: string;
      description: string;
      owner_id: string;
      default_team_id: string;
      tags: string;
    };
    prompt_text: string;
    dynamic_variables: string;
  };
  structured_data: Array<{
    attribute_name: string;
    data_type: string;
    is_required: boolean;
    is_pii: boolean;
    weight: number;
    display_order: number;
    configuration: string;
    elicitation_prompt: string;
  }>;
  conversation_insights: {
    conversation_insights_config: {
      [key: string]: boolean;
    };
    disposition_config: Array<{
      name: string;
      category: string;
      display_order: number;
      description: string | null;
    }>;
  };
  quality_scorecard: Array<{
    name: string;
    max_score: number;
    failure_type: string;
    scoring_type: string;
    display_order: number;
    rules_and_explanation: string;
  }>;
}

export interface ActiveGoalSummary {
  goal_id: string;
  goal_name: string;
  active_version_no: number;
}