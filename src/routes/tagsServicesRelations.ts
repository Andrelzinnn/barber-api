import { Elysia } from "elysia";
import {
  getAllServiceTags,
  getRelationByServiceId,
  getRelationByTagId,
  createServiceTagRelation,
  deleteServiceTagRelationByServiceId,
  deleteServiceTagRelationByTagId,
} from "@/services/tagsRelations";
import { validateServiceTagSchema } from "@/types/TagsServices";

import { handleApiError } from "@/types/HandleApiError";

export const tagsServicesRelationsRoutes = new Elysia({
  prefix: "/api/tags-services-relations",
})
  .get("/", async ({ set }) => {
    try {
      const relations = await getAllServiceTags();
      return { success: true, data: relations };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .get("/service/:id", async ({ params, set }) => {
    try {
      const relation = await getRelationByServiceId(params.id);
      if (!relation) {
        set.status = 404;
        return { success: false, message: "Relation not found" };
      }
      return { success: true, data: relation };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .get("/tag/:id", async ({ params, set }) => {
    try {
      const relation = await getRelationByTagId(params.id);
      if (!relation) {
        set.status = 404;
        return { success: false, message: "Relation not found" };
      }
      return { success: true, data: relation };
    } catch (error) {
      return handleApiError(error, set);
    }
  })

  .post("/", async ({ body, set }) => {
    try {
      const validatedData = validateServiceTagSchema.parse(body);
      const relation = await createServiceTagRelation(
        validatedData.service_id,
        validatedData.tag_id
      );
      set.status = 201;
      return { success: true, data: relation };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .delete("/service/:id", async ({ params, set }) => {
    try {
      const relation = await deleteServiceTagRelationByServiceId(params.id);
      if (!relation) {
        set.status = 404;
        return { success: false, message: "Relation not found" };
      }
      return { success: true, data: relation };
    } catch (error) {
      return handleApiError(error, set);
    }
  })
  .delete("/tag/:id", async ({ params, set }) => {
    try {
      const relation = await deleteServiceTagRelationByTagId(params.id);
      if (!relation) {
        set.status = 404;
        return { success: false, message: "Relation not found" };
      }
      return { success: true, data: relation };
    } catch (error) {
      return handleApiError(error, set);
    }
  });
