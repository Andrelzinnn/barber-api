import { drizzle } from "drizzle-orm/bun-sqlite";
import Database from "bun:sqlite";
import * as schema from "./schema";

const dbPath = Bun.env.DB_FILE_NAME || "mydb.sqlite";
const sqlite = new Database(dbPath);

export const db = drizzle(sqlite, { schema });
