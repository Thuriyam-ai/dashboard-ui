import apiClient from './api-client';
import { 
  ConversationDetailResponse, 
  ConversationResponse, 
  ListConversationsParams,
  OutcomeReviewPayload,
  ScorecardReviewPayload
} from '@/types/api/conversation';

/**
 * Fetches a paginated and filtered list of conversations from the API.
 * @param params - The filtering and pagination parameters.
 * @returns A promise that resolves to an array of conversation objects.
 */
export const listConversations = async (params: ListConversationsParams): Promise<ConversationResponse[]> => {
  const { campaignId, teamId, skip = 0, limit = 100 } = params;

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
};

/**
 * Fetches a single conversation's details by ID from the API.
 * Corresponds to: GET /api/v1/conversations/{id}
 * @param conversationId - The unique ID of the conversation.
 * @returns A promise that resolves to a detailed conversation object.
 */
export const getConversationDetail = async (conversationId: string): Promise<ConversationDetailResponse> => {
  try {
    const response = await apiClient.get<ConversationDetailResponse>(
      `/api/v1/conversations/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch conversation detail for ID: ${conversationId}`, error);
    throw new Error(`Could not fetch conversation details for ${conversationId}. Please try again.`);
  }
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