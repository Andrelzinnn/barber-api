import { appointmentRoutes } from "@/routes/appointments";
import { barbershopRoutes } from "@/routes/barbeshop";
import { clientRoutes } from "@/routes/clients";
import { paymentRoutes } from "@/routes/payments";
import { servicesRoutes } from "@/routes/services";
import { tagRoutes } from "@/routes/tags";
import { tagsServicesRelationsRoutes } from "@/routes/tagsServicesRelations";
import { Elysia } from "elysia";

export const protectedRoutes = new Elysia();
protectedRoutes.use([barbershopRoutes, clientRoutes, paymentRoutes]);

export const partialProtectedRoutes = new Elysia();
partialProtectedRoutes.use([
  servicesRoutes,
  appointmentRoutes,
  tagRoutes,
  servicesRoutes,
  tagsServicesRelationsRoutes,
]);
