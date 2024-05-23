import { Schema, model, connect } from 'mongoose';

export type Order = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
};
