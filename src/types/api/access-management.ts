export interface Team {
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  organization_id: string;
  users: User[];
}

export interface User {
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  is_active: boolean;
  is_verified: boolean;
  last_login_at: string | null;
  organization_id: string | null;
  role: string;
  teams: Team[];
}

export interface TeamCreatePayload {
    name: string;
    slug: string;
    organization_id: string;
}

export interface UserUpdatePayload {
    first_name?: string;
    last_name?: string;
    is_active?: boolean;
}