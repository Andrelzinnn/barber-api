import { clientTable } from "@/db/schema";

export type newClient = typeof clientTable.$inferInsert;
