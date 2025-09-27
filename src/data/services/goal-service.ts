import apiClient from './api-client';
import { Goal } from '@/types/api/goal';

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
