//-------------PACOTES/IMPORTAÇÕES--------------//
import express from "express";
import path from "path";
//import session from "express-session";  -- não usado por enquanto (talvez no futuro)
//import MongoStore from "connect-mongo";
//import MySQLSession from "express-mysql-session";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import db from "./SRC/database/db.js";

//----------- VALIDADORES--------------------//
import registerRoutes from "./SRC/routes/registerRoutes.js";
import loginRoutes from "./SRC/routes/loginRoutes.js";
import sessionValidator from "./SRC/middlewares/sessionValidator.js";
import publicOnly from "./SRC/middlewares/publicOnly.js";

// -----------CONFIGURAÇÕES--------------------//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const SECRET = "mic4elr4auansecrettoken"; // segredo dos cookies lá do jwt

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ------------------------------------------------------- //
// --------------------- ROTAS AQUI `-` ------------------ //
// ------------------------------------------------------- //

// ROTA RAIZ, se tiver token vai pro menu senao login Obs: da pra trocar depois
app.get("/", (req, res) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      jwt.verify(token, SECRET);
      return res.sendFile(path.join(__dirname, "APP", "menu.html"));
    } catch (err) {
      res.clearCookie("auth_token");
      return res.sendFile(path.join(__dirname, "APP", "login.html"));
    }
  } else {
    return res.sendFile(path.join(__dirname, "APP", "login.html"));
  }
});

app.use("/public", express.static(path.join(__dirname, "APP", "PUBLIC")));
9;

// rota de login
app.get("/login", publicOnly, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "login.html"));
});

// rota de registro
app.get("/register", publicOnly, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "register.html"));
});

// rota do menu principal
app.get("/menu", sessionValidator, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "menu.html"));
});

// rota de feedback
app.get("/feedback", sessionValidator, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "feedback.html"));
});

// rota do perfil
app.get("/perfil", sessionValidator, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "perfil.html"));
});

// rota do sobre
app.get("/sobre", sessionValidator, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "sobre.html"));
});

// rota de logout
app.get("/logout", (req, res) => {
  res.clearCookie("auth_token");
  return res.redirect("/login");
});

//-------------------CALL BACK POOL-----------------//
// Obs: Nao mexer
db.query("SELECT 1")
  .then(() => {
    console.log("Conectado com o banco mysql com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco mysql: ", err);
  });

// rotas organizadas
app.use("/", registerRoutes);
app.use("/", loginRoutes);

//----------------------------------------------------------//

// servidor - não mexer obs: ajustar depois, adicionar a porta no .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});

//----------------------------------------------------------//

/*

░░░░░░░░░░▄▄░░░▄░░░░▄▄▄▄▄▄▄
░░░░░░░░░░▀▀▀█▀▀▀█▀▀███████
░░█████▄▄███████████▄▄▄▄▄▄▄▄▄▄▄▄▄
█▄████████████████▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
█▄████▀░░░░██▀▀██
▀░░░░░░░░░██░░░██
░░░░░░░░░▀▀░░░░▀▀

feito com amor por mic4el r4uan <3

*/
