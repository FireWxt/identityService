import express from "express";
import swaggerUi from "swagger-ui-express";
import { requireHostToken } from "./auth.js";
import { users } from "./userModel.js";
import { openapiSpec } from "./openapi.js";

const app = express();

app.get("/", (_req, res) => {
  res.send("Identity Service");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use(requireHostToken);

// Consultation des utilisateurs
app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Vérification de l'existence d'un utilisateur
app.get("/users/:id/exists", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid user id" });
  }

  const exists = users.some((u) => u.id === id);
  res.json({ exists });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
