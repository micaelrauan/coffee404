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
//import multer from "multer";

//----------- VALIDADORES--------------------//
import registerRoutes from "./SRC/routes/registerRoutes.js";
import loginRoutes from "./SRC/routes/loginRoutes.js";
import sessionValidator from "./SRC/middlewares/sessionValidator.js";
import publicOnly from "./SRC/middlewares/publicOnly.js";

// -----------CONFIGURAÇÕES--------------------//
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const SECRET = "mic4elr4auansecrettoken"; // segredo dos cookies lá do jwt  -OBs: Adicionar no .env

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -------------------------------- CONFIG MULTER ------------------------------- //ual ao do seu JWT!

/*(const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./APP/PUBLIC/ASSETS/image/perfis/");
  },
  filename: (req, file, cb) => {
    const token = req.cookies.auth_token;
    let userId = "default";
    if (token) {
      try {
        const decoded = jwt.verify(token, SECRET);
        userId = decoded.id;
      } catch (err) {}
    }
    const ext = file.originalname.split(".").pop();
    cb(null, `${userId}.${ext}`);
  },
});
const upload = multer({ storage });*/

// ------------------------------------------------------- //
// --------------------- ROTAS AQUI <3 ------------------- //
// ------------------------------------------------------- //

// ------------------------------ ROTA RAIZ -------------------------------------------//
app.get("/", (req, res) => {
  const token = req.cookies.auth_token;
  if (token) {
    try {
      jwt.verify(token, SECRET);
      return res.sendFile(path.join(__dirname, "APP", "perfil.html"));
    } catch (err) {
      res.clearCookie("auth_token");
      return res.sendFile(path.join(__dirname, "APP", "menu.html"));
    }
  } else {
    return res.sendFile(path.join(__dirname, "APP", "menu.html"));
  }
});

app.use("/public", express.static(path.join(__dirname, "APP", "PUBLIC")));
9;

// -------------------------------- ROTAS DE AUTHENTICAÇÃO ---------------------------------//

// rota de login
app.get("/login", publicOnly, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "login.html"));
});

// rota de registro
app.get("/register", publicOnly, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "register.html"));
});

// rotas organizadas
app.use("/", registerRoutes);
app.use("/", loginRoutes);

// --------------------------------- ROTAS DA NAVBAR ---------------------------------- //

// rota do menu principal
app.get("/menu", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "menu.html"));
});

// rota de feedback
app.get("/feedback", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "feedback.html"));
});

// rota do sobre
app.get("/sobre", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "sobre.html"));
});

// rota do cardapio
app.get("/cardapio", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "cardapio.html"));
});

// ------------------------------ UNIDADES -------------------------

// rota da localização
app.get("/local", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "local.html"));
});

// Unidade aldeota
app.get("/local/aldeota", (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "unidadeAldeota.html"));
});

// ------------------------------ ROTAS DO PERFIL ------------------------------------------- //

// rota do perfil
app.get("/perfil", sessionValidator, (req, res) => {
  return res.sendFile(path.join(__dirname, "APP", "perfil.html"));
});

// rota de logout
app.get("/logout", sessionValidator, (req, res) => {
  res.clearCookie("auth_token");
  return res.redirect("/menu");
});

//------------------- CONEXAO COM O BANCO (logar no freedb)------------------//

// Obs: Nao mexer
db.query("SELECT 1")
  .then(() => {
    console.log("Conectado com o banco mysql com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o banco mysql: ", err);
  });

//------------------------- SERIVIDOR ----------------------------------//

const PORT = process.env.PORT || 3000; // -Obs: adicionar no .env uma porta pra facilitar
app.listen(PORT, () => {
  console.log(
    `Servidor está rodando com sucesso! 😈 | Porta local: ${PORT} | Hospedagem: https://coffee404.vercel.app\n`
  );

  console.log(`
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
█▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
█░██░██░██░██░██░██░██░██░██░░░░░░░░░░█
█░██░██░██░██░██░██░██░██░██░░░░░░░░░░█
█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░█░░░░█▀▀▀█░█▀▀█░█▀▀▄░▀█▀░█▄░░█░█▀▀█░░
░░█░░░░█░░░█░█▄▄█░█░░█░░█░░█░█░█░█░▄▄░░
░░█▄▄█░█▄▄▄█░█░░█░█▄▄▀░▄█▄░█░░▀█░█▄▄█░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
    `);
});

//----------------------------------------------------------//

/*



░░░░░░░▄▄████▄▄░░░░░░░░░░▄▄████▄▄░░░░░░░
░░░░░░██▀░░░░████▀▀▀▀▀▀████░░░░▀██░░░░░░
░░░░░░█░░░░▄█▀░░░░░░░░░░░▀▀█▄░░░░█░░░░░░
░░░░░░▀█▄▄█▀░░░░░░░░░░░░░░░░▀█▄▄█▀░░░░░░
░░░░░░░░▀█▀░░░▄▄▄░░░░░░▄▄▄░░░▀█▀░░░░░░░░
░░░░░░░░██░░░░██▀░░░░░░▀██░░░░██░░░░░░░░
░░░░░░░░██░░░░░░▄▄░░░░▄▄░░░░░░██░░░░░░░░
░░░░░░░░▀█░░░░▄▀░░████░░▀▄░░░░██░░░░░░░░
░░░░░░░░░██░░▄░░░░░▀▀░░░░░▄░░██░░░░░░░░░
░░░░░░░▄▄███▄░▄░░▄▄▄▄▄▄░░▄░▄███▄▄░░░░░░░
░░░░░▄█▀▀░░░████▄░░░░░░▄████░░░▀▀█▄░░░░░
░░░▄█▀░░░░▄█▀░▀▀▀██████▀▀▀░▀█▄░░░░▀█▄░░░
░▄█▀░░░░░█▀░░░░░░░░░░░░░░░░░░▀█░░░░░▀█▄░
▄█▀░░░░░█▀░░░░░░░░░░░░░░░░░░░░▀█░░░░░▀█▄
██░░░░░██░░░░░░░░░░░░░░░░░░░░░░██░░░░░██
██░░░░░██░░░░░░░░░░░░░░░░░░░░░░██░░░░░██
░██▄▄█▀█▀░░░░░░░░░░░░░░░░░░░░░░████▄▄█▀░
░░░░░▄▄████▄▄░░░░░░░░░░░░░░▄▄████▄▄░░░░░
░░░▄█▀░░░░░░▀█▄░░░░░░░░░░▄█▀░░░░░░▀█▄░░░
░░░█░░░░░░░░░░█▄░░░░░░░░▄█░░░░░░░░░░█░░░
░░░▀█▄░░░░░░▄█▀▀▀█▄▄▄▄█▀▀▀█▄░░░░░░▄█▀░░░
░░░░░▀▀████▀▀░░░░░░░░░░░░░░▀▀████▀▀░░░░░


*/
