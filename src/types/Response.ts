import { serviceTable } from "@/db/schema";

export type Service = typeof serviceTable.$inferSelect;
export type CreateService = typeof serviceTable.$inferInsert;
export type UpdateService = Partial<Omit<CreateService, "id">>;

// Tipos específicos da API
export type ServiceResponse = {
  success: boolean;
  data: Service | Service[];
  message?: string;
};

export type ServiceError = {
  success: false;
  error: string;
  code: number;
};
