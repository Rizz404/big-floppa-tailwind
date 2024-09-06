import { User } from "./User";

export interface Breed {
  id: string;
  name: string;
  description: string;
  image: string | File;
  createdAt: Date;
  updatedAt: Date;

  author: Omit<User, "profile">;
}

export interface BreedFollower {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  user: Omit<User, "profile">;
  breed: Breed;
}
