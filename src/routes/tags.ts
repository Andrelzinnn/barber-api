import { Elysia } from "elysia";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} from "@/services/tags";
import {
  NewTag,
  validateTagSchema,
  updateTagSchema,
  tagIdSchema,
} from "@/types/Tags";
import { handleApiError } from "@/types/HandleApiError";

export const tagRoutes = new Elysia({ prefix: "/api/tags" })
  .get("/", async ({ set }) => {
    try {
      const tags = await getAllTags();
      return { success: true, data: tags };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .get("/:id", async ({ params, set }) => {
    try {
      const id = tagIdSchema.parse(params.id);
      const tag = await getTagById(id);
      if (!tag) {
        set.status = 404;
        return { success: false, message: "Tag not found" };
      }
      return { success: true, data: tag };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .post("/", async ({ body, set }) => {
    try {
      const validatedData = validateTagSchema.parse(body);
      const tag = await createTag(validatedData);
      set.status = 201;
      return { success: true, data: tag };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .put("/:id", async ({ params, body, set }) => {
    try {
      const validatedData = updateTagSchema.parse(body);
      const tag = await updateTagById(params.id, validatedData);
      if (!tag || tag.length === 0) {
        set.status = 404;
        return { success: false, message: "Tag not found" };
      }
      set.status = 200;
      return { success: true, data: tag[0] };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .delete("/:id", async ({ params, set }) => {
    try {
      const id = tagIdSchema.parse(params.id);
      const tag = await deleteTagById(id);
      if (!tag || tag.length === 0) {
        set.status = 404;
        return { success: false, message: "Tag not found" };
      }
      set.status = 200;
      return { success: true, data: tag[0] };
    } catch (error) {
      return handleApiError(error, set);
    }
  });
