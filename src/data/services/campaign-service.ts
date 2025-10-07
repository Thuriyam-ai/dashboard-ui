import apiClient from './api-client';
import { Campaign } from '@/types/api/campaign';
import { CampaignCreate, CampaignUpdate, CampaignDetail } from '@/types/api/campaign';

interface GetAllCampaignsParams {
  skip?: number;
  limit?: number;
}

// Sample campaign data for development/demo purposes
const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    campaign_id: "camp_001",
    campaign_name: "Customer Support Campaign",
    description: "Handling customer support inquiries and issues",
    status: "ACTIVE",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    campaign_id: "camp_002", 
    campaign_name: "Sales Outreach Campaign",
    description: "Proactive sales outreach to potential customers",
    status: "ACTIVE",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  },
  {
    campaign_id: "camp_003",
    campaign_name: "Technical Support Campaign", 
    description: "Technical support and troubleshooting assistance",
    status: "ACTIVE",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z"
  }
];

/**
 * Fetches a paginated list of all campaigns.
 */
export const getAllCampaigns = async ({ skip = 0, limit = 100 }: GetAllCampaignsParams = {}): Promise<Campaign[]> => {
  // For development/demo purposes, return sample data
  console.log('Using sample campaign data for development');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Apply pagination
  const startIndex = skip;
  const endIndex = startIndex + limit;
  return SAMPLE_CAMPAIGNS.slice(startIndex, endIndex);

  // Original API call code (commented out for development)
  /*
  try {
    const response = await apiClient.get<Campaign[]>('/api/v1/campaigns/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch campaigns:', error);
    throw new Error('Could not fetch campaigns.');
  }
  */
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