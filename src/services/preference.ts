import { validateAndCreatePreference } from "@/types/Preference";
import { createPreference } from "@/mercadopago/preference";
import { getServiceById } from "./service";

const back_urls = {
  success: "https://localhost:5173/success",
  failure: "https://localhost:5173/failure",
  pending: "https://localhost:5173/pending",
};

const auto_return = "approved";

export async function createPreferenceServiceById(id: string) {
  try {
    const service = await getServiceById(id);
    const items = [
      {
        id: service!.id,
        title: service!.name,
        quantity: 1,
        unit_price: service!.price,
        currency_id: "BRL",
      },
    ];
    const objectToValidate = {
      items,
      back_urls,
      auto_return,
    };

    const validPreference = validateAndCreatePreference(objectToValidate);
    const preferenceResponse = await createPreference(validPreference);
    console.log("Preference created:", preferenceResponse);
    return preferenceResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating preference:", error.message);
      throw new Error(`Preference validation failed: ${error.message}`);
    } else {
      console.error("Unknown error creating preference");
      throw new Error("Preference validation failed: Unknown error");
    }
  }
}
