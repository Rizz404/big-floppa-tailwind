export interface User {
  id: string;
  oauthId: string | null;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  lastLogin: Date | null;
  isOauth: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  profile: Profile;
}

export interface Profile {
  id: string;
  firstname: string | null;
  lastname: string | null;
  profilePicture: string | null;
  gender: "MALE" | "FEMALE";
  age: string | null;
  phoneNumber: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type LoginData = Pick<User, "email" | "password">;
export type RegisterData = Pick<User, "username" | "email" | "password">;

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}
