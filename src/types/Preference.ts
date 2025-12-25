import z from "zod";

export type PreferenceObject = {
  items: Array<{
    id: string;
    title: string;
    quantity: number;
    currency_id?: string;
    unit_price: number;
  }>;
  back_urls?: {
    success: string;
    failure: string;
    pending: string;
  };
  auto_return?: string;
};

export const PreferenceSchema = z.object({
  items: z.array(
    z.object({
      id: z.uuidv7(),
      title: z.string(),
      quantity: z.number().int().min(1),
      currency_id: z.string().optional(),
      unit_price: z.number().min(0),
    })
  ),
  back_urls: z
    .object({
      success: z.url(),
      failure: z.url(),
      pending: z.url(),
    })
    .optional(),
  auto_return: z.string().optional(),
});

export function validateAndCreatePreference(data: unknown): PreferenceObject {
  return PreferenceSchema.parse(data);
}
