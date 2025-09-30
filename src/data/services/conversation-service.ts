import apiClient from './api-client';
import { ConversationResponse } from '@/types/api/conversation';

interface ListConversationsParams {
  campaignId?: string | null;
  teamId?: string | null;
  skip?: number;
  limit?: number;
}

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