import apiClient from './api-client';
import { TeamSummary } from '@/types/api/team';

// Sample team data for development/demo purposes
const SAMPLE_TEAMS: TeamSummary[] = [
  {
    id: "team_001",
    name: "Customer Support Team"
  },
  {
    id: "team_002", 
    name: "Sales Team"
  },
  {
    id: "team_003",
    name: "Technical Support Team"
  }
];

/**
 * Fetches a simple list of all teams in the organization.
 * Used for populating selection dropdowns.
 */
export const getAllTeams = async (): Promise<TeamSummary[]> => {
  // For development/demo purposes, return sample data
  console.log('Using sample team data for development');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  return SAMPLE_TEAMS;

  // Original API call code (commented out for development)
  /*
  try {
    const response = await apiClient.get<TeamSummary[]>('/api/v1/goals/utils/teams');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw new Error('Could not fetch teams.');
  }
  */
};