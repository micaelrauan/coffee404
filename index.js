import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./SRC/database/db.js";
import registerRoutes from "./SRC/routes/registerRoutes.js";
import loginRoutes from "./SRC/routes/loginRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// pagina inicial
app.get("/", (req, res) => {
  return res.redirect("/login");
});

app.use("/public", express.static(path.join(__dirname, "APP", "PUBLIC")));

// rota de login
app.get("/login", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "login.html"));
});

// rota de registro
app.get("/register", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "register.html"));
});

// rota do menu principal
app.get("/menu", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "menu.html"));
});

// rota do perfil
app.get("/perfil", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "perfil.html"));
});

// Conexão com o freeDB
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar com o banco mysql: ", err);
  } else {
    console.log("Conectado com o banco mysql com sucesso!");
  }
});

// Usar rotas organizadas
app.use("/", registerRoutes);
app.use("/", loginRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
