export interface Message {
  id: string;
  content: string;
}

export interface UpdateInput {
  message_id: string;
  content?: string;
  tenantId: string;
  status: string;
}
