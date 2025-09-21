import { Elysia } from "elysia";

const app = new Elysia({ prefix: "/api" });

//Client routes
app.get("/clients", () => {
  return "/api/clients";
});

app.get("/clients/:email", () => {
  return "/api/clients/:email";
});

app.post("/clients", (ctx) => {
  return "Opa, data";
});

app.delete("/clients/:email", () => {
  return "deltezera";
});

//Appointments routes

app.get("/appointments", () => {
  return "reservas";
});

app.get("/appointments/:date", () => {
  return "reservas por data";
});

app.get("/appointments/client/:email", () => {
  return "reservas por usuario";
});

app.post("/appointments", (ctx) => {
  return "criar reserva";
});

app.put("/appointments/:id", (ctx) => {
  return "alterar reserva com base no id";
});

app.delete("/appointments/:id", () => {
  return "deletar reserva com base no id";
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
