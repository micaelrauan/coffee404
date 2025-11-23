import express from "express";
import path from "path";
import session from "express-session";
//import MongoStore from "connect-mongo";
import MySQLSession from "express-mysql-session";
import { fileURLToPath } from "url";
import db from "./SRC/database/db.js";
import registerRoutes from "./SRC/routes/registerRoutes.js";
import loginRoutes from "./SRC/routes/loginRoutes.js";
import sessionValidator from "./SRC/middlewares/sessionValidator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CONFIGURAÇÃO DA SESSÃO COM O BANCO (freedb mysql) - NÃO MEXER -_-
const MySQLStore = MySQLSession(session);
const sessionStore = new MySQLStore({
  host: "sql.freedb.tech",
  port: 3306,
  user: "freedb_mic4el",
  password: "rC74pC#m8S5#RC!",
  database: "freedb_Coffee404",
  schema: {
    tableName: "SessionsDatabase",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
});

app.use(
  session({
    secret: "mic4el",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 30, // -30dias tempo de login maximo
    },
    store: sessionStore,
    /*store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/Coffee404",
    }),*/
  })
);

// ------------------------------------------------------- //
// --------------------- ROTAS AQUI `-` ------------------ //
// ------------------------------------------------------- //

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
app.get("/menu", sessionValidator, (req, res) => {
  /* if (req.session.loggedIn) {
    return res.sendFile(path.join(__dirname, "APP", "menu.html"));
  } else {
    return res.redirect("/login");
  } */
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

// rota de logout
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    return res.redirect("/login");
  });
});

//-------------------CALL BACK - FREEDB MYSQL-----------------//
// Obs: Nao mexer -_-
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

// servidor - não mexer obs: ajustar depois, adicionar a prota no .env
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
