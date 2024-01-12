import { Order } from './Order';
export interface OrderRequest {
  type: string;
  order: Order;
}
