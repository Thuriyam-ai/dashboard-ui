import apiClient from './api-client';
import { ParameterAnalysis } from '@/types/api/analytics';

/**
 * Fetches the aggregated analysis of all quality parameters for a specific campaign.
 * @param campaignId The ID of the campaign to analyze.
 * @returns A promise that resolves to an array of parameter analysis objects.
 */
export const getCampaignParametersAnalysis = async (campaignId: string): Promise<ParameterAnalysis[]> => {
  if (!campaignId) {
    throw new Error('Campaign ID is required.');
  }
  try {
    const response = await apiClient.get<ParameterAnalysis[]>(
      `/api/v1/aggregations/campaigns/${campaignId}/parameters-analysis`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch parameters analysis for campaign ${campaignId}:`, error);
    throw new Error('Could not fetch campaign parameters analysis.');
  }
};