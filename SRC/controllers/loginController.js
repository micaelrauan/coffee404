import db from "../database/db.js";
import jwt from "jsonwebtoken";

const SECRET = "mic4elr4auansecrettoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query(
    "SELECT id, nome, email, senha FROM usuarios WHERE email = ?",
    [email]
  );
  if (rows.length === 0) return res.status(401).send("Credenciais inválidas.");

  const user = rows[0];
  if (user.senha === password) {
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: "30d",
    });
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });
    return res.redirect("/menu");
  }
  return res.status(401).send("Credenciais inválidas.");
};
