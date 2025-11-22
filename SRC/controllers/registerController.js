import db from "../database/db.js";

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Erro ao inserir usuário:", err);
      return res.status(500).send("Erro ao registrar usuário.");
    }
    return res.redirect("/login");
  });
};
