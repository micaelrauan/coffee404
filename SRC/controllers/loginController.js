import db from "../database/db.js";

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT id, nome, email, senha FROM usuarios WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err);
      return res.status(500).send("Erro no servidor.");
    }
    if (!results || results.length === 0) {
      return res.status(401).send("Credenciais inválidas.");
    }

    const user = results[0];

    if (user.senha === password) {
      return res.redirect("/menu");
    }

    return res.status(401).send("Credenciais inválidas.");
  });
};
