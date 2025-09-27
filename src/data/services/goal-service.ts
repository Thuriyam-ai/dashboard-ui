import apiClient from './api-client';
import { Goal, ActiveGoalSummary } from '@/types/api/goal';

interface GetAllGoalsParams {
  skip?: number;
  limit?: number;
}

export const getAllGoals = async ({ skip = 0, limit = 100 }: GetAllGoalsParams = {}): Promise<Goal[]> => {
  try {
    const response = await apiClient.get<Goal[]>('/api/v1/goals/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch goals:', error);
    throw error;
  }
};

/**
 * Fetches a summary list of all goals that have an active/published version.
 * Used for populating selection dropdowns.
 */
export const getActiveGoalsSummary = async (): Promise<ActiveGoalSummary[]> => {
  try {
    const response = await apiClient.get<ActiveGoalSummary[]>('/api/v1/goals/active-summary');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch active goals summary:', error);
    throw new Error('Could not fetch active goals summary.');
  }
};
