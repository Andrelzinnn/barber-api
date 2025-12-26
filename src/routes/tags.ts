import { Elysia } from "elysia";
import {
  getAllTags,
  getTagById,
  createTag,
  updateTagById,
  deleteTagById,
} from "@/services/tags";
import { validateTagSchema, updateTagSchema, tagIdSchema } from "@/types/Tags";
import { betterauth } from "@/auth/auth";

export const tagRoutes = new Elysia({ prefix: "/api/tags" })
  .use(betterauth)

  //Rotas Públicas
  .get("/", async () => {
    const tags = await getAllTags();
    return { success: true, data: tags };
  })

  .get("/:id", async ({ params, set }) => {
    const id = tagIdSchema.parse(params.id);
    const tag = await getTagById(id);
    if (!tag) {
      set.status = 404;
      return { success: false, message: "Tag not found" };
    }
    return { success: true, data: tag };
  })

  //Rotas Protegidas
  .guard(
    {
      beforeHandle({ user }) {
        if (!user) throw new Error("Unauthorized");
      },
    },
    (app) =>
      app
        .post("/", async ({ body }) => {
          const validatedData = validateTagSchema.parse(body);
          const tag = await createTag(validatedData);
          return { success: true, data: tag };
        })
        .put("/:id", async ({ params, body, set }) => {
          const validatedData = updateTagSchema.parse(body);
          const tag = await updateTagById(params.id, validatedData);
          if (!tag || tag.length === 0) {
            set.status = 404;
            return { success: false, message: "Tag not found" };
          }
          return { success: true, data: tag };
        })
        .delete("/:id", async ({ params, set }) => {
          const id = tagIdSchema.parse(params.id);
          const tag = await deleteTagById(id);
          if (!tag || tag.length === 0) {
            set.status = 404;
            return { success: false, message: "Tag not found" };
          }
          return { success: true, data: tag[0] };
        })
  );
