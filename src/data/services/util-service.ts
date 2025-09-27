import apiClient from './api-client';
import { TeamSummary } from '@/types/api/team';

/**
 * Fetches a simple list of all teams in the organization.
 * Used for populating selection dropdowns.
 */
export const getAllTeams = async (): Promise<TeamSummary[]> => {
  try {
    const response = await apiClient.get<TeamSummary[]>('/api/v1/goals/utils/teams');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw new Error('Could not fetch teams.');
  }
};