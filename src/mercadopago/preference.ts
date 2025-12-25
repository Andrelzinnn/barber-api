import { Preference, MercadoPagoConfig } from "mercadopago";
import { PreferenceObject } from "@/types/Preference";

//Validação é feita no serviço antes de chamar essa função no service
export function createPreference(data: PreferenceObject) {
  const token = Bun.env.TOKEN_ACCESS;
  const client = new MercadoPagoConfig({
    accessToken: token!,
  });
  const preference = new Preference(client);
  return preference.create({
    body: data,
  });
}
