export interface User {
  id: string;
  email: string;
  avatar?: string;
  username?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
