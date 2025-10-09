import apiClient from './api-client';
import { User, Team, TeamCreatePayload } from '@/types/api/access-management';

interface GetUsersParams {
  skip?: number;
  limit?: number;
  team_slug?: string;
  username?: string;
  email?: string;
  role?: string;
}

/**
 * Fetches a list of users.
 */
export const getUsers = async (params: GetUsersParams = {}): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>('/api/v1/accounts_users/', { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Could not fetch users.');
  }
};

/**
 * Fetches a list of teams.
 */
export const getTeams = async (skip: number = 0, limit: number = 100): Promise<Team[]> => {
  try {
    const response = await apiClient.get<Team[]>('/api/v1/accounts_teams/', {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch teams:', error);
    throw new Error('Could not fetch teams.');
  }
};

/**
 * Fetches the list of users for a specific team.
 * @param teamSlug The slug of the team.
 */
export const getUsersInTeam = async (teamSlug: string): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>(`/api/v1/accounts_teams/${teamSlug}/users`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch users for team ${teamSlug}:`, error);
    throw new Error('Could not fetch team members.');
  }
};

/**
 * Creates a new team.
 */
export const createTeam = async (teamData: TeamCreatePayload): Promise<Team> => {
    try {
        const response = await apiClient.post<Team>('/api/v1/accounts_teams/', teamData);
        return response.data;
    } catch (error) {
        console.error('Failed to create team:', error);
        throw new Error('Could not create team.');
    }
};

/**
 * Deletes a user.
 * @param userEmail The email of the user to delete.
 */
export const deleteUser = async (userEmail: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/accounts_users/${userEmail}`);
    } catch (error) {
        console.error(`Failed to delete user ${userEmail}:`, error);
        throw new Error('Could not delete user.');
    }
};

/**
 * Deletes a team.
 * @param teamSlug The slug of the team to delete.
 */
export const deleteTeam = async (teamSlug: string): Promise<void> => {
    try {
        await apiClient.delete(`/api/v1/accounts_teams/${teamSlug}`);
    } catch (error) {
        console.error(`Failed to delete team ${teamSlug}:`, error);
        throw new Error('Could not delete team.');
    }
};


/**
 * Removes a user from a team.
 * @param teamSlug The slug of the team.
 * @param userEmail The email of the user to remove.
 */
export const removeUserFromTeam = async (teamSlug: string, userEmail: string): Promise<Team> => {
    try {
        const response = await apiClient.delete<Team>(`/api/v1/accounts_teams/${teamSlug}/remove_user/${userEmail}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to remove user ${userEmail} from team ${teamSlug}:`, error);
        throw new Error('Could not remove user from team.');
    }
}