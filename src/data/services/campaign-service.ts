import apiClient from './api-client';
import { Campaign } from '@/types/api/campaign';
import { CampaignCreate, CampaignUpdate, CampaignDetail } from '@/types/api/campaign';

interface GetAllCampaignsParams {
  skip?: number;
  limit?: number;
}

/**
 * Fetches a paginated list of all campaigns.
 */
export const getAllCampaigns = async ({ skip = 0, limit = 100 }: GetAllCampaignsParams = {}): Promise<Campaign[]> => {
  try {
    const response = await apiClient.get<Campaign[]>('/api/v1/campaigns/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    throw new Error('Could not fetch campaigns.');
  }
};

/**
 * Deletes a campaign by its ID.
 * The API returns a 204 No Content on success.
 */
export const deleteCampaign = async (campaignId: string): Promise<void> => {
  try {
    await apiClient.delete(`/api/v1/campaigns/${campaignId}`);
  } catch (error) {
    console.error(`Failed to delete campaign ${campaignId}:`, error);
    throw new Error('Could not delete the campaign.');
  }
};

/**
 * Fetches the full details of a single campaign by its ID.
 */
export const getCampaignById = async (campaignId: string): Promise<CampaignDetail> => {
  try {
    const response = await apiClient.get<CampaignDetail>(`/api/v1/campaigns/${campaignId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch campaign ${campaignId}:`, error);
    throw new Error('Could not fetch campaign details.');
  }
};

/**
 * Creates a new campaign.
 */
export const createCampaign = async (campaignData: CampaignCreate): Promise<CampaignDetail> => {
  try {
    const response = await apiClient.post<CampaignDetail>('/api/v1/campaigns/', campaignData);
    return response.data;
  } catch (error) {
    console.error('Failed to create campaign:', error);
    throw new Error('Could not create campaign.');
  }
};

/**
 * Updates an existing campaign.
 */
export const updateCampaign = async (campaignId: string, campaignData: CampaignUpdate): Promise<CampaignDetail> => {
  try {
    const response = await apiClient.put<CampaignDetail>(`/api/v1/campaigns/${campaignId}`, campaignData);
    return response.data;
  } catch (error) {
    console.error(`Failed to update campaign ${campaignId}:`, error);
    throw new Error('Could not update campaign.');
  }
};