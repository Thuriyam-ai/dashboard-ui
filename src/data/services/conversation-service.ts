import apiClient from './api-client';
import { 
  ConversationDetailResponse, 
  ConversationResponse, 
  ListConversationsParams,
  OutcomeReviewPayload,
  ScorecardReviewPayload
} from '@/types/api/conversation';

// Sample conversation data for development/demo purposes
const SAMPLE_CONVERSATIONS: ConversationResponse[] = [
  {
    conversation_id: "conv_001",
    agent_id: "agent_001",
    employer_user_id: "emp_001",
    campaign_id: "camp_001",
    team_id: "team_001",
    length_in_sec: 420,
    call_timestamp: "2024-01-15T10:30:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "INTERESTED",
    QC_score: 85
  },
  {
    conversation_id: "conv_002",
    agent_id: "agent_002",
    employer_user_id: "emp_002",
    campaign_id: "camp_001",
    team_id: "team_002",
    length_in_sec: 380,
    call_timestamp: "2024-01-15T11:15:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "NOT_INTERESTED",
    QC_score: 72
  },
  {
    conversation_id: "conv_003",
    agent_id: "agent_003",
    employer_user_id: "emp_003",
    campaign_id: "camp_002",
    team_id: "team_001",
    length_in_sec: 520,
    call_timestamp: "2024-01-15T14:20:00Z",
    avyukta_status: "IN_PROGRESS",
    lamh_disposition: "CALLBACK_REQUESTED",
    QC_score: 91
  },
  {
    conversation_id: "conv_004",
    agent_id: "agent_001",
    employer_user_id: "emp_004",
    campaign_id: "camp_002",
    team_id: "team_003",
    length_in_sec: 290,
    call_timestamp: "2024-01-15T15:45:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "INTERESTED",
    QC_score: 78
  },
  {
    conversation_id: "conv_005",
    agent_id: "agent_004",
    employer_user_id: "emp_005",
    campaign_id: "camp_001",
    team_id: "team_002",
    length_in_sec: 450,
    call_timestamp: "2024-01-15T16:30:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "NOT_INTERESTED",
    QC_score: 88
  },
  {
    conversation_id: "conv_006",
    agent_id: "agent_002",
    employer_user_id: "emp_006",
    campaign_id: "camp_003",
    team_id: "team_001",
    length_in_sec: 360,
    call_timestamp: "2024-01-16T09:15:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "INTERESTED",
    QC_score: 82
  },
  {
    conversation_id: "conv_007",
    agent_id: "agent_005",
    employer_user_id: "emp_007",
    campaign_id: "camp_003",
    team_id: "team_003",
    length_in_sec: 480,
    call_timestamp: "2024-01-16T10:30:00Z",
    avyukta_status: "IN_PROGRESS",
    lamh_disposition: "CALLBACK_REQUESTED",
    QC_score: 75
  },
  {
    conversation_id: "conv_008",
    agent_id: "agent_003",
    employer_user_id: "emp_008",
    campaign_id: "camp_001",
    team_id: "team_002",
    length_in_sec: 320,
    call_timestamp: "2024-01-16T11:45:00Z",
    avyukta_status: "COMPLETED",
    lamh_disposition: "NOT_INTERESTED",
    QC_score: 90
  }
];

/**
 * Fetches a paginated and filtered list of conversations from the API.
 * @param params - The filtering and pagination parameters.
 * @returns A promise that resolves to an array of conversation objects.
 */
export const listConversations = async (params: ListConversationsParams): Promise<ConversationResponse[]> => {
  const { campaignId, teamId, skip = 0, limit = 100 } = params;

  // For development/demo purposes, return sample data
  // In production, this would make the actual API call
  console.log('Using sample conversation data for development');
  
  // Filter sample data based on parameters
  let filteredConversations = [...SAMPLE_CONVERSATIONS];
  
  if (campaignId && campaignId !== 'all') {
    filteredConversations = filteredConversations.filter(conv => conv.campaign_id === campaignId);
  }
  
  if (teamId && teamId !== 'all') {
    filteredConversations = filteredConversations.filter(conv => conv.team_id === teamId);
  }
  
  // Apply pagination
  const startIndex = skip;
  const endIndex = startIndex + limit;
  const paginatedConversations = filteredConversations.slice(startIndex, endIndex);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return paginatedConversations;

  // Original API call code (commented out for development)
  /*
  // Build query parameters, excluding null/undefined values
  const queryParams = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });

  if (campaignId && campaignId !== 'all') {
    queryParams.append('campaign_id', campaignId);
  }
  if (teamId && teamId !== 'all') {
    queryParams.append('team_id', teamId);
  }

  try {
    const response = await apiClient.get<ConversationResponse[]>(
      `/api/v1/conversations/?${queryParams.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch conversations:', error);
    throw new Error('Could not fetch conversations data. Please try again.');
  }
  */
};

