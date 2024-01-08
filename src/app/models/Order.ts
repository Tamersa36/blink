export interface Order {
  _id?: string;
  tableId: string;
  content: string;
  status?: string;
  createdAt?: string;
  closedAt?: string;
}
