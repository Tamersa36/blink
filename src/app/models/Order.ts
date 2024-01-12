export interface Order {
  type?: string;
  _id?: string;
  tableId: string;
  content: string;
  status?: string;
  createdAt?: string;
  closedAt?: string;
}
