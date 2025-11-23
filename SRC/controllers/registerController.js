import db from "../database/db.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  try {
    await db.query(sql, [name, email, password]);
    return res.redirect("/login");
  } catch (err) {
    console.error("Erro ao inserir usuário:", err);
    return res.status(500).send("Erro ao registrar usuário.");
  }
};
