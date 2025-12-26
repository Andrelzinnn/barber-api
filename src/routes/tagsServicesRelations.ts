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
import { betterauth } from "@/auth/auth";

export const tagsServicesRelationsRoutes = new Elysia({
  prefix: "/api/tags-services-relations",
})
  .use(betterauth)
  .get("/", async ({ set }) => {
    const relations = await getAllServiceTags();
    return { success: true, data: relations };
  })
  .get("/service/:id", async ({ params, set }) => {
    const relation = await getRelationByServiceId(params.id);
    if (!relation) {
      set.status = 404;
      return { success: false, message: "Relation not found" };
    }
    return { success: true, data: relation };
  })
  .get("/tag/:id", async ({ params, set }) => {
    const relation = await getRelationByTagId(params.id);
    if (!relation) {
      set.status = 404;
      return { success: false, message: "Relation not found" };
    }
    return { success: true, data: relation };
  })

  .guard(
    {
      beforeHandle({ user }) {
        if (!user) throw new Error("Unauthorized");
      },
    },
    (app) =>
      app
        .post("/", async ({ body }) => {
          const validatedData = validateServiceTagSchema.parse(body);
          const relation = await createServiceTagRelation(
            validatedData.service_id,
            validatedData.tag_id
          );
          return { success: true, data: relation };
        })

        .delete("/service/:id", async ({ params, set }) => {
          const relation = await deleteServiceTagRelationByServiceId(params.id);
          if (!relation) {
            set.status = 404;
            return { success: false, message: "Relation not found" };
          }
          return { success: true, data: relation };
        })
        .delete("/tag/:id", async ({ params, set }) => {
          const relation = await deleteServiceTagRelationByTagId(params.id);
          if (!relation) {
            set.status = 404;
            return { success: false, message: "Relation not found" };
          }
          return { success: true, data: relation };
        })
  );
