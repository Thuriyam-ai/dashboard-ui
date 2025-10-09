// src/data/services/goal-service.ts

import apiClient from './api-client'; // Assuming you have a configured axios instance here
import {
  GoalDetailResponse, ActiveGoalSummary, GoalVersionDetailResponse,
  GoalCreateRequest, GoalUpdateRequest, SimpleSuccessResponse,
  Owner, Team
} from '@/types/api/goal';

// --- Read Operations ---

export const getAllGoals = async (skip = 0, limit = 100): Promise<GoalDetailResponse[]> => {
  const response = await apiClient.get('/api/v1/goals/', { params: { skip, limit } });
  return response.data;
};

export const getActiveGoalsSummary = async (): Promise<ActiveGoalSummary[]> => {
  const response = await apiClient.get('/api/v1/goals/active-summary');
  return response.data;
};

export const getGoalVersion = async (goalId: string, versionType: 'draft' | 'active'): Promise<GoalVersionDetailResponse> => {
  const response = await apiClient.get(`/api/v1/goals/${goalId}/versions/${versionType}`);
  return response.data;
};

// --- Write Operations ---

export const createGoal = async (goalData: GoalCreateRequest): Promise<SimpleSuccessResponse> => {
  const response = await apiClient.post('/api/v1/goals/', goalData);
  return response.data;
};

export const updateDraftVersion = async (goalId: string, goalData: GoalUpdateRequest): Promise<GoalVersionDetailResponse> => {
    const response = await apiClient.put(`/api/v1/goals/${goalId}/versions/draft`, goalData);
    return response.data;
};

export const publishDraftVersion = async (goalId: string): Promise<SimpleSuccessResponse> => {
    const response = await apiClient.put(`/api/v1/goals/${goalId}/versions/draft/publish`);
    return response.data;
};

export const deleteGoal = async (goalId: string): Promise<SimpleSuccessResponse> => {
    const response = await apiClient.delete(`/api/v1/goals/${goalId}`);
    return response.data;
};

// --- Utility Operations ---

export const getOwners = async (): Promise<Owner[]> => {
  const response = await apiClient.get('/api/v1/goals/utils/owners');
  return response.data;
};

export const getTeams = async (): Promise<Team[]> => {
  const response = await apiClient.get('/api/v1/goals/utils/teams');
  return response.data;
};


export const canEditGoal = async (goalId: string): Promise<boolean> => {
  try {
    // If the API returns a 200 OK response, it means the goal is editable.
    await apiClient.get(`/api/v1/goals/${goalId}/can_edit`);
    return true;
  } catch (error) {
    // If the API returns an error (like 400), it means the goal is NOT editable.
    console.error(`Check for goal ${goalId} failed, assuming it's not editable.`);
    return false;
  }
};