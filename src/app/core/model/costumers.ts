import { Order } from './order';

export interface Costumers {
  id: number;
  name: string;
  password: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  Order: Order[];
}
