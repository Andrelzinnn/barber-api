import { Context } from "elysia";

export function handleApiError(error: unknown, set: Context["set"]) {
  console.error("API Error:", error);

  if (
    error &&
    typeof error === "object" &&
    "name" in error &&
    error.name === "ZodError"
  ) {
    set.status = 400;
    return {
      success: false,
      message: "Validation error",
      errors: "issues" in error ? error.issues : undefined,
    };
  }

  if (error instanceof Error) {
    if (error.message.includes("FOREIGN KEY")) {
      set.status = 400;
      return { success: false, message: "Invalid client or service ID" };
    }

    if (error.message.includes("UNIQUE constraint")) {
      set.status = 409;
      return { success: false, message: "Resource already exists" };
    }
  }

  set.status = 500;
  return { success: false, message: "Internal server error" };
}