// Sample detailed conversation data for development/demo purposes
const SAMPLE_CONVERSATION_DETAILS: ConversationDetailResponse[] = [
  {
    _id: { $oid: "507f1f77bcf86cd799439011" },
    conversation_id: "conv_001",
    agent_id: "agent_001",
    employer_user_id: "emp_001",
    campaign_id: "camp_001",
    team_id: "team_001",
    goal_id: "goal_001",
    org_id: "org_001",
    lead_mobile_no: 9876543210,
    lead_id: "lead_001",
    recording_url: "https://example.com/recordings/conv_001.mp3",
    length_in_sec: 420,
    avyukta_status: "COMPLETED",
    comments: "Customer was very satisfied with the support provided",
    out_transcription_url: "https://example.com/transcriptions/conv_001.txt",
    call_timestamp: { $date: "2024-01-15T10:30:00Z" },
    lamh_created_at: { $date: "2024-01-15T10:30:00Z" },
    created_at: { $date: "2024-01-15T10:30:00Z" },
    updated_at: { $date: "2024-01-15T10:35:00Z" },
    deleted_at: null,
    lamh_disposition: "INTERESTED",
    QC_score: 85,
    created_by: "system",
    updated_by: "agent_001",
    deleted_by: "",
    logging_comments: null,
    actions: null,
    errors: null,
    analytics_data: {
      outcome: {
        customer_satisfaction: {
          attribute_name: "Customer Satisfaction",
          extracted_value: "High",
          reasoning: "Customer expressed satisfaction multiple times during the call",
          reviewer_value: null,
          reviewer_reason: ""
        },
        issue_resolved: {
          attribute_name: "Issue Resolved",
          extracted_value: true,
          reasoning: "Customer confirmed the issue was completely resolved",
          reviewer_value: null,
          reviewer_reason: ""
        },
        follow_up_required: {
          attribute_name: "Follow Up Required",
          extracted_value: false,
          reasoning: "Customer indicated no further assistance needed",
          reviewer_value: null,
          reviewer_reason: ""
        }
      },
      scorecard: {
        greeting: {
          parameter: "Greeting",
          score: 8,
          max_score: 10,
          explanation: "Agent greeted customer professionally and introduced themselves clearly",
          sub_rule_analysis: [
            {
              rule: "Professional greeting",
              status: "Pass",
              reason: "Used appropriate greeting"
            },
            {
              rule: "Self introduction",
              status: "Pass",
              reason: "Clearly stated name and purpose"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        empathy: {
          parameter: "Empathy",
          score: 9,
          max_score: 10,
          explanation: "Agent showed excellent empathy throughout the conversation",
          sub_rule_analysis: [
            {
              rule: "Acknowledged customer concerns",
              status: "Pass",
              reason: "Actively listened and acknowledged issues"
            },
            {
              rule: "Used empathetic language",
              status: "Pass",
              reason: "Used appropriate empathetic phrases"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        problem_solving: {
          parameter: "Problem Solving",
          score: 8,
          max_score: 10,
          explanation: "Effectively identified and resolved the customer's issue",
          sub_rule_analysis: [
            {
              rule: "Identified root cause",
              status: "Pass",
              reason: "Quickly identified the underlying issue"
            },
            {
              rule: "Provided solution",
              status: "Pass",
              reason: "Offered clear, actionable solution"
            }
          ],
          review_score: null,
          reason_for_update: ""
        }
      }
    }
  },
  {
    _id: { $oid: "507f1f77bcf86cd799439012" },
    conversation_id: "conv_002",
    agent_id: "agent_002",
    employer_user_id: "emp_002",
    campaign_id: "camp_001",
    team_id: "team_002",
    goal_id: "goal_002",
    org_id: "org_001",
    lead_mobile_no: 9876543211,
    lead_id: "lead_002",
    recording_url: "https://example.com/recordings/conv_002.mp3",
    length_in_sec: 380,
    avyukta_status: "COMPLETED",
    comments: "Customer was not interested in the product",
    out_transcription_url: "https://example.com/transcriptions/conv_002.txt",
    call_timestamp: { $date: "2024-01-15T11:15:00Z" },
    lamh_created_at: { $date: "2024-01-15T11:15:00Z" },
    created_at: { $date: "2024-01-15T11:15:00Z" },
    updated_at: { $date: "2024-01-15T11:20:00Z" },
    deleted_at: null,
    lamh_disposition: "NOT_INTERESTED",
    QC_score: 72,
    created_by: "system",
    updated_by: "agent_002",
    deleted_by: "",
    logging_comments: null,
    actions: null,
    errors: null,
    analytics_data: {
      outcome: {
        customer_satisfaction: {
          attribute_name: "Customer Satisfaction",
          extracted_value: "Medium",
          reasoning: "Customer was polite but not engaged",
          reviewer_value: null,
          reviewer_reason: ""
        },
        issue_resolved: {
          attribute_name: "Issue Resolved",
          extracted_value: false,
          reasoning: "Customer declined the offer",
          reviewer_value: null,
          reviewer_reason: ""
        },
        follow_up_required: {
          attribute_name: "Follow Up Required",
          extracted_value: false,
          reasoning: "Customer explicitly declined further contact",
          reviewer_value: null,
          reviewer_reason: ""
        }
      },
      scorecard: {
        greeting: {
          parameter: "Greeting",
          score: 7,
          max_score: 10,
          explanation: "Standard greeting but could be more engaging",
          sub_rule_analysis: [
            {
              rule: "Professional greeting",
              status: "Pass",
              reason: "Used appropriate greeting"
            },
            {
              rule: "Self introduction",
              status: "Pass",
              reason: "Introduced themselves"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        empathy: {
          parameter: "Empathy",
          score: 6,
          max_score: 10,
          explanation: "Limited empathy shown during the conversation",
          sub_rule_analysis: [
            {
              rule: "Acknowledged customer concerns",
              status: "Fail",
              reason: "Did not fully acknowledge customer's disinterest"
            },
            {
              rule: "Used empathetic language",
              status: "Pass",
              reason: "Used some empathetic phrases"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        problem_solving: {
          parameter: "Problem Solving",
          score: 7,
          max_score: 10,
          explanation: "Attempted to address concerns but was not persuasive",
          sub_rule_analysis: [
            {
              rule: "Identified root cause",
              status: "Pass",
              reason: "Understood customer's lack of interest"
            },
            {
              rule: "Provided solution",
              status: "Fail",
              reason: "Solution was not compelling enough"
            }
          ],
          review_score: null,
          reason_for_update: ""
        }
      }
    }
  },
  {
    _id: { $oid: "507f1f77bcf86cd799439013" },
    conversation_id: "conv_003",
    agent_id: "agent_003",
    employer_user_id: "emp_003",
    campaign_id: "camp_002",
    team_id: "team_001",
    goal_id: "goal_003",
    org_id: "org_001",
    lead_mobile_no: 9876543212,
    lead_id: "lead_003",
    recording_url: "https://example.com/recordings/conv_003.mp3",
    length_in_sec: 520,
    avyukta_status: "IN_PROGRESS",
    comments: "Customer requested callback for further discussion",
    out_transcription_url: "https://example.com/transcriptions/conv_003.txt",
    call_timestamp: { $date: "2024-01-15T14:20:00Z" },
    lamh_created_at: { $date: "2024-01-15T14:20:00Z" },
    created_at: { $date: "2024-01-15T14:20:00Z" },
    updated_at: { $date: "2024-01-15T14:25:00Z" },
    deleted_at: null,
    lamh_disposition: "CALLBACK_REQUESTED",
    QC_score: 91,
    created_by: "system",
    updated_by: "agent_003",
    deleted_by: "",
    logging_comments: null,
    actions: null,
    errors: null,
    analytics_data: {
      outcome: {
        customer_satisfaction: {
          attribute_name: "Customer Satisfaction",
          extracted_value: "High",
          reasoning: "Customer was very engaged and interested",
          reviewer_value: null,
          reviewer_reason: ""
        },
        issue_resolved: {
          attribute_name: "Issue Resolved",
          extracted_value: false,
          reasoning: "Customer needs more time to consider the offer",
          reviewer_value: null,
          reviewer_reason: ""
        },
        follow_up_required: {
          attribute_name: "Follow Up Required",
          extracted_value: true,
          reasoning: "Customer specifically requested a callback",
          reviewer_value: null,
          reviewer_reason: ""
        }
      },
      scorecard: {
        greeting: {
          parameter: "Greeting",
          score: 9,
          max_score: 10,
          explanation: "Excellent greeting that immediately engaged the customer",
          sub_rule_analysis: [
            {
              rule: "Professional greeting",
              status: "Pass",
              reason: "Used warm, professional greeting"
            },
            {
              rule: "Self introduction",
              status: "Pass",
              reason: "Clear introduction with purpose"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        empathy: {
          parameter: "Empathy",
          score: 10,
          max_score: 10,
          explanation: "Outstanding empathy throughout the conversation",
          sub_rule_analysis: [
            {
              rule: "Acknowledged customer concerns",
              status: "Pass",
              reason: "Actively listened and validated concerns"
            },
            {
              rule: "Used empathetic language",
              status: "Pass",
              reason: "Used excellent empathetic language"
            }
          ],
          review_score: null,
          reason_for_update: ""
        },
        problem_solving: {
          parameter: "Problem Solving",
          score: 9,
          max_score: 10,
          explanation: "Excellent problem-solving approach that built trust",
          sub_rule_analysis: [
            {
              rule: "Identified root cause",
              status: "Pass",
              reason: "Thoroughly understood customer needs"
            },
            {
              rule: "Provided solution",
              status: "Pass",
              reason: "Offered compelling solution"
            }
          ],
          review_score: null,
          reason_for_update: ""
        }
      }
    }
  }
];

/**
 * Fetches a single conversation's details by ID from the API.
 * Corresponds to: GET /api/v1/conversations/{id}
 * @param conversationId - The unique ID of the conversation.
 * @returns A promise that resolves to a detailed conversation object.
 */
export const getConversationDetail = async (conversationId: string): Promise<ConversationDetailResponse> => {
  // For development/demo purposes, return sample data
  console.log(`Using sample conversation detail data for ID: ${conversationId}`);
  
  // Find the conversation detail by ID
  const conversationDetail = SAMPLE_CONVERSATION_DETAILS.find(conv => conv.conversation_id === conversationId);
  
  if (!conversationDetail) {
    throw new Error(`Conversation with ID ${conversationId} not found`);
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return conversationDetail;

  // Original API call code (commented out for development)
  /*
  try {
    const response = await apiClient.get<ConversationDetailResponse>(
      `/api/v1/conversations/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch conversation detail for ID: ${conversationId}`, error);
    throw new Error(`Could not fetch conversation details for ${conversationId}. Please try again.`);
  }
  */
};

/**
 * Submits a review for a single scorecard parameter.
 * Corresponds to: PUT /api/v1/conversations/{id}/scorecard/{param_name}
 * @param conversationId - The ID of the conversation.
 * @param parameterName - The name of the scorecard parameter being reviewed.
 * @param payload - The review data (score and reason).
 * @returns A promise that resolves on successful submission.
 */
export const submitScorecardReview = async (
  conversationId: string,
  parameterId: string,
  payload: ScorecardReviewPayload
): Promise<any> => {
  try {
    const response = await apiClient.put(
      `/api/v1/conversations/${conversationId}/scorecard/${parameterId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to submit scorecard review for parameter: ${parameterId}`, error);
    throw new Error(`Could not submit scorecard review for "${parameterId}". Please try again.`);
  }
};

/**
 * Submits a review for a single outcome parameter.
 * Corresponds to: PUT /api/v1/conversations/{id}/outcome/{param_name}
 * @param conversationId - The ID of the conversation.
 * @param attributeName - The name of the outcome attribute being reviewed.
 * @param payload - The review data (value and reason).
 * @returns A promise that resolves on successful submission.
 */
export const submitOutcomeReview = async (
  conversationId: string,
  attributeId: string,
  payload: OutcomeReviewPayload
): Promise<any> => {
  try {
    const response = await apiClient.put(
      `/api/v1/conversations/${conversationId}/outcome/${attributeId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to submit outcome review for attribute: ${attributeId}`, error);
    throw new Error(`Could not submit outcome review for "${attributeId}". Please try again.`);
  }
};