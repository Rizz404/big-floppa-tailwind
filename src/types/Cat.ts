import { Breed } from "./Breed";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

type Gender = "MALE" | "FEMALE";
type CatStatus = "AVAILABLE" | "SOLD" | "ADOPTED";

export interface Cat {
  id: string;
  name: string | null;
  age: number;
  gender: Gender;
  description: string;
  price: number;
  quantity: number;
  status: CatStatus;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  catBreed: Breed;
  catPictures: CatPicture[];
  cartItems: CartItem[];
  orderItems: OrderItem[];
}

export interface CatPicture {
  id: string;
  fieldname?: string;
  originalname: string;
  mimetype: string;
  size: number;
  destination?: string;
  filename?: string;
  path: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;

  cat: Cat;
}
