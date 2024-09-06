export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  paymentFee: number;
  createdAt: Date;
  updatedAt: Date;
}
