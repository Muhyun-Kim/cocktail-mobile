export interface UserInfo {
  userId: string;
  createdAt: string;
  deactivatedAt: string | null;
  email: string;
  isDeactivated: boolean;
  userName: string;
}
